import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { EASE } from "./ui";
import { Eye } from "./Logo";
import { CS, T, T_BOX } from "./logoGeometry";

/*
 * Opening sequence: the TCC monogram breaks apart and grows into "THE CREATIVE CREEPS".
 *
 *  phase 0  0.0s  monogram — T, C, C overlapping like the logo
 *  phase 1  0.3s  letters separate (with a touch of motion blur)
 *  phase 2  0.6s  remaining letters stream in: T·HE  C·REATIVE  C·REEPS
 *  phase 3  1.7s  settle — small overshoot + burst marks
 *  phase 4  2.5s  hold done → overlay wipes away and the page is revealed
 */
const TIMELINE = [300, 600, 1700, 2500];
const EXIT_MS = 800;

/**
 * Should the intro be skipped? It plays on every full load (or reload) of the home page —
 * not on other pages, not when navigating within the site — and never for reduced-motion users.
 */
export function shouldSkipIntro() {
  if (typeof window === "undefined") return true;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  return window.location.pathname !== "/";
}

// Glyph frames: the traced letter boxes plus a little padding, all at the same scale
// (one C is 1em tall), so the opening cluster reproduces the real monogram exactly.
const PAD = 4;
const frame = ([x0, y0, x1, y1]) => [x0 - PAD, y0 - PAD, x1 - x0 + PAD * 2, y1 - y0 + PAD * 2];
const C_HEIGHT = frame(CS[0].box)[3];

/** The logo's T on its own. */
function GlyphT() {
  const vb = frame(T_BOX);
  return (
    <svg viewBox={vb.join(" ")} style={{ height: `${vb[3] / C_HEIGHT}em` }} className="tcc block w-auto overflow-visible" aria-hidden="true">
      <path className="tcc-ink" d={T} />
    </svg>
  );
}

/** One of the logo's C's, with its creepy eye (tracked + blinking via useCreepyEyes). */
function GlyphC({ index }) {
  const c = CS[index];
  const vb = frame(c.box);
  return (
    <svg viewBox={vb.join(" ")} style={{ height: `${vb[3] / C_HEIGHT}em` }} className="tcc block w-auto overflow-visible" aria-hidden="true">
      <path className="tcc-ink" d={c.ring} />
      <Eye c={c} />
    </svg>
  );
}

const GlyphC1 = () => <GlyphC index={0} />;
const GlyphC2 = () => <GlyphC index={1} />;

/** Letters that stream out of a glyph: the container grows from 0 width while each letter un-blurs. */
function Suffix({ text, show, delay, align }) {
  return (
    <m.span
      className={`flex overflow-hidden whitespace-nowrap ${align}`}
      initial={{ width: 0 }}
      animate={{ width: show ? "auto" : 0 }}
      transition={{ duration: 0.85, ease: EASE, delay }}
    >
      <span className="flex pl-[.03em] pr-[.02em] font-display text-[.94em] font-black uppercase leading-[.74] tracking-[-.015em] text-ink [font-stretch:62%]">
        {text.split("").map((ch, i) => (
          <m.span
            key={i}
            className="inline-block"
            initial={{ opacity: 0, x: -40, filter: "blur(10px)" }}
            animate={show ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.55, ease: EASE, delay: delay + 0.1 + i * 0.045 }}
          >
            {ch}
          </m.span>
        ))}
      </span>
    </m.span>
  );
}

/** Short hand-drawn tick marks that pop in when the wordmark settles. */
function Burst({ show, side }) {
  const flip = side === "right" ? "scale-x-[-1]" : "";
  return (
    <svg
      viewBox="0 0 60 60"
      aria-hidden="true"
      className={`absolute top-[-.45em] h-[.55em] w-[.55em] overflow-visible ${side === "left" ? "left-[-.55em]" : "right-[-.55em]"} ${flip}`}
    >
      {["M40 46 L22 30", "M30 52 L8 46", "M48 36 L42 12"].map((d, i) => (
        <m.path
          key={d}
          d={d}
          stroke="var(--color-ink)"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={show ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 0.35, ease: EASE, delay: i * 0.06 }}
        />
      ))}
    </svg>
  );
}

