"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroCanvas } from "@/components/sections/HeroCanvas";
import { siteImages } from "@/lib/images";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Hero() {
  const t = useTranslations("hero");
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.set("#heroP1", { clearProps: "opacity,transform,filter" });
    gsap.set("#heroP1 > *", { clearProps: "opacity,transform" });
    gsap.set("#scrollCue", { opacity: 1 });
    gsap.set("#heroImgA", { clearProps: "transform" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#top",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.4,
      },
    });

    tl.fromTo("#heroImgA", { scale: 1 }, { scale: 1.14, ease: "none", duration: 1 }, 0)
      .to("#scrollCue", { opacity: 0, duration: 0.06 }, 0.02)
      .to(
        "#heroP1",
        { yPercent: -16, opacity: 0, filter: "blur(6px)", ease: "power1.in", duration: 0.22 },
        0.34,
      )
      .fromTo(
        "#heroP2",
        { yPercent: 14, opacity: 0 },
        { yPercent: 0, opacity: 1, ease: "power1.out", duration: 0.2 },
        0.54,
      )
      .to("#heroP2", { yPercent: -10, opacity: 0, ease: "power1.in", duration: 0.18 }, 0.86);

    gsap.killTweensOf("#heroP1 > *");
    gsap.set("#heroP1 > *", { opacity: 1, y: 0 });

    const intro = gsap.fromTo(
      "#heroP1 > *",
      { y: 36, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.3,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.2,
        immediateRender: false,
        onInterrupt() {
          gsap.set("#heroP1 > *", { opacity: 1, y: 0 });
        },
        onComplete() {
          gsap.set("#heroP1 > *", { clearProps: "opacity,transform" });
        },
      },
    );

    return () => {
      intro.kill();
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [reducedMotion]);

  return (
    <section
      id="top"
      data-hero
      className="relative h-[360vh] bg-ink-deep max-md:h-[240vh]"
    >
      <div
        data-hero-stage
        className="sticky top-0 h-[100svh] overflow-hidden"
      >
        <HeroCanvas />

        <div
          id="heroImgA"
          data-hero-img
          className="absolute inset-0 z-[1] bg-cover bg-[center_40%] bg-no-repeat will-change-[transform,opacity]"
          style={{ backgroundImage: `url(${siteImages.hero})` }}
          role="img"
          aria-label=""
        />

        <div
          className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-[rgba(28,22,15,0.6)] via-[rgba(28,22,15,0.2)] to-[rgba(28,22,15,0.82)]"
          aria-hidden
        />

        <div className="absolute inset-0 z-[4] grid place-items-center px-[6vw] text-center">
          <div
            id="heroP1"
            className="col-start-1 row-start-1 max-w-[1000px] will-change-[transform,opacity]"
          >
            <div className="mb-[26px] flex items-center justify-center gap-4 text-xs font-extrabold tracking-[0.42em] text-gold-muted uppercase">
              <span className="h-px w-11 bg-gradient-to-r from-transparent to-gold" />
              {t("location")}
              <span className="h-px w-11 bg-gradient-to-l from-transparent to-gold" />
            </div>
            <h1 className="font-serif text-[clamp(46px,7.6vw,108px)] leading-[1.05] font-semibold text-balance text-cream-light">
              {t("titleLine1")}
              <br />
              <em className="text-gold-light italic">{t("titleEmphasis")}</em>{" "}
              {t("titleLine2")}
            </h1>
            <p className="mt-6 text-[clamp(16px,1.6vw,21px)] tracking-[0.01em] text-cream-light/82">
              {t("subtitle")}
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href="#menu"
                data-scroll
                className="inline-flex items-center gap-2.5 rounded-full bg-cream px-[30px] py-[15px] text-[13.5px] font-bold tracking-[0.08em] text-ink shadow-[0_12px_32px_rgba(0,0,0,0.28)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(0,0,0,0.36)]"
              >
                {t("ctaMenu")}
              </a>
              <a
                href="#visitanos"
                data-scroll
                className="inline-flex items-center gap-2.5 rounded-full border border-cream-light/42 px-[30px] py-[15px] text-[13.5px] font-bold tracking-[0.08em] text-cream-light transition-[border-color,color] duration-300 hover:border-gold-light hover:text-gold-light"
              >
                {t("ctaDirections")}
              </a>
            </div>
          </div>

          <div
            id="heroP2"
            className="col-start-1 row-start-1 max-w-[1000px] opacity-0 will-change-[transform,opacity]"
          >
            <h2 className="font-serif text-[clamp(38px,5.8vw,84px)] leading-[1.1] font-medium text-balance text-cream-light italic">
              {t("quote").split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  {i === 0 && <br />}
                </span>
              ))}
            </h2>
          </div>
        </div>

        <div
          id="scrollCue"
          className="absolute bottom-[34px] left-1/2 z-[5] flex -translate-x-1/2 flex-col items-center gap-2.5 font-mono text-[10.5px] tracking-[0.28em] text-cream-light/55 uppercase"
        >
          {t("scroll")}
          <span className="h-[46px] w-px animate-cue-drop bg-gradient-to-b from-gold to-transparent" />
        </div>
      </div>
    </section>
  );
}
