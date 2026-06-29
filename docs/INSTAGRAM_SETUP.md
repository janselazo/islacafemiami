# Instagram feed setup (client handoff)

The homepage Instagram grid pulls the latest 16 posts from [@islacafemiami](https://www.instagram.com/islacafemiami/) at build time via the [Instagram Graph API](https://developers.facebook.com/docs/instagram-api).

**Download:** On the live site, use **Download setup guide** in the Instagram section (shown until the feed is connected), or open `/docs/instagram-setup-guide.md` on your deployed domain.

## Requirements

- Instagram account must be **Business or Creator** (not personal)
- Account must stay **public** and linked to the restaurant’s **Facebook Page**
- A Meta Developer app with Instagram Graph API enabled
- A **Page access token** (not a short-lived user token)

## Step 1 — Instagram & Facebook

1. Open Instagram → Settings → Account → Switch to professional account → choose **Business** or **Creator**
2. In Instagram → Settings → Account → Linked accounts → connect the restaurant **Facebook Page**
3. Confirm [@islacafemiami](https://www.instagram.com/islacafemiami/) is **public**

## Step 2 — Meta Developer app

1. Go to [developers.facebook.com](https://developers.facebook.com/) and create an app (type: Business)
2. Add the **Instagram Graph API** product
3. Under App roles, add the restaurant Page admin as **Developer** or **Admin** (or have them create the app under their Business Manager)

## Step 3 — Generate a Page access token

1. Open [Graph API Explorer](https://developers.facebook.com/tools/explorer/)
2. Select your app
3. Add permissions: `instagram_basic`, `pages_read_engagement`, `pages_show_list`
4. Generate a User access token and approve access to the restaurant Facebook Page
5. Exchange for a long-lived user token:
   ```bash
   curl "https://graph.facebook.com/v21.0/oauth/access_token?grant_type=fb_exchange_token&client_id=APP_ID&client_secret=APP_SECRET&fb_exchange_token=SHORT_LIVED_TOKEN"
   ```
6. Get the Page access token:
   ```bash
   curl "https://graph.facebook.com/v21.0/me/accounts?access_token=LONG_LIVED_USER_TOKEN"
   ```
   Use the `access_token` from the Page object in the response — this is your `INSTAGRAM_ACCESS_TOKEN`.

## Step 4 — Get the Instagram Business Account ID

```bash
curl "https://graph.facebook.com/v21.0/me/accounts?fields=instagram_business_account&access_token=PAGE_ACCESS_TOKEN"
```

Copy the numeric `instagram_business_account.id` — this is your `INSTAGRAM_USER_ID`.

Verify the feed endpoint:

```bash
curl "https://graph.facebook.com/v21.0/INSTAGRAM_USER_ID/media?fields=id,permalink&limit=16&access_token=PAGE_ACCESS_TOKEN"
```

## Step 5 — Cloudflare Pages environment variables

In Cloudflare Pages → your project → **Settings → Environment variables** (Production):

| Variable | Value |
|----------|--------|
| `INSTAGRAM_ACCESS_TOKEN` | Page access token from Step 3 |
| `INSTAGRAM_USER_ID` | Instagram Business Account ID from Step 4 |

Redeploy the site. The build runs `scripts/fetch-instagram.mjs`, downloads images to `public/images/instagram/`, and fills the 4×4 grid.

## Step 6 — Live mode

Switch the Meta app from **Development** to **Live** after App Review if Meta requires it for production traffic.

## Automatic daily refresh

1. Cloudflare Pages → **Settings → Builds → Deploy hooks** → Create hook
2. GitHub repo → **Settings → Secrets → Actions** → add `CLOUDFLARE_DEPLOY_HOOK` with the hook URL
3. The workflow `.github/workflows/refresh-instagram.yml` triggers a rebuild daily at 12:00 UTC

Manual refresh: GitHub → **Actions → Refresh Instagram feed → Run workflow**.

## Local testing

```bash
cp .env.example .env.local
# Fill INSTAGRAM_ACCESS_TOKEN and INSTAGRAM_USER_ID
npm run build
```

## Troubleshooting

| Symptom | Likely cause |
|---------|----------------|
| Empty grid after deploy | Env vars missing or wrong on Cloudflare |
| API error 190 | Token expired or revoked — regenerate Page token |
| API error 100 / permissions | App missing `instagram_basic` or not approved |
| Feed stopped updating | Deploy hook secret missing or Meta app disconnected |
| Posts stale | Wait for daily cron or run workflow manually |

## Token maintenance

Page access tokens from a long-lived user token typically **do not expire on a schedule**. Reconnect only if the client removes app access, changes Facebook security settings, or disconnects Instagram from the Page.
