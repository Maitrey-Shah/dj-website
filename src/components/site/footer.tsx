import { Link } from "@tanstack/react-router";
import { brand } from "@/data/site";
import { WhatsAppIcon } from "@/components/site/whatsapp";

export function Footer() {
  return (
    <footer className="border-border/60 border-t">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-4">
        <div>
          <p className="font-display text-2xl font-extrabold tracking-[0.3em] uppercase">
            {brand.name}
          </p>
          <p className="text-muted-foreground mt-4 max-w-xs text-sm leading-relaxed">
            Canada's premium desi events & nightlife brand. Live concerts, DJ
            nights and unforgettable nights across the country.
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="eyebrow mb-4">Explore</p>
          <ul className="space-y-2.5 text-sm">
            {[
              { label: "Home", hash: "top" },
              { label: "Events", hash: "events" },
              { label: "Artists", hash: "artists" },
              { label: "About", hash: "about" },
              { label: "Gallery", hash: "gallery" },
              { label: "Contact", hash: "contact" },
            ].map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  hash={l.hash}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="eyebrow mb-4">Social</p>
          <ul className="space-y-2.5 text-sm">
            {[
              { label: "Instagram", href: brand.instagram },
              { label: "Facebook", href: brand.facebook },
              { label: "YouTube", href: brand.youtube },
              { label: "TikTok", href: brand.tiktok },
            ].map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={`https://wa.me/${brand.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground mt-6 inline-flex items-center gap-2 text-sm transition-colors"
          >
            <WhatsAppIcon className="h-4 w-4" /> WhatsApp
          </a>
        </div>

        <div>
          <p className="eyebrow mb-4">Legal</p>
          <ul className="space-y-2.5 text-sm">
            {["Privacy Policy", "Terms & Conditions", "Refund Policy"].map((l) => (
              <li key={l}>
                <span className="text-muted-foreground">{l}</span>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground mt-6 text-xs leading-relaxed">
            {brand.email}
            <br />
            {brand.phone}
          </p>
        </div>
      </div>

      <div className="border-border/60 border-t">
        <div className="text-muted-foreground mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-2 px-5 py-6 text-xs sm:flex-row sm:px-8">
          <p>
            © {new Date().getFullYear()} {brand.name} Live Inc. All rights reserved.
          </p>
          <p className="tracking-[0.22em] uppercase">The Night Starts Here.</p>
        </div>
      </div>
    </footer>
  );
}
