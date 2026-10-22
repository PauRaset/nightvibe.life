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
        <ol data-ui className="mt-14 flex flex-col gap-1.5 md:flex-row lg:mt-16">
          {stages.map((s, i) => (
            <li key={s.title} className="md:min-w-0" style={{ flexGrow: s.grow, flexBasis: 0 } as CSSProperties}>
              <div
                data-reveal-grow
                style={{ "--reveal-delay": `${i * 120}ms`, background: heatStop(i / (stages.length - 1)) } as CSSProperties}
                className="flex min-h-[72px] origin-left items-start rounded-xl px-5 py-4 text-black md:h-[22vh] md:min-h-[140px]"
              >
                <span className="text-xl font-extrabold tracking-[-0.02em] lg:text-[26px]">{s.when}</span>
              </div>
              <div className="mt-4 mb-8 max-w-[30ch] md:mb-0 md:pr-4">
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
