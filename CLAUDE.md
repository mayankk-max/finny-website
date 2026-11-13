# Finny homepage

Single-file marketing site (SEBI-registered FIRE advisory app).

- `index.html` is the whole site: CSS, JS and images (base64 webp) are inline.
- `hero.mp4` (hero video) and `founder.mp4` (founder video) are loaded by relative path.
- Preview: `python3 -m http.server 8000` then open http://localhost:8000
- Mobile rules live in `@media (max-width:960px)` / `(max-width:700px)` blocks near the end of the main `<style>`.
- "Get the App" buttons (`[data-get-app]`) open a QR popup on desktop and go to https://onelink.to/scgdk8 on screens 700px wide or narrower.
- Pricing tiers are driven by `data-low` / `data-high` attributes on `.count` elements.
- Footer "Reach us" link has no URL yet.

## Workflow & preferences (agreed with the owner, keep these)

### Branches
- Every feature or change gets its own new branch off `main` (e.g. `feature/<short-name>`). Never pile unrelated work on one branch.
- Homepage updates go to `main` and are taken live (see Deploy). They are not left sitting on a branch.
- After something is merged, delete its branch locally and on the remote. Keep the repo free of stale branches; before finishing any task, list branches and remove merged or duplicate ones.
- Do not delete a branch that has unmerged work without asking.

### Homepage updates
- Skill name: `update-homepage`. When it is used: pull latest `main`, make the change, check it in a browser (desktop and a 390px phone width), commit to `main`, deploy, confirm the live site, then clean up branches.
- Videos: keep each under 15 MB. Hero is 720x1280, founder is 480x848 (H.264, CRF about 26, AAC 96k, faststart).
- The homepage has also been drafted as a claude.ai artifact ("Finny Homepage"). When syncing from it, swap the two `/_blob/...` video URLs for `hero.mp4` and `founder.mp4`.

### Deploy
- The deploy script / hosting target is NOT recorded in this repo yet (the existing note only says "upload the whole folder"). Do not guess a deploy command. Ask the owner once, then write the exact steps here.

### Site facts to keep consistent
- SEBI RIA registration no. INA000020873 (verify link uses `regno=INA000020873`).
- Contact: hello@finny.club (mail icon) and WhatsApp +919945276161 (`https://wa.me/919945276161`). No "Reach us" heading.
- Social: Instagram https://www.instagram.com/club.finny (no tracking suffix), X https://x.com/FinnyIndia, LinkedIn https://www.linkedin.com/company/finny-club/
- App link: https://onelink.to/scgdk8 (QR popup on desktop, direct link at 700px or narrower).
- Pricing: show "+ GST" in small text after every paid price. Combo is Rs 9,999 (struck Rs 10,998) on the < 5L tab and Rs 22,999 (struck Rs 24,998) on the > 5L tab. Tabs read "Income < Rs 5L/month" and "Income > Rs 5L/month".
- Copy style: short, plain, no icons on the pricing and hero CTAs; "0% commission on investments" subtitle under the pricing heading.

### Working style
- Make the change asked for; if a request is ambiguous, pick the sensible reading and say which one was used.
- Commit messages end with the Co-Authored-By / Claude-Session lines; PR bodies end with the "Generated with Claude Code" line and session link.

