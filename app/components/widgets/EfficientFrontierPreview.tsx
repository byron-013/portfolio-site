"use client";

import { useMemo } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { EXPECTED_RETURNS, COV_MATRIX, RISK_FREE_RATE_DEFAULT } from "@/app/data/portfolio";

const N = EXPECTED_RETURNS.length;
const N_PREVIEW = 1200;

function dot(a: number[], b: number[]) {
  let s = 0;
  for (let i = 0; i < a.length; i++) s += a[i] * b[i];
  return s;
}
function matVec(A: number[][], v: number[]) {
  return A.map((row) => dot(row, v));
}
function invert(M: number[][]) {
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
      const f = A[k][i];
      for (let j = 0; j < 2 * n; j++) A[k][j] -= f * A[i][j];
    }
  }
  return A.map((row) => row.slice(n));
}
function randomDirichlet(n: number) {
  const raw = Array.from({ length: n }, () => -Math.log(Math.random() || 1e-12));
  const s = raw.reduce((a, b) => a + b, 0);
  return raw.map((x) => x / s);
}

export default function EfficientFrontierPreview() {
  const { cloud, mv, ms } = useMemo(() => {
    const points: { vol: number; ret: number }[] = [];
    for (let i = 0; i < N_PREVIEW; i++) {
      const w = randomDirichlet(N);
      const ret = dot(w, EXPECTED_RETURNS);
      const variance = dot(w, matVec(COV_MATRIX, w));
      points.push({ vol: Math.sqrt(Math.max(variance, 0)), ret });
    }
    const inv = invert(COV_MATRIX);
    const ones = Array(N).fill(1);
    const rawMV = matVec(inv, ones);
    const sMV = rawMV.reduce((a, b) => a + b, 0);
    const wMV = rawMV.map((x) => x / sMV).map((x) => Math.max(x, 0));
    const sMVc = wMV.reduce((a, b) => a + b, 0);
    const mvW = wMV.map((x) => x / sMVc);
    const mvVar = dot(mvW, matVec(COV_MATRIX, mvW));
    const mvPoint = { vol: Math.sqrt(Math.max(mvVar, 0)), ret: dot(mvW, EXPECTED_RETURNS) };

    const excess = EXPECTED_RETURNS.map((m) => m - RISK_FREE_RATE_DEFAULT);
    const rawMS = matVec(inv, excess);
    const sMS = rawMS.reduce((a, b) => a + b, 0);
    const wMS = rawMS.map((x) => x / sMS).map((x) => Math.max(x, 0));
    const sMSc = wMS.reduce((a, b) => a + b, 0);
    const msW = wMS.map((x) => x / sMSc);
    const msVar = dot(msW, matVec(COV_MATRIX, msW));
    const msPoint = { vol: Math.sqrt(Math.max(msVar, 0)), ret: dot(msW, EXPECTED_RETURNS) };

    return { cloud: points, mv: mvPoint, ms: msPoint };
  }, []);

  return (
    <div className="relative w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
          <XAxis type="number" dataKey="vol" hide domain={["dataMin - 0.005", "dataMax + 0.005"]} />
          <YAxis type="number" dataKey="ret" hide domain={["dataMin - 0.01", "dataMax + 0.01"]} />
          <Scatter data={cloud} fill="#82897f" fillOpacity={0.45} shape="circle" />
          <Scatter data={[mv]} fill="#2a78d6" shape="circle" />
          <Scatter data={[ms]} fill="#0a8547" shape="circle" />
        </ScatterChart>
      </ResponsiveContainer>
      <div className="absolute bottom-1 left-2 font-mono text-[10px] text-muted/80 tracking-wide pointer-events-none">
        Efficient frontier · live in your browser
      </div>
    </div>
  );
}
