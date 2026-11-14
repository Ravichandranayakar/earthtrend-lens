import axios from 'axios';

const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:8000/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

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
  variable: string = 'RootMoist_inst'
): Promise<OppositeTrendsResponse> {
  const resp = await apiClient.post('/opposite-trends', {
    preset_id: presetId,
    variable,
    region_a_bbox: regionABbox || [36, 42, -9, 3],
    region_b_bbox: regionBBbox || [58, 66, 10, 22],
    start_year: 2000,
    end_year: 2024,
  });
  return resp.data;
}
