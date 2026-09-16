import { createFileRoute } from "@tanstack/react-router";
import { SectionRedirect } from "@/components/site/section-redirect";
import { canonical, pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: pageMeta({
      title: "Gallery — AWAARA | Canadian Desi Events & Nightlife",
      description:
        "Explore photos and memories from AWAARA concerts, DJ nights and premium Desi events across Canada.",
      path: "/gallery",
    }),
    links: [canonical("/gallery")],
  }),
  component: () => <SectionRedirect hash="gallery" label="Gallery" />,
});
