import React, { useState } from 'react';

export interface STACCollection {
  id: string;
  title: string;
  category: 'Land Hydrology' | 'Satellite Imagery' | 'Thermal & Climate' | 'Topography';
  provider: string;
  resolution: string;
  temporalCadence: string;
  timeRange: string;
  description: string;
  stacEndpoint: string;
  assets: string[];
}

const PLANETARY_STAC_CATALOG: STACCollection[] = [
  {
    id: 'sentinel-2-l2a',
    title: 'Sentinel-2 L2A Surface Reflectance',
    category: 'Satellite Imagery',
    provider: 'European Space Agency (ESA) / Copernicus',
    resolution: '10m – 20m',
    temporalCadence: '5 days',
    timeRange: '2015 – Present',
    description: 'High-resolution multispectral imagery for optical land-surface inspection, vegetation health indices (NDVI/EVI), canopy water stress, and agricultural boundaries.',
    stacEndpoint: 'https://planetarycomputer.microsoft.com/api/stac/v1/collections/sentinel-2-l2a',
    assets: ['visual (TCI)', 'B04 (Red)', 'B08 (NIR)', 'B11 (SWIR)', 'SCL (Scene Classification)'],
  },
  {
    id: 'landsat-c2-l2',
    title: 'Landsat 8/9 Collection 2 Level-2',
    category: 'Thermal & Climate',
    provider: 'USGS / NASA Earth Resources Observation and Science',
    resolution: '30m (Thermal resampled)',
    temporalCadence: '8–16 days',
    timeRange: '2013 – Present',
    description: 'Atmospherically corrected surface reflectance and thermal infrared surface temperature (ST) data for decadal land-atmosphere interaction monitoring. (Note: historical coverage prior to 2013 requires Landsat 5/7).',
    stacEndpoint: 'https://planetarycomputer.microsoft.com/api/stac/v1/collections/landsat-c2-l2',
    assets: ['ST_B10 (Surface Temperature)', 'SR_B4 (Red)', 'SR_B5 (NIR)', 'QA_PIXEL'],
  },
  {
    id: 'nasadem',
    title: 'NASADEM Global Digital Elevation Model',
    category: 'Topography',
    provider: 'NASA JPL / NGA',
    resolution: '1 arc-second (~30m)',
    temporalCadence: 'Static Baseline',
    timeRange: '2000 (Reprocessed)',
    description: 'Global topographic elevation model derived from the Shuttle Radar Topography Mission (SRTM), providing catchment geomorphology and slope hydrology context.',
    stacEndpoint: 'https://planetarycomputer.microsoft.com/api/stac/v1/collections/nasadem',
    assets: ['elevation', 'slope', 'aspect', 'num'],
  },
  {
    id: 'modis-11A2-061',
    title: 'MODIS Terra Land Surface Temperature (8-Day)',
    category: 'Thermal & Climate',
    provider: 'NASA LP DAAC / Terra Satellite',
    resolution: '1000m (1 km)',
    temporalCadence: '8-day composite',
    timeRange: '2000 – Present',
    description: 'Global daytime and nighttime radiative surface skin temperature grids capturing thermal heat accumulation (distinct from near-surface air temperature T2M).',
    stacEndpoint: 'https://planetarycomputer.microsoft.com/api/stac/v1/collections/modis-11A2-061',
    assets: ['LST_Day_1km', 'LST_Night_1km', 'QC_Day', 'Clear_sky_days'],
  },
];

interface EarthDataExplorerProps {
  onSelectDataset?: (collectionId: string) => void;
  activeDatasetId?: string;
}

