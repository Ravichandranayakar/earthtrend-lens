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
