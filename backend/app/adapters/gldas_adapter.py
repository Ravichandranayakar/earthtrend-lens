import os
import json
import time
import requests
import concurrent.futures
from pathlib import Path
from typing import Dict, Any, List, Optional, Tuple
import numpy as np
import xarray as xr
from dotenv import load_dotenv

from app.adapters.base import BaseDatasetAdapter
from app.core.config import settings

load_dotenv(settings.BASE_DIR / ".env")

def compute_vectorized_theil_sen(annual_3d: np.ndarray, years: List[int]) -> np.ndarray:
    """
    Computes Theil-Sen median slopes across all spatial grid cells simultaneously using vectorized NumPy operations.
    annual_3d: (n_years, n_lats, n_lons)
    years: list of integer years
    Returns: (n_lats, n_lons) array of Theil-Sen slopes in (units)/year.
    """
    n_years, n_lats, n_lons = annual_3d.shape
    years_arr = np.array(years, dtype=float)
    i_idx, j_idx = np.triu_indices(n_years, k=1)
    
    # Reshape annual_3d to (n_years, n_cells)
    cells_2d = annual_3d.reshape(n_years, -1)
    dy = cells_2d[j_idx, :] - cells_2d[i_idx, :]
    dt = (years_arr[j_idx] - years_arr[i_idx])[:, None]
    
    pair_slopes = dy / dt
    median_slopes = np.nanmedian(pair_slopes, axis=0)
    return median_slopes.reshape(n_lats, n_lons)

def fetch_single_gldas_subset(
    granule_id: str,
    lat_indices: Tuple[int, int],
    lon_indices: Tuple[int, int],
    variable: str,
    out_file: Path,
    token: Optional[str] = None
) -> Optional[Path]:
    """Downloads a single monthly spatial subset from NASA Earthdata Cloud OPeNDAP."""
    if out_file.exists() and out_file.stat().st_size > 3000:
        return out_file

    lat_min, lat_max = lat_indices
    lon_min, lon_max = lon_indices
    headers = {"Authorization": f"Bearer {token}"} if token else {}

    base_url = f"https://opendap.earthdata.nasa.gov/collections/C1342986036-GES_DISC/granules/GLDAS_NOAH025_M.2.1%3A{granule_id}.nc4"
    query = f"?{variable}[0:1:0][{lat_min}:1:{lat_max}][{lon_min}:1:{lon_max}],lat[{lat_min}:1:{lat_max}],lon[{lon_min}:1:{lon_max}],time"
    url = base_url + query

    for attempt in range(3):
        try:
            resp = requests.get(url, headers=headers, timeout=25)
            if resp.status_code == 200 and len(resp.content) > 3000:
                with open(out_file, "wb") as f:
                    f.write(resp.content)
                return out_file
            elif resp.status_code == 404:
                return None
        except Exception:
            time.sleep(0.4)
    return None

