import { useEffect, useState } from "react";
import { Link } from "react-router";
import PageHero from "../components/PageHero";
import ServiceIcon from "../components/ServiceIcon";
import ProcessCards from "../components/ProcessCards";
import CtaBand from "../components/CtaBand";
import { Reveal, SectionTitle } from "../components/ui";
import { ENGAGEMENTS, FAQS, SERVICES } from "../data";

/** Tracks which service block is in the middle of the viewport. */
function useActiveService() {
  const [active, setActive] = useState(SERVICES[0].slug);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    SERVICES.forEach(({ slug }) => {
      const el = document.getElementById(slug);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return active;
}

function ServiceBlock({ service: s, index }) {
  return (
    <article id={s.slug} aria-labelledby={`${s.slug}-title`} className="scroll-mt-[calc(var(--header-h)+24px)] border-t-2 border-ink py-[clamp(40px,6vw,80px)] first:border-t-0 first:pt-0">
      <Reveal className="grid gap-8 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
        <div>
          <span className="text-sm font-bold tracking-[.1em] text-muted">0{index + 1} / 0{SERVICES.length}</span>
          <h2 id={`${s.slug}-title`} className="mt-3 font-display text-[clamp(2.4rem,5vw,4.6rem)] font-black uppercase leading-[.9] tracking-[-.045em]">
            {s.name}
          </h2>
        </div>
        <ServiceIcon icon={s.icon} className="w-[clamp(96px,12vw,150px)] -rotate-6 transition-transform duration-500 ease-creep hover:rotate-6 hover:scale-110" />
      </Reveal>

      <Reveal delay={0.06}>
        <p className="mt-6 max-w-[58ch] text-[clamp(1.05rem,1rem+.35vw,1.3rem)] leading-[1.55] text-ink-2">{s.intro}</p>
      </Reveal>

      <Reveal delay={0.1} className="mt-8 rounded-[22px] bg-paper p-6 ring-2 ring-ink sm:p-8">
        <h3 className="text-sm font-bold uppercase tracking-[.14em]">What you get</h3>
        <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {s.deliverables.map((d) => (
            <li key={d} className="flex items-center gap-3 border-b border-ink/10 pb-3">
              <span aria-hidden="true" className="size-2.5 shrink-0 rounded-full bg-lime-deep ring-2 ring-ink" />
              {d}
            </li>
          ))}
        </ul>
      </Reveal>
    </article>
  );
}

function Faq({ q, a }) {
  return (
    <details className="group border-b-2 border-ink [&_summary::-webkit-details-marker]:hidden">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-display text-[clamp(1.2rem,2.2vw,1.75rem)] font-extrabold tracking-[-.02em] transition-colors hover:text-lime-deep">
        {q}
        <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-full border-2 border-ink text-xl transition-transform duration-300 group-open:rotate-45 group-open:bg-lime">
          +
        </span>
      </summary>
      <p className="max-w-[65ch] pb-7 text-lg text-ink-2">{a}</p>
    </details>
  );
}

export default function Services() {
  const active = useActiveService();

  return (
    <>
      <title>Services — The Creative Creeps</title>
      <PageHero
        dark
        eyebrow="Services — What we do"
        lines={["6 ways", { text: "to haunt", className: "hl-flat" }, "your market."]}
        intro="From the first sketch to the last line of code, we cover the full creative stack — so your brand looks, sounds and behaves like one thing."
        aside={
          <ul className="grid grid-cols-3 gap-3">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <a href={`#${s.slug}`} className="group grid aspect-square place-items-center rounded-2xl bg-cream/5 ring-1 ring-cream/15 transition hover:bg-lime" title={s.name}>
                  <ServiceIcon icon={s.icon} className="w-3/5 transition-transform duration-500 ease-creep group-hover:scale-110" />
                  <span className="sr-only">{s.name}</span>
                </a>
              </li>
            ))}
            <li>
              <Link
                to="/contact"
                data-cursor="Let’s talk"
                className="group grid aspect-square place-content-center gap-1 rounded-2xl bg-lime p-3 text-center text-ink transition hover:bg-cream"
              >
                <span className="label">Start a project</span>
                <span aria-hidden="true" className="text-2xl transition-transform duration-500 ease-creep group-hover:translate-x-1">→</span>
              </Link>
            </li>
          </ul>
        }
      />

      {/* Index + detailed services */}
      <section aria-label="Services in detail" className="py-[clamp(64px,10vw,140px)]">
        <div className="wrap grid gap-12 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-20">
          <nav aria-label="Services index" className="hidden lg:block">
            <ol className="sticky top-[calc(var(--header-h)+32px)] grid gap-1">
              {SERVICES.map((s, i) => {
                const on = active === s.slug;
                return (
                  <li key={s.slug}>
                    <a
                      href={`#${s.slug}`}
                      aria-current={on ? "true" : undefined}
                      className={`flex items-center gap-3 rounded-full px-4 py-2.5 font-bold transition-colors ${on ? "bg-ink text-lime" : "hover:bg-cream-2"}`}
                    >
                      <span className={`text-xs ${on ? "text-lime" : "text-muted"}`}>0{i + 1}</span>
                      {s.name}
                    </a>
                  </li>
                );
              })}
            </ol>
          </nav>

          <div>
            {SERVICES.map((s, i) => (
              <ServiceBlock key={s.slug} service={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section aria-labelledby="process-title" className="rounded-t-[clamp(24px,4vw,48px)] bg-ink py-[clamp(80px,12vw,160px)] text-cream [--focus:var(--color-lime)]">
        <div className="wrap">
          <div className="mb-[clamp(40px,6vw,72px)] flex flex-wrap items-end justify-between gap-8">
            <SectionTitle num="01" eyebrow="How we work" id="process-title">
              The <span className="hl-flat">process</span>
            </SectionTitle>
            <p className="max-w-[38ch] text-lg text-cream/60">Every project, big or small, moves through the same four phases. No black boxes, no big reveal surprises.</p>
          </div>
          <ProcessCards dark />
        </div>
      </section>

      {/* Engagement models */}
      <section aria-labelledby="engage-title" className="py-[clamp(80px,12vw,160px)]">
        <div className="wrap">
          <SectionTitle num="02" eyebrow="Ways to work together" id="engage-title" className="mb-[clamp(40px,6vw,72px)]">
            Pick your <span className="hl-outline">poison</span>
          </SectionTitle>
          <ul className="grid gap-4 md:grid-cols-3">
            {ENGAGEMENTS.map((e, i) => (
              <Reveal
                as="li"
                key={e.name}
                delay={i * 0.08}
                className={`relative flex flex-col rounded-[22px] border-2 border-ink p-8 ${e.featured ? "bg-lime shadow-[8px_10px_0_var(--color-ink)]" : "bg-paper"}`}
              >
                {e.featured && (
                  <span className="absolute -top-3.5 right-6 rotate-3 rounded-full bg-ink px-3 py-1 text-xs font-bold uppercase tracking-[.12em] text-lime">Most popular</span>
                )}
                <span className="text-sm font-bold uppercase tracking-[.14em]">{e.time}</span>
                <h3 className="mt-10 font-display text-[clamp(2.4rem,4vw,3.4rem)] font-black uppercase leading-none tracking-[-.045em]">{e.name}</h3>
                <p className="mt-4 text-ink-2">{e.text}</p>
                <p className="mt-auto pt-8 text-sm">
                  <span className="text-muted">Best for</span> <strong>{e.best}</strong>
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-title" className="pb-[clamp(80px,12vw,160px)]">
        <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div>
            <SectionTitle num="03" eyebrow="FAQ" id="faq-title" size="md">
              Burning
              <br />
              questions
            </SectionTitle>
            <p className="mt-6 max-w-[34ch] text-muted">
              Didn’t find yours?{" "}
              <Link to="/contact" className="link-underline text-ink">
                Just ask us
              </Link>
              .
            </p>
          </div>
          <div className="border-t-2 border-ink">
            {FAQS.map((f) => (
              <Faq key={f.q} {...f} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Know what you need?" />
    </>
  );
}
