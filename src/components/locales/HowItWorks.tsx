import type { CSSProperties } from "react";
import { heatStop } from "@/lib/heatScale";
import { Container } from "../Container";

// "Así se empieza" como UNA barra: tres tramos cuyo ancho sigue lo que dura cada
// etapa (darse de alta es poco; vender es cada noche). Es la barra de progreso de
// la app (gradiente permitido por la marca). Movimiento discreto: los tramos
// crecen al entrar en pantalla (transform, una vez).

const stages = [
  { when: "Una llamada", title: "Primero, hablamos.", text: "Nos cuentas cómo es tu local y qué quieres conseguir.", grow: 1.2 },
  { when: "Un par de días", title: "Luego, das de alta tu local.", text: "Subes tu local y tus eventos. Defines entradas, misiones y premios.", grow: 2 },
  { when: "Cada noche", title: "Y a partir de ahí, vendes.", text: "La gente confirma, compra y entra con su QR. Tú ves quién vuelve.", grow: 4 },
];

export function HowItWorks() {
  return (
    <section aria-labelledby="como-title" className="py-16 sm:py-28">
      <Container>
        <h2
          id="como-title"
          data-reveal-item
          className="text-4xl leading-none font-extrabold tracking-[-0.035em] text-white lg:text-6xl"
        >
          Así se empieza.
        </h2>
        {/* Móvil: barra fina de 3 tramos y cada paso en texto debajo. */}
        <div className="mt-12 md:hidden">
          <div data-reveal-grow className="flex h-2 origin-left gap-1 overflow-hidden rounded-full" aria-hidden="true">
            {stages.map((s, i) => (
              <span key={s.title} className="h-full" style={{ flexGrow: s.grow, background: heatStop(i / (stages.length - 1)) }} />
            ))}
          </div>
          <ol className="mt-8 space-y-8">
            {stages.map((s, i) => (
              <li key={s.title} className="grid grid-cols-[0.75rem_1fr] gap-x-4">
                <span aria-hidden="true" className="mt-2 size-3 rounded-full" style={{ background: heatStop(i / (stages.length - 1)) }} />
                <div>
                  <p className="text-[13px] font-bold tracking-[0.14em] text-nv-muted uppercase">{s.when}</p>
                  <h3 className="mt-1 text-lg font-bold text-white">{s.title}</h3>
                  <p className="mt-1 text-base leading-relaxed text-nv-muted">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Escritorio: los tres tramos grandes, como estaban. */}
        <ol data-ui className="mt-16 hidden gap-1.5 md:flex">
          {stages.map((s, i) => (
            <li key={s.title} className="min-w-0" style={{ flexGrow: s.grow, flexBasis: 0 } as CSSProperties}>
              <div
                data-reveal-grow
                style={{ "--reveal-delay": `${i * 120}ms`, background: heatStop(i / (stages.length - 1)) } as CSSProperties}
                className="flex h-[22vh] min-h-[140px] origin-left items-start rounded-xl px-5 py-4 text-black"
              >
                <span className="text-xl font-extrabold tracking-[-0.02em] lg:text-[26px]">{s.when}</span>
              </div>
              <div className="mt-4 max-w-[30ch] pr-4">
                <h3 className="text-lg font-bold text-white">{s.title}</h3>
                <p className="mt-1 text-base leading-relaxed text-nv-muted">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
