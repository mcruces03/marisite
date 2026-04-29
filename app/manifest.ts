import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.brand} · ${site.personName} · Psicoterapia integrativa`,
    short_name: site.brand,
    description: site.defaultDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#FDFBF7",
    theme_color: "#FDFBF7",
    icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }]
  };
}

