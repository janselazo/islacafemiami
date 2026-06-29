"use client";

import { useLocale } from "next-intl";
import { SiteImage } from "@/components/ui/SiteImage";
import { DarkLetterRows } from "@/components/inner/DarkLetterRows";
import { InnerPageCta } from "@/components/inner/InnerPageCta";
import { InnerPageHeader } from "@/components/inner/InnerPageHeader";
import { InnerSectionLabel } from "@/components/inner/InnerSectionLabel";
import { useParallaxImages } from "@/hooks/useParallaxImages";
import { GOOGLE_MAPS_PLACE_URL } from "@/lib/contact";
import { innerRoutes } from "@/lib/inner-routes";
import { pickLocalized } from "@/lib/localized";
import { siteImages } from "@/lib/images";

const galleryTiles = [
  { src: siteImages.salon, className: "col-span-2 row-span-2" },
  { src: siteImages.barra, className: "" },
  { src: siteImages.plantas, className: "" },
  { src: siteImages.baristaPour, className: "col-span-2" },
  { src: siteImages.mesaAlSol, className: "" },
  { src: siteImages.pourOver, className: "" },
];

export function EspacioPageContent() {
  const locale = useLocale();
  useParallaxImages();

  const chips =
    locale === "en"
      ? ["☀ Natural light", "🪴 40+ plants", "🔌 Wifi & outlets", "🐕 Pet-friendly"]
      : ["☀ Luz natural", "🪴 +40 plantas", "🔌 Wifi & enchufes", "🐕 Pet-friendly"];

  const zones = [
    {
      num: "01",
      title: pickLocalized(locale, { es: "La barra", en: "The bar" }),
      body: pickLocalized(locale, {
        es: "Asiento de primera fila al espresso. Siéntate, charla con el barista y míralo todo de cerca.",
        en: "Front-row seating to the espresso bar. Sit down, chat with the barista, and watch it all up close.",
      }),
      image: siteImages.barra,
    },
    {
      num: "02",
      title: pickLocalized(locale, { es: "El salón", en: "The dining room" }),
      body: pickLocalized(locale, {
        es: "Mesas que se juntan para grupos y butacas para quedarse. La mesa grande junto a la ventana es la favorita.",
        en: "Tables that come together for groups and armchairs made for lingering. The big window table is the favorite.",
      }),
      image: siteImages.salon,
    },
    {
      num: "03",
      title: pickLocalized(locale, { es: "La terraza", en: "The terrace" }),
      body: pickLocalized(locale, {
        es: "Mesitas al sol para el primer café del día, el periódico y, si vienes con perro, su cuenco de agua.",
        en: "Sunny tables for the first coffee of the day, the paper, and — if you bring your dog — a water bowl.",
      }),
      image: siteImages.mesaAlSol,
    },
  ];

  const amenities = [
    {
      letter: "A",
      title: pickLocalized(locale, { es: "Wifi rápido y gratis", en: "Fast, free wifi" }),
      body: pickLocalized(locale, {
        es: "Fibra de verdad y enchufes en casi todas las mesas. Trabaja tranquilo toda la mañana.",
        en: "Real fiber and outlets at nearly every table. Work peacefully all morning.",
      }),
    },
    {
      letter: "B",
      title: pickLocalized(locale, { es: "Mesa de barrio", en: "Neighborhood table" }),
      body: pickLocalized(locale, {
        es: "Vecinos, dominó por la tarde y la mesa grande siempre lista para juntar sillas.",
        en: "Neighbors, afternoon dominoes, and the big table always ready for extra chairs.",
      }),
    },
    {
      letter: "C",
      title: pickLocalized(locale, { es: "Pet-friendly", en: "Pet-friendly" }),
      body: pickLocalized(locale, {
        es: "Tu perro es bienvenido en la terraza — con cuenco de agua fresca de la casa.",
        en: "Your dog is welcome on the terrace — with a fresh water bowl from the house.",
      }),
    },
    {
      letter: "D",
      title: pickLocalized(locale, { es: "Noches de música", en: "Music nights" }),
      body: pickLocalized(locale, {
        es: "Trova y son en vivo un viernes al mes. Síguenos en Instagram para la fecha.",
        en: "Live trova and son one Friday a month. Follow us on Instagram for the date.",
      }),
    },
  ];

  const hireBullets =
    locale === "en"
      ? [
          "Up to 40 guests · full private hire",
          "Coffee bar and custom brunch catering",
          "Latte art workshops and origin tastings",
        ]
      : [
          "Hasta 40 invitados · privatización completa",
          "Barra de café y catering de brunch a medida",
          "Talleres de latte art y cata de orígenes",
        ];

  return (
    <>
      <InnerPageHeader
        number="03"
        label="Local"
        titleBefore={pickLocalized(locale, {
          es: "Luz de la mañana, plantas y el aroma a",
          en: "Morning light, plants, and the scent of",
        })}
        titleEmphasis={pickLocalized(locale, { es: "tostado", en: "roasted coffee" })}
        titleAfter="."
        intro={pickLocalized(locale, {
          es: "Un local de barrio diseñado para quedarse: madera cálida, mucha planta, la barra siempre a la vista y rincones para cada momento del día.",
          en: "A neighborhood shop made for staying awhile: warm wood, plenty of plants, the bar always in view, and corners for every moment of the day.",
        })}
        chips={chips}
        bgImage={siteImages.salon}
      />

      <section className="bg-cream-light py-[clamp(80px,10vw,140px)]">
        <div className="mx-auto grid max-w-[1240px] items-start gap-[clamp(36px,5vw,72px)] px-[clamp(20px,5vw,64px)] lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <InnerSectionLabel
              index=""
              label={pickLocalized(locale, { es: "El ambiente", en: "The atmosphere" })}
            />
            <h2
              data-rv
              className="max-w-[16ch] font-serif text-[clamp(30px,4.2vw,56px)] leading-[1.08] font-semibold text-balance"
            >
              {pickLocalized(locale, { es: "Hecho para", en: "Made for" })}{" "}
              <em className="text-gold-dark italic">
                {pickLocalized(locale, { es: "quedarse", en: "staying" })}
              </em>{" "}
              {pickLocalized(locale, { es: "un rato más.", en: "a little longer." })}
            </h2>
            <p data-rv className="mt-6 max-w-[50ch] text-[17px] leading-[1.65] text-muted">
              {pickLocalized(locale, {
                es: "Cuando diseñamos Isla pensamos en las sobremesas largas de la isla — esas en las que el café se enfría porque la conversación es mejor. Por eso hay sillas cómodas, mesas que se pueden juntar y nadie te apura.",
                en: "When we designed Isla, we thought about long island-style conversations — the kind where coffee goes cold because the talk is better. That's why there are comfortable chairs, tables that can be pushed together, and nobody rushing you.",
              })}
            </p>
            <p data-rv className="mt-4 max-w-[50ch] text-[17px] leading-[1.65] text-muted">
              {pickLocalized(locale, {
                es: "La barra es el corazón: ahí ves al barista pesar el grano, vaciar el portafiltro y servir el cortadito con calma. La luz entra de mañana por el ventanal y, al atardecer, las plantas hacen el resto.",
                en: "The bar is the heart: you watch the barista weigh the beans, knock out the portafilter, and serve the cortadito with calm. Morning light comes through the window, and by evening the plants do the rest.",
              })}
            </p>
          </div>
          <div className="relative mx-auto min-h-[320px] max-w-[420px] md:mx-0 md:max-w-none md:min-h-[560px]">
            <div
              data-plx="8"
              className="absolute top-0 right-0 aspect-[3/4] w-[82%] overflow-hidden border border-border shadow-[0_40px_80px_rgba(43,36,29,0.16)] will-change-transform sm:w-[84%]"
            >
              <SiteImage src={siteImages.salon} alt="" fill className="object-cover" />
            </div>
            <div
              data-plx="-12"
              className="absolute bottom-0 left-0 aspect-square w-[52%] overflow-hidden border border-border shadow-[0_30px_60px_rgba(43,36,29,0.14)] will-change-transform"
            >
              <SiteImage src={siteImages.plantas} alt="" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream py-[clamp(70px,9vw,120px)]">
        <div className="mx-auto max-w-[1240px] px-[clamp(20px,5vw,64px)]">
          <InnerSectionLabel index="A" label={pickLocalized(locale, { es: "Encuentra tu sitio", en: "Find your spot" })} />
          <div data-rv-group className="mt-10 grid gap-6 md:grid-cols-3 md:gap-8">
            {zones.map((zone) => (
              <article
                key={zone.num}
                className="overflow-hidden border border-border bg-cream-card transition-[transform,box-shadow,border-color] duration-[450ms] hover:-translate-y-[7px] hover:border-gold-dark/50 hover:shadow-[0_26px_60px_rgba(43,36,29,0.12)]"
              >
                <div className="relative aspect-[4/3] border-b border-border">
                  <SiteImage src={zone.image} alt="" fill className="object-cover" />
                </div>
                <div className="p-7">
                  <p className="font-mono text-[11px] tracking-[0.18em] text-gold-dark">{zone.num}</p>
                  <h3 className="mt-2 font-serif text-[26px]">{zone.title}</h3>
                  <p className="mt-3 text-[15px] leading-[1.65] text-muted">{zone.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream-light py-[clamp(70px,9vw,120px)]">
        <div className="mx-auto max-w-[1240px] px-[clamp(20px,5vw,64px)]">
          <InnerSectionLabel
            index="B"
            label={pickLocalized(locale, { es: "Un paseo por dentro", en: "A walk inside" })}
          />
          <div
            data-rv
            className="mt-10 grid auto-rows-[160px] grid-cols-2 gap-[18px] md:auto-rows-[200px] md:grid-cols-4"
          >
            {galleryTiles.map((tile, index) => (
              <div
                key={index}
                className={`relative overflow-hidden border border-border ${tile.className}`}
              >
                <SiteImage src={tile.src} alt="" fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-forest py-[clamp(80px,10vw,140px)] text-cream-light">
        <div className="mx-auto grid max-w-[1240px] items-start gap-10 px-[clamp(20px,5vw,64px)] lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <InnerSectionLabel
              index="C"
              label={pickLocalized(locale, { es: "Para el día a día", en: "For everyday life" })}
              dark
            />
            <h2
              data-rv
              className="max-w-[14ch] font-serif text-[clamp(30px,4.2vw,56px)] leading-[1.08] font-semibold text-balance"
            >
              {pickLocalized(locale, {
                es: "Tu segunda oficina, sin la oficina.",
                en: "Your second office, without the office.",
              })}
            </h2>
            <p data-rv className="mt-4 max-w-[42ch] text-[16px] leading-[1.65] text-cream-light/74">
              {pickLocalized(locale, {
                es: "Vente con la laptop o con el dominó. Solo pedimos liberar las mesas grandes en la hora pico del brunch (sáb–dom 10–13h).",
                en: "Come with your laptop or your domino set. We only ask that you free up the big tables during brunch peak hours (Sat–Sun 10am–1pm).",
              })}
            </p>
          </div>
          <DarkLetterRows rows={amenities} />
        </div>
      </section>

      <section className="bg-cream py-[clamp(80px,10vw,140px)]">
        <div className="mx-auto grid max-w-[1240px] items-stretch gap-0 px-[clamp(20px,5vw,64px)] lg:grid-cols-2">
          <div className="relative min-h-[320px] border border-border lg:min-h-[480px]">
            <SiteImage src={siteImages.mesaAlSol} alt="" fill className="object-cover" />
          </div>
          <div className="flex flex-col justify-center border border-t-0 border-border bg-cream-card p-[clamp(28px,5vw,48px)] lg:border-t lg:border-l-0">
            <InnerSectionLabel
              index="D"
              label={pickLocalized(locale, { es: "Eventos", en: "Events" })}
            />
            <h2 className="mt-2 font-serif text-[clamp(30px,4vw,48px)] leading-[1.08] font-semibold">
              {pickLocalized(locale, {
                es: "Alquila la isla para tu gente.",
                en: "Rent the island for your people.",
              })}
            </h2>
            <p className="mt-4 max-w-[42ch] text-[15px] leading-[1.65] text-muted">
              {pickLocalized(locale, {
                es: "Cumpleaños, talleres de café, reuniones de equipo o un brunch privado de domingo. Cerramos el local para grupos de hasta 40 personas, con barra de cortaditos y mesa de pastelitos.",
                en: "Birthdays, coffee workshops, team meetings, or a private Sunday brunch. We close the shop for groups of up to 40, with a cortadito bar and a pastelito table.",
              })}
            </p>
            <ul className="mt-6 space-y-3 text-[15px] text-muted">
              {hireBullets.map((bullet) => (
                <li key={bullet} className="flex gap-3">
                  <span className="text-gold-dark">✦</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="mailto:hola@islacafe.miami"
                className="inline-flex items-center justify-center rounded-full bg-ink px-7 py-3.5 text-[13px] font-bold tracking-[0.08em] text-cream shadow-[0_10px_26px_rgba(43,36,29,0.28)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5"
              >
                {pickLocalized(locale, { es: "Pedir cotización", en: "Request a quote" })}
              </a>
              <a
                href={GOOGLE_MAPS_PLACE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-border px-7 py-3.5 text-[13px] font-bold tracking-[0.08em] text-ink transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-gold-dark"
              >
                {pickLocalized(locale, { es: "Cómo llegar", en: "Get directions" })}
              </a>
            </div>
          </div>
        </div>
      </section>

      <InnerPageCta
        eyebrow={pickLocalized(locale, { es: "Te esperamos", en: "We are waiting for you" })}
        title={pickLocalized(locale, {
          es: "Pasa cuando quieras. Siempre hay café y un sitio para ti.",
          en: "Come whenever you like. There is always coffee and a seat for you.",
        })}
        primaryLabel={pickLocalized(locale, { es: "Ver la carta →", en: "View menu →" })}
        primaryHref={innerRoutes.menu}
        secondaryLabel={pickLocalized(locale, { es: "Cómo llegar", en: "Get directions" })}
        meta={pickLocalized(locale, {
          es: "18901 SW 106TH AVE · CUTLER BAY · LUN–VIE 7–19H",
          en: "18901 SW 106TH AVE · CUTLER BAY · MON–FRI 7AM–7PM",
        })}
      />
    </>
  );
}
