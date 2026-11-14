import React from 'react';
import { OppositeTrendsResponse } from '../services/api';
import {
  BookOpen,
  ExternalLink,
  Download,
  ShieldCheck,
  AlertCircle,
  FileText,
  CheckCircle2,
  Layers,
  Activity,
  Info,
} from 'lucide-react';

interface DataMethodsViewProps {
  currentAnalysis: OppositeTrendsResponse | null;
}

export const DataMethodsView: React.FC<DataMethodsViewProps> = ({ currentAnalysis }) => {
  const handleExportAnalysisRecord = () => {
    if (!currentAnalysis) return;

    // Comprehensive, machine-readable scientific record
    const exportRecord = {
      record_type: "EarthTrend Lens Scientific Analysis Record",
      software_version: "2.1.0",
      generated_at: new Date().toISOString(),
      doi_citation: "10.5067/SXAVCZFAQLNO",
      investigation_context: {
        variable: currentAnalysis.variable,
        unit: currentAnalysis.unit,
        polarity_status: currentAnalysis.polarity_status,
        polarity_narrative: currentAnalysis.polarity_narrative,
        time_range: currentAnalysis.time_range,
      },
      methodology_specification: {
        trend_estimator: "Theil-Sen Non-parametric Median Slope",
        slope_formula: "median((X_j - X_i) / (t_j - t_i))",
        significance_test: "Mann-Kendall Rank Correlation with Tie and Continuity Correction",
        significance_threshold_alpha: 0.05,
        multiple_testing_control: "Benjamini-Hochberg False Discovery Rate (FDR q < 0.05)",
        climatology_treatment: "Month-of-year baseline removal (1981-2010 / observation span)",
        autocorrelation_mitigation: "Annual aggregation to mitigate monthly seasonality and lag-1 AR(1) memory",
      },
      domains: {
        domain_a: {
          name: currentAnalysis.region_a.name,
          bbox: currentAnalysis.region_a.bbox,
          provenance: currentAnalysis.region_a.analysis.metadata.source,
          doi: currentAnalysis.region_a.analysis.metadata.doi,
          statistics: currentAnalysis.region_a.analysis.statistics,
          annual_series: currentAnalysis.region_a.analysis.climatology.annual_series,
          climatology_baseline: currentAnalysis.region_a.analysis.climatology.climatology_baseline,
        },
        domain_b: {
          name: currentAnalysis.region_b.name,
          bbox: currentAnalysis.region_b.bbox,
          provenance: currentAnalysis.region_b.analysis.metadata.source,
          doi: currentAnalysis.region_b.analysis.metadata.doi,
          statistics: currentAnalysis.region_b.analysis.statistics,
          annual_series: currentAnalysis.region_b.analysis.climatology.annual_series,
          climatology_baseline: currentAnalysis.region_b.analysis.climatology.climatology_baseline,
        },
      },
      caveats_and_limitations: [
        "Opposing historical trajectories establish observational divergence, not counterfactual anthropogenic causation.",
        "Annual aggregation reduces month-to-month persistence but does not eliminate potential decadal-scale autocorrelation.",
        "Spatial grid cells are evaluated with Benjamini-Hochberg FDR control; stippled cells denote q < 0.05.",
      ],
    };

    const blob = new Blob([JSON.stringify(exportRecord, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `earthtrend_analysis_record_${currentAnalysis.variable}_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const isGLDAS = currentAnalysis?.variable.includes('Moist') || currentAnalysis?.variable.includes('Soil');

  return (
    <div className="space-y-6">
      {/* ── Scientific Charter Banner ────────────────────────────── */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-teal-600" />
            <h2 className="text-lg font-bold text-slate-900">
              Data Provenance, Statistical Methodology &amp; Open Science
            </h2>
          </div>
          <p className="text-xs text-slate-600 mt-1.5 max-w-3xl leading-relaxed">
            EarthTrend Lens documents its data sources, processing steps, statistical formulations, assumptions,
            and limitations. Each investigation reports the provenance of the data and the methods actually applied,
            enabling independent examination and scientific audit.
          </p>
        </div>

        {currentAnalysis && (
          <button
            onClick={handleExportAnalysisRecord}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-sm transition-all cursor-pointer whitespace-nowrap"
            title="Download full machine-readable analysis record, inputs, and regression metrics"
          >
            <Download className="w-3.5 h-3.5" /> Export Analysis Record (JSON)
          </button>
        )}
      </div>

      {/* ── Active Investigation Context Pill ─────────────────────── */}
      {currentAnalysis && (
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-teal-700" />
            <span className="font-semibold text-slate-800">Current Investigation Context:</span>
            <span className="font-mono bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-700">
              {currentAnalysis.variable} ({currentAnalysis.unit})
            </span>
            <span className="text-slate-500">
              [{currentAnalysis.time_range[0]} – {currentAnalysis.time_range[1]}]
            </span>
          </div>
          <div className="flex items-center gap-3 font-mono text-[11px] text-slate-600">
            <span>Domain A: <strong className="text-slate-800">{currentAnalysis.region_a.name}</strong></span>
            <span className="text-slate-300">|</span>
            <span>Domain B: <strong className="text-slate-800">{currentAnalysis.region_b.name}</strong></span>
          </div>
        </div>
      )}

      {/* ── Grid: Section 1 & Section 2 ──────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Section 1: Data Sources & Provenance */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <h3 className="text-sm font-bold text-slate-900">
                01 — Data Sources &amp; Physical Parameters
              </h3>
            </div>
            {isGLDAS ? (
              <span className="text-[10px] font-mono font-semibold bg-teal-100 text-teal-800 px-2 py-0.5 rounded">
                Active Source: GLDAS 2.1
              </span>
            ) : (
              <span className="text-[10px] font-mono font-semibold bg-sky-100 text-sky-800 px-2 py-0.5 rounded">
                Active Source: POWER / MERRA-2
              </span>
            )}
          </div>

          <div className="space-y-3.5 text-xs text-slate-600">
            {/* NASA GLDAS Noah 2.1 */}
            <div className={`p-3.5 rounded-lg border transition-colors ${
              isGLDAS ? 'bg-teal-50/50 border-teal-200' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center justify-between font-semibold text-slate-800 mb-1">
                <span>NASA GLDAS Noah Land Surface Model L4 Monthly 0.25° × 0.25° V2.1</span>
                <span className="font-mono text-[10px] bg-teal-100 text-teal-800 px-1.5 py-0.5 rounded">
                  0.25° Grid
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mb-2 leading-relaxed">
                Provider: NASA Goddard Earth Sciences Data and Information Services Center (GES DISC). Primary dataset ID: <code>GLDAS_NOAH025_M.2.1</code>. Open-loop offline land surface model simulation driven by atmospheric meteorological forcing; not a data-assimilated product.
              </p>
              <div className="flex items-center gap-2 text-[11px] mb-2.5">
                <span className="font-semibold text-slate-700">Digital Object Identifier (DOI):</span>
                <a
                  href="https://doi.org/10.5067/SXAVCZFAQLNO"
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-teal-600 hover:underline flex items-center gap-1 font-semibold"
                >
                  10.5067/SXAVCZFAQLNO <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Physical Parameterization Explanation */}
              <div className="p-2.5 bg-white/80 rounded border border-slate-200 text-[11px] space-y-1.5">
                <span className="font-bold text-slate-800 block">Root-Zone Parameterization &amp; Vegetation Tiling:</span>
                <p className="leading-relaxed text-slate-600">
                  In Noah LSM (v3.6), <code>RootMoist_inst</code> (Root Zone Soil Moisture) does not occupy a single fixed physical depth across the globe.
                  Rather, the effective root zone is dynamically parameterized by vegetation type (e.g. grassland utilizes layers 1–3 to ~100 cm, whereas forest biomes tap all four layers to ~200 cm). Sub-grid vegetation tiles are weighted by land-cover fractional coverage to produce the reported grid-cell total (kg/m²).
                </p>
                <p className="leading-relaxed text-amber-800 bg-amber-50/70 p-2 rounded border border-amber-200/60 font-medium">
                  <strong>Methodological Limitation:</strong> Cross-region comparisons of absolute <code>RootMoist_inst</code> means (e.g. 242.73 kg/m² in Iberia vs 499.38 kg/m² in Scandinavia) reflect vegetation biome profiles rather than standardized fixed-depth soil-water differences. For depth-standardized comparisons, a derived 0–100 cm field combining layers 1–3 (<code>SoilMoi0_10cm + SoilMoi10_40cm + SoilMoi40_100cm</code>) should be referenced.
                </p>
              </div>
            </div>

            {/* NASA POWER / MERRA-2 */}
            <div className={`p-3.5 rounded-lg border transition-colors ${
              !isGLDAS ? 'bg-sky-50/50 border-sky-200' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center justify-between font-semibold text-slate-800 mb-1">
                <span>NASA POWER / MERRA-2 Atmospheric Reanalysis</span>
                <span className="font-mono text-[10px] bg-sky-100 text-sky-800 px-1.5 py-0.5 rounded">
                  0.5° × 0.625° Grid
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mb-2 leading-relaxed">
                NASA POWER (Prediction of Worldwide Energy Resources) is a targeted data service delivering meteorological parameters derived from the NASA Global Modeling and Assimilation Office (GMAO) MERRA-2 reanalysis.
              </p>
              <div className="flex flex-col gap-1 text-[11px] mb-2">
                <div>
                  <span className="font-semibold text-slate-700">Evaluated Parameters:</span>{' '}
                  <span className="font-mono text-slate-600">T2M (2m Air Temp, °C), PRECTOTCORR (Precipitation, mm/day)</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-700">Query Service:</span>{' '}
                  <span className="font-mono text-slate-600">NASA Langley POWER API (Monthly Temporal Aggregations)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Mathematical Formulations & Quality Control */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-5 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <FileText className="w-4 h-4 text-teal-600" />
            <h3 className="text-sm font-bold text-slate-900">
              02 — Mathematical Formulations &amp; Statistical Engine
            </h3>
          </div>

          <div className="space-y-3 text-xs text-slate-600">
            {/* Theil-Sen */}
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="font-bold text-slate-800 block mb-1">
                Theil–Sen Robust Median Slope Estimator
              </span>
              <div className="p-2 bg-white rounded border border-slate-200 font-mono text-[11px] text-slate-900 my-1 text-center">
                β_Sen = median &#123; (X_j - X_i) / (t_j - t_i) : 1 ≤ i &lt; j ≤ n &#125;
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Computes pairwise slopes across all observation timestamps (with elapsed time t_j - t_i in years).
                The estimator possesses an asymptotic breakdown point of ~29.3% in simple regression, providing robustness against isolated weather extremes and volcanic anomalies. <em>(Note: It does not eliminate serial correlation or structural regime shifts.)</em>
              </p>
            </div>

            {/* Mann-Kendall with Continuity Correction */}
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="font-bold text-slate-800 block mb-1">
                Mann–Kendall Rank Correlation with Tie &amp; Continuity Corrections
              </span>
              <div className="p-2 bg-white rounded border border-slate-200 font-mono text-[10px] text-slate-900 my-1 space-y-0.5 text-center">
                <div>S = Σ_{`i=1`}^{`n-1`} Σ_{`j=i+1`}^{`n`} sgn(X_j - X_i)</div>
                <div>Var(S) = [n(n-1)(2n+5) - Σ t_k(t_k-1)(2t_k+5)] / 18</div>
                <div>Z = (S - sgn(S)) / √Var(S) &nbsp; [for S ≠ 0]</div>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Non-parametric rank test for monotonic trends. Computes standardized test statistic Z and two-tailed p-value against the null hypothesis H₀ of no monotonic trend at α = 0.05.
              </p>
            </div>

            {/* Month-of-Year Climatology */}
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="font-bold text-slate-800 block mb-1">
                Month-of-Year Climatology &amp; De-seasonalization
              </span>
              <div className="p-2 bg-white rounded border border-slate-200 font-mono text-[11px] text-slate-900 my-1 text-center">
                X̄_m = (1 / Y_m) Σ_{`y=1`}^{`Y_m`} X_{`y,m`}, &emsp; X'_{`y,m`} = X_{`y,m`} - X̄_m
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                X̄_m represents the multi-year mean for calendar month m. Subtracting X̄_m isolates monthly departures from the mean seasonal harmonic cycle without distorting multi-decadal trends.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 3: Spatial Multiple Testing & Autocorrelation Caveats ── */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-5 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Layers className="w-4 h-4 text-teal-600" />
          <h3 className="text-sm font-bold text-slate-900">
            03 — Multiple Testing Control &amp; Autocorrelation Treatment
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600 leading-relaxed">
          {/* Benjamini-Hochberg FDR */}
          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
            <span className="font-bold text-slate-800 block">
              Spatial Multiple-Testing: Benjamini–Hochberg False Discovery Rate (FDR)
            </span>
            <p>
              When evaluating hundreds of spatial grid cells across Domain A and Domain B (Screen 3), conducting individual hypothesis tests at uncorrected α = 0.05 guarantees numerous false positives through multiple comparisons.
            </p>
            <p>
              EarthTrend Lens applies the <strong>Benjamini–Hochberg (1995) FDR procedure</strong>. Raw p-values are ranked p_(1) ≤ ... ≤ p_(m) and adjusted q-values are calculated.
              Cells displayed with stippling dots (•) satisfy FDR q &lt; 0.05, controlling the expected proportion of false discoveries across the geographic field.
            </p>
          </div>

          {/* Autocorrelation Boundaries */}
          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
            <span className="font-bold text-slate-800 block">
              Serial Autocorrelation Treatment &amp; Methodological Limits
            </span>
            <p>
              Classical Mann–Kendall testing assumes statistically independent observations. Environmental time series often exhibit positive lag-1 autocorrelation (AR(1) red noise), which artificially inflates test statistics and creates false-positive trends.
            </p>
            <p>
              EarthTrend Lens mitigates month-to-month persistence by calculating its primary Mann–Kendall rank tests on <strong>annual aggregated means</strong> rather than raw monthly records.
              <em>Caveat:</em> Decadal-scale internal climate variability (such as multi-year ENSO or Atlantic Multidecadal modes) can still introduce low-frequency autocorrelation that annual averaging alone cannot eliminate.
            </p>
          </div>
        </div>
      </div>

      {/* ── Section 4: Interpretation and Limitations ─────────────── */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-5 space-y-3">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <h3 className="text-sm font-bold text-slate-900">
            04 — Scientific Interpretation &amp; Non-Causal Boundaries
          </h3>
        </div>

        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 space-y-2.5 leading-relaxed">
          <p>
            <strong>Descriptive Model-Based Trends:</strong> GLDAS Noah 2.1 estimates indicate negative Theil–Sen root-zone soil-moisture slopes across 824 of 851 evaluated Iberian land cells during 2000–2024 (regional mean: -1.097 kg/m²/yr), alongside a regional mean slope of -0.966 kg/m²/yr in Southern Scandinavia. These are descriptive model-based trend estimates; statistical significance and causal attribution have not been established.
          </p>
          <p>
            <strong>Observational Correlation vs. Causal Attribution:</strong> Detecting concurrent warming alongside negative soil-moisture slopes demonstrates co-occurring historical trajectories. This observational correlation <strong>does not</strong> by itself prove that atmospheric warming caused the soil moisture decline, nor does it establish an atmospheric teleconnection or closed hydrological dipole. Rigorous causal attribution requires coupled General Circulation Model (GCM) counterfactual experiments and atmospheric moisture-flux convergence analysis.
          </p>
        </div>
      </div>
    </div>
  );
};
