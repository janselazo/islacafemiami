"use client";

import { useEffect, useRef, useState } from "react";
import { SiteImage } from "@/components/ui/SiteImage";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const CAFE_VIDEO = "/videos/footer-bg.mp4";
const CAFE_VIDEO_POSTER = "/images/footer-bg-poster.jpg";

type CafeAmbientVideoProps = {
  className?: string;
};

export function CafeAmbientVideo({ className = "" }: CafeAmbientVideoProps) {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "120px 0px" },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion || !inView) {
      video?.pause();
      return;
    }

    video.play().catch(() => {});
  }, [inView, reducedMotion]);

  const showVideo = !reducedMotion && inView;

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

      {showVideo && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover object-center"
          muted
          loop
          playsInline
          preload="none"
          poster={CAFE_VIDEO_POSTER}
          aria-hidden="true"
        >
          <source src={CAFE_VIDEO} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
