import joelOsachae from "@/assets/lineup/joel-osachae.webp.asset.json";
import meritOmoyayi from "@/assets/lineup/min-merit-omoyayi.webp.asset.json";
import bailey333 from "@/assets/lineup/bailey333.webp.asset.json";
import rekiaChigozie from "@/assets/lineup/min-rekia-chigozie.webp";
import kenolyUgbodu from "@/assets/lineup/min-kenoly-ugbodu.webp.asset.json";
import vickyUgbodu from "@/assets/lineup/min-vicky-ugbodu.webp.asset.json";
import walkWithZai from "@/assets/lineup/walk-with-zai.webp.asset.json";
import dejiAugustine from "@/assets/lineup/pastor-deji-augustine.webp.asset.json";
import tgic from "@/assets/lineup/tgic.webp.asset.json";
import ewanAhern from "@/assets/lineup/ewan-ahern.webp";

type Leader = { name: string; photo: string };

const leaders: Leader[] = [
  { name: "Joel Osachae", photo: joelOsachae.url },
  { name: "Min Merit Omoyayi", photo: meritOmoyayi.url },
  { name: "Bailey333", photo: bailey333.url },
  { name: "Min Rekia Chigozie", photo: rekiaChigozie },
  { name: "Min Kenoly Ugbodu", photo: kenolyUgbodu.url },
  { name: "Min Vicky Ugbodu", photo: vickyUgbodu.url },
  { name: "Walk With Zai", photo: walkWithZai.url },
  { name: "Pastor Deji Augustine", photo: dejiAugustine.url },
  { name: "TGIC", photo: tgic.url },
  { name: "Ewan Ahern", photo: ewanAhern },
];

export function Leaders() {
  // Duplicate the list so the marquee loops seamlessly (translateX -50%).
  const loop = [...leaders, ...leaders];

  return (
    <section id="team" className="border-b border-border bg-background py-20 md:py-28">
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
                <p className="mt-5 mb-2 font-display text-sm uppercase">{l.name}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
