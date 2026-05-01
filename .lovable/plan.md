# SEO + Discoverability + Perf Upgrade

Five changes to `/` portfolio site, all SSR-safe and performance-conscious.

## 1. FAQ section with schema markup

Add a new `<section id="faq">` between Certifications and Contact in `src/routes/index.tsx`, plus an "FAQ" link in `navLinks`.

Content: 6 Q&A items covering both pillars of your hybrid profile:
- "What data analytics services do you offer?"
- "Which tools do you use for data analysis and BI?" (Power BI, SQL, Python, Excel, Orange)
- "How do you combine legal expertise with data analysis?"
- "What is your experience with regulatory and data-protection compliance?"
- "Can you help with AI / machine-learning projects?"
- "How can I download your CV or contact you?"

UI: animated accordion using existing `framer-motion` + `HiChevronDown` (already imported) — no new deps. Glass card styling consistent with the rest of the page.

Schema: append a second `application/ld+json` script in the route's `head()` with `@type: "FAQPage"` mirroring the same Q&A — Google's FAQ rich-result requirement is that on-page text matches schema.

## 2. sitemap.xml and robots.txt

Two new TanStack server routes (file-based, edge-rendered, cached):

- `src/routes/sitemap[.]xml.tsx` → returns XML listing `/` plus anchor URLs for the main sections (`#about`, `#portfolio`, `#faq`, `#contact`) with `lastmod`, `changefreq=monthly`, `priority`. Cache header `public, max-age=3600`.
- `src/routes/robots[.]txt.tsx` → returns `User-agent: *\nAllow: /\nSitemap: https://mohamedkhaledel-shayp.lovable.app/sitemap.xml`.

Both use the `server.handlers.GET` pattern with proper `Content-Type`.

## 3. Custom OpenGraph / Twitter preview image

Generate a 1200×630 branded share image (dark background matching site theme, name + title "Data Analyst & AI Specialist · LL.M International Law", emerald/cyan accents, your portrait). Save as `public/og-image.png`.

Wire into root `head()` (`src/routes/__root.tsx`) and `/` `head()`:
- `og:image`, `og:image:width=1200`, `og:image:height=630`, `og:image:alt`
- `twitter:image`, `twitter:card=summary_large_image`

This replaces the current auto-screenshot URL so shares look intentional.

## 4. Chatbot structured data + crawlable help section

- Add a third JSON-LD block in `/` head() with `@type: "WebApplication"` describing the Smart Assistant (name, applicationCategory: "BusinessApplication", browserRequirements, offers free, featureList).
- Add a small `<section id="assistant-help">` (or a subsection inside FAQ) with crawlable copy: "Meet the Smart Assistant", what it can answer (CV/projects/skills/availability), example prompts, privacy note. Always rendered in SSR HTML — no JS gating — so crawlers index it. Visually a compact glass card with a "Try it" button that opens the chatbot.

## 5. SSR / fast-render enhancements

Targeted, low-risk wins:

- **Preload hero image**: add `<link rel="preload" as="image" href="...mohamed.png">` to root `head().links` so the LCP image starts loading during HTML parse.
- **DNS prefetch / preconnect**: add `preconnect` to the Supabase URL (used by chatbot + tracking) and `dns-prefetch` for Google Fonts / Drive in root `head().links`.
- **Cache headers on server routes**: sitemap/robots return `Cache-Control: public, max-age=3600, s-maxage=86400`.
- **Defer chatbot mount**: lazy-load `Chatbot` with `React.lazy` + `<ClientOnly>` fallback so the heavy framer-motion launcher and ReactMarkdown don't block initial SSR/hydration. The hero/above-the-fold ships first; chatbot hydrates after.
- **Defer non-critical analytics**: wrap `trackCvDownload` insert in `requestIdleCallback` (with setTimeout fallback) — already fire-and-forget but moves it off the click critical path.
- **Image hints**: add `loading="lazy"` and `decoding="async"` to all dashboard/project `<img>` tags below the fold (the hero portrait stays eager). Most likely already partially done — will audit and fill gaps.

Not changing: `vite.config.ts` (managed preset), Worker SSR pipeline, route structure beyond the two new server routes.

## Files touched

- `src/routes/index.tsx` — FAQ section, assistant-help section, FAQPage + WebApplication JSON-LD, OG image meta, lazy chatbot, image hints, navLink entry.
- `src/routes/__root.tsx` — OG image meta, preload/preconnect hints.
- `src/routes/sitemap[.]xml.tsx` — new.
- `src/routes/robots[.]txt.tsx` — new.
- `public/og-image.png` — new (generated 1200×630).

## Out of scope

- No DB changes, no edge function changes, no new npm deps.
- No route restructuring (keeps single-page portfolio; sitemap uses anchor URLs).
