import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { SpatialGridResponse, SpatialGridCell } from '../services/api';
import {
  Layers,
  RotateCcw,
  Sliders,
  Crosshair,
  ShieldCheck,
  AlertCircle,
  Maximize2,
  MapPin,
} from 'lucide-react';

export type LayerMode = 'slope' | 'regime' | 'pvalue';

export interface SpatialGridMapProps {
  gridDataA?: SpatialGridResponse | null;
  gridDataB?: SpatialGridResponse | null;
  bboxA?: [number, number, number, number];
  bboxB?: [number, number, number, number];
  regionAName?: string;
  regionBName?: string;
  isLoading: boolean;
  onRefreshGrid?: () => void;
  // Backward compatibility in case single gridData is passed
  gridData?: SpatialGridResponse | null;
}

/**
 * Abramowitz & Stegun rational approximation to compute signed Mann-Kendall Z-score from two-tailed p-value.
 */
function computeZScore(p: number, isPositive: boolean): number {
  if (p <= 0) return isPositive ? 4.5 : -4.5;
  if (p >= 1) return 0;
  const pClamped = Math.max(1e-6, Math.min(0.999999, p));
  const t = Math.sqrt(-2 * Math.log(pClamped / 2));
  const c0 = 2.515517;
  const c1 = 0.802853;
  const c2 = 0.010328;
  const d1 = 1.432788;
  const d2 = 0.189269;
  const d3 = 0.001308;
  const z = t - (c0 + c1 * t + c2 * t * t) / (1 + d1 * t + d2 * t * t + d3 * t * t * t);
  return isPositive ? Math.round(z * 100) / 100 : -Math.round(z * 100) / 100;
}

