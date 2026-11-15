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
      className="navbar-header"
      style={{
        background: 'var(--color-deep-forest)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div className="navbar-container">
        {/* LEFT: Brand Mark */}
        <div className="navbar-brand">
          {/* Geometric SVG brand mark — contour/orbital lines */}
          <svg
            width="28"
            height="28"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            style={{ flexShrink: 0 }}
          >
            <circle cx="15" cy="15" r="13" stroke="#A5B69A" strokeWidth="1.2" fill="none" />
            <ellipse cx="15" cy="15" rx="7" ry="13" stroke="#617B62" strokeWidth="1" fill="none" />
            <line x1="2" y1="15" x2="28" y2="15" stroke="#617B62" strokeWidth="0.8" />
            <circle cx="15" cy="15" r="2.5" fill="#A5B69A" />
            <path d="M 2 20 Q 15 17 28 20" stroke="#A5B69A" strokeWidth="0.7" fill="none" strokeDasharray="2 2" />
            <path d="M 2 10 Q 15 13 28 10" stroke="#A5B69A" strokeWidth="0.7" fill="none" strokeDasharray="2 2" />
          </svg>

          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, flexWrap: 'nowrap' }}>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 16,
                  fontWeight: 600,
                  color: '#ffffff',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.2,
                  whiteSpace: 'nowrap',
                }}
              >
                EarthTrend Lens
              </span>
              <span
                className="hidden sm:inline"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  color: 'var(--color-sage)',
                  opacity: 0.8,
                  letterSpacing: '0.04em',
                  whiteSpace: 'nowrap',
                }}
              >
                NASA Space Apps 2026
              </span>
            </div>
          </div>

          {isLoading && (
            <div
              className="navbar-spinner-mobile"
              style={{
                width: 14,
                height: 14,
                borderRadius: '50%',
                border: '2px solid rgba(255,255,255,0.15)',
                borderTopColor: 'var(--color-sage)',
                animation: 'spin 0.8s linear infinite',
                marginLeft: 'auto',
                flexShrink: 0,
              }}
            />
          )}
        </div>

        {/* CENTER: Primary Navigation */}
        <nav
          className="navbar-nav"
          role="navigation"
          aria-label="Primary navigation"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className="navbar-tab-btn"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 12.5,
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? '#ffffff' : 'rgba(255,255,255,0.65)',
                  background: isActive ? 'rgba(255,255,255,0.12)' : 'transparent',
                  border: 'none',
                  borderRadius: 6,
                  padding: '5px 11px',
                  cursor: 'pointer',
                  transition: 'all 150ms ease',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* RIGHT: Preset Quick-Select + Status */}
        <div className="navbar-presets">
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 11,
              color: 'rgba(255,255,255,0.4)',
              marginRight: 2,
              whiteSpace: 'nowrap',
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
                  padding: '3px 9px',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  transition: 'all 150ms ease',
                  opacity: isLoading ? 0.6 : 1,
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                {PRESET_LABELS[preset.id] ?? preset.title}
              </button>
            );
          })}

          {isLoading && (
            <div
              className="navbar-spinner-desktop"
              style={{
                width: 14,
                height: 14,
                borderRadius: '50%',
                border: '2px solid rgba(255,255,255,0.15)',
                borderTopColor: 'var(--color-sage)',
                animation: 'spin 0.8s linear infinite',
                marginLeft: 4,
                flexShrink: 0,
              }}
            />
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Desktop preservation defaults (>= 960px) */
        .navbar-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 56px;
          gap: 20px;
        }
        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }
        .navbar-nav {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .navbar-presets {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-shrink: 0;
        }
        .navbar-spinner-mobile {
          display: none;
        }
        .navbar-spinner-desktop {
          display: block;
        }

        /* Mobile & Tablet Adaptation (< 960px) */
        @media (max-width: 959px) {
          .navbar-container {
            height: auto;
            padding: 8px 14px;
            flex-direction: column;
            align-items: stretch;
            gap: 8px;
          }
          .navbar-brand {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-start;
          }
          .navbar-spinner-mobile {
            display: block;
          }
          .navbar-spinner-desktop {
            display: none;
          }
          .navbar-nav {
            display: flex;
            align-items: center;
            gap: 6px;
            overflow-x: auto;
            white-space: nowrap;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            padding-bottom: 2px;
          }
          .navbar-nav::-webkit-scrollbar {
            display: none;
          }
          .navbar-presets {
            display: flex;
            align-items: center;
            gap: 6px;
            overflow-x: auto;
            white-space: nowrap;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            padding-bottom: 2px;
          }
          .navbar-presets::-webkit-scrollbar {
            display: none;
          }
          .navbar-tab-btn {
            padding: 6px 12px !important;
            font-size: 13px !important;
          }
        }
      `}</style>
    </header>
  );
};
