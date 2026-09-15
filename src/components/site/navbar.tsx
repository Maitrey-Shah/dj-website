import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { brand } from "@/data/site";

const links = [
  { label: "Home", to: "/", hash: "top" },
  { label: "Events", to: "/", hash: "events" },
  { label: "Artists", to: "/", hash: "artists" },
  { label: "About", to: "/", hash: "about" },
  { label: "Gallery", to: "/", hash: "gallery" },
  { label: "Contact", to: "/", hash: "contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-background/80 border-b backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 sm:px-8">
        <Link
          to="/"
          className="font-display text-xl font-extrabold tracking-[0.3em] uppercase"
        >
          {brand.name}
        </Link>

        <ul className="hidden items-center gap-9 lg:flex">
          {links.map((l) => (
            <li key={l.label}>
              <Link
                to={l.to}
                hash={l.hash}
                className="text-muted-foreground hover:text-foreground text-xs font-semibold tracking-[0.18em] uppercase transition-colors"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            to="/"
            hash="events"
            className="bg-heat text-primary-foreground hidden rounded-full px-6 py-2.5 text-xs font-bold tracking-[0.2em] uppercase transition-transform duration-300 hover:scale-[1.04] sm:inline-block"
          >
            Tickets
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="border-border/70 flex h-10 w-10 items-center justify-center rounded-full border lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <div
        className={cn(
          "bg-background/97 fixed inset-0 top-0 z-40 flex flex-col justify-center gap-2 px-8 backdrop-blur-2xl transition-all duration-400 lg:hidden",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none translate-y-3 opacity-0",
        )}
      >
        {links.map((l, i) => (
          <Link
            key={l.label}
            to={l.to}
            hash={l.hash}
            onClick={() => setOpen(false)}
            style={{ transitionDelay: `${i * 40}ms` }}
            className="font-display border-border/40 border-b py-4 text-3xl font-extrabold uppercase"
          >
            {l.label}
          </Link>
        ))}
        <Link
          to="/"
          hash="events"
          onClick={() => setOpen(false)}
          className="bg-heat text-primary-foreground mt-8 rounded-full px-6 py-4 text-center text-sm font-bold tracking-[0.22em] uppercase"
        >
          Get Tickets
        </Link>
      </div>
    </header>
  );
}
