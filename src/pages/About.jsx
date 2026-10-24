import PageHero from "../components/PageHero";
import Logo from "../components/Logo";
import Statement from "../components/Statement";
import Avatar from "../components/Avatar";
import ProcessCards from "../components/ProcessCards";
import CtaBand from "../components/CtaBand";
import { Reveal, SectionLabel, SectionTitle } from "../components/ui";
import { EMAIL, STUDIO_FACTS, TEAM, TIMELINE, TRAITS, VALUES } from "../data";

const VISION = [
  { text: "We imagine a world with", light: true },
  { text: "fewer beige brands —" },
  { text: "where creativity is treated as a", light: true },
  { text: "business advantage,", mark: true },
  { text: "not decoration, and the best work comes from", light: true },
  { text: "curiosity, craft and a little bit of mischief." },
];

export default function About() {
  return (
    <>
      <title>About — The Creative Creeps</title>
      <PageHero
        eyebrow="About — Who we are"
        lines={["A pack of", { text: "curious", className: "hl" }, "creeps."]}
        intro="Designers, developers and storytellers who got tired of safe ideas — helping brands get noticed, remembered and talked about."
        aside={
          <div className="relative mx-auto max-w-[420px] rotate-3 rounded-[24px] border border-ink/15 bg-paper p-8 shadow-[10px_12px_0_var(--color-ink)]">
            <Logo depth={10} className="w-full" />
            <p className="label mt-5 text-center text-muted">Fig. 02 — Yes, it’s looking at you.</p>
          </div>
        }
      />

      {/* Vision */}
      <section aria-labelledby="vision-title" className="border-t border-ink/15 py-[clamp(80px,12vw,160px)]">
        <div className="wrap">
          <SectionLabel num="01">Our vision</SectionLabel>
          <h2 id="vision-title" className="sr-only">Our vision</h2>
          <Statement segments={VISION} className="mt-[clamp(28px,4vw,56px)] !max-w-none text-[clamp(2rem,4.6vw,4.6rem)] leading-[1.02]" />

          <ul className="mt-[clamp(48px,7vw,96px)] grid border-l border-t border-ink/15 sm:grid-cols-2 lg:grid-cols-4">
            {TRAITS.map(({ name, text }, i) => (
              <Reveal as="li" key={name} delay={i * 0.07} className="border-b border-r border-ink/15 p-6 sm:p-7">
                <span className="label text-muted">T—0{i + 1}</span>
                <h3 className="mt-8 font-display text-[clamp(1.4rem,1.9vw,1.85rem)] font-black uppercase leading-[.95] tracking-[-.035em] [font-stretch:85%] [overflow-wrap:anywhere]">{name}</h3>
                <p className="mt-3 text-[.95rem] text-ink-2">{text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Story + timeline */}
      <section aria-labelledby="story-title" className="pb-[clamp(80px,12vw,160px)]">
        <div className="wrap grid gap-[clamp(40px,6vw,96px)] lg:grid-cols-2">
          <Reveal className="[&_p]:max-w-[52ch] [&_p]:text-lg [&_p]:text-ink-2 [&_p+p]:mt-5">
            <SectionTitle num="02" eyebrow="Our story" id="story-title" className="mb-8" size="md">
              Born in a
              <br />
              <span className="hl-outline">spare room</span>
            </SectionTitle>
            <p>
              The Creative Creeps started in 2026 as three friends with an unhealthy obsession with odd ideas. Everyone kept asking
              for “something different” — so we made <span className="underline-mark">different</span> our whole thing.
            </p>
            <p>
              Today we’re a small, tight-knit studio for startups, cultural brands and anyone brave enough to stand out. We stay small
              on purpose: the people you meet on the first call are the people who do the work.
            </p>
          </Reveal>

          <ol className="relative border-l border-ink/30 pl-8 sm:pl-10">
            {TIMELINE.map(({ year, text }, i) => (
              <Reveal as="li" key={year} delay={i * 0.06} className="relative pb-10 last:pb-0">
                <span aria-hidden="true" className="absolute -left-[calc(2rem+8.5px)] top-2 size-4 rounded-full border-2 border-ink bg-lime sm:-left-[calc(2.5rem+8.5px)]" />
                <span className="font-display text-[clamp(2rem,4vw,3.2rem)] font-black leading-none tracking-[-.04em]">{year}</span>
                <p className="mt-2 max-w-[44ch] text-ink-2">{text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* How the studio works */}
      <section aria-label="How the studio works" className="bg-lime py-[clamp(48px,7vw,88px)]">
        <dl className="wrap grid gap-8 sm:grid-cols-3">
          {STUDIO_FACTS.map(({ value, label }) => (
            <div key={label} className="flex flex-col-reverse border-l-2 border-ink pl-5">
              <dt className="mt-2 font-bold">{label}</dt>
              <dd className="font-display text-[clamp(3rem,7vw,6rem)] font-black leading-none tracking-[-.05em]">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Values + process */}
      <section aria-labelledby="values-title" className="bg-ink py-[clamp(80px,12vw,160px)] text-cream [--focus:var(--color-lime)]">
        <div className="wrap">
          <SectionTitle num="03" eyebrow="What we believe" id="values-title" className="mb-[clamp(40px,6vw,72px)]">
            The creep
            <br />
            <span className="text-lime">code</span>
          </SectionTitle>
          <ol className="border-t border-cream/15">
            {VALUES.map(({ name, text }, i) => (
              <Reveal
                as="li"
                key={name}
                delay={i * 0.06}
                className="group grid gap-3 border-b border-cream/15 py-[clamp(24px,3.5vw,44px)] md:grid-cols-[80px_minmax(0,1.3fr)_minmax(0,1fr)] md:items-baseline md:gap-8"
              >
                <span className="label text-lime">V—0{i + 1}</span>
                <h3 className="font-display text-[clamp(1.9rem,4.4vw,4rem)] font-black uppercase leading-[.92] tracking-[-.045em] transition-[color,translate] duration-500 ease-creep group-hover:translate-x-2 group-hover:text-lime">
                  {name}
                </h3>
                <p className="max-w-[40ch] text-cream/70">{text}</p>
              </Reveal>
            ))}
          </ol>

          <div className="mt-[clamp(72px,10vw,140px)]">
            <ProcessCards dark intro={<SectionLabel num="04" className="sm:mb-8">The process</SectionLabel>} />
          </div>
        </div>
      </section>

      {/* Team */}
      <section aria-labelledby="team-title" className="py-[clamp(80px,12vw,160px)]">
        <div className="wrap">
          <div className="mb-[clamp(40px,6vw,72px)] flex flex-wrap items-end justify-between gap-8">
            <SectionTitle num="05" eyebrow="The pack" id="team-title">
              Meet the
              <br />
              <span className="hl">creeps</span>
            </SectionTitle>
            <p className="max-w-[36ch] text-lg text-muted">Small team, big opinions. Move your cursor — they’re paying attention.</p>
          </div>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
            {TEAM.map(({ name, role, color }, i) => (
              <Reveal as="li" key={name} delay={(i % 4) * 0.08} className="group">
                <div className="aspect-square overflow-hidden rounded-[14px] ring-1 ring-ink/15 transition duration-500 ease-creep group-hover:-translate-y-1.5 group-hover:-rotate-2 group-hover:shadow-[8px_10px_0_var(--color-ink)] [&>svg]:size-full">
                  <Avatar variant={i} color={color} />
                </div>
                <h3 className="mt-4 font-display text-[clamp(1.3rem,2vw,1.75rem)] font-black uppercase tracking-[-.03em]">{name}</h3>
                <p className="mt-1 text-[.95rem] text-ink-2">{role}</p>
                <p className="label mt-2 text-muted">TCC—{String(i + 1).padStart(2, "0")}</p>
              </Reveal>
            ))}
            <Reveal as="li" delay={0.16}>
              <a
                href={`mailto:${EMAIL}?subject=Joining%20the%20pack`}
                data-cursor="Say hi"
                className="grid aspect-square place-items-center rounded-[14px] border-2 border-dashed border-ink/50 p-6 text-center transition-colors hover:border-solid hover:border-ink hover:bg-lime"
              >
                <span>
                  <span className="block font-display text-[clamp(1.6rem,3vw,2.6rem)] font-black uppercase leading-[.95] tracking-[-.04em]">You?</span>
                  <span className="mt-2 block text-sm font-medium">We’re always looking for curious people. Say hi →</span>
                </span>
              </a>
            </Reveal>
          </ul>
        </div>
      </section>

      <CtaBand title="Sound like your people?" />
    </>
  );
}
