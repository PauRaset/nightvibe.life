"use client";

import { useEffect, useRef } from "react";
import { buildStars } from "@/lib/universe";

// EL UNIVERSO (momento protagonista 2), parte animada.
// Canvas 2D a sangre sobre la sección. Las estrellas se encienden en cascada al
// entrar en pantalla y derivan en vertical. Coste por frame: un drawImage por
// halo (sprites pre-renderizados una vez por color, sin degradados ni blur por
// frame) y un círculo por núcleo. Se pausa fuera de pantalla y con la pestaña
// oculta. Con reduced-motion no arranca: se queda el SVG estático del servidor.

const STAGGER = 14; // ms entre estrellas al encenderse
const FADE = 700; // ms de cada encendido
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export function UniverseCanvas() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvas.current;
    const section = cv?.closest("section");
    const slot = section?.querySelector<HTMLElement>("[data-universe-disc]");
    if (!cv || !section || !slot) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const stars = buildStars();
    const css = getComputedStyle(document.documentElement);
    const color = {
      cyan: css.getPropertyValue("--nv-cyan").trim(),
      violet: css.getPropertyValue("--nv-violet").trim(),
      magenta: css.getPropertyValue("--nv-magenta").trim(),
      bg: css.getPropertyValue("--nv-bg").trim(),
    };
    const font = getComputedStyle(document.body).fontFamily;
    const dpr = Math.min(2, window.devicePixelRatio || 1);

    // Sprites de halo: uno por tono, dibujados una sola vez.
    const sprite = (rgb: string, alpha: number) => {
      const s = document.createElement("canvas");
      const size = 64 * dpr;
      s.width = s.height = size;
      const g = s.getContext("2d")!;
      const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      grad.addColorStop(0, rgb);
      grad.addColorStop(1, "transparent");
      g.globalAlpha = alpha;
      g.fillStyle = grad;
      g.fillRect(0, 0, size, size);
      return s;
    };
    const halos = {
      cyan: sprite(color.cyan, 0.55),
      violet: sprite(color.violet, 0.6),
      magenta: sprite(color.magenta, 0.55),
      private: sprite("#ffffff", 0.16),
    };

    let W = 0, H = 0, cx = 0, cy = 0, R = 0, scale = 1;
    const layout = () => {
      const sr = section.getBoundingClientRect();
      const dr = slot.getBoundingClientRect();
      W = sr.width;
      H = sr.height;
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      cx = dr.left - sr.left + dr.width / 2;
      cy = dr.top - sr.top + dr.height / 2;
      R = Math.min(dr.width, dr.height) / 2 / 1.25; // mismo radio que el SVG (viewBox ±1.25)
      scale = R / 300; // misma escala que el SVG (tamaños en px para un radio de 300)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    let raf = 0;
    let t0 = 0;
    let running = false;

    const draw = (now: number) => {
      ctx.clearRect(0, 0, W, H);
      const since = now - t0;
      for (const s of stars) {
        const lit = easeOut(Math.min(1, Math.max(0, (since - s.i * STAGGER) / FADE)));
        if (lit <= 0) continue;
        const x = cx + s.x * R;
        const y = cy + s.y * R + Math.sin(now * 0.001 * s.speed + s.phase) * s.amp;
        const r = s.size * scale;
        const halo = s.kind === "private" ? halos.private : halos[s.hue];
        const hs = (s.kind === "friend" ? r * 4.2 : s.kind === "private" ? r * 3 : r * 7) * (0.85 + 0.15 * lit);
        ctx.globalAlpha = lit;
        ctx.drawImage(halo, x - hs / 2, y - hs / 2, hs, hs);
        if (s.kind === "star") {
          ctx.fillStyle = color[s.hue];
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        } else if (s.kind === "private") {
          // Perfil privado: un orbe translúcido, sin color ni identidad.
          ctx.globalAlpha = lit * 0.22;
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = lit * 0.35;
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 1;
          ctx.stroke();
        } else {
          // Uno de los tuyos: su inicial sobre un círculo de su tono.
          ctx.fillStyle = color[s.hue];
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = color.bg;
          ctx.font = `800 ${Math.round(r * 1.05)}px ${font}`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(s.initial ?? "", x, y + r * 0.06);
        }
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    const start = () => {
      if (running) return;
      running = true;
      if (!t0) t0 = performance.now();
      raf = requestAnimationFrame(draw);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    layout();
    section.setAttribute("data-live", "");

    let visible = false;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !document.hidden) start();
      else stop();
    }, { threshold: 0.15 });
    io.observe(section);

    const onVisibility = () => (document.hidden || !visible ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    // Solo relayout si cambia el ancho (la barra de URL del móvil cambia el alto).
    let lastW = W;
    const ro = new ResizeObserver(() => {
      const w = section.getBoundingClientRect().width;
      if (Math.abs(w - lastW) > 1) {
        lastW = w;
        layout();
      }
    });
    ro.observe(section);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      section.removeAttribute("data-live");
    };
  }, []);

  return <canvas ref={canvas} aria-hidden="true" className="pointer-events-none absolute inset-0 hidden size-full in-data-live:block" />;
}
