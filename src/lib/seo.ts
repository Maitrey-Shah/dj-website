import { events, brand } from "@/data/site";

export const siteUrl = "https://pulse-stage-canada.lovable.app";
export const ogImageUrl = `${siteUrl}/og/awaara-og.png?v=awaara2026`;

export function absoluteUrl(path = "/") {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function pageMeta({
  title,
  description,
  path = "/",
  image = ogImageUrl,
  type = "website",
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: string;
}) {
  const url = absoluteUrl(path);
  return [
    { title },
    { name: "description", content: description },
    { name: "robots", content: "index, follow" },
    { property: "og:type", content: type },
    { property: "og:site_name", content: brand.name },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: image },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: "AWAARA — Premium Desi Events & Nightlife in Canada" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
  ];
}

export function canonical(path = "/") {
  return { rel: "canonical", href: absoluteUrl(path) };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: brand.name,
    url: siteUrl,
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand.name,
    url: siteUrl,
    logo: absoluteUrl("/brand/awaara-logo.svg"),
    email: brand.email,
    telephone: brand.phone,
    sameAs: [brand.instagram, brand.facebook, brand.youtube, brand.tiktok].filter(Boolean),
  };
}

export function eventsJsonLd() {
  return events.map((event) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description,
    startDate: event.date,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    image: [absoluteUrl(event.image)],
    url: absoluteUrl(`/events/${event.slug}`),
    location: {
      "@type": "Place",
      name: event.venue,
      address: event.address,
    },
    organizer: {
      "@type": "Organization",
      name: brand.name,
      url: siteUrl,
    },
  }));
}
