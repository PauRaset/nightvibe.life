// Botón de asistencia de la app (circular), tal como es en la app:
// - Sin marcar: disco oscuro (superficie elevada) con anillo en gradiente y "+".
// - Marcado: disco relleno con el gradiente (diagonal) y un check oscuro.
// Las dos caras están siempre montadas y se cruzan con opacidad + escala, así el
// cambio es una transición (se puede interrumpir), no un salto.

export function AttendFace({ checked }: { checked: boolean }) {
  return (
    <span aria-hidden="true" className="relative block size-14">
      {/* Sin marcar: anillo en gradiente (2px) alrededor del disco oscuro. */}
      <span
        className={`absolute inset-0 rounded-full bg-nv-gradient p-[2px] transition-[opacity,transform] duration-[160ms] ease-[var(--ease-out)] ${checked ? "scale-90 opacity-0" : "scale-100 opacity-100"}`}
      >
        <span className="flex size-full items-center justify-center rounded-full bg-nv-surface-raised">
          <svg viewBox="0 0 24 24" className="size-6" fill="none">
            <path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
        </span>
      </span>
      {/* Marcado: disco con el gradiente y check oscuro. */}
      <span
        className={`absolute inset-0 flex items-center justify-center rounded-full bg-nv-gradient transition-[opacity,transform] duration-[160ms] ease-[var(--ease-out)] ${checked ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}
      >
        <svg viewBox="0 0 24 24" className="size-6" fill="none">
          <path d="M5 12.5l4.5 4.5L19 7.5" stroke="var(--nv-bg)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </span>
  );
}
