import { createFileRoute } from "@tanstack/react-router";

const SITE = "https://mohamedkhaledel-shayp.lovable.app";

const urls = [
  { loc: "/", priority: "1.0", changefreq: "weekly" },
  { loc: "/#about", priority: "0.8", changefreq: "monthly" },
  { loc: "/#skills", priority: "0.8", changefreq: "monthly" },
  { loc: "/#experience", priority: "0.8", changefreq: "monthly" },
  { loc: "/#portfolio", priority: "0.9", changefreq: "monthly" },
  { loc: "/#education", priority: "0.6", changefreq: "yearly" },
  { loc: "/#certifications", priority: "0.7", changefreq: "monthly" },
  { loc: "/#faq", priority: "0.8", changefreq: "monthly" },
  { loc: "/#assistant-help", priority: "0.6", changefreq: "monthly" },
  { loc: "/#contact", priority: "0.9", changefreq: "monthly" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const lastmod = new Date().toISOString().split("T")[0];
        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url>\n    <loc>${SITE}${u.loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
  )
  .join("\n")}
</urlset>`;
        return new Response(body, {
          status: 200,
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600, s-maxage=86400",
          },
        });
      },
    },
  },
});
