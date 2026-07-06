# DarkRoot Organizations — Website (No Build Step)

An ultra-premium, cyber-tech website for DarkRoot Organizations, built with
**plain HTML, CSS, and JavaScript** — no React, no npm, no build step. Runs
directly in a browser, or in **HopWeb** on Android, by opening `index.html`.

The 3D hero (a neural-network core) uses Three.js loaded from a CDN
`<script>` tag, and icons come from Font Awesome's CDN — both still work
with zero local build tooling, since they're just `<script>`/`<link>` tags.

## Using this in HopWeb

1. Unzip this project on your phone (or clone it after pushing to GitHub —
   HopWeb has Git support built in).
2. Open the project folder in HopWeb.
3. Tap `index.html` and use HopWeb's preview/run button.
4. Edit any file directly in HopWeb; save and re-run to see changes.

**Note:** the hero animation and icons load from CDNs
(`cdnjs.cloudflare.com`, Google Fonts), so the first load needs an internet
connection. The browser caches them after that.

## Editing your content

Everything on the site — brand info, hero copy, mission/vision/values,
timeline, stats, departments, projects, team members, tech stack, gallery
images, careers content, FAQ, and contact/social links — comes from **one
file**:

```
js/config.js
```

Edit it, save, and refresh. Replace the placeholder images in `assets/`
(team photos, project thumbnails, gallery images) with your real files —
keep the same filenames, or update the paths in `config.js` to match.

## Publishing to your GitHub repo

This project is already a git repository with a commit ready to push.

From HopWeb (Git support built in):
1. Connect it to `https://github.com/darkrootiding-hub/DarkRoot`
2. Push your changes via HopWeb's Git panel.

From a computer:
```bash
git remote add origin https://github.com/darkrootiding-hub/DarkRoot.git
git branch -M main
git push -u origin main
```

## Hosting it live (free) — GitHub Pages

1. On GitHub: repo → **Settings → Pages**
2. Source: `main` branch, `/ (root)` folder → Save
3. You'll get a live URL like `https://darkrootiding-hub.github.io/DarkRoot/`

## What's implemented

- Loading screen with glitch text, scanning light, percentage counter
- Custom glowing cursor with magnetic hover state
- Living background: animated grid overlay, aurora gradient, mesh glow,
  noise texture
- Floating glass navbar with active-section indicator, scroll progress bar,
  animated mobile menu
- Fullscreen hero with a 3D neural-network core (Three.js), floating
  icons, scanlines, animated scroll indicator
- About: mission/vision cards, values, animated timeline, animated stat
  counters
- Departments: 10 department cards with 3D tilt and hover particle-glow
- Projects: image zoom on hover, tag filtering via tags shown per card,
  GitHub/demo buttons, full preview modal
- Team: glass cards with 3D tilt, animated skill bars, social links
- Tech stack: hover-glow chip grid
- Gallery: Pinterest-style masonry layout with hover lift/shine
- Careers: hiring-process timeline, benefits grid, open positions, and an
  application form with resume-upload UI
- FAQ: animated glass accordion
- Contact: form with floating labels + validation, animated success state,
  and a lightweight canvas-based "network map" (no map API key required)
- Footer: newsletter input, social links, back-to-top button
- 3D tilt effects on cards, scroll-reveal animations throughout, dark
  cyber-tech theme (black / neon blue / neon purple), fully responsive

## What's intentionally simplified (and why)

Static sites can't run server code, so a few pieces are UI-complete but
need a backend or third-party service to be fully functional:

- **Contact form & application form** — both validate and show a success
  state, but don't deliver anywhere yet. Point them at a service like
  [Formspree](https://formspree.io) or [Web3Forms](https://web3forms.com)
  (just set the form's `action` — no server code needed), or wire up
  `fetch()` calls in `js/main.js` to your own API.
- **Resume upload** — the UI accepts a PDF and shows the filename, but
  doesn't upload anywhere. Formspree and similar services support file
  uploads directly from static forms if you want this working end-to-end.
- **Newsletter subscribe** — UI only. Connect to Mailchimp, Buttondown, or
  similar in `initFooter()`.
- **Contact map** — uses a lightweight canvas animation instead of a real
  map (Google Maps/Mapbox require an API key and usage limits). Swap in an
  `<iframe>` embed if you want an actual map.

## File structure

```
index.html       The whole page
css/style.css     All styles (design tokens at the top)
js/config.js      Single source of truth for all content
js/main.js        All behavior/interactivity + the 3D hero scene
assets/           Images (team, projects, gallery), favicon
```
