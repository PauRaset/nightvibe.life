import type { CSSProperties } from "react";
import { featured, friends, privateAttendees } from "@/lib/demo";
import { buildStars } from "@/lib/universe";
import { Avatar } from "../app/Avatar";
import { Container } from "../Container";
import { UniverseCanvas } from "../live/UniverseCanvas";

// EL UNIVERSO (momento protagonista 2), a sangre: los asistentes confirmados de
// un evento como estrellas repartidas en una elipse que ocupa todo el ancho del
// viewport. El servidor pinta un SVG estático con las mismas estrellas (estado
// final: reduced-motion y sin JS); con JS lo sustituye el Canvas animado.

const stars = buildStars();
// Campo del SVG: 3.2 × 2 unidades; las estrellas ocupan el 94 % × 88 %.
const AX = 1.6;
const RX = AX * 0.94;
const RY = 0.88;
const PX = 300; // px de referencia para medio alto del campo

export function Universe() {
  return (
    <section id="los-tuyos" aria-labelledby="los-tuyos-title" className="scroll-mt-16 pt-20 sm:pt-36">
      <Container className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
        <h2
          id="los-tuyos-title"
          data-reveal-item
          className="text-[40px] leading-[0.98] font-extrabold tracking-[-0.035em] text-white sm:text-[64px] lg:col-span-6"
        >
          Mira a dónde van los tuyos.
        </h2>
        <div className="lg:col-span-5 lg:col-start-8">
          <p data-reveal-item style={{ "--reveal-delay": "80ms" } as CSSProperties} className="max-w-[40ch] text-lg leading-relaxed text-nv-muted">
            Cada punto es alguien que ha confirmado que va esta noche a {featured.kind}.{" "}
            <span className="text-white">
              {featured.attendees} personas, {friends.length} de los tuyos.
            </span>{" "}
            Los perfiles privados también cuentan, pero sin nombre.
          </p>
          <ul
            data-reveal-item
            style={{ "--reveal-delay": "160ms" } as CSSProperties}
            className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-[15px] text-nv-muted"
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
      </Container>

      {/* El campo, a sangre: todo el ancho del viewport. */}
      <div data-universe-field className="relative mt-4 h-[70svh] w-full overflow-hidden sm:mt-8 lg:h-[78svh]">
        <svg
          viewBox={`${-AX} -1 ${AX * 2} 2`}
          preserveAspectRatio="xMidYMid slice"
          role="img"
          aria-label={`${featured.attendees} personas confirmadas como estrellas; ${friends.length} de los tuyos con su inicial y ${privateAttendees} perfiles privados sin nombre`}
          className="absolute inset-0 size-full in-data-live:hidden"
        >
          <defs>
            {(["cyan", "violet", "magenta"] as const).map((h) => (
              <radialGradient key={h} id={`halo-${h}`}>
                <stop offset="0%" stopColor={`var(--nv-${h})`} stopOpacity="0.45" />
                <stop offset="100%" stopColor={`var(--nv-${h})`} stopOpacity="0" />
              </radialGradient>
            ))}
          </defs>
          {stars.map((s) => {
            const r = s.size / PX;
            const cx = s.x * RX;
            const cy = s.y * RY;
            if (s.kind === "private")
              return (
                <circle key={s.i} cx={cx} cy={cy} r={r} fill="white" fillOpacity="0.18" stroke="white" strokeOpacity="0.35" strokeWidth={1 / PX} />
              );
            return (
              <g key={s.i}>
                <circle cx={cx} cy={cy} r={r * (s.kind === "friend" ? 3.25 : 6.5)} fill={`url(#halo-${s.hue})`} />
                <circle cx={cx} cy={cy} r={r} fill={`var(--nv-${s.hue})`} />
                {s.kind === "friend" && (
                  <text x={cx} y={cy} dy="0.36em" textAnchor="middle" fontSize={r * 1.15} fontWeight="800" fill="var(--nv-bg)">
                    {s.initial}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
        <UniverseCanvas />
      </div>
    </section>
  );
}
