"use client";

import { useEffect, useRef, useState } from "react";
import { haloBackground, ringStyle } from "../HeatBadge";
import { beatMs, getHeatLevel, heatLevels, type HeatLevel } from "@/lib/heat";

// EL CALOR CON SCROLL (momento protagonista 1).
// Una sección fijada: al bajar, el número de asistentes confirmados sube de 0 a
// TOP, y el anillo, la etiqueta y el latido pasan por los 4 estados reales.
// - Sin JS o con prefers-reduced-motion: se muestra el estado final, estático,
//   con los cuatro estados explicados (es lo que pinta el servidor).
// - Con JS: modo "scrub". rAF + scroll pasivo; se escribe en el DOM (refs), nunca
//   en estado de React; y solo cuando cambia el número entero (≤ TOP repintados).
// - Alturas en svh: la barra de URL del móvil no cambia nada al colapsar.

const TOP = 60;

// Mapeo NO lineal: cada uno de los 4 estados ocupa el mismo tramo de scroll
// (un cuarto del recorrido), aunque sus rangos de asistentes sean muy distintos.
// Dentro de cada tramo, interpolación lineal de su rango.
const BANDS: [number, number][] = [
  [0, 0], // SÉ EL PRIMERO
  [1, 9], // EMPIEZA
  [10, 49], // SUBIENDO
  [50, TOP], // A REVENTAR
];
function attendeesAt(p: number): number {
  const t = Math.min(0.9999, Math.max(0, p)) * BANDS.length;
  const band = Math.floor(t);
  const [from, to] = BANDS[band];
  return Math.round(from + (to - from) * (t - band));
}

const states: { level: HeatLevel; range: string; line: string }[] = [
  { level: "zero", range: "0", line: "Nadie ha confirmado todavía. La noche es tuya." },
  { level: "low", range: "1–9", line: "Los primeros ya van. Buen momento para llegar con calma." },
  { level: "mid", range: "10–49", line: "Se está llenando. La noche coge ritmo." },
  { level: "high", range: "50+", line: "Lleno de gente que va. Es aquí." },
];

export function HeatScroll() {
  const [scrub, setScrub] = useState(false);
  const section = useRef<HTMLElement>(null);
  const ring = useRef<HTMLSpanElement>(null);
  const halo = useRef<HTMLSpanElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const list = useRef<HTMLOListElement>(null);

  // Solo se activa el modo fijado si el movimiento está permitido.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setScrub(!mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!scrub) return;
    const el = section.current;
    if (!el) return;
    let frame = 0;
    let shown = -1;
    let level: HeatLevel | null = null;

    const paint = (n: number) => {
      const lv = getHeatLevel(n);
      if (num.current) num.current.textContent = String(n);
      if (ring.current) {
        const s = ringStyle(n) as Record<string, string>;
        ring.current.style.background = s.background;
        if (halo.current) halo.current.style.background = haloBackground(n);
        ring.current.style.setProperty("--beat", `${beatMs(n)}ms`);
      }
      if (lv !== level) {
        level = lv;
        if (label.current) {
          label.current.textContent = heatLevels[lv].label;
          // Texto en violeta claro (el violeta puro no llega a AA en texto).
          label.current.style.color = lv === "mid" ? "var(--nv-violet-text)" : heatLevels[lv].color;
        }
        list.current?.querySelectorAll("li").forEach((li) => {
          li.toggleAttribute("data-active", li.dataset.level === lv);
        });
      }
    };

    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      const p = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 1;
      const n = attendeesAt(p);
      if (n !== shown) {
        shown = n;
        paint(n);
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    // Solo escuchamos el scroll mientras la sección está cerca de la pantalla.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.addEventListener("scroll", onScroll, { passive: true });
          onScroll();
        } else {
          window.removeEventListener("scroll", onScroll);
        }
      },
      { rootMargin: "100px 0px" },
    );
    io.observe(el);
    update();
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [scrub]);

  const finalLevel = getHeatLevel(TOP);

  return (
    <section
      ref={section}
      id="calor"
      aria-labelledby="calor-title"
      data-scrub={scrub ? "" : undefined}
      className="relative scroll-mt-16 data-scrub:h-[280svh]"
    >
      <div className="py-20 sm:py-36 in-data-scrub:sticky in-data-scrub:top-0 in-data-scrub:flex in-data-scrub:h-svh in-data-scrub:items-center in-data-scrub:py-0">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 sm:gap-16 sm:px-8 lg:grid-cols-12 lg:gap-8">
          <div className="order-2 lg:order-1 lg:col-span-6">
            <h2
              id="calor-title"
              className="text-[34px] leading-[0.98] font-extrabold tracking-[-0.035em] text-balance text-white sm:text-[56px] lg:text-[64px]"
            >
              Late con la gente que va.
            </h2>
            <p className="mt-5 max-w-[40ch] text-base leading-relaxed text-nv-muted sm:mt-6 sm:text-lg">
              Cada local muestra cuántas personas han confirmado que van esta noche.
            </p>
            <ol ref={list} className="mt-6 space-y-1 sm:mt-10 sm:space-y-2">
              {states.map((s) => (
                <li
                  key={s.level}
                  data-level={s.level}
                  data-active={s.level === finalLevel ? "" : undefined}
                  className="grid grid-cols-[6.5rem_1fr] items-baseline gap-x-4 py-1 transition-opacity duration-200 ease-[var(--ease-out)] in-data-scrub:opacity-40 in-data-scrub:data-active:opacity-100 sm:grid-cols-[9rem_1fr]"
                >
                  <span className={`text-[13px] font-bold tracking-[0.14em] uppercase ${heatLevels[s.level].textClass}`}>
                    {heatLevels[s.level].label}
                    <span className="block font-medium tracking-normal text-nv-muted normal-case tabular-nums">
                      {s.range === "0" ? "0 van" : `${s.range} van`}
                    </span>
                  </span>
                  <span className="text-base text-white">{s.line}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="order-1 flex justify-center lg:order-2 lg:col-span-5 lg:col-start-8">
            {/* El badge: el servidor lo pinta en su estado final; el scroll lo reescribe. */}
            <span
              role="img"
              aria-label={`Ejemplo: de 0 a ${TOP} personas confirmadas`}
              className="relative isolate inline-flex flex-col items-center gap-[0.45em] text-[8.6vw] sm:text-[7vw] lg:text-[min(5.6vw,8.4svh)]"
            >
              <span className="relative block">
                <span
                  ref={halo}
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-[1.2em] -z-10 rounded-full"
                  style={{ background: haloBackground(TOP) }}
                />
                <span
                  ref={ring}
                  className="relative block size-[4.2em] rounded-full motion-safe:animate-heat-beat"
                  style={ringStyle(TOP)}
                >
                  <span className="absolute inset-[0.22em] flex items-center justify-center rounded-full bg-nv-bg">
                    <span ref={num} className="text-[1.55em] leading-none font-extrabold tracking-tight text-white tabular-nums">
                      {TOP}
                    </span>
                  </span>
                </span>
              </span>
              <span
                ref={label}
                className={`text-[max(13px,0.62em)] font-bold tracking-[0.14em] uppercase ${heatLevels[finalLevel].textClass}`}
              >
                {heatLevels[finalLevel].label}
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
