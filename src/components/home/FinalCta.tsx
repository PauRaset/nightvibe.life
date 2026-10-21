import type { CSSProperties } from "react";
import { Container } from "../Container";
import { HeatBadge } from "../HeatBadge";
import { StoreButtons } from "../StoreButtons";

// Cierre: la descarga, con el badge a reventar como única imagen.
export function FinalCta() {
  return (
    <section
      id="descargar"
      aria-labelledby="descargar-title"
      className="scroll-mt-16 py-32 sm:py-36"
    >
      <Container className="grid items-center gap-16 lg:grid-cols-12 lg:gap-8">
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
            className="mt-8 max-w-[34ch] text-lg leading-relaxed text-nv-muted"
          >
            NightVibe llega pronto a iPhone y Android.
          </p>
          <StoreButtons className="mt-12" />
        </div>
        <div className="order-first flex min-w-0 justify-start sm:justify-end lg:order-none lg:col-span-5">
          <HeatBadge value={94} size="xl" className="text-[13vw] sm:text-[9vw] lg:text-[min(4.6vw,7svh)]" />
        </div>
      </Container>
    </section>
  );
}
