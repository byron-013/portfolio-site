---
title: "Why I reach for Polars over pandas"
description: "For most analytical workloads, the Polars API is closer to SQL than to pandas, and the speed-up is the smaller part of the win."
date: "2026-05-04"
tags: ["python", "data"]
---

> **TODO** — write the post body here. Outline:
>
> - The honest one-liner: Polars is faster, but the API is the reason I switched, not the benchmarks.
> - Show a side-by-side: same query in pandas (chained `.groupby().agg().reset_index().merge()`) vs Polars (one lazy expression that reads like SQL).
> - The lazy `.collect()` model — query optimizer pushes filters down, prunes columns, fuses ops. Why this matters at 100M rows.
> - Where pandas still wins: small data, plotting integration, certain time series operations, the long tail of libraries that expect a `DataFrame`.
> - Pragmatic recommendation: Polars for ETL and heavy aggregations, pandas for the last-mile analytical work where you're poking at a small slice.
