/**
 * Public site configuration and canonical URL.
 * Set NEXT_PUBLIC_SITE_URL in production (e.g. https://www.tudominio.com).
 * On Vercel, falls back to VERCEL_URL when the public URL is not set.
 */

import { getInstagramUrl } from "./social";

export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  if (explicit) return explicit;
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export function getSiteUrlObject() {
  return new URL(getSiteUrl());
}

export const site = {
  brand: "Casa Uma",
  personName: "Mariana Souto",
  professionalTitle: "Psicoterapeuta integrativa",
  colNumber: "36066",
  email: "marucb03@gmail.com",
  /** Primary SEO title — name + service + brand for “who is this” discovery */
  homeTitle:
    "Mariana Souto · Psicoterapia integrativa online | Casa Uma",
  /** Contact-led meta: who you are, how to reach you, languages + themes */
  homeDescription:
    "Mariana Souto, psicoterapeuta colegiada (n.º 36066). Psicoterapia integrativa online: ansiedad, autoestima, pareja, duelo y límites. Sesiones en español, portugués, italiano y catalán. Conoce mi enfoque y reserva tu primera sesión.",
  defaultDescription:
    "Psicoterapia integrativa online con Mariana Souto. Acompañamiento en ansiedad, autoestima, relaciones y gestión emocional. Colegiada n.º 36066 · Casa Uma.",
  /** Open Graph / social default (shorter) */
  socialDescription:
    "Psicoterapia integrativa online con Mariana Souto (colegiada n.º 36066). Un espacio cálido para ansiedad, vínculos y autoconocimiento. ES · PT · IT · CAT.",
  areaServed: "España",
  priceSession: "45",
  priceCurrency: "EUR",
  knowsAbout: [
    "Psicoterapia integrativa",
    "Terapia de pareja",
    "Ansiedad",
    "Autoestima",
    "Relaciones",
    "Depresión",
    "Duelo",
    "Límites",
    "Gestión emocional"
  ],
  /** Optional — add NEXT_PUBLIC_INSTAGRAM_URL etc. when you have profiles */
  sameAs: [] as string[]
} as const;

export function getSameAs(): string[] {
  const urls: string[] = [...site.sameAs];
  const ig = getInstagramUrl();
  const li = process.env.NEXT_PUBLIC_LINKEDIN_URL?.trim();
  if (ig) urls.push(ig);
  if (li) {
    try {
      urls.push(new URL(li).href);
    } catch {
      /* ignore invalid linkedin url */
    }
  }
  return urls;
}

/** JSON-LD for the home page: WebSite, practice, and person (rich results / knowledge graph). */
export function buildHomePageJsonLd() {
  const url = getSiteUrl();
  const orgId = `${url}/#organization`;
  const personId = `${url}/#person`;
  const websiteId = `${url}/#website`;
  const sameAs = getSameAs();

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url,
        name: site.brand,
        description: site.homeDescription,
        inLanguage: "es-ES",
        publisher: { "@id": orgId }
      },
      {
        "@type": "ProfessionalService",
        "@id": orgId,
        name: site.brand,
        url,
        description: site.defaultDescription,
        image: `${url}/mariana.jpg`,
        priceRange: `€${site.priceSession}`,
        areaServed: { "@type": "Country", name: site.areaServed },
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: url,
          serviceType: "Terapia online"
        }
      },
      {
        "@type": "Person",
        "@id": personId,
        name: site.personName,
        jobTitle: site.professionalTitle,
        email: site.email,
        image: `${url}/mariana.jpg`,
        url,
        worksFor: { "@id": orgId },
        knowsAbout: [...site.knowsAbout],
        ...(sameAs.length > 0 ? { sameAs } : {}),
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "Colegiación profesional",
          recognizedBy: { "@type": "Organization", name: "Colegio Oficial de Psicólogos" },
          identifier: site.colNumber
        }
      }
    ]
  };
}

export function buildArticleJsonLd(input: {
  title: string;
  description: string;
  slug: string;
  imageUrl: string;
  datePublished: string;
  category: string;
}) {
  const base = getSiteUrl();
  const url = `${base}/blog/${input.slug}`;
  const image = input.imageUrl.startsWith("http")
    ? input.imageUrl
    : `${base}${input.imageUrl}`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    image,
    datePublished: `${input.datePublished}T12:00:00.000Z`,
    dateModified: `${input.datePublished}T12:00:00.000Z`,
    author: {
      "@type": "Person",
      name: site.personName,
      url: base
    },
    publisher: {
      "@type": "Organization",
      name: site.brand,
      url: base
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    articleSection: input.category,
    inLanguage: "es-ES"
  };
}
