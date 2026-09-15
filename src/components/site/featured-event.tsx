import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { featuredEvent, whatsappLink, whatsappMessages } from "@/data/site";
import { WhatsAppIcon } from "@/components/site/whatsapp";
import { Reveal } from "@/components/site/reveal";
import { formatDate } from "@/components/site/event-card";

function useCountdown(target: string) {
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    const end = new Date(`${target}T21:00:00`).getTime();
    const tick = () => setLeft(Math.max(0, end - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  const ms = left ?? 0;
  return [
    { label: "Days", value: Math.floor(ms / 86400000) },
    { label: "Hours", value: Math.floor((ms / 3600000) % 24) },
    { label: "Minutes", value: Math.floor((ms / 60000) % 60) },
    { label: "Seconds", value: Math.floor((ms / 1000) % 60) },
  ];
}

export function FeaturedEvent() {
  const e = featuredEvent;
  const units = useCountdown(e.date);

  return (
    <section className="border-border/60 border-y">
      <div className="mx-auto grid max-w-[1400px] items-stretch gap-0 lg:grid-cols-2">
        <Reveal className="relative min-h-[420px] overflow-hidden lg:min-h-[680px]">
          <img
            src={e.image}
            alt={`${e.title} featured event poster`}
            loading="lazy"
            width={1024}
            height={1280}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="from-background/70 absolute inset-0 bg-gradient-to-t to-transparent lg:bg-gradient-to-r" />
        </Reveal>

        <Reveal className="flex flex-col justify-center px-5 py-14 sm:px-10 lg:py-20" delay={80}>
          <p className="eyebrow mb-5">Featured Event</p>
          <h2 className="text-4xl leading-[0.9] font-extrabold uppercase sm:text-6xl">
            {e.title}
          </h2>
          <p className="text-muted-foreground mt-5 text-sm tracking-[0.12em] uppercase">
            {formatDate(e.date)} • {e.city} • {e.venue}
          </p>
          <p className="text-muted-foreground mt-5 max-w-xl leading-relaxed">{e.description}</p>
          <p className="text-gold mt-5 text-sm font-semibold tracking-[0.18em] uppercase">
            {e.artists.join(" • ")}
          </p>

          <div className="mt-9 grid max-w-md grid-cols-4 gap-3">
            {units.map((u) => (
              <div
                key={u.label}
                className="border-border/70 bg-surface rounded-lg border px-2 py-4 text-center"
              >
                <p className="font-display text-2xl font-extrabold tabular-nums sm:text-3xl">
                  {String(u.value).padStart(2, "0")}
                </p>
                <p className="text-muted-foreground mt-1 text-[0.6rem] tracking-[0.18em] uppercase">
                  {u.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href={e.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-heat text-primary-foreground rounded-full px-8 py-4 text-center text-xs font-bold tracking-[0.22em] uppercase transition-transform duration-300 hover:scale-[1.03]"
            >
              Get Tickets
            </a>
            <a
              href={whatsappLink(whatsappMessages.event(e.title))}
              target="_blank"
              rel="noopener noreferrer"
              className="border-border/70 hover:bg-surface-2 inline-flex items-center justify-center gap-2 rounded-full border px-8 py-4 text-xs font-bold tracking-[0.22em] uppercase transition-colors"
            >
              <WhatsAppIcon className="h-4 w-4" /> WhatsApp Us
            </a>
            <Link
              to="/events/$slug"
              params={{ slug: e.slug }}
              className="text-muted-foreground hover:text-foreground inline-flex items-center justify-center px-2 py-4 text-xs font-bold tracking-[0.22em] uppercase transition-colors"
            >
              Details
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
