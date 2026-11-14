import os
import sys
import time
from pathlib import Path
import requests
import concurrent.futures
from dotenv import load_dotenv
import xarray as xr
import numpy as np

load_dotenv('backend/.env')
token = os.environ.get('EARTHDATA_TOKEN')
headers = {'Authorization': f'Bearer {token}'} if token else {}

def fetch_gldas_subset_month(year: int, month: int, bbox: list, out_dir: Path):
    min_lat, max_lat, min_lon, max_lon = bbox
    lat_min_idx = max(0, min(599, int(np.floor((min_lat - (-59.875)) / 0.25))))
    lat_max_idx = max(0, min(599, int(np.ceil((max_lat - (-59.875)) / 0.25))))
    lon_min_idx = max(0, min(1439, int(np.floor((min_lon - (-179.875)) / 0.25))))
    lon_max_idx = max(0, min(1439, int(np.ceil((max_lon - (-179.875)) / 0.25))))

    granule_id = f"GLDAS_NOAH025_M.A{year}{month:02d}.021.nc4"
    out_file = out_dir / f"gldas_sub_{granule_id}"
    if out_file.exists() and out_file.stat().st_size > 5000:
        return out_file

    base_url = f"https://opendap.earthdata.nasa.gov/collections/C1342986036-GES_DISC/granules/GLDAS_NOAH025_M.2.1%3A{granule_id}.nc4"
    query = f"?RootMoist_inst[0:1:0][{lat_min_idx}:1:{lat_max_idx}][{lon_min_idx}:1:{lon_max_idx}],lat[{lat_min_idx}:1:{lat_max_idx}],lon[{lon_min_idx}:1:{lon_max_idx}],time"
    url = base_url + query

    try:
        resp = requests.get(url, headers=headers, timeout=25)
        if resp.status_code == 200 and len(resp.content) > 5000:
            with open(out_file, "wb") as f:
                f.write(resp.content)
            return out_file
        else:
            return None
    except Exception as e:
        return None

def main():
    print("=" * 70)
    print("TESTING NASA GLDAS OPENDAP SUBSETTING FOR DOMAIN A (IBERIA)")
    print("=" * 70)

    bbox_iberia = [36.0, 42.0, -9.0, 3.0]
    out_dir = Path("backend/app/data/gldas/subsets_iberia")
    out_dir.mkdir(parents=True, exist_ok=True)

    # Test 24 months (2022-01 to 2023-12)
    tasks = []
    for y in [2022, 2023]:
        for m in range(1, 13):
            tasks.append((y, m))

    print(f"Fetching {len(tasks)} monthly subsets via Earthdata Cloud OPeNDAP...")
    t0 = time.time()
    downloaded_files = []

    with concurrent.futures.ThreadPoolExecutor(max_workers=8) as executor:
        futures = {executor.submit(fetch_gldas_subset_month, y, m, bbox_iberia, out_dir): (y, m) for y, m in tasks}
        for fut in concurrent.futures.as_completed(futures):
            res = fut.result()
            if res:
                downloaded_files.append(res)

    elapsed = time.time() - t0
    print(f"Downloaded {len(downloaded_files)} / {len(tasks)} months in {elapsed:.2f}s!")

    # Verify opening with xarray multi-file
    valid_files = sorted(list(out_dir.glob("gldas_sub_*.nc4")))
    print(f"Opening {len(valid_files)} NetCDF subsets with xarray...")
    ds = xr.open_mfdataset(valid_files, combine="nested", concat_dim="time")
    print("Dataset dimensions:", ds.dims)
    print("Time count:", len(ds["time"]))
    var = ds["RootMoist_inst"]
    print("RootMoist_inst shape:", var.shape)
    vals = var.values
    valid_mask = vals > 0
    print(f"Valid land observations: {np.sum(valid_mask)}")
    print(f"Domain mean across all {len(valid_files)} months: {vals[valid_mask].mean():.2f} kg/m²")
    print(f"Min: {vals[valid_mask].min():.2f} kg/m², Max: {vals[valid_mask].max():.2f} kg/m²")
    ds.close()

if __name__ == "__main__":
    main()
