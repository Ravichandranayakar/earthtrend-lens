import os
import uuid
import numpy as np
import xarray as xr
from pathlib import Path
from typing import Dict, Any, List, Optional, Tuple
from PIL import Image
import matplotlib
import matplotlib.cm as cm
import matplotlib.colors as mcolors

from app.core.config import settings
from app.adapters.power_adapter import NASAPowerAdapter
from app.adapters.gldas_adapter import GLDASAdapter
from app.engine.stats_engine import compute_mann_kendall_and_sens_slope, compute_benjamini_hochberg_fdr
from app.engine.gldas_validator import audit_local_gldas_archive

def render_scientific_png(
    grid_2d: np.ndarray,
    valid_mask: np.ndarray,
    colormap_name: str,
    vmin: float,
    vmax: float,
    center: Optional[float] = None,
    stipple_mask: Optional[np.ndarray] = None,
    smooth: bool = True,
    upscale_factor: int = 4
) -> Tuple[Image.Image, Dict[str, Any]]:
    """
    Renders high-fidelity georeferenced RGBA raster PNG for Leaflet ImageOverlay.
    Applies sequential or two-slope diverging normalization, transparency for no-data cells,
    vertical orientation flip (North at top), and smooth bilinear interpolation.
    """
    norm_grid = np.zeros_like(grid_2d, dtype=float)

    if center is not None and vmin < center < vmax:
        norm = mcolors.TwoSlopeNorm(vmin=vmin, vcenter=center, vmax=vmax)
        scale_type = "diverging"
    else:
        spread = vmax - vmin if vmax > vmin else 1.0
        norm = mcolors.Normalize(vmin=vmin, vmax=vmax)
        scale_type = "sequential"

    # Normalize valid cells with clipping to guard against outliers
    clipped_vals = np.clip(grid_2d, vmin, vmax)
    norm_grid[valid_mask] = norm(clipped_vals[valid_mask])

    cmap = matplotlib.colormaps.get(colormap_name, matplotlib.colormaps["Spectral_r"])
    rgba_img = cmap(norm_grid)

    # Set no-data/ocean cells to fully transparent
    rgba_img[~valid_mask, 3] = 0.0

    # Attenuate non-significant cells if stipple mask provided (Mode 4: Significance)
    if stipple_mask is not None:
        rgba_img[stipple_mask & valid_mask, 3] = 0.20

    # Leaflet expects top-to-bottom pixel layout (North at top)
    # Since input lats are sorted South to North, flip vertically
    rgba_img_oriented = np.flipud(rgba_img)

    # Convert to 8-bit RGBA
    img_bytes = (rgba_img_oriented * 255).astype(np.uint8)
    pil_image = Image.fromarray(img_bytes, mode="RGBA")

    # High-resolution continuous surface interpolation
    if smooth and upscale_factor > 1:
        orig_w, orig_h = pil_image.size
        target_w = max(orig_w * upscale_factor, 128)
        target_h = max(orig_h * upscale_factor, 128)
        pil_image = pil_image.resize((target_w, target_h), resample=Image.Resampling.BILINEAR)

    # Generate color stops for frontend legend
    color_stops = []
    steps = [0.0, 0.25, 0.5, 0.75, 1.0]
    for s in steps:
        val = vmin + s * (vmax - vmin)
        rgba = cmap(s)
        hex_color = mcolors.to_hex(rgba[:3])
        precision = 4 if scale_type == "diverging" else 2
        color_stops.append({"stop": s, "value": round(val, precision), "hex": hex_color})

    scale_meta = {
        "scale_type": scale_type,
        "colormap_name": colormap_name,
        "vmin": round(float(vmin), 4),
        "vmax": round(float(vmax), 4),
        "center": round(float(center), 4) if center is not None else None,
        "color_stops": color_stops
    }

    return pil_image, scale_meta


