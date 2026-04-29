import type { Metadata } from "next";
import Script from "next/script";
import { About } from "@/components/sections/About";
import { Approach } from "@/components/sections/Approach";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { buildHomePageJsonLd, getSiteUrl, site } from "@/lib/site";

const homeCanonical = getSiteUrl();

export const metadata: Metadata = {
  title: { absolute: site.homeTitle },
  description: site.homeDescription,
  alternates: {
    canonical: homeCanonical,
    types: { "application/rss+xml": `${homeCanonical}/rss.xml` }
  },
  openGraph: {
    title: site.homeTitle,
    description: site.homeDescription,
    url: homeCanonical,
    type: "website"
  },
  twitter: {
    title: site.homeTitle,
    description: site.homeDescription
  }
};

export default function HomePage() {
  return (
    <>
      <Script
        id="jsonld-home"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildHomePageJsonLd())
        }}
      />
      <Hero />
      <About />
      <Services />
      <Approach />
      <BlogPreview />
      <Contact />
    </>
  );
}

