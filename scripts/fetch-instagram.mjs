#!/usr/bin/env node

/**
 * Fetches the latest Instagram posts via Graph API and writes static assets
 * for the homepage feed. Runs automatically before `npm run build`.
 *
 * Required env vars:
 *   INSTAGRAM_ACCESS_TOKEN — Page access token with instagram_basic
 *   INSTAGRAM_USER_ID      — Instagram Business Account ID
 */

import { copyFile, mkdir, readFile, readdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUTPUT_JSON = path.join(ROOT, "src", "data", "instagram-posts.json");
const FALLBACK_JSON = path.join(ROOT, "src", "data", "fallback", "instagram-posts.json");
const IMAGE_DIR = path.join(ROOT, "public", "images", "instagram");
const SETUP_GUIDE_SOURCE = path.join(ROOT, "docs", "INSTAGRAM_SETUP.md");
const SETUP_GUIDE_PUBLIC = path.join(ROOT, "public", "docs", "instagram-setup-guide.md");

const API_VERSION = "v21.0";
const POST_LIMIT = 16;

async function syncSetupGuide() {
  await mkdir(path.dirname(SETUP_GUIDE_PUBLIC), { recursive: true });
  await copyFile(SETUP_GUIDE_SOURCE, SETUP_GUIDE_PUBLIC);
}

async function ensureFallbackJson() {
  let existing = null;

  try {
    existing = JSON.parse(await readFile(OUTPUT_JSON, "utf8"));
  } catch {
    // File missing — seed below
  }

  if (existing?.posts?.length > 0) {
    return;
  }

  const fallback = JSON.parse(await readFile(FALLBACK_JSON, "utf8"));
  await mkdir(path.dirname(OUTPUT_JSON), { recursive: true });
  await writeFile(OUTPUT_JSON, `${JSON.stringify(fallback, null, 2)}\n`);
  console.log(`Seeded ${path.relative(ROOT, OUTPUT_JSON)} from fallback data.`);
}

function resolveImageUrl(item) {
  if (item.media_type === "VIDEO") {
    return item.thumbnail_url ?? null;
  }

  if (item.media_type === "CAROUSEL_ALBUM" && item.children?.data?.length) {
    const child =
      item.children.data.find((entry) => entry.media_url || entry.thumbnail_url) ??
      item.children.data[0];

    if (child.media_type === "VIDEO") {
      return child.thumbnail_url ?? null;
    }

    return child.media_url ?? null;
  }

  return item.media_url ?? null;
}

async function downloadImage(url, filename) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to download ${url}: ${response.status}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  await writeFile(path.join(IMAGE_DIR, filename), buffer);
}

async function cleanupImages(keepIds) {
  let entries = [];

  try {
    entries = await readdir(IMAGE_DIR);
  } catch {
    return;
  }

  await Promise.all(
    entries
      .filter((entry) => entry.endsWith(".jpg") && !keepIds.has(entry.replace(/\.jpg$/, "")))
      .map((entry) => unlink(path.join(IMAGE_DIR, entry))),
  );
}

async function fetchMedia(token, userId) {
  const fields = [
    "id",
    "caption",
    "media_type",
    "media_url",
    "thumbnail_url",
    "permalink",
    "timestamp",
    "children{media_type,media_url,thumbnail_url}",
  ].join(",");

  const url = new URL(`https://graph.facebook.com/${API_VERSION}/${userId}/media`);
  url.searchParams.set("fields", fields);
  url.searchParams.set("limit", String(POST_LIMIT));
  url.searchParams.set("access_token", token);

  const response = await fetch(url);

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Instagram API error ${response.status}: ${body}`);
  }

  return response.json();
}

async function main() {
  await syncSetupGuide();
  await ensureFallbackJson();

  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;

  if (!token || !userId) {
    console.warn(
      "Instagram env vars not set (INSTAGRAM_ACCESS_TOKEN, INSTAGRAM_USER_ID) — using existing feed data.",
    );
    return;
  }

  console.log("Fetching latest Instagram posts…");

  const payload = await fetchMedia(token, userId);
  const items = payload.data ?? [];

  await mkdir(IMAGE_DIR, { recursive: true });

  const posts = [];

  for (const item of items) {
    const imageUrl = resolveImageUrl(item);

    if (!imageUrl || !item.permalink) {
      continue;
    }

    const filename = `${item.id}.jpg`;

    try {
      await downloadImage(imageUrl, filename);
    } catch (error) {
      console.warn(`Skipping ${item.id}: ${error instanceof Error ? error.message : error}`);
      continue;
    }

    posts.push({
      id: item.id,
      permalink: item.permalink,
      localSrc: `/images/instagram/${filename}`,
      alt: item.caption?.slice(0, 120) ?? "Isla Café Miami on Instagram",
      timestamp: item.timestamp,
    });
  }

  await cleanupImages(new Set(posts.map((post) => post.id)));

  if (posts.length === 0) {
    console.warn("No Instagram posts fetched — keeping existing instagram-posts.json.");
    return;
  }

  const feed = {
    fetchedAt: new Date().toISOString(),
    source: "live",
    posts,
  };

  await writeFile(OUTPUT_JSON, `${JSON.stringify(feed, null, 2)}\n`);
  console.log(`Saved ${posts.length} Instagram posts to ${path.relative(ROOT, OUTPUT_JSON)}`);
}

main().catch(async (error) => {
  console.error(error instanceof Error ? error.message : error);
  console.warn("Keeping existing instagram-posts.json due to fetch failure.");
  process.exit(0);
});
