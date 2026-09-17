import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, MapPin, ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { FloatingWhatsApp } from "@/components/site/whatsapp";
import { events, brand, whatsappMessages } from "@/data/site";
import { formatDate } from "@/components/site/event-card";
import { Reveal, SectionHeading } from "@/components/site/reveal";
import { canonical, pageMeta } from "@/lib/seo";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/tickets")({
  head: () => ({
    meta: [
      ...pageMeta({
        title: "AWAARA Tickets — Book Desi Events & Concerts in Canada",
        description:
          "Browse and book tickets for AWAARA's upcoming Desi concerts, DJ nights, Bollywood events and live music across Canada.",
        path: "/tickets",
      }),
      // Checkout pages should not be indexed
      { name: "robots", content: "noindex, nofollow" },
    ],
    links: [canonical("/tickets")],
  }),
  component: TicketsIndexPage,
});

function TicketsIndexPage() {
  const upcoming = events.filter((e) => e.status !== "Sold Out");
  const soldOut = events.filter((e) => e.status === "Sold Out");

  return (
    <div className="bg-background text-foreground">
      <Navbar />

      <main className="min-h-[80svh]">
        {/* Page header */}
        <section className="grain border-border/60 border-b pt-28 pb-12 sm:pt-32 sm:pb-16">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
            <SectionHeading
              eyebrow="Select your event"
              title={
                <>
                  Get your
                  <br />
                  <span className="text-heat">tickets.</span>
                </>
              }
              subtitle="Choose an upcoming event below to see ticket tiers, pricing and availability."
            />
          </div>
        </section>

        {/* Upcoming events */}
        <section className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 sm:py-20">
          {upcoming.length === 0 ? (
            <Reveal>
              <p className="text-muted-foreground text-center text-sm">
                No upcoming events at the moment — new dates drop every month. Follow us on social
                or WhatsApp for announcements.
              </p>
            </Reveal>
          ) : (
            <div className="space-y-5">
              {upcoming.map((e, i) => (
                <Reveal key={e.id} delay={i * 60}>
                  <article className="border-border/70 bg-surface group grid overflow-hidden rounded-xl border transition-colors hover:border-border sm:grid-cols-[220px_1fr] md:grid-cols-[280px_1fr]">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden sm:h-auto">
                      <img
                        src={e.image}
                        alt={`${e.title} event poster`}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[800ms] group-hover:scale-105"
                      />
                      <div className="fade-bottom absolute inset-0" />
                      <span className="bg-heat text-primary-foreground absolute top-3 left-3 rounded-full px-3 py-1 text-[0.6rem] font-bold tracking-[0.18em] uppercase">
                        {e.status}
                      </span>
                    </div>

                    {/* Details */}
                    <div className="flex flex-col justify-between gap-5 p-5 sm:p-7">
                      <div>
                        <p className="eyebrow mb-2">{e.category}</p>
                        <h2 className="font-display text-2xl leading-tight font-extrabold uppercase sm:text-3xl">
                          {e.title}
                        </h2>
                        <div className="text-muted-foreground mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs">
                          <span className="inline-flex items-center gap-1.5">
                            <CalendarDays className="h-3.5 w-3.5" />
                            {formatDate(e.date)} • {e.time}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5" />
                            {e.venue} • {e.city}, {e.province}
                          </span>
                        </div>
                        <p className="text-muted-foreground mt-3 line-clamp-2 text-sm leading-relaxed">
                          {e.description}
                        </p>
                        {e.artists.length > 0 && (
                          <p className="text-gold mt-3 text-xs font-semibold tracking-[0.18em] uppercase">
                            {e.artists.join(" • ")}
                          </p>
                        )}
                      </div>

                      {/* Ticket price preview */}
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-wrap gap-3">
                          {e.tickets
                            .filter((t) => !t.requestOnly && t.status !== "sold-out")
                            .slice(0, 3)
                            .map((t) => (
                              <div
                                key={t.id}
                                className="border-border/60 rounded-lg border px-3 py-2 text-center"
                              >
                                <p className="text-[0.6rem] tracking-[0.14em] uppercase text-muted-foreground">
                                  {t.name}
                                </p>
                                <p className="mt-0.5 text-sm font-bold">
                                  {t.fromPrice ?? `$${t.amount.toFixed(2)}`}
                                </p>
                              </div>
                            ))}
                        </div>

                        <div className="flex items-center gap-3">
                          <Link
                            to="/events/$slug"
                            params={{ slug: e.slug }}
                            aria-label={`View ${e.title} details`}
                            className="border-border/70 hover:bg-surface-2 flex h-10 w-10 items-center justify-center rounded-full border transition-colors"
                          >
                            <ArrowUpRight className="h-4 w-4" />
                          </Link>
                          {e.ticketUrl ? (
                            <a
                              href={e.ticketUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() =>
                                trackEvent("click_get_tickets", {
                                  source: "tickets_index",
                                  event: e.slug,
                                })
                              }
                              className="bg-heat text-primary-foreground rounded-full px-6 py-3 text-xs font-bold tracking-[0.2em] uppercase transition-transform duration-300 hover:scale-[1.03]"
                            >
                              Get Tickets
                            </a>
                          ) : (
                            <Link
                              to="/ticket/$slug"
                              params={{ slug: e.slug }}
                              onClick={() =>
                                trackEvent("click_get_tickets", {
                                  source: "tickets_index",
                                  event: e.slug,
                                })
                              }
                              className="bg-heat text-primary-foreground rounded-full px-6 py-3 text-xs font-bold tracking-[0.2em] uppercase transition-transform duration-300 hover:scale-[1.03]"
                            >
                              Get Tickets
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          )}

          {/* Sold-out events — shown collapsed at bottom */}
          {soldOut.length > 0 && (
            <div className="border-border/60 mt-12 border-t pt-10">
              <p className="eyebrow mb-6">Sold Out</p>
              <div className="space-y-3">
                {soldOut.map((e) => (
                  <div
                    key={e.id}
                    className="border-border/50 flex flex-wrap items-center justify-between gap-4 rounded-xl border px-5 py-4 opacity-60"
                  >
                    <div>
                      <p className="font-semibold uppercase">{e.title}</p>
                      <p className="text-muted-foreground mt-0.5 text-xs">
                        {formatDate(e.date)} • {e.city}
                      </p>
                    </div>
                    <span className="border-border/50 text-muted-foreground rounded-full border px-4 py-2 text-xs font-bold tracking-[0.2em] uppercase">
                      Sold Out
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* WhatsApp CTA */}
        <section className="border-border/60 border-t py-14 sm:py-20">
          <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
            <Reveal className="border-border/70 from-surface-2 mx-auto max-w-2xl rounded-xl border bg-gradient-to-b to-transparent p-8 text-center sm:p-12">
              <p className="eyebrow mb-3">Need help?</p>
              <h2 className="text-2xl font-extrabold uppercase sm:text-3xl">
                Questions about tickets?
              </h2>
              <p className="text-muted-foreground mx-auto mt-3 max-w-md text-sm leading-relaxed">
                VIP tables, group bookings, or just want to know what's on — message us directly on
                WhatsApp.
              </p>
              <a
                href={`https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(whatsappMessages.general)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("click_whatsapp", { source: "tickets_index" })}
                className="border-border/70 hover:bg-surface-2 mt-7 inline-block rounded-full border px-8 py-4 text-xs font-bold tracking-[0.22em] uppercase transition-colors"
              >
                WhatsApp Us
              </a>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp message={whatsappMessages.general} />
    </div>
  );
}
