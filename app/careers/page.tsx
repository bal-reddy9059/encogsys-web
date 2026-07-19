import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Briefcase, Clock, MapPin } from "lucide-react"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { positions } from "@/lib/positions"
import { absoluteUrl, siteConfig } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/json-ld"

export const metadata: Metadata = {
  title: "Careers & Open Positions",
  description:
    "Explore senior software engineering and BPO careers at ENCOGSYS in Bengaluru. Join a team that values growth, innovation and meaningful work.",
  keywords: [
    "ENCOGSYS careers",
    "software engineer jobs Bangalore",
    "BPO jobs Bengaluru",
    "full stack developer jobs",
    "IT jobs Encogsys",
  ],
  alternates: {
    canonical: "/careers",
  },
  openGraph: {
    title: `Careers at ${siteConfig.name} — Open Positions`,
    description:
      "Senior software and BPO roles for professionals ready to grow with ENCOGSYS.",
    url: absoluteUrl("/careers"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Careers at ${siteConfig.name}`,
    description: "Explore open software and BPO positions at ENCOGSYS.",
  },
}

export default function CareersPage() {
  const jobPostings = positions.map((position) => ({
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: position.title,
    description: position.summary,
    datePosted: position.datePosted,
    validThrough: position.validThrough,
    employmentType: "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: siteConfig.name,
      sameAs: siteConfig.url,
      logo: absoluteUrl("/logo-icon.png"),
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bengaluru",
        addressRegion: "Karnataka",
        addressCountry: "IN",
      },
    },
    applicantLocationRequirements: {
      "@type": "Country",
      name: "India",
    },
    experienceRequirements: position.experience,
    industry: position.category === "Software" ? "Software" : "Business Process Outsourcing",
    url: absoluteUrl("/careers"),
    directApply: false,
  }))

  return (
    <main className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostings) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Careers", path: "/careers" },
        ]}
      />
      <div className="mx-auto max-w-5xl px-5 pb-12 pt-10 sm:pb-16 sm:pt-14 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6 text-center text-xs text-muted-foreground">
          <ol className="flex flex-wrap items-center justify-center gap-2">
            <li>
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-semibold text-foreground" aria-current="page">
              Careers
            </li>
          </ol>
        </nav>
        <header className="text-center">
          <p className="font-display text-2xl font-bold tracking-tight text-accent sm:text-3xl">Careers</p>
          <h1 className="mt-3 font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl md:text-3xl">
            Open positions
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground text-pretty sm:text-base">
            Find your next role in software or BPO — and grow with a team that values quality work and real impact.
          </p>
        </header>

        <div className="mt-10 grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 md:gap-5">
          {positions.map((position) => (
            <article
              key={position.title}
              className="flex h-full flex-col items-center overflow-hidden rounded-2xl border border-border bg-card p-6 text-center shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-center gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                    position.category === "Software" ? "bg-primary/15 text-accent" : "bg-accent/15 text-accent"
                  }`}
                >
                  {position.category}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="size-3.5" />
                  {position.type}
                </span>
              </div>

              <h2 className="mt-4 font-display text-xl font-bold text-foreground">{position.title}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{position.summary}</p>

              <div className="mt-5 flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="size-3.5 text-accent" />
                  {position.location}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Briefcase className="size-3.5 text-accent" />
                  {position.experience}
                </span>
              </div>

              <a
                href="/#contact"
                className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold text-foreground transition-colors hover:text-accent"
              >
                Apply now
                <ArrowRight className="size-4" />
              </a>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="/#careers"
            className="inline-flex rounded-full border border-border bg-card px-6 py-3 text-xs font-bold uppercase tracking-widest text-foreground transition-colors hover:bg-muted"
          >
            Back to careers
          </a>
        </div>
      </div>

      <WhatsAppButton />
    </main>
  )
}
