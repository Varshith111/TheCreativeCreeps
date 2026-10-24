import { useEffect, useRef, useState } from "react";
import { m, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import Logo from "./Logo";
import { EASE } from "./ui";

/* The headline artwork (public/hero-headline.png, 1480×670) split into its four lines.
   Each entry is a vertical band of the image in % — cut midway between the lines. */
const LINES = [
  { label: "We are", top: 0, bottom: 14.48, delay: 0.1 },
  { label: "The", top: 14.48, bottom: 41.04, delay: 0.22 },
  { label: "Creative", top: 41.04, bottom: 68.58, delay: 0.34 },
  { label: "Creeps", top: 68.58, bottom: 100, delay: 0.46 },
];

const SERVICES = ["Branding", "Marketing", "Social Media Handling", "Packaging"];

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#/*+_";

/** Mono annotation that "decodes" from random glyphs into its text. */
function Scramble({ text, delay = 0, duration = 700 }) {
  const reduce = useReducedMotion();
  const [out, setOut] = useState(reduce ? text : "");

  useEffect(() => {
    if (reduce) return;
    let raf;
    let start;
    const timer = setTimeout(() => {
      const tick = (now) => {
        start ??= now;
        const p = Math.min(1, (now - start) / duration);
        const solved = Math.floor(p * text.length);
        setOut(
          text
            .split("")
            .map((ch, i) => (i < solved || ch === " " || ch === "." ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0]))
            .join("")
        );
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay * 1000);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [text, delay, duration, reduce]);

  return (
    <span aria-label={text}>
      <span aria-hidden="true">{out || " "}</span>
    </span>
  );
}

function Annotation({ lines, delay, align = "items-start", className = "" }) {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay }}
      className={`flex flex-col ${align} font-mono text-[9px] font-medium uppercase leading-[1.65] tracking-[0.22em] text-muted sm:text-[10px] md:text-[11px] ${className}`}
    >
      {lines.map((t, i) => (
        <Scramble key={t} text={t} delay={delay + i * 0.08} />
      ))}
      <m.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, ease: EASE, delay: delay + lines.length * 0.08 + 0.3 }}
        className="mt-2.5 h-px w-6 origin-left bg-ink/35"
      />
    </m.div>
  );
}

/** A hand-drawn lime accent that draws itself in. */
function Doodle({ d, viewBox, className, delay }) {
  return (
    <svg viewBox={viewBox} className={`pointer-events-none absolute overflow-visible ${className}`} aria-hidden="true" fill="none">
      <m.path
        d={d}
        stroke="var(--color-lime-deep)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay }}
      />
    </svg>
  );
}

