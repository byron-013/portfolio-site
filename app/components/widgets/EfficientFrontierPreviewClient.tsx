"use client";

import dynamic from "next/dynamic";

const EfficientFrontierPreview = dynamic(
  () => import("./EfficientFrontierPreview"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-[#111827]/40 border border-[#1a2235] rounded-lg" />
    ),
  }
);

export default function EfficientFrontierPreviewClient() {
  return <EfficientFrontierPreview />;
}
