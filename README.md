# Isla Café Miami

Single-page marketing site for Isla Café in Cutler Bay, built with Next.js, TypeScript, Tailwind CSS, GSAP, Lenis, and next-intl (ES/EN).

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000/es](http://localhost:3000/es) or [http://localhost:3000/en](http://localhost:3000/en).

## Build

```bash
npm run build
npm start
```

## Project structure

- `src/app/[locale]/` — localized routes (`/es`, `/en`)
- `src/components/` — Nav, Hero, sections, animations
- `src/messages/` — Spanish and English copy
- `public/images/` — site photography
- `isla-cafe-miami-website-design/` — original design handoff (reference only)

## Images (Higgsfield)

Site images live in `public/images/`. To replace placeholders with your Higgsfield generations:

1. Authenticate the Higgsfield MCP plugin in Cursor
2. List generations with `show_generations` (type: image)
3. Create a JSON manifest: `{ "hero.jpeg": "https://...", ... }`
4. Run: `npm run download-images -- path/to/manifest.json`

See `public/images/README.md` for the full filename list.

## Features

- Scroll-driven hero with canvas bokeh, steam particles, and headline crossfade
- Lenis smooth scroll + GSAP ScrollTrigger parallax
- Full bilingual content (Spanish default, English via nav toggle)
- Testimonial rotator, Google review carousel, FAQ accordion, newsletter form
- Mobile nav drawer and responsive layouts
- `prefers-reduced-motion` support
