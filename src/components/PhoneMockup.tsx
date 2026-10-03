import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";

// Marco de iPhone para capturas REALES de la app, en public/screens/ a
// 1179×2556 px (iPhone 15/16 Pro). Si el archivo no existe se muestra un
// placeholder con el fondo de la app: basta con añadir el PNG, sin tocar código.
// Las capturas no pueden mostrar locales, artistas ni personas reales.
const SCREEN_WIDTH = 1179;
const SCREEN_HEIGHT = 2556;

export const appScreens = {
  home: {
    file: "home.png",
    label: "Inicio",
    alt: "Inicio de la app NightVibe: eventos de esta noche ordenados por calor en tiempo real",
  },
  evento: {
    file: "evento.png",
    label: "Detalle de evento",
    alt: "Detalle de un evento en la app NightVibe con su nivel de calor",
  },
  entrada: {
    file: "entrada.png",
    label: "Entrada con QR",
    alt: "Entrada digital con código QR a pantalla completa en la app NightVibe",
  },
};

export type AppScreen = keyof typeof appScreens;

type PhoneMockupProps = {
  screen: AppScreen;
  /** Solo para la imagen above-the-fold (hero). */
  preload?: boolean;
  className?: string;
};

export function PhoneMockup({ screen, preload = false, className = "" }: PhoneMockupProps) {
  const { file, label, alt } = appScreens[screen];
  const src = `/screens/${file}`;
  const hasImage = existsSync(join(process.cwd(), "public", src));

  return (
    <div className={`mx-auto w-[260px] sm:w-[290px] ${className}`}>
      <div className="rounded-[3rem] bg-black p-1.5 shadow-[0_30px_60px_-24px_rgba(0,0,0,0.7)] ring-1 ring-white/10">
        <div className="relative overflow-hidden rounded-[2.65rem] bg-nv-app-bg">
          {hasImage ? (
            <Image
              src={src}
              alt={alt}
              width={SCREEN_WIDTH}
              height={SCREEN_HEIGHT}
              sizes="(min-width: 640px) 278px, 248px"
              preload={preload}
              className="block h-auto w-full"
            />
          ) : (
            <div
              role="img"
              aria-label={alt}
              className="flex aspect-[1179/2556] items-center justify-center"
            >
              <p aria-hidden="true" className="nv-label text-nv-dim">
                Captura · {label}
              </p>
            </div>
          )}
          {/* Isla dinámica: proporciones del iPhone 15/16 Pro sobre 393 pt de ancho */}
          <div
            aria-hidden="true"
            className="absolute top-[1.3%] left-1/2 aspect-[126/37] w-[32%] -translate-x-1/2 rounded-full bg-black"
          />
        </div>
      </div>
    </div>
  );
}
