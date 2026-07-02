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

// Bucket colors are text-role colors — each clears WCAG 4.5:1 on the card surface.
function riskBucket(p: number): { label: string; color: string } {
  if (p < 0.10) return { label: "Very Low", color: "#15803d" };
  if (p < 0.25) return { label: "Low",      color: "#4d7c0f" };
  if (p < 0.45) return { label: "Moderate", color: "#a16207" };
  if (p < 0.65) return { label: "High",     color: "#c2410c" };
  return         { label: "Very High",      color: "#b91c1c" };
}

// Diverging pair for the contribution bars — validated for CVD separation;
// the sign is also encoded by position around the zero line.
const UP = "#c2410c";
const DOWN = "#15803d";

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
    <section className="bg-surface border border-line rounded-sm p-5 md:p-7">
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
        <h3 className="font-display text-ink font-semibold text-base md:text-lg">
          Live Credit Default Scorer
        </h3>
        <button
          onClick={reset}
          className="font-mono text-xs text-muted hover:text-accent transition-colors tracking-wide cursor-pointer"
        >
          Reset to baseline
        </button>
      </div>
      <p className="text-body text-sm mb-6 leading-relaxed">
        Adjust the inputs. The model recomputes the default probability with a logistic regression
        on standardized features, and the contribution bars show how each input is pushing the score
        up (rust) or down (green) — the same intuition SHAP gives you on the real trained model.
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
          <div className="bg-paper border border-line rounded-sm p-5">
            <p className="font-mono text-muted text-[10px] tracking-wider uppercase mb-2">
              Default Probability
            </p>
            <div className="flex items-baseline gap-3 mb-3">
              <span className="font-mono text-ink text-4xl font-semibold tabular-nums">
                {(probability * 100).toFixed(1)}%
              </span>
              <span
                className="font-mono text-xs font-semibold tracking-wide uppercase px-2 py-0.5 rounded-sm"
                style={{ color: bucket.color, border: `1px solid ${bucket.color}55` }}
              >
                {bucket.label}
              </span>
            </div>
            <div className="h-2 w-full bg-line rounded-sm overflow-hidden">
              <div
                className="h-full transition-all duration-150"
                style={{
                  width: `${probability * 100}%`,
                  background: bucket.color,
                }}
              />
            </div>
            <p className="font-mono text-muted/70 text-[10px] mt-2 tabular-nums">
              logit z = {z.toFixed(2)}
            </p>
          </div>

          <div>
            <p className="font-mono text-muted text-xs tracking-wide uppercase mb-2">
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
                    stroke="#59635a"
                    tick={{ fill: "#59635a", fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#f7f4e8",
                      border: "1px solid #dbd6c2",
                      borderRadius: 4,
                      fontSize: 12,
                    }}
                    formatter={(v) => Number(v).toFixed(2)}
                    labelStyle={{ color: "#59635a" }}
                  />
                  <ReferenceLine x={0} stroke="#c2bba3" strokeWidth={1} />
                  <Bar dataKey="value" isAnimationActive={false} radius={[0, 2, 2, 0]}>
                    {contributions.map((c, i) => (
                      <Cell
                        key={i}
                        fill={c.value > 0 ? UP : DOWN}
                        fillOpacity={0.9}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex gap-5 mt-2 font-mono text-[10px] text-body">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-sm bg-neg" /> pushes default up
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-sm bg-pos" /> pushes default down
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
        <label htmlFor={feature.key} className="text-body text-xs tracking-wide font-medium">
          {feature.label}
        </label>
        <span className="font-mono text-ink text-sm font-semibold tabular-nums">{display}</span>
      </div>
      <input
        id={feature.key}
        type="range"
        min={feature.min}
        max={feature.max}
        step={feature.step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-accent cursor-pointer"
      />
    </div>
  );
}
