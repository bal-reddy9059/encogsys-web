"use client"

type BrandLogoProps = {
  className?: string
  size?: "sm" | "md" | "lg"
  /** onDark = white wordmark (floating nav). onLight = black, white in .dark (sidebar). */
  tone?: "onDark" | "onLight"
  /** Force icon only (no wordmark). */
  iconOnly?: boolean
}

const wordmarkSize = {
  sm: "h-3.5 w-auto sm:h-4",
  md: "h-3.5 w-auto min-[380px]:h-4 sm:h-5 md:h-6",
  lg: "h-10 w-auto",
}

const iconSize = {
  sm: "h-7 w-auto sm:h-8",
  md: "h-7 w-auto sm:h-9 md:h-10",
  lg: "h-12 w-auto",
}

const wordmarkMax = {
  sm: "max-w-24 sm:max-w-28",
  md: "max-w-[5.5rem] min-[380px]:max-w-28 sm:max-w-36 md:max-w-40",
  lg: "max-w-60",
}

const gapSize = {
  sm: "gap-2 sm:gap-3",
  md: "gap-2 sm:gap-3 md:gap-[10mm]",
  lg: "gap-3 md:gap-[10mm]",
}

export function BrandLogo({
  className = "",
  size = "md",
  tone = "onDark",
  iconOnly = false,
}: BrandLogoProps) {
  // Keep original logo colors; only wordmark flips for contrast
  const wordmarkTone =
    tone === "onDark"
      ? "brightness-0 invert"
      : "brightness-0 dark:invert"

  return (
    <a
      href="/#home"
      className={`inline-flex min-w-0 items-center ${gapSize[size]} ${className}`}
      aria-label="ENCOGSYS home"
    >
      <img
        src="/logo-icon.png?v=15"
        alt=""
        className={`${iconSize[size]} shrink-0 object-contain object-left`}
        aria-hidden="true"
      />

      {!iconOnly && (
        <img
          src="/logo-wordmark.png?v=3"
          alt="ENCOGSYS"
          className={`${wordmarkSize[size]} ${wordmarkMax[size]} w-auto object-contain object-left ${wordmarkTone}`}
        />
      )}
    </a>
  )
}
