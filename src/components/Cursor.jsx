import { useEffect, useState } from "react";
import { m, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { FINE_POINTER, useMedia } from "../hooks/useMedia";

const INTERACTIVE = "a, button, summary, label, select, input, textarea, [data-cursor]";

/**
 * A small trailing cursor accent for desktop. The native cursor stays visible;
 * elements with `data-cursor="Label"` turn the accent into a labelled lime badge.
 */
export default function Cursor() {
  const fine = useMedia(FINE_POINTER);
  const reduce = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 600, damping: 45, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 600, damping: 45, mass: 0.4 });
  const [state, setState] = useState({ label: null, hover: false, visible: false, down: false });

  const enabled = fine && !reduce;

  useEffect(() => {
    if (!enabled) return;
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setState((s) => (s.visible ? s : { ...s, visible: true }));
    };
    const over = (e) => {
      const target = e.target.closest?.(INTERACTIVE);
      const label = target?.closest("[data-cursor]")?.dataset.cursor || null;
      setState((s) => (s.label === label && s.hover === !!target ? s : { ...s, label, hover: !!target }));
    };
    const leave = () => setState((s) => ({ ...s, visible: false }));
    const down = () => setState((s) => ({ ...s, down: true }));
    const up = () => setState((s) => ({ ...s, down: false }));

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const { label, hover, visible, down } = state;
  const size = label ? 104 : hover ? 44 : 12;

  return (
    // blend mode lives on the outermost layer so it can invert against the page behind it
    <m.div aria-hidden="true" style={{ x: sx, y: sy }} className={`pointer-events-none fixed left-0 top-0 z-[300] ${label ? "" : "mix-blend-difference"}`}>
      <m.div
        animate={{ width: size, height: size, opacity: visible ? 1 : 0, scale: down ? 0.85 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className={`-translate-x-1/2 -translate-y-1/2 grid place-items-center rounded-full ${
          label ? "bg-lime text-ink shadow-[0_10px_30px_rgba(13,13,13,.22)]" : hover ? "border-[1.5px] border-white" : "bg-white"
        }`}
      >
        {label && <span className="label whitespace-nowrap text-[.68rem] font-medium">{label}</span>}
      </m.div>
    </m.div>
  );
}
