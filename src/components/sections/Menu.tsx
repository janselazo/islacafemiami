import { useTranslations } from "next-intl";
import { SiteImage } from "@/components/ui/SiteImage";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { menuCategoryImages } from "@/lib/images";

type MenuCategory = {
  key: string;
  label: string;
  items: Array<{
    name: string;
    price: string;
    description: string;
  }>;
};

export function Menu() {
  const t = useTranslations("menu");
  const categories = t.raw("categories") as MenuCategory[];

  return (
    <section id="menu" className="bg-cream py-[clamp(90px,11vw,150px)]">
      <div className="mx-auto max-w-[1240px] px-[clamp(20px,5vw,64px)]">
        <SectionHeader number={t("number")} label={t("label")} />

        <h2
          data-rv
          className="max-w-[20ch] font-serif text-[clamp(34px,4.4vw,58px)] leading-[1.06] font-semibold text-balance"
        >
          {t("titleLine1")}{" "}
          <em className="text-gold-dark italic">{t("titleEmphasis")}</em>{" "}
          {t("titleLine2")}
        </h2>

        <div
          data-menu-grid
          className="mt-16 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3"
        >
          {categories.map((category) => (
            <article
              key={category.key}
              className="overflow-hidden border border-border bg-cream-card transition-[transform,box-shadow,border-color] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[7px] hover:border-gold-dark/50 hover:shadow-[0_26px_60px_rgba(43,36,29,0.12)]"
            >
              <div className="relative aspect-[16/10] border-b border-border">
                <SiteImage src={menuCategoryImages[category.key]} alt="" fill />
              </div>
              <div data-rv className="px-[30px] pt-7 pb-[30px]">
                <span className="mb-3.5 block font-mono text-xs tracking-[0.2em] text-gold-dark">
                  {category.label}
                </span>
                <div className="flex flex-col gap-4">
                  {category.items.map((item) => (
                    <div key={item.name}>
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="font-serif text-[22px]">{item.name}</span>
                        <span className="font-mono text-[13px] text-muted">
                          {item.price}
                        </span>
                      </div>
                      <p className="mt-0.5 text-[13.5px] leading-[1.6] text-muted">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div data-rv className="mt-11 flex justify-center">
          <a
            href="#visitanos"
            data-scroll
            className="inline-flex items-center gap-2.5 rounded-full border border-border bg-cream-card px-7 py-3.5 text-[13px] font-bold tracking-[0.08em] text-ink transition-[border-color,gap] duration-300 hover:gap-[15px] hover:border-gold-dark"
          >
            {t("viewFull")}
          </a>
        </div>
      </div>
    </section>
  );
}
