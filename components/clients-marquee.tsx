const brands = [
  "Colgate",
  "KitKat",
  "Hershey's",
  "Milkybar",
  "Ajio",
]

export function ClientsMarquee() {
  const loop = [...brands, ...brands, ...brands]

  return (
    <section
      id="clients"
      aria-label="Brands we work with"
      className="overflow-hidden py-8 sm:py-10"
    >
      <div className="mx-auto max-w-5xl px-5 text-center lg:px-8">
        <h2 className="mb-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Trusted by Our Clients
        </h2>
      </div>

      <div className="relative">
        <div className="flex overflow-hidden">
          <ul className="animate-marquee flex min-w-max items-center gap-4 py-2 sm:gap-6">
            {loop.map((brand, index) => (
              <li key={`${brand}-${index}`}>
                <span className="inline-flex h-14 min-w-36 items-center justify-center rounded-full border border-border bg-card px-6 font-display text-base font-bold tracking-wide text-foreground shadow-sm sm:h-16 sm:min-w-44 sm:text-lg">
                  {brand}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
