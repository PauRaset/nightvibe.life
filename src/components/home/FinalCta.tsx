import type { CSSProperties } from "react";
import { featured } from "@/lib/demo";
import { Container } from "../Container";
import { HeatBadge } from "../HeatBadge";
import { StoreButtons } from "../StoreButtons";

// Cierre "el objeto vuelve": el badge del hero regresa, grande y entero, agrupado
// con la frase y la descarga (próximamente) en la retícula común. Sin overflow:
// su halo se desvanece a transparente dentro del relleno de la sección.

export function FinalCta() {
  return (
    <section id="descargar" aria-labelledby="descargar-title" className="scroll-mt-16 overflow-x-clip py-24 sm:py-36 lg:py-44">
      <Container className="flex flex-col gap-14 lg:flex-row lg:items-center lg:gap-20">
        <div aria-hidden="true" className="shrink-0">
          <HeatBadge
            value={featured.attendees}
            size="xl"
            className="text-[15vw] sm:text-[11vw] lg:text-[clamp(64px,6vw,92px)]"
          />
        </div>
        <div className="max-w-xl">
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
