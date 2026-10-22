import type { CSSProperties } from "react";
import { featured, friends, ticket } from "@/lib/demo";
import { Avatar } from "../app/AppScreen";
import { Container } from "../Container";
import { HeatBadge } from "../HeatBadge";
import { StoreButtons } from "../StoreButtons";

// Hero "la frase es la composición": «Esta noche ya van [badge].» El badge real
// (asistentes confirmados + etiqueta) es la palabra que falta, en línea y latiendo.
// Tres chips reales de la app alrededor de la frase (nunca encima).

const delay = (ms: number) => ({ "--rise-delay": `${ms}ms` }) as CSSProperties;

/** Chip de la app: superficie teñida, sin borde ni sombra. */
function Chip({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div data-ui className={`inline-flex items-center gap-3 rounded-2xl bg-nv-surface-strong px-4 py-3 text-[15px] text-white ${className}`}>
      {children}
    </div>
  );
}

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="overflow-hidden">
      <Container className="relative pt-14 pb-20 sm:pt-24 sm:pb-36 lg:pt-28">
        <Chip className="nv-rise mb-8 sm:mb-10">
          <span aria-hidden="true" className="size-2 rounded-full bg-nv-magenta motion-safe:animate-live-dot" />
          <span className="font-bold tracking-[0.14em] uppercase">En vivo</span>
          <span className="text-nv-muted tabular-nums">{featured.kind} · {featured.zone}</span>
        </Chip>

        <h1
          id="hero-title"
          className="text-[13.5vw] leading-[1] font-extrabold tracking-[-0.045em] text-white sm:text-[11vw] lg:text-[clamp(96px,9vw,150px)]"
        >
          <span className="nv-rise block" style={delay(0)}>
            Esta noche
          </span>
          <span className="nv-rise block whitespace-nowrap" style={delay(110)}>
            ya van{" "}
            {/* El badge como palabra: anillo y etiqueta debajo, dentro del alto de la línea. */}
            <span className="mx-[0.06em] inline-block align-[-0.12em] text-[0.19em] tracking-normal sm:text-[0.17em]">
              <HeatBadge value={featured.attendees} size="xl" />
            </span>
            .
          </span>
        </h1>

        <p className="nv-rise mt-8 max-w-[40ch] text-lg leading-relaxed text-nv-muted sm:text-xl" style={delay(260)}>
          <span className="font-bold text-white">La noche, en directo.</span> Mira qué locales se están
          llenando y a dónde van los tuyos.
        </p>
        <div className="nv-rise mt-10" style={delay(260)}>
          <StoreButtons />
        </div>

        {/* Chips de la app: a la derecha de la frase en escritorio; debajo en móvil. */}
        <div className="mt-12 flex flex-wrap gap-3 lg:mt-0">
          <Chip className="nv-rise lg:absolute lg:top-[30%] lg:right-8 lg:rotate-3" >
            <span className="flex -space-x-2">
              {friends.slice(0, 3).map((f) => (
                <Avatar key={f.name} name={f.name} hue={f.hue} size={30} />
              ))}
            </span>
            <span>
              <span className="font-bold">{friends[0].name}, {friends[1].name}</span>{" "}
              <span className="text-nv-muted">y {friends.length - 2} más van</span>
            </span>
          </Chip>
          <Chip className="nv-rise lg:absolute lg:right-[9%] lg:bottom-[22%] lg:-rotate-2">
            <span className="text-nv-muted">Tu entrada</span>
            <span className="font-extrabold tracking-[0.08em] text-nv-cyan tabular-nums">{ticket.serial}</span>
          </Chip>
        </div>
      </Container>
    </section>
  );
}
