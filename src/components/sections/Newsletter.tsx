"use client";

import { FormEvent, useState } from "react";
import gsap from "gsap";
import { useTranslations } from "next-intl";

export function Newsletter() {
  const t = useTranslations("newsletter");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = form.querySelector<HTMLInputElement>("[data-news-email]");
    if (!email) return;

    if (!email.value.trim() || !/.+@.+\..+/.test(email.value)) {
      gsap.fromTo(email, { x: -6 }, { x: 0, duration: 0.4, ease: "elastic.out(1,.35)" });
      email.style.borderColor = "#D8B988";
      return;
    }

    setSubmitted(true);
    email.value = "";
  };

  return (
    <div
      data-rv
      data-news-grid
      className="mt-16 grid items-center gap-9 rounded-sm bg-forest p-[clamp(34px,5vw,56px)] lg:grid-cols-[1.1fr_0.9fr]"
    >
      <div>
        <h3 className="max-w-[20ch] font-serif text-[clamp(26px,3vw,38px)] leading-[1.1] font-semibold text-balance text-cream-light">
          {t("title")}
        </h3>
        <p className="mt-3 max-w-[42ch] text-[15px] text-cream-light/72">
          {t("body")}
        </p>
      </div>

      <form
        data-news-form
        onSubmit={handleSubmit}
        className="flex flex-wrap gap-2.5"
      >
        <input
          data-news-email
          type="email"
          placeholder={t("placeholder")}
          className="min-w-[180px] flex-1 appearance-none rounded-full border border-cream-light/25 bg-cream-light/8 px-[18px] py-[15px] font-sans text-[15px] text-cream-light outline-none focus:border-gold-light"
        />
        <button
          type="submit"
          className="cursor-pointer rounded-full border-0 bg-gold-light px-7 py-[15px] font-sans text-[13.5px] font-bold tracking-[0.06em] text-ink-warm transition-transform duration-300 hover:-translate-y-0.5"
          style={submitted ? { background: "#C9B69A" } : undefined}
        >
          {submitted ? t("thanks") : t("submit")}
        </button>
      </form>
    </div>
  );
}
