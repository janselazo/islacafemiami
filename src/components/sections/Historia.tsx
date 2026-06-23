"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { SiteImage } from "@/components/ui/SiteImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { siteImages } from "@/lib/images";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Historia() {
  const t = useTranslations("historia");
  const reducedMotion = useReducedMotion();
  const pillars = t.raw("pillars") as Array<{
    letter: string;
    title: string;
    body: string;
  }>;

  useEffect(() => {
    if (reducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);
    const triggers: ScrollTrigger[] = [];

    document.querySelectorAll<HTMLElement>("[data-plx]").forEach((el) => {
      const amt = parseFloat(el.dataset.plx || "0") * (0.55 / 0.55);
      const tween = gsap.fromTo(
        el,
        { yPercent: amt },
        {
          yPercent: -amt,
          ease: "none",
          scrollTrigger: {
            trigger: el.closest("section"),
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    });

    return () => triggers.forEach((trigger) => trigger.kill());
  }, [reducedMotion]);

  return (
    <section id="historia" className="relative bg-forest py-[clamp(90px,11vw,150px)] text-cream-light">
      <div className="mx-auto max-w-[1240px] px-[clamp(20px,5vw,64px)]">
        <SectionHeader number={t("number")} label={t("label")} dark />

        <div
          className="mt-16 grid items-start gap-[clamp(36px,5vw,84px)] md:grid-cols-[1.05fr_0.95fr]"
          data-hist-split
        >
          <div>
            <h2
              data-rv
              className="max-w-[16ch] font-serif text-[clamp(34px,4.4vw,60px)] leading-[1.06] font-semibold text-balance"
            >
              {t("titleLine1")}{" "}
              <em className="text-gold-light italic">{t("titleEmphasis")}</em>
              {t("titlePunct")}
            </h2>
            <p
              data-rv
              className="mt-6 max-w-[50ch] text-lg text-cream-light/74"
            >
              {t("body")}
            </p>

            <div className="mt-[46px] grid gap-0" data-rv-group>
              {pillars.map((pillar, index) => (
                <div
                  key={pillar.letter}
                  className={`grid grid-cols-[48px_1fr] items-start gap-4 border-t border-cream-light/16 py-6 sm:grid-cols-[60px_1fr] sm:gap-5 sm:py-[30px] ${
                    index === pillars.length - 1 ? "border-b border-cream-light/16" : ""
                  }`}
                >
                  <span className="pt-1 font-mono text-[11px] tracking-[0.18em] text-gold sm:pt-1.5 sm:text-xs">
                    {pillar.letter}
                  </span>
                  <div>
                    <h3 className="mb-2 font-serif text-[22px] sm:text-[26px]">{pillar.title}</h3>
                    <p className="max-w-[46ch] text-[15px] leading-[1.7] text-cream-light/66">
                      {pillar.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto min-h-[320px] max-w-[420px] md:mx-0 md:max-w-none md:min-h-[560px]" data-hist-media>
            <div
              data-plx="8"
              className="absolute top-0 right-0 aspect-[3/4] w-[82%] overflow-hidden border border-cream-light/16 shadow-[0_40px_80px_rgba(0,0,0,0.32)] will-change-transform sm:w-[88%]"
            >
              <SiteImage src={siteImages.baristaPour} alt="" fill priority />
            </div>
            <div
              data-plx="-12"
              className="absolute bottom-0 left-0 aspect-square w-[54%] overflow-hidden border border-cream-light/18 shadow-[0_30px_60px_rgba(0,0,0,0.3)] will-change-transform"
            >
              <SiteImage src={siteImages.pastelitosHistoria} alt="" fill />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
