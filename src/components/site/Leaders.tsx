type Leader = { name: string; role: string; photo?: string };

const leaders: Leader[] = [
  { name: "Coming soon", role: "Host" },
  { name: "Coming soon", role: "Worship Lead" },
  { name: "Coming soon", role: "Creative Arts" },
  { name: "Coming soon", role: "Media" },
  { name: "Coming soon", role: "Hospitality" },
];

export function Leaders() {
  // Duplicate the list so the marquee loops seamlessly (translateX -50%).
  const loop = [...leaders, ...leaders];

  return (
    <section id="team" className="border-t border-border bg-background py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <p className="eyebrow">The Team</p>
        <h2 className="mt-4 max-w-2xl text-4xl md:text-5xl">The people behind the weekend</h2>

        <div className="relative mt-14 overflow-hidden">
          {/* edge fades so cards enter/exit softly */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />

          <div className="marquee-track flex w-max gap-10 px-5 md:px-10">
            {loop.map((l, i) => (
              <div key={i} className="w-56 shrink-0 text-center">
                <div className="mx-auto flex h-56 w-56 items-center justify-center overflow-hidden rounded-full bg-primary">
                  {l.photo ? (
                    <img
                      src={l.photo}
                      alt={l.name}
                      loading="lazy"
                      className="h-full w-full object-cover grayscale"
                    />
                  ) : (
                    <span className="font-display text-4xl font-extrabold text-primary-foreground">
                      GJ
                    </span>
                  )}
                </div>
                <p className="mt-6 text-sm font-semibold">{l.name}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  {l.role}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-8 text-xs text-muted-foreground/70">{"\n"}</p>
      </div>
    </section>
  );
}
