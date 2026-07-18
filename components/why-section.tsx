"use client"

import {
  BadgeCheck,
  Briefcase,
  Lightbulb,
  MessageSquare,
  TrendingUp,
  Hand,
  type LucideIcon,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"

type Reason = {
  icon: LucideIcon
  title: string
  description: string
}

const reasons: Reason[] = [
  {
    icon: BadgeCheck,
    title: "Enterprise-Grade Engineering",
    description: "We build software to the highest standards of architecture, security and performance from day one.",
  },
  {
    icon: Briefcase,
    title: "Deep Industry Expertise",
    description: "Teams that understand your sector, regulations and workflows so solutions fit your reality.",
  },
  {
    icon: Lightbulb,
    title: "Innovation-Driven",
    description: "We invest in emerging technologies so our clients benefit from the latest proven advances.",
  },
  {
    icon: MessageSquare,
    title: "Transparent Collaboration",
    description: "Clear communication, honest timelines and shared visibility into every milestone of delivery.",
  },
  {
    icon: TrendingUp,
    title: "Scalable by Design",
    description: "Solutions architected to grow with your business, not hold it back as demands evolve.",
  },
  {
    icon: Hand,
    title: "Long-Term Partnership",
    description: "We measure success by the lasting relationships we build, not just the projects we ship.",
  },
]

export function WhySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

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
      { threshold: 0.15 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="why" ref={sectionRef} className="py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <div
          className={`text-center transition-all duration-700 ease-out ${
            visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Why ENCOGSYS
          </h2>
          <p className="mx-auto mt-2 max-w-2xl font-display text-base font-semibold text-foreground/90 text-pretty sm:text-lg">
            Reasons enterprises choose us
          </p>
          <p className="mx-auto mt-2 max-w-2xl font-sans text-sm text-muted-foreground text-pretty sm:text-base">
            We combine engineering discipline with business acumen to deliver outcomes that last.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {reasons.map((reason, index) => (
            <article
              key={reason.title}
              className={`group flex flex-col items-center rounded-2xl border border-border bg-card p-5 text-center shadow-sm transition-all duration-700 ease-out hover:-translate-y-1 hover:border-sky-300 hover:shadow-md dark:hover:border-primary/40 ${
                visible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              }`}
              style={{ transitionDelay: visible ? `${index * 90}ms` : "0ms" }}
            >
              <span className="mb-4 flex size-14 items-center justify-center rounded-full bg-sky-50 shadow-sm ring-1 ring-sky-200/80 animate-float-up dark:bg-card dark:ring-primary/20">
                <reason.icon className="size-6 text-accent" strokeWidth={1.75} />
              </span>

              <h3 className="font-display text-base font-bold text-foreground sm:text-lg">{reason.title}</h3>

              <span className="mt-2 h-1 w-8 rounded-full bg-accent" aria-hidden="true" />

              <p className="mt-3 font-sans text-sm leading-relaxed text-muted-foreground">{reason.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
