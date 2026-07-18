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
    image: absoluteUrl("/logo-full.png"),
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    slogan: siteConfig.tagline,
    foundingLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: siteConfig.address.city,
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
    ],
    knowsAbout: services,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "ENCOGSYS Services",
      itemListElement: services.map((name, index) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name,
          provider: { "@id": `${siteConfig.url}/#organization` },
        },
        position: index + 1,
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

  const webPages = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "ENCOGSYS Site Pages",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        url: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About",
        url: absoluteUrl("/about"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Careers",
        url: absoluteUrl("/careers"),
      },
    ],
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPages) }}
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
