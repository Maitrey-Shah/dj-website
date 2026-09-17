import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { FloatingWhatsApp } from "@/components/site/whatsapp";
import { TicketPage } from "@/components/site/ticket-page";
import { getEvent, whatsappMessages } from "@/data/site";
import { absoluteUrl, canonical, pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/ticket/$slug")({
  head: ({ params }) => {
    const e = getEvent(params.slug);
    if (!e) {
      return {
        meta: [
          { title: "Tickets — Event Not Found | AWAARA" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const title = `${e.title} Tickets | AWAARA`;
    const path = `/tickets/${e.slug}`;
    return {
      meta: pageMeta({
        title,
        description: `Buy tickets for ${e.title} at ${e.venue}, ${e.city}. ${e.description}`,
        path,
        image: absoluteUrl(e.image),
      }),
      links: [canonical(path)],
    };
  },
  component: TicketRoutePage,
});

function TicketRoutePage() {
  const { slug } = Route.useParams();
  return (
    <div className="bg-background text-foreground">
      <Navbar />
      <main>
        <TicketPage slug={slug} />
      </main>
      <Footer />
      <FloatingWhatsApp message={whatsappMessages.general} />
    </div>
  );
}
