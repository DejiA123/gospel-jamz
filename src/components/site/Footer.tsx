import { Link } from "@tanstack/react-router";
import { Instagram, Mail, MapPin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 py-16 md:grid-cols-3 md:px-8">
        <div>
          <p className="font-display text-2xl uppercase">
            GOSPEL JAMZ <span className="text-primary">2026</span>
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Youth Conference &amp; Creative Arts Festival — 2026 Edition. To live is Christ.
          </p>
          <div className="mt-6 flex gap-4">
            <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary">
              <Twitter size={20} />
            </a>
            <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary">
              <Instagram size={20} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-lg uppercase">Explore</h3>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            <li>
              <a href="/#event" className="hover:text-primary">
                The Event
              </a>
            </li>
            <li>
              <a href="/#team" className="hover:text-primary">
                Lineup
              </a>
            </li>
            <li>
              <a href="/#about" className="hover:text-primary">
                Who We Are
              </a>
            </li>
            <li>
              <Link to="/register" className="hover:text-primary">
                Register
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg uppercase">Get in touch</h3>
          <p className="mt-5 text-sm text-muted-foreground">
            Where Iron Sharpens Iron (Proverbs 27:17)
          </p>
          <p className="mt-5 flex items-center gap-3 text-sm text-muted-foreground">
            <MapPin size={18} className="text-primary" /> The Power House Int&apos;l
          </p>
          <p className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
            <Mail size={18} className="text-primary" /> tphcreatives@gmail.com
          </p>
          <p className="mt-6 text-xs text-muted-foreground/70">
            Contact details are placeholders — send me the real address, email and social links and
            I&apos;ll swap them in.
          </p>
        </div>
      </div>

      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Gospel Jamz. All rights reserved.
      </div>
    </footer>
  );
}
