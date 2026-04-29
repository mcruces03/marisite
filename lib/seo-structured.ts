import { getSiteUrl } from "./site";

function absoluteUrl(href: string): string {
  const base = getSiteUrl();
  if (href.startsWith("http")) return href;
  const path = href.startsWith("/") ? href : `/${href}`;
  return `${base}${path}`;
}

/** BreadcrumbList — use inside `@graph` or alone with `@context`. */
export function buildBreadcrumbSchema(
  segments: { name: string; href: string }[]
): {
  "@type": "BreadcrumbList";
  itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    item: string;
  }>;
} {
  return {
    "@type": "BreadcrumbList",
    itemListElement: segments.map((seg, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: seg.name,
      item: absoluteUrl(seg.href)
    }))
  };
}

/** ItemList of blog posts — blog index only. */
export function buildBlogItemListSchema(
  posts: { slug: string; title: string }[]
): {
  "@type": "ItemList";
  itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    url: string;
  }>;
} {
  const base = getSiteUrl();
  return {
    "@type": "ItemList",
    itemListElement: posts.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.title,
      url: `${base}/blog/${p.slug}`
    }))
  };
}
