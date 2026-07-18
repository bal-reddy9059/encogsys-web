import Link from "next/link"
import { ArrowRight, Lightbulb, ShieldCheck, Users } from "lucide-react"

const features = [
  {
    icon: Lightbulb,
    title: "Innovation embedded in every engagement",
    description: "We embrace new ideas and technologies to create impactful, future-ready solutions.",
  },
  {
    icon: ShieldCheck,
    title: "Security and quality as foundational principles",
    description: "We build resilient systems with the highest standards of security, quality and compliance.",
  },
  {
    icon: Users,
    title: "Customer focus that drives every decision",
    description: "Our customers are at the heart of everything we do. We listen, collaborate and deliver with commitment.",
  },
]

export function AboutSection() {
  return (
    <section id="about" className="py-12 sm:py-16">
      <div className="mx-auto grid max-w-5xl items-center gap-10 px-5 lg:grid-cols-2 lg:gap-12 lg:px-8">
        <div className="min-w-0 text-center lg:text-left">
          <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            About Us
          </h2>
          <span className="mx-auto mt-3 block h-1 w-14 rounded-full bg-accent lg:mx-0" aria-hidden="true" />

          <p className="mx-auto mt-4 max-w-xl font-display text-base font-semibold text-foreground/90 text-pretty sm:text-lg lg:mx-0">
            A partner built for long-term transformation
          </p>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground text-pretty sm:text-base lg:mx-0">
            We are a technology services company that helps enterprises navigate complexity with clarity. From strategy
            to execution, we combine engineering excellence with deep industry knowledge to deliver solutions that stand
            the test of time.
          </p>

          <ul className="mx-auto mt-8 max-w-xl space-y-5 text-left lg:mx-0">
            {features.map((feature) => (
              <li key={feature.title} className="flex items-start gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-sky-50 ring-1 ring-sky-200/80 dark:bg-card dark:ring-primary/20">
                  <feature.icon className="size-5 text-accent" strokeWidth={1.75} />
                </span>
                <div className="min-w-0 pt-0.5">
                  <h3 className="font-display text-base font-bold text-foreground sm:text-lg">{feature.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                </div>
              </li>
            ))}
          </ul>

          <Link
            href="/about"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-accent/50 px-5 py-2.5 text-sm font-semibold text-accent transition-colors hover:border-accent hover:bg-accent/5"
          >
            Learn more about us
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="relative z-0 min-w-0 pb-8 sm:pb-10">
          <div className="overflow-hidden rounded-2xl border border-border shadow-2xl">
            <img
              src="/about-office.jpg?v=5"
              alt="ENCOGSYS team collaborating in a modern office"
              width={1600}
              height={1067}
              className="relative z-0 block h-auto w-full object-cover"
            />
          </div>

          <div className="absolute -bottom-1 -left-2 z-10 sm:-bottom-2 sm:-left-4">
            <div className="rounded-2xl bg-accent px-5 py-4 text-white shadow-xl ring-4 ring-background sm:px-6 sm:py-5">
              <p className="font-display text-3xl font-extrabold leading-none tracking-tight sm:text-4xl">100%</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-white/90">Commitment</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
