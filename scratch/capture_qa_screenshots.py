import os
import time
from pathlib import Path
from playwright.sync_api import sync_playwright

ARTIFACTS_DIR = Path(r"C:\Users\Ravichandran\.gemini\antigravity\brain\017232f2-0e68-4a21-8950-349ea19613b6")
ARTIFACTS_DIR.mkdir(parents=True, exist_ok=True)

def capture_all():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            viewport={"width": 1440, "height": 900},
            device_scale_factor=2
        )
        page = context.new_page()

        print("[QA BROWSER] Navigating to http://localhost:5173...")
        page.goto("http://localhost:5173", wait_until="networkidle")
        time.sleep(3)

        # 1. Investigate Screen with Default Dual Domain Map
        path1 = ARTIFACTS_DIR / "qa_01_investigate_dual_domain_map.png"
        page.screenshot(path=str(path1), full_page=False)
        print(f"[QA CAPTURED] 1. Investigate Map -> {path1.name}")

        # 2. Temperature Trend
        print("[QA BROWSER] Selecting T2M + Trend...")
        # Click T2M Temp
        t2m_btn = page.get_by_role("button", name="T2M Temp")
        if t2m_btn.is_visible():
            t2m_btn.click()
        # Click Trend (Theil-Sen)
        trend_btn = page.get_by_role("button", name="Trend (Theil-Sen)")
        if trend_btn.is_visible():
            trend_btn.click()
        time.sleep(4)
        path2 = ARTIFACTS_DIR / "qa_02_temperature_trend.png"
        page.screenshot(path=str(path2), full_page=False)
        print(f"[QA CAPTURED] 2. Temperature Trend -> {path2.name}")

        # 3. Precipitation Trend
        print("[QA BROWSER] Selecting Rainfall + Trend...")
        rain_btn = page.get_by_role("button", name="Rainfall")
        if rain_btn.is_visible():
            rain_btn.click()
        time.sleep(4)
        path3 = ARTIFACTS_DIR / "qa_03_precipitation_trend.png"
        page.screenshot(path=str(path3), full_page=False)
        print(f"[QA CAPTURED] 3. Precipitation Trend -> {path3.name}")

        # 4. GLDAS Soil Moisture Period Mean
        print("[QA BROWSER] Selecting GLDAS Soil + Period Mean...")
        gldas_btn = page.get_by_role("button", name="GLDAS Soil")
        if gldas_btn.is_visible():
            gldas_btn.click()
        mean_btn = page.get_by_role("button", name="Period Mean")
        if mean_btn.is_visible():
            mean_btn.click()
        time.sleep(4)
        path4 = ARTIFACTS_DIR / "qa_04_soil_moisture_raster.png"
        page.screenshot(path=str(path4), full_page=False)
        print(f"[QA CAPTURED] 4. GLDAS Soil Moisture -> {path4.name}")

        # Run investigation to seed Analysis & Spatial Explorer
        print("[QA BROWSER] Clicking Run Investigation...")
        run_btn = page.get_by_role("button", name="Run investigation")
        if run_btn.is_visible():
            run_btn.click()
            time.sleep(4)

        # 5. Analysis Screen
        print("[QA BROWSER] Navigating to Analysis tab...")
        analysis_tab = page.get_by_role("button", name="Analysis")
        if analysis_tab.is_visible():
            analysis_tab.click()
            time.sleep(3)
            path5 = ARTIFACTS_DIR / "qa_05_analysis_timeseries.png"
            page.screenshot(path=str(path5), full_page=False)
            print(f"[QA CAPTURED] 5. Analysis Screen -> {path5.name}")

        # 6. Spatial Explorer Screen
        print("[QA BROWSER] Navigating to Spatial Explorer tab...")
        spatial_tab = page.get_by_role("button", name="Spatial Explorer")
        if spatial_tab.is_visible():
            spatial_tab.click()
            time.sleep(3)
            path6 = ARTIFACTS_DIR / "qa_06_spatial_explorer.png"
            page.screenshot(path=str(path6), full_page=False)
            print(f"[QA CAPTURED] 6. Spatial Explorer -> {path6.name}")

        # 7. Data & Methods Screen
        print("[QA BROWSER] Navigating to Data & Methods tab...")
        methods_tab = page.get_by_role("button", name="Data & Methods")
        if methods_tab.is_visible():
            methods_tab.click()
            time.sleep(2)
            path7 = ARTIFACTS_DIR / "qa_07_data_methods.png"
            page.screenshot(path=str(path7), full_page=False)
            print(f"[QA CAPTURED] 7. Data & Methods -> {path7.name}")

        browser.close()
        print("\n[SUCCESS] All 7 presentation assets captured cleanly!")

if __name__ == "__main__":
    capture_all()
