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
    <main className="pt-28 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="text-[#c9a84c] text-xs tracking-[0.2em] uppercase mb-3 font-medium">Work</p>
        <h1 className="text-3xl md:text-4xl font-bold text-[#f0f4ff] mb-3 leading-tight">
          Projects
        </h1>
        <p className="text-[#94a3b8] mb-12 max-w-xl">
          Quantitative finance, machine learning, and applied mathematics — built end to end.
        </p>
        <Suspense fallback={null}>
          <ProjectCategoryTabs defaultCategory={category} />
        </Suspense>
      </div>
    </main>
  );
}
