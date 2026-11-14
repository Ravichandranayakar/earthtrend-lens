import numpy as np
import pandas as pd
from typing import Dict, List, Any

def compute_monthly_climatology(dates: List[str], values: List[float]) -> Dict[str, Any]:
    """
    Decomposes monthly time series into seasonal climatology and multi-decadal anomalies.
    Input:
        dates: List of ISO date strings (e.g. '2000-01-01', '2000-02-01', ...)
        values: Corresponding numerical observations
    Returns:
        Structured dictionary containing raw series, monthly climatology, and deseasonalized anomalies.
    """
    df = pd.DataFrame({"date": pd.to_datetime(dates), "value": np.array(values, dtype=float)})
    df = df.dropna().sort_values("date").reset_index(drop=True)
    
    if len(df) < 12:
        raise ValueError("Time series requires at least 12 months for climatological analysis.")
    
    df["year"] = df["date"].dt.year
    df["month"] = df["date"].dt.month
    
    # 1. Calculate multi-year monthly baseline (climatological average for each month 1-12)
    climatology = df.groupby("month")["value"].mean().to_dict()
    
    # 2. Compute deseasonalized monthly anomaly
    df["climatological_mean"] = df["month"].map(climatology)
    df["anomaly"] = df["value"] - df["climatological_mean"]
    
    # 3. Compute annual aggregates
    annual_df = df.groupby("year").agg(
        annual_mean=("value", "mean"),
        annual_anomaly=("anomaly", "mean")
    ).reset_index()
    
    monthly_records = [
        {
            "date": row["date"].strftime("%Y-%m"),
            "year": int(row["year"]),
            "month": int(row["month"]),
            "observed": round(float(row["value"]), 4),
            "climatology": round(float(row["climatological_mean"]), 4),
            "anomaly": round(float(row["anomaly"]), 4)
        }
        for _, row in df.iterrows()
    ]
    
    annual_records = [
        {
            "year": int(row["year"]),
            "annual_mean": round(float(row["annual_mean"]), 4),
            "annual_anomaly": round(float(row["annual_anomaly"]), 4)
        }
        for _, row in annual_df.iterrows()
    ]
    
    return {
        "monthly_series": monthly_records,
        "annual_series": annual_records,
        "climatology_baseline": {int(k): round(float(v), 4) for k, v in climatology.items()}
    }
