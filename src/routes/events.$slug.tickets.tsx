import { createFileRoute } from "@tanstack/react-router";
import { getEvent } from "@/data/site";
import { TicketPage } from "@/components/site/ticket-page";
import { absoluteUrl, canonical, pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/events/$slug/tickets")({
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
    const title = `Tickets — ${e.title} | ${e.city} | AWAARA`;
    const path = `/events/${e.slug}/tickets`;
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
  component: TicketsPage,
});

function TicketsPage() {
  const { slug } = Route.useParams();
  return <TicketPage slug={slug} />;
}
