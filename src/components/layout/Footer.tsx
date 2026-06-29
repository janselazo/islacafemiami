"use client";

import { useTranslations } from "next-intl";
import { SiteImage } from "@/components/ui/SiteImage";
import { OrderMenu } from "@/components/ui/OrderMenu";
import { siteImages } from "@/lib/images";

const footerLinks = [
  { href: "#menu", key: "menu" as const },
  { href: "#historia", key: "historia" as const },
  { href: "#espacio", key: "espacio" as const },
  { href: "#visitanos", key: "visitanos" as const },
];

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  return (
    <footer className="relative overflow-hidden py-[clamp(60px,7vw,90px)] pb-10 text-cream-light">
      <div className="absolute inset-0 bg-ink-deep" aria-hidden="true">
        <SiteImage
          src={siteImages.footerBg}
          alt=""
          fill
          className="object-cover object-[center_42%]"
        />
      </div>

      <div className="absolute inset-0 bg-ink-deep/72" aria-hidden="true" />

      <div className="relative z-[1] mx-auto max-w-[1240px] px-[clamp(20px,5vw,64px)]">
        <div
          data-foot-grid
          className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr]"
        >
          <div>
            <SiteImage
              src={siteImages.logo}
              alt="Isla Café"
              className="mb-[18px] h-[74px] w-[74px] rounded-full object-cover"
            />
            <p className="max-w-[34ch] text-[14.5px] leading-[1.7] text-cream-light/60">
              {t("tagline")}
            </p>
          </div>

          <div>
            <div className="mb-4 text-[11px] font-extrabold tracking-[0.24em] text-gold-muted uppercase">
              {t("explore")}
            </div>
            <div className="flex flex-col gap-[11px] text-[14.5px] text-cream-light/72">
              {footerLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  data-scroll
                  className="transition-colors duration-300 hover:text-gold-light"
                >
                  {nav(link.key)}
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-4 text-[11px] font-extrabold tracking-[0.24em] text-gold-muted uppercase">
              {t("order")}
            </div>
            <OrderMenu variant="footer" />
          </div>

          <div>
            <div className="mb-4 text-[11px] font-extrabold tracking-[0.24em] text-gold-muted uppercase">
              {t("follow")}
            </div>
            <div className="flex flex-col gap-[11px] text-[14.5px] text-cream-light/72">
              <a
                href="https://www.instagram.com/islacafemiami/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-300 hover:text-gold-light"
              >
                {t("instagram")}
              </a>
              <a href="#" className="transition-colors duration-300 hover:text-gold-light">
                {t("facebook")}
              </a>
              <a href="#" className="transition-colors duration-300 hover:text-gold-light">
                {t("tiktok")}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-[54px] border-t border-cream-light/12 pt-6">
          <div className="flex flex-wrap justify-between gap-4 font-mono text-[11px] tracking-[0.1em] text-cream-light/45">
            <span>{t("copyright")}</span>
            <span>{t("madeIn")}</span>
          </div>
          <p className="mt-3 text-center text-[11px] tracking-[0.06em] text-cream-light/40">
            {t("developedBy")}{" "}
            <a
              href="https://zenpho.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream-light/55 transition-colors duration-300 hover:text-gold-light"
            >
              Zenpho
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
