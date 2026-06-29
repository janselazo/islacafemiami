# WhatsApp chat button setup (client handoff)

The site includes a floating **WhatsApp button** fixed to the bottom-right corner. Tapping it opens a chat with Isla Café using WhatsApp click-to-chat — no API keys required.

**Download:** Open `/docs/whatsapp-setup-guide.md` on your deployed domain, or use the copy in this repo.

## How it works

The button links to:

```
https://wa.me/13055550147?text=...
```

- On **mobile**, this opens the WhatsApp app
- On **desktop**, this opens WhatsApp Web (or prompts to install WhatsApp)
- A pre-filled greeting is included in Spanish or English based on the site locale

## Default number

Until configured, the button uses the site placeholder **`(305) 555-0147`** (`13055550147` in E.164 format).

Replace this with the client's real WhatsApp Business number before launch.

## Client setup (3 steps)

### 1. WhatsApp Business account

The client should use **WhatsApp Business** on the café's phone line (recommended for hours, quick replies, and a professional profile).

Download: [WhatsApp Business for iOS](https://apps.apple.com/app/whatsapp-business/id1386412985) or [Android](https://play.google.com/store/apps/details?id=com.whatsapp.wbm)

### 2. Format the phone number (E.164)

Use digits only, with country code — no spaces, dashes, or `+`:

| Display | E.164 for `wa.me` |
|---------|-------------------|
| (305) 555-0147 | `13055550147` |
| +1 305 123 4567 | `13051234567` |

### 3. Add to Cloudflare Pages

Cloudflare Pages → your project → **Settings → Environment variables** (Production):

| Variable | Example |
|----------|---------|
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `13051234567` |

Redeploy the site. The button updates automatically.

For local testing, add the same variable to `.env.local` (see `.env.example`).

## Verify

1. Open the site on your phone
2. Tap the green WhatsApp icon (bottom-right)
3. Confirm WhatsApp opens with the correct number and pre-filled message
4. Send a test message to the client's phone

## Troubleshooting

| Symptom | Likely cause |
|---------|----------------|
| Wrong number opens | `NEXT_PUBLIC_WHATSAPP_NUMBER` not set or incorrect on Cloudflare |
| Button still shows placeholder | Redeploy after updating env var |
| WhatsApp Web instead of app (desktop) | Expected behavior on desktop |
| Number format error | Use E.164 digits only — no `+`, spaces, or parentheses |

## Changing the default message

Edit the `whatsapp.defaultMessage` key in:

- [`src/messages/en.json`](../src/messages/en.json)
- [`src/messages/es.json`](../src/messages/es.json)

## Out of scope

This button uses **click-to-chat** only. Automated replies, order bots, or CRM integration require the [WhatsApp Business Platform API](https://developers.facebook.com/docs/whatsapp) (Meta Business verification) — not needed for a simple contact button.
