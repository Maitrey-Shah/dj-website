import { useMemo, useState } from "react";
import { categories, events, type Category } from "@/data/site";
import { EventCard } from "@/components/site/event-card";
import { Reveal, SectionHeading } from "@/components/site/reveal";
import { cn } from "@/lib/utils";

export function EventsSection() {
  const [active, setActive] = useState<Category>("All");

  const filtered = useMemo(() => {
    if (active === "All") return events;
    return events.filter((e) => e.category === active);
  }, [active]);

  return (
    <section id="events" className="mx-auto max-w-[1400px] scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
      <SectionHeading
        eyebrow="Tickets on sale now"
        title="Upcoming Events"
        subtitle="Your next unforgettable night is already on the calendar."
      />

      <Reveal className="no-scrollbar mt-10 flex gap-2 overflow-x-auto pb-1">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActive(c)}
            className={cn(
              "shrink-0 rounded-full border px-5 py-2.5 text-[0.7rem] font-semibold tracking-[0.18em] uppercase transition-colors",
              active === c
                ? "bg-heat text-primary-foreground border-transparent"
                : "border-border/70 text-muted-foreground hover:text-foreground",
            )}
          >
            {c}
          </button>
        ))}
      </Reveal>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((e, i) => (
          <Reveal key={e.id} delay={i * 70} as="div">
            <EventCard event={e} />
          </Reveal>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted-foreground mt-12 text-center text-sm">
          No events in this category right now — new dates drop every month.
        </p>
      ) : null}
    </section>
  );
}
