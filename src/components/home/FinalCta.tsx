import { Container } from "../Container";
import { HeatBadge } from "../HeatBadge";
import { StoreButtons } from "../StoreButtons";

export function FinalCta() {
  return (
    <section id="descargar" aria-labelledby="descargar-title" className="scroll-mt-20 py-16 sm:py-28">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] bg-nv-surface px-6 py-14 text-center sm:px-12 sm:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 left-1/2 h-64 w-[80%] -translate-x-1/2 rounded-full bg-nv-gradient opacity-30 blur-[90px]"
          />
          <div className="relative">
            <HeatBadge value={92} size="lg" />
            <h2
              id="descargar-title"
              className="mx-auto mt-8 max-w-xl text-balance text-4xl leading-[1.02] font-extrabold tracking-tight text-white sm:text-6xl"
            >
              Esta noche, sal sabiendo a dónde.
            </h2>
            <p className="mx-auto mt-5 max-w-md text-nv-muted">
              Descarga NightVibe y mira cómo está la noche ahora mismo.
            </p>
            <StoreButtons className="mt-9" align="center" />
          </div>
        </div>
      </Container>
    </section>
  );
}
