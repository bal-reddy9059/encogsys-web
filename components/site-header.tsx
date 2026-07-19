"use client"

import { BrandLogo } from "@/components/brand-logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { X } from "lucide-react"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const navItems = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Industries", id: "industries" },
  { label: "Careers", id: "careers" },
  { label: "Contact", id: "contact" },
]

const menuItems = navItems

const sectionIds = ["home", "clients", "about", "services", "why", "industries", "careers", "contact"]

export function SiteHeader() {
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeId, setActiveId] = useState("home")

  // Map non-nav sections to the closest primary nav item for highlighting
  const highlightedId =
    activeId === "clients" ? "home" : activeId === "why" ? "services" : activeId

  // Only show on the hero (#home) — hide while scrolling other home sections
  const showFloatingBar = activeId === "home"

  useEffect(() => {
    if (!isHomePage) {
      setMenuOpen(false)
      return
    }

    const onScroll = () => {
      setScrolled(window.scrollY > 24)

      const offset = 120
      let current = sectionIds[0]
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (!el) continue
        const top = el.getBoundingClientRect().top
        if (top - offset <= 0) current = id
      }
      setActiveId(current)
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("hashchange", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("hashchange", onScroll)
    }
  }, [isHomePage])

  useEffect(() => {
    if (activeId !== "home" && menuOpen) setMenuOpen(false)
  }, [activeId, menuOpen])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  // Nav only on the home page — visible in light and dark theme
  if (!isHomePage) return null

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`relative z-110 mx-auto max-w-[1440px] px-3 pt-3 transition-all duration-300 sm:px-6 sm:pt-4 lg:px-8 ${
          showFloatingBar
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-8 opacity-0"
        }`}
        aria-hidden={!showFloatingBar}
      >
        <div
          className={`flex w-full items-center justify-between gap-2 rounded-full border px-2.5 py-1.5 backdrop-blur-md transition-all duration-300 sm:gap-3 sm:px-4 sm:py-2.5 md:px-5 lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-4 ${
            scrolled ? "scale-[0.99]" : ""
          }`}
          style={{
            background: "var(--nav-glass)",
            borderColor: "var(--nav-glass-border)",
            boxShadow: "var(--nav-shadow)",
          }}
        >
          <div className="flex min-w-0 flex-1 items-center justify-self-start overflow-hidden lg:flex-none">
            <BrandLogo size="md" tone="onLight" className="min-w-0 max-w-full" />
          </div>

          <nav className="hidden justify-self-center lg:flex" aria-label="Primary">
            <ul className="flex items-center gap-0.5 rounded-full bg-white px-1.5 py-1 shadow-sm dark:bg-white/95">
              {navItems.map((item) => {
                const isActive = highlightedId === item.id
                return (
                  <li key={item.label}>
                    <a
                      href={`#${item.id}`}
                      aria-current={isActive ? "page" : undefined}
                      className={`block whitespace-nowrap rounded-full px-3 py-1.5 text-[12px] font-semibold tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 xl:px-3.5 ${
                        isActive
                          ? "bg-sky-600 text-white shadow-sm"
                          : "text-sky-900 hover:bg-sky-50"
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center justify-self-end gap-1.5 sm:gap-2.5">
            <ThemeToggle className="size-8 bg-white text-sky-800 shadow-sm ring-0 hover:bg-white/90 sm:size-10 md:size-10" />
            <a
              href="#contact"
              className="hidden shrink-0 rounded-full bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-sky-700 shadow-sm transition-all hover:bg-sky-50 hover:text-sky-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 sm:inline-flex md:px-5 md:py-2.5 md:text-xs"
            >
              GET IN touch
            </a>
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="vertical-nav"
              onClick={() => setMenuOpen((open) => !open)}
              className="pointer-events-auto flex size-8 shrink-0 items-center justify-center rounded-full bg-white text-sky-700 shadow-sm transition-all hover:scale-105 hover:bg-white/90 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 sm:size-10"
            >
              {menuOpen ? (
                <X className="size-4 sm:size-5" strokeWidth={2.25} />
              ) : (
                <span className="flex flex-col items-center justify-center gap-[4px] sm:gap-[5px]">
                  <span className="block h-0.5 w-3.5 rounded-full bg-current sm:w-[18px]" />
                  <span className="block h-0.5 w-3.5 rounded-full bg-current sm:w-[18px]" />
                  <span className="block h-0.5 w-3.5 rounded-full bg-current sm:w-[18px]" />
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-100 backdrop-blur-sm transition-opacity duration-300 ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        style={{ backgroundColor: "var(--overlay)" }}
        onClick={() => setMenuOpen(false)}
        aria-hidden={!menuOpen}
      />

      <nav
        id="vertical-nav"
        className={`fixed right-3 top-19 z-105 flex h-[min(70%,calc(100dvh-5.5rem))] w-[min(30%,20rem)] min-w-[240px] max-w-[calc(100%-1.5rem)] flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-2xl transition-all duration-300 ease-out sm:right-6 sm:top-21 dark:bg-(--sidebar-bg) ${
          menuOpen ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-8 opacity-0"
        }`}
        style={{ backgroundColor: "var(--sidebar-bg)" }}
        aria-hidden={!menuOpen}
      >
        <div className="border-b border-border px-5 py-4">
          <p className="font-display text-sm font-bold uppercase tracking-wider text-muted-foreground">
            Menu
          </p>
        </div>

        <ul className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-5">
          {menuItems.map((item, index) => {
            const isActive = highlightedId === item.id
            return (
              <li
                key={item.label}
                className={`transition-all duration-500 ease-out ${
                  menuOpen ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                }`}
                style={{ transitionDelay: menuOpen ? `${120 + index * 60}ms` : "0ms" }}
              >
                <a
                  href={`#${item.id}`}
                  onClick={() => setMenuOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={`block rounded-2xl px-4 py-3 font-display text-base font-semibold tracking-wide transition-colors sm:text-lg ${
                    isActive
                      ? "bg-sky-500 text-white dark:bg-sky-500"
                      : "text-[var(--sidebar-text)] hover:bg-sky-500 hover:text-white dark:hover:bg-sky-500 dark:hover:text-white"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="border-t border-border p-5">
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-center rounded-full bg-accent px-5 py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-primary"
          >
            GET IN touch
          </a>
        </div>
      </nav>
    </header>
  )
}
