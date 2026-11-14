import React, { useState, useEffect } from 'react';
import { PresetCase } from '../services/api';
import { MapPin, Globe, Play, Compass, Calendar, Sliders } from 'lucide-react';

interface RegionSelectorProps {
  presets: PresetCase[];
  selectedPresetId: string;
  onSelectPreset: (presetId: string) => void;
  onExecuteCustom: (params: {
    regionAName: string;
    regionABbox: [number, number, number, number];
    regionBName: string;
    regionBBbox: [number, number, number, number];
    startYear: number;
    endYear: number;
  }) => void;
  isLoading: boolean;
}

export const RegionSelector: React.FC<RegionSelectorProps> = ({
  presets,
  selectedPresetId,
  onSelectPreset,
  onExecuteCustom,
  isLoading,
}) => {
  const activePreset = presets.find((p) => p.id === selectedPresetId);

  const [regionAName, setRegionAName] = useState('Domain Alpha');
  const [bboxA, setBboxA] = useState<[number, number, number, number]>([36, 42, -9, 3]);

  const [regionBName, setRegionBName] = useState('Domain Beta');
  const [bboxB, setBboxB] = useState<[number, number, number, number]>([58, 66, 10, 22]);

  const [startYear, setStartYear] = useState(2000);
  const [endYear, setEndYear] = useState(2024);

  // Sync when preset changes
  useEffect(() => {
    if (activePreset) {
      setRegionAName(activePreset.region_a.name);
      setBboxA(activePreset.region_a.bbox);
      setRegionBName(activePreset.region_b.name);
      setBboxB(activePreset.region_b.bbox);
      setStartYear(activePreset.timeframe[0]);
      setEndYear(activePreset.timeframe[1]);
    }
  }, [activePreset]);

  const handleRun = () => {
    onExecuteCustom({
      regionAName,
      regionABbox: bboxA,
      regionBName,
      regionBBbox: bboxB,
      startYear,
      endYear,
    });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-5 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Globe className="w-4 h-4 text-teal-600" />
            2. Configure Geographic Domains & Temporal Window
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Select a curated benchmark investigation or customize bounding boxes [Min Lat, Max Lat, Min Lon, Max Lon].
          </p>
        </div>
      </div>

      {/* Preset Pills */}
      <div>
        <label className="text-xs font-semibold text-slate-700 block mb-2">
          Curated NASA Demonstration Cases (Click to load):
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {presets.map((preset) => {
            const isSelected = preset.id === selectedPresetId;
            return (
              <button
                key={preset.id}
                onClick={() => onSelectPreset(preset.id)}
                className={`text-left p-3 rounded-lg border text-xs transition-all ${
                  isSelected
                    ? 'border-teal-600 bg-teal-50/50 text-teal-950 font-medium shadow-xs'
                    : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/70 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-1.5 font-semibold text-slate-900 mb-1">
                  <Compass className="w-3.5 h-3.5 text-teal-600" />
                  <span className="truncate">{preset.title}</span>
                </div>
                <div className="text-[11px] text-slate-500 line-clamp-2">
                  {preset.narrative}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Domain A and Domain B Configuration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Region A */}
        <div className="p-3.5 rounded-lg border border-red-200/70 bg-red-50/20 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-red-700 uppercase tracking-wide flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" /> Domain A (Divergence Target 1)
            </span>
            <span className="text-[10px] font-mono bg-red-100 text-red-800 px-1.5 py-0.5 rounded">
              Region A
            </span>
          </div>

          <div>
            <label className="text-[11px] font-medium text-slate-600 block mb-1">
              Domain Label
            </label>
            <input
              type="text"
              value={regionAName}
              onChange={(e) => setRegionAName(e.target.value)}
              className="w-full text-xs font-medium px-2.5 py-1.5 bg-white border border-slate-200 rounded text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="text-[11px] font-medium text-slate-600 block mb-1">
              Bounding Box [Min Lat, Max Lat, Min Lon, Max Lon]
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {[
                { label: 'Min Lat', val: bboxA[0], idx: 0 },
                { label: 'Max Lat', val: bboxA[1], idx: 1 },
                { label: 'Min Lon', val: bboxA[2], idx: 2 },
                { label: 'Max Lon', val: bboxA[3], idx: 3 },
              ].map((item) => (
                <div key={item.label}>
                  <span className="text-[10px] text-slate-400 block mb-0.5">{item.label}</span>
                  <input
                    type="number"
                    step="0.5"
                    value={item.val}
                    onChange={(e) => {
                      const next = [...bboxA] as [number, number, number, number];
                      next[item.idx] = parseFloat(e.target.value) || 0;
                      setBboxA(next);
                    }}
                    className="w-full text-xs font-mono px-2 py-1 bg-white border border-slate-200 rounded text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Region B */}
        <div className="p-3.5 rounded-lg border border-teal-200/70 bg-teal-50/20 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-teal-700 uppercase tracking-wide flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" /> Domain B (Divergence Target 2)
            </span>
            <span className="text-[10px] font-mono bg-teal-100 text-teal-800 px-1.5 py-0.5 rounded">
              Region B
            </span>
          </div>

          <div>
            <label className="text-[11px] font-medium text-slate-600 block mb-1">
              Domain Label
            </label>
            <input
              type="text"
              value={regionBName}
              onChange={(e) => setRegionBName(e.target.value)}
              className="w-full text-xs font-medium px-2.5 py-1.5 bg-white border border-slate-200 rounded text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="text-[11px] font-medium text-slate-600 block mb-1">
              Bounding Box [Min Lat, Max Lat, Min Lon, Max Lon]
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {[
                { label: 'Min Lat', val: bboxB[0], idx: 0 },
                { label: 'Max Lat', val: bboxB[1], idx: 1 },
                { label: 'Min Lon', val: bboxB[2], idx: 2 },
                { label: 'Max Lon', val: bboxB[3], idx: 3 },
              ].map((item) => (
                <div key={item.label}>
                  <span className="text-[10px] text-slate-400 block mb-0.5">{item.label}</span>
                  <input
                    type="number"
                    step="0.5"
                    value={item.val}
                    onChange={(e) => {
                      const next = [...bboxB] as [number, number, number, number];
                      next[item.idx] = parseFloat(e.target.value) || 0;
                      setBboxB(next);
                    }}
                    className="w-full text-xs font-mono px-2 py-1 bg-white border border-slate-200 rounded text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Temporal Window & Action */}
      <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span className="font-semibold">Temporal Span:</span>
            <span className="font-mono bg-slate-100 px-2 py-0.5 rounded border border-slate-200 text-slate-800">
              {startYear} – {endYear} ({endYear - startYear + 1} Years / {(endYear - startYear + 1) * 12} Months)
            </span>
          </div>
        </div>

        <button
          onClick={handleRun}
          disabled={isLoading}
          className="px-5 py-2.5 bg-teal-700 hover:bg-teal-800 disabled:bg-slate-300 text-white font-semibold text-xs rounded-lg shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          {isLoading ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Running Earth Science Engine...</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Run Scientific Investigation</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
