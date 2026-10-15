import Logo from "./Logo";
import { Reveal, SectionLabel } from "./ui";
import { TESTIMONIAL } from "../data";

/** Rotating circular label around the monogram — the only motion here, and a slow one. */
function Badge() {
  const text = "Kind words · Kind words · Kind words · ";
  return (
    <div className="relative size-[clamp(112px,12vw,160px)]" aria-hidden="true">
      <svg viewBox="0 0 200 200" className="absolute inset-0 animate-spin-slow">
        <defs>
          <path id="badge-circle" d="M100 100 m-78 0 a78 78 0 1 1 156 0 a78 78 0 1 1 -156 0" />
        </defs>
        <text className="fill-current font-mono text-[15px] uppercase tracking-[.22em]">
          <textPath href="#badge-circle">{text}</textPath>
        </text>
      </svg>
      <div className="absolute inset-[30%] grid place-items-center rounded-full bg-lime [--logo-bg:var(--color-lime)]">
        <Logo className="w-[72%]" />
      </div>
    </div>
  );
}

export default function Testimonial({ num = "04" }) {
  const { quote, name, role, placeholder } = TESTIMONIAL;
  return (
    <section aria-labelledby="testimonial-title" className="relative overflow-hidden py-[clamp(88px,13vw,180px)]">
      <div className="wrap">
        <SectionLabel num={num}>Social proof</SectionLabel>
        <h2 id="testimonial-title" className="sr-only">What clients say</h2>

        <div className="relative mt-[clamp(32px,5vw,64px)] grid gap-10 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-16">
          <Reveal className="flex items-start gap-6 lg:flex-col">
            <Badge />
            {placeholder && (
              <p className="label max-w-[22ch] rounded-md border border-dashed border-ink/40 px-3 py-2 text-muted">
                Placeholder — replace with an approved client quote
              </p>
            )}
          </Reveal>

          <Reveal as="figure" delay={0.1} className="relative">
            {/* oversized quotation mark */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -left-[.04em] -top-[.18em] select-none font-display text-[clamp(8rem,18vw,16rem)] font-black leading-none text-lime [-webkit-text-stroke:3px_var(--color-ink)]"
            >
              “
            </span>
            <blockquote className="relative pt-[clamp(4.5rem,10vw,9rem)]">
              <p className="font-display text-[clamp(1.7rem,3.6vw,3.4rem)] font-light leading-[1.12] tracking-[-.025em] [font-stretch:95%]">
                {quote}
              </p>
            </blockquote>
            <figcaption className="mt-10 flex items-center gap-4 border-t border-ink/15 pt-6">
              <span aria-hidden="true" className="h-px w-10 bg-ink" />
              <span>
                <strong className="block font-display text-lg font-extrabold tracking-[-.02em]">{name}</strong>
                <span className="label text-muted">{role}</span>
              </span>
            </figcaption>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
