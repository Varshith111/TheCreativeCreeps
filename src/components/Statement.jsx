import { useEffect, useMemo, useRef, useState } from "react";
import { REDUCED_MOTION } from "../hooks/useMedia";

/**
 * Big statement whose words light up as it scrolls through the viewport.
 * `segments`: [{ text, mark?, light? }] — marked segments get the lime highlight,
 * light segments drop to a thin weight for contrast.
 */
export default function Statement({ segments, className = "" }) {
  const ref = useRef(null);
  const words = useMemo(
    () => segments.flatMap(({ text, mark, light }) => text.split(" ").map((w) => ({ w, mark, light }))),
    [segments]
  );
  const [lit, setLit] = useState(words.length);

  useEffect(() => {
    if (window.matchMedia(REDUCED_MOTION).matches) return;
    const el = ref.current;
    let raf = 0;
    let active = false;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.85;
      const end = vh * 0.45;
      const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end + rect.height)));
      setLit(Math.round(progress * words.length));
      raf = active ? requestAnimationFrame(update) : 0;
    };
    const io = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting;
      if (active && !raf) raf = requestAnimationFrame(update);
    });
    io.observe(el);
    update();
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [words.length]);

  return (
    <p
      ref={ref}
      className={`max-w-[1150px] font-display text-[clamp(1.8rem,4.1vw,3.9rem)] font-extrabold leading-[1.04] tracking-[-.03em] ${className}`}
    >
      {words.map(({ w, mark, light }, i) => (
        <span key={i}>
          <span
            className={`transition-opacity duration-300 ${mark ? "highlight-mark" : ""} ${light ? "font-extralight [font-stretch:110%]" : ""} ${
              i < lit ? "opacity-100" : "opacity-15"
            }`}
          >
            {w}
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
