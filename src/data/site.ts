import heroImg from "@/assets/hero.jpg";
import event1 from "@/assets/event-1.jpg";
import event2 from "@/assets/event-2.jpg";
import event3 from "@/assets/event-3.jpg";
import event4 from "@/assets/event-4.jpg";
import artist1 from "@/assets/artist-1.jpg";
import artist2 from "@/assets/artist-2.jpg";
import artist3 from "@/assets/artist-3.jpg";
import vipImg from "@/assets/vip.jpg";
import gallery1 from "@/assets/gallery-1.jpg";

/* ------------------------------------------------------------------ */
/* Brand / contact configuration — replace with the client's real data */
/* ------------------------------------------------------------------ */

export const brand = {
  name: "NOIRÉ",
  tagline: "Canada's Desi Entertainment Experience",
  // PLACEHOLDER — replace with the real WhatsApp business number (digits only, incl. country code)
  whatsappNumber: "14165550123",
  email: "hello@noirelive.ca",
  phone: "+1 (416) 555-0123",
  instagram: "https://instagram.com/",
  instagramHandle: "@noire.live",
  facebook: "https://facebook.com/",
  youtube: "https://youtube.com/",
  tiktok: "https://tiktok.com/",
};

export function whatsappLink(message: string) {
  return `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const whatsappMessages = {
  general: "Hi! I'm interested in your upcoming events. Can you share more details?",
  vip: "Hi! I'd like to book a VIP table. Can you share packages and pricing?",
  private: "Hi! I'd like to plan a private / corporate event with you.",
  event: (title: string) => `Hi! I'd like more details about ${title}.`,
};

/* ------------------------------------------------------------------ */
/* Events                                                              */
/* ------------------------------------------------------------------ */

export const categories = [
  "All",
  "Concerts",
  "DJ Nights",
  "Bollywood",
  "Punjabi",
  "Festivals",
  "Special Events",
] as const;

export type Category = (typeof categories)[number];

export type TicketStatus = "available" | "low" | "sold-out" | "coming-soon" | "request";

export type TicketTier = {
  id: string;
  name: string;
  /** Numeric price in CAD. Use 0 with `fromPrice` for request-only tiers. */
  amount: number;
  currency: "CAD";
  /** Display-only price string, e.g. "From $399 CAD" for table tiers. */
  fromPrice?: string;
  description: string;
  status: TicketStatus;
  /** Request-only tiers (VIP tables) open an inquiry form instead of checkout. */
  requestOnly?: boolean;
  benefits: string[];
};

/** Service fee applied to internal checkout subtotals. */
export const serviceFeeRate = 0.08;

export function formatCad(amount: number) {
  return `$${amount.toFixed(2)} CAD`;
}

export const ticketStatusLabel: Record<TicketStatus, string> = {
  available: "Available",
  low: "Low availability",
  "sold-out": "Sold out",
  "coming-soon": "Coming soon",
  request: "By request",
};

export type EventItem = {
  id: string;
  title: string;
  slug: string;
  date: string; // ISO
  time: string;
  city: string;
  province: string;
  country: string;
  venue: string;
  address: string;
  category: Exclude<Category, "All">;
  description: string;
  longDescription: string;
  image: string;
  artists: string[];
  /** Optional external ticketing provider. Empty string = use internal checkout. */
  ticketUrl: string;
  status: "On Sale" | "Selling Fast" | "Few Left" | "Sold Out";
  featured: boolean;
  dressCode: string;
  ageRequirement: string;
  tickets: TicketTier[];
};

const baseTickets: TicketTier[] = [
  {
    id: "early-bird",
    name: "Early Bird",
    amount: 29.99,
    currency: "CAD",
    description: "Limited early access at the lowest price tier.",
    status: "low",
    benefits: ["General entry", "Lowest price tier", "Transferable"],
  },
  {
    id: "general",
    name: "General Admission",
    amount: 39.99,
    currency: "CAD",
    description: "Standard entry to the main floor.",
    status: "available",
    benefits: ["General entry", "Coat check access", "Standing floor"],
  },
  {
    id: "vip",
    name: "VIP",
    amount: 79.99,
    currency: "CAD",
    description: "Priority entry and lounge access.",
    status: "available",
    benefits: ["Priority entry", "VIP lounge access", "Dedicated bar", "Welcome drink"],
  },
  {
    id: "vip-table",
    name: "VIP Table",
    amount: 399,
    currency: "CAD",
    fromPrice: "From $399 CAD",
    description: "Reserved table service for your group.",
    status: "request",
    requestOnly: true,
    benefits: [
      "Premium table",
      "Priority entry",
      "Dedicated service",
      "Premium seating",
      "Event access",
    ],
  },
];


