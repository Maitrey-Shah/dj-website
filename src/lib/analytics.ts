type AnalyticsEvent =
  | "page_view"
  | "view_event"
  | "click_get_tickets"
  | "click_explore_events"
  | "click_whatsapp"
  | "submit_contact_form"
  | "vip_inquiry";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

export function hasAnalyticsConsent() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem("awaara_cookie_consent") === "accepted";
}

export function trackEvent(name: AnalyticsEvent, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || !hasAnalyticsConsent() || !window.gtag) return;
  window.gtag("event", name, params);
}
