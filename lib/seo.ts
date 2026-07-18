function resolveSiteUrl() {
  const fallback = "https://encogsys.com"
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "")
  if (!raw) return fallback
  try {
    const url = new URL(raw)
    if (url.protocol !== "http:" && url.protocol !== "https:") return fallback
    return url.origin
  } catch {
    return fallback
  }
}

export const siteConfig = {
  name: "ENCOGSYS",
  legalName: "ENCOGSYS PVT LTD",
  tagline: "Engineering Innovation. Empowering Growth.",
  description:
    "ENCOGSYS is a technology services company delivering custom software, cloud, AI, cybersecurity, mobile apps, BPO, and digital solutions that drive transformation and sustainable growth.",
  url: resolveSiteUrl(),
  locale: "en_IN",
  email: "admin@encogsys.com",
  phone: "+917013853007",
  phoneDisplay: "+91 70138 53007",
  address: {
    street: "2nd Floor, 475 Croissance Hub, RBI Layout, J P Nagar",
    city: "Bengaluru",
    region: "Karnataka",
    postalCode: "560078",
    country: "IN",
  },
  social: {
    linkedin: "https://www.linkedin.com/company/encogsys/",
    twitter: "https://x.com/encogsys",
    instagram: "https://www.instagram.com/en_cog_sys/",
  },
  keywords: [
    "ENCOGSYS",
    "Encogsys",
    "software development company Bangalore",
    "custom software development",
    "web development",
    "mobile app development",
    "cloud solutions",
    "artificial intelligence",
    "cybersecurity",
    "BPO services",
    "digital transformation",
    "IT services India",
  ],
} as const

export function absoluteUrl(path = "/") {
  const base = siteConfig.url
  if (!path || path === "/") return base
  return `${base}${path.startsWith("/") ? path : `/${path}`}`
}
