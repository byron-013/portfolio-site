"use client";

import dynamic from "next/dynamic";

const EfficientFrontier = dynamic(
  () => import("./EfficientFrontier"),
  {
    ssr: false,
    loading: () => (
      <div className="bg-surface border border-line rounded-sm p-8 flex items-center justify-center h-80 text-muted text-sm">
        Loading interactive frontier…
      </div>
    ),
  }
);

export default function EfficientFrontierClient() {
  return <EfficientFrontier />;
}
