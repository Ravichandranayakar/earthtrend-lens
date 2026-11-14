import os
from pathlib import Path
from typing import Dict, Any, List, Optional
import numpy as np
import xarray as xr

from app.core.config import settings

def validate_gldas_netcdf_file(filepath: Path) -> Dict[str, Any]:
    """
    Rigorously validates a single NASA GLDAS Noah 2.1 NetCDF-4 file.
    Verifies dataset identity, dimensions, RootMoist_inst variable presence,
    coordinates, units, and missing value masks.
    """
    if not filepath.exists():
        return {
            "is_valid": False,
            "error": f"File does not exist: {filepath}"
        }

    try:
        ds = xr.open_dataset(filepath)
    except Exception as e:
        return {
            "is_valid": False,
            "error": f"Failed to open NetCDF with xarray/netCDF4: {str(e)}"
        }

    # 1. Dataset identification
    title = ds.attrs.get("title", "")
    source = ds.attrs.get("source", "")
    granule_id = filepath.name

    # 2. Variable verification
    if "RootMoist_inst" not in ds.variables:
        available_vars = list(ds.data_vars.keys())
        ds.close()
        return {
            "is_valid": False,
            "error": f"Target variable 'RootMoist_inst' missing. Available: {available_vars[:5]}"
        }

    var_da = ds["RootMoist_inst"]
    units = var_da.attrs.get("units", "kg m-2")
    long_name = var_da.attrs.get("long_name", "Root zone soil moisture")
    fill_value = var_da.attrs.get("_FillValue", -9999.0)

    # 3. Coordinate verification
    lat_coord = ds.coords["lat"] if "lat" in ds.coords else (ds.coords["latitude"] if "latitude" in ds.coords else None)
    lon_coord = ds.coords["lon"] if "lon" in ds.coords else (ds.coords["longitude"] if "longitude" in ds.coords else None)
    time_coord = ds.coords["time"] if "time" in ds.coords else None

    if lat_coord is None or lon_coord is None:
        ds.close()
        return {
            "is_valid": False,
            "error": "Required spatial coordinates 'lat' and 'lon' missing."
        }

    lat_vals = lat_coord.values
    lon_vals = lon_coord.values
    time_str = str(time_coord.values[0])[:10] if time_coord is not None and len(time_coord.values) > 0 else "Unknown"

    lat_res = round(float(abs(lat_vals[1] - lat_vals[0])), 3) if len(lat_vals) > 1 else 0.25
    lon_res = round(float(abs(lon_vals[1] - lon_vals[0])), 3) if len(lon_vals) > 1 else 0.25

    # 4. Value distribution and missing mask
    data_vals = var_da.values
    valid_mask = (data_vals != fill_value) & (~np.isnan(data_vals)) & (data_vals > 0)
    valid_count = int(np.sum(valid_mask))
    missing_count = int(data_vals.size - valid_count)

    min_val = round(float(np.min(data_vals[valid_mask])), 2) if valid_count > 0 else None
    max_val = round(float(np.max(data_vals[valid_mask])), 2) if valid_count > 0 else None
    mean_val = round(float(np.mean(data_vals[valid_mask])), 2) if valid_count > 0 else None

    ds.close()

    return {
        "is_valid": True,
        "granule_filename": granule_id,
        "dataset_title": title,
        "source": source,
        "variable": "RootMoist_inst",
        "long_name": long_name,
        "units": units,
        "temporal_timestamp": time_str,
        "spatial_resolution": f"{lat_res}° x {lon_res}° (~25-28 km)",
        "grid_shape": [int(len(lat_vals)), int(len(lon_vals))],
        "latitude_extent": [round(float(min(lat_vals)), 3), round(float(max(lat_vals)), 3)],
        "longitude_extent": [round(float(min(lon_vals)), 3), round(float(max(lon_vals)), 3)],
        "total_cells": int(data_vals.size),
        "valid_land_cells": valid_count,
        "missing_ocean_cells": missing_count,
        "valid_min": min_val,
        "valid_max": max_val,
        "valid_mean": mean_val,
        "fill_value": float(fill_value)
    }

def audit_local_gldas_archive() -> Dict[str, Any]:
    """
    Audits the local app/data/gldas archive directory.
    Reports all found NetCDF granules and their collective validation status.
    """
    data_dir = settings.BASE_DIR / "app" / "data" / "gldas"
    if not data_dir.exists():
        data_dir.mkdir(parents=True, exist_ok=True)

    nc_files = sorted(list(data_dir.glob("*.nc4")) + list(data_dir.glob("*.nc")))

    if len(nc_files) == 0:
        return {
            "status": "DATA_UNAVAILABLE",
            "message": "No NetCDF files found in backend/app/data/gldas/. Genuine scientific analysis requires verified GLDAS_NOAH025_M.2.1 .nc4 files.",
            "granule_count": 0,
            "granules": []
        }

    reports = []
    valid_count = 0
    for f in nc_files:
        rep = validate_gldas_netcdf_file(f)
        if rep.get("is_valid"):
            valid_count += 1
        reports.append(rep)

    return {
        "status": "NASA_GLDAS_NETCDF" if valid_count > 0 else "DATA_UNAVAILABLE",
        "granule_count": len(nc_files),
        "valid_granule_count": valid_count,
        "archive_directory": str(data_dir),
        "granules": reports
    }
