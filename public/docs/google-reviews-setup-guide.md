# Google Reviews setup (client handoff)

The reviews section pulls live data from **Google Places API (New)** at build time and saves it to `src/data/google-reviews.json`. A **Leave a review** button opens Google's official review popup.

**Download:** On the live site, open `/docs/google-reviews-setup-guide.md` on your deployed domain, or use the copy in this repo.

## Requirements

- Google Cloud project with **Places API (New)** enabled
- Billing enabled (daily builds typically stay within free-tier credits)
- `GOOGLE_PLACES_API_KEY` and `GOOGLE_PLACE_ID` in Cloudflare Pages env vars

Google returns **at most 5 reviews** per request — enough for the featured rotator and carousel, but not your full review history.

## Step 1 — Find the Place ID

### Option A: Google Maps

1. Open [Google Maps](https://maps.google.com)
2. Search: `Isla Café, 18901 SW 106th Ave, Cutler Bay, FL`
3. Open the business listing → **Share** → copy the link
4. Extract the Place ID from the URL, or use the [Place ID Finder](https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder)

### Option B: Build-time auto-discovery

1. Add only `GOOGLE_PLACES_API_KEY` to Cloudflare (leave `GOOGLE_PLACE_ID` empty)
2. Run `npm run build`
3. Check build logs for `Resolved Place ID: ChIJ...`
4. Save that value as `GOOGLE_PLACE_ID` in Cloudflare env vars

## Step 2 — Google Cloud setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project (or use an existing one)
3. Enable **Places API (New)** (APIs & Services → Library)
4. Create an API key (APIs & Services → Credentials)
5. Restrict the key to **Places API (New)** only
6. Add to Cloudflare Pages → **Settings → Environment variables** (Production):
   - `GOOGLE_PLACES_API_KEY`
   - `GOOGLE_PLACE_ID`

## Step 3 — Verify

```bash
curl -H "X-Goog-Api-Key: YOUR_KEY" \
  -H "X-Goog-FieldMask: id,displayName,rating,userRatingCount,reviews" \
  "https://places.googleapis.com/v1/places/YOUR_PLACE_ID"
```

Redeploy the site. The build runs `scripts/fetch-google-reviews.mjs` and updates the reviews section.

## Leave a review button

When `GOOGLE_PLACE_ID` is set, the site links to:

```
https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID
```

This opens Google's native review form in a new tab. Customers must be signed into Google to post.

## Automatic updates

The workflow `.github/workflows/refresh-content.yml` triggers a daily Cloudflare rebuild (same deploy hook as Instagram). Each rebuild refreshes Google reviews and the Instagram feed.

Manual refresh: GitHub → **Actions → Refresh site content → Run workflow**.

## Local testing

```bash
cp .env.example .env.local
# Fill GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID
npm run build
```

## Troubleshooting

| Symptom | Likely cause |
|---------|----------------|
| Reviews still show seed data | API key or Place ID missing on Cloudflare |
| API error 403 | Places API (New) not enabled or key restricted incorrectly |
| API error 404 | Wrong Place ID |
| Leave review button missing | `GOOGLE_PLACE_ID` empty in fetched JSON |
| Only 5 reviews shown | Google API limit (expected) |
| Stale reviews | Wait for daily cron or run workflow manually |
