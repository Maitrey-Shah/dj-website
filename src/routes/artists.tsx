import { createFileRoute } from "@tanstack/react-router";
import { SectionRedirect } from "@/components/site/section-redirect";
import { canonical, pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/artists")({
  head: () => ({
    meta: pageMeta({
      title: "Artists — AWAARA | Live Artists & DJs in Canada",
      description:
        "Discover artists, DJs and performers featured at AWAARA events across Canada's Desi entertainment scene.",
      path: "/artists",
    }),
    links: [canonical("/artists")],
  }),
  component: () => <SectionRedirect hash="artists" label="Artists" />,
});
