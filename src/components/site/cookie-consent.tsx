import { useEffect, useState } from "react";
import { gaMeasurementId } from "@/lib/analytics";

type Consent = "accepted" | "declined" | null;

export function CookieConsent() {
  const [consent, setConsent] = useState<Consent>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("awaara_cookie_consent") as Consent;
    setConsent(saved);
    setOpen(!saved);
  }, []);

  useEffect(() => {
    if (consent !== "accepted" || !gaMeasurementId || window.gtag) return;
    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`;
    script.async = true;
    document.head.appendChild(script);
    window.dataLayer = window.dataLayer || [];
    window.gtag = (...args: unknown[]) => window.dataLayer?.push(args);
    window.gtag("js", new Date());
    window.gtag("config", gaMeasurementId, { anonymize_ip: true });
  }, [consent]);

  const choose = (next: Exclude<Consent, null>) => {
    window.localStorage.setItem("awaara_cookie_consent", next);
    setConsent(next);
    setOpen(false);
  };

  return (
    <>
      {open ? (
        <section
          aria-label="Cookie preferences"
          className="bg-background/95 border-border/70 fixed inset-x-3 bottom-3 z-[70] max-h-[min(80svh,28rem)] overflow-y-auto rounded-xl border p-4 shadow-2xl backdrop-blur-xl sm:inset-x-auto sm:right-4 sm:bottom-4 sm:max-w-md sm:p-5"
        >
          <h2 className="font-display text-lg font-extrabold uppercase">Cookie Preferences</h2>
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
            This website uses cookies and similar technologies to improve your experience and
            understand website usage. Analytics only loads if you accept.
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={() => choose("accepted")}
              className="bg-heat text-primary-foreground rounded-full px-5 py-3 text-xs font-bold tracking-[0.18em] uppercase"
            >
              Accept
            </button>
            <button
              type="button"
              onClick={() => choose("declined")}
              className="border-border/70 hover:bg-surface-2 rounded-full border px-5 py-3 text-xs font-bold tracking-[0.18em] uppercase"
            >
              Decline
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-muted-foreground hover:text-foreground px-5 py-3 text-xs font-bold tracking-[0.18em] uppercase"
            >
              Manage Preferences
            </button>
          </div>
        </section>
      ) : null}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-muted-foreground hover:text-foreground fixed bottom-3 left-4 z-[60] max-w-[45vw] text-left text-[0.65rem] tracking-[0.18em] uppercase"
      >
        Cookie Preferences
      </button>
    </>
  );
}
