import React from 'react';
import { PresetCase } from '../services/api';

export type ActiveTab = 'investigate' | 'analysis' | 'spatial' | 'methods';

interface NavbarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  presets: PresetCase[];
  selectedPresetId: string;
  onSelectPreset: (presetId: string) => void;
  isLoading: boolean;
}

const NAV_ITEMS: { id: ActiveTab; label: string }[] = [
  { id: 'investigate',  label: 'Investigate' },
  { id: 'analysis',     label: 'Analysis' },
  { id: 'spatial',      label: 'Spatial Explorer' },
  { id: 'methods',      label: 'Data & Methods' },
];

const PRESET_LABELS: Record<string, string> = {
  case_01_europe:        'Europe Hydrology',
  case_02_north_america: 'US Megadrought',
  case_03_global:        'Sahel vs Siberia',
};

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  presets,
  selectedPresetId,
  onSelectPreset,
  isLoading,
}) => {
  return (
    <header
      style={{
        background: 'var(--color-deep-forest)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 56,
          gap: 24,
        }}
      >
        {/* LEFT: Brand Mark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          {/* Geometric SVG brand mark — contour/orbital lines */}
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <circle cx="15" cy="15" r="13" stroke="#A5B69A" strokeWidth="1.2" fill="none" />
            <ellipse cx="15" cy="15" rx="7" ry="13" stroke="#617B62" strokeWidth="1" fill="none" />
            <line x1="2" y1="15" x2="28" y2="15" stroke="#617B62" strokeWidth="0.8" />
            <circle cx="15" cy="15" r="2.5" fill="#A5B69A" />
            <path d="M 2 20 Q 15 17 28 20" stroke="#A5B69A" strokeWidth="0.7" fill="none" strokeDasharray="2 2" />
            <path d="M 2 10 Q 15 13 28 10" stroke="#A5B69A" strokeWidth="0.7" fill="none" strokeDasharray="2 2" />
          </svg>

          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 17,
                  fontWeight: 600,
                  color: '#ffffff',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.2,
                }}
              >
                EarthTrend Lens
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  color: 'var(--color-sage)',
                  opacity: 0.8,
                  letterSpacing: '0.04em',
                }}
              >
                NASA Space Apps 2026
              </span>
            </div>
          </div>
        </div>

        {/* CENTER: Primary Navigation */}
        <nav
          style={{ display: 'flex', alignItems: 'center', gap: 2 }}
          role="navigation"
          aria-label="Primary navigation"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? '#ffffff' : 'rgba(255,255,255,0.55)',
                  background: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                  border: 'none',
                  borderRadius: 6,
                  padding: '6px 14px',
                  cursor: 'pointer',
                  transition: 'all 150ms ease',
                  whiteSpace: 'nowrap',
                }}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* RIGHT: Preset Quick-Select + Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 11,
              color: 'rgba(255,255,255,0.4)',
              marginRight: 4,
            }}
          >
            Preset:
          </span>
          {presets.map((preset) => {
            const isSelected = preset.id === selectedPresetId;
            return (
              <button
                key={preset.id}
                onClick={() => onSelectPreset(preset.id)}
                disabled={isLoading}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 11,
                  fontWeight: 500,
                  color: isSelected ? 'var(--color-deep-forest)' : 'rgba(255,255,255,0.65)',
                  background: isSelected ? 'var(--color-sage)' : 'rgba(255,255,255,0.08)',
                  border: '1px solid',
                  borderColor: isSelected ? 'var(--color-sage)' : 'rgba(255,255,255,0.1)',
                  borderRadius: 100,
                  padding: '4px 11px',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  transition: 'all 150ms ease',
                  opacity: isLoading ? 0.6 : 1,
                  whiteSpace: 'nowrap',
                }}
              >
                {PRESET_LABELS[preset.id] ?? preset.title}
              </button>
            );
          })}

          {isLoading && (
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                border: '2px solid rgba(255,255,255,0.15)',
                borderTopColor: 'var(--color-sage)',
                animation: 'spin 0.8s linear infinite',
                marginLeft: 8,
                flexShrink: 0,
              }}
            />
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </header>
  );
};
