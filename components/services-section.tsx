"use client"

import {
  Code2,
  Globe,
  Smartphone,
  Sparkles,
  Activity,
  Briefcase,
  HeartPulse,
  TrendingUp,
  type LucideIcon,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"

type Service = {
  icon: LucideIcon
  title: string
  description: string
}

const services: Service[] = [
  {
    icon: Code2,
    title: "Software Engineering",
    description: "Custom enterprise software engineered for scale, security and long-term maintainability.",
  },
  {
    icon: Globe,
    title: "Web Development",
    description: "High-performance, accessible web applications built with modern frameworks and best practices.",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "Native and cross-platform mobile experiences for iOS and Android with seamless UX.",
  },
  {
    icon: Sparkles,
    title: "AI & Machine Learning",
    description: "Intelligent automation and predictive analytics to transform data into actionable business insights.",
  },
  {
    icon: Activity,
    title: "Cloud Infrastructure",
    description: "Scalable, resilient cloud architectures designed for high availability and performance.",
  },
  {
    icon: Briefcase,
    title: "BPO",
    description: "Efficient business process outsourcing solutions to optimize your operations and reduce costs.",
  },
  {
    icon: HeartPulse,
    title: "Healthcare",
    description: "Specialized digital solutions for patient care management, compliance, and medical data analysis.",
  },
  {
    icon: TrendingUp,
    title: "Sales",
    description: "Advanced CRM and sales enablement tools to drive revenue and customer engagement.",
  },
]

export function ServicesSection() {
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
    <section id="services" className="py-12 sm:py-16" ref={sectionRef}>
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <div
          className={`text-center transition-all duration-700 ease-out ${
            visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Services</h2>
          <p className="mx-auto mt-2 max-w-2xl font-sans text-sm text-muted-foreground text-pretty sm:text-base">
            End-to-end engineering lifecycle
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {services.map((service, index) => (
            <article
              key={service.title}
              className={`group flex flex-col items-center rounded-2xl border border-border bg-card p-5 text-center shadow-sm transition-all duration-700 ease-out hover:-translate-y-1 hover:border-sky-300 hover:shadow-md dark:hover:border-primary/40 ${
                visible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              }`}
              style={{ transitionDelay: visible ? `${index * 90}ms` : "0ms" }}
            >
              <span className="mb-4 flex size-14 items-center justify-center rounded-full bg-sky-50 shadow-sm ring-1 ring-sky-200/80 animate-float-up dark:bg-card dark:ring-primary/20">
                <service.icon className="size-6 text-accent" strokeWidth={1.75} />
              </span>

              <h3 className="font-display text-base font-bold text-foreground sm:text-lg">{service.title}</h3>

              <span className="mt-2 h-1 w-8 rounded-full bg-accent" aria-hidden="true" />

              <p className="mt-3 font-sans text-sm leading-relaxed text-muted-foreground">{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
