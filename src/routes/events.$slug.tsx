import { createFileRoute } from "@tanstack/react-router";
import { getEvent } from "@/data/site";
import { EventDetail } from "@/components/site/event-detail";

export const Route = createFileRoute("/events/$slug")({
  head: ({ params }) => {
    const e = getEvent(params.slug);
    if (!e) {
      return {
        meta: [
          { title: "Event Not Found" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const title = `${e.title} — ${e.city} | ${e.date}`;
    return {
      meta: [
        { title },
        { name: "description", content: e.description },
        { property: "og:title", content: title },
        { property: "og:description", content: e.description },
        { property: "og:type", content: "website" },
      ],
    };
  },
  component: EventPage,
});

function EventPage() {
  const { slug } = Route.useParams();
  return <EventDetail slug={slug} />;
}
