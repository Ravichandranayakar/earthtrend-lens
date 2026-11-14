import React, { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { RasterResponse } from '../../services/api';

export type BBoxTuple = [number, number, number, number]; // [minLat, maxLat, minLon, maxLon]

export type BasemapMode = 'geography' | 'satellite';

interface MapCanvasProps {
  bboxA: BBoxTuple;
  bboxB: BBoxTuple;
  regionAName: string;
  regionBName: string;
  selectedPresetId?: string;
  rasterData?: RasterResponse | null;
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
  rasterData,
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

  // Basemap & HUD States
  const [basemapMode, setBasemapMode] = useState<BasemapMode>('geography');
  const [satelliteOpacity, setSatelliteOpacity] = useState<number>(0.85);

  // Layer 03: Scientific Raster State
  const [showScientificRaster, setShowScientificRaster] = useState<boolean>(true);
  const [rasterOpacity, setRasterOpacity] = useState<number>(0.75);

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

  // Fullscreen event listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFs = !!document.fullscreenElement;
      setIsFullscreen(isFs);
      if (mapInstanceRef.current) {
        setTimeout(() => {
          mapInstanceRef.current?.invalidateSize();
        }, 150);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // 1. Initialize Leaflet Map (Safe against double-mount)
  useEffect(() => {
    if (!containerRef.current) return;
    if (mapInstanceRef.current) return;

    const map = L.map(containerRef.current, {
      center: [25, 10],
      zoom: 2,
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

    // Layer 01: Cartographic Base Layer (CARTO Positron if VITE_CARTO_API_KEY provided, else Esri Light Gray Canvas)
    const cartoApiKey = import.meta.env.VITE_CARTO_API_KEY;
    const baseLayerUrl = cartoApiKey
      ? `https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png?api_key=${cartoApiKey}`
      : 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}';

    const baseLayer = L.tileLayer(baseLayerUrl, {
      maxZoom: 18,
      subdomains: cartoApiKey ? ['a', 'b', 'c', 'd'] : ['server'],
      attribution: cartoApiKey
        ? '&copy; OpenStreetMap contributors &copy; CARTO'
        : 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ &copy; OpenStreetMap',
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

    // Initial camera placement
    const initialA = normalizeAndValidateBBox(bboxA);
    const initialB = normalizeAndValidateBBox(bboxB);
    if (initialA.isValid && initialA.leafletBounds && initialB.isValid && initialB.leafletBounds) {
      const combined = initialA.leafletBounds.extend(initialB.leafletBounds);
      map.fitBounds(combined, { padding: [50, 50], maxZoom: 6 });
    }

    return () => {
      resizeObserver.disconnect();
      map.remove();
      mapInstanceRef.current = null;
      baseLayerRef.current = null;
      satelliteLayerRef.current = null;
      domainLayerGroupRef.current = null;
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
        fillOpacity: 0.14,
        dashArray: '5, 5',
      });

      rectA.bindTooltip(
        `<span style="font-family: var(--font-mono); font-size: 10px; font-weight: 600; color: #B96F50; letter-spacing: 0.04em;">DOMAIN A${
          regionAName ? ` · ${regionAName}` : ''
        }</span>`,
        { permanent: true, direction: 'top', className: 'domain-leaflet-tooltip' }
      );
      domainGroup.addLayer(rectA);
    }

    // Domain B (#537D8C - Mineral Blue)
    if (resB.isValid && resB.leafletBounds) {
      const rectB = L.rectangle(resB.leafletBounds, {
        color: '#537D8C',
        weight: 2,
        fillColor: '#537D8C',
        fillOpacity: 0.14,
        dashArray: '5, 5',
      });

      rectB.bindTooltip(
        `<span style="font-family: var(--font-mono); font-size: 10px; font-weight: 600; color: #537D8C; letter-spacing: 0.04em;">DOMAIN B${
          regionBName ? ` · ${regionBName}` : ''
        }</span>`,
        { permanent: true, direction: 'top', className: 'domain-leaflet-tooltip' }
      );
      domainGroup.addLayer(rectB);
    }
  }, [bboxA, bboxB, regionAName, regionBName]);

  // 3b. Layer 03: Genuine Scientific Mean Raster (ImageOverlay)
  useEffect(() => {
    const scientificGroup = scientificLayerGroupRef.current;
    if (!scientificGroup) return;

    scientificGroup.clearLayers();

    if (!showScientificRaster || !rasterData || rasterData.status !== 'SUCCESS') {
      return;
    }

    if (rasterData.raster_url && rasterData.leaflet_bounds) {
      const apiServer = (import.meta as any).env?.VITE_API_URL
        ? (import.meta as any).env.VITE_API_URL.replace(/\/api\/v1\/?$/, '')
        : 'http://localhost:8000';
      const fullUrl = rasterData.raster_url.startsWith('http')
        ? rasterData.raster_url
        : `${apiServer}${rasterData.raster_url}`;

      const overlay = L.imageOverlay(fullUrl, rasterData.leaflet_bounds, {
        opacity: rasterOpacity,
        interactive: true,
        alt: `${rasterData.dataset_id} ${rasterData.variable} Mean Raster`,
      });

      overlay.bindTooltip(
        `<div style="font-family: var(--font-sans); font-size: 11px;">
          <strong>${rasterData.long_name || rasterData.variable}</strong><br/>
          Provenance: ${rasterData.provenance_type}<br/>
          Mean: ${rasterData.statistics?.domain_mean.toFixed(2)} ${rasterData.unit || 'kg/m²'}
        </div>`,
        { sticky: true }
      );

      scientificGroup.addLayer(overlay);
    }
  }, [rasterData, showScientificRaster, rasterOpacity]);

  // 4. Preset Camera Auto-Framing (Fires ONLY when selectedPresetId changes)
  useEffect(() => {
    if (!selectedPresetId) return;
    if (prevPresetIdRef.current === selectedPresetId) return;

    prevPresetIdRef.current = selectedPresetId;
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
  }, [selectedPresetId, bboxA, bboxB]);

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
    map.flyTo([20, 0], 2, { duration: 0.7 });
  }, []);

  const handleToggleFullscreen = useCallback(() => {
    if (!wrapperRef.current) return;
    if (!document.fullscreenElement) {
      wrapperRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  const handleZoomIn = useCallback(() => {
    mapInstanceRef.current?.zoomIn();
  }, []);

  const handleZoomOut = useCallback(() => {
    mapInstanceRef.current?.zoomOut();
  }, []);

  const handleToggleBasemap = useCallback(() => {
    setBasemapMode((prev) => (prev === 'geography' ? 'satellite' : 'geography'));
  }, []);

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
      {/* Top GIS Toolbar (Always Pinned) */}
      <div
        style={{
          height: 42,
          padding: '0 14px',
          background: 'rgba(255, 255, 255, 0.98)',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          flexShrink: 0,
          zIndex: 10,
        }}
      >
        {/* Left: Domain Indicator Legend */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {/* Domain A pill */}
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

          {/* Domain B pill */}
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

        {/* Center: Basemap Mode Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
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
              onClick={() => setBasemapMode('geography')}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 10,
                fontWeight: basemapMode === 'geography' ? 600 : 500,
                color: basemapMode === 'geography' ? '#ffffff' : 'var(--color-graphite)',
                background: basemapMode === 'geography' ? 'var(--color-forest)' : 'transparent',
                border: 'none',
                borderRadius: 3,
                padding: '3px 8px',
                cursor: 'pointer',
                transition: 'all 120ms ease',
              }}
            >
              Geography
            </button>
            <button
              onClick={() => setBasemapMode('satellite')}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 10,
                fontWeight: basemapMode === 'satellite' ? 600 : 500,
                color: basemapMode === 'satellite' ? '#ffffff' : 'var(--color-graphite)',
                background: basemapMode === 'satellite' ? 'var(--color-forest)' : 'transparent',
                border: 'none',
                borderRadius: 3,
                padding: '3px 8px',
                cursor: 'pointer',
                transition: 'all 120ms ease',
              }}
            >
              Satellite
            </button>
          </div>

          {basemapMode === 'satellite' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'var(--color-slate-text)' }}>
                {Math.round(satelliteOpacity * 100)}%
              </span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={satelliteOpacity}
                onChange={(e) => setSatelliteOpacity(parseFloat(e.target.value))}
                style={{ width: 50, cursor: 'pointer', accentColor: 'var(--color-forest)' }}
              />
            </div>
          )}

          {/* Layer 03: Scientific GLDAS Raster Toggle */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              borderLeft: '1px solid var(--color-border)',
              paddingLeft: 8,
              marginLeft: 4,
            }}
          >
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
              GLDAS Raster
            </label>

            {showScientificRaster && rasterData?.status === 'SUCCESS' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'var(--color-slate-text)' }}>
                  {Math.round(rasterOpacity * 100)}%
                </span>
                <input
                  type="range"
                  min={0.2}
                  max={1}
                  step={0.05}
                  value={rasterOpacity}
                  onChange={(e) => setRasterOpacity(parseFloat(e.target.value))}
                  style={{ width: 44, cursor: 'pointer', accentColor: 'var(--color-forest)' }}
                />
              </div>
            )}

            {rasterData?.provenance_type === 'NASA_GLDAS_NETCDF' ? (
              <span
                style={{
                  fontSize: 9,
                  fontFamily: 'var(--font-mono)',
                  background: 'rgba(23, 63, 53, 0.1)',
                  color: 'var(--color-forest)',
                  padding: '2px 5px',
                  borderRadius: 3,
                  fontWeight: 600,
                }}
              >
                NASA NetCDF
              </span>
            ) : rasterData?.status === 'DATA_UNAVAILABLE' ? (
              <span
                style={{
                  fontSize: 9,
                  fontFamily: 'var(--font-mono)',
                  background: 'rgba(185, 111, 80, 0.12)',
                  color: '#B96F50',
                  padding: '2px 5px',
                  borderRadius: 3,
                  fontWeight: 600,
                }}
              >
                NetCDF Required
              </span>
            ) : null}
          </div>
        </div>

        {/* Right: Camera Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <button
            onClick={handleFitBoth}
            disabled={!validationA.isValid && !validationB.isValid}
            className="btn-secondary"
            style={{ fontSize: 10, padding: '3px 8px', fontWeight: 600 }}
          >
            Fit both
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

      {/* Main Map Viewport (Fills exact remaining height) */}
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

        {/* Floating Right-Hand GIS Control Dock (NASA / Scientific GIS Standard) */}
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
              transition: 'background 120ms ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-muted)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            aria-label="Toggle Fullscreen"
          >
            {isFullscreen ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
              </svg>
            )}
          </button>

          {/* Zoom In Button */}
          <button
            onClick={handleZoomIn}
            title="Zoom In"
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
              transition: 'background 120ms ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-muted)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            aria-label="Zoom in"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </button>

          {/* Zoom Out Button */}
          <button
            onClick={handleZoomOut}
            title="Zoom Out"
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
              transition: 'background 120ms ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-muted)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            aria-label="Zoom out"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </button>

          {/* Basemap Switcher */}
          <button
            onClick={handleToggleBasemap}
            title={`Basemap: ${basemapMode === 'geography' ? 'Light Geography' : 'Satellite Imagery'}. Click to toggle.`}
            style={{
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: basemapMode === 'satellite' ? 'var(--color-forest)' : 'transparent',
              border: 'none',
              borderBottom: '1px solid var(--color-border)',
              cursor: 'pointer',
              color: basemapMode === 'satellite' ? '#ffffff' : 'var(--color-graphite)',
              transition: 'background 120ms ease',
            }}
            onMouseEnter={(e) => {
              if (basemapMode !== 'satellite') e.currentTarget.style.background = 'var(--color-muted)';
            }}
            onMouseLeave={(e) => {
              if (basemapMode !== 'satellite') e.currentTarget.style.background = 'transparent';
            }}
            aria-label="Toggle basemap"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2"/>
              <polyline points="2 17 12 22 22 17"/>
              <polyline points="2 12 12 17 22 12"/>
            </svg>
          </button>

          {/* Reset / Global View Button */}
          <button
            onClick={handleWorldView}
            title="Reset to Global World View"
            style={{
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-graphite)',
              transition: 'background 120ms ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-muted)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            aria-label="Global world view"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
          </button>
        </div>

        {/* Floating Scientific Colorbar Legend */}
        {showScientificRaster && rasterData && rasterData.status === 'SUCCESS' && rasterData.statistics && (
          <div
            style={{
              position: 'absolute',
              bottom: 14,
              right: 14,
              zIndex: 1000,
              background: 'rgba(255, 255, 255, 0.95)',
              padding: '8px 12px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
              fontFamily: 'var(--font-sans)',
              minWidth: 190,
            }}
          >
            <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--color-graphite)', marginBottom: 2 }}>
              {rasterData.long_name || rasterData.variable}
            </div>
            <div style={{ fontSize: 9, color: 'var(--color-slate-text)', marginBottom: 6 }}>
              Temporal Mean ({rasterData.unit || 'kg/m²'})
            </div>
            {/* Colorbar gradient (YlGnBu) */}
            <div
              style={{
                height: 10,
                width: '100%',
                borderRadius: 2,
                background: 'linear-gradient(to right, #ffffd9, #edf8b1, #c7e9b4, #7fcdbb, #41b6c4, #1d91c0, #225ea8, #081d58)',
                marginBottom: 4,
                border: '1px solid rgba(0, 0, 0, 0.15)',
              }}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: 'var(--font-mono)',
                fontSize: 9,
                color: 'var(--color-graphite)',
              }}
            >
              <span>{rasterData.statistics.min_value.toFixed(1)}</span>
              <span style={{ color: 'var(--color-slate-text)' }}>
                mean: {rasterData.statistics.domain_mean.toFixed(1)}
              </span>
              <span>{rasterData.statistics.max_value.toFixed(1)}</span>
            </div>
            <div
              style={{
                marginTop: 4,
                fontSize: 8,
                fontFamily: 'var(--font-mono)',
                color: 'var(--color-forest)',
                fontWeight: 600,
                letterSpacing: '0.03em',
              }}
            >
              PROVENANCE: NASA GLDAS NetCDF
            </div>
          </div>
        )}
      </div>

      {/* Bottom Status Bar (Always Pinned) */}
      <div
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
        {/* Live Cursor Coordinates */}
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

        {/* Domain Coordinate Readout */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ color: '#B96F50' }}>
            Domain A: [{bboxA[0]}°, {bboxA[1]}°, {bboxA[2]}°, {bboxA[3]}°]
          </span>
          <span style={{ color: '#537D8C' }}>
            Domain B: [{bboxB[0]}°, {bboxB[1]}°, {bboxB[2]}°, {bboxB[3]}°]
          </span>
        </div>

        {/* Map Attribution */}
        <div style={{ fontSize: 9, opacity: 0.7 }}>
          {import.meta.env.VITE_CARTO_API_KEY
            ? 'CARTO Positron / OpenStreetMap'
            : 'Esri World Light Gray / OpenStreetMap'}
        </div>
      </div>

      <style>{`
        .domain-leaflet-tooltip {
          background-color: #ffffff !important;
          border: 1px solid var(--color-border) !important;
          border-radius: 4px !important;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08) !important;
          padding: 2px 7px !important;
        }
        .domain-leaflet-tooltip::before {
          border-top-color: var(--color-border) !important;
        }
      `}</style>
    </div>
  );
};
