import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Leaders } from "@/components/site/Leaders";
import { RegisterForm } from "@/components/site/RegisterForm";
import heroPoster from "@/assets/hero-poster.jpg";
import worship from "@/assets/worship.jpg";
import flyer from "@/assets/flyer.asset.json";
import { ArrowRight, CalendarDays, MapPin, Ticket } from "lucide-react";

// Drop the hero film in here once it's uploaded (e.g. "/hero.mp4").
const HERO_VIDEO = "";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gospel Jamz 2026 | Youth Conference & Creative Arts Festival" },
      {
        name: "description",
        content:
          "Gospel Jamz 2026 — To Live Is Christ. Three nights of worship, word and creative arts, 16-18 October. Register free.",
      },
      { property: "og:title", content: "Gospel Jamz 2026 — To Live Is Christ" },
      {
        property: "og:description",
        content:
          "Youth Conference & Creative Arts Festival, 16-18 October 2026. Worship, word and creative arts. Register free.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const programme = [
  {
    day: "Day One — Fri 16 Oct",
    title: "The Call",
    items: ["Doors & welcome", "Opening worship", "Word: To live is Christ", "Late night prayer"],
  },
  {
    day: "Day Two — Sat 17 Oct",
    title: "The Craft",
    items: ["Creative arts workshops", "Dance & spoken word", "Main session", "Gospel Jamz night"],
  },
  {
    day: "Day Three — Sun 18 Oct",
    title: "The Commission",
    items: ["Morning worship", "Testimonies", "Closing word", "Sending out"],
  },
];

const values = [
  {
    t: "Worship, Prayer & True Fellowship",
    d: "Worship is the heartbeat. We're after true, authentic moments with God — not performance.",
  },
  {
    t: "Soul Winning",
    d: "Every session is an invitation. We make room for people meeting Jesus for the first time.",
  },
  {
    t: "People, Community & Family",
    d: "Nobody stands at the edge of the room. You arrive a guest and leave family.",
  },
  {
    t: "Creative Arts",
    d: "Music, dance, spoken word, film and design — the whole gift given back to God.",
  },
  { t: "Honesty & Authenticity", d: "Real conversations about faith, doubt, pressure and purpose." },
  { t: "Honour & Humility", d: "We serve each other, we honour the house, we stay teachable." },
];

