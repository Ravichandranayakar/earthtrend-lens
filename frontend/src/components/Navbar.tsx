import React from 'react';
import { Compass, Sparkles, Activity } from 'lucide-react';
import { PresetCase } from '../services/api';

interface NavbarProps {
  presets: PresetCase[];
  selectedPresetId: string;
  onSelectPreset: (presetId: string) => void;
  isLoading: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  presets,
  selectedPresetId,
  onSelectPreset,
  isLoading,
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 px-6 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 p-0.5 shadow-lg shadow-teal-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Compass className="w-5 h-5 text-teal-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-bold tracking-tight text-white">
                EarthTrend <span className="text-teal-400 font-extrabold">Lens</span>
              </h1>
              <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 bg-teal-950 text-teal-300 rounded-full border border-teal-800 font-semibold">
                NASA Space Apps 2026
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Forensic Earth-System Trend Detective & Spatial Polarity Engine
            </p>
          </div>
        </div>

        {/* Preset Detective Cases */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 mr-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Detective Cases:</span>
          </div>
          {presets.map((preset) => {
            const isSelected = preset.id === selectedPresetId;
            return (
              <button
                key={preset.id}
                onClick={() => onSelectPreset(preset.id)}
                disabled={isLoading}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all duration-200 border ${
                  isSelected
                    ? 'bg-teal-600/20 border-teal-500 text-teal-300 shadow-sm shadow-teal-500/20'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                }`}
              >
                {preset.id === 'case_01_europe' && '🇪🇺 Europe Hydrology'}
                {preset.id === 'case_02_north_america' && '🇺🇸 US Megadrought'}
                {preset.id === 'case_03_global' && '🌍 Sahel vs Siberia'}
              </button>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-1.5 text-xs text-teal-400 animate-pulse ml-2">
              <Activity className="w-3.5 h-3.5 animate-spin" />
              <span>Analyzing NASA Data...</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
