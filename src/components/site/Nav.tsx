import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Home", href: "/#top" },
  { label: "The Event", href: "/#event" },
  { label: "Programme", href: "/#programme" },
  { label: "Who We Are", href: "/#about" },
  { label: "Team", href: "/#team" },
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
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "bg-background/85 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8">
        <a href="/#top" className="font-display text-lg font-extrabold tracking-tight">
          GOSPEL<span className="text-primary">JAMZ</span>
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
            className="hidden bg-primary px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground transition-opacity hover:opacity-90 sm:inline-block"
          >
            Register
          </Link>
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="p-2 text-foreground lg:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background/95 px-5 py-6 backdrop-blur-md lg:hidden">
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
