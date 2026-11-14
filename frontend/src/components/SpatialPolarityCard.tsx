import React from 'react';
import { OppositeTrendsResponse } from '../services/api';
import { GitCompare, Database, Globe2, CheckCircle2 } from 'lucide-react';

interface SpatialPolarityCardProps {
  data: OppositeTrendsResponse;
}

export const SpatialPolarityCard: React.FC<SpatialPolarityCardProps> = ({ data }) => {
  const isDivergent = data.polarity_status === 'CONFIRMED_SPATIAL_DIVERGENCE';

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center flex-shrink-0 mt-0.5 text-teal-700">
            <GitCompare className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${
                  isDivergent
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : 'bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                {data.polarity_status.replace(/_/g, ' ')}
              </span>
              <span className="text-xs font-semibold text-slate-400">
                Opposite Trend Diagnostic
              </span>
            </div>
            <p className="text-sm font-semibold text-slate-800 mt-1 leading-relaxed">
              {data.polarity_narrative}
            </p>
          </div>
        </div>

        {/* NASA Provenance Badge */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex flex-col gap-1 min-w-[240px] text-xs">
          <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
            <Database className="w-3.5 h-3.5 text-teal-600" />
            <span>NASA Data Provenance</span>
          </div>
          <div className="text-[11px] text-slate-600 font-mono">
            {data.region_a.analysis.metadata.source}
          </div>
          <div className="flex items-center gap-1 text-[10px] text-slate-500">
            <Globe2 className="w-3 h-3 text-slate-400" />
            <span>DOI: {data.region_a.analysis.metadata.doi}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
