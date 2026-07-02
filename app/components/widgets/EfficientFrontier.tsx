"use client";

import { useMemo, useState } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  LabelList,
} from "recharts";
import {
  TICKERS,
  EXPECTED_RETURNS,
  COV_MATRIX,
  RISK_FREE_RATE_DEFAULT,
  NUM_MONTE_CARLO,
} from "@/app/data/portfolio";

// Chart palette — validated for CVD separation and contrast on the card surface.
const C = {
  cloud: "#82897f",
  minVar: "#2a78d6",
  maxSharpe: "#0a8547",
  grid: "#e4e0d1",
  tick: "#616b61",
  tooltipBg: "#fffef9",
  tooltipBorder: "#e4e0d1",
  accent: "#175d41",
  zeroBar: "#e4e0d1",
};

const N = TICKERS.length;

function dot(a: number[], b: number[]): number {
  let s = 0;
  for (let i = 0; i < a.length; i++) s += a[i] * b[i];
  return s;
}

function matVec(A: number[][], v: number[]): number[] {
  return A.map((row) => dot(row, v));
}

function invert(M: number[][]): number[][] {
  const n = M.length;
  const A: number[][] = M.map((row, i) => [
    ...row,
    ...Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)),
  ]);
  for (let i = 0; i < n; i++) {
    let pivot = A[i][i];
    if (Math.abs(pivot) < 1e-12) {
      for (let k = i + 1; k < n; k++) {
        if (Math.abs(A[k][i]) > 1e-12) {
          [A[i], A[k]] = [A[k], A[i]];
          pivot = A[i][i];
          break;
        }
      }
    }
    for (let j = 0; j < 2 * n; j++) A[i][j] /= pivot;
    for (let k = 0; k < n; k++) {
      if (k === i) continue;
      const factor = A[k][i];
      for (let j = 0; j < 2 * n; j++) A[k][j] -= factor * A[i][j];
    }
  }
  return A.map((row) => row.slice(n));
}

function randomDirichlet(n: number): number[] {
  const raw = Array.from({ length: n }, () => -Math.log(Math.random() || 1e-12));
  const s = raw.reduce((a, b) => a + b, 0);
  return raw.map((x) => x / s);
}

function portfolioStats(
  weights: number[],
  mu: number[],
  cov: number[][]
): { ret: number; vol: number } {
  const ret = dot(weights, mu);
  const v = matVec(cov, weights);
  const variance = dot(weights, v);
  return { ret, vol: Math.sqrt(Math.max(variance, 0)) };
}

function maxSharpeWeights(
  mu: number[],
  invCov: number[][],
  rf: number
): number[] {
  const excess = mu.map((m) => m - rf);
  const raw = matVec(invCov, excess);
  const sumRaw = raw.reduce((a, b) => a + b, 0);
  if (Math.abs(sumRaw) < 1e-12) return Array(mu.length).fill(1 / mu.length);
  const w = raw.map((x) => x / sumRaw);
  // Clip negatives (no shorting) and renormalize for a cleaner long-only display.
  const clipped = w.map((x) => Math.max(x, 0));
  const sc = clipped.reduce((a, b) => a + b, 0);
  return sc > 0 ? clipped.map((x) => x / sc) : Array(mu.length).fill(1 / mu.length);
}

function minVarianceWeights(invCov: number[][]): number[] {
  const ones = Array(invCov.length).fill(1);
  const raw = matVec(invCov, ones);
  const s = raw.reduce((a, b) => a + b, 0);
  const w = raw.map((x) => x / s);
  const clipped = w.map((x) => Math.max(x, 0));
  const sc = clipped.reduce((a, b) => a + b, 0);
  return sc > 0 ? clipped.map((x) => x / sc) : Array(invCov.length).fill(1 / invCov.length);
}

const pct = (x: number, digits = 1) => `${(x * 100).toFixed(digits)}%`;

