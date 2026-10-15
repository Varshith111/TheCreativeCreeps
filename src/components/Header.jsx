import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { m } from "motion/react";
import Logo from "./Logo";
import { Arrow, Magnetic } from "./ui";
import { EMAIL, NAV, SOCIALS } from "../data";

/** Text that rolls up to a duplicate of itself on hover. */
function RollText({ children }) {
  return (
    <span className="relative block overflow-hidden">
      <span className="block transition-transform duration-500 ease-creep group-hover:-translate-y-full">{children}</span>
      <span aria-hidden="true" className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-creep group-hover:translate-y-0">
        {children}
      </span>
    </span>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { pathname } = useLocation();
  const toggleRef = useRef(null);
  const firstLinkRef = useRef(null);

  // hairline once scrolled; hide on scroll down, reveal on scroll up
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (y < 400 || y < lastY - 4) setHidden(false);
      else if (y > lastY + 4) setHidden(true);
      lastY = y;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close the mobile menu whenever the route changes
  useEffect(() => setOpen(false), [pathname]);

  // mobile menu: lock scroll, focus first link, close on Esc / desktop resize
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus({ preventScroll: true });
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const mql = window.matchMedia("(min-width: 901px)");
    const onResize = (e) => e.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    mql.addEventListener("change", onResize);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      mql.removeEventListener("change", onResize);
    };
  }, [open]);

  const isActive = (to) => (to === "/" ? pathname === "/" : pathname.startsWith(to));

  return (
    <>
      <header
        className={`sticky top-0 z-[100] h-(--header-h) border-b bg-cream/85 backdrop-blur-md transition-[border-color,translate] duration-500 ease-creep ${
          scrolled ? "border-ink/12" : "border-transparent"
        } ${hidden && !open ? "-translate-y-full" : ""}`}
      >
        <div className="wrap flex h-full items-center gap-6">
          <Link to="/" className="group flex shrink-0 items-center gap-3" aria-label="The Creative Creeps — home">
            <Logo className="w-[58px] transition-transform duration-500 ease-creep group-hover:-rotate-6 min-[901px]:w-[64px]" />
            <span className="label hidden leading-tight opacity-70 xl:block">
              The Creative
              <br />
              Creeps®
            </span>
          </Link>

          <nav aria-label="Primary" className="ml-auto hidden min-[901px]:block">
            <ul className="flex items-center gap-1 rounded-full border border-ink/12 bg-paper/60 p-1">
              {NAV.map(({ to, label }, i) => {
                const active = isActive(to);
                return (
                  <li key={to}>
                    <NavLink
                      to={to}
                      end={to === "/"}
                      className={`group relative isolate flex items-center gap-2 rounded-full px-4 py-2 text-[.92rem] font-medium transition-colors ${active ? "text-ink" : "text-ink/75 hover:text-ink"}`}
                    >
                      {active && (
                        <m.span layoutId="nav-active" className="absolute inset-0 -z-10 rounded-full bg-lime" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
                      )}
                      <span className="label text-[.62rem] opacity-50">0{i + 1}</span>
                      <RollText>{label}</RollText>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden min-[901px]:block">
            <Magnetic>
              <Link to="/contact" className="btn px-[1.3em] py-[.8em] text-[.95rem]" data-cursor="Say hi">
                <span>Let’s Talk</span>
                <Arrow />
              </Link>
            </Magnetic>
          </div>

          <button
            ref={toggleRef}
            type="button"
            className="relative ml-auto flex h-11 cursor-pointer items-center gap-3 rounded-full bg-ink pl-4 pr-3 text-cream min-[901px]:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="label">{open ? "Close" : "Menu"}</span>
            <span aria-hidden="true" className="relative size-5">
              <span className={`absolute left-0 top-1/2 h-0.5 w-5 rounded bg-current transition duration-300 ease-creep ${open ? "rotate-45 text-lime" : "-translate-y-1"}`} />
              <span className={`absolute left-0 top-1/2 h-0.5 w-5 rounded bg-current transition duration-300 ease-creep ${open ? "-rotate-45 text-lime" : "translate-y-1"}`} />
            </span>
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        inert={!open}
        className={`fixed inset-x-0 bottom-0 top-(--header-h) z-[99] flex flex-col justify-between overflow-y-auto bg-ink px-[clamp(16px,4vw,48px)] py-8 text-cream [--focus:var(--color-lime)] transition-[clip-path] duration-500 ease-swing min-[901px]:hidden ${
          open ? "[clip-path:inset(0_0_0_0)]" : "invisible [clip-path:inset(0_0_100%_0)]"
        }`}
        // visibility flips instantly on open (so links are focusable) and waits for the wipe on close
        style={{ transitionProperty: open ? "clip-path" : "clip-path, visibility" }}
      >
        <nav aria-label="Mobile">
          <ul>
            {[...NAV, { to: "/contact", label: "Let’s Talk" }].map(({ to, label }, i) => (
              <li key={to} className="border-b border-cream/12">
                <NavLink
                  ref={i === 0 ? firstLinkRef : undefined}
                  to={to}
                  end={to === "/"}
                  className="flex items-baseline justify-between py-4 font-display text-[clamp(2.4rem,12vw,3.6rem)] font-black uppercase leading-none tracking-[-.04em] hover:text-lime aria-[current=page]:text-lime"
                >
                  {label}
                  <span className="label text-cream/50">0{i + 1}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-10 grid gap-4">
          <a href={`mailto:${EMAIL}`} className="font-display text-lg font-bold">{EMAIL}</a>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {SOCIALS.map(({ label, href }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener" className="label text-cream/60 hover:text-lime">
                  {label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
