---
title: "The volatility risk premium as a tradeable signal"
description: "Implied vol is systematically higher than realized vol. That gap pays sellers of options on average, but the pattern is structural, not free money."
date: "2026-05-12"
tags: ["options", "quant"]
---

Define the variance risk premium ex post:

```
VRP(t) = IV(t, 30d) − RV(t → t+30d)
```

Today's 30-day implied vol minus the vol that was actually realized over the following 30 days. The canonical pair is the VIX against subsequent 21-trading-day realized S&P 500 volatility, since the VIX is itself a model-free variance swap rate quoted in vol units.

Measured that way, the premium is positive on average and has been for as long as we have index options data, on the order of 3-4 vol points. The VIX has averaged around 19-20 over the long run; subsequent realized vol has averaged closer to 15-16. The market persistently pays more for variance than it subsequently receives, and the sign of that gap holds in the large majority of months. The exceptions cluster exactly where you would expect: months containing a vol shock nobody priced.

## The clean expression of the trade

The purest way to collect the premium is a short variance swap: you receive the implied variance strike and pay realized variance, with no delta or path dependence to manage. The retail-tractable version is a short ATM straddle, delta-hedged daily. Hedging the deltas strips out the directional exposure and leaves you with the gamma/vega P&L, which is the implied-minus-realized gap plus noise. Either way the position is short convexity: you collect a steady premium and are on the hook when realized variance spikes.

The implied leg is computable from any liquid chain, not just the S&P. The standard construction integrates OTM option prices across strikes, the same trapezoidal integration the VIX uses, and it is one of the eight per-tenor diagnostics [vega-lab](/projects/vega-lab) computes. That means you can measure the premium per-name, per-tenor, and watch how it moves around events.

## Why it persists

A premium this stable, this public, and this old is not an inefficiency waiting to be arbitraged away. It persists for structural reasons:

- **Insurance demand.** Institutions with mandated downside protection buy index puts more or less price-insensitively. Somebody has to sell them, and sellers charge for it.
- **Constrained natural sellers.** Short vol has brutal drawdown properties, and the entities best positioned to warehouse that risk face leverage limits, VaR limits, and career risk. Constrained supply and steady demand mean a premium clears the market.
- **The payoff profile deserves a premium.** Short volatility loses precisely in the states where everything else in the portfolio is also losing and marginal utility is highest. An asset that pays off in good times and blows up in disasters *should* carry positive expected return. That's not mispricing; that's the price of the covariance.

## Why it isn't free money

The return distribution of a short vol position is the mirror image of a lottery ticket: many small gains, occasional catastrophic losses. February 2018 vaporized the XIV ETN, down roughly 96% in a single session, after years of it printing money. March 2020 took the VIX above 80. In both cases the strategy's prior years of premium were an advance payment on exactly that event. An unconditional short-vol Sharpe ratio looks respectable on paper, but the paper conceals that the losses arrive correlated, levered, and all at once. The tail is not a footnote to the strategy; the tail *is* the strategy.

## Sizing is the whole edge

If there is skill in this trade, it lives in position sizing, not in the signal. The signal is public.

- **Vol-target the position.** Scale exposure inversely with current vol so that a vol spike shrinks the position mechanically rather than after a margin call.
- **Condition on the term structure.** VIX futures in contango, the normal state, is when carry favors the short. Backwardation is the market telling you realized is running above implied right now.
- **Be suspicious of conditioning on level.** Selling when the VIX is "high" backtests beautifully and is exactly how you end up short vol in the first week of a crisis. High implied vol usually is high for a reason.
- **Pay for a wing.** Capping the tail with far OTM protection gives back some premium, and deciding how much to give back is the real design decision.

Every filter improves the backtest. None of them changes the nature of the position: the premium is compensation for the risk that remains after all your filters, and collecting it means genuinely carrying that risk.
