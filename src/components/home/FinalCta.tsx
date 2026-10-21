import type { CSSProperties } from "react";
import { Container } from "../Container";
import { HeatBadge } from "../HeatBadge";
import { StoreButtons } from "../StoreButtons";

// El último capítulo: la hora punta. El campo más caliente de la página.
export function FinalCta() {
  return (
    <section
      id="descargar"
      aria-labelledby="descargar-title"
      className="scroll-mt-16 bg-nv-field-high"
    >
      <Container className="grid min-h-[86svh] items-center gap-12 py-24 sm:py-32 lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-7">
          <h2
            id="descargar-title"
            data-reveal-item
            className="text-[40px] leading-[0.98] font-extrabold tracking-[-0.035em] text-white sm:text-[64px]"
          >
            Sal sabiendo a dónde.
          </h2>
          <p
            data-reveal-item
            style={{ "--reveal-delay": "80ms" } as CSSProperties}
            className="mt-6 max-w-lg text-lg leading-relaxed text-white"
          >
            Son las 02:30 y la noche está a reventar. NightVibe llega pronto a iPhone y Android:
            descárgala y mira cómo está la noche ahora mismo.
          </p>
          <StoreButtons className="mt-10" />
        </div>
        <div className="order-first flex min-w-0 justify-start sm:justify-end lg:order-none lg:col-span-5">
          <HeatBadge value={94} size="xl" className="text-[15vw] sm:text-[11vw] lg:text-[min(6.4vw,10svh)]" />
        </div>
      </Container>
    </section>
  );
}
