"use client";

import dynamic from "next/dynamic";

const CreditRiskScorer = dynamic(
  () => import("./CreditRiskScorer"),
  {
    ssr: false,
    loading: () => (
      <div className="bg-surface border border-line rounded-sm p-8 flex items-center justify-center h-80 text-muted text-sm">
        Loading credit scorer…
      </div>
    ),
  }
);

export default function CreditRiskScorerClient() {
  return <CreditRiskScorer />;
}
