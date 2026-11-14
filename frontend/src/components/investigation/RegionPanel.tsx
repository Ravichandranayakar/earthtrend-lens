import React, { useState, useEffect } from 'react';
import { PresetCase } from '../../services/api';

interface RegionPanelProps {
  presets: PresetCase[];
  selectedPresetId: string;
  onSelectPreset: (presetId: string) => void;
  bboxA: [number, number, number, number];
  bboxB: [number, number, number, number];
  regionAName: string;
  regionBName: string;
  onBboxAChange: (bbox: [number, number, number, number]) => void;
  onBboxBChange: (bbox: [number, number, number, number]) => void;
  onRegionANameChange: (name: string) => void;
  onRegionBNameChange: (name: string) => void;
  startYear: number;
  endYear: number;
  onStartYearChange: (y: number) => void;
  onEndYearChange: (y: number) => void;
}

const PRESET_LABELS: Record<string, string> = {
  case_01_europe:        'Europe Hydrology',
  case_02_north_america: 'US Megadrought',
  case_03_global:        'Sahel vs Siberia',
};

export interface GlobalLandmark {
  name: string;
  category: string;
  bbox: [number, number, number, number]; // [minLat, maxLat, minLon, maxLon]
}

export const GLOBAL_LANDMARKS: GlobalLandmark[] = [
  // South Asia
  { name: 'India - Thar Arid Zone', category: 'South Asia', bbox: [24, 28, 70, 76] },
  { name: 'India - Indo-Gangetic Basin', category: 'South Asia', bbox: [25, 30, 77, 85] },
  { name: 'India - Deccan Plateau', category: 'South Asia', bbox: [14, 20, 74, 80] },

  // Australia & Oceania
  { name: 'Australia - Murray-Darling Basin', category: 'Oceania', bbox: [-36, -30, 140, 149] },
  { name: 'Australia - Western Arid Zone', category: 'Oceania', bbox: [-28, -22, 118, 128] },

  // South America
  { name: 'South America - Amazon Rainforest', category: 'South America', bbox: [-8, 2, -68, -55] },
  { name: 'South America - Pantanal Wetland', category: 'South America', bbox: [-21, -16, -58, -55] },
  { name: 'South America - Atacama Desert', category: 'South America', bbox: [-26, -20, -70, -68] },

  // Africa
  { name: 'Africa - Nile River Basin', category: 'Africa', bbox: [12, 22, 29, 34] },
  { name: 'Africa - Congo Rainforest Basin', category: 'Africa', bbox: [-5, 5, 16, 28] },
  { name: 'Africa - Sahel Semi-Arid Belt', category: 'Africa', bbox: [11, 17, -15, 10] },
  { name: 'Africa - Kalahari Desert Basin', category: 'Africa', bbox: [-27, -20, 19, 25] },

  // North America
  { name: 'North America - Colorado River Basin', category: 'North America', bbox: [32, 40, -114, -107] },
  { name: 'North America - Great Lakes Basin', category: 'North America', bbox: [41, 49, -89, -76] },
  { name: 'North America - California Central Valley', category: 'North America', bbox: [35, 40, -122, -119] },

  // Europe
  { name: 'Europe - Iberian Peninsula', category: 'Europe', bbox: [36, 42, -9, 3] },
  { name: 'Europe - Southern Scandinavia', category: 'Europe', bbox: [58, 66, 10, 22] },
  { name: 'Europe - Danube River Basin', category: 'Europe', bbox: [45, 49, 15, 26] },

  // East & Central Asia
  { name: 'East Asia - North China Plain', category: 'East Asia', bbox: [33, 40, 113, 120] },
  { name: 'Central Asia - Aral Sea Basin', category: 'Central Asia', bbox: [41, 46, 58, 64] },
  { name: 'Middle East - Tigris-Euphrates Basin', category: 'Middle East', bbox: [31, 38, 39, 48] },
];

const CoordInput: React.FC<{
  label: string;
  value: number;
  onChange: (v: number) => void;
}> = ({ label, value, onChange }) => (
  <div>
    <label
      style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 10,
        color: 'var(--color-slate-text)',
        display: 'block',
        marginBottom: 3,
        fontWeight: 500,
      }}
    >
      {label}
    </label>
    <input
      type="number"
      step="0.5"
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
      className="input-field font-mono"
      style={{ fontSize: 12, padding: '5px 8px' }}
    />
  </div>
);

