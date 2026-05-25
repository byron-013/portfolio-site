---
title: "Recovering risk-neutral density from option prices"
description: "Breeden-Litzenberger gives you the market's implied distribution over future spot from a strip of vanilla calls. Here's how, and why it's the cleanest way to read sentiment from options."
date: "2026-05-20"
tags: ["options", "quant"]
---

> **TODO** — write the post body here. Outline:
>
> - State the result: the risk-neutral density `q(K)` equals the second derivative of the call price with respect to strike, discounted by `e^{rT}`.
> - Walk through the derivation in one short paragraph (twin digital → butterfly limit).
> - Show what a real numerical estimate looks like — finite-difference the IV surface, convert to price space, take the second difference. Mention smoothing.
> - One concrete example: SPY 30d density on a calm day vs a CPI day, and what that tells you about tail pricing.
> - End with the caveat: this is the *risk-neutral* density, not the physical one. The difference is the variance risk premium — which is the topic of the next post.
