import type { Metadata } from "next";
import { FeatureRows } from "@/components/home/FeatureRows";
import { FinalCta } from "@/components/home/FinalCta";
import { Hero } from "@/components/home/Hero";
import { Levels } from "@/components/home/Levels";
import { Tonight } from "@/components/home/Tonight";
import { Universe } from "@/components/home/Universe";
import { HeatScroll } from "@/components/live/HeatScroll";
import { Reveal } from "@/components/live/Reveal";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: `${siteConfig.name} · ${siteConfig.shortDescription}`,
  absoluteTitle: true,
  description: siteConfig.description,
  path: "/",
});

// "La frase es la composición": cada sección es una frase con su prueba al lado,
// alternando escalas. Dos momentos protagonistas a ancho completo: el calor con
// scroll y el universo de los tuyos.
export default function HomePage() {
  return (
    <>
      <Reveal />
      <Hero />
      <HeatScroll />
      <Tonight />
      <Universe />
      <FeatureRows />
      <Levels />
      <FinalCta />
    </>
  );
}