export const EarthDataExplorer: React.FC<EarthDataExplorerProps> = ({
  onSelectDataset,
  activeDatasetId = 'sentinel-2-l2a',
}) => {
  const [selectedId, setSelectedId] = useState<string>(activeDatasetId);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Satellite Imagery', 'Thermal & Climate', 'Topography'];

  const filtered = activeCategory === 'All'
    ? PLANETARY_STAC_CATALOG
    : PLANETARY_STAC_CATALOG.filter((d) => d.category === activeCategory);

  const selectedDataset = PLANETARY_STAC_CATALOG.find((d) => d.id === selectedId) || PLANETARY_STAC_CATALOG[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Header */}
      <div>
        <p className="section-label" style={{ marginBottom: 4 }}>
          Earth Observation STAC Discovery
        </p>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 12,
            color: 'var(--color-slate-text)',
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          Inspect open-access SpatioTemporal Asset Catalogs (STAC) for supplementary NASA & partner collections.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 10,
                fontWeight: isActive ? 600 : 500,
                color: isActive ? '#ffffff' : 'var(--color-graphite)',
                background: isActive ? 'var(--color-forest)' : 'var(--color-white)',
                border: `1px solid ${isActive ? 'var(--color-forest)' : 'var(--color-border)'}`,
                borderRadius: 100,
                padding: '2px 8px',
                cursor: 'pointer',
                transition: 'all 120ms ease',
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Dataset List */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          maxHeight: 280,
          overflowY: 'auto',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          padding: 6,
          background: 'var(--color-white)',
        }}
      >
        {filtered.map((item) => {
          const isSelected = item.id === selectedId;
          return (
            <button
              key={item.id}
              onClick={() => {
                setSelectedId(item.id);
                if (onSelectDataset) onSelectDataset(item.id);
              }}
              style={{
                textAlign: 'left',
                padding: '8px 10px',
                background: isSelected ? 'rgba(23,63,53,0.07)' : 'transparent',
                border: `1px solid ${isSelected ? 'rgba(23,63,53,0.25)' : 'transparent'}`,
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 8,
                transition: 'all 100ms ease',
              }}
            >
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: isSelected ? 'var(--color-forest)' : 'var(--color-border)',
                  marginTop: 4,
                  flexShrink: 0,
                }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 12,
                    fontWeight: isSelected ? 600 : 500,
                    color: 'var(--color-graphite)',
                    lineHeight: 1.3,
                  }}
                >
                  {item.title}
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    marginTop: 3,
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    color: 'var(--color-slate-text)',
                  }}
                >
                  <span>{item.resolution}</span>
                  <span>·</span>
                  <span>{item.temporalCadence}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Dataset Detail Inspection Card */}
      {selectedDataset && (
        <div
          style={{
            background: 'var(--color-white)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: 12,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 6,
            }}
          >
            <span className="section-label" style={{ fontSize: 9 }}>
              STAC Collection Metadata
            </span>
            <span
              className="badge"
              style={{
                fontSize: 9,
                color: 'var(--color-mineral-blue)',
                borderColor: 'var(--color-border)',
              }}
            >
              {selectedDataset.id}
            </span>
          </div>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 11,
              color: 'var(--color-slate-text)',
              lineHeight: 1.5,
              margin: '0 0 8px',
            }}
          >
            {selectedDataset.description}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 10 }}>
            <div>
              <strong style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-graphite)' }}>
                Provider:
              </strong>{' '}
              <span style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-slate-text)' }}>
                {selectedDataset.provider}
              </span>
            </div>
            <div>
              <strong style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-graphite)' }}>
                Time Range:
              </strong>{' '}
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-slate-text)' }}>
                {selectedDataset.timeRange}
              </span>
            </div>
          </div>

          {/* STAC Assets Pills */}
          <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid var(--color-border)' }}>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 10,
                fontWeight: 600,
                color: 'var(--color-graphite)',
                display: 'block',
                marginBottom: 4,
              }}
            >
              Available STAC Assets:
            </span>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {selectedDataset.assets.map((asset) => (
                <span
                  key={asset}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 9,
                    padding: '2px 6px',
                    background: 'var(--color-muted)',
                    borderRadius: 3,
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-graphite)',
                  }}
                >
                  {asset}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
