import { Reveal } from "./ui";
import { STEPS } from "../data";

/* Custom glyphs for each phase. `currentColor` = outline, `.fill-accent` = lime fill (inverts on hover). */
const stroke = { stroke: "currentColor", strokeWidth: 4, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" };

const GLYPHS = {
  // a magnifying glass whose lens is an eye
  snoop: (
    <>
      <circle cx="52" cy="52" r="32" className="fill-accent" {...stroke} fill={undefined} />
      <path d="M76 76 L104 104" {...stroke} strokeWidth="9" />
      <path d="M30 52 Q52 30 74 52 Q52 74 30 52 Z" {...stroke} fill="#fff" />
      <circle cx="56" cy="52" r="8" fill="currentColor" className="origin-[52px_52px] transition-transform duration-500 ease-creep group-hover:translate-x-[-6px]" />
    </>
  ),
  // a strategy map: nodes joined by a dotted route
  scheme: (
    <>
      <rect x="12" y="12" width="96" height="96" rx="6" {...stroke} strokeWidth="2" opacity=".35" />
      <path d="M12 44 H108 M12 76 H108 M44 12 V108 M76 12 V108" {...stroke} strokeWidth="1.5" opacity=".25" />
      <path d="M28 92 C40 60 60 88 72 56 S96 36 92 28" {...stroke} strokeDasharray="2 9" className="[stroke-dashoffset:0] group-hover:animate-[dash_1.2s_linear_infinite]" />
      <circle cx="28" cy="92" r="8" className="fill-accent" {...stroke} fill={undefined} />
      <circle cx="72" cy="56" r="6" fill="currentColor" />
      <path d="M86 16 L98 28 M98 16 L86 28" {...stroke} />
    </>
  ),
  // a bezier pen tool with handles
  craft: (
    <>
      <path d="M16 96 C36 30 84 90 104 24" {...stroke} />
      <path d="M16 96 L48 52 M104 24 L72 68" {...stroke} strokeWidth="2" opacity=".5" />
      <rect x="10" y="90" width="12" height="12" className="fill-accent" {...stroke} strokeWidth="3" fill={undefined} />
      <rect x="98" y="18" width="12" height="12" className="fill-accent" {...stroke} strokeWidth="3" fill={undefined} />
      <circle cx="48" cy="52" r="5" fill="currentColor" />
      <circle cx="72" cy="68" r="5" fill="currentColor" />
    </>
  ),
  // a paper plane leaving a trail
  unleash: (
    <>
      <path d="M14 58 L106 16 L78 104 L60 70 Z" className="fill-accent" {...stroke} fill={undefined} />
      <path d="M60 70 L106 16" {...stroke} />
      <path d="M8 96 C24 92 30 80 44 82" {...stroke} strokeDasharray="3 8" />
    </>
  ),
};

/** The four-phase process: Snoop, Scheme, Craft, Unleash. */
export default function ProcessCards({ dark = false }) {
  return (
    <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {STEPS.map(({ name, text, glyph, output }, i) => (
        <Reveal
          as="li"
          key={name}
          delay={i * 0.08}
          className={`group relative flex min-h-[380px] flex-col overflow-hidden rounded-[18px] border p-6 transition-[background-color,color,translate,rotate,box-shadow] duration-500 ease-creep hover:-translate-y-2 hover:-rotate-[1.2deg] sm:p-7 ${
            dark
              ? "border-cream/15 bg-cream/[.03] text-cream hover:bg-lime hover:text-ink"
              : "border-ink/15 bg-paper text-ink hover:bg-ink hover:text-cream hover:shadow-[10px_12px_0_var(--color-lime)]"
          }`}
        >
          <div className="flex items-start justify-between">
            <span className="font-display text-[3.4rem] font-black leading-none tracking-[-.05em] opacity-15 transition-opacity duration-500 group-hover:opacity-100">
              0{i + 1}
            </span>
            <span className="label mt-2 text-right opacity-60">Phase {i + 1}/4</span>
          </div>

          <svg
            viewBox="0 0 120 120"
            aria-hidden="true"
            className={`mx-auto my-6 w-[46%] transition-transform duration-700 ease-creep group-hover:-rotate-6 group-hover:scale-110 [&_.fill-accent]:transition-colors [&_.fill-accent]:duration-500 ${
              dark ? "[&_.fill-accent]:fill-lime group-hover:[&_.fill-accent]:fill-cream" : "[&_.fill-accent]:fill-lime"
            }`}
          >
            {GLYPHS[glyph]}
          </svg>

          <h3 className="font-display text-[clamp(2rem,2.8vw,2.6rem)] font-black uppercase leading-none tracking-[-.045em]">{name}</h3>
          <p className="mb-6 mt-3 text-[.95rem] opacity-80">{text}</p>
          <p className="label mt-auto border-t border-current/20 pt-4 opacity-70">{output}</p>
        </Reveal>
      ))}
    </ol>
  );
}
