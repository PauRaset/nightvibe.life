import type { CSSProperties } from "react";
import { beatSeconds, clampHeat, getHeatLevel, heatLevels } from "@/lib/heat";

// El elemento más reconocible de la app: un número dentro de un anillo que se
// llena con el calor, una etiqueta de estado debajo, y un latido que se acelera
// cuanta más gente hay. Todo en em: el tamaño lo pone el font-size.

type HeatBadgeProps = {
  value: number;
  size?: "sm" | "md" | "lg" | "xl";
  /** Oculta la etiqueta de texto (p. ej. dentro de listas pequeñas). */
  hideLabel?: boolean;
  /** Sin latido (p. ej. páginas de error). */
  static?: boolean;
  className?: string;
};

const sizes = {
  sm: "text-[12px]",
  md: "text-[18px]",
  lg: "text-[26px] sm:text-[30px]",
  // Para el control a tamaño póster: lo escala quien lo usa.
  xl: "text-[1em]",
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

  const ringStyle = {
    "--beat": `${beatSeconds(heat)}s`,
    // taste-skill-ignore: el anillo que se llena es el badge de la app (marca).
    background: `conic-gradient(${color} ${heat * 3.6}deg, rgba(255,255,255,0.1) 0deg)`, // taste-skill-ignore
    boxShadow: `0 0 1.4em -0.4em ${color}`,
  } as CSSProperties;

  return (
    <div
      className={`inline-flex flex-col items-center gap-[0.45em] ${sizes[size]} ${className}`}
      role="img"
      aria-label={`Calor ${heat} de 100: ${label}`}
    >
      <div
        className={`relative size-[4.2em] rounded-full ${isStatic ? "" : "motion-safe:animate-heat-beat"}`}
        style={ringStyle}
      >
        <div className="absolute inset-[0.22em] flex items-center justify-center rounded-full bg-nv-bg">
          <span className="text-[1.55em] leading-none font-extrabold tracking-tight text-white tabular-nums">
            {heat}
          </span>
        </div>
      </div>
      {!hideLabel && (
        <span className={`text-[max(13px,0.62em)] font-bold tracking-[0.14em] uppercase ${textClass}`}>
          {label}
        </span>
      )}
    </div>
  );
}
