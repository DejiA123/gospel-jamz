import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

// Takes the visitor to the registration section on the home page, from any page.
// The router ignores a link to the URL you're already on, so when the address
// already ends in #register we scroll there ourselves.
export function RegisterLink({
  className,
  children,
  onClick,
}: {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      to="/"
      hash="register"
      className={className}
      onClick={() => {
        onClick?.();
        if (window.location.pathname === "/") {
          document.getElementById("register")?.scrollIntoView();
        }
      }}
    >
      {children}
    </Link>
  );
}

// Friday 16 October, 6 PM Irish time (IST, UTC+1).
const EVENT_START = new Date("2026-10-16T18:00:00+01:00").getTime();

const pad = (n: number) => String(n).padStart(2, "0");

function useCountdown() {
  // null until mounted, so the server and first client render match.
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const seconds = now === null ? null : Math.max(0, Math.floor((EVENT_START - now) / 1000));
  const unit = (value: (s: number) => number) => (seconds === null ? "--" : pad(value(seconds)));

  return {
    started: seconds === 0,
    units: [
      [unit((s) => Math.floor(s / 86400)), "Days"],
      [unit((s) => Math.floor((s % 86400) / 3600)), "Hrs"],
      [unit((s) => Math.floor((s % 3600) / 60)), "Min"],
      [unit((s) => s % 60), "Sec"],
    ],
  };
}

export function HeroRegisterCta() {
  const { started, units } = useCountdown();

  return (
    <div
      id="hero-cta"
      className="order-first border border-secondary/50 bg-background/85 backdrop-blur-sm md:order-none"
    >
      {started ? (
        <p className="px-4 py-4 text-xs font-bold uppercase text-secondary">
          Happening now · 16–18 October
        </p>
      ) : (
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <p className="text-[11px] font-bold uppercase leading-tight text-secondary">
            Gospel Jamz
            <br />
            starts in
            <span className="sr-only"> Friday 16 October at 6 PM</span>
          </p>
          <div className="flex gap-1.5" aria-hidden="true">
            {units.map(([value, label]) => (
              <span
                key={label}
                className="flex min-w-12 flex-col items-center border border-secondary/30 bg-secondary/10 px-1.5 py-1.5"
              >
                <span className="font-display text-xl leading-none tabular-nums text-secondary">
                  {value}
                </span>
                <span className="mt-1 text-[9px] font-bold uppercase text-muted-foreground">
                  {label}
                </span>
              </span>
            ))}
          </div>
        </div>
      )}
      <RegisterLink className="cta-glow flex min-h-16 items-center justify-between gap-6 bg-primary px-6 font-display text-lg uppercase text-primary-foreground transition-colors hover:bg-secondary">
        Save my free seat <ArrowUpRight size={22} className="cta-nudge shrink-0" />
      </RegisterLink>
    </div>
  );
}

// Mobile-only bar that appears once the hero button has scrolled away,
// and hides again when the registration form is on screen.
export function StickyRegisterBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const update = () => {
      const heroCta = document.getElementById("hero-cta");
      const register = document.getElementById("register");
      const pastHero = heroCta ? heroCta.getBoundingClientRect().bottom < 0 : window.scrollY > 600;
      const beforeForm = register
        ? register.getBoundingClientRect().top > window.innerHeight
        : true;
      setShow(pastHero && beforeForm);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  if (!show) return null;

  return (
    <div className="cta-slide-up fixed inset-x-0 bottom-0 z-40 border-t border-primary/40 bg-background/95 px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md md:hidden">
      <RegisterLink className="cta-glow flex min-h-14 items-center justify-between gap-4 bg-primary px-5 text-primary-foreground">
        <span className="font-display text-base uppercase">Register free</span>
        <span className="flex items-center gap-2 text-xs font-bold uppercase">
          16–18 Oct <ArrowUpRight size={20} className="cta-nudge" />
        </span>
      </RegisterLink>
    </div>
  );
}
