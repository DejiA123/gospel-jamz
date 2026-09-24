import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, CalendarDays, Clock, MapPin } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Leaders } from "@/components/site/Leaders";
import { RegisterForm } from "@/components/site/RegisterForm";
import { HeroRegisterCta, StickyRegisterBar } from "@/components/site/RegisterCta";
import heroPoster from "@/assets/hero-poster.jpg";
import worship from "@/assets/worship.jpg";

const flyer = { url: "/flyer.jpg" };
const HERO_VIDEO = "";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gospel Jamz 2026 | Youth Conference & Creative Arts Festival" },
      { name: "description", content: "Gospel Jamz 2026 — To Live Is Christ. Three nights of worship, word and creative arts, 16-18 October. Register free." },
      { property: "og:title", content: "Gospel Jamz 2026 — To Live Is Christ" },
      { property: "og:description", content: "Youth Conference & Creative Arts Festival, 16-18 October 2026. Worship, word and creative arts. Register free." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const VENUE_EIRCODE = "H91 958A";
const VENUE_MAP_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(VENUE_EIRCODE)}&z=15&output=embed`;
const VENUE_DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(VENUE_EIRCODE)}`;

const values = [
  { t: "Worship, Prayer & True Fellowship", d: "Worship is the heartbeat. We're after true, authentic moments with God — not performance." },
  { t: "Soul Winning", d: "Every session is an invitation. We make room for people meeting Jesus for the first time." },
  { t: "People, Community & Family", d: "Nobody stands at the edge of the room. You arrive a guest and leave family." },
  { t: "Creative Arts", d: "Music, dance, spoken word, film and design — the whole gift given back to God." },
  { t: "Honesty & Authenticity", d: "Real conversations about faith, doubt, pressure and purpose." },
  { t: "Honour & Humility", d: "We serve each other, we honour the house, we stay teachable." },
];

const ticker = ["16–18 October", "Creative Arts", "Worship Encounter", "To Live Is Christ", "Free Entry"];

