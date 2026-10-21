import type { CSSProperties } from "react";
import { Container } from "../Container";

// Premios: una lista sobria. Mismo peso para cada nivel; el premio es lo que
// se lee. Ejemplo de escalera: cada local decide sus niveles, misiones y premios.
const levels = [
  { level: 1, reward: "Chupito de bienvenida", how: "Al escanear el QR del local por primera vez." },
  { level: 2, reward: "Entras sin cola", how: "Escaneas otra noche y subes una foto." },
  { level: 3, reward: "Entrada gratis", how: "Para la noche que tú elijas." },
  { level: 4, reward: "Mesa con botella", how: "El premio grande del local." },
];

export function Rewards() {
  return (
    <section id="premios" aria-labelledby="premios-title" className="scroll-mt-16 py-32 sm:py-36">
      <Container className="grid gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <h2
            id="premios-title"
            data-reveal-item
            className="text-[40px] leading-[0.98] font-extrabold tracking-[-0.035em] text-white sm:text-[56px]"
          >
            Más noches, más premios.
          </h2>
          <p
            data-reveal-item
            style={{ "--reveal-delay": "80ms" } as CSSProperties}
            className="mt-8 max-w-[34ch] text-lg leading-relaxed text-nv-muted"
          >
            Premios de verdad en el local al que vuelves. Cada local decide sus niveles, sus misiones
            y sus premios.
          </p>
        </div>

        <ol className="space-y-4 lg:col-span-6 lg:col-start-7">
          {levels.map((l, i) => (
            <li
              key={l.level}
              data-reveal-item
              style={{ "--reveal-delay": `${i * 70}ms` } as CSSProperties}
              className="grid grid-cols-[4.5rem_1fr] items-baseline gap-x-4 rounded-3xl bg-nv-surface px-6 py-7 sm:px-8"
            >
              <span className={`text-base tabular-nums ${l.level === levels.length ? "font-bold text-nv-magenta" : "text-nv-dim"}`}>
                Nivel {l.level}
              </span>
              <div>
                <h3 className="text-2xl leading-tight font-bold tracking-[-0.02em] text-white sm:text-[28px]">
                  {l.reward}
                </h3>
                <p className="mt-2 text-base text-nv-muted">{l.how}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
