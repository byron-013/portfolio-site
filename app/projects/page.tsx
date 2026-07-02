import { Suspense } from "react";
import { type Metadata } from "next";
import ProjectCategoryTabs from "@/app/components/projects/ProjectCategoryTabs";

export const metadata: Metadata = {
  title: "Projects — Byron Delaney Jr",
  description:
    "Quantitative finance, machine learning, and applied mathematics projects by Byron Delaney Jr.",
};

type Props = {
  searchParams: Promise<{ category?: string }>;
};

export default async function ProjectsPage({ searchParams }: Props) {
  const params = await searchParams;
  const category = params.category ?? null;

  return (
    <main className="pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-accent text-xs tracking-[0.18em] uppercase mb-3">
          Work
        </p>
        <h1 className="font-display text-3xl md:text-5xl font-semibold text-ink mb-3 leading-tight">
          Projects
        </h1>
        <p className="text-body mb-12 max-w-xl leading-relaxed">
          Quantitative finance, machine learning, and applied mathematics — built
          end to end. Three include a live in-browser demo.
        </p>
        <Suspense fallback={null}>
          <ProjectCategoryTabs defaultCategory={category} />
        </Suspense>
      </div>
    </main>
  );
}
