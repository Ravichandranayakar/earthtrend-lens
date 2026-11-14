from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional

from app.core.config import settings
from app.adapters.power_adapter import NASAPowerAdapter
from app.adapters.gldas_adapter import GLDASAdapter
from app.engine.deseasonalizer import compute_monthly_climatology
from app.engine.stats_engine import compute_mann_kendall_and_sens_slope

router = APIRouter()

power_adapter = NASAPowerAdapter()
gldas_adapter = GLDASAdapter()

class SingleRegionRequest(BaseModel):
    variable: str = Field(default="RootMoist_inst", description="Target variable (RootMoist_inst, T2M, PRECTOTCORR)")
    dataset: str = Field(default="GLDAS", description="Target provider (GLDAS or NASA_POWER)")
    bbox: List[float] = Field(..., description="[min_lat, max_lat, min_lon, max_lon]")
    region_name: Optional[str] = "Selected Region"
    start_year: int = Field(default=2000, ge=1981, le=2024)
    end_year: int = Field(default=2024, ge=2000, le=2024)
    alpha: float = Field(default=0.05, gt=0, lt=1)

class OppositeTrendsRequest(BaseModel):
    preset_id: Optional[str] = None
    variable: str = Field(default="RootMoist_inst")
    region_a_name: str = "Region Alpha"
    region_a_bbox: List[float]
    region_b_name: str = "Region Beta"
    region_b_bbox: List[float]
    start_year: int = 2000
    end_year: int = 2024
    alpha: float = 0.05

def _execute_analysis(bbox: List[float], variable: str, dataset: str, start_year: int, end_year: int, alpha: float):
    # Route to appropriate adapter
    if dataset.upper() == "GLDAS" or variable == "RootMoist_inst":
        raw_data = gldas_adapter.fetch_regional_timeseries(bbox, start_year, end_year, variable)
    else:
        raw_data = power_adapter.fetch_regional_timeseries(bbox, start_year, end_year, variable)
    
    dates = raw_data["dates"]
    values = raw_data["values"]
    
    if len(values) < 12:
        raise HTTPException(status_code=400, detail="Insufficient data points returned for specified spatial/temporal query.")
    
    # 1. De-seasonalize
    climatology_res = compute_monthly_climatology(dates, values)
    
    # 2. Extract annual aggregate for robust multi-decadal trend testing
    annual_series = climatology_res["annual_series"]
    years = [item["year"] for item in annual_series]
    annual_means = [item["annual_mean"] for item in annual_series]
    
    # 3. Compute Sen's slope and Mann-Kendall test
    stats_res = compute_mann_kendall_and_sens_slope(years, annual_means, alpha=alpha)
    
    return {
        "metadata": {
            "source": raw_data.get("source"),
            "doi": raw_data.get("doi", "N/A"),
            "variable": variable,
            "unit": raw_data["unit"],
            "bbox": bbox,
            "time_range": [start_year, end_year]
        },
        "climatology": climatology_res,
        "statistics": stats_res
    }

@router.get("/health")
def health_check():
    return {
        "status": "online",
        "service": settings.PROJECT_NAME,
        "nasa_adapters": ["GLDAS_Noah_2.1", "NASA_POWER_MERRA2"],
        "cache_directory": str(settings.CACHE_DIR)
    }

@router.get("/presets")
def get_presets():
    """Returns the 3 curated demonstration cases for judging review."""
    return {
        "count": len(settings.PRESETS),
        "presets": list(settings.PRESETS.values())
    }

@router.post("/investigate")
def investigate_region(req: SingleRegionRequest):
    """Executes single-region time series extraction, deseasonalization, and Mann-Kendall trend testing."""
    try:
        analysis = _execute_analysis(
            bbox=req.bbox,
            variable=req.variable,
            dataset=req.dataset,
            start_year=req.start_year,
            end_year=req.end_year,
            alpha=req.alpha
        )
        return {
            "status": "success",
            "region_name": req.region_name,
            "analysis": analysis
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/opposite-trends")
def investigate_opposite_trends(req: OppositeTrendsRequest):
    """
    Executes the Opposite Trend Detective Engine.
    Contrasts Region A and Region B simultaneously to evaluate spatial polarity.
    """
    try:
        # Check if using preset
        if req.preset_id and req.preset_id in settings.PRESETS:
            preset = settings.PRESETS[req.preset_id]
            req.variable = preset.get("soil_variable", "RootMoist_inst")
            req.region_a_name = preset["region_a"]["name"]
            req.region_a_bbox = preset["region_a"]["bbox"]
            req.region_b_name = preset["region_b"]["name"]
            req.region_b_bbox = preset["region_b"]["bbox"]
            req.start_year = preset["timeframe"][0]
            req.end_year = preset["timeframe"][1]

        # Determine dataset
        dataset = "GLDAS" if req.variable == "RootMoist_inst" else "NASA_POWER"

        res_a = _execute_analysis(req.region_a_bbox, req.variable, dataset, req.start_year, req.end_year, req.alpha)
        res_b = _execute_analysis(req.region_b_bbox, req.variable, dataset, req.start_year, req.end_year, req.alpha)

        slope_a = res_a["statistics"]["sens_slope"]
        slope_b = res_b["statistics"]["sens_slope"]
        sig_a = res_a["statistics"]["is_significant"]
        sig_b = res_b["statistics"]["is_significant"]

        # Formulate comparative polarity verdict
        if (slope_a * slope_b < 0) and (sig_a or sig_b):
            polarity_status = "CONFIRMED_SPATIAL_DIVERGENCE"
            polarity_narrative = (
                f"Opposing trends detected under the same macro-climate regime: "
                f"{req.region_a_name} shows {res_a['statistics']['trend_label']} ({slope_a:+.4f}/yr), "
                f"while {req.region_b_name} shows {res_b['statistics']['trend_label']} ({slope_b:+.4f}/yr)."
            )
        else:
            polarity_status = "HOMOGENEOUS_OR_EQUILIBRIUM"
            polarity_narrative = (
                f"Both regions exhibit concordant directional movement or lack statistically significant divergence."
            )

        return {
            "status": "success",
            "polarity_status": polarity_status,
            "polarity_narrative": polarity_narrative,
            "variable": req.variable,
            "unit": res_a["metadata"]["unit"],
            "time_range": [req.start_year, req.end_year],
            "region_a": {
                "name": req.region_a_name,
                "bbox": req.region_a_bbox,
                "analysis": res_a
            },
            "region_b": {
                "name": req.region_b_name,
                "bbox": req.region_b_bbox,
                "analysis": res_b
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
