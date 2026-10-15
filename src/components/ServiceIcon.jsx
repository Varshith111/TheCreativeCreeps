/* Illustrations for each service. Ink outlines + lime fills, each with a pair of creepy eyes. */

const ink = "var(--color-ink)";
const lime = "var(--color-lime)";
const stroke = { stroke: ink, strokeWidth: 5, strokeLinejoin: "round", strokeLinecap: "round" };

function Eyes({ x, y, gap = 22, r = 9 }) {
  return (
    <g>
      {[0, gap].map((dx) => (
        <g key={dx}>
          <circle cx={x + dx} cy={y} r={r} fill="#fff" {...stroke} strokeWidth="4" />
          <circle cx={x + dx + r * 0.35} cy={y} r={r * 0.45} fill={ink} />
        </g>
      ))}
    </g>
  );
}

const ICONS = {
  brand: (
    <>
      <path d="M100 18 L118 68 L172 72 L130 104 L146 158 L100 128 L54 158 L70 104 L28 72 L82 68 Z" fill={lime} {...stroke} />
      <Eyes x={89} y={92} />
    </>
  ),
  web: (
    <>
      <rect x="20" y="36" width="160" height="120" rx="14" fill="#fff" {...stroke} />
      <path d="M20 64 H180" {...stroke} />
      <circle cx="38" cy="50" r="4" fill={ink} />
      <circle cx="52" cy="50" r="4" fill={ink} />
      <rect x="40" y="80" width="80" height="54" rx="8" fill={lime} {...stroke} />
      <Eyes x={69} y={106} />
      <path d="M134 108 L134 152 L146 140 L156 160 L164 156 L154 136 L170 134 Z" fill={ink} {...stroke} strokeWidth="3" />
    </>
  ),
  campaign: (
    <>
      <path d="M36 82 L120 42 V150 L36 112 Z" fill={lime} {...stroke} />
      <rect x="20" y="80" width="22" height="34" rx="6" fill="#fff" {...stroke} />
      <path d="M58 118 L70 160 H90 L80 122" fill="#fff" {...stroke} />
      <path d="M140 70 L168 56 M144 96 H176 M140 122 L168 136" {...stroke} />
      <Eyes x={66} y={92} gap={24} />
    </>
  ),
  motion: (
    <>
      <circle cx="104" cy="100" r="68" fill={lime} {...stroke} />
      <path d="M86 68 L138 100 L86 132 Z" fill="#fff" {...stroke} />
      <path d="M14 70 H34 M8 100 H30 M14 130 H34" {...stroke} />
      <Eyes x={96} y={100} gap={18} r={7} />
    </>
  ),
  socialManagement: (
    <>
      <rect x="44" y="24" width="112" height="152" rx="20" fill="#fff" {...stroke} />
      <rect x="56" y="44" width="88" height="110" rx="10" fill={lime} {...stroke} />
      <path d="M86 34 H114" stroke={ink} strokeWidth="4" strokeLinecap="round" />
      <circle cx="152" cy="46" r="16" fill="#fff" {...stroke} strokeWidth="4" />
      <path d="M147 43 A2.5 2.5 0 0 1 152 45.5 A2.5 2.5 0 0 1 157 43 A2.5 2.5 0 0 1 157 48.5 L152 53.5 L147 48.5 A2.5 2.5 0 0 1 147 43 Z" fill="#FF5B2E" stroke={ink} strokeWidth="1.5" />
      <Eyes x={82} y={78} gap={20} r={8} />
      <rect x="68" y="104" width="64" height="10" rx="5" fill="#fff" {...stroke} strokeWidth="3" />
      <rect x="68" y="122" width="40" height="8" rx="4" fill={ink} />
      <circle cx="120" cy="126" r="5" fill="#fff" {...stroke} strokeWidth="2.5" />
      <circle cx="100" cy="165" r="4" fill={ink} />
    </>
  ),
  packaging: (
    <>
      <polygon points="40,84 100,56 100,166 40,136" fill={lime} {...stroke} />
      <polygon points="100,56 160,84 160,166 100,166" fill="#fff" {...stroke} />
      <polygon points="40,84 100,56 160,84 100,108" fill={ink} />
      <polygon points="40,84 100,56 86,28 26,56" fill="#fff" {...stroke} />
      <polygon points="100,56 160,84 174,56 114,28" fill={lime} {...stroke} />
      <Eyes x={89} y={80} gap={22} r={8} />
      <rect x="116" y="112" width="30" height="20" rx="3" fill="#fff" {...stroke} strokeWidth="3" />
      <path d="M122 118 V126 M126 118 V126 M131 118 V126 M138 118 V126" stroke={ink} strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  social: (
    <>
      <path d="M30 40 H170 Q182 40 182 52 V128 Q182 140 170 140 H90 L56 168 V140 H30 Q18 140 18 128 V52 Q18 40 30 40 Z" fill={lime} {...stroke} />
      <Eyes x={78} y={84} gap={42} r={13} />
      <path d="M82 114 Q100 128 118 114" fill="none" {...stroke} />
    </>
  ),
};

export default function ServiceIcon({ icon, className = "" }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" fill="none">
      {ICONS[icon]}
    </svg>
  );
}
