import { siteConfig, absoluteUrl } from "@/lib/seo"

const services = [
  "Software Engineering",
  "Web Development",
  "Mobile Apps",
  "AI & Machine Learning",
  "Cloud Infrastructure",
  "BPO",
  "Healthcare Solutions",
  "Sales Services",
]

export function JsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/logo-icon.png"),
      width: 512,
      height: 512,
    },
    image: [absoluteUrl("/logo-full.png"), absoluteUrl("/about-office.jpg")],
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    slogan: siteConfig.tagline,
    foundingLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: siteConfig.address.city,
        addressRegion: siteConfig.address.region,
        addressCountry: siteConfig.address.country,
      },
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 12.9076,
      longitude: 77.5853,
    },
    sameAs: [siteConfig.social.linkedin, siteConfig.social.twitter, siteConfig.social.instagram],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.phone,
        contactType: "customer service",
        email: siteConfig.email,
        areaServed: ["IN", "Worldwide"],
        availableLanguage: ["English", "Hindi", "Kannada"],
      },
      {
        "@type": "ContactPoint",
        telephone: siteConfig.phone,
        contactType: "sales",
        email: siteConfig.email,
        areaServed: "IN",
      },
    ],
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "AdministrativeArea", name: "Karnataka" },
      { "@type": "City", name: "Bengaluru" },
    ],
    knowsAbout: services,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "ENCOGSYS Services",
      itemListElement: services.map((name) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name,
          provider: { "@id": `${siteConfig.url}/#organization` },
        },
      })),
    },
  }

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    alternateName: ["Encogsys", "ENCOGSYS PVT LTD"],
    description: siteConfig.description,
    publisher: { "@id": `${siteConfig.url}/#organization` },
    inLanguage: "en-IN",
    copyrightHolder: { "@id": `${siteConfig.url}/#organization` },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  )
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; path: string }[]
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}
