"use client";

import { useEffect, useRef, useState } from "react";
import { featured, friends } from "@/lib/demo";
import { HeatBadge } from "../HeatBadge";
import { AttendFace } from "./AttendButton";
import { Avatar } from "./Avatar";

// Card de evento de la app. Con `interactive`, el botón de asistencia funciona:
// al marcar, sale una chispa con cola de cometa desde el botón hasta el badge;
// al aterrizar, el badge late con fuerza y el número sube (86 → 87). Al
// desmarcar: ✓ → + y 87 → 86, sin chispa. "N de los tuyos" no cambia.
//
// Movimiento (skill animate): propósito "explicación" (marketing, poco frecuente).
// WAAPI, solo transform/opacity. Vuelo 560ms en arco con --ease-in-out (movimiento
// en pantalla); la cola son 6 puntos que siguen el mismo camino con 28ms de
// retraso cada uno. Aterrizaje: latido 480ms ease-out. Se puede interrumpir:
// otro toque cancela todo y deja el estado final al instante.
// Con prefers-reduced-motion: cambio de estado y número, sin chispa ni latido.

const FLIGHT = 560;
const TAIL = 6;
const TAIL_GAP = 28;
const PULSE = 480;
const EASE_IN_OUT = "cubic-bezier(0.77, 0, 0.175, 1)";
const EASE_OUT = "cubic-bezier(0.23, 1, 0.32, 1)";

type Point = { x: number; y: number };

/** Puntos de una curva cuadrática de a a b, arqueada hacia arriba-izquierda. */
function arc(a: Point, b: Point, steps = 18): Point[] {
  const c = { x: Math.min(a.x, b.x) - Math.abs(a.y - b.y) * 0.45, y: (a.y + b.y) / 2 };
  return Array.from({ length: steps + 1 }, (_, i) => {
    const t = i / steps;
    const u = 1 - t;
    return { x: u * u * a.x + 2 * u * t * c.x + t * t * b.x, y: u * u * a.y + 2 * u * t * c.y + t * t * b.y };
  });
}

