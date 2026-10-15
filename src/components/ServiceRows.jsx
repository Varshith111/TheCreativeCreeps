import { Link } from "react-router";
import ServiceIcon from "./ServiceIcon";
import { Arrow, Reveal } from "./ui";
import { SERVICES } from "../data";

/**
 * Large interactive service rows on black. Hover / keyboard focus expands a row to reveal
 * its description, tags and a custom illustration. On touch screens rows are always open.
 */
export default function ServiceRows() {
  return (
    <ul className="border-t border-cream/15">
      {SERVICES.map(({ slug, name, text, tags, icon }, i) => (
        <Reveal as="li" key={slug} delay={i * 0.05} className="relative border-b border-cream/15">
          <Link
            to={`/services#${slug}`}
            data-cursor="Explore"
            className="group relative grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-x-4 py-[clamp(20px,2.8vw,34px)] outline-offset-4 sm:gap-x-8"
          >
            {/* lime rule that draws across the row */}
            <span aria-hidden="true" className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-lime transition-transform duration-700 ease-creep group-hover:scale-x-100 group-focus-visible:scale-x-100" />

            <span className="label pt-[.9em] text-cream/50 transition-colors duration-300 group-hover:text-lime group-focus-visible:text-lime">S—0{i + 1}</span>

            <div className="min-w-0">
              <h3 className="font-display text-[clamp(1.9rem,5.2vw,5rem)] font-black uppercase leading-[.92] tracking-[-.045em] transition-[translate,color] duration-500 ease-creep group-hover:translate-x-3 group-hover:text-lime group-focus-visible:translate-x-3 group-focus-visible:text-lime">
                {name}
              </h3>

              {/* expanding detail */}
              <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-creep group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr] [@media(hover:none)]:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <div className="flex flex-wrap items-end gap-x-10 gap-y-4 pt-5 opacity-0 transition-opacity delay-100 duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 sm:pl-3 [@media(hover:none)]:opacity-100">
                    <p className="max-w-[46ch] text-[1.02rem] leading-relaxed text-cream/75">{text}</p>
                    <ul className="flex flex-wrap gap-1.5">
                      {tags.map((t) => (
                        <li key={t} className="label rounded-full border border-cream/25 px-3 py-1.5 text-cream/80">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 pt-1">
              {/* custom visual: slides and spins in on hover */}
              <span className="pointer-events-none hidden w-[clamp(64px,7vw,104px)] -translate-x-4 -rotate-12 scale-75 rounded-2xl bg-cream p-2.5 opacity-0 transition duration-500 ease-creep group-hover:translate-x-0 group-hover:rotate-0 group-hover:scale-100 group-hover:opacity-100 md:block">
                <ServiceIcon icon={icon} className="w-full" />
              </span>
              <span className="grid size-[clamp(40px,4vw,56px)] shrink-0 place-items-center rounded-full border border-cream/25 transition duration-500 ease-creep group-hover:-rotate-45 group-hover:border-lime group-hover:bg-lime group-hover:text-ink group-focus-visible:bg-lime group-focus-visible:text-ink">
                <Arrow />
              </span>
            </div>
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}
