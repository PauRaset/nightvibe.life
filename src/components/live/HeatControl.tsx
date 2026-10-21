"use client";

import { useId, useState } from "react";
import { clampHeat, getHeatLevel, heatLevels } from "@/lib/heat";
import { HeatBadge } from "../HeatBadge";

// Lo interactivo de la página: el badge de la app a tamaño póster. Arrastras
// "gente dentro" y cambian el número, la etiqueta, el color del capítulo, la
// palabra del titular y la velocidad del latido. Sin JS se ve en su estado
// inicial y el texto de al lado explica la escala completa.

const headlineWord = { low: "empezando", mid: "subiendo", high: "a reventar" } as const;

export function HeatControl({ initial = 62 }: { initial?: number }) {
  const [heat, setHeat] = useState(initial);
  const level = getHeatLevel(heat);
  const id = useId();

  return (
    <div
      className={`relative overflow-hidden transition-colors duration-500 ${heatLevels[level].fieldClass}`}
    >
      <div className="mx-auto grid min-h-[86svh] w-full max-w-7xl items-center gap-10 px-5 py-20 sm:px-8 lg:min-h-[92svh] lg:grid-cols-12 lg:py-24">
        <div className="lg:col-span-5">
          <h2
            id="calor-title"
            className="text-[40px] leading-[0.98] font-extrabold tracking-[-0.035em] text-white sm:text-[64px]"
          >
            Ahora está <span className="block">{headlineWord[level]}.</span>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-white">
            Cada local tiene un calor de 0 a 100 que cambia durante la noche. El círculo late más
            rápido cuanta más gente hay. Un vistazo y sabes a dónde ir.
          </p>
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4">
            {(["low", "mid", "high"] as const).map((key) => (
              <div key={key}>
                <dt className={`text-[13px] font-bold tracking-[0.14em] uppercase ${heatLevels[key].textClass}`}>
                  {heatLevels[key].label}
                </dt>
                <dd className="mt-1 text-base text-nv-muted tabular-nums">
                  {key === "low" ? "0 – 39" : key === "mid" ? "40 – 74" : "75 – 100"}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div data-ui className="flex flex-col items-center justify-center gap-8 sm:items-end lg:col-span-7 lg:items-center">
          <HeatBadge
            value={heat}
            size="xl"
            className="text-[16vw] sm:text-[12vw] lg:text-[min(6vw,8.6svh)]"
          />
          <div className="w-full max-w-md">
            <label htmlFor={id} className="flex items-baseline justify-between text-base text-white">
              <span className="font-bold">Gente dentro</span>
              <span className="text-nv-muted tabular-nums">{heat} de 100</span>
            </label>
            <input
              id={id}
              type="range"
              min={0}
              max={100}
              step={1}
              value={heat}
              onChange={(e) => setHeat(clampHeat(Number(e.target.value)))}
              className="nv-range mt-3 w-full"
              aria-valuetext={`${heat} de 100, ${heatLevels[level].label}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
