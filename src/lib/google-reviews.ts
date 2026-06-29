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

function hasGoogleContent(data: GoogleReviewsData): boolean {
  return data.reviews.length > 0 && data.rating > 0;
}

export const isGoogleReviewsFallback = live.source !== "live";
export const googleReviews = hasGoogleContent(live) ? live : fallback;

export const GOOGLE_REVIEW_URL = googleReviews.reviewUrl;

export const hasGoogleReviewLink = live.source === "live" && Boolean(live.placeId);

export function formatStarRating(rating: number): string {
  const count = Math.max(0, Math.min(5, Math.round(rating)));
  return "★".repeat(count) + "☆".repeat(5 - count);
}
