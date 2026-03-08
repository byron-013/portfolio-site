"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center px-6 max-w-6xl mx-auto pt-16"
    >
      <div className="max-w-3xl">
        <p className="text-[#c9a84c] text-sm tracking-[0.2em] uppercase mb-4 font-medium">
          UC Berkeley — Applied Mathematics
        </p>
        <h1 className="text-5xl md:text-7xl font-bold text-[#f0f4ff] leading-tight tracking-tight mb-6">
          Byron Delaney Jr
        </h1>
        <h2 className="text-xl md:text-2xl text-[#94a3b8] font-light mb-6 tracking-wide">
          Quantitative Finance &amp; Data Science
        </h2>
        <p className="text-base md:text-lg text-[#cbd5e1] max-w-xl leading-relaxed mb-10">
          Turning complex data into financial insight. I build end-to-end quantitative systems — from credit risk models and portfolio optimizers to statistical algorithms grounded in applied mathematics.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="https://github.com/byron-013"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-[#c9a84c] text-[#0a0f1e] font-semibold rounded hover:bg-[#e8c97e] transition-all duration-200 text-sm tracking-wide"
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
            className="flex items-center gap-2 px-6 py-3 border border-[#c9a84c] text-[#c9a84c] font-semibold rounded hover:bg-[#c9a84c] hover:text-[#0a0f1e] transition-all duration-200 text-sm tracking-wide"
          >
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
          <Link
            href="/projects"
            className="flex items-center gap-2 px-6 py-3 text-[#94a3b8] hover:text-[#f0f4ff] transition-colors duration-200 text-sm tracking-wide"
          >
            View Projects
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
