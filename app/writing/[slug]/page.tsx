import { notFound } from "next/navigation";
import { type Metadata } from "next";
import Link from "next/link";
import { getAllPostSlugs, getPostBySlug } from "@/app/lib/posts";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Byron Delaney Jr`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className="pt-28 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <nav className="flex items-center gap-2 text-sm text-[#94a3b8] mb-8">
          <Link href="/writing" className="hover:text-[#d4a853] transition-colors">
            Writing
          </Link>
          <span>/</span>
          <span className="text-[#f0f4ff] truncate">{post.title}</span>
        </nav>

        <article>
          <header className="mb-10">
            <p className="text-[#aab8cc] text-xs tabular-nums tracking-wide mb-3">
              {formatDate(post.date)}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-[#f0f4ff] leading-tight mb-4">
              {post.title}
            </h1>
            <p className="text-[#b4c0d4] text-lg leading-relaxed">
              {post.description}
            </p>
          </header>

          <div
            className="post-body text-[#cbd5e1] leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </article>

        <div className="border-t border-[#1a2235] mt-16 pt-8">
          <Link
            href="/writing"
            className="inline-flex items-center gap-2 text-sm text-[#aab8cc] hover:text-[#d4a853] transition-colors"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            All notes
          </Link>
        </div>
      </div>
    </main>
  );
}
