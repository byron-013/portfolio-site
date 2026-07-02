"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { projectCategories, projects } from "@/app/lib/projects";

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

  return (
    <div>
      {/* Tab bar */}
      <div className="flex flex-wrap gap-1 border-b border-line mb-10">
        {projectCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleTab(cat.id)}
            className={`px-4 py-3 text-sm font-medium tracking-wide transition-all duration-200 border-b-2 -mb-px ${
              active === cat.id
                ? "text-accent border-accent"
                : "text-muted border-transparent hover:text-ink"
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
            className="bg-surface border border-line rounded-sm p-6 flex flex-col hover:border-accent/50 hover:shadow-md transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-4">
              <span className="font-display text-line-strong group-hover:text-accent/60 text-4xl font-semibold leading-none select-none transition-colors duration-300">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-mono text-[10px] px-2 py-1 rounded-sm bg-accent/5 text-accent tracking-wide border border-accent/20">
                {projectCategories.find((c) => c.id === project.category)?.label}
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-3">
              {project.interactiveWidget && (
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] px-2 py-0.5 rounded-sm bg-accent/5 text-accent tracking-wide border border-accent/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-data-green animate-pulse" />
                  LIVE DEMO
                </span>
              )}
              {project.caseStudy && (
                <span className="inline-block font-mono text-[10px] px-2 py-0.5 rounded-sm text-muted tracking-wide border border-line-strong">
                  CASE STUDY
                </span>
              )}
            </div>

            <h3 className="font-display text-ink font-semibold text-base mb-2 leading-snug">
              {project.title}
            </h3>
            <p className="text-body text-sm leading-relaxed mb-5 flex-1">
              {project.tagline}
            </p>

            <div className="flex flex-wrap gap-2 mb-5">
              {project.techStack.slice(0, 4).map((t) => (
                <span
                  key={t.name}
                  className="inline-block font-mono text-xs px-2.5 py-1 rounded-sm bg-paper border border-line text-body"
                >
                  {t.name}
                </span>
              ))}
              {project.techStack.length > 4 && (
                <span className="inline-block font-mono text-xs px-2.5 py-1 rounded-sm bg-paper border border-line text-body">
                  +{project.techStack.length - 4} more
                </span>
              )}
            </div>

            <div className="flex gap-3 mt-auto">
              <Link
                href={`/projects/${project.slug}`}
                className="flex-1 text-center text-xs py-2 px-3 bg-accent text-paper rounded-sm hover:bg-accent-deep transition-colors duration-200 font-medium tracking-wide"
              >
                View Details
              </Link>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center text-xs py-2 px-3 border border-line-strong text-body rounded-sm hover:border-accent hover:text-accent transition-colors duration-200 font-medium tracking-wide"
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
