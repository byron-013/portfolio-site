import Link from "next/link";
import { projects } from "@/app/lib/projects";

export default function Featured() {
  const featured = projects.filter((p) => p.caseStudy);

  return (
    <section id="featured" className="py-28 px-6 bg-surface border-y border-line">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-accent text-xs tracking-[0.18em] uppercase mb-3">
          01 / Selected Work
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink mb-3 leading-tight">
          Case studies, with the models running live
        </h2>
        <p className="text-body mb-14 max-w-2xl leading-relaxed">
          Three projects written up end to end — problem, approach, decision,
          result. Two include interactive models that compute in your browser.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((p) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className="group bg-paper border border-line rounded-sm p-6 flex flex-col hover:border-accent/50 hover:shadow-md transition-all duration-300"
            >
              <div className="flex flex-wrap gap-1.5 mb-4">
                {p.interactiveWidget && (
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] px-2 py-0.5 rounded-sm bg-accent/5 text-accent tracking-wide border border-accent/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-data-green animate-pulse" />
                    LIVE DEMO
                  </span>
                )}
                <span className="inline-block font-mono text-[10px] px-2 py-0.5 rounded-sm text-muted tracking-wide border border-line-strong">
                  CASE STUDY
                </span>
              </div>

              <h3 className="font-display text-ink font-semibold text-lg mb-2 leading-snug group-hover:text-accent transition-colors duration-300">
                {p.title}
              </h3>
              <p className="text-body text-sm leading-relaxed mb-5 flex-1">
                {p.tagline}
              </p>

              <span className="inline-flex items-center gap-2 text-xs text-accent font-medium tracking-wide mt-auto">
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
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors duration-200 tracking-wide"
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
