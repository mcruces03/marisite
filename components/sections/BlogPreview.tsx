import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { readPosts } from "@/lib/posts";

export async function BlogPreview() {
  const posts = await readPosts();
  const top = posts.slice(0, 3);

  return (
    <section id="blog" className="py-24 lg:py-32" data-testid="blog-preview-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <p className="text-xs tracking-[0.35em] uppercase text-[#5A6658] mb-5">
              Diario de Casa Uma
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#2D372B] leading-tight">
              Palabras para<span className="italic text-[#B2845A]"> acompañarte</span>.
            </h2>
          </div>
          <Link
            className="cu-link text-sm tracking-wide self-start lg:self-end"
            data-testid="blog-preview-see-all"
            href="/blog"
          >
            Ver todos/as los artículos →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {top.map((p) => (
            <Link
              key={p.frontmatter.slug}
              className="group flex flex-col"
              data-testid={`blog-preview-card-${p.frontmatter.slug}`}
              href={`/blog/${p.frontmatter.slug}`}
            >
              <div className="overflow-hidden rounded-3xl mb-5 aspect-[4/3]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={p.frontmatter.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={p.frontmatter.image_url}
                />
              </div>
              <p className="text-xs tracking-[0.25em] uppercase text-[#5A6658] mb-3">
                {p.frontmatter.category} · {p.frontmatter.read_time}
              </p>
              <h3 className="font-serif text-2xl text-[#2D372B] leading-snug mb-3 group-hover:text-[#B2845A] transition-colors">
                {p.frontmatter.title}
              </h3>
              <p className="text-[#5A6658] font-light leading-relaxed text-sm line-clamp-3">
                {p.frontmatter.excerpt}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm text-[#2D372B]">
                Leer <ArrowUpRight className="size-[14px]" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

