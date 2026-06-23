"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { SiteImage } from "@/components/ui/SiteImage";
import { Link, usePathname } from "@/i18n/navigation";
import { siteImages } from "@/lib/images";

const navLinks = [
  { href: "#historia", key: "historia" as const },
  { href: "#menu", key: "menu" as const },
  { href: "#espacio", key: "espacio" as const },
  { href: "#visitanos", key: "visitanos" as const },
];

export function Nav() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navClass = scrolled
    ? "h-[66px] border-b border-ink/8 bg-cream/88 shadow-[0_8px_32px_rgba(43,36,29,0.07)] backdrop-blur-[18px] backdrop-saturate-[1.4]"
    : "h-[88px] border-b border-transparent bg-transparent shadow-none";

  const linkClass = scrolled
    ? "text-ink"
    : "text-white/85 hover:text-white";

  const langBorder = scrolled ? "border-ink/15" : "border-white/35";
  const inactiveLang = scrolled ? "text-ink/70" : "text-white/70";

  return (
    <>
      <nav
        id="islaNav"
        className={`fixed inset-x-0 top-0 z-[100] flex items-center justify-between px-[clamp(20px,4vw,48px)] transition-[height,background,box-shadow,border-color] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${navClass}`}
      >
        <Link href="/#top" data-scroll className="flex items-center">
          <SiteImage
            src={siteImages.logo}
            alt="Isla Café"
            priority
            className={`rounded-full object-cover transition-[width,height] duration-[450ms] ${scrolled ? "h-11 w-11" : "h-[54px] w-[54px]"}`}
          />
        </Link>

        <div className="hidden items-center gap-[30px] lg:flex" data-nav-links>
          {navLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              data-scroll
              data-navlink
              className={`px-0 py-1.5 text-[13px] font-semibold tracking-[0.06em] transition-colors duration-300 ${linkClass}`}
            >
              {t(link.key)}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div
            className={`hidden overflow-hidden rounded-full border sm:flex ${langBorder}`}
            data-lang
          >
            <Link
              href={pathname}
              locale="es"
              className={`px-[13px] py-[7px] font-sans text-[11px] font-extrabold tracking-[0.1em] transition-colors ${
                locale === "es"
                  ? "bg-ink text-cream"
                  : `bg-transparent ${inactiveLang}`
              }`}
            >
              ES
            </Link>
            <Link
              href={pathname}
              locale="en"
              className={`px-[13px] py-[7px] font-sans text-[11px] font-extrabold tracking-[0.1em] transition-colors ${
                locale === "en"
                  ? "bg-ink text-cream"
                  : `bg-transparent ${inactiveLang}`
              }`}
            >
              EN
            </Link>
          </div>

          <a
            href="#visitanos"
            data-scroll
            data-nav-cta
            className="hidden items-center gap-2 rounded-full bg-ink px-[22px] py-[11px] text-[12.5px] font-bold tracking-[0.08em] text-cream shadow-[0_10px_26px_rgba(43,36,29,0.28)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(43,36,29,0.38)] sm:inline-flex"
          >
            {t("order")}
          </a>

          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
            className={`flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border lg:hidden ${scrolled ? "border-ink/15" : "border-white/35"}`}
          >
            <span
              className={`block h-0.5 w-5 transition-transform ${scrolled ? "bg-ink" : "bg-white"} ${mobileOpen ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 transition-opacity ${scrolled ? "bg-ink" : "bg-white"} ${mobileOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 transition-transform ${scrolled ? "bg-ink" : "bg-white"} ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-[90] bg-ink-deep/50 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      <div
        className={`fixed inset-x-0 top-[66px] z-[95] border-b border-ink/8 bg-cream/95 px-6 py-6 backdrop-blur-xl transition-transform duration-300 lg:hidden ${
          mobileOpen ? "translate-y-0" : "-translate-y-full pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              data-scroll
              onClick={() => setMobileOpen(false)}
              className="text-[15px] font-semibold tracking-[0.06em] text-ink"
            >
              {t(link.key)}
            </a>
          ))}
          <div className={`inline-flex w-fit overflow-hidden rounded-full border ${langBorder}`}>
            <Link
              href={pathname}
              locale="es"
              className={`px-[13px] py-[7px] text-[11px] font-extrabold tracking-[0.1em] ${
                locale === "es" ? "bg-ink text-cream" : inactiveLang
              }`}
            >
              ES
            </Link>
            <Link
              href={pathname}
              locale="en"
              className={`px-[13px] py-[7px] text-[11px] font-extrabold tracking-[0.1em] ${
                locale === "en" ? "bg-ink text-cream" : inactiveLang
              }`}
            >
              EN
            </Link>
          </div>
          <a
            href="#visitanos"
            data-scroll
            onClick={() => setMobileOpen(false)}
            className="inline-flex w-fit items-center rounded-full bg-ink px-6 py-3 text-[13px] font-bold tracking-[0.08em] text-cream"
          >
            {t("order")}
          </a>
        </div>
      </div>
    </>
  );
}
