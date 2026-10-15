import { Link } from "react-router";
import Logo from "./Logo";
import { Reveal } from "./ui";
import { ADDRESS, EMAIL, NAV, SOCIALS } from "../data";

function Column({ title, children }) {
  return (
    <div>
      <p className="label text-cream/45">{title}</p>
      <div className="mt-4">{children}</div>
    </div>
  );
}

const linkCls = "inline-block transition-[color,translate] duration-300 ease-creep hover:translate-x-1 hover:text-lime";

export default function Footer() {
  return (
    <footer className="overflow-hidden bg-ink text-cream [--focus:var(--color-lime)]">
      <div className="wrap pt-[clamp(64px,8vw,112px)]">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))]">
          <div>
            <p className="max-w-[24ch] font-display text-[clamp(1.5rem,2.4vw,2.1rem)] font-extrabold leading-[1.08] tracking-[-.03em]">
              A creative studio for brands that would rather be <span className="text-lime">remembered</span> than blend in.
            </p>
            <Link to="/contact" className="btn mt-8 border-cream bg-cream px-6 py-[.95em] text-ink" data-cursor="Let’s talk">
              <span>Start a Project</span>
            </Link>
          </div>

          <Column title="Sitemap">
            <ul className="grid gap-2">
              {[...NAV, { to: "/contact", label: "Contact" }].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className={linkCls}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </Column>

          <Column title="Social">
            <ul className="grid gap-2">
              {SOCIALS.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener" className={linkCls}>
                    {label} <span aria-hidden="true">↗</span>
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </Column>

          <Column title="Studio">
            <address className="grid gap-2 not-italic text-cream/80">
              <a href={`mailto:${EMAIL}`} className={`${linkCls} break-all`}>
                {EMAIL}
              </a>
              <span>
                {ADDRESS.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>
            </address>
          </Column>
        </div>

        {/* TCC monogram with original brand colors & restrained size */}
        <Reveal y={30} className="mt-[clamp(48px,6vw,84px)]" aria-hidden="true">
          <div className="inline-flex items-center rounded-2xl bg-cream px-8 py-5 text-ink shadow-[4px_4px_0_var(--color-lime)] [--logo-bg:var(--color-cream)] [--logo-ink:var(--color-ink)]">
            <Logo className="w-[clamp(150px,18vw,230px)]" />
          </div>
        </Reveal>

        <div className="mt-[clamp(24px,3vw,40px)] flex flex-wrap items-center justify-between gap-4 border-t border-cream/15 py-6">
          <p className="label text-cream/55">© {new Date().getFullYear()} The Creative Creeps®</p>
          <p className="label text-cream/55">Made with curiosity &amp; slightly too much coffee.</p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="label cursor-pointer text-cream transition-colors hover:text-lime"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
