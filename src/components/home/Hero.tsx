import { Container } from "../Container";
import { PhoneMockup } from "../PhoneMockup";
import { StoreButtons } from "../StoreButtons";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-nv-violet/20 blur-[120px]"
      />
      <Container className="grid items-center gap-14 pt-12 pb-20 sm:pt-20 lg:grid-cols-[1.1fr_1fr] lg:pb-28">
        <div>
          <p className="nv-label flex items-center gap-2 text-nv-magenta">
            <span
              className="size-2 rounded-full bg-nv-magenta motion-safe:animate-live-dot"
              aria-hidden="true"
            />
            Ahora mismo
          </p>
          <h1
            id="hero-title"
            className="mt-5 text-balance text-[2.75rem] leading-[0.98] font-extrabold tracking-tight text-white sm:text-7xl"
          >
            La noche ya ha empezado. <span className="text-nv-gradient">Descubre dónde.</span>
          </h1>
          <p className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-nv-muted">
            Mira qué locales se están llenando en tiempo real, a dónde van tus amigos y entra con tu
            entrada en el móvil.
          </p>
          <StoreButtons className="mt-9" />
        </div>
        <div className="relative motion-safe:animate-float">
          {/* Segundo móvil solo en escritorio: en 375px no cabe sin apretar el hero. */}
          <PhoneMockup
            screen="evento"
            glow={false}
            className="absolute! top-12 left-1/2 hidden -translate-x-[95%] -rotate-6 scale-90 opacity-70 lg:block"
          />
          <PhoneMockup screen="home" preload className="lg:translate-x-16" />
        </div>
      </Container>
    </section>
  );
}
