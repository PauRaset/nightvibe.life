import type { Metadata } from "next";
import { FeatureSheets } from "@/components/home/FeatureSheets";
import { FinalCta } from "@/components/home/FinalCta";
import { Hero } from "@/components/home/Hero";
import { Rewards } from "@/components/home/Rewards";
import { HeatControl } from "@/components/live/HeatControl";
import { Reveal } from "@/components/live/Reveal";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...pageMetadata({
    title: `${siteConfig.name} · ${siteConfig.shortDescription}`,
    description: siteConfig.description,
    path: "/",
  }),
  // La home usa el título completo, sin la plantilla "%s · NightVibe".
  title: { absolute: `${siteConfig.name} · ${siteConfig.shortDescription}` },
};

// Un solo fondo y un mensaje por pantalla: las secciones las separa el aire.
export default function HomePage() {
  return (
    <>
      <Reveal />
      <Hero />
      <section id="calor" aria-labelledby="calor-title" className="scroll-mt-16 py-20 sm:py-36">
        <HeatControl initial={34} />
      </section>
      <FeatureSheets />
      <Rewards />
      <FinalCta />
    </>
  );
}
