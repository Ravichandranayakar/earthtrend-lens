import React from 'react';
import { RegionAnalysis } from '../services/api';
import { ShieldCheck, TrendingDown, TrendingUp, AlertCircle, Scale } from 'lucide-react';

interface ForensicScorecardProps {
  region: RegionAnalysis;
  colorTheme: 'crimson' | 'teal';
}

export const ForensicScorecard: React.FC<ForensicScorecardProps> = ({ region, colorTheme }) => {
  const stats = region.analysis.statistics;
  const isCrimson = colorTheme === 'crimson';

  return (
    <div
      className={`rounded-xl border p-5 flex flex-col justify-between transition-all bg-white shadow-xs ${
        isCrimson ? 'border-red-200/80' : 'border-teal-200/80'
      }`}
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-3">
          <div>
            <span
              className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${
                isCrimson
                  ? 'bg-red-50 text-red-800 border-red-200'
                  : 'bg-teal-50 text-teal-800 border-teal-200'
              }`}
            >
              {isCrimson ? 'Domain Alpha' : 'Domain Beta'}
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-1">{region.name}</h3>
          </div>

          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center ${
              stats.sens_slope > 0 ? 'bg-sky-50 text-sky-700' : 'bg-red-50 text-red-700'
            }`}
          >
            {stats.sens_slope > 0 ? (
              <TrendingUp className="w-5 h-5" />
            ) : (
              <TrendingDown className="w-5 h-5" />
            )}
          </div>
        </div>

        {/* Primary Metric: Sen's Slope */}
        <div className="bg-slate-50/70 border border-slate-200 rounded-lg p-3.5 mb-3">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold text-slate-700">Theil-Sen Median Slope Rate</span>
            <span className="text-[10px] font-mono text-slate-400">Robust Estimator</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span
              className={`text-2xl font-extrabold tracking-tight font-mono ${
                stats.sens_slope > 0 ? 'text-sky-700' : 'text-red-700'
              }`}
            >
              {stats.sens_slope > 0 ? '+' : ''}
              {stats.sens_slope}
            </span>
            <span className="text-xs font-semibold text-slate-600">
              {region.analysis.metadata.unit}/year
            </span>
            <span className="text-xs text-slate-400 font-mono">
              ({stats.sens_slope > 0 ? '+' : ''}{(stats.sens_slope * 10).toFixed(3)}/decade)
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            95% Confidence Interval: [{stats.confidence_interval_95[0]}, {stats.confidence_interval_95[1]}]
          </p>
        </div>

        {/* Statistical Significance Grid */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">
              Mann-Kendall Z
            </span>
            <span className="text-sm font-bold font-mono text-slate-900">
              {stats.standardized_z > 0 ? '+' : ''}
              {stats.standardized_z}
            </span>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">
              p-value (Two-Tailed)
            </span>
            <span
              className={`text-sm font-bold font-mono ${
                stats.is_significant ? 'text-emerald-700' : 'text-amber-700'
              }`}
            >
              {stats.p_value < 0.0001 ? '< 0.0001' : stats.p_value}
            </span>
          </div>
        </div>

        {/* Verdict Badge */}
        <div
          className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs font-semibold mb-3 ${
            stats.is_significant
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-amber-50 border-amber-200 text-amber-800'
          }`}
        >
          {stats.is_significant ? (
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
          )}
          <span>
            {stats.is_significant
              ? 'STATISTICALLY SIGNIFICANT (p < 0.05)'
              : 'DYNAMIC EQUILIBRIUM (p ≥ 0.05)'}
          </span>
        </div>

        {/* Verdict Description */}
        <p className="text-xs text-slate-600 leading-relaxed bg-slate-50/50 p-3 rounded-lg border border-slate-200/70">
          {stats.verdict_text}
        </p>
      </div>

      {/* OLS Sensitivity Benchmark */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <div className="flex items-center gap-1.5">
          <Scale className="w-3.5 h-3.5 text-slate-400" />
          <span>OLS Sensitivity Check:</span>
        </div>
        <span className="font-mono text-slate-700">
          {stats.ols_comparison.ols_slope > 0 ? '+' : ''}
          {stats.ols_comparison.ols_slope}/yr (R²={stats.ols_comparison.r_squared})
        </span>
      </div>
    </div>
  );
};
