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
```

This runs `scripts/fetch-instagram.mjs` and `scripts/fetch-google-reviews.mjs` first (via `prebuild`), then produces a static export in `out/` (used for Cloudflare Pages).

## Deploy (Cloudflare Pages)

In your Cloudflare Pages project settings:

1. **Reconnect Git** (fix the “disconnected from Git” warning)
2. **Build command:** `npm run build`
3. **Build output directory:** `out`
4. Add environment variables (Production):
   - `INSTAGRAM_ACCESS_TOKEN` — Page access token from Meta
   - `INSTAGRAM_USER_ID` — Instagram Business Account ID
   - `GOOGLE_PLACES_API_KEY` — Google Places API (New) key
   - `GOOGLE_PLACE_ID` — Isla Café Google Place ID
   - `NEXT_PUBLIC_WHATSAPP_NUMBER` — WhatsApp number in E.164 (e.g. `13055550147`)
5. Redeploy from the latest `main` commit

Production URL: [https://islacafemiami.pages.dev/es](https://islacafemiami.pages.dev/es)

## Instagram feed

The homepage shows a 4×4 grid of the latest posts from [@islacafemiami](https://www.instagram.com/islacafemiami/). Posts are fetched at **build time** via the [Instagram Graph API](https://developers.facebook.com/docs/instagram-api) and saved to `public/images/instagram/`.

**Fallback:** If the API is unavailable or returns no posts, the site shows a committed 4×4 grid using site photography from [`src/data/fallback/instagram-posts.json`](src/data/fallback/instagram-posts.json). Live data replaces the fallback automatically once a successful fetch runs.

### One-time Meta setup (client)

See **[docs/INSTAGRAM_SETUP.md](docs/INSTAGRAM_SETUP.md)** for the full client handoff checklist, or [download the guide](public/docs/instagram-setup-guide.md) (`Isla-Cafe-Instagram-Setup-Guide.md`) to share with the client.

Summary:

1. Convert `@islacafemiami` to an **Instagram Business or Creator** account (must stay **public**)
2. Link it to the restaurant’s **Facebook Page**
3. Create a [Meta Developer app](https://developers.facebook.com/) and add the **Instagram Graph API** product
4. Generate a **Page access token** with `instagram_basic` and `pages_read_engagement`
5. Get the **Instagram Business Account ID**:
   ```bash
   curl "https://graph.facebook.com/v21.0/me/accounts?fields=instagram_business_account&access_token=YOUR_PAGE_TOKEN"
   ```
6. Add `INSTAGRAM_ACCESS_TOKEN` and `INSTAGRAM_USER_ID` to Cloudflare Pages env vars (see `.env.example`)
7. Switch the Meta app to **Live** mode after App Review (if required)

Copy `.env.example` to `.env.local` for local testing:

```bash
cp .env.example .env.local
```

### Automatic updates

Create a **Deploy Hook** in Cloudflare Pages (Settings → Builds → Deploy hooks), then add it as the GitHub secret `CLOUDFLARE_DEPLOY_HOOK`. The workflow in `.github/workflows/refresh-content.yml` triggers a daily rebuild so new Instagram posts and Google reviews appear without manual deploys.

You can also refresh manually: **Actions → Refresh site content → Run workflow**.

## Google reviews

The reviews section shows live rating, review count, featured quotes, and a carousel from **Google Places API (New)** (max 5 reviews per fetch). A **Leave us a review on Google** button opens Google's official review popup.

**Fallback:** If the API is unavailable or returns no reviews, the site uses curated static content from [`src/data/fallback/google-reviews.json`](src/data/fallback/google-reviews.json). The leave-review button appears only after a successful live fetch provides a Place ID.

See **[docs/GOOGLE_REVIEWS_SETUP.md](docs/GOOGLE_REVIEWS_SETUP.md)** for Place ID discovery and API key setup, or [download the guide](public/docs/google-reviews-setup-guide.md).

Summary:

1. Enable **Places API (New)** in Google Cloud
2. Create an API key restricted to Places API
3. Find the business **Place ID** (see setup doc — build logs can auto-resolve it)
4. Add `GOOGLE_PLACES_API_KEY` and `GOOGLE_PLACE_ID` to Cloudflare Pages env vars

## WhatsApp chat button

A floating WhatsApp icon (bottom-right) lets customers message Isla Café in one tap. Uses click-to-chat — no API keys.

See **[docs/WHATSAPP_SETUP.md](docs/WHATSAPP_SETUP.md)** for client setup, or [download the guide](public/docs/whatsapp-setup-guide.md).

Default number: `(305) 555-0147` (`13055550147`). Set `NEXT_PUBLIC_WHATSAPP_NUMBER` in Cloudflare to replace with the client's real WhatsApp Business number.

## Project structure

- `src/app/[locale]/` — localized routes (`/es`, `/en`)
- `src/components/` — Nav, Hero, sections, animations
- `src/data/instagram-posts.json` — Instagram feed metadata (generated at build)
- `src/data/google-reviews.json` — Google reviews metadata (generated at build)
- `src/data/fallback/` — committed static fallbacks when live API data is missing
- `src/messages/` — Spanish and English copy
- `public/images/` — site photography
- `public/images/instagram/` — downloaded Instagram thumbnails
- `scripts/fetch-instagram.mjs` — Instagram Graph API fetch + image download
- `scripts/fetch-google-reviews.mjs` — Google Places API fetch
- `docs/INSTAGRAM_SETUP.md` — Meta / Cloudflare setup guide for clients
- `docs/GOOGLE_REVIEWS_SETUP.md` — Google Places API setup guide for clients
- `docs/WHATSAPP_SETUP.md` — WhatsApp Business number setup for clients
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
- Testimonial rotator and Google review carousel (live data via Places API)
- Leave a review on Google button
- WhatsApp floating chat button (bottom-right)
- FAQ accordion, newsletter form
- Instagram 4×4 feed (auto-refreshed via scheduled Cloudflare rebuilds)
- Mobile nav drawer and responsive layouts
- `prefers-reduced-motion` support
