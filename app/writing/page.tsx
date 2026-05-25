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
    <main className="pt-28 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="text-[#d4a853] text-xs tracking-[0.2em] uppercase mb-3 font-medium">
          Writing
        </p>
        <h1 className="text-3xl md:text-5xl font-bold text-[#f0f4ff] leading-tight mb-4">
          Notes
        </h1>
        <p className="text-[#b4c0d4] text-lg leading-relaxed mb-12 max-w-2xl">
          Short essays on options markets, quantitative methods, and the data tooling
          behind them.
        </p>

        {posts.length === 0 ? (
          <p className="text-[#aab8cc]">No posts yet.</p>
        ) : (
          <ul className="flex flex-col gap-0 border-t border-[#1a2235]">
            {posts.map((p) => (
              <li key={p.slug} className="border-b border-[#1a2235]">
                <Link
                  href={`/writing/${p.slug}`}
                  className="block py-6 group hover:bg-[#111827]/50 -mx-4 px-4 rounded transition-colors duration-200"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-1.5">
                    <h2 className="text-[#f0f4ff] font-semibold text-lg group-hover:text-[#d4a853] transition-colors duration-200">
                      {p.title}
                    </h2>
                    <span className="text-[#aab8cc] text-xs tabular-nums tracking-wide">
                      {formatDate(p.date)}
                    </span>
                  </div>
                  <p className="text-[#aab8cc] leading-relaxed text-sm">
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
