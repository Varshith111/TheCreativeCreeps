/**
 * Vector TCC monogram. Eyes (.tcc-eye) are animated by useCreepyEyes.
 * - Flat (default): the brand mark, used in nav and footer.
 * - `depth` > 0: a 3D-style "sculpture" — stacked extrusion layers, a lime rim light
 *   and carved seams — used as the hero centrepiece.
 */
const T_PATH =
  "M122,468 L496,370 Q510,367 509,381 L504,520 L396,540 L403,842 Q404,856 390,853 L242,820 Q232,817 232,806 L232,574 L128,597 Q113,600 113,586 L113,482 Q113,470 122,468 Z";

const C1 = { cx: 594, rx: 186, ry: 211, clip: "tcc-c1", offset: 0 };
const C2 = { cx: 924, rx: 190, ry: 211, clip: "tcc-c2", offset: 1 };

function Eye({ c }) {
  const { cx, offset } = c;
  return (
    <>
      <circle className="tcc-white tcc-socket" cx={cx + 31 + offset} cy="652" r="78" />
      <g className="tcc-eye">
        <ellipse className="tcc-lime" cx={cx + 94 + offset} cy="658" rx="36" ry="58" />
        <ellipse cx={cx + 109 + offset} cy="658" rx="30" ry="57" fill="var(--color-ink)" />
        <ellipse className="tcc-white" cx={cx + 122 + offset} cy="640" rx="7" ry="12" />
      </g>
    </>
  );
}

/** Solid silhouette of the whole mark (no eyes), used for extrusion and rim layers. */
function Silhouette() {
  return (
    <>
      <path d={T_PATH} />
      {[C1, C2].map((c) => (
        <ellipse key={c.clip} clipPath={`url(#${c.clip})`} cx={c.cx} cy="654" rx={c.rx} ry={c.ry} />
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

function SculptFace() {
  const seam = "var(--logo-bg, var(--color-cream))";
  return (
    <>
      <path className="tcc-ink" d={T_PATH} />
      {/* seam where the first C cuts into the T */}
      <g clipPath="url(#tcc-t-shape)">
        <ellipse fill={seam} clipPath="url(#tcc-c1)" cx={C1.cx} cy="654" rx={C1.rx + 11} ry={C1.ry + 11} />
      </g>
      <ellipse className="tcc-ink" clipPath="url(#tcc-c1)" cx={C1.cx} cy="654" rx={C1.rx} ry={C1.ry} />
      <Eye c={C1} />
      {/* seam where the second C cuts into the first */}
      <g clipPath="url(#tcc-c1-shape)">
        <g clipPath="url(#tcc-c1)">
          <ellipse fill={seam} clipPath="url(#tcc-c2)" cx={C2.cx} cy="654" rx={C2.rx + 11} ry={C2.ry + 11} />
        </g>
      </g>
      <ellipse className="tcc-ink" clipPath="url(#tcc-c2)" cx={C2.cx} cy="654" rx={C2.rx} ry={C2.ry} />
      <Eye c={C2} />
    </>
  );
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
      <svg className={`tcc h-auto overflow-visible ${className}`} viewBox="90 340 1110 590" {...a11y}>
        {/* extrusion: back layers first, darkest at the back */}
        {Array.from({ length: depth }, (_, i) => {
          const k = depth - i;
          return (
            <g key={k} transform={`translate(${k * 2.6} ${k * 3.2})`} fill={mix("2e2d2a", "0b0b0a", k / depth)}>
              <Silhouette />
            </g>
          );
        })}
        {/* lime rim light on the top-left edges */}
        <g transform="translate(-5 -6)" fill="var(--color-lime)">
          <Silhouette />
        </g>
        <SculptFace />
      </svg>
    );
  }

  return (
    <svg className={`tcc h-auto ${className}`} viewBox="100 352 1040 520" {...a11y}>
      <path className="tcc-ink" d={T_PATH} />
      {[C1, C2].map((c) => (
        <g key={c.clip}>
          <ellipse className="tcc-ink tcc-gap" clipPath={`url(#${c.clip})`} cx={c.cx} cy="654" rx={c.rx} ry={c.ry} />
          <Eye c={c} />
        </g>
      ))}
    </svg>
  );
}

/** Shared clip paths for every logo instance. Render once per page. */
export function LogoDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
      {/* cut the mouth out of each C */}
      <clipPath id="tcc-c1">
        <path clipRule="evenodd" d="M0,0 H1300 V1000 H0 Z M700,655 L860,340 L860,970 Z" />
      </clipPath>
      <clipPath id="tcc-c2">
        <path clipRule="evenodd" d="M0,0 H1300 V1000 H0 Z M1030,655 L1190,340 L1190,970 Z" />
      </clipPath>
      {/* letter shapes, used to keep seams inside the letter they cut into */}
      <clipPath id="tcc-t-shape">
        <path d={T_PATH} />
      </clipPath>
      <clipPath id="tcc-c1-shape">
        <ellipse cx={C1.cx} cy="654" rx={C1.rx} ry={C1.ry} />
      </clipPath>
    </svg>
  );
}
