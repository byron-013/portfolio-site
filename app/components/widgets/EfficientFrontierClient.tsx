"use client";

import dynamic from "next/dynamic";

const EfficientFrontier = dynamic(
  () => import("./EfficientFrontier"),
  {
    ssr: false,
    loading: () => (
      <div className="bg-[#111827] border border-[#1a2235] rounded-lg p-8 flex items-center justify-center h-80 text-[#aab8cc] text-sm">
        Loading interactive frontier…
      </div>
    ),
  }
);

export default function EfficientFrontierClient() {
  return <EfficientFrontier />;
}
