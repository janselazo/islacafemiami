"use client";

import { useLocale } from "next-intl";
import { SiteImage } from "@/components/ui/SiteImage";
import { DarkLetterRows } from "@/components/inner/DarkLetterRows";
import { InnerPageCta } from "@/components/inner/InnerPageCta";
import { InnerPageHeader } from "@/components/inner/InnerPageHeader";
import { InnerSectionLabel } from "@/components/inner/InnerSectionLabel";
import { useParallaxImages } from "@/hooks/useParallaxImages";
import { innerRoutes } from "@/lib/inner-routes";
import { pickLocalized } from "@/lib/localized";
import { siteImages } from "@/lib/images";

const teamColors = ["bg-[#9C8466]", "bg-[#5E5042]", "bg-[#B8966B] text-[#221C16]"];

export function HistoriaPageContent() {
  const locale = useLocale();
  useParallaxImages();

  const chips =
    locale === "en"
      ? ["☕ Since 2020", "🔥 Roasted in-house", "📍 Cutler Bay"]
      : ["☕ Desde 2020", "🔥 Tostado en casa", "📍 Cutler Bay"];

  const timeline = [
    {
      year: "2020",
      title: pickLocalized(locale, {
        es: "La cafetera de la cocina",
        en: "The kitchen coffee maker",
      }),
      body: pickLocalized(locale, {
        es: "Una colada diaria para los vecinos. La receta de la abuela y muchas conversaciones en la acera.",
        en: "A daily colada for the neighbors. Grandma's recipe and long conversations on the sidewalk.",
      }),
      last: false,
    },
    {
      year: "2022",
      title: pickLocalized(locale, {
        es: "El tostador del garaje",
        en: "The garage roaster",
      }),
      body: pickLocalized(locale, {
        es: "Primer tostado en lotes pequeños y un puesto en el mercado de los sábados. Empezamos a firmar cada bolsa a mano.",
        en: "First small-batch roasts and a Saturday market stand. We started signing every bag by hand.",
      }),
      last: false,
    },
    {
      year: "2024",
      title: pickLocalized(locale, { es: "Preparamos la esquina", en: "We prepare the corner" }),
      body: pickLocalized(locale, {
        es: "Llegamos a Unit 101 en SW 106th Ave. Madera cálida, plantas y una barra diseñada para verse desde la acera.",
        en: "We found Unit 101 on SW 106th Ave. Warm wood, plants, and a bar built to be seen from the sidewalk.",
      }),
      last: false,
    },
    {
      year: "2026",
      title: pickLocalized(locale, { es: "Abrimos en 2026", en: "Opening in 2026" }),
      body: pickLocalized(locale, {
        es: "La esquina abre sus puertas en Cutler Bay — el primer cortadito servido a un vecino, con la misma calma con la que empezó todo.",
        en: "The corner opens its doors in Cutler Bay — the first cortadito served to a neighbor, with the same calm that started it all.",
      }),
      last: true,
    },
  ];

  const craftRows = [
    {
      letter: "A",
      title: pickLocalized(locale, { es: "Tostado en casa", en: "Roasted in-house" }),
      body: pickLocalized(locale, {
        es: "Granos de origen único de fincas pequeñas, tostados aquí en pequeñas tandas cada semana. Nunca dejamos que envejezcan en el estante.",
        en: "Single-origin beans from small farms, roasted here in small batches every week. We never let them age on the shelf.",
      }),
    },
    {
      letter: "B",
      title: pickLocalized(locale, { es: "Horneado del día", en: "Baked daily" }),
      body: pickLocalized(locale, {
        es: "Pastelitos de guayaba, croissants y tres leches, hechos a mano antes de abrir. Cuando se acaban, se acaban.",
        en: "Guava pastelitos, croissants, and tres leches, handmade before we open. When they're gone, they're gone.",
      }),
    },
    {
      letter: "C",
      title: pickLocalized(locale, { es: "Mesa de barrio", en: "Neighborhood table" }),
      body: pickLocalized(locale, {
        es: "Un sitio para quedarse: vecinos, laptops, dominó y largas sobremesas. Aquí nadie te apura.",
        en: "A place to stay awhile: neighbors, laptops, dominoes, and long conversations. Nobody rushes you here.",
      }),
    },
  ];

  const team = [
    {
      initial: "M",
      name: "Mari",
      role: pickLocalized(locale, { es: "Tostado & barra", en: "Roasting & bar" }),
      bio: pickLocalized(locale, {
        es: "Decide cada perfil de tostado y, casi siempre, quien te sirve el primer cortadito de la mañana.",
        en: "She chooses every roast profile and, most mornings, pours your first cortadito.",
      }),
    },
    {
      initial: "C",
      name: "Carlos",
      role: pickLocalized(locale, { es: "Cocina & brunch", en: "Kitchen & brunch" }),
      bio: pickLocalized(locale, {
        es: "El del pan con lechón y el mojo de la casa. Madruga para que el horno esté listo cuando abrimos.",
        en: "The pan con lechón and house mojo. He's up early so the oven is ready when we open.",
      }),
    },
    {
      initial: "L",
      name: "Lucía",
      role: pickLocalized(locale, { es: "Panadería", en: "Bakery" }),
      bio: pickLocalized(locale, {
        es: "Lamina los croissants a mano y hornea los pastelitos del día. Si huele a guayaba, es cosa suya.",
        en: "She laminates croissants by hand and bakes the day's pastelitos. If it smells like guava, that's her.",
      }),
    },
  ];

  return (
    <>
      <InnerPageHeader
        number="01"
        label={pickLocalized(locale, { es: "Nuestra historia", en: "Our story" })}
        titleBefore={pickLocalized(locale, {
          es: "Una esquina donde Miami se siente como",
          en: "A corner where Miami feels like",
        })}
        titleEmphasis={pickLocalized(locale, { es: "casa", en: "home" })}
        titleAfter="."
        intro={pickLocalized(locale, {
          es: "Isla nació de una cocina familiar y de la idea de que un buen café se comparte. Esta es la historia de cómo una receta de cortadito se convirtió en una esquina de barrio.",
          en: "Isla was born from a family kitchen and the idea that good coffee is meant to be shared. This is the story of how a cortadito recipe became a neighborhood corner.",
        })}
        chips={chips}
        bgImage={siteImages.baristaPour}
      />

      <section className="bg-cream-light py-[clamp(80px,10vw,140px)]">
        <div className="mx-auto grid max-w-[1240px] items-start gap-[clamp(36px,5vw,72px)] px-[clamp(20px,5vw,64px)] lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <InnerSectionLabel
              index=""
              label={pickLocalized(locale, { es: "El origen", en: "The origin" })}
            />
            <h2
              data-rv
              className="max-w-[16ch] font-serif text-[clamp(30px,4.2vw,56px)] leading-[1.08] font-semibold text-balance"
            >
              {pickLocalized(locale, { es: "Empezó con una", en: "It started with a" })}{" "}
              <em className="text-gold-dark italic">
                {pickLocalized(locale, { es: "colada", en: "colada" })}
              </em>{" "}
              {pickLocalized(locale, {
                es: "para los vecinos.",
                en: "for the neighbors.",
              })}
            </h2>
            <p data-rv className="mt-6 max-w-[50ch] text-[17px] leading-[1.65] text-muted">
              {pickLocalized(locale, {
                es: "Mari y Carlos llegaron a Cutler Bay con poco más que una cafetera italiana y la receta de cortadito de la abuela. Cada mañana salía una colada a la acera y, sin darse cuenta, la esquina se fue llenando de gente.",
                en: "Mari and Carlos arrived in Cutler Bay with little more than an Italian moka pot and grandma's cortadito recipe. Every morning a colada went out to the sidewalk and, before they knew it, the corner filled with people.",
              })}
            </p>
            <p data-rv className="mt-4 max-w-[50ch] text-[17px] leading-[1.65] text-muted">
              {pickLocalized(locale, {
                es: "Lo que empezó como un gesto se volvió costumbre: primero un tostador pequeño en el garaje, luego un puesto en el mercado de los sábados, y por fin un local con el nombre que siempre quisimos — Isla, porque aquí cada quien trae un pedacito del Caribe.",
                en: "What began as a gesture became a habit: first a small garage roaster, then a Saturday market stand, and finally a shop with the name we'd always wanted — Isla, because everyone here brings a piece of the Caribbean.",
              })}
            </p>
          </div>
          <div className="relative mx-auto min-h-[320px] max-w-[420px] md:mx-0 md:max-w-none md:min-h-[560px]">
            <div
              data-plx="8"
              className="absolute top-0 right-0 aspect-[3/4] w-[82%] overflow-hidden border border-border shadow-[0_40px_80px_rgba(43,36,29,0.16)] will-change-transform sm:w-[84%]"
            >
              <SiteImage src={siteImages.baristaPour} alt="" fill className="object-cover" />
            </div>
            <div
              data-plx="-12"
              className="absolute bottom-0 left-0 aspect-square w-[52%] overflow-hidden border border-border shadow-[0_30px_60px_rgba(43,36,29,0.14)] will-change-transform"
            >
              <SiteImage
                src={siteImages.pastelitosHistoria}
                alt=""
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream py-[clamp(70px,9vw,120px)]">
        <div className="mx-auto max-w-[1000px] px-[clamp(20px,5vw,64px)]">
          <InnerSectionLabel
            index="A"
            label={pickLocalized(locale, { es: "Cronología", en: "Timeline" })}
          />
          <div data-rv-group className="mt-10">
            {timeline.map((entry) => (
              <div
                key={entry.year}
                className="grid grid-cols-[72px_1fr] gap-5 border-t border-gold-pale py-8 sm:grid-cols-[120px_1fr] sm:gap-8"
              >
                <div className="font-mono text-[13px] tracking-[0.18em] text-gold-dark">
                  {entry.year}
                </div>
                <div className="relative border-l border-gold-pale pl-6 sm:pl-8">
                  <span
                    className={`absolute top-1 -left-[7px] h-3 w-3 rounded-full ring-4 ring-cream ${entry.last ? "bg-gold-light" : "bg-gold-dark"}`}
                  />
                  <h3 className="font-serif text-[24px] sm:text-[28px]">{entry.title}</h3>
                  <p className="mt-2 max-w-[52ch] text-[15px] leading-[1.7] text-muted">
                    {entry.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-forest py-[clamp(80px,10vw,140px)] text-cream-light">
        <div className="mx-auto max-w-[1240px] px-[clamp(20px,5vw,64px)]">
          <InnerSectionLabel
            index="B"
            label={pickLocalized(locale, { es: "El oficio", en: "The craft" })}
            dark
          />
          <h2
            data-rv
            className="max-w-[18ch] font-serif text-[clamp(30px,4.2vw,56px)] leading-[1.08] font-semibold text-balance"
          >
            {pickLocalized(locale, {
              es: "Lo que no ha cambiado desde la primera colada.",
              en: "What hasn't changed since the first colada.",
            })}
          </h2>
          <DarkLetterRows rows={craftRows} />
        </div>
      </section>

      <section className="bg-cream-light py-[clamp(70px,9vw,120px)]">
        <div data-rv className="mx-auto max-w-[980px] px-[clamp(20px,5vw,64px)] text-center">
          <span className="font-serif text-[80px] leading-none text-gold-dark/35">"</span>
          <blockquote className="-mt-6 font-serif text-[clamp(28px,4vw,44px)] leading-[1.25] font-medium italic text-balance">
            {pickLocalized(locale, {
              es: "No vendemos café. Hacemos café para quedarnos a charlar — el café es la excusa.",
              en: "We don't sell coffee. We make coffee to stay and talk — coffee is the excuse.",
            })}
          </blockquote>
          <p className="mt-6 text-[13px] font-bold tracking-[0.22em] text-gold-dark uppercase">
            Mari & Carlos · {pickLocalized(locale, { es: "fundadores", en: "founders" })}
          </p>
        </div>
      </section>

      <section className="bg-cream py-[clamp(70px,9vw,120px)]">
        <div className="mx-auto max-w-[1240px] px-[clamp(20px,5vw,64px)]">
          <InnerSectionLabel
            index="C"
            label={pickLocalized(locale, { es: "Las manos detrás", en: "The hands behind" })}
          />
          <div data-rv-group className="mt-10 grid gap-6 md:grid-cols-3 md:gap-8">
            {team.map((person, index) => (
              <article
                key={person.name}
                className="border border-border bg-cream-card p-8 transition-[transform,box-shadow,border-color] duration-[450ms] hover:-translate-y-[7px] hover:border-gold-dark/50 hover:shadow-[0_26px_60px_rgba(43,36,29,0.12)]"
              >
                <div
                  className={`mb-5 grid h-[60px] w-[60px] place-items-center rounded-full font-serif text-[26px] ${teamColors[index]}`}
                >
                  {person.initial}
                </div>
                <h3 className="font-serif text-[26px]">{person.name}</h3>
                <p className="mt-1 font-mono text-[11px] tracking-[0.18em] text-gold-dark uppercase">
                  {person.role}
                </p>
                <p className="mt-4 text-[15px] leading-[1.65] text-muted">{person.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <InnerPageCta
        eyebrow={pickLocalized(locale, { es: "Ven a conocernos", en: "Come meet us" })}
        title={pickLocalized(locale, {
          es: "La historia sigue cada mañana, a las siete, con la primera colada.",
          en: "The story continues every morning at seven, with the first colada.",
        })}
        primaryLabel={pickLocalized(locale, { es: "Ver la carta →", en: "View menu →" })}
        primaryHref={innerRoutes.menu}
        secondaryLabel={pickLocalized(locale, { es: "Cómo llegar", en: "Get directions" })}
        meta="18901 SW 106TH AVE · CUTLER BAY · DESDE 2020"
      />
    </>
  );
}
