import { CS, T } from "./logoGeometry";

/**
 * TCC monogram, drawn from the exact traced logo geometry (see logoGeometry.js).
 * Eyes (.tcc-eye) are animated by useCreepyEyes.
 * - Flat (default): the brand mark, used in nav, footer and badges.
 * - `depth` > 0: a 3D-style "sculpture" — stacked extrusion layers and a lime rim light —
 *   used as the hero centrepiece.
 */

const VIEWBOX_FLAT = "100 352 1040 520";
const VIEWBOX_SCULPT = "90 340 1110 590";

/**
 * One C's eye: the socket, then the pupil group (lime crescent, pupil, highlight) that moves.
 * `bare` leaves the socket unfilled (no white eye background) — it still anchors eye tracking.
 */
export function Eye({ c, bare = false }) {
  const { socket, lime, pupil: p, highlight: h } = c;
  return (
    <g>
      <path className={bare ? "tcc-socket" : "tcc-white tcc-socket"} d={socket} fill={bare ? "none" : undefined} />
      <g className="tcc-eye">
        <path className="tcc-lime" d={lime} />
        <ellipse cx={p.cx} cy={p.cy} rx={p.rx} ry={p.ry} transform={`rotate(${p.rotate} ${p.cx} ${p.cy})`} fill="var(--color-ink)" />
        <ellipse className="tcc-white" cx={h.cx} cy={h.cy} rx={h.rx} ry={h.ry} transform={`rotate(${h.rotate} ${h.cx} ${h.cy})`} />
      </g>
    </g>
  );
}

/** The letterforms of the mark (T + both C rings), without eyes. */
function Letters({ className }) {
  return (
    <>
      <path className={className} d={T} />
      {CS.map((c, i) => (
        <path key={i} className={className} d={c.ring} />
      ))}
    </>
  );
}

/** Interpolate between two hex colours. */
function mix(a, b, t) {
  const pa = a.match(/\w\w/g).map((h) => parseInt(h, 16));
  const pb = b.match(/\w\w/g).map((h) => parseInt(h, 16));
  return `rgb(${pa.map((v, i) => Math.round(v + (pb[i] - v) * t)).join(",")})`;
}

export default function Logo({ className = "", title, depth = 0 }) {
  const a11y = {
    role: title ? "img" : undefined,
    "aria-label": title,
    "aria-hidden": title ? undefined : true,
    focusable: "false",
  };

  if (depth > 0) {
    return (
      <svg className={`tcc h-auto overflow-visible ${className}`} viewBox={VIEWBOX_SCULPT} {...a11y}>
        {/* extrusion: back layers first, darkest at the back */}
        {Array.from({ length: depth }, (_, i) => {
          const k = depth - i;
          return (
            <g key={k} transform={`translate(${k * 2.6} ${k * 3.2})`} fill={mix("2e2d2a", "0b0b0a", k / depth)}>
              <Letters />
            </g>
          );
        })}
        {/* lime rim light on the top-left edges */}
        <g transform="translate(-5 -6)" fill="var(--color-lime)">
          <Letters />
        </g>
        {/* face — eyes without the white socket background */}
        <Letters className="tcc-ink" />
        {CS.map((c, i) => (
          <Eye key={i} c={c} bare />
        ))}
      </svg>
    );
  }

  return (
    <svg className={`tcc h-auto ${className}`} viewBox={VIEWBOX_FLAT} {...a11y}>
      <Letters className="tcc-ink" />
      {CS.map((c, i) => (
        <Eye key={i} c={c} />
      ))}
    </svg>
  );
}
