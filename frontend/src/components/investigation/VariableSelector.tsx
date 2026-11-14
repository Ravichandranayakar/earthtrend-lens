import React, { useState } from 'react';
import { VariableItem } from '../../services/api';

interface VariableSelectorProps {
  variables: VariableItem[];
  selectedVariableId: string;
  onSelectVariable: (id: string) => void;
}

export const VariableSelector: React.FC<VariableSelectorProps> = ({
  variables,
  selectedVariableId,
  onSelectVariable,
}) => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const selected = variables.find((v) => v.id === selectedVariableId);

  const CATEGORY_COLOR: Record<string, string> = {
    'Land Hydrology':          'var(--color-ocean-slate)',
    'Atmospheric Reanalysis':  'var(--color-mineral-blue)',
  };

  return (
    <div>
      {/* Section label */}
      <p className="section-label" style={{ marginBottom: 10 }}>Environmental Variable</p>

      {/* Variable list — compact rows */}
      <div
        style={{
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
        }}
      >
        {variables.map((v, idx) => {
          const isSelected = v.id === selectedVariableId;
          const isExpanded = expanded === v.id;
          const catColor = CATEGORY_COLOR[v.category] ?? 'var(--color-moss)';

          return (
            <div
              key={v.id}
              style={{
                borderBottom: idx < variables.length - 1 ? '1px solid var(--color-border)' : 'none',
              }}
            >
              {/* Row header — click to select & toggle details */}
              <button
                onClick={() => {
                  onSelectVariable(v.id);
                  setExpanded(isExpanded ? null : v.id);
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '10px 12px',
                  background: isSelected ? 'rgba(23,63,53,0.06)' : 'var(--color-white)',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 120ms ease',
                }}
              >
                {/* Selection indicator dot */}
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    flexShrink: 0,
                    background: isSelected ? 'var(--color-forest)' : 'var(--color-border)',
                    transition: 'background 150ms ease',
                  }}
                />

                {/* Variable name + ID badge */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 13,
                        fontWeight: isSelected ? 600 : 500,
                        color: 'var(--color-graphite)',
                        lineHeight: 1.3,
                      }}
                    >
                      {v.name}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 10,
                        fontWeight: 500,
                        color: catColor,
                        background: `${catColor}18`,
                        border: `1px solid ${catColor}30`,
                        borderRadius: 100,
                        padding: '1px 7px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {v.id}
                    </span>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      gap: 10,
                      marginTop: 2,
                      flexWrap: 'wrap',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 11,
                        color: 'var(--color-slate-text)',
                      }}
                    >
                      {v.unit}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 11,
                        color: 'var(--color-slate-text)',
                      }}
                    >
                      {v.temporal_resolution} · {v.spatial_resolution}
                    </span>
                  </div>
                </div>

                {/* Expand chevron */}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  style={{
                    flexShrink: 0,
                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 150ms ease',
                    color: 'var(--color-moss)',
                  }}
                >
                  <path d="M 3 5 L 7 9 L 11 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Expanded details */}
              {isExpanded && (
                <div
                  style={{
                    padding: '0 12px 12px 30px',
                    background: 'var(--color-muted)',
                    borderTop: '1px solid var(--color-border)',
                  }}
                >
                  {/* Dataset */}
                  <div style={{ paddingTop: 10 }}>
                    <span className="section-label" style={{ fontSize: 9 }}>Dataset</span>
                    <p
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 12,
                        color: 'var(--color-graphite)',
                        margin: '3px 0 8px',
                        lineHeight: 1.5,
                      }}
                    >
                      {v.dataset_name}
                    </p>
                    <div
                      style={{
                        display: 'flex',
                        gap: 6,
                        flexWrap: 'wrap',
                        marginBottom: 8,
                      }}
                    >
                      <span className="badge">{v.dataset_id}</span>
                      <span className="badge">{v.provider}</span>
                      <span className="badge">{v.available_range[0]}–{v.available_range[1]}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 12,
                      color: 'var(--color-slate-text)',
                      lineHeight: 1.6,
                      margin: '0 0 8px',
                    }}
                  >
                    {v.description}
                  </p>

                  {/* Scientific caveat */}
                  <div
                    style={{
                      display: 'flex',
                      gap: 8,
                      padding: '8px 10px',
                      background: `rgba(179, 111, 80, 0.07)`,
                      border: '1px solid rgba(179, 111, 80, 0.2)',
                      borderRadius: 'var(--radius-sm)',
                    }}
                  >
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
                      <circle cx="7" cy="7" r="6" stroke="#B96F50" strokeWidth="1.2" />
                      <line x1="7" y1="4" x2="7" y2="7.5" stroke="#B96F50" strokeWidth="1.3" strokeLinecap="round" />
                      <circle cx="7" cy="9.5" r="0.7" fill="#B96F50" />
                    </svg>
                    <p
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 11,
                        color: 'var(--color-terracotta)',
                        margin: 0,
                        lineHeight: 1.5,
                      }}
                    >
                      <strong>Scientific note:</strong> {v.scientific_caveats}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected summary footer */}
      {selected && (
        <div
          style={{
            marginTop: 8,
            padding: '6px 10px',
            background: 'var(--color-muted)',
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 8,
          }}
        >
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--color-slate-text)' }}>
            Selected:
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: 'var(--color-forest)',
              fontWeight: 600,
            }}
          >
            {selected.id} · {selected.unit}
          </span>
        </div>
      )}
    </div>
  );
};
