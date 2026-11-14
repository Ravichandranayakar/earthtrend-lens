from pathlib import Path
from typing import Dict, Any, List
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "EarthTrend Lens"
    PROJECT_DESCRIPTION: str = "Forensic Earth-System Trend Detective & Scientific Investigation Workbench"
    API_V1_PREFIX: str = "/api/v1"
    
    BASE_DIR: Path = Path(__file__).resolve().parent.parent.parent
    CACHE_DIR: Path = BASE_DIR / "app" / "cache"
    
    # Scientific Variables Catalog
    VARIABLES_CATALOG: Dict[str, Dict[str, Any]] = {
        "RootMoist_inst": {
            "id": "RootMoist_inst",
            "name": "Root Zone Soil Moisture",
            "category": "Land Hydrology",
            "dataset_id": "GLDAS_NOAH025_M_2.1",
            "dataset_name": "NASA GLDAS Noah Land Surface Model 2.1",
            "provider": "NASA GES DISC",
            "unit": "kg/m²",
            "spatial_resolution": "0.25° (~25-28 km)",
            "temporal_resolution": "Monthly",
            "available_range": [2000, 2024],
            "description": "Estimated plant-accessible moisture stored within the root zone. Critical indicator for multi-decadal drought and agricultural water stress.",
            "scientific_caveats": "Root-zone depth in the Noah Land Surface Model is parameterized dynamically by vegetation land-cover type, not a fixed 0-100 cm depth."
        },
        "SoilMoi0_10cm_inst": {
            "id": "SoilMoi0_10cm_inst",
            "name": "Surface Topsoil Moisture",
            "category": "Land Hydrology",
            "dataset_id": "GLDAS_NOAH025_M_2.1",
            "dataset_name": "NASA GLDAS Noah Land Surface Model 2.1",
            "provider": "NASA GES DISC",
            "unit": "kg/m²",
            "spatial_resolution": "0.25° (~25-28 km)",
            "temporal_resolution": "Monthly",
            "available_range": [2000, 2024],
            "description": "Moisture content in the uppermost 0-10 cm layer of the soil column. Directly governs latent heat flux and surface evaporation.",
            "scientific_caveats": "Subject to high-frequency weather oscillations and rapid daytime evaporative losses."
        },
        "T2M": {
            "id": "T2M",
            "name": "Near-Surface Air Temperature (2m)",
            "category": "Atmospheric Reanalysis",
            "dataset_id": "NASA_POWER_MERRA2",
            "dataset_name": "NASA POWER / MERRA-2 Atmospheric Reanalysis",
            "provider": "NASA Langley Research Center",
            "unit": "°C",
            "spatial_resolution": "0.5° x 0.625°",
            "temporal_resolution": "Monthly",
            "available_range": [1981, 2024],
            "description": "Ambient air temperature at 2 meters above the ground surface. Fundamental metric for monitoring atmospheric thermal expansion and regional warming.",
            "scientific_caveats": "Derived from global numerical data assimilation combining satellite and ground weather station observations."
        },
        "PRECTOTCORR": {
            "id": "PRECTOTCORR",
            "name": "Bias-Corrected Total Precipitation",
            "category": "Atmospheric Reanalysis",
            "dataset_id": "NASA_POWER_MERRA2",
            "dataset_name": "NASA POWER / MERRA-2 Atmospheric Reanalysis",
            "provider": "NASA Langley Research Center",
            "unit": "mm/day",
            "spatial_resolution": "0.5° x 0.625°",
            "temporal_resolution": "Monthly",
            "available_range": [1981, 2024],
            "description": "Estimated total rainfall and snowfall arriving at the surface, bias-corrected using ground precipitation networks.",
            "scientific_caveats": "Convective storm precipitation in mountainous and tropical regimes carries higher uncertainty."
        }
    }
    
    # Curated Regional Case Studies for NASA Demonstration
    PRESETS: Dict[str, Dict[str, Any]] = {
        "case_01_europe": {
            "id": "case_01_europe",
            "title": "European Hydrological Polarity",
            "variable": "RootMoist_inst",
            "dataset": "GLDAS",
            "timeframe": [2000, 2024],
            "narrative": "Under the same continental warming forcing, Southern Europe (Iberian Peninsula) experiences multi-decadal root-zone desiccation, while Northern Europe (Scandinavia) experiences accelerated moisture retention and runoff.",
            "region_a": {
                "id": "iberia",
                "name": "Iberian Peninsula (Southern Europe)",
                "expected_trend": "STATISTICALLY_SIGNIFICANT_DECREASING",
                "bbox": [36.0, 42.0, -9.0, 3.0]
            },
            "region_b": {
                "id": "scandinavia",
                "name": "Southern Scandinavia (Northern Europe)",
                "expected_trend": "STATISTICALLY_SIGNIFICANT_INCREASING",
                "bbox": [58.0, 66.0, 10.0, 22.0]
            }
        },
        "case_02_north_america": {
            "id": "case_02_north_america",
            "title": "North American Megadrought vs Great Lakes Wetting",
            "variable": "RootMoist_inst",
            "dataset": "GLDAS",
            "timeframe": [2000, 2024],
            "narrative": "The American Southwest suffers structural groundwater and root moisture depletion across the Colorado Basin, contrasting with intensified humid storm tracks and moisture accumulation in the Great Lakes basin.",
            "region_a": {
                "id": "colorado_basin",
                "name": "Colorado Basin / US Southwest",
                "expected_trend": "STATISTICALLY_SIGNIFICANT_DECREASING",
                "bbox": [32.0, 40.0, -115.0, -105.0]
            },
            "region_b": {
                "id": "great_lakes",
                "name": "Great Lakes / US Northeast",
                "expected_trend": "STATISTICALLY_SIGNIFICANT_INCREASING",
                "bbox": [41.0, 48.0, -85.0, -72.0]
            }
        },
        "case_03_global": {
            "id": "case_03_global",
            "title": "Sahel Aridification vs Boreal Arctic Wetting",
            "variable": "PRECTOTCORR",
            "dataset": "NASA_POWER",
            "timeframe": [2000, 2024],
            "narrative": "Contrasting tropical arid belt vulnerability in Sub-Saharan West Africa against Arctic amplification and accelerated hydrological cycling in Siberian Boreal forests.",
            "region_a": {
                "id": "sahel",
                "name": "Western Sahel (Africa)",
                "expected_trend": "DRYING / VARIABILITY",
                "bbox": [12.0, 18.0, -15.0, 10.0]
            },
            "region_b": {
                "id": "siberia",
                "name": "Boreal Siberia (Eurasia)",
                "expected_trend": "WETTING / ACCELERATED THAW",
                "bbox": [55.0, 65.0, 60.0, 90.0]
            }
        }
    }

settings = Settings()
