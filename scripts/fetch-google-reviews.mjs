#!/usr/bin/env node

/**
 * Fetches Google reviews via Places API (New) at build time.
 *
 * Required env vars:
 *   GOOGLE_PLACES_API_KEY — API key with Places API (New) enabled
 *   GOOGLE_PLACE_ID       — Business Place ID (optional; resolved via Text Search if missing)
 */

import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUTPUT_JSON = path.join(ROOT, "src", "data", "google-reviews.json");
const FALLBACK_JSON = path.join(ROOT, "src", "data", "fallback", "google-reviews.json");
const SETUP_GUIDE_SOURCE = path.join(ROOT, "docs", "GOOGLE_REVIEWS_SETUP.md");
const SETUP_GUIDE_PUBLIC = path.join(ROOT, "public", "docs", "google-reviews-setup-guide.md");
const WHATSAPP_GUIDE_SOURCE = path.join(ROOT, "docs", "WHATSAPP_SETUP.md");
const WHATSAPP_GUIDE_PUBLIC = path.join(ROOT, "public", "docs", "whatsapp-setup-guide.md");

const TEXT_SEARCH_QUERY = "Isla Café 18901 SW 106th Ave Cutler Bay FL";
const FIELD_MASK = "id,displayName,rating,userRatingCount,reviews";

function normalizePlaceId(id) {
  if (!id) return "";
  return id.startsWith("places/") ? id.slice("places/".length) : id;
}

function reviewUrl(placeId) {
  return `https://search.google.com/local/writereview?placeid=${encodeURIComponent(placeId)}`;
}

function getInitial(name) {
  const trimmed = name.trim();
  return trimmed ? trimmed[0].toUpperCase() : "?";
}

function mapReview(review, index) {
  const name = review.authorAttribution?.displayName ?? "Google user";
  const text = review.text?.text?.trim() ?? "";

  return {
    id: review.name ?? `review-${index}`,
    name,
    initial: getInitial(name),
    rating: review.rating ?? 5,
    text,
    time: review.relativePublishTimeDescription ?? "",
    publishTime: review.publishTime ?? "",
  };
}

function pickFeatured(reviews) {
  return [...reviews]
    .filter((review) => review.rating >= 4 && review.text.length > 0)
    .sort((a, b) => b.text.length - a.text.length)
    .slice(0, 3)
    .map((review) => ({
      id: review.id,
      quote: review.text,
      author: review.name,
    }));
}

async function syncSetupGuide() {
  try {
    await mkdir(path.dirname(SETUP_GUIDE_PUBLIC), { recursive: true });
    await copyFile(SETUP_GUIDE_SOURCE, SETUP_GUIDE_PUBLIC);
    await copyFile(WHATSAPP_GUIDE_SOURCE, WHATSAPP_GUIDE_PUBLIC);
  } catch {
    // Guide docs may not exist yet during first install
  }
}

async function ensureFallbackJson() {
  let existing = null;

  try {
    existing = JSON.parse(await readFile(OUTPUT_JSON, "utf8"));
  } catch {
    // File missing — seed below
  }

  if (existing?.reviews?.length > 0 && existing.rating > 0) {
    return;
  }

  const fallback = JSON.parse(await readFile(FALLBACK_JSON, "utf8"));
  await mkdir(path.dirname(OUTPUT_JSON), { recursive: true });
  await writeFile(OUTPUT_JSON, `${JSON.stringify(fallback, null, 2)}\n`);
  console.log(`Seeded ${path.relative(ROOT, OUTPUT_JSON)} from fallback data.`);
}

async function resolvePlaceId(apiKey, placeId) {
  if (placeId) {
    return normalizePlaceId(placeId);
  }

  console.log("GOOGLE_PLACE_ID not set — searching by business address…");

  const response = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "places.id,places.displayName",
    },
    body: JSON.stringify({ textQuery: TEXT_SEARCH_QUERY }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Places Text Search error ${response.status}: ${body}`);
  }

  const payload = await response.json();
  const match = payload.places?.[0];

  if (!match?.id) {
    throw new Error("No place found for Isla Café — set GOOGLE_PLACE_ID manually.");
  }

  const resolved = normalizePlaceId(match.id);
  console.log(
    `Resolved Place ID: ${resolved} (${match.displayName?.text ?? "Isla Café"})`,
  );
  console.log("Add GOOGLE_PLACE_ID to Cloudflare Pages env vars to skip Text Search.");

  return resolved;
}

async function fetchPlaceDetails(apiKey, placeId) {
  const response = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
    headers: {
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": FIELD_MASK,
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Places Details error ${response.status}: ${body}`);
  }

  return response.json();
}

async function main() {
  await syncSetupGuide();
  await ensureFallbackJson();

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    console.warn(
      "GOOGLE_PLACES_API_KEY not set — using existing google-reviews.json data.",
    );
    return;
  }

  console.log("Fetching Google reviews…");

  const placeId = await resolvePlaceId(apiKey, process.env.GOOGLE_PLACE_ID);
  const place = await fetchPlaceDetails(apiKey, placeId);
  const reviews = (place.reviews ?? []).map(mapReview).filter((review) => review.text);
  const featured = pickFeatured(reviews);

  if (reviews.length === 0 || !place.rating) {
    console.warn("No Google reviews fetched — keeping existing google-reviews.json.");
    return;
  }

  const payload = {
    fetchedAt: new Date().toISOString(),
    source: "live",
    placeId,
    reviewUrl: reviewUrl(placeId),
    rating: place.rating ?? 0,
    reviewCount: place.userRatingCount ?? 0,
    featured,
    reviews,
  };

  await writeFile(OUTPUT_JSON, `${JSON.stringify(payload, null, 2)}\n`);
  console.log(
    `Saved ${reviews.length} reviews (rating ${payload.rating}, count ${payload.reviewCount}) to ${path.relative(ROOT, OUTPUT_JSON)}`,
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  console.warn("Keeping existing google-reviews.json due to fetch failure.");
  process.exit(0);
});
