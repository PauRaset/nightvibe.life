import type { CSSProperties } from "react";
import { featured } from "@/lib/demo";
import { Container } from "../Container";
import { HeatBadge } from "../HeatBadge";
import { StoreButtons } from "../StoreButtons";

// Hero "la frase es la composición": «Esta noche ya van [badge].» El badge real
// (asistentes confirmados + etiqueta) es la palabra que falta, en línea y latiendo.

const delay = (ms: number) => ({ "--rise-delay": `${ms}ms` }) as CSSProperties;

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="overflow-hidden">
      <Container className="relative pt-14 pb-20 sm:pt-24 sm:pb-36 lg:pt-32">
        <h1
          id="hero-title"
          className="text-[13.5vw] leading-[1] font-extrabold tracking-[-0.045em] text-white sm:text-[11vw] lg:text-[clamp(96px,9vw,150px)]"
        >
          <span className="nv-rise block" style={delay(0)}>
            Esta noche
          </span>
          <span className="nv-rise block whitespace-nowrap" style={delay(110)}>
            ya van{" "}
            {/* El badge como palabra: el punto va pegado al anillo; la etiqueta cuelga debajo. */}
            <span className="ml-[0.06em] inline-block align-[-0.04em] text-[0.19em] tracking-normal sm:text-[0.17em]">
              <HeatBadge value={featured.attendees} size="xl" floatLabel />
            </span>
            <span className="-ml-[0.02em]">.</span>
          </span>
        </h1>

        <p className="nv-rise mt-12 max-w-[40ch] text-lg leading-relaxed text-nv-muted sm:text-xl" style={delay(260)}>
          <span className="font-bold text-white">La noche, en directo.</span> Mira qué locales se están
          llenando y a dónde van los tuyos.
        </p>
        <div className="nv-rise mt-10" style={delay(260)}>
          <StoreButtons />
        </div>
      </Container>
    </section>
  );
}
