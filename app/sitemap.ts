import type { MetadataRoute } from "next"
import { absoluteUrl, siteConfig } from "@/lib/seo"

export default function sitemap(): MetadataRoute.Sitemap {
  // Stable dates help crawlers; bump when content meaningfully changes.
  const homeUpdated = new Date("2026-07-19")
  const aboutUpdated = new Date("2026-07-19")
  const careersUpdated = new Date("2026-07-19")

  return [
    {
      url: siteConfig.url,
      lastModified: homeUpdated,
      changeFrequency: "weekly",
      priority: 1,
      images: [absoluteUrl("/logo-full.png"), absoluteUrl("/about-office.jpg")],
    },
    {
      url: absoluteUrl("/about"),
      lastModified: aboutUpdated,
      changeFrequency: "monthly",
      priority: 0.9,
      images: [absoluteUrl("/about-office.jpg")],
    },
    {
      url: absoluteUrl("/careers"),
      lastModified: careersUpdated,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ]
}
