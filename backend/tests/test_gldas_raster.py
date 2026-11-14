import os
import sys

# Ensure backend root is in Python path for test discovery
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import pytest
from fastapi.testclient import TestClient
from main import app
from app.engine.gldas_validator import validate_gldas_netcdf_file, audit_local_gldas_archive
from app.engine.raster_generator import generate_gldas_mean_raster

client = TestClient(app)

def test_archive_audit_finds_valid_granule():
    audit = audit_local_gldas_archive()
    assert audit["status"] == "NASA_GLDAS_NETCDF"
    assert audit["valid_granule_count"] >= 1
    granule = audit["granules"][0]
    assert granule["is_valid"] is True
    assert granule["variable"] == "RootMoist_inst"
    assert granule["units"] == "kg m-2"
    assert granule["valid_land_cells"] > 0
    assert granule["missing_ocean_cells"] >= 0

def test_generate_gldas_mean_raster_success():
    bbox = [36.0, 44.0, -9.0, 3.0]
    res = generate_gldas_mean_raster(bbox=bbox, variable="RootMoist_inst")
    assert res["status"] == "SUCCESS"
    assert res["provenance_type"] == "NASA_GLDAS_NETCDF"
    assert "raster_id" in res
    assert len(res["leaflet_bounds"]) == 2
    assert res["leaflet_bounds"][0][0] <= 36.0
    assert res["leaflet_bounds"][1][0] >= 42.0
    assert res["statistics"]["valid_cells"] > 0
    assert os.path.exists(res["raster_path"])
    assert res["raster_path"].endswith(".png")

def test_generate_gldas_mean_raster_empty_bbox():
    # Bounding box in open Equatorial Pacific ocean with zero land cells
    res = generate_gldas_mean_raster(bbox=[0.0, 5.0, -140.0, -135.0], variable="RootMoist_inst")
    assert res["status"] in ["NO_DATA_IN_DOMAIN", "DATA_UNAVAILABLE"]

def test_api_archive_audit_endpoint():
    response = client.get("/api/v1/gldas/archive-audit")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "NASA_GLDAS_NETCDF"
    assert data["granule_count"] >= 1

def test_api_raster_mean_and_png_delivery():
    payload = {
        "bbox": [36.0, 44.0, -9.0, 3.0],
        "variable": "RootMoist_inst",
        "start_year": 2020,
        "end_year": 2024
    }
    response = client.post("/api/v1/raster/mean", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "SUCCESS"
    raster_url = data["raster_url"]
    
    # Verify PNG retrieval
    png_res = client.get(raster_url)
    assert png_res.status_code == 200
    assert png_res.headers["content-type"] == "image/png"
    assert len(png_res.content) > 100

def test_api_spatial_grid_fdr_and_provenance():
    payload = {
        "bbox": [36.0, 42.0, -9.0, 3.0],
        "variable": "RootMoist_inst",
        "grid_step": 2.0,
        "alpha": 0.05,
        "domain_id": "A",
        "region_name": "Iberian Peninsula"
    }
    response = client.post("/api/v1/spatial-grid", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"
    assert data["domain_id"] == "A"
    assert data["domain_name"] == "Iberian Peninsula"
    assert "provenance_type" in data
    assert "FDR" in data["statistical_method"]
    assert data["total_cells"] > 0
    assert len(data["cells"]) == data["total_cells"]
    
    sample_cell = data["cells"][0]
    assert sample_cell["domain_id"] == "A"
    assert sample_cell["domain_name"] == "Iberian Peninsula"
    assert "bounds" in sample_cell
    assert len(sample_cell["bounds"]) == 4
    assert "standardized_z" in sample_cell
    assert "p_value" in sample_cell
    assert "q_value" in sample_cell
    assert sample_cell["q_value"] >= sample_cell["p_value"]
    assert sample_cell["significance_regime"] in ["decreasing", "increasing", "non_significant"]

def test_api_spatial_grid_dual_domain_isolation():
    # Test Domain A
    res_a = client.post("/api/v1/spatial-grid", json={
        "bbox": [36.0, 42.0, -9.0, 3.0],
        "variable": "RootMoist_inst",
        "grid_step": 2.0,
        "domain_id": "A",
        "region_name": "Domain A South"
    })
    # Test Domain B
    res_b = client.post("/api/v1/spatial-grid", json={
        "bbox": [58.0, 66.0, 10.0, 22.0],
        "variable": "RootMoist_inst",
        "grid_step": 2.0,
        "domain_id": "B",
        "region_name": "Domain B North"
    })
    assert res_a.status_code == 200
    assert res_b.status_code == 200
    data_a = res_a.json()
    data_b = res_b.json()
    
    assert data_a["domain_id"] == "A"
    assert data_b["domain_id"] == "B"
    assert data_a["bbox"] == [36.0, 42.0, -9.0, 3.0]
    assert data_b["bbox"] == [58.0, 66.0, 10.0, 22.0]
    # Verify no cell in B has latitude < 50
    for cell in data_b["cells"]:
        assert cell["lat"] >= 58.0
        assert cell["domain_id"] == "B"
    # Verify no cell in A has latitude > 45
    for cell in data_a["cells"]:
        assert cell["lat"] <= 42.0
        assert cell["domain_id"] == "A"

