import { type Metadata } from "next";
import Link from "next/link";
import { getAllPostSummaries } from "@/app/lib/posts";

export const metadata: Metadata = {
  title: "Writing — Byron Delaney Jr",
  description:
    "Notes on quantitative finance, options markets, and data engineering.",
  openGraph: {
    title: "Writing — Byron Delaney Jr",
    description:
      "Notes on quantitative finance, options markets, and data engineering.",
    type: "website",
  },
};

const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export default function WritingIndex() {
  const posts = getAllPostSummaries();

  return (
    <main className="pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="font-mono text-accent text-xs tracking-[0.18em] uppercase mb-3">
          Writing
        </p>
        <h1 className="font-display text-3xl md:text-5xl font-semibold text-ink leading-tight mb-4">
          Notes
        </h1>
        <p className="text-body text-lg leading-relaxed mb-12 max-w-2xl">
          Short essays on options markets, quantitative methods, and the data tooling
          behind them.
        </p>

        {posts.length === 0 ? (
          <p className="text-muted">No posts yet.</p>
        ) : (
          <ul className="flex flex-col gap-0 border-t border-line">
            {posts.map((p) => (
              <li key={p.slug} className="border-b border-line">
                <Link
                  href={`/writing/${p.slug}`}
                  className="block py-6 group hover:bg-surface -mx-4 px-4 transition-colors duration-200"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-1.5">
                    <h2 className="font-display text-ink font-semibold text-lg group-hover:text-accent transition-colors duration-200">
                      {p.title}
                    </h2>
                    <span className="font-mono text-muted text-xs tabular-nums tracking-wide">
                      {formatDate(p.date)}
                    </span>
                  </div>
                  <p className="text-body leading-relaxed text-sm">
                    {p.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
