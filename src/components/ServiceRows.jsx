import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { m, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import ServiceIcon from "./ServiceIcon";
import { Arrow, Reveal } from "./ui";
import { useMedia } from "../hooks/useMedia";
import { SERVICES } from "../data";

/* ==========================================================================
   Desktop: large rows. Hover / keyboard focus expands a row to reveal its
   description, tags and a custom illustration.
   ========================================================================== */

function Rows() {
  return (
    <ul className="border-t border-cream/15">
      {SERVICES.map(({ slug, name, text, tags, icon }, i) => (
        <Reveal as="li" key={slug} delay={i * 0.05} className="relative border-b border-cream/15">
          <Link
            to={`/services#${slug}`}
            data-cursor="Explore"
            className="group relative grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-x-4 py-[clamp(20px,2.8vw,34px)] outline-offset-4 sm:gap-x-8"
          >
            {/* lime rule that draws across the row */}
            <span aria-hidden="true" className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-lime transition-transform duration-700 ease-creep group-hover:scale-x-100 group-focus-visible:scale-x-100" />

            <span className="label pt-[.9em] text-cream/50 transition-colors duration-300 group-hover:text-lime group-focus-visible:text-lime">S—0{i + 1}</span>

            <div className="min-w-0">
              <h3 className="font-display text-[clamp(1.9rem,5.2vw,5rem)] font-black uppercase leading-[.92] tracking-[-.045em] transition-[translate,color] duration-500 ease-creep group-hover:translate-x-3 group-hover:text-lime group-focus-visible:translate-x-3 group-focus-visible:text-lime">
                {name}
              </h3>

              {/* expanding detail */}
              <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-creep group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr] [@media(hover:none)]:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <div className="flex flex-wrap items-end gap-x-10 gap-y-4 pt-5 opacity-0 transition-opacity delay-100 duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 sm:pl-3 [@media(hover:none)]:opacity-100">
                    <p className="max-w-[46ch] text-[1.02rem] leading-relaxed text-cream/75">{text}</p>
                    <ul className="flex flex-wrap gap-1.5">
                      {tags.map((t) => (
                        <li key={t} className="label rounded-full border border-cream/25 px-3 py-1.5 text-cream/80">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 pt-1">
              {/* custom visual: slides and spins in on hover */}
              <span className="pointer-events-none hidden w-[clamp(64px,7vw,104px)] -translate-x-4 -rotate-12 scale-75 rounded-2xl bg-cream p-2.5 opacity-0 transition duration-500 ease-creep group-hover:translate-x-0 group-hover:rotate-0 group-hover:scale-100 group-hover:opacity-100 md:block">
                <ServiceIcon icon={icon} className="w-full" />
              </span>
              <span className="grid size-[clamp(40px,4vw,56px)] shrink-0 place-items-center rounded-full border border-cream/25 transition duration-500 ease-creep group-hover:-rotate-45 group-hover:border-lime group-hover:bg-lime group-hover:text-ink group-focus-visible:bg-lime group-focus-visible:text-ink">
                <Arrow />
              </span>
            </div>
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}

/* ==========================================================================
   Phones & tablets: a pinned horizontal reel. Scrolling down glides the cards
   sideways one at a time; the card in focus lights up lime and its icon spins in.
   ========================================================================== */

const HOLD = 0.12; // share of the scroll spent holding the last card before the section moves on
const PER_CARD_SVH = 60; // scroll distance per card

/** One reel card. Its look is driven by how close the reel is to centring it. */
function ReelCard({ service: s, i, count, progress, onFocusCard }) {
  const travel = 1 - HOLD;
  const at = count > 1 ? (i / (count - 1)) * travel : 0; // progress at which this card is centred
  const near = travel / (count - 1 || 1); // progress distance to a neighbour
  // keep offsets inside 0–1: Motion hardware-accelerates some of these values and requires it
  const clamp = (v) => Math.min(1, Math.max(0, v));
  const range = [clamp(at - near), at, clamp(at + near)];
  // colour flips over a short window around the centre, so cards never linger half-lit;
  // the first card is lit from the start and the last one stays lit through the final hold
  const first = i === 0;
  const last = i === count - 1;
  const colorRange = [clamp(at - near * 0.55), clamp(at - near * 0.3), at, clamp(at + near * 0.3), clamp(at + near * 0.55)];
  // 0 = dark card, 1 = lime card. Driven through a CSS variable (mixed in CSS below) rather than
  // animating colours directly, which Motion would hand to the browser's stricter native animator.
  const lit = useTransform(progress, colorRange, [first ? 1 : 0, 1, 1, 1, last ? 1 : 0]);

  const rotate = useTransform(progress, range, [5, 0, last ? 0 : -5]);
  const scale = useTransform(progress, range, [0.9, 1, last ? 1 : 0.9]);
  const iconRotate = useTransform(progress, range, [-140, 0, last ? 0 : 140]);
  const iconScale = useTransform(progress, range, [0.6, 1, last ? 1 : 0.6]);

  return (
    <m.li style={{ rotate, scale }} className="w-[min(78vw,420px)] shrink-0">
      <m.div
        style={{ "--lit": lit }}
        className="flex h-full flex-col rounded-[22px] border border-cream/15 bg-[color-mix(in_srgb,var(--color-lime)_calc(var(--lit)*100%),#1a1a18)] p-6 text-[color-mix(in_srgb,var(--color-ink)_calc(var(--lit)*100%),var(--color-cream))]"
      >
        <div className="flex items-start justify-between">
          <span className="label opacity-70">
            S—{String(i + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>
          <m.span style={{ rotate: iconRotate, scale: iconScale }} className="grid size-[clamp(84px,24vw,120px)] place-items-center rounded-2xl bg-cream p-2.5">
            <ServiceIcon icon={s.icon} className="w-full" />
          </m.span>
        </div>
        <h3 className="mt-auto pt-6 font-display text-[clamp(1.9rem,8vw,2.8rem)] font-black uppercase leading-[.92] tracking-[-.045em] [overflow-wrap:anywhere]">{s.name}</h3>
        <p className="mt-3 text-[.95rem] leading-relaxed opacity-80">{s.text}</p>
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-current/20 pt-4">
          <ul className="flex flex-wrap gap-1.5">
            {s.tags.map((t) => (
              <li key={t} className="label rounded-full border border-current/30 px-2.5 py-1">
                {t}
              </li>
            ))}
          </ul>
          <Link
            to={`/services#${s.slug}`}
            onFocus={() => onFocusCard(i)}
            className="grid size-11 shrink-0 place-items-center rounded-full border border-current/40"
            aria-label={`Explore ${s.name}`}
          >
            <Arrow className="-rotate-45" />
          </Link>
        </div>
      </m.div>
    </m.li>
  );
}

function Reel({ heading }) {
  const trackRef = useRef(null);
  const railRef = useRef(null);
  const [distance, setDistance] = useState(0);
  const [active, setActive] = useState(0);
  const count = SERVICES.length;

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1 - HOLD], [0, -distance], { clamp: true });
  const bar = useTransform(scrollYProgress, [0, 1 - HOLD], [0, 1], { clamp: true });

  // how far the rail must travel so the last card ends up where the first one started
  useLayoutEffect(() => {
    const rail = railRef.current;
    const measure = () => {
      const cards = rail.children;
      if (cards.length < 2) return;
      setDistance(cards[cards.length - 1].offsetLeft - cards[0].offsetLeft);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(rail);
    return () => ro.disconnect();
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(Math.min(count - 1, Math.max(0, Math.round((p / (1 - HOLD)) * (count - 1)))));
  });

  // keyboard users: tabbing to a card scrolls the page so that card is centred
  const focusCard = (i) => {
    const track = trackRef.current;
    const len = track.offsetHeight - window.innerHeight;
    const top = track.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + (i / (count - 1)) * (1 - HOLD) * len, behavior: "instant" });
  };

  return (
    <div ref={trackRef} className="relative" style={{ height: `calc(100svh + ${(count - 1) * PER_CARD_SVH}svh)` }}>
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden py-6">
        <div className="wrap shrink-0">{heading}</div>

        {/* counter + progress */}
        <div className="wrap mt-5 flex shrink-0 items-center gap-4">
          <span className="label tabular-nums text-lime" aria-live="polite">
            {String(active + 1).padStart(2, "0")}
            <span className="text-cream/40"> / {String(count).padStart(2, "0")}</span>
          </span>
          <span className="relative h-px flex-1 bg-cream/20">
            <m.span style={{ scaleX: bar }} className="absolute inset-0 origin-left bg-lime" />
          </span>
          <span className="label max-w-[16ch] truncate text-cream/60">{SERVICES[active].name}</span>
        </div>

        {/* the rail */}
        <div className="mt-6 min-h-0 flex-1 pl-[clamp(16px,4vw,48px)]">
          <m.ul ref={railRef} style={{ x }} className="flex h-full max-h-[540px] items-stretch gap-4 pb-2" aria-label="Our services">
            {SERVICES.map((s, i) => (
              <ReelCard key={s.slug} service={s} i={i} count={count} progress={scrollYProgress} onFocusCard={focusCard} />
            ))}
          </m.ul>
        </div>

        <div className="wrap mt-5 flex shrink-0 items-center justify-between gap-4">
          <span className="label text-cream/45">Keep scrolling →</span>
          <Link to="/services" className="label rounded-full border border-cream/30 px-4 py-2 text-cream transition-colors hover:border-lime hover:text-lime">
            All services ↗
          </Link>
        </div>
      </div>
    </div>
  );
}

/**
 * Services showcase. `heading` is the section title; `aside` (intro copy + link) shows beside it on desktop.
 * Phones and tablets get the pinned reel; reduced-motion users get the plain rows everywhere.
 */
export default function ServiceRows({ heading, aside }) {
  const compact = useMedia("(max-width: 1023px)");
  const reduce = useReducedMotion();

  if (compact && !reduce) return <Reel heading={heading} />;

  return (
    <div className="wrap">
      <div className="mb-[clamp(40px,6vw,80px)] grid items-end gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        {heading}
        {aside}
      </div>
      <Rows />
    </div>
  );
}
