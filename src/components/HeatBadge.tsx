import type { CSSProperties } from "react";
import { beatSeconds, clampAttendees, getHeatLevel, heatLevels, ringFill } from "@/lib/heat";

// El elemento más reconocible de la app: el número de personas que hay en el
// local, dentro de un anillo del color de su estado, la etiqueta debajo y un
// latido que se acelera cuanta más gente hay. Todo en em: el tamaño lo pone el
// font-size. Es uno de los tres únicos sitios con el color de la escala de calor.

type HeatBadgeProps = {
  value: number;
  size?: "sm" | "md" | "lg" | "xl";
  /** Oculta la etiqueta de texto (p. ej. dentro de listas pequeñas). */
  hideLabel?: boolean;
  /** Sin latido (p. ej. páginas de error). Con 0 personas tampoco late. */
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
  const people = clampAttendees(value);
  const level = getHeatLevel(people);
  const { label, color, textClass } = heatLevels[level];

  const ringStyle = {
    "--beat": `${beatSeconds(people)}s`,
    // taste-skill-ignore: el anillo que se llena es el badge de la app (marca).
    background: `conic-gradient(${color} ${ringFill(people) * 360}deg, rgba(255,255,255,0.1) 0deg)`, // taste-skill-ignore
    // Halo del color del estado, como en la app: marca dónde mirar.
    boxShadow: level === "zero" ? "none" : `0 0 2.2em 0.1em color-mix(in srgb, ${color} 38%, transparent)`,
  } as CSSProperties;

  return (
    <div
      className={`inline-flex flex-col items-center gap-[0.45em] ${sizes[size]} ${className}`}
      role="img"
      aria-label={`${people} ${people === 1 ? "persona" : "personas"}: ${label}`}
    >
      <div
        className={`relative size-[4.2em] rounded-full ${isStatic || level === "zero" ? "" : "motion-safe:animate-heat-beat"}`}
        style={ringStyle}
      >
        <div className="absolute inset-[0.22em] flex items-center justify-center rounded-full bg-nv-bg">
          <span className="text-[1.55em] leading-none font-extrabold tracking-tight text-white tabular-nums">
            {people}
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
