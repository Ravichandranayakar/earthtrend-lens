import json
import time
import urllib.request
import urllib.error
from pathlib import Path

PRESETS = [
    {
        "id": "case_01_europe",
        "name": "Europe Hydrology",
        "bbox_a": [36.0, 42.0, -9.0, 3.0],
        "name_a": "Iberian Peninsula",
        "bbox_b": [58.0, 66.0, 10.0, 22.0],
        "name_b": "Southern Scandinavia"
    },
    {
        "id": "case_02_north_america",
        "name": "US Megadrought",
        "bbox_a": [32.0, 40.0, -115.0, -105.0],
        "name_a": "Colorado Basin",
        "bbox_b": [41.0, 48.0, -85.0, -72.0],
        "name_b": "Great Lakes"
    },
    {
        "id": "case_03_global",
        "name": "Sahel vs Siberia",
        "bbox_a": [12.0, 18.0, -15.0, 10.0],
        "name_a": "Western Sahel",
        "bbox_b": [55.0, 65.0, 60.0, 90.0],
        "name_b": "Boreal Siberia"
    }
]

VARIABLES = ["T2M", "PRECTOTCORR", "RootMoist_inst"]
MODES = ["mean", "trend"]

def execute_call(bbox_a, bbox_b, variable, mode, timeout=60):
    payload = json.dumps({
        "bbox_a": bbox_a,
        "bbox_b": bbox_b,
        "variable": variable,
        "mode": mode,
        "start_year": 2000,
        "end_year": 2024
    }).encode("utf-8")
    req = urllib.request.Request(
        "http://localhost:8000/api/v1/raster/dual",
        data=payload,
        headers={"Content-Type": "application/json"}
    )
    t0 = time.time()
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            dt = time.time() - t0
            return True, data, dt, None
    except urllib.error.HTTPError as he:
        dt = time.time() - t0
        err_body = he.read().decode("utf-8", errors="replace")
        return False, None, dt, f"HTTP {he.code}: {err_body}"
    except Exception as e:
        dt = time.time() - t0
        return False, None, dt, str(e)

def main():
    print("=" * 80)
    print("EARTHTREND LENS — 18-CONFIGURATION QA COMPATIBILITY MATRIX")
    print("=" * 80)

    results = []

    for p in PRESETS:
        for var in VARIABLES:
            for mode in MODES:
                cfg_name = f"{p['name']} | {var} | {mode}"
                print(f"\n[TESTING] {cfg_name}...")

                # First run (measures retrieval & generation)
                ok, data, t1, err = execute_call(p["bbox_a"], p["bbox_b"], var, mode, timeout=60)

                # Second run (measures cached response)
                t2 = None
                if ok and data and data.get("status") == "SUCCESS":
                    ok2, data2, t2, _ = execute_call(p["bbox_a"], p["bbox_b"], var, mode, timeout=30)

                record = {
                    "preset_id": p["id"],
                    "preset_name": p["name"],
                    "domain_a_name": p["name_a"],
                    "domain_a_bbox": p["bbox_a"],
                    "domain_b_name": p["name_b"],
                    "domain_b_bbox": p["bbox_b"],
                    "variable": var,
                    "mode": mode,
                    "t_run1": round(t1, 3),
                    "t_run2": round(t2, 3) if t2 is not None else None,
                    "error": err
                }

                if not ok:
                    record["status"] = "FAIL"
                    record["summary"] = err
                elif data.get("status") == "SUCCESS":
                    record["status"] = "PASS"
                    da = data.get("domain_a", {})
                    db = data.get("domain_b", {})
                    record["dataset_id"] = da.get("dataset_id")
                    record["provenance"] = da.get("provenance_type")
                    record["unit"] = da.get("unit")
                    record["dim_a"] = da.get("grid_dimensions")
                    record["dim_b"] = db.get("grid_dimensions")
                    record["valid_cells_a"] = da.get("statistics", {}).get("valid_cells")
                    record["valid_cells_b"] = db.get("statistics", {}).get("valid_cells")
                    record["mean_a"] = da.get("statistics", {}).get("domain_mean")
                    record["mean_b"] = db.get("statistics", {}).get("domain_mean")
                    record["scale_type"] = data.get("shared_scale", {}).get("scale_type")
                    record["colormap"] = data.get("shared_scale", {}).get("colormap_name")
                    record["vmin"] = data.get("shared_scale", {}).get("vmin")
                    record["vmax"] = data.get("shared_scale", {}).get("vmax")
                    record["url_a"] = da.get("raster_url")
                    record["url_b"] = db.get("raster_url")
                else:
                    record["status"] = data.get("status", "DATA_UNAVAILABLE")
                    record["summary"] = data.get("message")

                results.append(record)
                status_str = record["status"]
                t1_str = f"{record['t_run1']}s"
                t2_str = f"{record['t_run2']}s" if record['t_run2'] else "N/A"
                print(f"  --> {status_str:<16} | Run 1: {t1_str:<7} | Run 2: {t2_str:<7}")

    # Output detailed report file
    out_path = Path("backend/tests/matrix_results.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2)
    print(f"\n[DONE] Full matrix saved to {out_path}")

if __name__ == "__main__":
    main()
