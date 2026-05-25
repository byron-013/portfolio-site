import Link from "next/link";
import { projects } from "@/app/lib/projects";

export default function Featured() {
  const featured = projects.filter((p) => p.caseStudy);

  return (
    <section id="featured" className="py-28 px-6 bg-[#090d1a]">
      <div className="max-w-6xl mx-auto">
        <p className="text-[#d4a853] text-xs tracking-[0.2em] uppercase mb-3 font-medium">Featured</p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#f0f4ff] mb-3 leading-tight">
          Live, Interactive Demos
        </h2>
        <p className="text-[#b4c0d4] mb-14 max-w-2xl leading-relaxed">
          Three projects with a complete narrative (problem, approach, decision, result) and — for two of them — a widget you can drag right in your browser. The math runs client-side.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((p) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className="group bg-[#111827] border border-[#1a2235] rounded-lg p-6 flex flex-col hover:border-[#d4a853]/40 hover:shadow-[0_8px_32px_rgba(212,168,83,0.12)] hover:-translate-y-2 transition-all duration-300"
            >
              <div className="flex flex-wrap gap-1.5 mb-4">
                {p.interactiveWidget && (
                  <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-[#22d3ee]/10 text-[#67e8f9] font-semibold tracking-wide border border-[#22d3ee]/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22d3ee] animate-pulse" />
                    LIVE DEMO
                  </span>
                )}
                <span className="inline-block text-[10px] px-2 py-0.5 rounded bg-[#d4a853]/10 text-[#d4a853] font-semibold tracking-wide border border-[#d4a853]/30">
                  CASE STUDY
                </span>
              </div>

              <h3 className="text-[#f0f4ff] font-semibold text-lg mb-2 leading-snug group-hover:text-[#d4a853] transition-colors duration-300">
                {p.title}
              </h3>
              <p className="text-[#aab8cc] text-sm leading-relaxed mb-5 flex-1">
                {p.tagline}
              </p>

              <span className="inline-flex items-center gap-2 text-xs text-[#d4a853] font-semibold tracking-wide mt-auto">
                Read the case study
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-[#aab8cc] hover:text-[#d4a853] transition-colors duration-200 tracking-wide"
          >
            All projects
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
