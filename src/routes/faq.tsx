import { createFileRoute } from "@tanstack/react-router";
import { SectionRedirect } from "@/components/site/section-redirect";
import { canonical, pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: pageMeta({
      title: "FAQ — AWAARA Events & Tickets",
      description:
        "Find answers about AWAARA tickets, refunds, age restrictions, VIP tables, event details and contact options.",
      path: "/faq",
    }),
    links: [canonical("/faq")],
  }),
  component: () => <SectionRedirect hash="faq" label="FAQ" />,
});