export const events: EventItem[] = [
  {
    id: "1",
    title: "Ignite the Night",
    slug: "ignite-the-night",
    date: "2026-09-26",
    time: "10:00 PM – 3:00 AM",
    city: "Toronto",
    venue: "REBEL Warehouse",
    address: "11 Polson St, Toronto, ON",
    category: "DJ Nights",
    description:
      "Canada's biggest desi club night returns with a triple-deck takeover, laser rigs and a sound system built for bass.",
    longDescription:
      "Three rooms, three sounds, one night. Ignite the Night brings together Toronto's sharpest desi selectors for a warehouse takeover with a full laser and CO2 production. Expect Punjabi anthems on the main floor, Bollywood throwbacks in room two and Afro-desi fusion on the terrace.",
    image: event1,
    artists: ["DJ RAAVI", "Simar Kaur", "Noor Bains"],
    ticketUrl: "https://example-ticketing.com/ignite-the-night",
    status: "Selling Fast",
    featured: true,
    dressCode: "Smart night out. No athletic wear.",
    ageRequirement: "19+ with valid government photo ID",
    tickets: baseTickets,
  },
  {
    id: "2",
    title: "Punjabi Live: Pind Sessions",
    slug: "punjabi-live-pind-sessions",
    date: "2026-10-11",
    time: "8:00 PM – 1:00 AM",
    city: "Vancouver",
    venue: "Queen Elizabeth Theatre",
    address: "630 Hamilton St, Vancouver, BC",
    category: "Punjabi",
    description:
      "A full live band, dhol section and a headline vocalist bringing folk and modern Punjabi together on one stage.",
    longDescription:
      "Pind Sessions is our live concert series built around Punjabi songwriting. A ten-piece band, a dhol section and a headline vocalist perform a career-spanning set, followed by an after-party in the upper lounge.",
    image: event2,
    artists: ["Noor Bains", "The Pind Collective"],
    ticketUrl: "https://example-ticketing.com/pind-sessions",
    status: "On Sale",
    featured: false,
    dressCode: "Anything you can dance in.",
    ageRequirement: "All ages until 11 PM, 19+ after",
    tickets: baseTickets,
  },
  {
    id: "3",
    title: "Skyline Rooftop Party",
    slug: "skyline-rooftop-party",
    date: "2026-08-29",
    time: "7:00 PM – 2:00 AM",
    city: "Toronto",
    venue: "Lavelle Rooftop",
    address: "627 King St W, Toronto, ON",
    category: "Special Events",
    description:
      "Sunset to skyline. Open-air decks, a golden-hour set and the city lit up behind the DJ booth.",
    longDescription:
      "Our summer rooftop series takes over one of the city's best terraces. Golden-hour house, a desi-fusion peak-time set and a skyline you'll be posting all weekend.",
    image: event3,
    artists: ["DJ RAAVI", "Kabir Sound System"],
    ticketUrl: "https://example-ticketing.com/skyline-rooftop",
    status: "Few Left",
    featured: false,
    dressCode: "Rooftop chic.",
    ageRequirement: "19+ with valid government photo ID",
    tickets: baseTickets,
  },
  {
    id: "4",
    title: "Bollywood Masquerade",
    slug: "bollywood-masquerade",
    date: "2026-11-15",
    time: "9:00 PM – 2:30 AM",
    city: "Calgary",
    venue: "The Grand Ballroom",
    address: "608 1 St SW, Calgary, AB",
    category: "Bollywood",
    description:
      "Gold, velvet and confetti. A themed Bollywood ball with live percussion, dancers and a midnight showcase.",
    longDescription:
      "A themed ballroom night with masks, live percussion, a choreographed dance showcase at midnight and a soundtrack running from 90s Bollywood to today's chart-toppers.",
    image: event4,
    artists: ["Simar Kaur", "DJ Meher"],
    ticketUrl: "https://example-ticketing.com/bollywood-masquerade",
    status: "On Sale",
    featured: false,
    dressCode: "Black tie with a mask. Masks available at the door.",
    ageRequirement: "19+ with valid government photo ID",
    tickets: baseTickets,
  },
];

export const featuredEvent = (events.find((e) => e.featured) ?? events[0])!;

export function getEvent(slug: string) {
  return events.find((e) => e.slug === slug);
}

/* ------------------------------------------------------------------ */
/* Artists, cities, gallery, testimonials, FAQ                         */
/* ------------------------------------------------------------------ */