function Home() {
  return (
    <div id="top" className="min-h-screen bg-background">
      <Nav />

      <header className="border-b border-border pt-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:px-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="min-w-0">
            <p className="eyebrow">Youth Conference · Creative Arts Festival</p>
            <h1 className="mt-2 text-[clamp(3.1rem,8vw,7.6rem)] uppercase leading-[0.88]">
              Gospel Jamz <span className="text-primary">2026</span>
            </h1>
          </div>
          <div className="border-l-4 border-secondary pl-5 lg:text-right">
            <p className="font-display text-xl uppercase text-secondary sm:text-2xl">To live is Christ</p>
            <p className="mt-2 text-xs uppercase text-muted-foreground">16th–18th October · The Power House Int&apos;l</p>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-border md:min-h-[72svh]">
        {HERO_VIDEO ? (
          <video className="absolute inset-0 h-full w-full object-cover" src={HERO_VIDEO} poster={heroPoster} autoPlay muted loop playsInline />
        ) : (
          <img src={heroPoster} alt="Crowd worshipping under stage lights at Gospel Jamz" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/30 to-background/10" />
        <div className="relative mx-auto flex max-w-7xl items-end px-5 pt-8 pb-12 md:min-h-[72svh] md:px-8 md:py-16">
          <div className="grid w-full gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <div className="max-w-2xl border-l-4 border-primary bg-background/90 p-6 backdrop-blur-sm md:p-8">
              <p className="eyebrow">The 2026 edition</p>
              <h2 className="mt-3 text-4xl uppercase leading-none md:text-6xl">Three nights.<br />One sound.</h2>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">A gathering of worship, word and creative arts for a generation living fully for Christ.</p>
            </div>
            <HeroRegisterCta />
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-b border-background bg-secondary py-4 text-secondary-foreground">
        <div className="marquee-track flex w-max whitespace-nowrap">
          {[0, 1].map((copy) => <div key={copy} className="flex shrink-0 items-center">{ticker.map((item) => <span key={`${copy}-${item}`} className="flex items-center font-bold uppercase"><span className="mx-8 h-2 w-2 rounded-full bg-secondary-foreground" />{item}</span>)}</div>)}
        </div>
      </div>

      <section id="event" className="border-b border-border py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 md:px-8 lg:grid-cols-[0.82fr_1.18fr]">
          <img src={flyer.url} alt="Gospel Jamz 2026 official flyer" loading="lazy" className="h-full w-full border border-border object-cover" />
          <div className="grid gap-6">
            <div className="panel p-7 md:p-10">
              <p className="eyebrow">The Event</p>
              <h2 className="mt-4 text-4xl uppercase leading-none md:text-6xl">A room full of faith, creativity and purpose.</h2>
              <p className="mt-7 max-w-2xl leading-relaxed text-muted-foreground">Gospel Jamz is where the youth conference meets the creative arts festival. The stage belongs to worship, dance, spoken word and film, with a word that lands where you actually live.</p>
            </div>
            <div className="grid gap-px border border-border bg-border sm:grid-cols-3">
              {[["3", "Nights"], ["12+", "Sessions"], ["Free", "Entry"]].map(([number, label]) => <div key={label} className="bg-background p-7"><p className="font-display text-4xl text-primary">{number}</p><p className="mt-2 text-xs uppercase text-muted-foreground">{label}</p></div>)}
            </div>
            <div className="border-l-4 border-secondary bg-card p-6 sm:p-7 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <p className="flex items-center gap-3 text-sm font-medium">
                  <CalendarDays className="text-secondary shrink-0" size={18} /> 16–18 October
                </p>
                <p className="flex items-center gap-3 text-sm font-medium">
                  <MapPin className="text-secondary shrink-0" size={18} /> The Power House Int&apos;l (H91 958A)
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-2 border-t border-border/80 pt-4 text-xs sm:gap-x-5 sm:text-sm">
                <span className="flex items-center gap-1.5 font-display uppercase tracking-wider text-xs text-secondary font-bold sm:gap-2">
                  <Clock size={16} className="shrink-0" /> Times:
                </span>
                <span className="text-muted-foreground">
                  <strong className="text-foreground"><span className="sm:hidden">Fri</span><span className="hidden sm:inline">Friday</span>:</strong> 6PM
                </span>
                <span className="text-border hidden sm:inline">|</span>
                <span className="text-muted-foreground">
                  <strong className="text-foreground"><span className="sm:hidden">Sat</span><span className="hidden sm:inline">Saturday</span>:</strong> 12PM
                </span>
                <span className="text-border hidden sm:inline">|</span>
                <span className="text-muted-foreground">
                  <strong className="text-foreground"><span className="sm:hidden">Sun</span><span className="hidden sm:inline">Sunday</span>:</strong> 11AM
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-6 max-w-7xl px-5 md:px-8">
          <div className="grid gap-px border border-border bg-border lg:grid-cols-[0.82fr_1.18fr]">
            <div className="flex flex-col justify-between gap-8 bg-card p-7 md:p-10">
              <div>
                <p className="eyebrow">Find us</p>
                <h3 className="mt-4 text-3xl uppercase leading-none md:text-4xl">The Power House Int&apos;l</h3>
                <p className="mt-4 flex items-center gap-3 text-sm text-muted-foreground"><MapPin className="text-secondary shrink-0" size={18} /> Eircode {VENUE_EIRCODE}</p>
              </div>
              <a href={VENUE_DIRECTIONS} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-14 items-center justify-between gap-8 bg-primary px-6 font-display text-sm uppercase text-primary-foreground transition-colors hover:bg-secondary">
                Get directions <ArrowUpRight size={18} />
              </a>
            </div>
            <iframe title={`Map of The Power House Int'l (${VENUE_EIRCODE})`} src={VENUE_MAP_EMBED} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen className="h-[360px] w-full border-0 bg-card invert-90 hue-rotate-180 md:h-[440px]" />
          </div>
        </div>
      </section>

      <Leaders />

      <section id="about" className="border-b border-border py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 md:px-8 lg:grid-cols-2">
          <div className="relative min-h-[520px] overflow-hidden border border-border">
            <img src={worship} alt="Young people worshipping together" loading="lazy" width={1600} height={1000} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-background to-transparent p-8 pt-28"><p className="font-display text-3xl uppercase">The rhythm of faith · 2026 energy</p></div>
          </div>
          <div className="panel p-7 md:p-10">
            <p className="eyebrow">Who We Are</p>
            <h2 className="mt-4 text-4xl uppercase leading-none text-primary md:text-5xl">A space for young people who love God</h2>
            <p className="mt-6 text-muted-foreground">We exist to impact, transform and develop people through the revelation of Jesus Christ in every sphere of influence — music, media, business, the arts, the campus.</p>
            <Accordion type="single" collapsible className="mt-10">{values.map((value) => <AccordionItem key={value.t} value={value.t} className="border-border"><AccordionTrigger className="text-left font-display text-sm uppercase hover:no-underline">{value.t}</AccordionTrigger><AccordionContent className="text-sm text-muted-foreground">{value.d}</AccordionContent></AccordionItem>)}</Accordion>
          </div>
        </div>
      </section>

      <section className="bg-primary py-12 text-primary-foreground">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-5 md:grid-cols-4 md:px-8">{[["Team", "40+"], ["People", "100+"], ["Years", "4+"], ["Events", "15+"]].map(([label, number]) => <div key={label} className="border-l border-primary-foreground/30 p-5"><p className="text-xs font-bold uppercase">{label}</p><p className="font-display text-4xl md:text-6xl">{number}</p></div>)}</div>
      </section>

      <section id="register" className="border-t border-border py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 md:px-8 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="bg-primary p-7 text-primary-foreground md:p-10"><p className="text-xs font-bold uppercase">Registration</p><h2 className="mt-4 text-4xl uppercase leading-none md:text-5xl">Lock in your place for Gospel Jamz 2026</h2><p className="mt-6 max-w-md text-sm">Entry is free. Registering helps us plan the room, resources and food.</p></div>
          <div className="panel p-6 sm:p-10"><RegisterForm /></div>
        </div>
      </section>

      <Footer />
      <StickyRegisterBar />
    </div>
  );
}