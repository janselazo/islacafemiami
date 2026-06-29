"use client";

import { useEffect, useRef, useState } from "react";
import { SiteImage } from "@/components/ui/SiteImage";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const CAFE_VIDEO = "/videos/footer-bg.mp4";
export const CAFE_VIDEO_POSTER = "/images/footer-bg-poster.jpg";

type CafeAmbientVideoProps = {
  className?: string;
  variant?: "section" | "hero";
  id?: string;
};

export function CafeAmbientVideo({
  className = "",
  variant = "section",
  id,
}: CafeAmbientVideoProps) {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(variant === "hero");
  const isHero = variant === "hero";

  useEffect(() => {
    if (isHero) return;

    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "120px 0px" },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [isHero]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion || !inView) {
      video?.pause();
      return;
    }

    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay blocked — poster remains visible via the video element.
      });
    }
  }, [inView, reducedMotion, isHero]);

  if (isHero) {
    return (
      <div
        ref={containerRef}
        id={id}
        data-hero-img
        className={`relative overflow-hidden bg-ink-deep ${className}`}
      >
        {reducedMotion ? (
          <SiteImage
            src={CAFE_VIDEO_POSTER}
            alt=""
            fill
            className="object-cover object-[center_42%]"
          />
        ) : (
          <video
            ref={videoRef}
            src={CAFE_VIDEO}
            className="absolute inset-0 h-full w-full object-cover object-[center_42%]"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={CAFE_VIDEO_POSTER}
            aria-hidden="true"
          />
        )}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      data-rv
      className={`relative overflow-hidden border border-border bg-ink-deep ${className}`}
    >
      <SiteImage
        src={CAFE_VIDEO_POSTER}
        alt=""
        fill
        className="object-cover object-center"
      />

      {!reducedMotion && inView && (
        <video
          ref={videoRef}
          src={CAFE_VIDEO}
          className="absolute inset-0 h-full w-full object-cover object-center"
          muted
          loop
          playsInline
          preload="auto"
          poster={CAFE_VIDEO_POSTER}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
