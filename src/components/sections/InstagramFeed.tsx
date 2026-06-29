import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SiteImage } from "@/components/ui/SiteImage";
import { INSTAGRAM_PROFILE_URL, instagramFeed } from "@/lib/instagram";

function InstagramIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function InstagramFeed() {
  const t = useTranslations("instagram");
  const posts = instagramFeed.posts.slice(0, 16);

  return (
    <section id="instagram" className="bg-cream py-[clamp(90px,11vw,150px)]">
      <div className="mx-auto max-w-[1240px] px-[clamp(20px,5vw,64px)]">
        <SectionHeader number={t("number")} label={t("label")} />

        <h2
          data-rv
          className="max-w-[22ch] font-serif text-[clamp(34px,4.4vw,58px)] leading-[1.06] font-semibold text-balance"
        >
          {t("title")}
        </h2>

        <div
          data-rv
          data-instagram-grid
          className="mt-[58px] grid grid-cols-4 gap-2 sm:gap-[18px]"
        >
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("postAria")}
              className="group relative aspect-square min-w-0 overflow-hidden bg-cream-light"
            >
              <SiteImage src={post.localSrc} alt={post.alt} fill />
              <span className="absolute inset-0 flex items-center justify-center bg-ink/0 text-cream transition-colors duration-300 group-hover:bg-ink/42 group-focus-visible:bg-ink/42">
                <span className="translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                  <InstagramIcon />
                </span>
              </span>
            </a>
          ))}
        </div>

        <div data-rv className="mt-10">
          <a
            href={INSTAGRAM_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("followAria")}
            className="inline-flex items-center gap-2.5 border-b border-gold-dark pb-1 text-[13px] font-bold tracking-[0.14em] text-ink uppercase transition-colors duration-300 hover:border-gold-light hover:text-gold-dark"
          >
            <InstagramIcon />
            {t("followCta")}
          </a>
        </div>
      </div>
    </section>
  );
}
