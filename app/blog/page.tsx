import type { Metadata } from "next";
import Script from "next/script";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { readPosts } from "@/lib/posts";
import {
  buildBlogItemListSchema,
  buildBreadcrumbSchema
} from "@/lib/seo-structured";
import { getSiteUrl, site } from "@/lib/site";

const base = getSiteUrl();
const blogUrl = `${base}/blog`;
const blogDescription =
  "Artículos de Mariana Souto (Casa Uma) sobre ansiedad, autoestima, pareja, duelo y límites. Textos breves para leer con calma.";

export const metadata: Metadata = {
  title: "Blog de psicoterapia",
  description: blogDescription,
  alternates: {
    canonical: blogUrl,
    types: { "application/rss+xml": `${base}/rss.xml` }
  },
  openGraph: {
    title: `Blog · ${site.brand} · ${site.personName}`,
    description: blogDescription,
    url: blogUrl,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: `Blog · ${site.brand}`,
    description: blogDescription
  }
};

export default async function BlogIndexPage() {
  const posts = await readPosts();
  const cards = posts.map((p) => ({
    slug: p.frontmatter.slug,
    title: p.frontmatter.title,
    excerpt: p.frontmatter.excerpt,
    category: p.frontmatter.category,
    read_time: p.frontmatter.read_time,
    image_url: p.frontmatter.image_url
  }));

  const listingJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumbSchema([
        { name: "Inicio", href: "/" },
        { name: "Blog", href: "/blog" }
      ]),
      buildBlogItemListSchema(
        posts.map((p) => ({
          slug: p.frontmatter.slug,
          title: p.frontmatter.title
        }))
      )
    ]
  };

  return (
    <>
      <Script
        id="jsonld-blog-index"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(listingJsonLd)
        }}
      />
      <BlogIndex posts={cards} />
    </>
  );
}

