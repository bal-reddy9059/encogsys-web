/**
 * ENCOGSYS wordmark — matches brand lockup (interlocking O–G chain).
 * Prefer /logo-wordmark.png in BrandLogo; this SVG is a crisp fallback.
 */
export function EncogsysWordmark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      {/* E */}
      <path d="M8 12h58v14H26v12h36v14H26v22h42v14H8V12z" />
      {/* N */}
      <path d="M78 12h18l36 48V12h18v76h-18l-36-48v48H78V12z" />
      {/* C */}
      <path d="M230 22c-8-8-20-14-35-14-30 0-52 20-52 42s22 42 52 42c15 0 27-6 35-14l-14-12c-5 5-12 8-21 8-16 0-28-12-28-24s12-24 28-24c9 0 16 3 21 8z" />

      {/* Interlocking O–G (chain / infinity weave) */}
      <g>
        {/* O ring */}
        <path
          fillRule="evenodd"
          d="M310 50c0-26-19-42-43-42s-43 16-43 42 19 42 43 42 43-16 43-42zm-68 0c0-15 10-26 25-26s25 11 25 26-10 26-25 26-25-11-25-26z"
        />
        {/* G ring + crossbar; left arc weaves under/over O */}
        <path d="M382 50c0-26-18-42-42-42-14 0-26 5-34 14 4 3 8 6 11 10 5-5 13-9 23-9 15 0 26 11 26 27s-11 27-26 27c-10 0-18-4-23-9l-11 11c8 9 20 14 34 14 12 0 22-4 29-11V62h-26V50h39z" />
        {/* Weave bridge through the link */}
        <path d="M255 42c7-2 15-4 24-4 7 0 13 1 18 3v16c-5-2-10-3-16-3-8 0-14 1-20 3-2-5-3-10-4-15h-2z" />
      </g>

      {/* S */}
      <path d="M430 28c0-12-11-20-26-20-15 0-26 7-30 18l16 7c3-5 8-8 14-8 6 0 10 2 10 6s-3 6-12 8l-8 2c-15 4-24 11-24 24 0 14 12 23 29 23 16 0 28-8 32-20l-16-7c-3 6-9 10-16 10-7 0-11-3-11-7s4-6 13-9l8-2c16-4 25-12 25-25z" />
      {/* Y */}
      <path d="M450 12h20l22 40 22-40h20l-32 56v20h-20V68z" />
      {/* S */}
      <path d="M590 28c0-12-11-20-26-20-15 0-26 7-30 18l16 7c3-5 8-8 14-8 6 0 10 2 10 6s-3 6-12 8l-8 2c-15 4-24 11-24 24 0 14 12 23 29 23 16 0 28-8 32-20l-16-7c-3 6-9 10-16 10-7 0-11-3-11-7s4-6 13-9l8-2c16-4 25-12 25-25z" />
    </svg>
  )
}
