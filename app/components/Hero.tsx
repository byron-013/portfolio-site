"use client";

import Link from "next/link";
import EfficientFrontierPreviewClient from "./widgets/EfficientFrontierPreviewClient";

const stats = [
  { value: "0.788", label: "AUC — credit default model" },
  { value: "8.2M", label: "options contracts/sec, C++ solver" },
  { value: "5,000", label: "Monte Carlo portfolios mapped" },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-6 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto w-full pt-24 pb-16">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-7 max-w-3xl">
            <p className="anim-fade-in font-mono text-accent text-xs tracking-[0.18em] uppercase mb-5">
              UC Berkeley · Applied Mathematics
            </p>
            <h1 className="anim-fade-in anim-delay-1 font-display text-5xl md:text-7xl font-semibold text-ink leading-[1.05] tracking-tight mb-5">
              Byron Delaney Jr
            </h1>
            <h2 className="anim-fade-in anim-delay-2 font-display italic text-xl md:text-2xl text-accent mb-6">
              Quantitative finance &amp; data science
            </h2>
            <p className="anim-fade-in anim-delay-3 text-base md:text-lg text-body max-w-xl leading-relaxed mb-10">
              Software Solutions Architect at MaritAIme, where I design the data
              pipelines behind maritime analytics. I build quantitative systems end
              to end — credit risk models, portfolio optimizers, options analytics —
              grounded in applied mathematics.
            </p>
            <div className="anim-fade-in anim-delay-4 flex flex-wrap items-center gap-4">
              <a
                href="https://github.com/byron-013"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-accent text-paper font-medium rounded-sm hover:bg-accent-deep transition-colors duration-200 text-sm tracking-wide"
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/byron13"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 border border-ink/25 text-ink font-medium rounded-sm hover:border-accent hover:text-accent transition-colors duration-200 text-sm tracking-wide"
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 text-muted hover:text-accent transition-colors duration-200 text-sm tracking-wide"
              >
                Resume
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
                </svg>
              </a>
              <Link
                href="/projects"
                className="flex items-center gap-2 px-4 py-3 text-muted hover:text-accent transition-colors duration-200 text-sm tracking-wide"
              >
                View Projects
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Proof points */}
            <div className="anim-fade-in anim-delay-5 mt-12 pt-7 border-t border-line flex flex-wrap gap-x-12 gap-y-5">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-mono text-ink text-xl font-semibold tabular-nums leading-none mb-1.5">
                    {s.value}
                  </p>
                  <p className="text-muted text-xs tracking-wide">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-5 anim-fade-in anim-delay-3">
            <figure>
              <div className="bg-surface border border-line rounded-sm p-3 h-72">
                <EfficientFrontierPreviewClient />
              </div>
              <figcaption className="font-mono text-muted text-[11px] tracking-wide mt-2.5 pl-1">
                Fig. 01 — Efficient frontier, 1,200 portfolios simulated in-browser
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
