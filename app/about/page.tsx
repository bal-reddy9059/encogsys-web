import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { BreadcrumbJsonLd } from "@/components/json-ld"
import { absoluteUrl, siteConfig } from "@/lib/seo"

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Encogsys — Engineering Innovation. Empowering Growth. We deliver software, cloud, AI, cybersecurity, BPO and digital solutions for lasting business value.",
  keywords: [
    "about Encogsys",
    "ENCOGSYS company",
    "technology partner Bangalore",
    "digital transformation company",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: `About ${siteConfig.name} — ${siteConfig.tagline}`,
    description:
      "Encogsys empowers businesses with innovative technology solutions that drive digital transformation, operational excellence, and sustainable growth.",
    url: absoluteUrl("/about"),
    type: "website",
    images: [{ url: absoluteUrl("/about-office.jpg"), alt: "ENCOGSYS team" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `About ${siteConfig.name}`,
    description:
      "Encogsys empowers businesses with innovative technology solutions that drive digital transformation and sustainable growth.",
    images: [absoluteUrl("/about-office.jpg")],
  },
  robots: {
    index: true,
    follow: true,
  },
}

const expertise = [
  "Custom Software Development",
  "Website Development",
  "Mobile Application Development",
  "Artificial Intelligence",
  "Cloud Solutions",
  "Cybersecurity",
  "Business Process Outsourcing (BPO)",
  "Sales Services",
  "Insurance Solutions",
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />
      <SiteHeader />

      <article className="mx-auto max-w-5xl px-5 pb-12 pt-28 text-center sm:pb-16 sm:pt-32 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-muted-foreground">
          <ol className="flex flex-wrap items-center justify-center gap-2">
            <li>
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-semibold text-foreground" aria-current="page">
              About
            </li>
          </ol>
        </nav>
        <p className="font-display text-2xl font-bold tracking-tight text-accent sm:text-3xl">About Encogsys</p>
        <h1 className="mt-3 font-display text-xl font-semibold tracking-tight text-foreground text-balance sm:text-2xl md:text-3xl">
          Engineering Innovation. Empowering Growth.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl font-display text-base font-semibold text-foreground/90 text-pretty sm:text-lg">
          Transforming Ideas into Intelligent Digital Solutions.
        </p>

        <div className="mx-auto mt-10 max-w-3xl space-y-5 text-sm leading-relaxed text-muted-foreground text-pretty sm:text-base">
          <p>
            At <span className="font-semibold text-foreground">Encogsys</span>, we empower businesses with innovative
            technology solutions that drive digital transformation, operational excellence, and sustainable growth. By
            combining cutting-edge technology with deep industry expertise, we help organizations solve complex
            challenges, optimize business processes, and unlock new opportunities in an ever-evolving digital landscape.
          </p>
          <p>
            From startups to large enterprises, we deliver tailored solutions designed to meet unique business
            requirements while ensuring scalability, security, and long-term value.
          </p>
          <p>
            Our expertise spans{" "}
            <span className="font-semibold text-foreground">
              Custom Software Development, Website Development, Mobile Application Development, Artificial Intelligence,
              Cloud Solutions, Cybersecurity, Business Process Outsourcing (BPO), Sales Services, and Insurance
              Solutions
            </span>
            , enabling businesses to accelerate innovation and stay ahead in today&apos;s competitive market.
          </p>
          <p>
            Driven by innovation, quality, and customer success, we follow industry best practices and agile
            methodologies to build secure, high-performance, and future-ready digital products. Every solution we create
            is engineered to enhance productivity, improve customer experiences, and deliver measurable business
            outcomes.
          </p>
          <p>
            At <span className="font-semibold text-foreground">Encogsys</span>, we believe technology is more than just
            software—it&apos;s a catalyst for transformation. As your trusted technology partner, we&apos;re committed
            to turning ambitious ideas into impactful digital experiences that create lasting business value.
          </p>
        </div>

        <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2">
          {expertise.map((item) => (
            <span
              key={item}
              className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground sm:text-sm"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2">
          <section className="rounded-2xl border border-border bg-card p-6 text-center">
            <h2 className="font-display text-xl font-bold text-foreground sm:text-2xl">Mission</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty sm:text-base">
              To empower organizations with innovative, secure, and scalable technology solutions that accelerate
              digital transformation and drive sustainable business success.
            </p>
          </section>
          <section className="rounded-2xl border border-border bg-card p-6 text-center">
            <h2 className="font-display text-xl font-bold text-foreground sm:text-2xl">Vision</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty sm:text-base">
              To become a globally trusted technology partner recognized for delivering intelligent digital solutions,
              exceptional customer experiences, and continuous innovation.
            </p>
          </section>
        </div>

        <div className="mx-auto mt-12 max-w-3xl border-t border-border pt-8">
          <p className="font-display text-2xl font-bold text-foreground">Encogsys</p>
          <p className="mt-2 font-display text-lg font-semibold text-accent">
            Engineering Innovation. Empowering Growth.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href="/#contact"
            className="inline-flex rounded-full bg-primary px-6 py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Get in touch
          </a>
          <a
            href="/#services"
            className="inline-flex rounded-full border border-border bg-card px-6 py-3 text-xs font-bold uppercase tracking-widest text-foreground transition-colors hover:bg-muted"
          >
            Our services
          </a>
        </div>
      </article>

      <WhatsAppButton />
    </main>
  )
}
