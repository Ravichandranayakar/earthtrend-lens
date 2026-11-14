import React from 'react';
import { OppositeTrendsResponse } from '../services/api';
import { GitCompare, Database, Globe2 } from 'lucide-react';

interface SpatialPolarityCardProps {
  data: OppositeTrendsResponse;
}

export const SpatialPolarityCard: React.FC<SpatialPolarityCardProps> = ({ data }) => {
  return (
    <div className="bg-gradient-to-r from-red-950/30 via-slate-900 to-teal-950/30 border border-slate-800 rounded-2xl p-5 shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center flex-shrink-0 mt-0.5 text-teal-400">
            <GitCompare className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-teal-950 text-teal-300 border border-teal-800">
                {data.polarity_status}
              </span>
              <span className="text-xs text-slate-400">Spatial Divergence Diagnostic</span>
            </div>
            <p className="text-sm font-medium text-slate-200 mt-1.5 leading-relaxed">
              {data.polarity_narrative}
            </p>
          </div>
        </div>

        {/* NASA Provenance Badge */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 flex flex-col gap-1.5 min-w-[240px] text-xs">
          <div className="flex items-center gap-1.5 text-slate-400 font-semibold">
            <Database className="w-3.5 h-3.5 text-teal-400" />
            <span>NASA Data Provenance</span>
          </div>
          <div className="text-[11px] text-slate-300 font-mono">
            {data.region_a.analysis.metadata.source}
          </div>
          <div className="flex items-center gap-2 text-[10px] text-slate-400">
            <Globe2 className="w-3 h-3 text-slate-400" />
            <span>DOI: {data.region_a.analysis.metadata.doi}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
