import type { MetadataRoute } from "next";
import { readPosts } from "@/lib/posts";
import { getSiteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await readPosts();
  const base = getSiteUrl();
  const newest =
    posts.length > 0
      ? new Date(posts[0].frontmatter.published_at)
      : new Date();

  return [
    {
      url: `${base}/`,
      lastModified: newest,
      changeFrequency: "monthly",
      priority: 1
    },
    {
      url: `${base}/blog`,
      lastModified: newest,
      changeFrequency: "weekly",
      priority: 0.8
    },
    ...posts.map((p) => ({
      url: `${base}/blog/${p.frontmatter.slug}`,
      lastModified: new Date(p.frontmatter.published_at),
      changeFrequency: "yearly" as const,
      priority: 0.65
    }))
  ];
}

