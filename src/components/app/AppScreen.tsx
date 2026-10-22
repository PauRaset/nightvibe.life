import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import type { ReactNode } from "react";
import { siteConfig } from "@/config/site";
import { featured, friends, levels, progress, ticket, tonight, venuePanel } from "@/lib/demo";
import { HeatBadge } from "../HeatBadge";
import { TicketQr } from "../ticket/TicketQr";

// Fragmentos REALES de la app (estilo true-black-flat adaptado a la marca):
// elevación solo por luminosidad con superficies teñidas de azul, sin bordes ni
// sombras, color solo en los datos (badges, progreso) y en el botón de acción.
// Datos de src/lib/demo.ts. Con siteConfig.appScreensReviewed = true y el PNG en
// public/screens/ se muestra la captura real (1179×2556 px).

const SCREEN_WIDTH = 1179;
const SCREEN_HEIGHT = 2556;

export const appScreens = {
  home: { file: "home.png", alt: "Ahora mismo en la app NightVibe: locales de esta noche por asistentes confirmados" },
  evento: { file: "evento.png", alt: "Evento en la app NightVibe: quién va y el botón para confirmar que vas" },
  misiones: { file: "misiones.png", alt: "Nivel 3 de 10 en un local: dos de tres misiones completadas" },
  entrada: { file: "entrada.png", alt: "Entrada con código QR en la app NightVibe" },
  panel: { file: "panel.png", alt: "Panel del local en NightVibe: confirmados, entradas vendidas y misiones de esta noche" },
} as const;

export type AppScreenName = keyof typeof appScreens;

type AppScreenProps = {
  screen: AppScreenName;
  /** Ancho máximo de la pantalla (por defecto 360). */
  width?: number;
  /** Halo suave del color de la escala detrás de la pantalla (no un fondo). */
  glow?: "cyan" | "violet" | "magenta";
  /** Para "home": cuántos locales enteros se muestran (nunca uno cortado). */
  rows?: number;
  preload?: boolean;
  className?: string;
};

export function AppScreen({ screen, glow, width = 360, rows = 3, preload = false, className = "" }: AppScreenProps) {
  const { file, alt } = appScreens[screen];
  const src = `/screens/${file}`;
  const useCapture = siteConfig.appScreensReviewed && existsSync(join(process.cwd(), "public", src));

  const screenEl = (
    <div
      className={`relative w-full overflow-hidden rounded-[1.75rem] bg-nv-surface ${className}`}
      style={{ maxWidth: width }}
    >
      {useCapture ? (
        <Image src={src} alt={alt} width={SCREEN_WIDTH} height={SCREEN_HEIGHT} sizes={`${width}px`} preload={preload} className="block h-auto w-full" />
      ) : (
        <div data-ui role="img" aria-label={alt} className="text-white">
          <div aria-hidden="true">{screen === "home" ? <HomeFragment rows={rows} /> : fragments[screen]}</div>
        </div>
      )}
    </div>
  );
  if (!glow) return screenEl;
  return (
    <div className="relative isolate w-full" style={{ maxWidth: width }}>
      {/* Halo: degradado radial estático (sin filter: blur), barato en móvil. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-[18%] -z-10 max-sm:inset-x-0"
        style={{
          background: `radial-gradient(closest-side, color-mix(in srgb, var(--nv-${glow}) 22%, transparent), transparent)`, // taste-skill-ignore
        }}
      />
      {screenEl}
    </div>
  );
}

// ─── Piezas ────────────────────────────────────────────────────────────────

function StatusLabel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`text-[13px] font-bold tracking-[0.14em] uppercase ${className}`}>{children}</span>;
}

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

function HomeFragment({ rows }: { rows: number }) {
  return (
    <div className="px-5 pt-6 pb-6">
      <div className="flex items-center justify-between">
        <span className="text-lg font-extrabold tracking-tight text-white">NightVibe</span>
        <span className="flex items-center gap-2 rounded-full bg-nv-surface-strong px-3 py-1.5">
          <span className="size-2 rounded-full bg-nv-magenta motion-safe:animate-live-dot" />
          <StatusLabel className="text-white">En vivo</StatusLabel>
        </span>
      </div>
      <p className="mt-6 text-[26px] leading-none font-extrabold tracking-tight">Ahora mismo</p>
      <p className="mt-2 text-[13px] text-nv-muted">{tonight.length} locales esta noche · por asistentes</p>
      <ul className="mt-5 space-y-2">
        {tonight.slice(0, rows).map((v) => (
          <li key={v.kind} className="flex items-center justify-between gap-3 rounded-2xl bg-nv-surface-strong p-4">
            <div className="min-w-0">
              <p className="text-[13px] text-nv-muted tabular-nums">Hoy · {v.opens}</p>
              <p className="mt-0.5 truncate text-[17px] leading-tight font-extrabold">{v.kind}</p>
              <p className="text-[13px] text-nv-muted">{v.zone}</p>
            </div>
            <HeatBadge value={v.attendees} size="sm" />
          </li>
        ))}
      </ul>
    </div>
  );
}

function EventoFragment() {
  return (
    <div>
      <div className="bg-nv-surface-raised px-5 pt-14 pb-5">
        <div className="flex items-end justify-between gap-3">
          <div>
            <StatusLabel className="text-nv-muted">{featured.genre}</StatusLabel>
            <p className="mt-1 text-[26px] leading-none font-extrabold tracking-tight">{featured.kind}</p>
            <p className="mt-1 text-[15px] text-nv-muted">{featured.zone}</p>
          </div>
          <HeatBadge value={featured.attendees} size="sm" />
        </div>
      </div>
      <dl className="grid grid-cols-2 gap-x-4 gap-y-4 px-5 pt-5 text-[15px]">
        {[
          ["Fecha", featured.date],
          ["Horario", featured.hours],
          ["Edad", featured.age],
          ["Van", `${featured.attendees} personas`],
        ].map(([k, v]) => (
          <div key={k}>
            <dt className="text-[13px] text-nv-muted">{k}</dt>
            <dd className="font-bold tabular-nums">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="mx-5 mt-5 mb-6 flex items-center justify-between gap-3 rounded-2xl bg-nv-surface-strong p-4">
        <div className="min-w-0">
          <div className="flex -space-x-2">
            {friends.slice(0, 4).map((f) => (
              <Avatar key={f.name} name={f.name} hue={f.hue} />
            ))}
          </div>
          <p className="mt-2 text-[13px] text-nv-muted">
            <span className="font-bold text-white">{friends.length} de los tuyos</span> van
          </p>
        </div>
        {/* Botón de acción circular de la app: gradiente permitido por la marca. */}
        <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-nv-gradient text-[13px] font-extrabold text-black">
          Voy
        </span>
      </div>
    </div>
  );
}