export const artists = [
  {
    name: "DJ RAAVI",
    genre: "Desi Bass / House",
    city: "Toronto, CA",
    image: artist1,
    instagram: brand.instagram,
  },
  {
    name: "Simar Kaur",
    genre: "Bollywood Vocals",
    city: "Mumbai, IN",
    image: artist2,
    instagram: brand.instagram,
  },
  {
    name: "Noor Bains",
    genre: "Punjabi Live",
    city: "Vancouver, CA",
    image: artist3,
    instagram: brand.instagram,
  },
];

export const experiences = [
  {
    title: "Live Music",
    copy: "Touring vocalists, full bands and dhol sections on production-grade stages.",
    image: event2,
  },
  {
    title: "DJ Nights",
    copy: "Warehouse sound, laser rigs and selectors who know exactly when to drop it.",
    image: event1,
  },
  {
    title: "Desi Culture",
    copy: "Punjabi, Bollywood and South Asian sound, presented without compromise.",
    image: event4,
  },
  {
    title: "Premium Nightlife",
    copy: "Hand-picked venues, VIP tables and a room that always feels like the place to be.",
    image: vipImg,
  },
];

export const stats = [
  { value: 50, suffix: "K+", label: "Attendees" },
  { value: 100, suffix: "+", label: "Events" },
  { value: 25, suffix: "+", label: "Artists" },
  { value: 10, suffix: "+", label: "Cities" },
];

export const cities = [
  { name: "Toronto", events: 34 },
  { name: "Vancouver", events: 21 },
  { name: "Calgary", events: 16 },
  { name: "Edmonton", events: 12 },
  { name: "Ottawa", events: 9 },
  { name: "Montreal", events: 8 },
  { name: "Winnipeg", events: 5 },
];

export const gallery = [
  { src: gallery1, alt: "Packed dancefloor lit by orange stage beams" },
  { src: event1, alt: "DJ performing to a full club room" },
  { src: heroImg, alt: "Concert crowd with hands raised in red stage light" },
  { src: event3, alt: "Rooftop party with the Toronto skyline behind the crowd" },
  { src: event4, alt: "Confetti falling over a themed ballroom party" },
  { src: event2, alt: "Punjabi vocalist and dhol player performing live" },
];

export const heroImage = heroImg;
export const vipImage = vipImg;

export const testimonials = [
  {
    quote:
      "Best desi night I've been to in Canada, full stop. The production genuinely felt like a festival, not a club night.",
    name: "Aman S.",
    city: "Toronto",
    event: "Ignite the Night",
  },
  {
    quote:
      "We booked a VIP table for my sister's birthday. The host looked after us all night and the sparklers came out at exactly the right moment.",
    name: "Priya M.",
    city: "Calgary",
    event: "Bollywood Masquerade",
  },
  {
    quote:
      "The live band on Pind Sessions was unreal. Three generations of my family were on their feet.",
    name: "Harjit G.",
    city: "Vancouver",
    event: "Punjabi Live",
  },
  {
    quote:
      "Tickets, entry, coat check, everything was smooth. You can tell these people have run a hundred of these.",
    name: "Zoya K.",
    city: "Ottawa",
    event: "Skyline Rooftop Party",
  },
];

export const faqs = [
  {
    q: "Where can I buy tickets?",
    a: "Every event page links straight to our ticketing partner. Tickets are only valid when bought through the official link — we never sell at the door unless an event says so.",
  },
  {
    q: "Are tickets refundable?",
    a: "Tickets are non-refundable but transferable up to 24 hours before doors. If an event is cancelled or rescheduled, you get a full refund or a transfer to the new date.",
  },
  { q: "What is the age requirement?", a: "Most events are 19+. Any all-ages event is clearly marked on its event page." },
  { q: "Do I need ID?", a: "Yes. Valid government-issued photo ID is required at every 19+ event, no exceptions." },
  {
    q: "How do VIP tables work?",
    a: "VIP tables include reserved seating, bottle service, priority entry and a dedicated host. Message us on WhatsApp and we'll confirm availability and pricing for your date.",
  },
  { q: "Can I book a private event?", a: "Absolutely. We produce private parties, corporate nights, university events and brand activations across Canada." },
  { q: "How do I contact the event team?", a: "WhatsApp is fastest. You can also use the inquiry form below or email us directly." },
  { q: "Do you offer group bookings?", a: "Yes — groups of 10 or more get discounted entry and a reserved area where the venue allows it." },
  { q: "Which cities do you operate in?", a: "Toronto, Vancouver, Calgary, Edmonton, Ottawa, Montreal and Winnipeg, with tour dates added regularly." },
  { q: "How can artists or DJs collaborate with you?", a: "Send your press kit and links through the contact form with 'Artist Booking' selected and our talent team will get back to you." },
];

export const inquiryTypes = [
  "General Inquiries",
  "Event Bookings",
  "VIP Bookings",
  "Artist Bookings",
  "Partnerships",
];
