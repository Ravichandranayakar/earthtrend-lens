import sys
from pathlib import Path

# Add backend directory to path
backend_dir = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(backend_dir))

from PIL import Image
from app.engine.raster_generator import generate_dual_scientific_rasters

def main():
    print("=" * 70)
    print("GATE 2: COMMON SCIENTIFIC RASTER ENGINE — DELIVERABLE GENERATION")
    print("=" * 70)

    # Defined Investigation Domains
    # Domain A: Iberian Peninsula / Mediterranean (Drying / Warming Hotspot)
    bbox_a = [36.0, 42.0, -9.0, 3.0]
    # Domain B: Southern Scandinavia / Baltic (Humid / Boreal Contrast)
    bbox_b = [58.0, 66.0, 10.0, 22.0]

    deliverables = []

    # -------------------------------------------------------------
    # 1. T2M Period Mean (Domain A & B Harmonized)
    # -------------------------------------------------------------
    print("\n[1/4] Generating T2M Period Mean Rasters (Harmonized Scale)...")
    res_t2m_mean = generate_dual_scientific_rasters(
        bbox_a=bbox_a, bbox_b=bbox_b,
        variable="T2M", mode="mean",
        start_year=2000, end_year=2024
    )
    assert res_t2m_mean["status"] == "SUCCESS", f"T2M Mean failed: {res_t2m_mean}"
    da_t2m = res_t2m_mean["domain_a"]
    db_t2m = res_t2m_mean["domain_b"]
    scale_t2m = res_t2m_mean["shared_scale"]

    img_a_t2m = Image.open(da_t2m["raster_path"])
    img_b_t2m = Image.open(db_t2m["raster_path"])

    print(f"  Domain A T2M Mean: {da_t2m['raster_id']} | Bounds: {da_t2m['leaflet_bounds']} | Mean: {da_t2m['statistics']['domain_mean']}°C | File size: {Path(da_t2m['raster_path']).stat().st_size} bytes")
    print(f"  Domain B T2M Mean: {db_t2m['raster_id']} | Bounds: {db_t2m['leaflet_bounds']} | Mean: {db_t2m['statistics']['domain_mean']}°C | File size: {Path(db_t2m['raster_path']).stat().st_size} bytes")
    print(f"  Shared Scale: [{scale_t2m['vmin']}°C, {scale_t2m['vmax']}°C] | Colormap: {scale_t2m['colormap_name']}")
    assert img_a_t2m.mode == "RGBA" and img_b_t2m.mode == "RGBA"

    deliverables.append({
        "label": "Domain A T2M Mean",
        "file": da_t2m["raster_path"],
        "url": da_t2m["raster_url"],
        "bounds": da_t2m["leaflet_bounds"],
        "stats": da_t2m["statistics"],
        "scale": scale_t2m
    })
    deliverables.append({
        "label": "Domain B T2M Mean",
        "file": db_t2m["raster_path"],
        "url": db_t2m["raster_url"],
        "bounds": db_t2m["leaflet_bounds"],
        "stats": db_t2m["statistics"],
        "scale": scale_t2m
    })

    # -------------------------------------------------------------
    # 2. PRECTOTCORR Period Mean (Domain A & B Harmonized)
    # -------------------------------------------------------------
    print("\n[2/4] Generating PRECTOTCORR Period Mean Rasters (Harmonized Scale)...")
    res_pr_mean = generate_dual_scientific_rasters(
        bbox_a=bbox_a, bbox_b=bbox_b,
        variable="PRECTOTCORR", mode="mean",
        start_year=2000, end_year=2024
    )
    assert res_pr_mean["status"] == "SUCCESS", f"PRECTOTCORR Mean failed: {res_pr_mean}"
    da_pr = res_pr_mean["domain_a"]
    db_pr = res_pr_mean["domain_b"]
    scale_pr = res_pr_mean["shared_scale"]

    img_a_pr = Image.open(da_pr["raster_path"])
    img_b_pr = Image.open(db_pr["raster_path"])

    print(f"  Domain A PRECTOTCORR Mean: {da_pr['raster_id']} | Bounds: {da_pr['leaflet_bounds']} | Mean: {da_pr['statistics']['domain_mean']} mm/day | File size: {Path(da_pr['raster_path']).stat().st_size} bytes")
    print(f"  Domain B PRECTOTCORR Mean: {db_pr['raster_id']} | Bounds: {db_pr['leaflet_bounds']} | Mean: {db_pr['statistics']['domain_mean']} mm/day | File size: {Path(db_pr['raster_path']).stat().st_size} bytes")
    print(f"  Shared Scale: [{scale_pr['vmin']} mm/day, {scale_pr['vmax']} mm/day] | Colormap: {scale_pr['colormap_name']}")
    assert img_a_pr.mode == "RGBA" and img_b_pr.mode == "RGBA"

    deliverables.append({
        "label": "Domain A PRECTOTCORR Mean",
        "file": da_pr["raster_path"],
        "url": da_pr["raster_url"],
        "bounds": da_pr["leaflet_bounds"],
        "stats": da_pr["statistics"],
        "scale": scale_pr
    })
    deliverables.append({
        "label": "Domain B PRECTOTCORR Mean",
        "file": db_pr["raster_path"],
        "url": db_pr["raster_url"],
        "bounds": db_pr["leaflet_bounds"],
        "stats": db_pr["statistics"],
        "scale": scale_pr
    })

    # -------------------------------------------------------------
    # 3. T2M Long-term Trend (Theil-Sen Slope in °C/yr, Centered at 0.0)
    # -------------------------------------------------------------
    print("\n[3/4] Generating T2M Long-term Trend Rasters (Diverging RdBu_r centered at 0.0)...")
    res_t2m_trend = generate_dual_scientific_rasters(
        bbox_a=bbox_a, bbox_b=bbox_b,
        variable="T2M", mode="trend",
        start_year=2000, end_year=2024
    )
    assert res_t2m_trend["status"] == "SUCCESS", f"T2M Trend failed: {res_t2m_trend}"
    da_t2m_tr = res_t2m_trend["domain_a"]
    db_t2m_tr = res_t2m_trend["domain_b"]
    scale_t2m_tr = res_t2m_trend["shared_scale"]

    print(f"  Domain A T2M Trend: {da_t2m_tr['raster_id']} | Mean Slope: +{da_t2m_tr['statistics']['domain_mean']} °C/yr (+{da_t2m_tr['statistics']['domain_mean']*10:.3f} °C/decade)")
    print(f"  Domain B T2M Trend: {db_t2m_tr['raster_id']} | Mean Slope: +{db_t2m_tr['statistics']['domain_mean']} °C/yr (+{db_t2m_tr['statistics']['domain_mean']*10:.3f} °C/decade)")
    print(f"  Shared Trend Scale: [{scale_t2m_tr['vmin']} °C/yr, +{scale_t2m_tr['vmax']} °C/yr], Center: {scale_t2m_tr['center']} | Colormap: {scale_t2m_tr['colormap_name']}")
    assert scale_t2m_tr["center"] == 0.0, "Trend scale MUST be centered at zero!"

    deliverables.append({
        "label": "Domain A T2M Trend",
        "file": da_t2m_tr["raster_path"],
        "url": da_t2m_tr["raster_url"],
        "bounds": da_t2m_tr["leaflet_bounds"],
        "stats": da_t2m_tr["statistics"],
        "scale": scale_t2m_tr
    })
    deliverables.append({
        "label": "Domain B T2M Trend",
        "file": db_t2m_tr["raster_path"],
        "url": db_t2m_tr["raster_url"],
        "bounds": db_t2m_tr["leaflet_bounds"],
        "stats": db_t2m_tr["statistics"],
        "scale": scale_t2m_tr
    })

    # -------------------------------------------------------------
    # 4. PRECTOTCORR Long-term Trend (Theil-Sen Slope in mm/day/yr)
    # -------------------------------------------------------------
    print("\n[4/4] Generating PRECTOTCORR Long-term Trend Rasters (Diverging BrBG centered at 0.0)...")
    res_pr_trend = generate_dual_scientific_rasters(
        bbox_a=bbox_a, bbox_b=bbox_b,
        variable="PRECTOTCORR", mode="trend",
        start_year=2000, end_year=2024
    )
    assert res_pr_trend["status"] == "SUCCESS", f"PRECTOTCORR Trend failed: {res_pr_trend}"
    da_pr_tr = res_pr_trend["domain_a"]
    db_pr_tr = res_pr_trend["domain_b"]
    scale_pr_tr = res_pr_trend["shared_scale"]

    print(f"  Domain A PRECTOTCORR Trend: {da_pr_tr['raster_id']} | Mean Slope: {da_pr_tr['statistics']['domain_mean']} mm/day/yr")
    print(f"  Domain B PRECTOTCORR Trend: {db_pr_tr['raster_id']} | Mean Slope: {db_pr_tr['statistics']['domain_mean']} mm/day/yr")
    print(f"  Shared Trend Scale: [{scale_pr_tr['vmin']}, +{scale_pr_tr['vmax']}], Center: {scale_pr_tr['center']} | Colormap: {scale_pr_tr['colormap_name']}")

    deliverables.append({
        "label": "Domain A PRECTOTCORR Trend",
        "file": da_pr_tr["raster_path"],
        "url": da_pr_tr["raster_url"],
        "bounds": da_pr_tr["leaflet_bounds"],
        "stats": da_pr_tr["statistics"],
        "scale": scale_pr_tr
    })
    deliverables.append({
        "label": "Domain B PRECTOTCORR Trend",
        "file": db_pr_tr["raster_path"],
        "url": db_pr_tr["raster_url"],
        "bounds": db_pr_tr["leaflet_bounds"],
        "stats": db_pr_tr["statistics"],
        "scale": scale_pr_tr
    })

    print("\n" + "=" * 70)
    print("ALL GATE 2 DELIVERABLES PRODUCED AND AUDITED SUCCESSFULLY.")
    print("=" * 70)

if __name__ == "__main__":
    main()
