# The Creative Creeps

Studio website built with **React 19**, **React Router 7**, **Vite**, **Tailwind CSS v4** and **Motion** (Framer Motion).

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the production build
```

## Pages

| Route | Page |
| --- | --- |
| `/` | Hero sculpture, philosophy, process, services, the exhibit, testimonial, contact |
| `/work` | Full exhibit with filters |
| `/work/:slug` | Case study (opens with a card-to-hero view transition) |
| `/services` | Detailed services, process, engagement models, FAQ |
| `/about` | Vision, story, values, process, team |
| `/contact` | Enquiry form |

## Structure

- `src/data.js` — **all site copy**. Items marked `PLACEHOLDER` must be replaced before launch.
- `src/pages/` — one file per route
- `src/components/` — sections and shared UI
  - `Logo.jsx` — TCC monogram (flat, or `depth` for the extruded hero sculpture)
  - `Hero.jsx` — staggered headline, pointer-tilt sculpture, scroll parallax
  - `WorkGrid.jsx` — exhibition grid, per-project typography, cursor-responsive artwork
  - `ServiceRows.jsx`, `ProcessCards.jsx`, `Philosophy.jsx`, `Testimonial.jsx`, `ContactSection.jsx`, `ContactForm.jsx`
  - `Cursor.jsx` — desktop cursor accent; add `data-cursor="Label"` to any element for a labelled badge
  - `ui.jsx` — `Reveal`, `SectionLabel`, `Magnetic`, `TitleLines`, `Arrow`
- `src/index.css` — Tailwind theme tokens (colours, fonts, easing), mono `label` utility, view-transition styles

## Contact form

Copy `.env.example` to `.env` and set `VITE_FORM_ENDPOINT` to a form service (Formspree, Basin, Getform)
or your own API. The form POSTs JSON `{ name, email, service, budget, message }`.
Without an endpoint it falls back to opening the visitor's email app with the message pre-filled.

## Motion & accessibility

- All motion respects `prefers-reduced-motion` (Motion's `MotionConfig reducedMotion="user"` + CSS fallbacks).
- Custom cursor, pointer tilt and magnetic buttons only run on fine pointers (mouse/trackpad).
- Project opening uses the View Transitions API where supported and falls back to a normal navigation.

## Before launch

- Replace every `PLACEHOLDER` in `data.js`: contact details, socials, testimonial, team, studio history, FAQ answers.
- Project write-ups describe creative approach only — add verified outcomes only with client approval.
- Swap illustrated covers in `ProjectArt.jsx` and avatars in `Avatar.jsx` for real imagery (keep the aspect ratios in `ART_RATIO` or update them).
- Single-page app hosting: serve `index.html` for every route (`public/_redirects` covers Netlify).