function Check({ done }: { done: boolean }) {
  return done ? (
    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white">
      <svg viewBox="0 0 16 16" className="size-4" fill="none">
        <path d="M3.5 8.5l3 3 6-7" stroke="black" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    </span>
  ) : (
    <span className="size-7 shrink-0 rounded-full bg-nv-surface-raised" />
  );
}

function MisionesFragment() {
  const done = progress.missions.filter((m) => m.done).length;
  const reward = levels[progress.level - 1].reward;
  return (
    <div className="px-5 pt-6 pb-6">
      <p className="text-[13px] text-nv-muted">
        {featured.kind} · {featured.zone}
      </p>
      <div className="mt-1 flex items-baseline justify-between">
        <p className="text-[26px] leading-none font-extrabold tracking-tight">
          Nivel {progress.level} <span className="text-[15px] font-bold text-nv-muted">de {levels.length}</span>
        </p>
        <p className="text-[15px] text-nv-muted tabular-nums">
          <span className="font-extrabold text-nv-violet-text">
            {done} de {progress.missions.length}
          </span>{" "}
          misiones
        </p>
      </div>
      {/* Barra de progreso: gradiente permitido por la marca. */}
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-nv-surface-raised">
        <div className="h-full rounded-full bg-nv-gradient" style={{ width: `${(done / progress.missions.length) * 100}%` }} />
      </div>
      <ul className="mt-5 space-y-2">
        {progress.missions.map((m) => (
          <li key={m.title} className="flex items-center gap-3 rounded-2xl bg-nv-surface-strong p-3.5">
            <Check done={m.done} />
            <span className={`flex-1 text-[15px] font-bold ${m.done ? "text-nv-muted" : ""}`}>{m.title}</span>
          </li>
        ))}
      </ul>
      <div className="mt-5 rounded-2xl bg-nv-surface-raised p-4">
        <p className="text-[13px] text-nv-muted">Premio del nivel {progress.level}</p>
        <p className="mt-0.5 text-lg font-extrabold">{reward}</p>
      </div>
    </div>
  );
}

function EntradaFragment() {
  return (
    <div className="px-6 pt-8 pb-8 text-center">
      <p className="text-[22px] font-extrabold tracking-tight">{featured.kind}</p>
      <p className="mt-1 text-[13px] text-nv-muted">
        {featured.zone} · {featured.date} · {featured.opens}
      </p>
      <div className="mx-auto mt-5 w-[78%] rounded-2xl bg-white p-3">
        <TicketQr payload={ticket.payload} />
      </div>
      <p className="mx-auto mt-4 inline-block rounded-full bg-nv-surface-strong px-5 py-2.5 text-lg font-extrabold tracking-[0.12em] text-nv-cyan tabular-nums">
        {ticket.serial}
      </p>
      <p className="mt-3 text-[13px] text-nv-muted">Enséñala en la puerta</p>
    </div>
  );
}

/** Panel del local (para /locales): la noche desde el lado del club. */
function PanelFragment() {
  const p = venuePanel;
  return (
    <div className="px-5 pt-6 pb-6">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-[15px] font-bold">{featured.kind}</p>
        <p className="text-[13px] text-nv-muted">Esta noche · {featured.date}</p>
      </div>
      <div className="mt-5 flex items-center gap-4 rounded-2xl bg-nv-surface-strong p-4">
        <HeatBadge value={p.confirmed} size="sm" />
        {/* El badge ya da la cifra: el texto no la repite. */}
        <p className="text-[17px] leading-snug font-bold">confirmados en la app esta noche</p>
      </div>
      <dl className="mt-2 grid grid-cols-3 gap-2 text-center">
        {[
          ["Entradas", p.ticketsSold],
          ["En puerta", p.checkedIn],
          ["Misiones", p.activeMissions],
        ].map(([k, v]) => (
          <div key={k} className="flex flex-col-reverse rounded-2xl bg-nv-surface-strong px-2 py-3">
            <dt className="mt-0.5 text-[13px] text-nv-muted">{k}</dt>
            <dd className="text-xl font-extrabold tabular-nums">{v}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-[13px] text-nv-muted">Abre a las {featured.opens}. Aún no ha entrado nadie.</p>
    </div>
  );
}

const fragments: Record<Exclude<AppScreenName, "home">, ReactNode> = {
  evento: <EventoFragment />,
  misiones: <MisionesFragment />,
  entrada: <EntradaFragment />,
  panel: <PanelFragment />,
};
