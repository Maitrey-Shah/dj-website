import { Link } from "@tanstack/react-router";
import { ArrowDown } from "lucide-react";
import { heroImage, featuredEvent, brand } from "@/data/site";

const monthShort = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-CA", { month: "short" }).toUpperCase();
const dayNum = (iso: string) => new Date(iso + "T00:00:00").getDate();

export function Hero() {
  return (
    <section id="top" className="grain relative min-h-[100svh] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Desi crowd dancing at a Toronto nightclub concert, DJ on stage under red lights with the CN Tower in the distance"
          width={1920}
          height={1024}
          className="slow-zoom h-full w-full object-cover object-[70%_center] sm:object-center"
        />
        {/* Cinematic overlay: slightly dark top, type-safe middle, deep black bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/35 to-background/95" />
        <div className="from-background/80 absolute inset-0 bg-gradient-to-r via-background/20 to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-[1400px] flex-col justify-end px-5 pt-32 pb-12 sm:px-8 sm:pb-16">
        <p className="eyebrow text-foreground/70 mb-6">{brand.tagline}</p>
        <h1 className="max-w-4xl text-[3.25rem] leading-[0.86] font-extrabold tracking-tight uppercase sm:text-8xl lg:text-[8.5rem]">
          The night
          <br />
          <span className="text-heat">starts here.</span>
        </h1>
        <p className="text-muted-foreground mt-6 max-w-lg text-base sm:text-xl">
          Live concerts. Global artists. Unforgettable nights.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/"
            hash="events"
            className="border-border/70 hover:bg-surface-2 rounded-full border px-8 py-4 text-center text-xs font-bold tracking-[0.22em] uppercase transition-colors"
          >
            Explore Events
          </Link>
          <a
            href={featuredEvent.ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-heat text-primary-foreground glow rounded-full px-8 py-4 text-center text-xs font-bold tracking-[0.22em] uppercase transition-transform duration-300 hover:scale-[1.03]"
          >
            Get Tickets
          </a>
        </div>

        <div className="border-border/60 mt-14 flex flex-wrap items-end gap-x-10 gap-y-6 border-t pt-7">
          <div>
            <p className="eyebrow mb-2">Next Event</p>
            <p className="font-display text-3xl font-extrabold">
              {dayNum(featuredEvent.date)} {monthShort(featuredEvent.date)}
            </p>
          </div>
          <div>
            <p className="eyebrow mb-2">City</p>
            <p className="font-display text-3xl font-extrabold uppercase">
              {featuredEvent.city}
            </p>
          </div>
          <div className="hidden sm:block">
            <p className="eyebrow mb-2">Venue</p>
            <p className="font-display text-3xl font-extrabold uppercase">
              {featuredEvent.venue}
            </p>
          </div>
          <p className="text-muted-foreground ml-auto hidden shrink-0 items-center gap-2 pr-2 text-[0.7rem] tracking-[0.24em] whitespace-nowrap uppercase lg:flex">
            Live • Music • Nightlife <ArrowDown className="h-4 w-4" />
          </p>
        </div>
      </div>
    </section>
  );
}