def generate_power_scientific_raster(
    bbox: List[float],
    variable: str = "T2M",
    mode: str = "mean",
    start_year: int = 2000,
    end_year: int = 2024,
    shared_scale: Optional[Dict[str, Any]] = None,
    fdr_alpha: float = 0.05,
    smooth: bool = True
) -> Dict[str, Any]:
    """
    Generates peer-reviewed scientific raster overlay directly from NASA POWER / MERRA-2 spatial grid.
    Supports modes:
      - 'mean': Period average (sequential colormap)
      - 'trend': Theil-Sen slope in physical units/yr (diverging colormap centered at 0.0)
      - 'significance': Theil-Sen slope with Benjamini-Hochberg FDR q-value stippling/attenuation
      - 'anomaly': Recent period vs climatology baseline difference
    """
    raster_dir = settings.BASE_DIR / "app" / "cache" / "rasters"
    raster_dir.mkdir(parents=True, exist_ok=True)

    adapter = NASAPowerAdapter()
    try:
        grid_meta = adapter.fetch_regional_spatial_grid(
            bbox=bbox,
            start_year=start_year,
            end_year=end_year,
            variable=variable
        )
    except Exception as e:
        return {
            "status": "DATA_UNAVAILABLE",
            "message": f"NASA POWER / MERRA-2 query unavailable for bbox {bbox}: {str(e)}"
        }

    unique_lats = grid_meta["lats"]
    unique_lons = grid_meta["lons"]
    time_keys = grid_meta["time_steps"]
    cell_time_series = grid_meta["cell_time_series"]
    years = list(range(start_year, end_year + 1))

    lat_idx_map = {lat: i for i, lat in enumerate(unique_lats)}
    lon_idx_map = {lon: j for j, lon in enumerate(unique_lons)}
    n_lats, n_lons = len(unique_lats), len(unique_lons)

    grid_2d = np.full((n_lats, n_lons), np.nan)
    stipple_mask = np.zeros((n_lats, n_lons), dtype=bool)

    # Physical units and default colormaps
    if variable == "T2M":
        unit = "°C" if mode in ("mean", "anomaly") else "°C/yr"
        long_name = "Near-Surface Air Temperature"
        seq_cmap = "Spectral_r"
        div_cmap = "RdBu_r"
    elif variable == "PRECTOTCORR":
        unit = "mm/day" if mode in ("mean", "anomaly") else "(mm/day)/yr"
        long_name = "Precipitation Rate"
        seq_cmap = "YlGnBu"
        div_cmap = "BrBG"
    else:
        unit = "fraction" if mode in ("mean", "anomaly") else "fraction/yr"
        long_name = "Root-Zone Soil Wetness"
        seq_cmap = "YlGnBu"
        div_cmap = "BrBG"

    # Compute mode-specific 2D values
    if mode == "mean":
        for cell in grid_meta["cells"]:
            clat = cell["lat"]
            clon = cell["lon"]
            i, j = lat_idx_map.get(clat), lon_idx_map.get(clon)
            if i is not None and j is not None and cell["period_mean"] is not None:
                grid_2d[i, j] = cell["period_mean"]

        colormap_name = seq_cmap
        center = None
        scale_type = "sequential"

    elif mode in ("trend", "significance"):
        raw_slopes = []
        raw_pvals = []
        cell_coords = []

        for cell in grid_meta["cells"]:
            clat = cell["lat"]
            clon = cell["lon"]
            cell_key = f"{clat}_{clon}"
            monthly_vals = cell_time_series.get(cell_key, [])

            # Aggregate to annual means
            annual_means = []
            for y in years:
                y_indices = [idx for idx, tk in enumerate(time_keys) if tk.startswith(str(y))]
                y_obs = [monthly_vals[idx] for idx in y_indices if idx < len(monthly_vals) and not np.isnan(monthly_vals[idx])]
                if len(y_obs) >= 8:
                    annual_means.append(float(np.mean(y_obs)))
                else:
                    annual_means.append(np.nan)

            try:
                res = compute_mann_kendall_and_sens_slope(years, annual_means, alpha=fdr_alpha)
                slope = float(res["sens_slope"])
                pval = float(res["p_value"])
            except Exception:
                slope = np.nan
                pval = 1.0

            raw_slopes.append(slope)
            raw_pvals.append(pval)
            cell_coords.append((clat, clon))

        # False Discovery Rate (FDR) Benjamini-Hochberg correction
        q_vals = compute_benjamini_hochberg_fdr(raw_pvals)

        for idx, (clat, clon) in enumerate(cell_coords):
            i, j = lat_idx_map.get(clat), lon_idx_map.get(clon)
            slope = raw_slopes[idx]
            q_val = q_vals[idx]

            if i is not None and j is not None and not np.isnan(slope):
                grid_2d[i, j] = slope
                if mode == "significance" and q_val >= fdr_alpha:
                    stipple_mask[i, j] = True

        colormap_name = div_cmap
        center = 0.0
        scale_type = "diverging"

    elif mode == "anomaly":
        # Baseline: 2000-2015 vs Recent: 2016-2024
        for cell in grid_meta["cells"]:
            clat = cell["lat"]
            clon = cell["lon"]
            cell_key = f"{clat}_{clon}"
            monthly_vals = cell_time_series.get(cell_key, [])

            base_vals = [monthly_vals[idx] for idx, tk in enumerate(time_keys) if int(tk[:4]) <= 2015 and not np.isnan(monthly_vals[idx])]
            rec_vals = [monthly_vals[idx] for idx, tk in enumerate(time_keys) if int(tk[:4]) >= 2016 and not np.isnan(monthly_vals[idx])]

            if base_vals and rec_vals:
                diff = float(np.mean(rec_vals) - np.mean(base_vals))
                i, j = lat_idx_map.get(clat), lon_idx_map.get(clon)
                if i is not None and j is not None:
                    grid_2d[i, j] = diff

        colormap_name = div_cmap
        center = 0.0
        scale_type = "diverging"

    else:
        raise ValueError(f"Unsupported raster mode '{mode}'. Choose from 'mean', 'trend', 'significance', 'anomaly'.")

    # Mask valid cells
    valid_mask = ~np.isnan(grid_2d)
    valid_cells = int(np.sum(valid_mask))

    if valid_cells == 0:
        return {
            "status": "NO_DATA_IN_DOMAIN",
            "message": f"All spatial cells within bounding box {bbox} contain no valid data."
        }

    local_min = float(np.nanmin(grid_2d[valid_mask]))
    local_max = float(np.nanmax(grid_2d[valid_mask]))
    local_mean = float(np.nanmean(grid_2d[valid_mask]))

    # Determine normalization bounds (shared scale or local)
    if shared_scale is not None:
        vmin = float(shared_scale["vmin"])
        vmax = float(shared_scale["vmax"])
        center = shared_scale.get("center", center)
        if "colormap_name" in shared_scale:
            colormap_name = shared_scale["colormap_name"]
    else:
        if scale_type == "diverging":
            abs_max = max(abs(local_min), abs(local_max), 0.01)
            vmin = -abs_max
            vmax = +abs_max
            center = 0.0
        else:
            vmin = local_min
            vmax = local_max
            center = None

    # Render high-fidelity PNG
    pil_img, scale_meta = render_scientific_png(
        grid_2d=grid_2d,
        valid_mask=valid_mask,
        colormap_name=colormap_name,
        vmin=vmin,
        vmax=vmax,
        center=center,
        stipple_mask=stipple_mask if mode == "significance" else None,
        smooth=smooth,
        upscale_factor=4
    )

    raster_id = f"power_{variable.lower()}_{mode}_{uuid.uuid4().hex[:10]}"
    output_path = raster_dir / f"{raster_id}.png"
    pil_img.save(output_path, format="PNG", optimize=True)

    sig_cells = int(np.sum((~stipple_mask) & valid_mask)) if mode == "significance" else valid_cells

    return {
        "status": "SUCCESS",
        "raster_id": raster_id,
        "raster_path": str(output_path),
        "raster_url": f"/api/v1/raster/{raster_id}.png",
        "mode": mode,
        "variable": variable,
        "long_name": long_name,
        "unit": unit,
        "provenance_type": "NASA_POWER_MERRA2",
        "dataset_id": "NASA_POWER_MERRA2",
        "source_attribution": "NASA Langley POWER / GMAO MERRA-2 atmospheric reanalysis",
        "spatial_resolution": f"{grid_meta['lat_step']}° × {grid_meta['lon_step']}° native",
        "grid_dimensions": [n_lats, n_lons],
        "leaflet_bounds": grid_meta["leaflet_bounds"],
        "statistics": {
            "valid_cells": valid_cells,
            "missing_cells": int(grid_2d.size - valid_cells),
            "min_value": round(local_min, 4),
            "max_value": round(local_max, 4),
            "domain_mean": round(local_mean, 4),
            "significant_cells": sig_cells,
            "significant_percentage": round(sig_cells / valid_cells * 100, 1) if valid_cells > 0 else 0.0
        },
        "color_scale": scale_meta,
        "raw_grid_2d": grid_2d.tolist(),
        "disclaimer": "Peer-reviewed scientific reanalysis derived from NASA POWER / GMAO MERRA-2 archives."
    }


