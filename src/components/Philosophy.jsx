import { Link } from "react-router";
import Statement from "./Statement";
import { Arrow, Reveal, SectionLabel } from "./ui";
import { STUDIO_FACTS, TRAITS } from "../data";

const MANIFESTO = [
  { text: "We’re", light: true },
  { text: "a small pack of designers, developers and storytellers." },
  { text: "We are", light: true },
  { text: "curious, strategic, unconventional" },
  { text: "and", light: true },
  { text: "obsessed with craft —", mark: true },
  { text: "because the scariest thing a brand can be is", light: true },
  { text: "forgettable." },
];

export default function Philosophy() {
  return (
    <section id="intro" aria-labelledby="philosophy-title" className="py-[clamp(88px,13vw,180px)]">
      <div className="wrap">
        <SectionLabel num="01">Studio — Philosophy</SectionLabel>
        <h2 id="philosophy-title" className="sr-only">Our philosophy</h2>

        <div className="mt-[clamp(32px,5vw,72px)] grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.6fr)] lg:gap-16">
          {/* side column */}
          <Reveal className="order-2 lg:order-1">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+32px)]">
              <p className="max-w-[30ch] text-ink-2">
                TCC is a creative studio for brands that would rather be remembered than blend in. Strategy, design, code and social under one roof.
              </p>
              <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-ink/15 pt-6 lg:grid-cols-1 lg:gap-5">
                {STUDIO_FACTS.map(({ value, label }) => (
                  <div key={label} className="flex flex-col-reverse gap-1 lg:flex-row-reverse lg:items-baseline lg:justify-end lg:gap-4">
                    <dt className="text-sm text-muted">{label}</dt>
                    <dd className="font-display text-[2.2rem] font-black leading-none tracking-[-.04em]">{value}</dd>
                  </div>
                ))}
              </dl>
              <Link to="/about" className="group mt-8 inline-flex items-center gap-2 font-bold" data-cursor="About us">
                <span className="link-underline">Meet the studio</span>
                <Arrow className="group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <Statement segments={MANIFESTO} className="!max-w-none text-[clamp(2rem,4.6vw,4.6rem)] leading-[1.02]" />
          </div>
        </div>

        {/* personality traits */}
        <ul className="mt-[clamp(56px,8vw,112px)] grid border-l border-t border-ink/15 sm:grid-cols-2 lg:grid-cols-4">
          {TRAITS.map(({ name, text }, i) => (
            <Reveal
              as="li"
              key={name}
              delay={i * 0.07}
              className="group relative isolate overflow-hidden border-b border-r border-ink/15 p-6 before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:bg-lime before:transition-transform before:duration-500 before:ease-creep hover:before:scale-x-100 sm:p-7"
            >
              <span className="label text-muted transition-colors group-hover:text-ink">T—0{i + 1}</span>
              <h3 className="mt-10 font-display text-[clamp(1.4rem,1.9vw,1.85rem)] font-black uppercase leading-[.95] tracking-[-.035em] [font-stretch:85%] [overflow-wrap:anywhere]">{name}</h3>
              <p className="mt-3 text-[.95rem] text-ink-2">{text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
