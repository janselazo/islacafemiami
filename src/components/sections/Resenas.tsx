"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { reviewAvatarColors } from "@/lib/images";

type Featured = {
  quote: string;
  author: string;
  role: string;
};

type Review = {
  initial: string;
  name: string;
  time: string;
  text: string;
};

export function Resenas() {
  const t = useTranslations("resenas");
  const featured = t.raw("featured") as Featured[];
  const reviews = t.raw("reviews") as Review[];
  const [active, setActive] = useState(0);

  useEffect(() => {
    let timer = setInterval(() => {
      setActive((current) => (current + 1) % featured.length);
    }, 6000);

    const section = document.querySelector("#resenas");
    const pause = () => clearInterval(timer);
    const resume = () => {
      timer = setInterval(() => {
        setActive((current) => (current + 1) % featured.length);
      }, 6000);
    };

    section?.addEventListener("mouseenter", pause);
    section?.addEventListener("mouseleave", resume);

    return () => {
      clearInterval(timer);
      section?.removeEventListener("mouseenter", pause);
      section?.removeEventListener("mouseleave", resume);
    };
  }, [featured.length]);

  const scrollReviews = (direction: "prev" | "next") => {
    const track = document.querySelector<HTMLElement>("[data-grev-track]");
    const card = track?.querySelector("div");
    if (!track || !card) return;
    const step = card.getBoundingClientRect().width + 18;
    track.scrollBy({ left: direction === "next" ? step : -step, behavior: "smooth" });
  };

  return (
    <section id="resenas" className="bg-ink-warm py-[clamp(90px,11vw,150px)] text-cream-light">
      <div className="mx-auto max-w-[1240px] px-[clamp(20px,5vw,64px)]">
        <SectionHeader number={t("number")} label={t("label")} centered dark />

        <div data-testi className="mt-[30px] grid min-h-[300px]">
          {featured.map((item, index) => (
            <div
              key={item.author}
              data-testi-item
              className="col-start-1 row-start-1 flex flex-col items-center gap-6 text-center transition-opacity duration-[900ms] ease-in-out"
              style={{
                opacity: index === active ? 1 : 0,
                pointerEvents: index === active ? "auto" : "none",
              }}
            >
              <div className="flex gap-1 text-base tracking-[3px] text-gold-light">
                ★★★★★
              </div>
              <p className="max-w-[21ch] font-serif text-[clamp(24px,3vw,40px)] leading-[1.32] font-medium text-pretty italic">
                {item.quote}
              </p>
              <span className="text-[13px] font-bold tracking-[0.22em] text-gold-muted uppercase">
                {item.author} ·{" "}
                <span className="text-gold-light">{item.role}</span>
              </span>
            </div>
          ))}
        </div>

        <div data-testi-dots className="mt-6 flex justify-center gap-2.5">
          {featured.map((item, index) => (
            <button
              key={item.author}
              type="button"
              data-testi-dot
              aria-label={`Show review ${index + 1}`}
              onClick={() => setActive(index)}
              className={`h-2 w-2 rounded-full border-0 p-0 transition-all duration-300 ${
                index === active
                  ? "scale-[1.35] bg-gold-light"
                  : "scale-100 bg-cream-light/25"
              }`}
            />
          ))}
        </div>

        <div className="mt-[74px]">
          <div
            data-rv
            className="mb-[26px] flex flex-wrap items-center justify-between gap-5"
          >
            <div className="flex items-center gap-4">
              <div className="grid h-9 w-9 flex-none place-items-center rounded-full bg-cream-light font-sans font-extrabold text-ink">
                G
              </div>
              <div className="flex items-baseline gap-2.5">
                <strong className="font-serif text-[30px] leading-none font-bold">
                  {t("googleRating")}
                </strong>
                <div>
                  <div className="text-[15px] tracking-[2px] text-gold-light">
                    ★★★★★
                  </div>
                  <span className="mt-0.5 block text-[13px] text-cream-light/60">
                    {t("googleCount")}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2.5">
              <button
                type="button"
                data-grev-prev
                onClick={() => scrollReviews("prev")}
                className="h-[46px] w-[46px] rounded-full border border-cream-light/22 bg-transparent text-[17px] text-cream-light transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-light hover:text-gold-light"
                aria-label="Previous reviews"
              >
                ‹
              </button>
              <button
                type="button"
                data-grev-next
                onClick={() => scrollReviews("next")}
                className="h-[46px] w-[46px] rounded-full border border-cream-light/22 bg-transparent text-[17px] text-cream-light transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-light hover:text-gold-light"
                aria-label="Next reviews"
              >
                ›
              </button>
            </div>
          </div>

          <div
            data-grev-track
            className="scrollbar-none flex gap-[18px] overflow-x-auto scroll-smooth px-1 pt-1 pb-4 [scroll-snap-type:x_mandatory]"
          >
            {reviews.map((review, index) => (
              <article
                key={review.name}
                className="flex min-w-[min(360px,82vw)] flex-none snap-start flex-col gap-3.5 border border-cream-light/12 bg-cream-light/5 p-[26px]"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`grid h-[42px] w-[42px] place-items-center rounded-full font-bold text-cream-light ${reviewAvatarColors[index]}`}
                  >
                    {review.initial}
                  </div>
                  <div className="min-w-0 flex-1">
                    <strong className="block text-[14.5px]">{review.name}</strong>
                    <span className="text-xs text-cream-light/55">{review.time}</span>
                  </div>
                  <div className="text-[13px] text-gold-light">★★★★★</div>
                </div>
                <p className="text-[14.5px] leading-[1.65] text-pretty text-cream-light/78">
                  {review.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
