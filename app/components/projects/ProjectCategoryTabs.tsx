"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { projectCategories, projects, type ProjectCategory } from "@/app/lib/projects";

type Props = {
  defaultCategory: string | null;
};

export default function ProjectCategoryTabs({ defaultCategory }: Props) {
  const router = useRouter();
  const [active, setActive] = useState<string>(defaultCategory ?? "all");

  const handleTab = (id: string) => {
    setActive(id);
    if (id === "all") {
      router.push("/projects", { scroll: false });
    } else {
      router.push(`/projects?category=${id}`, { scroll: false });
    }
  };

  const filtered =
    active === "all"
      ? projects
      : projects.filter((p) => p.category === active);

  const categoryLabel = projectCategories.find((c) => c.id === active)?.label ?? "All Projects";

  return (
    <div>
      {/* Tab bar */}
      <div className="flex flex-wrap gap-1 border-b border-[#1a2235] mb-10">
        {projectCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleTab(cat.id)}
            className={`px-4 py-3 text-sm font-medium tracking-wide transition-all duration-200 border-b-2 -mb-px ${
              active === cat.id
                ? "text-[#c9a84c] border-[#c9a84c]"
                : "text-[#94a3b8] border-transparent hover:text-[#f0f4ff]"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Project cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((project, i) => (
          <div
            key={project.slug}
            className="bg-[#111827] border border-[#1a2235] rounded-lg p-6 flex flex-col hover:border-[#d4a853]/40 hover:shadow-[0_8px_32px_rgba(212,168,83,0.12)] hover:-translate-y-2 transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-4">
              <span className="text-[#d4a853]/50 group-hover:text-[#d4a853]/80 text-4xl font-bold leading-none select-none transition-colors duration-300">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-xs px-2 py-1 rounded bg-[#d4a853]/10 text-[#d4a853] font-medium tracking-wide border border-[#d4a853]/20">
                {projectCategories.find((c) => c.id === project.category)?.label}
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-3">
              {project.interactiveWidget && (
                <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-[#22d3ee]/10 text-[#67e8f9] font-semibold tracking-wide border border-[#22d3ee]/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22d3ee] animate-pulse" />
                  LIVE DEMO
                </span>
              )}
              {project.caseStudy && (
                <span className="inline-block text-[10px] px-2 py-0.5 rounded bg-[#d4a853]/10 text-[#d4a853] font-semibold tracking-wide border border-[#d4a853]/30">
                  CASE STUDY
                </span>
              )}
            </div>

            <h3 className="text-[#f0f4ff] font-semibold text-base mb-2 leading-snug">
              {project.title}
            </h3>
            <p className="text-[#aab8cc] text-sm leading-relaxed mb-5 flex-1">
              {project.tagline}
            </p>

            <div className="flex flex-wrap gap-2 mb-5">
              {project.techStack.slice(0, 4).map((t) => (
                <span
                  key={t.name}
                  className="inline-block text-xs px-2.5 py-1 rounded bg-[#0a0f1e] border border-[#1a2235] text-[#aab8cc] font-medium"
                >
                  {t.name}
                </span>
              ))}
              {project.techStack.length > 4 && (
                <span className="inline-block text-xs px-2.5 py-1 rounded bg-[#0a0f1e] border border-[#1a2235] text-[#aab8cc] font-medium">
                  +{project.techStack.length - 4} more
                </span>
              )}
            </div>

            <div className="flex gap-3 mt-auto">
              <Link
                href={`/projects/${project.slug}`}
                className="flex-1 text-center text-xs py-2 px-3 border border-[#d4a853] text-[#d4a853] rounded hover:bg-[#d4a853] hover:text-[#0a0f1e] transition-all duration-200 font-medium tracking-wide"
              >
                View Details
              </Link>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center text-xs py-2 px-3 border border-[#1a2235] text-[#aab8cc] rounded hover:border-[#aab8cc] hover:text-[#f0f4ff] transition-all duration-200 font-medium tracking-wide"
              >
                View Code
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
