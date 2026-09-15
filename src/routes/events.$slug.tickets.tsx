import { createFileRoute } from "@tanstack/react-router";
import { getEvent } from "@/data/site";
import { TicketPage } from "@/components/site/ticket-page";

export const Route = createFileRoute("/events/$slug/tickets")({
  head: ({ params }) => {
    const e = getEvent(params.slug);
    if (!e) {
      return {
        meta: [
          { title: "Tickets — Event Not Found" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const title = `Tickets — ${e.title} | ${e.city} ${e.date}`;
    return {
      meta: [
        { title },
        {
          name: "description",
          content: `Buy tickets for ${e.title} at ${e.venue}, ${e.city}. ${e.description}`,
        },
        { property: "og:title", content: title },
        { property: "og:description", content: e.description },
        { property: "og:type", content: "website" },
      ],
    };
  },
  component: TicketsPage,
});

function TicketsPage() {
  const { slug } = Route.useParams();
  return <TicketPage slug={slug} />;
}
