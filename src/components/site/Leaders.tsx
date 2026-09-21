import joelOsachae from "@/assets/lineup/joel-osachae.webp.asset.json";
import meritOmoyayi from "@/assets/lineup/min-merit-omoyayi.webp.asset.json";
import bailey333 from "@/assets/lineup/bailey333.webp.asset.json";
import bekkyChigozie from "@/assets/lineup/min-bekky-chigozie.webp.asset.json";
import kenolyUgbodu from "@/assets/lineup/min-kenoly-ugbodu.webp.asset.json";
import vickyUgbodu from "@/assets/lineup/min-vicky-ugbodu.webp.asset.json";
import walkWithZai from "@/assets/lineup/walk-with-zai.webp.asset.json";
import dejiAugustine from "@/assets/lineup/pastor-deji-augustine.webp.asset.json";
import tgic from "@/assets/lineup/tgic.webp.asset.json";

type Leader = { name: string; role: string; photo: string };

const leaders: Leader[] = [
  { name: "Joel Osachae", role: "Living for Christ", photo: joelOsachae.url },
  { name: "Min Merit Omoyayi", role: "Living for Christ", photo: meritOmoyayi.url },
  { name: "Bailey333", role: "Living for Christ", photo: bailey333.url },
  { name: "Min Bekky Chigozie", role: "Living for Christ", photo: bekkyChigozie.url },
  { name: "Min Kenoly Ugbodu", role: "Living for Christ", photo: kenolyUgbodu.url },
  { name: "Min Vicky Ugbodu", role: "Living for Christ", photo: vickyUgbodu.url },
  { name: "Walk With Zai", role: "Living for Christ", photo: walkWithZai.url },
  { name: "Pastor Deji Augustine", role: "Living for Christ", photo: dejiAugustine.url },
  { name: "TGIC", role: "Living for Christ", photo: tgic.url },
];

export function Leaders() {
  // Duplicate the list so the marquee loops seamlessly (translateX -50%).
  const loop = [...leaders, ...leaders];

  return (
    <section id="team" className="border-t border-border bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <p className="eyebrow">Gospel Jamz 2026 lineup</p>
        <h2 className="mt-4 max-w-3xl text-4xl uppercase md:text-6xl">Meet the voices of the weekend</h2>

        <div className="relative mt-12 overflow-hidden border-y border-border py-8">
          <div className="marquee-track flex w-max gap-5 px-5 md:px-10">
            {loop.map((l, i) => (
              <div key={i} className="w-52 shrink-0 border border-border bg-card p-3 text-left sm:w-60">
                <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-full border border-primary bg-muted">
                  <img
                    src={l.photo}
                    alt={`${l.name} — Gospel Jamz 2026 lineup`}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
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
