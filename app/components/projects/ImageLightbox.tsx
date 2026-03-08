"use client";

import { useEffect, useCallback } from "react";

type Props = {
  src: string;
  alt: string;
  onClose: () => void;
};

export default function ImageLightbox({ src, alt, onClose }: Props) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-[#94a3b8] hover:text-[#f0f4ff] transition-colors flex items-center gap-1.5 text-sm"
          aria-label="Close"
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Close (Esc)
        </button>

        {/* Image */}
        <img
          src={src}
          alt={alt}
          className="max-h-[82vh] w-auto max-w-full rounded-lg shadow-2xl object-contain"
        />

        {/* Caption */}
        <p className="mt-3 text-[#94a3b8] text-sm text-center">{alt}</p>
      </div>
    </div>
  );
}