export function EventCard({ interactive = false }: { interactive?: boolean }) {
  const [going, setGoing] = useState(false);
  // La pista «Pruébalo» se va tras la primera interacción.
  const [touched, setTouched] = useState(false);
  const count = featured.attendees + (going ? 1 : 0);
  // El número del badge va un paso por detrás: sube cuando aterriza la chispa.
  const [shown, setShown] = useState(featured.attendees);

  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const badge = useRef<HTMLSpanElement>(null);
  const running = useRef<Animation[]>([]);
  const sparks = useRef<HTMLElement[]>([]);

  const stopAll = () => {
    running.current.forEach((a) => a.cancel());
    running.current = [];
    sparks.current.forEach((n) => n.remove());
    sparks.current = [];
  };
  useEffect(() => stopAll, []);

  const launch = () => {
    const card = root.current;
    const from = button.current;
    const to = badge.current;
    if (!card || !from || !to) return setShown(featured.attendees + 1);
    const c = card.getBoundingClientRect();
    const f = from.getBoundingClientRect();
    const t = to.getBoundingClientRect();
    // La card puede ir ampliada (zoom en escritorio): pasamos de px de pantalla a
    // px locales de la card para que la chispa salga y aterrice donde debe.
    const k = card.offsetWidth ? c.width / card.offsetWidth : 1;
    const path = arc(
      { x: (f.left - c.left + f.width / 2) / k, y: (f.top - c.top + f.height / 2) / k },
      { x: (t.left - c.left + t.width / 2) / k, y: (t.top - c.top + t.height / 2) / k },
    );
    const frames = path.map((p) => ({ transform: `translate(${p.x}px, ${p.y}px)` }));

    for (let i = TAIL; i >= 0; i--) {
      // i = 0 es la cabeza: núcleo blanco con brillo magenta; la cola se enfría.
      const size = i === 0 ? 16 : 12 - i * 1.2;
      const dot = document.createElement("span");
      dot.setAttribute("aria-hidden", "true");
      dot.style.cssText = `position:absolute;left:${-size / 2}px;top:${-size / 2}px;width:${size}px;height:${size}px;border-radius:999px;pointer-events:none;z-index:5;opacity:0;`;
      dot.style.background =
        i === 0
          ? "radial-gradient(circle, white 0 30%, var(--nv-magenta) 55%, transparent 72%)" // taste-skill-ignore
          : `color-mix(in srgb, ${i < 3 ? "var(--nv-violet)" : "var(--nv-cyan)"} ${100 - i * 10}%, transparent)`;
      card.appendChild(dot);
      sparks.current.push(dot);
      const fade = 1 - i / (TAIL + 1);
      const anim = dot.animate(
        frames.map((fr, k) => ({ ...fr, opacity: k === 0 ? 0 : k === frames.length - 1 ? 0 : fade })),
        { duration: FLIGHT, delay: i * TAIL_GAP, easing: EASE_IN_OUT, fill: "forwards" },
      );
      running.current.push(anim);
      if (i === 0) {
        anim.onfinish = () => {
          setShown(featured.attendees + 1);
          const beat = to.animate(
            [{ transform: "scale(1)" }, { transform: "scale(1.22)", offset: 0.35 }, { transform: "scale(1)" }],
            { duration: PULSE, easing: EASE_OUT },
          );
          running.current.push(beat);
          beat.onfinish = stopAll;
        };
      }
    }
  };

  const toggle = () => {
    stopAll();
    setTouched(true);
    const next = !going;
    setGoing(next);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!next || reduce) setShown(featured.attendees + (next ? 1 : 0));
    else launch();
  };

  const value = interactive ? shown : featured.attendees;

  return (
    <div ref={root} className="relative">
      <div className="bg-nv-surface-raised px-5 pt-14 pb-5">
        <div className="flex items-end justify-between gap-3">
          <div>
            <span className="text-[13px] font-bold tracking-[0.14em] text-nv-muted uppercase">{featured.genre}</span>
            <p className="mt-1 text-[26px] leading-none font-extrabold tracking-tight">{featured.kind}</p>
            <p className="mt-1 text-[15px] text-nv-muted">{featured.zone}</p>
          </div>
          <span ref={badge} className="inline-block">
            <HeatBadge value={value} size="sm" />
          </span>
        </div>
      </div>
      <dl className="grid grid-cols-2 gap-x-4 gap-y-4 px-5 pt-5 text-[15px]">
        {[
          ["Fecha", featured.date],
          ["Horario", featured.hours],
          ["Edad", featured.age],
          ["Van", `${value} personas`],
        ].map(([k, v]) => (
          <div key={k}>
            <dt className="text-[13px] text-nv-muted">{k}</dt>
            <dd className="font-bold tabular-nums">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="mx-5 mt-5 mb-6 flex items-center justify-between gap-3 rounded-2xl bg-nv-surface-strong p-4">
        <div className="min-w-0">
          <div className="flex -space-x-2">
            {friends.slice(0, 4).map((f) => (
              <Avatar key={f.name} name={f.name} hue={f.hue} />
            ))}
          </div>
          <p className="mt-2 text-[13px] text-nv-muted">
            <span className="font-bold text-white">{friends.length} de los tuyos</span> van
          </p>
        </div>
        {interactive ? (
          <span className="relative shrink-0">
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 text-[13px] font-bold tracking-[0.14em] whitespace-nowrap text-nv-cyan uppercase transition-opacity duration-200 ease-[var(--ease-out)] ${touched ? "opacity-0" : "opacity-100"}`}
          >
            Pruébalo
          </span>
          <button
            ref={button}
            type="button"
            aria-pressed={going}
            aria-label={going ? "Vas a este evento. Pulsa para desmarcar" : "Confirmar que vas a este evento"}
            onClick={toggle}
            className="shrink-0 rounded-full transition-transform duration-[120ms] ease-[var(--ease-out)] active:scale-[0.94]"
          >
            <AttendFace checked={going} />
          </button>
          </span>
        ) : (
          <AttendFace checked={false} />
        )}
      </div>
      {interactive && (
        <span className="sr-only" aria-live="polite">
          {going ? `Confirmado. Ahora van ${count} personas.` : ""}
        </span>
      )}
    </div>
  );
}
