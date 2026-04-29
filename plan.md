# Casa Uma — Rebuild on Next.js for Vercel free hosting

## Context

The live site at https://psych-web.preview.emergentagent.com/ is a Spanish-language
psychotherapy practice site for **Mariana Souto · Psicoterapia Integrativa · Col. nº 36066**
(brand name "Casa Uma"). It is currently built on the Emergent platform as a
Create React App frontend that calls a separate `/api` backend
(`GET /api/blog`, `GET /api/blog/:slug`, `POST /api/contact`). To host it for
free on Vercel, we will rebuild it as a single Next.js 15 (App Router) project,
move the 6 blog posts into MDX files in the repo, replace the contact-form API
call with a `mailto:` link, and ship a fully static deploy that fits comfortably
within Vercel's free tier.

## Stack

- **Framework:** Next.js 15 (App Router) + TypeScript
- **Styling:** Tailwind CSS v3
- **Fonts:** `next/font` for **Inter** (sans, weight 400/500/600) and **Cormorant Garamond** (serif, weight 500/600)
- **Content:** MDX via `@next/mdx` + `gray-matter` for the 6 posts
- **Icons:** `lucide-react`
- **Animations:** `framer-motion` (light use, optional)
- **Deployment:** Vercel free tier, `output: "export"` is NOT used — we keep server rendering for SEO metadata, but no DB / no env secrets are required

The whole site is static-friendly (RSC + static generation). No backend, no env vars.

## Color palette (extracted from the live bundle)

| Token | Hex | Use |
|---|---|---|
| `cream` | `#FDFBF7` | page background |
| `cream-warm` | `#F4EAD5` | section accent bg |
| `sage-light` | `#E9EDC9` | soft accent bg |
| `sage` | `#CCD5AE` | accent fill |
| `sage-dark` | `#5A6658` | secondary text |
| `forest` | `#2D372B` | primary text / dark sections |
| `terracotta` | `#B2845A` | CTA / link accent |
| `peach` | `#D4A373` | CTA hover / highlight |
| `sand` | `#E9DCC4` | divider / card bg |

These will be added to `tailwind.config.ts` under `theme.extend.colors`.

## Routes / pages

| Path | File | Purpose |
|---|---|---|
| `/` | [app/page.tsx](app/page.tsx) | Single-page landing with sections: Hero, Sobre mí, Enfoque, Servicios, BlogPreview, Contacto |
| `/blog` | [app/blog/page.tsx](app/blog/page.tsx) | Blog index — list of 6 MDX posts |
| `/blog/[slug]` | [app/blog/[slug]/page.tsx](app/blog/[slug]/page.tsx) | Blog post detail, statically generated via `generateStaticParams` |

Navbar links: Inicio, Sobre mí, Servicios, Enfoque, Blog, Contacto (anchor links to `#sobre-mi`, `#enfoque`, `#servicios`, `#contacto`).

## Repo structure

```
casa-uma/
├── app/
│   ├── layout.tsx              # <html>, fonts, Navbar, Footer
│   ├── page.tsx                # Home (composes section components)
│   ├── globals.css             # Tailwind base + custom CSS variables
│   ├── blog/
│   │   ├── page.tsx            # Blog index
│   │   └── [slug]/page.tsx     # Blog post (renders MDX)
│   ├── sitemap.ts              # Auto sitemap from blog slugs
│   ├── robots.ts               # robots.txt
│   └── opengraph-image.tsx     # Optional OG image
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx            # "Un espacio cálido y seguro..." + CTA
│   │   ├── About.tsx           # Sobre mí — Mariana Souto bio
│   │   ├── Approach.tsx        # Enfoque integrativo (cog-cond + humanista + psicodinámico)
│   │   ├── Services.tsx        # 4 service cards (parejas, jóvenes, adultos, gestión emocional)
│   │   ├── BlogPreview.tsx     # 3 most recent posts on home
│   │   └── Contact.tsx         # Contact block w/ mailto link + WhatsApp/Instagram
│   └── ui/
│       ├── Button.tsx
│       └── Card.tsx
├── content/
│   └── posts/
│       ├── limites-en-el-amor-familia-amigos.mdx
│       ├── el-amor-propio-no-es-un-destino.mdx
│       ├── convivir-con-la-ansiedad.mdx
│       ├── el-estres-cronico-y-el-cuerpo.mdx
│       ├── entender-la-depresion-sin-juicio.mdx
│       └── estilos-de-apego-en-la-vida-adulta.mdx
├── lib/
│   └── posts.ts                # readPosts() / readPost(slug) — fs + gray-matter
├── public/
│   ├── favicon.ico
│   └── og.jpg
├── tailwind.config.ts          # Color palette + font families
├── postcss.config.mjs
├── next.config.mjs             # MDX setup
├── tsconfig.json
├── package.json
└── README.md                   # Setup + Vercel deploy instructions
```

