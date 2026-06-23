import { useTranslations } from "next-intl";
import { SiteImage } from "@/components/ui/SiteImage";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { espacioGallery } from "@/lib/images";

export function Espacio() {
  const t = useTranslations("espacio");

  return (
    <section id="espacio" className="bg-cream-light py-[clamp(90px,11vw,150px)]">
      <div className="mx-auto max-w-[1240px] px-[clamp(20px,5vw,64px)]">
        <SectionHeader number={t("number")} label={t("label")} />

        <h2
          data-rv
          className="max-w-[20ch] font-serif text-[clamp(34px,4.4vw,58px)] leading-[1.06] font-semibold text-balance"
        >
          {t("title")}
        </h2>

        <div className="mt-[58px] grid auto-rows-[130px] grid-cols-2 gap-3 sm:auto-rows-[160px] sm:gap-[18px] md:auto-rows-[200px] md:grid-cols-4">
          {espacioGallery.map((item, index) => (
            <div
              key={item.src}
              className={`relative overflow-hidden border border-border ${item.className || ""} ${index === 0 ? "" : ""}`}
            >
              <SiteImage src={item.src} alt="" fill />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