class GLDASAdapter(BaseDatasetAdapter):
    """
    Adapter for NASA GLDAS Noah 2.1 Land Surface Model Monthly (0.25 deg).
    Target Variable: RootMoist_inst (Root Zone Soil Moisture).
    
    Enforces strict provenance validation:
    - NASA_GLDAS_NETCDF: Verified genuine NetCDF data.
    - DATA_UNAVAILABLE: Returned when real NetCDF archives are missing.
    - ILLUSTRATIVE_BASELINE: Strictly isolated simulation for offline development.
    """

    def get_metadata(self) -> Dict[str, Any]:
        return {
            "source_id": "GLDAS_NOAH025_M_2.1",
            "doi": "10.5067/SXAVCZFAQLNO",
            "provider": "NASA Goddard Earth Sciences Data and Information Services Center (GES DISC)",
            "land_surface_model": "Noah Land Surface Model Version 3.6",
            "variables": {
                "RootMoist_inst": {
                    "name": "Root Zone Soil Moisture",
                    "unit": "kg/m²",
                    "depth_profile": "Vegetation-dependent root-zone profile (Noah LSM 3.6 parameterization)",
                    "description": "Total liquid and frozen soil moisture available in the root zone for plant transpiration"
                },
                "SoilMoi0_10cm_inst": {
                    "name": "Surface Topsoil Moisture",
                    "unit": "kg/m²",
                    "depth_profile": "Fixed topsoil layer 0 to 10 cm",
                    "description": "Topsoil layer moisture governing sensible/latent heat exchange"
                }
            }
        }

    def fetch_regional_timeseries(
        self,
        bbox: List[float],
        start_year: int = 2000,
        end_year: int = 2024,
        variable: str = "RootMoist_inst",
        allow_illustrative: bool = False
    ) -> Dict[str, Any]:
        """
        Retrieves root zone soil moisture time series for the target bounding box.
        Only returns verified NASA NetCDF data unless allow_illustrative is explicitly True.
        """
        min_lat, max_lat, min_lon, max_lon = bbox

        # Check for local genuine NetCDF archives in app/data/gldas (including subsets)
        data_dir = settings.BASE_DIR / "app" / "data" / "gldas"
        nc_files = []
        if data_dir.exists():
            nc_files = sorted(list(data_dir.glob("*.nc4")) + list(data_dir.rglob("gldas_sub_*.nc4")))

        dates: List[str] = []
        values: List[float] = []

        if len(nc_files) > 0:
            try:
                # If we have pre-fetched spatial grid, use its time series
                grid = self.fetch_gldas_spatial_grid(bbox, start_year, end_year, variable)
                if grid.get("status") == "SUCCESS":
                    return {
                        "status": "SUCCESS",
                        "source": "GLDAS_NOAH025_M_2.1",
                        "doi": "10.5067/SXAVCZFAQLNO",
                        "provenance_type": "NASA_GLDAS_NETCDF",
                        "is_illustrative": False,
                        "variable": variable,
                        "unit": "kg/m²",
                        "depth_note": "Vegetation-dependent root-zone depth (Noah LSM 3.6 parameterization; absolute totals reflect vegetation class rather than standardized physical depth)",
                        "bbox": bbox,
                        "dates": grid.get("time_steps", []),
                        "values": grid.get("domain_monthly_means", []),
                        "granule_count": grid.get("granules_count", len(nc_files)),
                        "disclaimer": "NASA GLDAS Noah 2.1 model-derived root-zone soil-moisture estimates."
                    }
            except Exception:
                pass

        # If genuine NetCDF files are absent
        if not allow_illustrative:
            return {
                "status": "DATA_UNAVAILABLE",
                "source": "GLDAS_NOAH025_M_2.1",
                "doi": "10.5067/SXAVCZFAQLNO",
                "provenance_type": "DATA_UNAVAILABLE",
                "is_illustrative": False,
                "variable": variable,
                "unit": "kg/m²",
                "bbox": bbox,
                "dates": [],
                "values": [],
                "error": (
                    "NASA GLDAS NetCDF archives not found in app/data/gldas/. "
                    "Genuine scientific analysis requires verified GLDAS_NOAH025_M.2.1 NetCDF files. "
                    "Place downloaded .nc4 files into backend/app/data/gldas/ or configure EARTHDATA_TOKEN."
                )
            }

        # Explicitly isolated illustrative baseline (Development / demo only)
        years = list(range(start_year, end_year + 1))
        total_months = len(years) * 12
        t_steps = np.arange(total_months)

        centroid_lat = (min_lat + max_lat) / 2.0
        base_moisture = 220.0 - 50.0 * np.cos(np.radians(centroid_lat))

        if centroid_lat > 50:
            trend_slope = +0.015
        elif 10 < centroid_lat < 45 and min_lon < 40:
            trend_slope = -0.022
        else:
            trend_slope = -0.005

        seasonal_amplitude = 25.0
        rng = np.random.RandomState(42)
        noise = rng.normal(0, 2.5, total_months)

        simulated_values = (
            base_moisture
            + trend_slope * t_steps
            + seasonal_amplitude * np.sin(2 * np.pi * t_steps / 12.0)
            + noise
        )

        for y in years:
            for m in range(1, 13):
                idx = (y - start_year) * 12 + (m - 1)
                dates.append(f"{y}-{m:02d}-01")
                values.append(round(float(simulated_values[idx]), 4))

        return {
            "status": "ILLUSTRATIVE_DEMO",
            "source": "SIMULATED_NOAH_LSM_3.6_BASELINE",
            "doi": "10.5067/SXAVCZFAQLNO",
            "provenance_type": "ILLUSTRATIVE_BASELINE",
            "is_illustrative": True,
            "variable": variable,
            "unit": "kg/m²",
            "depth_note": "Simulated Noah LSM baseline (Illustrative development model)",
            "bbox": bbox,
            "dates": dates,
            "values": values,
            "disclaimer": "ILLUSTRATIVE ONLY: Simulated baseline derived from Noah LSM 3.6 parameterization. NOT real NASA GLDAS observational output."
        }

    def fetch_gldas_spatial_grid(
        self,
        bbox: List[float],
        start_year: int = 2000,
        end_year: int = 2024,
        variable: str = "RootMoist_inst"
    ) -> Dict[str, Any]:
        """
        Retrieves genuine 2D spatial grid, period mean, and decadal trend for NASA GLDAS Noah 2.1.
        Uses fast local disk cache (.npz) for sub-millisecond retrieval.
        If cache is absent, dynamically queries NASA Earthdata Cloud OPeNDAP for NetCDF subsets.
        """
        min_lat, max_lat, min_lon, max_lon = bbox
        cache_dir = settings.BASE_DIR / "app" / "cache" / "gldas"
        cache_dir.mkdir(parents=True, exist_ok=True)
        cache_slug = f"gldas_{variable}_{round(min_lat,2)}_{round(max_lat,2)}_{round(min_lon,2)}_{round(max_lon,2)}_{start_year}_{end_year}"
        cache_file = cache_dir / f"{cache_slug}.npz"

        if cache_file.exists():
            try:
                data = np.load(cache_file, allow_pickle=True)
                return {
                    "status": "SUCCESS",
                    "provenance_type": "NASA_GLDAS_NETCDF",
                    "source": "GLDAS_NOAH025_M_2.1",
                    "doi": "10.5067/SXAVCZFAQLNO",
                    "variable": variable,
                    "unit": "kg/m²",
                    "bbox": bbox,
                    "lats": data["lats"].tolist(),
                    "lons": data["lons"].tolist(),
                    "leaflet_bounds": data["leaflet_bounds"].tolist(),
                    "period_mean_2d": data["period_mean_2d"],
                    "trend_slope_2d": data["trend_slope_2d"],
                    "valid_mask_2d": data["valid_mask_2d"],
                    "time_steps": data["time_steps"].tolist(),
                    "domain_monthly_means": data["domain_monthly_means"].tolist(),
                    "granules_count": int(data["granules_count"])
                }
            except Exception:
                pass

        # Check existing pre-downloaded folders
        data_dir = settings.BASE_DIR / "app" / "data" / "gldas"
        candidate_folders = [
            ("subsets_iberia", [36.0, 42.0, -9.0, 3.0]),
            ("subsets_scandinavia", [58.0, 66.0, 10.0, 22.0]),
            ("subsets_colorado", [32.0, 40.0, -115.0, -105.0]),
            ("subsets_great_lakes", [41.0, 48.0, -85.0, -72.0])
        ]

        target_dir = None
        for folder_name, folder_bbox in candidate_folders:
            if (abs(min_lat - folder_bbox[0]) <= 2.5 and abs(max_lat - folder_bbox[1]) <= 2.5 and
                abs(min_lon - folder_bbox[2]) <= 2.5 and abs(max_lon - folder_bbox[3]) <= 2.5):
                candidate_path = data_dir / folder_name
                if candidate_path.exists() and len(list(candidate_path.glob("gldas_sub_*.nc4"))) >= 24:
                    target_dir = candidate_path
                    break

        # Calculate coordinate indices for OPeNDAP
        lat_min_idx = max(0, min(599, int(np.floor((min_lat - (-59.875)) / 0.25))))
        lat_max_idx = max(0, min(599, int(np.ceil((max_lat - (-59.875)) / 0.25))))
        lon_min_idx = max(0, min(1439, int(np.floor((min_lon - (-179.875)) / 0.25))))
        lon_max_idx = max(0, min(1439, int(np.ceil((max_lon - (-179.875)) / 0.25))))

        token = os.environ.get("EARTHDATA_TOKEN")

        if target_dir is None:
            # Check 1 sample month first before bulk download
            sample_dir = data_dir / "samples"
            sample_dir.mkdir(parents=True, exist_ok=True)
            sample_file = sample_dir / f"sample_{lat_min_idx}_{lat_max_idx}_{lon_min_idx}_{lon_max_idx}.nc4"
            fetch_single_gldas_subset(
                "GLDAS_NOAH025_M.A202306.021.nc4",
                (lat_min_idx, lat_max_idx),
                (lon_min_idx, lon_max_idx),
                variable,
                sample_file,
                token
            )
            if sample_file.exists():
                try:
                    s_ds = xr.open_dataset(sample_file)
                    s_da = s_ds[variable]
                    s_fill = s_da.attrs.get("_FillValue", -9999.0)
                    s_vals = s_da.values
                    s_ds.close()
                    valid_sample = (s_vals > 0) & (s_vals != s_fill) & (~np.isnan(s_vals))
                    if not np.any(valid_sample):
                        return {
                            "status": "NO_DATA_IN_DOMAIN",
                            "message": "All grid cells within the selected domain are ocean or unobserved (no-data)."
                        }
                except Exception:
                    pass

            target_dir = data_dir / f"subsets_custom_{cache_slug[:32]}"
            target_dir.mkdir(parents=True, exist_ok=True)

        # Ensure all required months exist on disk
        tasks = []
        for y in range(start_year, end_year + 1):
            for m in range(1, 13):
                granule_id = f"GLDAS_NOAH025_M.A{y}{m:02d}.021.nc4"
                sub_file = target_dir / f"gldas_sub_{granule_id}"
                if not sub_file.exists() or sub_file.stat().st_size < 3000:
                    tasks.append((granule_id, sub_file))

        if len(tasks) > 0 and token:
            with concurrent.futures.ThreadPoolExecutor(max_workers=16) as pool:
                futs = [
                    pool.submit(
                        fetch_single_gldas_subset,
                        granule_id,
                        (lat_min_idx, lat_max_idx),
                        (lon_min_idx, lon_max_idx),
                        variable,
                        sub_file,
                        token
                    )
                    for granule_id, sub_file in tasks
                ]
                for f in concurrent.futures.as_completed(futs):
                    f.result()

        files = sorted(list(target_dir.glob("gldas_sub_*.nc4")))
        if len(files) == 0:
            return {
                "status": "DATA_UNAVAILABLE",
                "message": f"NASA GLDAS Noah 2.1 NetCDF granules are not available on disk for bounding box {bbox}. Local verified 2000-2024 archive covers Europe (Iberia, Scandinavia) and North America (Colorado, Great Lakes). Select Temperature (T2M) or Precipitation (POWER) for global landmarks."
            }

        ds = xr.open_mfdataset(files, combine="nested", concat_dim="time")
        lat_coord_name = "lat" if "lat" in ds.coords else "latitude"
        lon_coord_name = "lon" if "lon" in ds.coords else "longitude"

        if ds[lat_coord_name].values[0] > ds[lat_coord_name].values[-1]:
            ds = ds.sortby(lat_coord_name)

        da = ds[variable]
        fill_val = da.attrs.get("_FillValue", -9999.0)
        da_clean = da.where((da != fill_val) & (da > 0))

        lats = da_clean[lat_coord_name].values.astype(float)
        lons = da_clean[lon_coord_name].values.astype(float)

        # 2D Period Mean
        period_mean_2d = da_clean.mean(dim="time").values
        valid_mask_2d = ~np.isnan(period_mean_2d) & (period_mean_2d > 0)

        # Vectorized Annual Theil-Sen Trend Slope
        n_months = len(files)
        vals_3d = da_clean.values  # (n_months, n_lats, n_lons)
        n_years = n_months // 12
        actual_years = list(range(start_year, start_year + n_years))

        if n_years >= 2:
            vals_4d = vals_3d[:n_years * 12].reshape((n_years, 12, vals_3d.shape[1], vals_3d.shape[2]))
            with np.errstate(all="ignore"):
                annual_3d = np.nanmean(vals_4d, axis=1)
            trend_slope_2d = compute_vectorized_theil_sen(annual_3d, actual_years)
            trend_slope_2d[~valid_mask_2d] = np.nan
        else:
            trend_slope_2d = np.zeros_like(period_mean_2d)

        half_res = 0.125
        leaflet_bounds = np.array([
            [round(float(np.min(lats)) - half_res, 4), round(float(np.min(lons)) - half_res, 4)],
            [round(float(np.max(lats)) + half_res, 4), round(float(np.max(lons)) + half_res, 4)]
        ])

        # Monthly time series over domain
        time_steps = []
        domain_monthly_means = []
        for i, f in enumerate(files):
            fname = f.name
            # parse date from gldas_sub_GLDAS_NOAH025_M.AYYYYMM.021.nc4
            try:
                ym_str = fname.split(".A")[1].split(".")[0]
                t_str = f"{ym_str[:4]}-{ym_str[4:6]}-01"
            except Exception:
                t_str = f"T{i}"
            time_steps.append(t_str)
            m_val = np.nanmean(vals_3d[i][valid_mask_2d]) if np.any(valid_mask_2d) else np.nan
            domain_monthly_means.append(round(float(m_val), 4) if not np.isnan(m_val) else 0.0)

        ds.close()

        # Save to fast cache
        np.savez_compressed(
            cache_file,
            lats=lats,
            lons=lons,
            leaflet_bounds=leaflet_bounds,
            period_mean_2d=period_mean_2d,
            trend_slope_2d=trend_slope_2d,
            valid_mask_2d=valid_mask_2d,
            time_steps=np.array(time_steps),
            domain_monthly_means=np.array(domain_monthly_means),
            granules_count=len(files)
        )

        return {
            "status": "SUCCESS",
            "provenance_type": "NASA_GLDAS_NETCDF",
            "source": "GLDAS_NOAH025_M_2.1",
            "doi": "10.5067/SXAVCZFAQLNO",
            "variable": variable,
            "unit": "kg/m²",
            "bbox": bbox,
            "lats": lats.tolist(),
            "lons": lons.tolist(),
            "leaflet_bounds": leaflet_bounds.tolist(),
            "period_mean_2d": period_mean_2d,
            "trend_slope_2d": trend_slope_2d,
            "valid_mask_2d": valid_mask_2d,
            "time_steps": time_steps,
            "domain_monthly_means": domain_monthly_means,
            "granules_count": len(files)
        }
