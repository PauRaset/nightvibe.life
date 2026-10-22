import { featured, friends, privateAttendees } from "./demo";

// Las estrellas del universo: los asistentes confirmados del evento protagonista.
// Posición con el ángulo áureo (2,39996 rad) y radio ∝ √índice, así se reparten
// sin huecos ni filas. Determinista: el SVG del servidor y el Canvas del cliente
// dibujan exactamente lo mismo.

export const GOLDEN_ANGLE = 2.39996;
export type Hue = "cyan" | "violet" | "magenta";
export type Star = {
  i: number;
  /** Posición en un disco unidad (x, y entre -1 y 1); se estira a una elipse que
   *  ocupa todo el campo (a sangre). */
  x: number;
  y: number;
  /** Radio del núcleo en px a escala 1. */
  size: number;
  kind: "star" | "friend" | "private";
  hue: Hue;
  initial?: string;
  /** Deriva vertical: amplitud (px), velocidad y fase. */
  amp: number;
  speed: number;
  phase: number;
};

// Pseudoaleatorio con semilla (mulberry32): mismo resultado en servidor y cliente.
function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const HUES: Hue[] = ["cyan", "violet", "magenta"];

export function buildStars(): Star[] {
  const n = featured.attendees;
  const rand = rng(86);
  // Los tuyos, repartidos del centro hacia fuera; los privados, en índices fijos.
  const friendAt = new Map(friends.map((f, k) => [Math.round(((k + 1) / (friends.length + 1)) * n * 0.9) + 2, f]));
  const privateAt = new Set<number>();
  for (let i = 3; privateAt.size < privateAttendees; i += 5) if (!friendAt.has(i)) privateAt.add(i);

  return Array.from({ length: n }, (_, k) => {
    const i = k + 1;
    const a = i * GOLDEN_ANGLE;
    const r = Math.sqrt(i / n);
    const f = friendAt.get(i);
    const kind: Star["kind"] = f ? "friend" : privateAt.has(i) ? "private" : "star";
    return {
      i,
      x: Math.cos(a) * r,
      y: Math.sin(a) * r,
      // Tamaños variados (sesgados hacia pequeños); los tuyos, grandes para leer su inicial.
      size: kind === "friend" ? 17 : kind === "private" ? 7 + rand() * 6 : 1.6 + Math.pow(rand(), 1.8) * 4.4,
      kind,
      hue: f ? f.hue : HUES[i % 3],
      initial: f?.name[0],
      amp: 2 + rand() * 6,
      speed: 0.25 + rand() * 0.5,
      phase: rand() * Math.PI * 2,
    };
  });
}
