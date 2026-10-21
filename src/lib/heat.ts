export type HeatLevel = "low" | "mid" | "high";

// Escala de calor de la app: 0–39 empieza (cian), 40–74 subiendo (violeta),
// 75–100 a reventar (magenta). El color comunica estado, no decora.
export const heatLevels: Record<
  HeatLevel,
  { label: string; color: string; textClass: string; fieldClass: string }
> = {
  low: {
    label: "Empieza",
    color: "var(--nv-heat-low)",
    textClass: "text-nv-cyan",
    fieldClass: "bg-nv-field-low",
  },
  mid: {
    label: "Subiendo",
    color: "var(--nv-heat-mid)",
    textClass: "text-nv-violet-text",
    fieldClass: "bg-nv-field-mid",
  },
  high: {
    label: "A reventar",
    color: "var(--nv-heat-high)",
    textClass: "text-nv-magenta",
    fieldClass: "bg-nv-field-high",
  },
};

export function getHeatLevel(value: number): HeatLevel {
  if (value >= 75) return "high";
  if (value >= 40) return "mid";
  return "low";
}

export function clampHeat(value: number): number {
  return Math.min(100, Math.max(0, Math.round(value)));
}

/** Duración de un latido en segundos: 1.8 s con el local vacío, 0.55 s lleno. */
export function beatSeconds(value: number): number {
  return Number((1.8 - (clampHeat(value) / 100) * 1.25).toFixed(2));
}
