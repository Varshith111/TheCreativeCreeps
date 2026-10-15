import { useRef } from "react";
import { Link } from "react-router";
import { m, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import Logo from "./Logo";
import Ticker from "./Ticker";
import { Arrow, EASE, Magnetic } from "./ui";

const CREEP = "Creep".split("");

/** Maps hero scroll progress (0 → 1) to a pixel offset; flat when motion is reduced. */
function useDrift(progress, to, reduce) {
  return useTransform(progress, [0, 1], [0, reduce ? 0 : to]);
}

/** One masked headline line that slides up on load and drifts sideways on scroll. */
function Line({ i, x, className = "", children }) {
  return (
    <m.span style={{ x }} className={`block overflow-hidden pb-[.05em] ${className}`}>
      <m.span
        className="inline-block"
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.1, ease: EASE, delay: 0.15 + i * 0.1 }}
      >
        {children}
      </m.span>
    </m.span>
  );
}

/** A hand-drawn accent that draws itself in. */
function Doodle({ d, viewBox, className, delay = 1, style }) {
  return (
    <m.svg viewBox={viewBox} style={style} className={`pointer-events-none absolute overflow-visible ${className}`} aria-hidden="true" fill="none">
      <m.path
        d={d}
        stroke="var(--color-lime-deep)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: EASE, delay }}
      />
    </m.svg>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  // scroll-linked drift
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const x1 = useDrift(scrollYProgress, -50, reduce);
  const x2 = useDrift(scrollYProgress, 40, reduce);
  const x3 = useDrift(scrollYProgress, -30, reduce);
  const x4 = useDrift(scrollYProgress, 60, reduce);
  const sculptY = useDrift(scrollYProgress, 140, reduce);
  const plinthY = useDrift(scrollYProgress, 60, reduce);

  // pointer tilt for the sculpture
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 120, damping: 18, mass: 0.6 };
  const rotY = useSpring(useTransform(px, [-0.5, 0.5], [-16, 16]), spring);
  const rotX = useSpring(useTransform(py, [-0.5, 0.5], [12, -12]), spring);
  const nudgeX = useSpring(useTransform(px, [-0.5, 0.5], [14, -14]), spring);
  const nudgeY = useSpring(useTransform(py, [-0.5, 0.5], [10, -10]), spring);

  const onPointerMove = (e) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onPointerLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative flex min-h-[calc(100svh-var(--header-h))] flex-col overflow-hidden"
    >
      {/* editorial meta bar */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="wrap grid grid-cols-2 border-b border-ink/12 md:grid-cols-4"
      >
        {["TCC® — Creative Studio", "Brand · Packaging · Web · Social", "Creative Studio ’24—’26", "Scroll to explore ↓"].map((t, i) => (
          <span key={t} className={`label py-3 ${i === 3 ? "text-right md:text-left" : ""} ${i === 1 || i === 2 ? "hidden md:block" : ""} ${i ? "md:border-l md:border-ink/12 md:pl-4" : ""}`}>
            {t}
          </span>
        ))}
      </m.div>

      <div className="wrap relative grid flex-1 items-center gap-6 py-[clamp(24px,4vh,56px)] lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        {/* headline */}
        <div className="relative z-[2]">
          <h1
            id="hero-title"
            aria-label="Ideas that creep differently."
            className="font-display text-[clamp(3.1rem,13.5vw,6rem)] font-black uppercase leading-[.84] tracking-[-.05em] [font-stretch:85%] lg:text-[clamp(4rem,8.6vw,9.4rem)]"
          >
            <span aria-hidden="true">
              <Line i={0} x={x1}>Ideas</Line>
              <Line i={1} x={x2} className="relative pl-[1.55em]">
                <span className="label absolute left-0 top-[1.1em] hidden max-w-[11ch] text-left text-[.7rem] font-medium normal-case leading-snug tracking-normal text-muted sm:block [font-stretch:100%]">
                  (fig. a)
                  <br />
                  an idea,
                  <br />
                  mid-creep →
                </span>
                That
              </Line>
              <Line i={2} x={x3} className="relative">
                <span className="relative inline-block">
                  {CREEP.map((ch, i) => (
                    <m.span
                      key={i}
                      className="hl inline-block"
                      initial={{ y: "60%", rotate: -8, opacity: 0 }}
                      animate={{ y: 0, rotate: 0, opacity: 1 }}
                      transition={{ duration: 0.9, ease: EASE, delay: 0.45 + i * 0.06 }}
                    >
                      {ch}
                    </m.span>
                  ))}
                  {/* scribbled underline */}
                  <svg viewBox="0 0 300 24" preserveAspectRatio="none" className="absolute -bottom-[.04em] left-0 h-[.14em] w-full overflow-visible" aria-hidden="true">
                    <m.path
                      d="M4 16 C60 4 120 22 180 10 S270 6 296 14"
                      fill="none"
                      stroke="var(--color-ink)"
                      strokeWidth="6"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.9, ease: EASE, delay: 1.1 }}
                    />
                  </svg>
                </span>
              </Line>
              <Line i={3} x={x4}>Differently.</Line>
            </span>
          </h1>
        </div>

        {/* sculpture */}
        <div aria-hidden="true" className="relative mx-auto aspect-[1/.92] w-full max-w-[560px] [perspective:1200px] lg:max-w-none">
          <Doodle viewBox="0 0 120 80" d="M10 68 L18 18 L42 48 L60 8 L78 48 L102 18 L110 68 Z" className="right-[4%] top-[2%] w-[20%] rotate-12" delay={1.2} style={{ x: nudgeX, y: nudgeY }} />
          <Doodle viewBox="0 0 80 80" d="M40 6 V28 M14 18 L28 34 M66 18 L52 34 M6 46 H24 M74 46 H56" className="left-[2%] top-[30%] w-[11%] -rotate-30" delay={1.4} style={{ x: nudgeX, y: nudgeY }} />
          <Doodle viewBox="0 0 120 120" d="M60 110 C20 108 14 60 52 52 C82 46 90 82 64 86 C46 88 44 66 60 66 M82 30 C70 14 44 16 40 30" className="bottom-[4%] left-[3%] w-[11%]" delay={1.6} />

          {/* plinth */}
          <m.div style={{ y: plinthY }} className="absolute bottom-0 left-[12%] right-[-4%] h-[38%]">
            <div className="stone-top absolute inset-x-0 top-0 h-[22%] rounded-t-md" />
            <div className="stone-front absolute inset-x-0 bottom-0 top-[22%] flex items-end justify-between px-[6%] pb-[6%]">
              <span className="label text-cream/45">TCC / Fig. 01</span>
              <span className="label text-cream/45">Cast in pixels</span>
            </div>
          </m.div>

          {/* the monogram */}
          <m.div style={{ y: sculptY }} className="absolute inset-x-[2%] bottom-[33%]">
            <m.div
              initial={{ opacity: 0, y: -60, rotate: -8 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ type: "spring", stiffness: 90, damping: 12, delay: 0.35 }}
            >
              <m.div style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}>
                <Logo depth={16} className="w-full drop-shadow-[0_34px_26px_rgba(13,13,13,.32)]" />
              </m.div>
            </m.div>
          </m.div>

          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="label absolute left-[16%] top-[6%] hidden max-w-[18ch] rotate-[-4deg] text-muted md:block"
          >
            psst — move your cursor.
            <br />
            it’s watching.
          </m.p>
        </div>
      </div>

      {/* intro + CTAs */}
      <div className="wrap grid items-end gap-8 pb-[clamp(28px,4vh,48px)] md:grid-cols-[minmax(0,1fr)_auto]">
        <m.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.7 }}
          className="max-w-[34ch] text-[clamp(1.05rem,1rem+.4vw,1.3rem)] leading-[1.45] text-ink-2"
        >
          We build <strong className="font-semibold text-ink">brands, websites and digital experiences</strong> that stand out — and stick around.
        </m.p>
        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.8 }}
          className="flex flex-wrap items-center gap-3"
        >
          <Magnetic>
            <Link to="/work" className="group inline-flex items-center gap-3 rounded-full border-2 border-ink px-6 py-[.95em] font-bold transition-colors duration-300 hover:bg-ink hover:text-cream" data-cursor="See work">
              Explore Our Work
              <Arrow className="group-hover:translate-x-1" />
            </Link>
          </Magnetic>
          <Magnetic>
            <Link to="/contact" className="btn px-6 py-[1em]" data-cursor="Let’s go">
              <span>Start a Project</span>
              <Arrow />
            </Link>
          </Magnetic>
        </m.div>
      </div>

      <Ticker />
    </section>
  );
}
