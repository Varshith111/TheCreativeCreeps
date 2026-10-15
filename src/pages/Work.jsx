import { Link } from "react-router";
import PageHero from "../components/PageHero";
import CtaBand from "../components/CtaBand";
import { Arrow } from "../components/ui";

export default function Work() {
  return (
    <>
      <title>Work — The Creative Creeps</title>
      <PageHero
        eyebrow="Work — The exhibit"
        lines={["Work that", { text: "creeps in.", className: "hl-outline" }]}
        intro="Brands, websites and campaigns for people who would rather be remembered than blend in. Every project starts with a weird truth and ends with work that sticks."
        aside={
          <dl className="grid grid-cols-2 gap-6 border-l border-ink/20 pl-6">
            <div>
              <dt className="label text-muted">Status</dt>
              <dd className="mt-1 font-display text-4xl font-black uppercase tracking-[-.04em] text-lime-deep">Updating</dd>
            </div>
            <div>
              <dt className="label text-muted">Archive</dt>
              <dd className="mt-1 font-display text-4xl font-black uppercase tracking-[-.04em]">’25—’26</dd>
            </div>
          </dl>
        }
      />

      <section aria-label="Projects" className="pb-[clamp(96px,13vw,180px)]">
        <div className="wrap">
          <div className="relative overflow-hidden rounded-[32px] border-2 border-ink bg-paper p-[clamp(40px,7vw,96px)] text-center shadow-[6px_6px_0px_var(--color-ink)]">
            <span className="label inline-block rounded-full bg-lime px-4 py-1.5 font-bold uppercase tracking-wider text-ink">
              Archive Under Curation
            </span>
            <h2 className="mt-6 font-display text-[clamp(2.4rem,6vw,5.5rem)] font-black uppercase leading-[.9] tracking-[-.045em]">
              New cases dropping soon.
            </h2>
            <p className="mx-auto mt-6 max-w-[48ch] text-lg text-ink-2">
              We are currently curating and documenting our latest brand identities, packaging designs, websites, and campaigns.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 font-bold text-cream transition-colors duration-300 hover:bg-lime hover:text-ink"
              >
                <span>Request private deck</span>
                <Arrow />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-3 rounded-full border border-ink/30 px-8 py-4 font-bold transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-cream"
              >
                <span>Explore our services</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBand title="Want to be next?" />
    </>
  );
}
