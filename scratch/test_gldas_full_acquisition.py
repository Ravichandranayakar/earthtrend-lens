import os
import sys
import time
from pathlib import Path
import requests
import concurrent.futures
from dotenv import load_dotenv
import xarray as xr
import numpy as np

load_dotenv("backend/.env")
token = os.environ.get("EARTHDATA_TOKEN")
headers = {"Authorization": f"Bearer {token}"} if token else {}

def fetch_month_subset(year: int, month: int, lat_idxs: tuple, lon_idxs: tuple, out_dir: Path):
    granule_id = f"GLDAS_NOAH025_M.A{year}{month:02d}.021.nc4"
    out_file = out_dir / f"gldas_sub_{granule_id}"
    if out_file.exists() and out_file.stat().st_size > 5000:
        return out_file

    lat_min, lat_max = lat_idxs
    lon_min, lon_max = lon_idxs

    base_url = f"https://opendap.earthdata.nasa.gov/collections/C1342986036-GES_DISC/granules/GLDAS_NOAH025_M.2.1%3A{granule_id}.nc4"
    query = f"?RootMoist_inst[0:1:0][{lat_min}:1:{lat_max}][{lon_min}:1:{lon_max}],lat[{lat_min}:1:{lat_max}],lon[{lon_min}:1:{lon_max}],time"
    url = base_url + query

    for attempt in range(3):
        try:
            resp = requests.get(url, headers=headers, timeout=20)
            if resp.status_code == 200 and len(resp.content) > 5000:
                with open(out_file, "wb") as f:
                    f.write(resp.content)
                return out_file
            elif resp.status_code == 404:
                # Granule not available
                return None
        except Exception:
            time.sleep(0.5)
    return None

def main():
    print("Testing multi-worker fetch for 10 years (120 months) for Scandinavia...")
    bbox_scand = [58.0, 66.0, 10.0, 22.0]
    min_lat, max_lat, min_lon, max_lon = bbox_scand
    lat_min_idx = max(0, min(599, int(np.floor((min_lat - (-59.875)) / 0.25))))
    lat_max_idx = max(0, min(599, int(np.ceil((max_lat - (-59.875)) / 0.25))))
    lon_min_idx = max(0, min(1439, int(np.floor((min_lon - (-179.875)) / 0.25))))
    lon_max_idx = max(0, min(1439, int(np.ceil((max_lon - (-179.875)) / 0.25))))

    out_dir = Path("backend/app/data/gldas/subsets_scandinavia")
    out_dir.mkdir(parents=True, exist_ok=True)

    tasks = [(y, m) for y in range(2015, 2025) for m in range(1, 13)]
    print(f"Submitting {len(tasks)} months with 16 workers...")
    t0 = time.time()
    downloaded = 0
    with concurrent.futures.ThreadPoolExecutor(max_workers=16) as pool:
        futs = [pool.submit(fetch_month_subset, y, m, (lat_min_idx, lat_max_idx), (lon_min_idx, lon_max_idx), out_dir) for y, m in tasks]
        for f in concurrent.futures.as_completed(futs):
            if f.result():
                downloaded += 1

    dt = time.time() - t0
    print(f"Downloaded {downloaded}/{len(tasks)} months in {dt:.2f}s ({downloaded/dt:.1f} files/s)")

if __name__ == "__main__":
    main()
