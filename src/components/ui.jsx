import { m, useMotionValue, useSpring } from "motion/react";
import { FINE_POINTER, useMedia } from "../hooks/useMedia";

export const EASE = [0.22, 1, 0.36, 1];

export function Arrow({ className = "" }) {
  return (
    <svg
      className={`arrow size-[1.15em] shrink-0 fill-none stroke-current transition-transform duration-300 ease-creep ${className}`}
      viewBox="0 0 24 24"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

/** Fades + lifts its content in once it scrolls into view. Reduced motion is handled by <MotionConfig>. */
export function Reveal({ as = "div", delay = 0, y = 28, className = "", children, ...rest }) {
  const Comp = m[as];
  return (
    <Comp
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      className={className}
      {...rest}
    >
      {children}
    </Comp>
  );
}

/** Editorial section marker: (01) — Label ———————— */
export function SectionLabel({ num, children, className = "", rule = true }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {num && <span className="label opacity-60">({num})</span>}
      <span className="label">{children}</span>
      {rule && <span aria-hidden="true" className="h-px flex-1 bg-current opacity-20" />}
    </div>
  );
}

/** Display heading whose lines slide up on mount. `lines` items are strings or { text, className }. */
export function TitleLines({ as: Tag = "h1", lines, className = "", delay = 0, ...rest }) {
  return (
    <Tag className={`font-display font-black uppercase leading-[.86] tracking-[-.045em] [font-stretch:85%] ${className}`} {...rest}>
      {lines.map((line, i) => {
        const { text, className: lineClass = "" } = typeof line === "string" ? { text: line } : line;
        return (
          <span key={i} className="-mb-[.04em] block overflow-hidden pb-[.04em]">
            <span className={`inline-block animate-rise ${lineClass}`} style={{ animationDelay: `${delay + i * 0.08}s` }}>
              {text}
            </span>
          </span>
        );
      })}
    </Tag>
  );
}

const TITLE_SIZES = {
  xl: "text-[clamp(3rem,8.5vw,8.5rem)]",
  lg: "text-[clamp(2.6rem,6.5vw,6rem)]",
  md: "text-[clamp(2.4rem,4.6vw,4.4rem)]",
};

export function SectionTitle({ num, eyebrow, children, className = "", id, size = "lg" }) {
  return (
    <div className={className}>
      <SectionLabel num={num} rule={false}>{eyebrow}</SectionLabel>
      <h2 id={id} className={`mt-5 font-display font-black uppercase leading-[.88] tracking-[-.045em] [word-spacing:.08em] ${TITLE_SIZES[size]}`}>
        {children}
      </h2>
    </div>
  );
}

/** Nudges its child toward the pointer on desktop — a small "magnetic" pull for primary CTAs. */
export function Magnetic({ children, strength = 0.22, className = "" }) {
  const fine = useMedia(FINE_POINTER);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });

  if (!fine) return <span className={`inline-flex ${className}`}>{children}</span>;

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <m.span style={{ x, y }} onPointerMove={onMove} onPointerLeave={reset} className={`inline-flex ${className}`}>
      {children}
    </m.span>
  );
}
