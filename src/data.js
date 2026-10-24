/* ==========================================================================
   All site copy lives here.
   Anything marked PLACEHOLDER must be replaced with real, verified studio
   information before launch — no invented metrics, awards or testimonials.
   ========================================================================== */

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/work", label: "Work" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
];

// PLACEHOLDER contact details
export const EMAIL = "hello@thecreativecreeps.com";
// where contact-form enquiries are delivered
export const CONTACT_INBOX = "vercel@gmail.com";
export const ADDRESS = ["Studio address", "City, Country"];

export const TICKER = ["Brand Identity", "Digital Campaigns", "Web Design & Development", "Social Media Management", "Social Content", "Packaging Design"];

/* Personality — how the studio describes itself. */
export const TRAITS = [
  { name: "Curious", text: "We ask the questions nobody else does, then actually listen to the answers." },
  { name: "Strategic", text: "Every odd choice has a reason. Weird on purpose, never weird for its own sake." },
  { name: "Unconventional", text: "If it looks like everything else in the category, we haven’t finished yet." },
  { name: "Obsessed with craft", text: "Kerning, load times, focus states. The details are the work." },
];

/* Facts that describe how the studio works (not performance claims). */
export const STUDIO_FACTS = [
  { value: "05", label: "Disciplines under one roof" },
  { value: "04", label: "Steps in every project" },
  { value: "01", label: "Team from first call to launch" },
];

export const STEPS = [
  { name: "Snoop", glyph: "snoop", text: "Research, interviews and audits. We dig into your audience, market and the weird truths no one has said out loud yet.", output: "Insights · Audit · Brief" },
  { name: "Scheme", glyph: "scheme", text: "Strategy and positioning. A sharp idea, a clear voice and a plan for where the brand lives and how it behaves.", output: "Positioning · Idea · Roadmap" },
  { name: "Craft", glyph: "craft", text: "Design, code and motion — obsessively detailed, built for real people on real devices, and tested to the pixel.", output: "Identity · Product · Content" },
  { name: "Unleash", glyph: "unleash", text: "Launch, measure, evolve. We stick around to make sure the work keeps creeping into people’s minds.", output: "Launch · Learn · Iterate" },
];

/* ---------------- Services ---------------- */

export const SERVICES = [
  {
    slug: "brand-identity",
    name: "Brand Identity",
    text: "Naming, logos, visual systems and guidelines with a personality you can spot from across the street.",
    intro:
      "A brand is the feeling people get when your name comes up. We build identities from the inside out — strategy first, then a visual and verbal system flexible enough to live everywhere and distinctive enough to own a room.",
    deliverables: ["Brand strategy & positioning", "Naming & verbal identity", "Logo & visual system", "Typography & colour", "Brand guidelines", "Launch toolkit"],
    tags: ["Strategy", "Logo", "Guidelines"],
    icon: "brand",
  },
  {
    slug: "campaigns",
    name: "Digital Campaigns",
    text: "Big ideas, executed across every screen, built to start conversations rather than interrupt them.",
    intro:
      "Attention is earned, not bought. We find the idea worth talking about, then roll it out across social, paid, out-of-home and experiential so it feels like one story wherever people meet it.",
    deliverables: ["Campaign concept", "Creative direction", "Paid social & display", "Out-of-home", "Launch & activation", "Reporting"],
    tags: ["Concept", "Paid", "OOH"],
    icon: "campaign",
  },
  {
    slug: "web",
    name: "Web Design & Development",
    text: "Fast, accessible, unforgettable websites — designed in detail and engineered to perform.",
    intro:
      "Your website is your hardest-working employee. We design and build sites that load fast, read beautifully on every screen and turn curious visitors into customers — without a template in sight.",
    deliverables: ["UX research & architecture", "UI & interaction design", "Design systems", "Front-end development", "CMS integration", "Performance & accessibility"],
    tags: ["UX/UI", "Front-end", "CMS"],
    icon: "web",
  },
  {
    slug: "social-management",
    name: "Social Media Management",
    text: "Community building, daily content scheduling and creative channel management to turn followers into advocates.",
    intro:
      "Consistency and engagement win on social. We manage your presence end-to-end — from content calendars and daily publishing to active community interaction and growth analytics — keeping your brand relevant, active and connected.",
    deliverables: ["Channel strategy & growth", "Content calendar & scheduling", "Community engagement & moderation", "Platform management (IG, TikTok, X, LinkedIn)", "Performance analytics & reporting", "Trend listening & reactive posts"],
    tags: ["Strategy", "Community", "Growth"],
    icon: "socialManagement",
  },
  {
    slug: "social",
    name: "Social Content",
    text: "Thumb-stopping content systems and creative direction that keep your feed weird and consistent.",
    intro:
      "Consistency beats virality. We design content systems, shoot the assets and write the voice so your team can show up every day without losing the plot — or the personality.",
    deliverables: ["Content strategy", "Art direction & shoots", "Template systems", "Copywriting & tone", "Short-form video", "Community playbooks"],
    tags: ["Direction", "Photo", "Templates"],
    icon: "social",
  },
  {
    slug: "packaging",
    name: "Packaging Design",
    text: "Tactile, shelf-stealing packaging and unboxing experiences people actually want to keep.",
    intro:
      "The physical world still matters. We design packaging that jumps off crowded shelves, feels incredible in the hands, and turns the unboxing ritual into an unforgettable brand moment — engineered for real print and production.",
    deliverables: ["Structural & box concept", "Label & wrapper design", "Unboxing experience", "Print production & finishing", "Dielines & specifications", "Sustainable materials consulting"],
    tags: ["Print", "Structural", "Unboxing"],
    icon: "packaging",
  },
];

