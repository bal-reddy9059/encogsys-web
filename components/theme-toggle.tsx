"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === "dark"

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`flex shrink-0 items-center justify-center rounded-full bg-white text-[#1a1a2e] shadow-sm ring-1 ring-black/5 transition-transform hover:scale-105 active:scale-95 ${className || "size-9 sm:size-10 md:size-11"}`}
    >
      {isDark ? (
        <Sun className="size-4 sm:size-5" strokeWidth={2.25} />
      ) : (
        <Moon className="size-4 sm:size-5" strokeWidth={2.25} />
      )}
    </button>
  )
}
