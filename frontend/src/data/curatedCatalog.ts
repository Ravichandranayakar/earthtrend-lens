import { DualRasterResponse } from '../services/api';
import catalogData from './curated_catalog.json';

interface CatalogEntry {
  preset_id: string;
  variable: string;
  mode: string;
  dataset_id: string;
  provenance: string;
  unit: string;
  scale_type: 'sequential' | 'diverging';
  colormap: string;
  vmin: number;
  vmax: number;
  mean_a: number;
  mean_b: number;
  valid_cells_a: number;
  valid_cells_b: number;
  domain_a_bbox: [number, number, number, number];
  domain_b_bbox: [number, number, number, number];
  domain_a_name: string;
  domain_b_name: string;
  local_url_a: string;
  local_url_b: string;
  api_url_a: string;
  api_url_b: string;
}

const catalog = catalogData as unknown as Record<string, CatalogEntry>;

function bboxesMatch(
  b1: [number, number, number, number],
  b2: [number, number, number, number],
  tolerance = 0.2
): boolean {
  for (let i = 0; i < 4; i++) {
    if (Math.abs(b1[i] - b2[i]) > tolerance) return false;
  }
  return true;
}

export function getCuratedDualRaster(
  bboxA: [number, number, number, number],
  bboxB: [number, number, number, number],
  variable: string,
  mode: string
): DualRasterResponse | null {
  for (const entry of Object.values(catalog)) {
    if (
      entry.variable === variable &&
      entry.mode === mode &&
      bboxesMatch(entry.domain_a_bbox, bboxA) &&
      bboxesMatch(entry.domain_b_bbox, bboxB)
    ) {
      return {
        status: 'SUCCESS',
        mode: entry.mode,
        variable: entry.variable,
        shared_scale: {
          colormap_name: entry.colormap,
          scale_type: entry.scale_type || 'sequential',
          vmin: entry.vmin,
          vmax: entry.vmax,
          color_stops: [
            { stop: 0.0, value: entry.vmin, hex: '#f7fcf0' },
            { stop: 0.5, value: (entry.vmin + entry.vmax) / 2, hex: '#7bccc4' },
            { stop: 1.0, value: entry.vmax, hex: '#084081' },
          ],
        },
        domain_a: {
          status: 'SUCCESS',
          raster_url: entry.local_url_a,
          leaflet_bounds: [
            [entry.domain_a_bbox[0], entry.domain_a_bbox[2]],
            [entry.domain_a_bbox[1], entry.domain_a_bbox[3]],
          ],
          dataset_id: entry.dataset_id,
          provenance_type: entry.provenance,
          variable: entry.variable,
          unit: entry.unit,
          statistics: {
            valid_cells: entry.valid_cells_a,
            missing_cells: 0,
            min_value: entry.vmin,
            max_value: entry.vmax,
            domain_mean: entry.mean_a,
          },
        },
        domain_b: {
          status: 'SUCCESS',
          raster_url: entry.local_url_b,
          leaflet_bounds: [
            [entry.domain_b_bbox[0], entry.domain_b_bbox[2]],
            [entry.domain_b_bbox[1], entry.domain_b_bbox[3]],
          ],
          dataset_id: entry.dataset_id,
          provenance_type: entry.provenance,
          variable: entry.variable,
          unit: entry.unit,
          statistics: {
            valid_cells: entry.valid_cells_b,
            missing_cells: 0,
            min_value: entry.vmin,
            max_value: entry.vmax,
            domain_mean: entry.mean_b,
          },
        },
      };
    }
  }
  return null;
}
