import sys
sys.path.insert(0, ".")
import time
from pathlib import Path
import concurrent.futures
import numpy as np
from scratch.test_gldas_full_acquisition import fetch_month_subset

def prefetch(bbox, folder_name):
    min_lat, max_lat, min_lon, max_lon = bbox
    lat_min_idx = max(0, min(599, int(np.floor((min_lat - (-59.875)) / 0.25))))
    lat_max_idx = max(0, min(599, int(np.ceil((max_lat - (-59.875)) / 0.25))))
    lon_min_idx = max(0, min(1439, int(np.floor((min_lon - (-179.875)) / 0.25))))
    lon_max_idx = max(0, min(1439, int(np.ceil((max_lon - (-179.875)) / 0.25))))

    out_dir = Path(f"backend/app/data/gldas/{folder_name}")
    out_dir.mkdir(parents=True, exist_ok=True)

    tasks = [(y, m) for y in range(2000, 2025) for m in range(1, 13)]
    with concurrent.futures.ThreadPoolExecutor(max_workers=20) as pool:
        futs = [pool.submit(fetch_month_subset, y, m, (lat_min_idx, lat_max_idx), (lon_min_idx, lon_max_idx), out_dir) for y, m in tasks]
        for f in concurrent.futures.as_completed(futs):
            f.result()

if __name__ == "__main__":
    t0 = time.time()
    print("Prefetching Colorado Basin...")
    prefetch([32.0, 40.0, -115.0, -105.0], "subsets_colorado")
    print(f"Colorado Basin fetched in {time.time()-t0:.2f}s. Prefetching Great Lakes...")
    t1 = time.time()
    prefetch([41.0, 48.0, -85.0, -72.0], "subsets_great_lakes")
    print(f"Great Lakes fetched in {time.time()-t1:.2f}s. Total: {time.time()-t0:.2f}s")
