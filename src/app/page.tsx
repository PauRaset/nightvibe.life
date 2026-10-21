import type { Metadata } from "next";
import { FeatureSheets } from "@/components/home/FeatureSheets";
import { FinalCta } from "@/components/home/FinalCta";
import { Hero } from "@/components/home/Hero";
import { RewardTiles } from "@/components/home/RewardTiles";
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

// La home es una noche entera: cada sección es un capítulo y su color dice
// cuánto calor hay (empieza → subiendo → a reventar).
export default function HomePage() {
  return (
    <>
      <Reveal />
      <Hero />
      <section id="calor" aria-labelledby="calor-title" className="scroll-mt-16">
        <HeatControl initial={62} />
      </section>
      <FeatureSheets />
      <RewardTiles />
      <FinalCta />
    </>
  );
}
