import { useEffect, useRef, useState } from "react";
import { ChevronDown, Instagram, Star } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  brand,
  faqs,
  inquiryTypes,
  testimonials,
  vipImage,
  whatsappLink,
  whatsappMessages,
} from "@/data/site";
import { WhatsAppIcon } from "@/components/site/whatsapp";
import { Reveal, SectionHeading } from "@/components/site/reveal";
import { trackEvent } from "@/lib/analytics";

/* ---------------- VIP ---------------- */

export function VipSection() {
  return (
    <section className="grain relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={vipImage}
          alt="VIP table with champagne bottles and sparklers in a dark club"
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="from-background via-background/80 absolute inset-0 bg-gradient-to-r to-transparent" />
      </div>
      <div className="relative mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-36">
        <SectionHeading
          eyebrow="Tables â€¢ Bottle service â€¢ Suites"
          title={
            <>
              Make it
              <br />
              <span className="text-heat">VIP.</span>
            </>
          }
        />
        <Reveal delay={120}>
          <ul className="text-muted-foreground mt-8 grid max-w-lg gap-2 text-sm tracking-[0.08em] uppercase">
            {[
              "VIP tables",
              "Premium seating",
              "Bottle service",
              "Birthday packages",
              "Group bookings",
              "Private celebrations",
              "Corporate events",
            ].map((f) => (
              <li key={f} className="border-border/40 flex items-center gap-3 border-b py-2.5">
                <span className="text-gold">â˜…</span> {f}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappLink(whatsappMessages.vip)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("vip_inquiry", { source: "vip_section" })}
              className="bg-heat text-primary-foreground rounded-full px-8 py-4 text-center text-xs font-bold tracking-[0.22em] uppercase transition-transform duration-300 hover:scale-[1.03]"
            >
              Book VIP
            </a>
            <a
              href={whatsappLink(whatsappMessages.vip)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("click_whatsapp", { source: "vip_section" })}
              className="border-border/70 hover:bg-surface-2 inline-flex items-center justify-center gap-2 rounded-full border px-8 py-4 text-xs font-bold tracking-[0.22em] uppercase transition-colors"
            >
              <WhatsAppIcon className="h-4 w-4" /> WhatsApp Us
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Private / corporate ---------------- */

export function PrivateEventsSection() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <SectionHeading
          eyebrow="Private & corporate"
          title={
            <>
              Your event.
              <br />
              <span className="text-heat">Our energy.</span>
            </>
          }
          subtitle="From boardroom to ballroom â€” we produce the whole thing: artists, venue, production and hospitality."
        />
        <Reveal delay={120}>
          <ul className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm sm:text-base">
            {[
              "Corporate parties",
              "University events",
              "Private parties",
              "Brand activations",
              "College nights",
              "Cultural events",
              "Artist bookings",
              "Large-scale celebrations",
            ].map((f) => (
              <li key={f} className="border-border/40 border-b py-3">
                {f}
              </li>
            ))}
          </ul>
          <a
            href={whatsappLink(whatsappMessages.private)}
            target="_blank"
            rel="noopener noreferrer"
            className="border-border/70 hover:bg-surface-2 mt-10 inline-block rounded-full border px-8 py-4 text-xs font-bold tracking-[0.22em] uppercase transition-colors"
          >
            Plan an Event
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Testimonials ---------------- */

export function TestimonialsSection() {
  const [i, setI] = useState(1);
  const [transition, setTransition] = useState(true);
  const [paused, setPaused] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const timerRef = useRef<number | null>(null);
  const touchRef = useRef({ x: 0, y: 0 });
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const slides = [testimonials[testimonials.length - 1]!, ...testimonials, testimonials[0]!];
  const active = (i - 1 + testimonials.length) % testimonials.length;

  const goTo = (nextIndex: number) => {
    setTransition(!reducedMotion);
    setI(nextIndex);
    setTimerKey((v) => v + 1);
  };

  const next = () => goTo(i + 1);
  const prev = () => goTo(i - 1);

  useEffect(() => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    if (!paused && !reducedMotion) {
      timerRef.current = window.setInterval(() => setI((v) => v + 1), 3500);
    }
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [paused, reducedMotion, timerKey]);

  return (
    <section className="bg-surface/40 border-border/60 border-y py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <SectionHeading eyebrow="Word of mouth" title="What the night said" align="center" />
        <Reveal delay={100} className="mt-10">
          <div
            className="overflow-hidden"
            aria-label="Testimonials carousel"
            aria-live="polite"
            tabIndex={0}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") next();
              if (e.key === "ArrowLeft") prev();
            }}
            onTouchStart={(e) => {
              touchRef.current = { x: e.touches[0]?.clientX ?? 0, y: e.touches[0]?.clientY ?? 0 };
            }}
            onTouchEnd={(e) => {
              const dx = (e.changedTouches[0]?.clientX ?? 0) - touchRef.current.x;
              const dy = (e.changedTouches[0]?.clientY ?? 0) - touchRef.current.y;
              if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
                dx < 0 ? next() : prev();
              }
            }}
          >
          <div
            className="flex"
            style={{
              transform: `translateX(-${i * 100}%)`,
              transition: transition && !reducedMotion ? "transform 600ms ease-in-out" : "none",
            }}
            onTransitionEnd={() => {
              if (i === testimonials.length + 1) {
                setTransition(false);
                setI(1);
                requestAnimationFrame(() => setTransition(true));
              }
              if (i === 0) {
                setTransition(false);
                setI(testimonials.length);
                requestAnimationFrame(() => setTransition(true));
              }
            }}
          >
            {slides.map((t, slide) => (
              <div
                key={`${t.name}-${slide}`}
                className="min-w-full shrink-0"
                aria-hidden={slide !== i}
              >
                <p className="text-gold flex justify-center gap-1">
                  {Array.from({ length: 5 }, (_, s) => (
                    <Star key={s} className="h-4 w-4 fill-current" />
                  ))}
                </p>
                <blockquote className="mt-6 text-xl leading-relaxed font-medium sm:text-2xl">
                  "{t.quote}"
                </blockquote>
                <p className="eyebrow mt-6">
                  {t.name} • {t.city} • {t.event}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, d) => (
              <button
                key={d}
                type="button"
                aria-label={`Show testimonial ${d + 1}`}
                onClick={() => goTo(d + 1)}
                className={
                  d === active
                    ? "bg-heat h-2 w-8 rounded-full transition-all"
                    : "bg-surface-2 h-2 w-2 rounded-full transition-all"
                }
              />
            ))}
          </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
/* ---------------- Newsletter ---------------- */

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28">
      <Reveal className="border-border/70 from-surface-2 mx-auto max-w-3xl rounded-xl border bg-gradient-to-b to-transparent p-8 text-center sm:p-14">
        <h2 className="text-3xl font-extrabold uppercase sm:text-5xl">Be first in line.</h2>
        <p className="text-muted-foreground mx-auto mt-4 max-w-md">
          Get early access to tickets, artist announcements and upcoming events.
        </p>
        {message ? (
          <p className="text-gold mt-8 text-sm font-semibold tracking-[0.18em] uppercase">
            {message}
          </p>
        ) : (
          <form
            className="mt-8 flex flex-col gap-3 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
              setMessage(
                valid
                  ? "Newsletter signup needs a configured email service before launch."
                  : "Enter a valid email address.",
              );
            }}
          >
            <label className="sr-only" htmlFor="newsletterEmail">
              Email address
            </label>
            <input
              id="newsletterEmail"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="EMAIL ADDRESS"
              aria-label="Email address"
              className="border-input bg-background/60 placeholder:text-muted-foreground/60 flex-1 rounded-full border px-6 py-4 text-sm outline-none focus:ring-1 focus:ring-current"
            />
            <button
              type="submit"
              className="bg-heat text-primary-foreground rounded-full px-8 py-4 text-xs font-bold tracking-[0.22em] uppercase transition-transform duration-300 hover:scale-[1.03]"
            >
              Join the List
            </button>
          </form>
        )}
      </Reveal>
    </section>
  );
}