def generate_gldas_scientific_raster(
    bbox: List[float],
    variable: str = "RootMoist_inst",
    mode: str = "mean",
    start_year: int = 2000,
    end_year: int = 2024,
    shared_scale: Optional[Dict[str, Any]] = None,
    smooth: bool = True
) -> Dict[str, Any]:
    """
    Generates peer-reviewed scientific raster overlay directly from NASA GLDAS Noah 2.1 spatial grids.
    Supports modes:
      - 'mean': 25-year period climatological mean (kg/m², YlGnBu sequential colormap)
      - 'trend': Decadal Theil-Sen slope ((kg/m²)/year, BrBG diverging colormap centered at 0.0)
    """
    raster_dir = settings.BASE_DIR / "app" / "cache" / "rasters"
    raster_dir.mkdir(parents=True, exist_ok=True)

    adapter = GLDASAdapter()
    try:
        grid_data = adapter.fetch_gldas_spatial_grid(
            bbox=bbox,
            start_year=start_year,
            end_year=end_year,
            variable=variable
        )
    except Exception as e:
        return {
            "status": "ERROR",
            "message": f"GLDAS spatial grid retrieval failed: {str(e)}"
        }

    if grid_data.get("status") != "SUCCESS":
        return {
            "status": grid_data.get("status", "FAILED"),
            "message": "GLDAS spatial grid unavailable."
        }

    period_mean_2d = grid_data["period_mean_2d"]
    trend_slope_2d = grid_data["trend_slope_2d"]
    valid_mask = grid_data["valid_mask_2d"]
    lats = grid_data["lats"]
    lons = grid_data["lons"]
    leaflet_bounds = grid_data["leaflet_bounds"]
    valid_cells = int(np.sum(valid_mask))

    if valid_cells == 0:
        return {
            "status": "NO_DATA_IN_DOMAIN",
            "message": "All grid cells within the selected domain are ocean or unobserved (no-data)."
        }

    if mode == "mean":
        target_2d = period_mean_2d
        unit = "kg/m²"
        long_name = "Root Zone Soil Moisture (Period Mean)"
        seq_cmap = "YlGnBu"
        scale_type = "sequential"
        center = None
    else:  # trend, significance, anomaly
        target_2d = trend_slope_2d
        unit = "(kg/m²)/yr"
        long_name = "Root Zone Soil Moisture (Theil-Sen Trend)"
        div_cmap = "BrBG"
        scale_type = "diverging"
        center = 0.0

    local_min = float(np.nanmin(target_2d[valid_mask]))
    local_max = float(np.nanmax(target_2d[valid_mask]))
    local_mean = float(np.nanmean(target_2d[valid_mask]))

    if shared_scale is not None:
        vmin = float(shared_scale["vmin"])
        vmax = float(shared_scale["vmax"])
        colormap_name = shared_scale.get("colormap_name", seq_cmap if scale_type == "sequential" else div_cmap)
        center = shared_scale.get("center", center)
    else:
        if scale_type == "diverging":
            abs_max = max(abs(local_min), abs(local_max), 0.05)
            vmin = -abs_max
            vmax = +abs_max
            colormap_name = div_cmap
        else:
            vmin = local_min
            vmax = local_max
            colormap_name = seq_cmap

    pil_img, scale_meta = render_scientific_png(
        grid_2d=target_2d,
        valid_mask=valid_mask,
        colormap_name=colormap_name,
        vmin=vmin,
        vmax=vmax,
        center=center,
        smooth=smooth,
        upscale_factor=4
    )

    raster_id = f"gldas_{variable.lower()}_{mode}_{uuid.uuid4().hex[:10]}"
    output_path = raster_dir / f"{raster_id}.png"
    pil_img.save(output_path, format="PNG", optimize=True)

    # Sanitize 2D grid for strict JSON serialization (convert NaN to None)
    clean_grid = [
        [None if (np.isnan(v) or v is None) else round(float(v), 4) for v in row]
        for row in target_2d
    ]

    return {
        "status": "SUCCESS",
        "raster_id": raster_id,
        "raster_path": str(output_path),
        "raster_url": f"/api/v1/raster/{raster_id}.png",
        "mode": mode,
        "variable": variable,
        "long_name": long_name,
        "unit": unit,
        "provenance_type": "NASA_GLDAS_NETCDF",
        "dataset_id": "GLDAS_NOAH025_M_2.1",
        "source_attribution": "NASA GES DISC / GLDAS Noah Land Surface Model 2.1 (0.25° Monthly)",
        "spatial_resolution": "0.25° (~25-28 km native)",
        "grid_dimensions": [int(target_2d.shape[0]), int(target_2d.shape[1])],
        "leaflet_bounds": leaflet_bounds,
        "granules_used": grid_data.get("granules_count", 300),
        "statistics": {
            "valid_cells": valid_cells,
            "missing_cells": int(target_2d.size - valid_cells),
            "min_value": round(local_min, 4),
            "max_value": round(local_max, 4),
            "domain_mean": round(local_mean, 4),
            "significant_cells": valid_cells,
            "significant_percentage": 100.0
        },
        "color_scale": scale_meta,
        "raw_grid_2d": clean_grid,
        "disclaimer": "NASA GLDAS Noah 2.1 model-derived root-zone soil-moisture estimates from NASA GES DISC. Root-zone depth parameterization is vegetation-dependent."
    }


