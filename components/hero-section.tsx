"use client"

import { useEffect, useState } from "react"

const heroSlides = [
  {
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2400&q=80",
    alt: "Modern enterprise workspace",
    eyebrow: "Modern workplaces",
    titleBefore: "Spaces that",
    accent: "inspire",
    titleAfter: "performance",
    description:
      "We design digital workplaces and enterprise platforms that help teams collaborate, decide faster, and deliver with clarity.",
  },
  {
    src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2400&q=80",
    alt: "Global technology network",
    eyebrow: "Connected systems",
    titleBefore: "Technology that",
    accent: "connects",
    titleAfter: "the world",
    description:
      "From cloud networks to secure integrations, ENCOGSYS builds connected platforms that scale across regions and partners.",
  },
  {
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=80",
    alt: "Corporate skyline at dusk",
    eyebrow: "Enterprise growth",
    titleBefore: "Solutions built for",
    accent: "ambition",
    titleAfter: "at scale",
    description:
      "We partner with growing organizations to engineer software, cloud, and AI solutions that turn strategy into measurable outcomes.",
  },
  {
    src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=2400&q=80",
    alt: "Data center infrastructure",
    eyebrow: "Reliable infrastructure",
    titleBefore: "Cloud and data,",
    accent: "engineered",
    titleAfter: "for uptime",
    description:
      "Secure infrastructure, resilient architectures, and modern data platforms — ready for the workloads that matter most.",
  },
  {
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2400&q=80",
    alt: "Team collaborating on digital solutions",
    eyebrow: "People & delivery",
    titleBefore: "Teams that",
    accent: "build",
    titleAfter: "what matters",
    description:
      "Our specialists work alongside yours to design, ship, and support digital products that create lasting business impact.",
  },
]

export function HeroSection() {
  const [active, setActive] = useState(0)
  const slide = heroSlides[active]

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % heroSlides.length)
    }, 5500)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <section id="home" className="relative min-h-svh overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        {heroSlides.map((image, index) => (
          <div
            key={image.src}
            className={`absolute inset-0 transition-opacity duration-1400 ease-in-out ${
              index === active ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image.src}
              alt={index === active ? image.alt : ""}
              className={`h-full w-full object-cover transition-transform duration-9000 ease-out ${
                index === active ? "scale-110" : "scale-100"
              }`}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-black/50 dark:bg-black/45" />
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/80 dark:from-black/55 dark:via-black/40 dark:to-(--hero-fade)" />
        <div className="absolute inset-0 hidden bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,17,34,0.45)_100%)] dark:block" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-svh w-full max-w-7xl flex-col items-start justify-center px-5 pb-32 pt-24 text-left sm:px-8 sm:pb-24 sm:pt-28 lg:px-10">
        <div key={active} className="animate-hero-copy max-w-4xl">
          <p className="mb-5 flex max-w-xs flex-wrap items-center justify-start gap-x-2 gap-y-1 font-sans text-xs font-semibold uppercase tracking-widest text-white/70 sm:mb-6 sm:max-w-none sm:gap-3">
            <span className="h-px w-4 shrink-0 bg-[#3B82F6] sm:w-6" aria-hidden="true" />
            <span>{slide.eyebrow}</span>
          </p>

          <h1 className="font-display text-3xl font-bold uppercase leading-snug tracking-wide text-white min-[400px]:text-4xl sm:text-5xl sm:leading-tight md:text-6xl lg:text-7xl lg:leading-none">
            <span className="block">{slide.titleBefore}</span>
            <span className="block text-[#3B82F6]">{slide.accent}</span>
            <span className="block">{slide.titleAfter}</span>
          </h1>

          <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-white/75 text-pretty sm:mt-8 sm:text-lg">
            {slide.description}
          </p>
        </div>

        <div className="mt-8 flex w-full max-w-md flex-col items-stretch gap-3 pr-14 sm:mt-10 sm:max-w-none sm:flex-row sm:items-center sm:justify-start sm:gap-4 sm:pr-0">
          <a
            href="#contact"
            className="rounded-full bg-white px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#1a1a2e] transition-transform hover:scale-105 active:scale-95 sm:px-8 sm:py-4 sm:text-sm"
          >
            Start your project
          </a>
          <a
            href="#services"
            className="rounded-full border border-white/35 bg-white/10 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:px-8 sm:py-4 sm:text-sm"
          >
            Our capabilities
          </a>
        </div>

        <div
          className="absolute bottom-8 left-5 flex items-center gap-2 sm:left-8 lg:left-10"
          role="tablist"
          aria-label="Hero image slides"
        >
          {heroSlides.map((image, index) => (
            <button
              key={image.src}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-label={image.alt}
              onClick={() => setActive(index)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                index === active ? "w-8 bg-white" : "w-1.5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>

      <span className="sr-only" aria-live="polite">
        {slide.alt}. {slide.titleBefore} {slide.accent} {slide.titleAfter}
      </span>
    </section>
  )
}
