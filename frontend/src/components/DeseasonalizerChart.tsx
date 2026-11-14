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
      line: { color: '#dc2626', width: 1.5 },
      opacity: 0.85,
    });

    traces.push({
      x: monthlyB.map((m) => m.date),
      y: monthlyB.map((m) => m.observed),
      mode: 'lines',
      name: `${regB.name} (Raw Monthly)`,
      line: { color: '#0284c7', width: 1.5 },
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
      line: { color: '#dc2626', width: 1.8 },
    });

    traces.push({
      x: monthlyB.map((m) => m.date),
      y: monthlyB.map((m) => m.anomaly),
      mode: 'lines',
      name: `${regB.name} (Monthly Anomaly)`,
      line: { color: '#0284c7', width: 1.8 },
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
      marker: { color: '#dc2626', size: 6 },
      line: { color: '#dc2626', width: 1.5, dash: 'dot' },
    });

    // Sen's slope trendline for A
    traces.push({
      x: yearsA,
      y: yearsA.map((y) => statsA.sens_intercept + statsA.sens_slope * y),
      mode: 'lines',
      name: `${regA.name} (Sen: ${statsA.sens_slope > 0 ? '+' : ''}${statsA.sens_slope}/yr)`,
      line: { color: '#991b1b', width: 2.8 },
    });

    // Actual observed annual means for B
    traces.push({
      x: yearsB,
      y: annualB.map((b) => b.annual_mean),
      mode: 'markers+lines',
      name: `${regB.name} (Observed Annual)`,
      marker: { color: '#0284c7', size: 6 },
      line: { color: '#0284c7', width: 1.5, dash: 'dot' },
    });

    // Sen's slope trendline for B
    traces.push({
      x: yearsB,
      y: yearsB.map((y) => statsB.sens_intercept + statsB.sens_slope * y),
      mode: 'lines',
      name: `${regB.name} (Sen: ${statsB.sens_slope > 0 ? '+' : ''}${statsB.sens_slope}/yr)`,
      line: { color: '#0369a1', width: 2.8 },
    });
  }

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col gap-4">
      {/* Chart Header & Mode Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-teal-600" />
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Synchronized Divergent Time Series
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Variable: <span className="font-semibold text-slate-800">{data.variable}</span> ({data.unit}) • Timeline:{' '}
            {data.time_range[0]} – {data.time_range[1]}
          </p>
        </div>

        {/* View Mode Selector */}
        <div className="inline-flex rounded-lg bg-slate-100 p-0.5 border border-slate-200 self-start sm:self-auto">
          <button
            onClick={() => setViewMode('annual_trend')}
            className={`text-xs px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
              viewMode === 'annual_trend'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Theil-Sen Annual Trend
          </button>
          <button
            onClick={() => setViewMode('deseasonalized')}
            className={`text-xs px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
              viewMode === 'deseasonalized'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            De-seasonalized Anomaly
          </button>
          <button
            onClick={() => setViewMode('raw_seasonal')}
            className={`text-xs px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
              viewMode === 'raw_seasonal'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Raw Monthly
          </button>
        </div>
      </div>

      {/* Scientific context callout */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-slate-600 leading-relaxed">
          {viewMode === 'raw_seasonal' && (
            <span>
              <strong>The Seasonal Cycle:</strong> Displays raw monthly observations exhibiting strong seasonal solar oscillations.
            </span>
          )}
          {viewMode === 'deseasonalized' && (
            <span>
              <strong>De-Seasonalized Anomaly Engine:</strong> Each month's 24-year climatological mean is subtracted [ΔX = Observed - Climatology], isolating pure inter-annual hydrological drift.
            </span>
          )}
          {viewMode === 'annual_trend' && (
            <span>
              <strong>Theil-Sen Monotonic Divergence:</strong> Non-parametric median slope lines eliminate outlier bias. Notice the opposing trajectories between the two domains under identical macro-forcing.
            </span>
          )}
        </p>
      </div>

      {/* Plotly Canvas */}
      <div className="w-full h-[380px]">
        <Plot
          data={traces}
          layout={{
            autosize: true,
            paper_bgcolor: '#ffffff',
            plot_bgcolor: '#f8fafc',
            margin: { l: 55, r: 25, t: 25, b: 45 },
            showlegend: true,
            legend: {
              orientation: 'h',
              yanchor: 'bottom',
              y: 1.02,
              xanchor: 'right',
              x: 1,
              font: { color: '#475569', size: 11 },
            },
            xaxis: {
              gridcolor: '#e2e8f0',
              zerolinecolor: '#cbd5e1',
              tickfont: { color: '#64748b' },
            },
            yaxis: {
              gridcolor: '#e2e8f0',
              zerolinecolor: '#cbd5e1',
              tickfont: { color: '#64748b' },
              title: {
                text: `${data.variable} (${data.unit})`,
                font: { color: '#475569', size: 12 },
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
