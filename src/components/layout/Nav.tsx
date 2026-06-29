"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { SiteImage } from "@/components/ui/SiteImage";
import { OrderMenu } from "@/components/ui/OrderMenu";
import { Link, usePathname } from "@/i18n/navigation";
import { orderPlatforms } from "@/lib/order";
import { siteImages } from "@/lib/images";

const navLinks = [
  { href: "#menu", key: "menu" as const },
  { href: "#historia", key: "historia" as const },
  { href: "#espacio", key: "espacio" as const },
  { href: "#visitanos", key: "visitanos" as const },
];

export function Nav() {
  const t = useTranslations("nav");
  const order = useTranslations("order");
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

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navClass = scrolled
    ? "h-[66px] border-b border-ink/8 bg-cream/88 shadow-[0_8px_32px_rgba(43,36,29,0.07)] backdrop-blur-[18px] backdrop-saturate-[1.4]"
    : "h-[72px] border-b border-transparent bg-transparent shadow-none max-lg:h-[72px] lg:h-[88px]";

  const mobileDrawerTop = scrolled ? "top-[66px]" : "top-[72px] lg:top-[88px]";

  const linkClass = scrolled
    ? "text-ink"
    : "text-white/85 hover:text-white";

  const langBorder = scrolled ? "border-ink/15" : "border-white/35";
  const inactiveLang = scrolled ? "text-ink/70" : "text-white/70";

  return (
    <>
      <nav
        id="islaNav"
        className={`fixed inset-x-0 top-0 z-[100] flex items-center justify-between gap-3 px-4 sm:px-[clamp(20px,4vw,48px)] transition-[height,background,box-shadow,border-color] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${navClass}`}
      >
        <Link href="/#top" data-scroll className="relative z-[2] flex shrink-0 items-center">
          <SiteImage
            src={siteImages.logo}
            alt="Isla Café"
            priority
            className={`rounded-full object-cover transition-[width,height] duration-[450ms] ${scrolled ? "h-10 w-10 lg:h-11 lg:w-11" : "h-11 w-11 lg:h-[54px] lg:w-[54px]"}`}
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

        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          <div
            className={`hidden overflow-hidden rounded-full border lg:flex ${langBorder}`}
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

          <OrderMenu variant="nav" scrolled={scrolled} />

          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
            className={`flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-1.5 rounded-full border lg:hidden ${scrolled ? "border-ink/15 bg-cream/90" : "border-white/35 bg-ink-deep/20 backdrop-blur-sm"}`}
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
        <>
          <div
            className="fixed inset-0 z-[90] bg-ink-deep/50 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <div
            className={`fixed inset-x-0 ${mobileDrawerTop} z-[95] max-h-[calc(100svh-72px)] overflow-y-auto border-b border-ink/8 bg-cream/98 px-5 py-5 backdrop-blur-xl lg:hidden`}
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
              <div className="inline-flex w-fit overflow-hidden rounded-full border border-ink/15">
                <Link
                  href={pathname}
                  locale="es"
                  onClick={() => setMobileOpen(false)}
                  className={`px-[13px] py-[7px] text-[11px] font-extrabold tracking-[0.1em] ${
                    locale === "es" ? "bg-ink text-cream" : "text-ink/70"
                  }`}
                >
                  ES
                </Link>
                <Link
                  href={pathname}
                  locale="en"
                  onClick={() => setMobileOpen(false)}
                  className={`px-[13px] py-[7px] text-[11px] font-extrabold tracking-[0.1em] ${
                    locale === "en" ? "bg-ink text-cream" : "text-ink/70"
                  }`}
                >
                  EN
                </Link>
              </div>
              <div>
                <div className="mb-2 text-[11px] font-extrabold tracking-[0.24em] text-gold-muted uppercase">
                  {order("menuLabel")}
                </div>
                <div className="flex flex-col gap-2">
                  {orderPlatforms.map((platform) => (
                    <a
                      key={platform.key}
                      href={platform.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMobileOpen(false)}
                      className="text-[15px] font-semibold tracking-[0.04em] text-ink"
                    >
                      {order(platform.key)}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
