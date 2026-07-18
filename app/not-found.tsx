import type { Metadata } from "next"
import Link from "next/link"
import { siteConfig } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist on the ENCOGSYS website.",
  robots: {
    index: false,
    follow: true,
  },
}

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-5 text-center text-foreground">
      <p className="text-xs font-bold uppercase tracking-widest text-accent">404</p>
      <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Page not found</h1>
      <p className="mt-3 max-w-md text-sm text-muted-foreground sm:text-base">
        This link may be broken or the page may have moved. Return to {siteConfig.name} to continue.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-primary px-6 py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground"
        >
          Go home
        </Link>
        <a
          href="/#contact"
          className="rounded-full border border-border bg-card px-6 py-3 text-xs font-bold uppercase tracking-widest text-foreground"
        >
          Contact
        </a>
      </div>
    </main>
  )
}
