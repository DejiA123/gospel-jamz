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
    <section id="team" className="border-t border-border bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <p className="eyebrow">The Team</p>
        <h2 className="mt-4 max-w-3xl text-4xl uppercase md:text-6xl">The people behind the weekend</h2>

        <div className="relative mt-12 overflow-hidden border-y border-border py-8">
          <div className="marquee-track flex w-max gap-5 px-5 md:px-10">
            {loop.map((l, i) => (
              <div key={i} className="w-52 shrink-0 border border-border bg-card p-3 text-left sm:w-60">
                <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-full border border-primary bg-muted">
                  {l.photo ? (
                    <img
                      src={l.photo}
                      alt={l.name}
                      loading="lazy"
                      className="h-full w-full object-cover grayscale"
                    />
                  ) : (
                    <span className="font-display text-4xl text-primary">
                      GJ
                    </span>
                  )}
                </div>
                <p className="mt-5 font-display text-sm uppercase">{l.name}</p>
                <p className="mt-1 text-xs uppercase text-primary">
                  {l.role}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
