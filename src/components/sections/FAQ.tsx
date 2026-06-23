"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";

type FaqItem = {
  question: string;
  answer: string;
};

export function FAQ() {
  const t = useTranslations("faq");
  const items = t.raw("items") as FaqItem[];

  useEffect(() => {
    const faqs = Array.from(document.querySelectorAll<HTMLDetailsElement>("[data-faq]"));

    faqs.forEach((details) => {
      const mark = details.querySelector<HTMLElement>("summary span:last-child");
      const onToggle = () => {
        if (details.open) {
          faqs.forEach((other) => {
            if (other !== details && other.open) {
              other.open = false;
              const otherMark = other.querySelector<HTMLElement>("summary span:last-child");
              if (otherMark) otherMark.textContent = "+";
            }
          });
        }
        if (mark) mark.textContent = details.open ? "–" : "+";
      };

      details.addEventListener("toggle", onToggle);
    });
  }, [items]);

  return (
    <section className="bg-cream py-[clamp(80px,9vw,130px)]">
      <div className="mx-auto max-w-[880px] px-[clamp(20px,5vw,64px)]">
        <SectionHeader number={t("number")} label={t("label")} />

        <div data-rv-group className="mt-9 flex flex-col">
          {items.map((item, index) => (
            <details
              key={item.question}
              data-faq
              className={`border-t border-border py-2 ${index === items.length - 1 ? "border-b" : ""}`}
            >
              <summary className="flex cursor-pointer items-center justify-between gap-5 py-[18px]">
                <span className="font-serif text-[23px]">{item.question}</span>
                <span className="font-sans text-[22px] text-gold-dark">+</span>
              </summary>
              <p className="max-w-[60ch] pb-5 text-[15.5px] leading-[1.7] text-muted">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
