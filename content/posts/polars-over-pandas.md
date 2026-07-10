---
title: "Why I reach for Polars over pandas"
description: "For most analytical workloads, the Polars API is closer to SQL than to pandas, and the speed-up is the smaller part of the win."
date: "2026-05-04"
tags: ["python", "data"]
---

Every Polars pitch leads with benchmarks. Mine doesn't, because the benchmarks aren't why I switched. I switched because Polars queries read like SQL and pandas queries read like the history of how pandas evolved. The speed-up is real, but it's the smaller part of the win.

## The same query, twice

Here's a shape of query I write constantly: join, filter, aggregate.

```python
# pandas
out = (
    trades.merge(chains, on=["date", "symbol"])
    .loc[lambda df: df["volume"] > 0]
    .groupby(["date", "expiry"])
    .agg(mid_iv=("iv", "mean"), notional=("notional", "sum"))
    .reset_index()
)
```

```python
# polars
out = (
    pl.scan_parquet("trades/*.parquet")
    .join(chains, on=["date", "symbol"])
    .filter(pl.col("volume") > 0)
    .group_by("date", "expiry")
    .agg(
        mid_iv=pl.col("iv").mean(),
        notional=pl.col("notional").sum(),
    )
    .collect()
)
```

The pandas version works, but notice what it makes you carry: a lambda to filter mid-chain, the tuple-based agg syntax, and the trailing `.reset_index()`, a ritual to undo a side effect (the index) that the query never asked for. The Polars version is a select-join-filter-group-agg pipeline stated in that order. Anyone who reads SQL can read it cold.

The absence of an index is not a small thing. A huge fraction of pandas friction (`reset_index`, `set_index`, silent index alignment on assignment, `MultiIndex` columns after a groupby) exists to serve a feature that analytical queries rarely want. Polars frames are just tables. Joins are explicit, alignment is explicit, and a whole category of "why is this column now an index level?" bugs simply goes away.

## What `.collect()` actually buys

The deeper difference is that the Polars snippet above never loads the Parquet files into memory as written. `scan_parquet` builds a query plan; `.collect()` hands it to an optimizer that pushes the filter down into the scan, prunes every column the query doesn't touch, and fuses operations before executing them in parallel.

For [vega-lab](/projects/vega-lab) I keep OPRA options data as Parquet. A full day's chain across underlyings runs to millions of quote rows, and most questions touch three or four columns of one underlying. Under the lazy model, the predicate and projection get pushed into the Parquet reader itself: the scan reads a fraction of the file and materializes nothing it doesn't need. In pandas the equivalent is to `read_parquet` the whole thing and then filter, so the intermediate you didn't want becomes the biggest allocation in the pipeline. That's the difference that matters at 100M rows: not that each operation is faster, but that whole intermediates never exist.

## Where pandas still wins

I haven't uninstalled pandas, and won't:

- **The last mile.** For a 500-row result I'm poking at interactively, `df["col"].plot()` and the matplotlib integration are unbeatable, and the index that annoys me in ETL is genuinely useful for labeled time series.
- **Time series conveniences.** `resample`, business-day offsets, and the datetime ergonomics are more mature than the Polars equivalents.
- **The ecosystem's long tail.** statsmodels wants a DataFrame with an index. So does half of the plotting world, and nearly every Stack Overflow answer ever written.

## How I split the work

Polars owns the ETL and every heavy aggregation: anything that scans files, joins large tables, or groups over millions of rows. When the result is small enough to think about, `.to_pandas()` hands it off for plotting and last-mile analysis. The boundary is one method call, which means you don't have to pick a side. You just have to stop doing your 100-million-row joins in the library that was designed around an in-memory index.
