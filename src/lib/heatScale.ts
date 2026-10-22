/** Color de un punto t (0–1) de la escala de calor cian → violeta → magenta,
 *  mezclado desde los tokens (sin hex nuevos). */
export function heatStop(t: number): string {
  if (t <= 0.5) return `color-mix(in oklab, var(--nv-violet) ${Math.round((t / 0.5) * 100)}%, var(--nv-cyan))`;
  return `color-mix(in oklab, var(--nv-magenta) ${Math.round(((t - 0.5) / 0.5) * 100)}%, var(--nv-violet))`;
}
