import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import type { ReactNode } from "react";
import { siteConfig } from "@/config/site";
import { HeatBadge } from "../HeatBadge";
import { TicketQr } from "../ticket/TicketQr";

// Pantallas de la app. Con siteConfig.appScreensReviewed = true y el PNG en
// public/screens/ se muestra la CAPTURA REAL (1179×2556 px, iPhone 15/16 Pro).
// Si no, un fragmento de la app construido en HTML con datos ficticios y tipos
// de local genéricos (regla de contenido: nada de locales reales).
// Sin marco de móvil: la pantalla sola, recortada como una fotografía.

const SCREEN_WIDTH = 1179;
const SCREEN_HEIGHT = 2556;

export const appScreens = {
  home: {
    file: "home.png",
    alt: "Inicio de la app NightVibe: los locales de esta noche ordenados por calor en tiempo real",
  },
  evento: {
    file: "evento.png",
    alt: "Detalle de un evento en la app NightVibe con su calor y quién va",
  },
  misiones: {
    file: "misiones.png",
    alt: "Misiones de un local en la app NightVibe: dos de tres completadas",
  },
  entrada: {
    file: "entrada.png",
    alt: "Entrada digital con código QR en la app NightVibe",
  },
} as const;

export type AppScreenName = keyof typeof appScreens;

type AppScreenProps = {
  screen: AppScreenName;
  /** Solo para la pantalla visible al cargar. */
  preload?: boolean;
  className?: string;
};

export function AppScreen({ screen, preload = false, className = "" }: AppScreenProps) {
  const { file, alt } = appScreens[screen];
  const src = `/screens/${file}`;
  const useCapture =
    siteConfig.appScreensReviewed && existsSync(join(process.cwd(), "public", src));

  return (
    <div
      className={`relative w-full max-w-[360px] overflow-hidden rounded-[2.25rem] bg-nv-surface ${className}`}
    >
      {useCapture ? (
        <Image
          src={src}
          alt={alt}
          width={SCREEN_WIDTH}
          height={SCREEN_HEIGHT}
          sizes="360px"
          preload={preload}
          className="block h-auto w-full"
        />
      ) : (
        <div data-ui role="img" aria-label={alt} className="text-white">
          <div aria-hidden="true">{fragments[screen]}</div>
        </div>
      )}
    </div>
  );
}

// ─── Fragmentos ────────────────────────────────────────────────────────────

function StatusLabel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`text-[13px] font-bold tracking-[0.14em] uppercase ${className}`}>
      {children}
    </span>
  );
}

function LiveDot() {
  return <span className="size-2 rounded-full bg-nv-magenta motion-safe:animate-live-dot" />;
}

const tonight = [
  { kind: "Club techno", zone: "Zona puerto", heat: 86, time: "23:59", going: 34 },
  { kind: "Sala de conciertos", zone: "Casco antiguo", heat: 23, time: "22:30", going: 12 },
  { kind: "Bar de copas", zone: "Paseo marítimo", heat: 6, time: "23:00", going: 5 },
];

/** Hueco de la foto del evento: superficie plana, un escalón más clara. */
function EventLight({ className = "" }: { heat?: number; className?: string }) {
  return <div className={`absolute inset-0 bg-nv-surface-strong ${className}`} />;
}

