export type HeatLevel = "low" | "mid" | "high";

export const heatLevels: Record<
  HeatLevel,
  { label: string; color: string; textClass: string }
> = {
  low: { label: "Tranquilo", color: "var(--nv-heat-low)", textClass: "text-nv-cyan" },
  mid: { label: "Subiendo", color: "var(--nv-heat-mid)", textClass: "text-nv-violet-text" },
  high: { label: "A reventar", color: "var(--nv-heat-high)", textClass: "text-nv-magenta" },
};

export function getHeatLevel(value: number): HeatLevel {
  if (value >= 75) return "high";
  if (value >= 40) return "mid";
  return "low";
}

export function clampHeat(value: number): number {
  return Math.min(100, Math.max(0, Math.round(value)));
}