export default function EfficientFrontier() {
  const [rfPct, setRfPct] = useState<number>(RISK_FREE_RATE_DEFAULT * 100);

  const { cloud, invCov, minVarStats } = useMemo(() => {
    const inv = invert(COV_MATRIX);
    const points: { vol: number; ret: number; sharpe: number }[] = [];
    for (let i = 0; i < NUM_MONTE_CARLO; i++) {
      const w = randomDirichlet(N);
      const { ret, vol } = portfolioStats(w, EXPECTED_RETURNS, COV_MATRIX);
      const sharpe = vol > 0 ? (ret - RISK_FREE_RATE_DEFAULT) / vol : 0;
      points.push({ vol, ret, sharpe });
    }
    const mv = minVarianceWeights(inv);
    const mvStats = portfolioStats(mv, EXPECTED_RETURNS, COV_MATRIX);
    return {
      cloud: points,
      invCov: inv,
      minVarStats: mvStats,
    };
  }, []);

  const rf = rfPct / 100;

  const { maxSharpe, maxSharpeStats, sharpe } = useMemo(() => {
    const w = maxSharpeWeights(EXPECTED_RETURNS, invCov, rf);
    const stats = portfolioStats(w, EXPECTED_RETURNS, COV_MATRIX);
    const s = stats.vol > 0 ? (stats.ret - rf) / stats.vol : 0;
    return { maxSharpe: w, maxSharpeStats: stats, sharpe: s };
  }, [invCov, rf]);

  const weightsData = TICKERS.map((t, i) => ({
    ticker: t,
    weight: maxSharpe[i],
  }));

  return (
    <section className="bg-surface border border-line rounded-sm p-5 md:p-7">
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
        <h3 className="font-display text-ink font-semibold text-base md:text-lg">
          Live Efficient Frontier
        </h3>
        <span className="font-mono text-muted text-xs tracking-wide">
          {NUM_MONTE_CARLO.toLocaleString()} Monte Carlo portfolios · {TICKERS.length} assets
        </span>
      </div>
      <p className="text-body text-sm mb-6 leading-relaxed">
        Every dot is a random long-only portfolio of the 8 assets. The green dot is the analytical
        max-Sharpe portfolio at the chosen risk-free rate; the blue dot is the min-variance portfolio.
        Math runs in your browser.
      </p>

      <div className="grid md:grid-cols-12 gap-6">
        <div className="md:col-span-7">
          <div className="h-72 md:h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 10, bottom: 8, left: -8 }}>
                <CartesianGrid stroke={C.grid} strokeDasharray="2 4" />
                <XAxis
                  type="number"
                  dataKey="vol"
                  name="Volatility"
                  tickFormatter={(v) => pct(v, 0)}
                  stroke={C.tick}
                  tick={{ fill: C.tick, fontSize: 11 }}
                  domain={["dataMin - 0.005", "dataMax + 0.005"]}
                >
                </XAxis>
                <YAxis
                  type="number"
                  dataKey="ret"
                  name="Return"
                  tickFormatter={(v) => pct(v, 0)}
                  stroke={C.tick}
                  tick={{ fill: C.tick, fontSize: 11 }}
                  domain={["dataMin - 0.01", "dataMax + 0.01"]}
                >
                </YAxis>
                <Tooltip
                  cursor={{ stroke: C.accent, strokeWidth: 1, strokeDasharray: "3 3" }}
                  contentStyle={{
                    background: C.tooltipBg,
                    border: `1px solid ${C.tooltipBorder}`,
                    borderRadius: 4,
                    fontSize: 12,
                  }}
                  labelStyle={{ color: C.tick }}
                  formatter={(value, name) => [pct(Number(value), 2), String(name)]}
                />
                <Scatter name="Random" data={cloud} fill={C.cloud} fillOpacity={0.45} shape="circle" />
                <Scatter
                  name="Min variance"
                  data={[minVarStats]}
                  fill={C.minVar}
                  shape="circle"
                />
                <Scatter
                  name="Max Sharpe"
                  data={[maxSharpeStats]}
                  fill={C.maxSharpe}
                  shape="circle"
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mt-3 text-xs text-body">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#82897f]" /> Random portfolios
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-data-blue" /> Min variance
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-data-green" /> Max Sharpe (selected)
            </span>
          </div>
        </div>

        <div className="md:col-span-5 flex flex-col gap-5">
          <div>
            <div className="flex items-baseline justify-between mb-2">
              <label htmlFor="rf-slider" className="font-mono text-muted text-xs tracking-wide uppercase">
                Risk-Free Rate
              </label>
              <span className="font-mono text-accent text-sm font-semibold tabular-nums">
                {rfPct.toFixed(1)}%
              </span>
            </div>
            <input
              id="rf-slider"
              type="range"
              min={0}
              max={5}
              step={0.1}
              value={rfPct}
              onChange={(e) => setRfPct(parseFloat(e.target.value))}
              className="w-full accent-accent cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="bg-paper border border-line rounded-sm p-3">
              <p className="font-mono text-muted text-[10px] tracking-wider uppercase mb-1">Return</p>
              <p className="font-mono text-accent text-lg font-semibold tabular-nums">{pct(maxSharpeStats.ret, 1)}</p>
            </div>
            <div className="bg-paper border border-line rounded-sm p-3">
              <p className="font-mono text-muted text-[10px] tracking-wider uppercase mb-1">Vol</p>
              <p className="font-mono text-ink text-lg font-semibold tabular-nums">{pct(maxSharpeStats.vol, 1)}</p>
            </div>
            <div className="bg-paper border border-line rounded-sm p-3">
              <p className="font-mono text-muted text-[10px] tracking-wider uppercase mb-1">Sharpe</p>
              <p className="font-mono text-ink text-lg font-semibold tabular-nums">{sharpe.toFixed(2)}</p>
            </div>
          </div>

          <div>
            <p className="font-mono text-muted text-xs tracking-wide uppercase mb-2">
              Optimal Weights
            </p>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weightsData} layout="vertical" margin={{ top: 0, right: 36, bottom: 0, left: 8 }}>
                  <XAxis type="number" hide domain={[0, 1]} />
                  <YAxis
                    type="category"
                    dataKey="ticker"
                    width={48}
                    stroke={C.tick}
                    tick={{ fill: C.tick, fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: C.tooltipBg,
                      border: `1px solid ${C.tooltipBorder}`,
                      borderRadius: 4,
                      fontSize: 12,
                    }}
                    formatter={(value) => pct(Number(value), 1)}
                  />
                  <Bar dataKey="weight" fill={C.maxSharpe} radius={[0, 2, 2, 0]} isAnimationActive={false}>
                    {weightsData.map((_, i) => (
                      <Cell key={i} fill={weightsData[i].weight < 0.005 ? C.zeroBar : C.maxSharpe} />
                    ))}
                    <LabelList
                      dataKey="weight"
                      position="right"
                      formatter={(v) => pct(Number(v), 1)}
                      fill={C.tick}
                      fontSize={11}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
