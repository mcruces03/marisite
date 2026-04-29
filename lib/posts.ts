import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export type PostFrontmatter = {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  read_time: string;
  published_at: string; // YYYY-MM-DD
  image_url: string;
};

export type Post = {
  frontmatter: PostFrontmatter;
  content: string;
};

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function assertFrontmatter(data: Record<string, unknown>): PostFrontmatter {
  const required = [
    "title",
    "slug",
    "excerpt",
    "category",
    "read_time",
    "published_at",
    "image_url"
  ] as const;

  for (const key of required) {
    if (typeof data[key] !== "string" || data[key] === "") {
      throw new Error(`Invalid frontmatter: missing "${key}"`);
    }
  }

  return data as unknown as PostFrontmatter;
}

export async function readPosts() {
  const entries = await fs.readdir(POSTS_DIR);
  const mdxFiles = entries.filter((f) => f.endsWith(".mdx"));

  const posts = await Promise.all(
    mdxFiles.map(async (filename) => {
      const raw = await fs.readFile(path.join(POSTS_DIR, filename), "utf8");
      const parsed = matter(raw);
      return { frontmatter: assertFrontmatter(parsed.data), content: parsed.content } satisfies Post;
    })
  );

  return posts.sort((a, b) =>
    a.frontmatter.published_at < b.frontmatter.published_at ? 1 : -1
  );
}

export async function readPost(slug: string): Promise<Post | null> {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = matter(raw);
    return { frontmatter: assertFrontmatter(parsed.data), content: parsed.content };
  } catch {
    return null;
  }
}

