import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { cities, experiences, gallery, stats, brand } from "@/data/site";
import { Reveal, SectionHeading, useInView } from "@/components/site/reveal";
import { whatsappLink, whatsappMessages } from "@/data/site";

/* ---------------- Experience cards ---------------- */

export function ExperienceSection() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28">
      <SectionHeading
        eyebrow="What we do"
        title={
          <>
            More than an event.
            <br />
            <span className="text-heat">It's an experience.</span>
          </>
        }
      />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {experiences.map((x, i) => (
          <Reveal key={x.title} delay={i * 80} as="article">
            <div className="group border-border/70 relative aspect-[3/4] overflow-hidden rounded-xl border">
              <img
                src={x.image}
                alt={x.title}
                loading="lazy"
                width={1024}
                height={1280}
                className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-105"
              />
              <div className="fade-bottom absolute inset-0" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="text-xl font-extrabold uppercase">{x.title}</h3>
                <p className="text-muted-foreground mt-2 max-h-0 overflow-hidden text-sm transition-all duration-500 group-hover:max-h-28">
                  {x.copy}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Brand story + animated counters ---------------- */

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [n, setN] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const dur = 1600;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <div ref={ref} className="text-center sm:text-left">
      <p className="font-display text-heat text-5xl font-extrabold tabular-nums sm:text-6xl">
        {n}
        {suffix}
      </p>
moké    </div>
  );
}

export function BrandStory() {
  return (
    <section
      id="about"
      className="bg-surface/40 border-border/60 scroll-mt-24 border-y py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionHeading
            eyebrow="Our story"
            title={
              <>
                We don't just host events.
                <br />
                <span className="text-heat">We create moments.</span>
              </>
            }
          />
          <Reveal delay={120}>
            <div className="text-muted-foreground space-y-5 text-base leading-relaxed sm:text-lg">
              <p>
                {brand.name} exists for one reason: to give the South Asian
                community in Canada nights worth talking about for years. We
                tour international artists, hand-pick the best venues in every
                city, and run production like a festival — not a party.
              </p>
              <p>
                From warehouse DJ nights in Toronto to live Punjabi concerts in
                Vancouver, every event is built around authentic culture and a
                modern nightlife standard. Sold-out rooms, real artists, zero
                compromise.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-4">
              {stats.map((s) => (
                <Counter key={s.label} value={s.value} suffix={s.suffix} />
              ))}
            </div>
            <div className="mt-8 grid grid-cols-2 gap-8 sm:hidden" aria-hidden="true">
              <span className="sr-only">Stats displayed above</span>
            </div>
            <div className="mt-8 hidden gap-8 sm:grid sm:grid-cols-4">
              {stats.map((s) => (
                <p key={s.label} className="text-muted-foreground text-[0.65rem] tracking-[0.22em] uppercase">
                  {s.label}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Cities ---------------- */

export function CitiesSection() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28">
      <SectionHeading eyebrow="Where we are" title="We bring the night to you" />
      <Reveal className="mt-12">
        <ul className="border-border/60 border-t">
          {cities.map((c) => (
            <li
              key={c.name}
              className="border-border/60 group flex items-center justify-between border-b py-5 transition-colors hover:bg-surface/60 sm:py-7"
            >
              <span className="font-display text-3xl font-extrabold uppercase transition-transform duration-500 group-hover:translate-x-2 sm:text-6xl">
                {c.name}
              </span>
              <span className="text-muted-foreground flex items-center gap-4 text-xs tracking-[0.2em] uppercase">
                {c.events} Events
                <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

/* ---------------- Gallery ---------------- */

export function GallerySection() {
  return (
    <section
      id="gallery"
      className="bg-surface/40 border-border/60 scroll-mt-24 border-y py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <SectionHeading
          eyebrow="Past events"
          title={
            <>
              The nights we'll
              <br />
              never forget.
            </>
          }
        />
        <div className="mt-12 columns-2 gap-4 [column-fill:balance] sm:columns-3">
          {gallery.map((g, i) => (
            <Reveal key={i} className="mb-4 break-inside-avoid">
              <div className="group overflow-hidden rounded-lg">
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  className="w-full object-cover transition-transform duration-[900ms] group-hover:scale-105"
                />
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 text-center">
          <a
            href={brand.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="border-border/70 hover:bg-surface-2 inline-block rounded-full border px-8 py-4 text-xs font-bold tracking-[0.22em] uppercase transition-colors"
          >
            View All
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Social marquee ---------------- */

export function SocialStrip() {
  const items = Array.from({ length: 8 }, (_, i) =>
    i % 2 === 0 ? brand.instagramHandle : "The Night Starts Here",
  );
  return (
    <section className="border-border/60 overflow-hidden border-b py-6">
      <div className="marquee flex w-max gap-10 whitespace-nowrap">
        {[...items, ...items].map((t, i) => (
          <span
            key={i}
            className="font-display flex items-center gap-10 text-lg font-bold tracking-[0.2em] uppercase opacity-40"
          >
            {t} <span className="text-heat">•</span>
          </span>
        ))}
      </div>
    </section>
  );
}
