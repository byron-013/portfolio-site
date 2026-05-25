"use client";

import dynamic from "next/dynamic";

const CreditRiskScorer = dynamic(
  () => import("./CreditRiskScorer"),
  {
    ssr: false,
    loading: () => (
      <div className="bg-[#111827] border border-[#1a2235] rounded-lg p-8 flex items-center justify-center h-80 text-[#aab8cc] text-sm">
        Loading credit scorer…
      </div>
    ),
  }
);

export default function CreditRiskScorerClient() {
  return <CreditRiskScorer />;
}
