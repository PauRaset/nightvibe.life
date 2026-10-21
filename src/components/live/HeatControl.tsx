"use client";

import { useId, useState } from "react";
import { clampAttendees, getHeatLevel, heatLevels } from "@/lib/heat";
import { HeatBadge } from "../HeatBadge";

// Lo interactivo de la página: el badge de la app a tamaño póster. Mueves
// cuánta gente hay dentro y cambian el número, la etiqueta, la palabra del
// titular y la velocidad del latido. Sin JS se ve en su estado inicial.

const MAX = 120;
const headlineWord = {
  zero: "esperándote",
  low: "empezando",
  mid: "subiendo",
  high: "a reventar",
} as const;

export function HeatControl({ initial = 34 }: { initial?: number }) {
  const [people, setPeople] = useState(initial);
  const level = getHeatLevel(people);
  const id = useId();
  const count = `${people} ${people === 1 ? "persona" : "personas"}`;

  return (
    <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 sm:gap-16 sm:px-8 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <h2
          id="calor-title"
          className="text-[40px] leading-[0.98] font-extrabold tracking-[-0.035em] text-white sm:text-[64px]"
        >
          Ahora está{" "}
          <span className={`block transition-colors duration-300 ${heatLevels[level].textClass}`}>
            {headlineWord[level]}.
          </span>
        </h2>
        <p className="mt-8 max-w-md text-lg leading-relaxed text-nv-muted">
          Cada local muestra cuánta gente hay dentro ahora mismo. Cuanta más gente, más rápido late.
          Un vistazo y sabes a dónde ir.
        </p>
      </div>

      <div data-ui className="flex flex-col items-center gap-10 lg:col-span-6 lg:col-start-7">
        <HeatBadge value={people} size="xl" className="text-[15vw] sm:text-[10vw] lg:text-[min(5.4vw,8svh)]" />
        <div className="w-full max-w-sm">
          <label htmlFor={id} className="flex items-baseline justify-between text-base text-white">
            <span className="font-bold">Gente dentro</span>
            <span className="text-nv-muted tabular-nums">{count}</span>
          </label>
          <input
            id={id}
            type="range"
            min={0}
            max={MAX}
            step={1}
            value={people}
            onChange={(e) => setPeople(clampAttendees(Number(e.target.value)))}
            className="nv-range mt-3 w-full"
            aria-valuetext={`${count}, ${heatLevels[level].label}`}
          />
        </div>
      </div>
    </div>
  );
}
