import type { CSSProperties } from "react";
import { Container } from "../Container";

// Baldosas que crecen: el orden lo da el tamaño. Cada nivel es más grande y
// más caliente que el anterior; dentro, el anillo del nivel se va cerrando.
// Datos de ejemplo: cada local decide sus niveles, misiones y premios.

const levels = [
  {
    level: "Nivel 1",
    reward: "Chupito de bienvenida",
    note: "Al escanear el QR del local por primera vez.",
    field: "bg-nv-field-low",
    ring: "var(--nv-cyan)",
    span: "lg:col-span-2 lg:row-start-2",
    height: "min-h-[44vw] lg:min-h-[30vh]",
  },
  {
    level: "Nivel 2",
    reward: "Entras sin cola",
    note: "Escaneas otra noche y subes una foto.",
    field: "bg-nv-field-mid",
    ring: "var(--nv-violet)",
    span: "lg:col-span-3 lg:row-start-2",
    height: "min-h-[54vw] lg:min-h-[38vh]",
  },
  {
    level: "Nivel 3",
    reward: "Entrada gratis",
    note: "Para la noche que tú elijas.",
    field: "bg-nv-field-high",
    ring: "var(--nv-magenta)",
    span: "lg:col-span-3 lg:row-span-2 lg:row-start-1",
    height: "min-h-[64vw] lg:min-h-[48vh]",
  },
  {
    level: "Nivel 4",
    reward: "Mesa con botella",
    note: "El premio grande del local.",
    field: "bg-nv-gradient",
    ring: "black",
    span: "lg:col-span-4 lg:row-span-2 lg:row-start-1",
    height: "min-h-[74vw] lg:min-h-[60vh]",
  },
];

/** Anillo del nivel, con su número dentro: se cierra un cuarto más en cada nivel. */
function LevelRing({ step, color, size }: { step: number; color: string; size: string }) {
  const r = 42;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 100 100" className={size} aria-hidden="true">
      <circle cx="50" cy="50" r={r} fill="none" stroke="currentColor" strokeOpacity="0.16" strokeWidth="9" />
      <circle
        cx="50"
        cy="50"
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="9"
        strokeLinecap="round"
        strokeDasharray={`${(c * step) / 4} ${c}`}
        transform="rotate(-90 50 50)"
      />
      <text
        x="50"
        y="50"
        textAnchor="middle"
        dominantBaseline="central"
        fill="currentColor"
        fontSize="40"
        fontWeight="800"
      >
        {step}
      </text>
    </svg>
  );
}

// El anillo y el premio crecen con el nivel.
const ringSizes = ["size-14", "size-16", "size-[72px]", "size-20"];
const titleSizes = [
  "text-[28px] lg:text-[20px]",
  "text-[28px] lg:text-[28px]",
  "text-[28px] lg:text-[32px]",
  "text-[32px] lg:text-[44px]",
];

export function RewardTiles() {
  return (
    <section id="premios" aria-labelledby="premios-title" className="scroll-mt-16 bg-nv-bg py-24 sm:py-40">
      <Container className="grid gap-y-14 lg:grid-cols-12 lg:grid-rows-[auto_auto] lg:gap-x-2.5 lg:gap-y-10">
        <div className="lg:col-span-5 lg:row-start-1 lg:pr-6">
          <h2
            id="premios-title"
            data-reveal-item
            className="text-[40px] leading-[0.98] font-extrabold tracking-[-0.035em] text-white sm:text-[64px]"
          >
            Más noches, más premios.
          </h2>
          <p
            data-reveal-item
            style={{ "--reveal-delay": "80ms" } as CSSProperties}
            className="mt-5 max-w-md text-lg leading-relaxed text-white"
          >
            Premios de verdad, en el local al que vuelves. Así puede ser su escalera: cada local
            decide sus niveles, sus misiones y sus premios.
          </p>
        </div>

        <ol className="grid gap-7 lg:contents">
          {levels.map((l, i) => (
            <li
              key={l.level}
              data-reveal-item
              style={{ "--reveal-delay": `${i * 80}ms` } as CSSProperties}
              className={`lg:self-end ${l.span}`}
            >
              <div
                className={`flex flex-col justify-between rounded-[1.75rem] p-5 sm:p-6 ${l.field} ${l.height} ${i === 3 ? "text-black" : "text-white"}`}
              >
                <div>
                  <h3 className={`max-w-[12ch] leading-[1.02] font-extrabold tracking-[-0.03em] ${titleSizes[i]}`}>
                    <span className="sr-only">{l.level}: </span>
                    {l.reward}
                  </h3>
                  <p className={`mt-2 max-w-[30ch] text-base ${i === 3 ? "text-black" : "text-nv-muted"}`}>
                    {l.note}
                  </p>
                </div>
                <div className="flex justify-end">
                  <LevelRing step={i + 1} color={l.ring} size={ringSizes[i]} />
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
