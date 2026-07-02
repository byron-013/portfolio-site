"use client";

import dynamic from "next/dynamic";

const EfficientFrontierPreview = dynamic(
  () => import("./EfficientFrontierPreview"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-surface border border-line rounded-sm" />
    ),
  }
);

export default function EfficientFrontierPreviewClient() {
  return <EfficientFrontierPreview />;
}