export const SpatialGridMap: React.FC<SpatialGridMapProps> = ({
  gridDataA,
  gridDataB,
  bboxA: propBboxA,
  bboxB: propBboxB,
  regionAName = 'Domain A',
  regionBName = 'Domain B',
  isLoading,
  gridData,
}) => {
  // Normalize single gridData fallback to gridDataA if dual isn't supplied
  const effectiveDataA = gridDataA || gridData || null;
  const effectiveDataB = gridDataB || null;

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const canvasRendererRef = useRef<L.Canvas | null>(null);

  // Separate LayerGroups for dual-domain isolation
  const boundaryLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const cellLayerGroupARef = useRef<L.LayerGroup | null>(null);
  const cellLayerGroupBRef = useRef<L.LayerGroup | null>(null);
  const stippleLayerGroupARef = useRef<L.LayerGroup | null>(null);
  const stippleLayerGroupBRef = useRef<L.LayerGroup | null>(null);

  // Layer & UI states
  const [layerMode, setLayerMode] = useState<LayerMode>('slope');
  const [showStippling, setShowStippling] = useState<boolean>(true);
  const [cellOpacity, setCellOpacity] = useState<number>(0.65);

  // Inspector & Cursor states
  const [hoveredCell, setHoveredCell] = useState<SpatialGridCell | null>(null);
  const [pinnedCell, setPinnedCell] = useState<SpatialGridCell | null>(null);
  const [cursorCoords, setCursorCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [currentZoom, setCurrentZoom] = useState<number>(3);

  // Resolve bounding boxes
  const resolvedBboxA: [number, number, number, number] = useMemo(() => {
    return effectiveDataA?.bbox || propBboxA || [36, 42, -9, 3];
  }, [effectiveDataA?.bbox, propBboxA]);

  const resolvedBboxB: [number, number, number, number] = useMemo(() => {
    return effectiveDataB?.bbox || propBboxB || [58, 66, 10, 22];
  }, [effectiveDataB?.bbox, propBboxB]);

  // Unified metadata
  const variable = effectiveDataA?.variable || effectiveDataB?.variable || 'RootMoist_inst';
  const unit = effectiveDataA?.unit || effectiveDataB?.unit || 'kg/m²/yr';
  const fdrThreshold = effectiveDataA?.fdr_threshold || effectiveDataB?.fdr_threshold || 0.05;
  const statisticalMethod = effectiveDataA?.statistical_method || effectiveDataB?.statistical_method;

  const provenanceType =
    effectiveDataA?.provenance_type === 'NASA_GLDAS_NETCDF' || effectiveDataB?.provenance_type === 'NASA_GLDAS_NETCDF'
      ? 'NASA_GLDAS_NETCDF'
      : 'ILLUSTRATIVE_BASELINE';

  // Compute unified symmetric diverging color scale across both domains
  const absMaxSlope = useMemo(() => {
    const maxA = Math.max(Math.abs(effectiveDataA?.min_slope || 0), Math.abs(effectiveDataA?.max_slope || 0));
    const maxB = Math.max(Math.abs(effectiveDataB?.min_slope || 0), Math.abs(effectiveDataB?.max_slope || 0));
    return Math.max(maxA, maxB, 0.02);
  }, [effectiveDataA?.min_slope, effectiveDataA?.max_slope, effectiveDataB?.min_slope, effectiveDataB?.max_slope]);

  // Color mapping per mode
  const getCellColor = useCallback(
    (cell: SpatialGridCell, mode: LayerMode): string => {
      if (mode === 'slope') {
        const ratio = cell.sens_slope / (absMaxSlope || 1);
        if (ratio <= -0.66) return '#991B1B'; // Deep Red (Severe drying/cooling)
        if (ratio <= -0.33) return '#B96F50'; // Terracotta
        if (ratio < -0.05) return '#E5A58A';  // Pale Terracotta
        if (ratio <= 0.05) return '#F5F4ED';  // Neutral Sand / Stable
        if (ratio <= 0.33) return '#87B0BD';  // Pale Mineral Blue
        if (ratio <= 0.66) return '#537D8C';  // Mineral Blue
        return '#0F766E';                     // Deep Teal / Strong accumulation
      }

      if (mode === 'regime') {
        const isSig = cell.q_value !== undefined ? cell.q_value < fdrThreshold : cell.is_significant;
        if (isSig && cell.sens_slope < 0) return '#B96F50'; // Significant Drying / Depletion
        if (isSig && cell.sens_slope > 0) return '#0F766E'; // Significant Wetting / Accumulation
        return '#DCCDB5'; // Not statistically significant at FDR threshold
      }

      // mode === 'pvalue' (p-Value Category)
      if (cell.p_value < 0.001) return '#102F29'; // Strong evidence against null (p < 0.001)
      if (cell.p_value < 0.01) return '#173F35';  // Moderate evidence (0.001 <= p < 0.01)
      if (cell.p_value < 0.05) return '#537D8C';  // Weak evidence (0.01 <= p < 0.05)
      return '#EAECE5';                           // Inconclusive / Indistinguishable from noise (p >= 0.05)
    },
    [absMaxSlope, fdrThreshold]
  );

  // 1. Initialize Shared Leaflet Map (Using Esri Light Gray basemap)
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    const [minLatA, maxLatA, minLonA, maxLonA] = resolvedBboxA;
    const [minLatB, maxLatB, minLonB, maxLonB] = resolvedBboxB;

    const boundsA = L.latLngBounds([minLatA, minLonA], [maxLatA, maxLonA]);
    const boundsB = L.latLngBounds([minLatB, minLonB], [maxLatB, maxLonB]);
    const combinedBounds = L.latLngBounds(boundsA.getSouthWest(), boundsA.getNorthEast()).extend(boundsB);

    const map = L.map(mapContainerRef.current, {
      center: combinedBounds.getCenter(),
      zoom: 3,
      minZoom: 2,
      maxZoom: 16,
      zoomControl: false,
      attributionControl: false,
      preferCanvas: true,
    });

    // Pinned zoom controls at top-left
    L.control.zoom({ position: 'topleft' }).addTo(map);

    // Metric and Imperial Scale Bar at bottom-left
    L.control.scale({ position: 'bottomleft', metric: true, imperial: true, maxWidth: 120 }).addTo(map);

    // Cartographic Base Layer: Esri World Light Gray Canvas
    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
      {
        maxZoom: 18,
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ &copy; OpenStreetMap',
      }
    ).addTo(map);

    // Canvas Renderer for fast vector rendering
    const canvasRenderer = L.canvas({ padding: 0.5 });
    canvasRendererRef.current = canvasRenderer;

    // Independent layer groups attached to single shared map
    const boundaryGroup = L.layerGroup().addTo(map);
    const cellGroupA = L.layerGroup().addTo(map);
    const cellGroupB = L.layerGroup().addTo(map);
    const stippleGroupA = L.layerGroup().addTo(map);
    const stippleGroupB = L.layerGroup().addTo(map);

    boundaryLayerGroupRef.current = boundaryGroup;
    cellLayerGroupARef.current = cellGroupA;
    cellLayerGroupBRef.current = cellGroupB;
    stippleLayerGroupARef.current = stippleGroupA;
    stippleLayerGroupBRef.current = stippleGroupB;
    mapInstanceRef.current = map;

    // Track mouse coordinates
    map.on('mousemove', (e: L.LeafletMouseEvent) => {
      setCursorCoords({
        lat: parseFloat(e.latlng.lat.toFixed(4)),
        lon: parseFloat(e.latlng.lng.toFixed(4)),
      });
    });

    map.on('mouseout', () => {
      setCursorCoords(null);
    });

    map.on('zoomend', () => {
      setCurrentZoom(map.getZoom());
    });

    // Auto-fit both domains with comfortable margin
    map.fitBounds(combinedBounds, { padding: [45, 45] });

    // Responsive size observer
    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    resizeObserver.observe(mapContainerRef.current);

    return () => {
      resizeObserver.disconnect();
      map.remove();
      mapInstanceRef.current = null;
      boundaryLayerGroupRef.current = null;
      cellLayerGroupARef.current = null;
      cellLayerGroupBRef.current = null;
      stippleLayerGroupARef.current = null;
      stippleLayerGroupBRef.current = null;
      canvasRendererRef.current = null;
    };
  }, [resolvedBboxA, resolvedBboxB]);

  // 2. Render Domain Bounding Outlines
  useEffect(() => {
    const boundaryGroup = boundaryLayerGroupRef.current;
    if (!boundaryGroup) return;

    boundaryGroup.clearLayers();

    const [minLatA, maxLatA, minLonA, maxLonA] = resolvedBboxA;
    const [minLatB, maxLatB, minLonB, maxLonB] = resolvedBboxB;

    const boundsA = L.latLngBounds([minLatA, minLonA], [maxLatA, maxLonA]);
    const boundsB = L.latLngBounds([minLatB, minLonB], [maxLatB, maxLonB]);

    // Domain A Boundary Outline: Terracotta (#B96F50), dashed
    const rectA = L.rectangle(boundsA, {
      color: '#B96F50',
      weight: 2,
      dashArray: '5, 5',
      fill: false,
      interactive: false,
    });
    boundaryGroup.addLayer(rectA);

    // Domain B Boundary Outline: Mineral Blue (#537D8C), dashed
    const rectB = L.rectangle(boundsB, {
      color: '#537D8C',
      weight: 2,
      dashArray: '5, 5',
      fill: false,
      interactive: false,
    });
    boundaryGroup.addLayer(rectB);
  }, [resolvedBboxA, resolvedBboxB]);

  // Helper to render a specific grid group into its own layer
  const renderGridGroup = useCallback(
    (
      grid: SpatialGridResponse | null,
      domainId: 'A' | 'B',
      cellGroup: L.LayerGroup | null,
      stippleGroup: L.LayerGroup | null,
      renderer: L.Canvas | null
    ) => {
      if (!grid || !cellGroup || !stippleGroup || !grid.cells) return;

      cellGroup.clearLayers();
      stippleGroup.clearLayers();

      const halfLat = (grid.lat_step || grid.grid_step || 1.5) / 2;
      const halfLon = (grid.lon_step || grid.grid_step || 1.5) / 2;

      grid.cells.forEach((cell) => {
        // Tag cell with domain_id and region name if missing
        const cellWithDomain: SpatialGridCell = {
          ...cell,
          domain_id: domainId,
          domain_name: domainId === 'A' ? regionAName : regionBName,
        };

        // Determine geographic boundaries
        let cellBounds: L.LatLngBounds;
        if (cell.bounds && cell.bounds.length === 4) {
          cellBounds = L.latLngBounds(
            [cell.bounds[0], cell.bounds[2]],
            [cell.bounds[1], cell.bounds[3]]
          );
        } else {
          cellBounds = L.latLngBounds(
            [cell.lat - halfLat, cell.lon - halfLon],
            [cell.lat + halfLat, cell.lon + halfLon]
          );
        }

        const fillColor = getCellColor(cellWithDomain, layerMode);
        const isPinned = pinnedCell?.lat === cell.lat && pinnedCell?.lon === cell.lon;

        const rect = L.rectangle(cellBounds, {
          color: isPinned ? '#102F29' : 'rgba(255, 255, 255, 0.45)',
          weight: isPinned ? 2.5 : 0.5,
          fillColor,
          fillOpacity: cellOpacity,
          renderer: renderer || undefined,
        });

        rect.on('mouseover', () => {
          setHoveredCell(cellWithDomain);
          if (!isPinned) {
            rect.setStyle({ weight: 2, color: '#102F29' });
            rect.bringToFront();
          }
        });

        rect.on('mouseout', () => {
          if (!isPinned) {
            rect.setStyle({ weight: 0.5, color: 'rgba(255, 255, 255, 0.45)' });
          }
        });

        rect.on('click', () => {
          setPinnedCell((prev) =>
            prev?.lat === cell.lat && prev?.lon === cell.lon ? null : cellWithDomain
          );
        });

        cellGroup.addLayer(rect);

        // Statistically Supported Stippling Dot (Benjamini-Hochberg FDR q < 0.05)
        const isSigFDR = cell.q_value !== undefined ? cell.q_value < fdrThreshold : cell.is_significant;
        if (showStippling && isSigFDR) {
          const dot = L.circleMarker([cell.lat, cell.lon], {
            radius: 2.0,
            fillColor: '#102F29',
            fillOpacity: 0.95,
            weight: 0,
            renderer: renderer || undefined,
            interactive: false,
          });
          stippleGroup.addLayer(dot);
        }
      });
    },
    [getCellColor, layerMode, cellOpacity, showStippling, fdrThreshold, pinnedCell, regionAName, regionBName]
  );

  // 3. Render Independent Grids: Domain A and Domain B
  useEffect(() => {
    const renderer = canvasRendererRef.current;
    renderGridGroup(effectiveDataA, 'A', cellLayerGroupARef.current, stippleLayerGroupARef.current, renderer);
    renderGridGroup(effectiveDataB, 'B', cellLayerGroupBRef.current, stippleLayerGroupBRef.current, renderer);
  }, [effectiveDataA, effectiveDataB, renderGridGroup]);

  // Camera navigation actions
  const handleFitBoth = useCallback(() => {
    if (!mapInstanceRef.current) return;
    const [minLatA, maxLatA, minLonA, maxLonA] = resolvedBboxA;
    const [minLatB, maxLatB, minLonB, maxLonB] = resolvedBboxB;
    const boundsA = L.latLngBounds([minLatA, minLonA], [maxLatA, maxLonA]);
    const boundsB = L.latLngBounds([minLatB, minLonB], [maxLatB, maxLonB]);
    const combined = L.latLngBounds(boundsA.getSouthWest(), boundsA.getNorthEast()).extend(boundsB);
    mapInstanceRef.current.flyToBounds(combined, { padding: [45, 45], duration: 0.7 });
  }, [resolvedBboxA, resolvedBboxB]);

  const handleFocusA = useCallback(() => {
    if (!mapInstanceRef.current) return;
    const [minLatA, maxLatA, minLonA, maxLonA] = resolvedBboxA;
    const boundsA = L.latLngBounds([minLatA, minLonA], [maxLatA, maxLonA]);
    mapInstanceRef.current.flyToBounds(boundsA, { padding: [45, 45], duration: 0.7 });
  }, [resolvedBboxA]);

  const handleFocusB = useCallback(() => {
    if (!mapInstanceRef.current) return;
    const [minLatB, maxLatB, minLonB, maxLonB] = resolvedBboxB;
    const boundsB = L.latLngBounds([minLatB, minLonB], [maxLatB, maxLonB]);
    mapInstanceRef.current.flyToBounds(boundsB, { padding: [45, 45], duration: 0.7 });
  }, [resolvedBboxB]);

  // Telemetry target: Prioritize hovered cell, then pinned cell, then fallback to first cell of Domain A
  const telemetryCell = useMemo(() => {
    if (hoveredCell) return hoveredCell;
    if (pinnedCell) return pinnedCell;
    if (effectiveDataA?.cells && effectiveDataA.cells.length > 0) {
      return {
        ...effectiveDataA.cells[0],
        domain_id: 'A',
        domain_name: regionAName,
      };
    }
    if (effectiveDataB?.cells && effectiveDataB.cells.length > 0) {
      return {
        ...effectiveDataB.cells[0],
        domain_id: 'B',
        domain_name: regionBName,
      };
    }
    return null;
  }, [hoveredCell, pinnedCell, effectiveDataA, effectiveDataB, regionAName, regionBName]);

  // Distribution calculations helper
  const computeStats = (data: SpatialGridResponse | null) => {
    if (!data) return { total: 0, dec: 0, inc: 0, nonSig: 0, decPct: 0, incPct: 0, nonSigPct: 0 };
    const total = data.total_cells || 0;
    const dec = data.sig_decrease_count ?? data.drying_cells ?? 0;
    const inc = data.sig_increase_count ?? data.wetting_cells ?? 0;
    const nonSig = data.not_sig_count ?? Math.max(0, total - dec - inc);
    const decPct = total > 0 ? Math.round((dec / total) * 100) : 0;
    const incPct = total > 0 ? Math.round((inc / total) * 100) : 0;
    const nonSigPct = Math.max(0, 100 - decPct - incPct);
    return { total, dec, inc, nonSig, decPct, incPct, nonSigPct };
  };

  const statsA = useMemo(() => computeStats(effectiveDataA), [effectiveDataA]);
  const statsB = useMemo(() => computeStats(effectiveDataB), [effectiveDataB]);

  if (isLoading) {
    return (
      <div
        style={{
          background: 'var(--color-white)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border)',
          padding: 64,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            border: '3px solid rgba(23, 63, 53, 0.2)',
            borderTopColor: 'var(--color-forest)',
            animation: 'spin 0.8s linear infinite',
          }}
        />
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 13,
            fontWeight: 600,
            color: 'var(--color-graphite)',
          }}
        >
          Calculating Dual-Domain Spatial Grids & Benjamini-Hochberg FDR...
        </span>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
      {/* Editorial Header & Domain Diagnostic Badges */}
      <div
        style={{
          background: 'var(--color-white)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border)',
          padding: '16px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 14,
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 18,
                  fontWeight: 600,
                  color: 'var(--color-graphite)',
                  letterSpacing: '-0.01em',
                }}
              >
                Dual Spatial Explorer: {regionAName} vs {regionBName}
              </span>
              <span className="badge" style={{ background: 'var(--color-paper)' }}>
                {variable} ({unit})
              </span>
              <span className="badge" style={{ background: 'var(--color-paper)' }}>
                Resolution: {effectiveDataA?.lat_step || effectiveDataA?.grid_step || 1.5}°
              </span>

              {/* Data Provenance Badge */}
              {provenanceType === 'NASA_GLDAS_NETCDF' ? (
                <span
                  style={{
                    fontSize: 10,
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: 3,
                    background: 'rgba(23, 63, 53, 0.12)',
                    color: 'var(--color-forest)',
                    border: '1px solid rgba(23, 63, 53, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                  title="Derived from verified NASA NetCDF data"
                >
                  <ShieldCheck size={12} />
                  NASA GLDAS NetCDF
                </span>
              ) : (
                <span
                  style={{
                    fontSize: 10,
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 600,
                    padding: '2px 8px',
                    borderRadius: 3,
                    background: 'rgba(185, 111, 80, 0.12)',
                    color: '#B96F50',
                    border: '1px solid rgba(185, 111, 80, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                  title="Illustrative spatial baseline for development."
                >
                  <AlertCircle size={12} />
                  Illustrative Baseline
                </span>
              )}
            </div>

            <p
              style={{
                margin: '4px 0 0',
                fontFamily: 'var(--font-sans)',
                fontSize: 12,
                color: 'var(--color-slate-text)',
              }}
            >
              Two independent spatial grids rendered on one shared GIS canvas. The intervening geographic territory is
              unobstructed. Symmetric color scaling centered at zero (Theil–Sen β with Benjamini-Hochberg FDR q &lt; {fdrThreshold}).
            </p>
          </div>

          {/* Quick Metrics for Both Domains */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            {/* Domain A Summary */}
            <div
              style={{
                padding: '6px 12px',
                background: 'rgba(185, 111, 80, 0.08)',
                border: '1px solid rgba(185, 111, 80, 0.25)',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 8, height: 8, background: '#B96F50', borderRadius: 2 }} />
                <span className="section-label" style={{ fontSize: 9, color: '#B96F50' }}>Domain A ({regionAName})</span>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600 }}>
                {statsA.total} cells · Dec {statsA.decPct}% / Inc {statsA.incPct}%
              </span>
            </div>

            {/* Domain B Summary */}
            <div
              style={{
                padding: '6px 12px',
                background: 'rgba(83, 125, 140, 0.08)',
                border: '1px solid rgba(83, 125, 140, 0.25)',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 8, height: 8, background: '#537D8C', borderRadius: 2 }} />
                <span className="section-label" style={{ fontSize: 9, color: '#537D8C' }}>Domain B ({regionBName})</span>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600 }}>
                {statsB.total} cells · Dec {statsB.decPct}% / Inc {statsB.incPct}%
              </span>
            </div>
          </div>
        </div>

        {/* GIS Layer & Overlay Toolbar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            paddingTop: 10,
            borderTop: '1px solid var(--color-border)',
          }}
        >
          {/* Layer Mode Segmented Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 11,
                fontWeight: 600,
                color: 'var(--color-graphite)',
                display: 'flex',
                alignItems: 'center',
                gap: 5,
              }}
            >
              <Layers size={13} color="var(--color-moss)" /> Layer Mode:
            </span>
            <div
              style={{
                display: 'inline-flex',
                background: 'var(--color-muted)',
                padding: 2,
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border)',
              }}
            >
              <button
                onClick={() => setLayerMode('slope')}
                style={{
                  padding: '4px 9px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 11,
                  fontWeight: layerMode === 'slope' ? 600 : 500,
                  color: layerMode === 'slope' ? '#ffffff' : 'var(--color-graphite)',
                  background: layerMode === 'slope' ? 'var(--color-forest)' : 'transparent',
                  border: 'none',
                  borderRadius: 3,
                  cursor: 'pointer',
                  transition: 'all 120ms ease',
                }}
              >
                Trend Slope (Sen's β)
              </button>
              <button
                onClick={() => setLayerMode('regime')}
                style={{
                  padding: '4px 9px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 11,
                  fontWeight: layerMode === 'regime' ? 600 : 500,
                  color: layerMode === 'regime' ? '#ffffff' : 'var(--color-graphite)',
                  background: layerMode === 'regime' ? 'var(--color-forest)' : 'transparent',
                  border: 'none',
                  borderRadius: 3,
                  cursor: 'pointer',
                  transition: 'all 120ms ease',
                }}
              >
                Significance Regime
              </button>
              <button
                onClick={() => setLayerMode('pvalue')}
                style={{
                  padding: '4px 9px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 11,
                  fontWeight: layerMode === 'pvalue' ? 600 : 500,
                  color: layerMode === 'pvalue' ? '#ffffff' : 'var(--color-graphite)',
                  background: layerMode === 'pvalue' ? 'var(--color-forest)' : 'transparent',
                  border: 'none',
                  borderRadius: 3,
                  cursor: 'pointer',
                  transition: 'all 120ms ease',
                }}
              >
                p-Value Category
              </button>
            </div>
          </div>

          {/* Camera Focus & GIS Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            {/* Domain Camera Focus Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <button
                onClick={handleFitBoth}
                className="btn-secondary"
                style={{ fontSize: 11, padding: '4px 8px', gap: 4 }}
                title="Fit both domains in viewport"
              >
                <Maximize2 size={12} />
                Fit Both
              </button>
              <button
                onClick={handleFocusA}
                className="btn-secondary"
                style={{
                  fontSize: 11,
                  padding: '4px 8px',
                  gap: 4,
                  color: '#B96F50',
                  borderColor: 'rgba(185, 111, 80, 0.3)',
                }}
                title={`Zoom to Domain A (${regionAName})`}
              >
                <MapPin size={12} />
                Focus A
              </button>
              <button
                onClick={handleFocusB}
                className="btn-secondary"
                style={{
                  fontSize: 11,
                  padding: '4px 8px',
                  gap: 4,
                  color: '#537D8C',
                  borderColor: 'rgba(83, 125, 140, 0.3)',
                }}
                title={`Zoom to Domain B (${regionBName})`}
              >
                <MapPin size={12} />
                Focus B
              </button>
            </div>

            {/* Stippling Toggle */}
            <label
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontFamily: 'var(--font-sans)',
                fontSize: 11,
                fontWeight: 600,
                color: 'var(--color-graphite)',
                cursor: 'pointer',
                background: showStippling ? 'rgba(16, 47, 41, 0.08)' : 'var(--color-paper)',
                border: `1px solid ${showStippling ? 'var(--color-forest)' : 'var(--color-border)'}`,
                borderRadius: 'var(--radius-sm)',
                padding: '4px 8px',
              }}
            >
              <input
                type="checkbox"
                checked={showStippling}
                onChange={(e) => setShowStippling(e.target.checked)}
                style={{ accentColor: 'var(--color-forest)', cursor: 'pointer' }}
              />
              <span>[•] FDR Stippling (q &lt; {fdrThreshold})</span>
            </label>

            {/* Opacity Slider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Sliders size={12} color="var(--color-slate-text)" />
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--color-slate-text)' }}>
                Opacity:
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, minWidth: 30 }}>
                {Math.round(cellOpacity * 100)}%
              </span>
              <input
                type="range"
                min={0.3}
                max={0.9}
                step={0.05}
                value={cellOpacity}
                onChange={(e) => setCellOpacity(parseFloat(e.target.value))}
                style={{ width: 60, cursor: 'pointer', accentColor: 'var(--color-forest)' }}
                aria-label="Grid opacity"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Split: 70% Left GIS Map + 30% Right Docked Inspector */}
      <div
        className="spatial-grid-workbench-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 7fr) minmax(330px, 3fr)',
          gap: 16,
          alignItems: 'stretch',
        }}
      >
        {/* LEFT 70%: Real Interactive Cartographic Leaflet Map */}
        <div
          style={{
            background: 'var(--color-white)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            height: 580,
          }}
        >
          {/* Leaflet Map Target */}
          <div ref={mapContainerRef} style={{ flex: 1, width: '100%', height: '100%', background: '#F5F4ED' }} />

          {/* Map Footer HUD */}
          <div
            style={{
              height: 30,
              padding: '0 14px',
              background: 'rgba(255, 255, 255, 0.98)',
              borderTop: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
              flexShrink: 0,
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              color: 'var(--color-slate-text)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color: 'var(--color-moss)', fontWeight: 600 }}>Cursor:</span>
              <span>
                {cursorCoords
                  ? `LAT ${cursorCoords.lat >= 0 ? '+' : ''}${cursorCoords.lat.toFixed(4)}° | LON ${
                      cursorCoords.lon >= 0 ? '+' : ''
                    }${cursorCoords.lon.toFixed(4)}°`
                  : 'Hover map'}
              </span>
              <span style={{ color: 'var(--color-border)' }}>|</span>
              <span>Zoom: {currentZoom}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ color: '#B96F50' }}>Domain A: [{resolvedBboxA.join('°, ')}°]</span>
              <span style={{ color: 'var(--color-border)' }}>|</span>
              <span style={{ color: '#537D8C' }}>Domain B: [{resolvedBboxB.join('°, ')}°]</span>
              <span style={{ color: 'var(--color-border)' }}>|</span>
              <span style={{ opacity: 0.85 }}>Esri Light Gray Canvas &copy; Esri, OSM</span>
            </div>
          </div>
        </div>

        {/* RIGHT 30%: Docked Spatial Inspector & Summary Panel */}
        <div
          style={{
            background: 'var(--color-white)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border)',
            padding: 18,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 14,
            height: 580,
            overflowY: 'auto',
          }}
        >
          {/* SECTION 1: Grid Cell Telemetry (Pinned or Hovered) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid var(--color-border)',
                paddingBottom: 8,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Crosshair size={13} color="var(--color-forest)" />
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 12,
                    fontWeight: 700,
                    color: 'var(--color-graphite)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  Grid Cell Inspector
                </span>
              </div>
              <span
                className="badge"
                style={{
                  background: pinnedCell ? 'rgba(23, 63, 53, 0.1)' : 'var(--color-paper)',
                  color: pinnedCell ? 'var(--color-forest)' : 'var(--color-slate-text)',
                  borderColor: pinnedCell ? 'var(--color-forest)' : 'var(--color-border)',
                }}
              >
                {pinnedCell ? 'Pinned Cell' : hoveredCell ? 'Live Hover' : 'Selected Cell'}
              </span>
            </div>

            {telemetryCell ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                {/* Domain Attribution Badge */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, color: 'var(--color-slate-text)' }}>Origin Domain:</span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 10,
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: 3,
                      background:
                        telemetryCell.domain_id === 'A'
                          ? 'rgba(185, 111, 80, 0.12)'
                          : 'rgba(83, 125, 140, 0.12)',
                      color: telemetryCell.domain_id === 'A' ? '#B96F50' : '#537D8C',
                      border: `1px solid ${
                        telemetryCell.domain_id === 'A'
                          ? 'rgba(185, 111, 80, 0.3)'
                          : 'rgba(83, 125, 140, 0.3)'
                      }`,
                    }}
                  >
                    Domain {telemetryCell.domain_id || 'A'} ·{' '}
                    {telemetryCell.domain_id === 'A' ? regionAName : regionBName}
                  </span>
                </div>

                {/* Lat/Lon & Resolution */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, color: 'var(--color-slate-text)' }}>Center (Lat / Lon):</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600 }}>
                    {telemetryCell.lat >= 0 ? `${telemetryCell.lat.toFixed(2)}°N` : `${Math.abs(telemetryCell.lat).toFixed(2)}°S`},{' '}
                    {telemetryCell.lon >= 0 ? `${telemetryCell.lon.toFixed(2)}°E` : `${Math.abs(telemetryCell.lon).toFixed(2)}°W`}
                  </span>
                </div>

                {/* Explicit Cell Geographic Bounds */}
                {telemetryCell.bounds && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 11, color: 'var(--color-slate-text)' }}>Geographic Bounds:</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-graphite)' }}>
                      [{telemetryCell.bounds[0]}°, {telemetryCell.bounds[1]}°, {telemetryCell.bounds[2]}°, {telemetryCell.bounds[3]}°]
                    </span>
                  </div>
                )}

                {/* Theil-Sen Slope */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, color: 'var(--color-slate-text)' }}>Theil–Sen Slope (β):</span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 13,
                      fontWeight: 700,
                      color: telemetryCell.sens_slope < 0 ? 'var(--color-terracotta)' : '#0F766E',
                    }}
                  >
                    {telemetryCell.sens_slope > 0 ? '+' : ''}
                    {telemetryCell.sens_slope.toFixed(4)} {unit}
                  </span>
                </div>

                {/* Decadal Rate */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, color: 'var(--color-slate-text)' }}>Decadal Rate:</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600 }}>
                    {telemetryCell.sens_slope_decade > 0 ? '+' : ''}
                    {telemetryCell.sens_slope_decade.toFixed(3)} {unit.replace('/yr', '')}/decade
                  </span>
                </div>

                {/* Standardized Mann-Kendall Z */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, color: 'var(--color-slate-text)' }}>Mann–Kendall Z:</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600 }}>
                    {telemetryCell.standardized_z !== undefined
                      ? telemetryCell.standardized_z.toFixed(3)
                      : computeZScore(telemetryCell.p_value, telemetryCell.sens_slope >= 0).toFixed(2)}
                  </span>
                </div>

                {/* Raw p-value & Adjusted FDR q-value */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, color: 'var(--color-slate-text)' }}>Raw p-value:</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600 }}>
                    {telemetryCell.p_value < 0.0001 ? '< 0.0001' : telemetryCell.p_value.toFixed(4)}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, color: 'var(--color-slate-text)' }}>Adjusted FDR q-value:</span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11,
                      fontWeight: 700,
                      color:
                        telemetryCell.q_value !== undefined && telemetryCell.q_value < fdrThreshold
                          ? 'var(--color-forest)'
                          : 'var(--color-slate-text)',
                    }}
                  >
                    {telemetryCell.q_value !== undefined
                      ? telemetryCell.q_value < 0.0001
                        ? '< 0.0001'
                        : telemetryCell.q_value.toFixed(4)
                      : 'Not computed'}
                  </span>
                </div>

                {/* Valid Observation Samples */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, color: 'var(--color-slate-text)' }}>Evaluated Samples:</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-slate-text)' }}>
                    N = {telemetryCell.valid_observations || 25} annual means
                  </span>
                </div>

                {/* Scientific Significance Verdict Banner */}
                <div
                  style={{
                    padding: '8px 10px',
                    borderRadius: 'var(--radius-sm)',
                    background:
                      telemetryCell.q_value !== undefined && telemetryCell.q_value < fdrThreshold
                        ? 'rgba(23, 63, 53, 0.08)'
                        : 'var(--color-paper)',
                    border: `1px solid ${
                      telemetryCell.q_value !== undefined && telemetryCell.q_value < fdrThreshold
                        ? 'rgba(23, 63, 53, 0.25)'
                        : 'var(--color-border)'
                    }`,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-graphite)' }}>
                      Inference Status
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 9,
                        fontWeight: 700,
                        color:
                          telemetryCell.q_value !== undefined && telemetryCell.q_value < fdrThreshold
                            ? 'var(--color-forest)'
                            : 'var(--color-slate-text)',
                      }}
                    >
                      {telemetryCell.q_value !== undefined && telemetryCell.q_value < fdrThreshold
                        ? `q < ${fdrThreshold} Supported`
                        : 'Non-Significant'}
                    </span>
                  </div>

                  <p style={{ margin: 0, fontSize: 10, color: 'var(--color-slate-text)', lineHeight: 1.4 }}>
                    {telemetryCell.q_value !== undefined && telemetryCell.q_value < fdrThreshold
                      ? telemetryCell.sens_slope < 0
                        ? `Decreasing trend; adjusted q < ${fdrThreshold}. Statistically supported after Benjamini-Hochberg FDR multiple-testing control.`
                        : `Increasing trend; adjusted q < ${fdrThreshold}. Statistically supported after Benjamini-Hochberg FDR multiple-testing control.`
                      : 'No statistically supported monotonic trend at the configured FDR threshold.'}
                  </p>
                </div>
              </div>
            ) : (
              <div
                style={{
                  padding: '24px 12px',
                  textAlign: 'center',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 11,
                  color: 'var(--color-slate-text)',
                }}
              >
                Hover over or click any cell in Domain A or Domain B to inspect local slope, Z-score, and p-value telemetry.
              </div>
            )}
          </div>

          {/* SECTION 2: Dual Spatial Distribution Summaries (Two Stacked Bars) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span className="section-label" style={{ fontSize: 10 }}>Spatial Distribution Breakdown</span>

            {/* Domain A Distribution */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 10 }}>
                <span style={{ fontWeight: 600, color: '#B96F50' }}>Domain A ({regionAName})</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-slate-text)' }}>
                  {statsA.total} cells
                </span>
              </div>
              <div
                style={{
                  width: '100%',
                  height: 10,
                  borderRadius: 2,
                  overflow: 'hidden',
                  display: 'flex',
                  background: 'var(--color-muted)',
                  border: '1px solid var(--color-border)',
                }}
              >
                {statsA.decPct > 0 && (
                  <div
                    style={{ width: `${statsA.decPct}%`, background: '#B96F50' }}
                    title={`Domain A Decrease: ${statsA.decPct}% (${statsA.dec} cells)`}
                  />
                )}
                {statsA.incPct > 0 && (
                  <div
                    style={{ width: `${statsA.incPct}%`, background: '#0F766E' }}
                    title={`Domain A Increase: ${statsA.incPct}% (${statsA.inc} cells)`}
                  />
                )}
                {statsA.nonSigPct > 0 && (
                  <div
                    style={{ width: `${statsA.nonSigPct}%`, background: '#DCCDB5' }}
                    title={`Domain A Non-Sig: ${statsA.nonSigPct}% (${statsA.nonSig} cells)`}
                  />
                )}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, fontFamily: 'var(--font-mono)' }}>
                <span style={{ color: '#B96F50' }}>Dec {statsA.decPct}% ({statsA.dec})</span>
                <span style={{ color: '#0F766E' }}>Inc {statsA.incPct}% ({statsA.inc})</span>
                <span style={{ color: 'var(--color-slate-text)' }}>Non-Sig {statsA.nonSigPct}% ({statsA.nonSig})</span>
              </div>
            </div>

            {/* Domain B Distribution */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 10 }}>
                <span style={{ fontWeight: 600, color: '#537D8C' }}>Domain B ({regionBName})</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-slate-text)' }}>
                  {statsB.total} cells
                </span>
              </div>
              <div
                style={{
                  width: '100%',
                  height: 10,
                  borderRadius: 2,
                  overflow: 'hidden',
                  display: 'flex',
                  background: 'var(--color-muted)',
                  border: '1px solid var(--color-border)',
                }}
              >
                {statsB.decPct > 0 && (
                  <div
                    style={{ width: `${statsB.decPct}%`, background: '#B96F50' }}
                    title={`Domain B Decrease: ${statsB.decPct}% (${statsB.dec} cells)`}
                  />
                )}
                {statsB.incPct > 0 && (
                  <div
                    style={{ width: `${statsB.incPct}%`, background: '#0F766E' }}
                    title={`Domain B Increase: ${statsB.incPct}% (${statsB.inc} cells)`}
                  />
                )}
                {statsB.nonSigPct > 0 && (
                  <div
                    style={{ width: `${statsB.nonSigPct}%`, background: '#DCCDB5' }}
                    title={`Domain B Non-Sig: ${statsB.nonSigPct}% (${statsB.nonSig} cells)`}
                  />
                )}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, fontFamily: 'var(--font-mono)' }}>
                <span style={{ color: '#B96F50' }}>Dec {statsB.decPct}% ({statsB.dec})</span>
                <span style={{ color: '#0F766E' }}>Inc {statsB.incPct}% ({statsB.inc})</span>
                <span style={{ color: 'var(--color-slate-text)' }}>Non-Sig {statsB.nonSigPct}% ({statsB.nonSig})</span>
              </div>
            </div>
          </div>

          {/* SECTION 3: Variable-Aware Dynamic Unified Legend */}
          <div
            style={{
              paddingTop: 8,
              borderTop: '1px solid var(--color-border)',
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="section-label" style={{ fontSize: 10 }}>
                {layerMode === 'slope'
                  ? `Symmetric Divergence Scale (${unit})`
                  : layerMode === 'regime'
                  ? 'Significance Regime'
                  : 'p-Value Classification'}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--color-slate-text)' }}>
                {statisticalMethod ? 'Theil-Sen + MK (FDR)' : 'Parametric'}
              </span>
            </div>

            {layerMode === 'slope' && (
              <div>
                {/* 7-Segment Stepped Diverging Bar */}
                <div
                  style={{
                    height: 10,
                    borderRadius: 2,
                    display: 'flex',
                    overflow: 'hidden',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <div style={{ flex: 1, background: '#991B1B' }} title="Severe Declining" />
                  <div style={{ flex: 1, background: '#B96F50' }} title="Moderate Declining" />
                  <div style={{ flex: 1, background: '#E5A58A' }} title="Slight Declining" />
                  <div style={{ flex: 1, background: '#F5F4ED' }} title="Stable / Neutral" />
                  <div style={{ flex: 1, background: '#87B0BD' }} title="Slight Increasing" />
                  <div style={{ flex: 1, background: '#537D8C' }} title="Moderate Increasing" />
                  <div style={{ flex: 1, background: '#0F766E' }} title="Strong Increasing" />
                </div>
                {/* Stepped Numerical Ticks with Real Dynamic Scale */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 9,
                    color: 'var(--color-slate-text)',
                    marginTop: 3,
                  }}
                >
                  <span>-{absMaxSlope.toFixed(2)}</span>
                  <span>-{(absMaxSlope / 2).toFixed(2)}</span>
                  <span>0.00</span>
                  <span>+{(absMaxSlope / 2).toFixed(2)}</span>
                  <span>+{absMaxSlope.toFixed(2)}</span>
                </div>
              </div>
            )}

            {layerMode === 'regime' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3, fontSize: 10, fontFamily: 'var(--font-sans)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 9, height: 9, background: '#B96F50', borderRadius: 2 }} />
                  <span>Significant Decrease (q &lt; {fdrThreshold}, β &lt; 0)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 9, height: 9, background: '#0F766E', borderRadius: 2 }} />
                  <span>Significant Increase (q &lt; {fdrThreshold}, β &gt; 0)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 9, height: 9, background: '#DCCDB5', borderRadius: 2 }} />
                  <span>Not Statistically Significant (q ≥ {fdrThreshold})</span>
                </div>
              </div>
            )}

            {layerMode === 'pvalue' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3, fontSize: 10, fontFamily: 'var(--font-sans)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 9, height: 9, background: '#102F29', borderRadius: 2 }} />
                  <span>p &lt; 0.001 (Strong evidence against null)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 9, height: 9, background: '#173F35', borderRadius: 2 }} />
                  <span>0.001 ≤ p &lt; 0.01 (Moderate evidence)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 9, height: 9, background: '#537D8C', borderRadius: 2 }} />
                  <span>0.01 ≤ p &lt; 0.05 (Weak evidence)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 9, height: 9, background: '#EAECE5', borderRadius: 2 }} />
                  <span>p ≥ 0.05 (Indistinguishable from noise)</span>
                </div>
              </div>
            )}

            {/* FDR Stippling Information Callout */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '4px 7px',
                background: 'var(--color-paper)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                fontSize: 9,
                color: 'var(--color-graphite)',
                marginTop: 2,
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  background: '#102F29',
                  display: 'inline-block',
                }}
              />
              <span style={{ fontFamily: 'var(--font-sans)' }}>
                <strong>Stippling (•)</strong>: Benjamini-Hochberg FDR q &lt; {fdrThreshold}
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .spatial-grid-workbench-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
