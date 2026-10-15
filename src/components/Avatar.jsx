/* Placeholder team portraits: little creeps whose eyes follow the pointer (via useCreepyEyes).
   Swap for real photos when you have them. */

const BODIES = [
  // blob
  "M100 46 C150 46 168 90 166 140 C164 180 140 200 100 200 C60 200 36 180 34 140 C32 90 50 46 100 46 Z",
  // ghost
  "M44 200 V108 C44 64 70 40 100 40 C130 40 156 64 156 108 V200 L136 184 L118 200 L100 184 L82 200 L64 184 Z",
  // tall bean with antennae base
  "M100 58 C138 58 152 88 152 130 V200 H48 V130 C48 88 62 58 100 58 Z",
];

const EXTRAS = [
  <path key="hair" d="M70 52 L78 30 L90 48 L100 24 L110 48 L122 30 L130 52" fill="none" stroke="var(--color-ink)" strokeWidth="6" strokeLinejoin="round" strokeLinecap="round" />,
  null,
  <g key="antennae" stroke="var(--color-ink)" strokeWidth="6" strokeLinecap="round">
    <path d="M82 60 L68 30" />
    <path d="M118 60 L132 30" />
    <circle cx="66" cy="26" r="7" fill="var(--color-lime)" />
    <circle cx="134" cy="26" r="7" fill="var(--color-lime)" />
  </g>,
];

function Eye({ cx, cy, r }) {
  return (
    <g>
      <circle className="tcc-socket" cx={cx} cy={cy} r={r} fill="#fff" />
      <g className="tcc-eye" data-eye="center" data-travel={r * 0.45}>
        <circle cx={cx} cy={cy} r={r * 0.48} fill="var(--color-ink)" />
        <circle cx={cx + r * 0.18} cy={cy - r * 0.2} r={r * 0.14} fill="#fff" />
      </g>
    </g>
  );
}

export default function Avatar({ variant = 0, color }) {
  const v = variant % BODIES.length;
  const eyeY = v === 1 ? 104 : 116;
  return (
    <svg viewBox="0 0 200 200" className="tcc size-full" aria-hidden="true">
      <rect width="200" height="200" fill={color} />
      {EXTRAS[v]}
      <path d={BODIES[v]} fill="var(--color-ink)" />
      <Eye cx={80} cy={eyeY} r={v === 2 ? 17 : 21} />
      <Eye cx={122} cy={eyeY} r={v === 2 ? 17 : 21} />
      <path d={`M88 ${eyeY + 40} Q101 ${eyeY + (v === 1 ? 46 : 52)} 114 ${eyeY + 40}`} fill="none" stroke="var(--color-lime)" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}
