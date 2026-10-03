import { HeatBadge } from "./HeatBadge";

// Mockup ilustrativo construido con HTML/CSS. Locales FICTICIOS: solo tipo de
// local y zona genérica, nunca nombres reales.
const venues = [
  { kind: "Club techno", area: "Zona puerto", distance: "0,8 km", heat: 88, friends: 5 },
  { kind: "Sala reggaeton", area: "Centro", distance: "1,4 km", heat: 61, friends: 2 },
  { kind: "Bar de cócteles", area: "Casco antiguo", distance: "2,1 km", heat: 27, friends: 0 },
];

export function PhoneMockup({ className = "" }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="Ilustración de la app NightVibe: lista de locales ficticios ordenados por calor en tiempo real"
      className={`relative mx-auto w-[272px] sm:w-[300px] ${className}`}
    >
      {/* Glow de fondo: la escala de calor detrás del teléfono */}
      <div
        aria-hidden="true"
        className="absolute -inset-10 -z-10 rounded-full bg-nv-gradient opacity-25 blur-3xl"
      />
      <div className="rounded-[2.75rem] bg-white/10 p-[7px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]">
        <div className="relative overflow-hidden rounded-[2.35rem] bg-nv-bg">
          {/* Notch */}
          <div className="absolute top-2.5 left-1/2 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />

          <div aria-hidden="true" className="px-4 pt-12 pb-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-extrabold text-white">Esta noche</span>
              <span className="nv-label flex items-center gap-1.5 text-nv-magenta">
                <span className="size-1.5 rounded-full bg-nv-magenta motion-safe:animate-live-dot" />
                En vivo
              </span>
            </div>
            <p className="mt-1 text-[11px] text-nv-muted">Cerca de ti · actualizado hace 1 min</p>

            <ul className="mt-4 space-y-2.5">
              {venues.map((v) => (
                <li
                  key={v.kind}
                  className="flex items-center gap-3 rounded-2xl bg-nv-surface-strong p-3"
                >
                  <HeatBadge value={v.heat} size="sm" hideLabel static />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-white">{v.kind}</p>
                    <p className="truncate text-[11px] text-nv-muted">
                      {v.area} · {v.distance}
                    </p>
                    {v.friends > 0 && (
                      <p className="mt-1 text-[11px] font-semibold text-white">
                        +{v.friends} de tus amigos van
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-4 rounded-2xl bg-nv-surface p-3">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-white">Nivel 2 en este local</span>
                <span className="text-nv-muted">70%</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[70%] rounded-full bg-nv-gradient" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
