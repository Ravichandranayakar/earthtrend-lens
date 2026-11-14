import os
import sys
from pathlib import Path

# Ensure backend root is in Python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.engine.raster_generator import generate_dual_scientific_rasters

def main():
    print("=" * 75)
    print("GATE 4 COMPREHENSIVE MULTI-VARIABLE SCIENTIFIC RASTER AUDIT")
    print("=" * 75)
    print()

    # Preset: Europe Hydrology
    bbox_a = [36.0, 42.0, -9.0, 3.0]     # Iberian Peninsula
    bbox_b = [58.0, 66.0, 10.0, 22.0]    # Southern Scandinavia

    test_matrix = [
        ("T2M", "mean", "NASA POWER Near-Surface Air Temperature Period Mean"),
        ("T2M", "trend", "NASA POWER Temperature Decadal Theil-Sen Trend"),
        ("PRECTOTCORR", "mean", "NASA POWER Precipitation Rate Period Mean"),
        ("PRECTOTCORR", "trend", "NASA POWER Precipitation Decadal Theil-Sen Trend"),
        ("RootMoist_inst", "mean", "NASA GLDAS Noah 2.1 Root Zone Soil Moisture Period Mean"),
        ("RootMoist_inst", "trend", "NASA GLDAS Noah 2.1 Root Zone Soil Moisture Theil-Sen Trend")
    ]

    results = []

    for var, mode, label in test_matrix:
        print(f"Executing: {label} ({var} · {mode})...")
        res = generate_dual_scientific_rasters(
            bbox_a=bbox_a,
            bbox_b=bbox_b,
            variable=var,
            mode=mode
        )
        assert res["status"] == "SUCCESS", f"Failed for {var} {mode}"
        scale = res["shared_scale"]
        da = res["domain_a"]
        db = res["domain_b"]

        file_a = Path(da["raster_path"])
        file_b = Path(db["raster_path"])
        assert file_a.exists() and file_a.stat().st_size > 1000
        assert file_b.exists() and file_b.stat().st_size > 1000

        print(f"  Shared Scale: [{scale['vmin']}, {scale['vmax']}] ({scale['scale_type']}, {scale['colormap_name']})")
        print(f"  Domain A Mean: {da['statistics']['domain_mean']} {da['unit']} (Valid cells: {da['statistics']['valid_cells']})")
        print(f"  Domain B Mean: {db['statistics']['domain_mean']} {db['unit']} (Valid cells: {db['statistics']['valid_cells']})")
        print(f"  Raster files: {file_a.name} ({file_a.stat().st_size} B), {file_b.name} ({file_b.stat().st_size} B)")
        print()

        results.append({
            "variable": var,
            "mode": mode,
            "scale_type": scale["scale_type"],
            "colormap": scale["colormap_name"],
            "vmin": scale["vmin"],
            "vmax": scale["vmax"],
            "unit": da["unit"],
            "a_mean": da["statistics"]["domain_mean"],
            "b_mean": db["statistics"]["domain_mean"],
            "a_cells": da["statistics"]["valid_cells"],
            "b_cells": db["statistics"]["valid_cells"],
            "provenance": da["provenance_type"]
        })

    print("=" * 75)
    print("GATE 4 AUDIT SUMMARY: ALL 6 DUAL RASTER CONFIGURATIONS OPERATIONAL")
    print("=" * 75)
    for r in results:
        print(f"[{r['variable']} · {r['mode'].upper()}] {r['provenance']} | Scale: [{r['vmin']}, {r['vmax']}] {r['colormap']} | Domain A: {r['a_mean']} {r['unit']} vs Domain B: {r['b_mean']} {r['unit']}")

if __name__ == "__main__":
    main()
