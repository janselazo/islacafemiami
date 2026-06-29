import liveFeed from "@/data/instagram-posts.json";
import fallbackFeed from "@/data/fallback/instagram-posts.json";

export type InstagramPost = {
  id: string;
  permalink: string;
  localSrc: string;
  alt: string;
  timestamp: string;
};

export type InstagramFeedData = {
  fetchedAt: string | null;
  source?: string;
  posts: InstagramPost[];
};

const live = liveFeed as InstagramFeedData;
const fallback = fallbackFeed as InstagramFeedData;

function hasInstagramContent(data: InstagramFeedData): boolean {
  return data.posts.length > 0;
}

export const isInstagramFallback = live.source !== "live";
export const instagramFeed = hasInstagramContent(live) ? live : fallback;

export const INSTAGRAM_PROFILE_URL = "https://www.instagram.com/islacafemiami/";

export const INSTAGRAM_SETUP_GUIDE_PATH = "/docs/instagram-setup-guide.md";

export const INSTAGRAM_SETUP_GUIDE_FILENAME = "Isla-Cafe-Instagram-Setup-Guide.md";
