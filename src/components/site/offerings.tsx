import { useState } from "react";
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
          eyebrow="Tables • Bottle service • Suites"
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
                <span className="text-gold">★</span> {f}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappLink(whatsappMessages.vip)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-heat text-primary-foreground rounded-full px-8 py-4 text-center text-xs font-bold tracking-[0.22em] uppercase transition-transform duration-300 hover:scale-[1.03]"
            >
              Book VIP
            </a>
            <a
              href={whatsappLink(whatsappMessages.vip)}
              target="_blank"
              rel="noopener noreferrer"
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
          subtitle="From boardroom to ballroom — we produce the whole thing: artists, venue, production and hospitality."
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
  const [i, setI] = useState(0);
  const t = testimonials[i]!;


  return (
    <section className="bg-surface/40 border-border/60 border-y py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <SectionHeading eyebrow="Word of mouth" title="What the night said" align="center" />
        <Reveal delay={100} className="mt-10">
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
          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, d) => (
              <button
                key={d}
                type="button"
                aria-label={`Testimonial ${d + 1}`}
                onClick={() => setI(d)}
                className={
                  d === i
                    ? "bg-heat h-2 w-8 rounded-full transition-all"
                    : "bg-surface-2 h-2 w-2 rounded-full transition-all"
                }
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Newsletter ---------------- */

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28">
      <Reveal className="border-border/70 from-surface-2 mx-auto max-w-3xl rounded-xl border bg-gradient-to-b to-transparent p-8 text-center sm:p-14">
        <h2 className="text-3xl font-extrabold uppercase sm:text-5xl">Be first in line.</h2>
        <p className="text-muted-foreground mx-auto mt-4 max-w-md">
          Get early access to tickets, artist announcements and upcoming events.
        </p>
        {done ? (
          <p className="text-gold mt-8 text-sm font-semibold tracking-[0.18em] uppercase">
            You're on the list. See you in the front row.
          </p>
        ) : (
          <form
            className="mt-8 flex flex-col gap-3 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              if (email.trim()) setDone(true);
            }}
          >
            <input
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
    <section className="mx-auto max-w-[1400px] px-5 pb-20 sm:px-8 sm:pb-28">
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
  const [sent, setSent] = useState(false);

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
            subtitle="General inquiries, bookings, VIP, artists or partnerships — reach the right desk."
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
          {sent ? (
            <div className="border-border/70 flex h-full min-h-[420px] flex-col items-center justify-center rounded-xl border p-10 text-center">
              <p className="text-heat font-display text-4xl font-extrabold uppercase">
                Message sent.
              </p>
              <p className="text-muted-foreground mt-4">
                Our team will get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form
              className="grid gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <input required placeholder="Name" aria-label="Name" className={inputCls} />
                <input
                  required
                  type="email"
                  placeholder="Email"
                  aria-label="Email"
                  className={inputCls}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <input placeholder="Phone" aria-label="Phone" className={inputCls} />
                <input placeholder="City" aria-label="City" className={inputCls} />
              </div>
              <select required defaultValue="" aria-label="Inquiry type" className={inputCls}>
                <option value="" disabled>
                  Inquiry Type
                </option>
                {inquiryTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <textarea
                required
                placeholder="Message"
                aria-label="Message"
                rows={5}
                className={inputCls}
              />
              <button
                type="submit"
                className="bg-heat text-primary-foreground mt-2 rounded-full px-8 py-4 text-xs font-bold tracking-[0.22em] uppercase transition-transform duration-300 hover:scale-[1.02]"
              >
                Send Inquiry
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
