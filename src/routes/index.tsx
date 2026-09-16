import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { EventsSection } from "@/components/site/events-section";
import { FeaturedEvent } from "@/components/site/featured-event";
import { ArtistsSection } from "@/components/site/artists-section";
import {
  ExperienceSection,
  BrandStory,
  CitiesSection,
  GallerySection,
  SocialStrip,
} from "@/components/site/moments";
import {
  VipSection,
  PrivateEventsSection,
  TestimonialsSection,
  NewsletterSection,
  FaqSection,
  ContactSection,
} from "@/components/site/offerings";
import { Footer } from "@/components/site/footer";
import { FloatingWhatsApp } from "@/components/site/whatsapp";
import { brand, whatsappMessages } from "@/data/site";
import { canonical, eventsJsonLd, pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: pageMeta({
      title: `${brand.name} — Desi Events, Concerts & Nightlife in Canada`,
      description:
        "Discover premium Desi concerts, DJ nights, live music and unforgettable nightlife experiences with AWAARA across Canada.",
    }),
    links: [canonical("/")],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(eventsJsonLd()),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <EventsSection />
        <FeaturedEvent />
        <ArtistsSection />
        <ExperienceSection />
        <BrandStory />
        <CitiesSection />
        <GallerySection />
        <SocialStrip />
        <VipSection />
        <PrivateEventsSection />
        <TestimonialsSection />
        <NewsletterSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingWhatsApp message={whatsappMessages.general} />
    </div>
  );
}
