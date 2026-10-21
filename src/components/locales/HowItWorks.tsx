import type { CSSProperties } from "react";
import { Container } from "../Container";

// Tres etapas. El orden se lee por la escalera (cada paso más abajo) y por las
// palabras, no con números.
const stages = [
  {
    title: "Primero, hablamos.",
    text: "Nos cuentas cómo es tu local y qué quieres conseguir. Vemos si NightVibe encaja.",
  },
  {
    title: "Luego, das de alta tu local.",
    text: "Subes tu local y tus eventos desde el panel. Defines entradas, misiones y premios.",
  },
  {
    title: "Y a partir de ahí, vendes.",
    text: "La gente compra desde la app, entra con su QR y tú ves quién vuelve noche tras noche.",
  },
];

const offsets = ["", "lg:mt-20", "lg:mt-40"];

export function HowItWorks() {
  return (
    <section aria-labelledby="como-title" className="py-24 sm:py-28">
      <Container>
        <h2
          id="como-title"
          data-reveal-item
          className="max-w-4xl text-4xl leading-none font-extrabold tracking-[-0.035em] text-balance text-white lg:text-6xl"
        >
          Así se empieza.
        </h2>
        <ol className="mt-12 grid gap-10 sm:mt-16 lg:mt-24 lg:grid-cols-3 lg:gap-8">
          {stages.map((s, i) => (
            <li
              key={s.title}
              data-reveal-item
              style={{ "--reveal-delay": `${i * 90}ms` } as CSSProperties}
              className={offsets[i]}
            >
              <h3 className="text-2xl leading-tight font-extrabold tracking-[-0.025em] text-balance text-white lg:text-3xl">
                {s.title}
              </h3>
              <p className="mt-3 max-w-md text-lg leading-relaxed text-pretty text-white lg:mt-4 lg:text-xl">
                {s.text}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