const WORDS = [
  { glyph: GlyphT, rest: "he", align: "self-end mb-[.06em]" },
  { glyph: GlyphC1, rest: "reative", align: "self-center" },
  { glyph: GlyphC2, rest: "reeps", align: "self-center" },
];

// space before each word: overlapping like the monogram at first, then a normal word gap
// how far each glyph overlaps the previous one in the real monogram (negative margin, in em)
const right = (box) => frame(box)[0] + frame(box)[2];
const GAP_LOGO = ["0em", `${-(right(T_BOX) - frame(CS[0].box)[0]) / C_HEIGHT}em`, `${-(right(CS[0].box) - frame(CS[1].box)[0]) / C_HEIGHT}em`];
// the T sits slightly higher than the C's in the monogram
const T_LIFT = `${(frame(CS[0].box)[1] + C_HEIGHT - (frame(T_BOX)[1] + frame(T_BOX)[3])) / C_HEIGHT}em`;
const GAP_WORD = "0.22em";

export default function Intro({ onReveal, onDone }) {
  const [phase, setPhase] = useState(0);
  const [visible, setVisible] = useState(true);
  const skipRef = useRef(null);
  const finished = useRef(false);
  // keep the latest callback without restarting the timeline when the parent re-renders
  const onRevealRef = useRef(onReveal);
  onRevealRef.current = onReveal;

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    onRevealRef.current();
    setVisible(false);
  }, []);

  // run the timeline
  useEffect(() => {
    const timers = TIMELINE.map((ms, i) => setTimeout(() => (i === TIMELINE.length - 1 ? finish() : setPhase(i + 1)), ms));
    return () => timers.forEach(clearTimeout);
  }, [finish]);

  // lock scroll, allow skipping with Esc / Enter / Space, focus the skip button for keyboard users
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    skipRef.current?.focus({ preventScroll: true });
    const onKey = (e) => {
      if (["Escape", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        finish();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [finish]);

  const separated = phase >= 1;
  const words = phase >= 2;
  const settled = phase >= 3;

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <m.div
          key="intro"
          role="dialog"
          aria-modal="true"
          aria-label="The Creative Creeps — intro"
          onClick={finish}
          className="fixed inset-0 z-[400] cursor-pointer"
          exit={{ pointerEvents: "none" }}
        >
          {/* lime layer trails the cream one on the way out */}
          <m.div
            className="absolute inset-0 bg-lime"
            exit={{ y: "-100%" }}
            transition={{ duration: EXIT_MS / 1000, ease: [0.76, 0, 0.24, 1], delay: 0.12 }}
          />
          <m.div
            className="absolute inset-0 grid place-items-center bg-cream [--logo-bg:var(--color-cream)]"
            exit={{ y: "-100%" }}
            transition={{ duration: EXIT_MS / 1000, ease: [0.76, 0, 0.24, 1] }}
          >
            <m.div
              className="relative flex items-end text-[clamp(28px,8.8vw,136px)]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: settled ? [1.035, 1] : 1 }}
              transition={settled ? { duration: 0.5, ease: EASE } : { duration: 0.35, ease: EASE }}
              aria-hidden="true"
            >
              {WORDS.map(({ glyph: Glyph, rest, align }, i) => (
                <m.span
                  key={i}
                  className="relative flex"
                  style={{ zIndex: i + 1, marginBottom: i === 0 ? T_LIFT : 0 }}
                  initial={{ marginLeft: GAP_LOGO[i] }}
                  animate={{
                    marginLeft: i === 0 ? "0em" : separated ? GAP_WORD : GAP_LOGO[i],
                    filter: separated && !words ? ["blur(0px)", "blur(3px)", "blur(0px)"] : "blur(0px)",
                  }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  <Glyph />
                  <Suffix text={rest} show={words} delay={i * 0.12} align={align} />
                </m.span>
              ))}
              <Burst show={settled} side="left" />
              <Burst show={settled} side="right" />
            </m.div>

            <p className="sr-only">The Creative Creeps</p>

            <button
              ref={skipRef}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                finish();
              }}
              className="label absolute bottom-6 right-6 cursor-pointer rounded-full border border-ink/25 px-4 py-2 text-ink/70 transition-colors hover:border-ink hover:text-ink"
            >
              Skip intro →
            </button>
            <span className="label absolute bottom-6 left-6 text-ink/45">TCC® — Creative Studio</span>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
