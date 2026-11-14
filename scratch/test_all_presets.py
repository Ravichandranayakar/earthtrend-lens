import sys
from pathlib import Path
backend_dir = Path(r"C:\Users\Ravichandran\earthtrend-lens\backend")
sys.path.insert(0, str(backend_dir))

from app.core.config import settings
from app.adapters.power_adapter import NASAPowerAdapter
from app.engine.raster_generator import generate_dual_scientific_rasters

def test_all():
    print("=" * 70)
    print("TESTING RASTER GENERATION ACROSS ALL 3 NASA PRESETS")
    print("=" * 70)

    adapter = NASAPowerAdapter()

    for preset_key, p in settings.PRESETS.items():
        title = p["title"]
        var = "T2M" # Test with T2M and PRECTOTCORR
        bbox_a = p["region_a"]["bbox"]
        bbox_b = p["region_b"]["bbox"]
        name_a = p["region_a"]["name"]
        name_b = p["region_b"]["name"]

        print(f"\nTesting Preset: {title} ({preset_key})")
        print(f"  Domain A ({name_a}): {bbox_a}")
        print(f"  Domain B ({name_b}): {bbox_b}")

        # Check bounds span
        span_a = (bbox_a[1] - bbox_a[0], bbox_a[3] - bbox_a[2])
        span_b = (bbox_b[1] - bbox_b[0], bbox_b[3] - bbox_b[2])
        print(f"  Span A: {span_a[0]}° lat x {span_a[1]}° lon")
        print(f"  Span B: {span_b[0]}° lat x {span_b[1]}° lon")

if __name__ == "__main__":
    test_all()
