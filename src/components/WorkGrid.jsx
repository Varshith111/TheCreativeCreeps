import { useState } from "react";
import { Link } from "react-router";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import ProjectArt, { ART_RATIO } from "./ProjectArt";
import { EASE } from "./ui";
import { FILTERS } from "../data";

/*
 * Exhibition layout on a 12-column grid: each slot sets a column span, a start column and a
 * vertical offset, so pieces hang like works on a wall rather than tiles in a row.
 */
const SLOTS = [
  "md:col-start-1 md:col-span-7",
  "md:col-start-9 md:col-span-4 md:mt-[clamp(72px,11vw,190px)]",
  "md:col-start-2 md:col-span-5 md:-mt-[clamp(24px,5vw,90px)]",
  "md:col-start-8 md:col-span-5 md:mt-[clamp(40px,6vw,110px)]",
  "md:col-start-1 md:col-span-4",
  "md:col-start-6 md:col-span-7 md:mt-[clamp(56px,9vw,160px)]",
];

export function ProjectCard({ project: p, index }) {
  const reduce = useReducedMotion();

  // cursor-responsive drift of the artwork inside its frame (no re-renders)
  const onPointerMove = (e) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${((e.clientX - r.left) / r.width - 0.5) * -18}px`);
    e.currentTarget.style.setProperty("--my", `${((e.clientY - r.top) / r.height - 0.5) * -18}px`);
  };
  const onPointerLeave = (e) => {
    e.currentTarget.style.setProperty("--mx", "0px");
    e.currentTarget.style.setProperty("--my", "0px");
  };

  const typeStyle = {
    fontStretch: p.type.stretch,
    fontWeight: p.type.weight,
    textTransform: p.type.transform,
    letterSpacing: p.type.tracking,
  };

  return (
    <Link
      to={`/work/${p.slug}`}
      viewTransition
      data-cursor="Open case"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="group block [--mx:0px] [--my:0px]"
    >
      <div className="label mb-3 flex items-center gap-3 text-muted">
        <span className="text-ink">No. {String(index + 1).padStart(2, "0")}</span>
        <span aria-hidden="true" className="h-px flex-1 bg-ink/15 transition-colors duration-500 group-hover:bg-ink" />
        <span>{p.year}</span>
      </div>

      <div
        className="relative overflow-hidden rounded-[6px] ring-1 ring-ink/10"
        style={{ backgroundColor: p.bg, aspectRatio: ART_RATIO[p.slug], viewTransitionName: `art-${p.slug}` }}
      >
        <div
          aria-hidden="true"
          className="size-full transition-[scale,translate] duration-[1100ms] ease-creep group-hover:scale-[1.06] group-focus-visible:scale-[1.06] [&>svg]:size-full"
          style={{ translate: "var(--mx) var(--my)" }}
        >
          <ProjectArt id={p.slug} />
        </div>
        {/* category tag + "open" chip that slides in */}
        <span className="label absolute left-3 top-3 rounded-full bg-cream/90 px-2.5 py-1 text-ink backdrop-blur-sm">{p.meta.split(" · ")[0]}</span>
        <span className="label absolute bottom-3 right-3 translate-y-[150%] rounded-full bg-ink px-3 py-1.5 text-lime transition-transform duration-500 ease-creep group-hover:translate-y-0 group-focus-visible:translate-y-0">
          Open case ↗
        </span>
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <h3 className="font-display text-[clamp(1.6rem,2.6vw,2.6rem)] leading-[.95] transition-colors duration-300 group-hover:text-ink/70" style={typeStyle}>
          {p.title}
        </h3>
        <span className="mt-1 flex shrink-0 -space-x-1.5" aria-hidden="true">
          {p.palette.map((c) => (
            <span key={c} className="size-4 rounded-full ring-2 ring-cream transition-transform duration-500 ease-creep group-hover:translate-y-[-2px]" style={{ backgroundColor: c }} />
          ))}
        </span>
      </div>
      <p className="mt-2 max-w-[44ch] text-[.95rem] text-muted">
        <span className="font-medium text-ink">{p.meta}</span> — {p.summary}
      </p>
    </Link>
  );
}

/** Curated, asymmetric project exhibition with optional filters. */
export default function WorkGrid({ projects, filterable = false }) {
  const [filter, setFilter] = useState("all");
  const visible = filterable ? projects.filter((p) => filter === "all" || p.cats.includes(filter)) : projects;

  return (
    <>
      {filterable && (
        <div className="mb-[clamp(40px,5vw,72px)] flex flex-wrap items-center justify-between gap-4 border-y border-ink/15 py-4">
          <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
            {FILTERS.map(({ id, label }) => {
              const on = filter === id;
              const count = id === "all" ? projects.length : projects.filter((p) => p.cats.includes(id)).length;
              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setFilter(id)}
                  className={`relative isolate cursor-pointer rounded-full border px-[18px] py-2.5 text-[.92rem] font-bold transition-colors duration-200 ${
                    on ? "border-ink text-cream" : "border-ink/25 hover:border-ink"
                  }`}
                >
                  {on && <m.span layoutId="filter-active" className="absolute inset-0 -z-10 rounded-full bg-ink" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
                  {label} <sup className="label ml-0.5 text-[.6rem] opacity-60">{String(count).padStart(2, "0")}</sup>
                </button>
              );
            })}
          </div>
          <p role="status" className="label text-muted">
            Showing {String(visible.length).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </p>
        </div>
      )}

      <ul className="grid grid-cols-1 gap-x-[clamp(16px,2.4vw,36px)] gap-y-[clamp(48px,6vw,96px)] md:grid-cols-12">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((p, i) => (
            <m.li
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.8, ease: EASE }}
              className={SLOTS[i % SLOTS.length]}
            >
              <ProjectCard project={p} index={projects.indexOf(p)} />
            </m.li>
          ))}
        </AnimatePresence>
      </ul>
    </>
  );
}
