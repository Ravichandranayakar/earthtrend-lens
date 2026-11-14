import numpy as np
from scipy import stats
from typing import Dict, Any, List

def compute_mann_kendall_and_sens_slope(
    time_indices: List[float], 
    values: List[float], 
    alpha: float = 0.05
) -> Dict[str, Any]:
    """
    Executes non-parametric Mann-Kendall Monotonic Trend Test and Theil-Sen Robust Slope.
    Input:
        time_indices: Monotonically increasing time values (e.g., years [2000, 2001, ...] or decimal years)
        values: Corresponding time-series values (observed or anomalies)
        alpha: Statistical significance threshold (default: 0.05 for 95% confidence)
    Returns:
        Structured dictionary with test statistics, p-value, slope, confidence intervals, and verdict.
    """
    t = np.asarray(time_indices, dtype=float)
    x = np.asarray(values, dtype=float)
    
    # Remove NaN values
    mask = ~np.isnan(t) & ~np.isnan(x)
    t = t[mask]
    x = x[mask]
    n = len(x)
    
    if n < 5:
        raise ValueError("Insufficient points for statistical trend evaluation (minimum 5 required).")
    
    # =========================================================================
    # 1. Theil-Sen Robust Slope Calculation
    # =========================================================================
    # Calculate all pairwise slopes: (x[j] - x[i]) / (t[j] - t[i]) for j > i
    slopes = []
    for i in range(n - 1):
        dt = t[i + 1:] - t[i]
        dx = x[i + 1:] - x[i]
        # Ignore identical time points if any
        valid = dt != 0
        if np.any(valid):
            slopes.extend((dx[valid] / dt[valid]).tolist())
            
    slopes = np.sort(np.asarray(slopes))
    n_slopes = len(slopes)
    sens_slope = float(np.median(slopes))
    
    # Calculate intercept: median(x - sens_slope * t)
    sens_intercept = float(np.median(x - sens_slope * t))
    
    # =========================================================================
    # 2. Mann-Kendall Test Statistic S
    # =========================================================================
    s = 0
    for i in range(n - 1):
        s += np.sum(np.sign(x[i + 1:] - x[i]))
    s = int(s)
    
    # Account for ties in values
    unique_vals, tie_counts = np.unique(x, return_counts=True)
    tie_term = np.sum(tie_counts * (tie_counts - 1) * (2 * tie_counts + 5))
    
    # Variance of S under the null hypothesis (no trend)
    var_s = (n * (n - 1) * (2 * n + 5) - tie_term) / 18.0
    
    # Continuity-corrected standardized test statistic Z
    if s > 0:
        z = (s - 1) / np.sqrt(var_s)
    elif s < 0:
        z = (s + 1) / np.sqrt(var_s)
    else:
        z = 0.0
    z = float(z)
    
    # Two-tailed p-value
    p_value = float(2.0 * (1.0 - stats.norm.cdf(abs(z))))
    
    # =========================================================================
    # 3. Sen's Slope Confidence Intervals (Sen, 1968)
    # =========================================================================
    z_alpha = stats.norm.ppf(1.0 - alpha / 2.0)
    c_alpha = z_alpha * np.sqrt(var_s)
    m1 = int(np.floor((n_slopes - c_alpha) / 2.0))
    m2 = int(np.ceil((n_slopes + c_alpha) / 2.0))
    
    slope_lower = float(slopes[max(0, m1)]) if m1 >= 0 else float(slopes[0])
    slope_upper = float(slopes[min(n_slopes - 1, m2)]) if m2 < n_slopes else float(slopes[-1])
    
    # =========================================================================
    # 4. Standard Linear Regression (OLS) for Methodological Comparison
    # =========================================================================
    ols_res = stats.linregress(t, x)
    ols_slope = float(ols_res.slope)
    ols_pvalue = float(ols_res.pvalue)
    ols_r_squared = float(ols_res.rvalue ** 2)
    
    # =========================================================================
    # 5. Scientific Verdict
    # =========================================================================
    is_significant = bool(p_value < alpha)
    
    if is_significant and sens_slope > 0:
        trend_label = "STATISTICALLY_SIGNIFICANT_INCREASING"
        verdict_text = f"Confirmed upward monotonic trend (+{sens_slope:.4f}/yr, p={p_value:.4e}). Evidence strongly rejects the null hypothesis."
    elif is_significant and sens_slope < 0:
        trend_label = "STATISTICALLY_SIGNIFICANT_DECREASING"
        verdict_text = f"Confirmed downward monotonic trend ({sens_slope:.4f}/yr, p={p_value:.4e}). Evidence strongly rejects the null hypothesis."
    else:
        trend_label = "DYNAMIC_EQUILIBRIUM_NO_TREND"
        verdict_text = f"No statistically significant monotonic trend detected (p={p_value:.3f} >= {alpha}). Fluctuations remain within natural variability bounds."

    return {
        "sens_slope": round(sens_slope, 5),
        "sens_intercept": round(sens_intercept, 5),
        "confidence_interval_95": [round(slope_lower, 5), round(slope_upper, 5)],
        "mann_kendall_score_s": s,
        "standardized_z": round(z, 4),
        "p_value": round(p_value, 5),
        "is_significant": is_significant,
        "trend_label": trend_label,
        "verdict_text": verdict_text,
        "ols_comparison": {
            "ols_slope": round(ols_slope, 5),
            "ols_pvalue": round(ols_pvalue, 5),
            "r_squared": round(ols_r_squared, 4)
        }
    }
