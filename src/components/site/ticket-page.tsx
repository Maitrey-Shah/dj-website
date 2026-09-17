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
            to="/tickets"
            className="bg-heat text-primary-foreground rounded-full px-8 py-4 text-xs font-bold tracking-[0.22em] uppercase"
          >
            View All Events
          </Link>
          <Link
            to="/"
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
    <div>
      {/* ── Compact hero ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <img
          src={e.heroImage ?? e.image}
          alt={`${e.title} event poster`}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: e.heroPosition ?? "center 20%" }}
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

      {/* ── Event info strip ─────────────────────────────────────────────── */}
      <section className="border-border/60 border-y">
        <dl className="mx-auto grid max-w-[1400px] grid-cols-1 gap-6 px-5 py-8 min-[420px]:grid-cols-2 sm:px-8 lg:grid-cols-5">
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

      {/* ── Main content: full width ─────────────────────────────────────── */}
      <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8">

        {/* ── Full-width content ─────────────────────────────────────────── */}
        <div className="space-y-12">

          {/* Ticket selection */}
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

          {/* Attendee details + booking — always visible */}
          <BookingForm
            total={total}
            lines={lines}
            subtotal={subtotal}
            fee={fee}
            waEvent={waEvent}
            ageRequirement={e.ageRequirement}
            hasTickets={lines.length > 0}
          />
        </div>

      </div>
    </div>
  );
}

/* ── Booking form (attendee details + submission) ──────────────────────────── */

const inputClass =
  "border-border/70 bg-background focus:border-gold w-full rounded-lg border px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/50";

function BookingForm({
  total,
  lines,
  subtotal,
  fee,
  waEvent,
  ageRequirement,
  hasTickets,
}: {
  total: number;
  lines: { tier: TicketTier; count: number }[];
  subtotal: number;
  fee: number;
  waEvent: string;
  ageRequirement: string;
  hasTickets: boolean;
}) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});

  const hasAgeRestriction = !ageRequirement.toLowerCase().startsWith("all ages");

  const validate = (f: FormData) => {
    const next: Record<string, string> = {};

    if (!hasTickets) {
      next["tickets"] = "Please select at least one ticket before booking.";
    }
    if (!String(f.get("firstName") ?? "").trim())
      next["firstName"] = "First name is required.";
    if (!String(f.get("lastName") ?? "").trim())
      next["lastName"] = "Last name is required.";

    const email = String(f.get("email") ?? "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
      next["email"] = "Enter a valid email address.";

    const digitsOnly = String(f.get("phone") ?? "").replace(/[^\d]/g, "");
    const localDigits = digitsOnly.startsWith("1") ? digitsOnly.slice(1) : digitsOnly;
    if (localDigits.length < 10)
      next["phone"] = "Enter a valid Canadian phone number.";

    if (hasAgeRestriction && f.get("ageConfirm") !== "on")
      next["ageConfirm"] = "You must confirm you meet the age requirement for this event.";

    if (f.get("terms") !== "on")
      next["terms"] = "You must agree to the Terms & Conditions and Privacy Policy.";

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
      });
      setSubmitted(true);
    }
  };

  /* ── Confirmation step ───────────────────────────────────────────────── */
  if (submitted) {
    return (
      <div className="border-border/70 bg-surface space-y-5 rounded-xl border p-6">
        <div className="flex items-center gap-3">
          <div className="bg-gold/20 flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
            <ShieldCheck className="text-gold h-5 w-5" />
          </div>
          <div>
            <h2 className="font-display text-lg font-extrabold uppercase">Booking Summary</h2>
            <p className="text-muted-foreground text-xs">Review your details before confirming</p>
          </div>
        </div>

        {/* Selected tickets */}
        {lines.length > 0 && (
          <div className="border-border/60 rounded-lg border p-4 text-sm">
            <p className="eyebrow mb-3">Selected tickets</p>
            <ul className="space-y-2">
              {lines.map((l) => (
                <li key={l.tier.id} className="flex justify-between gap-4">
                  <span className="text-muted-foreground">{l.tier.name} × {l.count}</span>
                  <span>{formatCad(l.tier.amount * l.count)}</span>
                </li>
              ))}
            </ul>
            <div className="border-border/60 mt-3 space-y-1.5 border-t pt-3">
              <OrderRow label="Subtotal" value={formatCad(subtotal)} />
              <OrderRow
                label={`Service fee (${Math.round(serviceFeeRate * 100)}%)`}
                value={formatCad(fee)}
              />
              <div className="flex justify-between pt-1 font-bold">
                <span>Total</span>
                <span>{formatCad(total)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Attendee recap */}
        <div className="border-border/60 space-y-2 rounded-lg border p-4 text-sm">
          <p className="eyebrow mb-3">Attendee details</p>
          <SummaryRow label="Name" value={`${formData.firstName} ${formData.lastName}`} />
          <SummaryRow label="Email" value={formData.email} />
          <SummaryRow label="Phone" value={formData.phone} />
        </div>

        {/* Payment notice */}
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
            onClick={() => setSubmitted(false)}
            className="border-border/70 hover:bg-surface-2 w-full rounded-full border px-6 py-3 text-xs font-bold tracking-[0.22em] uppercase transition-colors"
          >
            Edit details
          </button>
        </div>
      </div>
    );
  }

  /* ── Attendee details form ───────────────────────────────────────────── */
  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="border-border/70 bg-surface space-y-5 rounded-xl border p-6"
    >
      <h2 className="font-display text-lg font-extrabold uppercase">Attendee Details</h2>

      {/* Ticket selection warning */}
      {errors["tickets"] && (
        <p className="text-heat text-sm font-semibold" role="alert">{errors["tickets"]}</p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="First name *" name="firstName" error={errors["firstName"]} required />
        <Field label="Last name *" name="lastName" error={errors["lastName"]} required />
      </div>
      <Field label="Email address *" name="email" type="email" error={errors["email"]} required />
      <div>
        <Field
          label="Phone number *"
          name="phone"
          type="tel"
          error={errors["phone"]}
          required
          placeholder="e.g. (416) 555-1234"
        />
        <p className="text-muted-foreground mt-1.5 text-xs">
          Supports: +1 416 555 1234 · (416) 555-1234 · 416-555-1234
        </p>
      </div>

      {/* Age restriction — only shown when event requires it */}
      {hasAgeRestriction && (
        <div>
          <label className="border-border/60 flex cursor-pointer items-start gap-3 rounded-lg border p-4">
            <input
              type="checkbox"
              name="ageConfirm"
              id="ageConfirm"
              className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--heat)]"
            />
            <span className="text-sm leading-relaxed">
              <span className="text-heat font-semibold">{ageRequirement} event. </span>
              I confirm I meet the age requirement and will carry valid government-issued photo ID.
            </span>
          </label>
          {errors["ageConfirm"] && (
            <p className="text-heat mt-1.5 text-xs" role="alert">{errors["ageConfirm"]}</p>
          )}
        </div>
      )}

      {/* Terms & Conditions — required */}
      <div>
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            name="terms"
            id="terms"
            className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--heat)]"
          />
          <span className="text-muted-foreground text-sm leading-relaxed">
            I agree to the{" "}
            <a
              href="/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline underline-offset-2"
            >
              Terms &amp; Conditions
            </a>{" "}
            and{" "}
            <a
              href="/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline underline-offset-2"
            >
              Privacy Policy
            </a>
            . *
          </span>
        </label>
        {errors["terms"] && (
          <p className="text-heat mt-1.5 text-xs" role="alert">{errors["terms"]}</p>
        )}
      </div>

      {/* Marketing consent — optional */}
      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          name="marketing"
          id="marketing"
          className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--heat)]"
        />
        <span className="text-muted-foreground text-sm leading-relaxed">
          I'd like to receive updates about upcoming AWAARA events. (Optional)
        </span>
      </label>

      <p className="text-muted-foreground text-xs leading-relaxed">
        Your details are used only to confirm your booking. No payment is processed on this page.
      </p>

      <button
        type="submit"
        className="bg-heat text-primary-foreground w-full rounded-full px-6 py-4 text-xs font-bold tracking-[0.22em] uppercase transition-transform duration-300 hover:scale-[1.02]"
      >
        {hasTickets ? `Proceed to Booking — ${formatCad(total)}` : "Proceed to Booking"}
      </button>
    </form>
  );
}

