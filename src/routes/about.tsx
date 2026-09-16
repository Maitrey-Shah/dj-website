import { createFileRoute } from "@tanstack/react-router";
import { SectionRedirect } from "@/components/site/section-redirect";
import { canonical, pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: pageMeta({
      title: "About AWAARA — Desi Entertainment in Canada",
      description:
        "Learn about AWAARA, a Canadian Desi entertainment brand creating concerts, DJ nights and nightlife experiences.",
      path: "/about",
    }),
    links: [canonical("/about")],
  }),
  component: () => <SectionRedirect hash="about" label="About AWAARA" />,
});
