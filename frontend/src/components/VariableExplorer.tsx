import React from 'react';
import { VariableItem } from '../services/api';
import { Database, Info, Layers, CheckCircle2 } from 'lucide-react';

interface VariableExplorerProps {
  variables: VariableItem[];
  selectedVariableId: string;
  onSelectVariable: (variableId: string) => void;
}

export const VariableExplorer: React.FC<VariableExplorerProps> = ({
  variables,
  selectedVariableId,
  onSelectVariable,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Database className="w-4 h-4 text-teal-600" />
            1. Select Environmental Variable
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Peer-reviewed NASA variables with standardized physical units and measurement depth profiles.
          </p>
        </div>
        <span className="text-xs font-semibold px-2 py-0.5 bg-slate-100 text-slate-700 rounded border border-slate-200">
          {variables.length} Variables Available
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {variables.map((v) => {
          const isSelected = v.id === selectedVariableId;
          return (
            <div
              key={v.id}
              onClick={() => onSelectVariable(v.id)}
              className={`cursor-pointer rounded-lg p-4 border transition-all text-left relative flex flex-col justify-between ${
                isSelected
                  ? 'border-teal-600 bg-teal-50/40 shadow-sm ring-1 ring-teal-500/30'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                        isSelected
                          ? 'bg-teal-600 text-white'
                          : 'bg-slate-100 text-slate-800'
                      }`}
                    >
                      {v.id}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      [{v.unit}]
                    </span>
                  </div>
                  {isSelected && (
                    <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
                  )}
                </div>

                <h3 className="text-sm font-semibold text-slate-900 mt-2">
                  {v.name}
                </h3>

                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {v.description}
                </p>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] space-y-1.5 text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span className="truncate">
                    <strong>Source:</strong> {v.dataset_name} ({v.provider})
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-amber-700 bg-amber-50/80 p-1.5 rounded border border-amber-200/60 text-[11px]">
                  <Info className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                  <span>
                    <strong>Scientific Note:</strong> {v.scientific_caveats}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
