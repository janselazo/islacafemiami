"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { orderPlatforms } from "@/lib/order";

type OrderMenuProps = {
  variant: "nav" | "footer";
  scrolled?: boolean;
  onNavigate?: () => void;
};

export function OrderMenu({ variant, scrolled = true, onNavigate }: OrderMenuProps) {
  const t = useTranslations("order");
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (variant !== "nav") return;

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [variant]);

  const linkClass =
    variant === "footer"
      ? "transition-colors duration-300 hover:text-gold-light"
      : "block px-4 py-2.5 text-[13px] font-semibold tracking-[0.04em] text-ink transition-colors hover:bg-cream-light hover:text-gold-dark";

  const links = orderPlatforms.map((platform) => (
    <a
      key={platform.key}
      href={platform.href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        setOpen(false);
        onNavigate?.();
      }}
      className={linkClass}
    >
      {t(platform.key)}
    </a>
  ));

  if (variant === "footer") {
    return (
      <div className="flex flex-col gap-[11px] text-[14.5px] text-cream-light/72">
        {links}
      </div>
    );
  }

  const triggerClass = scrolled
    ? "bg-ink text-cream shadow-[0_10px_26px_rgba(43,36,29,0.28)] hover:shadow-[0_16px_34px_rgba(43,36,29,0.38)]"
    : "bg-cream/95 text-ink shadow-[0_10px_26px_rgba(0,0,0,0.18)] hover:bg-cream";

  return (
    <div ref={rootRef} className="relative hidden lg:block">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((value) => !value)}
        className={`inline-flex items-center gap-2 rounded-full px-[22px] py-[11px] text-[12.5px] font-bold tracking-[0.08em] transition-[transform,box-shadow,background-color] duration-300 hover:-translate-y-0.5 ${triggerClass}`}
      >
        {t("menuLabel")}
        <span
          aria-hidden="true"
          className={`text-[10px] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        >
          ▾
        </span>
      </button>

      {open && (
        <div className="absolute top-[calc(100%+10px)] right-0 min-w-[190px] overflow-hidden rounded-2xl border border-border bg-cream py-1.5 shadow-[0_18px_40px_rgba(43,36,29,0.16)]">
          {links}
        </div>
      )}
    </div>
  );
}
