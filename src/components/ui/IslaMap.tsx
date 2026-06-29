import { useTranslations } from "next-intl";
import {
  GOOGLE_MAPS_DIRECTIONS_URL,
  GOOGLE_MAPS_EMBED_URL,
} from "@/lib/contact";

type IslaMapProps = {
  title?: string;
  className?: string;
  mapMinHeight?: string;
};

export function IslaMap({
  title,
  className = "",
  mapMinHeight = "min-h-[320px] lg:min-h-[460px]",
}: IslaMapProps) {
  const t = useTranslations("visitanos");

  return (
    <div
      className={`overflow-hidden border border-border bg-map-bg shadow-[0_26px_60px_rgba(43,36,29,0.08)] ${className}`}
    >
      <div className="flex items-center justify-between gap-4 border-b border-border bg-cream px-4 py-3.5 sm:px-5 sm:py-4">
        <div className="flex min-w-0 items-center gap-2.5">
          <span
            className="h-2 w-2 shrink-0 rounded-full bg-[#7FB98A] shadow-[0_0_0_3px_rgba(127,185,138,0.22)]"
            aria-hidden
          />
          <span className="truncate font-mono text-[10px] font-medium tracking-[0.18em] text-ink uppercase sm:text-[11px]">
            Isla Café · Cutler Bay
          </span>
        </div>
        <a
          href={GOOGLE_MAPS_DIRECTIONS_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("getDirectionsAria")}
          className="inline-flex shrink-0 items-center gap-1.5 text-[12px] font-bold tracking-[0.08em] text-ink transition-[color,gap] duration-300 hover:gap-2.5 hover:text-gold-dark sm:text-[13px]"
        >
          {t("getDirections")}
          <span aria-hidden className="text-[13px] leading-none">
            ↗
          </span>
        </a>
      </div>

      <div className={`relative ${mapMinHeight}`}>
        <iframe
          title={title ?? t("mapTitle")}
          src={GOOGLE_MAPS_EMBED_URL}
          className="absolute inset-0 h-full w-full border-0 saturate-[0.92] contrast-[0.98]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </div>
  );
}
