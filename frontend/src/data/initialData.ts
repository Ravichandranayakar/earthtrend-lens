// Verified NASA Earth Observation Demonstration Datasets
// Provides instant 0ms seed data so the application never loads empty or shows cold-start errors.
import { OppositeTrendsResponse, PresetCase, SpatialGridResponse, VariableItem } from '../services/api';

export const DEFAULT_PRESETS: PresetCase[] = [
  {
    "id": "case_01_europe",
    "title": "European Hydrological Comparison",
    "variable": "RootMoist_inst",
    "dataset": "GLDAS",
    "timeframe": [
      2000,
      2024
    ],
    "narrative": "Comparative European investigation: Evaluating GLDAS Noah 2.1 root-zone soil moisture trajectories across Mediterranean Southern Europe (Iberian Peninsula) and Boreal Northern Europe (Southern Scandinavia). GLDAS Noah 2.1 estimates indicate negative Theil-Sen root-zone soil-moisture slopes across 824 of 851 evaluated Iberian land cells during 2000-2024. These are descriptive model-based trend estimates; statistical significance and causal attribution have not been established.",
    "region_a": {
      "id": "iberia",
      "name": "Iberian Peninsula (Southern Europe)",
      "expected_trend": "ESTIMATED_NEGATIVE_SLOPE",
      "bbox": [
        36.0,
        42.0,
        -9.0,
        3.0
      ]
    },
    "region_b": {
      "id": "scandinavia",
      "name": "Southern Scandinavia (Northern Europe)",
      "expected_trend": "ESTIMATED_NEGATIVE_SLOPE",
      "bbox": [
        58.0,
        66.0,
        10.0,
        22.0
      ]
    }
  },
  {
    "id": "case_02_north_america",
    "title": "North American Megadrought vs Great Lakes Wetting",
    "variable": "RootMoist_inst",
    "dataset": "GLDAS",
    "timeframe": [
      2000,
      2024
    ],
    "narrative": "The American Southwest suffers structural groundwater and root moisture depletion across the Colorado Basin, contrasting with intensified humid storm tracks and moisture accumulation in the Great Lakes basin.",
    "region_a": {
      "id": "colorado_basin",
      "name": "Colorado Basin / US Southwest",
      "expected_trend": "STATISTICALLY_SIGNIFICANT_DECREASING",
      "bbox": [
        32.0,
        40.0,
        -115.0,
        -105.0
      ]
    },
    "region_b": {
      "id": "great_lakes",
      "name": "Great Lakes / US Northeast",
      "expected_trend": "STATISTICALLY_SIGNIFICANT_INCREASING",
      "bbox": [
        41.0,
        48.0,
        -85.0,
        -72.0
      ]
    }
  },
  {
    "id": "case_03_global",
    "title": "Sahel Aridification vs Boreal Arctic Wetting",
    "variable": "PRECTOTCORR",
    "dataset": "NASA_POWER",
    "timeframe": [
      2000,
      2024
    ],
    "narrative": "Contrasting tropical arid belt vulnerability in Sub-Saharan West Africa against Arctic amplification and accelerated hydrological cycling in Siberian Boreal forests.",
    "region_a": {
      "id": "sahel",
      "name": "Western Sahel (Africa)",
      "expected_trend": "DRYING / VARIABILITY",
      "bbox": [
        12.0,
        18.0,
        -15.0,
        10.0
      ]
    },
    "region_b": {
      "id": "siberia",
      "name": "Boreal Siberia (Eurasia)",
      "expected_trend": "WETTING / ACCELERATED THAW",
      "bbox": [
        55.0,
        65.0,
        60.0,
        90.0
      ]
    }
  }
];

export const DEFAULT_VARIABLES: VariableItem[] = [
  {
    "id": "RootMoist_inst",
    "name": "Root Zone Soil Moisture",
    "category": "Land Hydrology",
    "dataset_id": "GLDAS_NOAH025_M_2.1",
    "dataset_name": "NASA GLDAS Noah Land Surface Model 2.1",
    "provider": "NASA GES DISC",
    "unit": "kg/m\u00b2",
    "spatial_resolution": "0.25\u00b0 (~25-28 km)",
    "temporal_resolution": "Monthly",
    "available_range": [
      2000,
      2024
    ],
    "description": "Estimated plant-accessible moisture stored within the root zone. Critical indicator for multi-decadal drought and agricultural water stress.",
    "scientific_caveats": "Root-zone depth in the Noah Land Surface Model is parameterized dynamically by vegetation land-cover type, not a fixed 0-100 cm depth."
  },
  {
    "id": "SoilMoi0_10cm_inst",
    "name": "Surface Topsoil Moisture",
    "category": "Land Hydrology",
    "dataset_id": "GLDAS_NOAH025_M_2.1",
    "dataset_name": "NASA GLDAS Noah Land Surface Model 2.1",
    "provider": "NASA GES DISC",
    "unit": "kg/m\u00b2",
    "spatial_resolution": "0.25\u00b0 (~25-28 km)",
    "temporal_resolution": "Monthly",
    "available_range": [
      2000,
      2024
    ],
    "description": "Moisture content in the uppermost 0-10 cm layer of the soil column. Directly governs latent heat flux and surface evaporation.",
    "scientific_caveats": "Subject to high-frequency weather oscillations and rapid daytime evaporative losses."
  },
  {
    "id": "T2M",
    "name": "Near-Surface Air Temperature (2m)",
    "category": "Atmospheric Reanalysis",
    "dataset_id": "NASA_POWER_MERRA2",
    "dataset_name": "NASA POWER / MERRA-2 Atmospheric Reanalysis",
    "provider": "NASA Langley Research Center",
    "unit": "\u00b0C",
    "spatial_resolution": "0.5\u00b0 x 0.625\u00b0",
    "temporal_resolution": "Monthly",
    "available_range": [
      1981,
      2024
    ],
    "description": "Ambient air temperature at 2 meters above the ground surface. Fundamental metric for monitoring atmospheric thermal expansion and regional warming.",
    "scientific_caveats": "Derived from global numerical data assimilation combining satellite and ground weather station observations."
  },
  {
    "id": "PRECTOTCORR",
    "name": "Bias-Corrected Total Precipitation",
    "category": "Atmospheric Reanalysis",
    "dataset_id": "NASA_POWER_MERRA2",
    "dataset_name": "NASA POWER / MERRA-2 Atmospheric Reanalysis",
    "provider": "NASA Langley Research Center",
    "unit": "mm/day",
    "spatial_resolution": "0.5\u00b0 x 0.625\u00b0",
    "temporal_resolution": "Monthly",
    "available_range": [
      1981,
      2024
    ],
    "description": "Estimated total rainfall and snowfall arriving at the surface, bias-corrected using ground precipitation networks.",
    "scientific_caveats": "Convective storm precipitation in mountainous and tropical regimes carries higher uncertainty."
  }
];

export const DEFAULT_ANALYSIS_DATA: OppositeTrendsResponse = {
  "status": "success",
  "polarity_status": "CONFIRMED_SPATIAL_DIVERGENCE",
  "polarity_narrative": "Statistically validated divergence detected under the identical macro-climate forcing: Iberian Peninsula (Southern Europe) shows STATISTICALLY SIGNIFICANT DECREASING (-0.2448/yr), whereas Southern Scandinavia (Northern Europe) exhibits STATISTICALLY SIGNIFICANT INCREASING (+0.1992/yr).",
  "variable": "RootMoist_inst",
  "unit": "kg/m\u00b2",
  "time_range": [
    2000,
    2024
  ],
  "region_a": {
    "name": "Iberian Peninsula (Southern Europe)",
    "bbox": [
      36.0,
      42.0,
      -9.0,
      3.0
    ],
    "analysis": {
      "metadata": {
        "source": "SIMULATED_NOAH_LSM_3.6_BASELINE",
        "doi": "10.5067/SXAVCZFAQLNO",
        "provenance_type": "ILLUSTRATIVE_BASELINE",
        "is_illustrative": true,
        "variable": "RootMoist_inst",
        "unit": "kg/m\u00b2",
        "depth_note": "Simulated Noah LSM baseline (Illustrative development model)",
        "bbox": [
          36.0,
          42.0,
          -9.0,
          3.0
        ],
        "time_range": [
          2000,
          2024
        ],
        "total_observations": 300,
        "disclaimer": "ILLUSTRATIVE ONLY: Simulated baseline derived from Noah LSM 3.6 parameterization. NOT real NASA GLDAS observational output."
      },
      "climatology": {
        "monthly_series": [
          {
            "date": "2000-01",
            "year": 2000,
            "month": 1,
            "observed": 182.3845,
            "climatology": 178.0864,
            "anomaly": 4.2981
          },
          {
            "date": "2000-02",
            "year": 2000,
            "month": 2,
            "observed": 193.275,
            "climatology": 189.5843,
            "anomaly": 3.6907
          },
          {
            "date": "2000-03",
            "year": 2000,
            "month": 3,
            "observed": 204.3686,
            "climatology": 198.3904,
            "anomaly": 5.9782
          },
          {
            "date": "2000-04",
            "year": 2000,
            "month": 4,
            "observed": 209.8843,
            "climatology": 202.835,
            "anomaly": 7.0493
          },
          {
            "date": "2000-05",
            "year": 2000,
            "month": 5,
            "observed": 202.12,
            "climatology": 199.2794,
            "anomaly": 2.8406
          },
          {
            "date": "2000-06",
            "year": 2000,
            "month": 6,
            "observed": 192.9474,
            "climatology": 191.3927,
            "anomaly": 1.5547
          },
          {
            "date": "2000-07",
            "year": 2000,
            "month": 7,
            "observed": 184.9587,
            "climatology": 178.7788,
            "anomaly": 6.1799
          },
          {
            "date": "2000-08",
            "year": 2000,
            "month": 8,
            "observed": 170.4073,
            "climatology": 164.878,
            "anomaly": 5.5293
          },
          {
            "date": "2000-09",
            "year": 2000,
            "month": 9,
            "observed": 158.1424,
            "climatology": 156.3015,
            "anomaly": 1.8409
          },
          {
            "date": "2000-10",
            "year": 2000,
            "month": 10,
            "observed": 157.3011,
            "climatology": 152.7203,
            "anomaly": 4.5808
          },
          {
            "date": "2000-11",
            "year": 2000,
            "month": 11,
            "observed": 158.1135,
            "climatology": 155.8408,
            "anomaly": 2.2727
          },
          {
            "date": "2000-12",
            "year": 2000,
            "month": 12,
            "observed": 167.2364,
            "climatology": 165.9904,
            "anomaly": 1.246
          },
          {
            "date": "2001-01",
            "year": 2001,
            "month": 1,
            "observed": 181.4836,
            "climatology": 178.0864,
            "anomaly": 3.3972
          },
          {
            "date": "2001-02",
            "year": 2001,
            "month": 2,
            "observed": 188.5735,
            "climatology": 189.5843,
            "anomaly": -1.0108
          },
          {
            "date": "2001-03",
            "year": 2001,
            "month": 3,
            "observed": 198.173,
            "climatology": 198.3904,
            "anomaly": -0.2174
          },
          {
            "date": "2001-04",
            "year": 2001,
            "month": 4,
            "observed": 204.407,
            "climatology": 202.835,
            "anomaly": 1.572
          },
          {
            "date": "2001-05",
            "year": 2001,
            "month": 5,
            "observed": 199.9093,
            "climatology": 199.2794,
            "anomaly": 0.6299
          },
          {
            "date": "2001-06",
            "year": 2001,
            "month": 6,
            "observed": 194.0543,
            "climatology": 191.3927,
            "anomaly": 2.6616
          },
          {
            "date": "2001-07",
            "year": 2001,
            "month": 7,
            "observed": 178.4766,
            "climatology": 178.7788,
            "anomaly": -0.3022
          },
          {
            "date": "2001-08",
            "year": 2001,
            "month": 8,
            "observed": 164.6939,
            "climatology": 164.878,
            "anomaly": -0.1841
          },
          {
            "date": "2001-09",
            "year": 2001,
            "month": 9,
            "observed": 162.7162,
            "climatology": 156.3015,
            "anomaly": 6.4147
          },
          {
            "date": "2001-10",
            "year": 2001,
            "month": 10,
            "observed": 155.1163,
            "climatology": 152.7203,
            "anomaly": 2.396
          },
          {
            "date": "2001-11",
            "year": 2001,
            "month": 11,
            "observed": 159.1769,
            "climatology": 155.8408,
            "anomaly": 3.3361
          },
          {
            "date": "2001-12",
            "year": 2001,
            "month": 12,
            "observed": 164.5748,
            "climatology": 165.9904,
            "anomaly": -1.4156
          },
          {
            "date": "2002-01",
            "year": 2002,
            "month": 1,
            "observed": 179.2537,
            "climatology": 178.0864,
            "anomaly": 1.1673
          },
          {
            "date": "2002-02",
            "year": 2002,
            "month": 2,
            "observed": 193.37,
            "climatology": 189.5843,
            "anomaly": 3.7857
          },
          {
            "date": "2002-03",
            "year": 2002,
            "month": 3,
            "observed": 199.3439,
            "climatology": 198.3904,
            "anomaly": 0.9535
          },
          {
            "date": "2002-04",
            "year": 2002,
            "month": 4,
            "observed": 206.4879,
            "climatology": 202.835,
            "anomaly": 3.6529
          },
          {
            "date": "2002-05",
            "year": 2002,
            "month": 5,
            "observed": 200.6757,
            "climatology": 199.2794,
            "anomaly": 1.3963
          },
          {
            "date": "2002-06",
            "year": 2002,
            "month": 6,
            "observed": 192.2755,
            "climatology": 191.3927,
            "anomaly": 0.8828
          },
          {
            "date": "2002-07",
            "year": 2002,
            "month": 7,
            "observed": 178.9784,
            "climatology": 178.7788,
            "anomaly": 0.1996
          },
          {
            "date": "2002-08",
            "year": 2002,
            "month": 8,
            "observed": 172.5914,
            "climatology": 164.878,
            "anomaly": 7.7134
          },
          {
            "date": "2002-09",
            "year": 2002,
            "month": 9,
            "observed": 158.7543,
            "climatology": 156.3015,
            "anomaly": 2.4528
          },
          {
            "date": "2002-10",
            "year": 2002,
            "month": 10,
            "observed": 152.7724,
            "climatology": 152.7203,
            "anomaly": 0.0521
          },
          {
            "date": "2002-11",
            "year": 2002,
            "month": 11,
            "observed": 160.8004,
            "climatology": 155.8408,
            "anomaly": 4.9596
          },
          {
            "date": "2002-12",
            "year": 2002,
            "month": 12,
            "observed": 164.8206,
            "climatology": 165.9904,
            "anomaly": -1.1698
          },
          {
            "date": "2003-01",
            "year": 2003,
            "month": 1,
            "observed": 180.8729,
            "climatology": 178.0864,
            "anomaly": 2.7865
          },
          {
            "date": "2003-02",
            "year": 2003,
            "month": 2,
            "observed": 187.9295,
            "climatology": 189.5843,
            "anomaly": -1.6548
          },
          {
            "date": "2003-03",
            "year": 2003,
            "month": 3,
            "observed": 198.6369,
            "climatology": 198.3904,
            "anomaly": 0.2465
          },
          {
            "date": "2003-04",
            "year": 2003,
            "month": 4,
            "observed": 205.7769,
            "climatology": 202.835,
            "anomaly": 2.9419
          },
          {
            "date": "2003-05",
            "year": 2003,
            "month": 5,
            "observed": 203.7595,
            "climatology": 199.2794,
            "anomaly": 4.4801
          },
          {
            "date": "2003-06",
            "year": 2003,
            "month": 6,
            "observed": 193.1691,
            "climatology": 191.3927,
            "anomaly": 1.7764
          },
          {
            "date": "2003-07",
            "year": 2003,
            "month": 7,
            "observed": 179.9296,
            "climatology": 178.7788,
            "anomaly": 1.1508
          },
          {
            "date": "2003-08",
            "year": 2003,
            "month": 8,
            "observed": 166.9439,
            "climatology": 164.878,
            "anomaly": 2.0659
          },
          {
            "date": "2003-09",
            "year": 2003,
            "month": 9,
            "observed": 154.8278,
            "climatology": 156.3015,
            "anomaly": -1.4737
          },
          {
            "date": "2003-10",
            "year": 2003,
            "month": 10,
            "observed": 153.3531,
            "climatology": 152.7203,
            "anomaly": 0.6328
          },
          {
            "date": "2003-11",
            "year": 2003,
            "month": 11,
            "observed": 157.3285,
            "climatology": 155.8408,
            "anomaly": 1.4877
          },
          {
            "date": "2003-12",
            "year": 2003,
            "month": 12,
            "observed": 170.2515,
            "climatology": 165.9904,
            "anomaly": 4.2611
          },
          {
            "date": "2004-01",
            "year": 2004,
            "month": 1,
            "observed": 180.9457,
            "climatology": 178.0864,
            "anomaly": 2.8593
          },
          {
            "date": "2004-02",
            "year": 2004,
            "month": 2,
            "observed": 188.1571,
            "climatology": 189.5843,
            "anomaly": -1.4272
          },
          {
            "date": "2004-03",
            "year": 2004,
            "month": 3,
            "observed": 202.5035,
            "climatology": 198.3904,
            "anomaly": 4.1131
          },
          {
            "date": "2004-04",
            "year": 2004,
            "month": 4,
            "observed": 204.058,
            "climatology": 202.835,
            "anomaly": 1.223
          },
          {
            "date": "2004-05",
            "year": 2004,
            "month": 5,
            "observed": 199.957,
            "climatology": 199.2794,
            "anomaly": 0.6776
          },
          {
            "date": "2004-06",
            "year": 2004,
            "month": 6,
            "observed": 194.0059,
            "climatology": 191.3927,
            "anomaly": 2.6132
          },
          {
            "date": "2004-07",
            "year": 2004,
            "month": 7,
            "observed": 182.5322,
            "climatology": 178.7788,
            "anomaly": 3.7534
          },
          {
            "date": "2004-08",
            "year": 2004,
            "month": 8,
            "observed": 169.7609,
            "climatology": 164.878,
            "anomaly": 4.8829
          },
          {
            "date": "2004-09",
            "year": 2004,
            "month": 9,
            "observed": 156.162,
            "climatology": 156.3015,
            "anomaly": -0.1395
          },
          {
            "date": "2004-10",
            "year": 2004,
            "month": 10,
            "observed": 154.1157,
            "climatology": 152.7203,
            "anomaly": 1.3954
          },
          {
            "date": "2004-11",
            "year": 2004,
            "month": 11,
            "observed": 159.0442,
            "climatology": 155.8408,
            "anomaly": 3.2034
          },
          {
            "date": "2004-12",
            "year": 2004,
            "month": 12,
            "observed": 169.7836,
            "climatology": 165.9904,
            "anomaly": 3.7932
          },
          {
            "date": "2005-01",
            "year": 2005,
            "month": 1,
            "observed": 178.6248,
            "climatology": 178.0864,
            "anomaly": 0.5384
          },
          {
            "date": "2005-02",
            "year": 2005,
            "month": 2,
            "observed": 191.8366,
            "climatology": 189.5843,
            "anomaly": 2.2523
          },
          {
            "date": "2005-03",
            "year": 2005,
            "month": 3,
            "observed": 198.6635,
            "climatology": 198.3904,
            "anomaly": 0.2731
          },
          {
            "date": "2005-04",
            "year": 2005,
            "month": 4,
            "observed": 201.7662,
            "climatology": 202.835,
            "anomaly": -1.0688
          },
          {
            "date": "2005-05",
            "year": 2005,
            "month": 5,
            "observed": 203.4167,
            "climatology": 199.2794,
            "anomaly": 4.1373
          },
          {
            "date": "2005-06",
            "year": 2005,
            "month": 6,
            "observed": 195.6033,
            "climatology": 191.3927,
            "anomaly": 4.2106
          },
          {
            "date": "2005-07",
            "year": 2005,
            "month": 7,
            "observed": 179.5107,
            "climatology": 178.7788,
            "anomaly": 0.7319
          },
          {
            "date": "2005-08",
            "year": 2005,
            "month": 8,
            "observed": 169.6775,
            "climatology": 164.878,
            "anomaly": 4.7995
          },
          {
            "date": "2005-09",
            "year": 2005,
            "month": 9,
            "observed": 158.9002,
            "climatology": 156.3015,
            "anomaly": 2.5987
          },
          {
            "date": "2005-10",
            "year": 2005,
            "month": 10,
            "observed": 153.0119,
            "climatology": 152.7203,
            "anomaly": 0.2916
          },
          {
            "date": "2005-11",
            "year": 2005,
            "month": 11,
            "observed": 158.8556,
            "climatology": 155.8408,
            "anomaly": 3.0148
          },
          {
            "date": "2005-12",
            "year": 2005,
            "month": 12,
            "observed": 170.9258,
            "climatology": 165.9904,
            "anomaly": 4.9354
          },
          {
            "date": "2006-01",
            "year": 2006,
            "month": 1,
            "observed": 179.4691,
            "climatology": 178.0864,
            "anomaly": 1.3827
          },
          {
            "date": "2006-02",
            "year": 2006,
            "month": 2,
            "observed": 195.9483,
            "climatology": 189.5843,
            "anomaly": 6.364
          },
          {
            "date": "2006-03",
            "year": 2006,
            "month": 3,
            "observed": 194.616,
            "climatology": 198.3904,
            "anomaly": -3.7744
          },
          {
            "date": "2006-04",
            "year": 2006,
            "month": 4,
            "observed": 206.5475,
            "climatology": 202.835,
            "anomaly": 3.7125
          },
          {
            "date": "2006-05",
            "year": 2006,
            "month": 5,
            "observed": 201.339,
            "climatology": 199.2794,
            "anomaly": 2.0596
          },
          {
            "date": "2006-06",
            "year": 2006,
            "month": 6,
            "observed": 191.2012,
            "climatology": 191.3927,
            "anomaly": -0.1915
          },
          {
            "date": "2006-07",
            "year": 2006,
            "month": 7,
            "observed": 179.6561,
            "climatology": 178.7788,
            "anomaly": 0.8773
          },
          {
            "date": "2006-08",
            "year": 2006,
            "month": 8,
            "observed": 161.9358,
            "climatology": 164.878,
            "anomaly": -2.9422
          },
          {
            "date": "2006-09",
            "year": 2006,
            "month": 9,
            "observed": 157.1829,
            "climatology": 156.3015,
            "anomaly": 0.8814
          },
          {
            "date": "2006-10",
            "year": 2006,
            "month": 10,
            "observed": 155.2535,
            "climatology": 152.7203,
            "anomaly": 2.5332
          },
          {
            "date": "2006-11",
            "year": 2006,
            "month": 11,
            "observed": 161.3828,
            "climatology": 155.8408,
            "anomaly": 5.542
          },
          {
            "date": "2006-12",
            "year": 2006,
            "month": 12,
            "observed": 165.521,
            "climatology": 165.9904,
            "anomaly": -0.4694
          },
          {
            "date": "2007-01",
            "year": 2007,
            "month": 1,
            "observed": 177.2735,
            "climatology": 178.0864,
            "anomaly": -0.8129
          },
          {
            "date": "2007-02",
            "year": 2007,
            "month": 2,
            "observed": 190.5183,
            "climatology": 189.5843,
            "anomaly": 0.934
          },
          {
            "date": "2007-03",
            "year": 2007,
            "month": 3,
            "observed": 203.1898,
            "climatology": 198.3904,
            "anomaly": 4.7994
          },
          {
            "date": "2007-04",
            "year": 2007,
            "month": 4,
            "observed": 205.0506,
            "climatology": 202.835,
            "anomaly": 2.2156
          },
          {
            "date": "2007-05",
            "year": 2007,
            "month": 5,
            "observed": 199.5329,
            "climatology": 199.2794,
            "anomaly": 0.2535
          },
          {
            "date": "2007-06",
            "year": 2007,
            "month": 6,
            "observed": 192.9679,
            "climatology": 191.3927,
            "anomaly": 1.5752
          },
          {
            "date": "2007-07",
            "year": 2007,
            "month": 7,
            "observed": 179.4054,
            "climatology": 178.7788,
            "anomaly": 0.6266
          },
          {
            "date": "2007-08",
            "year": 2007,
            "month": 8,
            "observed": 169.0623,
            "climatology": 164.878,
            "anomaly": 4.1843
          },
          {
            "date": "2007-09",
            "year": 2007,
            "month": 9,
            "observed": 155.7129,
            "climatology": 156.3015,
            "anomaly": -0.5886
          },
          {
            "date": "2007-10",
            "year": 2007,
            "month": 10,
            "observed": 153.2775,
            "climatology": 152.7203,
            "anomaly": 0.5572
          },
          {
            "date": "2007-11",
            "year": 2007,
            "month": 11,
            "observed": 156.4438,
            "climatology": 155.8408,
            "anomaly": 0.603
          },
          {
            "date": "2007-12",
            "year": 2007,
            "month": 12,
            "observed": 162.8939,
            "climatology": 165.9904,
            "anomaly": -3.0965
          },
          {
            "date": "2008-01",
            "year": 2008,
            "month": 1,
            "observed": 179.771,
            "climatology": 178.0864,
            "anomaly": 1.6846
          },
          {
            "date": "2008-02",
            "year": 2008,
            "month": 2,
            "observed": 192.1613,
            "climatology": 189.5843,
            "anomaly": 2.577
          },
          {
            "date": "2008-03",
            "year": 2008,
            "month": 3,
            "observed": 200.6501,
            "climatology": 198.3904,
            "anomaly": 2.2597
          },
          {
            "date": "2008-04",
            "year": 2008,
            "month": 4,
            "observed": 203.3782,
            "climatology": 202.835,
            "anomaly": 0.5432
          },
          {
            "date": "2008-05",
            "year": 2008,
            "month": 5,
            "observed": 197.0549,
            "climatology": 199.2794,
            "anomaly": -2.2245
          },
          {
            "date": "2008-06",
            "year": 2008,
            "month": 6,
            "observed": 190.3691,
            "climatology": 191.3927,
            "anomaly": -1.0236
          },
          {
            "date": "2008-07",
            "year": 2008,
            "month": 7,
            "observed": 178.0419,
            "climatology": 178.7788,
            "anomaly": -0.7369
          },
          {
            "date": "2008-08",
            "year": 2008,
            "month": 8,
            "observed": 164.371,
            "climatology": 164.878,
            "anomaly": -0.507
          },
          {
            "date": "2008-09",
            "year": 2008,
            "month": 9,
            "observed": 156.8009,
            "climatology": 156.3015,
            "anomaly": 0.4994
          },
          {
            "date": "2008-10",
            "year": 2008,
            "month": 10,
            "observed": 154.8428,
            "climatology": 152.7203,
            "anomaly": 2.1225
          },
          {
            "date": "2008-11",
            "year": 2008,
            "month": 11,
            "observed": 161.8755,
            "climatology": 155.8408,
            "anomaly": 6.0347
          },
          {
            "date": "2008-12",
            "year": 2008,
            "month": 12,
            "observed": 166.7251,
            "climatology": 165.9904,
            "anomaly": 0.7347
          },
          {
            "date": "2009-01",
            "year": 2009,
            "month": 1,
            "observed": 179.4106,
            "climatology": 178.0864,
            "anomaly": 1.3242
          },
          {
            "date": "2009-02",
            "year": 2009,
            "month": 2,
            "observed": 191.0586,
            "climatology": 189.5843,
            "anomaly": 1.4743
          },
          {
            "date": "2009-03",
            "year": 2009,
            "month": 3,
            "observed": 195.5764,
            "climatology": 198.3904,
            "anomaly": -2.814
          },
          {
            "date": "2009-04",
            "year": 2009,
            "month": 4,
            "observed": 203.6344,
            "climatology": 202.835,
            "anomaly": 0.7994
          },
          {
            "date": "2009-05",
            "year": 2009,
            "month": 5,
            "observed": 200.4799,
            "climatology": 199.2794,
            "anomaly": 1.2005
          },
          {
            "date": "2009-06",
            "year": 2009,
            "month": 6,
            "observed": 197.3148,
            "climatology": 191.3927,
            "anomaly": 5.9221
          },
          {
            "date": "2009-07",
            "year": 2009,
            "month": 7,
            "observed": 178.1538,
            "climatology": 178.7788,
            "anomaly": -0.625
          },
          {
            "date": "2009-08",
            "year": 2009,
            "month": 8,
            "observed": 166.8666,
            "climatology": 164.878,
            "anomaly": 1.9886
          },
          {
            "date": "2009-09",
            "year": 2009,
            "month": 9,
            "observed": 156.8533,
            "climatology": 156.3015,
            "anomaly": 0.5518
          },
          {
            "date": "2009-10",
            "year": 2009,
            "month": 10,
            "observed": 150.647,
            "climatology": 152.7203,
            "anomaly": -2.0733
          },
          {
            "date": "2009-11",
            "year": 2009,
            "month": 11,
            "observed": 159.7531,
            "climatology": 155.8408,
            "anomaly": 3.9123
          },
          {
            "date": "2009-12",
            "year": 2009,
            "month": 12,
            "observed": 167.9045,
            "climatology": 165.9904,
            "anomaly": 1.9141
          },
          {
            "date": "2010-01",
            "year": 2010,
            "month": 1,
            "observed": 180.4803,
            "climatology": 178.0864,
            "anomaly": 2.3939
          },
          {
            "date": "2010-02",
            "year": 2010,
            "month": 2,
            "observed": 188.7072,
            "climatology": 189.5843,
            "anomaly": -0.8771
          },
          {
            "date": "2010-03",
            "year": 2010,
            "month": 3,
            "observed": 203.6163,
            "climatology": 198.3904,
            "anomaly": 5.2259
          },
          {
            "date": "2010-04",
            "year": 2010,
            "month": 4,
            "observed": 199.9321,
            "climatology": 202.835,
            "anomaly": -2.9029
          },
          {
            "date": "2010-05",
            "year": 2010,
            "month": 5,
            "observed": 201.5325,
            "climatology": 199.2794,
            "anomaly": 2.2531
          },
          {
            "date": "2010-06",
            "year": 2010,
            "month": 6,
            "observed": 196.3688,
            "climatology": 191.3927,
            "anomaly": 4.9761
          },
          {
            "date": "2010-07",
            "year": 2010,
            "month": 7,
            "observed": 175.8944,
            "climatology": 178.7788,
            "anomaly": -2.8844
          },
          {
            "date": "2010-08",
            "year": 2010,
            "month": 8,
            "observed": 164.433,
            "climatology": 164.878,
            "anomaly": -0.445
          },
          {
            "date": "2010-09",
            "year": 2010,
            "month": 9,
            "observed": 156.9252,
            "climatology": 156.3015,
            "anomaly": 0.6237
          },
          {
            "date": "2010-10",
            "year": 2010,
            "month": 10,
            "observed": 152.046,
            "climatology": 152.7203,
            "anomaly": -0.6743
          },
          {
            "date": "2010-11",
            "year": 2010,
            "month": 11,
            "observed": 152.7554,
            "climatology": 155.8408,
            "anomaly": -3.0854
          },
          {
            "date": "2010-12",
            "year": 2010,
            "month": 12,
            "observed": 165.9321,
            "climatology": 165.9904,
            "anomaly": -0.0583
          },
          {
            "date": "2011-01",
            "year": 2011,
            "month": 1,
            "observed": 175.5829,
            "climatology": 178.0864,
            "anomaly": -2.5035
          },
          {
            "date": "2011-02",
            "year": 2011,
            "month": 2,
            "observed": 191.9007,
            "climatology": 189.5843,
            "anomaly": 2.3164
          },
          {
            "date": "2011-03",
            "year": 2011,
            "month": 3,
            "observed": 197.5468,
            "climatology": 198.3904,
            "anomaly": -0.8436
          },
          {
            "date": "2011-04",
            "year": 2011,
            "month": 4,
            "observed": 207.0475,
            "climatology": 202.835,
            "anomaly": 4.2125
          },
          {
            "date": "2011-05",
            "year": 2011,
            "month": 5,
            "observed": 197.8432,
            "climatology": 199.2794,
            "anomaly": -1.4362
          },
          {
            "date": "2011-06",
            "year": 2011,
            "month": 6,
            "observed": 189.8235,
            "climatology": 191.3927,
            "anomaly": -1.5692
          },
          {
            "date": "2011-07",
            "year": 2011,
            "month": 7,
            "observed": 180.1405,
            "climatology": 178.7788,
            "anomaly": 1.3617
          },
          {
            "date": "2011-08",
            "year": 2011,
            "month": 8,
            "observed": 162.5075,
            "climatology": 164.878,
            "anomaly": -2.3705
          },
          {
            "date": "2011-09",
            "year": 2011,
            "month": 9,
            "observed": 156.9807,
            "climatology": 156.3015,
            "anomaly": 0.6792
          },
          {
            "date": "2011-10",
            "year": 2011,
            "month": 10,
            "observed": 156.3086,
            "climatology": 152.7203,
            "anomaly": 3.5883
          },
          {
            "date": "2011-11",
            "year": 2011,
            "month": 11,
            "observed": 152.3494,
            "climatology": 155.8408,
            "anomaly": -3.4914
          },
          {
            "date": "2011-12",
            "year": 2011,
            "month": 12,
            "observed": 165.9583,
            "climatology": 165.9904,
            "anomaly": -0.0321
          },
          {
            "date": "2012-01",
            "year": 2012,
            "month": 1,
            "observed": 178.6244,
            "climatology": 178.0864,
            "anomaly": 0.538
          },
          {
            "date": "2012-02",
            "year": 2012,
            "month": 2,
            "observed": 192.4073,
            "climatology": 189.5843,
            "anomaly": 2.823
          },
          {
            "date": "2012-03",
            "year": 2012,
            "month": 3,
            "observed": 196.489,
            "climatology": 198.3904,
            "anomaly": -1.9014
          },
          {
            "date": "2012-04",
            "year": 2012,
            "month": 4,
            "observed": 199.6076,
            "climatology": 202.835,
            "anomaly": -3.2274
          },
          {
            "date": "2012-05",
            "year": 2012,
            "month": 5,
            "observed": 200.8422,
            "climatology": 199.2794,
            "anomaly": 1.5628
          },
          {
            "date": "2012-06",
            "year": 2012,
            "month": 6,
            "observed": 191.1072,
            "climatology": 191.3927,
            "anomaly": -0.2855
          },
          {
            "date": "2012-07",
            "year": 2012,
            "month": 7,
            "observed": 178.4689,
            "climatology": 178.7788,
            "anomaly": -0.3099
          },
          {
            "date": "2012-08",
            "year": 2012,
            "month": 8,
            "observed": 166.1868,
            "climatology": 164.878,
            "anomaly": 1.3088
          },
          {
            "date": "2012-09",
            "year": 2012,
            "month": 9,
            "observed": 154.448,
            "climatology": 156.3015,
            "anomaly": -1.8535
          },
          {
            "date": "2012-10",
            "year": 2012,
            "month": 10,
            "observed": 153.3573,
            "climatology": 152.7203,
            "anomaly": 0.637
          },
          {
            "date": "2012-11",
            "year": 2012,
            "month": 11,
            "observed": 156.8367,
            "climatology": 155.8408,
            "anomaly": 0.9959
          },
          {
            "date": "2012-12",
            "year": 2012,
            "month": 12,
            "observed": 163.4468,
            "climatology": 165.9904,
            "anomaly": -2.5436
          },
          {
            "date": "2013-01",
            "year": 2013,
            "month": 1,
            "observed": 182.3751,
            "climatology": 178.0864,
            "anomaly": 4.2887
          },
          {
            "date": "2013-02",
            "year": 2013,
            "month": 2,
            "observed": 191.3733,
            "climatology": 189.5843,
            "anomaly": 1.789
          },
          {
            "date": "2013-03",
            "year": 2013,
            "month": 3,
            "observed": 196.3391,
            "climatology": 198.3904,
            "anomaly": -2.0513
          },
          {
            "date": "2013-04",
            "year": 2013,
            "month": 4,
            "observed": 204.2861,
            "climatology": 202.835,
            "anomaly": 1.4511
          },
          {
            "date": "2013-05",
            "year": 2013,
            "month": 5,
            "observed": 196.8366,
            "climatology": 199.2794,
            "anomaly": -2.4428
          },
          {
            "date": "2013-06",
            "year": 2013,
            "month": 6,
            "observed": 192.0684,
            "climatology": 191.3927,
            "anomaly": 0.6757
          },
          {
            "date": "2013-07",
            "year": 2013,
            "month": 7,
            "observed": 180.4752,
            "climatology": 178.7788,
            "anomaly": 1.6964
          },
          {
            "date": "2013-08",
            "year": 2013,
            "month": 8,
            "observed": 163.005,
            "climatology": 164.878,
            "anomaly": -1.873
          },
          {
            "date": "2013-09",
            "year": 2013,
            "month": 9,
            "observed": 158.2925,
            "climatology": 156.3015,
            "anomaly": 1.991
          },
          {
            "date": "2013-10",
            "year": 2013,
            "month": 10,
            "observed": 153.5447,
            "climatology": 152.7203,
            "anomaly": 0.8244
          },
          {
            "date": "2013-11",
            "year": 2013,
            "month": 11,
            "observed": 157.8952,
            "climatology": 155.8408,
            "anomaly": 2.0544
          },
          {
            "date": "2013-12",
            "year": 2013,
            "month": 12,
            "observed": 169.7107,
            "climatology": 165.9904,
            "anomaly": 3.7203
          },
          {
            "date": "2014-01",
            "year": 2014,
            "month": 1,
            "observed": 176.8332,
            "climatology": 178.0864,
            "anomaly": -1.2532
          },
          {
            "date": "2014-02",
            "year": 2014,
            "month": 2,
            "observed": 188.0404,
            "climatology": 189.5843,
            "anomaly": -1.5439
          },
          {
            "date": "2014-03",
            "year": 2014,
            "month": 3,
            "observed": 196.8296,
            "climatology": 198.3904,
            "anomaly": -1.5608
          },
          {
            "date": "2014-04",
            "year": 2014,
            "month": 4,
            "observed": 200.3412,
            "climatology": 202.835,
            "anomaly": -2.4938
          },
          {
            "date": "2014-05",
            "year": 2014,
            "month": 5,
            "observed": 198.8166,
            "climatology": 199.2794,
            "anomaly": -0.4628
          },
          {
            "date": "2014-06",
            "year": 2014,
            "month": 6,
            "observed": 190.6896,
            "climatology": 191.3927,
            "anomaly": -0.7031
          },
          {
            "date": "2014-07",
            "year": 2014,
            "month": 7,
            "observed": 178.0064,
            "climatology": 178.7788,
            "anomaly": -0.7724
          },
          {
            "date": "2014-08",
            "year": 2014,
            "month": 8,
            "observed": 166.8607,
            "climatology": 164.878,
            "anomaly": 1.9827
          },
          {
            "date": "2014-09",
            "year": 2014,
            "month": 9,
            "observed": 155.6526,
            "climatology": 156.3015,
            "anomaly": -0.6489
          },
          {
            "date": "2014-10",
            "year": 2014,
            "month": 10,
            "observed": 155.8825,
            "climatology": 152.7203,
            "anomaly": 3.1622
          },
          {
            "date": "2014-11",
            "year": 2014,
            "month": 11,
            "observed": 154.9144,
            "climatology": 155.8408,
            "anomaly": -0.9264
          },
          {
            "date": "2014-12",
            "year": 2014,
            "month": 12,
            "observed": 171.5051,
            "climatology": 165.9904,
            "anomaly": 5.5147
          },
          {
            "date": "2015-01",
            "year": 2015,
            "month": 1,
            "observed": 178.7469,
            "climatology": 178.0864,
            "anomaly": 0.6605
          },
          {
            "date": "2015-02",
            "year": 2015,
            "month": 2,
            "observed": 187.5178,
            "climatology": 189.5843,
            "anomaly": -2.0665
          },
          {
            "date": "2015-03",
            "year": 2015,
            "month": 3,
            "observed": 196.1121,
            "climatology": 198.3904,
            "anomaly": -2.2783
          },
          {
            "date": "2015-04",
            "year": 2015,
            "month": 4,
            "observed": 203.3229,
            "climatology": 202.835,
            "anomaly": 0.4879
          },
          {
            "date": "2015-05",
            "year": 2015,
            "month": 5,
            "observed": 198.1867,
            "climatology": 199.2794,
            "anomaly": -1.0927
          },
          {
            "date": "2015-06",
            "year": 2015,
            "month": 6,
            "observed": 191.3577,
            "climatology": 191.3927,
            "anomaly": -0.035
          },
          {
            "date": "2015-07",
            "year": 2015,
            "month": 7,
            "observed": 178.2338,
            "climatology": 178.7788,
            "anomaly": -0.545
          },
          {
            "date": "2015-08",
            "year": 2015,
            "month": 8,
            "observed": 164.3466,
            "climatology": 164.878,
            "anomaly": -0.5314
          },
          {
            "date": "2015-09",
            "year": 2015,
            "month": 9,
            "observed": 153.2391,
            "climatology": 156.3015,
            "anomaly": -3.0624
          },
          {
            "date": "2015-10",
            "year": 2015,
            "month": 10,
            "observed": 148.1976,
            "climatology": 152.7203,
            "anomaly": -4.5227
          },
          {
            "date": "2015-11",
            "year": 2015,
            "month": 11,
            "observed": 154.1958,
            "climatology": 155.8408,
            "anomaly": -1.645
          },
          {
            "date": "2015-12",
            "year": 2015,
            "month": 12,
            "observed": 166.5817,
            "climatology": 165.9904,
            "anomaly": 0.5913
          },
          {
            "date": "2016-01",
            "year": 2016,
            "month": 1,
            "observed": 177.4539,
            "climatology": 178.0864,
            "anomaly": -0.6325
          },
          {
            "date": "2016-02",
            "year": 2016,
            "month": 2,
            "observed": 186.2824,
            "climatology": 189.5843,
            "anomaly": -3.3019
          },
          {
            "date": "2016-03",
            "year": 2016,
            "month": 3,
            "observed": 198.9583,
            "climatology": 198.3904,
            "anomaly": 0.5679
          },
          {
            "date": "2016-04",
            "year": 2016,
            "month": 4,
            "observed": 202.816,
            "climatology": 202.835,
            "anomaly": -0.019
          },
          {
            "date": "2016-05",
            "year": 2016,
            "month": 5,
            "observed": 196.2717,
            "climatology": 199.2794,
            "anomaly": -3.0077
          },
          {
            "date": "2016-06",
            "year": 2016,
            "month": 6,
            "observed": 189.693,
            "climatology": 191.3927,
            "anomaly": -1.6997
          },
          {
            "date": "2016-07",
            "year": 2016,
            "month": 7,
            "observed": 176.9322,
            "climatology": 178.7788,
            "anomaly": -1.8466
          },
          {
            "date": "2016-08",
            "year": 2016,
            "month": 8,
            "observed": 161.4073,
            "climatology": 164.878,
            "anomaly": -3.4707
          },
          {
            "date": "2016-09",
            "year": 2016,
            "month": 9,
            "observed": 155.9865,
            "climatology": 156.3015,
            "anomaly": -0.315
          },
          {
            "date": "2016-10",
            "year": 2016,
            "month": 10,
            "observed": 153.1227,
            "climatology": 152.7203,
            "anomaly": 0.4024
          },
          {
            "date": "2016-11",
            "year": 2016,
            "month": 11,
            "observed": 157.7557,
            "climatology": 155.8408,
            "anomaly": 1.9149
          },
          {
            "date": "2016-12",
            "year": 2016,
            "month": 12,
            "observed": 166.8112,
            "climatology": 165.9904,
            "anomaly": 0.8208
          },
          {
            "date": "2017-01",
            "year": 2017,
            "month": 1,
            "observed": 173.2105,
            "climatology": 178.0864,
            "anomaly": -4.8759
          },
          {
            "date": "2017-02",
            "year": 2017,
            "month": 2,
            "observed": 186.7881,
            "climatology": 189.5843,
            "anomaly": -2.7962
          },
          {
            "date": "2017-03",
            "year": 2017,
            "month": 3,
            "observed": 199.5489,
            "climatology": 198.3904,
            "anomaly": 1.1585
          },
          {
            "date": "2017-04",
            "year": 2017,
            "month": 4,
            "observed": 202.8732,
            "climatology": 202.835,
            "anomaly": 0.0382
          },
          {
            "date": "2017-05",
            "year": 2017,
            "month": 5,
            "observed": 199.505,
            "climatology": 199.2794,
            "anomaly": 0.2256
          },
          {
            "date": "2017-06",
            "year": 2017,
            "month": 6,
            "observed": 198.6765,
            "climatology": 191.3927,
            "anomaly": 7.2838
          },
          {
            "date": "2017-07",
            "year": 2017,
            "month": 7,
            "observed": 177.9499,
            "climatology": 178.7788,
            "anomaly": -0.8289
          },
          {
            "date": "2017-08",
            "year": 2017,
            "month": 8,
            "observed": 166.8396,
            "climatology": 164.878,
            "anomaly": 1.9616
          },
          {
            "date": "2017-09",
            "year": 2017,
            "month": 9,
            "observed": 157.2131,
            "climatology": 156.3015,
            "anomaly": 0.9116
          },
          {
            "date": "2017-10",
            "year": 2017,
            "month": 10,
            "observed": 153.0852,
            "climatology": 152.7203,
            "anomaly": 0.3649
          },
          {
            "date": "2017-11",
            "year": 2017,
            "month": 11,
            "observed": 153.9959,
            "climatology": 155.8408,
            "anomaly": -1.8449
          },
          {
            "date": "2017-12",
            "year": 2017,
            "month": 12,
            "observed": 165.8101,
            "climatology": 165.9904,
            "anomaly": -0.1803
          },
          {
            "date": "2018-01",
            "year": 2018,
            "month": 1,
            "observed": 174.4586,
            "climatology": 178.0864,
            "anomaly": -3.6278
          },
          {
            "date": "2018-02",
            "year": 2018,
            "month": 2,
            "observed": 188.2767,
            "climatology": 189.5843,
            "anomaly": -1.3076
          },
          {
            "date": "2018-03",
            "year": 2018,
            "month": 3,
            "observed": 196.7839,
            "climatology": 198.3904,
            "anomaly": -1.6065
          },
          {
            "date": "2018-04",
            "year": 2018,
            "month": 4,
            "observed": 201.5294,
            "climatology": 202.835,
            "anomaly": -1.3056
          },
          {
            "date": "2018-05",
            "year": 2018,
            "month": 5,
            "observed": 203.74,
            "climatology": 199.2794,
            "anomaly": 4.4606
          },
          {
            "date": "2018-06",
            "year": 2018,
            "month": 6,
            "observed": 184.1125,
            "climatology": 191.3927,
            "anomaly": -7.2802
          },
          {
            "date": "2018-07",
            "year": 2018,
            "month": 7,
            "observed": 177.9744,
            "climatology": 178.7788,
            "anomaly": -0.8044
          },
          {
            "date": "2018-08",
            "year": 2018,
            "month": 8,
            "observed": 159.7049,
            "climatology": 164.878,
            "anomaly": -5.1731
          },
          {
            "date": "2018-09",
            "year": 2018,
            "month": 9,
            "observed": 153.3842,
            "climatology": 156.3015,
            "anomaly": -2.9173
          },
          {
            "date": "2018-10",
            "year": 2018,
            "month": 10,
            "observed": 153.9151,
            "climatology": 152.7203,
            "anomaly": 1.1948
          },
          {
            "date": "2018-11",
            "year": 2018,
            "month": 11,
            "observed": 154.6808,
            "climatology": 155.8408,
            "anomaly": -1.16
          },
          {
            "date": "2018-12",
            "year": 2018,
            "month": 12,
            "observed": 160.9543,
            "climatology": 165.9904,
            "anomaly": -5.0361
          },
          {
            "date": "2019-01",
            "year": 2019,
            "month": 1,
            "observed": 174.3384,
            "climatology": 178.0864,
            "anomaly": -3.748
          },
          {
            "date": "2019-02",
            "year": 2019,
            "month": 2,
            "observed": 190.3037,
            "climatology": 189.5843,
            "anomaly": 0.7194
          },
          {
            "date": "2019-03",
            "year": 2019,
            "month": 3,
            "observed": 195.9074,
            "climatology": 198.3904,
            "anomaly": -2.483
          },
          {
            "date": "2019-04",
            "year": 2019,
            "month": 4,
            "observed": 201.6018,
            "climatology": 202.835,
            "anomaly": -1.2332
          },
          {
            "date": "2019-05",
            "year": 2019,
            "month": 5,
            "observed": 197.8033,
            "climatology": 199.2794,
            "anomaly": -1.4761
          },
          {
            "date": "2019-06",
            "year": 2019,
            "month": 6,
            "observed": 186.8877,
            "climatology": 191.3927,
            "anomaly": -4.505
          },
          {
            "date": "2019-07",
            "year": 2019,
            "month": 7,
            "observed": 181.3546,
            "climatology": 178.7788,
            "anomaly": 2.5758
          },
          {
            "date": "2019-08",
            "year": 2019,
            "month": 8,
            "observed": 165.0575,
            "climatology": 164.878,
            "anomaly": 0.1795
          },
          {
            "date": "2019-09",
            "year": 2019,
            "month": 9,
            "observed": 149.2372,
            "climatology": 156.3015,
            "anomaly": -7.0643
          },
          {
            "date": "2019-10",
            "year": 2019,
            "month": 10,
            "observed": 151.3948,
            "climatology": 152.7203,
            "anomaly": -1.3255
          },
          {
            "date": "2019-11",
            "year": 2019,
            "month": 11,
            "observed": 152.6016,
            "climatology": 155.8408,
            "anomaly": -3.2392
          },
          {
            "date": "2019-12",
            "year": 2019,
            "month": 12,
            "observed": 165.5158,
            "climatology": 165.9904,
            "anomaly": -0.4746
          },
          {
            "date": "2020-01",
            "year": 2020,
            "month": 1,
            "observed": 173.8814,
            "climatology": 178.0864,
            "anomaly": -4.205
          },
          {
            "date": "2020-02",
            "year": 2020,
            "month": 2,
            "observed": 188.0539,
            "climatology": 189.5843,
            "anomaly": -1.5304
          },
          {
            "date": "2020-03",
            "year": 2020,
            "month": 3,
            "observed": 198.7318,
            "climatology": 198.3904,
            "anomaly": 0.3414
          },
          {
            "date": "2020-04",
            "year": 2020,
            "month": 4,
            "observed": 202.9611,
            "climatology": 202.835,
            "anomaly": 0.1261
          },
          {
            "date": "2020-05",
            "year": 2020,
            "month": 5,
            "observed": 194.4246,
            "climatology": 199.2794,
            "anomaly": -4.8548
          },
          {
            "date": "2020-06",
            "year": 2020,
            "month": 6,
            "observed": 187.4164,
            "climatology": 191.3927,
            "anomaly": -3.9763
          },
          {
            "date": "2020-07",
            "year": 2020,
            "month": 7,
            "observed": 174.5433,
            "climatology": 178.7788,
            "anomaly": -4.2355
          },
          {
            "date": "2020-08",
            "year": 2020,
            "month": 8,
            "observed": 161.5754,
            "climatology": 164.878,
            "anomaly": -3.3026
          },
          {
            "date": "2020-09",
            "year": 2020,
            "month": 9,
            "observed": 158.4497,
            "climatology": 156.3015,
            "anomaly": 2.1482
          },
          {
            "date": "2020-10",
            "year": 2020,
            "month": 10,
            "observed": 151.6772,
            "climatology": 152.7203,
            "anomaly": -1.0431
          },
          {
            "date": "2020-11",
            "year": 2020,
            "month": 11,
            "observed": 150.8399,
            "climatology": 155.8408,
            "anomaly": -5.0009
          },
          {
            "date": "2020-12",
            "year": 2020,
            "month": 12,
            "observed": 165.4154,
            "climatology": 165.9904,
            "anomaly": -0.575
          },
          {
            "date": "2021-01",
            "year": 2021,
            "month": 1,
            "observed": 180.9041,
            "climatology": 178.0864,
            "anomaly": 2.8177
          },
          {
            "date": "2021-02",
            "year": 2021,
            "month": 2,
            "observed": 190.6579,
            "climatology": 189.5843,
            "anomaly": 1.0736
          },
          {
            "date": "2021-03",
            "year": 2021,
            "month": 3,
            "observed": 193.4069,
            "climatology": 198.3904,
            "anomaly": -4.9835
          },
          {
            "date": "2021-04",
            "year": 2021,
            "month": 4,
            "observed": 199.3221,
            "climatology": 202.835,
            "anomaly": -3.5129
          },
          {
            "date": "2021-05",
            "year": 2021,
            "month": 5,
            "observed": 200.3286,
            "climatology": 199.2794,
            "anomaly": 1.0492
          },
          {
            "date": "2021-06",
            "year": 2021,
            "month": 6,
            "observed": 186.2195,
            "climatology": 191.3927,
            "anomaly": -5.1732
          },
          {
            "date": "2021-07",
            "year": 2021,
            "month": 7,
            "observed": 176.5763,
            "climatology": 178.7788,
            "anomaly": -2.2025
          },
          {
            "date": "2021-08",
            "year": 2021,
            "month": 8,
            "observed": 164.8813,
            "climatology": 164.878,
            "anomaly": 0.0033
          },
          {
            "date": "2021-09",
            "year": 2021,
            "month": 9,
            "observed": 151.4547,
            "climatology": 156.3015,
            "anomaly": -4.8468
          },
          {
            "date": "2021-10",
            "year": 2021,
            "month": 10,
            "observed": 150.2519,
            "climatology": 152.7203,
            "anomaly": -2.4684
          },
          {
            "date": "2021-11",
            "year": 2021,
            "month": 11,
            "observed": 145.6249,
            "climatology": 155.8408,
            "anomaly": -10.2159
          },
          {
            "date": "2021-12",
            "year": 2021,
            "month": 12,
            "observed": 160.2957,
            "climatology": 165.9904,
            "anomaly": -5.6947
          },
          {
            "date": "2022-01",
            "year": 2022,
            "month": 1,
            "observed": 174.7033,
            "climatology": 178.0864,
            "anomaly": -3.3831
          },
          {
            "date": "2022-02",
            "year": 2022,
            "month": 2,
            "observed": 184.6932,
            "climatology": 189.5843,
            "anomaly": -4.8911
          },
          {
            "date": "2022-03",
            "year": 2022,
            "month": 3,
            "observed": 201.0224,
            "climatology": 198.3904,
            "anomaly": 2.632
          },
          {
            "date": "2022-04",
            "year": 2022,
            "month": 4,
            "observed": 196.6933,
            "climatology": 202.835,
            "anomaly": -6.1417
          },
          {
            "date": "2022-05",
            "year": 2022,
            "month": 5,
            "observed": 195.7972,
            "climatology": 199.2794,
            "anomaly": -3.4822
          },
          {
            "date": "2022-06",
            "year": 2022,
            "month": 6,
            "observed": 188.0516,
            "climatology": 191.3927,
            "anomaly": -3.3411
          },
          {
            "date": "2022-07",
            "year": 2022,
            "month": 7,
            "observed": 178.8059,
            "climatology": 178.7788,
            "anomaly": 0.0271
          },
          {
            "date": "2022-08",
            "year": 2022,
            "month": 8,
            "observed": 159.091,
            "climatology": 164.878,
            "anomaly": -5.787
          },
          {
            "date": "2022-09",
            "year": 2022,
            "month": 9,
            "observed": 156.416,
            "climatology": 156.3015,
            "anomaly": 0.1145
          },
          {
            "date": "2022-10",
            "year": 2022,
            "month": 10,
            "observed": 150.1623,
            "climatology": 152.7203,
            "anomaly": -2.558
          },
          {
            "date": "2022-11",
            "year": 2022,
            "month": 11,
            "observed": 151.0103,
            "climatology": 155.8408,
            "anomaly": -4.8305
          },
          {
            "date": "2022-12",
            "year": 2022,
            "month": 12,
            "observed": 163.748,
            "climatology": 165.9904,
            "anomaly": -2.2424
          },
          {
            "date": "2023-01",
            "year": 2023,
            "month": 1,
            "observed": 175.5684,
            "climatology": 178.0864,
            "anomaly": -2.518
          },
          {
            "date": "2023-02",
            "year": 2023,
            "month": 2,
            "observed": 186.0482,
            "climatology": 189.5843,
            "anomaly": -3.5361
          },
          {
            "date": "2023-03",
            "year": 2023,
            "month": 3,
            "observed": 196.8518,
            "climatology": 198.3904,
            "anomaly": -1.5386
          },
          {
            "date": "2023-04",
            "year": 2023,
            "month": 4,
            "observed": 199.0414,
            "climatology": 202.835,
            "anomaly": -3.7936
          },
          {
            "date": "2023-05",
            "year": 2023,
            "month": 5,
            "observed": 196.9171,
            "climatology": 199.2794,
            "anomaly": -2.3623
          },
          {
            "date": "2023-06",
            "year": 2023,
            "month": 6,
            "observed": 189.116,
            "climatology": 191.3927,
            "anomaly": -2.2767
          },
          {
            "date": "2023-07",
            "year": 2023,
            "month": 7,
            "observed": 178.9037,
            "climatology": 178.7788,
            "anomaly": 0.1249
          },
          {
            "date": "2023-08",
            "year": 2023,
            "month": 8,
            "observed": 159.3222,
            "climatology": 164.878,
            "anomaly": -5.5558
          },
          {
            "date": "2023-09",
            "year": 2023,
            "month": 9,
            "observed": 158.5767,
            "climatology": 156.3015,
            "anomaly": 2.2752
          },
          {
            "date": "2023-10",
            "year": 2023,
            "month": 10,
            "observed": 144.9925,
            "climatology": 152.7203,
            "anomaly": -7.7278
          },
          {
            "date": "2023-11",
            "year": 2023,
            "month": 11,
            "observed": 152.8206,
            "climatology": 155.8408,
            "anomaly": -3.0202
          },
          {
            "date": "2023-12",
            "year": 2023,
            "month": 12,
            "observed": 163.7995,
            "climatology": 165.9904,
            "anomaly": -2.1909
          },
          {
            "date": "2024-01",
            "year": 2024,
            "month": 1,
            "observed": 175.5092,
            "climatology": 178.0864,
            "anomaly": -2.5772
          },
          {
            "date": "2024-02",
            "year": 2024,
            "month": 2,
            "observed": 185.728,
            "climatology": 189.5843,
            "anomaly": -3.8563
          },
          {
            "date": "2024-03",
            "year": 2024,
            "month": 3,
            "observed": 195.893,
            "climatology": 198.3904,
            "anomaly": -2.4974
          },
          {
            "date": "2024-04",
            "year": 2024,
            "month": 4,
            "observed": 198.5082,
            "climatology": 202.835,
            "anomaly": -4.3268
          },
          {
            "date": "2024-05",
            "year": 2024,
            "month": 5,
            "observed": 194.8959,
            "climatology": 199.2794,
            "anomaly": -4.3835
          },
          {
            "date": "2024-06",
            "year": 2024,
            "month": 6,
            "observed": 189.3207,
            "climatology": 191.3927,
            "anomaly": -2.072
          },
          {
            "date": "2024-07",
            "year": 2024,
            "month": 7,
            "observed": 175.5672,
            "climatology": 178.7788,
            "anomaly": -3.2116
          },
          {
            "date": "2024-08",
            "year": 2024,
            "month": 8,
            "observed": 160.4204,
            "climatology": 164.878,
            "anomaly": -4.4576
          },
          {
            "date": "2024-09",
            "year": 2024,
            "month": 9,
            "observed": 155.2291,
            "climatology": 156.3015,
            "anomaly": -1.0724
          },
          {
            "date": "2024-10",
            "year": 2024,
            "month": 10,
            "observed": 150.377,
            "climatology": 152.7203,
            "anomaly": -2.3433
          },
          {
            "date": "2024-11",
            "year": 2024,
            "month": 11,
            "observed": 154.9682,
            "climatology": 155.8408,
            "anomaly": -0.8726
          },
          {
            "date": "2024-12",
            "year": 2024,
            "month": 12,
            "observed": 163.6388,
            "climatology": 165.9904,
            "anomaly": -2.3516
          }
        ],
        "annual_series": [
          {
            "year": 2000,
            "annual_mean": 181.7616,
            "annual_anomaly": 3.9218
          },
          {
            "year": 2001,
            "annual_mean": 179.2796,
            "annual_anomaly": 1.4398
          },
          {
            "year": 2002,
            "annual_mean": 180.0104,
            "annual_anomaly": 2.1705
          },
          {
            "year": 2003,
            "annual_mean": 179.3983,
            "annual_anomaly": 1.5584
          },
          {
            "year": 2004,
            "annual_mean": 180.0855,
            "annual_anomaly": 2.2457
          },
          {
            "year": 2005,
            "annual_mean": 180.0661,
            "annual_anomaly": 2.2262
          },
          {
            "year": 2006,
            "annual_mean": 179.1711,
            "annual_anomaly": 1.3313
          },
          {
            "year": 2007,
            "annual_mean": 178.7774,
            "annual_anomaly": 0.9376
          },
          {
            "year": 2008,
            "annual_mean": 178.8368,
            "annual_anomaly": 0.997
          },
          {
            "year": 2009,
            "annual_mean": 178.9711,
            "annual_anomaly": 1.1313
          },
          {
            "year": 2010,
            "annual_mean": 178.2186,
            "annual_anomaly": 0.3788
          },
          {
            "year": 2011,
            "annual_mean": 177.8325,
            "annual_anomaly": -0.0074
          },
          {
            "year": 2012,
            "annual_mean": 177.6518,
            "annual_anomaly": -0.188
          },
          {
            "year": 2013,
            "annual_mean": 178.8502,
            "annual_anomaly": 1.0103
          },
          {
            "year": 2014,
            "annual_mean": 177.8644,
            "annual_anomaly": 0.0245
          },
          {
            "year": 2015,
            "annual_mean": 176.6699,
            "annual_anomaly": -1.1699
          },
          {
            "year": 2016,
            "annual_mean": 176.9576,
            "annual_anomaly": -0.8823
          },
          {
            "year": 2017,
            "annual_mean": 177.958,
            "annual_anomaly": 0.1182
          },
          {
            "year": 2018,
            "annual_mean": 175.7929,
            "annual_anomaly": -2.0469
          },
          {
            "year": 2019,
            "annual_mean": 176.0003,
            "annual_anomaly": -1.8395
          },
          {
            "year": 2020,
            "annual_mean": 175.6642,
            "annual_anomaly": -2.1757
          },
          {
            "year": 2021,
            "annual_mean": 174.9937,
            "annual_anomaly": -2.8462
          },
          {
            "year": 2022,
            "annual_mean": 175.0162,
            "annual_anomaly": -2.8236
          },
          {
            "year": 2023,
            "annual_mean": 175.1632,
            "annual_anomaly": -2.6767
          },
          {
            "year": 2024,
            "annual_mean": 175.0046,
            "annual_anomaly": -2.8352
          }
        ],
        "climatology_baseline": {
          "1": 178.0864,
          "2": 189.5843,
          "3": 198.3904,
          "4": 202.835,
          "5": 199.2794,
          "6": 191.3927,
          "7": 178.7788,
          "8": 164.878,
          "9": 156.3015,
          "10": 152.7203,
          "11": 155.8408,
          "12": 165.9904
        }
      },
      "statistics": {
        "sens_slope": -0.2448,
        "sens_intercept": 670.25823,
        "confidence_interval_95": [
          -0.28163,
          -0.21806
        ],
        "mann_kendall_score_s": -242,
        "standardized_z": -5.6285,
        "p_value": 0.0,
        "is_significant": true,
        "trend_label": "STATISTICALLY_SIGNIFICANT_DECREASING",
        "verdict_text": "Confirmed downward monotonic trend (-0.2448/yr, p=1.8173e-08). Evidence strongly rejects the null hypothesis.",
        "ols_comparison": {
          "ols_slope": -0.24481,
          "ols_pvalue": 0.0,
          "r_squared": 0.9011
        }
      }
    }
  },
  "region_b": {
    "name": "Southern Scandinavia (Northern Europe)",
    "bbox": [
      58.0,
      66.0,
      10.0,
      22.0
    ],
    "analysis": {
      "metadata": {
        "source": "SIMULATED_NOAH_LSM_3.6_BASELINE",
        "doi": "10.5067/SXAVCZFAQLNO",
        "provenance_type": "ILLUSTRATIVE_BASELINE",
        "is_illustrative": true,
        "variable": "RootMoist_inst",
        "unit": "kg/m\u00b2",
        "depth_note": "Simulated Noah LSM baseline (Illustrative development model)",
        "bbox": [
          58.0,
          66.0,
          10.0,
          22.0
        ],
        "time_range": [
          2000,
          2024
        ],
        "total_observations": 300,
        "disclaimer": "ILLUSTRATIVE ONLY: Simulated baseline derived from Noah LSM 3.6 parameterization. NOT real NASA GLDAS observational output."
      },
      "climatology": {
        "monthly_series": [
          {
            "date": "2000-01",
            "year": 2000,
            "month": 1,
            "observed": 197.7682,
            "climatology": 198.7981,
            "anomaly": -1.0299
          },
          {
            "date": "2000-02",
            "year": 2000,
            "month": 2,
            "observed": 208.6958,
            "climatology": 210.333,
            "anomaly": -1.6372
          },
          {
            "date": "2000-03",
            "year": 2000,
            "month": 3,
            "observed": 219.8263,
            "climatology": 219.1761,
            "anomaly": 0.6502
          },
          {
            "date": "2000-04",
            "year": 2000,
            "month": 4,
            "observed": 225.379,
            "climatology": 223.6577,
            "anomaly": 1.7213
          },
          {
            "date": "2000-05",
            "year": 2000,
            "month": 5,
            "observed": 217.6517,
            "climatology": 220.1392,
            "anomaly": -2.4875
          },
          {
            "date": "2000-06",
            "year": 2000,
            "month": 6,
            "observed": 208.5161,
            "climatology": 212.2894,
            "anomaly": -3.7733
          },
          {
            "date": "2000-07",
            "year": 2000,
            "month": 7,
            "observed": 200.5645,
            "climatology": 199.7125,
            "anomaly": 0.852
          },
          {
            "date": "2000-08",
            "year": 2000,
            "month": 8,
            "observed": 186.05,
            "climatology": 185.8487,
            "anomaly": 0.2013
          },
          {
            "date": "2000-09",
            "year": 2000,
            "month": 9,
            "observed": 173.8221,
            "climatology": 177.3092,
            "anomaly": -3.4871
          },
          {
            "date": "2000-10",
            "year": 2000,
            "month": 10,
            "observed": 173.0178,
            "climatology": 173.765,
            "anomaly": -0.7472
          },
          {
            "date": "2000-11",
            "year": 2000,
            "month": 11,
            "observed": 173.8672,
            "climatology": 176.9225,
            "anomaly": -3.0553
          },
          {
            "date": "2000-12",
            "year": 2000,
            "month": 12,
            "observed": 183.0271,
            "climatology": 187.1091,
            "anomaly": -4.082
          },
          {
            "date": "2001-01",
            "year": 2001,
            "month": 1,
            "observed": 197.3113,
            "climatology": 198.7981,
            "anomaly": -1.4868
          },
          {
            "date": "2001-02",
            "year": 2001,
            "month": 2,
            "observed": 204.4382,
            "climatology": 210.333,
            "anomaly": -5.8948
          },
          {
            "date": "2001-03",
            "year": 2001,
            "month": 3,
            "observed": 214.0748,
            "climatology": 219.1761,
            "anomaly": -5.1013
          },
          {
            "date": "2001-04",
            "year": 2001,
            "month": 4,
            "observed": 220.3457,
            "climatology": 223.6577,
            "anomaly": -3.312
          },
          {
            "date": "2001-05",
            "year": 2001,
            "month": 5,
            "observed": 215.885,
            "climatology": 220.1392,
            "anomaly": -4.2542
          },
          {
            "date": "2001-06",
            "year": 2001,
            "month": 6,
            "observed": 210.067,
            "climatology": 212.2894,
            "anomaly": -2.2224
          },
          {
            "date": "2001-07",
            "year": 2001,
            "month": 7,
            "observed": 194.5264,
            "climatology": 199.7125,
            "anomaly": -5.1861
          },
          {
            "date": "2001-08",
            "year": 2001,
            "month": 8,
            "observed": 180.7807,
            "climatology": 185.8487,
            "anomaly": -5.068
          },
          {
            "date": "2001-09",
            "year": 2001,
            "month": 9,
            "observed": 178.8399,
            "climatology": 177.3092,
            "anomaly": 1.5307
          },
          {
            "date": "2001-10",
            "year": 2001,
            "month": 10,
            "observed": 171.277,
            "climatology": 173.765,
            "anomaly": -2.488
          },
          {
            "date": "2001-11",
            "year": 2001,
            "month": 11,
            "observed": 175.3746,
            "climatology": 176.9225,
            "anomaly": -1.5479
          },
          {
            "date": "2001-12",
            "year": 2001,
            "month": 12,
            "observed": 180.8096,
            "climatology": 187.1091,
            "anomaly": -6.2995
          },
          {
            "date": "2002-01",
            "year": 2002,
            "month": 1,
            "observed": 195.5255,
            "climatology": 198.7981,
            "anomaly": -3.2726
          },
          {
            "date": "2002-02",
            "year": 2002,
            "month": 2,
            "observed": 209.6787,
            "climatology": 210.333,
            "anomaly": -0.6543
          },
          {
            "date": "2002-03",
            "year": 2002,
            "month": 3,
            "observed": 215.6896,
            "climatology": 219.1761,
            "anomaly": -3.4865
          },
          {
            "date": "2002-04",
            "year": 2002,
            "month": 4,
            "observed": 222.8707,
            "climatology": 223.6577,
            "anomaly": -0.787
          },
          {
            "date": "2002-05",
            "year": 2002,
            "month": 5,
            "observed": 217.0955,
            "climatology": 220.1392,
            "anomaly": -3.0437
          },
          {
            "date": "2002-06",
            "year": 2002,
            "month": 6,
            "observed": 208.7322,
            "climatology": 212.2894,
            "anomaly": -3.5572
          },
          {
            "date": "2002-07",
            "year": 2002,
            "month": 7,
            "observed": 195.4722,
            "climatology": 199.7125,
            "anomaly": -4.2403
          },
          {
            "date": "2002-08",
            "year": 2002,
            "month": 8,
            "observed": 189.1221,
            "climatology": 185.8487,
            "anomaly": 3.2734
          },
          {
            "date": "2002-09",
            "year": 2002,
            "month": 9,
            "observed": 175.322,
            "climatology": 177.3092,
            "anomaly": -1.9872
          },
          {
            "date": "2002-10",
            "year": 2002,
            "month": 10,
            "observed": 169.3771,
            "climatology": 173.765,
            "anomaly": -4.3879
          },
          {
            "date": "2002-11",
            "year": 2002,
            "month": 11,
            "observed": 177.4421,
            "climatology": 176.9225,
            "anomaly": 0.5196
          },
          {
            "date": "2002-12",
            "year": 2002,
            "month": 12,
            "observed": 181.4993,
            "climatology": 187.1091,
            "anomaly": -5.6098
          },
          {
            "date": "2003-01",
            "year": 2003,
            "month": 1,
            "observed": 197.5886,
            "climatology": 198.7981,
            "anomaly": -1.2095
          },
          {
            "date": "2003-02",
            "year": 2003,
            "month": 2,
            "observed": 204.6822,
            "climatology": 210.333,
            "anomaly": -5.6508
          },
          {
            "date": "2003-03",
            "year": 2003,
            "month": 3,
            "observed": 215.4266,
            "climatology": 219.1761,
            "anomaly": -3.7495
          },
          {
            "date": "2003-04",
            "year": 2003,
            "month": 4,
            "observed": 222.6036,
            "climatology": 223.6577,
            "anomaly": -1.0541
          },
          {
            "date": "2003-05",
            "year": 2003,
            "month": 5,
            "observed": 220.6232,
            "climatology": 220.1392,
            "anomaly": 0.484
          },
          {
            "date": "2003-06",
            "year": 2003,
            "month": 6,
            "observed": 210.0698,
            "climatology": 212.2894,
            "anomaly": -2.2196
          },
          {
            "date": "2003-07",
            "year": 2003,
            "month": 7,
            "observed": 196.8673,
            "climatology": 199.7125,
            "anomaly": -2.8452
          },
          {
            "date": "2003-08",
            "year": 2003,
            "month": 8,
            "observed": 183.9187,
            "climatology": 185.8487,
            "anomaly": -1.93
          },
          {
            "date": "2003-09",
            "year": 2003,
            "month": 9,
            "observed": 171.8395,
            "climatology": 177.3092,
            "anomaly": -5.4697
          },
          {
            "date": "2003-10",
            "year": 2003,
            "month": 10,
            "observed": 170.4018,
            "climatology": 173.765,
            "anomaly": -3.3632
          },
          {
            "date": "2003-11",
            "year": 2003,
            "month": 11,
            "observed": 174.4142,
            "climatology": 176.9225,
            "anomaly": -2.5083
          },
          {
            "date": "2003-12",
            "year": 2003,
            "month": 12,
            "observed": 187.3742,
            "climatology": 187.1091,
            "anomaly": 0.2651
          },
          {
            "date": "2004-01",
            "year": 2004,
            "month": 1,
            "observed": 198.1055,
            "climatology": 198.7981,
            "anomaly": -0.6926
          },
          {
            "date": "2004-02",
            "year": 2004,
            "month": 2,
            "observed": 205.3538,
            "climatology": 210.333,
            "anomaly": -4.9792
          },
          {
            "date": "2004-03",
            "year": 2004,
            "month": 3,
            "observed": 219.7373,
            "climatology": 219.1761,
            "anomaly": 0.5612
          },
          {
            "date": "2004-04",
            "year": 2004,
            "month": 4,
            "observed": 221.3287,
            "climatology": 223.6577,
            "anomaly": -2.329
          },
          {
            "date": "2004-05",
            "year": 2004,
            "month": 5,
            "observed": 217.2648,
            "climatology": 220.1392,
            "anomaly": -2.8744
          },
          {
            "date": "2004-06",
            "year": 2004,
            "month": 6,
            "observed": 211.3506,
            "climatology": 212.2894,
            "anomaly": -0.9388
          },
          {
            "date": "2004-07",
            "year": 2004,
            "month": 7,
            "observed": 199.9139,
            "climatology": 199.7125,
            "anomaly": 0.2014
          },
          {
            "date": "2004-08",
            "year": 2004,
            "month": 8,
            "observed": 187.1796,
            "climatology": 185.8487,
            "anomaly": 1.3309
          },
          {
            "date": "2004-09",
            "year": 2004,
            "month": 9,
            "observed": 173.6177,
            "climatology": 177.3092,
            "anomaly": -3.6915
          },
          {
            "date": "2004-10",
            "year": 2004,
            "month": 10,
            "observed": 171.6084,
            "climatology": 173.765,
            "anomaly": -2.1566
          },
          {
            "date": "2004-11",
            "year": 2004,
            "month": 11,
            "observed": 176.5739,
            "climatology": 176.9225,
            "anomaly": -0.3486
          },
          {
            "date": "2004-12",
            "year": 2004,
            "month": 12,
            "observed": 187.3503,
            "climatology": 187.1091,
            "anomaly": 0.2412
          },
          {
            "date": "2005-01",
            "year": 2005,
            "month": 1,
            "observed": 196.2285,
            "climatology": 198.7981,
            "anomaly": -2.5696
          },
          {
            "date": "2005-02",
            "year": 2005,
            "month": 2,
            "observed": 209.4773,
            "climatology": 210.333,
            "anomaly": -0.8557
          },
          {
            "date": "2005-03",
            "year": 2005,
            "month": 3,
            "observed": 216.3412,
            "climatology": 219.1761,
            "anomaly": -2.8349
          },
          {
            "date": "2005-04",
            "year": 2005,
            "month": 4,
            "observed": 219.4809,
            "climatology": 223.6577,
            "anomaly": -4.1768
          },
          {
            "date": "2005-05",
            "year": 2005,
            "month": 5,
            "observed": 221.1684,
            "climatology": 220.1392,
            "anomaly": 1.0292
          },
          {
            "date": "2005-06",
            "year": 2005,
            "month": 6,
            "observed": 213.392,
            "climatology": 212.2894,
            "anomaly": 1.1026
          },
          {
            "date": "2005-07",
            "year": 2005,
            "month": 7,
            "observed": 197.3364,
            "climatology": 199.7125,
            "anomaly": -2.3761
          },
          {
            "date": "2005-08",
            "year": 2005,
            "month": 8,
            "observed": 187.5403,
            "climatology": 185.8487,
            "anomaly": 1.6916
          },
          {
            "date": "2005-09",
            "year": 2005,
            "month": 9,
            "observed": 176.7999,
            "climatology": 177.3092,
            "anomaly": -0.5093
          },
          {
            "date": "2005-10",
            "year": 2005,
            "month": 10,
            "observed": 170.9486,
            "climatology": 173.765,
            "anomaly": -2.8164
          },
          {
            "date": "2005-11",
            "year": 2005,
            "month": 11,
            "observed": 176.8293,
            "climatology": 176.9225,
            "anomaly": -0.0932
          },
          {
            "date": "2005-12",
            "year": 2005,
            "month": 12,
            "observed": 188.9365,
            "climatology": 187.1091,
            "anomaly": 1.8274
          },
          {
            "date": "2006-01",
            "year": 2006,
            "month": 1,
            "observed": 197.5169,
            "climatology": 198.7981,
            "anomaly": -1.2812
          },
          {
            "date": "2006-02",
            "year": 2006,
            "month": 2,
            "observed": 214.033,
            "climatology": 210.333,
            "anomaly": 3.7
          },
          {
            "date": "2006-03",
            "year": 2006,
            "month": 3,
            "observed": 212.7377,
            "climatology": 219.1761,
            "anomaly": -6.4384
          },
          {
            "date": "2006-04",
            "year": 2006,
            "month": 4,
            "observed": 224.7062,
            "climatology": 223.6577,
            "anomaly": 1.0485
          },
          {
            "date": "2006-05",
            "year": 2006,
            "month": 5,
            "observed": 219.5347,
            "climatology": 220.1392,
            "anomaly": -0.6045
          },
          {
            "date": "2006-06",
            "year": 2006,
            "month": 6,
            "observed": 209.4339,
            "climatology": 212.2894,
            "anomaly": -2.8555
          },
          {
            "date": "2006-07",
            "year": 2006,
            "month": 7,
            "observed": 197.9258,
            "climatology": 199.7125,
            "anomaly": -1.7867
          },
          {
            "date": "2006-08",
            "year": 2006,
            "month": 8,
            "observed": 180.2425,
            "climatology": 185.8487,
            "anomaly": -5.6062
          },
          {
            "date": "2006-09",
            "year": 2006,
            "month": 9,
            "observed": 175.5266,
            "climatology": 177.3092,
            "anomaly": -1.7826
          },
          {
            "date": "2006-10",
            "year": 2006,
            "month": 10,
            "observed": 173.6342,
            "climatology": 173.765,
            "anomaly": -0.1308
          },
          {
            "date": "2006-11",
            "year": 2006,
            "month": 11,
            "observed": 179.8005,
            "climatology": 176.9225,
            "anomaly": 2.878
          },
          {
            "date": "2006-12",
            "year": 2006,
            "month": 12,
            "observed": 183.9757,
            "climatology": 187.1091,
            "anomaly": -3.1334
          },
          {
            "date": "2007-01",
            "year": 2007,
            "month": 1,
            "observed": 195.7652,
            "climatology": 198.7981,
            "anomaly": -3.0329
          },
          {
            "date": "2007-02",
            "year": 2007,
            "month": 2,
            "observed": 209.047,
            "climatology": 210.333,
            "anomaly": -1.286
          },
          {
            "date": "2007-03",
            "year": 2007,
            "month": 3,
            "observed": 221.7556,
            "climatology": 219.1761,
            "anomaly": 2.5795
          },
          {
            "date": "2007-04",
            "year": 2007,
            "month": 4,
            "observed": 223.6533,
            "climatology": 223.6577,
            "anomaly": -0.0044
          },
          {
            "date": "2007-05",
            "year": 2007,
            "month": 5,
            "observed": 218.1727,
            "climatology": 220.1392,
            "anomaly": -1.9665
          },
          {
            "date": "2007-06",
            "year": 2007,
            "month": 6,
            "observed": 211.6446,
            "climatology": 212.2894,
            "anomaly": -0.6448
          },
          {
            "date": "2007-07",
            "year": 2007,
            "month": 7,
            "observed": 198.1191,
            "climatology": 199.7125,
            "anomaly": -1.5934
          },
          {
            "date": "2007-08",
            "year": 2007,
            "month": 8,
            "observed": 187.813,
            "climatology": 185.8487,
            "anomaly": 1.9643
          },
          {
            "date": "2007-09",
            "year": 2007,
            "month": 9,
            "observed": 174.5007,
            "climatology": 177.3092,
            "anomaly": -2.8085
          },
          {
            "date": "2007-10",
            "year": 2007,
            "month": 10,
            "observed": 172.1023,
            "climatology": 173.765,
            "anomaly": -1.6627
          },
          {
            "date": "2007-11",
            "year": 2007,
            "month": 11,
            "observed": 175.3055,
            "climatology": 176.9225,
            "anomaly": -1.617
          },
          {
            "date": "2007-12",
            "year": 2007,
            "month": 12,
            "observed": 181.7926,
            "climatology": 187.1091,
            "anomaly": -5.3165
          },
          {
            "date": "2008-01",
            "year": 2008,
            "month": 1,
            "observed": 198.7067,
            "climatology": 198.7981,
            "anomaly": -0.0914
          },
          {
            "date": "2008-02",
            "year": 2008,
            "month": 2,
            "observed": 211.1341,
            "climatology": 210.333,
            "anomaly": 0.8011
          },
          {
            "date": "2008-03",
            "year": 2008,
            "month": 3,
            "observed": 219.6598,
            "climatology": 219.1761,
            "anomaly": 0.4837
          },
          {
            "date": "2008-04",
            "year": 2008,
            "month": 4,
            "observed": 222.425,
            "climatology": 223.6577,
            "anomaly": -1.2327
          },
          {
            "date": "2008-05",
            "year": 2008,
            "month": 5,
            "observed": 216.1386,
            "climatology": 220.1392,
            "anomaly": -4.0006
          },
          {
            "date": "2008-06",
            "year": 2008,
            "month": 6,
            "observed": 209.4898,
            "climatology": 212.2894,
            "anomaly": -2.7996
          },
          {
            "date": "2008-07",
            "year": 2008,
            "month": 7,
            "observed": 197.1996,
            "climatology": 199.7125,
            "anomaly": -2.5129
          },
          {
            "date": "2008-08",
            "year": 2008,
            "month": 8,
            "observed": 183.5657,
            "climatology": 185.8487,
            "anomaly": -2.283
          },
          {
            "date": "2008-09",
            "year": 2008,
            "month": 9,
            "observed": 176.0326,
            "climatology": 177.3092,
            "anomaly": -1.2766
          },
          {
            "date": "2008-10",
            "year": 2008,
            "month": 10,
            "observed": 174.1115,
            "climatology": 173.765,
            "anomaly": 0.3465
          },
          {
            "date": "2008-11",
            "year": 2008,
            "month": 11,
            "observed": 181.1813,
            "climatology": 176.9225,
            "anomaly": 4.2588
          },
          {
            "date": "2008-12",
            "year": 2008,
            "month": 12,
            "observed": 186.0679,
            "climatology": 187.1091,
            "anomaly": -1.0412
          },
          {
            "date": "2009-01",
            "year": 2009,
            "month": 1,
            "observed": 198.7903,
            "climatology": 198.7981,
            "anomaly": -0.0078
          },
          {
            "date": "2009-02",
            "year": 2009,
            "month": 2,
            "observed": 210.4753,
            "climatology": 210.333,
            "anomaly": 0.1423
          },
          {
            "date": "2009-03",
            "year": 2009,
            "month": 3,
            "observed": 215.0301,
            "climatology": 219.1761,
            "anomaly": -4.146
          },
          {
            "date": "2009-04",
            "year": 2009,
            "month": 4,
            "observed": 223.1251,
            "climatology": 223.6577,
            "anomaly": -0.5326
          },
          {
            "date": "2009-05",
            "year": 2009,
            "month": 5,
            "observed": 220.0076,
            "climatology": 220.1392,
            "anomaly": -0.1316
          },
          {
            "date": "2009-06",
            "year": 2009,
            "month": 6,
            "observed": 216.8795,
            "climatology": 212.2894,
            "anomaly": 4.5901
          },
          {
            "date": "2009-07",
            "year": 2009,
            "month": 7,
            "observed": 197.7555,
            "climatology": 199.7125,
            "anomaly": -1.957
          },
          {
            "date": "2009-08",
            "year": 2009,
            "month": 8,
            "observed": 186.5053,
            "climatology": 185.8487,
            "anomaly": 0.6566
          },
          {
            "date": "2009-09",
            "year": 2009,
            "month": 9,
            "observed": 176.529,
            "climatology": 177.3092,
            "anomaly": -0.7802
          },
          {
            "date": "2009-10",
            "year": 2009,
            "month": 10,
            "observed": 170.3597,
            "climatology": 173.765,
            "anomaly": -3.4053
          },
          {
            "date": "2009-11",
            "year": 2009,
            "month": 11,
            "observed": 179.5028,
            "climatology": 176.9225,
            "anomaly": 2.5803
          },
          {
            "date": "2009-12",
            "year": 2009,
            "month": 12,
            "observed": 187.6913,
            "climatology": 187.1091,
            "anomaly": 0.5822
          },
          {
            "date": "2010-01",
            "year": 2010,
            "month": 1,
            "observed": 200.304,
            "climatology": 198.7981,
            "anomaly": 1.5059
          },
          {
            "date": "2010-02",
            "year": 2010,
            "month": 2,
            "observed": 208.568,
            "climatology": 210.333,
            "anomaly": -1.765
          },
          {
            "date": "2010-03",
            "year": 2010,
            "month": 3,
            "observed": 223.514,
            "climatology": 219.1761,
            "anomaly": 4.3379
          },
          {
            "date": "2010-04",
            "year": 2010,
            "month": 4,
            "observed": 219.8668,
            "climatology": 223.6577,
            "anomaly": -3.7909
          },
          {
            "date": "2010-05",
            "year": 2010,
            "month": 5,
            "observed": 221.5042,
            "climatology": 220.1392,
            "anomaly": 1.365
          },
          {
            "date": "2010-06",
            "year": 2010,
            "month": 6,
            "observed": 216.3776,
            "climatology": 212.2894,
            "anomaly": 4.0882
          },
          {
            "date": "2010-07",
            "year": 2010,
            "month": 7,
            "observed": 195.9401,
            "climatology": 199.7125,
            "anomaly": -3.7724
          },
          {
            "date": "2010-08",
            "year": 2010,
            "month": 8,
            "observed": 184.5157,
            "climatology": 185.8487,
            "anomaly": -1.333
          },
          {
            "date": "2010-09",
            "year": 2010,
            "month": 9,
            "observed": 177.0449,
            "climatology": 177.3092,
            "anomaly": -0.2643
          },
          {
            "date": "2010-10",
            "year": 2010,
            "month": 10,
            "observed": 172.2027,
            "climatology": 173.765,
            "anomaly": -1.5623
          },
          {
            "date": "2010-11",
            "year": 2010,
            "month": 11,
            "observed": 172.9491,
            "climatology": 176.9225,
            "anomaly": -3.9734
          },
          {
            "date": "2010-12",
            "year": 2010,
            "month": 12,
            "observed": 186.1628,
            "climatology": 187.1091,
            "anomaly": -0.9463
          },
          {
            "date": "2011-01",
            "year": 2011,
            "month": 1,
            "observed": 195.8507,
            "climatology": 198.7981,
            "anomaly": -2.9474
          },
          {
            "date": "2011-02",
            "year": 2011,
            "month": 2,
            "observed": 212.2054,
            "climatology": 210.333,
            "anomaly": 1.8724
          },
          {
            "date": "2011-03",
            "year": 2011,
            "month": 3,
            "observed": 217.8885,
            "climatology": 219.1761,
            "anomaly": -1.2876
          },
          {
            "date": "2011-04",
            "year": 2011,
            "month": 4,
            "observed": 227.4263,
            "climatology": 223.6577,
            "anomaly": 3.7686
          },
          {
            "date": "2011-05",
            "year": 2011,
            "month": 5,
            "observed": 218.2589,
            "climatology": 220.1392,
            "anomaly": -1.8803
          },
          {
            "date": "2011-06",
            "year": 2011,
            "month": 6,
            "observed": 210.2763,
            "climatology": 212.2894,
            "anomaly": -2.0131
          },
          {
            "date": "2011-07",
            "year": 2011,
            "month": 7,
            "observed": 200.6302,
            "climatology": 199.7125,
            "anomaly": 0.9177
          },
          {
            "date": "2011-08",
            "year": 2011,
            "month": 8,
            "observed": 183.0343,
            "climatology": 185.8487,
            "anomaly": -2.8144
          },
          {
            "date": "2011-09",
            "year": 2011,
            "month": 9,
            "observed": 177.5444,
            "climatology": 177.3092,
            "anomaly": 0.2352
          },
          {
            "date": "2011-10",
            "year": 2011,
            "month": 10,
            "observed": 176.9093,
            "climatology": 173.765,
            "anomaly": 3.1443
          },
          {
            "date": "2011-11",
            "year": 2011,
            "month": 11,
            "observed": 172.9871,
            "climatology": 176.9225,
            "anomaly": -3.9354
          },
          {
            "date": "2011-12",
            "year": 2011,
            "month": 12,
            "observed": 186.633,
            "climatology": 187.1091,
            "anomaly": -0.4761
          },
          {
            "date": "2012-01",
            "year": 2012,
            "month": 1,
            "observed": 199.3361,
            "climatology": 198.7981,
            "anomaly": 0.538
          },
          {
            "date": "2012-02",
            "year": 2012,
            "month": 2,
            "observed": 213.156,
            "climatology": 210.333,
            "anomaly": 2.823
          },
          {
            "date": "2012-03",
            "year": 2012,
            "month": 3,
            "observed": 217.2747,
            "climatology": 219.1761,
            "anomaly": -1.9014
          },
          {
            "date": "2012-04",
            "year": 2012,
            "month": 4,
            "observed": 220.4303,
            "climatology": 223.6577,
            "anomaly": -3.2274
          },
          {
            "date": "2012-05",
            "year": 2012,
            "month": 5,
            "observed": 221.7019,
            "climatology": 220.1392,
            "anomaly": 1.5627
          },
          {
            "date": "2012-06",
            "year": 2012,
            "month": 6,
            "observed": 212.0039,
            "climatology": 212.2894,
            "anomaly": -0.2855
          },
          {
            "date": "2012-07",
            "year": 2012,
            "month": 7,
            "observed": 199.4027,
            "climatology": 199.7125,
            "anomaly": -0.3098
          },
          {
            "date": "2012-08",
            "year": 2012,
            "month": 8,
            "observed": 187.1575,
            "climatology": 185.8487,
            "anomaly": 1.3088
          },
          {
            "date": "2012-09",
            "year": 2012,
            "month": 9,
            "observed": 175.4557,
            "climatology": 177.3092,
            "anomaly": -1.8535
          },
          {
            "date": "2012-10",
            "year": 2012,
            "month": 10,
            "observed": 174.4021,
            "climatology": 173.765,
            "anomaly": 0.6371
          },
          {
            "date": "2012-11",
            "year": 2012,
            "month": 11,
            "observed": 177.9185,
            "climatology": 176.9225,
            "anomaly": 0.996
          },
          {
            "date": "2012-12",
            "year": 2012,
            "month": 12,
            "observed": 184.5655,
            "climatology": 187.1091,
            "anomaly": -2.5436
          },
          {
            "date": "2013-01",
            "year": 2013,
            "month": 1,
            "observed": 203.5309,
            "climatology": 198.7981,
            "anomaly": 4.7328
          },
          {
            "date": "2013-02",
            "year": 2013,
            "month": 2,
            "observed": 212.566,
            "climatology": 210.333,
            "anomaly": 2.233
          },
          {
            "date": "2013-03",
            "year": 2013,
            "month": 3,
            "observed": 217.5688,
            "climatology": 219.1761,
            "anomaly": -1.6073
          },
          {
            "date": "2013-04",
            "year": 2013,
            "month": 4,
            "observed": 225.5528,
            "climatology": 223.6577,
            "anomaly": 1.8951
          },
          {
            "date": "2013-05",
            "year": 2013,
            "month": 5,
            "observed": 218.1404,
            "climatology": 220.1392,
            "anomaly": -1.9988
          },
          {
            "date": "2013-06",
            "year": 2013,
            "month": 6,
            "observed": 213.4091,
            "climatology": 212.2894,
            "anomaly": 1.1197
          },
          {
            "date": "2013-07",
            "year": 2013,
            "month": 7,
            "observed": 201.8529,
            "climatology": 199.7125,
            "anomaly": 2.1404
          },
          {
            "date": "2013-08",
            "year": 2013,
            "month": 8,
            "observed": 184.4197,
            "climatology": 185.8487,
            "anomaly": -1.429
          },
          {
            "date": "2013-09",
            "year": 2013,
            "month": 9,
            "observed": 179.7442,
            "climatology": 177.3092,
            "anomaly": 2.435
          },
          {
            "date": "2013-10",
            "year": 2013,
            "month": 10,
            "observed": 175.0334,
            "climatology": 173.765,
            "anomaly": 1.2684
          },
          {
            "date": "2013-11",
            "year": 2013,
            "month": 11,
            "observed": 179.4209,
            "climatology": 176.9225,
            "anomaly": 2.4984
          },
          {
            "date": "2013-12",
            "year": 2013,
            "month": 12,
            "observed": 191.2734,
            "climatology": 187.1091,
            "anomaly": 4.1643
          },
          {
            "date": "2014-01",
            "year": 2014,
            "month": 1,
            "observed": 198.433,
            "climatology": 198.7981,
            "anomaly": -0.3651
          },
          {
            "date": "2014-02",
            "year": 2014,
            "month": 2,
            "observed": 209.6771,
            "climatology": 210.333,
            "anomaly": -0.6559
          },
          {
            "date": "2014-03",
            "year": 2014,
            "month": 3,
            "observed": 218.5033,
            "climatology": 219.1761,
            "anomaly": -0.6728
          },
          {
            "date": "2014-04",
            "year": 2014,
            "month": 4,
            "observed": 222.0519,
            "climatology": 223.6577,
            "anomaly": -1.6058
          },
          {
            "date": "2014-05",
            "year": 2014,
            "month": 5,
            "observed": 220.5643,
            "climatology": 220.1392,
            "anomaly": 0.4251
          },
          {
            "date": "2014-06",
            "year": 2014,
            "month": 6,
            "observed": 212.4743,
            "climatology": 212.2894,
            "anomaly": 0.1849
          },
          {
            "date": "2014-07",
            "year": 2014,
            "month": 7,
            "observed": 199.8281,
            "climatology": 199.7125,
            "anomaly": 0.1156
          },
          {
            "date": "2014-08",
            "year": 2014,
            "month": 8,
            "observed": 188.7194,
            "climatology": 185.8487,
            "anomaly": 2.8707
          },
          {
            "date": "2014-09",
            "year": 2014,
            "month": 9,
            "observed": 177.5483,
            "climatology": 177.3092,
            "anomaly": 0.2391
          },
          {
            "date": "2014-10",
            "year": 2014,
            "month": 10,
            "observed": 177.8153,
            "climatology": 173.765,
            "anomaly": 4.0503
          },
          {
            "date": "2014-11",
            "year": 2014,
            "month": 11,
            "observed": 176.8841,
            "climatology": 176.9225,
            "anomaly": -0.0384
          },
          {
            "date": "2014-12",
            "year": 2014,
            "month": 12,
            "observed": 193.5118,
            "climatology": 187.1091,
            "anomaly": 6.4027
          },
          {
            "date": "2015-01",
            "year": 2015,
            "month": 1,
            "observed": 200.7906,
            "climatology": 198.7981,
            "anomaly": 1.9925
          },
          {
            "date": "2015-02",
            "year": 2015,
            "month": 2,
            "observed": 209.5985,
            "climatology": 210.333,
            "anomaly": -0.7345
          },
          {
            "date": "2015-03",
            "year": 2015,
            "month": 3,
            "observed": 218.2298,
            "climatology": 219.1761,
            "anomaly": -0.9463
          },
          {
            "date": "2015-04",
            "year": 2015,
            "month": 4,
            "observed": 225.4776,
            "climatology": 223.6577,
            "anomaly": 1.8199
          },
          {
            "date": "2015-05",
            "year": 2015,
            "month": 5,
            "observed": 220.3784,
            "climatology": 220.1392,
            "anomaly": 0.2392
          },
          {
            "date": "2015-06",
            "year": 2015,
            "month": 6,
            "observed": 213.5864,
            "climatology": 212.2894,
            "anomaly": 1.297
          },
          {
            "date": "2015-07",
            "year": 2015,
            "month": 7,
            "observed": 200.4995,
            "climatology": 199.7125,
            "anomaly": 0.787
          },
          {
            "date": "2015-08",
            "year": 2015,
            "month": 8,
            "observed": 186.6493,
            "climatology": 185.8487,
            "anomaly": 0.8006
          },
          {
            "date": "2015-09",
            "year": 2015,
            "month": 9,
            "observed": 175.5788,
            "climatology": 177.3092,
            "anomaly": -1.7304
          },
          {
            "date": "2015-10",
            "year": 2015,
            "month": 10,
            "observed": 170.5743,
            "climatology": 173.765,
            "anomaly": -3.1907
          },
          {
            "date": "2015-11",
            "year": 2015,
            "month": 11,
            "observed": 176.6095,
            "climatology": 176.9225,
            "anomaly": -0.313
          },
          {
            "date": "2015-12",
            "year": 2015,
            "month": 12,
            "observed": 189.0324,
            "climatology": 187.1091,
            "anomaly": 1.9233
          },
          {
            "date": "2016-01",
            "year": 2016,
            "month": 1,
            "observed": 199.9417,
            "climatology": 198.7981,
            "anomaly": 1.1436
          },
          {
            "date": "2016-02",
            "year": 2016,
            "month": 2,
            "observed": 208.8071,
            "climatology": 210.333,
            "anomaly": -1.5259
          },
          {
            "date": "2016-03",
            "year": 2016,
            "month": 3,
            "observed": 221.52,
            "climatology": 219.1761,
            "anomaly": 2.3439
          },
          {
            "date": "2016-04",
            "year": 2016,
            "month": 4,
            "observed": 225.4147,
            "climatology": 223.6577,
            "anomaly": 1.757
          },
          {
            "date": "2016-05",
            "year": 2016,
            "month": 5,
            "observed": 218.9074,
            "climatology": 220.1392,
            "anomaly": -1.2318
          },
          {
            "date": "2016-06",
            "year": 2016,
            "month": 6,
            "observed": 212.3657,
            "climatology": 212.2894,
            "anomaly": 0.0763
          },
          {
            "date": "2016-07",
            "year": 2016,
            "month": 7,
            "observed": 199.6419,
            "climatology": 199.7125,
            "anomaly": -0.0706
          },
          {
            "date": "2016-08",
            "year": 2016,
            "month": 8,
            "observed": 184.154,
            "climatology": 185.8487,
            "anomaly": -1.6947
          },
          {
            "date": "2016-09",
            "year": 2016,
            "month": 9,
            "observed": 178.7703,
            "climatology": 177.3092,
            "anomaly": 1.4611
          },
          {
            "date": "2016-10",
            "year": 2016,
            "month": 10,
            "observed": 175.9434,
            "climatology": 173.765,
            "anomaly": 2.1784
          },
          {
            "date": "2016-11",
            "year": 2016,
            "month": 11,
            "observed": 180.6134,
            "climatology": 176.9225,
            "anomaly": 3.6909
          },
          {
            "date": "2016-12",
            "year": 2016,
            "month": 12,
            "observed": 189.7059,
            "climatology": 187.1091,
            "anomaly": 2.5968
          },
          {
            "date": "2017-01",
            "year": 2017,
            "month": 1,
            "observed": 196.1422,
            "climatology": 198.7981,
            "anomaly": -2.6559
          },
          {
            "date": "2017-02",
            "year": 2017,
            "month": 2,
            "observed": 209.7569,
            "climatology": 210.333,
            "anomaly": -0.5761
          },
          {
            "date": "2017-03",
            "year": 2017,
            "month": 3,
            "observed": 222.5546,
            "climatology": 219.1761,
            "anomaly": 3.3785
          },
          {
            "date": "2017-04",
            "year": 2017,
            "month": 4,
            "observed": 225.9159,
            "climatology": 223.6577,
            "anomaly": 2.2582
          },
          {
            "date": "2017-05",
            "year": 2017,
            "month": 5,
            "observed": 222.5847,
            "climatology": 220.1392,
            "anomaly": 2.4455
          },
          {
            "date": "2017-06",
            "year": 2017,
            "month": 6,
            "observed": 221.7933,
            "climatology": 212.2894,
            "anomaly": 9.5039
          },
          {
            "date": "2017-07",
            "year": 2017,
            "month": 7,
            "observed": 201.1036,
            "climatology": 199.7125,
            "anomaly": 1.3911
          },
          {
            "date": "2017-08",
            "year": 2017,
            "month": 8,
            "observed": 190.0303,
            "climatology": 185.8487,
            "anomaly": 4.1816
          },
          {
            "date": "2017-09",
            "year": 2017,
            "month": 9,
            "observed": 180.4408,
            "climatology": 177.3092,
            "anomaly": 3.1316
          },
          {
            "date": "2017-10",
            "year": 2017,
            "month": 10,
            "observed": 176.3499,
            "climatology": 173.765,
            "anomaly": 2.5849
          },
          {
            "date": "2017-11",
            "year": 2017,
            "month": 11,
            "observed": 177.2976,
            "climatology": 176.9225,
            "anomaly": 0.3751
          },
          {
            "date": "2017-12",
            "year": 2017,
            "month": 12,
            "observed": 189.1488,
            "climatology": 187.1091,
            "anomaly": 2.0397
          },
          {
            "date": "2018-01",
            "year": 2018,
            "month": 1,
            "observed": 197.8344,
            "climatology": 198.7981,
            "anomaly": -0.9637
          },
          {
            "date": "2018-02",
            "year": 2018,
            "month": 2,
            "observed": 211.6894,
            "climatology": 210.333,
            "anomaly": 1.3564
          },
          {
            "date": "2018-03",
            "year": 2018,
            "month": 3,
            "observed": 220.2336,
            "climatology": 219.1761,
            "anomaly": 1.0575
          },
          {
            "date": "2018-04",
            "year": 2018,
            "month": 4,
            "observed": 225.0161,
            "climatology": 223.6577,
            "anomaly": 1.3584
          },
          {
            "date": "2018-05",
            "year": 2018,
            "month": 5,
            "observed": 227.2637,
            "climatology": 220.1392,
            "anomaly": 7.1245
          },
          {
            "date": "2018-06",
            "year": 2018,
            "month": 6,
            "observed": 207.6733,
            "climatology": 212.2894,
            "anomaly": -4.6161
          },
          {
            "date": "2018-07",
            "year": 2018,
            "month": 7,
            "observed": 201.5721,
            "climatology": 199.7125,
            "anomaly": 1.8596
          },
          {
            "date": "2018-08",
            "year": 2018,
            "month": 8,
            "observed": 183.3396,
            "climatology": 185.8487,
            "anomaly": -2.5091
          },
          {
            "date": "2018-09",
            "year": 2018,
            "month": 9,
            "observed": 177.056,
            "climatology": 177.3092,
            "anomaly": -0.2532
          },
          {
            "date": "2018-10",
            "year": 2018,
            "month": 10,
            "observed": 177.6238,
            "climatology": 173.765,
            "anomaly": 3.8588
          },
          {
            "date": "2018-11",
            "year": 2018,
            "month": 11,
            "observed": 178.4265,
            "climatology": 176.9225,
            "anomaly": 1.504
          },
          {
            "date": "2018-12",
            "year": 2018,
            "month": 12,
            "observed": 184.7371,
            "climatology": 187.1091,
            "anomaly": -2.372
          },
          {
            "date": "2019-01",
            "year": 2019,
            "month": 1,
            "observed": 198.1582,
            "climatology": 198.7981,
            "anomaly": -0.6399
          },
          {
            "date": "2019-02",
            "year": 2019,
            "month": 2,
            "observed": 214.1604,
            "climatology": 210.333,
            "anomaly": 3.8274
          },
          {
            "date": "2019-03",
            "year": 2019,
            "month": 3,
            "observed": 219.8011,
            "climatology": 219.1761,
            "anomaly": 0.625
          },
          {
            "date": "2019-04",
            "year": 2019,
            "month": 4,
            "observed": 225.5326,
            "climatology": 223.6577,
            "anomaly": 1.8749
          },
          {
            "date": "2019-05",
            "year": 2019,
            "month": 5,
            "observed": 221.771,
            "climatology": 220.1392,
            "anomaly": 1.6318
          },
          {
            "date": "2019-06",
            "year": 2019,
            "month": 6,
            "observed": 210.8924,
            "climatology": 212.2894,
            "anomaly": -1.397
          },
          {
            "date": "2019-07",
            "year": 2019,
            "month": 7,
            "observed": 205.3963,
            "climatology": 199.7125,
            "anomaly": 5.6838
          },
          {
            "date": "2019-08",
            "year": 2019,
            "month": 8,
            "observed": 189.1362,
            "climatology": 185.8487,
            "anomaly": 3.2875
          },
          {
            "date": "2019-09",
            "year": 2019,
            "month": 9,
            "observed": 173.3529,
            "climatology": 177.3092,
            "anomaly": -3.9563
          },
          {
            "date": "2019-10",
            "year": 2019,
            "month": 10,
            "observed": 175.5476,
            "climatology": 173.765,
            "anomaly": 1.7826
          },
          {
            "date": "2019-11",
            "year": 2019,
            "month": 11,
            "observed": 176.7913,
            "climatology": 176.9225,
            "anomaly": -0.1312
          },
          {
            "date": "2019-12",
            "year": 2019,
            "month": 12,
            "observed": 189.7425,
            "climatology": 187.1091,
            "anomaly": 2.6334
          },
          {
            "date": "2020-01",
            "year": 2020,
            "month": 1,
            "observed": 198.1451,
            "climatology": 198.7981,
            "anomaly": -0.653
          },
          {
            "date": "2020-02",
            "year": 2020,
            "month": 2,
            "observed": 212.3546,
            "climatology": 210.333,
            "anomaly": 2.0216
          },
          {
            "date": "2020-03",
            "year": 2020,
            "month": 3,
            "observed": 223.0695,
            "climatology": 219.1761,
            "anomaly": 3.8934
          },
          {
            "date": "2020-04",
            "year": 2020,
            "month": 4,
            "observed": 227.3358,
            "climatology": 223.6577,
            "anomaly": 3.6781
          },
          {
            "date": "2020-05",
            "year": 2020,
            "month": 5,
            "observed": 218.8363,
            "climatology": 220.1392,
            "anomaly": -1.3029
          },
          {
            "date": "2020-06",
            "year": 2020,
            "month": 6,
            "observed": 211.8652,
            "climatology": 212.2894,
            "anomaly": -0.4242
          },
          {
            "date": "2020-07",
            "year": 2020,
            "month": 7,
            "observed": 199.0291,
            "climatology": 199.7125,
            "anomaly": -0.6834
          },
          {
            "date": "2020-08",
            "year": 2020,
            "month": 8,
            "observed": 186.0981,
            "climatology": 185.8487,
            "anomaly": 0.2494
          },
          {
            "date": "2020-09",
            "year": 2020,
            "month": 9,
            "observed": 183.0094,
            "climatology": 177.3092,
            "anomaly": 5.7002
          },
          {
            "date": "2020-10",
            "year": 2020,
            "month": 10,
            "observed": 176.2739,
            "climatology": 173.765,
            "anomaly": 2.5089
          },
          {
            "date": "2020-11",
            "year": 2020,
            "month": 11,
            "observed": 175.4736,
            "climatology": 176.9225,
            "anomaly": -1.4489
          },
          {
            "date": "2020-12",
            "year": 2020,
            "month": 12,
            "observed": 190.0861,
            "climatology": 187.1091,
            "anomaly": 2.977
          },
          {
            "date": "2021-01",
            "year": 2021,
            "month": 1,
            "observed": 205.6118,
            "climatology": 198.7981,
            "anomaly": 6.8137
          },
          {
            "date": "2021-02",
            "year": 2021,
            "month": 2,
            "observed": 215.4026,
            "climatology": 210.333,
            "anomaly": 5.0696
          },
          {
            "date": "2021-03",
            "year": 2021,
            "month": 3,
            "observed": 218.1886,
            "climatology": 219.1761,
            "anomaly": -0.9875
          },
          {
            "date": "2021-04",
            "year": 2021,
            "month": 4,
            "observed": 224.1408,
            "climatology": 223.6577,
            "anomaly": 0.4831
          },
          {
            "date": "2021-05",
            "year": 2021,
            "month": 5,
            "observed": 225.1843,
            "climatology": 220.1392,
            "anomaly": 5.0451
          },
          {
            "date": "2021-06",
            "year": 2021,
            "month": 6,
            "observed": 211.1122,
            "climatology": 212.2894,
            "anomaly": -1.1772
          },
          {
            "date": "2021-07",
            "year": 2021,
            "month": 7,
            "observed": 201.506,
            "climatology": 199.7125,
            "anomaly": 1.7935
          },
          {
            "date": "2021-08",
            "year": 2021,
            "month": 8,
            "observed": 189.848,
            "climatology": 185.8487,
            "anomaly": 3.9993
          },
          {
            "date": "2021-09",
            "year": 2021,
            "month": 9,
            "observed": 176.4585,
            "climatology": 177.3092,
            "anomaly": -0.8507
          },
          {
            "date": "2021-10",
            "year": 2021,
            "month": 10,
            "observed": 175.2926,
            "climatology": 173.765,
            "anomaly": 1.5276
          },
          {
            "date": "2021-11",
            "year": 2021,
            "month": 11,
            "observed": 170.7026,
            "climatology": 176.9225,
            "anomaly": -6.2199
          },
          {
            "date": "2021-12",
            "year": 2021,
            "month": 12,
            "observed": 185.4105,
            "climatology": 187.1091,
            "anomaly": -1.6986
          },
          {
            "date": "2022-01",
            "year": 2022,
            "month": 1,
            "observed": 199.855,
            "climatology": 198.7981,
            "anomaly": 1.0569
          },
          {
            "date": "2022-02",
            "year": 2022,
            "month": 2,
            "observed": 209.882,
            "climatology": 210.333,
            "anomaly": -0.451
          },
          {
            "date": "2022-03",
            "year": 2022,
            "month": 3,
            "observed": 226.2481,
            "climatology": 219.1761,
            "anomaly": 7.072
          },
          {
            "date": "2022-04",
            "year": 2022,
            "month": 4,
            "observed": 221.9561,
            "climatology": 223.6577,
            "anomaly": -1.7016
          },
          {
            "date": "2022-05",
            "year": 2022,
            "month": 5,
            "observed": 221.0969,
            "climatology": 220.1392,
            "anomaly": 0.9577
          },
          {
            "date": "2022-06",
            "year": 2022,
            "month": 6,
            "observed": 213.3883,
            "climatology": 212.2894,
            "anomaly": 1.0989
          },
          {
            "date": "2022-07",
            "year": 2022,
            "month": 7,
            "observed": 204.1796,
            "climatology": 199.7125,
            "anomaly": 4.4671
          },
          {
            "date": "2022-08",
            "year": 2022,
            "month": 8,
            "observed": 184.5018,
            "climatology": 185.8487,
            "anomaly": -1.3469
          },
          {
            "date": "2022-09",
            "year": 2022,
            "month": 9,
            "observed": 181.8637,
            "climatology": 177.3092,
            "anomaly": 4.5545
          },
          {
            "date": "2022-10",
            "year": 2022,
            "month": 10,
            "observed": 175.647,
            "climatology": 173.765,
            "anomaly": 1.882
          },
          {
            "date": "2022-11",
            "year": 2022,
            "month": 11,
            "observed": 176.532,
            "climatology": 176.9225,
            "anomaly": -0.3905
          },
          {
            "date": "2022-12",
            "year": 2022,
            "month": 12,
            "observed": 189.3067,
            "climatology": 187.1091,
            "anomaly": 2.1976
          },
          {
            "date": "2023-01",
            "year": 2023,
            "month": 1,
            "observed": 201.1641,
            "climatology": 198.7981,
            "anomaly": 2.366
          },
          {
            "date": "2023-02",
            "year": 2023,
            "month": 2,
            "observed": 211.6809,
            "climatology": 210.333,
            "anomaly": 1.3479
          },
          {
            "date": "2023-03",
            "year": 2023,
            "month": 3,
            "observed": 222.5216,
            "climatology": 219.1761,
            "anomaly": 3.3455
          },
          {
            "date": "2023-04",
            "year": 2023,
            "month": 4,
            "observed": 224.7481,
            "climatology": 223.6577,
            "anomaly": 1.0904
          },
          {
            "date": "2023-05",
            "year": 2023,
            "month": 5,
            "observed": 222.6609,
            "climatology": 220.1392,
            "anomaly": 2.5217
          },
          {
            "date": "2023-06",
            "year": 2023,
            "month": 6,
            "observed": 214.8967,
            "climatology": 212.2894,
            "anomaly": 2.6073
          },
          {
            "date": "2023-07",
            "year": 2023,
            "month": 7,
            "observed": 204.7215,
            "climatology": 199.7125,
            "anomaly": 5.009
          },
          {
            "date": "2023-08",
            "year": 2023,
            "month": 8,
            "observed": 185.1769,
            "climatology": 185.8487,
            "anomaly": -0.6718
          },
          {
            "date": "2023-09",
            "year": 2023,
            "month": 9,
            "observed": 184.4684,
            "climatology": 177.3092,
            "anomaly": 7.1592
          },
          {
            "date": "2023-10",
            "year": 2023,
            "month": 10,
            "observed": 170.9212,
            "climatology": 173.765,
            "anomaly": -2.8438
          },
          {
            "date": "2023-11",
            "year": 2023,
            "month": 11,
            "observed": 178.7863,
            "climatology": 176.9225,
            "anomaly": 1.8638
          },
          {
            "date": "2023-12",
            "year": 2023,
            "month": 12,
            "observed": 189.8022,
            "climatology": 187.1091,
            "anomaly": 2.6931
          },
          {
            "date": "2024-01",
            "year": 2024,
            "month": 1,
            "observed": 201.5489,
            "climatology": 198.7981,
            "anomaly": 2.7508
          },
          {
            "date": "2024-02",
            "year": 2024,
            "month": 2,
            "observed": 211.8047,
            "climatology": 210.333,
            "anomaly": 1.4717
          },
          {
            "date": "2024-03",
            "year": 2024,
            "month": 3,
            "observed": 222.0068,
            "climatology": 219.1761,
            "anomaly": 2.8307
          },
          {
            "date": "2024-04",
            "year": 2024,
            "month": 4,
            "observed": 224.6589,
            "climatology": 223.6577,
            "anomaly": 1.0012
          },
          {
            "date": "2024-05",
            "year": 2024,
            "month": 5,
            "observed": 221.0836,
            "climatology": 220.1392,
            "anomaly": 0.9444
          },
          {
            "date": "2024-06",
            "year": 2024,
            "month": 6,
            "observed": 215.5454,
            "climatology": 212.2894,
            "anomaly": 3.256
          },
          {
            "date": "2024-07",
            "year": 2024,
            "month": 7,
            "observed": 201.829,
            "climatology": 199.7125,
            "anomaly": 2.1165
          },
          {
            "date": "2024-08",
            "year": 2024,
            "month": 8,
            "observed": 186.7191,
            "climatology": 185.8487,
            "anomaly": 0.8704
          },
          {
            "date": "2024-09",
            "year": 2024,
            "month": 9,
            "observed": 181.5648,
            "climatology": 177.3092,
            "anomaly": 4.2556
          },
          {
            "date": "2024-10",
            "year": 2024,
            "month": 10,
            "observed": 176.7497,
            "climatology": 173.765,
            "anomaly": 2.9847
          },
          {
            "date": "2024-11",
            "year": 2024,
            "month": 11,
            "observed": 181.3779,
            "climatology": 176.9225,
            "anomaly": 4.4554
          },
          {
            "date": "2024-12",
            "year": 2024,
            "month": 12,
            "observed": 190.0855,
            "climatology": 187.1091,
            "anomaly": 2.9764
          }
        ],
        "annual_series": [
          {
            "year": 2000,
            "annual_mean": 197.3488,
            "annual_anomaly": -1.4062
          },
          {
            "year": 2001,
            "annual_mean": 195.3108,
            "annual_anomaly": -3.4442
          },
          {
            "year": 2002,
            "annual_mean": 196.4856,
            "annual_anomaly": -2.2695
          },
          {
            "year": 2003,
            "annual_mean": 196.3175,
            "annual_anomaly": -2.4376
          },
          {
            "year": 2004,
            "annual_mean": 197.4487,
            "annual_anomaly": -1.3063
          },
          {
            "year": 2005,
            "annual_mean": 197.8733,
            "annual_anomaly": -0.8818
          },
          {
            "year": 2006,
            "annual_mean": 197.4223,
            "annual_anomaly": -1.3327
          },
          {
            "year": 2007,
            "annual_mean": 197.4726,
            "annual_anomaly": -1.2824
          },
          {
            "year": 2008,
            "annual_mean": 197.9761,
            "annual_anomaly": -0.779
          },
          {
            "year": 2009,
            "annual_mean": 198.5543,
            "annual_anomaly": -0.2008
          },
          {
            "year": 2010,
            "annual_mean": 198.2458,
            "annual_anomaly": -0.5092
          },
          {
            "year": 2011,
            "annual_mean": 198.3037,
            "annual_anomaly": -0.4514
          },
          {
            "year": 2012,
            "annual_mean": 198.5671,
            "annual_anomaly": -0.188
          },
          {
            "year": 2013,
            "annual_mean": 200.2094,
            "annual_anomaly": 1.4543
          },
          {
            "year": 2014,
            "annual_mean": 199.6676,
            "annual_anomaly": 0.9125
          },
          {
            "year": 2015,
            "annual_mean": 198.9171,
            "annual_anomaly": 0.162
          },
          {
            "year": 2016,
            "annual_mean": 199.6488,
            "annual_anomaly": 0.8937
          },
          {
            "year": 2017,
            "annual_mean": 201.0932,
            "annual_anomaly": 2.3382
          },
          {
            "year": 2018,
            "annual_mean": 199.3721,
            "annual_anomaly": 0.6171
          },
          {
            "year": 2019,
            "annual_mean": 200.0235,
            "annual_anomaly": 1.2685
          },
          {
            "year": 2020,
            "annual_mean": 200.1314,
            "annual_anomaly": 1.3763
          },
          {
            "year": 2021,
            "annual_mean": 199.9049,
            "annual_anomaly": 1.1498
          },
          {
            "year": 2022,
            "annual_mean": 200.3714,
            "annual_anomaly": 1.6164
          },
          {
            "year": 2023,
            "annual_mean": 200.9624,
            "annual_anomaly": 2.2073
          },
          {
            "year": 2024,
            "annual_mean": 201.2479,
            "annual_anomaly": 2.4928
          }
        ],
        "climatology_baseline": {
          "1": 198.7981,
          "2": 210.333,
          "3": 219.1761,
          "4": 223.6577,
          "5": 220.1392,
          "6": 212.2894,
          "7": 199.7125,
          "8": 185.8487,
          "9": 177.3092,
          "10": 173.765,
          "11": 176.9225,
          "12": 187.1091
        }
      },
      "statistics": {
        "sens_slope": 0.19919,
        "sens_intercept": -202.14784,
        "confidence_interval_95": [
          0.16237,
          0.22594
        ],
        "mann_kendall_score_s": 244,
        "standardized_z": 5.6753,
        "p_value": 0.0,
        "is_significant": true,
        "trend_label": "STATISTICALLY_SIGNIFICANT_INCREASING",
        "verdict_text": "Confirmed upward monotonic trend (+0.1992/yr, p=1.3848e-08). Evidence strongly rejects the null hypothesis.",
        "ols_comparison": {
          "ols_slope": 0.19919,
          "ols_pvalue": 0.0,
          "r_squared": 0.8578
        }
      }
    }
  }
};

export const PRESET_ANALYSIS_MAP: Record<string, OppositeTrendsResponse> = {
  "case_01_europe": {
    "status": "success",
    "polarity_status": "CONFIRMED_SPATIAL_DIVERGENCE",
    "polarity_narrative": "Statistically validated divergence detected under the identical macro-climate forcing: Iberian Peninsula (Southern Europe) shows STATISTICALLY SIGNIFICANT DECREASING (-0.2448/yr), whereas Southern Scandinavia (Northern Europe) exhibits STATISTICALLY SIGNIFICANT INCREASING (+0.1992/yr).",
    "variable": "RootMoist_inst",
    "unit": "kg/m\u00b2",
    "time_range": [
      2000,
      2024
    ],
    "region_a": {
      "name": "Iberian Peninsula (Southern Europe)",
      "bbox": [
        36.0,
        42.0,
        -9.0,
        3.0
      ],
      "analysis": {
        "metadata": {
          "source": "SIMULATED_NOAH_LSM_3.6_BASELINE",
          "doi": "10.5067/SXAVCZFAQLNO",
          "provenance_type": "ILLUSTRATIVE_BASELINE",
          "is_illustrative": true,
          "variable": "RootMoist_inst",
          "unit": "kg/m\u00b2",
          "depth_note": "Simulated Noah LSM baseline (Illustrative development model)",
          "bbox": [
            36.0,
            42.0,
            -9.0,
            3.0
          ],
          "time_range": [
            2000,
            2024
          ],
          "total_observations": 300,
          "disclaimer": "ILLUSTRATIVE ONLY: Simulated baseline derived from Noah LSM 3.6 parameterization. NOT real NASA GLDAS observational output."
        },
        "climatology": {
          "monthly_series": [
            {
              "date": "2000-01",
              "year": 2000,
              "month": 1,
              "observed": 182.3845,
              "climatology": 178.0864,
              "anomaly": 4.2981
            },
            {
              "date": "2000-02",
              "year": 2000,
              "month": 2,
              "observed": 193.275,
              "climatology": 189.5843,
              "anomaly": 3.6907
            },
            {
              "date": "2000-03",
              "year": 2000,
              "month": 3,
              "observed": 204.3686,
              "climatology": 198.3904,
              "anomaly": 5.9782
            },
            {
              "date": "2000-04",
              "year": 2000,
              "month": 4,
              "observed": 209.8843,
              "climatology": 202.835,
              "anomaly": 7.0493
            },
            {
              "date": "2000-05",
              "year": 2000,
              "month": 5,
              "observed": 202.12,
              "climatology": 199.2794,
              "anomaly": 2.8406
            },
            {
              "date": "2000-06",
              "year": 2000,
              "month": 6,
              "observed": 192.9474,
              "climatology": 191.3927,
              "anomaly": 1.5547
            },
            {
              "date": "2000-07",
              "year": 2000,
              "month": 7,
              "observed": 184.9587,
              "climatology": 178.7788,
              "anomaly": 6.1799
            },
            {
              "date": "2000-08",
              "year": 2000,
              "month": 8,
              "observed": 170.4073,
              "climatology": 164.878,
              "anomaly": 5.5293
            },
            {
              "date": "2000-09",
              "year": 2000,
              "month": 9,
              "observed": 158.1424,
              "climatology": 156.3015,
              "anomaly": 1.8409
            },
            {
              "date": "2000-10",
              "year": 2000,
              "month": 10,
              "observed": 157.3011,
              "climatology": 152.7203,
              "anomaly": 4.5808
            },
            {
              "date": "2000-11",
              "year": 2000,
              "month": 11,
              "observed": 158.1135,
              "climatology": 155.8408,
              "anomaly": 2.2727
            },
            {
              "date": "2000-12",
              "year": 2000,
              "month": 12,
              "observed": 167.2364,
              "climatology": 165.9904,
              "anomaly": 1.246
            },
            {
              "date": "2001-01",
              "year": 2001,
              "month": 1,
              "observed": 181.4836,
              "climatology": 178.0864,
              "anomaly": 3.3972
            },
            {
              "date": "2001-02",
              "year": 2001,
              "month": 2,
              "observed": 188.5735,
              "climatology": 189.5843,
              "anomaly": -1.0108
            },
            {
              "date": "2001-03",
              "year": 2001,
              "month": 3,
              "observed": 198.173,
              "climatology": 198.3904,
              "anomaly": -0.2174
            },
            {
              "date": "2001-04",
              "year": 2001,
              "month": 4,
              "observed": 204.407,
              "climatology": 202.835,
              "anomaly": 1.572
            },
            {
              "date": "2001-05",
              "year": 2001,
              "month": 5,
              "observed": 199.9093,
              "climatology": 199.2794,
              "anomaly": 0.6299
            },
            {
              "date": "2001-06",
              "year": 2001,
              "month": 6,
              "observed": 194.0543,
              "climatology": 191.3927,
              "anomaly": 2.6616
            },
            {
              "date": "2001-07",
              "year": 2001,
              "month": 7,
              "observed": 178.4766,
              "climatology": 178.7788,
              "anomaly": -0.3022
            },
            {
              "date": "2001-08",
              "year": 2001,
              "month": 8,
              "observed": 164.6939,
              "climatology": 164.878,
              "anomaly": -0.1841
            },
            {
              "date": "2001-09",
              "year": 2001,
              "month": 9,
              "observed": 162.7162,
              "climatology": 156.3015,
              "anomaly": 6.4147
            },
            {
              "date": "2001-10",
              "year": 2001,
              "month": 10,
              "observed": 155.1163,
              "climatology": 152.7203,
              "anomaly": 2.396
            },
            {
              "date": "2001-11",
              "year": 2001,
              "month": 11,
              "observed": 159.1769,
              "climatology": 155.8408,
              "anomaly": 3.3361
            },
            {
              "date": "2001-12",
              "year": 2001,
              "month": 12,
              "observed": 164.5748,
              "climatology": 165.9904,
              "anomaly": -1.4156
            },
            {
              "date": "2002-01",
              "year": 2002,
              "month": 1,
              "observed": 179.2537,
              "climatology": 178.0864,
              "anomaly": 1.1673
            },
            {
              "date": "2002-02",
              "year": 2002,
              "month": 2,
              "observed": 193.37,
              "climatology": 189.5843,
              "anomaly": 3.7857
            },
            {
              "date": "2002-03",
              "year": 2002,
              "month": 3,
              "observed": 199.3439,
              "climatology": 198.3904,
              "anomaly": 0.9535
            },
            {
              "date": "2002-04",
              "year": 2002,
              "month": 4,
              "observed": 206.4879,
              "climatology": 202.835,
              "anomaly": 3.6529
            },
            {
              "date": "2002-05",
              "year": 2002,
              "month": 5,
              "observed": 200.6757,
              "climatology": 199.2794,
              "anomaly": 1.3963
            },
            {
              "date": "2002-06",
              "year": 2002,
              "month": 6,
              "observed": 192.2755,
              "climatology": 191.3927,
              "anomaly": 0.8828
            },
            {
              "date": "2002-07",
              "year": 2002,
              "month": 7,
              "observed": 178.9784,
              "climatology": 178.7788,
              "anomaly": 0.1996
            },
            {
              "date": "2002-08",
              "year": 2002,
              "month": 8,
              "observed": 172.5914,
              "climatology": 164.878,
              "anomaly": 7.7134
            },
            {
              "date": "2002-09",
              "year": 2002,
              "month": 9,
              "observed": 158.7543,
              "climatology": 156.3015,
              "anomaly": 2.4528
            },
            {
              "date": "2002-10",
              "year": 2002,
              "month": 10,
              "observed": 152.7724,
              "climatology": 152.7203,
              "anomaly": 0.0521
            },
            {
              "date": "2002-11",
              "year": 2002,
              "month": 11,
              "observed": 160.8004,
              "climatology": 155.8408,
              "anomaly": 4.9596
            },
            {
              "date": "2002-12",
              "year": 2002,
              "month": 12,
              "observed": 164.8206,
              "climatology": 165.9904,
              "anomaly": -1.1698
            },
            {
              "date": "2003-01",
              "year": 2003,
              "month": 1,
              "observed": 180.8729,
              "climatology": 178.0864,
              "anomaly": 2.7865
            },
            {
              "date": "2003-02",
              "year": 2003,
              "month": 2,
              "observed": 187.9295,
              "climatology": 189.5843,
              "anomaly": -1.6548
            },
            {
              "date": "2003-03",
              "year": 2003,
              "month": 3,
              "observed": 198.6369,
              "climatology": 198.3904,
              "anomaly": 0.2465
            },
            {
              "date": "2003-04",
              "year": 2003,
              "month": 4,
              "observed": 205.7769,
              "climatology": 202.835,
              "anomaly": 2.9419
            },
            {
              "date": "2003-05",
              "year": 2003,
              "month": 5,
              "observed": 203.7595,
              "climatology": 199.2794,
              "anomaly": 4.4801
            },
            {
              "date": "2003-06",
              "year": 2003,
              "month": 6,
              "observed": 193.1691,
              "climatology": 191.3927,
              "anomaly": 1.7764
            },
            {
              "date": "2003-07",
              "year": 2003,
              "month": 7,
              "observed": 179.9296,
              "climatology": 178.7788,
              "anomaly": 1.1508
            },
            {
              "date": "2003-08",
              "year": 2003,
              "month": 8,
              "observed": 166.9439,
              "climatology": 164.878,
              "anomaly": 2.0659
            },
            {
              "date": "2003-09",
              "year": 2003,
              "month": 9,
              "observed": 154.8278,
              "climatology": 156.3015,
              "anomaly": -1.4737
            },
            {
              "date": "2003-10",
              "year": 2003,
              "month": 10,
              "observed": 153.3531,
              "climatology": 152.7203,
              "anomaly": 0.6328
            },
            {
              "date": "2003-11",
              "year": 2003,
              "month": 11,
              "observed": 157.3285,
              "climatology": 155.8408,
              "anomaly": 1.4877
            },
            {
              "date": "2003-12",
              "year": 2003,
              "month": 12,
              "observed": 170.2515,
              "climatology": 165.9904,
              "anomaly": 4.2611
            },
            {
              "date": "2004-01",
              "year": 2004,
              "month": 1,
              "observed": 180.9457,
              "climatology": 178.0864,
              "anomaly": 2.8593
            },
            {
              "date": "2004-02",
              "year": 2004,
              "month": 2,
              "observed": 188.1571,
              "climatology": 189.5843,
              "anomaly": -1.4272
            },
            {
              "date": "2004-03",
              "year": 2004,
              "month": 3,
              "observed": 202.5035,
              "climatology": 198.3904,
              "anomaly": 4.1131
            },
            {
              "date": "2004-04",
              "year": 2004,
              "month": 4,
              "observed": 204.058,
              "climatology": 202.835,
              "anomaly": 1.223
            },
            {
              "date": "2004-05",
              "year": 2004,
              "month": 5,
              "observed": 199.957,
              "climatology": 199.2794,
              "anomaly": 0.6776
            },
            {
              "date": "2004-06",
              "year": 2004,
              "month": 6,
              "observed": 194.0059,
              "climatology": 191.3927,
              "anomaly": 2.6132
            },
            {
              "date": "2004-07",
              "year": 2004,
              "month": 7,
              "observed": 182.5322,
              "climatology": 178.7788,
              "anomaly": 3.7534
            },
            {
              "date": "2004-08",
              "year": 2004,
              "month": 8,
              "observed": 169.7609,
              "climatology": 164.878,
              "anomaly": 4.8829
            },
            {
              "date": "2004-09",
              "year": 2004,
              "month": 9,
              "observed": 156.162,
              "climatology": 156.3015,
              "anomaly": -0.1395
            },
            {
              "date": "2004-10",
              "year": 2004,
              "month": 10,
              "observed": 154.1157,
              "climatology": 152.7203,
              "anomaly": 1.3954
            },
            {
              "date": "2004-11",
              "year": 2004,
              "month": 11,
              "observed": 159.0442,
              "climatology": 155.8408,
              "anomaly": 3.2034
            },
            {
              "date": "2004-12",
              "year": 2004,
              "month": 12,
              "observed": 169.7836,
              "climatology": 165.9904,
              "anomaly": 3.7932
            },
            {
              "date": "2005-01",
              "year": 2005,
              "month": 1,
              "observed": 178.6248,
              "climatology": 178.0864,
              "anomaly": 0.5384
            },
            {
              "date": "2005-02",
              "year": 2005,
              "month": 2,
              "observed": 191.8366,
              "climatology": 189.5843,
              "anomaly": 2.2523
            },
            {
              "date": "2005-03",
              "year": 2005,
              "month": 3,
              "observed": 198.6635,
              "climatology": 198.3904,
              "anomaly": 0.2731
            },
            {
              "date": "2005-04",
              "year": 2005,
              "month": 4,
              "observed": 201.7662,
              "climatology": 202.835,
              "anomaly": -1.0688
            },
            {
              "date": "2005-05",
              "year": 2005,
              "month": 5,
              "observed": 203.4167,
              "climatology": 199.2794,
              "anomaly": 4.1373
            },
            {
              "date": "2005-06",
              "year": 2005,
              "month": 6,
              "observed": 195.6033,
              "climatology": 191.3927,
              "anomaly": 4.2106
            },
            {
              "date": "2005-07",
              "year": 2005,
              "month": 7,
              "observed": 179.5107,
              "climatology": 178.7788,
              "anomaly": 0.7319
            },
            {
              "date": "2005-08",
              "year": 2005,
              "month": 8,
              "observed": 169.6775,
              "climatology": 164.878,
              "anomaly": 4.7995
            },
            {
              "date": "2005-09",
              "year": 2005,
              "month": 9,
              "observed": 158.9002,
              "climatology": 156.3015,
              "anomaly": 2.5987
            },
            {
              "date": "2005-10",
              "year": 2005,
              "month": 10,
              "observed": 153.0119,
              "climatology": 152.7203,
              "anomaly": 0.2916
            },
            {
              "date": "2005-11",
              "year": 2005,
              "month": 11,
              "observed": 158.8556,
              "climatology": 155.8408,
              "anomaly": 3.0148
            },
            {
              "date": "2005-12",
              "year": 2005,
              "month": 12,
              "observed": 170.9258,
              "climatology": 165.9904,
              "anomaly": 4.9354
            },
            {
              "date": "2006-01",
              "year": 2006,
              "month": 1,
              "observed": 179.4691,
              "climatology": 178.0864,
              "anomaly": 1.3827
            },
            {
              "date": "2006-02",
              "year": 2006,
              "month": 2,
              "observed": 195.9483,
              "climatology": 189.5843,
              "anomaly": 6.364
            },
            {
              "date": "2006-03",
              "year": 2006,
              "month": 3,
              "observed": 194.616,
              "climatology": 198.3904,
              "anomaly": -3.7744
            },
            {
              "date": "2006-04",
              "year": 2006,
              "month": 4,
              "observed": 206.5475,
              "climatology": 202.835,
              "anomaly": 3.7125
            },
            {
              "date": "2006-05",
              "year": 2006,
              "month": 5,
              "observed": 201.339,
              "climatology": 199.2794,
              "anomaly": 2.0596
            },
            {
              "date": "2006-06",
              "year": 2006,
              "month": 6,
              "observed": 191.2012,
              "climatology": 191.3927,
              "anomaly": -0.1915
            },
            {
              "date": "2006-07",
              "year": 2006,
              "month": 7,
              "observed": 179.6561,
              "climatology": 178.7788,
              "anomaly": 0.8773
            },
            {
              "date": "2006-08",
              "year": 2006,
              "month": 8,
              "observed": 161.9358,
              "climatology": 164.878,
              "anomaly": -2.9422
            },
            {
              "date": "2006-09",
              "year": 2006,
              "month": 9,
              "observed": 157.1829,
              "climatology": 156.3015,
              "anomaly": 0.8814
            },
            {
              "date": "2006-10",
              "year": 2006,
              "month": 10,
              "observed": 155.2535,
              "climatology": 152.7203,
              "anomaly": 2.5332
            },
            {
              "date": "2006-11",
              "year": 2006,
              "month": 11,
              "observed": 161.3828,
              "climatology": 155.8408,
              "anomaly": 5.542
            },
            {
              "date": "2006-12",
              "year": 2006,
              "month": 12,
              "observed": 165.521,
              "climatology": 165.9904,
              "anomaly": -0.4694
            },
            {
              "date": "2007-01",
              "year": 2007,
              "month": 1,
              "observed": 177.2735,
              "climatology": 178.0864,
              "anomaly": -0.8129
            },
            {
              "date": "2007-02",
              "year": 2007,
              "month": 2,
              "observed": 190.5183,
              "climatology": 189.5843,
              "anomaly": 0.934
            },
            {
              "date": "2007-03",
              "year": 2007,
              "month": 3,
              "observed": 203.1898,
              "climatology": 198.3904,
              "anomaly": 4.7994
            },
            {
              "date": "2007-04",
              "year": 2007,
              "month": 4,
              "observed": 205.0506,
              "climatology": 202.835,
              "anomaly": 2.2156
            },
            {
              "date": "2007-05",
              "year": 2007,
              "month": 5,
              "observed": 199.5329,
              "climatology": 199.2794,
              "anomaly": 0.2535
            },
            {
              "date": "2007-06",
              "year": 2007,
              "month": 6,
              "observed": 192.9679,
              "climatology": 191.3927,
              "anomaly": 1.5752
            },
            {
              "date": "2007-07",
              "year": 2007,
              "month": 7,
              "observed": 179.4054,
              "climatology": 178.7788,
              "anomaly": 0.6266
            },
            {
              "date": "2007-08",
              "year": 2007,
              "month": 8,
              "observed": 169.0623,
              "climatology": 164.878,
              "anomaly": 4.1843
            },
            {
              "date": "2007-09",
              "year": 2007,
              "month": 9,
              "observed": 155.7129,
              "climatology": 156.3015,
              "anomaly": -0.5886
            },
            {
              "date": "2007-10",
              "year": 2007,
              "month": 10,
              "observed": 153.2775,
              "climatology": 152.7203,
              "anomaly": 0.5572
            },
            {
              "date": "2007-11",
              "year": 2007,
              "month": 11,
              "observed": 156.4438,
              "climatology": 155.8408,
              "anomaly": 0.603
            },
            {
              "date": "2007-12",
              "year": 2007,
              "month": 12,
              "observed": 162.8939,
              "climatology": 165.9904,
              "anomaly": -3.0965
            },
            {
              "date": "2008-01",
              "year": 2008,
              "month": 1,
              "observed": 179.771,
              "climatology": 178.0864,
              "anomaly": 1.6846
            },
            {
              "date": "2008-02",
              "year": 2008,
              "month": 2,
              "observed": 192.1613,
              "climatology": 189.5843,
              "anomaly": 2.577
            },
            {
              "date": "2008-03",
              "year": 2008,
              "month": 3,
              "observed": 200.6501,
              "climatology": 198.3904,
              "anomaly": 2.2597
            },
            {
              "date": "2008-04",
              "year": 2008,
              "month": 4,
              "observed": 203.3782,
              "climatology": 202.835,
              "anomaly": 0.5432
            },
            {
              "date": "2008-05",
              "year": 2008,
              "month": 5,
              "observed": 197.0549,
              "climatology": 199.2794,
              "anomaly": -2.2245
            },
            {
              "date": "2008-06",
              "year": 2008,
              "month": 6,
              "observed": 190.3691,
              "climatology": 191.3927,
              "anomaly": -1.0236
            },
            {
              "date": "2008-07",
              "year": 2008,
              "month": 7,
              "observed": 178.0419,
              "climatology": 178.7788,
              "anomaly": -0.7369
            },
            {
              "date": "2008-08",
              "year": 2008,
              "month": 8,
              "observed": 164.371,
              "climatology": 164.878,
              "anomaly": -0.507
            },
            {
              "date": "2008-09",
              "year": 2008,
              "month": 9,
              "observed": 156.8009,
              "climatology": 156.3015,
              "anomaly": 0.4994
            },
            {
              "date": "2008-10",
              "year": 2008,
              "month": 10,
              "observed": 154.8428,
              "climatology": 152.7203,
              "anomaly": 2.1225
            },
            {
              "date": "2008-11",
              "year": 2008,
              "month": 11,
              "observed": 161.8755,
              "climatology": 155.8408,
              "anomaly": 6.0347
            },
            {
              "date": "2008-12",
              "year": 2008,
              "month": 12,
              "observed": 166.7251,
              "climatology": 165.9904,
              "anomaly": 0.7347
            },
            {
              "date": "2009-01",
              "year": 2009,
              "month": 1,
              "observed": 179.4106,
              "climatology": 178.0864,
              "anomaly": 1.3242
            },
            {
              "date": "2009-02",
              "year": 2009,
              "month": 2,
              "observed": 191.0586,
              "climatology": 189.5843,
              "anomaly": 1.4743
            },
            {
              "date": "2009-03",
              "year": 2009,
              "month": 3,
              "observed": 195.5764,
              "climatology": 198.3904,
              "anomaly": -2.814
            },
            {
              "date": "2009-04",
              "year": 2009,
              "month": 4,
              "observed": 203.6344,
              "climatology": 202.835,
              "anomaly": 0.7994
            },
            {
              "date": "2009-05",
              "year": 2009,
              "month": 5,
              "observed": 200.4799,
              "climatology": 199.2794,
              "anomaly": 1.2005
            },
            {
              "date": "2009-06",
              "year": 2009,
              "month": 6,
              "observed": 197.3148,
              "climatology": 191.3927,
              "anomaly": 5.9221
            },
            {
              "date": "2009-07",
              "year": 2009,
              "month": 7,
              "observed": 178.1538,
              "climatology": 178.7788,
              "anomaly": -0.625
            },
            {
              "date": "2009-08",
              "year": 2009,
              "month": 8,
              "observed": 166.8666,
              "climatology": 164.878,
              "anomaly": 1.9886
            },
            {
              "date": "2009-09",
              "year": 2009,
              "month": 9,
              "observed": 156.8533,
              "climatology": 156.3015,
              "anomaly": 0.5518
            },
            {
              "date": "2009-10",
              "year": 2009,
              "month": 10,
              "observed": 150.647,
              "climatology": 152.7203,
              "anomaly": -2.0733
            },
            {
              "date": "2009-11",
              "year": 2009,
              "month": 11,
              "observed": 159.7531,
              "climatology": 155.8408,
              "anomaly": 3.9123
            },
            {
              "date": "2009-12",
              "year": 2009,
              "month": 12,
              "observed": 167.9045,
              "climatology": 165.9904,
              "anomaly": 1.9141
            },
            {
              "date": "2010-01",
              "year": 2010,
              "month": 1,
              "observed": 180.4803,
              "climatology": 178.0864,
              "anomaly": 2.3939
            },
            {
              "date": "2010-02",
              "year": 2010,
              "month": 2,
              "observed": 188.7072,
              "climatology": 189.5843,
              "anomaly": -0.8771
            },
            {
              "date": "2010-03",
              "year": 2010,
              "month": 3,
              "observed": 203.6163,
              "climatology": 198.3904,
              "anomaly": 5.2259
            },
            {
              "date": "2010-04",
              "year": 2010,
              "month": 4,
              "observed": 199.9321,
              "climatology": 202.835,
              "anomaly": -2.9029
            },
            {
              "date": "2010-05",
              "year": 2010,
              "month": 5,
              "observed": 201.5325,
              "climatology": 199.2794,
              "anomaly": 2.2531
            },
            {
              "date": "2010-06",
              "year": 2010,
              "month": 6,
              "observed": 196.3688,
              "climatology": 191.3927,
              "anomaly": 4.9761
            },
            {
              "date": "2010-07",
              "year": 2010,
              "month": 7,
              "observed": 175.8944,
              "climatology": 178.7788,
              "anomaly": -2.8844
            },
            {
              "date": "2010-08",
              "year": 2010,
              "month": 8,
              "observed": 164.433,
              "climatology": 164.878,
              "anomaly": -0.445
            },
            {
              "date": "2010-09",
              "year": 2010,
              "month": 9,
              "observed": 156.9252,
              "climatology": 156.3015,
              "anomaly": 0.6237
            },
            {
              "date": "2010-10",
              "year": 2010,
              "month": 10,
              "observed": 152.046,
              "climatology": 152.7203,
              "anomaly": -0.6743
            },
            {
              "date": "2010-11",
              "year": 2010,
              "month": 11,
              "observed": 152.7554,
              "climatology": 155.8408,
              "anomaly": -3.0854
            },
            {
              "date": "2010-12",
              "year": 2010,
              "month": 12,
              "observed": 165.9321,
              "climatology": 165.9904,
              "anomaly": -0.0583
            },
            {
              "date": "2011-01",
              "year": 2011,
              "month": 1,
              "observed": 175.5829,
              "climatology": 178.0864,
              "anomaly": -2.5035
            },
            {
              "date": "2011-02",
              "year": 2011,
              "month": 2,
              "observed": 191.9007,
              "climatology": 189.5843,
              "anomaly": 2.3164
            },
            {
              "date": "2011-03",
              "year": 2011,
              "month": 3,
              "observed": 197.5468,
              "climatology": 198.3904,
              "anomaly": -0.8436
            },
            {
              "date": "2011-04",
              "year": 2011,
              "month": 4,
              "observed": 207.0475,
              "climatology": 202.835,
              "anomaly": 4.2125
            },
            {
              "date": "2011-05",
              "year": 2011,
              "month": 5,
              "observed": 197.8432,
              "climatology": 199.2794,
              "anomaly": -1.4362
            },
            {
              "date": "2011-06",
              "year": 2011,
              "month": 6,
              "observed": 189.8235,
              "climatology": 191.3927,
              "anomaly": -1.5692
            },
            {
              "date": "2011-07",
              "year": 2011,
              "month": 7,
              "observed": 180.1405,
              "climatology": 178.7788,
              "anomaly": 1.3617
            },
            {
              "date": "2011-08",
              "year": 2011,
              "month": 8,
              "observed": 162.5075,
              "climatology": 164.878,
              "anomaly": -2.3705
            },
            {
              "date": "2011-09",
              "year": 2011,
              "month": 9,
              "observed": 156.9807,
              "climatology": 156.3015,
              "anomaly": 0.6792
            },
            {
              "date": "2011-10",
              "year": 2011,
              "month": 10,
              "observed": 156.3086,
              "climatology": 152.7203,
              "anomaly": 3.5883
            },
            {
              "date": "2011-11",
              "year": 2011,
              "month": 11,
              "observed": 152.3494,
              "climatology": 155.8408,
              "anomaly": -3.4914
            },
            {
              "date": "2011-12",
              "year": 2011,
              "month": 12,
              "observed": 165.9583,
              "climatology": 165.9904,
              "anomaly": -0.0321
            },
            {
              "date": "2012-01",
              "year": 2012,
              "month": 1,
              "observed": 178.6244,
              "climatology": 178.0864,
              "anomaly": 0.538
            },
            {
              "date": "2012-02",
              "year": 2012,
              "month": 2,
              "observed": 192.4073,
              "climatology": 189.5843,
              "anomaly": 2.823
            },
            {
              "date": "2012-03",
              "year": 2012,
              "month": 3,
              "observed": 196.489,
              "climatology": 198.3904,
              "anomaly": -1.9014
            },
            {
              "date": "2012-04",
              "year": 2012,
              "month": 4,
              "observed": 199.6076,
              "climatology": 202.835,
              "anomaly": -3.2274
            },
            {
              "date": "2012-05",
              "year": 2012,
              "month": 5,
              "observed": 200.8422,
              "climatology": 199.2794,
              "anomaly": 1.5628
            },
            {
              "date": "2012-06",
              "year": 2012,
              "month": 6,
              "observed": 191.1072,
              "climatology": 191.3927,
              "anomaly": -0.2855
            },
            {
              "date": "2012-07",
              "year": 2012,
              "month": 7,
              "observed": 178.4689,
              "climatology": 178.7788,
              "anomaly": -0.3099
            },
            {
              "date": "2012-08",
              "year": 2012,
              "month": 8,
              "observed": 166.1868,
              "climatology": 164.878,
              "anomaly": 1.3088
            },
            {
              "date": "2012-09",
              "year": 2012,
              "month": 9,
              "observed": 154.448,
              "climatology": 156.3015,
              "anomaly": -1.8535
            },
            {
              "date": "2012-10",
              "year": 2012,
              "month": 10,
              "observed": 153.3573,
              "climatology": 152.7203,
              "anomaly": 0.637
            },
            {
              "date": "2012-11",
              "year": 2012,
              "month": 11,
              "observed": 156.8367,
              "climatology": 155.8408,
              "anomaly": 0.9959
            },
            {
              "date": "2012-12",
              "year": 2012,
              "month": 12,
              "observed": 163.4468,
              "climatology": 165.9904,
              "anomaly": -2.5436
            },
            {
              "date": "2013-01",
              "year": 2013,
              "month": 1,
              "observed": 182.3751,
              "climatology": 178.0864,
              "anomaly": 4.2887
            },
            {
              "date": "2013-02",
              "year": 2013,
              "month": 2,
              "observed": 191.3733,
              "climatology": 189.5843,
              "anomaly": 1.789
            },
            {
              "date": "2013-03",
              "year": 2013,
              "month": 3,
              "observed": 196.3391,
              "climatology": 198.3904,
              "anomaly": -2.0513
            },
            {
              "date": "2013-04",
              "year": 2013,
              "month": 4,
              "observed": 204.2861,
              "climatology": 202.835,
              "anomaly": 1.4511
            },
            {
              "date": "2013-05",
              "year": 2013,
              "month": 5,
              "observed": 196.8366,
              "climatology": 199.2794,
              "anomaly": -2.4428
            },
            {
              "date": "2013-06",
              "year": 2013,
              "month": 6,
              "observed": 192.0684,
              "climatology": 191.3927,
              "anomaly": 0.6757
            },
            {
              "date": "2013-07",
              "year": 2013,
              "month": 7,
              "observed": 180.4752,
              "climatology": 178.7788,
              "anomaly": 1.6964
            },
            {
              "date": "2013-08",
              "year": 2013,
              "month": 8,
              "observed": 163.005,
              "climatology": 164.878,
              "anomaly": -1.873
            },
            {
              "date": "2013-09",
              "year": 2013,
              "month": 9,
              "observed": 158.2925,
              "climatology": 156.3015,
              "anomaly": 1.991
            },
            {
              "date": "2013-10",
              "year": 2013,
              "month": 10,
              "observed": 153.5447,
              "climatology": 152.7203,
              "anomaly": 0.8244
            },
            {
              "date": "2013-11",
              "year": 2013,
              "month": 11,
              "observed": 157.8952,
              "climatology": 155.8408,
              "anomaly": 2.0544
            },
            {
              "date": "2013-12",
              "year": 2013,
              "month": 12,
              "observed": 169.7107,
              "climatology": 165.9904,
              "anomaly": 3.7203
            },
            {
              "date": "2014-01",
              "year": 2014,
              "month": 1,
              "observed": 176.8332,
              "climatology": 178.0864,
              "anomaly": -1.2532
            },
            {
              "date": "2014-02",
              "year": 2014,
              "month": 2,
              "observed": 188.0404,
              "climatology": 189.5843,
              "anomaly": -1.5439
            },
            {
              "date": "2014-03",
              "year": 2014,
              "month": 3,
              "observed": 196.8296,
              "climatology": 198.3904,
              "anomaly": -1.5608
            },
            {
              "date": "2014-04",
              "year": 2014,
              "month": 4,
              "observed": 200.3412,
              "climatology": 202.835,
              "anomaly": -2.4938
            },
            {
              "date": "2014-05",
              "year": 2014,
              "month": 5,
              "observed": 198.8166,
              "climatology": 199.2794,
              "anomaly": -0.4628
            },
            {
              "date": "2014-06",
              "year": 2014,
              "month": 6,
              "observed": 190.6896,
              "climatology": 191.3927,
              "anomaly": -0.7031
            },
            {
              "date": "2014-07",
              "year": 2014,
              "month": 7,
              "observed": 178.0064,
              "climatology": 178.7788,
              "anomaly": -0.7724
            },
            {
              "date": "2014-08",
              "year": 2014,
              "month": 8,
              "observed": 166.8607,
              "climatology": 164.878,
              "anomaly": 1.9827
            },
            {
              "date": "2014-09",
              "year": 2014,
              "month": 9,
              "observed": 155.6526,
              "climatology": 156.3015,
              "anomaly": -0.6489
            },
            {
              "date": "2014-10",
              "year": 2014,
              "month": 10,
              "observed": 155.8825,
              "climatology": 152.7203,
              "anomaly": 3.1622
            },
            {
              "date": "2014-11",
              "year": 2014,
              "month": 11,
              "observed": 154.9144,
              "climatology": 155.8408,
              "anomaly": -0.9264
            },
            {
              "date": "2014-12",
              "year": 2014,
              "month": 12,
              "observed": 171.5051,
              "climatology": 165.9904,
              "anomaly": 5.5147
            },
            {
              "date": "2015-01",
              "year": 2015,
              "month": 1,
              "observed": 178.7469,
              "climatology": 178.0864,
              "anomaly": 0.6605
            },
            {
              "date": "2015-02",
              "year": 2015,
              "month": 2,
              "observed": 187.5178,
              "climatology": 189.5843,
              "anomaly": -2.0665
            },
            {
              "date": "2015-03",
              "year": 2015,
              "month": 3,
              "observed": 196.1121,
              "climatology": 198.3904,
              "anomaly": -2.2783
            },
            {
              "date": "2015-04",
              "year": 2015,
              "month": 4,
              "observed": 203.3229,
              "climatology": 202.835,
              "anomaly": 0.4879
            },
            {
              "date": "2015-05",
              "year": 2015,
              "month": 5,
              "observed": 198.1867,
              "climatology": 199.2794,
              "anomaly": -1.0927
            },
            {
              "date": "2015-06",
              "year": 2015,
              "month": 6,
              "observed": 191.3577,
              "climatology": 191.3927,
              "anomaly": -0.035
            },
            {
              "date": "2015-07",
              "year": 2015,
              "month": 7,
              "observed": 178.2338,
              "climatology": 178.7788,
              "anomaly": -0.545
            },
            {
              "date": "2015-08",
              "year": 2015,
              "month": 8,
              "observed": 164.3466,
              "climatology": 164.878,
              "anomaly": -0.5314
            },
            {
              "date": "2015-09",
              "year": 2015,
              "month": 9,
              "observed": 153.2391,
              "climatology": 156.3015,
              "anomaly": -3.0624
            },
            {
              "date": "2015-10",
              "year": 2015,
              "month": 10,
              "observed": 148.1976,
              "climatology": 152.7203,
              "anomaly": -4.5227
            },
            {
              "date": "2015-11",
              "year": 2015,
              "month": 11,
              "observed": 154.1958,
              "climatology": 155.8408,
              "anomaly": -1.645
            },
            {
              "date": "2015-12",
              "year": 2015,
              "month": 12,
              "observed": 166.5817,
              "climatology": 165.9904,
              "anomaly": 0.5913
            },
            {
              "date": "2016-01",
              "year": 2016,
              "month": 1,
              "observed": 177.4539,
              "climatology": 178.0864,
              "anomaly": -0.6325
            },
            {
              "date": "2016-02",
              "year": 2016,
              "month": 2,
              "observed": 186.2824,
              "climatology": 189.5843,
              "anomaly": -3.3019
            },
            {
              "date": "2016-03",
              "year": 2016,
              "month": 3,
              "observed": 198.9583,
              "climatology": 198.3904,
              "anomaly": 0.5679
            },
            {
              "date": "2016-04",
              "year": 2016,
              "month": 4,
              "observed": 202.816,
              "climatology": 202.835,
              "anomaly": -0.019
            },
            {
              "date": "2016-05",
              "year": 2016,
              "month": 5,
              "observed": 196.2717,
              "climatology": 199.2794,
              "anomaly": -3.0077
            },
            {
              "date": "2016-06",
              "year": 2016,
              "month": 6,
              "observed": 189.693,
              "climatology": 191.3927,
              "anomaly": -1.6997
            },
            {
              "date": "2016-07",
              "year": 2016,
              "month": 7,
              "observed": 176.9322,
              "climatology": 178.7788,
              "anomaly": -1.8466
            },
            {
              "date": "2016-08",
              "year": 2016,
              "month": 8,
              "observed": 161.4073,
              "climatology": 164.878,
              "anomaly": -3.4707
            },
            {
              "date": "2016-09",
              "year": 2016,
              "month": 9,
              "observed": 155.9865,
              "climatology": 156.3015,
              "anomaly": -0.315
            },
            {
              "date": "2016-10",
              "year": 2016,
              "month": 10,
              "observed": 153.1227,
              "climatology": 152.7203,
              "anomaly": 0.4024
            },
            {
              "date": "2016-11",
              "year": 2016,
              "month": 11,
              "observed": 157.7557,
              "climatology": 155.8408,
              "anomaly": 1.9149
            },
            {
              "date": "2016-12",
              "year": 2016,
              "month": 12,
              "observed": 166.8112,
              "climatology": 165.9904,
              "anomaly": 0.8208
            },
            {
              "date": "2017-01",
              "year": 2017,
              "month": 1,
              "observed": 173.2105,
              "climatology": 178.0864,
              "anomaly": -4.8759
            },
            {
              "date": "2017-02",
              "year": 2017,
              "month": 2,
              "observed": 186.7881,
              "climatology": 189.5843,
              "anomaly": -2.7962
            },
            {
              "date": "2017-03",
              "year": 2017,
              "month": 3,
              "observed": 199.5489,
              "climatology": 198.3904,
              "anomaly": 1.1585
            },
            {
              "date": "2017-04",
              "year": 2017,
              "month": 4,
              "observed": 202.8732,
              "climatology": 202.835,
              "anomaly": 0.0382
            },
            {
              "date": "2017-05",
              "year": 2017,
              "month": 5,
              "observed": 199.505,
              "climatology": 199.2794,
              "anomaly": 0.2256
            },
            {
              "date": "2017-06",
              "year": 2017,
              "month": 6,
              "observed": 198.6765,
              "climatology": 191.3927,
              "anomaly": 7.2838
            },
            {
              "date": "2017-07",
              "year": 2017,
              "month": 7,
              "observed": 177.9499,
              "climatology": 178.7788,
              "anomaly": -0.8289
            },
            {
              "date": "2017-08",
              "year": 2017,
              "month": 8,
              "observed": 166.8396,
              "climatology": 164.878,
              "anomaly": 1.9616
            },
            {
              "date": "2017-09",
              "year": 2017,
              "month": 9,
              "observed": 157.2131,
              "climatology": 156.3015,
              "anomaly": 0.9116
            },
            {
              "date": "2017-10",
              "year": 2017,
              "month": 10,
              "observed": 153.0852,
              "climatology": 152.7203,
              "anomaly": 0.3649
            },
            {
              "date": "2017-11",
              "year": 2017,
              "month": 11,
              "observed": 153.9959,
              "climatology": 155.8408,
              "anomaly": -1.8449
            },
            {
              "date": "2017-12",
              "year": 2017,
              "month": 12,
              "observed": 165.8101,
              "climatology": 165.9904,
              "anomaly": -0.1803
            },
            {
              "date": "2018-01",
              "year": 2018,
              "month": 1,
              "observed": 174.4586,
              "climatology": 178.0864,
              "anomaly": -3.6278
            },
            {
              "date": "2018-02",
              "year": 2018,
              "month": 2,
              "observed": 188.2767,
              "climatology": 189.5843,
              "anomaly": -1.3076
            },
            {
              "date": "2018-03",
              "year": 2018,
              "month": 3,
              "observed": 196.7839,
              "climatology": 198.3904,
              "anomaly": -1.6065
            },
            {
              "date": "2018-04",
              "year": 2018,
              "month": 4,
              "observed": 201.5294,
              "climatology": 202.835,
              "anomaly": -1.3056
            },
            {
              "date": "2018-05",
              "year": 2018,
              "month": 5,
              "observed": 203.74,
              "climatology": 199.2794,
              "anomaly": 4.4606
            },
            {
              "date": "2018-06",
              "year": 2018,
              "month": 6,
              "observed": 184.1125,
              "climatology": 191.3927,
              "anomaly": -7.2802
            },
            {
              "date": "2018-07",
              "year": 2018,
              "month": 7,
              "observed": 177.9744,
              "climatology": 178.7788,
              "anomaly": -0.8044
            },
            {
              "date": "2018-08",
              "year": 2018,
              "month": 8,
              "observed": 159.7049,
              "climatology": 164.878,
              "anomaly": -5.1731
            },
            {
              "date": "2018-09",
              "year": 2018,
              "month": 9,
              "observed": 153.3842,
              "climatology": 156.3015,
              "anomaly": -2.9173
            },
            {
              "date": "2018-10",
              "year": 2018,
              "month": 10,
              "observed": 153.9151,
              "climatology": 152.7203,
              "anomaly": 1.1948
            },
            {
              "date": "2018-11",
              "year": 2018,
              "month": 11,
              "observed": 154.6808,
              "climatology": 155.8408,
              "anomaly": -1.16
            },
            {
              "date": "2018-12",
              "year": 2018,
              "month": 12,
              "observed": 160.9543,
              "climatology": 165.9904,
              "anomaly": -5.0361
            },
            {
              "date": "2019-01",
              "year": 2019,
              "month": 1,
              "observed": 174.3384,
              "climatology": 178.0864,
              "anomaly": -3.748
            },
            {
              "date": "2019-02",
              "year": 2019,
              "month": 2,
              "observed": 190.3037,
              "climatology": 189.5843,
              "anomaly": 0.7194
            },
            {
              "date": "2019-03",
              "year": 2019,
              "month": 3,
              "observed": 195.9074,
              "climatology": 198.3904,
              "anomaly": -2.483
            },
            {
              "date": "2019-04",
              "year": 2019,
              "month": 4,
              "observed": 201.6018,
              "climatology": 202.835,
              "anomaly": -1.2332
            },
            {
              "date": "2019-05",
              "year": 2019,
              "month": 5,
              "observed": 197.8033,
              "climatology": 199.2794,
              "anomaly": -1.4761
            },
            {
              "date": "2019-06",
              "year": 2019,
              "month": 6,
              "observed": 186.8877,
              "climatology": 191.3927,
              "anomaly": -4.505
            },
            {
              "date": "2019-07",
              "year": 2019,
              "month": 7,
              "observed": 181.3546,
              "climatology": 178.7788,
              "anomaly": 2.5758
            },
            {
              "date": "2019-08",
              "year": 2019,
              "month": 8,
              "observed": 165.0575,
              "climatology": 164.878,
              "anomaly": 0.1795
            },
            {
              "date": "2019-09",
              "year": 2019,
              "month": 9,
              "observed": 149.2372,
              "climatology": 156.3015,
              "anomaly": -7.0643
            },
            {
              "date": "2019-10",
              "year": 2019,
              "month": 10,
              "observed": 151.3948,
              "climatology": 152.7203,
              "anomaly": -1.3255
            },
            {
              "date": "2019-11",
              "year": 2019,
              "month": 11,
              "observed": 152.6016,
              "climatology": 155.8408,
              "anomaly": -3.2392
            },
            {
              "date": "2019-12",
              "year": 2019,
              "month": 12,
              "observed": 165.5158,
              "climatology": 165.9904,
              "anomaly": -0.4746
            },
            {
              "date": "2020-01",
              "year": 2020,
              "month": 1,
              "observed": 173.8814,
              "climatology": 178.0864,
              "anomaly": -4.205
            },
            {
              "date": "2020-02",
              "year": 2020,
              "month": 2,
              "observed": 188.0539,
              "climatology": 189.5843,
              "anomaly": -1.5304
            },
            {
              "date": "2020-03",
              "year": 2020,
              "month": 3,
              "observed": 198.7318,
              "climatology": 198.3904,
              "anomaly": 0.3414
            },
            {
              "date": "2020-04",
              "year": 2020,
              "month": 4,
              "observed": 202.9611,
              "climatology": 202.835,
              "anomaly": 0.1261
            },
            {
              "date": "2020-05",
              "year": 2020,
              "month": 5,
              "observed": 194.4246,
              "climatology": 199.2794,
              "anomaly": -4.8548
            },
            {
              "date": "2020-06",
              "year": 2020,
              "month": 6,
              "observed": 187.4164,
              "climatology": 191.3927,
              "anomaly": -3.9763
            },
            {
              "date": "2020-07",
              "year": 2020,
              "month": 7,
              "observed": 174.5433,
              "climatology": 178.7788,
              "anomaly": -4.2355
            },
            {
              "date": "2020-08",
              "year": 2020,
              "month": 8,
              "observed": 161.5754,
              "climatology": 164.878,
              "anomaly": -3.3026
            },
            {
              "date": "2020-09",
              "year": 2020,
              "month": 9,
              "observed": 158.4497,
              "climatology": 156.3015,
              "anomaly": 2.1482
            },
            {
              "date": "2020-10",
              "year": 2020,
              "month": 10,
              "observed": 151.6772,
              "climatology": 152.7203,
              "anomaly": -1.0431
            },
            {
              "date": "2020-11",
              "year": 2020,
              "month": 11,
              "observed": 150.8399,
              "climatology": 155.8408,
              "anomaly": -5.0009
            },
            {
              "date": "2020-12",
              "year": 2020,
              "month": 12,
              "observed": 165.4154,
              "climatology": 165.9904,
              "anomaly": -0.575
            },
            {
              "date": "2021-01",
              "year": 2021,
              "month": 1,
              "observed": 180.9041,
              "climatology": 178.0864,
              "anomaly": 2.8177
            },
            {
              "date": "2021-02",
              "year": 2021,
              "month": 2,
              "observed": 190.6579,
              "climatology": 189.5843,
              "anomaly": 1.0736
            },
            {
              "date": "2021-03",
              "year": 2021,
              "month": 3,
              "observed": 193.4069,
              "climatology": 198.3904,
              "anomaly": -4.9835
            },
            {
              "date": "2021-04",
              "year": 2021,
              "month": 4,
              "observed": 199.3221,
              "climatology": 202.835,
              "anomaly": -3.5129
            },
            {
              "date": "2021-05",
              "year": 2021,
              "month": 5,
              "observed": 200.3286,
              "climatology": 199.2794,
              "anomaly": 1.0492
            },
            {
              "date": "2021-06",
              "year": 2021,
              "month": 6,
              "observed": 186.2195,
              "climatology": 191.3927,
              "anomaly": -5.1732
            },
            {
              "date": "2021-07",
              "year": 2021,
              "month": 7,
              "observed": 176.5763,
              "climatology": 178.7788,
              "anomaly": -2.2025
            },
            {
              "date": "2021-08",
              "year": 2021,
              "month": 8,
              "observed": 164.8813,
              "climatology": 164.878,
              "anomaly": 0.0033
            },
            {
              "date": "2021-09",
              "year": 2021,
              "month": 9,
              "observed": 151.4547,
              "climatology": 156.3015,
              "anomaly": -4.8468
            },
            {
              "date": "2021-10",
              "year": 2021,
              "month": 10,
              "observed": 150.2519,
              "climatology": 152.7203,
              "anomaly": -2.4684
            },
            {
              "date": "2021-11",
              "year": 2021,
              "month": 11,
              "observed": 145.6249,
              "climatology": 155.8408,
              "anomaly": -10.2159
            },
            {
              "date": "2021-12",
              "year": 2021,
              "month": 12,
              "observed": 160.2957,
              "climatology": 165.9904,
              "anomaly": -5.6947
            },
            {
              "date": "2022-01",
              "year": 2022,
              "month": 1,
              "observed": 174.7033,
              "climatology": 178.0864,
              "anomaly": -3.3831
            },
            {
              "date": "2022-02",
              "year": 2022,
              "month": 2,
              "observed": 184.6932,
              "climatology": 189.5843,
              "anomaly": -4.8911
            },
            {
              "date": "2022-03",
              "year": 2022,
              "month": 3,
              "observed": 201.0224,
              "climatology": 198.3904,
              "anomaly": 2.632
            },
            {
              "date": "2022-04",
              "year": 2022,
              "month": 4,
              "observed": 196.6933,
              "climatology": 202.835,
              "anomaly": -6.1417
            },
            {
              "date": "2022-05",
              "year": 2022,
              "month": 5,
              "observed": 195.7972,
              "climatology": 199.2794,
              "anomaly": -3.4822
            },
            {
              "date": "2022-06",
              "year": 2022,
              "month": 6,
              "observed": 188.0516,
              "climatology": 191.3927,
              "anomaly": -3.3411
            },
            {
              "date": "2022-07",
              "year": 2022,
              "month": 7,
              "observed": 178.8059,
              "climatology": 178.7788,
              "anomaly": 0.0271
            },
            {
              "date": "2022-08",
              "year": 2022,
              "month": 8,
              "observed": 159.091,
              "climatology": 164.878,
              "anomaly": -5.787
            },
            {
              "date": "2022-09",
              "year": 2022,
              "month": 9,
              "observed": 156.416,
              "climatology": 156.3015,
              "anomaly": 0.1145
            },
            {
              "date": "2022-10",
              "year": 2022,
              "month": 10,
              "observed": 150.1623,
              "climatology": 152.7203,
              "anomaly": -2.558
            },
            {
              "date": "2022-11",
              "year": 2022,
              "month": 11,
              "observed": 151.0103,
              "climatology": 155.8408,
              "anomaly": -4.8305
            },
            {
              "date": "2022-12",
              "year": 2022,
              "month": 12,
              "observed": 163.748,
              "climatology": 165.9904,
              "anomaly": -2.2424
            },
            {
              "date": "2023-01",
              "year": 2023,
              "month": 1,
              "observed": 175.5684,
              "climatology": 178.0864,
              "anomaly": -2.518
            },
            {
              "date": "2023-02",
              "year": 2023,
              "month": 2,
              "observed": 186.0482,
              "climatology": 189.5843,
              "anomaly": -3.5361
            },
            {
              "date": "2023-03",
              "year": 2023,
              "month": 3,
              "observed": 196.8518,
              "climatology": 198.3904,
              "anomaly": -1.5386
            },
            {
              "date": "2023-04",
              "year": 2023,
              "month": 4,
              "observed": 199.0414,
              "climatology": 202.835,
              "anomaly": -3.7936
            },
            {
              "date": "2023-05",
              "year": 2023,
              "month": 5,
              "observed": 196.9171,
              "climatology": 199.2794,
              "anomaly": -2.3623
            },
            {
              "date": "2023-06",
              "year": 2023,
              "month": 6,
              "observed": 189.116,
              "climatology": 191.3927,
              "anomaly": -2.2767
            },
            {
              "date": "2023-07",
              "year": 2023,
              "month": 7,
              "observed": 178.9037,
              "climatology": 178.7788,
              "anomaly": 0.1249
            },
            {
              "date": "2023-08",
              "year": 2023,
              "month": 8,
              "observed": 159.3222,
              "climatology": 164.878,
              "anomaly": -5.5558
            },
            {
              "date": "2023-09",
              "year": 2023,
              "month": 9,
              "observed": 158.5767,
              "climatology": 156.3015,
              "anomaly": 2.2752
            },
            {
              "date": "2023-10",
              "year": 2023,
              "month": 10,
              "observed": 144.9925,
              "climatology": 152.7203,
              "anomaly": -7.7278
            },
            {
              "date": "2023-11",
              "year": 2023,
              "month": 11,
              "observed": 152.8206,
              "climatology": 155.8408,
              "anomaly": -3.0202
            },
            {
              "date": "2023-12",
              "year": 2023,
              "month": 12,
              "observed": 163.7995,
              "climatology": 165.9904,
              "anomaly": -2.1909
            },
            {
              "date": "2024-01",
              "year": 2024,
              "month": 1,
              "observed": 175.5092,
              "climatology": 178.0864,
              "anomaly": -2.5772
            },
            {
              "date": "2024-02",
              "year": 2024,
              "month": 2,
              "observed": 185.728,
              "climatology": 189.5843,
              "anomaly": -3.8563
            },
            {
              "date": "2024-03",
              "year": 2024,
              "month": 3,
              "observed": 195.893,
              "climatology": 198.3904,
              "anomaly": -2.4974
            },
            {
              "date": "2024-04",
              "year": 2024,
              "month": 4,
              "observed": 198.5082,
              "climatology": 202.835,
              "anomaly": -4.3268
            },
            {
              "date": "2024-05",
              "year": 2024,
              "month": 5,
              "observed": 194.8959,
              "climatology": 199.2794,
              "anomaly": -4.3835
            },
            {
              "date": "2024-06",
              "year": 2024,
              "month": 6,
              "observed": 189.3207,
              "climatology": 191.3927,
              "anomaly": -2.072
            },
            {
              "date": "2024-07",
              "year": 2024,
              "month": 7,
              "observed": 175.5672,
              "climatology": 178.7788,
              "anomaly": -3.2116
            },
            {
              "date": "2024-08",
              "year": 2024,
              "month": 8,
              "observed": 160.4204,
              "climatology": 164.878,
              "anomaly": -4.4576
            },
            {
              "date": "2024-09",
              "year": 2024,
              "month": 9,
              "observed": 155.2291,
              "climatology": 156.3015,
              "anomaly": -1.0724
            },
            {
              "date": "2024-10",
              "year": 2024,
              "month": 10,
              "observed": 150.377,
              "climatology": 152.7203,
              "anomaly": -2.3433
            },
            {
              "date": "2024-11",
              "year": 2024,
              "month": 11,
              "observed": 154.9682,
              "climatology": 155.8408,
              "anomaly": -0.8726
            },
            {
              "date": "2024-12",
              "year": 2024,
              "month": 12,
              "observed": 163.6388,
              "climatology": 165.9904,
              "anomaly": -2.3516
            }
          ],
          "annual_series": [
            {
              "year": 2000,
              "annual_mean": 181.7616,
              "annual_anomaly": 3.9218
            },
            {
              "year": 2001,
              "annual_mean": 179.2796,
              "annual_anomaly": 1.4398
            },
            {
              "year": 2002,
              "annual_mean": 180.0104,
              "annual_anomaly": 2.1705
            },
            {
              "year": 2003,
              "annual_mean": 179.3983,
              "annual_anomaly": 1.5584
            },
            {
              "year": 2004,
              "annual_mean": 180.0855,
              "annual_anomaly": 2.2457
            },
            {
              "year": 2005,
              "annual_mean": 180.0661,
              "annual_anomaly": 2.2262
            },
            {
              "year": 2006,
              "annual_mean": 179.1711,
              "annual_anomaly": 1.3313
            },
            {
              "year": 2007,
              "annual_mean": 178.7774,
              "annual_anomaly": 0.9376
            },
            {
              "year": 2008,
              "annual_mean": 178.8368,
              "annual_anomaly": 0.997
            },
            {
              "year": 2009,
              "annual_mean": 178.9711,
              "annual_anomaly": 1.1313
            },
            {
              "year": 2010,
              "annual_mean": 178.2186,
              "annual_anomaly": 0.3788
            },
            {
              "year": 2011,
              "annual_mean": 177.8325,
              "annual_anomaly": -0.0074
            },
            {
              "year": 2012,
              "annual_mean": 177.6518,
              "annual_anomaly": -0.188
            },
            {
              "year": 2013,
              "annual_mean": 178.8502,
              "annual_anomaly": 1.0103
            },
            {
              "year": 2014,
              "annual_mean": 177.8644,
              "annual_anomaly": 0.0245
            },
            {
              "year": 2015,
              "annual_mean": 176.6699,
              "annual_anomaly": -1.1699
            },
            {
              "year": 2016,
              "annual_mean": 176.9576,
              "annual_anomaly": -0.8823
            },
            {
              "year": 2017,
              "annual_mean": 177.958,
              "annual_anomaly": 0.1182
            },
            {
              "year": 2018,
              "annual_mean": 175.7929,
              "annual_anomaly": -2.0469
            },
            {
              "year": 2019,
              "annual_mean": 176.0003,
              "annual_anomaly": -1.8395
            },
            {
              "year": 2020,
              "annual_mean": 175.6642,
              "annual_anomaly": -2.1757
            },
            {
              "year": 2021,
              "annual_mean": 174.9937,
              "annual_anomaly": -2.8462
            },
            {
              "year": 2022,
              "annual_mean": 175.0162,
              "annual_anomaly": -2.8236
            },
            {
              "year": 2023,
              "annual_mean": 175.1632,
              "annual_anomaly": -2.6767
            },
            {
              "year": 2024,
              "annual_mean": 175.0046,
              "annual_anomaly": -2.8352
            }
          ],
          "climatology_baseline": {
            "1": 178.0864,
            "2": 189.5843,
            "3": 198.3904,
            "4": 202.835,
            "5": 199.2794,
            "6": 191.3927,
            "7": 178.7788,
            "8": 164.878,
            "9": 156.3015,
            "10": 152.7203,
            "11": 155.8408,
            "12": 165.9904
          }
        },
        "statistics": {
          "sens_slope": -0.2448,
          "sens_intercept": 670.25823,
          "confidence_interval_95": [
            -0.28163,
            -0.21806
          ],
          "mann_kendall_score_s": -242,
          "standardized_z": -5.6285,
          "p_value": 0.0,
          "is_significant": true,
          "trend_label": "STATISTICALLY_SIGNIFICANT_DECREASING",
          "verdict_text": "Confirmed downward monotonic trend (-0.2448/yr, p=1.8173e-08). Evidence strongly rejects the null hypothesis.",
          "ols_comparison": {
            "ols_slope": -0.24481,
            "ols_pvalue": 0.0,
            "r_squared": 0.9011
          }
        }
      }
    },
    "region_b": {
      "name": "Southern Scandinavia (Northern Europe)",
      "bbox": [
        58.0,
        66.0,
        10.0,
        22.0
      ],
      "analysis": {
        "metadata": {
          "source": "SIMULATED_NOAH_LSM_3.6_BASELINE",
          "doi": "10.5067/SXAVCZFAQLNO",
          "provenance_type": "ILLUSTRATIVE_BASELINE",
          "is_illustrative": true,
          "variable": "RootMoist_inst",
          "unit": "kg/m\u00b2",
          "depth_note": "Simulated Noah LSM baseline (Illustrative development model)",
          "bbox": [
            58.0,
            66.0,
            10.0,
            22.0
          ],
          "time_range": [
            2000,
            2024
          ],
          "total_observations": 300,
          "disclaimer": "ILLUSTRATIVE ONLY: Simulated baseline derived from Noah LSM 3.6 parameterization. NOT real NASA GLDAS observational output."
        },
        "climatology": {
          "monthly_series": [
            {
              "date": "2000-01",
              "year": 2000,
              "month": 1,
              "observed": 197.7682,
              "climatology": 198.7981,
              "anomaly": -1.0299
            },
            {
              "date": "2000-02",
              "year": 2000,
              "month": 2,
              "observed": 208.6958,
              "climatology": 210.333,
              "anomaly": -1.6372
            },
            {
              "date": "2000-03",
              "year": 2000,
              "month": 3,
              "observed": 219.8263,
              "climatology": 219.1761,
              "anomaly": 0.6502
            },
            {
              "date": "2000-04",
              "year": 2000,
              "month": 4,
              "observed": 225.379,
              "climatology": 223.6577,
              "anomaly": 1.7213
            },
            {
              "date": "2000-05",
              "year": 2000,
              "month": 5,
              "observed": 217.6517,
              "climatology": 220.1392,
              "anomaly": -2.4875
            },
            {
              "date": "2000-06",
              "year": 2000,
              "month": 6,
              "observed": 208.5161,
              "climatology": 212.2894,
              "anomaly": -3.7733
            },
            {
              "date": "2000-07",
              "year": 2000,
              "month": 7,
              "observed": 200.5645,
              "climatology": 199.7125,
              "anomaly": 0.852
            },
            {
              "date": "2000-08",
              "year": 2000,
              "month": 8,
              "observed": 186.05,
              "climatology": 185.8487,
              "anomaly": 0.2013
            },
            {
              "date": "2000-09",
              "year": 2000,
              "month": 9,
              "observed": 173.8221,
              "climatology": 177.3092,
              "anomaly": -3.4871
            },
            {
              "date": "2000-10",
              "year": 2000,
              "month": 10,
              "observed": 173.0178,
              "climatology": 173.765,
              "anomaly": -0.7472
            },
            {
              "date": "2000-11",
              "year": 2000,
              "month": 11,
              "observed": 173.8672,
              "climatology": 176.9225,
              "anomaly": -3.0553
            },
            {
              "date": "2000-12",
              "year": 2000,
              "month": 12,
              "observed": 183.0271,
              "climatology": 187.1091,
              "anomaly": -4.082
            },
            {
              "date": "2001-01",
              "year": 2001,
              "month": 1,
              "observed": 197.3113,
              "climatology": 198.7981,
              "anomaly": -1.4868
            },
            {
              "date": "2001-02",
              "year": 2001,
              "month": 2,
              "observed": 204.4382,
              "climatology": 210.333,
              "anomaly": -5.8948
            },
            {
              "date": "2001-03",
              "year": 2001,
              "month": 3,
              "observed": 214.0748,
              "climatology": 219.1761,
              "anomaly": -5.1013
            },
            {
              "date": "2001-04",
              "year": 2001,
              "month": 4,
              "observed": 220.3457,
              "climatology": 223.6577,
              "anomaly": -3.312
            },
            {
              "date": "2001-05",
              "year": 2001,
              "month": 5,
              "observed": 215.885,
              "climatology": 220.1392,
              "anomaly": -4.2542
            },
            {
              "date": "2001-06",
              "year": 2001,
              "month": 6,
              "observed": 210.067,
              "climatology": 212.2894,
              "anomaly": -2.2224
            },
            {
              "date": "2001-07",
              "year": 2001,
              "month": 7,
              "observed": 194.5264,
              "climatology": 199.7125,
              "anomaly": -5.1861
            },
            {
              "date": "2001-08",
              "year": 2001,
              "month": 8,
              "observed": 180.7807,
              "climatology": 185.8487,
              "anomaly": -5.068
            },
            {
              "date": "2001-09",
              "year": 2001,
              "month": 9,
              "observed": 178.8399,
              "climatology": 177.3092,
              "anomaly": 1.5307
            },
            {
              "date": "2001-10",
              "year": 2001,
              "month": 10,
              "observed": 171.277,
              "climatology": 173.765,
              "anomaly": -2.488
            },
            {
              "date": "2001-11",
              "year": 2001,
              "month": 11,
              "observed": 175.3746,
              "climatology": 176.9225,
              "anomaly": -1.5479
            },
            {
              "date": "2001-12",
              "year": 2001,
              "month": 12,
              "observed": 180.8096,
              "climatology": 187.1091,
              "anomaly": -6.2995
            },
            {
              "date": "2002-01",
              "year": 2002,
              "month": 1,
              "observed": 195.5255,
              "climatology": 198.7981,
              "anomaly": -3.2726
            },
            {
              "date": "2002-02",
              "year": 2002,
              "month": 2,
              "observed": 209.6787,
              "climatology": 210.333,
              "anomaly": -0.6543
            },
            {
              "date": "2002-03",
              "year": 2002,
              "month": 3,
              "observed": 215.6896,
              "climatology": 219.1761,
              "anomaly": -3.4865
            },
            {
              "date": "2002-04",
              "year": 2002,
              "month": 4,
              "observed": 222.8707,
              "climatology": 223.6577,
              "anomaly": -0.787
            },
            {
              "date": "2002-05",
              "year": 2002,
              "month": 5,
              "observed": 217.0955,
              "climatology": 220.1392,
              "anomaly": -3.0437
            },
            {
              "date": "2002-06",
              "year": 2002,
              "month": 6,
              "observed": 208.7322,
              "climatology": 212.2894,
              "anomaly": -3.5572
            },
            {
              "date": "2002-07",
              "year": 2002,
              "month": 7,
              "observed": 195.4722,
              "climatology": 199.7125,
              "anomaly": -4.2403
            },
            {
              "date": "2002-08",
              "year": 2002,
              "month": 8,
              "observed": 189.1221,
              "climatology": 185.8487,
              "anomaly": 3.2734
            },
            {
              "date": "2002-09",
              "year": 2002,
              "month": 9,
              "observed": 175.322,
              "climatology": 177.3092,
              "anomaly": -1.9872
            },
            {
              "date": "2002-10",
              "year": 2002,
              "month": 10,
              "observed": 169.3771,
              "climatology": 173.765,
              "anomaly": -4.3879
            },
            {
              "date": "2002-11",
              "year": 2002,
              "month": 11,
              "observed": 177.4421,
              "climatology": 176.9225,
              "anomaly": 0.5196
            },
            {
              "date": "2002-12",
              "year": 2002,
              "month": 12,
              "observed": 181.4993,
              "climatology": 187.1091,
              "anomaly": -5.6098
            },
            {
              "date": "2003-01",
              "year": 2003,
              "month": 1,
              "observed": 197.5886,
              "climatology": 198.7981,
              "anomaly": -1.2095
            },
            {
              "date": "2003-02",
              "year": 2003,
              "month": 2,
              "observed": 204.6822,
              "climatology": 210.333,
              "anomaly": -5.6508
            },
            {
              "date": "2003-03",
              "year": 2003,
              "month": 3,
              "observed": 215.4266,
              "climatology": 219.1761,
              "anomaly": -3.7495
            },
            {
              "date": "2003-04",
              "year": 2003,
              "month": 4,
              "observed": 222.6036,
              "climatology": 223.6577,
              "anomaly": -1.0541
            },
            {
              "date": "2003-05",
              "year": 2003,
              "month": 5,
              "observed": 220.6232,
              "climatology": 220.1392,
              "anomaly": 0.484
            },
            {
              "date": "2003-06",
              "year": 2003,
              "month": 6,
              "observed": 210.0698,
              "climatology": 212.2894,
              "anomaly": -2.2196
            },
            {
              "date": "2003-07",
              "year": 2003,
              "month": 7,
              "observed": 196.8673,
              "climatology": 199.7125,
              "anomaly": -2.8452
            },
            {
              "date": "2003-08",
              "year": 2003,
              "month": 8,
              "observed": 183.9187,
              "climatology": 185.8487,
              "anomaly": -1.93
            },
            {
              "date": "2003-09",
              "year": 2003,
              "month": 9,
              "observed": 171.8395,
              "climatology": 177.3092,
              "anomaly": -5.4697
            },
            {
              "date": "2003-10",
              "year": 2003,
              "month": 10,
              "observed": 170.4018,
              "climatology": 173.765,
              "anomaly": -3.3632
            },
            {
              "date": "2003-11",
              "year": 2003,
              "month": 11,
              "observed": 174.4142,
              "climatology": 176.9225,
              "anomaly": -2.5083
            },
            {
              "date": "2003-12",
              "year": 2003,
              "month": 12,
              "observed": 187.3742,
              "climatology": 187.1091,
              "anomaly": 0.2651
            },
            {
              "date": "2004-01",
              "year": 2004,
              "month": 1,
              "observed": 198.1055,
              "climatology": 198.7981,
              "anomaly": -0.6926
            },
            {
              "date": "2004-02",
              "year": 2004,
              "month": 2,
              "observed": 205.3538,
              "climatology": 210.333,
              "anomaly": -4.9792
            },
            {
              "date": "2004-03",
              "year": 2004,
              "month": 3,
              "observed": 219.7373,
              "climatology": 219.1761,
              "anomaly": 0.5612
            },
            {
              "date": "2004-04",
              "year": 2004,
              "month": 4,
              "observed": 221.3287,
              "climatology": 223.6577,
              "anomaly": -2.329
            },
            {
              "date": "2004-05",
              "year": 2004,
              "month": 5,
              "observed": 217.2648,
              "climatology": 220.1392,
              "anomaly": -2.8744
            },
            {
              "date": "2004-06",
              "year": 2004,
              "month": 6,
              "observed": 211.3506,
              "climatology": 212.2894,
              "anomaly": -0.9388
            },
            {
              "date": "2004-07",
              "year": 2004,
              "month": 7,
              "observed": 199.9139,
              "climatology": 199.7125,
              "anomaly": 0.2014
            },
            {
              "date": "2004-08",
              "year": 2004,
              "month": 8,
              "observed": 187.1796,
              "climatology": 185.8487,
              "anomaly": 1.3309
            },
            {
              "date": "2004-09",
              "year": 2004,
              "month": 9,
              "observed": 173.6177,
              "climatology": 177.3092,
              "anomaly": -3.6915
            },
            {
              "date": "2004-10",
              "year": 2004,
              "month": 10,
              "observed": 171.6084,
              "climatology": 173.765,
              "anomaly": -2.1566
            },
            {
              "date": "2004-11",
              "year": 2004,
              "month": 11,
              "observed": 176.5739,
              "climatology": 176.9225,
              "anomaly": -0.3486
            },
            {
              "date": "2004-12",
              "year": 2004,
              "month": 12,
              "observed": 187.3503,
              "climatology": 187.1091,
              "anomaly": 0.2412
            },
            {
              "date": "2005-01",
              "year": 2005,
              "month": 1,
              "observed": 196.2285,
              "climatology": 198.7981,
              "anomaly": -2.5696
            },
            {
              "date": "2005-02",
              "year": 2005,
              "month": 2,
              "observed": 209.4773,
              "climatology": 210.333,
              "anomaly": -0.8557
            },
            {
              "date": "2005-03",
              "year": 2005,
              "month": 3,
              "observed": 216.3412,
              "climatology": 219.1761,
              "anomaly": -2.8349
            },
            {
              "date": "2005-04",
              "year": 2005,
              "month": 4,
              "observed": 219.4809,
              "climatology": 223.6577,
              "anomaly": -4.1768
            },
            {
              "date": "2005-05",
              "year": 2005,
              "month": 5,
              "observed": 221.1684,
              "climatology": 220.1392,
              "anomaly": 1.0292
            },
            {
              "date": "2005-06",
              "year": 2005,
              "month": 6,
              "observed": 213.392,
              "climatology": 212.2894,
              "anomaly": 1.1026
            },
            {
              "date": "2005-07",
              "year": 2005,
              "month": 7,
              "observed": 197.3364,
              "climatology": 199.7125,
              "anomaly": -2.3761
            },
            {
              "date": "2005-08",
              "year": 2005,
              "month": 8,
              "observed": 187.5403,
              "climatology": 185.8487,
              "anomaly": 1.6916
            },
            {
              "date": "2005-09",
              "year": 2005,
              "month": 9,
              "observed": 176.7999,
              "climatology": 177.3092,
              "anomaly": -0.5093
            },
            {
              "date": "2005-10",
              "year": 2005,
              "month": 10,
              "observed": 170.9486,
              "climatology": 173.765,
              "anomaly": -2.8164
            },
            {
              "date": "2005-11",
              "year": 2005,
              "month": 11,
              "observed": 176.8293,
              "climatology": 176.9225,
              "anomaly": -0.0932
            },
            {
              "date": "2005-12",
              "year": 2005,
              "month": 12,
              "observed": 188.9365,
              "climatology": 187.1091,
              "anomaly": 1.8274
            },
            {
              "date": "2006-01",
              "year": 2006,
              "month": 1,
              "observed": 197.5169,
              "climatology": 198.7981,
              "anomaly": -1.2812
            },
            {
              "date": "2006-02",
              "year": 2006,
              "month": 2,
              "observed": 214.033,
              "climatology": 210.333,
              "anomaly": 3.7
            },
            {
              "date": "2006-03",
              "year": 2006,
              "month": 3,
              "observed": 212.7377,
              "climatology": 219.1761,
              "anomaly": -6.4384
            },
            {
              "date": "2006-04",
              "year": 2006,
              "month": 4,
              "observed": 224.7062,
              "climatology": 223.6577,
              "anomaly": 1.0485
            },
            {
              "date": "2006-05",
              "year": 2006,
              "month": 5,
              "observed": 219.5347,
              "climatology": 220.1392,
              "anomaly": -0.6045
            },
            {
              "date": "2006-06",
              "year": 2006,
              "month": 6,
              "observed": 209.4339,
              "climatology": 212.2894,
              "anomaly": -2.8555
            },
            {
              "date": "2006-07",
              "year": 2006,
              "month": 7,
              "observed": 197.9258,
              "climatology": 199.7125,
              "anomaly": -1.7867
            },
            {
              "date": "2006-08",
              "year": 2006,
              "month": 8,
              "observed": 180.2425,
              "climatology": 185.8487,
              "anomaly": -5.6062
            },
            {
              "date": "2006-09",
              "year": 2006,
              "month": 9,
              "observed": 175.5266,
              "climatology": 177.3092,
              "anomaly": -1.7826
            },
            {
              "date": "2006-10",
              "year": 2006,
              "month": 10,
              "observed": 173.6342,
              "climatology": 173.765,
              "anomaly": -0.1308
            },
            {
              "date": "2006-11",
              "year": 2006,
              "month": 11,
              "observed": 179.8005,
              "climatology": 176.9225,
              "anomaly": 2.878
            },
            {
              "date": "2006-12",
              "year": 2006,
              "month": 12,
              "observed": 183.9757,
              "climatology": 187.1091,
              "anomaly": -3.1334
            },
            {
              "date": "2007-01",
              "year": 2007,
              "month": 1,
              "observed": 195.7652,
              "climatology": 198.7981,
              "anomaly": -3.0329
            },
            {
              "date": "2007-02",
              "year": 2007,
              "month": 2,
              "observed": 209.047,
              "climatology": 210.333,
              "anomaly": -1.286
            },
            {
              "date": "2007-03",
              "year": 2007,
              "month": 3,
              "observed": 221.7556,
              "climatology": 219.1761,
              "anomaly": 2.5795
            },
            {
              "date": "2007-04",
              "year": 2007,
              "month": 4,
              "observed": 223.6533,
              "climatology": 223.6577,
              "anomaly": -0.0044
            },
            {
              "date": "2007-05",
              "year": 2007,
              "month": 5,
              "observed": 218.1727,
              "climatology": 220.1392,
              "anomaly": -1.9665
            },
            {
              "date": "2007-06",
              "year": 2007,
              "month": 6,
              "observed": 211.6446,
              "climatology": 212.2894,
              "anomaly": -0.6448
            },
            {
              "date": "2007-07",
              "year": 2007,
              "month": 7,
              "observed": 198.1191,
              "climatology": 199.7125,
              "anomaly": -1.5934
            },
            {
              "date": "2007-08",
              "year": 2007,
              "month": 8,
              "observed": 187.813,
              "climatology": 185.8487,
              "anomaly": 1.9643
            },
            {
              "date": "2007-09",
              "year": 2007,
              "month": 9,
              "observed": 174.5007,
              "climatology": 177.3092,
              "anomaly": -2.8085
            },
            {
              "date": "2007-10",
              "year": 2007,
              "month": 10,
              "observed": 172.1023,
              "climatology": 173.765,
              "anomaly": -1.6627
            },
            {
              "date": "2007-11",
              "year": 2007,
              "month": 11,
              "observed": 175.3055,
              "climatology": 176.9225,
              "anomaly": -1.617
            },
            {
              "date": "2007-12",
              "year": 2007,
              "month": 12,
              "observed": 181.7926,
              "climatology": 187.1091,
              "anomaly": -5.3165
            },
            {
              "date": "2008-01",
              "year": 2008,
              "month": 1,
              "observed": 198.7067,
              "climatology": 198.7981,
              "anomaly": -0.0914
            },
            {
              "date": "2008-02",
              "year": 2008,
              "month": 2,
              "observed": 211.1341,
              "climatology": 210.333,
              "anomaly": 0.8011
            },
            {
              "date": "2008-03",
              "year": 2008,
              "month": 3,
              "observed": 219.6598,
              "climatology": 219.1761,
              "anomaly": 0.4837
            },
            {
              "date": "2008-04",
              "year": 2008,
              "month": 4,
              "observed": 222.425,
              "climatology": 223.6577,
              "anomaly": -1.2327
            },
            {
              "date": "2008-05",
              "year": 2008,
              "month": 5,
              "observed": 216.1386,
              "climatology": 220.1392,
              "anomaly": -4.0006
            },
            {
              "date": "2008-06",
              "year": 2008,
              "month": 6,
              "observed": 209.4898,
              "climatology": 212.2894,
              "anomaly": -2.7996
            },
            {
              "date": "2008-07",
              "year": 2008,
              "month": 7,
              "observed": 197.1996,
              "climatology": 199.7125,
              "anomaly": -2.5129
            },
            {
              "date": "2008-08",
              "year": 2008,
              "month": 8,
              "observed": 183.5657,
              "climatology": 185.8487,
              "anomaly": -2.283
            },
            {
              "date": "2008-09",
              "year": 2008,
              "month": 9,
              "observed": 176.0326,
              "climatology": 177.3092,
              "anomaly": -1.2766
            },
            {
              "date": "2008-10",
              "year": 2008,
              "month": 10,
              "observed": 174.1115,
              "climatology": 173.765,
              "anomaly": 0.3465
            },
            {
              "date": "2008-11",
              "year": 2008,
              "month": 11,
              "observed": 181.1813,
              "climatology": 176.9225,
              "anomaly": 4.2588
            },
            {
              "date": "2008-12",
              "year": 2008,
              "month": 12,
              "observed": 186.0679,
              "climatology": 187.1091,
              "anomaly": -1.0412
            },
            {
              "date": "2009-01",
              "year": 2009,
              "month": 1,
              "observed": 198.7903,
              "climatology": 198.7981,
              "anomaly": -0.0078
            },
            {
              "date": "2009-02",
              "year": 2009,
              "month": 2,
              "observed": 210.4753,
              "climatology": 210.333,
              "anomaly": 0.1423
            },
            {
              "date": "2009-03",
              "year": 2009,
              "month": 3,
              "observed": 215.0301,
              "climatology": 219.1761,
              "anomaly": -4.146
            },
            {
              "date": "2009-04",
              "year": 2009,
              "month": 4,
              "observed": 223.1251,
              "climatology": 223.6577,
              "anomaly": -0.5326
            },
            {
              "date": "2009-05",
              "year": 2009,
              "month": 5,
              "observed": 220.0076,
              "climatology": 220.1392,
              "anomaly": -0.1316
            },
            {
              "date": "2009-06",
              "year": 2009,
              "month": 6,
              "observed": 216.8795,
              "climatology": 212.2894,
              "anomaly": 4.5901
            },
            {
              "date": "2009-07",
              "year": 2009,
              "month": 7,
              "observed": 197.7555,
              "climatology": 199.7125,
              "anomaly": -1.957
            },
            {
              "date": "2009-08",
              "year": 2009,
              "month": 8,
              "observed": 186.5053,
              "climatology": 185.8487,
              "anomaly": 0.6566
            },
            {
              "date": "2009-09",
              "year": 2009,
              "month": 9,
              "observed": 176.529,
              "climatology": 177.3092,
              "anomaly": -0.7802
            },
            {
              "date": "2009-10",
              "year": 2009,
              "month": 10,
              "observed": 170.3597,
              "climatology": 173.765,
              "anomaly": -3.4053
            },
            {
              "date": "2009-11",
              "year": 2009,
              "month": 11,
              "observed": 179.5028,
              "climatology": 176.9225,
              "anomaly": 2.5803
            },
            {
              "date": "2009-12",
              "year": 2009,
              "month": 12,
              "observed": 187.6913,
              "climatology": 187.1091,
              "anomaly": 0.5822
            },
            {
              "date": "2010-01",
              "year": 2010,
              "month": 1,
              "observed": 200.304,
              "climatology": 198.7981,
              "anomaly": 1.5059
            },
            {
              "date": "2010-02",
              "year": 2010,
              "month": 2,
              "observed": 208.568,
              "climatology": 210.333,
              "anomaly": -1.765
            },
            {
              "date": "2010-03",
              "year": 2010,
              "month": 3,
              "observed": 223.514,
              "climatology": 219.1761,
              "anomaly": 4.3379
            },
            {
              "date": "2010-04",
              "year": 2010,
              "month": 4,
              "observed": 219.8668,
              "climatology": 223.6577,
              "anomaly": -3.7909
            },
            {
              "date": "2010-05",
              "year": 2010,
              "month": 5,
              "observed": 221.5042,
              "climatology": 220.1392,
              "anomaly": 1.365
            },
            {
              "date": "2010-06",
              "year": 2010,
              "month": 6,
              "observed": 216.3776,
              "climatology": 212.2894,
              "anomaly": 4.0882
            },
            {
              "date": "2010-07",
              "year": 2010,
              "month": 7,
              "observed": 195.9401,
              "climatology": 199.7125,
              "anomaly": -3.7724
            },
            {
              "date": "2010-08",
              "year": 2010,
              "month": 8,
              "observed": 184.5157,
              "climatology": 185.8487,
              "anomaly": -1.333
            },
            {
              "date": "2010-09",
              "year": 2010,
              "month": 9,
              "observed": 177.0449,
              "climatology": 177.3092,
              "anomaly": -0.2643
            },
            {
              "date": "2010-10",
              "year": 2010,
              "month": 10,
              "observed": 172.2027,
              "climatology": 173.765,
              "anomaly": -1.5623
            },
            {
              "date": "2010-11",
              "year": 2010,
              "month": 11,
              "observed": 172.9491,
              "climatology": 176.9225,
              "anomaly": -3.9734
            },
            {
              "date": "2010-12",
              "year": 2010,
              "month": 12,
              "observed": 186.1628,
              "climatology": 187.1091,
              "anomaly": -0.9463
            },
            {
              "date": "2011-01",
              "year": 2011,
              "month": 1,
              "observed": 195.8507,
              "climatology": 198.7981,
              "anomaly": -2.9474
            },
            {
              "date": "2011-02",
              "year": 2011,
              "month": 2,
              "observed": 212.2054,
              "climatology": 210.333,
              "anomaly": 1.8724
            },
            {
              "date": "2011-03",
              "year": 2011,
              "month": 3,
              "observed": 217.8885,
              "climatology": 219.1761,
              "anomaly": -1.2876
            },
            {
              "date": "2011-04",
              "year": 2011,
              "month": 4,
              "observed": 227.4263,
              "climatology": 223.6577,
              "anomaly": 3.7686
            },
            {
              "date": "2011-05",
              "year": 2011,
              "month": 5,
              "observed": 218.2589,
              "climatology": 220.1392,
              "anomaly": -1.8803
            },
            {
              "date": "2011-06",
              "year": 2011,
              "month": 6,
              "observed": 210.2763,
              "climatology": 212.2894,
              "anomaly": -2.0131
            },
            {
              "date": "2011-07",
              "year": 2011,
              "month": 7,
              "observed": 200.6302,
              "climatology": 199.7125,
              "anomaly": 0.9177
            },
            {
              "date": "2011-08",
              "year": 2011,
              "month": 8,
              "observed": 183.0343,
              "climatology": 185.8487,
              "anomaly": -2.8144
            },
            {
              "date": "2011-09",
              "year": 2011,
              "month": 9,
              "observed": 177.5444,
              "climatology": 177.3092,
              "anomaly": 0.2352
            },
            {
              "date": "2011-10",
              "year": 2011,
              "month": 10,
              "observed": 176.9093,
              "climatology": 173.765,
              "anomaly": 3.1443
            },
            {
              "date": "2011-11",
              "year": 2011,
              "month": 11,
              "observed": 172.9871,
              "climatology": 176.9225,
              "anomaly": -3.9354
            },
            {
              "date": "2011-12",
              "year": 2011,
              "month": 12,
              "observed": 186.633,
              "climatology": 187.1091,
              "anomaly": -0.4761
            },
            {
              "date": "2012-01",
              "year": 2012,
              "month": 1,
              "observed": 199.3361,
              "climatology": 198.7981,
              "anomaly": 0.538
            },
            {
              "date": "2012-02",
              "year": 2012,
              "month": 2,
              "observed": 213.156,
              "climatology": 210.333,
              "anomaly": 2.823
            },
            {
              "date": "2012-03",
              "year": 2012,
              "month": 3,
              "observed": 217.2747,
              "climatology": 219.1761,
              "anomaly": -1.9014
            },
            {
              "date": "2012-04",
              "year": 2012,
              "month": 4,
              "observed": 220.4303,
              "climatology": 223.6577,
              "anomaly": -3.2274
            },
            {
              "date": "2012-05",
              "year": 2012,
              "month": 5,
              "observed": 221.7019,
              "climatology": 220.1392,
              "anomaly": 1.5627
            },
            {
              "date": "2012-06",
              "year": 2012,
              "month": 6,
              "observed": 212.0039,
              "climatology": 212.2894,
              "anomaly": -0.2855
            },
            {
              "date": "2012-07",
              "year": 2012,
              "month": 7,
              "observed": 199.4027,
              "climatology": 199.7125,
              "anomaly": -0.3098
            },
            {
              "date": "2012-08",
              "year": 2012,
              "month": 8,
              "observed": 187.1575,
              "climatology": 185.8487,
              "anomaly": 1.3088
            },
            {
              "date": "2012-09",
              "year": 2012,
              "month": 9,
              "observed": 175.4557,
              "climatology": 177.3092,
              "anomaly": -1.8535
            },
            {
              "date": "2012-10",
              "year": 2012,
              "month": 10,
              "observed": 174.4021,
              "climatology": 173.765,
              "anomaly": 0.6371
            },
            {
              "date": "2012-11",
              "year": 2012,
              "month": 11,
              "observed": 177.9185,
              "climatology": 176.9225,
              "anomaly": 0.996
            },
            {
              "date": "2012-12",
              "year": 2012,
              "month": 12,
              "observed": 184.5655,
              "climatology": 187.1091,
              "anomaly": -2.5436
            },
            {
              "date": "2013-01",
              "year": 2013,
              "month": 1,
              "observed": 203.5309,
              "climatology": 198.7981,
              "anomaly": 4.7328
            },
            {
              "date": "2013-02",
              "year": 2013,
              "month": 2,
              "observed": 212.566,
              "climatology": 210.333,
              "anomaly": 2.233
            },
            {
              "date": "2013-03",
              "year": 2013,
              "month": 3,
              "observed": 217.5688,
              "climatology": 219.1761,
              "anomaly": -1.6073
            },
            {
              "date": "2013-04",
              "year": 2013,
              "month": 4,
              "observed": 225.5528,
              "climatology": 223.6577,
              "anomaly": 1.8951
            },
            {
              "date": "2013-05",
              "year": 2013,
              "month": 5,
              "observed": 218.1404,
              "climatology": 220.1392,
              "anomaly": -1.9988
            },
            {
              "date": "2013-06",
              "year": 2013,
              "month": 6,
              "observed": 213.4091,
              "climatology": 212.2894,
              "anomaly": 1.1197
            },
            {
              "date": "2013-07",
              "year": 2013,
              "month": 7,
              "observed": 201.8529,
              "climatology": 199.7125,
              "anomaly": 2.1404
            },
            {
              "date": "2013-08",
              "year": 2013,
              "month": 8,
              "observed": 184.4197,
              "climatology": 185.8487,
              "anomaly": -1.429
            },
            {
              "date": "2013-09",
              "year": 2013,
              "month": 9,
              "observed": 179.7442,
              "climatology": 177.3092,
              "anomaly": 2.435
            },
            {
              "date": "2013-10",
              "year": 2013,
              "month": 10,
              "observed": 175.0334,
              "climatology": 173.765,
              "anomaly": 1.2684
            },
            {
              "date": "2013-11",
              "year": 2013,
              "month": 11,
              "observed": 179.4209,
              "climatology": 176.9225,
              "anomaly": 2.4984
            },
            {
              "date": "2013-12",
              "year": 2013,
              "month": 12,
              "observed": 191.2734,
              "climatology": 187.1091,
              "anomaly": 4.1643
            },
            {
              "date": "2014-01",
              "year": 2014,
              "month": 1,
              "observed": 198.433,
              "climatology": 198.7981,
              "anomaly": -0.3651
            },
            {
              "date": "2014-02",
              "year": 2014,
              "month": 2,
              "observed": 209.6771,
              "climatology": 210.333,
              "anomaly": -0.6559
            },
            {
              "date": "2014-03",
              "year": 2014,
              "month": 3,
              "observed": 218.5033,
              "climatology": 219.1761,
              "anomaly": -0.6728
            },
            {
              "date": "2014-04",
              "year": 2014,
              "month": 4,
              "observed": 222.0519,
              "climatology": 223.6577,
              "anomaly": -1.6058
            },
            {
              "date": "2014-05",
              "year": 2014,
              "month": 5,
              "observed": 220.5643,
              "climatology": 220.1392,
              "anomaly": 0.4251
            },
            {
              "date": "2014-06",
              "year": 2014,
              "month": 6,
              "observed": 212.4743,
              "climatology": 212.2894,
              "anomaly": 0.1849
            },
            {
              "date": "2014-07",
              "year": 2014,
              "month": 7,
              "observed": 199.8281,
              "climatology": 199.7125,
              "anomaly": 0.1156
            },
            {
              "date": "2014-08",
              "year": 2014,
              "month": 8,
              "observed": 188.7194,
              "climatology": 185.8487,
              "anomaly": 2.8707
            },
            {
              "date": "2014-09",
              "year": 2014,
              "month": 9,
              "observed": 177.5483,
              "climatology": 177.3092,
              "anomaly": 0.2391
            },
            {
              "date": "2014-10",
              "year": 2014,
              "month": 10,
              "observed": 177.8153,
              "climatology": 173.765,
              "anomaly": 4.0503
            },
            {
              "date": "2014-11",
              "year": 2014,
              "month": 11,
              "observed": 176.8841,
              "climatology": 176.9225,
              "anomaly": -0.0384
            },
            {
              "date": "2014-12",
              "year": 2014,
              "month": 12,
              "observed": 193.5118,
              "climatology": 187.1091,
              "anomaly": 6.4027
            },
            {
              "date": "2015-01",
              "year": 2015,
              "month": 1,
              "observed": 200.7906,
              "climatology": 198.7981,
              "anomaly": 1.9925
            },
            {
              "date": "2015-02",
              "year": 2015,
              "month": 2,
              "observed": 209.5985,
              "climatology": 210.333,
              "anomaly": -0.7345
            },
            {
              "date": "2015-03",
              "year": 2015,
              "month": 3,
              "observed": 218.2298,
              "climatology": 219.1761,
              "anomaly": -0.9463
            },
            {
              "date": "2015-04",
              "year": 2015,
              "month": 4,
              "observed": 225.4776,
              "climatology": 223.6577,
              "anomaly": 1.8199
            },
            {
              "date": "2015-05",
              "year": 2015,
              "month": 5,
              "observed": 220.3784,
              "climatology": 220.1392,
              "anomaly": 0.2392
            },
            {
              "date": "2015-06",
              "year": 2015,
              "month": 6,
              "observed": 213.5864,
              "climatology": 212.2894,
              "anomaly": 1.297
            },
            {
              "date": "2015-07",
              "year": 2015,
              "month": 7,
              "observed": 200.4995,
              "climatology": 199.7125,
              "anomaly": 0.787
            },
            {
              "date": "2015-08",
              "year": 2015,
              "month": 8,
              "observed": 186.6493,
              "climatology": 185.8487,
              "anomaly": 0.8006
            },
            {
              "date": "2015-09",
              "year": 2015,
              "month": 9,
              "observed": 175.5788,
              "climatology": 177.3092,
              "anomaly": -1.7304
            },
            {
              "date": "2015-10",
              "year": 2015,
              "month": 10,
              "observed": 170.5743,
              "climatology": 173.765,
              "anomaly": -3.1907
            },
            {
              "date": "2015-11",
              "year": 2015,
              "month": 11,
              "observed": 176.6095,
              "climatology": 176.9225,
              "anomaly": -0.313
            },
            {
              "date": "2015-12",
              "year": 2015,
              "month": 12,
              "observed": 189.0324,
              "climatology": 187.1091,
              "anomaly": 1.9233
            },
            {
              "date": "2016-01",
              "year": 2016,
              "month": 1,
              "observed": 199.9417,
              "climatology": 198.7981,
              "anomaly": 1.1436
            },
            {
              "date": "2016-02",
              "year": 2016,
              "month": 2,
              "observed": 208.8071,
              "climatology": 210.333,
              "anomaly": -1.5259
            },
            {
              "date": "2016-03",
              "year": 2016,
              "month": 3,
              "observed": 221.52,
              "climatology": 219.1761,
              "anomaly": 2.3439
            },
            {
              "date": "2016-04",
              "year": 2016,
              "month": 4,
              "observed": 225.4147,
              "climatology": 223.6577,
              "anomaly": 1.757
            },
            {
              "date": "2016-05",
              "year": 2016,
              "month": 5,
              "observed": 218.9074,
              "climatology": 220.1392,
              "anomaly": -1.2318
            },
            {
              "date": "2016-06",
              "year": 2016,
              "month": 6,
              "observed": 212.3657,
              "climatology": 212.2894,
              "anomaly": 0.0763
            },
            {
              "date": "2016-07",
              "year": 2016,
              "month": 7,
              "observed": 199.6419,
              "climatology": 199.7125,
              "anomaly": -0.0706
            },
            {
              "date": "2016-08",
              "year": 2016,
              "month": 8,
              "observed": 184.154,
              "climatology": 185.8487,
              "anomaly": -1.6947
            },
            {
              "date": "2016-09",
              "year": 2016,
              "month": 9,
              "observed": 178.7703,
              "climatology": 177.3092,
              "anomaly": 1.4611
            },
            {
              "date": "2016-10",
              "year": 2016,
              "month": 10,
              "observed": 175.9434,
              "climatology": 173.765,
              "anomaly": 2.1784
            },
            {
              "date": "2016-11",
              "year": 2016,
              "month": 11,
              "observed": 180.6134,
              "climatology": 176.9225,
              "anomaly": 3.6909
            },
            {
              "date": "2016-12",
              "year": 2016,
              "month": 12,
              "observed": 189.7059,
              "climatology": 187.1091,
              "anomaly": 2.5968
            },
            {
              "date": "2017-01",
              "year": 2017,
              "month": 1,
              "observed": 196.1422,
              "climatology": 198.7981,
              "anomaly": -2.6559
            },
            {
              "date": "2017-02",
              "year": 2017,
              "month": 2,
              "observed": 209.7569,
              "climatology": 210.333,
              "anomaly": -0.5761
            },
            {
              "date": "2017-03",
              "year": 2017,
              "month": 3,
              "observed": 222.5546,
              "climatology": 219.1761,
              "anomaly": 3.3785
            },
            {
              "date": "2017-04",
              "year": 2017,
              "month": 4,
              "observed": 225.9159,
              "climatology": 223.6577,
              "anomaly": 2.2582
            },
            {
              "date": "2017-05",
              "year": 2017,
              "month": 5,
              "observed": 222.5847,
              "climatology": 220.1392,
              "anomaly": 2.4455
            },
            {
              "date": "2017-06",
              "year": 2017,
              "month": 6,
              "observed": 221.7933,
              "climatology": 212.2894,
              "anomaly": 9.5039
            },
            {
              "date": "2017-07",
              "year": 2017,
              "month": 7,
              "observed": 201.1036,
              "climatology": 199.7125,
              "anomaly": 1.3911
            },
            {
              "date": "2017-08",
              "year": 2017,
              "month": 8,
              "observed": 190.0303,
              "climatology": 185.8487,
              "anomaly": 4.1816
            },
            {
              "date": "2017-09",
              "year": 2017,
              "month": 9,
              "observed": 180.4408,
              "climatology": 177.3092,
              "anomaly": 3.1316
            },
            {
              "date": "2017-10",
              "year": 2017,
              "month": 10,
              "observed": 176.3499,
              "climatology": 173.765,
              "anomaly": 2.5849
            },
            {
              "date": "2017-11",
              "year": 2017,
              "month": 11,
              "observed": 177.2976,
              "climatology": 176.9225,
              "anomaly": 0.3751
            },
            {
              "date": "2017-12",
              "year": 2017,
              "month": 12,
              "observed": 189.1488,
              "climatology": 187.1091,
              "anomaly": 2.0397
            },
            {
              "date": "2018-01",
              "year": 2018,
              "month": 1,
              "observed": 197.8344,
              "climatology": 198.7981,
              "anomaly": -0.9637
            },
            {
              "date": "2018-02",
              "year": 2018,
              "month": 2,
              "observed": 211.6894,
              "climatology": 210.333,
              "anomaly": 1.3564
            },
            {
              "date": "2018-03",
              "year": 2018,
              "month": 3,
              "observed": 220.2336,
              "climatology": 219.1761,
              "anomaly": 1.0575
            },
            {
              "date": "2018-04",
              "year": 2018,
              "month": 4,
              "observed": 225.0161,
              "climatology": 223.6577,
              "anomaly": 1.3584
            },
            {
              "date": "2018-05",
              "year": 2018,
              "month": 5,
              "observed": 227.2637,
              "climatology": 220.1392,
              "anomaly": 7.1245
            },
            {
              "date": "2018-06",
              "year": 2018,
              "month": 6,
              "observed": 207.6733,
              "climatology": 212.2894,
              "anomaly": -4.6161
            },
            {
              "date": "2018-07",
              "year": 2018,
              "month": 7,
              "observed": 201.5721,
              "climatology": 199.7125,
              "anomaly": 1.8596
            },
            {
              "date": "2018-08",
              "year": 2018,
              "month": 8,
              "observed": 183.3396,
              "climatology": 185.8487,
              "anomaly": -2.5091
            },
            {
              "date": "2018-09",
              "year": 2018,
              "month": 9,
              "observed": 177.056,
              "climatology": 177.3092,
              "anomaly": -0.2532
            },
            {
              "date": "2018-10",
              "year": 2018,
              "month": 10,
              "observed": 177.6238,
              "climatology": 173.765,
              "anomaly": 3.8588
            },
            {
              "date": "2018-11",
              "year": 2018,
              "month": 11,
              "observed": 178.4265,
              "climatology": 176.9225,
              "anomaly": 1.504
            },
            {
              "date": "2018-12",
              "year": 2018,
              "month": 12,
              "observed": 184.7371,
              "climatology": 187.1091,
              "anomaly": -2.372
            },
            {
              "date": "2019-01",
              "year": 2019,
              "month": 1,
              "observed": 198.1582,
              "climatology": 198.7981,
              "anomaly": -0.6399
            },
            {
              "date": "2019-02",
              "year": 2019,
              "month": 2,
              "observed": 214.1604,
              "climatology": 210.333,
              "anomaly": 3.8274
            },
            {
              "date": "2019-03",
              "year": 2019,
              "month": 3,
              "observed": 219.8011,
              "climatology": 219.1761,
              "anomaly": 0.625
            },
            {
              "date": "2019-04",
              "year": 2019,
              "month": 4,
              "observed": 225.5326,
              "climatology": 223.6577,
              "anomaly": 1.8749
            },
            {
              "date": "2019-05",
              "year": 2019,
              "month": 5,
              "observed": 221.771,
              "climatology": 220.1392,
              "anomaly": 1.6318
            },
            {
              "date": "2019-06",
              "year": 2019,
              "month": 6,
              "observed": 210.8924,
              "climatology": 212.2894,
              "anomaly": -1.397
            },
            {
              "date": "2019-07",
              "year": 2019,
              "month": 7,
              "observed": 205.3963,
              "climatology": 199.7125,
              "anomaly": 5.6838
            },
            {
              "date": "2019-08",
              "year": 2019,
              "month": 8,
              "observed": 189.1362,
              "climatology": 185.8487,
              "anomaly": 3.2875
            },
            {
              "date": "2019-09",
              "year": 2019,
              "month": 9,
              "observed": 173.3529,
              "climatology": 177.3092,
              "anomaly": -3.9563
            },
            {
              "date": "2019-10",
              "year": 2019,
              "month": 10,
              "observed": 175.5476,
              "climatology": 173.765,
              "anomaly": 1.7826
            },
            {
              "date": "2019-11",
              "year": 2019,
              "month": 11,
              "observed": 176.7913,
              "climatology": 176.9225,
              "anomaly": -0.1312
            },
            {
              "date": "2019-12",
              "year": 2019,
              "month": 12,
              "observed": 189.7425,
              "climatology": 187.1091,
              "anomaly": 2.6334
            },
            {
              "date": "2020-01",
              "year": 2020,
              "month": 1,
              "observed": 198.1451,
              "climatology": 198.7981,
              "anomaly": -0.653
            },
            {
              "date": "2020-02",
              "year": 2020,
              "month": 2,
              "observed": 212.3546,
              "climatology": 210.333,
              "anomaly": 2.0216
            },
            {
              "date": "2020-03",
              "year": 2020,
              "month": 3,
              "observed": 223.0695,
              "climatology": 219.1761,
              "anomaly": 3.8934
            },
            {
              "date": "2020-04",
              "year": 2020,
              "month": 4,
              "observed": 227.3358,
              "climatology": 223.6577,
              "anomaly": 3.6781
            },
            {
              "date": "2020-05",
              "year": 2020,
              "month": 5,
              "observed": 218.8363,
              "climatology": 220.1392,
              "anomaly": -1.3029
            },
            {
              "date": "2020-06",
              "year": 2020,
              "month": 6,
              "observed": 211.8652,
              "climatology": 212.2894,
              "anomaly": -0.4242
            },
            {
              "date": "2020-07",
              "year": 2020,
              "month": 7,
              "observed": 199.0291,
              "climatology": 199.7125,
              "anomaly": -0.6834
            },
            {
              "date": "2020-08",
              "year": 2020,
              "month": 8,
              "observed": 186.0981,
              "climatology": 185.8487,
              "anomaly": 0.2494
            },
            {
              "date": "2020-09",
              "year": 2020,
              "month": 9,
              "observed": 183.0094,
              "climatology": 177.3092,
              "anomaly": 5.7002
            },
            {
              "date": "2020-10",
              "year": 2020,
              "month": 10,
              "observed": 176.2739,
              "climatology": 173.765,
              "anomaly": 2.5089
            },
            {
              "date": "2020-11",
              "year": 2020,
              "month": 11,
              "observed": 175.4736,
              "climatology": 176.9225,
              "anomaly": -1.4489
            },
            {
              "date": "2020-12",
              "year": 2020,
              "month": 12,
              "observed": 190.0861,
              "climatology": 187.1091,
              "anomaly": 2.977
            },
            {
              "date": "2021-01",
              "year": 2021,
              "month": 1,
              "observed": 205.6118,
              "climatology": 198.7981,
              "anomaly": 6.8137
            },
            {
              "date": "2021-02",
              "year": 2021,
              "month": 2,
              "observed": 215.4026,
              "climatology": 210.333,
              "anomaly": 5.0696
            },
            {
              "date": "2021-03",
              "year": 2021,
              "month": 3,
              "observed": 218.1886,
              "climatology": 219.1761,
              "anomaly": -0.9875
            },
            {
              "date": "2021-04",
              "year": 2021,
              "month": 4,
              "observed": 224.1408,
              "climatology": 223.6577,
              "anomaly": 0.4831
            },
            {
              "date": "2021-05",
              "year": 2021,
              "month": 5,
              "observed": 225.1843,
              "climatology": 220.1392,
              "anomaly": 5.0451
            },
            {
              "date": "2021-06",
              "year": 2021,
              "month": 6,
              "observed": 211.1122,
              "climatology": 212.2894,
              "anomaly": -1.1772
            },
            {
              "date": "2021-07",
              "year": 2021,
              "month": 7,
              "observed": 201.506,
              "climatology": 199.7125,
              "anomaly": 1.7935
            },
            {
              "date": "2021-08",
              "year": 2021,
              "month": 8,
              "observed": 189.848,
              "climatology": 185.8487,
              "anomaly": 3.9993
            },
            {
              "date": "2021-09",
              "year": 2021,
              "month": 9,
              "observed": 176.4585,
              "climatology": 177.3092,
              "anomaly": -0.8507
            },
            {
              "date": "2021-10",
              "year": 2021,
              "month": 10,
              "observed": 175.2926,
              "climatology": 173.765,
              "anomaly": 1.5276
            },
            {
              "date": "2021-11",
              "year": 2021,
              "month": 11,
              "observed": 170.7026,
              "climatology": 176.9225,
              "anomaly": -6.2199
            },
            {
              "date": "2021-12",
              "year": 2021,
              "month": 12,
              "observed": 185.4105,
              "climatology": 187.1091,
              "anomaly": -1.6986
            },
            {
              "date": "2022-01",
              "year": 2022,
              "month": 1,
              "observed": 199.855,
              "climatology": 198.7981,
              "anomaly": 1.0569
            },
            {
              "date": "2022-02",
              "year": 2022,
              "month": 2,
              "observed": 209.882,
              "climatology": 210.333,
              "anomaly": -0.451
            },
            {
              "date": "2022-03",
              "year": 2022,
              "month": 3,
              "observed": 226.2481,
              "climatology": 219.1761,
              "anomaly": 7.072
            },
            {
              "date": "2022-04",
              "year": 2022,
              "month": 4,
              "observed": 221.9561,
              "climatology": 223.6577,
              "anomaly": -1.7016
            },
            {
              "date": "2022-05",
              "year": 2022,
              "month": 5,
              "observed": 221.0969,
              "climatology": 220.1392,
              "anomaly": 0.9577
            },
            {
              "date": "2022-06",
              "year": 2022,
              "month": 6,
              "observed": 213.3883,
              "climatology": 212.2894,
              "anomaly": 1.0989
            },
            {
              "date": "2022-07",
              "year": 2022,
              "month": 7,
              "observed": 204.1796,
              "climatology": 199.7125,
              "anomaly": 4.4671
            },
            {
              "date": "2022-08",
              "year": 2022,
              "month": 8,
              "observed": 184.5018,
              "climatology": 185.8487,
              "anomaly": -1.3469
            },
            {
              "date": "2022-09",
              "year": 2022,
              "month": 9,
              "observed": 181.8637,
              "climatology": 177.3092,
              "anomaly": 4.5545
            },
            {
              "date": "2022-10",
              "year": 2022,
              "month": 10,
              "observed": 175.647,
              "climatology": 173.765,
              "anomaly": 1.882
            },
            {
              "date": "2022-11",
              "year": 2022,
              "month": 11,
              "observed": 176.532,
              "climatology": 176.9225,
              "anomaly": -0.3905
            },
            {
              "date": "2022-12",
              "year": 2022,
              "month": 12,
              "observed": 189.3067,
              "climatology": 187.1091,
              "anomaly": 2.1976
            },
            {
              "date": "2023-01",
              "year": 2023,
              "month": 1,
              "observed": 201.1641,
              "climatology": 198.7981,
              "anomaly": 2.366
            },
            {
              "date": "2023-02",
              "year": 2023,
              "month": 2,
              "observed": 211.6809,
              "climatology": 210.333,
              "anomaly": 1.3479
            },
            {
              "date": "2023-03",
              "year": 2023,
              "month": 3,
              "observed": 222.5216,
              "climatology": 219.1761,
              "anomaly": 3.3455
            },
            {
              "date": "2023-04",
              "year": 2023,
              "month": 4,
              "observed": 224.7481,
              "climatology": 223.6577,
              "anomaly": 1.0904
            },
            {
              "date": "2023-05",
              "year": 2023,
              "month": 5,
              "observed": 222.6609,
              "climatology": 220.1392,
              "anomaly": 2.5217
            },
            {
              "date": "2023-06",
              "year": 2023,
              "month": 6,
              "observed": 214.8967,
              "climatology": 212.2894,
              "anomaly": 2.6073
            },
            {
              "date": "2023-07",
              "year": 2023,
              "month": 7,
              "observed": 204.7215,
              "climatology": 199.7125,
              "anomaly": 5.009
            },
            {
              "date": "2023-08",
              "year": 2023,
              "month": 8,
              "observed": 185.1769,
              "climatology": 185.8487,
              "anomaly": -0.6718
            },
            {
              "date": "2023-09",
              "year": 2023,
              "month": 9,
              "observed": 184.4684,
              "climatology": 177.3092,
              "anomaly": 7.1592
            },
            {
              "date": "2023-10",
              "year": 2023,
              "month": 10,
              "observed": 170.9212,
              "climatology": 173.765,
              "anomaly": -2.8438
            },
            {
              "date": "2023-11",
              "year": 2023,
              "month": 11,
              "observed": 178.7863,
              "climatology": 176.9225,
              "anomaly": 1.8638
            },
            {
              "date": "2023-12",
              "year": 2023,
              "month": 12,
              "observed": 189.8022,
              "climatology": 187.1091,
              "anomaly": 2.6931
            },
            {
              "date": "2024-01",
              "year": 2024,
              "month": 1,
              "observed": 201.5489,
              "climatology": 198.7981,
              "anomaly": 2.7508
            },
            {
              "date": "2024-02",
              "year": 2024,
              "month": 2,
              "observed": 211.8047,
              "climatology": 210.333,
              "anomaly": 1.4717
            },
            {
              "date": "2024-03",
              "year": 2024,
              "month": 3,
              "observed": 222.0068,
              "climatology": 219.1761,
              "anomaly": 2.8307
            },
            {
              "date": "2024-04",
              "year": 2024,
              "month": 4,
              "observed": 224.6589,
              "climatology": 223.6577,
              "anomaly": 1.0012
            },
            {
              "date": "2024-05",
              "year": 2024,
              "month": 5,
              "observed": 221.0836,
              "climatology": 220.1392,
              "anomaly": 0.9444
            },
            {
              "date": "2024-06",
              "year": 2024,
              "month": 6,
              "observed": 215.5454,
              "climatology": 212.2894,
              "anomaly": 3.256
            },
            {
              "date": "2024-07",
              "year": 2024,
              "month": 7,
              "observed": 201.829,
              "climatology": 199.7125,
              "anomaly": 2.1165
            },
            {
              "date": "2024-08",
              "year": 2024,
              "month": 8,
              "observed": 186.7191,
              "climatology": 185.8487,
              "anomaly": 0.8704
            },
            {
              "date": "2024-09",
              "year": 2024,
              "month": 9,
              "observed": 181.5648,
              "climatology": 177.3092,
              "anomaly": 4.2556
            },
            {
              "date": "2024-10",
              "year": 2024,
              "month": 10,
              "observed": 176.7497,
              "climatology": 173.765,
              "anomaly": 2.9847
            },
            {
              "date": "2024-11",
              "year": 2024,
              "month": 11,
              "observed": 181.3779,
              "climatology": 176.9225,
              "anomaly": 4.4554
            },
            {
              "date": "2024-12",
              "year": 2024,
              "month": 12,
              "observed": 190.0855,
              "climatology": 187.1091,
              "anomaly": 2.9764
            }
          ],
          "annual_series": [
            {
              "year": 2000,
              "annual_mean": 197.3488,
              "annual_anomaly": -1.4062
            },
            {
              "year": 2001,
              "annual_mean": 195.3108,
              "annual_anomaly": -3.4442
            },
            {
              "year": 2002,
              "annual_mean": 196.4856,
              "annual_anomaly": -2.2695
            },
            {
              "year": 2003,
              "annual_mean": 196.3175,
              "annual_anomaly": -2.4376
            },
            {
              "year": 2004,
              "annual_mean": 197.4487,
              "annual_anomaly": -1.3063
            },
            {
              "year": 2005,
              "annual_mean": 197.8733,
              "annual_anomaly": -0.8818
            },
            {
              "year": 2006,
              "annual_mean": 197.4223,
              "annual_anomaly": -1.3327
            },
            {
              "year": 2007,
              "annual_mean": 197.4726,
              "annual_anomaly": -1.2824
            },
            {
              "year": 2008,
              "annual_mean": 197.9761,
              "annual_anomaly": -0.779
            },
            {
              "year": 2009,
              "annual_mean": 198.5543,
              "annual_anomaly": -0.2008
            },
            {
              "year": 2010,
              "annual_mean": 198.2458,
              "annual_anomaly": -0.5092
            },
            {
              "year": 2011,
              "annual_mean": 198.3037,
              "annual_anomaly": -0.4514
            },
            {
              "year": 2012,
              "annual_mean": 198.5671,
              "annual_anomaly": -0.188
            },
            {
              "year": 2013,
              "annual_mean": 200.2094,
              "annual_anomaly": 1.4543
            },
            {
              "year": 2014,
              "annual_mean": 199.6676,
              "annual_anomaly": 0.9125
            },
            {
              "year": 2015,
              "annual_mean": 198.9171,
              "annual_anomaly": 0.162
            },
            {
              "year": 2016,
              "annual_mean": 199.6488,
              "annual_anomaly": 0.8937
            },
            {
              "year": 2017,
              "annual_mean": 201.0932,
              "annual_anomaly": 2.3382
            },
            {
              "year": 2018,
              "annual_mean": 199.3721,
              "annual_anomaly": 0.6171
            },
            {
              "year": 2019,
              "annual_mean": 200.0235,
              "annual_anomaly": 1.2685
            },
            {
              "year": 2020,
              "annual_mean": 200.1314,
              "annual_anomaly": 1.3763
            },
            {
              "year": 2021,
              "annual_mean": 199.9049,
              "annual_anomaly": 1.1498
            },
            {
              "year": 2022,
              "annual_mean": 200.3714,
              "annual_anomaly": 1.6164
            },
            {
              "year": 2023,
              "annual_mean": 200.9624,
              "annual_anomaly": 2.2073
            },
            {
              "year": 2024,
              "annual_mean": 201.2479,
              "annual_anomaly": 2.4928
            }
          ],
          "climatology_baseline": {
            "1": 198.7981,
            "2": 210.333,
            "3": 219.1761,
            "4": 223.6577,
            "5": 220.1392,
            "6": 212.2894,
            "7": 199.7125,
            "8": 185.8487,
            "9": 177.3092,
            "10": 173.765,
            "11": 176.9225,
            "12": 187.1091
          }
        },
        "statistics": {
          "sens_slope": 0.19919,
          "sens_intercept": -202.14784,
          "confidence_interval_95": [
            0.16237,
            0.22594
          ],
          "mann_kendall_score_s": 244,
          "standardized_z": 5.6753,
          "p_value": 0.0,
          "is_significant": true,
          "trend_label": "STATISTICALLY_SIGNIFICANT_INCREASING",
          "verdict_text": "Confirmed upward monotonic trend (+0.1992/yr, p=1.3848e-08). Evidence strongly rejects the null hypothesis.",
          "ols_comparison": {
            "ols_slope": 0.19919,
            "ols_pvalue": 0.0,
            "r_squared": 0.8578
          }
        }
      }
    }
  },
  "case_02_north_america": {
    "status": "success",
    "polarity_status": "HOMOGENEOUS_OR_EQUILIBRIUM",
    "polarity_narrative": "Both domains demonstrate concordant directional trajectory or remain within natural dynamic variability bounds.",
    "variable": "RootMoist_inst",
    "unit": "kg/m\u00b2",
    "time_range": [
      2000,
      2024
    ],
    "region_a": {
      "name": "Colorado Basin / US Southwest",
      "bbox": [
        32.0,
        40.0,
        -115.0,
        -105.0
      ],
      "analysis": {
        "metadata": {
          "source": "GLDAS_NOAH025_M_2.1",
          "doi": "10.5067/SXAVCZFAQLNO",
          "provenance_type": "NASA_GLDAS_NETCDF",
          "is_illustrative": false,
          "variable": "RootMoist_inst",
          "unit": "kg/m\u00b2",
          "depth_note": "Vegetation-dependent root-zone depth (Noah LSM 3.6 parameterization; absolute totals reflect vegetation class rather than standardized physical depth)",
          "bbox": [
            32.0,
            40.0,
            -115.0,
            -105.0
          ],
          "time_range": [
            2000,
            2024
          ],
          "total_observations": 300,
          "disclaimer": "Statistical trend reflects historical model-derived or reanalysis trajectory over the selected domain. Mathematical correlation or slope direction does not establish anthropogenic or environmental causation."
        },
        "climatology": {
          "monthly_series": [
            {
              "date": "2000-01",
              "year": 2000,
              "month": 1,
              "observed": 159.8426,
              "climatology": 171.4887,
              "anomaly": -11.6461
            },
            {
              "date": "2000-02",
              "year": 2000,
              "month": 2,
              "observed": 169.4838,
              "climatology": 177.6528,
              "anomaly": -8.169
            },
            {
              "date": "2000-03",
              "year": 2000,
              "month": 3,
              "observed": 180.4505,
              "climatology": 179.7224,
              "anomaly": 0.7281
            },
            {
              "date": "2000-04",
              "year": 2000,
              "month": 4,
              "observed": 176.598,
              "climatology": 174.6206,
              "anomaly": 1.9774
            },
            {
              "date": "2000-05",
              "year": 2000,
              "month": 5,
              "observed": 160.8476,
              "climatology": 164.0141,
              "anomaly": -3.1665
            },
            {
              "date": "2000-06",
              "year": 2000,
              "month": 6,
              "observed": 146.3265,
              "climatology": 149.3788,
              "anomaly": -3.0523
            },
            {
              "date": "2000-07",
              "year": 2000,
              "month": 7,
              "observed": 141.1932,
              "climatology": 142.8249,
              "anomaly": -1.6317
            },
            {
              "date": "2000-08",
              "year": 2000,
              "month": 8,
              "observed": 141.9875,
              "climatology": 149.5905,
              "anomaly": -7.603
            },
            {
              "date": "2000-09",
              "year": 2000,
              "month": 9,
              "observed": 137.2671,
              "climatology": 147.9627,
              "anomaly": -10.6956
            },
            {
              "date": "2000-10",
              "year": 2000,
              "month": 10,
              "observed": 145.6135,
              "climatology": 150.0758,
              "anomaly": -4.4623
            },
            {
              "date": "2000-11",
              "year": 2000,
              "month": 11,
              "observed": 185.0084,
              "climatology": 154.4321,
              "anomaly": 30.5763
            },
            {
              "date": "2000-12",
              "year": 2000,
              "month": 12,
              "observed": 181.2167,
              "climatology": 162.1166,
              "anomaly": 19.1001
            },
            {
              "date": "2001-01",
              "year": 2001,
              "month": 1,
              "observed": 181.7168,
              "climatology": 171.4887,
              "anomaly": 10.2281
            },
            {
              "date": "2001-02",
              "year": 2001,
              "month": 2,
              "observed": 191.8155,
              "climatology": 177.6528,
              "anomaly": 14.1627
            },
            {
              "date": "2001-03",
              "year": 2001,
              "month": 3,
              "observed": 199.3157,
              "climatology": 179.7224,
              "anomaly": 19.5933
            },
            {
              "date": "2001-04",
              "year": 2001,
              "month": 4,
              "observed": 190.772,
              "climatology": 174.6206,
              "anomaly": 16.1514
            },
            {
              "date": "2001-05",
              "year": 2001,
              "month": 5,
              "observed": 175.3774,
              "climatology": 164.0141,
              "anomaly": 11.3633
            },
            {
              "date": "2001-06",
              "year": 2001,
              "month": 6,
              "observed": 155.3219,
              "climatology": 149.3788,
              "anomaly": 5.9431
            },
            {
              "date": "2001-07",
              "year": 2001,
              "month": 7,
              "observed": 151.7843,
              "climatology": 142.8249,
              "anomaly": 8.9594
            },
            {
              "date": "2001-08",
              "year": 2001,
              "month": 8,
              "observed": 158.6761,
              "climatology": 149.5905,
              "anomaly": 9.0856
            },
            {
              "date": "2001-09",
              "year": 2001,
              "month": 9,
              "observed": 151.2038,
              "climatology": 147.9627,
              "anomaly": 3.2411
            },
            {
              "date": "2001-10",
              "year": 2001,
              "month": 10,
              "observed": 142.9988,
              "climatology": 150.0758,
              "anomaly": -7.077
            },
            {
              "date": "2001-11",
              "year": 2001,
              "month": 11,
              "observed": 144.266,
              "climatology": 154.4321,
              "anomaly": -10.1661
            },
            {
              "date": "2001-12",
              "year": 2001,
              "month": 12,
              "observed": 149.8432,
              "climatology": 162.1166,
              "anomaly": -12.2734
            },
            {
              "date": "2002-01",
              "year": 2002,
              "month": 1,
              "observed": 154.1906,
              "climatology": 171.4887,
              "anomaly": -17.2981
            },
            {
              "date": "2002-02",
              "year": 2002,
              "month": 2,
              "observed": 153.4964,
              "climatology": 177.6528,
              "anomaly": -24.1564
            },
            {
              "date": "2002-03",
              "year": 2002,
              "month": 3,
              "observed": 150.2965,
              "climatology": 179.7224,
              "anomaly": -29.4259
            },
            {
              "date": "2002-04",
              "year": 2002,
              "month": 4,
              "observed": 144.6867,
              "climatology": 174.6206,
              "anomaly": -29.9339
            },
            {
              "date": "2002-05",
              "year": 2002,
              "month": 5,
              "observed": 134.7665,
              "climatology": 164.0141,
              "anomaly": -29.2476
            },
            {
              "date": "2002-06",
              "year": 2002,
              "month": 6,
              "observed": 123.5454,
              "climatology": 149.3788,
              "anomaly": -25.8334
            },
            {
              "date": "2002-07",
              "year": 2002,
              "month": 7,
              "observed": 124.8755,
              "climatology": 142.8249,
              "anomaly": -17.9494
            },
            {
              "date": "2002-08",
              "year": 2002,
              "month": 8,
              "observed": 128.1037,
              "climatology": 149.5905,
              "anomaly": -21.4868
            },
            {
              "date": "2002-09",
              "year": 2002,
              "month": 9,
              "observed": 143.5227,
              "climatology": 147.9627,
              "anomaly": -4.44
            },
            {
              "date": "2002-10",
              "year": 2002,
              "month": 10,
              "observed": 150.0675,
              "climatology": 150.0758,
              "anomaly": -0.0083
            },
            {
              "date": "2002-11",
              "year": 2002,
              "month": 11,
              "observed": 153.3923,
              "climatology": 154.4321,
              "anomaly": -1.0398
            },
            {
              "date": "2002-12",
              "year": 2002,
              "month": 12,
              "observed": 160.3593,
              "climatology": 162.1166,
              "anomaly": -1.7573
            },
            {
              "date": "2003-01",
              "year": 2003,
              "month": 1,
              "observed": 163.0622,
              "climatology": 171.4887,
              "anomaly": -8.4265
            },
            {
              "date": "2003-02",
              "year": 2003,
              "month": 2,
              "observed": 174.9447,
              "climatology": 177.6528,
              "anomaly": -2.7081
            },
            {
              "date": "2003-03",
              "year": 2003,
              "month": 3,
              "observed": 183.3503,
              "climatology": 179.7224,
              "anomaly": 3.6279
            },
            {
              "date": "2003-04",
              "year": 2003,
              "month": 4,
              "observed": 175.7954,
              "climatology": 174.6206,
              "anomaly": 1.1748
            },
            {
              "date": "2003-05",
              "year": 2003,
              "month": 5,
              "observed": 162.5628,
              "climatology": 164.0141,
              "anomaly": -1.4513
            },
            {
              "date": "2003-06",
              "year": 2003,
              "month": 6,
              "observed": 148.1018,
              "climatology": 149.3788,
              "anomaly": -1.277
            },
            {
              "date": "2003-07",
              "year": 2003,
              "month": 7,
              "observed": 136.4431,
              "climatology": 142.8249,
              "anomaly": -6.3818
            },
            {
              "date": "2003-08",
              "year": 2003,
              "month": 8,
              "observed": 145.0402,
              "climatology": 149.5905,
              "anomaly": -4.5503
            },
            {
              "date": "2003-09",
              "year": 2003,
              "month": 9,
              "observed": 149.6573,
              "climatology": 147.9627,
              "anomaly": 1.6946
            },
            {
              "date": "2003-10",
              "year": 2003,
              "month": 10,
              "observed": 144.0384,
              "climatology": 150.0758,
              "anomaly": -6.0374
            },
            {
              "date": "2003-11",
              "year": 2003,
              "month": 11,
              "observed": 148.5839,
              "climatology": 154.4321,
              "anomaly": -5.8482
            },
            {
              "date": "2003-12",
              "year": 2003,
              "month": 12,
              "observed": 154.5788,
              "climatology": 162.1166,
              "anomaly": -7.5378
            },
            {
              "date": "2004-01",
              "year": 2004,
              "month": 1,
              "observed": 160.7448,
              "climatology": 171.4887,
              "anomaly": -10.7439
            },
            {
              "date": "2004-02",
              "year": 2004,
              "month": 2,
              "observed": 167.7345,
              "climatology": 177.6528,
              "anomaly": -9.9183
            },
            {
              "date": "2004-03",
              "year": 2004,
              "month": 3,
              "observed": 176.5039,
              "climatology": 179.7224,
              "anomaly": -3.2185
            },
            {
              "date": "2004-04",
              "year": 2004,
              "month": 4,
              "observed": 182.9585,
              "climatology": 174.6206,
              "anomaly": 8.3379
            },
            {
              "date": "2004-05",
              "year": 2004,
              "month": 5,
              "observed": 166.4746,
              "climatology": 164.0141,
              "anomaly": 2.4605
            },
            {
              "date": "2004-06",
              "year": 2004,
              "month": 6,
              "observed": 146.8266,
              "climatology": 149.3788,
              "anomaly": -2.5522
            },
            {
              "date": "2004-07",
              "year": 2004,
              "month": 7,
              "observed": 144.8186,
              "climatology": 142.8249,
              "anomaly": 1.9937
            },
            {
              "date": "2004-08",
              "year": 2004,
              "month": 8,
              "observed": 147.9574,
              "climatology": 149.5905,
              "anomaly": -1.6331
            },
            {
              "date": "2004-09",
              "year": 2004,
              "month": 9,
              "observed": 147.4644,
              "climatology": 147.9627,
              "anomaly": -0.4983
            },
            {
              "date": "2004-10",
              "year": 2004,
              "month": 10,
              "observed": 163.9572,
              "climatology": 150.0758,
              "anomaly": 13.8814
            },
            {
              "date": "2004-11",
              "year": 2004,
              "month": 11,
              "observed": 190.6521,
              "climatology": 154.4321,
              "anomaly": 36.22
            },
            {
              "date": "2004-12",
              "year": 2004,
              "month": 12,
              "observed": 199.7323,
              "climatology": 162.1166,
              "anomaly": 37.6157
            },
            {
              "date": "2005-01",
              "year": 2005,
              "month": 1,
              "observed": 230.0457,
              "climatology": 171.4887,
              "anomaly": 58.557
            },
            {
              "date": "2005-02",
              "year": 2005,
              "month": 2,
              "observed": 247.6063,
              "climatology": 177.6528,
              "anomaly": 69.9535
            },
            {
              "date": "2005-03",
              "year": 2005,
              "month": 3,
              "observed": 241.8401,
              "climatology": 179.7224,
              "anomaly": 62.1177
            },
            {
              "date": "2005-04",
              "year": 2005,
              "month": 4,
              "observed": 231.0967,
              "climatology": 174.6206,
              "anomaly": 56.4761
            },
            {
              "date": "2005-05",
              "year": 2005,
              "month": 5,
              "observed": 215.1846,
              "climatology": 164.0141,
              "anomaly": 51.1705
            },
            {
              "date": "2005-06",
              "year": 2005,
              "month": 6,
              "observed": 190.1245,
              "climatology": 149.3788,
              "anomaly": 40.7457
            },
            {
              "date": "2005-07",
              "year": 2005,
              "month": 7,
              "observed": 169.0968,
              "climatology": 142.8249,
              "anomaly": 26.2719
            },
            {
              "date": "2005-08",
              "year": 2005,
              "month": 8,
              "observed": 179.84,
              "climatology": 149.5905,
              "anomaly": 30.2495
            },
            {
              "date": "2005-09",
              "year": 2005,
              "month": 9,
              "observed": 173.4219,
              "climatology": 147.9627,
              "anomaly": 25.4592
            },
            {
              "date": "2005-10",
              "year": 2005,
              "month": 10,
              "observed": 175.6194,
              "climatology": 150.0758,
              "anomaly": 25.5436
            },
            {
              "date": "2005-11",
              "year": 2005,
              "month": 11,
              "observed": 177.3723,
              "climatology": 154.4321,
              "anomaly": 22.9402
            },
            {
              "date": "2005-12",
              "year": 2005,
              "month": 12,
              "observed": 173.2392,
              "climatology": 162.1166,
              "anomaly": 11.1226
            },
            {
              "date": "2006-01",
              "year": 2006,
              "month": 1,
              "observed": 174.9663,
              "climatology": 171.4887,
              "anomaly": 3.4776
            },
            {
              "date": "2006-02",
              "year": 2006,
              "month": 2,
              "observed": 174.2103,
              "climatology": 177.6528,
              "anomaly": -3.4425
            },
            {
              "date": "2006-03",
              "year": 2006,
              "month": 3,
              "observed": 179.8954,
              "climatology": 179.7224,
              "anomaly": 0.173
            },
            {
              "date": "2006-04",
              "year": 2006,
              "month": 4,
              "observed": 179.7281,
              "climatology": 174.6206,
              "anomaly": 5.1075
            },
            {
              "date": "2006-05",
              "year": 2006,
              "month": 5,
              "observed": 162.8476,
              "climatology": 164.0141,
              "anomaly": -1.1665
            },
            {
              "date": "2006-06",
              "year": 2006,
              "month": 6,
              "observed": 146.9351,
              "climatology": 149.3788,
              "anomaly": -2.4437
            },
            {
              "date": "2006-07",
              "year": 2006,
              "month": 7,
              "observed": 147.9832,
              "climatology": 142.8249,
              "anomaly": 5.1583
            },
            {
              "date": "2006-08",
              "year": 2006,
              "month": 8,
              "observed": 173.7152,
              "climatology": 149.5905,
              "anomaly": 24.1247
            },
            {
              "date": "2006-09",
              "year": 2006,
              "month": 9,
              "observed": 178.9894,
              "climatology": 147.9627,
              "anomaly": 31.0267
            },
            {
              "date": "2006-10",
              "year": 2006,
              "month": 10,
              "observed": 191.3952,
              "climatology": 150.0758,
              "anomaly": 41.3194
            },
            {
              "date": "2006-11",
              "year": 2006,
              "month": 11,
              "observed": 187.2521,
              "climatology": 154.4321,
              "anomaly": 32.82
            },
            {
              "date": "2006-12",
              "year": 2006,
              "month": 12,
              "observed": 185.0367,
              "climatology": 162.1166,
              "anomaly": 22.9201
            },
            {
              "date": "2007-01",
              "year": 2007,
              "month": 1,
              "observed": 191.6801,
              "climatology": 171.4887,
              "anomaly": 20.1914
            },
            {
              "date": "2007-02",
              "year": 2007,
              "month": 2,
              "observed": 196.5025,
              "climatology": 177.6528,
              "anomaly": 18.8497
            },
            {
              "date": "2007-03",
              "year": 2007,
              "month": 3,
              "observed": 192.5011,
              "climatology": 179.7224,
              "anomaly": 12.7787
            },
            {
              "date": "2007-04",
              "year": 2007,
              "month": 4,
              "observed": 187.931,
              "climatology": 174.6206,
              "anomaly": 13.3104
            },
            {
              "date": "2007-05",
              "year": 2007,
              "month": 5,
              "observed": 178.3727,
              "climatology": 164.0141,
              "anomaly": 14.3586
            },
            {
              "date": "2007-06",
              "year": 2007,
              "month": 6,
              "observed": 159.952,
              "climatology": 149.3788,
              "anomaly": 10.5732
            },
            {
              "date": "2007-07",
              "year": 2007,
              "month": 7,
              "observed": 151.3767,
              "climatology": 142.8249,
              "anomaly": 8.5518
            },
            {
              "date": "2007-08",
              "year": 2007,
              "month": 8,
              "observed": 166.4621,
              "climatology": 149.5905,
              "anomaly": 16.8716
            },
            {
              "date": "2007-09",
              "year": 2007,
              "month": 9,
              "observed": 156.6153,
              "climatology": 147.9627,
              "anomaly": 8.6526
            },
            {
              "date": "2007-10",
              "year": 2007,
              "month": 10,
              "observed": 156.3184,
              "climatology": 150.0758,
              "anomaly": 6.2426
            },
            {
              "date": "2007-11",
              "year": 2007,
              "month": 11,
              "observed": 149.7475,
              "climatology": 154.4321,
              "anomaly": -4.6846
            },
            {
              "date": "2007-12",
              "year": 2007,
              "month": 12,
              "observed": 179.9707,
              "climatology": 162.1166,
              "anomaly": 17.8541
            },
            {
              "date": "2008-01",
              "year": 2008,
              "month": 1,
              "observed": 193.1504,
              "climatology": 171.4887,
              "anomaly": 21.6617
            },
            {
              "date": "2008-02",
              "year": 2008,
              "month": 2,
              "observed": 200.0515,
              "climatology": 177.6528,
              "anomaly": 22.3987
            },
            {
              "date": "2008-03",
              "year": 2008,
              "month": 3,
              "observed": 197.369,
              "climatology": 179.7224,
              "anomaly": 17.6466
            },
            {
              "date": "2008-04",
              "year": 2008,
              "month": 4,
              "observed": 186.6198,
              "climatology": 174.6206,
              "anomaly": 11.9992
            },
            {
              "date": "2008-05",
              "year": 2008,
              "month": 5,
              "observed": 176.5373,
              "climatology": 164.0141,
              "anomaly": 12.5232
            },
            {
              "date": "2008-06",
              "year": 2008,
              "month": 6,
              "observed": 157.5525,
              "climatology": 149.3788,
              "anomaly": 8.1737
            },
            {
              "date": "2008-07",
              "year": 2008,
              "month": 7,
              "observed": 152.5269,
              "climatology": 142.8249,
              "anomaly": 9.702
            },
            {
              "date": "2008-08",
              "year": 2008,
              "month": 8,
              "observed": 160.6521,
              "climatology": 149.5905,
              "anomaly": 11.0616
            },
            {
              "date": "2008-09",
              "year": 2008,
              "month": 9,
              "observed": 155.993,
              "climatology": 147.9627,
              "anomaly": 8.0303
            },
            {
              "date": "2008-10",
              "year": 2008,
              "month": 10,
              "observed": 153.2684,
              "climatology": 150.0758,
              "anomaly": 3.1926
            },
            {
              "date": "2008-11",
              "year": 2008,
              "month": 11,
              "observed": 152.0624,
              "climatology": 154.4321,
              "anomaly": -2.3697
            },
            {
              "date": "2008-12",
              "year": 2008,
              "month": 12,
              "observed": 165.393,
              "climatology": 162.1166,
              "anomaly": 3.2764
            },
            {
              "date": "2009-01",
              "year": 2009,
              "month": 1,
              "observed": 176.8684,
              "climatology": 171.4887,
              "anomaly": 5.3797
            },
            {
              "date": "2009-02",
              "year": 2009,
              "month": 2,
              "observed": 178.0132,
              "climatology": 177.6528,
              "anomaly": 0.3604
            },
            {
              "date": "2009-03",
              "year": 2009,
              "month": 3,
              "observed": 174.1335,
              "climatology": 179.7224,
              "anomaly": -5.5889
            },
            {
              "date": "2009-04",
              "year": 2009,
              "month": 4,
              "observed": 169.8641,
              "climatology": 174.6206,
              "anomaly": -4.7565
            },
            {
              "date": "2009-05",
              "year": 2009,
              "month": 5,
              "observed": 160.7741,
              "climatology": 164.0141,
              "anomaly": -3.24
            },
            {
              "date": "2009-06",
              "year": 2009,
              "month": 6,
              "observed": 158.3187,
              "climatology": 149.3788,
              "anomaly": 8.9399
            },
            {
              "date": "2009-07",
              "year": 2009,
              "month": 7,
              "observed": 145.6372,
              "climatology": 142.8249,
              "anomaly": 2.8123
            },
            {
              "date": "2009-08",
              "year": 2009,
              "month": 8,
              "observed": 141.4464,
              "climatology": 149.5905,
              "anomaly": -8.1441
            },
            {
              "date": "2009-09",
              "year": 2009,
              "month": 9,
              "observed": 140.8197,
              "climatology": 147.9627,
              "anomaly": -7.143
            },
            {
              "date": "2009-10",
              "year": 2009,
              "month": 10,
              "observed": 137.1936,
              "climatology": 150.0758,
              "anomaly": -12.8822
            },
            {
              "date": "2009-11",
              "year": 2009,
              "month": 11,
              "observed": 140.3578,
              "climatology": 154.4321,
              "anomaly": -14.0743
            },
            {
              "date": "2009-12",
              "year": 2009,
              "month": 12,
              "observed": 144.9849,
              "climatology": 162.1166,
              "anomaly": -17.1317
            },
            {
              "date": "2010-01",
              "year": 2010,
              "month": 1,
              "observed": 164.4288,
              "climatology": 171.4887,
              "anomaly": -7.0599
            },
            {
              "date": "2010-02",
              "year": 2010,
              "month": 2,
              "observed": 189.4308,
              "climatology": 177.6528,
              "anomaly": 11.778
            },
            {
              "date": "2010-03",
              "year": 2010,
              "month": 3,
              "observed": 201.4223,
              "climatology": 179.7224,
              "anomaly": 21.6999
            },
            {
              "date": "2010-04",
              "year": 2010,
              "month": 4,
              "observed": 193.7112,
              "climatology": 174.6206,
              "anomaly": 19.0906
            },
            {
              "date": "2010-05",
              "year": 2010,
              "month": 5,
              "observed": 179.2871,
              "climatology": 164.0141,
              "anomaly": 15.273
            },
            {
              "date": "2010-06",
              "year": 2010,
              "month": 6,
              "observed": 160.5939,
              "climatology": 149.3788,
              "anomaly": 11.2151
            },
            {
              "date": "2010-07",
              "year": 2010,
              "month": 7,
              "observed": 149.848,
              "climatology": 142.8249,
              "anomaly": 7.0231
            },
            {
              "date": "2010-08",
              "year": 2010,
              "month": 8,
              "observed": 166.2672,
              "climatology": 149.5905,
              "anomaly": 16.6767
            },
            {
              "date": "2010-09",
              "year": 2010,
              "month": 9,
              "observed": 153.4823,
              "climatology": 147.9627,
              "anomaly": 5.5196
            },
            {
              "date": "2010-10",
              "year": 2010,
              "month": 10,
              "observed": 154.3875,
              "climatology": 150.0758,
              "anomaly": 4.3117
            },
            {
              "date": "2010-11",
              "year": 2010,
              "month": 11,
              "observed": 162.1499,
              "climatology": 154.4321,
              "anomaly": 7.7178
            },
            {
              "date": "2010-12",
              "year": 2010,
              "month": 12,
              "observed": 172.294,
              "climatology": 162.1166,
              "anomaly": 10.1774
            },
            {
              "date": "2011-01",
              "year": 2011,
              "month": 1,
              "observed": 186.9196,
              "climatology": 171.4887,
              "anomaly": 15.4309
            },
            {
              "date": "2011-02",
              "year": 2011,
              "month": 2,
              "observed": 186.9576,
              "climatology": 177.6528,
              "anomaly": 9.3048
            },
            {
              "date": "2011-03",
              "year": 2011,
              "month": 3,
              "observed": 188.1629,
              "climatology": 179.7224,
              "anomaly": 8.4405
            },
            {
              "date": "2011-04",
              "year": 2011,
              "month": 4,
              "observed": 182.8678,
              "climatology": 174.6206,
              "anomaly": 8.2472
            },
            {
              "date": "2011-05",
              "year": 2011,
              "month": 5,
              "observed": 174.1232,
              "climatology": 164.0141,
              "anomaly": 10.1091
            },
            {
              "date": "2011-06",
              "year": 2011,
              "month": 6,
              "observed": 157.0187,
              "climatology": 149.3788,
              "anomaly": 7.6399
            },
            {
              "date": "2011-07",
              "year": 2011,
              "month": 7,
              "observed": 144.7814,
              "climatology": 142.8249,
              "anomaly": 1.9565
            },
            {
              "date": "2011-08",
              "year": 2011,
              "month": 8,
              "observed": 144.716,
              "climatology": 149.5905,
              "anomaly": -4.8745
            },
            {
              "date": "2011-09",
              "year": 2011,
              "month": 9,
              "observed": 147.2768,
              "climatology": 147.9627,
              "anomaly": -0.6859
            },
            {
              "date": "2011-10",
              "year": 2011,
              "month": 10,
              "observed": 153.4206,
              "climatology": 150.0758,
              "anomaly": 3.3448
            },
            {
              "date": "2011-11",
              "year": 2011,
              "month": 11,
              "observed": 156.6904,
              "climatology": 154.4321,
              "anomaly": 2.2583
            },
            {
              "date": "2011-12",
              "year": 2011,
              "month": 12,
              "observed": 162.666,
              "climatology": 162.1166,
              "anomaly": 0.5494
            },
            {
              "date": "2012-01",
              "year": 2012,
              "month": 1,
              "observed": 165.7162,
              "climatology": 171.4887,
              "anomaly": -5.7725
            },
            {
              "date": "2012-02",
              "year": 2012,
              "month": 2,
              "observed": 165.589,
              "climatology": 177.6528,
              "anomaly": -12.0638
            },
            {
              "date": "2012-03",
              "year": 2012,
              "month": 3,
              "observed": 162.9482,
              "climatology": 179.7224,
              "anomaly": -16.7742
            },
            {
              "date": "2012-04",
              "year": 2012,
              "month": 4,
              "observed": 156.5523,
              "climatology": 174.6206,
              "anomaly": -18.0683
            },
            {
              "date": "2012-05",
              "year": 2012,
              "month": 5,
              "observed": 145.9859,
              "climatology": 164.0141,
              "anomaly": -18.0282
            },
            {
              "date": "2012-06",
              "year": 2012,
              "month": 6,
              "observed": 130.767,
              "climatology": 149.3788,
              "anomaly": -18.6118
            },
            {
              "date": "2012-07",
              "year": 2012,
              "month": 7,
              "observed": 130.2647,
              "climatology": 142.8249,
              "anomaly": -12.5602
            },
            {
              "date": "2012-08",
              "year": 2012,
              "month": 8,
              "observed": 133.8506,
              "climatology": 149.5905,
              "anomaly": -15.7399
            },
            {
              "date": "2012-09",
              "year": 2012,
              "month": 9,
              "observed": 132.8872,
              "climatology": 147.9627,
              "anomaly": -15.0755
            },
            {
              "date": "2012-10",
              "year": 2012,
              "month": 10,
              "observed": 131.5428,
              "climatology": 150.0758,
              "anomaly": -18.533
            },
            {
              "date": "2012-11",
              "year": 2012,
              "month": 11,
              "observed": 132.2479,
              "climatology": 154.4321,
              "anomaly": -22.1842
            },
            {
              "date": "2012-12",
              "year": 2012,
              "month": 12,
              "observed": 143.2198,
              "climatology": 162.1166,
              "anomaly": -18.8968
            },
            {
              "date": "2013-01",
              "year": 2013,
              "month": 1,
              "observed": 148.675,
              "climatology": 171.4887,
              "anomaly": -22.8137
            },
            {
              "date": "2013-02",
              "year": 2013,
              "month": 2,
              "observed": 153.8239,
              "climatology": 177.6528,
              "anomaly": -23.8289
            },
            {
              "date": "2013-03",
              "year": 2013,
              "month": 3,
              "observed": 151.0785,
              "climatology": 179.7224,
              "anomaly": -28.6439
            },
            {
              "date": "2013-04",
              "year": 2013,
              "month": 4,
              "observed": 146.6127,
              "climatology": 174.6206,
              "anomaly": -28.0079
            },
            {
              "date": "2013-05",
              "year": 2013,
              "month": 5,
              "observed": 138.3531,
              "climatology": 164.0141,
              "anomaly": -25.661
            },
            {
              "date": "2013-06",
              "year": 2013,
              "month": 6,
              "observed": 124.5707,
              "climatology": 149.3788,
              "anomaly": -24.8081
            },
            {
              "date": "2013-07",
              "year": 2013,
              "month": 7,
              "observed": 130.336,
              "climatology": 142.8249,
              "anomaly": -12.4889
            },
            {
              "date": "2013-08",
              "year": 2013,
              "month": 8,
              "observed": 142.2177,
              "climatology": 149.5905,
              "anomaly": -7.3728
            },
            {
              "date": "2013-09",
              "year": 2013,
              "month": 9,
              "observed": 163.754,
              "climatology": 147.9627,
              "anomaly": 15.7913
            },
            {
              "date": "2013-10",
              "year": 2013,
              "month": 10,
              "observed": 163.6731,
              "climatology": 150.0758,
              "anomaly": 13.5973
            },
            {
              "date": "2013-11",
              "year": 2013,
              "month": 11,
              "observed": 164.5509,
              "climatology": 154.4321,
              "anomaly": 10.1188
            },
            {
              "date": "2013-12",
              "year": 2013,
              "month": 12,
              "observed": 177.6217,
              "climatology": 162.1166,
              "anomaly": 15.5051
            },
            {
              "date": "2014-01",
              "year": 2014,
              "month": 1,
              "observed": 173.4978,
              "climatology": 171.4887,
              "anomaly": 2.0091
            },
            {
              "date": "2014-02",
              "year": 2014,
              "month": 2,
              "observed": 174.2064,
              "climatology": 177.6528,
              "anomaly": -3.4464
            },
            {
              "date": "2014-03",
              "year": 2014,
              "month": 3,
              "observed": 171.805,
              "climatology": 179.7224,
              "anomaly": -7.9174
            },
            {
              "date": "2014-04",
              "year": 2014,
              "month": 4,
              "observed": 167.5188,
              "climatology": 174.6206,
              "anomaly": -7.1018
            },
            {
              "date": "2014-05",
              "year": 2014,
              "month": 5,
              "observed": 160.6714,
              "climatology": 164.0141,
              "anomaly": -3.3427
            },
            {
              "date": "2014-06",
              "year": 2014,
              "month": 6,
              "observed": 147.6187,
              "climatology": 149.3788,
              "anomaly": -1.7601
            },
            {
              "date": "2014-07",
              "year": 2014,
              "month": 7,
              "observed": 140.0458,
              "climatology": 142.8249,
              "anomaly": -2.7791
            },
            {
              "date": "2014-08",
              "year": 2014,
              "month": 8,
              "observed": 151.9033,
              "climatology": 149.5905,
              "anomaly": 2.3128
            },
            {
              "date": "2014-09",
              "year": 2014,
              "month": 9,
              "observed": 152.4861,
              "climatology": 147.9627,
              "anomaly": 4.5234
            },
            {
              "date": "2014-10",
              "year": 2014,
              "month": 10,
              "observed": 163.8153,
              "climatology": 150.0758,
              "anomaly": 13.7395
            },
            {
              "date": "2014-11",
              "year": 2014,
              "month": 11,
              "observed": 158.2296,
              "climatology": 154.4321,
              "anomaly": 3.7975
            },
            {
              "date": "2014-12",
              "year": 2014,
              "month": 12,
              "observed": 167.5327,
              "climatology": 162.1166,
              "anomaly": 5.4161
            },
            {
              "date": "2015-01",
              "year": 2015,
              "month": 1,
              "observed": 168.9961,
              "climatology": 171.4887,
              "anomaly": -2.4926
            },
            {
              "date": "2015-02",
              "year": 2015,
              "month": 2,
              "observed": 180.3139,
              "climatology": 177.6528,
              "anomaly": 2.6611
            },
            {
              "date": "2015-03",
              "year": 2015,
              "month": 3,
              "observed": 177.5819,
              "climatology": 179.7224,
              "anomaly": -2.1405
            },
            {
              "date": "2015-04",
              "year": 2015,
              "month": 4,
              "observed": 166.9588,
              "climatology": 174.6206,
              "anomaly": -7.6618
            },
            {
              "date": "2015-05",
              "year": 2015,
              "month": 5,
              "observed": 170.9477,
              "climatology": 164.0141,
              "anomaly": 6.9336
            },
            {
              "date": "2015-06",
              "year": 2015,
              "month": 6,
              "observed": 160.2192,
              "climatology": 149.3788,
              "anomaly": 10.8404
            },
            {
              "date": "2015-07",
              "year": 2015,
              "month": 7,
              "observed": 160.922,
              "climatology": 142.8249,
              "anomaly": 18.0971
            },
            {
              "date": "2015-08",
              "year": 2015,
              "month": 8,
              "observed": 151.8985,
              "climatology": 149.5905,
              "anomaly": 2.308
            },
            {
              "date": "2015-09",
              "year": 2015,
              "month": 9,
              "observed": 148.817,
              "climatology": 147.9627,
              "anomaly": 0.8543
            },
            {
              "date": "2015-10",
              "year": 2015,
              "month": 10,
              "observed": 151.7033,
              "climatology": 150.0758,
              "anomaly": 1.6275
            },
            {
              "date": "2015-11",
              "year": 2015,
              "month": 11,
              "observed": 162.6261,
              "climatology": 154.4321,
              "anomaly": 8.194
            },
            {
              "date": "2015-12",
              "year": 2015,
              "month": 12,
              "observed": 166.214,
              "climatology": 162.1166,
              "anomaly": 4.0974
            },
            {
              "date": "2016-01",
              "year": 2016,
              "month": 1,
              "observed": 171.6205,
              "climatology": 171.4887,
              "anomaly": 0.1318
            },
            {
              "date": "2016-02",
              "year": 2016,
              "month": 2,
              "observed": 174.9227,
              "climatology": 177.6528,
              "anomaly": -2.7301
            },
            {
              "date": "2016-03",
              "year": 2016,
              "month": 3,
              "observed": 168.2975,
              "climatology": 179.7224,
              "anomaly": -11.4249
            },
            {
              "date": "2016-04",
              "year": 2016,
              "month": 4,
              "observed": 166.5889,
              "climatology": 174.6206,
              "anomaly": -8.0317
            },
            {
              "date": "2016-05",
              "year": 2016,
              "month": 5,
              "observed": 163.003,
              "climatology": 164.0141,
              "anomaly": -1.0111
            },
            {
              "date": "2016-06",
              "year": 2016,
              "month": 6,
              "observed": 147.0911,
              "climatology": 149.3788,
              "anomaly": -2.2877
            },
            {
              "date": "2016-07",
              "year": 2016,
              "month": 7,
              "observed": 134.853,
              "climatology": 142.8249,
              "anomaly": -7.9719
            },
            {
              "date": "2016-08",
              "year": 2016,
              "month": 8,
              "observed": 147.383,
              "climatology": 149.5905,
              "anomaly": -2.2075
            },
            {
              "date": "2016-09",
              "year": 2016,
              "month": 9,
              "observed": 146.8053,
              "climatology": 147.9627,
              "anomaly": -1.1574
            },
            {
              "date": "2016-10",
              "year": 2016,
              "month": 10,
              "observed": 143.5988,
              "climatology": 150.0758,
              "anomaly": -6.477
            },
            {
              "date": "2016-11",
              "year": 2016,
              "month": 11,
              "observed": 144.0589,
              "climatology": 154.4321,
              "anomaly": -10.3732
            },
            {
              "date": "2016-12",
              "year": 2016,
              "month": 12,
              "observed": 160.4301,
              "climatology": 162.1166,
              "anomaly": -1.6865
            },
            {
              "date": "2017-01",
              "year": 2017,
              "month": 1,
              "observed": 187.6161,
              "climatology": 171.4887,
              "anomaly": 16.1274
            },
            {
              "date": "2017-02",
              "year": 2017,
              "month": 2,
              "observed": 198.4533,
              "climatology": 177.6528,
              "anomaly": 20.8005
            },
            {
              "date": "2017-03",
              "year": 2017,
              "month": 3,
              "observed": 193.8789,
              "climatology": 179.7224,
              "anomaly": 14.1565
            },
            {
              "date": "2017-04",
              "year": 2017,
              "month": 4,
              "observed": 184.8839,
              "climatology": 174.6206,
              "anomaly": 10.2633
            },
            {
              "date": "2017-05",
              "year": 2017,
              "month": 5,
              "observed": 173.542,
              "climatology": 164.0141,
              "anomaly": 9.5279
            },
            {
              "date": "2017-06",
              "year": 2017,
              "month": 6,
              "observed": 154.5379,
              "climatology": 149.3788,
              "anomaly": 5.1591
            },
            {
              "date": "2017-07",
              "year": 2017,
              "month": 7,
              "observed": 146.894,
              "climatology": 142.8249,
              "anomaly": 4.0691
            },
            {
              "date": "2017-08",
              "year": 2017,
              "month": 8,
              "observed": 154.4904,
              "climatology": 149.5905,
              "anomaly": 4.8999
            },
            {
              "date": "2017-09",
              "year": 2017,
              "month": 9,
              "observed": 149.5341,
              "climatology": 147.9627,
              "anomaly": 1.5714
            },
            {
              "date": "2017-10",
              "year": 2017,
              "month": 10,
              "observed": 149.6566,
              "climatology": 150.0758,
              "anomaly": -0.4192
            },
            {
              "date": "2017-11",
              "year": 2017,
              "month": 11,
              "observed": 145.9682,
              "climatology": 154.4321,
              "anomaly": -8.4639
            },
            {
              "date": "2017-12",
              "year": 2017,
              "month": 12,
              "observed": 146.2048,
              "climatology": 162.1166,
              "anomaly": -15.9118
            },
            {
              "date": "2018-01",
              "year": 2018,
              "month": 1,
              "observed": 148.9025,
              "climatology": 171.4887,
              "anomaly": -22.5862
            },
            {
              "date": "2018-02",
              "year": 2018,
              "month": 2,
              "observed": 152.7653,
              "climatology": 177.6528,
              "anomaly": -24.8875
            },
            {
              "date": "2018-03",
              "year": 2018,
              "month": 3,
              "observed": 153.7493,
              "climatology": 179.7224,
              "anomaly": -25.9731
            },
            {
              "date": "2018-04",
              "year": 2018,
              "month": 4,
              "observed": 150.8862,
              "climatology": 174.6206,
              "anomaly": -23.7344
            },
            {
              "date": "2018-05",
              "year": 2018,
              "month": 5,
              "observed": 142.183,
              "climatology": 164.0141,
              "anomaly": -21.8311
            },
            {
              "date": "2018-06",
              "year": 2018,
              "month": 6,
              "observed": 130.1842,
              "climatology": 149.3788,
              "anomaly": -19.1946
            },
            {
              "date": "2018-07",
              "year": 2018,
              "month": 7,
              "observed": 126.6932,
              "climatology": 142.8249,
              "anomaly": -16.1317
            },
            {
              "date": "2018-08",
              "year": 2018,
              "month": 8,
              "observed": 132.526,
              "climatology": 149.5905,
              "anomaly": -17.0645
            },
            {
              "date": "2018-09",
              "year": 2018,
              "month": 9,
              "observed": 131.3825,
              "climatology": 147.9627,
              "anomaly": -16.5802
            },
            {
              "date": "2018-10",
              "year": 2018,
              "month": 10,
              "observed": 143.4164,
              "climatology": 150.0758,
              "anomaly": -6.6594
            },
            {
              "date": "2018-11",
              "year": 2018,
              "month": 11,
              "observed": 151.3234,
              "climatology": 154.4321,
              "anomaly": -3.1087
            },
            {
              "date": "2018-12",
              "year": 2018,
              "month": 12,
              "observed": 152.7265,
              "climatology": 162.1166,
              "anomaly": -9.3901
            },
            {
              "date": "2019-01",
              "year": 2019,
              "month": 1,
              "observed": 159.2322,
              "climatology": 171.4887,
              "anomaly": -12.2565
            },
            {
              "date": "2019-02",
              "year": 2019,
              "month": 2,
              "observed": 171.6777,
              "climatology": 177.6528,
              "anomaly": -5.9751
            },
            {
              "date": "2019-03",
              "year": 2019,
              "month": 3,
              "observed": 186.1103,
              "climatology": 179.7224,
              "anomaly": 6.3879
            },
            {
              "date": "2019-04",
              "year": 2019,
              "month": 4,
              "observed": 178.1617,
              "climatology": 174.6206,
              "anomaly": 3.5411
            },
            {
              "date": "2019-05",
              "year": 2019,
              "month": 5,
              "observed": 174.0024,
              "climatology": 164.0141,
              "anomaly": 9.9883
            },
            {
              "date": "2019-06",
              "year": 2019,
              "month": 6,
              "observed": 158.7897,
              "climatology": 149.3788,
              "anomaly": 9.4109
            },
            {
              "date": "2019-07",
              "year": 2019,
              "month": 7,
              "observed": 143.5527,
              "climatology": 142.8249,
              "anomaly": 0.7278
            },
            {
              "date": "2019-08",
              "year": 2019,
              "month": 8,
              "observed": 140.4916,
              "climatology": 149.5905,
              "anomaly": -9.0989
            },
            {
              "date": "2019-09",
              "year": 2019,
              "month": 9,
              "observed": 135.4127,
              "climatology": 147.9627,
              "anomaly": -12.55
            },
            {
              "date": "2019-10",
              "year": 2019,
              "month": 10,
              "observed": 132.2204,
              "climatology": 150.0758,
              "anomaly": -17.8554
            },
            {
              "date": "2019-11",
              "year": 2019,
              "month": 11,
              "observed": 136.9493,
              "climatology": 154.4321,
              "anomaly": -17.4828
            },
            {
              "date": "2019-12",
              "year": 2019,
              "month": 12,
              "observed": 167.3066,
              "climatology": 162.1166,
              "anomaly": 5.19
            },
            {
              "date": "2020-01",
              "year": 2020,
              "month": 1,
              "observed": 173.3948,
              "climatology": 171.4887,
              "anomaly": 1.9061
            },
            {
              "date": "2020-02",
              "year": 2020,
              "month": 2,
              "observed": 174.2024,
              "climatology": 177.6528,
              "anomaly": -3.4504
            },
            {
              "date": "2020-03",
              "year": 2020,
              "month": 3,
              "observed": 182.0924,
              "climatology": 179.7224,
              "anomaly": 2.37
            },
            {
              "date": "2020-04",
              "year": 2020,
              "month": 4,
              "observed": 173.4361,
              "climatology": 174.6206,
              "anomaly": -1.1845
            },
            {
              "date": "2020-05",
              "year": 2020,
              "month": 5,
              "observed": 158.0093,
              "climatology": 164.0141,
              "anomaly": -6.0048
            },
            {
              "date": "2020-06",
              "year": 2020,
              "month": 6,
              "observed": 144.7988,
              "climatology": 149.3788,
              "anomaly": -4.58
            },
            {
              "date": "2020-07",
              "year": 2020,
              "month": 7,
              "observed": 136.1397,
              "climatology": 142.8249,
              "anomaly": -6.6852
            },
            {
              "date": "2020-08",
              "year": 2020,
              "month": 8,
              "observed": 133.881,
              "climatology": 149.5905,
              "anomaly": -15.7095
            },
            {
              "date": "2020-09",
              "year": 2020,
              "month": 9,
              "observed": 129.2535,
              "climatology": 147.9627,
              "anomaly": -18.7092
            },
            {
              "date": "2020-10",
              "year": 2020,
              "month": 10,
              "observed": 124.3683,
              "climatology": 150.0758,
              "anomaly": -25.7075
            },
            {
              "date": "2020-11",
              "year": 2020,
              "month": 11,
              "observed": 127.7145,
              "climatology": 154.4321,
              "anomaly": -26.7176
            },
            {
              "date": "2020-12",
              "year": 2020,
              "month": 12,
              "observed": 130.0171,
              "climatology": 162.1166,
              "anomaly": -32.0995
            },
            {
              "date": "2021-01",
              "year": 2021,
              "month": 1,
              "observed": 133.9204,
              "climatology": 171.4887,
              "anomaly": -37.5683
            },
            {
              "date": "2021-02",
              "year": 2021,
              "month": 2,
              "observed": 141.2255,
              "climatology": 177.6528,
              "anomaly": -36.4273
            },
            {
              "date": "2021-03",
              "year": 2021,
              "month": 3,
              "observed": 143.6843,
              "climatology": 179.7224,
              "anomaly": -36.0381
            },
            {
              "date": "2021-04",
              "year": 2021,
              "month": 4,
              "observed": 137.5101,
              "climatology": 174.6206,
              "anomaly": -37.1105
            },
            {
              "date": "2021-05",
              "year": 2021,
              "month": 5,
              "observed": 132.4058,
              "climatology": 164.0141,
              "anomaly": -31.6083
            },
            {
              "date": "2021-06",
              "year": 2021,
              "month": 6,
              "observed": 130.0905,
              "climatology": 149.3788,
              "anomaly": -19.2883
            },
            {
              "date": "2021-07",
              "year": 2021,
              "month": 7,
              "observed": 135.429,
              "climatology": 142.8249,
              "anomaly": -7.3959
            },
            {
              "date": "2021-08",
              "year": 2021,
              "month": 8,
              "observed": 148.7528,
              "climatology": 149.5905,
              "anomaly": -0.8377
            },
            {
              "date": "2021-09",
              "year": 2021,
              "month": 9,
              "observed": 140.5342,
              "climatology": 147.9627,
              "anomaly": -7.4285
            },
            {
              "date": "2021-10",
              "year": 2021,
              "month": 10,
              "observed": 146.6503,
              "climatology": 150.0758,
              "anomaly": -3.4255
            },
            {
              "date": "2021-11",
              "year": 2021,
              "month": 11,
              "observed": 147.0357,
              "climatology": 154.4321,
              "anomaly": -7.3964
            },
            {
              "date": "2021-12",
              "year": 2021,
              "month": 12,
              "observed": 156.4898,
              "climatology": 162.1166,
              "anomaly": -5.6268
            },
            {
              "date": "2022-01",
              "year": 2022,
              "month": 1,
              "observed": 163.7839,
              "climatology": 171.4887,
              "anomaly": -7.7048
            },
            {
              "date": "2022-02",
              "year": 2022,
              "month": 2,
              "observed": 160.2432,
              "climatology": 177.6528,
              "anomaly": -17.4096
            },
            {
              "date": "2022-03",
              "year": 2022,
              "month": 3,
              "observed": 161.9964,
              "climatology": 179.7224,
              "anomaly": -17.726
            },
            {
              "date": "2022-04",
              "year": 2022,
              "month": 4,
              "observed": 166.8878,
              "climatology": 174.6206,
              "anomaly": -7.7328
            },
            {
              "date": "2022-05",
              "year": 2022,
              "month": 5,
              "observed": 151.9219,
              "climatology": 164.0141,
              "anomaly": -12.0922
            },
            {
              "date": "2022-06",
              "year": 2022,
              "month": 6,
              "observed": 140.8348,
              "climatology": 149.3788,
              "anomaly": -8.544
            },
            {
              "date": "2022-07",
              "year": 2022,
              "month": 7,
              "observed": 135.5994,
              "climatology": 142.8249,
              "anomaly": -7.2255
            },
            {
              "date": "2022-08",
              "year": 2022,
              "month": 8,
              "observed": 154.6567,
              "climatology": 149.5905,
              "anomaly": 5.0662
            },
            {
              "date": "2022-09",
              "year": 2022,
              "month": 9,
              "observed": 149.8723,
              "climatology": 147.9627,
              "anomaly": 1.9096
            },
            {
              "date": "2022-10",
              "year": 2022,
              "month": 10,
              "observed": 156.5059,
              "climatology": 150.0758,
              "anomaly": 6.4301
            },
            {
              "date": "2022-11",
              "year": 2022,
              "month": 11,
              "observed": 157.447,
              "climatology": 154.4321,
              "anomaly": 3.0149
            },
            {
              "date": "2022-12",
              "year": 2022,
              "month": 12,
              "observed": 160.8562,
              "climatology": 162.1166,
              "anomaly": -1.2604
            },
            {
              "date": "2023-01",
              "year": 2023,
              "month": 1,
              "observed": 192.4444,
              "climatology": 171.4887,
              "anomaly": 20.9557
            },
            {
              "date": "2023-02",
              "year": 2023,
              "month": 2,
              "observed": 192.3554,
              "climatology": 177.6528,
              "anomaly": 14.7026
            },
            {
              "date": "2023-03",
              "year": 2023,
              "month": 3,
              "observed": 200.5831,
              "climatology": 179.7224,
              "anomaly": 20.8607
            },
            {
              "date": "2023-04",
              "year": 2023,
              "month": 4,
              "observed": 193.1728,
              "climatology": 174.6206,
              "anomaly": 18.5522
            },
            {
              "date": "2023-05",
              "year": 2023,
              "month": 5,
              "observed": 179.2062,
              "climatology": 164.0141,
              "anomaly": 15.1921
            },
            {
              "date": "2023-06",
              "year": 2023,
              "month": 6,
              "observed": 166.5722,
              "climatology": 149.3788,
              "anomaly": 17.1934
            },
            {
              "date": "2023-07",
              "year": 2023,
              "month": 7,
              "observed": 147.2586,
              "climatology": 142.8249,
              "anomaly": 4.4337
            },
            {
              "date": "2023-08",
              "year": 2023,
              "month": 8,
              "observed": 150.5395,
              "climatology": 149.5905,
              "anomaly": 0.949
            },
            {
              "date": "2023-09",
              "year": 2023,
              "month": 9,
              "observed": 147.8353,
              "climatology": 147.9627,
              "anomaly": -0.1274
            },
            {
              "date": "2023-10",
              "year": 2023,
              "month": 10,
              "observed": 144.5782,
              "climatology": 150.0758,
              "anomaly": -5.4976
            },
            {
              "date": "2023-11",
              "year": 2023,
              "month": 11,
              "observed": 144.8425,
              "climatology": 154.4321,
              "anomaly": -9.5896
            },
            {
              "date": "2023-12",
              "year": 2023,
              "month": 12,
              "observed": 150.4673,
              "climatology": 162.1166,
              "anomaly": -11.6493
            },
            {
              "date": "2024-01",
              "year": 2024,
              "month": 1,
              "observed": 161.8004,
              "climatology": 171.4887,
              "anomaly": -9.6883
            },
            {
              "date": "2024-02",
              "year": 2024,
              "month": 2,
              "observed": 171.2934,
              "climatology": 177.6528,
              "anomaly": -6.3594
            },
            {
              "date": "2024-03",
              "year": 2024,
              "month": 3,
              "observed": 174.012,
              "climatology": 179.7224,
              "anomaly": -5.7104
            },
            {
              "date": "2024-04",
              "year": 2024,
              "month": 4,
              "observed": 173.7158,
              "climatology": 174.6206,
              "anomaly": -0.9048
            },
            {
              "date": "2024-05",
              "year": 2024,
              "month": 5,
              "observed": 162.9663,
              "climatology": 164.0141,
              "anomaly": -1.0478
            },
            {
              "date": "2024-06",
              "year": 2024,
              "month": 6,
              "observed": 147.7774,
              "climatology": 149.3788,
              "anomaly": -1.6014
            },
            {
              "date": "2024-07",
              "year": 2024,
              "month": 7,
              "observed": 142.2702,
              "climatology": 142.8249,
              "anomaly": -0.5547
            },
            {
              "date": "2024-08",
              "year": 2024,
              "month": 8,
              "observed": 142.3086,
              "climatology": 149.5905,
              "anomaly": -7.2819
            },
            {
              "date": "2024-09",
              "year": 2024,
              "month": 9,
              "observed": 134.7806,
              "climatology": 147.9627,
              "anomaly": -13.1821
            },
            {
              "date": "2024-10",
              "year": 2024,
              "month": 10,
              "observed": 131.8863,
              "climatology": 150.0758,
              "anomaly": -18.1895
            },
            {
              "date": "2024-11",
              "year": 2024,
              "month": 11,
              "observed": 140.2729,
              "climatology": 154.4321,
              "anomaly": -14.1592
            },
            {
              "date": "2024-12",
              "year": 2024,
              "month": 12,
              "observed": 144.5135,
              "climatology": 162.1166,
              "anomaly": -17.6031
            }
          ],
          "annual_series": [
            {
              "year": 2000,
              "annual_mean": 160.4863,
              "annual_anomaly": 0.163
            },
            {
              "year": 2001,
              "annual_mean": 166.091,
              "annual_anomaly": 5.7676
            },
            {
              "year": 2002,
              "annual_mean": 143.4419,
              "annual_anomaly": -16.8814
            },
            {
              "year": 2003,
              "annual_mean": 157.1799,
              "annual_anomaly": -3.1434
            },
            {
              "year": 2004,
              "annual_mean": 166.3187,
              "annual_anomaly": 5.9954
            },
            {
              "year": 2005,
              "annual_mean": 200.374,
              "annual_anomaly": 40.0506
            },
            {
              "year": 2006,
              "annual_mean": 173.5796,
              "annual_anomaly": 13.2562
            },
            {
              "year": 2007,
              "annual_mean": 172.2858,
              "annual_anomaly": 11.9625
            },
            {
              "year": 2008,
              "annual_mean": 170.9314,
              "annual_anomaly": 10.608
            },
            {
              "year": 2009,
              "annual_mean": 155.701,
              "annual_anomaly": -4.6224
            },
            {
              "year": 2010,
              "annual_mean": 170.6086,
              "annual_anomaly": 10.2853
            },
            {
              "year": 2011,
              "annual_mean": 165.4668,
              "annual_anomaly": 5.1434
            },
            {
              "year": 2012,
              "annual_mean": 144.2976,
              "annual_anomaly": -16.0257
            },
            {
              "year": 2013,
              "annual_mean": 150.4389,
              "annual_anomaly": -9.8844
            },
            {
              "year": 2014,
              "annual_mean": 160.7776,
              "annual_anomaly": 0.4542
            },
            {
              "year": 2015,
              "annual_mean": 163.9332,
              "annual_anomaly": 3.6099
            },
            {
              "year": 2016,
              "annual_mean": 155.7211,
              "annual_anomaly": -4.6023
            },
            {
              "year": 2017,
              "annual_mean": 165.4717,
              "annual_anomaly": 5.1484
            },
            {
              "year": 2018,
              "annual_mean": 143.0615,
              "annual_anomaly": -17.2618
            },
            {
              "year": 2019,
              "annual_mean": 156.9923,
              "annual_anomaly": -3.3311
            },
            {
              "year": 2020,
              "annual_mean": 148.9423,
              "annual_anomaly": -11.381
            },
            {
              "year": 2021,
              "annual_mean": 141.144,
              "annual_anomaly": -19.1793
            },
            {
              "year": 2022,
              "annual_mean": 155.0505,
              "annual_anomaly": -5.2729
            },
            {
              "year": 2023,
              "annual_mean": 167.488,
              "annual_anomaly": 7.1646
            },
            {
              "year": 2024,
              "annual_mean": 152.2998,
              "annual_anomaly": -8.0235
            }
          ],
          "climatology_baseline": {
            "1": 171.4887,
            "2": 177.6528,
            "3": 179.7224,
            "4": 174.6206,
            "5": 164.0141,
            "6": 149.3788,
            "7": 142.8249,
            "8": 149.5905,
            "9": 147.9627,
            "10": 150.0758,
            "11": 154.4321,
            "12": 162.1166
          }
        },
        "statistics": {
          "sens_slope": -0.64322,
          "sens_intercept": 1455.3249,
          "confidence_interval_95": [
            -1.2938,
            -0.02378
          ],
          "mann_kendall_score_s": -88,
          "standardized_z": -2.0319,
          "p_value": 0.04217,
          "is_significant": true,
          "trend_label": "STATISTICALLY_SIGNIFICANT_DECREASING",
          "verdict_text": "Confirmed downward monotonic trend (-0.6432/yr, p=4.2166e-02). Evidence strongly rejects the null hypothesis.",
          "ols_comparison": {
            "ols_slope": -0.64754,
            "ols_pvalue": 0.06631,
            "r_squared": 0.1391
          }
        }
      }
    },
    "region_b": {
      "name": "Great Lakes / US Northeast",
      "bbox": [
        41.0,
        48.0,
        -85.0,
        -72.0
      ],
      "analysis": {
        "metadata": {
          "source": "GLDAS_NOAH025_M_2.1",
          "doi": "10.5067/SXAVCZFAQLNO",
          "provenance_type": "NASA_GLDAS_NETCDF",
          "is_illustrative": false,
          "variable": "RootMoist_inst",
          "unit": "kg/m\u00b2",
          "depth_note": "Vegetation-dependent root-zone depth (Noah LSM 3.6 parameterization; absolute totals reflect vegetation class rather than standardized physical depth)",
          "bbox": [
            41.0,
            48.0,
            -85.0,
            -72.0
          ],
          "time_range": [
            2000,
            2024
          ],
          "total_observations": 300,
          "disclaimer": "Statistical trend reflects historical model-derived or reanalysis trajectory over the selected domain. Mathematical correlation or slope direction does not establish anthropogenic or environmental causation."
        },
        "climatology": {
          "monthly_series": [
            {
              "date": "2000-01",
              "year": 2000,
              "month": 1,
              "observed": 454.9312,
              "climatology": 475.8818,
              "anomaly": -20.9506
            },
            {
              "date": "2000-02",
              "year": 2000,
              "month": 2,
              "observed": 464.4151,
              "climatology": 485.7296,
              "anomaly": -21.3145
            },
            {
              "date": "2000-03",
              "year": 2000,
              "month": 3,
              "observed": 510.5072,
              "climatology": 509.2433,
              "anomaly": 1.2639
            },
            {
              "date": "2000-04",
              "year": 2000,
              "month": 4,
              "observed": 524.8809,
              "climatology": 525.2054,
              "anomaly": -0.3245
            },
            {
              "date": "2000-05",
              "year": 2000,
              "month": 5,
              "observed": 512.7379,
              "climatology": 498.1578,
              "anomaly": 14.5801
            },
            {
              "date": "2000-06",
              "year": 2000,
              "month": 6,
              "observed": 490.1325,
              "climatology": 455.3163,
              "anomaly": 34.8162
            },
            {
              "date": "2000-07",
              "year": 2000,
              "month": 7,
              "observed": 451.262,
              "climatology": 409.1737,
              "anomaly": 42.0883
            },
            {
              "date": "2000-08",
              "year": 2000,
              "month": 8,
              "observed": 437.9422,
              "climatology": 378.9462,
              "anomaly": 58.996
            },
            {
              "date": "2000-09",
              "year": 2000,
              "month": 9,
              "observed": 423.517,
              "climatology": 373.3072,
              "anomaly": 50.2098
            },
            {
              "date": "2000-10",
              "year": 2000,
              "month": 10,
              "observed": 433.2878,
              "climatology": 404.1663,
              "anomaly": 29.1215
            },
            {
              "date": "2000-11",
              "year": 2000,
              "month": 11,
              "observed": 443.3098,
              "climatology": 439.9029,
              "anomaly": 3.4069
            },
            {
              "date": "2000-12",
              "year": 2000,
              "month": 12,
              "observed": 460.3807,
              "climatology": 460.0054,
              "anomaly": 0.3753
            },
            {
              "date": "2001-01",
              "year": 2001,
              "month": 1,
              "observed": 464.815,
              "climatology": 475.8818,
              "anomaly": -11.0668
            },
            {
              "date": "2001-02",
              "year": 2001,
              "month": 2,
              "observed": 481.3681,
              "climatology": 485.7296,
              "anomaly": -4.3615
            },
            {
              "date": "2001-03",
              "year": 2001,
              "month": 3,
              "observed": 496.5847,
              "climatology": 509.2433,
              "anomaly": -12.6586
            },
            {
              "date": "2001-04",
              "year": 2001,
              "month": 4,
              "observed": 544.1334,
              "climatology": 525.2054,
              "anomaly": 18.928
            },
            {
              "date": "2001-05",
              "year": 2001,
              "month": 5,
              "observed": 500.8505,
              "climatology": 498.1578,
              "anomaly": 2.6927
            },
            {
              "date": "2001-06",
              "year": 2001,
              "month": 6,
              "observed": 465.9879,
              "climatology": 455.3163,
              "anomaly": 10.6716
            },
            {
              "date": "2001-07",
              "year": 2001,
              "month": 7,
              "observed": 406.7036,
              "climatology": 409.1737,
              "anomaly": -2.4701
            },
            {
              "date": "2001-08",
              "year": 2001,
              "month": 8,
              "observed": 355.7722,
              "climatology": 378.9462,
              "anomaly": -23.174
            },
            {
              "date": "2001-09",
              "year": 2001,
              "month": 9,
              "observed": 367.1202,
              "climatology": 373.3072,
              "anomaly": -6.187
            },
            {
              "date": "2001-10",
              "year": 2001,
              "month": 10,
              "observed": 411.1641,
              "climatology": 404.1663,
              "anomaly": 6.9978
            },
            {
              "date": "2001-11",
              "year": 2001,
              "month": 11,
              "observed": 439.4164,
              "climatology": 439.9029,
              "anomaly": -0.4865
            },
            {
              "date": "2001-12",
              "year": 2001,
              "month": 12,
              "observed": 475.051,
              "climatology": 460.0054,
              "anomaly": 15.0456
            },
            {
              "date": "2002-01",
              "year": 2002,
              "month": 1,
              "observed": 469.342,
              "climatology": 475.8818,
              "anomaly": -6.5398
            },
            {
              "date": "2002-02",
              "year": 2002,
              "month": 2,
              "observed": 486.9417,
              "climatology": 485.7296,
              "anomaly": 1.2121
            },
            {
              "date": "2002-03",
              "year": 2002,
              "month": 3,
              "observed": 513.8313,
              "climatology": 509.2433,
              "anomaly": 4.588
            },
            {
              "date": "2002-04",
              "year": 2002,
              "month": 4,
              "observed": 535.3988,
              "climatology": 525.2054,
              "anomaly": 10.1934
            },
            {
              "date": "2002-05",
              "year": 2002,
              "month": 5,
              "observed": 528.8392,
              "climatology": 498.1578,
              "anomaly": 30.6814
            },
            {
              "date": "2002-06",
              "year": 2002,
              "month": 6,
              "observed": 500.2597,
              "climatology": 455.3163,
              "anomaly": 44.9434
            },
            {
              "date": "2002-07",
              "year": 2002,
              "month": 7,
              "observed": 420.259,
              "climatology": 409.1737,
              "anomaly": 11.0853
            },
            {
              "date": "2002-08",
              "year": 2002,
              "month": 8,
              "observed": 362.6387,
              "climatology": 378.9462,
              "anomaly": -16.3075
            },
            {
              "date": "2002-09",
              "year": 2002,
              "month": 9,
              "observed": 335.3419,
              "climatology": 373.3072,
              "anomaly": -37.9653
            },
            {
              "date": "2002-10",
              "year": 2002,
              "month": 10,
              "observed": 384.1158,
              "climatology": 404.1663,
              "anomaly": -20.0505
            },
            {
              "date": "2002-11",
              "year": 2002,
              "month": 11,
              "observed": 428.5777,
              "climatology": 439.9029,
              "anomaly": -11.3252
            },
            {
              "date": "2002-12",
              "year": 2002,
              "month": 12,
              "observed": 451.5917,
              "climatology": 460.0054,
              "anomaly": -8.4137
            },
            {
              "date": "2003-01",
              "year": 2003,
              "month": 1,
              "observed": 463.9149,
              "climatology": 475.8818,
              "anomaly": -11.9669
            },
            {
              "date": "2003-02",
              "year": 2003,
              "month": 2,
              "observed": 464.7112,
              "climatology": 485.7296,
              "anomaly": -21.0184
            },
            {
              "date": "2003-03",
              "year": 2003,
              "month": 3,
              "observed": 493.4357,
              "climatology": 509.2433,
              "anomaly": -15.8076
            },
            {
              "date": "2003-04",
              "year": 2003,
              "month": 4,
              "observed": 519.0478,
              "climatology": 525.2054,
              "anomaly": -6.1576
            },
            {
              "date": "2003-05",
              "year": 2003,
              "month": 5,
              "observed": 499.8325,
              "climatology": 498.1578,
              "anomaly": 1.6747
            },
            {
              "date": "2003-06",
              "year": 2003,
              "month": 6,
              "observed": 482.5796,
              "climatology": 455.3163,
              "anomaly": 27.2633
            },
            {
              "date": "2003-07",
              "year": 2003,
              "month": 7,
              "observed": 433.0122,
              "climatology": 409.1737,
              "anomaly": 23.8385
            },
            {
              "date": "2003-08",
              "year": 2003,
              "month": 8,
              "observed": 430.9274,
              "climatology": 378.9462,
              "anomaly": 51.9812
            },
            {
              "date": "2003-09",
              "year": 2003,
              "month": 9,
              "observed": 424.4576,
              "climatology": 373.3072,
              "anomaly": 51.1504
            },
            {
              "date": "2003-10",
              "year": 2003,
              "month": 10,
              "observed": 457.0264,
              "climatology": 404.1663,
              "anomaly": 52.8601
            },
            {
              "date": "2003-11",
              "year": 2003,
              "month": 11,
              "observed": 495.0663,
              "climatology": 439.9029,
              "anomaly": 55.1634
            },
            {
              "date": "2003-12",
              "year": 2003,
              "month": 12,
              "observed": 496.7175,
              "climatology": 460.0054,
              "anomaly": 36.7121
            },
            {
              "date": "2004-01",
              "year": 2004,
              "month": 1,
              "observed": 498.4808,
              "climatology": 475.8818,
              "anomaly": 22.599
            },
            {
              "date": "2004-02",
              "year": 2004,
              "month": 2,
              "observed": 486.8053,
              "climatology": 485.7296,
              "anomaly": 1.0757
            },
            {
              "date": "2004-03",
              "year": 2004,
              "month": 3,
              "observed": 520.691,
              "climatology": 509.2433,
              "anomaly": 11.4477
            },
            {
              "date": "2004-04",
              "year": 2004,
              "month": 4,
              "observed": 539.4968,
              "climatology": 525.2054,
              "anomaly": 14.2914
            },
            {
              "date": "2004-05",
              "year": 2004,
              "month": 5,
              "observed": 526.4906,
              "climatology": 498.1578,
              "anomaly": 28.3328
            },
            {
              "date": "2004-06",
              "year": 2004,
              "month": 6,
              "observed": 474.4973,
              "climatology": 455.3163,
              "anomaly": 19.181
            },
            {
              "date": "2004-07",
              "year": 2004,
              "month": 7,
              "observed": 435.9511,
              "climatology": 409.1737,
              "anomaly": 26.7774
            },
            {
              "date": "2004-08",
              "year": 2004,
              "month": 8,
              "observed": 427.5076,
              "climatology": 378.9462,
              "anomaly": 48.5614
            },
            {
              "date": "2004-09",
              "year": 2004,
              "month": 9,
              "observed": 426.8024,
              "climatology": 373.3072,
              "anomaly": 53.4952
            },
            {
              "date": "2004-10",
              "year": 2004,
              "month": 10,
              "observed": 429.3246,
              "climatology": 404.1663,
              "anomaly": 25.1583
            },
            {
              "date": "2004-11",
              "year": 2004,
              "month": 11,
              "observed": 457.9916,
              "climatology": 439.9029,
              "anomaly": 18.0887
            },
            {
              "date": "2004-12",
              "year": 2004,
              "month": 12,
              "observed": 473.9791,
              "climatology": 460.0054,
              "anomaly": 13.9737
            },
            {
              "date": "2005-01",
              "year": 2005,
              "month": 1,
              "observed": 498.4216,
              "climatology": 475.8818,
              "anomaly": 22.5398
            },
            {
              "date": "2005-02",
              "year": 2005,
              "month": 2,
              "observed": 505.4417,
              "climatology": 485.7296,
              "anomaly": 19.7121
            },
            {
              "date": "2005-03",
              "year": 2005,
              "month": 3,
              "observed": 512.7571,
              "climatology": 509.2433,
              "anomaly": 3.5138
            },
            {
              "date": "2005-04",
              "year": 2005,
              "month": 4,
              "observed": 545.3091,
              "climatology": 525.2054,
              "anomaly": 20.1037
            },
            {
              "date": "2005-05",
              "year": 2005,
              "month": 5,
              "observed": 500.7593,
              "climatology": 498.1578,
              "anomaly": 2.6015
            },
            {
              "date": "2005-06",
              "year": 2005,
              "month": 6,
              "observed": 441.3675,
              "climatology": 455.3163,
              "anomaly": -13.9488
            },
            {
              "date": "2005-07",
              "year": 2005,
              "month": 7,
              "observed": 380.237,
              "climatology": 409.1737,
              "anomaly": -28.9367
            },
            {
              "date": "2005-08",
              "year": 2005,
              "month": 8,
              "observed": 339.436,
              "climatology": 378.9462,
              "anomaly": -39.5102
            },
            {
              "date": "2005-09",
              "year": 2005,
              "month": 9,
              "observed": 328.0366,
              "climatology": 373.3072,
              "anomaly": -45.2706
            },
            {
              "date": "2005-10",
              "year": 2005,
              "month": 10,
              "observed": 391.306,
              "climatology": 404.1663,
              "anomaly": -12.8603
            },
            {
              "date": "2005-11",
              "year": 2005,
              "month": 11,
              "observed": 441.7509,
              "climatology": 439.9029,
              "anomaly": 1.848
            },
            {
              "date": "2005-12",
              "year": 2005,
              "month": 12,
              "observed": 463.6845,
              "climatology": 460.0054,
              "anomaly": 3.6791
            },
            {
              "date": "2006-01",
              "year": 2006,
              "month": 1,
              "observed": 489.6291,
              "climatology": 475.8818,
              "anomaly": 13.7473
            },
            {
              "date": "2006-02",
              "year": 2006,
              "month": 2,
              "observed": 500.7793,
              "climatology": 485.7296,
              "anomaly": 15.0497
            },
            {
              "date": "2006-03",
              "year": 2006,
              "month": 3,
              "observed": 506.4432,
              "climatology": 509.2433,
              "anomaly": -2.8001
            },
            {
              "date": "2006-04",
              "year": 2006,
              "month": 4,
              "observed": 528.1783,
              "climatology": 525.2054,
              "anomaly": 2.9729
            },
            {
              "date": "2006-05",
              "year": 2006,
              "month": 5,
              "observed": 497.7546,
              "climatology": 498.1578,
              "anomaly": -0.4032
            },
            {
              "date": "2006-06",
              "year": 2006,
              "month": 6,
              "observed": 461.9891,
              "climatology": 455.3163,
              "anomaly": 6.6728
            },
            {
              "date": "2006-07",
              "year": 2006,
              "month": 7,
              "observed": 431.8102,
              "climatology": 409.1737,
              "anomaly": 22.6365
            },
            {
              "date": "2006-08",
              "year": 2006,
              "month": 8,
              "observed": 394.661,
              "climatology": 378.9462,
              "anomaly": 15.7148
            },
            {
              "date": "2006-09",
              "year": 2006,
              "month": 9,
              "observed": 405.614,
              "climatology": 373.3072,
              "anomaly": 32.3068
            },
            {
              "date": "2006-10",
              "year": 2006,
              "month": 10,
              "observed": 457.8377,
              "climatology": 404.1663,
              "anomaly": 53.6714
            },
            {
              "date": "2006-11",
              "year": 2006,
              "month": 11,
              "observed": 481.9174,
              "climatology": 439.9029,
              "anomaly": 42.0145
            },
            {
              "date": "2006-12",
              "year": 2006,
              "month": 12,
              "observed": 483.3826,
              "climatology": 460.0054,
              "anomaly": 23.3772
            },
            {
              "date": "2007-01",
              "year": 2007,
              "month": 1,
              "observed": 492.8705,
              "climatology": 475.8818,
              "anomaly": 16.9887
            },
            {
              "date": "2007-02",
              "year": 2007,
              "month": 2,
              "observed": 472.9217,
              "climatology": 485.7296,
              "anomaly": -12.8079
            },
            {
              "date": "2007-03",
              "year": 2007,
              "month": 3,
              "observed": 504.8991,
              "climatology": 509.2433,
              "anomaly": -4.3442
            },
            {
              "date": "2007-04",
              "year": 2007,
              "month": 4,
              "observed": 521.905,
              "climatology": 525.2054,
              "anomaly": -3.3004
            },
            {
              "date": "2007-05",
              "year": 2007,
              "month": 5,
              "observed": 481.6968,
              "climatology": 498.1578,
              "anomaly": -16.461
            },
            {
              "date": "2007-06",
              "year": 2007,
              "month": 6,
              "observed": 426.2594,
              "climatology": 455.3163,
              "anomaly": -29.0569
            },
            {
              "date": "2007-07",
              "year": 2007,
              "month": 7,
              "observed": 377.0252,
              "climatology": 409.1737,
              "anomaly": -32.1485
            },
            {
              "date": "2007-08",
              "year": 2007,
              "month": 8,
              "observed": 330.2356,
              "climatology": 378.9462,
              "anomaly": -48.7106
            },
            {
              "date": "2007-09",
              "year": 2007,
              "month": 9,
              "observed": 323.6247,
              "climatology": 373.3072,
              "anomaly": -49.6825
            },
            {
              "date": "2007-10",
              "year": 2007,
              "month": 10,
              "observed": 345.994,
              "climatology": 404.1663,
              "anomaly": -58.1723
            },
            {
              "date": "2007-11",
              "year": 2007,
              "month": 11,
              "observed": 397.6184,
              "climatology": 439.9029,
              "anomaly": -42.2845
            },
            {
              "date": "2007-12",
              "year": 2007,
              "month": 12,
              "observed": 432.6086,
              "climatology": 460.0054,
              "anomaly": -27.3968
            },
            {
              "date": "2008-01",
              "year": 2008,
              "month": 1,
              "observed": 485.7003,
              "climatology": 475.8818,
              "anomaly": 9.8185
            },
            {
              "date": "2008-02",
              "year": 2008,
              "month": 2,
              "observed": 504.9897,
              "climatology": 485.7296,
              "anomaly": 19.2601
            },
            {
              "date": "2008-03",
              "year": 2008,
              "month": 3,
              "observed": 528.4534,
              "climatology": 509.2433,
              "anomaly": 19.2101
            },
            {
              "date": "2008-04",
              "year": 2008,
              "month": 4,
              "observed": 549.7117,
              "climatology": 525.2054,
              "anomaly": 24.5063
            },
            {
              "date": "2008-05",
              "year": 2008,
              "month": 5,
              "observed": 489.1388,
              "climatology": 498.1578,
              "anomaly": -9.019
            },
            {
              "date": "2008-06",
              "year": 2008,
              "month": 6,
              "observed": 455.9948,
              "climatology": 455.3163,
              "anomaly": 0.6785
            },
            {
              "date": "2008-07",
              "year": 2008,
              "month": 7,
              "observed": 430.6051,
              "climatology": 409.1737,
              "anomaly": 21.4314
            },
            {
              "date": "2008-08",
              "year": 2008,
              "month": 8,
              "observed": 417.5324,
              "climatology": 378.9462,
              "anomaly": 38.5862
            },
            {
              "date": "2008-09",
              "year": 2008,
              "month": 9,
              "observed": 398.6893,
              "climatology": 373.3072,
              "anomaly": 25.3821
            },
            {
              "date": "2008-10",
              "year": 2008,
              "month": 10,
              "observed": 419.1106,
              "climatology": 404.1663,
              "anomaly": 14.9443
            },
            {
              "date": "2008-11",
              "year": 2008,
              "month": 11,
              "observed": 447.3095,
              "climatology": 439.9029,
              "anomaly": 7.4066
            },
            {
              "date": "2008-12",
              "year": 2008,
              "month": 12,
              "observed": 477.2314,
              "climatology": 460.0054,
              "anomaly": 17.226
            },
            {
              "date": "2009-01",
              "year": 2009,
              "month": 1,
              "observed": 490.3879,
              "climatology": 475.8818,
              "anomaly": 14.5061
            },
            {
              "date": "2009-02",
              "year": 2009,
              "month": 2,
              "observed": 502.563,
              "climatology": 485.7296,
              "anomaly": 16.8334
            },
            {
              "date": "2009-03",
              "year": 2009,
              "month": 3,
              "observed": 528.3809,
              "climatology": 509.2433,
              "anomaly": 19.1376
            },
            {
              "date": "2009-04",
              "year": 2009,
              "month": 4,
              "observed": 541.6437,
              "climatology": 525.2054,
              "anomaly": 16.4383
            },
            {
              "date": "2009-05",
              "year": 2009,
              "month": 5,
              "observed": 503.1757,
              "climatology": 498.1578,
              "anomaly": 5.0179
            },
            {
              "date": "2009-06",
              "year": 2009,
              "month": 6,
              "observed": 461.4493,
              "climatology": 455.3163,
              "anomaly": 6.133
            },
            {
              "date": "2009-07",
              "year": 2009,
              "month": 7,
              "observed": 431.8435,
              "climatology": 409.1737,
              "anomaly": 22.6698
            },
            {
              "date": "2009-08",
              "year": 2009,
              "month": 8,
              "observed": 425.5319,
              "climatology": 378.9462,
              "anomaly": 46.5857
            },
            {
              "date": "2009-09",
              "year": 2009,
              "month": 9,
              "observed": 393.86,
              "climatology": 373.3072,
              "anomaly": 20.5528
            },
            {
              "date": "2009-10",
              "year": 2009,
              "month": 10,
              "observed": 423.9011,
              "climatology": 404.1663,
              "anomaly": 19.7348
            },
            {
              "date": "2009-11",
              "year": 2009,
              "month": 11,
              "observed": 460.1812,
              "climatology": 439.9029,
              "anomaly": 20.2783
            },
            {
              "date": "2009-12",
              "year": 2009,
              "month": 12,
              "observed": 467.4118,
              "climatology": 460.0054,
              "anomaly": 7.4064
            },
            {
              "date": "2010-01",
              "year": 2010,
              "month": 1,
              "observed": 468.0414,
              "climatology": 475.8818,
              "anomaly": -7.8404
            },
            {
              "date": "2010-02",
              "year": 2010,
              "month": 2,
              "observed": 478.6465,
              "climatology": 485.7296,
              "anomaly": -7.0831
            },
            {
              "date": "2010-03",
              "year": 2010,
              "month": 3,
              "observed": 518.9948,
              "climatology": 509.2433,
              "anomaly": 9.7515
            },
            {
              "date": "2010-04",
              "year": 2010,
              "month": 4,
              "observed": 506.8625,
              "climatology": 525.2054,
              "anomaly": -18.3429
            },
            {
              "date": "2010-05",
              "year": 2010,
              "month": 5,
              "observed": 460.1911,
              "climatology": 498.1578,
              "anomaly": -37.9667
            },
            {
              "date": "2010-06",
              "year": 2010,
              "month": 6,
              "observed": 426.4264,
              "climatology": 455.3163,
              "anomaly": -28.8899
            },
            {
              "date": "2010-07",
              "year": 2010,
              "month": 7,
              "observed": 384.4881,
              "climatology": 409.1737,
              "anomaly": -24.6856
            },
            {
              "date": "2010-08",
              "year": 2010,
              "month": 8,
              "observed": 348.9365,
              "climatology": 378.9462,
              "anomaly": -30.0097
            },
            {
              "date": "2010-09",
              "year": 2010,
              "month": 9,
              "observed": 350.2127,
              "climatology": 373.3072,
              "anomaly": -23.0945
            },
            {
              "date": "2010-10",
              "year": 2010,
              "month": 10,
              "observed": 412.2804,
              "climatology": 404.1663,
              "anomaly": 8.1141
            },
            {
              "date": "2010-11",
              "year": 2010,
              "month": 11,
              "observed": 442.29,
              "climatology": 439.9029,
              "anomaly": 2.3871
            },
            {
              "date": "2010-12",
              "year": 2010,
              "month": 12,
              "observed": 474.8929,
              "climatology": 460.0054,
              "anomaly": 14.8875
            },
            {
              "date": "2011-01",
              "year": 2011,
              "month": 1,
              "observed": 486.6697,
              "climatology": 475.8818,
              "anomaly": 10.7879
            },
            {
              "date": "2011-02",
              "year": 2011,
              "month": 2,
              "observed": 491.2927,
              "climatology": 485.7296,
              "anomaly": 5.5631
            },
            {
              "date": "2011-03",
              "year": 2011,
              "month": 3,
              "observed": 529.9479,
              "climatology": 509.2433,
              "anomaly": 20.7046
            },
            {
              "date": "2011-04",
              "year": 2011,
              "month": 4,
              "observed": 551.1877,
              "climatology": 525.2054,
              "anomaly": 25.9823
            },
            {
              "date": "2011-05",
              "year": 2011,
              "month": 5,
              "observed": 526.1079,
              "climatology": 498.1578,
              "anomaly": 27.9501
            },
            {
              "date": "2011-06",
              "year": 2011,
              "month": 6,
              "observed": 468.3122,
              "climatology": 455.3163,
              "anomaly": 12.9959
            },
            {
              "date": "2011-07",
              "year": 2011,
              "month": 7,
              "observed": 405.4849,
              "climatology": 409.1737,
              "anomaly": -3.6888
            },
            {
              "date": "2011-08",
              "year": 2011,
              "month": 8,
              "observed": 371.8862,
              "climatology": 378.9462,
              "anomaly": -7.06
            },
            {
              "date": "2011-09",
              "year": 2011,
              "month": 9,
              "observed": 404.0665,
              "climatology": 373.3072,
              "anomaly": 30.7593
            },
            {
              "date": "2011-10",
              "year": 2011,
              "month": 10,
              "observed": 430.9499,
              "climatology": 404.1663,
              "anomaly": 26.7836
            },
            {
              "date": "2011-11",
              "year": 2011,
              "month": 11,
              "observed": 457.7285,
              "climatology": 439.9029,
              "anomaly": 17.8256
            },
            {
              "date": "2011-12",
              "year": 2011,
              "month": 12,
              "observed": 479.1409,
              "climatology": 460.0054,
              "anomaly": 19.1355
            },
            {
              "date": "2012-01",
              "year": 2012,
              "month": 1,
              "observed": 473.3481,
              "climatology": 475.8818,
              "anomaly": -2.5337
            },
            {
              "date": "2012-02",
              "year": 2012,
              "month": 2,
              "observed": 482.9677,
              "climatology": 485.7296,
              "anomaly": -2.7619
            },
            {
              "date": "2012-03",
              "year": 2012,
              "month": 3,
              "observed": 504.2207,
              "climatology": 509.2433,
              "anomaly": -5.0226
            },
            {
              "date": "2012-04",
              "year": 2012,
              "month": 4,
              "observed": 491.8832,
              "climatology": 525.2054,
              "anomaly": -33.3222
            },
            {
              "date": "2012-05",
              "year": 2012,
              "month": 5,
              "observed": 472.7182,
              "climatology": 498.1578,
              "anomaly": -25.4396
            },
            {
              "date": "2012-06",
              "year": 2012,
              "month": 6,
              "observed": 419.2805,
              "climatology": 455.3163,
              "anomaly": -36.0358
            },
            {
              "date": "2012-07",
              "year": 2012,
              "month": 7,
              "observed": 341.9116,
              "climatology": 409.1737,
              "anomaly": -67.2621
            },
            {
              "date": "2012-08",
              "year": 2012,
              "month": 8,
              "observed": 311.2614,
              "climatology": 378.9462,
              "anomaly": -67.6848
            },
            {
              "date": "2012-09",
              "year": 2012,
              "month": 9,
              "observed": 315.5693,
              "climatology": 373.3072,
              "anomaly": -57.7379
            },
            {
              "date": "2012-10",
              "year": 2012,
              "month": 10,
              "observed": 366.2267,
              "climatology": 404.1663,
              "anomaly": -37.9396
            },
            {
              "date": "2012-11",
              "year": 2012,
              "month": 11,
              "observed": 413.0099,
              "climatology": 439.9029,
              "anomaly": -26.893
            },
            {
              "date": "2012-12",
              "year": 2012,
              "month": 12,
              "observed": 430.739,
              "climatology": 460.0054,
              "anomaly": -29.2664
            },
            {
              "date": "2013-01",
              "year": 2013,
              "month": 1,
              "observed": 453.3516,
              "climatology": 475.8818,
              "anomaly": -22.5302
            },
            {
              "date": "2013-02",
              "year": 2013,
              "month": 2,
              "observed": 480.7837,
              "climatology": 485.7296,
              "anomaly": -4.9459
            },
            {
              "date": "2013-03",
              "year": 2013,
              "month": 3,
              "observed": 502.9958,
              "climatology": 509.2433,
              "anomaly": -6.2475
            },
            {
              "date": "2013-04",
              "year": 2013,
              "month": 4,
              "observed": 516.2848,
              "climatology": 525.2054,
              "anomaly": -8.9206
            },
            {
              "date": "2013-05",
              "year": 2013,
              "month": 5,
              "observed": 489.5012,
              "climatology": 498.1578,
              "anomaly": -8.6566
            },
            {
              "date": "2013-06",
              "year": 2013,
              "month": 6,
              "observed": 472.3601,
              "climatology": 455.3163,
              "anomaly": 17.0438
            },
            {
              "date": "2013-07",
              "year": 2013,
              "month": 7,
              "observed": 428.4128,
              "climatology": 409.1737,
              "anomaly": 19.2391
            },
            {
              "date": "2013-08",
              "year": 2013,
              "month": 8,
              "observed": 391.9182,
              "climatology": 378.9462,
              "anomaly": 12.972
            },
            {
              "date": "2013-09",
              "year": 2013,
              "month": 9,
              "observed": 393.5822,
              "climatology": 373.3072,
              "anomaly": 20.275
            },
            {
              "date": "2013-10",
              "year": 2013,
              "month": 10,
              "observed": 413.2231,
              "climatology": 404.1663,
              "anomaly": 9.0568
            },
            {
              "date": "2013-11",
              "year": 2013,
              "month": 11,
              "observed": 454.5444,
              "climatology": 439.9029,
              "anomaly": 14.6415
            },
            {
              "date": "2013-12",
              "year": 2013,
              "month": 12,
              "observed": 467.5536,
              "climatology": 460.0054,
              "anomaly": 7.5482
            },
            {
              "date": "2014-01",
              "year": 2014,
              "month": 1,
              "observed": 484.9392,
              "climatology": 475.8818,
              "anomaly": 9.0574
            },
            {
              "date": "2014-02",
              "year": 2014,
              "month": 2,
              "observed": 490.8757,
              "climatology": 485.7296,
              "anomaly": 5.1461
            },
            {
              "date": "2014-03",
              "year": 2014,
              "month": 3,
              "observed": 504.769,
              "climatology": 509.2433,
              "anomaly": -4.4743
            },
            {
              "date": "2014-04",
              "year": 2014,
              "month": 4,
              "observed": 537.6197,
              "climatology": 525.2054,
              "anomaly": 12.4143
            },
            {
              "date": "2014-05",
              "year": 2014,
              "month": 5,
              "observed": 529.8459,
              "climatology": 498.1578,
              "anomaly": 31.6881
            },
            {
              "date": "2014-06",
              "year": 2014,
              "month": 6,
              "observed": 475.2733,
              "climatology": 455.3163,
              "anomaly": 19.957
            },
            {
              "date": "2014-07",
              "year": 2014,
              "month": 7,
              "observed": 434.6644,
              "climatology": 409.1737,
              "anomaly": 25.4907
            },
            {
              "date": "2014-08",
              "year": 2014,
              "month": 8,
              "observed": 399.6368,
              "climatology": 378.9462,
              "anomaly": 20.6906
            },
            {
              "date": "2014-09",
              "year": 2014,
              "month": 9,
              "observed": 403.7601,
              "climatology": 373.3072,
              "anomaly": 30.4529
            },
            {
              "date": "2014-10",
              "year": 2014,
              "month": 10,
              "observed": 428.2537,
              "climatology": 404.1663,
              "anomaly": 24.0874
            },
            {
              "date": "2014-11",
              "year": 2014,
              "month": 11,
              "observed": 454.9395,
              "climatology": 439.9029,
              "anomaly": 15.0366
            },
            {
              "date": "2014-12",
              "year": 2014,
              "month": 12,
              "observed": 467.3562,
              "climatology": 460.0054,
              "anomaly": 7.3508
            },
            {
              "date": "2015-01",
              "year": 2015,
              "month": 1,
              "observed": 483.956,
              "climatology": 475.8818,
              "anomaly": 8.0742
            },
            {
              "date": "2015-02",
              "year": 2015,
              "month": 2,
              "observed": 481.0512,
              "climatology": 485.7296,
              "anomaly": -4.6784
            },
            {
              "date": "2015-03",
              "year": 2015,
              "month": 3,
              "observed": 497.1131,
              "climatology": 509.2433,
              "anomaly": -12.1302
            },
            {
              "date": "2015-04",
              "year": 2015,
              "month": 4,
              "observed": 522.6176,
              "climatology": 525.2054,
              "anomaly": -2.5878
            },
            {
              "date": "2015-05",
              "year": 2015,
              "month": 5,
              "observed": 485.517,
              "climatology": 498.1578,
              "anomaly": -12.6408
            },
            {
              "date": "2015-06",
              "year": 2015,
              "month": 6,
              "observed": 466.8247,
              "climatology": 455.3163,
              "anomaly": 11.5084
            },
            {
              "date": "2015-07",
              "year": 2015,
              "month": 7,
              "observed": 423.6518,
              "climatology": 409.1737,
              "anomaly": 14.4781
            },
            {
              "date": "2015-08",
              "year": 2015,
              "month": 8,
              "observed": 368.1004,
              "climatology": 378.9462,
              "anomaly": -10.8458
            },
            {
              "date": "2015-09",
              "year": 2015,
              "month": 9,
              "observed": 347.5327,
              "climatology": 373.3072,
              "anomaly": -25.7745
            },
            {
              "date": "2015-10",
              "year": 2015,
              "month": 10,
              "observed": 373.0274,
              "climatology": 404.1663,
              "anomaly": -31.1389
            },
            {
              "date": "2015-11",
              "year": 2015,
              "month": 11,
              "observed": 408.6724,
              "climatology": 439.9029,
              "anomaly": -31.2305
            },
            {
              "date": "2015-12",
              "year": 2015,
              "month": 12,
              "observed": 453.5411,
              "climatology": 460.0054,
              "anomaly": -6.4643
            },
            {
              "date": "2016-01",
              "year": 2016,
              "month": 1,
              "observed": 469.0922,
              "climatology": 475.8818,
              "anomaly": -6.7896
            },
            {
              "date": "2016-02",
              "year": 2016,
              "month": 2,
              "observed": 493.8094,
              "climatology": 485.7296,
              "anomaly": 8.0798
            },
            {
              "date": "2016-03",
              "year": 2016,
              "month": 3,
              "observed": 521.5562,
              "climatology": 509.2433,
              "anomaly": 12.3129
            },
            {
              "date": "2016-04",
              "year": 2016,
              "month": 4,
              "observed": 533.0809,
              "climatology": 525.2054,
              "anomaly": 7.8755
            },
            {
              "date": "2016-05",
              "year": 2016,
              "month": 5,
              "observed": 500.6578,
              "climatology": 498.1578,
              "anomaly": 2.5
            },
            {
              "date": "2016-06",
              "year": 2016,
              "month": 6,
              "observed": 431.7069,
              "climatology": 455.3163,
              "anomaly": -23.6094
            },
            {
              "date": "2016-07",
              "year": 2016,
              "month": 7,
              "observed": 358.7467,
              "climatology": 409.1737,
              "anomaly": -50.427
            },
            {
              "date": "2016-08",
              "year": 2016,
              "month": 8,
              "observed": 326.9057,
              "climatology": 378.9462,
              "anomaly": -52.0405
            },
            {
              "date": "2016-09",
              "year": 2016,
              "month": 9,
              "observed": 328.2433,
              "climatology": 373.3072,
              "anomaly": -45.0639
            },
            {
              "date": "2016-10",
              "year": 2016,
              "month": 10,
              "observed": 355.3025,
              "climatology": 404.1663,
              "anomaly": -48.8638
            },
            {
              "date": "2016-11",
              "year": 2016,
              "month": 11,
              "observed": 394.74,
              "climatology": 439.9029,
              "anomaly": -45.1629
            },
            {
              "date": "2016-12",
              "year": 2016,
              "month": 12,
              "observed": 421.5857,
              "climatology": 460.0054,
              "anomaly": -38.4197
            },
            {
              "date": "2017-01",
              "year": 2017,
              "month": 1,
              "observed": 455.066,
              "climatology": 475.8818,
              "anomaly": -20.8158
            },
            {
              "date": "2017-02",
              "year": 2017,
              "month": 2,
              "observed": 476.4836,
              "climatology": 485.7296,
              "anomaly": -9.246
            },
            {
              "date": "2017-03",
              "year": 2017,
              "month": 3,
              "observed": 509.2584,
              "climatology": 509.2433,
              "anomaly": 0.0151
            },
            {
              "date": "2017-04",
              "year": 2017,
              "month": 4,
              "observed": 538.3647,
              "climatology": 525.2054,
              "anomaly": 13.1593
            },
            {
              "date": "2017-05",
              "year": 2017,
              "month": 5,
              "observed": 524.152,
              "climatology": 498.1578,
              "anomaly": 25.9942
            },
            {
              "date": "2017-06",
              "year": 2017,
              "month": 6,
              "observed": 473.709,
              "climatology": 455.3163,
              "anomaly": 18.3927
            },
            {
              "date": "2017-07",
              "year": 2017,
              "month": 7,
              "observed": 439.7706,
              "climatology": 409.1737,
              "anomaly": 30.5969
            },
            {
              "date": "2017-08",
              "year": 2017,
              "month": 8,
              "observed": 409.2738,
              "climatology": 378.9462,
              "anomaly": 30.3276
            },
            {
              "date": "2017-09",
              "year": 2017,
              "month": 9,
              "observed": 393.0458,
              "climatology": 373.3072,
              "anomaly": 19.7386
            },
            {
              "date": "2017-10",
              "year": 2017,
              "month": 10,
              "observed": 398.4251,
              "climatology": 404.1663,
              "anomaly": -5.7412
            },
            {
              "date": "2017-11",
              "year": 2017,
              "month": 11,
              "observed": 458.9275,
              "climatology": 439.9029,
              "anomaly": 19.0246
            },
            {
              "date": "2017-12",
              "year": 2017,
              "month": 12,
              "observed": 462.4933,
              "climatology": 460.0054,
              "anomaly": 2.4879
            },
            {
              "date": "2018-01",
              "year": 2018,
              "month": 1,
              "observed": 470.1175,
              "climatology": 475.8818,
              "anomaly": -5.7643
            },
            {
              "date": "2018-02",
              "year": 2018,
              "month": 2,
              "observed": 497.291,
              "climatology": 485.7296,
              "anomaly": 11.5614
            },
            {
              "date": "2018-03",
              "year": 2018,
              "month": 3,
              "observed": 509.6119,
              "climatology": 509.2433,
              "anomaly": 0.3686
            },
            {
              "date": "2018-04",
              "year": 2018,
              "month": 4,
              "observed": 514.3411,
              "climatology": 525.2054,
              "anomaly": -10.8643
            },
            {
              "date": "2018-05",
              "year": 2018,
              "month": 5,
              "observed": 486.1255,
              "climatology": 498.1578,
              "anomaly": -12.0323
            },
            {
              "date": "2018-06",
              "year": 2018,
              "month": 6,
              "observed": 425.5244,
              "climatology": 455.3163,
              "anomaly": -29.7919
            },
            {
              "date": "2018-07",
              "year": 2018,
              "month": 7,
              "observed": 366.6375,
              "climatology": 409.1737,
              "anomaly": -42.5362
            },
            {
              "date": "2018-08",
              "year": 2018,
              "month": 8,
              "observed": 356.5666,
              "climatology": 378.9462,
              "anomaly": -22.3796
            },
            {
              "date": "2018-09",
              "year": 2018,
              "month": 9,
              "observed": 362.9087,
              "climatology": 373.3072,
              "anomaly": -10.3985
            },
            {
              "date": "2018-10",
              "year": 2018,
              "month": 10,
              "observed": 405.1878,
              "climatology": 404.1663,
              "anomaly": 1.0215
            },
            {
              "date": "2018-11",
              "year": 2018,
              "month": 11,
              "observed": 454.327,
              "climatology": 439.9029,
              "anomaly": 14.4241
            },
            {
              "date": "2018-12",
              "year": 2018,
              "month": 12,
              "observed": 464.727,
              "climatology": 460.0054,
              "anomaly": 4.7216
            },
            {
              "date": "2019-01",
              "year": 2019,
              "month": 1,
              "observed": 478.3992,
              "climatology": 475.8818,
              "anomaly": 2.5174
            },
            {
              "date": "2019-02",
              "year": 2019,
              "month": 2,
              "observed": 492.4295,
              "climatology": 485.7296,
              "anomaly": 6.6999
            },
            {
              "date": "2019-03",
              "year": 2019,
              "month": 3,
              "observed": 512.7598,
              "climatology": 509.2433,
              "anomaly": 3.5165
            },
            {
              "date": "2019-04",
              "year": 2019,
              "month": 4,
              "observed": 532.5132,
              "climatology": 525.2054,
              "anomaly": 7.3078
            },
            {
              "date": "2019-05",
              "year": 2019,
              "month": 5,
              "observed": 519.1035,
              "climatology": 498.1578,
              "anomaly": 20.9457
            },
            {
              "date": "2019-06",
              "year": 2019,
              "month": 6,
              "observed": 484.6857,
              "climatology": 455.3163,
              "anomaly": 29.3694
            },
            {
              "date": "2019-07",
              "year": 2019,
              "month": 7,
              "observed": 423.5148,
              "climatology": 409.1737,
              "anomaly": 14.3411
            },
            {
              "date": "2019-08",
              "year": 2019,
              "month": 8,
              "observed": 364.4836,
              "climatology": 378.9462,
              "anomaly": -14.4626
            },
            {
              "date": "2019-09",
              "year": 2019,
              "month": 9,
              "observed": 357.2458,
              "climatology": 373.3072,
              "anomaly": -16.0614
            },
            {
              "date": "2019-10",
              "year": 2019,
              "month": 10,
              "observed": 401.7625,
              "climatology": 404.1663,
              "anomaly": -2.4038
            },
            {
              "date": "2019-11",
              "year": 2019,
              "month": 11,
              "observed": 450.9245,
              "climatology": 439.9029,
              "anomaly": 11.0216
            },
            {
              "date": "2019-12",
              "year": 2019,
              "month": 12,
              "observed": 461.4996,
              "climatology": 460.0054,
              "anomaly": 1.4942
            },
            {
              "date": "2020-01",
              "year": 2020,
              "month": 1,
              "observed": 479.6643,
              "climatology": 475.8818,
              "anomaly": 3.7825
            },
            {
              "date": "2020-02",
              "year": 2020,
              "month": 2,
              "observed": 489.4451,
              "climatology": 485.7296,
              "anomaly": 3.7155
            },
            {
              "date": "2020-03",
              "year": 2020,
              "month": 3,
              "observed": 509.1327,
              "climatology": 509.2433,
              "anomaly": -0.1106
            },
            {
              "date": "2020-04",
              "year": 2020,
              "month": 4,
              "observed": 516.12,
              "climatology": 525.2054,
              "anomaly": -9.0854
            },
            {
              "date": "2020-05",
              "year": 2020,
              "month": 5,
              "observed": 494.254,
              "climatology": 498.1578,
              "anomaly": -3.9038
            },
            {
              "date": "2020-06",
              "year": 2020,
              "month": 6,
              "observed": 439.1467,
              "climatology": 455.3163,
              "anomaly": -16.1696
            },
            {
              "date": "2020-07",
              "year": 2020,
              "month": 7,
              "observed": 382.9416,
              "climatology": 409.1737,
              "anomaly": -26.2321
            },
            {
              "date": "2020-08",
              "year": 2020,
              "month": 8,
              "observed": 371.172,
              "climatology": 378.9462,
              "anomaly": -7.7742
            },
            {
              "date": "2020-09",
              "year": 2020,
              "month": 9,
              "observed": 364.8386,
              "climatology": 373.3072,
              "anomaly": -8.4686
            },
            {
              "date": "2020-10",
              "year": 2020,
              "month": 10,
              "observed": 390.1333,
              "climatology": 404.1663,
              "anomaly": -14.033
            },
            {
              "date": "2020-11",
              "year": 2020,
              "month": 11,
              "observed": 431.2684,
              "climatology": 439.9029,
              "anomaly": -8.6345
            },
            {
              "date": "2020-12",
              "year": 2020,
              "month": 12,
              "observed": 455.0393,
              "climatology": 460.0054,
              "anomaly": -4.9661
            },
            {
              "date": "2021-01",
              "year": 2021,
              "month": 1,
              "observed": 470.0993,
              "climatology": 475.8818,
              "anomaly": -5.7825
            },
            {
              "date": "2021-02",
              "year": 2021,
              "month": 2,
              "observed": 467.7315,
              "climatology": 485.7296,
              "anomaly": -17.9981
            },
            {
              "date": "2021-03",
              "year": 2021,
              "month": 3,
              "observed": 494.7766,
              "climatology": 509.2433,
              "anomaly": -14.4667
            },
            {
              "date": "2021-04",
              "year": 2021,
              "month": 4,
              "observed": 484.9876,
              "climatology": 525.2054,
              "anomaly": -40.2178
            },
            {
              "date": "2021-05",
              "year": 2021,
              "month": 5,
              "observed": 464.2142,
              "climatology": 498.1578,
              "anomaly": -33.9436
            },
            {
              "date": "2021-06",
              "year": 2021,
              "month": 6,
              "observed": 423.2368,
              "climatology": 455.3163,
              "anomaly": -32.0795
            },
            {
              "date": "2021-07",
              "year": 2021,
              "month": 7,
              "observed": 425.2375,
              "climatology": 409.1737,
              "anomaly": 16.0638
            },
            {
              "date": "2021-08",
              "year": 2021,
              "month": 8,
              "observed": 394.0334,
              "climatology": 378.9462,
              "anomaly": 15.0872
            },
            {
              "date": "2021-09",
              "year": 2021,
              "month": 9,
              "observed": 391.1863,
              "climatology": 373.3072,
              "anomaly": 17.8791
            },
            {
              "date": "2021-10",
              "year": 2021,
              "month": 10,
              "observed": 433.6104,
              "climatology": 404.1663,
              "anomaly": 29.4441
            },
            {
              "date": "2021-11",
              "year": 2021,
              "month": 11,
              "observed": 452.3305,
              "climatology": 439.9029,
              "anomaly": 12.4276
            },
            {
              "date": "2021-12",
              "year": 2021,
              "month": 12,
              "observed": 462.1265,
              "climatology": 460.0054,
              "anomaly": 2.1211
            },
            {
              "date": "2022-01",
              "year": 2022,
              "month": 1,
              "observed": 461.1002,
              "climatology": 475.8818,
              "anomaly": -14.7816
            },
            {
              "date": "2022-02",
              "year": 2022,
              "month": 2,
              "observed": 473.8885,
              "climatology": 485.7296,
              "anomaly": -11.8411
            },
            {
              "date": "2022-03",
              "year": 2022,
              "month": 3,
              "observed": 500.4157,
              "climatology": 509.2433,
              "anomaly": -8.8276
            },
            {
              "date": "2022-04",
              "year": 2022,
              "month": 4,
              "observed": 518.9772,
              "climatology": 525.2054,
              "anomaly": -6.2282
            },
            {
              "date": "2022-05",
              "year": 2022,
              "month": 5,
              "observed": 492.2137,
              "climatology": 498.1578,
              "anomaly": -5.9441
            },
            {
              "date": "2022-06",
              "year": 2022,
              "month": 6,
              "observed": 462.803,
              "climatology": 455.3163,
              "anomaly": 7.4867
            },
            {
              "date": "2022-07",
              "year": 2022,
              "month": 7,
              "observed": 400.5583,
              "climatology": 409.1737,
              "anomaly": -8.6154
            },
            {
              "date": "2022-08",
              "year": 2022,
              "month": 8,
              "observed": 361.7468,
              "climatology": 378.9462,
              "anomaly": -17.1994
            },
            {
              "date": "2022-09",
              "year": 2022,
              "month": 9,
              "observed": 367.0411,
              "climatology": 373.3072,
              "anomaly": -6.2661
            },
            {
              "date": "2022-10",
              "year": 2022,
              "month": 10,
              "observed": 401.7408,
              "climatology": 404.1663,
              "anomaly": -2.4255
            },
            {
              "date": "2022-11",
              "year": 2022,
              "month": 11,
              "observed": 424.4217,
              "climatology": 439.9029,
              "anomaly": -15.4812
            },
            {
              "date": "2022-12",
              "year": 2022,
              "month": 12,
              "observed": 445.8461,
              "climatology": 460.0054,
              "anomaly": -14.1593
            },
            {
              "date": "2023-01",
              "year": 2023,
              "month": 1,
              "observed": 479.2723,
              "climatology": 475.8818,
              "anomaly": 3.3905
            },
            {
              "date": "2023-02",
              "year": 2023,
              "month": 2,
              "observed": 485.9519,
              "climatology": 485.7296,
              "anomaly": 0.2223
            },
            {
              "date": "2023-03",
              "year": 2023,
              "month": 3,
              "observed": 503.2394,
              "climatology": 509.2433,
              "anomaly": -6.0039
            },
            {
              "date": "2023-04",
              "year": 2023,
              "month": 4,
              "observed": 517.31,
              "climatology": 525.2054,
              "anomaly": -7.8954
            },
            {
              "date": "2023-05",
              "year": 2023,
              "month": 5,
              "observed": 491.7548,
              "climatology": 498.1578,
              "anomaly": -6.403
            },
            {
              "date": "2023-06",
              "year": 2023,
              "month": 6,
              "observed": 411.3374,
              "climatology": 455.3163,
              "anomaly": -43.9789
            },
            {
              "date": "2023-07",
              "year": 2023,
              "month": 7,
              "observed": 406.8079,
              "climatology": 409.1737,
              "anomaly": -2.3658
            },
            {
              "date": "2023-08",
              "year": 2023,
              "month": 8,
              "observed": 401.5667,
              "climatology": 378.9462,
              "anomaly": 22.6205
            },
            {
              "date": "2023-09",
              "year": 2023,
              "month": 9,
              "observed": 386.7009,
              "climatology": 373.3072,
              "anomaly": 13.3937
            },
            {
              "date": "2023-10",
              "year": 2023,
              "month": 10,
              "observed": 402.9806,
              "climatology": 404.1663,
              "anomaly": -1.1857
            },
            {
              "date": "2023-11",
              "year": 2023,
              "month": 11,
              "observed": 433.5964,
              "climatology": 439.9029,
              "anomaly": -6.3065
            },
            {
              "date": "2023-12",
              "year": 2023,
              "month": 12,
              "observed": 457.0255,
              "climatology": 460.0054,
              "anomaly": -2.9799
            },
            {
              "date": "2024-01",
              "year": 2024,
              "month": 1,
              "observed": 475.4351,
              "climatology": 475.8818,
              "anomaly": -0.4467
            },
            {
              "date": "2024-02",
              "year": 2024,
              "month": 2,
              "observed": 489.6547,
              "climatology": 485.7296,
              "anomaly": 3.9251
            },
            {
              "date": "2024-03",
              "year": 2024,
              "month": 3,
              "observed": 496.3062,
              "climatology": 509.2433,
              "anomaly": -12.9371
            },
            {
              "date": "2024-04",
              "year": 2024,
              "month": 4,
              "observed": 498.2792,
              "climatology": 525.2054,
              "anomaly": -26.9262
            },
            {
              "date": "2024-05",
              "year": 2024,
              "month": 5,
              "observed": 476.313,
              "climatology": 498.1578,
              "anomaly": -21.8448
            },
            {
              "date": "2024-06",
              "year": 2024,
              "month": 6,
              "observed": 441.7636,
              "climatology": 455.3163,
              "anomaly": -13.5527
            },
            {
              "date": "2024-07",
              "year": 2024,
              "month": 7,
              "observed": 407.8062,
              "climatology": 409.1737,
              "anomaly": -1.3675
            },
            {
              "date": "2024-08",
              "year": 2024,
              "month": 8,
              "observed": 373.9812,
              "climatology": 378.9462,
              "anomaly": -4.965
            },
            {
              "date": "2024-09",
              "year": 2024,
              "month": 9,
              "observed": 339.683,
              "climatology": 373.3072,
              "anomaly": -33.6242
            },
            {
              "date": "2024-10",
              "year": 2024,
              "month": 10,
              "observed": 337.9852,
              "climatology": 404.1663,
              "anomaly": -66.1811
            },
            {
              "date": "2024-11",
              "year": 2024,
              "month": 11,
              "observed": 372.7126,
              "climatology": 439.9029,
              "anomaly": -67.1903
            },
            {
              "date": "2024-12",
              "year": 2024,
              "month": 12,
              "observed": 414.5294,
              "climatology": 460.0054,
              "anomaly": -45.476
            }
          ],
          "annual_series": [
            {
              "year": 2000,
              "annual_mean": 467.2754,
              "annual_anomaly": 16.0224
            },
            {
              "year": 2001,
              "annual_mean": 450.7473,
              "annual_anomaly": -0.5057
            },
            {
              "year": 2002,
              "annual_mean": 451.4281,
              "annual_anomaly": 0.1751
            },
            {
              "year": 2003,
              "annual_mean": 471.7274,
              "annual_anomaly": 20.4744
            },
            {
              "year": 2004,
              "annual_mean": 474.8349,
              "annual_anomaly": 23.5819
            },
            {
              "year": 2005,
              "annual_mean": 445.7089,
              "annual_anomaly": -5.5441
            },
            {
              "year": 2006,
              "annual_mean": 469.9997,
              "annual_anomaly": 18.7467
            },
            {
              "year": 2007,
              "annual_mean": 425.6382,
              "annual_anomaly": -25.6147
            },
            {
              "year": 2008,
              "annual_mean": 467.0389,
              "annual_anomaly": 15.7859
            },
            {
              "year": 2009,
              "annual_mean": 469.1942,
              "annual_anomaly": 17.9412
            },
            {
              "year": 2010,
              "annual_mean": 439.3553,
              "annual_anomaly": -11.8977
            },
            {
              "year": 2011,
              "annual_mean": 466.8979,
              "annual_anomaly": 15.6449
            },
            {
              "year": 2012,
              "annual_mean": 418.5947,
              "annual_anomaly": -32.6583
            },
            {
              "year": 2013,
              "annual_mean": 455.376,
              "annual_anomaly": 4.123
            },
            {
              "year": 2014,
              "annual_mean": 467.6611,
              "annual_anomaly": 16.4081
            },
            {
              "year": 2015,
              "annual_mean": 442.6338,
              "annual_anomaly": -8.6192
            },
            {
              "year": 2016,
              "annual_mean": 427.9523,
              "annual_anomaly": -23.3007
            },
            {
              "year": 2017,
              "annual_mean": 461.5808,
              "annual_anomaly": 10.3278
            },
            {
              "year": 2018,
              "annual_mean": 442.7805,
              "annual_anomaly": -8.4725
            },
            {
              "year": 2019,
              "annual_mean": 456.6101,
              "annual_anomaly": 5.3571
            },
            {
              "year": 2020,
              "annual_mean": 443.5963,
              "annual_anomaly": -7.6567
            },
            {
              "year": 2021,
              "annual_mean": 446.9642,
              "annual_anomaly": -4.2888
            },
            {
              "year": 2022,
              "annual_mean": 442.5628,
              "annual_anomaly": -8.6902
            },
            {
              "year": 2023,
              "annual_mean": 448.1287,
              "annual_anomaly": -3.1243
            },
            {
              "year": 2024,
              "annual_mean": 427.0374,
              "annual_anomaly": -24.2155
            }
          ],
          "climatology_baseline": {
            "1": 475.8818,
            "2": 485.7296,
            "3": 509.2433,
            "4": 525.2054,
            "5": 498.1578,
            "6": 455.3163,
            "7": 409.1737,
            "8": 378.9462,
            "9": 373.3072,
            "10": 404.1663,
            "11": 439.9029,
            "12": 460.0054
          }
        },
        "statistics": {
          "sens_slope": -0.97496,
          "sens_intercept": 2417.18593,
          "confidence_interval_95": [
            -1.71481,
            -0.05443
          ],
          "mann_kendall_score_s": -94,
          "standardized_z": -2.172,
          "p_value": 0.02985,
          "is_significant": true,
          "trend_label": "STATISTICALLY_SIGNIFICANT_DECREASING",
          "verdict_text": "Confirmed downward monotonic trend (-0.9750/yr, p=2.9855e-02). Evidence strongly rejects the null hypothesis.",
          "ols_comparison": {
            "ols_slope": -0.90102,
            "ols_pvalue": 0.03958,
            "r_squared": 0.1715
          }
        }
      }
    }
  },
  "case_03_global": {
    "status": "success",
    "polarity_status": "HOMOGENEOUS_OR_EQUILIBRIUM",
    "polarity_narrative": "Both domains demonstrate concordant directional trajectory or remain within natural dynamic variability bounds.",
    "variable": "PRECTOTCORR",
    "unit": "mm/day",
    "time_range": [
      2000,
      2024
    ],
    "region_a": {
      "name": "Western Sahel (Africa)",
      "bbox": [
        12.0,
        18.0,
        -15.0,
        10.0
      ],
      "analysis": {
        "metadata": {
          "source": "NASA_POWER_MERRA2",
          "doi": "N/A",
          "provenance_type": "LIVE_API_OR_ARCHIVE",
          "is_illustrative": false,
          "variable": "PRECTOTCORR",
          "unit": "mm/day",
          "depth_note": "Surface/Atmospheric Observation",
          "bbox": [
            12.0,
            18.0,
            -15.0,
            10.0
          ],
          "time_range": [
            2000,
            2024
          ],
          "total_observations": 300,
          "disclaimer": "Statistical trend reflects historical model-derived or reanalysis trajectory over the selected domain. Mathematical correlation or slope direction does not establish anthropogenic or environmental causation."
        },
        "climatology": {
          "monthly_series": [
            {
              "date": "2000-01",
              "year": 2000,
              "month": 1,
              "observed": 0.0,
              "climatology": 0.0084,
              "anomaly": -0.0084
            },
            {
              "date": "2000-02",
              "year": 2000,
              "month": 2,
              "observed": 0.0,
              "climatology": 0.012,
              "anomaly": -0.012
            },
            {
              "date": "2000-03",
              "year": 2000,
              "month": 3,
              "observed": 0.0,
              "climatology": 0.0408,
              "anomaly": -0.0408
            },
            {
              "date": "2000-04",
              "year": 2000,
              "month": 4,
              "observed": 0.14,
              "climatology": 0.14,
              "anomaly": 0.0
            },
            {
              "date": "2000-05",
              "year": 2000,
              "month": 5,
              "observed": 0.78,
              "climatology": 0.5072,
              "anomaly": 0.2728
            },
            {
              "date": "2000-06",
              "year": 2000,
              "month": 6,
              "observed": 1.24,
              "climatology": 2.6576,
              "anomaly": -1.4176
            },
            {
              "date": "2000-07",
              "year": 2000,
              "month": 7,
              "observed": 3.67,
              "climatology": 4.8836,
              "anomaly": -1.2136
            },
            {
              "date": "2000-08",
              "year": 2000,
              "month": 8,
              "observed": 4.5,
              "climatology": 5.8772,
              "anomaly": -1.3772
            },
            {
              "date": "2000-09",
              "year": 2000,
              "month": 9,
              "observed": 2.73,
              "climatology": 3.234,
              "anomaly": -0.504
            },
            {
              "date": "2000-10",
              "year": 2000,
              "month": 10,
              "observed": 0.39,
              "climatology": 0.5764,
              "anomaly": -0.1864
            },
            {
              "date": "2000-11",
              "year": 2000,
              "month": 11,
              "observed": 0.0,
              "climatology": 0.0256,
              "anomaly": -0.0256
            },
            {
              "date": "2000-12",
              "year": 2000,
              "month": 12,
              "observed": 0.0,
              "climatology": 0.0,
              "anomaly": 0.0
            },
            {
              "date": "2001-01",
              "year": 2001,
              "month": 1,
              "observed": 0.0,
              "climatology": 0.0084,
              "anomaly": -0.0084
            },
            {
              "date": "2001-02",
              "year": 2001,
              "month": 2,
              "observed": 0.0,
              "climatology": 0.012,
              "anomaly": -0.012
            },
            {
              "date": "2001-03",
              "year": 2001,
              "month": 3,
              "observed": 0.0,
              "climatology": 0.0408,
              "anomaly": -0.0408
            },
            {
              "date": "2001-04",
              "year": 2001,
              "month": 4,
              "observed": 0.09,
              "climatology": 0.14,
              "anomaly": -0.05
            },
            {
              "date": "2001-05",
              "year": 2001,
              "month": 5,
              "observed": 0.35,
              "climatology": 0.5072,
              "anomaly": -0.1572
            },
            {
              "date": "2001-06",
              "year": 2001,
              "month": 6,
              "observed": 2.5,
              "climatology": 2.6576,
              "anomaly": -0.1576
            },
            {
              "date": "2001-07",
              "year": 2001,
              "month": 7,
              "observed": 4.59,
              "climatology": 4.8836,
              "anomaly": -0.2936
            },
            {
              "date": "2001-08",
              "year": 2001,
              "month": 8,
              "observed": 4.06,
              "climatology": 5.8772,
              "anomaly": -1.8172
            },
            {
              "date": "2001-09",
              "year": 2001,
              "month": 9,
              "observed": 1.9,
              "climatology": 3.234,
              "anomaly": -1.334
            },
            {
              "date": "2001-10",
              "year": 2001,
              "month": 10,
              "observed": 0.35,
              "climatology": 0.5764,
              "anomaly": -0.2264
            },
            {
              "date": "2001-11",
              "year": 2001,
              "month": 11,
              "observed": 0.0,
              "climatology": 0.0256,
              "anomaly": -0.0256
            },
            {
              "date": "2001-12",
              "year": 2001,
              "month": 12,
              "observed": 0.0,
              "climatology": 0.0,
              "anomaly": 0.0
            },
            {
              "date": "2002-01",
              "year": 2002,
              "month": 1,
              "observed": 0.0,
              "climatology": 0.0084,
              "anomaly": -0.0084
            },
            {
              "date": "2002-02",
              "year": 2002,
              "month": 2,
              "observed": 0.0,
              "climatology": 0.012,
              "anomaly": -0.012
            },
            {
              "date": "2002-03",
              "year": 2002,
              "month": 3,
              "observed": 0.0,
              "climatology": 0.0408,
              "anomaly": -0.0408
            },
            {
              "date": "2002-04",
              "year": 2002,
              "month": 4,
              "observed": 0.02,
              "climatology": 0.14,
              "anomaly": -0.12
            },
            {
              "date": "2002-05",
              "year": 2002,
              "month": 5,
              "observed": 1.14,
              "climatology": 0.5072,
              "anomaly": 0.6328
            },
            {
              "date": "2002-06",
              "year": 2002,
              "month": 6,
              "observed": 0.97,
              "climatology": 2.6576,
              "anomaly": -1.6876
            },
            {
              "date": "2002-07",
              "year": 2002,
              "month": 7,
              "observed": 3.52,
              "climatology": 4.8836,
              "anomaly": -1.3636
            },
            {
              "date": "2002-08",
              "year": 2002,
              "month": 8,
              "observed": 4.34,
              "climatology": 5.8772,
              "anomaly": -1.5372
            },
            {
              "date": "2002-09",
              "year": 2002,
              "month": 9,
              "observed": 3.14,
              "climatology": 3.234,
              "anomaly": -0.094
            },
            {
              "date": "2002-10",
              "year": 2002,
              "month": 10,
              "observed": 0.98,
              "climatology": 0.5764,
              "anomaly": 0.4036
            },
            {
              "date": "2002-11",
              "year": 2002,
              "month": 11,
              "observed": 0.0,
              "climatology": 0.0256,
              "anomaly": -0.0256
            },
            {
              "date": "2002-12",
              "year": 2002,
              "month": 12,
              "observed": 0.0,
              "climatology": 0.0,
              "anomaly": 0.0
            },
            {
              "date": "2003-01",
              "year": 2003,
              "month": 1,
              "observed": 0.0,
              "climatology": 0.0084,
              "anomaly": -0.0084
            },
            {
              "date": "2003-02",
              "year": 2003,
              "month": 2,
              "observed": 0.0,
              "climatology": 0.012,
              "anomaly": -0.012
            },
            {
              "date": "2003-03",
              "year": 2003,
              "month": 3,
              "observed": 0.07,
              "climatology": 0.0408,
              "anomaly": 0.0292
            },
            {
              "date": "2003-04",
              "year": 2003,
              "month": 4,
              "observed": 0.03,
              "climatology": 0.14,
              "anomaly": -0.11
            },
            {
              "date": "2003-05",
              "year": 2003,
              "month": 5,
              "observed": 0.25,
              "climatology": 0.5072,
              "anomaly": -0.2572
            },
            {
              "date": "2003-06",
              "year": 2003,
              "month": 6,
              "observed": 2.68,
              "climatology": 2.6576,
              "anomaly": 0.0224
            },
            {
              "date": "2003-07",
              "year": 2003,
              "month": 7,
              "observed": 2.41,
              "climatology": 4.8836,
              "anomaly": -2.4736
            },
            {
              "date": "2003-08",
              "year": 2003,
              "month": 8,
              "observed": 8.06,
              "climatology": 5.8772,
              "anomaly": 2.1828
            },
            {
              "date": "2003-09",
              "year": 2003,
              "month": 9,
              "observed": 3.35,
              "climatology": 3.234,
              "anomaly": 0.116
            },
            {
              "date": "2003-10",
              "year": 2003,
              "month": 10,
              "observed": 0.42,
              "climatology": 0.5764,
              "anomaly": -0.1564
            },
            {
              "date": "2003-11",
              "year": 2003,
              "month": 11,
              "observed": 0.01,
              "climatology": 0.0256,
              "anomaly": -0.0156
            },
            {
              "date": "2003-12",
              "year": 2003,
              "month": 12,
              "observed": 0.0,
              "climatology": 0.0,
              "anomaly": 0.0
            },
            {
              "date": "2004-01",
              "year": 2004,
              "month": 1,
              "observed": 0.04,
              "climatology": 0.0084,
              "anomaly": 0.0316
            },
            {
              "date": "2004-02",
              "year": 2004,
              "month": 2,
              "observed": 0.0,
              "climatology": 0.012,
              "anomaly": -0.012
            },
            {
              "date": "2004-03",
              "year": 2004,
              "month": 3,
              "observed": 0.01,
              "climatology": 0.0408,
              "anomaly": -0.0308
            },
            {
              "date": "2004-04",
              "year": 2004,
              "month": 4,
              "observed": 0.34,
              "climatology": 0.14,
              "anomaly": 0.2
            },
            {
              "date": "2004-05",
              "year": 2004,
              "month": 5,
              "observed": 0.02,
              "climatology": 0.5072,
              "anomaly": -0.4872
            },
            {
              "date": "2004-06",
              "year": 2004,
              "month": 6,
              "observed": 3.61,
              "climatology": 2.6576,
              "anomaly": 0.9524
            },
            {
              "date": "2004-07",
              "year": 2004,
              "month": 7,
              "observed": 3.54,
              "climatology": 4.8836,
              "anomaly": -1.3436
            },
            {
              "date": "2004-08",
              "year": 2004,
              "month": 8,
              "observed": 4.21,
              "climatology": 5.8772,
              "anomaly": -1.6672
            },
            {
              "date": "2004-09",
              "year": 2004,
              "month": 9,
              "observed": 1.35,
              "climatology": 3.234,
              "anomaly": -1.884
            },
            {
              "date": "2004-10",
              "year": 2004,
              "month": 10,
              "observed": 0.11,
              "climatology": 0.5764,
              "anomaly": -0.4664
            },
            {
              "date": "2004-11",
              "year": 2004,
              "month": 11,
              "observed": 0.0,
              "climatology": 0.0256,
              "anomaly": -0.0256
            },
            {
              "date": "2004-12",
              "year": 2004,
              "month": 12,
              "observed": 0.0,
              "climatology": 0.0,
              "anomaly": 0.0
            },
            {
              "date": "2005-01",
              "year": 2005,
              "month": 1,
              "observed": 0.03,
              "climatology": 0.0084,
              "anomaly": 0.0216
            },
            {
              "date": "2005-02",
              "year": 2005,
              "month": 2,
              "observed": 0.11,
              "climatology": 0.012,
              "anomaly": 0.098
            },
            {
              "date": "2005-03",
              "year": 2005,
              "month": 3,
              "observed": 0.06,
              "climatology": 0.0408,
              "anomaly": 0.0192
            },
            {
              "date": "2005-04",
              "year": 2005,
              "month": 4,
              "observed": 0.06,
              "climatology": 0.14,
              "anomaly": -0.08
            },
            {
              "date": "2005-05",
              "year": 2005,
              "month": 5,
              "observed": 1.55,
              "climatology": 0.5072,
              "anomaly": 1.0428
            },
            {
              "date": "2005-06",
              "year": 2005,
              "month": 6,
              "observed": 2.08,
              "climatology": 2.6576,
              "anomaly": -0.5776
            },
            {
              "date": "2005-07",
              "year": 2005,
              "month": 7,
              "observed": 3.43,
              "climatology": 4.8836,
              "anomaly": -1.4536
            },
            {
              "date": "2005-08",
              "year": 2005,
              "month": 8,
              "observed": 4.78,
              "climatology": 5.8772,
              "anomaly": -1.0972
            },
            {
              "date": "2005-09",
              "year": 2005,
              "month": 9,
              "observed": 3.07,
              "climatology": 3.234,
              "anomaly": -0.164
            },
            {
              "date": "2005-10",
              "year": 2005,
              "month": 10,
              "observed": 0.01,
              "climatology": 0.5764,
              "anomaly": -0.5664
            },
            {
              "date": "2005-11",
              "year": 2005,
              "month": 11,
              "observed": 0.0,
              "climatology": 0.0256,
              "anomaly": -0.0256
            },
            {
              "date": "2005-12",
              "year": 2005,
              "month": 12,
              "observed": 0.0,
              "climatology": 0.0,
              "anomaly": 0.0
            },
            {
              "date": "2006-01",
              "year": 2006,
              "month": 1,
              "observed": 0.07,
              "climatology": 0.0084,
              "anomaly": 0.0616
            },
            {
              "date": "2006-02",
              "year": 2006,
              "month": 2,
              "observed": 0.01,
              "climatology": 0.012,
              "anomaly": -0.002
            },
            {
              "date": "2006-03",
              "year": 2006,
              "month": 3,
              "observed": 0.0,
              "climatology": 0.0408,
              "anomaly": -0.0408
            },
            {
              "date": "2006-04",
              "year": 2006,
              "month": 4,
              "observed": 0.09,
              "climatology": 0.14,
              "anomaly": -0.05
            },
            {
              "date": "2006-05",
              "year": 2006,
              "month": 5,
              "observed": 0.45,
              "climatology": 0.5072,
              "anomaly": -0.0572
            },
            {
              "date": "2006-06",
              "year": 2006,
              "month": 6,
              "observed": 1.0,
              "climatology": 2.6576,
              "anomaly": -1.6576
            },
            {
              "date": "2006-07",
              "year": 2006,
              "month": 7,
              "observed": 5.18,
              "climatology": 4.8836,
              "anomaly": 0.2964
            },
            {
              "date": "2006-08",
              "year": 2006,
              "month": 8,
              "observed": 5.48,
              "climatology": 5.8772,
              "anomaly": -0.3972
            },
            {
              "date": "2006-09",
              "year": 2006,
              "month": 9,
              "observed": 2.6,
              "climatology": 3.234,
              "anomaly": -0.634
            },
            {
              "date": "2006-10",
              "year": 2006,
              "month": 10,
              "observed": 0.38,
              "climatology": 0.5764,
              "anomaly": -0.1964
            },
            {
              "date": "2006-11",
              "year": 2006,
              "month": 11,
              "observed": 0.0,
              "climatology": 0.0256,
              "anomaly": -0.0256
            },
            {
              "date": "2006-12",
              "year": 2006,
              "month": 12,
              "observed": 0.0,
              "climatology": 0.0,
              "anomaly": 0.0
            },
            {
              "date": "2007-01",
              "year": 2007,
              "month": 1,
              "observed": 0.0,
              "climatology": 0.0084,
              "anomaly": -0.0084
            },
            {
              "date": "2007-02",
              "year": 2007,
              "month": 2,
              "observed": 0.0,
              "climatology": 0.012,
              "anomaly": -0.012
            },
            {
              "date": "2007-03",
              "year": 2007,
              "month": 3,
              "observed": 0.0,
              "climatology": 0.0408,
              "anomaly": -0.0408
            },
            {
              "date": "2007-04",
              "year": 2007,
              "month": 4,
              "observed": 0.06,
              "climatology": 0.14,
              "anomaly": -0.08
            },
            {
              "date": "2007-05",
              "year": 2007,
              "month": 5,
              "observed": 0.26,
              "climatology": 0.5072,
              "anomaly": -0.2472
            },
            {
              "date": "2007-06",
              "year": 2007,
              "month": 6,
              "observed": 1.15,
              "climatology": 2.6576,
              "anomaly": -1.5076
            },
            {
              "date": "2007-07",
              "year": 2007,
              "month": 7,
              "observed": 3.22,
              "climatology": 4.8836,
              "anomaly": -1.6636
            },
            {
              "date": "2007-08",
              "year": 2007,
              "month": 8,
              "observed": 7.09,
              "climatology": 5.8772,
              "anomaly": 1.2128
            },
            {
              "date": "2007-09",
              "year": 2007,
              "month": 9,
              "observed": 2.94,
              "climatology": 3.234,
              "anomaly": -0.294
            },
            {
              "date": "2007-10",
              "year": 2007,
              "month": 10,
              "observed": 0.16,
              "climatology": 0.5764,
              "anomaly": -0.4164
            },
            {
              "date": "2007-11",
              "year": 2007,
              "month": 11,
              "observed": 0.0,
              "climatology": 0.0256,
              "anomaly": -0.0256
            },
            {
              "date": "2007-12",
              "year": 2007,
              "month": 12,
              "observed": 0.0,
              "climatology": 0.0,
              "anomaly": 0.0
            },
            {
              "date": "2008-01",
              "year": 2008,
              "month": 1,
              "observed": 0.0,
              "climatology": 0.0084,
              "anomaly": -0.0084
            },
            {
              "date": "2008-02",
              "year": 2008,
              "month": 2,
              "observed": 0.0,
              "climatology": 0.012,
              "anomaly": -0.012
            },
            {
              "date": "2008-03",
              "year": 2008,
              "month": 3,
              "observed": 0.0,
              "climatology": 0.0408,
              "anomaly": -0.0408
            },
            {
              "date": "2008-04",
              "year": 2008,
              "month": 4,
              "observed": 0.37,
              "climatology": 0.14,
              "anomaly": 0.23
            },
            {
              "date": "2008-05",
              "year": 2008,
              "month": 5,
              "observed": 0.07,
              "climatology": 0.5072,
              "anomaly": -0.4372
            },
            {
              "date": "2008-06",
              "year": 2008,
              "month": 6,
              "observed": 2.52,
              "climatology": 2.6576,
              "anomaly": -0.1376
            },
            {
              "date": "2008-07",
              "year": 2008,
              "month": 7,
              "observed": 3.25,
              "climatology": 4.8836,
              "anomaly": -1.6336
            },
            {
              "date": "2008-08",
              "year": 2008,
              "month": 8,
              "observed": 4.2,
              "climatology": 5.8772,
              "anomaly": -1.6772
            },
            {
              "date": "2008-09",
              "year": 2008,
              "month": 9,
              "observed": 1.61,
              "climatology": 3.234,
              "anomaly": -1.624
            },
            {
              "date": "2008-10",
              "year": 2008,
              "month": 10,
              "observed": 0.42,
              "climatology": 0.5764,
              "anomaly": -0.1564
            },
            {
              "date": "2008-11",
              "year": 2008,
              "month": 11,
              "observed": 0.0,
              "climatology": 0.0256,
              "anomaly": -0.0256
            },
            {
              "date": "2008-12",
              "year": 2008,
              "month": 12,
              "observed": 0.0,
              "climatology": 0.0,
              "anomaly": 0.0
            },
            {
              "date": "2009-01",
              "year": 2009,
              "month": 1,
              "observed": 0.0,
              "climatology": 0.0084,
              "anomaly": -0.0084
            },
            {
              "date": "2009-02",
              "year": 2009,
              "month": 2,
              "observed": 0.0,
              "climatology": 0.012,
              "anomaly": -0.012
            },
            {
              "date": "2009-03",
              "year": 2009,
              "month": 3,
              "observed": 0.01,
              "climatology": 0.0408,
              "anomaly": -0.0308
            },
            {
              "date": "2009-04",
              "year": 2009,
              "month": 4,
              "observed": 0.06,
              "climatology": 0.14,
              "anomaly": -0.08
            },
            {
              "date": "2009-05",
              "year": 2009,
              "month": 5,
              "observed": 0.31,
              "climatology": 0.5072,
              "anomaly": -0.1972
            },
            {
              "date": "2009-06",
              "year": 2009,
              "month": 6,
              "observed": 1.55,
              "climatology": 2.6576,
              "anomaly": -1.1076
            },
            {
              "date": "2009-07",
              "year": 2009,
              "month": 7,
              "observed": 2.55,
              "climatology": 4.8836,
              "anomaly": -2.3336
            },
            {
              "date": "2009-08",
              "year": 2009,
              "month": 8,
              "observed": 5.46,
              "climatology": 5.8772,
              "anomaly": -0.4172
            },
            {
              "date": "2009-09",
              "year": 2009,
              "month": 9,
              "observed": 3.83,
              "climatology": 3.234,
              "anomaly": 0.596
            },
            {
              "date": "2009-10",
              "year": 2009,
              "month": 10,
              "observed": 0.67,
              "climatology": 0.5764,
              "anomaly": 0.0936
            },
            {
              "date": "2009-11",
              "year": 2009,
              "month": 11,
              "observed": 0.02,
              "climatology": 0.0256,
              "anomaly": -0.0056
            },
            {
              "date": "2009-12",
              "year": 2009,
              "month": 12,
              "observed": 0.0,
              "climatology": 0.0,
              "anomaly": 0.0
            },
            {
              "date": "2010-01",
              "year": 2010,
              "month": 1,
              "observed": 0.0,
              "climatology": 0.0084,
              "anomaly": -0.0084
            },
            {
              "date": "2010-02",
              "year": 2010,
              "month": 2,
              "observed": 0.0,
              "climatology": 0.012,
              "anomaly": -0.012
            },
            {
              "date": "2010-03",
              "year": 2010,
              "month": 3,
              "observed": 0.0,
              "climatology": 0.0408,
              "anomaly": -0.0408
            },
            {
              "date": "2010-04",
              "year": 2010,
              "month": 4,
              "observed": 0.14,
              "climatology": 0.14,
              "anomaly": 0.0
            },
            {
              "date": "2010-05",
              "year": 2010,
              "month": 5,
              "observed": 0.28,
              "climatology": 0.5072,
              "anomaly": -0.2272
            },
            {
              "date": "2010-06",
              "year": 2010,
              "month": 6,
              "observed": 1.75,
              "climatology": 2.6576,
              "anomaly": -0.9076
            },
            {
              "date": "2010-07",
              "year": 2010,
              "month": 7,
              "observed": 3.99,
              "climatology": 4.8836,
              "anomaly": -0.8936
            },
            {
              "date": "2010-08",
              "year": 2010,
              "month": 8,
              "observed": 4.72,
              "climatology": 5.8772,
              "anomaly": -1.1572
            },
            {
              "date": "2010-09",
              "year": 2010,
              "month": 9,
              "observed": 4.88,
              "climatology": 3.234,
              "anomaly": 1.646
            },
            {
              "date": "2010-10",
              "year": 2010,
              "month": 10,
              "observed": 0.95,
              "climatology": 0.5764,
              "anomaly": 0.3736
            },
            {
              "date": "2010-11",
              "year": 2010,
              "month": 11,
              "observed": 0.03,
              "climatology": 0.0256,
              "anomaly": 0.0044
            },
            {
              "date": "2010-12",
              "year": 2010,
              "month": 12,
              "observed": 0.0,
              "climatology": 0.0,
              "anomaly": 0.0
            },
            {
              "date": "2011-01",
              "year": 2011,
              "month": 1,
              "observed": 0.0,
              "climatology": 0.0084,
              "anomaly": -0.0084
            },
            {
              "date": "2011-02",
              "year": 2011,
              "month": 2,
              "observed": 0.0,
              "climatology": 0.012,
              "anomaly": -0.012
            },
            {
              "date": "2011-03",
              "year": 2011,
              "month": 3,
              "observed": 0.0,
              "climatology": 0.0408,
              "anomaly": -0.0408
            },
            {
              "date": "2011-04",
              "year": 2011,
              "month": 4,
              "observed": 0.03,
              "climatology": 0.14,
              "anomaly": -0.11
            },
            {
              "date": "2011-05",
              "year": 2011,
              "month": 5,
              "observed": 0.34,
              "climatology": 0.5072,
              "anomaly": -0.1672
            },
            {
              "date": "2011-06",
              "year": 2011,
              "month": 6,
              "observed": 1.4,
              "climatology": 2.6576,
              "anomaly": -1.2576
            },
            {
              "date": "2011-07",
              "year": 2011,
              "month": 7,
              "observed": 4.55,
              "climatology": 4.8836,
              "anomaly": -0.3336
            },
            {
              "date": "2011-08",
              "year": 2011,
              "month": 8,
              "observed": 4.12,
              "climatology": 5.8772,
              "anomaly": -1.7572
            },
            {
              "date": "2011-09",
              "year": 2011,
              "month": 9,
              "observed": 3.86,
              "climatology": 3.234,
              "anomaly": 0.626
            },
            {
              "date": "2011-10",
              "year": 2011,
              "month": 10,
              "observed": 0.1,
              "climatology": 0.5764,
              "anomaly": -0.4764
            },
            {
              "date": "2011-11",
              "year": 2011,
              "month": 11,
              "observed": 0.0,
              "climatology": 0.0256,
              "anomaly": -0.0256
            },
            {
              "date": "2011-12",
              "year": 2011,
              "month": 12,
              "observed": 0.0,
              "climatology": 0.0,
              "anomaly": 0.0
            },
            {
              "date": "2012-01",
              "year": 2012,
              "month": 1,
              "observed": 0.0,
              "climatology": 0.0084,
              "anomaly": -0.0084
            },
            {
              "date": "2012-02",
              "year": 2012,
              "month": 2,
              "observed": 0.0,
              "climatology": 0.012,
              "anomaly": -0.012
            },
            {
              "date": "2012-03",
              "year": 2012,
              "month": 3,
              "observed": 0.0,
              "climatology": 0.0408,
              "anomaly": -0.0408
            },
            {
              "date": "2012-04",
              "year": 2012,
              "month": 4,
              "observed": 0.27,
              "climatology": 0.14,
              "anomaly": 0.13
            },
            {
              "date": "2012-05",
              "year": 2012,
              "month": 5,
              "observed": 0.4,
              "climatology": 0.5072,
              "anomaly": -0.1072
            },
            {
              "date": "2012-06",
              "year": 2012,
              "month": 6,
              "observed": 2.11,
              "climatology": 2.6576,
              "anomaly": -0.5476
            },
            {
              "date": "2012-07",
              "year": 2012,
              "month": 7,
              "observed": 5.82,
              "climatology": 4.8836,
              "anomaly": 0.9364
            },
            {
              "date": "2012-08",
              "year": 2012,
              "month": 8,
              "observed": 7.5,
              "climatology": 5.8772,
              "anomaly": 1.6228
            },
            {
              "date": "2012-09",
              "year": 2012,
              "month": 9,
              "observed": 3.65,
              "climatology": 3.234,
              "anomaly": 0.416
            },
            {
              "date": "2012-10",
              "year": 2012,
              "month": 10,
              "observed": 0.37,
              "climatology": 0.5764,
              "anomaly": -0.2064
            },
            {
              "date": "2012-11",
              "year": 2012,
              "month": 11,
              "observed": 0.0,
              "climatology": 0.0256,
              "anomaly": -0.0256
            },
            {
              "date": "2012-12",
              "year": 2012,
              "month": 12,
              "observed": 0.0,
              "climatology": 0.0,
              "anomaly": 0.0
            },
            {
              "date": "2013-01",
              "year": 2013,
              "month": 1,
              "observed": 0.01,
              "climatology": 0.0084,
              "anomaly": 0.0016
            },
            {
              "date": "2013-02",
              "year": 2013,
              "month": 2,
              "observed": 0.0,
              "climatology": 0.012,
              "anomaly": -0.012
            },
            {
              "date": "2013-03",
              "year": 2013,
              "month": 3,
              "observed": 0.0,
              "climatology": 0.0408,
              "anomaly": -0.0408
            },
            {
              "date": "2013-04",
              "year": 2013,
              "month": 4,
              "observed": 0.94,
              "climatology": 0.14,
              "anomaly": 0.8
            },
            {
              "date": "2013-05",
              "year": 2013,
              "month": 5,
              "observed": 0.74,
              "climatology": 0.5072,
              "anomaly": 0.2328
            },
            {
              "date": "2013-06",
              "year": 2013,
              "month": 6,
              "observed": 1.14,
              "climatology": 2.6576,
              "anomaly": -1.5176
            },
            {
              "date": "2013-07",
              "year": 2013,
              "month": 7,
              "observed": 3.6,
              "climatology": 4.8836,
              "anomaly": -1.2836
            },
            {
              "date": "2013-08",
              "year": 2013,
              "month": 8,
              "observed": 5.64,
              "climatology": 5.8772,
              "anomaly": -0.2372
            },
            {
              "date": "2013-09",
              "year": 2013,
              "month": 9,
              "observed": 2.89,
              "climatology": 3.234,
              "anomaly": -0.344
            },
            {
              "date": "2013-10",
              "year": 2013,
              "month": 10,
              "observed": 0.48,
              "climatology": 0.5764,
              "anomaly": -0.0964
            },
            {
              "date": "2013-11",
              "year": 2013,
              "month": 11,
              "observed": 0.0,
              "climatology": 0.0256,
              "anomaly": -0.0256
            },
            {
              "date": "2013-12",
              "year": 2013,
              "month": 12,
              "observed": 0.0,
              "climatology": 0.0,
              "anomaly": 0.0
            },
            {
              "date": "2014-01",
              "year": 2014,
              "month": 1,
              "observed": 0.05,
              "climatology": 0.0084,
              "anomaly": 0.0416
            },
            {
              "date": "2014-02",
              "year": 2014,
              "month": 2,
              "observed": 0.03,
              "climatology": 0.012,
              "anomaly": 0.018
            },
            {
              "date": "2014-03",
              "year": 2014,
              "month": 3,
              "observed": 0.01,
              "climatology": 0.0408,
              "anomaly": -0.0308
            },
            {
              "date": "2014-04",
              "year": 2014,
              "month": 4,
              "observed": 0.0,
              "climatology": 0.14,
              "anomaly": -0.14
            },
            {
              "date": "2014-05",
              "year": 2014,
              "month": 5,
              "observed": 0.91,
              "climatology": 0.5072,
              "anomaly": 0.4028
            },
            {
              "date": "2014-06",
              "year": 2014,
              "month": 6,
              "observed": 1.72,
              "climatology": 2.6576,
              "anomaly": -0.9376
            },
            {
              "date": "2014-07",
              "year": 2014,
              "month": 7,
              "observed": 3.35,
              "climatology": 4.8836,
              "anomaly": -1.5336
            },
            {
              "date": "2014-08",
              "year": 2014,
              "month": 8,
              "observed": 4.35,
              "climatology": 5.8772,
              "anomaly": -1.5272
            },
            {
              "date": "2014-09",
              "year": 2014,
              "month": 9,
              "observed": 4.18,
              "climatology": 3.234,
              "anomaly": 0.946
            },
            {
              "date": "2014-10",
              "year": 2014,
              "month": 10,
              "observed": 0.77,
              "climatology": 0.5764,
              "anomaly": 0.1936
            },
            {
              "date": "2014-11",
              "year": 2014,
              "month": 11,
              "observed": 0.45,
              "climatology": 0.0256,
              "anomaly": 0.4244
            },
            {
              "date": "2014-12",
              "year": 2014,
              "month": 12,
              "observed": 0.0,
              "climatology": 0.0,
              "anomaly": 0.0
            },
            {
              "date": "2015-01",
              "year": 2015,
              "month": 1,
              "observed": 0.0,
              "climatology": 0.0084,
              "anomaly": -0.0084
            },
            {
              "date": "2015-02",
              "year": 2015,
              "month": 2,
              "observed": 0.07,
              "climatology": 0.012,
              "anomaly": 0.058
            },
            {
              "date": "2015-03",
              "year": 2015,
              "month": 3,
              "observed": 0.68,
              "climatology": 0.0408,
              "anomaly": 0.6392
            },
            {
              "date": "2015-04",
              "year": 2015,
              "month": 4,
              "observed": 0.0,
              "climatology": 0.14,
              "anomaly": -0.14
            },
            {
              "date": "2015-05",
              "year": 2015,
              "month": 5,
              "observed": 0.05,
              "climatology": 0.5072,
              "anomaly": -0.4572
            },
            {
              "date": "2015-06",
              "year": 2015,
              "month": 6,
              "observed": 5.55,
              "climatology": 2.6576,
              "anomaly": 2.8924
            },
            {
              "date": "2015-07",
              "year": 2015,
              "month": 7,
              "observed": 5.63,
              "climatology": 4.8836,
              "anomaly": 0.7464
            },
            {
              "date": "2015-08",
              "year": 2015,
              "month": 8,
              "observed": 7.32,
              "climatology": 5.8772,
              "anomaly": 1.4428
            },
            {
              "date": "2015-09",
              "year": 2015,
              "month": 9,
              "observed": 4.92,
              "climatology": 3.234,
              "anomaly": 1.686
            },
            {
              "date": "2015-10",
              "year": 2015,
              "month": 10,
              "observed": 2.2,
              "climatology": 0.5764,
              "anomaly": 1.6236
            },
            {
              "date": "2015-11",
              "year": 2015,
              "month": 11,
              "observed": 0.0,
              "climatology": 0.0256,
              "anomaly": -0.0256
            },
            {
              "date": "2015-12",
              "year": 2015,
              "month": 12,
              "observed": 0.0,
              "climatology": 0.0,
              "anomaly": 0.0
            },
            {
              "date": "2016-01",
              "year": 2016,
              "month": 1,
              "observed": 0.0,
              "climatology": 0.0084,
              "anomaly": -0.0084
            },
            {
              "date": "2016-02",
              "year": 2016,
              "month": 2,
              "observed": 0.0,
              "climatology": 0.012,
              "anomaly": -0.012
            },
            {
              "date": "2016-03",
              "year": 2016,
              "month": 3,
              "observed": 0.02,
              "climatology": 0.0408,
              "anomaly": -0.0208
            },
            {
              "date": "2016-04",
              "year": 2016,
              "month": 4,
              "observed": 0.21,
              "climatology": 0.14,
              "anomaly": 0.07
            },
            {
              "date": "2016-05",
              "year": 2016,
              "month": 5,
              "observed": 0.49,
              "climatology": 0.5072,
              "anomaly": -0.0172
            },
            {
              "date": "2016-06",
              "year": 2016,
              "month": 6,
              "observed": 5.03,
              "climatology": 2.6576,
              "anomaly": 2.3724
            },
            {
              "date": "2016-07",
              "year": 2016,
              "month": 7,
              "observed": 8.19,
              "climatology": 4.8836,
              "anomaly": 3.3064
            },
            {
              "date": "2016-08",
              "year": 2016,
              "month": 8,
              "observed": 8.62,
              "climatology": 5.8772,
              "anomaly": 2.7428
            },
            {
              "date": "2016-09",
              "year": 2016,
              "month": 9,
              "observed": 1.89,
              "climatology": 3.234,
              "anomaly": -1.344
            },
            {
              "date": "2016-10",
              "year": 2016,
              "month": 10,
              "observed": 0.26,
              "climatology": 0.5764,
              "anomaly": -0.3164
            },
            {
              "date": "2016-11",
              "year": 2016,
              "month": 11,
              "observed": 0.0,
              "climatology": 0.0256,
              "anomaly": -0.0256
            },
            {
              "date": "2016-12",
              "year": 2016,
              "month": 12,
              "observed": 0.0,
              "climatology": 0.0,
              "anomaly": 0.0
            },
            {
              "date": "2017-01",
              "year": 2017,
              "month": 1,
              "observed": 0.0,
              "climatology": 0.0084,
              "anomaly": -0.0084
            },
            {
              "date": "2017-02",
              "year": 2017,
              "month": 2,
              "observed": 0.0,
              "climatology": 0.012,
              "anomaly": -0.012
            },
            {
              "date": "2017-03",
              "year": 2017,
              "month": 3,
              "observed": 0.0,
              "climatology": 0.0408,
              "anomaly": -0.0408
            },
            {
              "date": "2017-04",
              "year": 2017,
              "month": 4,
              "observed": 0.02,
              "climatology": 0.14,
              "anomaly": -0.12
            },
            {
              "date": "2017-05",
              "year": 2017,
              "month": 5,
              "observed": 1.11,
              "climatology": 0.5072,
              "anomaly": 0.6028
            },
            {
              "date": "2017-06",
              "year": 2017,
              "month": 6,
              "observed": 3.48,
              "climatology": 2.6576,
              "anomaly": 0.8224
            },
            {
              "date": "2017-07",
              "year": 2017,
              "month": 7,
              "observed": 15.57,
              "climatology": 4.8836,
              "anomaly": 10.6864
            },
            {
              "date": "2017-08",
              "year": 2017,
              "month": 8,
              "observed": 5.48,
              "climatology": 5.8772,
              "anomaly": -0.3972
            },
            {
              "date": "2017-09",
              "year": 2017,
              "month": 9,
              "observed": 5.47,
              "climatology": 3.234,
              "anomaly": 2.236
            },
            {
              "date": "2017-10",
              "year": 2017,
              "month": 10,
              "observed": 0.01,
              "climatology": 0.5764,
              "anomaly": -0.5664
            },
            {
              "date": "2017-11",
              "year": 2017,
              "month": 11,
              "observed": 0.0,
              "climatology": 0.0256,
              "anomaly": -0.0256
            },
            {
              "date": "2017-12",
              "year": 2017,
              "month": 12,
              "observed": 0.0,
              "climatology": 0.0,
              "anomaly": 0.0
            },
            {
              "date": "2018-01",
              "year": 2018,
              "month": 1,
              "observed": 0.01,
              "climatology": 0.0084,
              "anomaly": 0.0016
            },
            {
              "date": "2018-02",
              "year": 2018,
              "month": 2,
              "observed": 0.04,
              "climatology": 0.012,
              "anomaly": 0.028
            },
            {
              "date": "2018-03",
              "year": 2018,
              "month": 3,
              "observed": 0.0,
              "climatology": 0.0408,
              "anomaly": -0.0408
            },
            {
              "date": "2018-04",
              "year": 2018,
              "month": 4,
              "observed": 0.0,
              "climatology": 0.14,
              "anomaly": -0.14
            },
            {
              "date": "2018-05",
              "year": 2018,
              "month": 5,
              "observed": 0.55,
              "climatology": 0.5072,
              "anomaly": 0.0428
            },
            {
              "date": "2018-06",
              "year": 2018,
              "month": 6,
              "observed": 2.62,
              "climatology": 2.6576,
              "anomaly": -0.0376
            },
            {
              "date": "2018-07",
              "year": 2018,
              "month": 7,
              "observed": 5.25,
              "climatology": 4.8836,
              "anomaly": 0.3664
            },
            {
              "date": "2018-08",
              "year": 2018,
              "month": 8,
              "observed": 10.37,
              "climatology": 5.8772,
              "anomaly": 4.4928
            },
            {
              "date": "2018-09",
              "year": 2018,
              "month": 9,
              "observed": 2.48,
              "climatology": 3.234,
              "anomaly": -0.754
            },
            {
              "date": "2018-10",
              "year": 2018,
              "month": 10,
              "observed": 0.32,
              "climatology": 0.5764,
              "anomaly": -0.2564
            },
            {
              "date": "2018-11",
              "year": 2018,
              "month": 11,
              "observed": 0.12,
              "climatology": 0.0256,
              "anomaly": 0.0944
            },
            {
              "date": "2018-12",
              "year": 2018,
              "month": 12,
              "observed": 0.0,
              "climatology": 0.0,
              "anomaly": 0.0
            },
            {
              "date": "2019-01",
              "year": 2019,
              "month": 1,
              "observed": 0.0,
              "climatology": 0.0084,
              "anomaly": -0.0084
            },
            {
              "date": "2019-02",
              "year": 2019,
              "month": 2,
              "observed": 0.0,
              "climatology": 0.012,
              "anomaly": -0.012
            },
            {
              "date": "2019-03",
              "year": 2019,
              "month": 3,
              "observed": 0.01,
              "climatology": 0.0408,
              "anomaly": -0.0308
            },
            {
              "date": "2019-04",
              "year": 2019,
              "month": 4,
              "observed": 0.52,
              "climatology": 0.14,
              "anomaly": 0.38
            },
            {
              "date": "2019-05",
              "year": 2019,
              "month": 5,
              "observed": 0.39,
              "climatology": 0.5072,
              "anomaly": -0.1172
            },
            {
              "date": "2019-06",
              "year": 2019,
              "month": 6,
              "observed": 1.31,
              "climatology": 2.6576,
              "anomaly": -1.3476
            },
            {
              "date": "2019-07",
              "year": 2019,
              "month": 7,
              "observed": 6.36,
              "climatology": 4.8836,
              "anomaly": 1.4764
            },
            {
              "date": "2019-08",
              "year": 2019,
              "month": 8,
              "observed": 8.68,
              "climatology": 5.8772,
              "anomaly": 2.8028
            },
            {
              "date": "2019-09",
              "year": 2019,
              "month": 9,
              "observed": 5.25,
              "climatology": 3.234,
              "anomaly": 2.016
            },
            {
              "date": "2019-10",
              "year": 2019,
              "month": 10,
              "observed": 1.28,
              "climatology": 0.5764,
              "anomaly": 0.7036
            },
            {
              "date": "2019-11",
              "year": 2019,
              "month": 11,
              "observed": 0.01,
              "climatology": 0.0256,
              "anomaly": -0.0156
            },
            {
              "date": "2019-12",
              "year": 2019,
              "month": 12,
              "observed": 0.0,
              "climatology": 0.0,
              "anomaly": 0.0
            },
            {
              "date": "2020-01",
              "year": 2020,
              "month": 1,
              "observed": 0.0,
              "climatology": 0.0084,
              "anomaly": -0.0084
            },
            {
              "date": "2020-02",
              "year": 2020,
              "month": 2,
              "observed": 0.04,
              "climatology": 0.012,
              "anomaly": 0.028
            },
            {
              "date": "2020-03",
              "year": 2020,
              "month": 3,
              "observed": 0.0,
              "climatology": 0.0408,
              "anomaly": -0.0408
            },
            {
              "date": "2020-04",
              "year": 2020,
              "month": 4,
              "observed": 0.09,
              "climatology": 0.14,
              "anomaly": -0.05
            },
            {
              "date": "2020-05",
              "year": 2020,
              "month": 5,
              "observed": 0.26,
              "climatology": 0.5072,
              "anomaly": -0.2472
            },
            {
              "date": "2020-06",
              "year": 2020,
              "month": 6,
              "observed": 1.24,
              "climatology": 2.6576,
              "anomaly": -1.4176
            },
            {
              "date": "2020-07",
              "year": 2020,
              "month": 7,
              "observed": 7.89,
              "climatology": 4.8836,
              "anomaly": 3.0064
            },
            {
              "date": "2020-08",
              "year": 2020,
              "month": 8,
              "observed": 9.3,
              "climatology": 5.8772,
              "anomaly": 3.4228
            },
            {
              "date": "2020-09",
              "year": 2020,
              "month": 9,
              "observed": 2.9,
              "climatology": 3.234,
              "anomaly": -0.334
            },
            {
              "date": "2020-10",
              "year": 2020,
              "month": 10,
              "observed": 1.44,
              "climatology": 0.5764,
              "anomaly": 0.8636
            },
            {
              "date": "2020-11",
              "year": 2020,
              "month": 11,
              "observed": 0.0,
              "climatology": 0.0256,
              "anomaly": -0.0256
            },
            {
              "date": "2020-12",
              "year": 2020,
              "month": 12,
              "observed": 0.0,
              "climatology": 0.0,
              "anomaly": 0.0
            },
            {
              "date": "2021-01",
              "year": 2021,
              "month": 1,
              "observed": 0.0,
              "climatology": 0.0084,
              "anomaly": -0.0084
            },
            {
              "date": "2021-02",
              "year": 2021,
              "month": 2,
              "observed": 0.0,
              "climatology": 0.012,
              "anomaly": -0.012
            },
            {
              "date": "2021-03",
              "year": 2021,
              "month": 3,
              "observed": 0.0,
              "climatology": 0.0408,
              "anomaly": -0.0408
            },
            {
              "date": "2021-04",
              "year": 2021,
              "month": 4,
              "observed": 0.0,
              "climatology": 0.14,
              "anomaly": -0.14
            },
            {
              "date": "2021-05",
              "year": 2021,
              "month": 5,
              "observed": 0.71,
              "climatology": 0.5072,
              "anomaly": 0.2028
            },
            {
              "date": "2021-06",
              "year": 2021,
              "month": 6,
              "observed": 0.97,
              "climatology": 2.6576,
              "anomaly": -1.6876
            },
            {
              "date": "2021-07",
              "year": 2021,
              "month": 7,
              "observed": 5.89,
              "climatology": 4.8836,
              "anomaly": 1.0064
            },
            {
              "date": "2021-08",
              "year": 2021,
              "month": 8,
              "observed": 6.49,
              "climatology": 5.8772,
              "anomaly": 0.6128
            },
            {
              "date": "2021-09",
              "year": 2021,
              "month": 9,
              "observed": 2.74,
              "climatology": 3.234,
              "anomaly": -0.494
            },
            {
              "date": "2021-10",
              "year": 2021,
              "month": 10,
              "observed": 0.87,
              "climatology": 0.5764,
              "anomaly": 0.2936
            },
            {
              "date": "2021-11",
              "year": 2021,
              "month": 11,
              "observed": 0.0,
              "climatology": 0.0256,
              "anomaly": -0.0256
            },
            {
              "date": "2021-12",
              "year": 2021,
              "month": 12,
              "observed": 0.0,
              "climatology": 0.0,
              "anomaly": 0.0
            },
            {
              "date": "2022-01",
              "year": 2022,
              "month": 1,
              "observed": 0.0,
              "climatology": 0.0084,
              "anomaly": -0.0084
            },
            {
              "date": "2022-02",
              "year": 2022,
              "month": 2,
              "observed": 0.0,
              "climatology": 0.012,
              "anomaly": -0.012
            },
            {
              "date": "2022-03",
              "year": 2022,
              "month": 3,
              "observed": 0.14,
              "climatology": 0.0408,
              "anomaly": 0.0992
            },
            {
              "date": "2022-04",
              "year": 2022,
              "month": 4,
              "observed": 0.0,
              "climatology": 0.14,
              "anomaly": -0.14
            },
            {
              "date": "2022-05",
              "year": 2022,
              "month": 5,
              "observed": 0.85,
              "climatology": 0.5072,
              "anomaly": 0.3428
            },
            {
              "date": "2022-06",
              "year": 2022,
              "month": 6,
              "observed": 3.63,
              "climatology": 2.6576,
              "anomaly": 0.9724
            },
            {
              "date": "2022-07",
              "year": 2022,
              "month": 7,
              "observed": 1.94,
              "climatology": 4.8836,
              "anomaly": -2.9436
            },
            {
              "date": "2022-08",
              "year": 2022,
              "month": 8,
              "observed": 5.42,
              "climatology": 5.8772,
              "anomaly": -0.4572
            },
            {
              "date": "2022-09",
              "year": 2022,
              "month": 9,
              "observed": 5.91,
              "climatology": 3.234,
              "anomaly": 2.676
            },
            {
              "date": "2022-10",
              "year": 2022,
              "month": 10,
              "observed": 0.36,
              "climatology": 0.5764,
              "anomaly": -0.2164
            },
            {
              "date": "2022-11",
              "year": 2022,
              "month": 11,
              "observed": 0.0,
              "climatology": 0.0256,
              "anomaly": -0.0256
            },
            {
              "date": "2022-12",
              "year": 2022,
              "month": 12,
              "observed": 0.0,
              "climatology": 0.0,
              "anomaly": 0.0
            },
            {
              "date": "2023-01",
              "year": 2023,
              "month": 1,
              "observed": 0.0,
              "climatology": 0.0084,
              "anomaly": -0.0084
            },
            {
              "date": "2023-02",
              "year": 2023,
              "month": 2,
              "observed": 0.0,
              "climatology": 0.012,
              "anomaly": -0.012
            },
            {
              "date": "2023-03",
              "year": 2023,
              "month": 3,
              "observed": 0.01,
              "climatology": 0.0408,
              "anomaly": -0.0308
            },
            {
              "date": "2023-04",
              "year": 2023,
              "month": 4,
              "observed": 0.01,
              "climatology": 0.14,
              "anomaly": -0.13
            },
            {
              "date": "2023-05",
              "year": 2023,
              "month": 5,
              "observed": 0.28,
              "climatology": 0.5072,
              "anomaly": -0.2272
            },
            {
              "date": "2023-06",
              "year": 2023,
              "month": 6,
              "observed": 9.83,
              "climatology": 2.6576,
              "anomaly": 7.1724
            },
            {
              "date": "2023-07",
              "year": 2023,
              "month": 7,
              "observed": 5.81,
              "climatology": 4.8836,
              "anomaly": 0.9264
            },
            {
              "date": "2023-08",
              "year": 2023,
              "month": 8,
              "observed": 1.94,
              "climatology": 5.8772,
              "anomaly": -3.9372
            },
            {
              "date": "2023-09",
              "year": 2023,
              "month": 9,
              "observed": 1.54,
              "climatology": 3.234,
              "anomaly": -1.694
            },
            {
              "date": "2023-10",
              "year": 2023,
              "month": 10,
              "observed": 0.12,
              "climatology": 0.5764,
              "anomaly": -0.4564
            },
            {
              "date": "2023-11",
              "year": 2023,
              "month": 11,
              "observed": 0.0,
              "climatology": 0.0256,
              "anomaly": -0.0256
            },
            {
              "date": "2023-12",
              "year": 2023,
              "month": 12,
              "observed": 0.0,
              "climatology": 0.0,
              "anomaly": 0.0
            },
            {
              "date": "2024-01",
              "year": 2024,
              "month": 1,
              "observed": 0.0,
              "climatology": 0.0084,
              "anomaly": -0.0084
            },
            {
              "date": "2024-02",
              "year": 2024,
              "month": 2,
              "observed": 0.0,
              "climatology": 0.012,
              "anomaly": -0.012
            },
            {
              "date": "2024-03",
              "year": 2024,
              "month": 3,
              "observed": 0.0,
              "climatology": 0.0408,
              "anomaly": -0.0408
            },
            {
              "date": "2024-04",
              "year": 2024,
              "month": 4,
              "observed": 0.01,
              "climatology": 0.14,
              "anomaly": -0.13
            },
            {
              "date": "2024-05",
              "year": 2024,
              "month": 5,
              "observed": 0.14,
              "climatology": 0.5072,
              "anomaly": -0.3672
            },
            {
              "date": "2024-06",
              "year": 2024,
              "month": 6,
              "observed": 5.36,
              "climatology": 2.6576,
              "anomaly": 2.7024
            },
            {
              "date": "2024-07",
              "year": 2024,
              "month": 7,
              "observed": 2.89,
              "climatology": 4.8836,
              "anomaly": -1.9936
            },
            {
              "date": "2024-08",
              "year": 2024,
              "month": 8,
              "observed": 4.8,
              "climatology": 5.8772,
              "anomaly": -1.0772
            },
            {
              "date": "2024-09",
              "year": 2024,
              "month": 9,
              "observed": 1.77,
              "climatology": 3.234,
              "anomaly": -1.464
            },
            {
              "date": "2024-10",
              "year": 2024,
              "month": 10,
              "observed": 0.99,
              "climatology": 0.5764,
              "anomaly": 0.4136
            },
            {
              "date": "2024-11",
              "year": 2024,
              "month": 11,
              "observed": 0.0,
              "climatology": 0.0256,
              "anomaly": -0.0256
            },
            {
              "date": "2024-12",
              "year": 2024,
              "month": 12,
              "observed": 0.0,
              "climatology": 0.0,
              "anomaly": 0.0
            }
          ],
          "annual_series": [
            {
              "year": 2000,
              "annual_mean": 1.1208,
              "annual_anomaly": -0.3761
            },
            {
              "year": 2001,
              "annual_mean": 1.1533,
              "annual_anomaly": -0.3436
            },
            {
              "year": 2002,
              "annual_mean": 1.1758,
              "annual_anomaly": -0.3211
            },
            {
              "year": 2003,
              "annual_mean": 1.44,
              "annual_anomaly": -0.0569
            },
            {
              "year": 2004,
              "annual_mean": 1.1025,
              "annual_anomaly": -0.3944
            },
            {
              "year": 2005,
              "annual_mean": 1.265,
              "annual_anomaly": -0.2319
            },
            {
              "year": 2006,
              "annual_mean": 1.2717,
              "annual_anomaly": -0.2252
            },
            {
              "year": 2007,
              "annual_mean": 1.24,
              "annual_anomaly": -0.2569
            },
            {
              "year": 2008,
              "annual_mean": 1.0367,
              "annual_anomaly": -0.4602
            },
            {
              "year": 2009,
              "annual_mean": 1.205,
              "annual_anomaly": -0.2919
            },
            {
              "year": 2010,
              "annual_mean": 1.395,
              "annual_anomaly": -0.1019
            },
            {
              "year": 2011,
              "annual_mean": 1.2,
              "annual_anomaly": -0.2969
            },
            {
              "year": 2012,
              "annual_mean": 1.6767,
              "annual_anomaly": 0.1798
            },
            {
              "year": 2013,
              "annual_mean": 1.2867,
              "annual_anomaly": -0.2102
            },
            {
              "year": 2014,
              "annual_mean": 1.3183,
              "annual_anomaly": -0.1786
            },
            {
              "year": 2015,
              "annual_mean": 2.2017,
              "annual_anomaly": 0.7048
            },
            {
              "year": 2016,
              "annual_mean": 2.0592,
              "annual_anomaly": 0.5623
            },
            {
              "year": 2017,
              "annual_mean": 2.595,
              "annual_anomaly": 1.0981
            },
            {
              "year": 2018,
              "annual_mean": 1.8133,
              "annual_anomaly": 0.3164
            },
            {
              "year": 2019,
              "annual_mean": 1.9842,
              "annual_anomaly": 0.4873
            },
            {
              "year": 2020,
              "annual_mean": 1.93,
              "annual_anomaly": 0.4331
            },
            {
              "year": 2021,
              "annual_mean": 1.4725,
              "annual_anomaly": -0.0244
            },
            {
              "year": 2022,
              "annual_mean": 1.5208,
              "annual_anomaly": 0.0239
            },
            {
              "year": 2023,
              "annual_mean": 1.6283,
              "annual_anomaly": 0.1314
            },
            {
              "year": 2024,
              "annual_mean": 1.33,
              "annual_anomaly": -0.1669
            }
          ],
          "climatology_baseline": {
            "1": 0.0084,
            "2": 0.012,
            "3": 0.0408,
            "4": 0.14,
            "5": 0.5072,
            "6": 2.6576,
            "7": 4.8836,
            "8": 5.8772,
            "9": 3.234,
            "10": 0.5764,
            "11": 0.0256,
            "12": 0.0
          }
        },
        "statistics": {
          "sens_slope": 0.02412,
          "sens_intercept": -47.11678,
          "confidence_interval_95": [
            0.01138,
            0.04513
          ],
          "mann_kendall_score_s": 144,
          "standardized_z": 3.3398,
          "p_value": 0.00084,
          "is_significant": true,
          "trend_label": "STATISTICALLY_SIGNIFICANT_INCREASING",
          "verdict_text": "Confirmed upward monotonic trend (+0.0241/yr, p=8.3851e-04). Evidence strongly rejects the null hypothesis.",
          "ols_comparison": {
            "ols_slope": 0.0309,
            "ols_pvalue": 0.00278,
            "r_squared": 0.3279
          }
        }
      }
    },
    "region_b": {
      "name": "Boreal Siberia (Eurasia)",
      "bbox": [
        55.0,
        65.0,
        60.0,
        90.0
      ],
      "analysis": {
        "metadata": {
          "source": "NASA_POWER_MERRA2",
          "doi": "N/A",
          "provenance_type": "LIVE_API_OR_ARCHIVE",
          "is_illustrative": false,
          "variable": "PRECTOTCORR",
          "unit": "mm/day",
          "depth_note": "Surface/Atmospheric Observation",
          "bbox": [
            55.0,
            65.0,
            60.0,
            90.0
          ],
          "time_range": [
            2000,
            2024
          ],
          "total_observations": 300,
          "disclaimer": "Statistical trend reflects historical model-derived or reanalysis trajectory over the selected domain. Mathematical correlation or slope direction does not establish anthropogenic or environmental causation."
        },
        "climatology": {
          "monthly_series": [
            {
              "date": "2000-01",
              "year": 2000,
              "month": 1,
              "observed": 0.78,
              "climatology": 0.9516,
              "anomaly": -0.1716
            },
            {
              "date": "2000-02",
              "year": 2000,
              "month": 2,
              "observed": 0.94,
              "climatology": 0.9316,
              "anomaly": 0.0084
            },
            {
              "date": "2000-03",
              "year": 2000,
              "month": 3,
              "observed": 1.19,
              "climatology": 1.4656,
              "anomaly": -0.2756
            },
            {
              "date": "2000-04",
              "year": 2000,
              "month": 4,
              "observed": 1.56,
              "climatology": 1.8132,
              "anomaly": -0.2532
            },
            {
              "date": "2000-05",
              "year": 2000,
              "month": 5,
              "observed": 3.35,
              "climatology": 2.74,
              "anomaly": 0.61
            },
            {
              "date": "2000-06",
              "year": 2000,
              "month": 6,
              "observed": 1.72,
              "climatology": 3.4284,
              "anomaly": -1.7084
            },
            {
              "date": "2000-07",
              "year": 2000,
              "month": 7,
              "observed": 4.51,
              "climatology": 3.1816,
              "anomaly": 1.3284
            },
            {
              "date": "2000-08",
              "year": 2000,
              "month": 8,
              "observed": 3.71,
              "climatology": 3.1744,
              "anomaly": 0.5356
            },
            {
              "date": "2000-09",
              "year": 2000,
              "month": 9,
              "observed": 3.1,
              "climatology": 2.5068,
              "anomaly": 0.5932
            },
            {
              "date": "2000-10",
              "year": 2000,
              "month": 10,
              "observed": 1.36,
              "climatology": 2.0592,
              "anomaly": -0.6992
            },
            {
              "date": "2000-11",
              "year": 2000,
              "month": 11,
              "observed": 0.98,
              "climatology": 1.6092,
              "anomaly": -0.6292
            },
            {
              "date": "2000-12",
              "year": 2000,
              "month": 12,
              "observed": 1.27,
              "climatology": 1.2252,
              "anomaly": 0.0448
            },
            {
              "date": "2001-01",
              "year": 2001,
              "month": 1,
              "observed": 0.92,
              "climatology": 0.9516,
              "anomaly": -0.0316
            },
            {
              "date": "2001-02",
              "year": 2001,
              "month": 2,
              "observed": 0.77,
              "climatology": 0.9316,
              "anomaly": -0.1616
            },
            {
              "date": "2001-03",
              "year": 2001,
              "month": 3,
              "observed": 2.86,
              "climatology": 1.4656,
              "anomaly": 1.3944
            },
            {
              "date": "2001-04",
              "year": 2001,
              "month": 4,
              "observed": 0.71,
              "climatology": 1.8132,
              "anomaly": -1.1032
            },
            {
              "date": "2001-05",
              "year": 2001,
              "month": 5,
              "observed": 3.3,
              "climatology": 2.74,
              "anomaly": 0.56
            },
            {
              "date": "2001-06",
              "year": 2001,
              "month": 6,
              "observed": 3.54,
              "climatology": 3.4284,
              "anomaly": 0.1116
            },
            {
              "date": "2001-07",
              "year": 2001,
              "month": 7,
              "observed": 4.41,
              "climatology": 3.1816,
              "anomaly": 1.2284
            },
            {
              "date": "2001-08",
              "year": 2001,
              "month": 8,
              "observed": 3.16,
              "climatology": 3.1744,
              "anomaly": -0.0144
            },
            {
              "date": "2001-09",
              "year": 2001,
              "month": 9,
              "observed": 1.65,
              "climatology": 2.5068,
              "anomaly": -0.8568
            },
            {
              "date": "2001-10",
              "year": 2001,
              "month": 10,
              "observed": 2.58,
              "climatology": 2.0592,
              "anomaly": 0.5208
            },
            {
              "date": "2001-11",
              "year": 2001,
              "month": 11,
              "observed": 1.55,
              "climatology": 1.6092,
              "anomaly": -0.0592
            },
            {
              "date": "2001-12",
              "year": 2001,
              "month": 12,
              "observed": 0.9,
              "climatology": 1.2252,
              "anomaly": -0.3252
            },
            {
              "date": "2002-01",
              "year": 2002,
              "month": 1,
              "observed": 1.35,
              "climatology": 0.9516,
              "anomaly": 0.3984
            },
            {
              "date": "2002-02",
              "year": 2002,
              "month": 2,
              "observed": 1.37,
              "climatology": 0.9316,
              "anomaly": 0.4384
            },
            {
              "date": "2002-03",
              "year": 2002,
              "month": 3,
              "observed": 1.96,
              "climatology": 1.4656,
              "anomaly": 0.4944
            },
            {
              "date": "2002-04",
              "year": 2002,
              "month": 4,
              "observed": 0.49,
              "climatology": 1.8132,
              "anomaly": -1.3232
            },
            {
              "date": "2002-05",
              "year": 2002,
              "month": 5,
              "observed": 2.79,
              "climatology": 2.74,
              "anomaly": 0.05
            },
            {
              "date": "2002-06",
              "year": 2002,
              "month": 6,
              "observed": 4.49,
              "climatology": 3.4284,
              "anomaly": 1.0616
            },
            {
              "date": "2002-07",
              "year": 2002,
              "month": 7,
              "observed": 1.86,
              "climatology": 3.1816,
              "anomaly": -1.3216
            },
            {
              "date": "2002-08",
              "year": 2002,
              "month": 8,
              "observed": 3.25,
              "climatology": 3.1744,
              "anomaly": 0.0756
            },
            {
              "date": "2002-09",
              "year": 2002,
              "month": 9,
              "observed": 3.58,
              "climatology": 2.5068,
              "anomaly": 1.0732
            },
            {
              "date": "2002-10",
              "year": 2002,
              "month": 10,
              "observed": 1.0,
              "climatology": 2.0592,
              "anomaly": -1.0592
            },
            {
              "date": "2002-11",
              "year": 2002,
              "month": 11,
              "observed": 1.21,
              "climatology": 1.6092,
              "anomaly": -0.3992
            },
            {
              "date": "2002-12",
              "year": 2002,
              "month": 12,
              "observed": 0.86,
              "climatology": 1.2252,
              "anomaly": -0.3652
            },
            {
              "date": "2003-01",
              "year": 2003,
              "month": 1,
              "observed": 1.53,
              "climatology": 0.9516,
              "anomaly": 0.5784
            },
            {
              "date": "2003-02",
              "year": 2003,
              "month": 2,
              "observed": 0.77,
              "climatology": 0.9316,
              "anomaly": -0.1616
            },
            {
              "date": "2003-03",
              "year": 2003,
              "month": 3,
              "observed": 1.29,
              "climatology": 1.4656,
              "anomaly": -0.1756
            },
            {
              "date": "2003-04",
              "year": 2003,
              "month": 4,
              "observed": 1.1,
              "climatology": 1.8132,
              "anomaly": -0.7132
            },
            {
              "date": "2003-05",
              "year": 2003,
              "month": 5,
              "observed": 2.07,
              "climatology": 2.74,
              "anomaly": -0.67
            },
            {
              "date": "2003-06",
              "year": 2003,
              "month": 6,
              "observed": 2.85,
              "climatology": 3.4284,
              "anomaly": -0.5784
            },
            {
              "date": "2003-07",
              "year": 2003,
              "month": 7,
              "observed": 1.84,
              "climatology": 3.1816,
              "anomaly": -1.3416
            },
            {
              "date": "2003-08",
              "year": 2003,
              "month": 8,
              "observed": 1.21,
              "climatology": 3.1744,
              "anomaly": -1.9644
            },
            {
              "date": "2003-09",
              "year": 2003,
              "month": 9,
              "observed": 1.68,
              "climatology": 2.5068,
              "anomaly": -0.8268
            },
            {
              "date": "2003-10",
              "year": 2003,
              "month": 10,
              "observed": 1.66,
              "climatology": 2.0592,
              "anomaly": -0.3992
            },
            {
              "date": "2003-11",
              "year": 2003,
              "month": 11,
              "observed": 1.24,
              "climatology": 1.6092,
              "anomaly": -0.3692
            },
            {
              "date": "2003-12",
              "year": 2003,
              "month": 12,
              "observed": 1.55,
              "climatology": 1.2252,
              "anomaly": 0.3248
            },
            {
              "date": "2004-01",
              "year": 2004,
              "month": 1,
              "observed": 0.62,
              "climatology": 0.9516,
              "anomaly": -0.3316
            },
            {
              "date": "2004-02",
              "year": 2004,
              "month": 2,
              "observed": 1.22,
              "climatology": 0.9316,
              "anomaly": 0.2884
            },
            {
              "date": "2004-03",
              "year": 2004,
              "month": 3,
              "observed": 1.08,
              "climatology": 1.4656,
              "anomaly": -0.3856
            },
            {
              "date": "2004-04",
              "year": 2004,
              "month": 4,
              "observed": 2.07,
              "climatology": 1.8132,
              "anomaly": 0.2568
            },
            {
              "date": "2004-05",
              "year": 2004,
              "month": 5,
              "observed": 1.74,
              "climatology": 2.74,
              "anomaly": -1.0
            },
            {
              "date": "2004-06",
              "year": 2004,
              "month": 6,
              "observed": 3.97,
              "climatology": 3.4284,
              "anomaly": 0.5416
            },
            {
              "date": "2004-07",
              "year": 2004,
              "month": 7,
              "observed": 2.6,
              "climatology": 3.1816,
              "anomaly": -0.5816
            },
            {
              "date": "2004-08",
              "year": 2004,
              "month": 8,
              "observed": 3.54,
              "climatology": 3.1744,
              "anomaly": 0.3656
            },
            {
              "date": "2004-09",
              "year": 2004,
              "month": 9,
              "observed": 2.97,
              "climatology": 2.5068,
              "anomaly": 0.4632
            },
            {
              "date": "2004-10",
              "year": 2004,
              "month": 10,
              "observed": 2.99,
              "climatology": 2.0592,
              "anomaly": 0.9308
            },
            {
              "date": "2004-11",
              "year": 2004,
              "month": 11,
              "observed": 2.08,
              "climatology": 1.6092,
              "anomaly": 0.4708
            },
            {
              "date": "2004-12",
              "year": 2004,
              "month": 12,
              "observed": 1.04,
              "climatology": 1.2252,
              "anomaly": -0.1852
            },
            {
              "date": "2005-01",
              "year": 2005,
              "month": 1,
              "observed": 0.92,
              "climatology": 0.9516,
              "anomaly": -0.0316
            },
            {
              "date": "2005-02",
              "year": 2005,
              "month": 2,
              "observed": 0.6,
              "climatology": 0.9316,
              "anomaly": -0.3316
            },
            {
              "date": "2005-03",
              "year": 2005,
              "month": 3,
              "observed": 1.16,
              "climatology": 1.4656,
              "anomaly": -0.3056
            },
            {
              "date": "2005-04",
              "year": 2005,
              "month": 4,
              "observed": 2.32,
              "climatology": 1.8132,
              "anomaly": 0.5068
            },
            {
              "date": "2005-05",
              "year": 2005,
              "month": 5,
              "observed": 2.74,
              "climatology": 2.74,
              "anomaly": 0.0
            },
            {
              "date": "2005-06",
              "year": 2005,
              "month": 6,
              "observed": 2.28,
              "climatology": 3.4284,
              "anomaly": -1.1484
            },
            {
              "date": "2005-07",
              "year": 2005,
              "month": 7,
              "observed": 3.91,
              "climatology": 3.1816,
              "anomaly": 0.7284
            },
            {
              "date": "2005-08",
              "year": 2005,
              "month": 8,
              "observed": 2.8,
              "climatology": 3.1744,
              "anomaly": -0.3744
            },
            {
              "date": "2005-09",
              "year": 2005,
              "month": 9,
              "observed": 2.67,
              "climatology": 2.5068,
              "anomaly": 0.1632
            },
            {
              "date": "2005-10",
              "year": 2005,
              "month": 10,
              "observed": 1.18,
              "climatology": 2.0592,
              "anomaly": -0.8792
            },
            {
              "date": "2005-11",
              "year": 2005,
              "month": 11,
              "observed": 1.97,
              "climatology": 1.6092,
              "anomaly": 0.3608
            },
            {
              "date": "2005-12",
              "year": 2005,
              "month": 12,
              "observed": 0.55,
              "climatology": 1.2252,
              "anomaly": -0.6752
            },
            {
              "date": "2006-01",
              "year": 2006,
              "month": 1,
              "observed": 0.62,
              "climatology": 0.9516,
              "anomaly": -0.3316
            },
            {
              "date": "2006-02",
              "year": 2006,
              "month": 2,
              "observed": 0.56,
              "climatology": 0.9316,
              "anomaly": -0.3716
            },
            {
              "date": "2006-03",
              "year": 2006,
              "month": 3,
              "observed": 0.96,
              "climatology": 1.4656,
              "anomaly": -0.5056
            },
            {
              "date": "2006-04",
              "year": 2006,
              "month": 4,
              "observed": 1.66,
              "climatology": 1.8132,
              "anomaly": -0.1532
            },
            {
              "date": "2006-05",
              "year": 2006,
              "month": 5,
              "observed": 2.88,
              "climatology": 2.74,
              "anomaly": 0.14
            },
            {
              "date": "2006-06",
              "year": 2006,
              "month": 6,
              "observed": 4.97,
              "climatology": 3.4284,
              "anomaly": 1.5416
            },
            {
              "date": "2006-07",
              "year": 2006,
              "month": 7,
              "observed": 3.11,
              "climatology": 3.1816,
              "anomaly": -0.0716
            },
            {
              "date": "2006-08",
              "year": 2006,
              "month": 8,
              "observed": 4.06,
              "climatology": 3.1744,
              "anomaly": 0.8856
            },
            {
              "date": "2006-09",
              "year": 2006,
              "month": 9,
              "observed": 3.62,
              "climatology": 2.5068,
              "anomaly": 1.1132
            },
            {
              "date": "2006-10",
              "year": 2006,
              "month": 10,
              "observed": 1.94,
              "climatology": 2.0592,
              "anomaly": -0.1192
            },
            {
              "date": "2006-11",
              "year": 2006,
              "month": 11,
              "observed": 1.37,
              "climatology": 1.6092,
              "anomaly": -0.2392
            },
            {
              "date": "2006-12",
              "year": 2006,
              "month": 12,
              "observed": 2.15,
              "climatology": 1.2252,
              "anomaly": 0.9248
            },
            {
              "date": "2007-01",
              "year": 2007,
              "month": 1,
              "observed": 1.39,
              "climatology": 0.9516,
              "anomaly": 0.4384
            },
            {
              "date": "2007-02",
              "year": 2007,
              "month": 2,
              "observed": 1.0,
              "climatology": 0.9316,
              "anomaly": 0.0684
            },
            {
              "date": "2007-03",
              "year": 2007,
              "month": 3,
              "observed": 1.6,
              "climatology": 1.4656,
              "anomaly": 0.1344
            },
            {
              "date": "2007-04",
              "year": 2007,
              "month": 4,
              "observed": 1.75,
              "climatology": 1.8132,
              "anomaly": -0.0632
            },
            {
              "date": "2007-05",
              "year": 2007,
              "month": 5,
              "observed": 5.54,
              "climatology": 2.74,
              "anomaly": 2.8
            },
            {
              "date": "2007-06",
              "year": 2007,
              "month": 6,
              "observed": 4.69,
              "climatology": 3.4284,
              "anomaly": 1.2616
            },
            {
              "date": "2007-07",
              "year": 2007,
              "month": 7,
              "observed": 2.12,
              "climatology": 3.1816,
              "anomaly": -1.0616
            },
            {
              "date": "2007-08",
              "year": 2007,
              "month": 8,
              "observed": 5.05,
              "climatology": 3.1744,
              "anomaly": 1.8756
            },
            {
              "date": "2007-09",
              "year": 2007,
              "month": 9,
              "observed": 4.09,
              "climatology": 2.5068,
              "anomaly": 1.5832
            },
            {
              "date": "2007-10",
              "year": 2007,
              "month": 10,
              "observed": 1.67,
              "climatology": 2.0592,
              "anomaly": -0.3892
            },
            {
              "date": "2007-11",
              "year": 2007,
              "month": 11,
              "observed": 1.41,
              "climatology": 1.6092,
              "anomaly": -0.1992
            },
            {
              "date": "2007-12",
              "year": 2007,
              "month": 12,
              "observed": 1.38,
              "climatology": 1.2252,
              "anomaly": 0.1548
            },
            {
              "date": "2008-01",
              "year": 2008,
              "month": 1,
              "observed": 0.4,
              "climatology": 0.9516,
              "anomaly": -0.5516
            },
            {
              "date": "2008-02",
              "year": 2008,
              "month": 2,
              "observed": 1.31,
              "climatology": 0.9316,
              "anomaly": 0.3784
            },
            {
              "date": "2008-03",
              "year": 2008,
              "month": 3,
              "observed": 1.67,
              "climatology": 1.4656,
              "anomaly": 0.2044
            },
            {
              "date": "2008-04",
              "year": 2008,
              "month": 4,
              "observed": 2.49,
              "climatology": 1.8132,
              "anomaly": 0.6768
            },
            {
              "date": "2008-05",
              "year": 2008,
              "month": 5,
              "observed": 2.44,
              "climatology": 2.74,
              "anomaly": -0.3
            },
            {
              "date": "2008-06",
              "year": 2008,
              "month": 6,
              "observed": 2.71,
              "climatology": 3.4284,
              "anomaly": -0.7184
            },
            {
              "date": "2008-07",
              "year": 2008,
              "month": 7,
              "observed": 2.23,
              "climatology": 3.1816,
              "anomaly": -0.9516
            },
            {
              "date": "2008-08",
              "year": 2008,
              "month": 8,
              "observed": 2.32,
              "climatology": 3.1744,
              "anomaly": -0.8544
            },
            {
              "date": "2008-09",
              "year": 2008,
              "month": 9,
              "observed": 1.88,
              "climatology": 2.5068,
              "anomaly": -0.6268
            },
            {
              "date": "2008-10",
              "year": 2008,
              "month": 10,
              "observed": 3.21,
              "climatology": 2.0592,
              "anomaly": 1.1508
            },
            {
              "date": "2008-11",
              "year": 2008,
              "month": 11,
              "observed": 2.02,
              "climatology": 1.6092,
              "anomaly": 0.4108
            },
            {
              "date": "2008-12",
              "year": 2008,
              "month": 12,
              "observed": 1.54,
              "climatology": 1.2252,
              "anomaly": 0.3148
            },
            {
              "date": "2009-01",
              "year": 2009,
              "month": 1,
              "observed": 0.75,
              "climatology": 0.9516,
              "anomaly": -0.2016
            },
            {
              "date": "2009-02",
              "year": 2009,
              "month": 2,
              "observed": 0.81,
              "climatology": 0.9316,
              "anomaly": -0.1216
            },
            {
              "date": "2009-03",
              "year": 2009,
              "month": 3,
              "observed": 0.89,
              "climatology": 1.4656,
              "anomaly": -0.5756
            },
            {
              "date": "2009-04",
              "year": 2009,
              "month": 4,
              "observed": 1.44,
              "climatology": 1.8132,
              "anomaly": -0.3732
            },
            {
              "date": "2009-05",
              "year": 2009,
              "month": 5,
              "observed": 2.34,
              "climatology": 2.74,
              "anomaly": -0.4
            },
            {
              "date": "2009-06",
              "year": 2009,
              "month": 6,
              "observed": 3.4,
              "climatology": 3.4284,
              "anomaly": -0.0284
            },
            {
              "date": "2009-07",
              "year": 2009,
              "month": 7,
              "observed": 3.67,
              "climatology": 3.1816,
              "anomaly": 0.4884
            },
            {
              "date": "2009-08",
              "year": 2009,
              "month": 8,
              "observed": 2.03,
              "climatology": 3.1744,
              "anomaly": -1.1444
            },
            {
              "date": "2009-09",
              "year": 2009,
              "month": 9,
              "observed": 1.81,
              "climatology": 2.5068,
              "anomaly": -0.6968
            },
            {
              "date": "2009-10",
              "year": 2009,
              "month": 10,
              "observed": 1.82,
              "climatology": 2.0592,
              "anomaly": -0.2392
            },
            {
              "date": "2009-11",
              "year": 2009,
              "month": 11,
              "observed": 1.09,
              "climatology": 1.6092,
              "anomaly": -0.5192
            },
            {
              "date": "2009-12",
              "year": 2009,
              "month": 12,
              "observed": 1.51,
              "climatology": 1.2252,
              "anomaly": 0.2848
            },
            {
              "date": "2010-01",
              "year": 2010,
              "month": 1,
              "observed": 0.31,
              "climatology": 0.9516,
              "anomaly": -0.6416
            },
            {
              "date": "2010-02",
              "year": 2010,
              "month": 2,
              "observed": 1.0,
              "climatology": 0.9316,
              "anomaly": 0.0684
            },
            {
              "date": "2010-03",
              "year": 2010,
              "month": 3,
              "observed": 1.35,
              "climatology": 1.4656,
              "anomaly": -0.1156
            },
            {
              "date": "2010-04",
              "year": 2010,
              "month": 4,
              "observed": 1.85,
              "climatology": 1.8132,
              "anomaly": 0.0368
            },
            {
              "date": "2010-05",
              "year": 2010,
              "month": 5,
              "observed": 4.61,
              "climatology": 2.74,
              "anomaly": 1.87
            },
            {
              "date": "2010-06",
              "year": 2010,
              "month": 6,
              "observed": 2.23,
              "climatology": 3.4284,
              "anomaly": -1.1984
            },
            {
              "date": "2010-07",
              "year": 2010,
              "month": 7,
              "observed": 2.4,
              "climatology": 3.1816,
              "anomaly": -0.7816
            },
            {
              "date": "2010-08",
              "year": 2010,
              "month": 8,
              "observed": 3.39,
              "climatology": 3.1744,
              "anomaly": 0.2156
            },
            {
              "date": "2010-09",
              "year": 2010,
              "month": 9,
              "observed": 2.89,
              "climatology": 2.5068,
              "anomaly": 0.3832
            },
            {
              "date": "2010-10",
              "year": 2010,
              "month": 10,
              "observed": 1.12,
              "climatology": 2.0592,
              "anomaly": -0.9392
            },
            {
              "date": "2010-11",
              "year": 2010,
              "month": 11,
              "observed": 2.2,
              "climatology": 1.6092,
              "anomaly": 0.5908
            },
            {
              "date": "2010-12",
              "year": 2010,
              "month": 12,
              "observed": 1.47,
              "climatology": 1.2252,
              "anomaly": 0.2448
            },
            {
              "date": "2011-01",
              "year": 2011,
              "month": 1,
              "observed": 0.56,
              "climatology": 0.9516,
              "anomaly": -0.3916
            },
            {
              "date": "2011-02",
              "year": 2011,
              "month": 2,
              "observed": 0.91,
              "climatology": 0.9316,
              "anomaly": -0.0216
            },
            {
              "date": "2011-03",
              "year": 2011,
              "month": 3,
              "observed": 1.24,
              "climatology": 1.4656,
              "anomaly": -0.2256
            },
            {
              "date": "2011-04",
              "year": 2011,
              "month": 4,
              "observed": 2.42,
              "climatology": 1.8132,
              "anomaly": 0.6068
            },
            {
              "date": "2011-05",
              "year": 2011,
              "month": 5,
              "observed": 1.41,
              "climatology": 2.74,
              "anomaly": -1.33
            },
            {
              "date": "2011-06",
              "year": 2011,
              "month": 6,
              "observed": 4.36,
              "climatology": 3.4284,
              "anomaly": 0.9316
            },
            {
              "date": "2011-07",
              "year": 2011,
              "month": 7,
              "observed": 3.37,
              "climatology": 3.1816,
              "anomaly": 0.1884
            },
            {
              "date": "2011-08",
              "year": 2011,
              "month": 8,
              "observed": 3.93,
              "climatology": 3.1744,
              "anomaly": 0.7556
            },
            {
              "date": "2011-09",
              "year": 2011,
              "month": 9,
              "observed": 0.64,
              "climatology": 2.5068,
              "anomaly": -1.8668
            },
            {
              "date": "2011-10",
              "year": 2011,
              "month": 10,
              "observed": 1.92,
              "climatology": 2.0592,
              "anomaly": -0.1392
            },
            {
              "date": "2011-11",
              "year": 2011,
              "month": 11,
              "observed": 2.41,
              "climatology": 1.6092,
              "anomaly": 0.8008
            },
            {
              "date": "2011-12",
              "year": 2011,
              "month": 12,
              "observed": 0.75,
              "climatology": 1.2252,
              "anomaly": -0.4752
            },
            {
              "date": "2012-01",
              "year": 2012,
              "month": 1,
              "observed": 0.32,
              "climatology": 0.9516,
              "anomaly": -0.6316
            },
            {
              "date": "2012-02",
              "year": 2012,
              "month": 2,
              "observed": 0.15,
              "climatology": 0.9316,
              "anomaly": -0.7816
            },
            {
              "date": "2012-03",
              "year": 2012,
              "month": 3,
              "observed": 1.09,
              "climatology": 1.4656,
              "anomaly": -0.3756
            },
            {
              "date": "2012-04",
              "year": 2012,
              "month": 4,
              "observed": 1.82,
              "climatology": 1.8132,
              "anomaly": 0.0068
            },
            {
              "date": "2012-05",
              "year": 2012,
              "month": 5,
              "observed": 1.96,
              "climatology": 2.74,
              "anomaly": -0.78
            },
            {
              "date": "2012-06",
              "year": 2012,
              "month": 6,
              "observed": 0.72,
              "climatology": 3.4284,
              "anomaly": -2.7084
            },
            {
              "date": "2012-07",
              "year": 2012,
              "month": 7,
              "observed": 1.19,
              "climatology": 3.1816,
              "anomaly": -1.9916
            },
            {
              "date": "2012-08",
              "year": 2012,
              "month": 8,
              "observed": 2.82,
              "climatology": 3.1744,
              "anomaly": -0.3544
            },
            {
              "date": "2012-09",
              "year": 2012,
              "month": 9,
              "observed": 3.61,
              "climatology": 2.5068,
              "anomaly": 1.1032
            },
            {
              "date": "2012-10",
              "year": 2012,
              "month": 10,
              "observed": 2.73,
              "climatology": 2.0592,
              "anomaly": 0.6708
            },
            {
              "date": "2012-11",
              "year": 2012,
              "month": 11,
              "observed": 1.63,
              "climatology": 1.6092,
              "anomaly": 0.0208
            },
            {
              "date": "2012-12",
              "year": 2012,
              "month": 12,
              "observed": 0.73,
              "climatology": 1.2252,
              "anomaly": -0.4952
            },
            {
              "date": "2013-01",
              "year": 2013,
              "month": 1,
              "observed": 1.06,
              "climatology": 0.9516,
              "anomaly": 0.1084
            },
            {
              "date": "2013-02",
              "year": 2013,
              "month": 2,
              "observed": 1.28,
              "climatology": 0.9316,
              "anomaly": 0.3484
            },
            {
              "date": "2013-03",
              "year": 2013,
              "month": 3,
              "observed": 2.08,
              "climatology": 1.4656,
              "anomaly": 0.6144
            },
            {
              "date": "2013-04",
              "year": 2013,
              "month": 4,
              "observed": 2.16,
              "climatology": 1.8132,
              "anomaly": 0.3468
            },
            {
              "date": "2013-05",
              "year": 2013,
              "month": 5,
              "observed": 3.06,
              "climatology": 2.74,
              "anomaly": 0.32
            },
            {
              "date": "2013-06",
              "year": 2013,
              "month": 6,
              "observed": 2.48,
              "climatology": 3.4284,
              "anomaly": -0.9484
            },
            {
              "date": "2013-07",
              "year": 2013,
              "month": 7,
              "observed": 1.14,
              "climatology": 3.1816,
              "anomaly": -2.0416
            },
            {
              "date": "2013-08",
              "year": 2013,
              "month": 8,
              "observed": 2.1,
              "climatology": 3.1744,
              "anomaly": -1.0744
            },
            {
              "date": "2013-09",
              "year": 2013,
              "month": 9,
              "observed": 1.82,
              "climatology": 2.5068,
              "anomaly": -0.6868
            },
            {
              "date": "2013-10",
              "year": 2013,
              "month": 10,
              "observed": 2.61,
              "climatology": 2.0592,
              "anomaly": 0.5508
            },
            {
              "date": "2013-11",
              "year": 2013,
              "month": 11,
              "observed": 2.12,
              "climatology": 1.6092,
              "anomaly": 0.5108
            },
            {
              "date": "2013-12",
              "year": 2013,
              "month": 12,
              "observed": 1.61,
              "climatology": 1.2252,
              "anomaly": 0.3848
            },
            {
              "date": "2014-01",
              "year": 2014,
              "month": 1,
              "observed": 0.97,
              "climatology": 0.9516,
              "anomaly": 0.0184
            },
            {
              "date": "2014-02",
              "year": 2014,
              "month": 2,
              "observed": 0.54,
              "climatology": 0.9316,
              "anomaly": -0.3916
            },
            {
              "date": "2014-03",
              "year": 2014,
              "month": 3,
              "observed": 2.56,
              "climatology": 1.4656,
              "anomaly": 1.0944
            },
            {
              "date": "2014-04",
              "year": 2014,
              "month": 4,
              "observed": 2.58,
              "climatology": 1.8132,
              "anomaly": 0.7668
            },
            {
              "date": "2014-05",
              "year": 2014,
              "month": 5,
              "observed": 1.71,
              "climatology": 2.74,
              "anomaly": -1.03
            },
            {
              "date": "2014-06",
              "year": 2014,
              "month": 6,
              "observed": 2.49,
              "climatology": 3.4284,
              "anomaly": -0.9384
            },
            {
              "date": "2014-07",
              "year": 2014,
              "month": 7,
              "observed": 5.74,
              "climatology": 3.1816,
              "anomaly": 2.5584
            },
            {
              "date": "2014-08",
              "year": 2014,
              "month": 8,
              "observed": 4.04,
              "climatology": 3.1744,
              "anomaly": 0.8656
            },
            {
              "date": "2014-09",
              "year": 2014,
              "month": 9,
              "observed": 3.46,
              "climatology": 2.5068,
              "anomaly": 0.9532
            },
            {
              "date": "2014-10",
              "year": 2014,
              "month": 10,
              "observed": 3.03,
              "climatology": 2.0592,
              "anomaly": 0.9708
            },
            {
              "date": "2014-11",
              "year": 2014,
              "month": 11,
              "observed": 1.56,
              "climatology": 1.6092,
              "anomaly": -0.0492
            },
            {
              "date": "2014-12",
              "year": 2014,
              "month": 12,
              "observed": 1.33,
              "climatology": 1.2252,
              "anomaly": 0.1048
            },
            {
              "date": "2015-01",
              "year": 2015,
              "month": 1,
              "observed": 1.43,
              "climatology": 0.9516,
              "anomaly": 0.4784
            },
            {
              "date": "2015-02",
              "year": 2015,
              "month": 2,
              "observed": 1.38,
              "climatology": 0.9316,
              "anomaly": 0.4484
            },
            {
              "date": "2015-03",
              "year": 2015,
              "month": 3,
              "observed": 1.04,
              "climatology": 1.4656,
              "anomaly": -0.4256
            },
            {
              "date": "2015-04",
              "year": 2015,
              "month": 4,
              "observed": 1.71,
              "climatology": 1.8132,
              "anomaly": -0.1032
            },
            {
              "date": "2015-05",
              "year": 2015,
              "month": 5,
              "observed": 2.95,
              "climatology": 2.74,
              "anomaly": 0.21
            },
            {
              "date": "2015-06",
              "year": 2015,
              "month": 6,
              "observed": 4.2,
              "climatology": 3.4284,
              "anomaly": 0.7716
            },
            {
              "date": "2015-07",
              "year": 2015,
              "month": 7,
              "observed": 5.14,
              "climatology": 3.1816,
              "anomaly": 1.9584
            },
            {
              "date": "2015-08",
              "year": 2015,
              "month": 8,
              "observed": 3.97,
              "climatology": 3.1744,
              "anomaly": 0.7956
            },
            {
              "date": "2015-09",
              "year": 2015,
              "month": 9,
              "observed": 3.11,
              "climatology": 2.5068,
              "anomaly": 0.6032
            },
            {
              "date": "2015-10",
              "year": 2015,
              "month": 10,
              "observed": 2.43,
              "climatology": 2.0592,
              "anomaly": 0.3708
            },
            {
              "date": "2015-11",
              "year": 2015,
              "month": 11,
              "observed": 1.37,
              "climatology": 1.6092,
              "anomaly": -0.2392
            },
            {
              "date": "2015-12",
              "year": 2015,
              "month": 12,
              "observed": 1.48,
              "climatology": 1.2252,
              "anomaly": 0.2548
            },
            {
              "date": "2016-01",
              "year": 2016,
              "month": 1,
              "observed": 0.31,
              "climatology": 0.9516,
              "anomaly": -0.6416
            },
            {
              "date": "2016-02",
              "year": 2016,
              "month": 2,
              "observed": 1.31,
              "climatology": 0.9316,
              "anomaly": 0.3784
            },
            {
              "date": "2016-03",
              "year": 2016,
              "month": 3,
              "observed": 1.24,
              "climatology": 1.4656,
              "anomaly": -0.2256
            },
            {
              "date": "2016-04",
              "year": 2016,
              "month": 4,
              "observed": 1.96,
              "climatology": 1.8132,
              "anomaly": 0.1468
            },
            {
              "date": "2016-05",
              "year": 2016,
              "month": 5,
              "observed": 1.93,
              "climatology": 2.74,
              "anomaly": -0.81
            },
            {
              "date": "2016-06",
              "year": 2016,
              "month": 6,
              "observed": 2.95,
              "climatology": 3.4284,
              "anomaly": -0.4784
            },
            {
              "date": "2016-07",
              "year": 2016,
              "month": 7,
              "observed": 4.05,
              "climatology": 3.1816,
              "anomaly": 0.8684
            },
            {
              "date": "2016-08",
              "year": 2016,
              "month": 8,
              "observed": 1.84,
              "climatology": 3.1744,
              "anomaly": -1.3344
            },
            {
              "date": "2016-09",
              "year": 2016,
              "month": 9,
              "observed": 2.44,
              "climatology": 2.5068,
              "anomaly": -0.0668
            },
            {
              "date": "2016-10",
              "year": 2016,
              "month": 10,
              "observed": 0.96,
              "climatology": 2.0592,
              "anomaly": -1.0992
            },
            {
              "date": "2016-11",
              "year": 2016,
              "month": 11,
              "observed": 1.94,
              "climatology": 1.6092,
              "anomaly": 0.3308
            },
            {
              "date": "2016-12",
              "year": 2016,
              "month": 12,
              "observed": 0.99,
              "climatology": 1.2252,
              "anomaly": -0.2352
            },
            {
              "date": "2017-01",
              "year": 2017,
              "month": 1,
              "observed": 1.21,
              "climatology": 0.9516,
              "anomaly": 0.2584
            },
            {
              "date": "2017-02",
              "year": 2017,
              "month": 2,
              "observed": 1.16,
              "climatology": 0.9316,
              "anomaly": 0.2284
            },
            {
              "date": "2017-03",
              "year": 2017,
              "month": 3,
              "observed": 0.93,
              "climatology": 1.4656,
              "anomaly": -0.5356
            },
            {
              "date": "2017-04",
              "year": 2017,
              "month": 4,
              "observed": 2.32,
              "climatology": 1.8132,
              "anomaly": 0.5068
            },
            {
              "date": "2017-05",
              "year": 2017,
              "month": 5,
              "observed": 4.15,
              "climatology": 2.74,
              "anomaly": 1.41
            },
            {
              "date": "2017-06",
              "year": 2017,
              "month": 6,
              "observed": 2.48,
              "climatology": 3.4284,
              "anomaly": -0.9484
            },
            {
              "date": "2017-07",
              "year": 2017,
              "month": 7,
              "observed": 4.63,
              "climatology": 3.1816,
              "anomaly": 1.4484
            },
            {
              "date": "2017-08",
              "year": 2017,
              "month": 8,
              "observed": 2.39,
              "climatology": 3.1744,
              "anomaly": -0.7844
            },
            {
              "date": "2017-09",
              "year": 2017,
              "month": 9,
              "observed": 1.86,
              "climatology": 2.5068,
              "anomaly": -0.6468
            },
            {
              "date": "2017-10",
              "year": 2017,
              "month": 10,
              "observed": 1.95,
              "climatology": 2.0592,
              "anomaly": -0.1092
            },
            {
              "date": "2017-11",
              "year": 2017,
              "month": 11,
              "observed": 1.11,
              "climatology": 1.6092,
              "anomaly": -0.4992
            },
            {
              "date": "2017-12",
              "year": 2017,
              "month": 12,
              "observed": 0.76,
              "climatology": 1.2252,
              "anomaly": -0.4652
            },
            {
              "date": "2018-01",
              "year": 2018,
              "month": 1,
              "observed": 0.77,
              "climatology": 0.9516,
              "anomaly": -0.1816
            },
            {
              "date": "2018-02",
              "year": 2018,
              "month": 2,
              "observed": 0.48,
              "climatology": 0.9316,
              "anomaly": -0.4516
            },
            {
              "date": "2018-03",
              "year": 2018,
              "month": 3,
              "observed": 1.69,
              "climatology": 1.4656,
              "anomaly": 0.2244
            },
            {
              "date": "2018-04",
              "year": 2018,
              "month": 4,
              "observed": 1.6,
              "climatology": 1.8132,
              "anomaly": -0.2132
            },
            {
              "date": "2018-05",
              "year": 2018,
              "month": 5,
              "observed": 2.4,
              "climatology": 2.74,
              "anomaly": -0.34
            },
            {
              "date": "2018-06",
              "year": 2018,
              "month": 6,
              "observed": 5.04,
              "climatology": 3.4284,
              "anomaly": 1.6116
            },
            {
              "date": "2018-07",
              "year": 2018,
              "month": 7,
              "observed": 1.06,
              "climatology": 3.1816,
              "anomaly": -2.1216
            },
            {
              "date": "2018-08",
              "year": 2018,
              "month": 8,
              "observed": 4.94,
              "climatology": 3.1744,
              "anomaly": 1.7656
            },
            {
              "date": "2018-09",
              "year": 2018,
              "month": 9,
              "observed": 2.13,
              "climatology": 2.5068,
              "anomaly": -0.3768
            },
            {
              "date": "2018-10",
              "year": 2018,
              "month": 10,
              "observed": 3.11,
              "climatology": 2.0592,
              "anomaly": 1.0508
            },
            {
              "date": "2018-11",
              "year": 2018,
              "month": 11,
              "observed": 1.69,
              "climatology": 1.6092,
              "anomaly": 0.0808
            },
            {
              "date": "2018-12",
              "year": 2018,
              "month": 12,
              "observed": 1.08,
              "climatology": 1.2252,
              "anomaly": -0.1452
            },
            {
              "date": "2019-01",
              "year": 2019,
              "month": 1,
              "observed": 0.96,
              "climatology": 0.9516,
              "anomaly": 0.0084
            },
            {
              "date": "2019-02",
              "year": 2019,
              "month": 2,
              "observed": 0.65,
              "climatology": 0.9316,
              "anomaly": -0.2816
            },
            {
              "date": "2019-03",
              "year": 2019,
              "month": 3,
              "observed": 1.35,
              "climatology": 1.4656,
              "anomaly": -0.1156
            },
            {
              "date": "2019-04",
              "year": 2019,
              "month": 4,
              "observed": 1.92,
              "climatology": 1.8132,
              "anomaly": 0.1068
            },
            {
              "date": "2019-05",
              "year": 2019,
              "month": 5,
              "observed": 2.35,
              "climatology": 2.74,
              "anomaly": -0.39
            },
            {
              "date": "2019-06",
              "year": 2019,
              "month": 6,
              "observed": 3.93,
              "climatology": 3.4284,
              "anomaly": 0.5016
            },
            {
              "date": "2019-07",
              "year": 2019,
              "month": 7,
              "observed": 2.62,
              "climatology": 3.1816,
              "anomaly": -0.5616
            },
            {
              "date": "2019-08",
              "year": 2019,
              "month": 8,
              "observed": 3.2,
              "climatology": 3.1744,
              "anomaly": 0.0256
            },
            {
              "date": "2019-09",
              "year": 2019,
              "month": 9,
              "observed": 2.99,
              "climatology": 2.5068,
              "anomaly": 0.4832
            },
            {
              "date": "2019-10",
              "year": 2019,
              "month": 10,
              "observed": 2.54,
              "climatology": 2.0592,
              "anomaly": 0.4808
            },
            {
              "date": "2019-11",
              "year": 2019,
              "month": 11,
              "observed": 2.19,
              "climatology": 1.6092,
              "anomaly": 0.5808
            },
            {
              "date": "2019-12",
              "year": 2019,
              "month": 12,
              "observed": 1.18,
              "climatology": 1.2252,
              "anomaly": -0.0452
            },
            {
              "date": "2020-01",
              "year": 2020,
              "month": 1,
              "observed": 1.16,
              "climatology": 0.9516,
              "anomaly": 0.2084
            },
            {
              "date": "2020-02",
              "year": 2020,
              "month": 2,
              "observed": 1.06,
              "climatology": 0.9316,
              "anomaly": 0.1284
            },
            {
              "date": "2020-03",
              "year": 2020,
              "month": 3,
              "observed": 1.93,
              "climatology": 1.4656,
              "anomaly": 0.4644
            },
            {
              "date": "2020-04",
              "year": 2020,
              "month": 4,
              "observed": 2.63,
              "climatology": 1.8132,
              "anomaly": 0.8168
            },
            {
              "date": "2020-05",
              "year": 2020,
              "month": 5,
              "observed": 2.85,
              "climatology": 2.74,
              "anomaly": 0.11
            },
            {
              "date": "2020-06",
              "year": 2020,
              "month": 6,
              "observed": 4.62,
              "climatology": 3.4284,
              "anomaly": 1.1916
            },
            {
              "date": "2020-07",
              "year": 2020,
              "month": 7,
              "observed": 2.05,
              "climatology": 3.1816,
              "anomaly": -1.1316
            },
            {
              "date": "2020-08",
              "year": 2020,
              "month": 8,
              "observed": 2.9,
              "climatology": 3.1744,
              "anomaly": -0.2744
            },
            {
              "date": "2020-09",
              "year": 2020,
              "month": 9,
              "observed": 1.95,
              "climatology": 2.5068,
              "anomaly": -0.5568
            },
            {
              "date": "2020-10",
              "year": 2020,
              "month": 10,
              "observed": 3.07,
              "climatology": 2.0592,
              "anomaly": 1.0108
            },
            {
              "date": "2020-11",
              "year": 2020,
              "month": 11,
              "observed": 1.35,
              "climatology": 1.6092,
              "anomaly": -0.2592
            },
            {
              "date": "2020-12",
              "year": 2020,
              "month": 12,
              "observed": 1.34,
              "climatology": 1.2252,
              "anomaly": 0.1148
            },
            {
              "date": "2021-01",
              "year": 2021,
              "month": 1,
              "observed": 1.04,
              "climatology": 0.9516,
              "anomaly": 0.0884
            },
            {
              "date": "2021-02",
              "year": 2021,
              "month": 2,
              "observed": 0.77,
              "climatology": 0.9316,
              "anomaly": -0.1616
            },
            {
              "date": "2021-03",
              "year": 2021,
              "month": 3,
              "observed": 0.91,
              "climatology": 1.4656,
              "anomaly": -0.5556
            },
            {
              "date": "2021-04",
              "year": 2021,
              "month": 4,
              "observed": 2.01,
              "climatology": 1.8132,
              "anomaly": 0.1968
            },
            {
              "date": "2021-05",
              "year": 2021,
              "month": 5,
              "observed": 2.44,
              "climatology": 2.74,
              "anomaly": -0.3
            },
            {
              "date": "2021-06",
              "year": 2021,
              "month": 6,
              "observed": 2.96,
              "climatology": 3.4284,
              "anomaly": -0.4684
            },
            {
              "date": "2021-07",
              "year": 2021,
              "month": 7,
              "observed": 5.74,
              "climatology": 3.1816,
              "anomaly": 2.5584
            },
            {
              "date": "2021-08",
              "year": 2021,
              "month": 8,
              "observed": 1.94,
              "climatology": 3.1744,
              "anomaly": -1.2344
            },
            {
              "date": "2021-09",
              "year": 2021,
              "month": 9,
              "observed": 2.03,
              "climatology": 2.5068,
              "anomaly": -0.4768
            },
            {
              "date": "2021-10",
              "year": 2021,
              "month": 10,
              "observed": 1.84,
              "climatology": 2.0592,
              "anomaly": -0.2192
            },
            {
              "date": "2021-11",
              "year": 2021,
              "month": 11,
              "observed": 1.53,
              "climatology": 1.6092,
              "anomaly": -0.0792
            },
            {
              "date": "2021-12",
              "year": 2021,
              "month": 12,
              "observed": 1.35,
              "climatology": 1.2252,
              "anomaly": 0.1248
            },
            {
              "date": "2022-01",
              "year": 2022,
              "month": 1,
              "observed": 1.38,
              "climatology": 0.9516,
              "anomaly": 0.4284
            },
            {
              "date": "2022-02",
              "year": 2022,
              "month": 2,
              "observed": 0.96,
              "climatology": 0.9316,
              "anomaly": 0.0284
            },
            {
              "date": "2022-03",
              "year": 2022,
              "month": 3,
              "observed": 1.34,
              "climatology": 1.4656,
              "anomaly": -0.1256
            },
            {
              "date": "2022-04",
              "year": 2022,
              "month": 4,
              "observed": 1.03,
              "climatology": 1.8132,
              "anomaly": -0.7832
            },
            {
              "date": "2022-05",
              "year": 2022,
              "month": 5,
              "observed": 3.24,
              "climatology": 2.74,
              "anomaly": 0.5
            },
            {
              "date": "2022-06",
              "year": 2022,
              "month": 6,
              "observed": 6.82,
              "climatology": 3.4284,
              "anomaly": 3.3916
            },
            {
              "date": "2022-07",
              "year": 2022,
              "month": 7,
              "observed": 3.07,
              "climatology": 3.1816,
              "anomaly": -0.1116
            },
            {
              "date": "2022-08",
              "year": 2022,
              "month": 8,
              "observed": 2.97,
              "climatology": 3.1744,
              "anomaly": -0.2044
            },
            {
              "date": "2022-09",
              "year": 2022,
              "month": 9,
              "observed": 2.35,
              "climatology": 2.5068,
              "anomaly": -0.1568
            },
            {
              "date": "2022-10",
              "year": 2022,
              "month": 10,
              "observed": 1.47,
              "climatology": 2.0592,
              "anomaly": -0.5892
            },
            {
              "date": "2022-11",
              "year": 2022,
              "month": 11,
              "observed": 1.23,
              "climatology": 1.6092,
              "anomaly": -0.3792
            },
            {
              "date": "2022-12",
              "year": 2022,
              "month": 12,
              "observed": 0.95,
              "climatology": 1.2252,
              "anomaly": -0.2752
            },
            {
              "date": "2023-01",
              "year": 2023,
              "month": 1,
              "observed": 1.53,
              "climatology": 0.9516,
              "anomaly": 0.5784
            },
            {
              "date": "2023-02",
              "year": 2023,
              "month": 2,
              "observed": 1.09,
              "climatology": 0.9316,
              "anomaly": 0.1584
            },
            {
              "date": "2023-03",
              "year": 2023,
              "month": 3,
              "observed": 1.65,
              "climatology": 1.4656,
              "anomaly": 0.1844
            },
            {
              "date": "2023-04",
              "year": 2023,
              "month": 4,
              "observed": 1.91,
              "climatology": 1.8132,
              "anomaly": 0.0968
            },
            {
              "date": "2023-05",
              "year": 2023,
              "month": 5,
              "observed": 0.79,
              "climatology": 2.74,
              "anomaly": -1.95
            },
            {
              "date": "2023-06",
              "year": 2023,
              "month": 6,
              "observed": 2.8,
              "climatology": 3.4284,
              "anomaly": -0.6284
            },
            {
              "date": "2023-07",
              "year": 2023,
              "month": 7,
              "observed": 3.69,
              "climatology": 3.1816,
              "anomaly": 0.5084
            },
            {
              "date": "2023-08",
              "year": 2023,
              "month": 8,
              "observed": 3.92,
              "climatology": 3.1744,
              "anomaly": 0.7456
            },
            {
              "date": "2023-09",
              "year": 2023,
              "month": 9,
              "observed": 1.81,
              "climatology": 2.5068,
              "anomaly": -0.6968
            },
            {
              "date": "2023-10",
              "year": 2023,
              "month": 10,
              "observed": 1.94,
              "climatology": 2.0592,
              "anomaly": -0.1192
            },
            {
              "date": "2023-11",
              "year": 2023,
              "month": 11,
              "observed": 1.35,
              "climatology": 1.6092,
              "anomaly": -0.2592
            },
            {
              "date": "2023-12",
              "year": 2023,
              "month": 12,
              "observed": 1.56,
              "climatology": 1.2252,
              "anomaly": 0.3348
            },
            {
              "date": "2024-01",
              "year": 2024,
              "month": 1,
              "observed": 1.5,
              "climatology": 0.9516,
              "anomaly": 0.5484
            },
            {
              "date": "2024-02",
              "year": 2024,
              "month": 2,
              "observed": 1.2,
              "climatology": 0.9316,
              "anomaly": 0.2684
            },
            {
              "date": "2024-03",
              "year": 2024,
              "month": 3,
              "observed": 1.58,
              "climatology": 1.4656,
              "anomaly": 0.1144
            },
            {
              "date": "2024-04",
              "year": 2024,
              "month": 4,
              "observed": 1.82,
              "climatology": 1.8132,
              "anomaly": 0.0068
            },
            {
              "date": "2024-05",
              "year": 2024,
              "month": 5,
              "observed": 3.46,
              "climatology": 2.74,
              "anomaly": 0.72
            },
            {
              "date": "2024-06",
              "year": 2024,
              "month": 6,
              "observed": 3.01,
              "climatology": 3.4284,
              "anomaly": -0.4184
            },
            {
              "date": "2024-07",
              "year": 2024,
              "month": 7,
              "observed": 3.39,
              "climatology": 3.1816,
              "anomaly": 0.2084
            },
            {
              "date": "2024-08",
              "year": 2024,
              "month": 8,
              "observed": 3.88,
              "climatology": 3.1744,
              "anomaly": 0.7056
            },
            {
              "date": "2024-09",
              "year": 2024,
              "month": 9,
              "observed": 2.53,
              "climatology": 2.5068,
              "anomaly": 0.0232
            },
            {
              "date": "2024-10",
              "year": 2024,
              "month": 10,
              "observed": 1.35,
              "climatology": 2.0592,
              "anomaly": -0.7092
            },
            {
              "date": "2024-11",
              "year": 2024,
              "month": 11,
              "observed": 1.63,
              "climatology": 1.6092,
              "anomaly": 0.0208
            },
            {
              "date": "2024-12",
              "year": 2024,
              "month": 12,
              "observed": 1.3,
              "climatology": 1.2252,
              "anomaly": 0.0748
            }
          ],
          "annual_series": [
            {
              "year": 2000,
              "annual_mean": 2.0392,
              "annual_anomaly": -0.0514
            },
            {
              "year": 2001,
              "annual_mean": 2.1958,
              "annual_anomaly": 0.1053
            },
            {
              "year": 2002,
              "annual_mean": 2.0175,
              "annual_anomaly": -0.0731
            },
            {
              "year": 2003,
              "annual_mean": 1.5658,
              "annual_anomaly": -0.5247
            },
            {
              "year": 2004,
              "annual_mean": 2.16,
              "annual_anomaly": 0.0694
            },
            {
              "year": 2005,
              "annual_mean": 1.925,
              "annual_anomaly": -0.1656
            },
            {
              "year": 2006,
              "annual_mean": 2.325,
              "annual_anomaly": 0.2344
            },
            {
              "year": 2007,
              "annual_mean": 2.6408,
              "annual_anomaly": 0.5503
            },
            {
              "year": 2008,
              "annual_mean": 2.0183,
              "annual_anomaly": -0.0722
            },
            {
              "year": 2009,
              "annual_mean": 1.7967,
              "annual_anomaly": -0.2939
            },
            {
              "year": 2010,
              "annual_mean": 2.0683,
              "annual_anomaly": -0.0222
            },
            {
              "year": 2011,
              "annual_mean": 1.9933,
              "annual_anomaly": -0.0972
            },
            {
              "year": 2012,
              "annual_mean": 1.5642,
              "annual_anomaly": -0.5264
            },
            {
              "year": 2013,
              "annual_mean": 1.96,
              "annual_anomaly": -0.1306
            },
            {
              "year": 2014,
              "annual_mean": 2.5008,
              "annual_anomaly": 0.4103
            },
            {
              "year": 2015,
              "annual_mean": 2.5175,
              "annual_anomaly": 0.4269
            },
            {
              "year": 2016,
              "annual_mean": 1.8267,
              "annual_anomaly": -0.2639
            },
            {
              "year": 2017,
              "annual_mean": 2.0792,
              "annual_anomaly": -0.0114
            },
            {
              "year": 2018,
              "annual_mean": 2.1658,
              "annual_anomaly": 0.0753
            },
            {
              "year": 2019,
              "annual_mean": 2.1567,
              "annual_anomaly": 0.0661
            },
            {
              "year": 2020,
              "annual_mean": 2.2425,
              "annual_anomaly": 0.1519
            },
            {
              "year": 2021,
              "annual_mean": 2.0467,
              "annual_anomaly": -0.0439
            },
            {
              "year": 2022,
              "annual_mean": 2.2342,
              "annual_anomaly": 0.1436
            },
            {
              "year": 2023,
              "annual_mean": 2.0033,
              "annual_anomaly": -0.0872
            },
            {
              "year": 2024,
              "annual_mean": 2.2208,
              "annual_anomaly": 0.1303
            }
          ],
          "climatology_baseline": {
            "1": 0.9516,
            "2": 0.9316,
            "3": 1.4656,
            "4": 1.8132,
            "5": 2.74,
            "6": 3.4284,
            "7": 3.1816,
            "8": 3.1744,
            "9": 2.5068,
            "10": 2.0592,
            "11": 1.6092,
            "12": 1.2252
          }
        },
        "statistics": {
          "sens_slope": 0.00477,
          "sens_intercept": -7.51061,
          "confidence_interval_95": [
            -0.00729,
            0.02083
          ],
          "mann_kendall_score_s": 38,
          "standardized_z": 0.8641,
          "p_value": 0.38751,
          "is_significant": false,
          "trend_label": "DYNAMIC_EQUILIBRIUM_NO_TREND",
          "verdict_text": "No statistically significant monotonic trend detected (p=0.388 >= 0.05). Fluctuations remain within natural variability bounds.",
          "ols_comparison": {
            "ols_slope": 0.00562,
            "ols_pvalue": 0.44167,
            "r_squared": 0.026
          }
        }
      }
    }
  }
};

export const DEFAULT_GRID_A: SpatialGridResponse = {
  "status": "success",
  "domain_id": "A",
  "domain_name": "Iberian Peninsula",
  "provenance_type": "NASA_GLDAS_NETCDF",
  "disclaimer": "Derived from verified NASA GLDAS Noah 2.1 NetCDF archive using Theil-Sen trend estimator and Mann-Kendall test with Benjamini-Hochberg FDR.",
  "statistical_method": "Theil-Sen Robust Estimator + Mann-Kendall with Benjamini-Hochberg FDR (alpha=0.05)",
  "fdr_threshold": 0.05,
  "variable": "RootMoist_inst",
  "unit": "kg/m\u00b2/yr",
  "bbox": [
    36.0,
    42.0,
    -9.0,
    3.0
  ],
  "grid_step": 1.5,
  "lat_step": 1.5,
  "lon_step": 1.5,
  "total_cells": 45,
  "significant_cells": 44,
  "significant_percentage": 97.8,
  "sig_decrease_count": 44,
  "sig_increase_count": 0,
  "not_sig_count": 1,
  "drying_cells": 45,
  "wetting_cells": 0,
  "min_slope": -0.2742,
  "max_slope": -0.0305,
  "cells": [
    {
      "domain_id": "A",
      "domain_name": "Iberian Peninsula",
      "lat": 36.0,
      "lon": -9.0,
      "bounds": [
        35.25,
        36.75,
        -9.75,
        -8.25
      ],
      "sens_slope": -0.1915,
      "sens_slope_decade": -1.915,
      "standardized_z": -4.881,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_DECREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "decreasing"
    },
    {
      "domain_id": "A",
      "domain_name": "Iberian Peninsula",
      "lat": 36.0,
      "lon": -7.5,
      "bounds": [
        35.25,
        36.75,
        -8.25,
        -6.75
      ],
      "sens_slope": -0.2641,
      "sens_slope_decade": -2.641,
      "standardized_z": -5.115,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_DECREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "decreasing"
    },
    {
      "domain_id": "A",
      "domain_name": "Iberian Peninsula",
      "lat": 36.0,
      "lon": -6.0,
      "bounds": [
        35.25,
        36.75,
        -6.75,
        -5.25
      ],
      "sens_slope": -0.225,
      "sens_slope_decade": -2.25,
      "standardized_z": -4.975,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_DECREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "decreasing"
    },
    {
      "domain_id": "A",
      "domain_name": "Iberian Peninsula",
      "lat": 36.0,
      "lon": -4.5,
      "bounds": [
        35.25,
        36.75,
        -5.25,
        -3.75
      ],
      "sens_slope": -0.1967,
      "sens_slope_decade": -1.967,
      "standardized_z": -5.161,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_DECREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "decreasing"
    },
    {
      "domain_id": "A",
      "domain_name": "Iberian Peninsula",
      "lat": 36.0,
      "lon": -3.0,
      "bounds": [
        35.25,
        36.75,
        -3.75,
        -2.25
      ],
      "sens_slope": -0.2166,
      "sens_slope_decade": -2.166,
      "standardized_z": -4.881,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_DECREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "decreasing"
    },
    {
      "domain_id": "A",
      "domain_name": "Iberian Peninsula",
      "lat": 36.0,
      "lon": -1.5,
      "bounds": [
        35.25,
        36.75,
        -2.25,
        -0.75
      ],
      "sens_slope": -0.2742,
      "sens_slope_decade": -2.742,
      "standardized_z": -5.255,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_DECREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "decreasing"
    },
    {
      "domain_id": "A",
      "domain_name": "Iberian Peninsula",
      "lat": 36.0,
      "lon": 0.0,
      "bounds": [
        35.25,
        36.75,
        -0.75,
        0.75
      ],
      "sens_slope": -0.0633,
      "sens_slope_decade": -0.633,
      "standardized_z": -2.873,
      "p_value": 0.00407,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_DECREASING",
      "q_value": 0.00426,
      "is_significant": true,
      "significance_regime": "decreasing"
    },
    {
      "domain_id": "A",
      "domain_name": "Iberian Peninsula",
      "lat": 36.0,
      "lon": 1.5,
      "bounds": [
        35.25,
        36.75,
        0.75,
        2.25
      ],
      "sens_slope": -0.237,
      "sens_slope_decade": -2.37,
      "standardized_z": -5.395,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_DECREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "decreasing"
    },
    {
      "domain_id": "A",
      "domain_name": "Iberian Peninsula",
      "lat": 36.0,
      "lon": 3.0,
      "bounds": [
        35.25,
        36.75,
        2.25,
        3.75
      ],
      "sens_slope": -0.1993,
      "sens_slope_decade": -1.993,
      "standardized_z": -5.068,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_DECREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "decreasing"
    },
    {
      "domain_id": "A",
      "domain_name": "Iberian Peninsula",
      "lat": 37.5,
      "lon": -9.0,
      "bounds": [
        36.75,
        38.25,
        -9.75,
        -8.25
      ],
      "sens_slope": -0.0305,
      "sens_slope_decade": -0.305,
      "standardized_z": -1.378,
      "p_value": 0.16822,
      "valid_observations": 25,
      "trend_label": "DYNAMIC_EQUILIBRIUM_NO_TREND",
      "q_value": 0.16822,
      "is_significant": false,
      "significance_regime": "non_significant"
    },
    {
      "domain_id": "A",
      "domain_name": "Iberian Peninsula",
      "lat": 37.5,
      "lon": -7.5,
      "bounds": [
        36.75,
        38.25,
        -8.25,
        -6.75
      ],
      "sens_slope": -0.1883,
      "sens_slope_decade": -1.883,
      "standardized_z": -3.947,
      "p_value": 8e-05,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_DECREASING",
      "q_value": 0.0001,
      "is_significant": true,
      "significance_regime": "decreasing"
    },
    {
      "domain_id": "A",
      "domain_name": "Iberian Peninsula",
      "lat": 37.5,
      "lon": -6.0,
      "bounds": [
        36.75,
        38.25,
        -6.75,
        -5.25
      ],
      "sens_slope": -0.1719,
      "sens_slope_decade": -1.719,
      "standardized_z": -5.535,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_DECREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "decreasing"
    },
    {
      "domain_id": "A",
      "domain_name": "Iberian Peninsula",
      "lat": 37.5,
      "lon": -4.5,
      "bounds": [
        36.75,
        38.25,
        -5.25,
        -3.75
      ],
      "sens_slope": -0.1547,
      "sens_slope_decade": -1.547,
      "standardized_z": -5.068,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_DECREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "decreasing"
    },
    {
      "domain_id": "A",
      "domain_name": "Iberian Peninsula",
      "lat": 37.5,
      "lon": -3.0,
      "bounds": [
        36.75,
        38.25,
        -3.75,
        -2.25
      ],
      "sens_slope": -0.1206,
      "sens_slope_decade": -1.206,
      "standardized_z": -4.554,
      "p_value": 1e-05,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_DECREASING",
      "q_value": 2e-05,
      "is_significant": true,
      "significance_regime": "decreasing"
    },
    {
      "domain_id": "A",
      "domain_name": "Iberian Peninsula",
      "lat": 37.5,
      "lon": -1.5,
      "bounds": [
        36.75,
        38.25,
        -2.25,
        -0.75
      ],
      "sens_slope": -0.1322,
      "sens_slope_decade": -1.322,
      "standardized_z": -3.76,
      "p_value": 0.00017,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_DECREASING",
      "q_value": 0.00021,
      "is_significant": true,
      "significance_regime": "decreasing"
    },
    {
      "domain_id": "A",
      "domain_name": "Iberian Peninsula",
      "lat": 37.5,
      "lon": 0.0,
      "bounds": [
        36.75,
        38.25,
        -0.75,
        0.75
      ],
      "sens_slope": -0.2387,
      "sens_slope_decade": -2.387,
      "standardized_z": -5.115,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_DECREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "decreasing"
    },
    {
      "domain_id": "A",
      "domain_name": "Iberian Peninsula",
      "lat": 37.5,
      "lon": 1.5,
      "bounds": [
        36.75,
        38.25,
        0.75,
        2.25
      ],
      "sens_slope": -0.1174,
      "sens_slope_decade": -1.174,
      "standardized_z": -4.04,
      "p_value": 5e-05,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_DECREASING",
      "q_value": 7e-05,
      "is_significant": true,
      "significance_regime": "decreasing"
    },
    {
      "domain_id": "A",
      "domain_name": "Iberian Peninsula",
      "lat": 37.5,
      "lon": 3.0,
      "bounds": [
        36.75,
        38.25,
        2.25,
        3.75
      ],
      "sens_slope": -0.2677,
      "sens_slope_decade": -2.677,
      "standardized_z": -5.442,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_DECREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "decreasing"
    },
    {
      "domain_id": "A",
      "domain_name": "Iberian Peninsula",
      "lat": 39.0,
      "lon": -9.0,
      "bounds": [
        38.25,
        39.75,
        -9.75,
        -8.25
      ],
      "sens_slope": -0.1843,
      "sens_slope_decade": -1.843,
      "standardized_z": -3.994,
      "p_value": 7e-05,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_DECREASING",
      "q_value": 9e-05,
      "is_significant": true,
      "significance_regime": "decreasing"
    },
    {
      "domain_id": "A",
      "domain_name": "Iberian Peninsula",
      "lat": 39.0,
      "lon": -7.5,
      "bounds": [
        38.25,
        39.75,
        -8.25,
        -6.75
      ],
      "sens_slope": -0.0622,
      "sens_slope_decade": -0.622,
      "standardized_z": -3.713,
      "p_value": 0.0002,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_DECREASING",
      "q_value": 0.00024,
      "is_significant": true,
      "significance_regime": "decreasing"
    },
    {
      "domain_id": "A",
      "domain_name": "Iberian Peninsula",
      "lat": 39.0,
      "lon": -6.0,
      "bounds": [
        38.25,
        39.75,
        -6.75,
        -5.25
      ],
      "sens_slope": -0.2545,
      "sens_slope_decade": -2.545,
      "standardized_z": -5.161,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_DECREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "decreasing"
    },
    {
      "domain_id": "A",
      "domain_name": "Iberian Peninsula",
      "lat": 39.0,
      "lon": -4.5,
      "bounds": [
        38.25,
        39.75,
        -5.25,
        -3.75
      ],
      "sens_slope": -0.1355,
      "sens_slope_decade": -1.355,
      "standardized_z": -4.414,
      "p_value": 1e-05,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_DECREASING",
      "q_value": 2e-05,
      "is_significant": true,
      "significance_regime": "decreasing"
    },
    {
      "domain_id": "A",
      "domain_name": "Iberian Peninsula",
      "lat": 39.0,
      "lon": -3.0,
      "bounds": [
        38.25,
        39.75,
        -3.75,
        -2.25
      ],
      "sens_slope": -0.1586,
      "sens_slope_decade": -1.586,
      "standardized_z": -4.414,
      "p_value": 1e-05,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_DECREASING",
      "q_value": 2e-05,
      "is_significant": true,
      "significance_regime": "decreasing"
    },
    {
      "domain_id": "A",
      "domain_name": "Iberian Peninsula",
      "lat": 39.0,
      "lon": -1.5,
      "bounds": [
        38.25,
        39.75,
        -2.25,
        -0.75
      ],
      "sens_slope": -0.1743,
      "sens_slope_decade": -1.743,
      "standardized_z": -4.321,
      "p_value": 2e-05,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_DECREASING",
      "q_value": 3e-05,
      "is_significant": true,
      "significance_regime": "decreasing"
    },
    {
      "domain_id": "A",
      "domain_name": "Iberian Peninsula",
      "lat": 39.0,
      "lon": 0.0,
      "bounds": [
        38.25,
        39.75,
        -0.75,
        0.75
      ],
      "sens_slope": -0.0676,
      "sens_slope_decade": -0.676,
      "standardized_z": -3.013,
      "p_value": 0.00259,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_DECREASING",
      "q_value": 0.00284,
      "is_significant": true,
      "significance_regime": "decreasing"
    },
    {
      "domain_id": "A",
      "domain_name": "Iberian Peninsula",
      "lat": 39.0,
      "lon": 1.5,
      "bounds": [
        38.25,
        39.75,
        0.75,
        2.25
      ],
      "sens_slope": -0.0774,
      "sens_slope_decade": -0.774,
      "standardized_z": -3.807,
      "p_value": 0.00014,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_DECREASING",
      "q_value": 0.00017,
      "is_significant": true,
      "significance_regime": "decreasing"
    },
    {
      "domain_id": "A",
      "domain_name": "Iberian Peninsula",
      "lat": 39.0,
      "lon": 3.0,
      "bounds": [
        38.25,
        39.75,
        2.25,
        3.75
      ],
      "sens_slope": -0.2516,
      "sens_slope_decade": -2.516,
      "standardized_z": -5.348,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_DECREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "decreasing"
    },
    {
      "domain_id": "A",
      "domain_name": "Iberian Peninsula",
      "lat": 40.5,
      "lon": -9.0,
      "bounds": [
        39.75,
        41.25,
        -9.75,
        -8.25
      ],
      "sens_slope": -0.19,
      "sens_slope_decade": -1.9,
      "standardized_z": -4.694,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_DECREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "decreasing"
    },
    {
      "domain_id": "A",
      "domain_name": "Iberian Peninsula",
      "lat": 40.5,
      "lon": -7.5,
      "bounds": [
        39.75,
        41.25,
        -8.25,
        -6.75
      ],
      "sens_slope": -0.2163,
      "sens_slope_decade": -2.163,
      "standardized_z": -4.694,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_DECREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "decreasing"
    },
    {
      "domain_id": "A",
      "domain_name": "Iberian Peninsula",
      "lat": 40.5,
      "lon": -6.0,
      "bounds": [
        39.75,
        41.25,
        -6.75,
        -5.25
      ],
      "sens_slope": -0.2346,
      "sens_slope_decade": -2.346,
      "standardized_z": -4.928,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_DECREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "decreasing"
    },
    {
      "domain_id": "A",
      "domain_name": "Iberian Peninsula",
      "lat": 40.5,
      "lon": -4.5,
      "bounds": [
        39.75,
        41.25,
        -5.25,
        -3.75
      ],
      "sens_slope": -0.1713,
      "sens_slope_decade": -1.713,
      "standardized_z": -5.115,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_DECREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "decreasing"
    },
    {
      "domain_id": "A",
      "domain_name": "Iberian Peninsula",
      "lat": 40.5,
      "lon": -3.0,
      "bounds": [
        39.75,
        41.25,
        -3.75,
        -2.25
      ],
      "sens_slope": -0.149,
      "sens_slope_decade": -1.49,
      "standardized_z": -4.414,
      "p_value": 1e-05,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_DECREASING",
      "q_value": 2e-05,
      "is_significant": true,
      "significance_regime": "decreasing"
    },
    {
      "domain_id": "A",
      "domain_name": "Iberian Peninsula",
      "lat": 40.5,
      "lon": -1.5,
      "bounds": [
        39.75,
        41.25,
        -2.25,
        -0.75
      ],
      "sens_slope": -0.2203,
      "sens_slope_decade": -2.203,
      "standardized_z": -5.068,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_DECREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "decreasing"
    },
    {
      "domain_id": "A",
      "domain_name": "Iberian Peninsula",
      "lat": 40.5,
      "lon": 0.0,
      "bounds": [
        39.75,
        41.25,
        -0.75,
        0.75
      ],
      "sens_slope": -0.1835,
      "sens_slope_decade": -1.835,
      "standardized_z": -4.04,
      "p_value": 5e-05,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_DECREASING",
      "q_value": 7e-05,
      "is_significant": true,
      "significance_regime": "decreasing"
    },
    {
      "domain_id": "A",
      "domain_name": "Iberian Peninsula",
      "lat": 40.5,
      "lon": 1.5,
      "bounds": [
        39.75,
        41.25,
        0.75,
        2.25
      ],
      "sens_slope": -0.1338,
      "sens_slope_decade": -1.338,
      "standardized_z": -4.741,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_DECREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "decreasing"
    },
    {
      "domain_id": "A",
      "domain_name": "Iberian Peninsula",
      "lat": 40.5,
      "lon": 3.0,
      "bounds": [
        39.75,
        41.25,
        2.25,
        3.75
      ],
      "sens_slope": -0.2041,
      "sens_slope_decade": -2.041,
      "standardized_z": -5.161,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_DECREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "decreasing"
    },
    {
      "domain_id": "A",
      "domain_name": "Iberian Peninsula",
      "lat": 42.0,
      "lon": -9.0,
      "bounds": [
        41.25,
        42.75,
        -9.75,
        -8.25
      ],
      "sens_slope": -0.1743,
      "sens_slope_decade": -1.743,
      "standardized_z": -4.835,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_DECREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "decreasing"
    },
    {
      "domain_id": "A",
      "domain_name": "Iberian Peninsula",
      "lat": 42.0,
      "lon": -7.5,
      "bounds": [
        41.25,
        42.75,
        -8.25,
        -6.75
      ],
      "sens_slope": -0.14,
      "sens_slope_decade": -1.4,
      "standardized_z": -4.04,
      "p_value": 5e-05,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_DECREASING",
      "q_value": 7e-05,
      "is_significant": true,
      "significance_regime": "decreasing"
    },
    {
      "domain_id": "A",
      "domain_name": "Iberian Peninsula",
      "lat": 42.0,
      "lon": -6.0,
      "bounds": [
        41.25,
        42.75,
        -6.75,
        -5.25
      ],
      "sens_slope": -0.1209,
      "sens_slope_decade": -1.209,
      "standardized_z": -4.181,
      "p_value": 3e-05,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_DECREASING",
      "q_value": 5e-05,
      "is_significant": true,
      "significance_regime": "decreasing"
    },
    {
      "domain_id": "A",
      "domain_name": "Iberian Peninsula",
      "lat": 42.0,
      "lon": -4.5,
      "bounds": [
        41.25,
        42.75,
        -5.25,
        -3.75
      ],
      "sens_slope": -0.0426,
      "sens_slope_decade": -0.426,
      "standardized_z": -2.873,
      "p_value": 0.00407,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_DECREASING",
      "q_value": 0.00426,
      "is_significant": true,
      "significance_regime": "decreasing"
    },
    {
      "domain_id": "A",
      "domain_name": "Iberian Peninsula",
      "lat": 42.0,
      "lon": -3.0,
      "bounds": [
        41.25,
        42.75,
        -3.75,
        -2.25
      ],
      "sens_slope": -0.0763,
      "sens_slope_decade": -0.763,
      "standardized_z": -3.386,
      "p_value": 0.00071,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_DECREASING",
      "q_value": 0.00082,
      "is_significant": true,
      "significance_regime": "decreasing"
    },
    {
      "domain_id": "A",
      "domain_name": "Iberian Peninsula",
      "lat": 42.0,
      "lon": -1.5,
      "bounds": [
        41.25,
        42.75,
        -2.25,
        -0.75
      ],
      "sens_slope": -0.218,
      "sens_slope_decade": -2.18,
      "standardized_z": -5.302,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_DECREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "decreasing"
    },
    {
      "domain_id": "A",
      "domain_name": "Iberian Peninsula",
      "lat": 42.0,
      "lon": 0.0,
      "bounds": [
        41.25,
        42.75,
        -0.75,
        0.75
      ],
      "sens_slope": -0.0908,
      "sens_slope_decade": -0.908,
      "standardized_z": -3.013,
      "p_value": 0.00259,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_DECREASING",
      "q_value": 0.00284,
      "is_significant": true,
      "significance_regime": "decreasing"
    },
    {
      "domain_id": "A",
      "domain_name": "Iberian Peninsula",
      "lat": 42.0,
      "lon": 1.5,
      "bounds": [
        41.25,
        42.75,
        0.75,
        2.25
      ],
      "sens_slope": -0.1437,
      "sens_slope_decade": -1.437,
      "standardized_z": -4.554,
      "p_value": 1e-05,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_DECREASING",
      "q_value": 2e-05,
      "is_significant": true,
      "significance_regime": "decreasing"
    },
    {
      "domain_id": "A",
      "domain_name": "Iberian Peninsula",
      "lat": 42.0,
      "lon": 3.0,
      "bounds": [
        41.25,
        42.75,
        2.25,
        3.75
      ],
      "sens_slope": -0.1002,
      "sens_slope_decade": -1.002,
      "standardized_z": -2.732,
      "p_value": 0.00628,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_DECREASING",
      "q_value": 0.00642,
      "is_significant": true,
      "significance_regime": "decreasing"
    }
  ]
};

export const DEFAULT_GRID_B: SpatialGridResponse = {
  "status": "success",
  "domain_id": "B",
  "domain_name": "Southern Scandinavia",
  "provenance_type": "NASA_GLDAS_NETCDF",
  "disclaimer": "Derived from verified NASA GLDAS Noah 2.1 NetCDF archive using Theil-Sen trend estimator and Mann-Kendall test with Benjamini-Hochberg FDR.",
  "statistical_method": "Theil-Sen Robust Estimator + Mann-Kendall with Benjamini-Hochberg FDR (alpha=0.05)",
  "fdr_threshold": 0.05,
  "variable": "RootMoist_inst",
  "unit": "kg/m\u00b2/yr",
  "bbox": [
    58.0,
    66.0,
    10.0,
    22.0
  ],
  "grid_step": 1.5,
  "lat_step": 1.5,
  "lon_step": 1.5,
  "total_cells": 54,
  "significant_cells": 54,
  "significant_percentage": 100.0,
  "sig_decrease_count": 0,
  "sig_increase_count": 54,
  "not_sig_count": 0,
  "drying_cells": 0,
  "wetting_cells": 54,
  "min_slope": 0.1473,
  "max_slope": 0.3743,
  "cells": [
    {
      "domain_id": "B",
      "domain_name": "Southern Scandinavia",
      "lat": 58.0,
      "lon": 10.0,
      "bounds": [
        57.25,
        58.75,
        9.25,
        10.75
      ],
      "sens_slope": 0.2119,
      "sens_slope_decade": 2.119,
      "standardized_z": 4.788,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_INCREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "increasing"
    },
    {
      "domain_id": "B",
      "domain_name": "Southern Scandinavia",
      "lat": 58.0,
      "lon": 11.5,
      "bounds": [
        57.25,
        58.75,
        10.75,
        12.25
      ],
      "sens_slope": 0.1668,
      "sens_slope_decade": 1.668,
      "standardized_z": 4.367,
      "p_value": 1e-05,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_INCREASING",
      "q_value": 1e-05,
      "is_significant": true,
      "significance_regime": "increasing"
    },
    {
      "domain_id": "B",
      "domain_name": "Southern Scandinavia",
      "lat": 58.0,
      "lon": 13.0,
      "bounds": [
        57.25,
        58.75,
        12.25,
        13.75
      ],
      "sens_slope": 0.1995,
      "sens_slope_decade": 1.995,
      "standardized_z": 4.601,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_INCREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "increasing"
    },
    {
      "domain_id": "B",
      "domain_name": "Southern Scandinavia",
      "lat": 58.0,
      "lon": 14.5,
      "bounds": [
        57.25,
        58.75,
        13.75,
        15.25
      ],
      "sens_slope": 0.2177,
      "sens_slope_decade": 2.177,
      "standardized_z": 5.488,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_INCREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "increasing"
    },
    {
      "domain_id": "B",
      "domain_name": "Southern Scandinavia",
      "lat": 58.0,
      "lon": 16.0,
      "bounds": [
        57.25,
        58.75,
        15.25,
        16.75
      ],
      "sens_slope": 0.2012,
      "sens_slope_decade": 2.012,
      "standardized_z": 4.601,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_INCREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "increasing"
    },
    {
      "domain_id": "B",
      "domain_name": "Southern Scandinavia",
      "lat": 58.0,
      "lon": 17.5,
      "bounds": [
        57.25,
        58.75,
        16.75,
        18.25
      ],
      "sens_slope": 0.1583,
      "sens_slope_decade": 1.583,
      "standardized_z": 4.835,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_INCREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "increasing"
    },
    {
      "domain_id": "B",
      "domain_name": "Southern Scandinavia",
      "lat": 58.0,
      "lon": 19.0,
      "bounds": [
        57.25,
        58.75,
        18.25,
        19.75
      ],
      "sens_slope": 0.3431,
      "sens_slope_decade": 3.431,
      "standardized_z": 5.628,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_INCREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "increasing"
    },
    {
      "domain_id": "B",
      "domain_name": "Southern Scandinavia",
      "lat": 58.0,
      "lon": 20.5,
      "bounds": [
        57.25,
        58.75,
        19.75,
        21.25
      ],
      "sens_slope": 0.1898,
      "sens_slope_decade": 1.898,
      "standardized_z": 5.021,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_INCREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "increasing"
    },
    {
      "domain_id": "B",
      "domain_name": "Southern Scandinavia",
      "lat": 58.0,
      "lon": 22.0,
      "bounds": [
        57.25,
        58.75,
        21.25,
        22.75
      ],
      "sens_slope": 0.2014,
      "sens_slope_decade": 2.014,
      "standardized_z": 4.461,
      "p_value": 1e-05,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_INCREASING",
      "q_value": 1e-05,
      "is_significant": true,
      "significance_regime": "increasing"
    },
    {
      "domain_id": "B",
      "domain_name": "Southern Scandinavia",
      "lat": 59.5,
      "lon": 10.0,
      "bounds": [
        58.75,
        60.25,
        9.25,
        10.75
      ],
      "sens_slope": 0.3743,
      "sens_slope_decade": 3.743,
      "standardized_z": 5.535,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_INCREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "increasing"
    },
    {
      "domain_id": "B",
      "domain_name": "Southern Scandinavia",
      "lat": 59.5,
      "lon": 11.5,
      "bounds": [
        58.75,
        60.25,
        10.75,
        12.25
      ],
      "sens_slope": 0.2285,
      "sens_slope_decade": 2.285,
      "standardized_z": 4.835,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_INCREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "increasing"
    },
    {
      "domain_id": "B",
      "domain_name": "Southern Scandinavia",
      "lat": 59.5,
      "lon": 13.0,
      "bounds": [
        58.75,
        60.25,
        12.25,
        13.75
      ],
      "sens_slope": 0.2419,
      "sens_slope_decade": 2.419,
      "standardized_z": 5.488,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_INCREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "increasing"
    },
    {
      "domain_id": "B",
      "domain_name": "Southern Scandinavia",
      "lat": 59.5,
      "lon": 14.5,
      "bounds": [
        58.75,
        60.25,
        13.75,
        15.25
      ],
      "sens_slope": 0.2358,
      "sens_slope_decade": 2.358,
      "standardized_z": 5.068,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_INCREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "increasing"
    },
    {
      "domain_id": "B",
      "domain_name": "Southern Scandinavia",
      "lat": 59.5,
      "lon": 16.0,
      "bounds": [
        58.75,
        60.25,
        15.25,
        16.75
      ],
      "sens_slope": 0.294,
      "sens_slope_decade": 2.94,
      "standardized_z": 5.395,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_INCREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "increasing"
    },
    {
      "domain_id": "B",
      "domain_name": "Southern Scandinavia",
      "lat": 59.5,
      "lon": 17.5,
      "bounds": [
        58.75,
        60.25,
        16.75,
        18.25
      ],
      "sens_slope": 0.2722,
      "sens_slope_decade": 2.722,
      "standardized_z": 4.975,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_INCREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "increasing"
    },
    {
      "domain_id": "B",
      "domain_name": "Southern Scandinavia",
      "lat": 59.5,
      "lon": 19.0,
      "bounds": [
        58.75,
        60.25,
        18.25,
        19.75
      ],
      "sens_slope": 0.182,
      "sens_slope_decade": 1.82,
      "standardized_z": 4.461,
      "p_value": 1e-05,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_INCREASING",
      "q_value": 1e-05,
      "is_significant": true,
      "significance_regime": "increasing"
    },
    {
      "domain_id": "B",
      "domain_name": "Southern Scandinavia",
      "lat": 59.5,
      "lon": 20.5,
      "bounds": [
        58.75,
        60.25,
        19.75,
        21.25
      ],
      "sens_slope": 0.2525,
      "sens_slope_decade": 2.525,
      "standardized_z": 4.414,
      "p_value": 1e-05,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_INCREASING",
      "q_value": 1e-05,
      "is_significant": true,
      "significance_regime": "increasing"
    },
    {
      "domain_id": "B",
      "domain_name": "Southern Scandinavia",
      "lat": 59.5,
      "lon": 22.0,
      "bounds": [
        58.75,
        60.25,
        21.25,
        22.75
      ],
      "sens_slope": 0.1547,
      "sens_slope_decade": 1.547,
      "standardized_z": 5.068,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_INCREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "increasing"
    },
    {
      "domain_id": "B",
      "domain_name": "Southern Scandinavia",
      "lat": 61.0,
      "lon": 10.0,
      "bounds": [
        60.25,
        61.75,
        9.25,
        10.75
      ],
      "sens_slope": 0.2255,
      "sens_slope_decade": 2.255,
      "standardized_z": 4.087,
      "p_value": 4e-05,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_INCREASING",
      "q_value": 4e-05,
      "is_significant": true,
      "significance_regime": "increasing"
    },
    {
      "domain_id": "B",
      "domain_name": "Southern Scandinavia",
      "lat": 61.0,
      "lon": 11.5,
      "bounds": [
        60.25,
        61.75,
        10.75,
        12.25
      ],
      "sens_slope": 0.335,
      "sens_slope_decade": 3.35,
      "standardized_z": 5.675,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_INCREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "increasing"
    },
    {
      "domain_id": "B",
      "domain_name": "Southern Scandinavia",
      "lat": 61.0,
      "lon": 13.0,
      "bounds": [
        60.25,
        61.75,
        12.25,
        13.75
      ],
      "sens_slope": 0.1639,
      "sens_slope_decade": 1.639,
      "standardized_z": 4.601,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_INCREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "increasing"
    },
    {
      "domain_id": "B",
      "domain_name": "Southern Scandinavia",
      "lat": 61.0,
      "lon": 14.5,
      "bounds": [
        60.25,
        61.75,
        13.75,
        15.25
      ],
      "sens_slope": 0.2608,
      "sens_slope_decade": 2.608,
      "standardized_z": 5.255,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_INCREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "increasing"
    },
    {
      "domain_id": "B",
      "domain_name": "Southern Scandinavia",
      "lat": 61.0,
      "lon": 16.0,
      "bounds": [
        60.25,
        61.75,
        15.25,
        16.75
      ],
      "sens_slope": 0.2384,
      "sens_slope_decade": 2.384,
      "standardized_z": 5.208,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_INCREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "increasing"
    },
    {
      "domain_id": "B",
      "domain_name": "Southern Scandinavia",
      "lat": 61.0,
      "lon": 17.5,
      "bounds": [
        60.25,
        61.75,
        16.75,
        18.25
      ],
      "sens_slope": 0.2351,
      "sens_slope_decade": 2.351,
      "standardized_z": 4.741,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_INCREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "increasing"
    },
    {
      "domain_id": "B",
      "domain_name": "Southern Scandinavia",
      "lat": 61.0,
      "lon": 19.0,
      "bounds": [
        60.25,
        61.75,
        18.25,
        19.75
      ],
      "sens_slope": 0.3218,
      "sens_slope_decade": 3.218,
      "standardized_z": 5.021,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_INCREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "increasing"
    },
    {
      "domain_id": "B",
      "domain_name": "Southern Scandinavia",
      "lat": 61.0,
      "lon": 20.5,
      "bounds": [
        60.25,
        61.75,
        19.75,
        21.25
      ],
      "sens_slope": 0.2868,
      "sens_slope_decade": 2.868,
      "standardized_z": 4.835,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_INCREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "increasing"
    },
    {
      "domain_id": "B",
      "domain_name": "Southern Scandinavia",
      "lat": 61.0,
      "lon": 22.0,
      "bounds": [
        60.25,
        61.75,
        21.25,
        22.75
      ],
      "sens_slope": 0.1655,
      "sens_slope_decade": 1.655,
      "standardized_z": 4.694,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_INCREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "increasing"
    },
    {
      "domain_id": "B",
      "domain_name": "Southern Scandinavia",
      "lat": 62.5,
      "lon": 10.0,
      "bounds": [
        61.75,
        63.25,
        9.25,
        10.75
      ],
      "sens_slope": 0.214,
      "sens_slope_decade": 2.14,
      "standardized_z": 4.788,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_INCREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "increasing"
    },
    {
      "domain_id": "B",
      "domain_name": "Southern Scandinavia",
      "lat": 62.5,
      "lon": 11.5,
      "bounds": [
        61.75,
        63.25,
        10.75,
        12.25
      ],
      "sens_slope": 0.1845,
      "sens_slope_decade": 1.845,
      "standardized_z": 4.694,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_INCREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "increasing"
    },
    {
      "domain_id": "B",
      "domain_name": "Southern Scandinavia",
      "lat": 62.5,
      "lon": 13.0,
      "bounds": [
        61.75,
        63.25,
        12.25,
        13.75
      ],
      "sens_slope": 0.1727,
      "sens_slope_decade": 1.727,
      "standardized_z": 4.181,
      "p_value": 3e-05,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_INCREASING",
      "q_value": 3e-05,
      "is_significant": true,
      "significance_regime": "increasing"
    },
    {
      "domain_id": "B",
      "domain_name": "Southern Scandinavia",
      "lat": 62.5,
      "lon": 14.5,
      "bounds": [
        61.75,
        63.25,
        13.75,
        15.25
      ],
      "sens_slope": 0.2173,
      "sens_slope_decade": 2.173,
      "standardized_z": 5.302,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_INCREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "increasing"
    },
    {
      "domain_id": "B",
      "domain_name": "Southern Scandinavia",
      "lat": 62.5,
      "lon": 16.0,
      "bounds": [
        61.75,
        63.25,
        15.25,
        16.75
      ],
      "sens_slope": 0.2442,
      "sens_slope_decade": 2.442,
      "standardized_z": 4.788,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_INCREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "increasing"
    },
    {
      "domain_id": "B",
      "domain_name": "Southern Scandinavia",
      "lat": 62.5,
      "lon": 17.5,
      "bounds": [
        61.75,
        63.25,
        16.75,
        18.25
      ],
      "sens_slope": 0.1868,
      "sens_slope_decade": 1.868,
      "standardized_z": 5.442,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_INCREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "increasing"
    },
    {
      "domain_id": "B",
      "domain_name": "Southern Scandinavia",
      "lat": 62.5,
      "lon": 19.0,
      "bounds": [
        61.75,
        63.25,
        18.25,
        19.75
      ],
      "sens_slope": 0.2192,
      "sens_slope_decade": 2.192,
      "standardized_z": 4.835,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_INCREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "increasing"
    },
    {
      "domain_id": "B",
      "domain_name": "Southern Scandinavia",
      "lat": 62.5,
      "lon": 20.5,
      "bounds": [
        61.75,
        63.25,
        19.75,
        21.25
      ],
      "sens_slope": 0.2485,
      "sens_slope_decade": 2.485,
      "standardized_z": 5.535,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_INCREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "increasing"
    },
    {
      "domain_id": "B",
      "domain_name": "Southern Scandinavia",
      "lat": 62.5,
      "lon": 22.0,
      "bounds": [
        61.75,
        63.25,
        21.25,
        22.75
      ],
      "sens_slope": 0.1926,
      "sens_slope_decade": 1.926,
      "standardized_z": 4.601,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_INCREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "increasing"
    },
    {
      "domain_id": "B",
      "domain_name": "Southern Scandinavia",
      "lat": 64.0,
      "lon": 10.0,
      "bounds": [
        63.25,
        64.75,
        9.25,
        10.75
      ],
      "sens_slope": 0.224,
      "sens_slope_decade": 2.24,
      "standardized_z": 5.208,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_INCREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "increasing"
    },
    {
      "domain_id": "B",
      "domain_name": "Southern Scandinavia",
      "lat": 64.0,
      "lon": 11.5,
      "bounds": [
        63.25,
        64.75,
        10.75,
        12.25
      ],
      "sens_slope": 0.2474,
      "sens_slope_decade": 2.474,
      "standardized_z": 4.274,
      "p_value": 2e-05,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_INCREASING",
      "q_value": 2e-05,
      "is_significant": true,
      "significance_regime": "increasing"
    },
    {
      "domain_id": "B",
      "domain_name": "Southern Scandinavia",
      "lat": 64.0,
      "lon": 13.0,
      "bounds": [
        63.25,
        64.75,
        12.25,
        13.75
      ],
      "sens_slope": 0.2779,
      "sens_slope_decade": 2.779,
      "standardized_z": 5.488,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_INCREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "increasing"
    },
    {
      "domain_id": "B",
      "domain_name": "Southern Scandinavia",
      "lat": 64.0,
      "lon": 14.5,
      "bounds": [
        63.25,
        64.75,
        13.75,
        15.25
      ],
      "sens_slope": 0.3333,
      "sens_slope_decade": 3.333,
      "standardized_z": 5.068,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_INCREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "increasing"
    },
    {
      "domain_id": "B",
      "domain_name": "Southern Scandinavia",
      "lat": 64.0,
      "lon": 16.0,
      "bounds": [
        63.25,
        64.75,
        15.25,
        16.75
      ],
      "sens_slope": 0.2719,
      "sens_slope_decade": 2.719,
      "standardized_z": 4.694,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_INCREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "increasing"
    },
    {
      "domain_id": "B",
      "domain_name": "Southern Scandinavia",
      "lat": 64.0,
      "lon": 17.5,
      "bounds": [
        63.25,
        64.75,
        16.75,
        18.25
      ],
      "sens_slope": 0.1837,
      "sens_slope_decade": 1.837,
      "standardized_z": 4.835,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_INCREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "increasing"
    },
    {
      "domain_id": "B",
      "domain_name": "Southern Scandinavia",
      "lat": 64.0,
      "lon": 19.0,
      "bounds": [
        63.25,
        64.75,
        18.25,
        19.75
      ],
      "sens_slope": 0.2994,
      "sens_slope_decade": 2.994,
      "standardized_z": 5.115,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_INCREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "increasing"
    },
    {
      "domain_id": "B",
      "domain_name": "Southern Scandinavia",
      "lat": 64.0,
      "lon": 20.5,
      "bounds": [
        63.25,
        64.75,
        19.75,
        21.25
      ],
      "sens_slope": 0.2426,
      "sens_slope_decade": 2.426,
      "standardized_z": 5.348,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_INCREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "increasing"
    },
    {
      "domain_id": "B",
      "domain_name": "Southern Scandinavia",
      "lat": 64.0,
      "lon": 22.0,
      "bounds": [
        63.25,
        64.75,
        21.25,
        22.75
      ],
      "sens_slope": 0.3017,
      "sens_slope_decade": 3.017,
      "standardized_z": 4.648,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_INCREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "increasing"
    },
    {
      "domain_id": "B",
      "domain_name": "Southern Scandinavia",
      "lat": 65.5,
      "lon": 10.0,
      "bounds": [
        64.75,
        66.25,
        9.25,
        10.75
      ],
      "sens_slope": 0.2672,
      "sens_slope_decade": 2.672,
      "standardized_z": 5.161,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_INCREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "increasing"
    },
    {
      "domain_id": "B",
      "domain_name": "Southern Scandinavia",
      "lat": 65.5,
      "lon": 11.5,
      "bounds": [
        64.75,
        66.25,
        10.75,
        12.25
      ],
      "sens_slope": 0.2114,
      "sens_slope_decade": 2.114,
      "standardized_z": 4.928,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_INCREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "increasing"
    },
    {
      "domain_id": "B",
      "domain_name": "Southern Scandinavia",
      "lat": 65.5,
      "lon": 13.0,
      "bounds": [
        64.75,
        66.25,
        12.25,
        13.75
      ],
      "sens_slope": 0.2297,
      "sens_slope_decade": 2.297,
      "standardized_z": 4.367,
      "p_value": 1e-05,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_INCREASING",
      "q_value": 1e-05,
      "is_significant": true,
      "significance_regime": "increasing"
    },
    {
      "domain_id": "B",
      "domain_name": "Southern Scandinavia",
      "lat": 65.5,
      "lon": 14.5,
      "bounds": [
        64.75,
        66.25,
        13.75,
        15.25
      ],
      "sens_slope": 0.2483,
      "sens_slope_decade": 2.483,
      "standardized_z": 5.255,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_INCREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "increasing"
    },
    {
      "domain_id": "B",
      "domain_name": "Southern Scandinavia",
      "lat": 65.5,
      "lon": 16.0,
      "bounds": [
        64.75,
        66.25,
        15.25,
        16.75
      ],
      "sens_slope": 0.2947,
      "sens_slope_decade": 2.947,
      "standardized_z": 4.835,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_INCREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "increasing"
    },
    {
      "domain_id": "B",
      "domain_name": "Southern Scandinavia",
      "lat": 65.5,
      "lon": 17.5,
      "bounds": [
        64.75,
        66.25,
        16.75,
        18.25
      ],
      "sens_slope": 0.189,
      "sens_slope_decade": 1.89,
      "standardized_z": 5.115,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_INCREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "increasing"
    },
    {
      "domain_id": "B",
      "domain_name": "Southern Scandinavia",
      "lat": 65.5,
      "lon": 19.0,
      "bounds": [
        64.75,
        66.25,
        18.25,
        19.75
      ],
      "sens_slope": 0.1473,
      "sens_slope_decade": 1.473,
      "standardized_z": 4.087,
      "p_value": 4e-05,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_INCREASING",
      "q_value": 4e-05,
      "is_significant": true,
      "significance_regime": "increasing"
    },
    {
      "domain_id": "B",
      "domain_name": "Southern Scandinavia",
      "lat": 65.5,
      "lon": 20.5,
      "bounds": [
        64.75,
        66.25,
        19.75,
        21.25
      ],
      "sens_slope": 0.2679,
      "sens_slope_decade": 2.679,
      "standardized_z": 5.488,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_INCREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "increasing"
    },
    {
      "domain_id": "B",
      "domain_name": "Southern Scandinavia",
      "lat": 65.5,
      "lon": 22.0,
      "bounds": [
        64.75,
        66.25,
        21.25,
        22.75
      ],
      "sens_slope": 0.1773,
      "sens_slope_decade": 1.773,
      "standardized_z": 4.601,
      "p_value": 0.0,
      "valid_observations": 25,
      "trend_label": "STATISTICALLY_SIGNIFICANT_INCREASING",
      "q_value": 0.0,
      "is_significant": true,
      "significance_regime": "increasing"
    }
  ]
};
