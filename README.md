# EarthTrend Lens: Spatial Disparity & Opposite Trend Detective

[![NASA Space Apps Challenge 2026](https://img.shields.io/badge/NASA%20Space%20Apps-2026-blue.svg)](https://www.spaceappschallenge.org/)
[![Challenge](https://img.shields.io/badge/Challenge-Earth%20System%20Trend%20Detective-orange.svg)](https://www.spaceappschallenge.org/2026/challenges/earth-system-trend-detective/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI%20%7C%20Python%203.12-009688.svg)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/Frontend-React%2018%20%7C%20Vite%20%7C%20Tailwind-61DAFB.svg)](https://vitejs.dev)
[![DOI](https://img.shields.io/badge/NASA%20GLDAS%20DOI-10.5067%2FSXAVCZFAQLNO-red.svg)](https://doi.org/10.5067/SXAVCZFAQLNO)

> **Built for NASA Space Apps Challenge 2026** by Team **Synqora**  
> **Lead Architect & Developer:** Ravi  

---

## 1. The Challenge & Scientific Mystery

Earth's environmental systems are continuously changing, but **change is not geographically uniform**. The central motif of the NASA *Earth System Trend Detective* challenge is that:

> *"A measured Earth science data variable can trend one way in one region and the opposite way in another, even when the same process drives both."*

Standard environmental dashboards commit two fundamental errors:
1. **The Aggregation Trap:** Global or national averages cancel out opposing regional extremes. An average global trend of $\approx 0$ can conceal catastrophic drying in agricultural zones alongside unprecedented flooding in sub-polar biomes.
2. **The Seasonal Mirage:** Raw monthly observation series are dominated by annual solar/monsoonal oscillations. Without rigorous climatological de-seasonalization, casual users and linear regressions confuse ordinary seasonal variance with long-term climate change.

**EarthTrend Lens** is an interactive, high-throughput geospatial analytics engine that bridges NASA Earth-system reanalysis data with robust non-parametric statistical hypothesis testing.

---

## 2. Core Features & Strategic Differentiators

* 🔍 **Opposite Trend Discovery Engine:** Automatically contrasts geographically divergent pairs under identical macro-climate regimes (e.g., severe root-zone drying in the Mediterranean vs. accelerated moisture retention in Scandinavia).
* 🎛️ **The "Seasonal De-Noiser" Interactive Toggle:** Users can switch between:
  1. *Raw Monthly Jitter:* Displays all 288 monthly observations showing seasonal sine waves.
  2. *De-seasonalized Anomaly:* Subtracts each month's 24-year climatological mean ($\Delta X_{y,m} = X_{y,m} - \bar{X}_m$) to isolate pure inter-annual trajectory.
  3. *Sen's Monotonic Trend:* Renders robust outlier-resilient trendlines with 95% confidence intervals.
* ⚖️ **Scientific Truth-Teller (Zero Hallucination):** No black-box machine learning in the calculation path. Every trend is tested via the **Mann-Kendall Rank Test** with tie-corrected variance. The system transparently flags results as `STATISTICALLY SIGNIFICANT (p < 0.05)` or `DYNAMIC EQUILIBRIUM (p >= 0.05)`.
* ⚡ **Sub-Second Response Architecture:** Utilizes lazy spatial subsetting, vectorized NumPy operations, and pre-computed demonstration caches to eliminate the multi-minute wait times typical of legacy scientific tools like NASA Giovanni.

---

## 3. NASA Datasets & Provenance

EarthTrend Lens is powered by NASA Earth Science data:

1. **NASA GLDAS Noah Land Surface Model L4 Monthly 0.25° V2.1**
   - **Product ID:** `GLDAS_NOAH025_M` (Version 2.1)
   - **DOI:** [10.5067/SXAVCZFAQLNO](https://doi.org/10.5067/SXAVCZFAQLNO)
   - **Target Variable:** `RootMoist_inst` (Root Zone Soil Moisture, $0\text{--}100\text{ cm}$ depth, $\text{kg/m}^2$)
   - **Archive:** NASA Goddard Earth Sciences Data and Information Services Center (GES DISC)

2. **NASA POWER Monthly Temporal API (MERRA-2 Atmospheric Reanalysis)**
   - **Provider:** NASA Langley Research Center
   - **Variables:** `T2M` (Near-surface 2-meter air temperature, $^\circ\text{C}$), `PRECTOTCORR` (Precipitation, $\text{mm/day}$)

---

## 4. System Architecture

```
┌────────────────────────────────────────────────────────┐
│                   PRESENTATION TIER                    │
│   React 18 + Vite + Tailwind CSS + Plotly.js + Lucide  │
└───────────────────────────▲────────────────────────────┘
                            │ (HTTP / JSON REST)
┌───────────────────────────▼────────────────────────────┐
│                    APPLICATION TIER                    │
│     FastAPI (Asynchronous Uvicorn Service Gateway)     │
└───────────────────────────▲────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│              SCIENTIFIC STATISTICAL ENGINE             │
│   • Monthly Climatological De-seasonalizer             │
│   • Theil-Sen Robust Median Slope Estimator            │
│   • Mann-Kendall Monotonic Rank Test (Z & p-value)     │
│   • Ordinary Least Squares (OLS) Benchmark Comparison  │
└───────────────────────────▲────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│                  DATA INGESTION LAYER                  │
│   • NASA GES DISC GLDAS Noah 2.1 (NetCDF-4 / xarray)   │
│   • NASA POWER Monthly REST API (MERRA-2)              │
│   • Local Spatial Parquet & JSON Cache Store           │
└────────────────────────────────────────────────────────┘
```

---

## 5. Quickstart: Running the System Locally

### Prerequisites
- Python 3.11+
- Node.js 18+ and npm

### 1. Start the Backend API (FastAPI)
```bash
cd backend
pip install -r requirements.txt
python main.py
```
*Backend runs on:* `http://localhost:8000`  
*Interactive Swagger API Docs:* `http://localhost:8000/docs`

### 2. Start the Frontend (Vite + React)
```bash
cd frontend
npm install
npm run dev
```
*Frontend runs on:* `http://localhost:5173`

---

## 6. Curated Demonstration Cases for Judges

To facilitate immediate evaluation, EarthTrend Lens includes three one-click case studies:
1. **Case 1: European Hydrological Polarity** — Contrasting Mediterranean drying (Iberia, $-0.27\text{ kg/m}^2/\text{yr}$, $p < 0.001$) against high-latitude moisture accumulation (Scandinavia, $+0.20\text{ kg/m}^2/\text{yr}$, $p < 0.001$).
2. **Case 2: North American Megadrought** — Colorado River Basin soil depletion vs. humid storm track intensification in the Great Lakes basin.
3. **Case 3: Sahel Aridity vs. Boreal Arctic Amplification** — Sub-Saharan precipitation shifts vs. rapid Siberian permafrost thaw.

---

## 7. License & Space Agency Attribution
Developed for the **NASA Space Apps Challenge 2026**. Open source under the MIT License. NASA datasets are provided free of charge by NASA's Earth Science Data Systems (ESDS) program.
