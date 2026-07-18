import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function CareersSection() {
  return (
    <section id="careers" className="py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-primary p-7 text-center md:flex-row md:items-center lg:p-9">
          <div className="text-center md:text-left">
            <h3 className="font-display text-2xl font-extrabold text-primary-foreground sm:text-3xl">
              Build your career at ENCOGSYS
            </h3>
            <p className="mx-auto mt-2 max-w-lg text-sm text-primary-foreground/85 sm:text-base md:mx-0">
              Join a team that values growth, innovation and meaningful work. Explore open roles in software engineering
              and senior BPO operations.
            </p>
          </div>
          <Link
            href="/careers"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-primary-foreground/40 px-6 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary-foreground/10"
          >
            View open positions
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