export const RegionPanel: React.FC<RegionPanelProps> = ({
  presets,
  selectedPresetId,
  onSelectPreset,
  bboxA,
  bboxB,
  regionAName,
  regionBName,
  onBboxAChange,
  onBboxBChange,
  onRegionANameChange,
  onRegionBNameChange,
  startYear,
  endYear,
  onStartYearChange,
  onEndYearChange,
}) => {
  return (
    <div>
      {/* Dataset presets */}
      <p className="section-label" style={{ marginBottom: 8 }}>Investigation Presets</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {presets.map((preset) => {
          const isSelected = preset.id === selectedPresetId;
          return (
            <button
              key={preset.id}
              onClick={() => onSelectPreset(preset.id)}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '9px 11px',
                background: isSelected ? 'rgba(23,63,53,0.07)' : 'var(--color-white)',
                border: `1px solid ${isSelected ? 'rgba(23,63,53,0.25)' : 'var(--color-border)'}`,
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                transition: 'all 120ms ease',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 8,
              }}
            >
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: isSelected ? 'var(--color-forest)' : 'var(--color-border)',
                  flexShrink: 0,
                  marginTop: 4,
                  transition: 'background 150ms ease',
                }}
              />
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 12,
                    fontWeight: isSelected ? 600 : 500,
                    color: 'var(--color-graphite)',
                    marginBottom: 2,
                  }}
                >
                  {PRESET_LABELS[preset.id] ?? preset.title}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 11,
                    color: 'var(--color-slate-text)',
                    lineHeight: 1.4,
                  }}
                >
                  {preset.narrative?.slice(0, 80)}...
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Divider */}
      <div
        style={{
          margin: '16px 0',
          borderTop: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 10,
            color: 'var(--color-slate-text)',
            background: 'var(--color-paper)',
            padding: '0 6px',
            marginTop: -1,
            whiteSpace: 'nowrap',
          }}
        >
          or define custom regions
        </span>
      </div>

      {/* Domain A */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 2,
              background: '#B55B45',
              flexShrink: 0,
            }}
          />
          <p className="section-label" style={{ margin: 0 }}>Domain A</p>
        </div>

        {/* Quick Landmark Dropdown for Domain A */}
        <select
          onChange={(e) => {
            const landmark = GLOBAL_LANDMARKS.find((l) => l.name === e.target.value);
            if (landmark) {
              onRegionANameChange(landmark.name);
              onBboxAChange(landmark.bbox);
            }
          }}
          value={GLOBAL_LANDMARKS.some((l) => l.name === regionAName) ? regionAName : ''}
          style={{
            width: '100%',
            marginBottom: 6,
            fontSize: 11,
            padding: '5px 8px',
            fontFamily: 'var(--font-sans)',
            background: 'var(--color-white)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--color-graphite)',
            cursor: 'pointer',
          }}
        >
          <option value="">-- Quick select global landmark --</option>
          {Array.from(new Set(GLOBAL_LANDMARKS.map((l) => l.category))).map((cat) => (
            <optgroup key={cat} label={cat}>
              {GLOBAL_LANDMARKS.filter((l) => l.category === cat).map((l) => (
                <option key={l.name} value={l.name}>
                  {l.name}
                </option>
              ))}
            </optgroup>
          ))}
        </select>

        <input
          type="text"
          value={regionAName}
          onChange={(e) => onRegionANameChange(e.target.value)}
          className="input-field"
          placeholder="Domain A label"
          style={{ marginBottom: 7, fontSize: 12 }}
        />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          <CoordInput label="Min Lat" value={bboxA[0]} onChange={(v) => { const n = [...bboxA] as [number, number, number, number]; n[0] = v; onBboxAChange(n); }} />
          <CoordInput label="Max Lat" value={bboxA[1]} onChange={(v) => { const n = [...bboxA] as [number, number, number, number]; n[1] = v; onBboxAChange(n); }} />
          <CoordInput label="Min Lon" value={bboxA[2]} onChange={(v) => { const n = [...bboxA] as [number, number, number, number]; n[2] = v; onBboxAChange(n); }} />
          <CoordInput label="Max Lon" value={bboxA[3]} onChange={(v) => { const n = [...bboxA] as [number, number, number, number]; n[3] = v; onBboxAChange(n); }} />
        </div>
      </div>

      {/* Domain B */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 2,
              background: '#345C68',
              flexShrink: 0,
            }}
          />
          <p className="section-label" style={{ margin: 0 }}>Domain B</p>
        </div>

        {/* Quick Landmark Dropdown for Domain B */}
        <select
          onChange={(e) => {
            const landmark = GLOBAL_LANDMARKS.find((l) => l.name === e.target.value);
            if (landmark) {
              onRegionBNameChange(landmark.name);
              onBboxBChange(landmark.bbox);
            }
          }}
          value={GLOBAL_LANDMARKS.some((l) => l.name === regionBName) ? regionBName : ''}
          style={{
            width: '100%',
            marginBottom: 6,
            fontSize: 11,
            padding: '5px 8px',
            fontFamily: 'var(--font-sans)',
            background: 'var(--color-white)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--color-graphite)',
            cursor: 'pointer',
          }}
        >
          <option value="">-- Quick select global landmark --</option>
          {Array.from(new Set(GLOBAL_LANDMARKS.map((l) => l.category))).map((cat) => (
            <optgroup key={cat} label={cat}>
              {GLOBAL_LANDMARKS.filter((l) => l.category === cat).map((l) => (
                <option key={l.name} value={l.name}>
                  {l.name}
                </option>
              ))}
            </optgroup>
          ))}
        </select>

        <input
          type="text"
          value={regionBName}
          onChange={(e) => onRegionBNameChange(e.target.value)}
          className="input-field"
          placeholder="Domain B label"
          style={{ marginBottom: 7, fontSize: 12 }}
        />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          <CoordInput label="Min Lat" value={bboxB[0]} onChange={(v) => { const n = [...bboxB] as [number, number, number, number]; n[0] = v; onBboxBChange(n); }} />
          <CoordInput label="Max Lat" value={bboxB[1]} onChange={(v) => { const n = [...bboxB] as [number, number, number, number]; n[1] = v; onBboxBChange(n); }} />
          <CoordInput label="Min Lon" value={bboxB[2]} onChange={(v) => { const n = [...bboxB] as [number, number, number, number]; n[2] = v; onBboxBChange(n); }} />
          <CoordInput label="Max Lon" value={bboxB[3]} onChange={(v) => { const n = [...bboxB] as [number, number, number, number]; n[3] = v; onBboxBChange(n); }} />
        </div>
      </div>

      {/* Time Range */}
      <div>
        <p className="section-label" style={{ marginBottom: 8 }}>Historical Period</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          <div>
            <label
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 10,
                color: 'var(--color-slate-text)',
                display: 'block',
                marginBottom: 3,
                fontWeight: 500,
              }}
            >
              Start year
            </label>
            <input
              type="number"
              min={1981}
              max={2023}
              value={startYear}
              onChange={(e) => onStartYearChange(parseInt(e.target.value))}
              className="input-field font-mono"
              style={{ fontSize: 12, padding: '5px 8px' }}
            />
          </div>
          <div>
            <label
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 10,
                color: 'var(--color-slate-text)',
                display: 'block',
                marginBottom: 3,
                fontWeight: 500,
              }}
            >
              End year
            </label>
            <input
              type="number"
              min={1982}
              max={2024}
              value={endYear}
              onChange={(e) => onEndYearChange(parseInt(e.target.value))}
              className="input-field font-mono"
              style={{ fontSize: 12, padding: '5px 8px' }}
            />
          </div>
        </div>

        {/* Dataset availability context */}
        <div
          style={{
            marginTop: 8,
            padding: '7px 10px',
            background: 'var(--color-muted)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--color-border)',
          }}
        >
          <span className="section-label" style={{ fontSize: 9 }}>GLDAS Noah 2.1 coverage</span>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: 'var(--color-forest)',
              marginTop: 2,
            }}
          >
            2000 – 2024 · Monthly · 0.25°
          </div>
        </div>
      </div>
    </div>
  );
};
