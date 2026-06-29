import liveReviews from "@/data/google-reviews.json";
import fallbackReviews from "@/data/fallback/google-reviews.json";

export type GoogleFeaturedReview = {
  id: string;
  quote: string;
  author: string;
};

export type GoogleReview = {
  id: string;
  name: string;
  initial: string;
  rating: number;
  text: string;
  time: string;
  publishTime: string;
};

export type GoogleReviewsData = {
  fetchedAt: string | null;
  source?: string;
  placeId: string;
  reviewUrl: string;
  rating: number;
  reviewCount: number;
  featured: GoogleFeaturedReview[];
  reviews: GoogleReview[];
};

const live = liveReviews as GoogleReviewsData;
const fallback = fallbackReviews as GoogleReviewsData;

const FALLBACK_MAPS_REVIEW_URL =
  "https://www.google.com/maps/search/?api=1&query=Isla+Caf%C3%A9+18901+SW+106th+Ave+Unit+101+Cutler+Bay+FL+33157";

function hasGoogleContent(data: GoogleReviewsData): boolean {
  return data.reviews.length > 0 && data.rating > 0;
}

function buildReviewUrl(placeId: string): string {
  return `https://search.google.com/local/writereview?placeid=${encodeURIComponent(placeId)}`;
}

export function getGoogleReviewUrl(data: GoogleReviewsData): string {
  if (data.placeId) {
    return buildReviewUrl(data.placeId);
  }

  const publicPlaceId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID;
  if (publicPlaceId) {
    return buildReviewUrl(publicPlaceId);
  }

  if (data.reviewUrl && !data.reviewUrl.endsWith("placeid=")) {
    return data.reviewUrl;
  }

  return FALLBACK_MAPS_REVIEW_URL;
}

export const isGoogleReviewsFallback = live.source !== "live";
export const googleReviews = hasGoogleContent(live) ? live : fallback;

export const GOOGLE_REVIEW_URL = getGoogleReviewUrl(googleReviews);
export const hasGoogleReviewLink = Boolean(GOOGLE_REVIEW_URL);

export function formatStarRating(rating: number): string {
  const count = Math.max(0, Math.min(5, Math.round(rating)));
  return "★".repeat(count) + "☆".repeat(5 - count);
}
