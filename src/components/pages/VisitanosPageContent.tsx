"use client";

import { FormEvent, useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { InnerPageHeader } from "@/components/inner/InnerPageHeader";
import { InnerSectionLabel } from "@/components/inner/InnerSectionLabel";
import { IslaMap } from "@/components/ui/IslaMap";
import { GOOGLE_MAPS_DIRECTIONS_URL } from "@/lib/contact";
import { pickLocalized } from "@/lib/localized";
import { siteImages } from "@/lib/images";

function getOpenStatus(locale: string) {
  const now = new Date();
  const day = now.getDay();
  const minutes = now.getHours() * 60 + now.getMinutes();
  const isWeekend = day === 0 || day === 6;
  const openMinutes = (isWeekend ? 8 : 7) * 60;
  const closeMinutes = (isWeekend ? 20 : 19) * 60;
  const isOpen = minutes >= openMinutes && minutes < closeMinutes;

  return {
    isOpen,
    label: isOpen
      ? pickLocalized(locale, { es: "Abierto ahora", en: "Open now" })
      : pickLocalized(locale, { es: "Cerrado ahora", en: "Closed now" }),
  };
}

export function VisitanosPageContent() {
  const locale = useLocale();
  const [openStatus, setOpenStatus] = useState(() => getOpenStatus(locale));
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [emailError, setEmailError] = useState(false);

  useEffect(() => {
    setOpenStatus(getOpenStatus(locale));
    const interval = window.setInterval(() => setOpenStatus(getOpenStatus(locale)), 60_000);
    return () => window.clearInterval(interval);
  }, [locale]);

  const chips =
    locale === "en"
      ? ["📍 Cutler Bay, FL", "🅿 Free parking", "🕗 Opens 7:00"]
      : ["📍 Cutler Bay, FL", "🅿 Parqueo gratis", "🕗 Abre 7:00"];

  const hours = [
    {
      label: pickLocalized(locale, { es: "Lunes – Viernes", en: "Monday – Friday" }),
      time: "7:00 – 19:00",
    },
    {
      label: pickLocalized(locale, { es: "Sábado", en: "Saturday" }),
      time: "8:00 – 20:00",
    },
    {
      label: pickLocalized(locale, { es: "Domingo", en: "Sunday" }),
      time: "8:00 – 20:00",
    },
    {
      label: pickLocalized(locale, { es: "Brunch", en: "Brunch" }),
      time: pickLocalized(locale, { es: "DIARIO · 8:00 – 14:00", en: "DAILY · 8:00 – 14:00" }),
    },
  ];

  const directions = [
    {
      num: "01",
      title: pickLocalized(locale, { es: "En coche", en: "By car" }),
      body: pickLocalized(locale, {
        es: "A dos minutos de la US-1. Parqueo gratis frente al local y en el lote compartido del centro comercial.",
        en: "Two minutes from US-1. Free parking in front of the shop and in the shared lot.",
      }),
    },
    {
      num: "02",
      title: pickLocalized(locale, { es: "En transporte", en: "By transit" }),
      body: pickLocalized(locale, {
        es: "Parada del Busway de Cutler Bay a tres cuadras. Las rutas 38 y 31 paran cerca.",
        en: "Cutler Bay Busway stop three blocks away. Routes 38 and 31 stop nearby.",
      }),
    },
    {
      num: "03",
      title: pickLocalized(locale, { es: "En bici o a pie", en: "By bike or on foot" }),
      body: pickLocalized(locale, {
        es: "Aparcabicis a la entrada y terraza pet-friendly. Perfecto para el paseo de la mañana.",
        en: "Bike rack at the entrance and a pet-friendly terrace. Perfect for a morning walk.",
      }),
    },
  ];

  const faq =
    locale === "en"
      ? [
          {
            q: "Do you accept groups or reservations?",
            a: "Absolutely. For groups of 6+, we recommend reserving. DM us or call and we'll save the big window table for you.",
          },
          {
            q: "Is there wifi and outlets for working?",
            a: "Fast, free wifi and outlets at nearly every table. We only ask that you free up the big tables during brunch peak hours (Sat–Sun 10am–1pm).",
          },
          {
            q: "Can I bring my dog?",
            a: "Yes — the terrace is pet-friendly and we always have a fresh water bowl for your companion.",
          },
          {
            q: "Can I order online and pick up?",
            a: "Yes. Order online and pick up at the bar, or stop by and we'll serve you right away. We also deliver within Cutler Bay.",
          },
        ]
      : [
          {
            q: "¿Aceptan grupos o reservas?",
            a: "Claro. Para grupos de 6+ recomendamos reservar. Escríbenos por DM o llama y te guardamos la mesa grande junto a la ventana.",
          },
          {
            q: "¿Hay wifi y enchufes para trabajar?",
            a: "Wifi rápido y gratis, enchufes en casi todas las mesas. Solo pedimos liberar las mesas grandes en la hora pico del brunch (sáb–dom 10–13h).",
          },
          {
            q: "¿Puedo ir con mi perro?",
            a: "Sí — la terraza es pet-friendly y siempre tenemos un cuenco de agua fresca para tu compañero.",
          },
          {
            q: "¿Ordeno online y recojo?",
            a: "Sí. Pide online y recoge en la barra, o pásate y te lo servimos al momento. También entregamos a domicilio en Cutler Bay.",
          },
        ];

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!/.+@.+\..+/.test(email.trim())) {
      setEmailError(true);
      return;
    }
    setEmailError(false);
    setSubmitted(true);
    setEmail("");
  };

  return (
    <>
      <InnerPageHeader
        number="05"
        label={pickLocalized(locale, { es: "Visítanos", en: "Visit us" })}
        titleBefore={pickLocalized(locale, {
          es: "Pasa cuando quieras. Siempre hay",
          en: "Come whenever you like. There is always",
        })}
        titleEmphasis={pickLocalized(locale, { es: "café", en: "coffee" })}
        titleAfter="."
        intro={pickLocalized(locale, {
          es: "Estamos en el corazón de Cutler Bay, con parqueo gratis a la puerta y la cafetera lista desde las siete de la mañana.",
          en: "We are in the heart of Cutler Bay, with free parking out front and the coffee ready from seven in the morning.",
        })}
        chips={chips}
        bgImage={siteImages.mesaAlSol}
      />

      <section className="bg-cream-light py-[clamp(80px,10vw,140px)]">
        <div className="mx-auto grid max-w-[1240px] items-stretch gap-[clamp(36px,5vw,72px)] px-[clamp(20px,5vw,64px)] lg:grid-cols-[0.92fr_1.08fr]">
          <div data-rv>
            <h2 className="font-serif text-[clamp(30px,4.2vw,56px)] leading-[1.08] font-semibold text-balance">
              {pickLocalized(locale, { es: "Te esperamos en la esquina.", en: "We are waiting for you on the corner." })}
            </h2>
            <div className="mt-9 space-y-6">
              <InfoRow
                icon="◎"
                label={pickLocalized(locale, { es: "Dirección", en: "Address" })}
                value="18901 SW 106th Ave, Unit 101 · Cutler Bay, FL 33157"
              />
              <InfoRow
                icon="✆"
                label={pickLocalized(locale, { es: "Contacto", en: "Contact" })}
                value="(305) 555-0147 · hola@islacafe.miami"
              />
              <InfoRow
                icon="🅿"
                label={pickLocalized(locale, { es: "Parqueo", en: "Parking" })}
                value={pickLocalized(locale, {
                  es: "Gratis frente al local y en el lote compartido.",
                  en: "Free in front of the shop and in the shared lot.",
                })}
              />
            </div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={GOOGLE_MAPS_DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-ink px-7 py-3.5 text-[13px] font-bold tracking-[0.08em] text-cream shadow-[0_10px_26px_rgba(43,36,29,0.28)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5"
              >
                {pickLocalized(locale, { es: "Cómo llegar →", en: "Get directions →" })}
              </a>
              <a
                href="tel:+13055550147"
                className="inline-flex items-center justify-center rounded-full border border-border bg-cream-card px-7 py-3.5 text-[13px] font-bold tracking-[0.08em] text-ink transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-gold-dark"
              >
                {pickLocalized(locale, { es: "Llamar", en: "Call" })}
              </a>
            </div>
          </div>
          <div data-rv>
            <IslaMap />
          </div>
        </div>
      </section>

      <section className="bg-cream py-[clamp(70px,9vw,120px)]">
        <div className="mx-auto grid max-w-[1240px] items-start gap-10 px-[clamp(20px,5vw,64px)] lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <InnerSectionLabel index="A" label={pickLocalized(locale, { es: "Horario", en: "Hours" })} />
            <div data-rv-group className="mt-6">
              {hours.map((row) => (
                <div
                  key={row.label}
                  className="flex items-baseline justify-between gap-4 border-t border-border py-5"
                >
                  <span className="font-serif text-[22px]">{row.label}</span>
                  <span className="font-mono text-[13px] tracking-[0.08em] text-muted">{row.time}</span>
                </div>
              ))}
            </div>
          </div>
          <div
            data-rv
            className="border border-forest bg-forest p-8 text-cream-light sm:p-10"
          >
            <div className="flex items-center gap-3">
              <span
                className={`h-2.5 w-2.5 rounded-full ${openStatus.isOpen ? "bg-[#7FB98A]" : "bg-[#C77B5A]"}`}
              />
              <span className="font-mono text-[12px] tracking-[0.14em] uppercase">
                {openStatus.label}
              </span>
            </div>
            <p className="mt-5 text-[15px] leading-[1.65] text-cream-light/74">
              {pickLocalized(locale, {
                es: "La barra muele hasta media hora antes del cierre — siempre da tiempo a un último cortadito.",
                en: "The bar keeps grinding until half an hour before closing — there is always time for one last cortadito.",
              })}
            </p>
            <p className="mt-4 font-mono text-[11px] tracking-[0.1em] text-cream-light/50 uppercase">
              {pickLocalized(locale, {
                es: "Festivos con horario reducido. Lo anunciamos en Instagram.",
                en: "Reduced hours on holidays. We announce them on Instagram.",
              })}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-cream-light py-[clamp(70px,9vw,120px)]">
        <div className="mx-auto max-w-[1240px] px-[clamp(20px,5vw,64px)]">
          <InnerSectionLabel index="B" label={pickLocalized(locale, { es: "Cómo llegar", en: "How to get here" })} />
          <div data-rv-group className="mt-10 grid gap-6 md:grid-cols-3">
            {directions.map((item) => (
              <article key={item.num} className="border border-border bg-cream-card p-7">
                <p className="font-mono text-[11px] tracking-[0.18em] text-gold-dark">{item.num}</p>
                <h3 className="mt-2 font-serif text-[24px]">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-[1.65] text-muted">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-[clamp(70px,9vw,120px)]">
        <div className="mx-auto max-w-[880px] px-[clamp(20px,5vw,64px)]">
          <InnerSectionLabel
            index="C"
            label={pickLocalized(locale, { es: "Antes de venir", en: "Before you visit" })}
          />
          <div data-rv-group className="mt-6 flex flex-col">
            {faq.map((item) => (
              <details key={item.q} data-faq className="border-t border-border py-2">
                <summary className="flex cursor-pointer items-center justify-between gap-5 py-[18px]">
                  <span className="font-serif text-[23px]">{item.q}</span>
                  <span className="font-sans text-[22px] text-gold-dark">+</span>
                </summary>
                <p className="max-w-[60ch] pb-5 text-[15.5px] leading-[1.7] text-muted">{item.a}</p>
              </details>
            ))}
            <div className="border-t border-border" />
          </div>
        </div>
      </section>

      <section
        id="pedir"
        className="bg-gradient-to-b from-cream to-border-warm py-[clamp(70px,9vw,120px)]"
      >
        <div className="mx-auto max-w-[1240px] px-[clamp(20px,5vw,64px)]">
          <div className="grid items-center gap-10 border border-forest bg-forest p-[clamp(28px,5vw,48px)] text-cream-light lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h3 className="font-serif text-[clamp(28px,4vw,44px)] leading-[1.1] font-semibold">
                {pickLocalized(locale, {
                  es: "Recibe el especial de la semana.",
                  en: "Get the special of the week.",
                })}
              </h3>
              <p className="mt-4 max-w-[42ch] text-[15px] leading-[1.65] text-cream-light/74">
                {pickLocalized(locale, {
                  es: "Nuevos tostados, brunch de temporada y noches de música — sin spam, solo lo bueno.",
                  en: "New roasts, seasonal brunch, and music nights — no spam, just the good stuff.",
                })}
              </p>
            </div>
            <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={pickLocalized(locale, {
                  es: "tu@correo.com",
                  en: "you@email.com",
                })}
                className={`min-w-0 flex-1 border bg-cream-light/95 px-4 py-3.5 text-[15px] text-ink outline-none transition-colors ${emailError ? "border-gold-light" : "border-transparent"}`}
              />
              <button
                type="submit"
                className={`shrink-0 rounded-full px-7 py-3.5 text-[13px] font-bold tracking-[0.08em] transition-colors ${submitted ? "bg-gold-pale text-ink" : "bg-gold-light text-ink-warm hover:bg-gold"}`}
              >
                {submitted
                  ? pickLocalized(locale, { es: "¡Gracias! ☕", en: "Thank you! ☕" })
                  : pickLocalized(locale, { es: "Suscribirme", en: "Subscribe" })}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

function InfoRow({
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
