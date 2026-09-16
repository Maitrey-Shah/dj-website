import { createFileRoute } from "@tanstack/react-router";
import { SectionRedirect } from "@/components/site/section-redirect";
import { canonical, pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: pageMeta({
      title: "Events — AWAARA | Desi Events & Concerts in Canada",
      description:
        "Explore upcoming AWAARA concerts, DJ nights, Bollywood events, Punjabi nights and special events across Canada.",
      path: "/events",
    }),
    links: [canonical("/events")],
  }),
  component: () => <SectionRedirect hash="events" label="Events" />,
});
