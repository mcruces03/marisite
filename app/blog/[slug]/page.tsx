import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { readPost, readPosts } from "@/lib/posts";
import { buildBreadcrumbSchema } from "@/lib/seo-structured";
import { buildArticleJsonLd, getSiteUrl, site } from "@/lib/site";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const posts = await readPosts();
  return posts.map((p) => ({ slug: p.frontmatter.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await readPost(slug);
  if (!post) return {};

  const title = post.frontmatter.title;
  const description = post.frontmatter.excerpt;
  const base = getSiteUrl();
  const url = `${base}/blog/${slug}`;
  const published = post.frontmatter.published_at;

  return {
    title,
    description,
    authors: [{ name: site.personName, url: base }],
    alternates: {
      canonical: url,
      types: { "application/rss+xml": `${base}/rss.xml` }
    },
    openGraph: {
      title,
      description,
      type: "article",
      url,
      publishedTime: `${published}T12:00:00.000Z`,
      modifiedTime: `${published}T12:00:00.000Z`,
      authors: [site.personName],
      images: [
        {
          url: post.frontmatter.image_url,
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description
    }
  };
}

export default async function BlogPostPage({
  params
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await readPost(slug);
  if (!post) notFound();

  return (
    <article className="bg-cream pt-10">
      <Script
        id={`jsonld-article-${post.frontmatter.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildArticleJsonLd({
              title: post.frontmatter.title,
              description: post.frontmatter.excerpt,
              slug: post.frontmatter.slug,
              imageUrl: post.frontmatter.image_url,
              datePublished: post.frontmatter.published_at,
              category: post.frontmatter.category
            })
          )
        }}
      />
      <Script
        id={`jsonld-breadcrumb-${post.frontmatter.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            ...buildBreadcrumbSchema([
              { name: "Inicio", href: "/" },
              { name: "Blog", href: "/blog" },
              {
                name: post.frontmatter.title,
                href: `/blog/${post.frontmatter.slug}`
              }
            ])
          })
        }}
      />
      <div className="container-page pb-24">
        <Link
          href="/blog"
          className="cu-link text-sm tracking-wide text-forest"
        >
          ← Volver al blog
        </Link>

        <header className="mt-10 max-w-4xl">
          <p className="text-xs uppercase tracking-[0.35em] text-sage-dark">
            Diario de Casa Uma
          </p>
          <p className="mt-6 text-xs uppercase tracking-[0.25em] text-sage-dark">
            {post.frontmatter.category} · {post.frontmatter.read_time}
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-[1.08] text-forest sm:text-5xl lg:text-6xl">
            {post.frontmatter.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-sage-dark">
            {post.frontmatter.excerpt}
          </p>
        </header>

        <div className="relative mt-12 aspect-[16/9] max-w-5xl overflow-hidden rounded-3xl bg-sand/40">
          <Image
            src={post.frontmatter.image_url}
            alt={post.frontmatter.title}
            fill
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover"
            priority
          />
        </div>

        <div className="prose-casa mt-12 max-w-3xl">
          <MDXRemote
            source={post.content}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </div>
      </div>
    </article>
  );
}

