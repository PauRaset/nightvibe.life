import type { CSSProperties } from "react";
import { featured } from "@/lib/demo";
import { getHeatLevel, heatLevels } from "@/lib/heat";
import { Container } from "../Container";
import { HeatBadge } from "../HeatBadge";
import { StoreButtons } from "../StoreButtons";

// Cierre "el objeto vuelve": el badge del hero regresa, grande y recortado por el
// borde de la sección; a su lado, la frase y la descarga (próximamente).
// Alineado a la izquierda en todos los anchos.

export function FinalCta() {
  return (
    <section
      id="descargar"
      aria-labelledby="descargar-title"
      className="relative scroll-mt-16 overflow-hidden py-20 sm:py-36 lg:min-h-[90svh] lg:py-24"
    >
      <div
        aria-hidden="true"
        className="-ml-[12vw] sm:-ml-[10vw] lg:absolute lg:top-1/2 lg:left-0 lg:ml-0 lg:w-auto lg:-translate-x-[22%] lg:-translate-y-1/2"
      >
        {/* El anillo se recorta por el borde; la etiqueta se alinea a su lado visible. */}
        <span className="inline-flex flex-col items-end gap-[0.3em] text-[19vw] sm:text-[16vw] lg:text-[min(10vw,13.5svh)]">
          <HeatBadge value={featured.attendees} size="xl" hideLabel />
          <span className={`text-[0.38em] font-bold tracking-[0.14em] uppercase ${heatLevels[getHeatLevel(featured.attendees)].textClass}`}>
            {heatLevels[getHeatLevel(featured.attendees)].label}
          </span>
        </span>
      </div>
      <Container className="relative mt-10 grid lg:mt-0 lg:min-h-[calc(90svh-12rem)] lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5 lg:col-start-8">
          <h2
            id="descargar-title"
            data-reveal-item
            className="text-[40px] leading-[0.98] font-extrabold tracking-[-0.035em] text-white sm:text-[56px]"
          >
            Esta noche, sal sabiendo a dónde.
          </h2>
          <p
            data-reveal-item
            style={{ "--reveal-delay": "80ms" } as CSSProperties}
            className="mt-6 max-w-[34ch] text-lg leading-relaxed text-nv-muted"
          >
            NightVibe llega pronto a iPhone y Android.
          </p>
          <div data-reveal-item style={{ "--reveal-delay": "160ms" } as CSSProperties}>
            <StoreButtons className="mt-10" />
          </div>
        </div>
      </Container>
    </section>
  );
}
