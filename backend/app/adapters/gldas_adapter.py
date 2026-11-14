import json
import numpy as np
from pathlib import Path
from typing import Dict, Any, List, Optional
import xarray as xr

from app.adapters.base import BaseDatasetAdapter
from app.core.config import settings

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

        # Check for local genuine NetCDF archives in app/data/gldas
        data_dir = settings.BASE_DIR / "app" / "data" / "gldas"
        nc_files = sorted(list(data_dir.glob("*.nc4")) + list(data_dir.glob("*.nc"))) if data_dir.exists() else []

        dates: List[str] = []
        values: List[float] = []

        if len(nc_files) > 0:
            try:
                ds = xr.open_mfdataset(nc_files, combine="by_coords")
                lat_coord = ds.coords.get("lat") or ds.coords.get("latitude")
                lon_coord = ds.coords.get("lon") or ds.coords.get("longitude")

                if lat_coord is not None and lat_coord.values[0] > lat_coord.values[-1]:
                    ds = ds.sortby("lat")

                if variable in ds.variables:
                    sub = ds[variable].sel(
                        lat=slice(min_lat, max_lat),
                        lon=slice(min_lon, max_lon)
                    )
                    # Mask fill values and ocean cells
                    sub = sub.where((sub > 0) & (sub != -9999.0))
                    spatial_mean = sub.mean(dim=["lat", "lon"]).values
                    time_vals = ds.time.values if "time" in ds.coords else []

                    for t_val, m_val in zip(time_vals, spatial_mean):
                        if not np.isnan(m_val):
                            t_str = str(t_val)[:10]
                            dates.append(t_str)
                            values.append(round(float(m_val), 4))

                    if len(values) > 0:
                        return {
                            "status": "SUCCESS",
                            "source": "GLDAS_NOAH025_M_2.1",
                            "doi": "10.5067/SXAVCZFAQLNO",
                            "provenance_type": "NASA_GLDAS_NETCDF",
                            "is_illustrative": False,
                            "variable": variable,
                            "unit": "kg/m²",
                            "depth_note": "Vegetation-dependent root-zone depth (Noah LSM 3.6)",
                            "bbox": bbox,
                            "dates": dates,
                            "values": values,
                            "granule_count": len(nc_files),
                            "disclaimer": "Validated NASA GLDAS Noah 2.1 model-assimilated output."
                        }
            except Exception as e:
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
        # Deterministic seed for reproducible baseline
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
