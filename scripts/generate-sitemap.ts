import { writeFileSync, mkdirSync } from "fs"
import { resolve } from "path"

const BASE_URL = "https://eco-bantu-recycle.lovable.app"

interface SitemapEntry {
  path: string
  changefreq?: "weekly" | "monthly" | "yearly"
  priority?: string
}

const entries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/blog", changefreq: "weekly", priority: "0.8" },
  { path: "/blog/corporate-e-waste-management-guide", changefreq: "monthly", priority: "0.7" },
  { path: "/directory", changefreq: "weekly", priority: "0.8" },
  { path: "/tools", changefreq: "monthly", priority: "0.7" },
  { path: "/tools/pickup", changefreq: "monthly", priority: "0.7" },
  { path: "/tools/quote", changefreq: "monthly", priority: "0.7" },
  { path: "/tools/value", changefreq: "monthly", priority: "0.6" },
  { path: "/tools/impact", changefreq: "monthly", priority: "0.6" },
  { path: "/tools/locations", changefreq: "monthly", priority: "0.6" },
  { path: "/tools/certificate", changefreq: "monthly", priority: "0.5" },
]

const xml = [
  `<?xml version="1.0" encoding="UTF-8"?>`,
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
  ...entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ].filter(Boolean).join("\n"),
  ),
  `</urlset>`,
].join("\n")

mkdirSync(resolve("public"), { recursive: true })
writeFileSync(resolve("public/sitemap.xml"), xml)
console.log(`sitemap.xml written (${entries.length} entries)`)
