import { createFileRoute } from "@tanstack/react-router";
import { SectionRedirect } from "@/components/site/section-redirect";
import { canonical, pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: pageMeta({
      title: "Contact AWAARA — Events & Partnerships",
      description:
        "Contact AWAARA for event information, partnerships, VIP bookings and general enquiries.",
      path: "/contact",
    }),
    links: [canonical("/contact")],
  }),
  component: () => <SectionRedirect hash="contact" label="Contact" />,
});
