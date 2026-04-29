import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { getSiteUrl, site } from "@/lib/site";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-manrope",
  display: "swap"
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap"
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.brand} · ${site.personName} · ${site.professionalTitle}`,
    template: `%s · ${site.brand}`
  },
  description: site.defaultDescription,
  applicationName: site.brand,
  authors: [{ name: site.personName, url: siteUrl }],
  creator: site.personName,
  publisher: site.brand,
  category: "health",
  keywords: [
    "Mariana Souto",
    "psicoterapeuta online",
    "psicoterapia integrativa",
    "terapia ansiedad",
    "terapia de pareja online",
    "psicólogo online España",
    "autoestima terapia",
    "Casa Uma"
  ],
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }]
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: site.brand,
    title: `${site.brand} · ${site.personName}`,
    description: site.socialDescription,
    url: siteUrl,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${site.brand} · ${site.personName} · Psicoterapia integrativa`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.brand} · ${site.personName}`,
    description: site.socialDescription,
    images: ["/opengraph-image"]
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    }
  }),
  alternates: {
    types: {
      "application/rss+xml": `${siteUrl}/rss.xml`
    }
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${manrope.variable} ${cormorant.variable}`}>
      <body className="min-h-dvh font-sans antialiased">
        <Navbar />
        <main className="min-h-[70dvh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

