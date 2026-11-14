import React from 'react';
import { OppositeTrendsResponse } from '../services/api';
import { BookOpen, ExternalLink, Download, ShieldCheck, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';

interface DataMethodsViewProps {
  currentAnalysis: OppositeTrendsResponse | null;
}

export const DataMethodsView: React.FC<DataMethodsViewProps> = ({ currentAnalysis }) => {
  const handleExportJSON = () => {
    if (!currentAnalysis) return;
    const blob = new Blob([JSON.stringify(currentAnalysis, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `earthtrend_lens_forensic_export_${currentAnalysis.variable}_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-teal-600" />
            <h2 className="text-lg font-bold text-slate-900">
              Open Science, Mathematical Formulations &amp; Data Provenance
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-3xl leading-relaxed">
            EarthTrend Lens adheres to open-science reproducibility standards. Every calculation is fully auditable, non-parametric, and grounded in published NASA GES DISC and Langley reanalysis archives.
          </p>
        </div>

        {currentAnalysis && (
          <button
            onClick={handleExportJSON}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-sm transition-all cursor-pointer whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5" /> Export Forensic JSON
          </button>
        )}
      </div>

      {/* Grid of Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Section 1: NASA Data Sources & DOIs */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-5 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <h3 className="text-sm font-bold text-slate-900">
              1. Primary NASA Data Assets &amp; DOIs
            </h3>
          </div>

          <div className="space-y-3 text-xs text-slate-600">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex items-center justify-between font-semibold text-slate-800 mb-1">
                <span>NASA GLDAS Noah Land Surface Model 2.1</span>
                <span className="font-mono text-[10px] bg-teal-100 text-teal-800 px-1.5 py-0.5 rounded">
                  0.25° Monthly
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mb-2">
                Provider: NASA Goddard Earth Sciences Data and Information Services Center (GES DISC).
              </p>
              <div className="flex items-center gap-2 text-[11px]">
                <span className="font-semibold text-slate-700">Digital Object Identifier:</span>
                <a
                  href="https://doi.org/10.5067/SXAVCZFAQLNO"
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-teal-600 hover:underline flex items-center gap-1"
                >
                  10.5067/SXAVCZFAQLNO <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex items-center justify-between font-semibold text-slate-800 mb-1">
                <span>NASA POWER / MERRA-2 Atmospheric Reanalysis</span>
                <span className="font-mono text-[10px] bg-sky-100 text-sky-800 px-1.5 py-0.5 rounded">
                  0.5° × 0.625°
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mb-2">
                Provider: NASA Langley Research Center. Near-surface air temperature (T2M) and bias-corrected precipitation (PRECTOTCORR).
              </p>
              <div className="flex items-center gap-2 text-[11px]">
                <span className="font-semibold text-slate-700">Endpoint:</span>
                <span className="font-mono text-slate-600">power.larc.nasa.gov/api/temporal/monthly/point</span>
              </div>
            </div>

            <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg text-amber-900 space-y-1 text-[11px]">
              <div className="font-bold flex items-center gap-1 text-amber-800">
                <AlertCircle className="w-3.5 h-3.5" />
                Critical Physical Parameterization Note:
              </div>
              <p className="leading-relaxed">
                In the Noah Land Surface Model (v3.6), <code>RootMoist_inst</code> (Root Zone Soil Moisture) does not occupy an arbitrary fixed depth of 0–100 cm. Instead, root-zone depth is dynamically parameterized by the dominant land-cover vegetation classification at each grid cell.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Mathematical Formulations */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-5 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <FileText className="w-4 h-4 text-teal-600" />
            <h3 className="text-sm font-bold text-slate-900">
              2. Rigorous Mathematical Formulations
            </h3>
          </div>

          <div className="space-y-3 text-xs text-slate-600">
            {/* Theil-Sen */}
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="font-bold text-slate-800 block mb-1">
                Theil-Sen Robust Median Slope Estimator
              </span>
              <div className="p-2 bg-white rounded border border-slate-200 font-mono text-[11px] text-slate-900 my-1.5 text-center">
                β = median &#123; (X_j - X_i) / (j - i) : 1 ≤ i &lt; j ≤ n &#125;
              </div>
              <p className="text-[11px] text-slate-500">
                Non-parametric rate estimator with a 29% breakdown bound against extreme weather shocks, wildfire anomalies, and volcanic forcing outliers.
              </p>
            </div>

            {/* Mann-Kendall */}
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="font-bold text-slate-800 block mb-1">
                Mann-Kendall Rank Correlation Test with Tie Corrections
              </span>
              <div className="p-2 bg-white rounded border border-slate-200 font-mono text-[11px] text-slate-900 my-1.5 text-center">
                S = Σ Σ sgn(X_j - X_i), &nbsp; Var(S) = [n(n-1)(2n+5) - Σ t_k(t_k-1)(2t_k+5)] / 18
              </div>
              <p className="text-[11px] text-slate-500">
                Computes standardized test statistic Z and two-tailed p-value against the null hypothesis H₀ of no monotonic trend at α = 0.05.
              </p>
            </div>

            {/* Climatological De-seasonalization */}
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="font-bold text-slate-800 block mb-1">
                Monthly Climatology De-seasonalization
              </span>
              <div className="p-2 bg-white rounded border border-slate-200 font-mono text-[11px] text-slate-900 my-1.5 text-center">
                ΔX_(y,m) = X_(y,m) - (1/Y) Σ X_(y,m)
              </div>
              <p className="text-[11px] text-slate-500">
                Eliminates the dominant solar harmonic oscillation to isolate multi-decadal hydrological drift.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Autocorrelation & Scientific Governance */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-5 space-y-3">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          3. Serial Autocorrelation Mitigation &amp; Non-Causal Interpretation
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600 leading-relaxed">
          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
            <span className="font-bold text-slate-800 block mb-1">
              Serial Autocorrelation Treatment
            </span>
            <p>
              Monthly environmental observations naturally exhibit significant lag-1 autocorrelation (AR(1) memory), which artificially inflates false-positive rates in rank tests. EarthTrend Lens calculates de-seasonalized anomalies for visual clarity, but restricts its primary Mann-Kendall hypothesis test to annual aggregations, minimizing red-noise bias while preserving multi-decadal signal fidelity.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
            <span className="font-bold text-slate-800 block mb-1">
              Empirical vs Causal Boundaries
            </span>
            <p>
              EarthTrend Lens quantifies the mathematical trajectory and statistical significance of environmental variables. Concordant or opposing trends between domains describe historical observational trajectories; they do not establish direct anthropogenic causation without coupled General Circulation Model (GCM) counterfactual attribution.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
