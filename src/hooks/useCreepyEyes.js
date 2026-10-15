import { useEffect } from "react";
import { FINE_POINTER, REDUCED_MOTION } from "./useMedia";

/**
 * Every `.tcc-eye` on the page looks toward the pointer and blinks now and then.
 * Eyes are re-queried on each frame, so ones added by route changes join in automatically.
 *
 * Markup: an element containing `.tcc-socket` (the eye white) and `.tcc-eye` (the pupil group).
 * - Logo eyes rest on the socket's right edge, so they travel mostly leftward.
 * - Add `data-eye="center"` for pupils that rest in the middle; `data-travel` sets the range in SVG units.
 */
export function useCreepyEyes() {
  useEffect(() => {
    if (window.matchMedia(REDUCED_MOTION).matches) return;
    const getEyes = () => document.querySelectorAll(".tcc-eye");

    let px = window.innerWidth * 0.75;
    let py = window.innerHeight * 0.4;
    let frame = 0;

    const look = () => {
      frame = 0;
      for (const eye of getEyes()) {
        const socket = eye.parentNode.querySelector(".tcc-socket");
        if (!socket) continue;
        const r = socket.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) continue;
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const ang = Math.atan2(py - cy, px - cx);
        const dist = Math.min(1, Math.hypot(px - cx, py - cy) / 300);
        let tx;
        let ty;
        if (eye.dataset.eye === "center") {
          const travel = Number(eye.dataset.travel || 8);
          tx = Math.cos(ang) * dist * travel;
          ty = Math.sin(ang) * dist * travel;
        } else {
          tx = Math.min(8, (Math.cos(ang) * dist - 0.15) * 34 - 12);
          ty = Math.sin(ang) * dist * 26;
        }
        eye.style.transform = `translate(${tx.toFixed(1)}px, ${ty.toFixed(1)}px)`;
      }
    };
    const schedule = (e) => {
      if (e?.clientX !== undefined) {
        px = e.clientX;
        py = e.clientY;
      }
      if (!frame) frame = requestAnimationFrame(look);
    };

    const tracking = window.matchMedia(FINE_POINTER).matches;
    if (tracking) {
      window.addEventListener("pointermove", schedule, { passive: true });
      window.addEventListener("scroll", schedule, { passive: true });
    }

    let blinkTimer;
    const blink = () => {
      const eyes = getEyes();
      eyes.forEach((eye) => eye.classList.add("is-blinking"));
      setTimeout(() => eyes.forEach((eye) => eye.classList.remove("is-blinking")), 140);
      blinkTimer = setTimeout(blink, 2800 + Math.random() * 3800);
    };
    blinkTimer = setTimeout(blink, 2200);

    return () => {
      clearTimeout(blinkTimer);
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", schedule);
      window.removeEventListener("scroll", schedule);
    };
  }, []);
}
