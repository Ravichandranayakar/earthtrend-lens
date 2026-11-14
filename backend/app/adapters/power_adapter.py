import requests
import json
from pathlib import Path
from typing import Dict, Any, List
from app.adapters.base import BaseDatasetAdapter
from app.core.config import settings

class NASAPowerAdapter(BaseDatasetAdapter):
    """
    Adapter for NASA Langley POWER Monthly API (MERRA-2 atmospheric reanalysis).
    Provides rapid time-series for T2M (Temperature) and PRECTOTCORR (Precipitation).
    """

    def get_metadata(self) -> Dict[str, Any]:
        return {
            "source_id": "NASA_POWER_MERRA2",
            "provider": "NASA Langley Research Center",
            "reanalysis_engine": "Modern-Era Retrospective analysis for Research and Applications, Version 2 (MERRA-2)",
            "variables": {
                "T2M": {
                    "name": "Temperature at 2 Meters",
                    "unit": "°C",
                    "description": "Near-surface ambient air temperature"
                },
                "PRECTOTCORR": {
                    "name": "Precipitation Corrected",
                    "unit": "mm/day",
                    "description": "Bias-corrected total land surface precipitation"
                }
            }
        }

    def fetch_regional_timeseries(
        self,
        bbox: List[float],
        start_year: int = 2000,
        end_year: int = 2024,
        variable: str = "T2M"
    ) -> Dict[str, Any]:
        """
        Queries NASA POWER API for area-representative coordinate (centroid of bbox).
        bbox: [min_lat, max_lat, min_lon, max_lon]
        """
        min_lat, max_lat, min_lon, max_lon = bbox
        centroid_lat = round((min_lat + max_lat) / 2.0, 4)
        centroid_lon = round((min_lon + max_lon) / 2.0, 4)
        
        # Check cache first
        cache_key = f"power_{variable}_{centroid_lat}_{centroid_lon}_{start_year}_{end_year}.json"
        cache_file = settings.CACHE_DIR / cache_key
        
        if cache_file.exists():
            try:
                with open(cache_file, "r") as f:
                    return json.load(f)
            except Exception:
                pass

        url = "https://power.larc.nasa.gov/api/temporal/monthly/point"
        params = {
            "parameters": variable,
            "community": "RE",
            "longitude": centroid_lon,
            "latitude": centroid_lat,
            "start": start_year,
            "end": end_year,
            "format": "JSON"
        }

        response = requests.get(url, params=params, timeout=15)
        response.raise_for_status()
        raw_data = response.json()

        param_dict = raw_data.get("properties", {}).get("parameter", {}).get(variable, {})
        
        dates: List[str] = []
        values: List[float] = []

        # Sort chronological keys (e.g., '200001', '200002', ..., '200013')
        # Month '13' in NASA POWER is annual average; filter it out to preserve monthly cycles.
        for yyyymm, val in sorted(param_dict.items()):
            if len(yyyymm) == 6 and not yyyymm.endswith("13"):
                yyyy = yyyymm[:4]
                mm = yyyymm[4:]
                # NASA POWER fill value is often -999.0
                if val is not None and val > -900:
                    dates.append(f"{yyyy}-{mm}-01")
                    values.append(float(val))

        result = {
            "source": "NASA_POWER_MERRA2",
            "variable": variable,
            "unit": "°C" if variable == "T2M" else "mm/day",
            "centroid": [centroid_lat, centroid_lon],
            "bbox": bbox,
            "dates": dates,
            "values": values
        }

        # Cache locally
        settings.CACHE_DIR.mkdir(parents=True, exist_ok=True)
        try:
            with open(cache_file, "w") as f:
                json.dump(result, f)
        except Exception:
            pass

        return result

    def fetch_regional_spatial_grid(
        self,
        bbox: List[float],
        start_year: int = 2000,
        end_year: int = 2024,
        variable: str = "T2M"
    ) -> Dict[str, Any]:
        """
        Retrieves real 2D spatial grid time-series from NASA POWER Monthly Regional API
        (derived from GMAO MERRA-2 and GEOS-IT).
        bbox: [min_lat, max_lat, min_lon, max_lon]
        Returns a structured spatial dataset conforming to the Common Spatial Data Contract.
        """
        import numpy as np

        min_lat, max_lat, min_lon, max_lon = [round(float(c), 3) for c in bbox]

        # 1. Check local persistent cache
        cache_key = f"power_grid_{variable}_{min_lat}_{max_lat}_{min_lon}_{max_lon}_{start_year}_{end_year}.json"
        cache_file = settings.CACHE_DIR / cache_key
        if cache_file.exists():
            try:
                with open(cache_file, "r") as f:
                    return json.load(f)
            except Exception:
                pass

        # 2. Partition bounding box if span is large (NASA regional API is optimal up to ~5° x 6°)
        lat_span = max_lat - min_lat
        lon_span = max_lon - min_lon

        lat_step_tile = 4.0
        lon_step_tile = 5.0

        lat_tiles = []
        cur_lat = min_lat
        while cur_lat < max_lat:
            next_lat = min(cur_lat + lat_step_tile, max_lat)
            lat_tiles.append((cur_lat, next_lat))
            cur_lat = next_lat

        lon_tiles = []
        cur_lon = min_lon
        while cur_lon < max_lon:
            next_lon = min(cur_lon + lon_step_tile, max_lon)
            lon_tiles.append((cur_lon, next_lon))
            cur_lon = next_lon

        url = "https://power.larc.nasa.gov/api/temporal/monthly/regional"
        all_features_by_coord: Dict[str, Dict[str, Any]] = {}

        import concurrent.futures

        tile_coords_list = [
            (t_lat_min, t_lat_max, t_lon_min, t_lon_max)
            for t_lat_min, t_lat_max in lat_tiles
            for t_lon_min, t_lon_max in lon_tiles
        ]

        def _fetch_single_tile(coords_tuple):
            t_lat_min, t_lat_max, t_lon_min, t_lon_max = coords_tuple
            p = {
                "parameters": variable,
                "community": "RE",
                "latitude-min": t_lat_min,
                "latitude-max": t_lat_max,
                "longitude-min": t_lon_min,
                "longitude-max": t_lon_max,
                "start": start_year,
                "end": end_year,
                "format": "JSON"
            }
            try:
                resp = requests.get(url, params=p, timeout=30)
                resp.raise_for_status()
                return resp.json().get("features", [])
            except Exception:
                return []

        with concurrent.futures.ThreadPoolExecutor(max_workers=8) as executor:
            tile_results = executor.map(_fetch_single_tile, tile_coords_list)
            for features in tile_results:
                for f in features:
                    coords = f.get("geometry", {}).get("coordinates", [])
                    if len(coords) >= 2:
                        clon = round(float(coords[0]), 4)
                        clat = round(float(coords[1]), 4)
                        coord_key = f"{clat}_{clon}"
                        if coord_key not in all_features_by_coord:
                            all_features_by_coord[coord_key] = f

        if not all_features_by_coord:
            raise RuntimeError(f"NASA POWER regional spatial query returned 0 features for bbox {bbox}.")

        # 3. Extract and sort unique spatial coordinates
        unique_lats = sorted(list(set(round(float(f["geometry"]["coordinates"][1]), 4) for f in all_features_by_coord.values())))
        unique_lons = sorted(list(set(round(float(f["geometry"]["coordinates"][0]), 4) for f in all_features_by_coord.values())))

        lat_step = round(float(np.median(np.diff(unique_lats))), 4) if len(unique_lats) > 1 else 0.5
        lon_step = round(float(np.median(np.diff(unique_lons))), 4) if len(unique_lons) > 1 else 0.625

        # 4. Extract time index from first available cell
        first_feat = next(iter(all_features_by_coord.values()))
        param_data = first_feat.get("properties", {}).get("parameter", {}).get(variable, {})
        # Filter month 13 (annual mean)
        time_keys = sorted([k for k in param_data.keys() if len(k) == 6 and not k.endswith("13")])

        # 5. Build structured cell records and 2D temporal mean grid
        cells = []
        lat_idx_map = {lat: i for i, lat in enumerate(unique_lats)}
        lon_idx_map = {lon: j for j, lon in enumerate(unique_lons)}

        # Preallocate 2D arrays
        mean_grid = np.full((len(unique_lats), len(unique_lons)), np.nan)
        cell_time_series: Dict[str, List[float]] = {}

        for coord_key, f in all_features_by_coord.items():
            clon = round(float(f["geometry"]["coordinates"][0]), 4)
            clat = round(float(f["geometry"]["coordinates"][1]), 4)
            
            p_dict = f.get("properties", {}).get("parameter", {}).get(variable, {})
            monthly_series = []
            for tk in time_keys:
                val = p_dict.get(tk)
                if val is not None and val > -900:
                    monthly_series.append(float(val))
                else:
                    monthly_series.append(np.nan)

            valid_vals = [v for v in monthly_series if not np.isnan(v)]
            cell_mean = float(np.mean(valid_vals)) if valid_vals else np.nan

            i = lat_idx_map.get(clat)
            j = lon_idx_map.get(clon)
            if i is not None and j is not None:
                mean_grid[i, j] = cell_mean

            cell_key = f"{clat}_{clon}"
            cell_time_series[cell_key] = monthly_series

            half_lat = lat_step / 2.0
            half_lon = lon_step / 2.0
            cells.append({
                "lat": clat,
                "lon": clon,
                "bounds": [round(clat - half_lat, 4), round(clat + half_lat, 4), round(clon - half_lon, 4), round(clon + half_lon, 4)],
                "period_mean": round(cell_mean, 2) if not np.isnan(cell_mean) else None,
                "valid_months": len(valid_vals),
                "total_months": len(time_keys)
            })

        units = "°C" if variable == "T2M" else ("mm/day" if variable == "PRECTOTCORR" else "1")
        long_name = "Near-Surface Air Temperature (2m)" if variable == "T2M" else ("Bias-Corrected Precipitation" if variable == "PRECTOTCORR" else "Root-Zone Soil Wetness Fraction")

        result = {
            "dataset_id": "NASA_POWER_MERRA2",
            "source_provenance": "NASA Langley POWER (Derived from GMAO MERRA-2, with GEOS-IT continuation)",
            "variable": variable,
            "long_name": long_name,
            "unit": units,
            "bbox": [min_lat, max_lat, min_lon, max_lon],
            "lats": unique_lats,
            "lons": unique_lons,
            "lat_step": lat_step,
            "lon_step": lon_step,
            "native_resolution": f"{lat_step}° × {lon_step}°",
            "time_steps": time_keys,
            "time_range": [start_year, end_year],
            "total_cells": len(cells),
            "grid_dimensions": [len(unique_lats), len(unique_lons)],
            "cells": cells,
            "cell_time_series": cell_time_series,
            "leaflet_bounds": [
                [round(min(unique_lats) - lat_step / 2.0, 4), round(min(unique_lons) - lon_step / 2.0, 4)],
                [round(max(unique_lats) + lat_step / 2.0, 4), round(max(unique_lons) + lon_step / 2.0, 4)]
            ]
        }

        # Cache locally
        settings.CACHE_DIR.mkdir(parents=True, exist_ok=True)
        try:
            with open(cache_file, "w") as f:
                json.dump(result, f)
        except Exception:
            pass

        return result
