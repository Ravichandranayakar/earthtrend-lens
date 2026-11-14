import axios from 'axios';

const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:8000/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000,
});

export interface VariableItem {
  id: string;
  name: string;
  category: string;
  dataset_id: string;
  dataset_name: string;
  provider: string;
  unit: string;
  spatial_resolution: string;
  temporal_resolution: string;
  available_range: [number, number];
  description: string;
  scientific_caveats: string;
}

export interface SpatialGridCell {
  domain_id?: 'A' | 'B' | string;
  domain_name?: string;
  lat: number;
  lon: number;
  bounds?: [number, number, number, number]; // [south, north, west, east]
  sens_slope: number;
  sens_slope_decade: number;
  standardized_z?: number;
  p_value: number;
  q_value?: number;
  is_significant: boolean;
  valid_observations?: number;
  significance_regime?: 'decreasing' | 'increasing' | 'non_significant' | 'insufficient_data';
  trend_label: string;
}

export interface SpatialGridResponse {
  status: string;
  domain_id?: 'A' | 'B' | string;
  provenance_type?: 'NASA_GLDAS_NETCDF' | 'ILLUSTRATIVE_BASELINE' | 'DATA_UNAVAILABLE';
  disclaimer?: string;
  statistical_method?: string;
  fdr_threshold?: number;
  domain_name: string;
  variable: string;
  unit: string;
  bbox: [number, number, number, number];
  grid_step: number;
  lat_step?: number;
  lon_step?: number;
  total_cells: number;
  significant_cells: number;
  significant_percentage: number;
  sig_decrease_count?: number;
  sig_increase_count?: number;
  not_sig_count?: number;
  drying_cells: number;
  wetting_cells: number;
  min_slope: number;
  max_slope: number;
  cells: SpatialGridCell[];
}

export interface PresetCase {
  id: string;
  title: string;
  variable: string;
  secondary_variable: string;
  soil_variable: string;
  timeframe: [number, number];
  narrative: string;
  region_a: {
    id: string;
    name: string;
    expected_trend: string;
    bbox: [number, number, number, number];
  };
  region_b: {
    id: string;
    name: string;
    expected_trend: string;
    bbox: [number, number, number, number];
  };
}

export interface StatisticsResult {
  sens_slope: number;
  sens_intercept: number;
  confidence_interval_95: [number, number];
  mann_kendall_score_s: number;
  standardized_z: number;
  p_value: number;
  is_significant: boolean;
  trend_label: string;
  verdict_text: string;
  ols_comparison: {
    ols_slope: number;
    ols_pvalue: number;
    r_squared: number;
  };
}

export interface MonthlyRecord {
  date: string;
  year: number;
  month: number;
  observed: number;
  climatology: number;
  anomaly: number;
}

export interface AnnualRecord {
  year: number;
  annual_mean: number;
  annual_anomaly: number;
}

export interface RegionAnalysis {
  name: string;
  bbox: [number, number, number, number];
  analysis: {
    metadata: {
      source: string;
      doi: string;
      variable: string;
      unit: string;
      bbox: [number, number, number, number];
      time_range: [number, number];
    };
    climatology: {
      monthly_series: MonthlyRecord[];
      annual_series: AnnualRecord[];
      climatology_baseline: Record<number, number>;
    };
    statistics: StatisticsResult;
  };
}

export interface OppositeTrendsResponse {
  status: string;
  polarity_status: string;
  polarity_narrative: string;
  variable: string;
  unit: string;
  time_range: [number, number];
  region_a: RegionAnalysis;
  region_b: RegionAnalysis;
}

export async function fetchVariables(): Promise<VariableItem[]> {
  const resp = await apiClient.get('/variables');
  return resp.data.variables;
}

export async function fetchSpatialGrid(params: {
  preset_id?: string;
  bbox?: [number, number, number, number];
  variable?: string;
  start_year?: number;
  end_year?: number;
  grid_step?: number;
  domain_id?: string;
  region_name?: string;
}): Promise<SpatialGridResponse> {
  const resp = await apiClient.post('/spatial-grid', {
    preset_id: params.preset_id,
    bbox: params.bbox,
    variable: params.variable || 'RootMoist_inst',
    start_year: params.start_year || 2000,
    end_year: params.end_year || 2024,
    grid_step: params.grid_step || 1.8,
    domain_id: params.domain_id || 'A',
    region_name: params.region_name,
  });
  return resp.data;
}

export async function fetchHealth() {
  const resp = await apiClient.get('/health');
  return resp.data;
}

export async function fetchPresets(): Promise<PresetCase[]> {
  const resp = await apiClient.get('/presets');
  return resp.data.presets;
}

