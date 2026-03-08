import { notFound } from "next/navigation";
import { type Metadata } from "next";
import Link from "next/link";
import {
  getProjectBySlug,
  getAdjacentProjects,
  getAllSlugs,
  projectCategories,
} from "@/app/lib/projects";
import ProjectGallery from "@/app/components/projects/ProjectGallery";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.shortTitle} — Byron Delaney Jr`,
    description: project.tagline,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(slug);
  const categoryLabel =
    projectCategories.find((c) => c.id === project.category)?.label ?? "";

  // Group tech stack by group label
  const techGroups = project.techStack.reduce<Record<string, string[]>>(
    (acc, item) => {
      if (!acc[item.group]) acc[item.group] = [];
      acc[item.group].push(item.name);
      return acc;
    },
    {}
  );

  return (
    <main className="pt-28 pb-24 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#94a3b8] mb-8">
          <Link href="/projects" className="hover:text-[#c9a84c] transition-colors">
            Projects
          </Link>
          <span>/</span>
          <Link
            href={`/projects?category=${project.category}`}
            className="hover:text-[#c9a84c] transition-colors"
          >
            {categoryLabel}
          </Link>
          <span>/</span>
          <span className="text-[#f0f4ff]">{project.shortTitle}</span>
        </nav>

        {/* Header */}
        <div className="mb-14">
          <div className="flex flex-wrap items-start gap-4 mb-4">
            <span className="text-xs px-3 py-1 rounded-full bg-[#c9a84c]/10 text-[#c9a84c] border border-[#c9a84c]/20 font-medium tracking-wide">
              {categoryLabel}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-[#f0f4ff] leading-tight mb-4">
            {project.title}
          </h1>
          <p className="text-[#94a3b8] text-lg leading-relaxed mb-6 max-w-2xl">
            {project.tagline}
          </p>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#c9a84c] text-[#c9a84c] rounded hover:bg-[#c9a84c] hover:text-[#0a0f1e] transition-all duration-200 text-sm font-medium tracking-wide"
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            View on GitHub
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        {/* Key Metrics */}
        <section className="mb-16">
          <p className="text-[#c9a84c] text-xs tracking-[0.2em] uppercase mb-3 font-medium">Results</p>
          <h2 className="text-2xl font-bold text-[#f0f4ff] mb-6">Key Metrics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {project.keyMetrics.map((metric) => (
              <div
                key={metric.label}
                className="bg-[#111827] border border-[#1a2235] rounded-lg p-5 hover:border-[#c9a84c]/20 transition-colors"
              >
                <p className="text-[#c9a84c] text-2xl font-bold mb-1 leading-none">
                  {metric.value}
                </p>
                <p className="text-[#94a3b8] text-xs tracking-wide">{metric.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Approach */}
        <section className="mb-16">
          <p className="text-[#c9a84c] text-xs tracking-[0.2em] uppercase mb-3 font-medium">Approach</p>
          <h2 className="text-2xl font-bold text-[#f0f4ff] mb-8">Technical Overview</h2>
          <div className="flex flex-col gap-8">
            {project.technicalApproach.map((item) => (
              <div key={item.heading} className="flex gap-4">
                <div className="flex-shrink-0 mt-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] block" />
                </div>
                <div>
                  <h3 className="text-[#f0f4ff] font-semibold mb-2">{item.heading}</h3>
                  <p className="text-[#94a3b8] leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Output Gallery */}
        <section className="mb-16">
          <p className="text-[#c9a84c] text-xs tracking-[0.2em] uppercase mb-3 font-medium">Gallery</p>
          <h2 className="text-2xl font-bold text-[#f0f4ff] mb-6">Output &amp; Visualizations</h2>
          <p className="text-[#94a3b8] text-sm mb-6">Demo screenshots and output visualizations — coming soon.</p>
          <ProjectGallery items={project.galleryItems} />
        </section>

        {/* Tech Stack */}
        <section className="mb-16">
          <p className="text-[#c9a84c] text-xs tracking-[0.2em] uppercase mb-3 font-medium">Stack</p>
          <h2 className="text-2xl font-bold text-[#f0f4ff] mb-6">Technologies Used</h2>
          <div className="flex flex-col gap-4">
            {Object.entries(techGroups).map(([group, items]) => (
              <div key={group} className="flex flex-wrap items-center gap-3">
                <span className="text-xs text-[#c9a84c] font-medium tracking-wide w-20 flex-shrink-0">
                  {group}
                </span>
                <div className="flex flex-wrap gap-2">
                  {items.map((name) => (
                    <span
                      key={name}
                      className="text-xs px-3 py-1.5 rounded bg-[#111827] border border-[#1a2235] text-[#94a3b8] font-medium"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Prev / Next navigation */}
        <div className="border-t border-[#111827] pt-10 flex justify-between gap-4">
          {prev ? (
            <Link
              href={`/projects/${prev.slug}`}
              className="group flex items-center gap-3 text-sm text-[#94a3b8] hover:text-[#c9a84c] transition-colors"
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <span>
                <span className="block text-xs text-[#94a3b8]/50 mb-0.5">Previous</span>
                {prev.shortTitle}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/projects/${next.slug}`}
              className="group flex items-center gap-3 text-sm text-[#94a3b8] hover:text-[#c9a84c] transition-colors text-right"
            >
              <span>
                <span className="block text-xs text-[#94a3b8]/50 mb-0.5">Next</span>
                {next.shortTitle}
              </span>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </main>
  );
}
