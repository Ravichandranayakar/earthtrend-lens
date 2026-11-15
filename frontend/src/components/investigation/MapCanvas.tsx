import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  RasterResponse,
  DualRasterResponse,
  fetchDualScientificRasters,
} from '../../services/api';
import { getCuratedDualRaster } from '../../data/curatedCatalog';

export type BBoxTuple = [number, number, number, number]; // [minLat, maxLat, minLon, maxLon]
export type BasemapMode = 'geography' | 'satellite';
export type ScientificVariable = 'T2M' | 'PRECTOTCORR' | 'RootMoist_inst';
export type ScientificMode = 'mean' | 'trend';

interface MapCanvasProps {
  bboxA: BBoxTuple;
  bboxB: BBoxTuple;
  regionAName: string;
  regionBName: string;
  selectedPresetId?: string;
  selectedVariableId?: string;
  rasterData?: RasterResponse | null;
  initialVariable?: ScientificVariable;
  onSelectVariable?: (variableId: string) => void;
}

export interface BBoxValidationResult {
  isValid: boolean;
  errorMessage?: string;
  leafletBounds?: L.LatLngBounds;
}

/**
 * Normalizes and validates a bounding box tuple [minLat, maxLat, minLon, maxLon].
 */
export function normalizeAndValidateBBox(bbox: BBoxTuple | undefined | null): BBoxValidationResult {
  if (!bbox || !Array.isArray(bbox) || bbox.length !== 4) {
    return {
      isValid: false,
      errorMessage: 'Bounding box requires 4 numeric values [minLat, maxLat, minLon, maxLon].',
    };
  }

  const [minLat, maxLat, minLon, maxLon] = bbox;

  if (
    !Number.isFinite(minLat) ||
    !Number.isFinite(maxLat) ||
    !Number.isFinite(minLon) ||
    !Number.isFinite(maxLon)
  ) {
    return {
      isValid: false,
      errorMessage: 'Coordinates must be finite numbers.',
    };
  }

  if (minLat < -90 || minLat > 90 || maxLat < -90 || maxLat > 90) {
    return {
      isValid: false,
      errorMessage: 'Latitude must be within [-90.0°, +90.0°].',
    };
  }

  if (minLon < -180 || minLon > 180 || maxLon < -180 || maxLon > 180) {
    return {
      isValid: false,
      errorMessage: 'Longitude must be within [-180.0°, +180.0°].',
    };
  }

  if (minLat >= maxLat) {
    return {
      isValid: false,
      errorMessage: `Min Lat (${minLat}°) must be less than Max Lat (${maxLat}°).`,
    };
  }

  if (minLon >= maxLon) {
    return {
      isValid: false,
      errorMessage: `Min Lon (${minLon}°) must be less than Max Lon (${maxLon}°).`,
    };
  }

  const leafletBounds = L.latLngBounds([minLat, minLon], [maxLat, maxLon]);

  return {
    isValid: true,
    leafletBounds,
  };
}

