import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  MapPin,
  Minus,
  Plus,
  ShieldCheck,
  Ticket,
} from "lucide-react";
import {
  getEvent,
  whatsappLink,
  formatCad,
  serviceFeeRate,
  ticketStatusLabel,
  type TicketTier,
} from "@/data/site";
import { WhatsAppIcon } from "@/components/site/whatsapp";
import { formatDate } from "@/components/site/event-card";
import { trackEvent } from "@/lib/analytics";

type Quantities = Record<string, number>;

const MAX_PER_TIER = 10;

export function TicketPage({ slug }: { slug: string }) {
  const e = getEvent(slug);
  const [qty, setQty] = useState<Quantities>({});
  const [stage, setStage] = useState<"select" | "checkout">("select");
  const [vipOpen, setVipOpen] = useState(false);

  const tiers = e?.tickets ?? [];

  const lines = useMemo(
    () =>
      tiers
        .map((t) => ({ tier: t, count: qty[t.id] ?? 0 }))
        .filter((l) => l.count > 0),
    [tiers, qty],
  );
  const subtotal = lines.reduce((s, l) => s + l.tier.amount * l.count, 0);
  const fee = subtotal * serviceFeeRate;
  const total = subtotal + fee;

  if (!e) {
    return (
      <div className="mx-auto flex min-h-[80svh] max-w-2xl flex-col items-center justify-center px-5 text-center">
        <h1 className="font-display text-5xl font-extrabold uppercase">Event not found</h1>
        <p className="text-muted-foreground mt-4">
          The event you're looking for may have ended or the link may be incorrect.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/"
            hash="events"
            className="bg-heat text-primary-foreground rounded-full px-8 py-4 text-xs font-bold tracking-[0.22em] uppercase"
          >
            View All Events
          </Link>
          <Link
            to="/"
            hash="top"
            className="border-border/70 hover:bg-surface-2 rounded-full border px-8 py-4 text-xs font-bold tracking-[0.22em] uppercase transition-colors"
          >
            Back Home
          </Link>
        </div>
      </div>
    );
  }

  const setCount = (id: string, next: number) =>
    setQty((q) => ({ ...q, [id]: Math.max(0, Math.min(MAX_PER_TIER, next)) }));

  const waEvent = whatsappLink(
    `Hi, I would like to get tickets for ${e.title}. Please share the ticket details.`,
  );
  const waVip = whatsappLink(
    `Hi, I am interested in booking a VIP experience/table for ${e.title}.`,
  );

  return (
    <div className="pb-28 lg:pb-0">
      {/* Compact hero */}
      <section className="relative overflow-hidden">
        <img
          src={e.image}
          alt={`${e.title} event poster`}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="from-background via-background/70 absolute inset-0 bg-gradient-to-t to-transparent" />
        <div className="relative mx-auto max-w-[1400px] px-5 pt-28 pb-12 sm:px-8 sm:pt-32 sm:pb-16">
          <Link
            to="/events/$slug"
            params={{ slug: e.slug }}
            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-[0.7rem] font-bold tracking-[0.22em] uppercase transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to event
          </Link>
          <h1 className="font-display mt-6 max-w-3xl text-4xl leading-[0.95] font-extrabold uppercase sm:text-6xl">
            {e.title}
          </h1>
          <p className="eyebrow mt-4">
            {e.category} • {e.city}, {e.province}, {e.country}
          </p>
          <p className="text-muted-foreground mt-2 text-sm">
            {formatDate(e.date)} • {e.venue}
          </p>
        </div>
      </section>

      {/* Event info */}
      <section className="border-border/60 border-y">
        <dl className="mx-auto grid max-w-[1400px] grid-cols-2 gap-6 px-5 py-8 sm:px-8 lg:grid-cols-5">
          <Info icon={<CalendarDays className="h-4 w-4" />} label="Date" value={formatDate(e.date)} />
          <Info icon={<Clock className="h-4 w-4" />} label="Time" value={e.time} />
          <Info
            icon={<MapPin className="h-4 w-4" />}
            label="Location"
            value={`${e.city}, ${e.province}, ${e.country}`}
          />
          <Info icon={<Ticket className="h-4 w-4" />} label="Venue" value={e.venue} />
          <Info icon={<ShieldCheck className="h-4 w-4" />} label="Age" value={e.ageRequirement} />
        </dl>
      </section>

      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[1fr_400px] lg:gap-16">
        <div>
          <h2 className="font-display text-2xl font-extrabold uppercase">Choose Your Ticket</h2>

          {e.ticketUrl ? (
            <div className="border-border/70 bg-surface mt-6 rounded-xl border p-6">
              <p className="text-muted-foreground text-sm">
                Tickets for this event are sold through our ticketing partner.
              </p>
              <a
                href={e.ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-heat text-primary-foreground mt-5 inline-block rounded-full px-8 py-4 text-xs font-bold tracking-[0.22em] uppercase"
              >
                Buy Tickets
              </a>
            </div>
          ) : null}

          <div className="mt-6 space-y-4">
            {tiers.map((t) => (
              <TierCard
                key={t.id}
                tier={t}
                count={qty[t.id] ?? 0}
                onChange={(n) => setCount(t.id, n)}
                onRequest={() => setVipOpen(true)}
                disabled={Boolean(e.ticketUrl)}
              />
            ))}
          </div>

          <a
            href={waEvent}
            target="_blank"
            rel="noopener noreferrer"
            className="border-border/70 hover:bg-surface-2 mt-6 inline-flex items-center gap-2 rounded-full border px-7 py-4 text-xs font-bold tracking-[0.22em] uppercase transition-colors"
          >
            <WhatsAppIcon className="h-4 w-4" /> WhatsApp for tickets
          </a>

          {vipOpen ? <VipRequestForm eventTitle={e.title} waVip={waVip} /> : null}
        </div>

        {/* Order summary */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="border-border/70 bg-surface rounded-xl border p-6">
            <h2 className="font-display text-lg font-extrabold uppercase">Your Order</h2>
            {lines.length === 0 ? (
              <p className="text-muted-foreground mt-4 text-sm">
                No tickets selected yet. Pick a tier to see your total.
              </p>
            ) : (
              <>
                <ul className="mt-5 space-y-3 text-sm">
                  {lines.map((l) => (
                    <li key={l.tier.id} className="flex justify-between gap-4">
                      <span className="text-muted-foreground">
                        {l.tier.name} × {l.count}
                      </span>
                      <span>{formatCad(l.tier.amount * l.count)}</span>
                    </li>
                  ))}
                </ul>
                <div className="border-border/60 mt-5 space-y-2 border-t pt-4 text-sm">
                  <Row label="Subtotal" value={formatCad(subtotal)} />
                  <Row label="Service fee" value={formatCad(fee)} />
                  <div className="flex justify-between pt-2 text-base font-bold">
                    <span>Total</span>
                    <span>{formatCad(total)}</span>
                  </div>
                </div>
              </>
            )}
            <button
              type="button"
              disabled={lines.length === 0}
              onClick={() => setStage("checkout")}
              className="bg-heat text-primary-foreground mt-6 w-full rounded-full px-6 py-4 text-xs font-bold tracking-[0.22em] uppercase disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continue to checkout
            </button>
          </div>

          {stage === "checkout" && lines.length > 0 ? (
            <CheckoutForm total={total} waEvent={waEvent} />
          ) : null}
        </aside>
      </div>

      {/* Mobile sticky bar */}
      <div className="bg-background/95 border-border/60 fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t px-4 py-3 backdrop-blur-xl lg:hidden">
        <div className="min-w-0 flex-1">
          <p className="eyebrow">Your total</p>
          <p className="font-display text-lg font-extrabold">{formatCad(total)}</p>
        </div>
        <a
          href={waEvent}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp for tickets"
          className="bg-whatsapp text-background flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
        >
          <WhatsAppIcon className="h-5 w-5" />
        </a>
        <button
          type="button"
          disabled={lines.length === 0}
          onClick={() => setStage("checkout")}
          className="bg-heat text-primary-foreground shrink-0 rounded-full px-6 py-3 text-xs font-bold tracking-[0.22em] uppercase disabled:opacity-40"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-muted-foreground flex justify-between">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function Info({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div>
      <dt className="eyebrow flex items-center gap-2">
        <span className="text-gold">{icon}</span>
        {label}
      </dt>
      <dd className="mt-2 text-sm font-semibold">{value}</dd>
    </div>
  );
}

function TierCard({
  tier,
  count,
  onChange,
  onRequest,
  disabled,
}: {
  tier: TicketTier;
  count: number;
  onChange: (n: number) => void;
  onRequest: () => void;
  disabled?: boolean;
}) {
  const closed = tier.status === "sold-out" || tier.status === "coming-soon" || disabled;

  return (
    <div className="border-border/70 bg-surface rounded-xl border p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="font-display text-lg font-bold uppercase">{tier.name}</h3>
        <p className="font-display text-xl font-extrabold">
          {tier.fromPrice ?? formatCad(tier.amount)}
        </p>
      </div>
      <p className="text-muted-foreground mt-1 text-sm">{tier.description}</p>
      <p className="text-gold mt-2 text-[0.65rem] font-semibold tracking-[0.18em] uppercase">
        {ticketStatusLabel[tier.status]}
      </p>
      <ul className="text-muted-foreground mt-3 space-y-1 text-sm">
        {tier.benefits.map((b) => (
          <li key={b} className="flex gap-2">
            <span className="text-gold">•</span> {b}
          </li>
        ))}
      </ul>

      <div className="mt-5">
        {tier.requestOnly ? (
          <button
            type="button"
            onClick={onRequest}
            className="border-border/70 hover:bg-surface-2 w-full rounded-full border px-6 py-3 text-xs font-bold tracking-[0.22em] uppercase transition-colors sm:w-auto"
          >
            Request VIP table
          </button>
        ) : closed ? (
          <span className="text-muted-foreground border-border/70 inline-block rounded-full border px-6 py-3 text-xs font-bold tracking-[0.22em] uppercase">
            {tier.status === "coming-soon" ? "Coming soon" : "Sold out"}
          </span>
        ) : (
          <div className="flex items-center gap-4">
            <div className="border-border/70 flex items-center gap-4 rounded-full border px-3 py-2">
              <button
                type="button"
                aria-label={`Decrease ${tier.name} quantity`}
                onClick={() => onChange(count - 1)}
                className="hover:text-gold transition-colors"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-5 text-center text-sm font-bold">{count}</span>
              <button
                type="button"
                aria-label={`Increase ${tier.name} quantity`}
                onClick={() => onChange(count + 1)}
                className="hover:text-gold transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              type="button"
              onClick={() => onChange(Math.max(1, count))}
              className="bg-heat text-primary-foreground rounded-full px-6 py-3 text-xs font-bold tracking-[0.22em] uppercase"
            >
              Select
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const inputClass =
  "border-border/70 bg-background focus:border-gold w-full rounded-lg border px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/50";

type CheckoutStage = "form" | "review" | "pending";

function CheckoutForm({ total, waEvent }: { total: number; waEvent: string }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [stage, setStage] = useState<CheckoutStage>("form");
  const [formData, setFormData] = useState<Record<string, string>>({});

  const validate = (f: FormData) => {
    const next: Record<string, string> = {};
    if (!String(f.get("firstName") ?? "").trim()) next["firstName"] = "First name is required.";
    if (!String(f.get("lastName") ?? "").trim()) next["lastName"] = "Last name is required.";
    const email = String(f.get("email") ?? "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) next["email"] = "Enter a valid email address.";
    const phone = String(f.get("phone") ?? "").replace(/[^\d]/g, "");
    if (phone.length < 10) next["phone"] = "Enter a valid 10-digit phone number.";
    return next;
  };

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const f = new FormData(ev.currentTarget);
    const next = validate(f);
    setErrors(next);
    if (Object.keys(next).length === 0) {
      setFormData({
        firstName: String(f.get("firstName") ?? ""),
        lastName: String(f.get("lastName") ?? ""),
        email: String(f.get("email") ?? ""),
        phone: String(f.get("phone") ?? ""),
        instagram: String(f.get("instagram") ?? ""),
      });
      setStage("review");
    }
  };

  // "Review" confirmation step — no payment is taken; shows pending state
  if (stage === "review" || stage === "pending") {
    return (
      <div className="border-border/70 bg-surface mt-6 space-y-5 rounded-xl border p-6">
        <div className="flex items-center gap-3">
          <div className="bg-gold/20 flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
            <ShieldCheck className="text-gold h-5 w-5" />
          </div>
          <div>
            <h2 className="font-display text-lg font-extrabold uppercase">Order Summary</h2>
            <p className="text-muted-foreground text-xs">Review your details before confirming</p>
          </div>
        </div>

        {/* Customer details recap */}
        <div className="border-border/60 space-y-2 rounded-lg border p-4 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Name</span>
            <span className="font-semibold">{formData.firstName} {formData.lastName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Email</span>
            <span className="font-semibold">{formData.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Phone</span>
            <span className="font-semibold">{formData.phone}</span>
          </div>
          <div className="border-border/60 flex justify-between border-t pt-2">
            <span className="font-bold">Total</span>
            <span className="font-bold">{formatCad(total)}</span>
          </div>
        </div>

        {/* Payment pending notice */}
        <div className="border-border/60 bg-surface-2 rounded-lg border p-4 text-sm">
          <p className="font-semibold">Online payment coming soon</p>
          <p className="text-muted-foreground mt-1 leading-relaxed">
            Card checkout will be live once a payment provider is connected. To secure your
            tickets now, message us on WhatsApp — we'll confirm and hold your spot.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <a
            href={waEvent}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-whatsapp text-background inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-xs font-bold tracking-[0.22em] uppercase"
          >
            <WhatsAppIcon className="h-4 w-4" /> Confirm on WhatsApp
          </a>
          <button
            type="button"
            onClick={() => setStage("form")}
            className="border-border/70 hover:bg-surface-2 w-full rounded-full border px-6 py-3 text-xs font-bold tracking-[0.22em] uppercase transition-colors"
          >
            Edit details
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="border-border/70 bg-surface mt-6 space-y-4 rounded-xl border p-6"
    >
      <h2 className="font-display text-lg font-extrabold uppercase">Checkout Details</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="First name" name="firstName" error={errors["firstName"]} required />
        <Field label="Last name" name="lastName" error={errors["lastName"]} required />
      </div>
      <Field label="Email" name="email" type="email" error={errors["email"]} required />
      <Field label="Phone number" name="phone" type="tel" error={errors["phone"]} required />
      <Field label="Instagram handle (optional)" name="instagram" />
      <p className="text-muted-foreground text-xs leading-relaxed">
        Your details are used only to confirm your booking. No payment is processed here.
      </p>
      <button
        type="submit"
        className="bg-heat text-primary-foreground w-full rounded-full px-6 py-4 text-xs font-bold tracking-[0.22em] uppercase"
      >
        Review Order — {formatCad(total)}
      </button>
    </form>
  );
}

function VipRequestForm({ eventTitle, waVip }: { eventTitle: string; waVip: string }) {
  const [message, setMessage] = useState("");

  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        trackEvent("vip_inquiry", { source: "ticket_page", event: eventTitle, configured: false });
        setMessage(
          "VIP form delivery is not configured yet. Use WhatsApp to send this request now, or connect a form/CRM service before production launch.",
        );
      }}
      className="border-border/70 bg-surface mt-8 space-y-4 rounded-xl border p-6"
    >
      <h2 className="font-display text-lg font-extrabold uppercase">VIP Table Request</h2>
      <p className="text-muted-foreground text-sm">
        Tell us about your group for {eventTitle} and our host will come back with table options.
      </p>
      <Field label="Name" name="vipName" required />
      <Field label="Phone" name="vipPhone" type="tel" required />
      <Field label="Email" name="vipEmail" type="email" required />
      <Field label="Number of guests" name="vipGuests" type="number" required />
      <Field label="Preferred table" name="vipTable" />
      <div>
        <label className="eyebrow mb-2 block" htmlFor="vipMessage">
          Message
        </label>
        <textarea id="vipMessage" name="vipMessage" rows={3} className={inputClass} />
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          className="bg-heat text-primary-foreground rounded-full px-7 py-4 text-xs font-bold tracking-[0.22em] uppercase"
        >
          Send VIP request
        </button>
        <a
          href={waVip}
          target="_blank"
          rel="noopener noreferrer"
          className="border-border/70 hover:bg-surface-2 inline-flex items-center justify-center gap-2 rounded-full border px-7 py-4 text-xs font-bold tracking-[0.22em] uppercase transition-colors"
        >
          <WhatsAppIcon className="h-4 w-4" /> WhatsApp VIP booking
        </a>
      </div>
      {message ? (
        <p className="text-gold text-sm">
          {message}
        </p>
      ) : null}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="eyebrow mb-2 block" htmlFor={name}>
        {label}
      </label>
      <input id={name} name={name} type={type} required={required} className={inputClass} />
      {error ? <p className="text-heat mt-1 text-xs">{error}</p> : null}
    </div>
  );
}