## Content sources (already extracted from the live site)

The 6 blog posts (full Spanish content, frontmatter: `title`, `slug`, `excerpt`, `category`, `read_time`, `published_at`, `image_url`) will be ported from the live `/api/blog` payload — already captured during exploration:

1. `limites-en-el-amor-familia-amigos` — Relaciones · 6 min · 2025-10-12
2. `el-amor-propio-no-es-un-destino` — Autoestima · 5 min · 2025-09-28
3. `convivir-con-la-ansiedad` — Ansiedad · 7 min · 2025-09-10
4. `el-estres-cronico-y-el-cuerpo` — Estrés · 6 min · 2025-08-22
5. `entender-la-depresion-sin-juicio` — Depresión · 8 min · 2025-08-05
6. `estilos-de-apego-en-la-vida-adulta` — Relaciones · 7 min · 2025-07-18

All hero/section copy ("Un espacio cálido y seguro…", "Sesiones online · 45€ · 50 minutos", "Reservar primera sesión", "Acompaño a adolescentes y jóvenes adultos/as…", "Aquí comparto reflexiones sobre los temas que más trabajo en consulta…", etc.) is reproduced verbatim from the bundle.

Images reuse the same Unsplash/Pexels URLs used in the live site, plus we'll add the Inter + Cormorant fonts.

## Contact form → `mailto:`

Per your selection, `<Contact />` will render a `<form>` whose submit handler builds a `mailto:contacto@casauma.example?subject=…&body=…` URL using the field values, then calls `window.location.href = mailtoUrl`. No API route, no env vars, no third-party service.

The email recipient placeholder (`contacto@…`) will be a single constant in `components/sections/Contact.tsx` for the user to change. We'll also surface a direct WhatsApp/Instagram link block alongside the form.

## SEO

- Per-page `metadata` exports (title, description, OG)
- `app/sitemap.ts` enumerating `/`, `/blog`, and each `/blog/[slug]`
- `app/robots.ts`
- JSON-LD `LocalBusiness` + `Person` block on home

## Vercel deploy

1. `git init && git add . && git commit -m "Initial commit" && git push` to a new GitHub repo
2. On vercel.com → New Project → import the GitHub repo → defaults work (Framework: Next.js, Build: `next build`)
3. Free tier covers this site indefinitely (static + RSC, no functions invoked)
4. (Optional) Add a custom domain in Vercel → DNS → Domains

No env vars are needed.

## Verification

After implementation, verify locally and on a preview deployment:

1. `npm install && npm run dev` — boots on `http://localhost:3000`
2. Browse `/`, `/blog`, and each `/blog/<slug>` — all 6 posts render with correct typography and images
3. Anchor links in nav (`#sobre-mi`, `#enfoque`, `#servicios`, `#contacto`) scroll smoothly
4. Submit contact form → confirms it opens the mail client with prefilled subject/body
5. `npm run build` succeeds with zero errors and outputs static pages for all routes (`○ (Static)` in Next.js build summary)
6. Lighthouse on the built output: Performance ≥ 95, SEO = 100, Accessibility ≥ 95
7. Push to GitHub → Vercel preview deploys green; verify same checks on the preview URL