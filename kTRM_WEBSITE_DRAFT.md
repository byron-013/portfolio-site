# kTRM Website Draft (Placeholder)

## Overview
kTRM is a private options analytics engine built for quant research and production‑grade derivatives workflows.

- **Data source:** Databento options market data (Parquet pipeline)
- **Core engine:** native C++ implied volatility solver + Python wrapper
- **Surface fitting:** parametric eSSVI volatility surface calibration (arbitrage‑aware)
- **UI:** terminal TUI + Rich REPL (Textual) and a web dashboard (Dash/Plotly)
- **Outputs:** volatility surfaces, smile plots, arbitrage scans, Parquet/CSV exports
- **Collaboration:** Core engine by Byron + Javier Flores; Web UI by Dario Mazhara (team effort)

## Website copy (draft)

### Title
kTRM — Options Analytics Engine

### Tagline
Native C++ implied-vol solver + eSSVI surface fitting, exposed through a terminal UI, web dashboard, and export pipeline.

### What it enables
kTRM is built for the workflows quant researchers and vol traders actually run: intraday surface recalibration, skew monitoring across expiries, arbitrage detection on live vol surfaces, and greeks computation from fitted eSSVI parameters. Surfaces can be recalibrated on demand or exported to Parquet for batch downstream analytics.

### Description
A private derivatives analytics engine built for rapid surface calibration across the full options chain. Data is fetched from Databento, converted to Parquet, and passed into a native C++ implied volatility solver built on the Jaeckel method with OpenMP parallelism and zero-copy NumPy interop. The project includes:

- a **terminal UI + Rich REPL** (Textual) for rapid interactive exploration from the command line
- a **web dashboard** (Dash/Plotly) for interactive surface/smile visualization, export, and diagnostic charts
- a **headless export mode** that writes calibrated surfaces and diagnostics to Parquet/CSV for downstream analytics

### Coverage
- Full contract hierarchy: **SPX / OEX / VIX / SPY / QQQ / ES**
- Databento L1 options market data, ingested and stored as Parquet

### My contributions
- Designed and implemented the C++ implied volatility solver (Jaeckel method, OpenMP threading, Python/C bindings via ctypes)
- Built the eSSVI surface calibration pipeline with arbitrage penalty formulation
- Architected the Databento → Parquet ingestion and contract hierarchy system
- Built the terminal TUI and Rich REPL for interactive surface exploration
- Javier Flores: co-developed core engine components
- Dario Mazhara: built the Dash/Plotly web dashboard

> **Note to self:** Adjust the bullet points above to accurately reflect your specific contributions vs. Javier's. Be honest and precise.

### Technical details
- Native C++ Jaeckel implied volatility solver (OpenMP, zero-copy NumPy interop)
- Parametric eSSVI volatility surface fitting with arbitrage penalties
- Interactive web UI (Dash/Plotly) with:
  - coordinate modes (IV / variance / term structure)
  - series toggles (mid/bid/ask) + ATM marker
  - eSSVI fit overlay + residual inspection
  - arbitrage violation scans and per-tenor diagnostics
  - export button (CSV/Parquet) for downstream analysis

### Access
Repo access is limited. Reach out directly for a walkthrough, code access, or to discuss collaboration:
- **Email:** [your email]
- **LinkedIn:** [your LinkedIn URL]

## Placeholder gallery (update when screenshots are available)
- [ ] Architecture diagram (Databento → Parquet → C++ solver → eSSVI → UI/export)
- [ ] Terminal UI surface viewer (Textual)
- [ ] Web UI dashboard (Dash) showing:
  - surface/fit plot with eSSVI overlay
  - per-tenor residuals and fit quality
  - arbitrage violation table
- [ ] Export output snapshot (CSV/Parquet diagnostics)

---

> This file is a work-in-progress snapshot of the website copy. Replace the placeholders above with actual screenshots, benchmarks, and refine the technical narrative when you have the web UI repo and visuals.
