"use client";

import { useEffect, useRef, useState } from "react";
import { SiteImage } from "@/components/ui/SiteImage";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { siteImages } from "@/lib/images";

export const CAFE_VIDEO = siteImages.heroVideo;
export const CAFE_VIDEO_POSTER = siteImages.heroVideoPoster;

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
  const [videoFailed, setVideoFailed] = useState(false);
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

    const play = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay blocked — poster image underneath remains visible.
        });
      }
    };

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      play();
    } else {
      video.addEventListener("loadeddata", play, { once: true });
      return () => video.removeEventListener("loadeddata", play);
    }
  }, [inView, reducedMotion, isHero]);

  if (isHero) {
    return (
      <div
        ref={containerRef}
        id={id}
        data-hero-img
        className={`absolute inset-0 z-0 h-full w-full overflow-hidden bg-ink-deep ${className}`}
      >
        <SiteImage
          src={CAFE_VIDEO_POSTER}
          alt=""
          fill
          priority
          className="object-cover object-[center_42%]"
        />

        {!reducedMotion && !videoFailed && (
          <video
            ref={videoRef}
            src={CAFE_VIDEO}
            width={1280}
            height={712}
            className="absolute inset-0 z-[1] block h-full w-full object-cover object-[center_42%]"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            onError={() => setVideoFailed(true)}
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

      {!reducedMotion && inView && !videoFailed && (
        <video
          ref={videoRef}
          src={CAFE_VIDEO}
          width={1280}
          height={712}
          className="absolute inset-0 z-[1] block h-full w-full object-cover object-center"
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          onError={() => setVideoFailed(true)}
        />
      )}
    </div>
  );
}
