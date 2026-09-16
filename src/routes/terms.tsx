import { createFileRoute, Link } from "@tanstack/react-router";
import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";
import { brand } from "@/data/site";
import { canonical, pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: pageMeta({
      title: "Terms & Conditions — AWAARA",
      description:
        "Review AWAARA website and event terms, including tickets, event changes, age rules, venue conduct and third-party ticket providers.",
      path: "/terms",
    }),
    links: [canonical("/terms")],
  }),
  component: Terms,
});

function Terms() {
  return (
    <div className="bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-4xl px-5 pt-32 pb-20 sm:px-8">
        <p className="eyebrow">Legal</p>
        <h1 className="font-display mt-4 text-4xl font-extrabold uppercase sm:text-6xl">
          Terms & Conditions
        </h1>
        <p className="text-muted-foreground mt-4 text-sm">Last updated: September 16, 2026</p>
        <div className="text-muted-foreground mt-10 space-y-8 leading-relaxed">
          <Section title="Website Use">
            This website provides information about {brand.name} events, artists, tickets, VIP
            bookings and contact options. Do not misuse the website, interfere with its operation or
            attempt to access private systems.
          </Section>
          <Section title="Event Information">
            Event details, artists, set times, venues, age restrictions and policies can change.
            Event-specific details are provided on the individual event page and by the applicable
            ticketing provider or venue.
          </Section>
          <Section title="Tickets And Payments">
            Tickets may be sold through this website or third-party ticket providers. Review all
            ticket details before purchase. Where an external provider is used, its checkout terms,
            fees and policies also apply.
          </Section>
          <Section title="Refunds, Changes And Cancellations">
            Refund and transfer rules depend on the event and ticket provider. Do not assume a
            refund is available unless the event page or ticket provider states it. If an event is
            cancelled or rescheduled, instructions will be shared through official channels.
          </Section>
          <Section title="Venue Rules And Age Restrictions">
            Guests must follow venue rules, security instructions and applicable laws. Many events
            are 19+ and require valid government photo ID. Event-specific details are provided on
            the individual event page.
          </Section>
          <Section title="Prohibited Behaviour">
            Harassment, violence, discrimination, unsafe conduct, illegal substances, ticket fraud
            and disruption of the event may result in refused entry or removal without refund where
            permitted by the applicable ticket/venue rules.
          </Section>
          <Section title="Intellectual Property">
            Website content, branding, event artwork and media are owned by {brand.name}, licensors
            or partners and may not be copied or reused without permission.
          </Section>
          <Section title="Liability">
            To the extent permitted by law, {brand.name} is not responsible for losses caused by
            third-party providers, venue decisions, personal belongings, travel plans, weather,
            technical issues or event changes outside its reasonable control.
          </Section>
          <Section title="Contact">
            Questions about these terms can be sent to{" "}
            <a className="text-foreground underline" href={`mailto:${brand.email}`}>
              {brand.email}
            </a>
            . Replace this with the confirmed legal contact if different.
          </Section>
        </div>
        <Link
          to="/"
          className="border-border/70 hover:bg-surface-2 mt-12 inline-block rounded-full border px-8 py-4 text-xs font-bold tracking-[0.22em] uppercase"
        >
          Go Home
        </Link>
      </main>
      <Footer />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-xl font-extrabold uppercase text-foreground">{title}</h2>
      <p className="mt-3">{children}</p>
    </section>
  );
}
