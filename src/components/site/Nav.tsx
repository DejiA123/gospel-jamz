import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const links = [
  { label: "Home", href: "/#top" },
  { label: "The Event", href: "/#event" },
  { label: "Lineup", href: "/#team" },
  { label: "Who We Are", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        solid ? "border-border bg-background/95 backdrop-blur-md" : "border-border/70 bg-background/85"
      }`}
    >
      <div className="mx-auto grid h-20 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 md:px-8 lg:flex lg:justify-between">
        <a href="/#top" className="min-w-0 font-display text-lg uppercase">
          GOSPEL JAMZ <span className="text-primary">2026</span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/register"
            className="hidden items-center gap-2 bg-primary px-6 py-3 text-xs font-bold uppercase text-primary-foreground transition-colors hover:bg-secondary sm:inline-flex"
          >
            Register <ArrowUpRight size={14} />
          </Link>
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="shrink-0 p-2 text-foreground lg:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background px-5 py-6 lg:hidden">
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-base text-muted-foreground"
              >
                {l.label}
              </a>
            ))}
            <Link
              to="/register"
              onClick={() => setOpen(false)}
              className="mt-2 bg-primary px-6 py-3 text-center text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
