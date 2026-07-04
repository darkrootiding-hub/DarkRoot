# DarkRoot Portfolio — David Stha

A premium, futuristic, config-driven portfolio built with React, Vite, TypeScript, Tailwind CSS, Framer Motion, React Three Fiber, and GSAP.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Editing your content

Everything on the site — your name, bio, titles, skills, projects, experience,
certifications, services, testimonials, blog posts, and social links — comes
from **one file**:

```
src/data/config.ts
```

Edit that file and the whole site updates automatically. No component code
needs to change for content updates. Replace the placeholder images/PDF in
`public/` (avatar, project thumbnails, testimonial photos, resume.pdf) with
your real assets — the filenames already match what `config.ts` expects.

## What's implemented

- **Hero**: fullscreen 3D scene (signature glowing "root network" core, built
  with React Three Fiber + postprocessing bloom), typing effect over your
  titles, magnetic CTA buttons, animated gradient name.
- **3D scene** (`RootScene.tsx`): mouse-reactive rotating core, procedurally
  generated branching root lines, holographic rings, particle field, grid
  floor, bloom + vignette postprocessing.
- **Navigation**: glass sticky navbar, scroll progress bar, active-section
  pill indicator, animated mobile menu, `Ctrl/Cmd+K` command palette that can
  jump to sections, open projects, or open socials.
- **About**: bio panel, animated stat counters, highlight cards.
- **Skills**: circular animated progress rings, category filter, live search,
  tilt-on-hover cards.
- **Projects**: tag filtering, search, "load more" pagination, tilt cards,
  and a live preview modal with GitHub/demo links.
- **Experience/Timeline**: glowing animated vertical line with expandable
  milestones (education, experience, certifications, awards).
- **Certifications**, **Services**, **Testimonials** (carousel), **Blog**
  (card grid) — all config-driven.
- **Contact**: floating-label form with validation and an animated success
  state, copy-to-clipboard email, social links.
- **Extras**: cinematic loading screen, custom cursor with magnetic glow,
  noise-texture overlay, aurora/gradient background layers, Lenis smooth
  scrolling, scroll-reveal animations throughout, a floating AI-assistant
  widget shell (UI only — see below), dark theme, PWA manifest.

## What's intentionally simplified (and why)

A few items from a full Awwwards-tier spec need infrastructure this static
front-end can't provide on its own. They're scaffolded so you can wire them
up:

- **AI assistant widget** (`AssistantWidget.tsx`) — the UI is complete and
  functional, but responses are placeholder text. Connect it to an LLM API
  (OpenAI, Anthropic, etc.) inside `handleSend`.
- **Contact form submission** — validates and shows a success state, but
  doesn't send email yet. Wire it to a service like Formspree, Resend, or
  your own API route inside `handleSubmit` in `Contact.tsx`.
- **GitHub contribution graph / visitor counter** — both need a backend or
  third-party API (e.g. GitHub's GraphQL API, or a hit-counter service) and
  were left out to avoid baking in a specific vendor. Easiest path: embed a
  service like `github-readme-stats` as an image, or call the GitHub REST
  API client-side.
- **True offline support / service worker** — the manifest is in place for
  PWA installability; add `vite-plugin-pwa` if you want full offline caching.
- **Video preview inside project modal** — the modal supports an image today;
  swap the `<img>` for a `<video>` tag per-project if you have demo clips.

## Project structure

```
src/
  components/     All UI sections & widgets
  data/config.ts  Single source of truth for content
  hooks/          useLenis (smooth scroll), scroll-progress/active-section
  index.css       Design tokens, glass utilities, accessibility helpers
  App.tsx         Composes the page
```

## Design tokens

Colors, fonts, and animation keyframes are defined in `tailwind.config.js`
under `theme.extend` — change the `violet`/`cyan`/`void` values there to
retheme the whole site.

## Accessibility & performance notes

- Respects `prefers-reduced-motion` (disables Lenis smoothing and shortens
  animations).
- Visible focus rings on all interactive elements.
- Images use `loading="lazy"` with skeleton placeholders.
- Heavy libraries (three.js, framer-motion, gsap, lenis) are split into
  separate chunks in `vite.config.ts` for better caching.
- Replace placeholder images in `public/` with optimized real assets (WebP/AVIF
  recommended) before shipping to keep Lighthouse scores high.
