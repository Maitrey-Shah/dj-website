import { Link } from "@tanstack/react-router";
import { trackEvent } from "@/lib/analytics";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import type { EventItem } from "@/data/site";

/** Renders the correct GET TICKETS CTA depending on whether the event
 *  has an external ticketUrl configured or uses the internal checkout. */
function GetTicketsCta({ event, className }: { event: EventItem; className: string }) {
  if (event.ticketUrl) {
    return (
      <a
        href={event.ticketUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("click_get_tickets", { source: "event_card", event: event.slug })}
        className={className}
      >
        Get Tickets
      </a>
    );
  }
  return (
    <Link
      to="/ticket/$slug"
      params={{ slug: event.slug }}
      onClick={() => trackEvent("click_get_tickets", { source: "event_card", event: event.slug })}
      className={className}
    >
      Get Tickets
    </Link>
  );
}

export const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-CA", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export function EventCard({ event }: { event: EventItem }) {
  return (
    <article className="group border-border/70 bg-surface relative overflow-hidden rounded-xl border">
      <Link
        to="/events/$slug"
        params={{ slug: event.slug }}
        className="block"
        aria-label={`${event.title} — details`}
      >
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={event.image}
            alt={`${event.title} event poster`}
            loading="lazy"
            width={1024}
            height={1280}
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
          />
          <div className="fade-bottom absolute inset-0" />
          <span className="bg-background/70 absolute top-4 left-4 max-w-[calc(100%-2rem)] rounded-full border px-3 py-1 text-[0.65rem] font-semibold tracking-[0.18em] uppercase backdrop-blur-md">
            {event.category}
          </span>
          <span className="bg-heat text-primary-foreground absolute top-12 left-4 rounded-full px-3 py-1 text-[0.65rem] font-bold tracking-[0.16em] uppercase min-[420px]:top-4 min-[420px]:right-4 min-[420px]:left-auto">
            {event.status}
          </span>

          <div className="absolute inset-x-0 bottom-0 p-5">
            <h3 className="text-2xl leading-tight font-extrabold uppercase transition-transform duration-500 group-hover:-translate-y-1">
              {event.title}
            </h3>
            <p className="text-muted-foreground mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5" /> {formatDate(event.date)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" /> {event.city} • {event.venue}
              </span>
            </p>
          </div>
        </div>
      </Link>

      <div className="p-5">
        <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
          {event.description}
        </p>
        <p className="eyebrow mt-4">{event.artists.join(" • ")}</p>
        <div className="mt-5 flex items-center gap-3">
          <GetTicketsCta
            event={event}
            className="bg-heat text-primary-foreground inline-flex min-w-0 flex-1 items-center justify-center gap-2 rounded-full px-4 py-3 text-center text-[0.7rem] font-bold tracking-[0.16em] uppercase transition-transform duration-300 hover:scale-[1.02] sm:px-5 sm:tracking-[0.2em]"
          />
          <Link
            to="/events/$slug"
            params={{ slug: event.slug }}
            aria-label={`View ${event.title} details`}
            className="border-border/70 hover:bg-surface-2 flex h-11 w-11 items-center justify-center rounded-full border transition-colors"
          >
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
