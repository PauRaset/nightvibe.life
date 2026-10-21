"use client";

import { useEffect, useRef } from "react";

// El principio de scroll-world sin vídeo: el scroll solo hace avanzar el tiempo.
// Bajar por la página es avanzar en la noche, de 22:30 a 03:30, y la barra se
// llena por la escala de calor. Actualiza el DOM directamente en rAF (sin
// renders de React) y solo toca transform y texto.

const START = 22 * 60 + 30;
const SPAN = 5 * 60;

export function NightClock() {
  const bar = useRef<HTMLDivElement>(null);
  const time = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${0.04 + p * 0.96})`;
      if (time.current) {
        const m = Math.round(START + p * SPAN) % (24 * 60);
        // taste-skill-ignore: es un reloj (HH:MM), no una numeración.
        time.current.textContent = `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`; // taste-skill-ignore
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <span
        aria-hidden="true"
        className="hidden items-center gap-2 text-[13px] font-bold tracking-[0.14em] text-white uppercase lg:inline-flex"
      >
        <span className="size-2 rounded-full bg-nv-magenta motion-safe:animate-live-dot" />
        En vivo · <span ref={time} className="tabular-nums">22:30</span>
      </span>
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[3px] overflow-hidden">
        <div
          ref={bar}
          className="h-full origin-left bg-nv-gradient will-change-transform"
          style={{ transform: "scaleX(0.04)" }}
        />
      </div>
    </>
  );
}
