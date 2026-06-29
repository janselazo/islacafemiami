import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";

const DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=18901+SW+106th+Ave+Unit+101+Cutler+Bay+FL+33157";

export function Visitanos() {
  const t = useTranslations("visitanos");

  return (
    <section
      id="visitanos"
      className="bg-gradient-to-b from-cream to-border-warm py-[clamp(90px,11vw,150px)]"
    >
      <div className="mx-auto max-w-[1240px] px-[clamp(20px,5vw,64px)]">
        <SectionHeader number={t("number")} label={t("label")} />

        <div
          data-visit-grid
          className="mt-[58px] grid items-stretch gap-[clamp(36px,5vw,72px)] lg:grid-cols-[0.95fr_1.05fr]"
        >
          <div data-rv>
            <h2 className="font-serif text-[clamp(32px,4vw,52px)] leading-[1.06] font-semibold text-balance">
              {t("titleLine1")}
              <br />
              {t("titleLine2")}
            </h2>

            <div className="mt-9 flex flex-col gap-6">
              <ContactRow icon="◎" label={t("addressLabel")} value={t("address")} />
              <ContactRow icon="⏱" label={t("hoursLabel")} value={t("hours")} />
              <ContactRow icon="✆" label={t("contactLabel")} value={t("contact")} />
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-3.5">
              <a
                href="#"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-[26px] py-3.5 text-[13.5px] font-bold tracking-[0.06em] text-cream shadow-[0_10px_26px_rgba(43,36,29,0.28)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(43,36,29,0.38)] sm:w-auto"
              >
                {t("orderOnline")}
              </a>
              <a
                href={DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("getDirectionsAria")}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-cream-card px-[26px] py-3.5 text-[13.5px] font-bold tracking-[0.06em] text-ink transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-gold-dark sm:w-auto"
              >
                {t("getDirections")}
              </a>
            </div>
          </div>

          <div
            data-rv
            className="relative min-h-[320px] overflow-hidden border border-border bg-map-bg lg:min-h-[420px]"
          >
            <iframe
              title={t("mapTitle")}
              src="https://www.google.com/maps?q=18901%20SW%20106th%20Ave%20Unit%20101%20Cutler%20Bay%20FL%2033157&output=embed"
              className="absolute inset-0 h-full w-full border-0 saturate-[0.92] contrast-[0.98]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="grid grid-cols-[24px_1fr] items-start gap-4">
      <span className="text-lg text-gold-dark">{icon}</span>
      <div>
        <div className="mb-0.5 text-[15px] font-bold">{label}</div>
        <div className="text-[15px] whitespace-pre-line text-muted">{value}</div>
      </div>
    </div>
  );
}
