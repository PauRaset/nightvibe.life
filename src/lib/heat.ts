export type HeatLevel = "zero" | "low" | "mid" | "high";

// El badge de la app muestra el NÚMERO DE ASISTENTES CONFIRMADOS (gente que VA,
// no gente dentro ni aforo):
// 0 sé el primero · 1–9 empieza · 10–49 subiendo · 50+ a reventar.
// El color comunica estado, no decora.
export const heatLevels: Record<HeatLevel, { label: string; color: string; textClass: string }> = {
  zero: { label: "Sé el primero", color: "var(--nv-heat-low)", textClass: "text-nv-cyan" },
  low: { label: "Empieza", color: "var(--nv-heat-low)", textClass: "text-nv-cyan" },
  mid: { label: "Subiendo", color: "var(--nv-heat-mid)", textClass: "text-nv-violet-text" },
  high: { label: "A reventar", color: "var(--nv-heat-high)", textClass: "text-nv-magenta" },
};

/** A partir de esta cifra el local está a reventar (y el anillo, completo). */
export const FULL_AT = 50;

export function getHeatLevel(attendees: number): HeatLevel {
  if (attendees >= FULL_AT) return "high";
  if (attendees >= 10) return "mid";
  if (attendees >= 1) return "low";
  return "zero";
}

/** Asistentes como entero no negativo. */
export function clampAttendees(value: number): number {
  return Math.max(0, Math.round(value));
}

/** Parte del anillo llena (0–1): se completa al llegar a "a reventar". */
export function ringFill(attendees: number): number {
  return Math.min(1, clampAttendees(attendees) / FULL_AT);
}

/** Latido de la app: (1600 − asistentes × 18) ms, con un mínimo de 700 ms. */
export function beatMs(attendees: number): number {
  return Math.max(700, 1600 - clampAttendees(attendees) * 18);
}