/* ---------------- FAQ ---------------- */

export function FaqSection() {
  return (
    <section id="faq" className="mx-auto max-w-[1400px] scroll-mt-24 px-5 pb-20 sm:px-8 sm:pb-28">
      <SectionHeading eyebrow="Good to know" title="Questions, answered" />
      <Reveal delay={100} className="mt-10 max-w-3xl">
        <Accordion type="single" collapsible className="gap-0">
          {faqs.map((f, idx) => (
            <AccordionItem key={idx} value={`faq-${idx}`} className="border-border/60">
              <AccordionTrigger className="py-5 text-left text-base font-semibold hover:no-underline sm:text-lg">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  );
}

/* ---------------- Contact ---------------- */

const inputCls =
  "border-input bg-background/60 placeholder:text-muted-foreground/60 w-full rounded-lg border px-4 py-3.5 text-sm outline-none focus:ring-1 focus:ring-current";

export function ContactSection() {
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  return (
    <section
      id="contact"
      className="bg-surface/40 border-border/60 scroll-mt-24 border-t py-20 sm:py-28"
    >
      <div className="mx-auto grid max-w-[1400px] gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-24">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title={
              <>
                Let's make
                <br />
                it happen.
              </>
            }
            subtitle="General inquiries, bookings, VIP, artists or partnerships â€” reach the right desk."
          />
          <Reveal delay={120} className="mt-10 space-y-6">
            <div>
              <p className="eyebrow mb-1">Email</p>
              <a href={`mailto:${brand.email}`} className="text-lg font-semibold">
                {brand.email}
              </a>
            </div>
            <div>
              <p className="eyebrow mb-1">Phone</p>
              <a href={`tel:${brand.phone.replace(/[^+\d]/g, "")}`} className="text-lg font-semibold">
                {brand.phone}
              </a>
            </div>
            <div>
              <p className="eyebrow mb-3">Social</p>
              <div className="flex gap-3">
                {[
                  { href: brand.instagram, icon: Instagram, label: "Instagram" },
                  { href: brand.facebook, icon: null, label: "Facebook" },
                  { href: brand.youtube, icon: null, label: "YouTube" },
                  { href: brand.tiktok, icon: null, label: "TikTok" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="border-border/70 hover:bg-surface-2 flex h-11 w-11 items-center justify-center rounded-full border text-xs font-bold transition-colors"
                  >
                    {s.icon ? <s.icon className="h-4 w-4" /> : s.label[0]}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={160}>
          {status ? (
            <div className="border-border/70 flex h-full min-h-[420px] flex-col items-center justify-center rounded-xl border p-10 text-center">
              <p className="text-heat font-display text-4xl font-extrabold uppercase">
                Inquiry not sent yet.
              </p>
              <p className="text-muted-foreground mt-4">
                {status}
              </p>
              <button
                type="button"
                onClick={() => setStatus("")}
                className="border-border/70 hover:bg-surface-2 mt-6 rounded-full border px-7 py-3 text-xs font-bold tracking-[0.22em] uppercase"
              >
                Edit Inquiry
              </button>
            </div>
          ) : (
            <form
              className="grid gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                if (submitting) return;
                const form = new FormData(e.currentTarget);
                const email = String(form.get("email") ?? "").trim();
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
                  setStatus("Please enter a valid email address.");
                  return;
                }
                setSubmitting(true);
                trackEvent("submit_contact_form", { configured: false });
                setStatus(
                  "A contact form backend is not configured yet. Connect an email, CRM, or form service before production launch.",
                );
                setSubmitting(false);
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="sr-only" htmlFor="contactName">Name</label>
                <input id="contactName" name="name" required placeholder="Name" className={inputCls} />
                <label className="sr-only" htmlFor="contactEmail">Email</label>
                <input
                  id="contactEmail"
                  name="email"
                  required
                  type="email"
                  placeholder="Email"
                  className={inputCls}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="sr-only" htmlFor="contactPhone">Phone</label>
                <input id="contactPhone" name="phone" placeholder="Phone" className={inputCls} />
                <label className="sr-only" htmlFor="contactCity">City</label>
                <input id="contactCity" name="city" placeholder="City" className={inputCls} />
              </div>
              <label className="sr-only" htmlFor="contactInquiry">Inquiry type</label>
              <select id="contactInquiry" name="inquiryType" required defaultValue="" className={inputCls}>
                <option value="" disabled>
                  Inquiry Type
                </option>
                {inquiryTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <label className="sr-only" htmlFor="contactMessage">Message</label>
              <textarea
                id="contactMessage"
                name="message"
                required
                placeholder="Message"
                rows={5}
                className={inputCls}
              />
              <button
                type="submit"
                className="bg-heat text-primary-foreground mt-2 rounded-full px-8 py-4 text-xs font-bold tracking-[0.22em] uppercase transition-transform duration-300 hover:scale-[1.02]"
                disabled={submitting}
                aria-disabled={submitting}
              >
                {submitting ? "Sending..." : "Send Inquiry"}
              </button>
            </form>
          )}
        </Reveal>
      </div>
      <div className="mx-auto mt-16 max-w-[1400px] px-5 sm:px-8">
        <ChevronDown className="text-muted-foreground/40 mx-auto h-5 w-5" aria-hidden="true" />
      </div>
    </section>
  );
}
