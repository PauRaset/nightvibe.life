import type { CSSProperties } from "react";
import { Container } from "../Container";
import { GhostButton } from "../GhostButton";

// Sin precios ni condiciones económicas: se hablan en una reunión, después de
// conocer el local.
const topics = [
  "Qué tipo de local tienes.",
  "Qué noches abres y para cuánta gente.",
  "Qué quieres conseguir con NightVibe.",
];

export function BusinessModel() {
  return (
    <section aria-labelledby="modelo-title" className="bg-nv-bg py-16 sm:py-20 lg:py-32">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6">
          <h2
            id="modelo-title"
            data-reveal-item
            className="text-4xl leading-none font-extrabold tracking-[-0.035em] text-balance text-white lg:text-6xl"
          >
            Cada local es distinto.
          </h2>
          <p
            data-reveal-item
            style={{ "--reveal-delay": "80ms" } as CSSProperties}
            className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-white lg:mt-8 lg:text-xl"
          >
            No partimos de una propuesta cerrada. Primero conocemos tu local y después hablamos de
            las condiciones contigo, en una reunión.
          </p>
          <div data-reveal-item style={{ "--reveal-delay": "160ms" } as CSSProperties} className="mt-8 lg:mt-10">
            <GhostButton href="#contacto">Pedir una reunión</GhostButton>
          </div>
        </div>
        <div className="lg:col-span-6 lg:pt-3">
          <p data-reveal-item className="text-lg leading-relaxed text-nv-muted lg:text-xl">
            En esa reunión nos cuentas:
          </p>
          <ul className="mt-5 grid gap-6 lg:mt-6 lg:gap-8">
            {topics.map((t, i) => (
              <li
                key={t}
                data-reveal-item
                style={{ "--reveal-delay": `${(i + 1) * 80}ms` } as CSSProperties}
                className="text-2xl leading-tight font-extrabold tracking-[-0.025em] text-balance text-white lg:text-3xl"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
