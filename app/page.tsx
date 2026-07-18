import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { ClientsMarquee } from "@/components/clients-marquee"
import { AboutSection } from "@/components/about-section"
import { ServicesSection } from "@/components/services-section"
import { WhySection } from "@/components/why-section"
import { IndustriesSection } from "@/components/industries-section"
import { CareersSection } from "@/components/careers-section"
import { ContactSection } from "@/components/contact-section"
import { SiteFooter } from "@/components/site-footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { absoluteUrl, siteConfig } from "@/lib/seo"

export const metadata: Metadata = {
  title: {
    absolute: `${siteConfig.name} — ${siteConfig.tagline}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: absoluteUrl("/"),
  },
}

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <HeroSection />
      <ClientsMarquee />
      <AboutSection />
      <ServicesSection />
      <WhySection />
      <IndustriesSection />
      <CareersSection />
      <ContactSection />
      <SiteFooter />
      <WhatsAppButton />
    </main>
  )
}
