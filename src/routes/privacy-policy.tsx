import { createFileRoute, Link } from "@tanstack/react-router";
import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";
import { brand } from "@/data/site";
import { canonical, pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: pageMeta({
      title: "Privacy Policy — AWAARA",
      description:
        "Learn how AWAARA handles contact details, event enquiries, ticket-related information, cookies and website usage data.",
      path: "/privacy-policy",
    }),
    links: [canonical("/privacy-policy")],
  }),
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  return (
    <div className="bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-4xl px-5 pt-32 pb-20 sm:px-8">
        <p className="eyebrow">Legal</p>
        <h1 className="font-display mt-4 text-4xl font-extrabold uppercase sm:text-6xl">
          Privacy Policy
        </h1>
        <p className="text-muted-foreground mt-4 text-sm">Last updated: September 16, 2026</p>
        <div className="text-muted-foreground mt-10 space-y-8 leading-relaxed">
          <Section title="Overview">
            This policy explains how {brand.name} handles information collected through this
            website, event enquiries, WhatsApp conversations and ticket-related interactions.
            Business legal details such as the operating legal entity and mailing address should be
            added here once confirmed.
          </Section>
          <Section title="Information We Collect">
            We may collect contact details you provide, such as name, email, phone number, city,
            inquiry type, event interests, VIP booking details and messages. Event or ticket
            information may include selected event, ticket tier, quantity and booking preferences.
          </Section>
          <Section title="Website Usage, Cookies And Analytics">
            We may collect basic website usage data such as pages visited, approximate device type,
            referrer and interaction events if analytics is configured and you consent. Essential
            cookies may be used for site functionality. Non-essential analytics are controlled by
            the cookie preferences banner.
          </Section>
          <Section title="Third-Party Services">
            We may link to or use third-party services such as ticketing providers, payment
            processors, analytics tools, social platforms and WhatsApp. Those services process data
            under their own privacy terms. Payment card data should be handled only by a connected
            payment provider, not by this website.
          </Section>
          <Section title="How We Use Information">
            We use information to respond to enquiries, provide event information, support ticket
            and VIP requests, improve the website, understand demand for events and maintain site
            security.
          </Section>
          <Section title="Retention And Security">
            We keep information only as long as reasonably needed for the purpose collected,
            business records, dispute handling or legal requirements. We use reasonable safeguards,
            but no internet service can guarantee absolute security.
          </Section>
          <Section title="Your Choices And Rights">
            You may contact us to request access, correction or deletion of personal information,
            subject to reasonable identity verification and applicable limits. You can change cookie
            preferences from the cookie preferences link on the website.
          </Section>
          <Section title="Contact">
            Privacy questions can be sent to{" "}
            <a className="text-foreground underline" href={`mailto:${brand.email}`}>
              {brand.email}
            </a>
            . Replace this email with the confirmed privacy contact if different.
          </Section>
          <Section title="Updates">
            We may update this policy as the website, event operations or service providers change.
            The latest version will be posted on this page.
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
