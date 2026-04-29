"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export type BlogPostCard = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  read_time: string;
  image_url: string;
};

const FILTERS = [
  { id: "all", label: "Todos" },
  { id: "Relaciones", label: "Relaciones" },
  { id: "Autoestima", label: "Autoestima" },
  { id: "Ansiedad", label: "Ansiedad" },
  { id: "Estrés", label: "Estrés" },
  { id: "Depresión", label: "Depresión" }
] as const;

export function BlogIndex({ posts }: { posts: BlogPostCard[] }) {
  const [active, setActive] = useState<string>("all");

  const visible = useMemo(() => {
    if (active === "all") return posts;
    return posts.filter((p) => p.category === active);
  }, [posts, active]);

  return (
    <div className="bg-cream">
      <div className="pt-10" data-testid="blog-page">
        <section className="container-page pt-16 pb-12">
          <p className="mb-5 text-xs uppercase tracking-[0.35em] text-sage-dark">
            Diario de Casa Uma
          </p>
          <h1 className="max-w-4xl font-serif text-5xl leading-[1.05] text-forest sm:text-6xl lg:text-7xl">
            Lecturas para los días en que
            <span className="italic text-terracotta">{" necesitas "}</span>
            parar un momento.
          </h1>
          <p className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-sage-dark">
            Aquí comparto reflexiones sobre los temas que más trabajo en consulta:
            vínculos, amor propio, ansiedad, duelo, límites. Escritos sin prisa,
            para leer con calma.
          </p>
        </section>

        <section className="container-page py-8">
          <div
            className="flex flex-wrap gap-2"
            data-testid="blog-filters"
            role="toolbar"
            aria-label="Filtrar por tema"
          >
            {FILTERS.map((f) => {
              const isOn = active === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  data-testid={
                    f.id === "all"
                      ? "filter-todos"
                      : `filter-${f.id.toLowerCase()}`
                  }
                  onClick={() => setActive(f.id)}
                  className={[
                    "rounded-full border px-5 py-2 text-sm font-light tracking-wide transition-all",
                    isOn
                      ? "border-forest bg-forest text-cream"
                      : "border-sand bg-transparent text-forest hover:border-peach"
                  ].join(" ")}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </section>

        <section className="container-page pb-24">
          {visible.length === 0 ? (
            <p className="text-sage-dark">
              No hay artículos en esta categoría todavía.
            </p>
          ) : (
            <div
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
              data-testid="blog-grid"
            >
              {visible.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  data-testid={`blog-card-${p.slug}`}
                  className="group flex flex-col"
                >
                  <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-3xl">
                    <Image
                      src={p.image_url}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <p className="mb-3 text-xs uppercase tracking-[0.25em] text-sage-dark">
                    {p.category} · {p.read_time}
                  </p>
                  <h2 className="mb-3 font-serif text-2xl leading-snug text-forest transition-colors group-hover:text-terracotta lg:text-3xl">
                    {p.title}
                  </h2>
                  <p className="line-clamp-3 text-sm font-light leading-relaxed text-sage-dark">
                    {p.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm text-forest">
                    Leer artículo{" "}
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                  </span>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
