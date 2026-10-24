import { useRef } from "react";
import { m, useAnimationFrame, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from "motion/react";

const WORDS = ["Branding", "Marketing", "Social Media Handling", "Packaging", "Ideas that move people"];

/** Wrap a value into [min, max) so the tape loops seamlessly. */
const wrap = (min, max, v) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/**
 * One scrolling tape. It drifts on its own and speeds up (or reverses) with scroll velocity,
 * so the page feels like it has momentum.
 */
function Tape({ direction = 1, speed = 3, className, itemClass, starClass }) {
  const reduce = useReducedMotion();
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(velocity, [-1500, 0, 1500], [-5, 0, 5], { clamp: false });
  const dirRef = useRef(direction);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const b = boost.get();
    // scrolling up flips the tape, scrolling down pushes it along
    if (b < 0) dirRef.current = -direction;
    else if (b > 0) dirRef.current = direction;
    const move = dirRef.current * speed * (delta / 1000) * (1 + Math.abs(b));
    base.set(base.get() + move);
  });

  // the content is repeated 4×, so wrapping across a quarter of the width is seamless
  const x = useTransform(base, (v) => `${wrap(-25, 0, v)}%`);

  return (
    <div className={`flex overflow-hidden whitespace-nowrap ${className}`}>
      <m.div style={{ x }} className="flex shrink-0 items-center">
        {Array.from({ length: 4 }).flatMap((_, k) =>
          WORDS.map((w, i) => (
            <span key={`${k}-${i}`} className="flex items-center">
              <span className={itemClass}>{w}</span>
              <span aria-hidden="true" className={starClass}>
                ✺
              </span>
            </span>
          ))
        )}
      </m.div>
    </div>
  );
}

/** Two crossing tapes — lime over ink — that bridge the hero and the rest of the page. */
export default function CrossTape() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // the crossing angle opens up slightly as the band travels through the viewport
  const tilt = useTransform(scrollYProgress, [0, 1], [-1.5, -4.5]);
  const counter = useTransform(tilt, (t) => -t * 0.8);

  const item = "px-6 font-display text-[clamp(1.4rem,3.6vw,3rem)] font-black uppercase leading-none tracking-[-.02em]";

  return (
    <section ref={ref} aria-hidden="true" className="relative z-[2] -my-2 overflow-hidden py-[clamp(36px,6vw,72px)]">
      <m.div style={{ rotate: counter }} className="-mx-[5vw] border-y-2 border-ink bg-ink py-4 text-lime">
        <Tape direction={1} speed={2.2} itemClass={item} starClass="text-cream text-[clamp(1rem,2vw,1.6rem)]" />
      </m.div>
      <m.div style={{ rotate: tilt }} className="-mx-[5vw] -mt-[clamp(28px,4vw,52px)] border-y-2 border-ink bg-lime py-4 text-ink shadow-[0_18px_40px_-18px_rgba(13,13,13,.45)]">
        <Tape direction={-1} speed={2.8} itemClass={item} starClass="text-ink text-[clamp(1rem,2vw,1.6rem)]" />
      </m.div>
    </section>
  );
}
