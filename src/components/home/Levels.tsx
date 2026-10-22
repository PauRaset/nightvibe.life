import type { CSSProperties } from "react";
import { levels } from "@/lib/demo";
import { heatStop } from "@/lib/heatScale";
import { Container } from "../Container";

// Los 10 niveles como la barra de progreso de la app, ampliada a todo el ancho.
// Cada tramo, un punto de la escala de calor (barra de progreso: gradiente
// permitido por la marca). Premios de EJEMPLO: cada local define los suyos.

export function Levels() {
  const last = levels.length - 1;
  return (
    <section id="niveles" aria-labelledby="niveles-title" className="scroll-mt-16 py-20 sm:py-36">
      <Container>
        <h2
          id="niveles-title"
          data-reveal-item
          className="text-[34px] leading-[0.98] font-extrabold tracking-[-0.035em] text-white sm:text-[clamp(56px,6.4vw,104px)]"
        >
          Diez niveles.
          <span className="block">Premios de verdad.</span>
        </h2>
        <p data-reveal-item style={{ "--reveal-delay": "80ms" } as CSSProperties} className="mt-6 max-w-[52ch] text-lg leading-relaxed text-nv-muted">
          Para subir, completas las misiones del nivel y canjeas su premio. El último es una mesa con
          botella.
        </p>
        <p className="mt-6 max-w-[60ch] rounded-2xl bg-nv-surface px-5 py-4 text-base text-nv-muted">
          <span className="font-bold text-white">Ejemplo de catálogo.</span> Cada local define sus
          propios niveles, misiones y premios.
        </p>

        {/* La barra: horizontal en escritorio, vertical en móvil. */}
        <ol
          data-ui
          aria-label="Los diez niveles de un local y su premio"
          className="mt-16 flex flex-col gap-1.5 sm:mt-24 lg:h-[34vh] lg:min-h-[260px] lg:flex-row lg:items-end"
        >
          {levels.map((l, i) => (
            <li
              key={l.level}
              data-reveal-item
              // En escritorio, cada nivel más alto que el anterior (del 40 % al 100 %).
              style={{ "--reveal-delay": `${i * 45}ms`, background: heatStop(i / last), "--lv-h": `${40 + (i / last) * 60}%` } as CSSProperties}
              className="flex min-h-[64px] items-start justify-between gap-4 rounded-xl px-5 py-4 text-black lg:h-(--lv-h) lg:min-h-0 lg:flex-1 lg:flex-col lg:px-4"
            >
              <span className="shrink-0 text-[13px] font-bold tracking-[0.14em] whitespace-nowrap uppercase">
                Nivel <span className="text-2xl tracking-normal tabular-nums lg:block lg:text-[32px] lg:leading-none">{l.level}</span>
              </span>
              <span className="text-right text-base leading-tight font-bold lg:hidden">{l.reward}</span>
            </li>
          ))}
        </ol>

        {/* En escritorio, la escalera de premios bajo la barra. */}
        <ol className="mt-12 hidden grid-flow-col grid-cols-2 grid-rows-5 gap-x-8 gap-y-4 lg:grid">
          {levels.map((l) => (
            <li key={l.level} className="grid grid-cols-[5.5rem_1fr] items-baseline">
              <span className="text-base text-nv-muted tabular-nums">Nivel {l.level}</span>
              <span className={`text-xl font-bold ${l.level === levels.length ? "text-nv-magenta" : "text-white"}`}>{l.reward}</span>
            </li>
          ))}
        </ol>


      </Container>
    </section>
  );
}
