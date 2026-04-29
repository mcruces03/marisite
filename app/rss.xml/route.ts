import { readPosts } from "@/lib/posts";
import { getSiteUrl, site } from "@/lib/site";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = await readPosts();
  const base = getSiteUrl();

  const items = posts
    .map((p) => {
      const link = `${base}/blog/${p.frontmatter.slug}`;
      const pub = new Date(p.frontmatter.published_at).toUTCString();
      return `    <item>
      <title>${escapeXml(p.frontmatter.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pub}</pubDate>
      <description>${escapeXml(p.frontmatter.excerpt)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${site.brand} · Blog · ${site.personName}`)}</title>
    <link>${base}/blog</link>
    <description>${escapeXml(site.defaultDescription)}</description>
    <language>es-es</language>
    <atom:link href="${base}/rss.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400"
    }
  });
}
