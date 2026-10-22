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

export default function LocalesPage() {
  return (
    <>
      <Reveal />

      <section aria-labelledby="locales-title" className="pt-12 pb-16 sm:pt-28 sm:pb-28 lg:pt-32">
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
              className="mt-8 max-w-[38ch] text-lg leading-relaxed text-pretty text-nv-muted lg:mt-10 lg:text-xl"
            >
              Tú organizas la noche. NightVibe pone la app, la venta de entradas y el escaparate
              ante la gente que está decidiendo ahora a dónde ir.
            </p>
            <div data-reveal-item style={delay(160)} className="mt-12">
              <GradientButton href="#contacto">Quiero información</GradientButton>
            </div>
          </div>
          {/* El panel del local esta noche: sin botones que compitan con el CTA. */}
          <figure data-reveal-item style={delay(120)} className="lg:col-span-5 lg:flex lg:justify-end">
            <AppScreen screen="panel" glow="cyan" width={360} preload />
            <figcaption className="sr-only">El panel de tu local en NightVibe la noche de un evento.</figcaption>
          </figure>
        </Container>
      </section>

      <ValueProps />
      <HowItWorks />
      <BusinessModel />

      <section
        id="contacto"
        aria-labelledby="contacto-title"
        className="scroll-mt-20 py-16 sm:py-28"
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
