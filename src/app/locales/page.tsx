import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { AppScreen } from "@/components/app/AppScreen";
import { Container } from "@/components/Container";
import { GradientButton } from "@/components/GradientButton";
import { Reveal } from "@/components/live/Reveal";
import { BusinessModel } from "@/components/locales/BusinessModel";
import { ContactForm } from "@/components/locales/ContactForm";
import { HowItWorks } from "@/components/locales/HowItWorks";
import { ValueProps } from "@/components/locales/ValueProps";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Para locales",
  description:
    "Publica eventos, vende entradas y premia a quien vuelve con niveles y misiones. Hablemos de tu local.",
  path: "/locales",
});

const delay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

// Reparto de papeles: NightVibe es una plataforma intermediaria.
const roles = [
  { who: "Tu local", what: "Organiza la noche, pone los precios y decide los premios." },
  { who: "NightVibe", what: "Pone la app, la venta de entradas y el escaparate." },
];

export default function LocalesPage() {
  return (
    <>
      <Reveal />

      <section aria-labelledby="locales-title" className="bg-nv-bg pt-14 pb-16 sm:pt-20 sm:pb-20 lg:pt-28 lg:pb-32">
        <Container className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <h1
              id="locales-title"
              data-reveal-item
              className="text-5xl leading-none font-extrabold tracking-[-0.035em] text-balance text-white lg:text-8xl"
            >
              Llena tu sala esta noche.
            </h1>
            <p
              data-reveal-item
              style={delay(80)}
              className="mt-8 max-w-xl text-lg leading-relaxed text-pretty text-white lg:mt-10 lg:text-xl"
            >
              NightVibe es la app donde tu local publica eventos, vende entradas y premia a quien
              vuelve. Llegas a la gente que está decidiendo ahora a dónde ir.
            </p>
            <div data-reveal-item style={delay(160)} className="mt-8 lg:mt-10">
              <GradientButton href="#contacto">Quiero información</GradientButton>
            </div>
            <dl className="mt-14 grid gap-8 sm:grid-cols-2 lg:mt-20">
              {roles.map((r, i) => (
                <div key={r.who} data-reveal-item style={delay(160 + i * 80)}>
                  <dt className="text-2xl leading-tight font-extrabold tracking-[-0.025em] text-white lg:text-3xl">
                    {r.who}
                  </dt>
                  <dd className="mt-2 max-w-sm text-lg leading-relaxed text-pretty text-nv-muted lg:text-xl">
                    {r.what}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <figure data-reveal-item style={delay(120)} className="lg:col-span-5 lg:flex lg:justify-end">
            <AppScreen screen="evento" preload />
            <figcaption className="sr-only">Así ve la gente el evento de un local en la app.</figcaption>
          </figure>
        </Container>
      </section>

      <ValueProps />
      <HowItWorks />
      <BusinessModel />

      <section
        id="contacto"
        aria-labelledby="contacto-title"
        className="scroll-mt-20 bg-nv-field-deep py-16 sm:py-20 lg:py-32"
      >
        <Container>
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
            <h2
              id="contacto-title"
              data-reveal-item
              className="text-4xl leading-none font-extrabold tracking-[-0.035em] text-balance text-white lg:col-span-6 lg:text-6xl"
            >
              Hablemos de tu local.
            </h2>
            <p
              data-reveal-item
              style={delay(80)}
              className="max-w-xl text-lg leading-relaxed text-pretty text-white lg:col-span-6 lg:text-xl"
            >
              Déjanos tus datos y te escribimos para conocer tu local. Sin compromiso.
            </p>
          </div>
          <div data-reveal-item style={delay(120)} className="mt-12 lg:mt-20">
            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  );
}
