import { Link, useParams } from "react-router";
import { m } from "motion/react";
import ProjectArt, { ART_RATIO } from "../components/ProjectArt";
import CtaBand from "../components/CtaBand";
import NotFound from "./NotFound";
import { Arrow, EASE, Reveal, SectionLabel } from "../components/ui";
import { PROJECTS } from "../data";

function Chapter({ num, title, children }) {
  return (
    <Reveal className="grid gap-4 border-t border-ink/15 py-[clamp(32px,5vw,64px)] md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-10">
      <h2 className="flex items-baseline gap-3 font-display text-[clamp(1.6rem,3vw,2.6rem)] font-black uppercase leading-none tracking-[-.04em]">
        <span className="label text-muted">{num}</span>
        {title}
      </h2>
      <p className="max-w-[56ch] text-[clamp(1.1rem,1rem+.45vw,1.45rem)] leading-[1.5] text-ink-2">{children}</p>
    </Reveal>
  );
}

export default function CaseStudy() {
  const { slug } = useParams();
  const index = PROJECTS.findIndex((p) => p.slug === slug);
  if (index === -1) return <NotFound />;

  const p = PROJECTS[index];
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  // the project's own typographic voice, from data.js
  const type = { fontStretch: p.type.stretch, fontWeight: p.type.weight, textTransform: p.type.transform, letterSpacing: p.type.tracking };

  return (
    <>
      <title>{`${p.title} — The Creative Creeps`}</title>

      <article>
        <header className="pb-[clamp(32px,5vw,64px)] pt-[clamp(28px,4vw,56px)]">
          <div className="wrap">
            <div className="flex items-center justify-between gap-4">
              <Link to="/work" viewTransition className="group label inline-flex items-center gap-2" data-cursor="Back">
                <Arrow className="rotate-180 group-hover:-translate-x-1" /> All work
              </Link>
              <span className="label text-muted">
                Case {String(index + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
              </span>
            </div>

            <m.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
              className="mt-[clamp(28px,4vw,56px)] max-w-[16ch] font-display text-[clamp(3rem,10vw,9.5rem)] leading-[.86]"
              style={type}
            >
              {p.title}
            </m.h1>

            <div className="mt-[clamp(28px,4vw,48px)] grid gap-8 border-t border-ink/15 pt-6 md:grid-cols-[minmax(0,1.3fr)_minmax(0,2fr)]">
              <p className="max-w-[36ch] text-[clamp(1.1rem,1rem+.5vw,1.45rem)] leading-[1.4] text-ink-2">{p.summary}</p>
              <dl className="grid grid-cols-2 gap-6 sm:grid-cols-3">
                {[
                  ["Year", p.year],
                  ["Discipline", p.meta],
                  ["Services", p.services.join(", ")],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="label text-muted">{k}</dt>
                    <dd className="mt-1.5 font-semibold">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </header>

        {/* hero artwork — the card from the grid morphs into this frame */}
        <div className="px-[clamp(8px,1.5vw,20px)]">
          <div className="grid place-items-center overflow-hidden rounded-[clamp(18px,3vw,36px)] px-[6%] py-[clamp(32px,6vw,88px)]" style={{ backgroundColor: p.bg }}>
            <div
              className="overflow-hidden rounded-[6px] shadow-[0_40px_80px_-30px_rgba(0,0,0,.5)] [&>svg]:size-full"
              // fit within the panel width and 78% of the viewport height, keeping the artwork's proportions
              style={{
                aspectRatio: ART_RATIO[p.slug],
                width: `min(100%, 1000px, calc(78svh * ${ART_RATIO[p.slug]}))`,
                viewTransitionName: `art-${p.slug}`,
              }}
              aria-hidden="true"
            >
              <ProjectArt id={p.slug} />
            </div>
          </div>
        </div>

        <div className="wrap py-[clamp(64px,9vw,128px)]">
          <SectionLabel num="A">The story</SectionLabel>
          <div className="mt-6">
            <Chapter num="01" title="The brief">{p.challenge}</Chapter>
            <Chapter num="02" title="The idea">{p.idea}</Chapter>
            <Chapter num="03" title="The work">{p.work}</Chapter>
          </div>

          {/* the project's own identity: palette + type voice */}
          <SectionLabel num="B" className="mt-[clamp(48px,7vw,96px)]">Identity kit</SectionLabel>
          <div className="mt-6 grid gap-3 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            <Reveal className="rounded-[14px] border border-ink/15 bg-paper p-6">
              <h3 className="label">Palette</h3>
              <ul className="mt-5 grid grid-cols-4 gap-3">
                {p.palette.map((c) => (
                  <li key={c}>
                    <span className="block aspect-[3/4] rounded-lg ring-1 ring-ink/15" style={{ backgroundColor: c }} />
                    <span className="label mt-2 block text-muted">{c}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.08} className="flex min-h-[260px] flex-col justify-between rounded-[14px] p-6" style={{ backgroundColor: p.palette[0], color: p.palette[1] }}>
              <h3 className="label">Type voice</h3>
              <p className="font-display text-[clamp(4rem,9vw,7.5rem)] leading-none" style={type}>
                Aa
              </p>
              <p className="label">
                Archivo · {p.type.stretch} width · {p.type.weight}
              </p>
            </Reveal>
          </div>
        </div>

        {/* next project */}
        <Link to={`/work/${next.slug}`} viewTransition className="group block border-t border-ink/15" data-cursor="Next case">
          <div className="wrap grid items-center gap-8 py-[clamp(48px,7vw,104px)] md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
            <div>
              <p className="label text-muted">Next case →</p>
              <p className="mt-3 font-display text-[clamp(2.4rem,6.5vw,6rem)] leading-[.9] transition-colors group-hover:text-ink/70" style={{ fontStretch: next.type.stretch, fontWeight: next.type.weight, textTransform: next.type.transform, letterSpacing: next.type.tracking }}>
                {next.title}
              </p>
              <p className="mt-3 text-muted">{next.meta}</p>
            </div>
            <div className="overflow-hidden rounded-[6px] ring-1 ring-ink/10" style={{ backgroundColor: next.bg, aspectRatio: 16 / 7 }}>
              <div className="size-full transition-transform duration-1000 ease-creep group-hover:scale-105 [&>svg]:size-full" aria-hidden="true">
                <ProjectArt id={next.slug} />
              </div>
            </div>
          </div>
        </Link>
      </article>

      <CtaBand title="Like what you see?" />
    </>
  );
}
