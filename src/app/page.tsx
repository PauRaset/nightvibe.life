import type { Metadata } from "next";
import { FinalCta } from "@/components/home/FinalCta";
import { HeatSection } from "@/components/home/HeatSection";
import { Hero } from "@/components/home/Hero";
import { LevelsSection } from "@/components/home/LevelsSection";
import { SocialSection } from "@/components/home/SocialSection";
import { TicketsSection } from "@/components/home/TicketsSection";
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

export default function HomePage() {
  return (
    <>
      <Hero />
      <HeatSection />
      <LevelsSection />
      <SocialSection />
      <TicketsSection />
      <FinalCta />
    </>
  );
}
