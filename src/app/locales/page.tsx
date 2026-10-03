import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { GhostButton } from "@/components/GhostButton";
import { GradientButton } from "@/components/GradientButton";
import { ContactForm } from "@/components/locales/ContactForm";
import { Pricing } from "@/components/locales/Pricing";
import { ValueProps } from "@/components/locales/ValueProps";
import { SectionHeading } from "@/components/SectionHeading";
import { formatEuros, siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Para locales",
  description: `Publica eventos, vende entradas y fideliza con promociones por niveles. Comisión fija de ${formatEuros(siteConfig.pricing.feePerTicketCents)} por entrada, sin otros cobros.`,
  path: "/locales",
});

export default function LocalesPage() {
  return (
    <>
      <section aria-labelledby="locales-title" className="border-b border-nv-line">
        <Container className="py-16 sm:py-24">
          <p className="nv-label text-nv-muted">Para locales y discotecas</p>
          <h1
            id="locales-title"
            className="mt-5 max-w-3xl text-balance text-4xl leading-[1.05] font-extrabold tracking-tight text-white sm:text-6xl"
          >
            Llega a la gente que sale esta noche.
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-nv-muted">
            NightVibe es la plataforma donde tu local publica eventos, vende entradas y premia a
            quien vuelve. Tú organizas; nosotros ponemos la tecnología y el escaparate.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <GradientButton href="#contacto">Quiero información</GradientButton>
            <GhostButton href="#precio-title">Ver precio</GhostButton>
          </div>
        </Container>
      </section>

      <ValueProps />
      <Pricing />

      <section id="contacto" aria-labelledby="contacto-title" className="scroll-mt-20 py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading
            id="contacto-title"
            eyebrow="Contacto"
            title="Hablemos de tu local."
            description="Déjanos tus datos y te contamos cómo empezar. Sin compromiso."
          />
          <div className="rounded-3xl border border-nv-line bg-nv-surface p-5 sm:p-8">
            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  );
}