function HomeFragment() {
  return (
    <div className="px-5 pt-6 pb-7">
      <div className="flex items-center justify-between">
        <span className="text-lg font-extrabold tracking-tight text-white">NightVibe</span>
        <span className="flex items-center gap-2 rounded-full bg-nv-surface-strong px-3 py-1.5">
          <LiveDot />
          <StatusLabel className="text-white">En vivo</StatusLabel>
        </span>
      </div>
      <p className="mt-6 text-[28px] leading-none font-extrabold tracking-tight">Ahora mismo</p>
      <div className="mt-3 flex items-baseline justify-between text-[15px]">
        <span className="font-semibold text-nv-muted">La noche va subiendo</span>
        <span className="text-xl font-extrabold text-white tabular-nums">62%</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
        <div className="h-full w-[62%] rounded-full bg-white" />
      </div>
      <p className="mt-2 text-[13px] text-nv-dim">3 sitios calientes ahora · por calor</p>

      <ul className="mt-5 space-y-3">
        {tonight.map((v) => (
          <li key={v.kind} className="relative overflow-hidden rounded-3xl">
            <EventLight heat={v.heat} />
            <div className="relative flex items-end justify-between gap-3 p-4 pt-14">
              <div className="min-w-0">
                <p className="text-[13px] font-semibold text-nv-muted">Hoy · {v.time}</p>
                <p className="mt-1 text-lg leading-tight font-extrabold">{v.kind}</p>
                <p className="text-[13px] text-nv-muted">
                  {v.zone} · <span className="font-bold text-white">+{v.going} van</span>
                </p>
              </div>
              <HeatBadge value={v.heat} size="sm" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function EventoFragment() {
  return (
    <div>
      <div className="relative h-56">
        <EventLight />
        <div className="absolute right-5 bottom-5">
          <HeatBadge value={86} size="sm" />
        </div>
        <div className="absolute bottom-5 left-5">
          <StatusLabel className="text-nv-muted">Techno</StatusLabel>
          <p className="mt-1 text-[26px] leading-none font-extrabold tracking-tight">
            Club techno
          </p>
          <p className="mt-1 text-[15px] text-nv-muted">Zona puerto</p>
        </div>
      </div>
      <dl className="grid grid-cols-2 gap-x-4 gap-y-4 px-5 pt-5 text-[15px]">
        {[
          ["Fecha", "Sáb 24 oct"],
          ["Horario", "23:59 – 06:00"],
          ["Edad", "18+"],
          ["Dress", "Libre"],
        ].map(([k, v]) => (
          <div key={k}>
            <dt className="text-[13px] text-nv-dim">{k}</dt>
            <dd className="font-bold">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="mx-5 mt-5 flex items-center justify-between rounded-2xl bg-nv-surface-strong p-4">
        <div>
          <p className="font-extrabold">+34 van esta noche</p>
          <p className="text-[13px] text-nv-muted">3 personas que sigues</p>
        </div>
        <div className="flex -space-x-2">
          {["0.55", "0.4", "0.25"].map((c) => (
            <span
              key={c}
              className="size-8 rounded-full ring-2 ring-nv-bg"
              style={{ background: `rgba(255,255,255,${c})` }}
            />
          ))}
        </div>
      </div>
      <div className="px-5 pt-4 pb-7">
        <p className="rounded-full bg-white py-3.5 text-center font-extrabold text-black">
          Comprar entrada
        </p>
      </div>
    </div>
  );
}

export const missions = [
  { title: "Escanea el QR del local", done: true },
  { title: "Sube una foto de la noche", done: true },
  { title: "Escanea el QR otra noche", done: false },
];

function Check({ done }: { done: boolean }) {
  return done ? (
    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white">
      <svg viewBox="0 0 16 16" className="size-4" fill="none">
        <path d="M3.5 8.5l3 3 6-7" stroke="black" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    </span>
  ) : (
    <span className="size-7 shrink-0 rounded-full bg-white/10" />
  );
}

function MisionesFragment() {
  const done = missions.filter((m) => m.done).length;
  return (
    <div className="px-5 pt-6 pb-7">
      <p className="text-[13px] font-semibold text-nv-muted">Club techno · Zona puerto</p>
      <div className="mt-1 flex items-baseline justify-between">
        <p className="text-[28px] leading-none font-extrabold tracking-tight">Nivel 2</p>
        <p className="text-[15px] text-nv-muted">
          <span className="font-extrabold text-white">{done} de {missions.length}</span> misiones
        </p>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-white"
          style={{ width: `${(done / missions.length) * 100}%` }}
        />
      </div>
      <ul className="mt-5 space-y-2">
        {missions.map((m) => (
          <li key={m.title} className="flex items-center gap-3 rounded-2xl bg-nv-surface-strong p-3.5">
            <Check done={m.done} />
            <span className={`flex-1 text-[15px] font-bold ${m.done ? "text-nv-muted" : ""}`}>
              {m.title}
            </span>
            <StatusLabel className={m.done ? "text-nv-dim" : "text-white"}>
              {m.done ? "Hecha" : "Pendiente"}
            </StatusLabel>
          </li>
        ))}
      </ul>
      <div className="mt-5 rounded-2xl bg-nv-surface-strong p-4">
        <StatusLabel className="text-nv-muted">Al completar el nivel</StatusLabel>
        <p className="mt-1 text-lg font-extrabold">Entras sin cola</p>
      </div>
    </div>
  );
}

function EntradaFragment() {
  return (
    <div className="px-6 pt-8 pb-8 text-center">
      <p className="text-[22px] font-extrabold tracking-tight">Club techno</p>
      <p className="mt-1 text-[13px] text-nv-muted">Zona puerto · sáb 24 oct · 23:59</p>
      <div className="mx-auto mt-5 w-[78%] rounded-2xl bg-white p-3">
        {/* QR de demostración: no corresponde a ninguna entrada. */}
        <TicketQr payload="NIGHTVIBE · ENTRADA DE DEMOSTRACIÓN" />
      </div>
      <p className="mx-auto mt-4 inline-block rounded-full bg-nv-surface-strong px-5 py-2.5 text-lg font-extrabold tracking-[0.12em] tabular-nums">
        NV-DEMO-0000
      </p>
      <p className="mt-3 text-[13px] text-nv-dim">Enséñala en la puerta</p>
    </div>
  );
}

const fragments: Record<AppScreenName, ReactNode> = {
  home: <HomeFragment />,
  evento: <EventoFragment />,
  misiones: <MisionesFragment />,
  entrada: <EntradaFragment />,
};