function Home() {
  return (
    <div id="top" className="min-h-screen bg-background">
      <Nav />

      {/* HERO */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden">
        {HERO_VIDEO ? (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={HERO_VIDEO}
            poster={heroPoster}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <img
            src={heroPoster}
            alt="Crowd worshipping under stage lights at Gospel Jamz"
            width={1920}
            height={1088}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
        <div className="stage-glow absolute inset-0" />

        <div className="relative mx-auto w-full max-w-7xl px-5 pt-28 pb-20 md:px-8">
          <p className="eyebrow animate-rise">Youth Conference · Creative Arts Festival</p>
          <h1 className="animate-rise mt-5 text-6xl leading-[0.85] sm:text-8xl lg:text-[9.5rem]">
            <span className="text-chrome">GOSPEL JAMZ</span>
          </h1>
          <p className="animate-rise mt-6 font-display text-2xl text-foreground/90 md:text-3xl">
            To live is Christ. <span className="text-primary">2026 Edition.</span>
          </p>

          <div className="animate-rise mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <CalendarDays size={18} className="text-primary" /> 16th – 18th October 2026
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={18} className="text-primary" /> The Power House Int&apos;l
            </span>
            <span className="flex items-center gap-2">
              <Ticket size={18} className="text-primary" /> Free entry · registration required
            </span>
          </div>

          <div className="animate-rise mt-10">
            <Link
              to="/register"
              className="group inline-flex items-center gap-3 bg-primary px-9 py-5 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-90"
            >
              Register now
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden border-y border-border bg-primary py-4">
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="flex gap-10">
              {[
                "TO LIVE IS CHRIST",
                "WORSHIP",
                "SPOKEN WORD",
                "DANCE",
                "16–18 OCTOBER",
                "CREATIVE ARTS",
                "FREE ENTRY",
              ].map((w) => (
                <span
                  key={w}
                  className="font-display text-sm font-extrabold uppercase tracking-[0.3em] text-primary-foreground"
                >
                  {w} ·
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* THE EVENT */}
      <section id="event" className="py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 md:px-8 lg:grid-cols-2">
          <img
            src={flyer.url}
            alt="Gospel Jamz 2026 official flyer"
            loading="lazy"
            className="w-full border border-border"
          />
          <div>
            <p className="eyebrow">The Event</p>
            <h2 className="mt-4 text-4xl leading-tight md:text-5xl">
              Three nights. One <span className="text-primary">sound</span>.
            </h2>
            <p className="mt-6 text-muted-foreground">
              Gospel Jamz is where the youth conference meets the creative arts festival. A room
              full of young people who love God, a stage handed over to worship, dance, spoken word
              and film, and a word that lands where you actually live.
            </p>
            <p className="mt-4 text-muted-foreground">
              The 2026 edition carries one line through everything we do — <em>to live is Christ</em>
              . Come for a night, stay for the weekend.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-8">
              {[
                ["3", "Nights"],
                ["12+", "Sessions"],
                ["Free", "Entry"],
              ].map(([n, l]) => (
                <div key={l}>
                  <p className="font-display text-4xl font-extrabold text-primary">{n}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    {l}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMME */}
      <section id="programme" className="border-t border-border py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="eyebrow">Programme</p>
          <h2 className="mt-4 text-4xl md:text-5xl">What the weekend looks like</h2>
          <div className="mt-14 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
            {programme.map((d) => (
              <div key={d.day} className="bg-background p-8">
                <p className="text-xs uppercase tracking-[0.18em] text-primary">{d.day}</p>
                <h3 className="mt-3 text-2xl">{d.title}</h3>
                <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                  {d.items.map((i) => (
                    <li key={i} className="border-b border-border pb-3 last:border-0">
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT + VALUES */}
      <section id="about" className="border-t border-border py-24">
        <div className="mx-auto grid max-w-7xl gap-16 px-5 md:px-8 lg:grid-cols-2">
          <img
            src={worship}
            alt="Young people worshipping together"
            loading="lazy"
            width={1600}
            height={1000}
            className="h-full w-full object-cover"
          />
          <div>
            <p className="eyebrow">Who We Are</p>
            <h2 className="mt-4 text-4xl leading-tight text-primary md:text-5xl">
              A space for young people who love God
            </h2>
            <p className="mt-6 text-muted-foreground">
              We exist to impact, transform and develop people through the revelation of Jesus
              Christ in every sphere of influence — music, media, business, the arts, the campus.
            </p>
            <p className="mt-4 text-muted-foreground">
              Iron sharpens iron. That&apos;s what this house is for: gathering, growing and going
              out changed.
            </p>

            <Accordion type="single" collapsible className="mt-10">
              {values.map((v) => (
                <AccordionItem key={v.t} value={v.t} className="border-border">
                  <AccordionTrigger className="text-left text-base hover:no-underline">
                    {v.t}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    {v.d}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* STATS BAND */}
      <section className="bg-primary py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-5 text-center md:grid-cols-4 md:px-8">
          {[
            ["Team", "40+"],
            ["People", "100+"],
            ["Years", "4+"],
            ["Events", "15+"],
          ].map(([l, n]) => (
            <div key={l}>
              <p className="text-sm font-semibold text-primary-foreground/80">{l}</p>
              <p className="font-display text-5xl font-extrabold text-primary-foreground md:text-6xl">
                {n}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Leaders />

      {/* REGISTER */}
      <section id="register" className="stage-glow border-t border-border py-24">
        <div className="mx-auto grid max-w-7xl gap-16 px-5 md:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow">Registration</p>
            <h2 className="mt-4 text-4xl leading-tight md:text-5xl">
              Lock in your place for <span className="text-primary">Gospel Jamz 2026</span>
            </h2>
            <p className="mt-6 max-w-md text-muted-foreground">
              It takes under a minute. Entry is free — registering just helps us plan the room, the
              resources and the food.
            </p>
          </div>
          <div className="border border-border bg-card p-6 sm:p-10">
            <RegisterForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
