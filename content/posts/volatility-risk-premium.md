---
title: "The volatility risk premium as a tradeable signal"
description: "Implied vol is systematically higher than realized vol. That gap pays sellers of options on average — but the pattern is structural, not free money."
date: "2026-05-12"
tags: ["options", "quant"]
---

> **TODO** — write the post body here. Outline:
>
> - Define VRP: `IV(T) - RV(T)` measured ex-post over a rolling window. Use VIX vs subsequent 30-day realized SPX vol as the canonical pair.
> - Show the empirical: VRP is positive on average, ~3-4 vol points historically.
> - The cleanest expression of the trade — short variance swap, or systematic short straddle with delta hedging.
> - Why it persists: insurance demand, leverage constraints on natural sellers, tail-risk aversion.
> - Why it isn't free: realized drawdowns when the premium does pay out are large (2008, 2020). Sharpe ratios look fine on paper, but the tail is the whole story.
> - One paragraph on how to size the trade — vol-targeting, regime filters, anything that conditions on the *level* of VIX.
