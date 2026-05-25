// Static portfolio inputs for the Efficient Frontier widget.
//
// TODO — replace placeholders with real values from the live pipeline.
// Run inside `stock-portfolio-pipeline/`:
//
//   import sqlite3, pandas as pd
//   conn = sqlite3.connect("stock_portfolio.db")
//   df = pd.read_sql("SELECT date, ticker, adj_close_price FROM stock_prices", conn)
//   wide = df.pivot(index="date", columns="ticker", values="adj_close_price").sort_index()
//   rets = wide.pct_change().dropna()
//   print("EXPECTED_RETURNS =", (rets.mean() * 252).round(4).to_dict())
//   print("COV_MATRIX =", (rets.cov() * 252).round(4).values.tolist())
//
// Paste the printed values below. The TICKERS array order must match the
// columns/rows of COV_MATRIX and the keys of EXPECTED_RETURNS.

export const TICKERS = ["AAPL", "MSFT", "GOOGL", "JPM", "BAC", "GS", "V", "MA"] as const;

export const RISK_FREE_RATE_DEFAULT = 0.02;
export const NUM_MONTE_CARLO = 5000;
export const TRADING_DAYS = 252;

// Annualized expected returns (placeholder — see TODO above).
export const EXPECTED_RETURNS: number[] = [
  0.18, // AAPL
  0.26, // MSFT
  0.22, // GOOGL
  0.20, // JPM
  0.15, // BAC
  0.22, // GS
  0.18, // V
  0.19, // MA
];

// Annualized covariance matrix, 8x8, symmetric and positive-definite
// (placeholder — see TODO above). Built from realistic vol + sector-correlation
// assumptions: tech megacaps ~0.7 intra-correlated, banks ~0.75, payments ~0.85,
// cross-sector ~0.4-0.5.
export const COV_MATRIX: number[][] = [
  [0.0625, 0.0414, 0.0459, 0.0248, 0.0294, 0.0336, 0.0275, 0.0303],
  [0.0414, 0.0529, 0.0435, 0.0213, 0.0258, 0.0290, 0.0239, 0.0263],
  [0.0459, 0.0435, 0.0729, 0.0238, 0.0287, 0.0317, 0.0270, 0.0297],
  [0.0248, 0.0213, 0.0238, 0.0484, 0.0480, 0.0462, 0.0220, 0.0242],
  [0.0294, 0.0258, 0.0287, 0.0480, 0.0784, 0.0564, 0.0269, 0.0296],
  [0.0336, 0.0290, 0.0317, 0.0462, 0.0564, 0.0784, 0.0280, 0.0308],
  [0.0275, 0.0239, 0.0270, 0.0220, 0.0269, 0.0280, 0.0400, 0.0374],
  [0.0303, 0.0263, 0.0297, 0.0242, 0.0296, 0.0308, 0.0374, 0.0484],
];
