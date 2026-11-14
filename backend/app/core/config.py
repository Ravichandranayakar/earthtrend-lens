from pathlib import Path
from typing import Dict, Any, List
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "EarthTrend Lens"
    PROJECT_DESCRIPTION: str = "Forensic Earth-System Trend Detective & Spatial Polarity Engine"
    API_V1_PREFIX: str = "/api/v1"
    
    # Paths
    BASE_DIR: Path = Path(__file__).resolve().parent.parent.parent
    CACHE_DIR: Path = BASE_DIR / "app" / "cache"
    
    # Official Presets for NASA Space Apps Judging Demonstration
    PRESETS: Dict[str, Dict[str, Any]] = {
        "case_01_europe": {
            "id": "case_01_europe",
            "title": "European Hydrological Polarity",
            "variable": "T2M",
            "secondary_variable": "PRECTOTCORR",
            "soil_variable": "RootMoist_inst",
            "timeframe": [2000, 2024],
            "narrative": "Global warming drives severe summer soil drying and heat in Mediterranean Iberia, while high-latitude Scandinavia experiences increased precipitation and moisture retention.",
            "region_a": {
                "id": "iberia",
                "name": "Iberian Peninsula (Southern Europe)",
                "expected_trend": "DRYING / HEATING",
                "bbox": [36.0, 42.0, -9.0, 3.0]  # [min_lat, max_lat, min_lon, max_lon]
            },
            "region_b": {
                "id": "scandinavia",
                "name": "Southern Scandinavia (Northern Europe)",
                "expected_trend": "WETTING / HIGH MOISTURE",
                "bbox": [58.0, 66.0, 10.0, 22.0]
            }
        },
        "case_02_north_america": {
            "id": "case_02_north_america",
            "title": "North American Megadrought vs Great Lakes Wetting",
            "variable": "T2M",
            "secondary_variable": "PRECTOTCORR",
            "soil_variable": "RootMoist_inst",
            "timeframe": [2000, 2024],
            "narrative": "The American Southwest suffers structural groundwater and soil moisture depletion in the Colorado Basin, contrasting with intensified humid storm tracks in the Great Lakes basin.",
            "region_a": {
                "id": "colorado_basin",
                "name": "Colorado Basin / US Southwest",
                "expected_trend": "CHRONIC DRYING",
                "bbox": [32.0, 40.0, -115.0, -105.0]
            },
            "region_b": {
                "id": "great_lakes",
                "name": "Great Lakes / US Northeast",
                "expected_trend": "INCREASING MOISTURE",
                "bbox": [41.0, 48.0, -85.0, -72.0]
            }
        },
        "case_03_global": {
            "id": "case_03_global",
            "title": "Sahel Aridification vs Boreal Polar Wetting",
            "variable": "PRECTOTCORR",
            "secondary_variable": "T2M",
            "soil_variable": "RootMoist_inst",
            "timeframe": [2000, 2024],
            "narrative": "Contrasting tropical arid expansion in Sub-Saharan West Africa against Arctic amplification and enhanced hydrological cycling in Siberian Boreal forests.",
            "region_a": {
                "id": "sahel",
                "name": "Western Sahel (Africa)",
                "expected_trend": "VARIABLE ARIDITY",
                "bbox": [12.0, 18.0, -15.0, 10.0]
            },
            "region_b": {
                "id": "siberia",
                "name": "Boreal Siberia (Eurasia)",
                "expected_trend": "ACCELERATED WARMING & PERMAFROST THAW",
                "bbox": [55.0, 65.0, 60.0, 90.0]
            }
        }
    }

settings = Settings()
