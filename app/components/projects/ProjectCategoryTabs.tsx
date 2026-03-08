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
            className="bg-[#111827] border border-[#1a2235] rounded-lg p-6 flex flex-col hover:border-[#c9a84c]/30 hover:shadow-[0_0_24px_rgba(201,168,76,0.05)] transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-4">
              <span className="text-[#c9a84c]/40 text-4xl font-bold leading-none select-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-xs px-2 py-1 rounded bg-[#c9a84c]/10 text-[#c9a84c] font-medium tracking-wide border border-[#c9a84c]/20">
                {projectCategories.find((c) => c.id === project.category)?.label}
              </span>
            </div>

            <h3 className="text-[#f0f4ff] font-semibold text-base mb-2 leading-snug">
              {project.title}
            </h3>
            <p className="text-[#94a3b8] text-sm leading-relaxed mb-5 flex-1">
              {project.tagline}
            </p>

            <div className="flex flex-wrap gap-2 mb-5">
              {project.techStack.slice(0, 4).map((t) => (
                <span
                  key={t.name}
                  className="inline-block text-xs px-2.5 py-1 rounded bg-[#0a0f1e] border border-[#1a2235] text-[#94a3b8] font-medium"
                >
                  {t.name}
                </span>
              ))}
              {project.techStack.length > 4 && (
                <span className="inline-block text-xs px-2.5 py-1 rounded bg-[#0a0f1e] border border-[#1a2235] text-[#94a3b8] font-medium">
                  +{project.techStack.length - 4} more
                </span>
              )}
            </div>

            <div className="flex gap-3 mt-auto">
              <Link
                href={`/projects/${project.slug}`}
                className="flex-1 text-center text-xs py-2 px-3 border border-[#c9a84c] text-[#c9a84c] rounded hover:bg-[#c9a84c] hover:text-[#0a0f1e] transition-all duration-200 font-medium tracking-wide"
              >
                View Details
              </Link>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center text-xs py-2 px-3 border border-[#1a2235] text-[#94a3b8] rounded hover:border-[#94a3b8] hover:text-[#f0f4ff] transition-all duration-200 font-medium tracking-wide"
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