export async function fetchOppositeTrends(
  presetId?: string,
  regionABbox?: [number, number, number, number],
  regionBBbox?: [number, number, number, number],
  variable: string = 'RootMoist_inst',
  regionAName?: string,
  regionBName?: string,
  startYear: number = 2000,
  endYear: number = 2024
): Promise<OppositeTrendsResponse> {
  const resp = await apiClient.post('/opposite-trends', {
    preset_id: presetId,
    variable,
    region_a_name: regionAName || 'Domain Alpha',
    region_a_bbox: regionABbox || [36, 42, -9, 3],
    region_b_name: regionBName || 'Domain Beta',
    region_b_bbox: regionBBbox || [58, 66, 10, 22],
    start_year: startYear,
    end_year: endYear,
  });
  return resp.data;
}

export interface RasterColorStop {
  stop: number;
  value: number;
  hex: string;
}

export interface RasterColorScale {
  scale_type: 'sequential' | 'diverging';
  colormap_name: string;
  vmin: number;
  vmax: number;
  center?: number | null;
  color_stops: RasterColorStop[];
}

export interface RasterResponse {
  status: string;
  raster_id?: string;
  raster_url?: string;
  raster_path?: string;
  mode?: string;
  layer_type?: string;
  provenance_type?: string;
  dataset_id?: string;
  source_attribution?: string;
  variable?: string;
  long_name?: string;
  unit?: string;
  spatial_resolution?: string;
  grid_dimensions?: [number, number];
  leaflet_bounds?: [[number, number], [number, number]];
  time_steps_averaged?: number;
  granules_used?: number;
  statistics?: {
    valid_cells: number;
    missing_cells: number;
    min_value: number;
    max_value: number;
    domain_mean: number;
    significant_cells?: number;
    significant_percentage?: number;
  };
  color_scale?: RasterColorScale;
  disclaimer?: string;
  message?: string;
}

export interface DualRasterResponse {
  status: string;
  mode: string;
  variable: string;
  shared_scale: RasterColorScale;
  domain_a: RasterResponse;
  domain_b: RasterResponse;
  message?: string;
}

export interface ArchiveAuditResponse {
  status: string;
  message?: string;
  granule_count: number;
  valid_granule_count?: number;
  archive_directory?: string;
  granules?: Array<{
    is_valid: boolean;
    granule_filename: string;
    dataset_title: string;
    variable: string;
    units: string;
    temporal_timestamp: string;
    spatial_resolution: string;
    valid_land_cells: number;
    valid_min: number;
    valid_max: number;
  }>;
}

export async function fetchMeanRaster(params: {
  bbox: [number, number, number, number];
  variable?: string;
  start_year?: number;
  end_year?: number;
}): Promise<RasterResponse> {
  const resp = await apiClient.post('/raster/generate', {
    bbox: params.bbox,
    variable: params.variable || 'RootMoist_inst',
    mode: 'mean',
    start_year: params.start_year || 2000,
    end_year: params.end_year || 2024,
  });
  return resp.data;
}

export async function fetchScientificRaster(params: {
  bbox: [number, number, number, number];
  variable?: string;
  mode?: 'mean' | 'trend' | 'significance' | 'anomaly';
  start_year?: number;
  end_year?: number;
  fdr_alpha?: number;
  smooth?: boolean;
}): Promise<RasterResponse> {
  const resp = await apiClient.post('/raster/generate', {
    bbox: params.bbox,
    variable: params.variable || 'T2M',
    mode: params.mode || 'mean',
    start_year: params.start_year || 2000,
    end_year: params.end_year || 2024,
    fdr_alpha: params.fdr_alpha || 0.05,
    smooth: params.smooth !== false,
  });
  return resp.data;
}

export async function fetchDualScientificRasters(params: {
  bbox_a: [number, number, number, number];
  bbox_b: [number, number, number, number];
  variable?: string;
  mode?: 'mean' | 'trend' | 'significance' | 'anomaly';
  start_year?: number;
  end_year?: number;
  fdr_alpha?: number;
  smooth?: boolean;
}): Promise<DualRasterResponse> {
  const resp = await apiClient.post('/raster/dual', {
    bbox_a: params.bbox_a,
    bbox_b: params.bbox_b,
    variable: params.variable || 'T2M',
    mode: params.mode || 'mean',
    start_year: params.start_year || 2000,
    end_year: params.end_year || 2024,
    fdr_alpha: params.fdr_alpha || 0.05,
    smooth: params.smooth !== false,
  }, {
    timeout: 90000,
  });
  return resp.data;
}

export async function fetchArchiveAudit(): Promise<ArchiveAuditResponse> {
  const resp = await apiClient.get('/gldas/archive-audit');
  return resp.data;
}