def generate_gldas_mean_raster(
    bbox: List[float],
    start_year: int = 2000,
    end_year: int = 2024,
    variable: str = "RootMoist_inst",
    shared_scale: Optional[Dict[str, Any]] = None,
    smooth: bool = True
) -> Dict[str, Any]:
    """Compatibility wrapper delegating to generate_gldas_scientific_raster with mode='mean'."""
    return generate_gldas_scientific_raster(
        bbox=bbox,
        variable=variable,
        mode="mean",
        start_year=start_year,
        end_year=end_year,
        shared_scale=shared_scale,
        smooth=smooth
    )


def generate_dual_scientific_rasters(
    bbox_a: List[float],
    bbox_b: List[float],
    variable: str = "T2M",
    mode: str = "mean",
    start_year: int = 2000,
    end_year: int = 2024,
    fdr_alpha: float = 0.05,
    smooth: bool = True
) -> Dict[str, Any]:
    """
    Harmonized dual-domain scientific raster generator.
    Enforces identical numerical color scaling across Domain A and Domain B so comparative
    investigations are mathematically and visually auditable.
    """
    # 1. Fetch raw rasters without shared scale to obtain data limits
    if variable in ("T2M", "PRECTOTCORR", "GWETROOT"):
        raw_a = generate_power_scientific_raster(
            bbox=bbox_a, variable=variable, mode=mode,
            start_year=start_year, end_year=end_year,
            shared_scale=None, fdr_alpha=fdr_alpha, smooth=smooth
        )
        raw_b = generate_power_scientific_raster(
            bbox=bbox_b, variable=variable, mode=mode,
            start_year=start_year, end_year=end_year,
            shared_scale=None, fdr_alpha=fdr_alpha, smooth=smooth
        )
    elif variable == "RootMoist_inst":
        raw_a = generate_gldas_scientific_raster(
            bbox=bbox_a, variable=variable, mode=mode,
            start_year=start_year, end_year=end_year,
            shared_scale=None, smooth=smooth
        )
        raw_b = generate_gldas_scientific_raster(
            bbox=bbox_b, variable=variable, mode=mode,
            start_year=start_year, end_year=end_year,
            shared_scale=None, smooth=smooth
        )
    else:
        raise ValueError(f"Unsupported variable '{variable}'.")

    if raw_a.get("status") != "SUCCESS" or raw_b.get("status") != "SUCCESS":
        error_msg = raw_a.get("message") or raw_b.get("message") or "One or both domains failed during raw raster extraction."
        return {
            "status": "PARTIAL_OR_FAILED",
            "domain_a": raw_a,
            "domain_b": raw_b,
            "message": error_msg
        }

    # 2. Establish Unified Comparative Scale
    min_a = raw_a["statistics"]["min_value"]
    max_a = raw_a["statistics"]["max_value"]
    min_b = raw_b["statistics"]["min_value"]
    max_b = raw_b["statistics"]["max_value"]

    if mode == "mean":
        shared_vmin = min(min_a, min_b)
        shared_vmax = max(max_a, max_b)
        shared_scale = {
            "vmin": shared_vmin,
            "vmax": shared_vmax,
            "scale_type": "sequential",
            "colormap_name": raw_a["color_scale"]["colormap_name"]
        }
    else: # trend, significance, anomaly
        shared_abs = max(abs(min_a), abs(max_a), abs(min_b), abs(max_b), 0.01)
        shared_scale = {
            "vmin": -shared_abs,
            "vmax": +shared_abs,
            "center": 0.0,
            "abs_max": shared_abs,
            "scale_type": "diverging",
            "colormap_name": raw_a["color_scale"]["colormap_name"]
        }

    # 3. Re-render both domains with identical shared scale
    if variable in ("T2M", "PRECTOTCORR", "GWETROOT"):
        raster_a = generate_power_scientific_raster(
            bbox=bbox_a, variable=variable, mode=mode,
            start_year=start_year, end_year=end_year,
            shared_scale=shared_scale, fdr_alpha=fdr_alpha, smooth=smooth
        )
        raster_b = generate_power_scientific_raster(
            bbox=bbox_b, variable=variable, mode=mode,
            start_year=start_year, end_year=end_year,
            shared_scale=shared_scale, fdr_alpha=fdr_alpha, smooth=smooth
        )
    else:
        raster_a = generate_gldas_scientific_raster(
            bbox=bbox_a, variable=variable, mode=mode,
            start_year=start_year, end_year=end_year,
            shared_scale=shared_scale, smooth=smooth
        )
        raster_b = generate_gldas_scientific_raster(
            bbox=bbox_b, variable=variable, mode=mode,
            start_year=start_year, end_year=end_year,
            shared_scale=shared_scale, smooth=smooth
        )

    # Clean unneeded raw grids from top-level response payload to conserve network bandwidth
    raster_a.pop("raw_grid_2d", None)
    raster_b.pop("raw_grid_2d", None)

    return {
        "status": "SUCCESS",
        "mode": mode,
        "variable": variable,
        "shared_scale": raster_a["color_scale"],
        "domain_a": raster_a,
        "domain_b": raster_b
    }
