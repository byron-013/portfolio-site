"use client";

import { useState } from "react";
import ImageLightbox from "./ImageLightbox";

type GalleryItem = {
  label: string;
  sublabel: string;
  imagePath?: string;
};

type Props = {
  items: GalleryItem[];
};

export default function ProjectGallery({ items }: Props) {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, i) => (
          <div
            key={i}
            className={`aspect-video bg-[#111827] border border-dashed border-[#1a2235] rounded-lg flex flex-col items-center justify-center gap-3 p-2 transition-all duration-200 overflow-hidden ${
              item.imagePath
                ? "cursor-zoom-in hover:border-[#c9a84c]/40 hover:shadow-[0_0_20px_rgba(201,168,76,0.08)] group"
                : "hover:border-[#c9a84c]/20"
            }`}
            onClick={() =>
              item.imagePath &&
              setLightbox({ src: item.imagePath, alt: item.label })
            }
          >
            {item.imagePath ? (
              <div className="relative w-full h-full">
                <img
                  src={item.imagePath}
                  alt={item.label}
                  className="w-full h-full object-contain rounded"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200 rounded flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-[#0a0f1e]/80 rounded-full p-2">
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#c9a84c" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1a2235"
                  strokeWidth={1.5}
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 15l-5-5L5 21" />
                </svg>
                <div className="text-center">
                  <p className="text-[#94a3b8] text-sm font-medium">{item.label}</p>
                  <p className="text-[#94a3b8]/50 text-xs mt-1">{item.sublabel}</p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Caption row */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
        {items.map((item, i) =>
          item.imagePath ? (
            <p key={i} className="text-[#94a3b8]/60 text-xs text-center px-1">
              {item.label} — {item.sublabel}
            </p>
          ) : null
        )}
      </div>

      {lightbox && (
        <ImageLightbox
          src={lightbox.src}
          alt={lightbox.alt}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  );
}
