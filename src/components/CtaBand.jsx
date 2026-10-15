import { Link } from "react-router";
import { Arrow, Magnetic, Reveal } from "./ui";

/** Closing lime band for inner pages, pointing to the full contact page. */
export default function CtaBand({ title = "Got a weird idea?" }) {
  return (
    <section aria-label="Start a project" className="relative overflow-hidden bg-lime py-[clamp(72px,10vw,140px)]">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[.22em] right-[-.04em] select-none font-display text-[clamp(8rem,24vw,24rem)] font-black uppercase leading-none tracking-[-.06em] text-ink/[.06] [font-stretch:75%]"
      >
        TCC
      </span>
      <div className="wrap relative flex flex-wrap items-end justify-between gap-10">
        <Reveal>
          <p className="label">Next step</p>
          <h2 className="mt-4 font-display text-[clamp(2.6rem,7vw,6.6rem)] font-black uppercase leading-[.86] tracking-[-.05em] [font-stretch:85%]">
            {title}
            <br />
            <span className="font-extralight [font-stretch:110%]">Let’s make it creep.</span>
          </h2>
        </Reveal>
        <Magnetic>
          <Link to="/contact" className="btn px-[1.8em] py-[1.1em] text-lg" data-cursor="Let’s go">
            <span>Start a Project</span>
            <Arrow />
          </Link>
        </Magnetic>
      </div>
    </section>
  );
}
