import { useEffect, useLayoutEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import { LazyMotion, MotionConfig, domMax } from "motion/react";
import Header from "./Header";
import Footer from "./Footer";
import Cursor from "./Cursor";
import Intro, { shouldSkipIntro } from "./Intro";
import { useCreepyEyes } from "../hooks/useCreepyEyes";

/**
 * On navigation: jump to the top (or to the #hash target) before paint — so view transitions
 * snapshot the new page at the right position — then move focus to <main> for keyboard/screen-reader users.
 */
function useScrollOnNavigate() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) {
        target.scrollIntoView();
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);

  useEffect(() => {
    const main = document.getElementById("main");
    if (main && document.documentElement.classList.contains("is-loaded")) main.focus({ preventScroll: true });
  }, [pathname]);
}

export default function Layout() {
  useCreepyEyes();
  useScrollOnNavigate();

  // opening sequence: page content mounts when the intro starts revealing it,
  // so the hero's own entrance animation plays as the overlay wipes away
  const [introActive, setIntroActive] = useState(() => !shouldSkipIntro());
  const [revealed, setRevealed] = useState(() => !introActive);

  useEffect(() => {
    const raf = requestAnimationFrame(() => document.documentElement.classList.add("is-loaded"));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    // domMax includes layout animations (nav indicator); `strict` keeps us on the lightweight `m` components
    <LazyMotion features={domMax} strict>
      <MotionConfig reducedMotion="user">
        <a
          href="#main"
          className="fixed left-3 top-3 z-[200] -translate-y-[160%] rounded-full bg-ink px-4 py-2.5 text-lime transition-transform duration-300 focus:translate-y-0"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          {revealed ? <Outlet /> : <div className="min-h-svh" />}
        </main>
        <Footer />
        <Cursor />
        {introActive && <Intro onReveal={() => setRevealed(true)} onDone={() => setIntroActive(false)} />}
      </MotionConfig>
    </LazyMotion>
  );
}
