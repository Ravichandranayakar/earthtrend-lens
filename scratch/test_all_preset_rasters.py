import sys
from pathlib import Path
backend_dir = Path(r"C:\Users\Ravichandran\earthtrend-lens\backend")
sys.path.insert(0, str(backend_dir))

from app.core.config import settings
from app.engine.raster_generator import generate_dual_scientific_rasters

def test_all_preset_rasters():
    print("=" * 75)
    print("VALIDATING DUAL SCIENTIFIC RASTERS ACROSS ALL 3 NASA PRESET CASES")
    print("=" * 75)

    cases = [
        ("case_01_europe", "Europe Hydrology", [36.0, 42.0, -9.0, 3.0], [58.0, 66.0, 10.0, 22.0]),
        ("case_02_north_america", "US Megadrought", [32.0, 40.0, -115.0, -105.0], [41.0, 48.0, -85.0, -72.0]),
        ("case_03_global", "Sahel vs Siberia", [12.0, 18.0, -15.0, 10.0], [55.0, 65.0, 60.0, 90.0]),
    ]

    for case_id, title, bbox_a, bbox_b in cases:
        print(f"\n=======================================================")
        print(f"CASE: {title} ({case_id})")
        print(f"  Domain A: {bbox_a}")
        print(f"  Domain B: {bbox_b}")
        print(f"=======================================================")

        for var in ["T2M", "PRECTOTCORR"]:
            for mode in ["mean", "trend"]:
                res = generate_dual_scientific_rasters(
                    bbox_a=bbox_a,
                    bbox_b=bbox_b,
                    variable=var,
                    mode=mode,
                    start_year=2000,
                    end_year=2024
                )
                assert res["status"] == "SUCCESS", f"Failed {case_id} {var} {mode}: {res}"
                da = res["domain_a"]
                db = res["domain_b"]
                scale = res["shared_scale"]
                print(f"  [{var} · {mode.upper()}]")
                print(f"    Shared Scale: [{scale['vmin']}, {scale['vmax']}] (Center: {scale.get('center')})")
                print(f"    Domain A ({da['statistics']['valid_cells']} cells): Mean={da['statistics']['domain_mean']} {da['unit']} | Raster: {Path(da['raster_path']).name}")
                print(f"    Domain B ({db['statistics']['valid_cells']} cells): Mean={db['statistics']['domain_mean']} {db['unit']} | Raster: {Path(db['raster_path']).name}")

    print("\n" + "=" * 75)
    print("ALL 3 PRESETS (12 DUAL RASTERS TOTAL) VERIFIED 100% OPERATIONAL")
    print("=" * 75)

if __name__ == "__main__":
    test_all_preset_rasters()
