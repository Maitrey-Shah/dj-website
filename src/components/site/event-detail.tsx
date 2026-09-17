import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { CalendarDays, Clock, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import {
  getEvent,
  whatsappLink,
  whatsappMessages,
  faqs,
  formatCad,
  ticketStatusLabel,
  type EventItem,
} from "@/data/site";
import { WhatsAppIcon } from "@/components/site/whatsapp";
import { Reveal } from "@/components/site/reveal";
import { formatDate } from "@/components/site/event-card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function EventDetail({ slug }: { slug: string }) {
  const e = getEvent(slug);

  useEffect(() => {
    if (!e) document.title = "Event not found";
  }, [e]);

  if (!e) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-5 text-center">
        <h1 className="font-display text-5xl font-extrabold uppercase">Event not found</h1>
        <p className="text-muted-foreground mt-4">
          The event you're looking for may have ended or the link may be incorrect.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/"
            hash="events"
            className="bg-heat text-primary-foreground rounded-full px-8 py-4 text-xs font-bold tracking-[0.22em] uppercase"
          >
            View All Events
          </Link>
          <Link
            to="/"
            className="border-border/70 hover:bg-surface-2 rounded-full border px-8 py-4 text-xs font-bold tracking-[0.22em] uppercase transition-colors"
          >
            Back Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-[80svh] overflow-hidden">
        <img
          src={e.heroImage ?? e.image}
          alt={`${e.title} event poster`}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: e.heroPosition ?? "center 20%" }}
        />
        <div className="from-background via-background/55 absolute inset-0 bg-gradient-to-t to-transparent" />
        <div className="from-background/90 absolute inset-0 bg-gradient-to-r to-transparent" />
        <div className="relative mx-auto flex min-h-[80svh] max-w-[1400px] flex-col justify-end px-5 pb-28 pt-36 sm:px-8 sm:pb-20">
          <p className="eyebrow mb-4">
            {e.category} • {e.status}
          </p>
          <h1 className="max-w-4xl text-5xl leading-[0.9] font-extrabold uppercase sm:text-7xl lg:text-8xl">
            {e.title}
          </h1>
          <div className="text-muted-foreground mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm">
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="h-4 w-4" /> {formatDate(e.date)}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4" /> {e.time}
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4" /> {e.venue} • {e.city}
            </span>
          </div>
          <div className="mt-8 hidden flex-col gap-3 sm:flex sm:flex-row">
            <TicketCta event={e} />
            <a
              href={whatsappLink(whatsappMessages.event(e.title))}
              target="_blank"
              rel="noopener noreferrer"
              className="border-border/70 hover:bg-surface-2 inline-flex items-center justify-center gap-2 rounded-full border px-8 py-4 text-xs font-bold tracking-[0.22em] uppercase transition-colors"
            >
              <WhatsAppIcon className="h-4 w-4" /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* ── Body ──────────────────────────────────────────────────────── */}
      <div className="mx-auto grid max-w-[1400px] gap-14 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1fr_420px] lg:gap-20">
        <div className="space-y-14">
          <Reveal>
            <h2 className="font-display text-2xl font-extrabold uppercase">The Event</h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">{e.longDescription}</p>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-2xl font-extrabold uppercase">Artists</h2>
            <p className="text-gold mt-4 text-sm font-semibold tracking-[0.18em] uppercase">
              {e.artists.join(" • ")}
            </p>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-2xl font-extrabold uppercase">Good To Know</h2>
            <dl className="mt-4 space-y-4 text-sm">
              <div className="border-border/60 flex gap-3 border-b pb-4">
                <MapPin className="text-gold mt-0.5 h-4 w-4 shrink-0" />
                <div>
                  <dt className="font-semibold">Venue</dt>
                  <dd className="text-muted-foreground">
                    {e.venue}, {e.address}
                  </dd>
                </div>
              </div>
              <div className="border-border/60 flex gap-3 border-b pb-4">
                <Sparkles className="text-gold mt-0.5 h-4 w-4 shrink-0" />
                <div>
                  <dt className="font-semibold">Dress code</dt>
                  <dd className="text-muted-foreground">{e.dressCode}</dd>
                </div>
              </div>
              <div className="border-border/60 flex gap-3 border-b pb-4">
                <ShieldCheck className="text-gold mt-0.5 h-4 w-4 shrink-0" />
                <div>
                  <dt className="font-semibold">Age requirement</dt>
                  <dd className="text-muted-foreground">{e.ageRequirement}</dd>
                </div>
              </div>
            </dl>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-2xl font-extrabold uppercase">FAQ</h2>
            <Accordion type="single" collapsible className="mt-4">
              {faqs.slice(0, 5).map((f, idx) => (
                <AccordionItem key={idx} value={`efaq-${idx}`} className="border-border/60">
                  <AccordionTrigger className="text-left font-semibold hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>

        {/* ── Tickets sidebar ─────────────────────────────────────────── */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Reveal>
            <h2 className="font-display text-2xl font-extrabold uppercase">Tickets</h2>
            <div className="mt-6 space-y-4">
              {e.tickets.map((t) => (
                <div
                  key={t.id}
                  className="border-border/70 bg-surface rounded-xl border p-5"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-lg font-bold uppercase">{t.name}</h3>
                    <p className="font-display text-xl font-extrabold">
                      {t.fromPrice ?? formatCad(t.amount)}
                    </p>
                  </div>
                  <p className="text-gold mt-1 text-[0.65rem] font-semibold tracking-[0.18em] uppercase">
                    {ticketStatusLabel[t.status]}
                  </p>
                  <ul className="text-muted-foreground mt-3 space-y-1 text-sm">
                    {t.benefits.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span className="text-gold">•</span> {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-6 hidden lg:block">
              <TicketCta event={e} wide />
            </div>
          </Reveal>
        </aside>
      </div>

      {/* ── Sticky mobile bar ───────────────────────────────────────────── */}
      <div className="bg-background/95 border-border/60 fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t px-4 py-3 backdrop-blur-xl sm:hidden">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold uppercase">{e.title}</p>
          <p className="text-muted-foreground truncate text-xs">
            {formatDate(e.date)} • {e.city}
          </p>
        </div>
        <a
          href={whatsappLink(whatsappMessages.event(e.title))}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="bg-whatsapp text-background flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
        >
          <WhatsAppIcon className="h-5 w-5" />
        </a>
        <TicketCta event={e} compact />
      </div>
      <div className="h-20 sm:hidden" />
    </div>
  );
}

// ── TicketCta ─────────────────────────────────────────────────────────────────
// Routes to an external URL when ticketUrl is configured, otherwise navigates
// to the internal /events/$slug/tickets page.
function TicketCta({
  event,
  wide,
  compact,
}: {
  event: EventItem;
  wide?: boolean;
  compact?: boolean;
}) {
  const sizeClass = compact ? "px-6 py-3" : "px-8 py-4";
  const layoutClass = wide ? "block w-full text-center" : "inline-block";
  const base = `rounded-full text-xs font-bold tracking-[0.22em] uppercase transition-transform duration-300 hover:scale-[1.03] ${sizeClass} ${layoutClass}`;

  if (event.status === "Sold Out") {
    return (
      <span className={`border-border/70 text-muted-foreground cursor-not-allowed rounded-full border ${sizeClass} ${layoutClass} text-xs font-bold tracking-[0.22em] uppercase`}>
        Sold Out
      </span>
    );
  }

  if (event.ticketUrl) {
    return (
      <a
        href={event.ticketUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`bg-heat text-primary-foreground ${base}`}
      >
        Get Tickets
      </a>
    );
  }

  return (
    <Link
      to="/ticket/$slug"
      params={{ slug: event.slug }}
      className={`bg-heat text-primary-foreground ${base}`}
    >
      Get Tickets
    </Link>
  );
}
