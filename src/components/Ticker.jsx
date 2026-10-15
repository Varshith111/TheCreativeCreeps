import { Fragment } from "react";
import { TICKER } from "../data";

/** Slim, slow ticker between two hairlines. Pauses on hover; static with reduced motion. */
export default function Ticker({ items = TICKER, tone = "light" }) {
  const loop = [...items, ...items];
  const dark = tone === "dark";
  return (
    <div aria-hidden="true" className={`group overflow-hidden border-y ${dark ? "border-cream/15 bg-ink text-cream" : "border-ink/12"}`}>
      <div className="flex w-max animate-marquee items-center gap-6 py-3 group-hover:[animation-play-state:paused]">
        {loop.map((item, i) => (
          <Fragment key={i}>
            <span className="label whitespace-nowrap text-[.78rem]">{item}</span>
            <span className={`size-1.5 rounded-full ${dark ? "bg-lime" : "bg-lime-deep"}`} />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
