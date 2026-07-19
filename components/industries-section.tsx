"use client"

import {
  Landmark,
  ShieldCheck,
  Heart,
  GraduationCap,
  ShoppingBag,
  Settings,
  Truck,
  Monitor,
  ArrowRight,
  ChevronUp,
  type LucideIcon,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"

type Industry = {
  icon: LucideIcon
  title: string
  description: string
}

const industries: Industry[] = [
  {
    icon: Landmark,
    title: "Banking",
    description:
      "Digital banking platforms, payments, risk and compliance solutions for financial institutions.",
  },
  {
    icon: ShieldCheck,
    title: "Insurance",
    description:
      "Policy, claims and underwriting technology that improves accuracy and customer experience.",
  },
  {
    icon: Heart,
    title: "Healthcare",
    description: "HIPAA-compliant platforms for EHR, telehealth, analytics and patient engagement.",
  },
  {
    icon: GraduationCap,
    title: "Education",
    description: "EdTech, LMS and student information systems that transform teaching and learning.",
  },
  {
    icon: ShoppingBag,
    title: "Retail",
    description: "Omnichannel commerce, inventory and customer experience platforms for modern retailers.",
  },
  {
    icon: Settings,
    title: "Manufacturing",
    description: "Smart factory, IoT and ERP integration that optimizes production and quality control.",
  },
  {
    icon: Truck,
    title: "Logistics",
    description: "Fleet, warehouse and route optimization platforms that keep supply chains moving efficiently.",
  },
  {
    icon: Monitor,
    title: "Technology",
    description: "Product engineering, platform modernization and scaling support for technology companies.",
  },
]

const FIRST_ROW_COUNT = 3

export function IndustriesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const visibleIndustries = showAll ? industries : industries.slice(0, FIRST_ROW_COUNT)

  function handleToggleMore() {
    if (showAll) {
      // Collapsing shortens the page; keep Industries in view (don't jump to Careers).
      const sectionTop = sectionRef.current
        ? window.scrollY + sectionRef.current.getBoundingClientRect().top
        : window.scrollY
      setShowAll(false)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          window.scrollTo({ top: Math.max(0, sectionTop - 96), behavior: "auto" })
        })
      })
      return
    }
    setShowAll(true)
  }

  return (
    <section id="industries" ref={sectionRef} className="py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <div
          className={`text-center transition-all duration-700 ease-out ${
            visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Industries</h2>
          <p className="mx-auto mt-2 max-w-2xl font-display text-base font-semibold text-foreground/90 text-pretty sm:text-lg">
            Sector expertise that accelerates outcomes
          </p>
          <p className="mx-auto mt-2 max-w-2xl font-sans text-sm text-muted-foreground text-pretty sm:text-base">
            We bring deep domain knowledge across the industries that power the global economy.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {visibleIndustries.map((industry, index) => (
            <article
              key={industry.title}
              className={`group flex flex-col items-center rounded-2xl border border-border bg-card p-5 text-center shadow-sm transition-all duration-700 ease-out hover:-translate-y-1 hover:border-sky-300 hover:shadow-md dark:hover:border-primary/40 ${
                visible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              }`}
              style={{ transitionDelay: visible ? `${index * 90}ms` : "0ms" }}
            >
              <span className="mb-4 flex size-14 items-center justify-center rounded-full bg-sky-50 shadow-sm ring-1 ring-sky-200/80 animate-float-up dark:bg-card dark:ring-primary/20">
                <industry.icon className="size-6 text-accent" strokeWidth={1.75} />
              </span>

              <h3 className="font-display text-base font-bold text-foreground sm:text-lg">{industry.title}</h3>

              <span className="mt-2 h-1 w-8 rounded-full bg-accent" aria-hidden="true" />

              <p className="mt-3 font-sans text-sm leading-relaxed text-muted-foreground">{industry.description}</p>
            </article>
          ))}
        </div>

        <div
          className={`mt-8 text-center transition-all duration-700 ease-out ${
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: visible ? "320ms" : "0ms" }}
        >
          <button
            type="button"
            onClick={handleToggleMore}
            className="inline-flex items-center gap-2 font-display text-sm font-bold text-foreground transition-colors hover:text-accent"
          >
            {showAll ? (
              <>
                Show less
                <ChevronUp className="size-4" />
              </>
            ) : (
              <>
                View more
                <ArrowRight className="size-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  )
}
