# Finny homepage

Static marketing site (SEBI-registered FIRE advisory app). No build step.

## Layout
- `index.html` – page markup only. Loads `styles.css` in `<head>` and the scripts at the end of `<body>`.
- `styles.css` – all styles. Design tokens (colours, radius) are CSS variables on `:root` at the top.
  Mobile rules live in `@media (max-width:960px)` / `(max-width:700px)` blocks near the end.
- `js/NN-*.js` – one plain script per feature, loaded in numeric order with ordinary `<script src>` tags
  (no modules, no bundler). Each is an IIFE that bails out if its elements are missing.
  - `01-effects.js` starfield, scroll-reveal, price count-up, hero loop, FIRE path/score switchers, particle fields
  - `02-nav-hide.js` hide header on scroll down
  - `03-pricing-tabs.js` income tier tabs (reads `data-low` / `data-high` on `.count`)
  - `04-hero-typewriter.js` "Financial Independence, Retire Early" typing effect
  - `05-video-player.js` custom controls for hero/founder videos
  - `06-hero-scroll.js` hero headline fade/scale on scroll
  - `07-get-app-popup.js` QR popup for "Get the App"
  - `08-pricing-expand.js`, `09-pricing-mini-layout.js` pricing card expand/collapse
  - `10-hero-coins.js` scroll-driven coins around the hero phone
- `assets/img/` – images (webp + QR png). Phone screenshots are `path-screen-*`, `score-*`, `screen-*`;
  `phone-frame.webp` is the device bezel overlaid on every phone.
- `hero.mp4`, `founder.mp4` – videos, referenced by relative path.

## Working on it
- Preview: `python3 -m http.server 8000` then open http://localhost:8000 (file:// also mostly works,
  but use the server so video and relative paths behave like production).
- Format CSS/JS: `npx prettier@3.3.3 --write --print-width 100 styles.css js/*.js`.
  Don't run Prettier on `index.html`: reformatting markup can change inline whitespace and layout.
- To deploy, upload the whole folder (index.html, styles.css, js/, assets/, *.mp4).

## Behaviour notes
- "Get the App" buttons (`[data-get-app]`) open a QR popup on desktop and go to https://onelink.to/scgdk8
  on screens 700px wide or narrower.
- Respects `prefers-reduced-motion`: most animations are skipped when it is set.
- Footer "Reach us" link has no URL yet.
