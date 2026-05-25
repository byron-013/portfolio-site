import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type PostFrontmatter = {
  title: string;
  description: string;
  date: string;
  tags?: string[];
};

export type Post = PostFrontmatter & {
  slug: string;
  html: string;
};

export type PostSummary = PostFrontmatter & {
  slug: string;
};

function readPost(filename: string): { slug: string; data: PostFrontmatter; body: string } {
  const slug = filename.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf8");
  const { data, content } = matter(raw);
  return { slug, data: data as PostFrontmatter, body: content };
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getAllPostSummaries(): PostSummary[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const { slug, data } = readPost(f);
      return { slug, ...data };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  const filename = `${slug}.md`;
  const fullPath = path.join(POSTS_DIR, filename);
  if (!fs.existsSync(fullPath)) return null;
  const { data, body } = readPost(filename);
  const html = marked.parse(body, { async: false }) as string;
  return { slug, html, ...data };
}