/* ── Small helpers ─────────────────────────────────────────────────────────── */

function OrderRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-muted-foreground flex justify-between text-sm">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-wrap justify-between gap-x-4 gap-y-1">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold">{value}</span>
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

/* ── Ticket tier card ──────────────────────────────────────────────────────── */

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
                disabled={count === 0}
                className="hover:text-gold transition-colors disabled:opacity-40"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-5 text-center text-sm font-bold tabular-nums">{count}</span>
              <button
                type="button"
                aria-label={`Increase ${tier.name} quantity`}
                onClick={() => onChange(count + 1)}
                disabled={count >= MAX_PER_TIER}
                className="hover:text-gold transition-colors disabled:opacity-40"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            {count === 0 && (
              <button
                type="button"
                onClick={() => onChange(1)}
                className="bg-heat text-primary-foreground rounded-full px-6 py-3 text-xs font-bold tracking-[0.22em] uppercase"
              >
                Select
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── VIP request form ──────────────────────────────────────────────────────── */

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
      <Field label="Name *" name="vipName" required />
      <Field label="Phone *" name="vipPhone" type="tel" required />
      <Field label="Email *" name="vipEmail" type="email" required />
      <Field label="Number of guests *" name="vipGuests" type="number" required />
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
      {message && <p className="text-gold text-sm">{message}</p>}
    </form>
  );
}

/* ── Field ─────────────────────────────────────────────────────────────────── */

function Field({
  label,
  name,
  type = "text",
  error,
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="eyebrow mb-2 block" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        aria-describedby={error ? `${name}-error` : undefined}
        className={inputClass}
      />
      {error && (
        <p id={`${name}-error`} className="text-heat mt-1.5 text-xs" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
