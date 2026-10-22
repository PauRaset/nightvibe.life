import type { CSSProperties } from "react";
import { beatMs, clampAttendees, getHeatLevel, heatLevels, ringFill } from "@/lib/heat";

// Componente de marca: el número de ASISTENTES CONFIRMADOS dentro de un anillo
// del color de su estado, la etiqueta y un latido de (1600 − n × 18) ms, mínimo
// 700 ms. Todo en em: el tamaño lo pone el font-size.
// - "stack": anillo y etiqueta debajo (como en la app).
// - "inline": anillo y etiqueta al lado, para ir dentro de una frase.

type HeatBadgeProps = {
  value: number;
  size?: "sm" | "md" | "lg" | "xl";
  layout?: "stack" | "inline";
  /** La etiqueta cuelga bajo el anillo sin ocupar ancho (para ir dentro de una
   *  frase: así la puntuación queda pegada al anillo). */
  floatLabel?: boolean;
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
  // Para el badge a tamaño póster: lo escala quien lo usa.
  xl: "text-[1em]",
};

/** Estilo del anillo: color, parte llena, halo y duración del latido. */
export function ringStyle(people: number): CSSProperties {
  const { color } = heatLevels[getHeatLevel(people)];
  return {
    "--beat": `${beatMs(people)}ms`,
    background: `conic-gradient(${color} ${ringFill(people) * 360}deg, rgba(255,255,255,0.1) 0deg)`, // taste-skill-ignore
    // Halo del color del estado, como en la app: marca dónde mirar.
    boxShadow: `0 0 2.2em 0.1em color-mix(in srgb, ${color} ${people === 0 ? 18 : 38}%, transparent)`,
  } as CSSProperties;
}

export function HeatBadge({
  value,
  size = "md",
  layout = "stack",
  floatLabel = false,
  hideLabel = false,
  static: isStatic = false,
  className = "",
}: HeatBadgeProps) {
  const people = clampAttendees(value);
  const level = getHeatLevel(people);
  const { label, textClass } = heatLevels[level];
  const inline = layout === "inline";

  return (
    <span
      className={`inline-flex items-center ${floatLabel ? "relative" : inline ? "flex-row gap-[0.32em] align-middle" : "flex-col gap-[0.45em]"} ${sizes[size]} ${className}`}
      role="img"
      aria-label={`${people} ${people === 1 ? "persona va" : "personas van"}: ${label}`}
    >
      <span
        className={`relative block size-[4.2em] shrink-0 rounded-full ${isStatic ? "" : "motion-safe:animate-heat-beat"}`}
        style={ringStyle(people)}
      >
        <span className="absolute inset-[0.22em] flex items-center justify-center rounded-full bg-nv-bg">
          <span className="text-[1.55em] leading-none font-extrabold tracking-tight text-white tabular-nums">
            {people}
          </span>
        </span>
      </span>
      {!hideLabel && (
        <span
          className={`font-bold tracking-[0.14em] uppercase ${floatLabel ? "absolute top-full left-1/2 mt-[0.45em] -translate-x-1/2 text-[max(13px,0.62em)] leading-none whitespace-nowrap" : inline ? "max-w-[6em] text-[max(13px,0.9em)] leading-[1.05]" : "text-[max(13px,0.62em)] whitespace-nowrap"} ${textClass}`}
        >
          {label}
        </span>
      )}
    </span>
  );
}
