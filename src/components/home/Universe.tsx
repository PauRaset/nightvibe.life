import type { CSSProperties } from "react";
import { featured, friends, privateAttendees } from "@/lib/demo";
import { buildStars } from "@/lib/universe";
import { Avatar } from "../app/AppScreen";
import { Container } from "../Container";
import { UniverseCanvas } from "../live/UniverseCanvas";

// EL UNIVERSO (momento protagonista 2): los asistentes confirmados de un evento
// como estrellas. El servidor pinta un SVG estático con las mismas estrellas
// (estado final: reduced-motion y sin JS); con JS lo sustituye el Canvas animado.

const stars = buildStars();
const VB = 1.25; // margen del viewBox alrededor del disco unidad
const PX = 300; // px de referencia del radio del disco para escalar los tamaños

export function Universe() {
  return (
    <section
      id="los-tuyos"
      aria-labelledby="los-tuyos-title"
      className="relative scroll-mt-16 overflow-hidden py-20 sm:py-36"
    >
      <UniverseCanvas />
      <Container className="relative grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <h2
            id="los-tuyos-title"
            data-reveal-item
            className="text-[40px] leading-[0.98] font-extrabold tracking-[-0.035em] text-white sm:text-[64px]"
          >
            Mira a dónde van los tuyos.
          </h2>
          <p
            data-reveal-item
            style={{ "--reveal-delay": "80ms" } as CSSProperties}
            className="mt-6 max-w-[38ch] text-lg leading-relaxed text-nv-muted"
          >
            Cada punto es alguien que ha confirmado que va esta noche a {featured.kind}.{" "}
            <span className="text-white">
              {featured.attendees} personas, {friends.length} de los tuyos.
            </span>{" "}
            Los perfiles privados también cuentan, pero sin nombre.
          </p>
          <ul
            data-reveal-item
            style={{ "--reveal-delay": "160ms" } as CSSProperties}
            className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-[15px] text-nv-muted"
          >
            <li className="flex items-center gap-2">
              <span className="flex -space-x-1.5">
                {friends.slice(0, 3).map((f) => (
                  <Avatar key={f.name} name={f.name} hue={f.hue} size={24} />
                ))}
              </span>
              De los tuyos
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden="true" className="size-2.5 rounded-full bg-nv-violet" />
              Van
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden="true" className="size-4 rounded-full bg-white/20 ring-1 ring-white/35" />
              Perfil privado ({privateAttendees})
            </li>
          </ul>
        </div>

        {/* El hueco del disco: el Canvas centra las estrellas aquí. */}
        <div data-universe-disc className="relative mx-auto aspect-square w-full max-w-[min(100%,82svh)] lg:col-span-7">
          <svg
            viewBox={`${-VB} ${-VB} ${VB * 2} ${VB * 2}`}
            role="img"
            aria-label={`${featured.attendees} personas confirmadas como estrellas; ${friends.length} de los tuyos con su inicial y ${privateAttendees} perfiles privados sin nombre`}
            className="absolute inset-0 size-full overflow-visible in-data-live:hidden"
          >
            <defs>
              {(["cyan", "violet", "magenta"] as const).map((h) => (
                <radialGradient key={h} id={`halo-${h}`}>
                  <stop offset="0%" stopColor={`var(--nv-${h})`} stopOpacity="0.55" />
                  <stop offset="100%" stopColor={`var(--nv-${h})`} stopOpacity="0" />
                </radialGradient>
              ))}
            </defs>
            {stars.map((s) => {
              const r = s.size / PX;
              const cx = s.x;
              const cy = s.y;
              if (s.kind === "private")
                return (
                  <circle key={s.i} cx={cx} cy={cy} r={r} fill="white" fillOpacity="0.2" stroke="white" strokeOpacity="0.35" strokeWidth={1 / PX} />
                );
              return (
                <g key={s.i}>
                  <circle cx={cx} cy={cy} r={r * (s.kind === "friend" ? 2.1 : 3.5)} fill={`url(#halo-${s.hue})`} />
                  <circle cx={cx} cy={cy} r={r} fill={`var(--nv-${s.hue})`} />
                  {s.kind === "friend" && (
                    <text x={cx} y={cy} dy="0.35em" textAnchor="middle" fontSize={r * 1.05} fontWeight="800" fill="var(--nv-bg)">
                      {s.initial}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </Container>
    </section>
  );
}
