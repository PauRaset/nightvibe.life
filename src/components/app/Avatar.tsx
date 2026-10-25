/** Persona: su inicial sobre un tinte pálido de su propio tono (identidad, no datos). */
export function Avatar({ name, hue, size = 32 }: { name: string; hue: "cyan" | "violet" | "magenta"; size?: number }) {
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-full font-extrabold ring-2 ring-nv-surface-strong"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.42,
        background: `color-mix(in srgb, var(--nv-${hue}) 22%, var(--nv-bg))`,
        color: `color-mix(in srgb, var(--nv-${hue}) 70%, white)`,
      }}
    >
      {name[0]}
    </span>
  );
}
