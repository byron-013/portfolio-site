---
title: "Recovering risk-neutral density from option prices"
description: "Breeden-Litzenberger gives you the market's implied distribution over future spot from a strip of vanilla calls. Here's how, and why it's the cleanest way to read sentiment from options."
date: "2026-05-20"
tags: ["options", "quant"]
---

Take a strip of European call prices across strikes at one expiry. Breeden and Litzenberger (1978) showed that the second derivative of that price curve with respect to strike is, up to discounting, the market's probability density for the underlying at expiry:

```
q(K) = e^(rT) · ∂²C/∂K²
```

No model is assumed. Not Black-Scholes, not any parametric distribution, just the absence of arbitrage. Every volatility smile you have ever looked at is a probability distribution wearing a disguise.

## The derivation fits in a paragraph

Buy a call at strike `K − h`, sell two at `K`, buy one at `K + h`. That butterfly pays a tent: zero outside `(K − h, K + h)`, peaking at `h` when spot expires exactly at `K`. Scale the position by `1/h²` and let `h → 0`, and the payoff converges to a spike that pays only when spot lands at `K`. The price of that instrument has to be the discounted probability density at `K`, and the limit of the butterfly's cost divided by `h²` is precisely the second difference of call prices, i.e. `∂²C/∂K²`. The first derivative carries meaning too: `−∂C/∂K` is the price of a digital call, the discounted probability of finishing above `K`.

## Doing it with real quotes

Second-differencing the market prices directly does not work on a real chain. Quotes are noisy, strikes are discretely and unevenly spaced, and the wings trade on wide bid-ask spreads. Differentiation amplifies noise; differentiating twice amplifies it twice. You get a density that oscillates and goes negative.

What works in practice:

1. Fit a smooth volatility curve per expiry. I use eSSVI with butterfly and calendar no-arbitrage penalties, so convexity in price space is enforced by construction.
2. Evaluate the fitted curve on a dense strike grid and convert vols back to call prices.
3. Take second differences of the *smooth* prices.

Convexity is the whole game here. A negative second derivative at some strike is a butterfly arbitrage, and a butterfly arbitrage is exactly a strike where the implied density would be negative. When I ran [vega-lab](/projects/vega-lab)'s arbitrage scanner over a full SPY chain, it flagged 185 butterfly violations in the raw quotes: 185 places where a density read straight off the market would have assigned negative probability. Smoothing is not a cosmetic step; it is the step that imposes "probabilities are nonnegative" on data that doesn't respect it.

One more practical wrinkle: the formula needs consistent forwards and discounting. Getting the forward wrong shifts the whole density. I recover per-expiry forwards from a put-call parity regression weighted by inverse bid-ask spread, which also hands you the discount factor for free.

## What the density actually tells you

On a calm day, the 30-day SPY density looks close to lognormal with the familiar tilt: a fattened left tail, because index puts are structurally bid. Ahead of a CPI print, two things happen. The whole distribution widens, and the left tail widens *more* than the right. Occasionally the shoulders thicken enough that the density starts to look bimodal, with the market pricing "number comes in hot" and "number comes in soft" as distinct scenarios. None of this is visible in a single implied vol number. All of it is visible in `q(K)`.
