# Finny homepage

Single-file marketing site (SEBI-registered FIRE advisory app).

- `index.html` is the whole site: CSS, JS and images (base64 webp) are inline.
- `hero.mp4` (hero video) and `founder.mp4` (founder video) are loaded by relative path.
- Preview: `python3 -m http.server 8000` then open http://localhost:8000
- Mobile rules live in `@media (max-width:960px)` / `(max-width:700px)` blocks near the end of the main `<style>`.
- "Get the App" buttons (`[data-get-app]`) open a QR popup on desktop and go to https://onelink.to/scgdk8 on screens 700px wide or narrower.
- Pricing tiers are driven by `data-low` / `data-high` attributes on `.count` elements.
- Footer "Reach us" link has no URL yet.
