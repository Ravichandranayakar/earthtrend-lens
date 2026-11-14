import sys
from pathlib import Path
import xarray as xr
import numpy as np

nc_path = Path("backend/app/data/gldas/GLDAS_NOAH025_M.A202306.021.nc4")
print("=" * 75)
print("INSPECTING GENUINE NASA GLDAS NOAH 2.1 NETCDF GRANULE")
print("=" * 75)
print(f"File Path: {nc_path}")
print(f"File Size: {nc_path.stat().st_size / (1024*1024):.2f} MB")

ds = xr.open_dataset(nc_path)

print("\n--- Global Attributes ---")
for k in ["title", "institution", "source", "history", "conventions", "spatial_resolution"]:
    if k in ds.attrs:
        print(f"  {k}: {ds.attrs[k]}")

print("\n--- Dimensions & Coordinates ---")
for dim, size in ds.dims.items():
    print(f"  Dimension '{dim}': {size}")
for coord in ds.coords:
    arr = ds[coord].values
    print(f"  Coordinate '{coord}': min={arr.min()}, max={arr.max()}, shape={arr.shape}")

print("\n--- Target Variable: RootMoist_inst ---")
if "RootMoist_inst" not in ds:
    print("ERROR: RootMoist_inst not found in dataset!")
    sys.exit(1)

var = ds["RootMoist_inst"]
print(f"  Long Name: {var.attrs.get('long_name')}")
print(f"  Standard Name: {var.attrs.get('standard_name')}")
print(f"  Units: {var.attrs.get('units')}")
print(f"  Fill Value: {var.attrs.get('_FillValue')}")
print(f"  Scale Factor: {var.attrs.get('scale_factor', 1.0)}")
print(f"  Add Offset: {var.attrs.get('add_offset', 0.0)}")
print(f"  Shape: {var.shape}")

# Extract 2D array (assuming time dim of 1)
data_2d = var.squeeze().values
fill_val = var.attrs.get("_FillValue", -9999.0)

valid_mask = (data_2d != fill_val) & ~np.isnan(data_2d) & (data_2d > 0)
valid_cells = int(np.sum(valid_mask))
missing_cells = int(data_2d.size - valid_cells)
valid_vals = data_2d[valid_mask]

print(f"\n--- Global Spatial Validation ---")
print(f"  Total Grid Cells: {data_2d.size}")
print(f"  Valid Land Cells: {valid_cells} ({valid_cells / data_2d.size * 100:.2f}%)")
print(f"  Missing / Ocean Cells: {missing_cells} ({missing_cells / data_2d.size * 100:.2f}%)")
print(f"  Min Value: {valid_vals.min():.2f} kg/m²")
print(f"  Max Value: {valid_vals.max():.2f} kg/m²")
print(f"  Mean Value: {valid_vals.mean():.2f} kg/m²")
print(f"  Standard Deviation: {valid_vals.std():.2f} kg/m² (Shows rich spatial variation across continents!)")

# Test domain extraction for Domain A (Iberian Peninsula [36, 42, -9, 3])
lat_coord = "lat" if "lat" in ds.coords else "latitude"
lon_coord = "lon" if "lon" in ds.coords else "longitude"
sub_iberia = ds["RootMoist_inst"].sel({lat_coord: slice(36, 42), lon_coord: slice(-9, 3)})
sub_vals = sub_iberia.values
sub_valid = (sub_vals != fill_val) & ~np.isnan(sub_vals) & (sub_vals > 0)

print(f"\n--- Domain A Subsetting Test: Iberian Peninsula [36, 42, -9, 3] ---")
print(f"  Subarray Dimensions: {sub_iberia.shape}")
print(f"  Valid Land Cells in Iberia: {np.sum(sub_valid)}")
print(f"  Iberia Min: {sub_vals[sub_valid].min():.2f} kg/m²")
print(f"  Iberia Max: {sub_vals[sub_valid].max():.2f} kg/m²")
print(f"  Iberia Mean: {sub_vals[sub_valid].mean():.2f} kg/m²")

ds.close()
