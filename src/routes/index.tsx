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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: `${brand.name} — Premium Desi Events, Concerts & Nightlife in Canada`,
      },
      {
        name: "description",
        content:
          "Bollywood concerts, DJ nights, Punjabi live shows and VIP nightlife across Toronto, Vancouver, Calgary and more. Tickets on sale now.",
      },
      { property: "og:title", content: `${brand.name} — The Night Starts Here` },
      {
        property: "og:description",
        content:
          "Canada's premium desi entertainment experience. Live concerts, global artists, unforgettable nights.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
