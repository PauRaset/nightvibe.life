import type { CSSProperties } from "react";
import { clampHeat, getHeatLevel, heatLevels } from "@/lib/heat";

type HeatBadgeProps = {
  value: number;
  size?: "sm" | "md" | "lg";
  /** Oculta la etiqueta de texto (p. ej. dentro de cards pequeñas). */
  hideLabel?: boolean;
  /** Desactiva el pulso animado (el pulso solo existe en "A reventar"). */
  static?: boolean;
  className?: string;
};

const sizes = {
  sm: { ring: "size-12", number: "text-base", inset: "inset-[3px]" },
  md: { ring: "size-20", number: "text-2xl", inset: "inset-[4px]" },
  lg: { ring: "size-28 sm:size-32", number: "text-4xl sm:text-5xl", inset: "inset-[5px]" },
};

export function HeatBadge({
  value,
  size = "md",
  hideLabel = false,
  static: isStatic = false,
  className = "",
}: HeatBadgeProps) {
  const heat = clampHeat(value);
  const level = getHeatLevel(heat);
  const { label, color, textClass } = heatLevels[level];
  const s = sizes[size];
  const pulse = level === "high" && !isStatic ? "motion-safe:animate-heat-pulse" : "";

  const ringStyle = {
    "--heat-color": color,
    background: `conic-gradient(${color} ${heat * 3.6}deg, rgba(255,255,255,0.08) 0deg)`,
    boxShadow: `0 0 32px -8px ${color}`,
  } as CSSProperties;

  return (
    <div
      className={`inline-flex flex-col items-center gap-2 ${className}`}
      role="img"
      aria-label={`Calor ${heat} de 100: ${label}`}
    >
      <div className={`relative rounded-full ${s.ring} ${pulse}`} style={ringStyle}>
        <div
          className={`absolute ${s.inset} flex items-center justify-center rounded-full bg-nv-bg`}
        >
          <span className={`${s.number} font-extrabold tabular-nums tracking-tight text-white`}>
            {heat}
          </span>
        </div>
      </div>
      {!hideLabel && <span className={`nv-label ${textClass}`}>{label}</span>}
    </div>
  );
}
