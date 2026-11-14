import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { VariableSelector } from './components/investigation/VariableSelector';
import { RegionPanel } from './components/investigation/RegionPanel';
import { MapCanvas } from './components/investigation/MapCanvas';
import { EarthDataExplorer } from './components/investigation/EarthDataExplorer';
import { DeseasonalizerChart } from './components/DeseasonalizerChart';
import { ForensicScorecard } from './components/ForensicScorecard';
import { SpatialPolarityCard } from './components/SpatialPolarityCard';
import { SpatialGridMap } from './components/SpatialGridMap';
import { DataMethodsView } from './components/DataMethodsView';
import {
  AlertTriangle,
  RotateCcw,
  RefreshCw,
  X,
} from 'lucide-react';
import {
  fetchPresets,
  fetchVariables,
  fetchOppositeTrends,
  fetchSpatialGrid,
  fetchMeanRaster,
  PresetCase,
  VariableItem,
  OppositeTrendsResponse,
  SpatialGridResponse,
  RasterResponse,
} from './services/api';

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('investigate');
  const [leftPanelMode, setLeftPanelMode] = useState<'setup' | 'stac'>('setup');

  // Catalog
  const [presets, setPresets]     = useState<PresetCase[]>([]);
  const [variables, setVariables] = useState<VariableItem[]>([]);

  // Current investigation config
  const [selectedPresetId, setSelectedPresetId]     = useState('case_01_europe');
  const [selectedVariableId, setSelectedVariableId] = useState('RootMoist_inst');
  const [bboxA, setBboxA]           = useState<[number,number,number,number]>([36, 42, -9, 3]);
  const [bboxB, setBboxB]           = useState<[number,number,number,number]>([58, 66, 10, 22]);
  const [regionAName, setRegionAName] = useState('Iberian Peninsula');
  const [regionBName, setRegionBName] = useState('Southern Scandinavia');
  const [startYear, setStartYear]   = useState(2000);
  const [endYear, setEndYear]       = useState(2024);

  // Results
  const [analysisData, setAnalysisData] = useState<OppositeTrendsResponse | null>(null);
  const [gridDataA, setGridDataA]       = useState<SpatialGridResponse | null>(null);
  const [gridDataB, setGridDataB]       = useState<SpatialGridResponse | null>(null);
  const [rasterData, setRasterData]     = useState<RasterResponse | null>(null);

  // State flags
  const [isLoading, setIsLoading]       = useState(true);
  const [isGridLoading, setIsGridLoading] = useState(false);
  const [error, setError]               = useState<string | null>(null);

  // Auto-recovery timer ref
  const autoRetryTimerRef = useRef<number | null>(null);

  /* ── Initial load ───────────────────────────────────────── */
  const loadInitialData = useCallback(async () => {
    if (autoRetryTimerRef.current) {
      window.clearTimeout(autoRetryTimerRef.current);
      autoRetryTimerRef.current = null;
    }
    try {
      setIsLoading(true);
      setError(null);
      const [presetList, varList] = await Promise.all([fetchPresets(), fetchVariables()]);
      setPresets(presetList);
      setVariables(varList);

      // Seed analysis from default preset
      const data = await fetchOppositeTrends('case_01_europe', undefined, undefined, 'RootMoist_inst');
      setAnalysisData(data);

      // Seed spatial grids on both Domain A and Domain B concurrently
      setIsGridLoading(true);
      const [gridA, gridB] = await Promise.all([
        fetchSpatialGrid({
          bbox: [36, 42, -9, 3],
          variable: 'RootMoist_inst',
          grid_step: 1.5,
          domain_id: 'A',
          region_name: 'Iberian Peninsula',
        }),
        fetchSpatialGrid({
          bbox: [58, 66, 10, 22],
          variable: 'RootMoist_inst',
          grid_step: 1.5,
          domain_id: 'B',
          region_name: 'Southern Scandinavia',
        }),
      ]);
      setGridDataA(gridA);
      setGridDataB(gridB);

      // Seed verified scientific raster if available
      try {
        const raster = await fetchMeanRaster({ bbox: [36, 42, -9, 3], variable: 'RootMoist_inst' });
        setRasterData(raster);
      } catch {
        setRasterData(null);
      }

      setError(null);
    } catch {
      setError('Unable to stream satellite observation data from the Earth analysis service. You can retry the connection or reload the application.');
      // Schedule background auto-recovery attempt in 5 seconds
      autoRetryTimerRef.current = window.setTimeout(() => {
        loadInitialData();
      }, 5000);
    } finally {
      setIsLoading(false);
      setIsGridLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInitialData();
    return () => {
      if (autoRetryTimerRef.current) {
        window.clearTimeout(autoRetryTimerRef.current);
      }
    };
  }, [loadInitialData]);

  // Lock body viewport strictly during GIS investigation to prevent map overflow
  useEffect(() => {
    if (activeTab === 'investigate') {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, [activeTab]);

  /* ── Preset selection ───────────────────────────────────── */
  const handleSelectPreset = async (presetId: string) => {
    setSelectedPresetId(presetId);
    const targetPreset = presets.find((p) => p.id === presetId);
    const targetVar    = targetPreset?.variable || selectedVariableId;
    setSelectedVariableId(targetVar);
    const newBboxA: [number, number, number, number] = targetPreset ? targetPreset.region_a.bbox : bboxA;
    const newBboxB: [number, number, number, number] = targetPreset ? targetPreset.region_b.bbox : bboxB;
    const newNameA = targetPreset ? targetPreset.region_a.name : regionAName;
    const newNameB = targetPreset ? targetPreset.region_b.name : regionBName;
    const newStart = targetPreset ? targetPreset.timeframe[0] : startYear;
    const newEnd   = targetPreset ? targetPreset.timeframe[1] : endYear;

    if (targetPreset) {
      setBboxA(newBboxA);
      setBboxB(newBboxB);
      setRegionAName(newNameA);
      setRegionBName(newNameB);
      setStartYear(newStart);
      setEndYear(newEnd);
    }
    try {
      setIsLoading(true);
      setIsGridLoading(true);
      setError(null);
      const [data, gridA, gridB] = await Promise.all([
        fetchOppositeTrends(presetId, undefined, undefined, targetVar),
        fetchSpatialGrid({
          bbox: newBboxA,
          variable: targetVar,
          start_year: newStart,
          end_year: newEnd,
          grid_step: 1.5,
          domain_id: 'A',
          region_name: newNameA,
        }),
        fetchSpatialGrid({
          bbox: newBboxB,
          variable: targetVar,
          start_year: newStart,
          end_year: newEnd,
          grid_step: 1.5,
          domain_id: 'B',
          region_name: newNameB,
        }),
      ]);
      setAnalysisData(data);
      setGridDataA(gridA);
      setGridDataB(gridB);

      // Fetch verified scientific mean raster for Domain A
      try {
        const raster = await fetchMeanRaster({
          bbox: newBboxA,
          variable: targetVar,
        });
        setRasterData(raster);
      } catch {
        setRasterData(null);
      }
    } catch {
      setError('Unable to load satellite time-series records for the selected region. Please retry or choose another study domain.');
    } finally {
      setIsLoading(false);
      setIsGridLoading(false);
    }
  };

  /* ── Variable change ────────────────────────────────────── */
  const handleSelectVariable = async (variableId: string) => {
    setSelectedVariableId(variableId);
    try {
      setIsLoading(true);
      setIsGridLoading(true);
      setError(null);
      const [data, gridA, gridB] = await Promise.all([
        fetchOppositeTrends(selectedPresetId, bboxA, bboxB, variableId, regionAName, regionBName, startYear, endYear),
        fetchSpatialGrid({
          bbox: bboxA,
          variable: variableId,
          start_year: startYear,
          end_year: endYear,
          grid_step: 1.5,
          domain_id: 'A',
          region_name: regionAName,
        }),
        fetchSpatialGrid({
          bbox: bboxB,
          variable: variableId,
          start_year: startYear,
          end_year: endYear,
          grid_step: 1.5,
          domain_id: 'B',
          region_name: regionBName,
        }),
      ]);
      setAnalysisData(data);
      setGridDataA(gridA);
      setGridDataB(gridB);
    } catch {
      setError('Unable to calculate trends for the selected Earth system variable. Please retry.');
    } finally {
      setIsLoading(false);
      setIsGridLoading(false);
    }
  };

  /* ── Run investigation ──────────────────────────────────── */
  const handleRunInvestigation = async () => {
    try {
      setIsLoading(true);
      setIsGridLoading(true);
      setError(null);
      const [data, gridA, gridB] = await Promise.all([
        fetchOppositeTrends(
          undefined,
          bboxA,
          bboxB,
          selectedVariableId,
          regionAName,
          regionBName,
          startYear,
          endYear
        ),
        fetchSpatialGrid({
          bbox: bboxA,
          variable: selectedVariableId,
          start_year: startYear,
          end_year: endYear,
          grid_step: 1.5,
          domain_id: 'A',
          region_name: regionAName,
        }),
        fetchSpatialGrid({
          bbox: bboxB,
          variable: selectedVariableId,
          start_year: startYear,
          end_year: endYear,
          grid_step: 1.5,
          domain_id: 'B',
          region_name: regionBName,
        }),
      ]);
      setAnalysisData(data);
      setGridDataA(gridA);
      setGridDataB(gridB);

      // Fetch verified scientific mean raster for Domain A
      try {
        const raster = await fetchMeanRaster({
          bbox: bboxA,
          variable: selectedVariableId,
          start_year: startYear,
          end_year: endYear,
        });
        setRasterData(raster);
      } catch {
        setRasterData(null);
      }

      setActiveTab('analysis');
    } catch {
      setError('Forensic trend computation could not be completed for the specified geographic domains. Please verify bounding coordinates and retry.');
    } finally {
      setIsLoading(false);
      setIsGridLoading(false);
    }
  };

  /* ── Render ─────────────────────────────────────────────── */
  return (
    <div
      style={{
        height: activeTab === 'investigate' ? '100vh' : 'auto',
        minHeight: '100vh',
        maxHeight: activeTab === 'investigate' ? '100vh' : 'none',
        overflow: activeTab === 'investigate' ? 'hidden' : 'auto',
        background: 'var(--color-paper)',
        color: 'var(--color-graphite)',
        fontFamily: 'var(--font-sans)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        presets={presets}
        selectedPresetId={selectedPresetId}
        onSelectPreset={handleSelectPreset}
        isLoading={isLoading}
      />

      {/* User-facing Notification & Reconnect Banner */}
      {error && (
        <div
          role="alert"
          style={{
            background: 'rgba(185, 111, 80, 0.08)',
            border: '1px solid rgba(185, 111, 80, 0.35)',
            borderRadius: 'var(--radius-sm)',
            padding: '10px 16px',
            margin: '8px 20px 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            flexWrap: 'wrap',
            flexShrink: 0,
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <AlertTriangle size={16} color="var(--color-terracotta)" style={{ flexShrink: 0 }} />
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 12,
                  fontWeight: 600,
                  color: 'var(--color-graphite)',
                  display: 'block',
                }}
              >
                Earth Data Service Notice
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 12,
                  color: 'var(--color-slate-text)',
                }}
              >
                {error}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              onClick={() => {
                if (presets.length === 0) {
                  loadInitialData();
                } else {
                  handleSelectPreset(selectedPresetId);
                }
              }}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 11,
                fontWeight: 600,
                padding: '6px 12px',
                background: 'var(--color-terracotta)',
                color: '#fff',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                transition: 'opacity 150ms ease',
              }}
            >
              <RotateCcw size={12} />
              Retry Connection
            </button>

            <button
              onClick={() => window.location.reload()}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 11,
                fontWeight: 600,
                padding: '6px 12px',
                background: 'transparent',
                color: 'var(--color-graphite)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 5,
              }}
            >
              <RefreshCw size={12} />
              Reload Page
            </button>

            <button
              onClick={() => setError(null)}
              aria-label="Dismiss notice"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--color-slate-text)',
                cursor: 'pointer',
                padding: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* ── TAB: INVESTIGATE ────────────────────────────────── */}
      {activeTab === 'investigate' && (
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            minHeight: 0,
          }}
        >
          {/* Compact editorial header banner */}
          <div
            style={{
              height: 34,
              padding: '0 20px',
              borderBottom: '1px solid var(--color-border)',
              background: 'var(--color-white)',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              flexShrink: 0,
            }}
          >
            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 15,
                fontWeight: 600,
                color: 'var(--color-graphite)',
                margin: 0,
                letterSpacing: '-0.01em',
              }}
            >
              Investigate the Earth system
            </h1>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 11,
                color: 'var(--color-slate-text)',
              }}
            >
              Select environmental variable, define geographic regions, and set historical horizon.
            </span>
          </div>

          {/* Hybrid GIS layout: left config panel + right map */}
          <div
            className="investigate-workspace-layout"
            style={{
              flex: 1,
              display: 'flex',
              overflow: 'hidden',
              minHeight: 0,
            }}
          >
            {/* LEFT: Configuration & STAC Discovery panel — 360px fixed width */}
            <div
              style={{
                width: 360,
                flexShrink: 0,
                borderRight: '1px solid var(--color-border)',
                background: 'var(--color-paper)',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Left Panel Mode Switcher: Setup vs STAC Discovery */}
              <div
                style={{
                  display: 'flex',
                  borderBottom: '1px solid var(--color-border)',
                  background: 'var(--color-white)',
                  position: 'sticky',
                  top: 0,
                  zIndex: 20,
                }}
              >
                <button
                  onClick={() => setLeftPanelMode('setup')}
                  style={{
                    flex: 1,
                    padding: '9px 12px',
                    fontFamily: 'var(--font-sans)',
                    fontSize: 11,
                    fontWeight: leftPanelMode === 'setup' ? 600 : 500,
                    color: leftPanelMode === 'setup' ? 'var(--color-forest)' : 'var(--color-slate-text)',
                    border: 'none',
                    borderBottom: `2px solid ${
                      leftPanelMode === 'setup' ? 'var(--color-forest)' : 'transparent'
                    }`,
                    background: 'transparent',
                    cursor: 'pointer',
                    transition: 'all 120ms ease',
                  }}
                >
                  Investigation Setup
                </button>
                <button
                  onClick={() => setLeftPanelMode('stac')}
                  style={{
                    flex: 1,
                    padding: '9px 12px',
                    fontFamily: 'var(--font-sans)',
                    fontSize: 11,
                    fontWeight: leftPanelMode === 'stac' ? 600 : 500,
                    color: leftPanelMode === 'stac' ? 'var(--color-forest)' : 'var(--color-slate-text)',
                    border: 'none',
                    borderBottom: `2px solid ${
                      leftPanelMode === 'stac' ? 'var(--color-forest)' : 'transparent'
                    }`,
                    background: 'transparent',
                    cursor: 'pointer',
                    transition: 'all 120ms ease',
                  }}
                >
                  STAC Data Explorer
                </button>
              </div>

              {leftPanelMode === 'stac' ? (
                <div style={{ padding: '16px' }}>
                  <EarthDataExplorer />
                </div>
              ) : (
                <>
                  <div style={{ padding: '16px 20px 0' }}>
                    <VariableSelector
                      variables={variables}
                      selectedVariableId={selectedVariableId}
                      onSelectVariable={handleSelectVariable}
                    />
                  </div>

                  <div
                    style={{
                      margin: '14px 20px',
                      borderTop: '1px solid var(--color-border)',
                    }}
                  />

                  {/* Dataset information block */}
                  <div style={{ padding: '0 20px' }}>
                    <p className="section-label" style={{ marginBottom: 6 }}>Dataset</p>
                    <div
                      style={{
                        padding: '9px 11px',
                        background: 'var(--color-white)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-md)',
                      }}
                    >
                      <div
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: 12,
                          fontWeight: 600,
                          color: 'var(--color-graphite)',
                          marginBottom: 4,
                        }}
                      >
                        NASA GLDAS Noah 2.1 / POWER MERRA-2
                      </div>
                      <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                        {['NASA GES DISC', 'NASA Langley', '2000–2024'].map((tag) => (
                          <span key={tag} className="badge">{tag}</span>
                        ))}
                      </div>
                      <div
                        style={{
                          marginTop: 6,
                          fontFamily: 'var(--font-mono)',
                          fontSize: 10,
                          color: 'var(--color-mineral-blue)',
                        }}
                      >
                        DOI: 10.5067/SXAVCZFAQLNO
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      margin: '14px 20px',
                      borderTop: '1px solid var(--color-border)',
                    }}
                  />

                  {/* Region & Time configuration */}
                  <div style={{ padding: '0 20px 20px' }}>
                    <RegionPanel
                      presets={presets}
                      selectedPresetId={selectedPresetId}
                      onSelectPreset={handleSelectPreset}
                      bboxA={bboxA}
                      bboxB={bboxB}
                      regionAName={regionAName}
                      regionBName={regionBName}
                      onBboxAChange={setBboxA}
                      onBboxBChange={setBboxB}
                      onRegionANameChange={setRegionAName}
                      onRegionBNameChange={setRegionBName}
                      startYear={startYear}
                      endYear={endYear}
                      onStartYearChange={setStartYear}
                      onEndYearChange={setEndYear}
                    />
                  </div>

                  {/* Sticky primary action */}
                  <div
                    style={{
                      padding: '14px 20px',
                      borderTop: '1px solid var(--color-border)',
                      background: 'var(--color-white)',
                      position: 'sticky',
                      bottom: 0,
                    }}
                  >
                    <button
                      onClick={handleRunInvestigation}
                      disabled={isLoading}
                      className="btn-primary"
                      style={{ width: '100%', justifyContent: 'center' }}
                      aria-label="Run scientific investigation"
                    >
                      {isLoading ? (
                        <>
                          <div
                            style={{
                              width: 14,
                              height: 14,
                              borderRadius: '50%',
                              border: '2px solid rgba(255,255,255,0.3)',
                              borderTopColor: '#fff',
                              animation: 'spin 0.8s linear infinite',
                            }}
                          />
                          Running investigation...
                        </>
                      ) : (
                        'Run investigation'
                      )}
                    </button>
                    {analysisData && !isLoading && (
                      <button
                        onClick={() => setActiveTab('analysis')}
                        className="btn-secondary"
                        style={{ width: '100%', marginTop: 7, justifyContent: 'center' }}
                      >
                        View analysis results
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* RIGHT: Dominant map canvas */}
            <div
              style={{
                flex: 1,
                padding: 16,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                minHeight: 0,
              }}
            >
              <MapCanvas
                bboxA={bboxA}
                bboxB={bboxB}
                regionAName={regionAName}
                regionBName={regionBName}
                selectedPresetId={selectedPresetId}
                rasterData={rasterData}
              />
            </div>
          </div>
        </div>
      )}

      {/* ── TAB: ANALYSIS ───────────────────────────────────── */}
      {activeTab === 'analysis' && (
        <main
          style={{
            flex: 1,
            maxWidth: 1360,
            width: '100%',
            margin: '0 auto',
            padding: '28px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          {analysisData ? (
            <>
              {/* Page title */}
              <div>
                <h1
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 26,
                    fontWeight: 400,
                    color: 'var(--color-graphite)',
                    margin: '0 0 4px',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Investigation results
                </h1>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 13,
                    color: 'var(--color-slate-text)',
                    margin: 0,
                  }}
                >
                  Variable: <strong>{analysisData.variable}</strong> · Period: {analysisData.time_range[0]}–{analysisData.time_range[1]} · Unit: {analysisData.unit}
                </p>
              </div>
              <SpatialPolarityCard data={analysisData} />
              <DeseasonalizerChart data={analysisData} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <ForensicScorecard region={analysisData.region_a} colorTheme="crimson" />
                <ForensicScorecard region={analysisData.region_b} colorTheme="teal" />
              </div>
            </>
          ) : (
            <EmptyAnalysis onGoInvestigate={() => setActiveTab('investigate')} />
          )}
        </main>
      )}

      {/* ── TAB: SPATIAL EXPLORER ───────────────────────────── */}
      {activeTab === 'spatial' && (
        <main
          style={{
            flex: 1,
            maxWidth: 1360,
            width: '100%',
            margin: '0 auto',
            padding: '28px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 26,
                fontWeight: 400,
                color: 'var(--color-graphite)',
                margin: '0 0 4px',
                letterSpacing: '-0.02em',
              }}
            >
              Spatial Explorer
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 13,
                color: 'var(--color-slate-text)',
                margin: 0,
              }}
            >
              Gridded trend magnitudes and Mann-Kendall significance across the investigation domain.
            </p>
          </div>
          {gridDataA || gridDataB ? (
            <SpatialGridMap
              gridDataA={gridDataA}
              gridDataB={gridDataB}
              bboxA={bboxA}
              bboxB={bboxB}
              regionAName={regionAName}
              regionBName={regionBName}
              isLoading={isGridLoading}
            />
          ) : (
            <EmptyAnalysis onGoInvestigate={() => setActiveTab('investigate')} />
          )}
        </main>
      )}

      {/* ── TAB: DATA & METHODS ─────────────────────────────── */}
      {activeTab === 'methods' && (
        <main
          style={{
            flex: 1,
            maxWidth: 1360,
            width: '100%',
            margin: '0 auto',
            padding: '28px 24px',
          }}
        >
          <div style={{ marginBottom: 20 }}>
            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 26,
                fontWeight: 400,
                color: 'var(--color-graphite)',
                margin: '0 0 4px',
                letterSpacing: '-0.02em',
              }}
            >
              Data & Methods
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 13,
                color: 'var(--color-slate-text)',
                margin: 0,
              }}
            >
              Open-science transparency: dataset provenance, statistical formulations, and reproducible methodology.
            </p>
          </div>
          <DataMethodsView currentAnalysis={analysisData} />
        </main>
      )}

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid var(--color-border)',
          background: 'var(--color-white)',
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          flexWrap: 'wrap',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 11,
            color: 'var(--color-slate-text)',
          }}
        >
          Team Synqora · NASA Space Apps Challenge 2026
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: 'var(--color-slate-text)',
            opacity: 0.7,
          }}
        >
          NASA GES DISC · DOI: 10.5067/SXAVCZFAQLNO · NASA Langley POWER
        </span>
      </footer>
    </div>
  );
}

function EmptyAnalysis({ onGoInvestigate }: { onGoInvestigate: () => void }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '64px 32px',
        textAlign: 'center',
        gap: 16,
        background: 'var(--color-white)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-xl)',
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          background: 'var(--color-muted)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="8" stroke="var(--color-moss)" strokeWidth="1.5" fill="none" />
          <path d="M 10 6 L 10 10 L 13 13" stroke="var(--color-moss)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <div>
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 18,
            color: 'var(--color-graphite)',
            margin: '0 0 6px',
          }}
        >
          No investigation results yet
        </p>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 13,
            color: 'var(--color-slate-text)',
            margin: 0,
          }}
        >
          Configure your variables and regions in the Investigate screen and run an investigation.
        </p>
      </div>
      <button onClick={onGoInvestigate} className="btn-primary">
        Go to Investigate
      </button>
    </div>
  );
}

export default App;
