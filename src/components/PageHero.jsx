import { SectionLabel, TitleLines } from "./ui";

/** Top-of-page hero for inner pages: editorial label, giant title, intro, optional aside. */
export default function PageHero({ eyebrow, num, lines, intro, aside, dark = false, compact = false, children }) {
  return (
    <section
      className={`relative overflow-hidden ${compact ? "pb-[clamp(32px,4vw,56px)] pt-[clamp(32px,5vw,72px)]" : "pb-[clamp(56px,8vw,110px)] pt-[clamp(32px,5vw,72px)]"} ${
        dark ? "mx-[clamp(8px,1.5vw,20px)] mt-2 rounded-[clamp(20px,3vw,40px)] bg-ink text-cream [--focus:var(--color-lime)] [--logo-bg:var(--color-ink)]" : ""
      }`}
    >
      <div className="wrap">
        <SectionLabel num={num} className={`animate-fade-up ${dark ? "text-cream" : ""}`}>
          {eyebrow}
        </SectionLabel>
        <div className="mt-[clamp(28px,4vw,56px)] grid items-end gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <TitleLines lines={lines} className={compact ? "text-[clamp(3rem,8vw,7.4rem)]" : "text-[clamp(3.2rem,11vw,10.5rem)]"} />
          {aside && <div className="animate-fade-up [animation-delay:.4s]">{aside}</div>}
        </div>
        {intro && (
          <p
            className={`mt-[clamp(28px,4vw,48px)] max-w-[52ch] animate-fade-up text-[clamp(1.05rem,1rem+.4vw,1.35rem)] leading-[1.45] [animation-delay:.35s] ${
              dark ? "text-cream/75" : "text-ink-2"
            }`}
          >
            {intro}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
