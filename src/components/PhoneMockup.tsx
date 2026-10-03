import Image from "next/image";

// Marco de iPhone para capturas REALES de la app. Las capturas van en
// public/screens/ a 1179×2556 px (iPhone 15/16 Pro). Mientras `src` sea null se
// muestra un placeholder con el fondo de la app.
// Las capturas no pueden mostrar nombres de locales reales.
export const appScreens = {
  home: {
    src: null as string | null, // "/screens/home.png"
    label: "Inicio",
    alt: "Pantalla de inicio de la app NightVibe: locales cercanos ordenados por calor en tiempo real",
  },
  evento: {
    src: null as string | null, // "/screens/evento.png"
    label: "Detalle de evento",
    alt: "Detalle de un evento en la app NightVibe con su nivel de calor y la entrada",
  },
  entrada: {
    src: null as string | null, // "/screens/entrada.png"
    label: "Entrada con QR",
    alt: "Entrada digital con código QR en la app NightVibe",
  },
};

export type AppScreen = keyof typeof appScreens;

type PhoneMockupProps = {
  screen: AppScreen;
  /** Solo para la imagen above-the-fold (hero). */
  preload?: boolean;
  glow?: boolean;
  className?: string;
};

export function PhoneMockup({ screen, preload = false, glow = true, className = "" }: PhoneMockupProps) {
  const { src, label, alt } = appScreens[screen];

  return (
    <div className={`relative mx-auto w-[272px] sm:w-[300px] ${className}`}>
      {glow && (
        <div
          aria-hidden="true"
          className="absolute -inset-10 -z-10 rounded-full bg-nv-gradient opacity-25 blur-3xl"
        />
      )}
      {/* Bisel */}
      <div className="rounded-[3rem] bg-black p-[7px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] ring-1 ring-white/15">
        {/* Pantalla con la proporción exacta de la captura */}
        <div className="relative aspect-[1179/2556] overflow-hidden rounded-[2.6rem] bg-nv-app-bg">
          {src ? (
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(min-width: 640px) 286px, 258px"
              preload={preload}
              className="object-cover"
            />
          ) : (
            <div role="img" aria-label={alt} className="flex h-full items-center justify-center">
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
