#!/usr/bin/env node

/**
 * Downloads Isla Café site images from Higgsfield generation URLs.
 *
 * Usage:
 *   1. List generations via Higgsfield MCP: show_generations / show_medias
 *   2. Fill IMAGE_URLS below with rawUrl values matched to each slot
 *   3. Run: npm run download-images
 *
 * Or pass a JSON manifest:
 *   node scripts/download-higgsfield-images.mjs path/to/manifest.json
 */

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.join(__dirname, "..", "public", "images");

const IMAGE_SLOTS = {
  "logo.jpg": ["logo", "islacafe", "brand"],
  "hero.jpeg": ["hero", "exterior", "cafe exterior"],
  "barista-pour.jpeg": ["barista", "pour", "latte art"],
  "pastelitos-historia.jpeg": ["pastelito", "guava", "pastry", "historia"],
  "cafe-con-leche.jpeg": ["cafe con leche", "coffee", "latte"],
  "tostada-isla.jpeg": ["tostada", "avocado", "toast", "brunch"],
  "pastelitos-menu.jpeg": ["pastelito", "menu", "bakery"],
  "salon.jpeg": ["salon", "interior", "dining room"],
  "barra.jpeg": ["bar", "counter", "espresso bar"],
  "plantas.jpeg": ["plant", "greenery", "interior plant"],
  "mesa-al-sol.jpeg": ["sun", "outdoor", "patio", "table"],
  "pour-over.jpeg": ["pour over", "v60", "filter coffee"],
};

/** Replace with Higgsfield rawUrl map when MCP is available */
const IMAGE_URLS = {};

async function downloadFile(url, filename) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download ${filename}: ${response.status}`);
  }
  const buffer = Buffer.from(await response.arrayBuffer());
  await writeFile(path.join(outputDir, filename), buffer);
  console.log(`Saved ${filename}`);
}

async function main() {
  await mkdir(outputDir, { recursive: true });

  const manifestPath = process.argv[2];
  let urls = IMAGE_URLS;

  if (manifestPath) {
    const { readFile } = await import("node:fs/promises");
    urls = JSON.parse(await readFile(manifestPath, "utf8"));
  }

  const entries = Object.entries(urls);
  if (entries.length === 0) {
    console.log("No image URLs configured.");
    console.log("Expected slots:", Object.keys(IMAGE_SLOTS).join(", "));
    console.log("Provide a manifest JSON mapping filename -> rawUrl, or edit IMAGE_URLS in this script.");
    process.exit(1);
  }

  for (const [filename, url] of entries) {
    await downloadFile(url, filename);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
