/* Placeholder cover art for portfolio cards, drawn as SVG so the page stays light.
   Replace with real project imagery (e.g. <img src=... />) when available. */

const display = { fontFamily: "Archivo, sans-serif", fontWeight: 900 };
const body = { fontFamily: "DM Sans, sans-serif" };

const C = {
  ink: "#0D0D0D",
  cream: "#F2EDE4",
  lime: "#D4F53C",
  orange: "#FF5B2E",
  blush: "#F7B6CF",
  cobalt: "#3B5BFF",
};

function Moth() {
  return (
    <svg viewBox="0 0 800 500">
      <rect width="800" height="500" fill="#16150f" />
      <circle cx="560" cy="230" r="170" fill={C.lime} />
      <g fill="#16150f" transform="translate(560 235)">
        <path d="M0 -10 C-60 -110 -170 -80 -150 0 C-140 50 -60 40 0 10 Z" />
        <path d="M0 -10 C60 -110 170 -80 150 0 C140 50 60 40 0 10 Z" />
        <path d="M0 10 C-40 30 -90 110 -40 110 C-10 110 0 60 0 20 Z" />
        <path d="M0 10 C40 30 90 110 40 110 C10 110 0 60 0 20 Z" />
        <rect x="-8" y="-40" width="16" height="140" rx="8" />
      </g>
      <circle cx="545" cy="210" r="6" fill={C.lime} />
      <circle cx="575" cy="210" r="6" fill={C.lime} />
      <text x="60" y="400" fill={C.cream} fontSize="120" letterSpacing="-6" style={display}>MOTH</text>
      <text x="60" y="450" fill={C.cream} fontSize="22" letterSpacing="8" style={body}>&amp; MORTAR · COFFEE</text>
    </svg>
  );
}

function Radio() {
  return (
    <svg viewBox="0 0 500 625">
      <rect width="500" height="625" fill={C.lime} />
      <rect x="60" y="80" width="380" height="460" rx="18" fill={C.cream} stroke={C.ink} strokeWidth="6" />
      <line x1="60" y1="130" x2="440" y2="130" stroke={C.ink} strokeWidth="6" />
      {[92, 120, 148].map((cx) => <circle key={cx} cx={cx} cy="105" r="8" fill={C.ink} />)}
      <g transform="translate(250 320)">
        <circle r="150" fill={C.ink} />
        <circle r="120" fill="none" stroke="#2a2a2a" strokeWidth="3" />
        <circle r="95" fill="none" stroke="#2a2a2a" strokeWidth="3" />
        <circle r="45" fill={C.orange} />
        <circle r="8" fill={C.ink} />
      </g>
      <text x="250" y="510" textAnchor="middle" fill={C.ink} fontSize="34" letterSpacing="-1" style={display}>NIGHT SHIFT FM</text>
    </svg>
  );
}

function Oddly() {
  return (
    <svg viewBox="0 0 600 480">
      <rect width="600" height="480" fill={C.blush} />
      <g fill={C.cream} stroke={C.ink} strokeWidth="6">
        <rect x="120" y="170" width="100" height="220" rx="16" />
        <rect x="250" y="120" width="110" height="270" rx="20" />
        <rect x="390" y="200" width="90" height="190" rx="14" />
      </g>
      <g fill={C.ink}>
        <rect x="140" y="130" width="60" height="44" rx="6" />
        <rect x="275" y="80" width="60" height="44" rx="6" />
        <rect x="405" y="165" width="60" height="38" rx="6" />
      </g>
      <circle cx="290" cy="220" r="16" fill="#fff" stroke={C.ink} strokeWidth="5" />
      <circle cx="296" cy="220" r="7" fill={C.ink} />
      <circle cx="325" cy="220" r="16" fill="#fff" stroke={C.ink} strokeWidth="5" />
      <circle cx="331" cy="220" r="7" fill={C.ink} />
      <text x="305" y="320" textAnchor="middle" fill={C.ink} fontSize="26" style={display}>ODDLY</text>
      <rect y="430" width="600" height="50" fill={C.ink} />
    </svg>
  );
}

function Ghost() {
  return (
    <svg viewBox="0 0 600 480">
      <rect width="600" height="480" fill={C.ink} />
      <path d="M200 400 V230 C200 140 400 140 400 230 V400 L370 370 L335 400 L300 370 L265 400 L230 370 Z" fill={C.cream} />
      <ellipse cx="265" cy="250" rx="20" ry="30" fill={C.ink} />
      <ellipse cx="335" cy="250" rx="20" ry="30" fill={C.ink} />
      <circle cx="272" cy="244" r="8" fill={C.lime} />
      <circle cx="342" cy="244" r="8" fill={C.lime} />
      <g stroke={C.lime} strokeWidth="6" fill="none" strokeLinecap="round">
        <path d="M60 90 Q 100 60 140 90 T 220 90" />
        <path d="M400 70 Q 440 40 480 70 T 560 70" />
      </g>
      <text x="300" y="455" textAnchor="middle" fill={C.lime} fontSize="30" letterSpacing="2" style={display}>GHOST KITCHEN CO.</text>
    </svg>
  );
}

function Lumen() {
  return (
    <svg viewBox="0 0 500 625">
      <rect width="500" height="625" fill={C.cobalt} />
      <path stroke="#6f87ff" strokeWidth="1.5" d="M0 125H500M0 250H500M0 375H500M0 500H500M100 0V625M200 0V625M300 0V625M400 0V625" />
      <path d="M250 150 C360 150 400 240 380 320 C360 420 300 470 220 450 C130 430 90 350 120 260 C140 200 190 150 250 150 Z" fill={C.cream} />
      <circle cx="250" cy="310" r="60" fill={C.ink} />
      <circle cx="270" cy="295" r="16" fill={C.lime} />
      <text x="40" y="580" fill={C.cream} fontSize="64" letterSpacing="-3" style={display}>LUMEN</text>
    </svg>
  );
}

function Wild() {
  return (
    <svg viewBox="0 0 800 500">
      <rect width="800" height="500" fill={C.orange} />
      <text x="40" y="250" fill={C.ink} fontSize="260" letterSpacing="-16" style={display}>WILD</text>
      <text x="40" y="450" fill={C.cream} fontSize="200" letterSpacing="-12" style={display}>HOURS</text>
      <g transform="translate(680 110) rotate(12)">
        <circle r="78" fill={C.lime} />
        <text textAnchor="middle" y="-6" fill={C.ink} fontSize="26" style={display}>FEST</text>
        <text textAnchor="middle" y="24" fill={C.ink} fontSize="18" fontWeight="700" style={body}>2026</text>
      </g>
    </svg>
  );
}

const ART = { moth: Moth, radio: Radio, oddly: Oddly, ghost: Ghost, lumen: Lumen, wild: Wild };

/** Natural aspect ratio (width / height) of each artwork, so frames never crop it. */
export const ART_RATIO = { moth: 1.6, radio: 0.8, oddly: 1.25, ghost: 1.25, lumen: 0.8, wild: 1.6 };

export default function ProjectArt({ id }) {
  const Art = ART[id];
  return Art ? <Art /> : null;
}
