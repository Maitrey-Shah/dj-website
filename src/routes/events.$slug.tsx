import { createFileRoute } from "@tanstack/react-router";
import { getEvent } from "@/data/site";
import { EventDetail } from "@/components/site/event-detail";
import { absoluteUrl, canonical, pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/events/$slug")({
  head: ({ params }) => {
    const e = getEvent(params.slug);
    if (!e) {
      return {
        meta: [
          { title: "Event Not Found | AWAARA" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const title = `${e.title} | ${e.city} | AWAARA`;
    const path = `/events/${e.slug}`;
    return {
      meta: pageMeta({
        title,
        description: e.description,
        path,
        image: absoluteUrl(e.image),
        type: "article",
      }),
      links: [canonical(path)],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            name: e.title,
            description: e.description,
            startDate: e.date,
            eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
            eventStatus: "https://schema.org/EventScheduled",
            image: [absoluteUrl(e.image)],
            url: absoluteUrl(path),
            location: { "@type": "Place", name: e.venue, address: e.address },
            organizer: { "@type": "Organization", name: "AWAARA" },
          }),
        },
      ],
    };
  },
  component: EventPage,
});

function EventPage() {
  const { slug } = Route.useParams();
  return <EventDetail slug={slug} />;
}
