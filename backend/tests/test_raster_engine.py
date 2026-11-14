import os
import sys

# Ensure backend root is in Python path for test discovery
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import pytest
import numpy as np
from pathlib import Path
from PIL import Image

from app.engine.raster_generator import (
    render_scientific_png,
    generate_power_scientific_raster,
    generate_dual_scientific_rasters,
    generate_gldas_mean_raster
)

def test_render_scientific_png_sequential():
    grid = np.array([[10.0, 15.0], [20.0, 25.0]])
    mask = np.ones((2, 2), dtype=bool)
    img, meta = render_scientific_png(
        grid_2d=grid,
        valid_mask=mask,
        colormap_name="Spectral_r",
        vmin=10.0,
        vmax=25.0,
        smooth=True,
        upscale_factor=4
    )
    assert img.mode == "RGBA"
    assert img.size[0] >= 128
    assert meta["scale_type"] == "sequential"
    assert meta["vmin"] == 10.0
    assert meta["vmax"] == 25.0
    assert len(meta["color_stops"]) == 5

def test_render_scientific_png_diverging():
    grid = np.array([[-0.05, 0.0], [0.02, 0.05]])
    mask = np.ones((2, 2), dtype=bool)
    img, meta = render_scientific_png(
        grid_2d=grid,
        valid_mask=mask,
        colormap_name="RdBu_r",
        vmin=-0.05,
        vmax=0.05,
        center=0.0,
        smooth=True
    )
    assert img.mode == "RGBA"
    assert meta["scale_type"] == "diverging"
    assert meta["center"] == 0.0
    assert meta["color_stops"][2]["value"] == 0.0

def test_power_raster_mean_and_trend():
    bbox = [36.0, 42.0, -9.0, 3.0]
    # Test mean
    res_mean = generate_power_scientific_raster(bbox=bbox, variable="T2M", mode="mean")
    assert res_mean["status"] == "SUCCESS"
    assert res_mean["mode"] == "mean"
    assert res_mean["statistics"]["domain_mean"] > 0
    assert Path(res_mean["raster_path"]).exists()

    # Test trend
    res_trend = generate_power_scientific_raster(bbox=bbox, variable="T2M", mode="trend")
    assert res_trend["status"] == "SUCCESS"
    assert res_trend["mode"] == "trend"
    assert res_trend["color_scale"]["scale_type"] == "diverging"
    assert res_trend["color_scale"]["center"] == 0.0
    assert Path(res_trend["raster_path"]).exists()

def test_dual_rasters_shared_scale():
    bbox_a = [36.0, 42.0, -9.0, 3.0]
    bbox_b = [54.0, 60.0, 8.0, 20.0]
    res_dual = generate_dual_scientific_rasters(
        bbox_a=bbox_a, bbox_b=bbox_b,
        variable="T2M", mode="trend"
    )
    assert res_dual["status"] == "SUCCESS"
    assert "domain_a" in res_dual
    assert "domain_b" in res_dual
    shared_scale = res_dual["shared_scale"]
    assert shared_scale["center"] == 0.0
    assert shared_scale["vmin"] == -shared_scale["vmax"]
