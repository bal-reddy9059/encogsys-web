"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

/** Scrolls to `#section` after client navigations (Next.js Link often skips hash scroll). */
export function HashScroll() {
  const pathname = usePathname()

  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash.replace(/^#/, "")
      if (!hash) return
      const el = document.getElementById(hash)
      if (!el) return
      // Wait a tick for layout (fonts/images) to settle
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" })
      })
    }

    scrollToHash()
    window.addEventListener("hashchange", scrollToHash)
    return () => window.removeEventListener("hashchange", scrollToHash)
  }, [pathname])

  return null
}