export default function Hero() {
  const containerRef = useRef(null);
  const reduceMotion = useReducedMotion();

  // pointer parallax: the headline drifts gently toward the cursor, the accents a little further
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 90, damping: 20, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  const heroDriftX = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const heroDriftY = useTransform(smoothY, [-0.5, 0.5], [-6, 6]);
  const accentX = useTransform(smoothX, [-0.5, 0.5], [-18, 18]);
  const accentY = useTransform(smoothY, [-0.5, 0.5], [-12, 12]);
  const tiltY = useTransform(smoothX, [-0.5, 0.5], [-18, 18]);
  const tiltX = useTransform(smoothY, [-0.5, 0.5], [12, -12]);

  // scroll: the headline sinks back and lifts away as the page moves on
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const headScale = useTransform(scrollYProgress, [0, 1], [1, reduceMotion ? 1 : 0.9]);
  const headY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -80]);
  const headOpacity = useTransform(scrollYProgress, [0, 0.85], [1, reduceMotion ? 1 : 0.25]);
  const cornersOpacity = useTransform(scrollYProgress, [0, 0.4], [1, reduceMotion ? 1 : 0]);

  const handlePointerMove = (e) => {
    if (reduceMotion || e.pointerType !== "mouse" || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handlePointerLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      aria-labelledby="hero-main-title"
      className="relative flex h-[calc(100svh-var(--header-h))] min-h-[580px] w-full select-none flex-col justify-between overflow-hidden bg-cream px-6 py-5 text-ink sm:px-10 sm:py-6 lg:px-16 lg:py-8"
    >
      {/* Accessible H1 for SEO / Screen Readers */}
      <h1 id="hero-main-title" className="sr-only">
        WE ARE THE CREATIVE CREEPS — Ideas That Move People
      </h1>

      {/* Subtle fine tactile film grain texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* soft lime glow that blooms in behind the headline */}
      <m.div
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: EASE, delay: 0.3 }}
        className="pointer-events-none absolute left-1/2 top-[55%] h-[min(40vw,420px)] w-[min(60vw,720px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime/[.13] blur-[100px]"
      />

      {/* TOP ANNOTATIONS ROW */}
      <m.div style={{ opacity: cornersOpacity }} className="relative z-10 flex w-full items-start justify-between pt-1">
        <Annotation lines={["BRANDS", "IDEAS", "CULTURE", "IMPACT"]} delay={0.9} />
        <Annotation lines={["BOLD IDEAS.", "REAL BRANDS.", "LASTING IMPACT."]} delay={1.05} />
      </m.div>

      {/* CENTER HERO HEADLINE: each line of the artwork whooshes in on its own */}
      <div className="relative z-10 my-auto flex w-full flex-1 items-center justify-center py-2">
        <m.div style={{ scale: headScale, y: headY, opacity: headOpacity }} className="relative flex w-full max-w-[920px] items-center justify-center px-2">
          <m.div style={{ x: heroDriftX, y: heroDriftY }} className="relative aspect-[1480/670] w-full max-w-[min(100%,calc(52vh*1480/670))]">
            {/* lime highlighter swiping in behind "CREEPS" */}
            <m.span
              aria-hidden="true"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1], delay: 1.0 }}
              className="absolute left-[11%] top-[80%] h-[15%] w-[68%] origin-left -rotate-[1.5deg] rounded-[3px] bg-lime"
            />

            {/* the 3D TCC sculpture perched on "IVE" of "CREATIVE" (IVE spans 70–95% across, its top is at 43%) */}
            <m.div style={{ x: accentX, y: accentY }} className="absolute left-[70.6%] top-[13.8%] w-[27%] [perspective:900px]" aria-hidden="true">
              <m.div
                initial={reduceMotion ? false : { y: "60%", scale: 0.6, rotate: 8, opacity: 0 }}
                animate={{ y: 0, scale: 1, rotate: -4, opacity: 1 }}
                transition={{ type: "spring", stiffness: 140, damping: 13, delay: 1.3 }}
                className="origin-bottom"
              >
                {/* idle bob once it has landed */}
                <m.div
                  animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2.4 }}
                >
                  {/* tilts toward the cursor */}
                  <m.div style={reduceMotion ? undefined : { rotateX: tiltX, rotateY: tiltY, transformStyle: "preserve-3d" }}>
                    <Logo depth={14} className="w-full drop-shadow-[0_18px_14px_rgba(13,13,13,.28)]" />
                  </m.div>
                </m.div>
              </m.div>
            </m.div>
            <m.p
              aria-hidden="true"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 1.9 }}
              className="absolute left-[50%] top-[22%] hidden w-max -rotate-6 text-right font-mono text-[10px] uppercase leading-snug tracking-[0.16em] text-muted md:block"
            >
              that’s us. →
              <br />
              we’re watching.
            </m.p>

            {/* the four lines of the artwork, each a horizontal slice of the same image */}
            {LINES.map(({ label, top, bottom, delay }) => (
              <m.img
                key={label}
                src="/hero-headline.png"
                alt=""
                aria-hidden="true"
                draggable="false"
                initial={reduceMotion ? false : { x: "-55%", opacity: 0, filter: "blur(14px)", skewX: -12 }}
                animate={{ x: 0, opacity: 1, filter: "blur(0px)", skewX: 0 }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay }}
                className="pointer-events-none absolute inset-0 size-full select-none object-contain"
                style={{ clipPath: `inset(${top}% 0 ${100 - bottom}% 0)` }}
              />
            ))}

            <Doodle viewBox="0 0 80 80" d="M40 6 V28 M14 18 L28 34 M66 18 L52 34" className="left-[29%] top-[-6%] w-[6%]" delay={1.5} />
            <Doodle viewBox="0 0 120 120" d="M60 110 C20 108 14 60 52 52 C82 46 90 82 64 86 C46 88 44 66 60 66" className="left-[2%] top-[70%] w-[7%]" delay={1.65} />
          </m.div>
        </m.div>
      </div>

      {/* BOTTOM AREA: SERVICES, TAGLINE, CORNER ANNOTATIONS */}
      <m.div style={{ opacity: cornersOpacity }} className="relative z-10 grid w-full grid-cols-1 items-end gap-3 pb-1 sm:grid-cols-[auto_1fr_auto] lg:gap-8">
        <Annotation lines={["STRATEGY", "CREATIVE", "CONTENT", "GROWTH"]} delay={1.2} className="hidden sm:flex" />

        {/* Center: SERVICES BAR & TAGLINE — words drop in one by one */}
        <div className="flex flex-col items-center justify-center px-2 text-center">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-display text-[12px] font-black uppercase tracking-[0.06em] text-ink sm:gap-x-5 sm:text-[13px] md:gap-x-7 md:text-[15px] lg:text-[16px]">
            {SERVICES.map((s, i) => (
              <span key={s} className="flex items-center gap-x-3 sm:gap-x-5 md:gap-x-7">
                {i > 0 && (
                  <m.span
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.4, delay: 1.05 + i * 0.09 }}
                    className="inline-block h-[1em] w-px bg-ink/35"
                    aria-hidden="true"
                  />
                )}
                <span className="inline-block overflow-hidden">
                  <m.span
                    className="inline-block"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.6, ease: EASE, delay: 1.0 + i * 0.09 }}
                  >
                    {s}
                  </m.span>
                </span>
              </span>
            ))}
          </div>

          <m.p
            initial={{ opacity: 0, letterSpacing: "0.6em" }}
            animate={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ duration: 1.2, ease: EASE, delay: 1.45 }}
            className="mt-2.5 font-display text-[12px] font-medium uppercase text-ink sm:mt-3 sm:text-[13px] md:text-[15px] lg:text-[16px]"
          >
            IDEAS THAT MOVE PEOPLE.
          </m.p>
        </div>

        {/* Bottom-Right: SCROLL INDICATOR */}
        <m.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="hidden flex-col items-center gap-2 justify-self-end font-mono text-[9px] font-medium uppercase tracking-[0.22em] text-muted sm:flex sm:text-[10px] md:text-[11px]"
        >
          <span>SCROLL</span>
          <div className="relative flex flex-col items-center">
            <span className="relative h-8 w-[1.5px] overflow-hidden bg-ink/20 md:h-10">
              {/* a drop of ink that keeps running down the line */}
              <m.span
                animate={{ y: ["-100%", "100%"] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                className="absolute inset-0 bg-ink"
              />
            </span>
            <m.span
              animate={{ y: [0, 3.5, 0] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              className="-mt-[1px] size-2 rounded-full border-[1.5px] border-ink bg-transparent"
            />
          </div>
        </m.div>
      </m.div>

      {/* Mobile-only bottom annotations fallback */}
      <div className="flex w-full items-center justify-between border-t border-ink/10 pt-3 font-mono text-[8px] tracking-widest text-muted sm:hidden">
        <span>STRATEGY · CREATIVE · CONTENT · GROWTH</span>
        <div className="flex items-center gap-1.5">
          <span>SCROLL</span>
          <span className="size-1.5 rounded-full border border-ink" />
        </div>
      </div>
    </section>
  );
}
