import { AppScreen } from "../app/AppScreen";
import { Container } from "../Container";
import { StoreButtons } from "../StoreButtons";

// Hero: titular, una línea de apoyo, la descarga y la app. Nada más.
export function Hero() {
  return (
    <section aria-labelledby="hero-title">
      <Container className="grid items-center gap-20 pt-20 pb-32 sm:pt-28 lg:grid-cols-12 lg:gap-8 lg:pt-32 lg:pb-36">
        <div className="lg:col-span-7">
          <h1
            id="hero-title"
            className="text-[13vw] leading-[0.95] font-extrabold tracking-[-0.045em] text-white sm:text-[80px] lg:text-[96px]"
          >
            La noche, <span className="block">en directo.</span>
          </h1>
          <p className="mt-8 max-w-[34ch] text-lg leading-relaxed text-nv-muted sm:text-xl">
            Mira qué locales se están llenando ahora mismo y a dónde van los tuyos.
          </p>
          <StoreButtons className="mt-12" />
        </div>
        <div className="flex justify-center lg:col-span-5 lg:justify-end">
          <AppScreen screen="home" preload />
        </div>
      </Container>
    </section>
  );
}
