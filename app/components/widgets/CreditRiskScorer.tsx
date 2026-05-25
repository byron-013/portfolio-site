"use client";

import { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import { FEATURES, COEFFICIENTS, INTERCEPT, type CreditFeature } from "@/app/data/creditModel";

const sigmoid = (z: number) => 1 / (1 + Math.exp(-z));

function riskBucket(p: number): { label: string; color: string } {
  if (p < 0.10) return { label: "Very Low", color: "#22c55e" };
  if (p < 0.25) return { label: "Low",      color: "#84cc16" };
  if (p < 0.45) return { label: "Moderate", color: "#eab308" };
  if (p < 0.65) return { label: "High",     color: "#f97316" };
  return         { label: "Very High",      color: "#ef4444" };
}

export default function CreditRiskScorer() {
  const [values, setValues] = useState<Record<string, number>>(() =>
    Object.fromEntries(FEATURES.map((f) => [f.key, f.default]))
  );

  const { probability, contributions, z } = useMemo(() => {
    let zSum = INTERCEPT;
    const contribs = FEATURES.map((f) => {
      const x = (values[f.key] - f.mean) / f.std;
      const beta = COEFFICIENTS[f.key] ?? 0;
      const c = beta * x;
      zSum += c;
      return { feature: f, value: c };
    });
    contribs.sort((a, b) => Math.abs(b.value) - Math.abs(a.value));
    return {
      probability: sigmoid(zSum),
      contributions: contribs,
      z: zSum,
    };
  }, [values]);

  const bucket = riskBucket(probability);
  const maxAbs = Math.max(...contributions.map((c) => Math.abs(c.value)), 0.1);

  const reset = () => setValues(Object.fromEntries(FEATURES.map((f) => [f.key, f.default])));

  return (
    <section className="bg-[#111827] border border-[#1a2235] rounded-lg p-5 md:p-7">
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
        <h3 className="text-[#f0f4ff] font-semibold text-base md:text-lg">
          Live Credit Default Scorer
        </h3>
        <button
          onClick={reset}
          className="text-xs text-[#aab8cc] hover:text-[#d4a853] transition-colors tracking-wide cursor-pointer"
        >
          Reset to baseline
        </button>
      </div>
      <p className="text-[#aab8cc] text-sm mb-6 leading-relaxed">
        Adjust the inputs. The model recomputes the default probability with a logistic regression
        on standardized features, and the contribution bars show how each input is pushing the score
        up (red) or down (green) — the same intuition SHAP gives you on the real trained model.
      </p>

      <div className="grid md:grid-cols-12 gap-6">
        {/* Sliders */}
        <div className="md:col-span-7 flex flex-col gap-4">
          {FEATURES.map((f) => (
            <Slider
              key={f.key}
              feature={f}
              value={values[f.key]}
              onChange={(v) => setValues((s) => ({ ...s, [f.key]: v }))}
            />
          ))}
        </div>

        {/* Output */}
        <div className="md:col-span-5 flex flex-col gap-5">
          <div className="bg-[#0a0f1e] border border-[#1a2235] rounded-lg p-5">
            <p className="text-[#aab8cc] text-[10px] tracking-wider uppercase mb-2">
              Default Probability
            </p>
            <div className="flex items-baseline gap-3 mb-3">
              <span className="text-[#f0f4ff] text-4xl font-bold tabular-nums">
                {(probability * 100).toFixed(1)}%
              </span>
              <span
                className="text-xs font-semibold tracking-wide uppercase px-2 py-0.5 rounded"
                style={{ color: bucket.color, border: `1px solid ${bucket.color}40` }}
              >
                {bucket.label}
              </span>
            </div>
            <div className="h-2 w-full bg-[#1a2235] rounded overflow-hidden">
              <div
                className="h-full transition-all duration-150"
                style={{
                  width: `${probability * 100}%`,
                  background: bucket.color,
                }}
              />
            </div>
            <p className="text-[#aab8cc]/60 text-[10px] mt-2 tabular-nums">
              logit z = {z.toFixed(2)}
            </p>
          </div>

          <div>
            <p className="text-[#aab8cc] text-xs tracking-wide uppercase font-medium mb-2">
              Feature Contributions
            </p>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={contributions.map((c) => ({
                    name: c.feature.label,
                    value: c.value,
                  }))}
                  layout="vertical"
                  margin={{ top: 0, right: 8, bottom: 0, left: 8 }}
                >
                  <XAxis
                    type="number"
                    domain={[-maxAbs * 1.1, maxAbs * 1.1]}
                    hide
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={110}
                    stroke="#64748b"
                    tick={{ fill: "#aab8cc", fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#0a0f1e",
                      border: "1px solid #1a2235",
                      borderRadius: 6,
                      fontSize: 12,
                    }}
                    formatter={(v) => Number(v).toFixed(2)}
                    labelStyle={{ color: "#aab8cc" }}
                  />
                  <ReferenceLine x={0} stroke="#475569" strokeWidth={1} />
                  <Bar dataKey="value" isAnimationActive={false} radius={[0, 2, 2, 0]}>
                    {contributions.map((c, i) => (
                      <Cell
                        key={i}
                        fill={c.value > 0 ? "#ef4444" : "#22c55e"}
                        fillOpacity={0.85}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex gap-5 mt-2 text-[10px] text-[#aab8cc]">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-sm bg-[#ef4444]" /> pushes default up
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-sm bg-[#22c55e]" /> pushes default down
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Slider({
  feature,
  value,
  onChange,
}: {
  feature: CreditFeature;
  value: number;
  onChange: (v: number) => void;
}) {
  const display = feature.format ? feature.format(value) : `${value} ${feature.unit}`;
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <label htmlFor={feature.key} className="text-[#aab8cc] text-xs tracking-wide font-medium">
          {feature.label}
        </label>
        <span className="text-[#f0f4ff] text-sm font-semibold tabular-nums">{display}</span>
      </div>
      <input
        id={feature.key}
        type="range"
        min={feature.min}
        max={feature.max}
        step={feature.step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-[#d4a853] cursor-pointer"
      />
    </div>
  );
}