export const ENGAGEMENTS = [
  { name: "Sprint", time: "2–4 weeks", text: "A focused burst on one problem: a naming sprint, a campaign idea, a landing page or a brand refresh.", best: "Startups & quick wins" },
  { name: "Project", time: "6–16 weeks", text: "End-to-end work with a clear finish line — a full identity, a new website or a launch campaign.", best: "Launches & rebrands", featured: true },
  { name: "Retainer", time: "Ongoing", text: "A dedicated team embedded alongside yours for content, campaigns and continuous design.", best: "Growing brands" },
];

// PLACEHOLDER answers — confirm pricing and timelines before launch.
export const FAQS = [
  { q: "How much does a project cost?", a: "It depends on scope. After a short intro call we send a clear, fixed proposal — no surprise invoices." },
  { q: "How long does it take?", a: "Sprints take 2–4 weeks. Full identity and website projects usually run between 6 and 16 weeks depending on scope and content." },
  { q: "Do you work with remote clients?", a: "Yes. We run workshops over video and meet in person for the big moments when it’s useful." },
  { q: "Can you work with our in-house team?", a: "Absolutely. We often build systems and hand them over with training, or plug in alongside your designers and developers." },
  { q: "What do you need from us to start?", a: "A conversation, an honest brief (we can help write it) and a decision-maker who’ll show up to key reviews." },
];

/* ---------------- Work ----------------
   `slug` also selects the cover artwork in components/ProjectArt.jsx.
   `type` sets each project's caption typography (Archivo width/weight axes).
   PLACEHOLDER: write-ups describe the creative approach only. Add verified
   outcomes and client approval before publishing results. */

export const FILTERS = [
  { id: "all", label: "All" },
  { id: "branding", label: "Branding" },
  { id: "web", label: "Web" },
  { id: "campaign", label: "Campaign" },
];

