import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import { OppositeTrendsResponse } from '../services/api';
import { SlidersHorizontal, Info } from 'lucide-react';

interface DeseasonalizerChartProps {
  data: OppositeTrendsResponse;
}

type ViewMode = 'deseasonalized' | 'annual_trend' | 'raw_seasonal';

export const DeseasonalizerChart: React.FC<DeseasonalizerChartProps> = ({ data }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('annual_trend');

  const regA = data.region_a;
  const regB = data.region_b;

  // Prepare traces based on mode
  const traces: any[] = [];

  if (viewMode === 'raw_seasonal') {
    // 288 monthly observations
    const monthlyA = regA.analysis.climatology.monthly_series;
    const monthlyB = regB.analysis.climatology.monthly_series;

    traces.push({
      x: monthlyA.map((m) => m.date),
      y: monthlyA.map((m) => m.observed),
      mode: 'lines',
      name: `${regA.name} (Raw Monthly)`,
      line: { color: '#EF4444', width: 1.5 },
      opacity: 0.85,
    });

    traces.push({
      x: monthlyB.map((m) => m.date),
      y: monthlyB.map((m) => m.observed),
      mode: 'lines',
      name: `${regB.name} (Raw Monthly)`,
      line: { color: '#14B8A6', width: 1.5 },
      opacity: 0.85,
    });
  } else if (viewMode === 'deseasonalized') {
    // Monthly anomalies (seasonal cycle subtracted)
    const monthlyA = regA.analysis.climatology.monthly_series;
    const monthlyB = regB.analysis.climatology.monthly_series;

    traces.push({
      x: monthlyA.map((m) => m.date),
      y: monthlyA.map((m) => m.anomaly),
      mode: 'lines',
      name: `${regA.name} (Monthly Anomaly)`,
      line: { color: '#EF4444', width: 2 },
    });

    traces.push({
      x: monthlyB.map((m) => m.date),
      y: monthlyB.map((m) => m.anomaly),
      mode: 'lines',
      name: `${regB.name} (Monthly Anomaly)`,
      line: { color: '#14B8A6', width: 2 },
    });
  } else {
    // Annual Aggregates + Sen's Slope Lines
    const annualA = regA.analysis.climatology.annual_series;
    const annualB = regB.analysis.climatology.annual_series;

    const yearsA = annualA.map((a) => a.year);
    const yearsB = annualB.map((a) => a.year);

    const statsA = regA.analysis.statistics;
    const statsB = regB.analysis.statistics;

    // Actual observed annual means
    traces.push({
      x: yearsA,
      y: annualA.map((a) => a.annual_mean),
      mode: 'markers+lines',
      name: `${regA.name} (Observed Annual)`,
      marker: { color: '#EF4444', size: 6 },
      line: { color: '#EF4444', width: 1.5, dash: 'dot' },
    });

    // Sen's slope trendline for A
    traces.push({
      x: yearsA,
      y: yearsA.map((y) => statsA.sens_intercept + statsA.sens_slope * y),
      mode: 'lines',
      name: `${regA.name} (Sen's Slope: ${statsA.sens_slope > 0 ? '+' : ''}${statsA.sens_slope}/yr)`,
      line: { color: '#F87171', width: 3 },
    });

    // Actual observed annual means for B
    traces.push({
      x: yearsB,
      y: annualB.map((b) => b.annual_mean),
      mode: 'markers+lines',
      name: `${regB.name} (Observed Annual)`,
      marker: { color: '#14B8A6', size: 6 },
      line: { color: '#14B8A6', width: 1.5, dash: 'dot' },
    });

    // Sen's slope trendline for B
    traces.push({
      x: yearsB,
      y: yearsB.map((y) => statsB.sens_intercept + statsB.sens_slope * y),
      mode: 'lines',
      name: `${regB.name} (Sen's Slope: ${statsB.sens_slope > 0 ? '+' : ''}${statsB.sens_slope}/yr)`,
      line: { color: '#2DD4BF', width: 3 },
    });
  }

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col gap-4">
      {/* Chart Header & Mode Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-teal-400" />
            <h2 className="text-base font-bold text-white tracking-tight">
              Synchronized Divergent Time Series
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            Variable: <span className="font-semibold text-slate-200">{data.variable}</span> ({data.unit}) • Timeline:{' '}
            {data.time_range[0]} – {data.time_range[1]}
          </p>
        </div>

        {/* The Seasonal De-Noiser Mode Selector */}
        <div className="inline-flex rounded-lg bg-slate-950 p-1 border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setViewMode('annual_trend')}
            className={`text-xs px-3 py-1.5 rounded-md font-medium transition-all ${
              viewMode === 'annual_trend'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Sen's Trend & Annual
          </button>
          <button
            onClick={() => setViewMode('deseasonalized')}
            className={`text-xs px-3 py-1.5 rounded-md font-medium transition-all ${
              viewMode === 'deseasonalized'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            De-seasonalized Anomaly
          </button>
          <button
            onClick={() => setViewMode('raw_seasonal')}
            className={`text-xs px-3 py-1.5 rounded-md font-medium transition-all ${
              viewMode === 'raw_seasonal'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Raw Monthly Jitter
          </button>
        </div>
      </div>

      {/* Explanatory callout for judges */}
      <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl px-4 py-2.5 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-slate-300 leading-relaxed">
          {viewMode === 'raw_seasonal' && (
            <span>
              <strong>The Seasonal Mirage:</strong> Raw monthly observations exhibit strong annual oscillations. Without removing the 24-year seasonal baseline, short-term weather noise masks underlying multi-decadal climate trajectories.
            </span>
          )}
          {viewMode === 'deseasonalized' && (
            <span>
              <strong>De-Seasonalized Anomaly Engine:</strong> Each month's 24-year climatological mean is subtracted [ΔX = Observed - Climatology], isolating pure inter-annual drift.
            </span>
          )}
          {viewMode === 'annual_trend' && (
            <span>
              <strong>Theil-Sen Monotonic Divergence:</strong> Non-parametric median slope lines eliminate outlier bias. Notice the polar opposite directions of the two regions under the identical global forcing.
            </span>
          )}
        </p>
      </div>

      {/* Plotly Canvas */}
      <div className="w-full h-[400px]">
        <Plot
          data={traces}
          layout={{
            autosize: true,
            paper_bgcolor: 'transparent',
            plot_bgcolor: 'transparent',
            margin: { l: 50, r: 20, t: 20, b: 50 },
            showlegend: true,
            legend: {
              orientation: 'h',
              yanchor: 'bottom',
              y: 1.02,
              xanchor: 'right',
              x: 1,
              font: { color: '#94A3B8', size: 11 },
            },
            xaxis: {
              gridcolor: '#1E293B',
              zerolinecolor: '#334155',
              tickfont: { color: '#94A3B8' },
            },
            yaxis: {
              gridcolor: '#1E293B',
              zerolinecolor: '#334155',
              tickfont: { color: '#94A3B8' },
              title: {
                text: `${data.variable} (${data.unit})`,
                font: { color: '#94A3B8', size: 12 },
              },
            },
          }}
          useResizeHandler={true}
          style={{ width: '100%', height: '100%' }}
          config={{ responsive: true, displayModeBar: false }}
        />
      </div>
    </div>
  );
};