export const MapCanvas: React.FC<MapCanvasProps> = ({
  bboxA,
  bboxB,
  regionAName,
  regionBName,
  selectedPresetId,
  selectedVariableId,
  rasterData: initialRasterData,
  initialVariable = 'T2M',
  onSelectVariable,
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  // Layer references
  const baseLayerRef = useRef<L.TileLayer | null>(null);
  const satelliteLayerRef = useRef<L.TileLayer | null>(null);
  const domainLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const scientificLayerGroupRef = useRef<L.LayerGroup | null>(null);

  const prevPresetIdRef = useRef<string | undefined>(selectedPresetId);

  // Basemap State
  const [basemapMode, setBasemapMode] = useState<BasemapMode>('geography');
  const [satelliteOpacity, setSatelliteOpacity] = useState<number>(0.85);

  // Scientific Overlay States
  const [showScientificRaster, setShowScientificRaster] = useState<boolean>(true);
  const [rasterOpacity, setRasterOpacity] = useState<number>(0.80);
  const [activeVariable, setActiveVariable] = useState<ScientificVariable>(() => {
    if (selectedVariableId && (selectedVariableId === 'T2M' || selectedVariableId === 'PRECTOTCORR' || selectedVariableId === 'RootMoist_inst')) {
      return selectedVariableId as ScientificVariable;
    }
    return initialVariable;
  });
  const [activeMode, setActiveMode] = useState<ScientificMode>('mean');
  const [dualRasterData, setDualRasterData] = useState<DualRasterResponse | null>(null);
  const [isRasterLoading, setIsRasterLoading] = useState<boolean>(false);
  const [loadingElapsedSec, setLoadingElapsedSec] = useState<number>(0);
  const [rasterError, setRasterError] = useState<string | null>(null);
  const activeRequestIdRef = useRef<number>(0);
  const [isLegendCollapsed, setIsLegendCollapsed] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  // Timer for transparent, honest elapsed time tracking during live calculations
  useEffect(() => {
    if (!isRasterLoading) {
      setLoadingElapsedSec(0);
      return;
    }
    const timer = window.setInterval(() => {
      setLoadingElapsedSec((prev) => prev + 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [isRasterLoading]);

  // Synchronize when selectedVariableId prop changes
  useEffect(() => {
    if (selectedVariableId && (selectedVariableId === 'T2M' || selectedVariableId === 'PRECTOTCORR' || selectedVariableId === 'RootMoist_inst')) {
      setActiveVariable(selectedVariableId as ScientificVariable);
    }
  }, [selectedVariableId]);

  const handleVariableChange = (v: ScientificVariable) => {
    setActiveVariable(v);
    if (onSelectVariable) {
      onSelectVariable(v);
    }
  };

  // Coordinate tracking
  const [cursorCoords, setCursorCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [currentZoom, setCurrentZoom] = useState<number>(2);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Validation States
  const [validationA, setValidationA] = useState<BBoxValidationResult>(() =>
    normalizeAndValidateBBox(bboxA)
  );
  const [validationB, setValidationB] = useState<BBoxValidationResult>(() =>
    normalizeAndValidateBBox(bboxB)
  );

  // 1. Initialize Leaflet Map (Safe against double-mount)
  useEffect(() => {
    if (!containerRef.current) return;
    if (mapInstanceRef.current) return;

    const map = L.map(containerRef.current, {
      center: [45, 10],
      zoom: 3,
      minZoom: 1,
      maxZoom: 18,
      zoomControl: false,
      attributionControl: false,
    });

    // Metric and Imperial GIS scale bar pinned at bottom-left
    L.control
      .scale({
        position: 'bottomleft',
        metric: true,
        imperial: true,
        maxWidth: 120,
      })
      .addTo(map);

    // Layer 01: Cartographic Base Layer (Esri Light Gray Canvas)
    const baseLayerUrl =
      'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}';

    const baseLayer = L.tileLayer(baseLayerUrl, {
      maxZoom: 18,
      attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ &copy; OpenStreetMap',
    }).addTo(map);
    baseLayerRef.current = baseLayer;

    // Layer 02: World Satellite Imagery
    const satelliteLayer = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        maxZoom: 18,
        opacity: 0,
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS',
      }
    ).addTo(map);
    satelliteLayerRef.current = satelliteLayer;

    // Domain Boundary Overlays Group
    const domainLayerGroup = L.layerGroup().addTo(map);
    domainLayerGroupRef.current = domainLayerGroup;

    // Layer 03: Scientific Analysis Overlays Group
    const scientificLayerGroup = L.layerGroup().addTo(map);
    scientificLayerGroupRef.current = scientificLayerGroup;

    mapInstanceRef.current = map;

    // Cursor tracking
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

    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
      map.remove();
      mapInstanceRef.current = null;
      baseLayerRef.current = null;
      satelliteLayerRef.current = null;
      domainLayerGroupRef.current = null;
      scientificLayerGroupRef.current = null;
    };
  }, []);

  // 2. Basemap Mode & Opacity Management
  useEffect(() => {
    const satellite = satelliteLayerRef.current;
    if (!satellite) return;

    if (basemapMode === 'satellite') {
      satellite.setOpacity(satelliteOpacity);
    } else {
      satellite.setOpacity(0);
    }
  }, [basemapMode, satelliteOpacity]);

  // 3. Render Domain Outlines (A & B) cleanly
  useEffect(() => {
    const domainGroup = domainLayerGroupRef.current;
    if (!domainGroup) return;

    domainGroup.clearLayers();

    const resA = normalizeAndValidateBBox(bboxA);
    const resB = normalizeAndValidateBBox(bboxB);
    setValidationA(resA);
    setValidationB(resB);

    // Domain A (#B96F50 - Terracotta)
    if (resA.isValid && resA.leafletBounds) {
      const rectA = L.rectangle(resA.leafletBounds, {
        color: '#B96F50',
        weight: 2,
        fillColor: '#B96F50',
        fillOpacity: 0.10,
        dashArray: '5, 5',
      });
      domainGroup.addLayer(rectA);

      // Pinned top-edge header badge touching boundary with small gap
      const topLatA = bboxA[1];
      const centerLonA = (bboxA[2] + bboxA[3]) / 2;
      const markerA = L.marker([topLatA, centerLonA], {
        icon: L.divIcon({
          className: 'domain-edge-tag-wrapper',
          html: `<div class="domain-edge-tag domain-edge-tag-a">
            <span class="domain-badge-pill-a">DOMAIN A</span>
            <span class="domain-badge-label">${regionAName || 'Domain A'}</span>
          </div>`,
          iconSize: [0, 0],
          iconAnchor: [0, 0],
        }),
        interactive: false,
      });
      domainGroup.addLayer(markerA);
    }

    // Domain B (#537D8C - Mineral Blue)
    if (resB.isValid && resB.leafletBounds) {
      const rectB = L.rectangle(resB.leafletBounds, {
        color: '#537D8C',
        weight: 2,
        fillColor: '#537D8C',
        fillOpacity: 0.10,
        dashArray: '5, 5',
      });
      domainGroup.addLayer(rectB);

      // Pinned top-edge header badge touching boundary with small gap
      const topLatB = bboxB[1];
      const centerLonB = (bboxB[2] + bboxB[3]) / 2;
      const markerB = L.marker([topLatB, centerLonB], {
        icon: L.divIcon({
          className: 'domain-edge-tag-wrapper',
          html: `<div class="domain-edge-tag domain-edge-tag-b">
            <span class="domain-badge-pill-b">DOMAIN B</span>
            <span class="domain-badge-label">${regionBName || 'Domain B'}</span>
          </div>`,
          iconSize: [0, 0],
          iconAnchor: [0, 0],
        }),
        interactive: false,
      });
      domainGroup.addLayer(markerB);
    }
  }, [bboxA, bboxB, regionAName, regionBName]);

  // 4. Fetch Dual Scientific Rasters from Backend with Request Cancellation & Seamless State Retention
  const loadScientificRasters = useCallback(async () => {
    const resA = normalizeAndValidateBBox(bboxA);
    const resB = normalizeAndValidateBBox(bboxB);
    if (!resA.isValid || !resB.isValid) return;

    const currentRequestId = ++activeRequestIdRef.current;
    setIsRasterLoading(true);
    setRasterError(null);

    // 4a. Immediate zero-latency resolution for verified curated presets
    const curated = getCuratedDualRaster(bboxA, bboxB, activeVariable, activeMode);
    if (curated) {
      setDualRasterData(curated);
      setIsRasterLoading(false);
      return;
    }

    try {
      const dual = await fetchDualScientificRasters({
        bbox_a: bboxA,
        bbox_b: bboxB,
        variable: activeVariable,
        mode: activeMode,
      });

      // Ignore stale response if a newer selection occurred
      if (currentRequestId !== activeRequestIdRef.current) return;

      if (dual.status === 'SUCCESS') {
        setDualRasterData(dual);
      } else {
        setRasterError(dual.message || 'Scientific raster unavailable for this variable.');
      }
    } catch (err: any) {
      if (currentRequestId !== activeRequestIdRef.current) return;
      const serverMsg = err?.response?.data?.detail || err?.response?.data?.message;
      if (err?.code === 'ECONNABORTED' || (err?.message && err.message.includes('timeout'))) {
        setRasterError('Request timed out streaming multi-tile data from NASA service. Please retry stream.');
      } else if (serverMsg && typeof serverMsg === 'string' && serverMsg.length > 5) {
        setRasterError(serverMsg);
      } else {
        setRasterError(
          activeVariable === 'RootMoist_inst'
            ? 'Unable to stream NASA GLDAS Noah 2.1 soil moisture raster from backend.'
            : 'Unable to stream scientific raster overlay from NASA POWER / MERRA-2 service.'
        );
      }
    } finally {
      if (currentRequestId === activeRequestIdRef.current) {
        setIsRasterLoading(false);
      }
    }
  }, [bboxA, bboxB, activeVariable, activeMode]);

  useEffect(() => {
    loadScientificRasters();
  }, [loadScientificRasters]);

  // 5. Render Paired Scientific Raster Overlays (Domain A and Domain B)
  useEffect(() => {
    const scientificGroup = scientificLayerGroupRef.current;
    if (!scientificGroup) return;

    // Clear stale overlays before rendering new layers
    scientificGroup.clearLayers();

    if (!showScientificRaster || !dualRasterData || dualRasterData.status !== 'SUCCESS') {
      return;
    }

    const apiServer = (import.meta as any).env?.VITE_API_URL
      ? (import.meta as any).env.VITE_API_URL.replace(/\/api\/v1\/?$/, '')
      : 'http://localhost:8000';

    const renderOverlay = (raster: RasterResponse, domainLabel: string) => {
      if (!raster.raster_url || !raster.leaflet_bounds) return;

      const fullUrl = raster.raster_url.startsWith('http')
        ? raster.raster_url
        : raster.raster_url.startsWith('/curated_rasters/')
        ? raster.raster_url
        : `${apiServer}${raster.raster_url}`;

      const overlay = L.imageOverlay(fullUrl, raster.leaflet_bounds, {
        opacity: rasterOpacity,
        interactive: true,
        className: 'scientific-raster-overlay',
        alt: `${domainLabel} ${raster.dataset_id} ${raster.variable} ${activeMode}`,
      });

      const meanVal = raster.statistics?.domain_mean;
      const statsText =
        activeMode === 'trend'
          ? `Theil-Sen Trend: <strong>${meanVal !== undefined && meanVal >= 0 ? '+' : ''}${meanVal ?? 'N/A'} ${raster.unit}</strong>`
          : `Period Mean: <strong>${meanVal ?? 'N/A'} ${raster.unit}</strong>`;

      overlay.bindTooltip(
        `<div style="font-family: var(--font-sans); font-size: 11px; line-height: 1.4;">
          <div style="font-weight: 700; color: #173F35; margin-bottom: 2px;">${domainLabel} · ${raster.long_name || raster.variable}</div>
          <div>${statsText}</div>
          <div style="font-size: 9px; color: #64748B; margin-top: 2px;">Source: ${raster.source_attribution || raster.provenance_type}</div>
        </div>`,
        { sticky: true }
      );

      scientificGroup.addLayer(overlay);
    };

    if (dualRasterData.domain_a) {
      renderOverlay(dualRasterData.domain_a, `Domain A (${regionAName})`);
    }
    if (dualRasterData.domain_b) {
      renderOverlay(dualRasterData.domain_b, `Domain B (${regionBName})`);
    }
  }, [dualRasterData, showScientificRaster, rasterOpacity, activeMode, regionAName, regionBName]);

  // 6. Camera Auto-Framing on Preset or Landmark Selection
  const bboxKey = `${bboxA.join(',')}_${bboxB.join(',')}_${selectedPresetId}`;
  const prevBboxKeyRef = useRef<string>('');

  useEffect(() => {
    if (prevBboxKeyRef.current === bboxKey) return;
    prevBboxKeyRef.current = bboxKey;

    const map = mapInstanceRef.current;
    if (!map) return;

    const resA = normalizeAndValidateBBox(bboxA);
    const resB = normalizeAndValidateBBox(bboxB);

    if (resA.isValid && resA.leafletBounds && resB.isValid && resB.leafletBounds) {
      const combined = resA.leafletBounds.extend(resB.leafletBounds);
      map.flyToBounds(combined, { padding: [60, 60], maxZoom: 6, duration: 0.8 });
    } else if (resA.isValid && resA.leafletBounds) {
      map.flyToBounds(resA.leafletBounds, { padding: [60, 60], maxZoom: 6, duration: 0.8 });
    }
  }, [bboxKey, bboxA, bboxB, selectedPresetId]);

  // Camera Actions
  const handleFitBoth = useCallback(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    const resA = normalizeAndValidateBBox(bboxA);
    const resB = normalizeAndValidateBBox(bboxB);
    if (resA.isValid && resA.leafletBounds && resB.isValid && resB.leafletBounds) {
      const combined = resA.leafletBounds.extend(resB.leafletBounds);
      map.flyToBounds(combined, { padding: [55, 55], maxZoom: 6, duration: 0.7 });
    } else if (resA.isValid && resA.leafletBounds) {
      map.flyToBounds(resA.leafletBounds, { padding: [55, 55], maxZoom: 6, duration: 0.7 });
    }
  }, [bboxA, bboxB]);

  const handleFocusDomainA = useCallback(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    const resA = normalizeAndValidateBBox(bboxA);
    if (resA.isValid && resA.leafletBounds) {
      map.flyToBounds(resA.leafletBounds, { padding: [50, 50], maxZoom: 7, duration: 0.7 });
    }
  }, [bboxA]);

  const handleFocusDomainB = useCallback(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    const resB = normalizeAndValidateBBox(bboxB);
    if (resB.isValid && resB.leafletBounds) {
      map.flyToBounds(resB.leafletBounds, { padding: [50, 50], maxZoom: 7, duration: 0.7 });
    }
  }, [bboxB]);

  const handleWorldView = useCallback(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    map.flyTo([25, 10], 2, { duration: 0.7 });
  }, []);

  const handleToggleFullscreen = useCallback(() => {
    if (!wrapperRef.current) return;
    if (!document.fullscreenElement) {
      wrapperRef.current.requestFullscreen().catch(() => { });
    } else {
      document.exitFullscreen().catch(() => { });
    }
  }, []);

  // Compute CSS gradient string from backend shared_scale color stops
  const legendGradientStyle = useMemo(() => {
    if (!dualRasterData?.shared_scale?.color_stops?.length) {
      return 'linear-gradient(to right, #053061, #6bacd1, #f7f6f6, #e48066, #67001f)';
    }
    const stops = dualRasterData.shared_scale.color_stops;
    const gradientStops = stops
      .map((s) => `${s.hex} ${Math.round(s.stop * 100)}%`)
      .join(', ');
    return `linear-gradient(to right, ${gradientStops})`;
  }, [dualRasterData]);

  return (
    <div
      ref={wrapperRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
        background: 'var(--color-paper)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* ── Top GIS Toolbar (Pinned) ───────────────────────────────── */}
      <div
        className="map-header-hud"
        style={{
          minHeight: 44,
          padding: '6px 14px',
          background: 'rgba(255, 255, 255, 0.98)',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          flexShrink: 0,
          zIndex: 10,
          flexWrap: 'wrap',
        }}
      >
        {/* Left: Domain Indicator Legend */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span
              style={{
                width: 9,
                height: 9,
                borderRadius: 2,
                background: '#B96F50',
                display: 'inline-block',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 11,
                fontWeight: 600,
                color: 'var(--color-graphite)',
              }}
            >
              DOMAIN A: {regionAName || 'Unspecified'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span
              style={{
                width: 9,
                height: 9,
                borderRadius: 2,
                background: '#537D8C',
                display: 'inline-block',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 11,
                fontWeight: 600,
                color: 'var(--color-graphite)',
              }}
            >
              DOMAIN B: {regionBName || 'Unspecified'}
            </span>
          </div>
        </div>

        {/* Center: Variable & Mode Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          {/* Variable Selector */}
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
              onClick={() => handleVariableChange('T2M')}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 10,
                fontWeight: activeVariable === 'T2M' ? 700 : 500,
                color: activeVariable === 'T2M' ? '#ffffff' : 'var(--color-graphite)',
                background: activeVariable === 'T2M' ? 'var(--color-forest)' : 'transparent',
                border: 'none',
                borderRadius: 3,
                padding: '3px 8px',
                cursor: 'pointer',
                transition: 'all 120ms ease',
              }}
            >
              T2M Temp
            </button>
            <button
              onClick={() => handleVariableChange('PRECTOTCORR')}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 10,
                fontWeight: activeVariable === 'PRECTOTCORR' ? 700 : 500,
                color: activeVariable === 'PRECTOTCORR' ? '#ffffff' : 'var(--color-graphite)',
                background: activeVariable === 'PRECTOTCORR' ? 'var(--color-forest)' : 'transparent',
                border: 'none',
                borderRadius: 3,
                padding: '3px 8px',
                cursor: 'pointer',
                transition: 'all 120ms ease',
              }}
            >
              Rainfall
            </button>
            <button
              onClick={() => handleVariableChange('RootMoist_inst')}
              title="NASA GLDAS Noah 2.1 Soil Moisture"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 10,
                fontWeight: activeVariable === 'RootMoist_inst' ? 700 : 500,
                color: activeVariable === 'RootMoist_inst' ? '#ffffff' : 'var(--color-graphite)',
                background: activeVariable === 'RootMoist_inst' ? 'var(--color-forest)' : 'transparent',
                border: 'none',
                borderRadius: 3,
                padding: '3px 8px',
                cursor: 'pointer',
                transition: 'all 120ms ease',
              }}
            >
              GLDAS Soil
            </button>
          </div>

          {/* Mode Selector */}
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
              onClick={() => setActiveMode('mean')}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 10,
                fontWeight: activeMode === 'mean' ? 700 : 500,
                color: activeMode === 'mean' ? '#ffffff' : 'var(--color-graphite)',
                background: activeMode === 'mean' ? 'var(--color-forest)' : 'transparent',
                border: 'none',
                borderRadius: 3,
                padding: '3px 8px',
                cursor: 'pointer',
                transition: 'all 120ms ease',
              }}
            >
              Period Mean
            </button>
            <button
              onClick={() => setActiveMode('trend')}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 10,
                fontWeight: activeMode === 'trend' ? 700 : 500,
                color: activeMode === 'trend' ? '#ffffff' : 'var(--color-graphite)',
                background: activeMode === 'trend' ? 'var(--color-forest)' : 'transparent',
                border: 'none',
                borderRadius: 3,
                padding: '3px 8px',
                cursor: 'pointer',
                transition: 'all 120ms ease',
              }}
            >
              Trend (Theil-Sen)
            </button>
          </div>

          {/* Overlay Toggle & Opacity */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, borderLeft: '1px solid var(--color-border)', paddingLeft: 8 }}>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                fontSize: 10,
                fontWeight: 600,
                color: 'var(--color-graphite)',
              }}
            >
              <input
                type="checkbox"
                checked={showScientificRaster}
                onChange={(e) => setShowScientificRaster(e.target.checked)}
                style={{ accentColor: 'var(--color-forest)', cursor: 'pointer' }}
              />
              Scientific Overlay
            </label>

            {showScientificRaster && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'var(--color-slate-text)' }}>
                  {Math.round(rasterOpacity * 100)}%
                </span>
                <input
                  type="range"
                  min={0.2}
                  max={1.0}
                  step={0.05}
                  value={rasterOpacity}
                  onChange={(e) => setRasterOpacity(parseFloat(e.target.value))}
                  style={{ width: 44, cursor: 'pointer', accentColor: 'var(--color-forest)' }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Right: Camera Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          {isRasterLoading && (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 10,
                fontFamily: 'var(--font-mono)',
                color: 'var(--color-forest)',
                background: 'rgba(23, 63, 53, 0.08)',
                padding: '3px 8px',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 600,
              }}
            >
              <div
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: '50%',
                  border: '2px solid rgba(23, 63, 53, 0.3)',
                  borderTopColor: 'var(--color-forest)',
                  animation: 'spin 0.8s linear infinite',
                }}
              />
              {loadingElapsedSec >= 4
                ? `Calculating spatial trends (${loadingElapsedSec}s)...`
                : 'Updating scientific layer...'}
            </div>
          )}
          <button
            onClick={handleFitBoth}
            disabled={!validationA.isValid && !validationB.isValid}
            className="btn-secondary"
            style={{ fontSize: 10, padding: '3px 8px', fontWeight: 600 }}
          >
            Fit Both
          </button>
          <button
            onClick={handleFocusDomainA}
            disabled={!validationA.isValid}
            className="btn-secondary"
            style={{ fontSize: 10, padding: '3px 8px', fontWeight: 500 }}
          >
            Focus A
          </button>
          <button
            onClick={handleFocusDomainB}
            disabled={!validationB.isValid}
            className="btn-secondary"
            style={{ fontSize: 10, padding: '3px 8px', fontWeight: 500 }}
          >
            Focus B
          </button>
          <button
            onClick={handleWorldView}
            className="btn-secondary"
            style={{ fontSize: 10, padding: '3px 8px', fontWeight: 500 }}
          >
            World
          </button>
        </div>
      </div>

      {/* ── Main Map Viewport ───────────────────────────────────────── */}
      <div style={{ flex: 1, minHeight: 0, position: 'relative', width: '100%' }}>
        <div
          ref={containerRef}
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            background: '#F5F4ED',
          }}
        />

        {/* Floating Right-Hand GIS Control Dock */}
        <div
          style={{
            position: 'absolute',
            top: 14,
            right: 14,
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            background: 'rgba(255, 255, 255, 0.96)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
            overflow: 'hidden',
          }}
        >
          {/* Fullscreen Button */}
          <button
            onClick={handleToggleFullscreen}
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen GIS View'}
            style={{
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'transparent',
              border: 'none',
              borderBottom: '1px solid var(--color-border)',
              cursor: 'pointer',
              color: 'var(--color-graphite)',
            }}
            aria-label="Toggle Fullscreen"
          >
            {isFullscreen ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
              </svg>
            )}
          </button>

          {/* Basemap Switcher */}
          <button
            onClick={() => setBasemapMode((prev) => (prev === 'geography' ? 'satellite' : 'geography'))}
            title={`Basemap: ${basemapMode === 'geography' ? 'Light Geography' : 'Satellite Imagery'}. Click to toggle.`}
            style={{
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: basemapMode === 'satellite' ? 'var(--color-forest)' : 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: basemapMode === 'satellite' ? '#ffffff' : 'var(--color-graphite)',
            }}
            aria-label="Toggle basemap"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </button>
        </div>

        {/* ── Dynamic Scientific Colorbar Legend (Floating HUD) ──────── */}
        {showScientificRaster && dualRasterData && dualRasterData.status === 'SUCCESS' && (
          <div
            className="map-legend-hud"
            style={{
              position: 'absolute',
              bottom: 12,
              right: 12,
              zIndex: 1000,
              background: 'rgba(255, 255, 255, 0.96)',
              padding: isLegendCollapsed ? '6px 12px' : '10px 14px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.12)',
              fontFamily: 'var(--font-sans)',
              minWidth: isLegendCollapsed ? 0 : 260,
              maxWidth: 320,
              cursor: isLegendCollapsed ? 'pointer' : 'default',
              transition: 'all 150ms ease',
            }}
            onClick={isLegendCollapsed ? () => setIsLegendCollapsed(false) : undefined}
          >
            {isLegendCollapsed ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-graphite)' }}>
                  {dualRasterData.domain_a?.long_name || activeVariable} Scale
                </span>
                <span
                  style={{
                    fontSize: 10,
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--color-forest)',
                    fontWeight: 600,
                  }}
                >
                  [Show Legend ▲]
                </span>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-graphite)' }}>
                    {dualRasterData.domain_a?.long_name || activeVariable}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span
                      style={{
                        fontSize: 8,
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--color-forest)',
                        background: 'rgba(23, 63, 53, 0.08)',
                        padding: '1px 5px',
                        borderRadius: 2,
                        fontWeight: 600,
                      }}
                    >
                      SHARED SCALE
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsLegendCollapsed(true);
                      }}
                      title="Minimize Legend to view full map"
                      style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--color-slate-text)',
                        fontSize: 10,
                        fontFamily: 'var(--font-mono)',
                        padding: '1px 4px',
                        fontWeight: 600,
                        borderRadius: 3,
                      }}
                      aria-label="Collapse legend"
                    >
                      [Hide ▼]
                    </button>
                  </div>
                </div>

                <div style={{ fontSize: 9, color: 'var(--color-slate-text)', marginBottom: 6 }}>
                  {activeMode === 'mean' ? '25-Year Period Mean' : 'Long-term Trend (Theil-Sen Robust Slope)'} ({dualRasterData.domain_a?.unit})
                </div>

                {/* Dynamic Continuous CSS Gradient Bar */}
                <div
                  style={{
                    height: 12,
                    width: '100%',
                    borderRadius: 2,
                    background: legendGradientStyle,
                    marginBottom: 4,
                    border: '1px solid rgba(0, 0, 0, 0.15)',
                  }}
                />

                {/* Scale Value Labels */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 9,
                    color: 'var(--color-graphite)',
                    marginBottom: 6,
                  }}
                >
                  <span>{dualRasterData.shared_scale.vmin}</span>
                  {dualRasterData.shared_scale.scale_type === 'diverging' && (
                    <span style={{ color: 'var(--color-slate-text)', fontWeight: 600 }}>
                      0.0 (Neutral)
                    </span>
                  )}
                  <span>{dualRasterData.shared_scale.vmax}</span>
                </div>

                {/* Comparative Domain Summary */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    padding: '4px 6px',
                    background: 'var(--color-muted)',
                    borderRadius: 3,
                    fontSize: 9,
                    fontFamily: 'var(--font-mono)',
                    marginBottom: 6,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#B96F50' }}>
                    <span>Domain A ({regionAName}):</span>
                    <strong>
                      {activeMode === 'trend' && (dualRasterData.domain_a?.statistics?.domain_mean ?? 0) >= 0 ? '+' : ''}
                      {dualRasterData.domain_a?.statistics?.domain_mean ?? 'N/A'} {dualRasterData.domain_a?.unit}
                    </strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#537D8C' }}>
                    <span>Domain B ({regionBName}):</span>
                    <strong>
                      {activeMode === 'trend' && (dualRasterData.domain_b?.statistics?.domain_mean ?? 0) >= 0 ? '+' : ''}
                      {dualRasterData.domain_b?.statistics?.domain_mean ?? 'N/A'} {dualRasterData.domain_b?.unit}
                    </strong>
                  </div>
                </div>

                {/* Scientific Provenance Note */}
                <div
                  style={{
                    fontSize: 8,
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--color-slate-text)',
                    lineHeight: 1.3,
                  }}
                >
                  NASA POWER (MERRA-2) · 0.5° × 0.625° native · 4× display smoothing
                </div>
              </>
            )}
          </div>
        )}

        {/* Scientific Notice / Alert Banner positioned at Top-Left */}
        {rasterError && (
          <div
            style={{
              position: 'absolute',
              top: 14,
              left: 14,
              maxWidth: 420,
              zIndex: 1000,
              background: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(4px)',
              padding: '10px 12px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid #B96F50',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.12)',
              fontFamily: 'var(--font-sans)',
              fontSize: 10,
              color: 'var(--color-graphite)',
              lineHeight: 1.4,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 7 }}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#B96F50"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ flexShrink: 0, marginTop: 1 }}
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <div>
                  <div style={{ fontWeight: 700, color: '#B96F50', marginBottom: 2 }}>
                    Scientific Notice
                  </div>
                  <div style={{ color: 'var(--color-graphite)' }}>
                    {rasterError}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setRasterError(null)}
                title="Dismiss Notice"
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--color-slate-text)',
                  fontSize: 15,
                  lineHeight: 1,
                  padding: '0 2px',
                }}
                aria-label="Dismiss notice"
              >
                &times;
              </button>
            </div>
            <div style={{ marginTop: 8, display: 'flex', justifyContent: 'flex-end', gap: 6 }}>
              <button
                onClick={() => loadScientificRasters()}
                className="btn-secondary"
                style={{ fontSize: 9, padding: '2px 8px', borderColor: '#B96F50', color: '#B96F50' }}
              >
                Retry Stream
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Bottom Status Bar (Pinned) ─────────────────────────────── */}
      <div
        className="map-footer-hud"
        style={{
          height: 32,
          padding: '0 14px',
          background: 'rgba(255, 255, 255, 0.98)',
          borderTop: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          flexShrink: 0,
          zIndex: 10,
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          color: 'var(--color-slate-text)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ color: 'var(--color-moss)', fontWeight: 600 }}>Cursor:</span>
          <span>
            {cursorCoords
              ? `LAT ${cursorCoords.lat >= 0 ? '+' : ''}${cursorCoords.lat.toFixed(4)}° | LON ${cursorCoords.lon >= 0 ? '+' : ''
              }${cursorCoords.lon.toFixed(4)}°`
              : 'Hover map'}
          </span>
          <span style={{ color: 'var(--color-border)' }}>|</span>
          <span>Zoom: {currentZoom}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ color: '#B96F50' }}>
            Domain A: [{bboxA[0]}°, {bboxA[1]}°, {bboxA[2]}°, {bboxA[3]}°]
          </span>
          <span style={{ color: '#537D8C' }}>
            Domain B: [{bboxB[0]}°, {bboxB[1]}°, {bboxB[2]}°, {bboxB[3]}°]
          </span>
        </div>

        <div style={{ fontSize: 9, opacity: 0.7 }}>
          Esri World Light Gray / NASA POWER Reanalysis
        </div>
      </div>

      <style>{`
        .domain-edge-tag-wrapper {
          background: transparent !important;
          border: none !important;
        }
        .domain-edge-tag {
          position: absolute;
          bottom: 14px;
          left: 50%;
          transform: translateX(-50%);
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 2px 7px;
          background: rgba(255, 255, 255, 0.98);
          border-radius: 4px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
          white-space: nowrap;
          pointer-events: none;
          font-family: var(--font-sans);
          font-size: 10px;
          line-height: 1.2;
        }
        .domain-edge-tag-a {
          border: 1px solid #B96F50;
          border-bottom: 2px solid #B96F50;
        }
        .domain-edge-tag-b {
          border: 1px solid #537D8C;
          border-bottom: 2px solid #537D8C;
        }
        .domain-badge-pill-a {
          font-family: var(--font-mono);
          font-weight: 700;
          font-size: 9px;
          color: #ffffff;
          background: #B96F50;
          padding: 1px 4px;
          border-radius: 2px;
          letter-spacing: 0.04em;
        }
        .domain-badge-pill-b {
          font-family: var(--font-mono);
          font-weight: 700;
          font-size: 9px;
          color: #ffffff;
          background: #537D8C;
          padding: 1px 4px;
          border-radius: 2px;
          letter-spacing: 0.04em;
        }
        .domain-badge-label {
          font-weight: 600;
          color: var(--color-graphite);
        }
        .domain-edge-tag-wrapper {
          background: transparent !important;
          border: none !important;
        }
        .domain-edge-tag {
          position: absolute;
          bottom: 14px;
          left: 50%;
          transform: translateX(-50%);
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 2px 7px;
          background: rgba(255, 255, 255, 0.98);
          border-radius: 4px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
          white-space: nowrap;
          pointer-events: none;
          font-family: var(--font-sans);
          font-size: 10px;
          line-height: 1.2;
        }
        .domain-edge-tag-a {
          border: 1px solid #B96F50;
          border-bottom: 2px solid #B96F50;
        }
        .domain-edge-tag-b {
          border: 1px solid #537D8C;
          border-bottom: 2px solid #537D8C;
        }
        .domain-badge-pill-a {
          font-family: var(--font-mono);
          font-weight: 700;
          font-size: 9px;
          color: #ffffff;
          background: #B96F50;
          padding: 1px 4px;
          border-radius: 2px;
          letter-spacing: 0.04em;
        }
        .domain-badge-pill-b {
          font-family: var(--font-mono);
          font-weight: 700;
          font-size: 9px;
          color: #ffffff;
          background: #537D8C;
          padding: 1px 4px;
          border-radius: 2px;
          letter-spacing: 0.04em;
        }
        .domain-badge-label {
          font-weight: 600;
          color: var(--color-graphite);
        }
        .domain-leaflet-tooltip {
          background-color: rgba(255, 255, 255, 0.96) !important;
          border: 1px solid var(--color-border) !important;
          border-radius: 4px !important;
          box-shadow: 0 1px 6px rgba(0, 0, 0, 0.10) !important;
          padding: 3px 8px !important;
          white-space: nowrap !important;
          pointer-events: none !important;
        }
        .domain-leaflet-tooltip.leaflet-tooltip-top::before {
          border-top-color: var(--color-border) !important;
        }
        .domain-leaflet-tooltip.leaflet-tooltip-left::before {
          border-left-color: var(--color-border) !important;
        }
        .domain-leaflet-tooltip.leaflet-tooltip-right::before {
          border-right-color: var(--color-border) !important;
        }
      `}</style>
    </div>
  );
};