export const PROJECTS = [
  {
    slug: "moth",
    title: "Moth & Mortar",
    meta: "Brand identity · Packaging",
    year: 2025,
    cats: ["branding"],
    bg: "#16150f",
    fg: "#D4F53C",
    palette: ["#16150f", "#D4F53C", "#F2EDE4", "#8A8170"],
    type: { stretch: "112%", weight: 900, transform: "uppercase", tracking: "-.04em" },
    summary: "A night-shift identity for a small-batch coffee roaster.",
    challenge: "Small-batch coffee roasted overnight, sitting on shelves next to dozens of near-identical craft bags.",
    idea: "Lean into the night shift. A moth drawn to a glowing lime moon becomes the mark, the bags go jet black, and every roast gets a nocturnal name and a hand-drawn moth of its own.",
    work: "A full identity system: logomark, custom moth illustrations, a jet-black packaging range and a nocturnal naming system for each roast.",
    services: ["Brand strategy", "Identity", "Packaging", "Illustration"],
  },
  {
    slug: "radio",
    title: "Night Shift FM",
    meta: "Website · Streaming platform",
    year: 2025,
    cats: ["web"],
    bg: "#D4F53C",
    fg: "#0D0D0D",
    palette: ["#D4F53C", "#0D0D0D", "#FF5B2E", "#F2EDE4"],
    type: { stretch: "75%", weight: 800, transform: "uppercase", tracking: "-.01em" },
    summary: "A streaming home for an independent late-night radio station.",
    challenge: "A station full of loved shows, hidden behind a wall of links and a player that didn’t work on a phone.",
    idea: "Design the whole site around a single persistent player — a spinning record that follows you everywhere — with schedules, archives and DJ pages built as one extendable system.",
    work: "Responsive website, persistent audio player, show archive and DJ profile templates on a component-based design system.",
    services: ["UX & UI design", "Design system", "Front-end development", "CMS"],
  },
  {
    slug: "oddly",
    title: "Oddly Fresh",
    meta: "Branding · Packaging",
    year: 2024,
    cats: ["branding"],
    bg: "#F7B6CF",
    fg: "#0D0D0D",
    palette: ["#F7B6CF", "#0D0D0D", "#F2EDE4", "#FFFFFF"],
    type: { stretch: "100%", weight: 700, transform: "none", tracking: "-.03em" },
    summary: "Clean skincare with a sense of humour.",
    challenge: "Clean skincare is a crowded, very serious category. The brand wanted to be honest and playful without looking cheap.",
    idea: "Bottles with eyes. A friendly character system peeks out from each product, paired with no-nonsense ingredient copy and a soft pink that owns the shelf.",
    work: "Naming, identity, a character system and a full packaging range with plain-language ingredient copy.",
    services: ["Naming", "Identity", "Packaging", "Copywriting"],
  },
  {
    slug: "ghost",
    title: "Ghost Kitchen Co.",
    meta: "Launch campaign · Social",
    year: 2024,
    cats: ["campaign"],
    bg: "#0D0D0D",
    fg: "#F2EDE4",
    palette: ["#0D0D0D", "#F2EDE4", "#D4F53C", "#2A2A2A"],
    type: { stretch: "125%", weight: 900, transform: "uppercase", tracking: "-.02em" },
    summary: "A delivery-only kitchen that leaned into being invisible.",
    challenge: "Ghost kitchens have a trust problem: no dining room, no sign, no faces.",
    idea: "“You’ll never see us.” A cheeky ghost mascot, midnight drops on social and glow-in-the-dark packaging that turn every delivery into a little haunting.",
    work: "Campaign platform, mascot design, a social content series and glow-in-the-dark delivery packaging.",
    services: ["Campaign concept", "Social content", "Packaging", "Motion"],
  },
  {
    slug: "lumen",
    title: "Lumen",
    meta: "Product site · Design system",
    year: 2024,
    cats: ["web"],
    bg: "#3B5BFF",
    fg: "#F2EDE4",
    palette: ["#3B5BFF", "#F2EDE4", "#0D0D0D", "#D4F53C"],
    type: { stretch: "125%", weight: 500, transform: "uppercase", tracking: ".12em" },
    summary: "Making a deep-tech optics startup feel human.",
    challenge: "Brilliant technology that is almost impossible to explain — and a site that read like a whitepaper.",
    idea: "One big eye. The story is built around seeing clearly, with an interactive hero, plain-language storytelling and a modular system for product pages.",
    work: "Messaging, product website, interactive hero and a modular design system shared between marketing and product.",
    services: ["Messaging", "Web design", "Design system", "Development"],
  },
  {
    slug: "wild",
    title: "Wild Hours",
    meta: "Identity · Campaign · OOH",
    year: 2026,
    cats: ["campaign", "branding"],
    bg: "#FF5B2E",
    fg: "#0D0D0D",
    palette: ["#FF5B2E", "#0D0D0D", "#F2EDE4", "#D4F53C"],
    type: { stretch: "62%", weight: 900, transform: "uppercase", tracking: "-.01em" },
    summary: "A loud identity for a three-day arts and music festival.",
    challenge: "A young festival competing with bigger budgets, with an identity that changed completely every year.",
    idea: "Type as loud as the music. A heavyweight wordmark that stretches, stacks and spills across posters, wristbands and stages — the same system, never the same layout twice.",
    work: "Flexible identity system, poster series, wayfinding and stage graphics, and a launch campaign.",
    services: ["Identity", "Campaign", "Out-of-home", "Environmental"],
  },
];

/* ---------------- Social proof ----------------
   PLACEHOLDER: no verified testimonial exists yet. Replace with a real,
   approved client quote — or remove the section. */
export const TESTIMONIAL = {
  placeholder: true,
  quote: "Your best client quote goes here — something specific about working with the studio and what the work made possible.",
  name: "Client Name",
  role: "Role, Company",
};

/* ---------------- About ---------------- */

export const TIMELINE = [
  { year: "2026", text: "Three friends, one shared obsession with odd ideas. The Creative Creeps is born." },
  { year: "Now", text: "Taking on our first brand, content, web and video projects — and building a body of work we’re proud of." },
  { year: "Next", text: "Growing the pack, the portfolio and the weird ideas. Want to be part of it? Say hi." },
];

export const VALUES = [
  { name: "Weird on purpose", text: "Different isn’t a style, it’s a strategy. Every odd choice we make has a reason behind it." },
  { name: "Curiosity over certainty", text: "We ask the questions nobody else does — then actually listen to the answers." },
  { name: "Craft is kindness", text: "Fast, accessible and well-built isn’t a bonus. It’s how we respect the people using our work." },
  { name: "No ego, all in", text: "The best idea wins, whoever had it. We’re a pack, not a collection of lone wolves." },
];

export const TEAM = [
  { name: "Varshith", role: "Strategy & Creative Lead · Developer", color: "#D4F53C" },
  { name: "Akshith", role: "Content & Design Lead", color: "#FF5B2E" },
  { name: "Ritvik", role: "Videographer & Editor", color: "#3B5BFF" },
];

/* ---------------- Contact ---------------- */

// PLACEHOLDER profile URLs
export const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Behance", href: "https://behance.net" },
  { label: "Dribbble", href: "https://dribbble.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
];

export const BUDGETS = ["Under $10k", "$10k – $25k", "$25k – $50k", "$50k+", "Not sure yet"];
