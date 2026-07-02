// Static portfolio inputs for the Efficient Frontier widget.
//
// Pulled from the live pipeline's 2-year return history via
// `stock-portfolio-pipeline/scripts/export_web_feed.py`, which writes
// `outputs/reports/frontier_feed.json` from the same shared returns matrix the
// optimizer and risk engine use. Re-run that script and paste the fresh values in
// whenever the pipeline's database is refreshed.
//
// The TICKERS array order must match the columns/rows of COV_MATRIX and
// EXPECTED_RETURNS.

export const TICKERS = ["AAPL", "MSFT", "GOOGL", "JPM", "BAC", "GS", "V", "MA"] as const;

export const RISK_FREE_RATE_DEFAULT = 0.02;
export const NUM_MONTE_CARLO = 5000;
export const TRADING_DAYS = 252;

// Annualized expected returns (arithmetic mean daily return x 252).
export const EXPECTED_RETURNS: number[] = [
  0.1895, // AAPL
  -0.0598, // MSFT
  0.3893, // GOOGL
  0.2881, // JPM
  0.234, // BAC
  0.4636, // GS
  0.1659, // V
  0.111, // MA
];

// Annualized covariance matrix, 8x8, symmetric and positive-definite.
export const COV_MATRIX: number[][] = [
  [0.0797, 0.0296, 0.0372, 0.0256, 0.03, 0.0407, 0.0228, 0.0233],
  [0.0296, 0.0688, 0.0279, 0.018, 0.0178, 0.0288, 0.0164, 0.018],
  [0.0372, 0.0279, 0.0965, 0.0247, 0.0231, 0.0391, 0.0164, 0.0155],
  [0.0256, 0.018, 0.0247, 0.0643, 0.0509, 0.0633, 0.0275, 0.0269],
  [0.03, 0.0178, 0.0231, 0.0509, 0.0649, 0.0578, 0.0255, 0.0262],
  [0.0407, 0.0288, 0.0391, 0.0633, 0.0578, 0.1001, 0.0287, 0.0285],
  [0.0228, 0.0164, 0.0164, 0.0275, 0.0255, 0.0287, 0.0496, 0.0427],
  [0.0233, 0.018, 0.0155, 0.0269, 0.0262, 0.0285, 0.0427, 0.0486],
];
