import type { CSSProperties, ReactNode } from "react";
import { AppScreen, type AppScreenName } from "../app/AppScreen";
import { Container } from "../Container";

// Tres secciones, un mensaje cada una: el texto a un lado y la pantalla de la
// app al otro, alternando. Mismo fondo que toda la página; las separa el aire.

type Feature = {
  id: string;
  screen: AppScreenName;
  /** El único punto de color de la sección: el halo y el acento de su pantalla. */
  glow: "cyan" | "violet";
  title: string;
  body: ReactNode;
};

const features: Feature[] = [
  {
    id: "los-tuyos",
    screen: "evento",
    glow: "cyan",
    title: "Mira a dónde van los tuyos.",
    body: "Sigue a tus amigos y ve en qué local están esta noche. Te apuntas o cambias de plan, sin grupos ni mensajes perdidos.",
  },
  {
    id: "misiones",
    screen: "misiones",
    glow: "violet",
    title: "Sube de nivel en cada local.",
    body: "Completas misiones, como escanear el QR del local o subir una foto de la noche. Al completar un nivel, el local te da su premio.",
  },
  {
    id: "entradas",
    screen: "entrada",
    glow: "cyan",
    title: "Compra fácil. Entra con el móvil.",
    body: "Compras la entrada del evento que publica cada local en segundos. Es un QR: lo enseñas en la puerta y entras.",
  },
];

export function FeatureSheets() {
  return (
    <>
      {features.map((f, i) => {
        const flip = i % 2 === 1;
        return (
          <section
            key={f.id}
            id={f.id}
            aria-labelledby={`${f.id}-title`}
            className="scroll-mt-16 py-20 sm:py-36"
          >
            <Container className="grid items-center gap-12 sm:gap-16 lg:grid-cols-12 lg:gap-8">
              <div className={`lg:col-span-5 ${flip ? "lg:order-2 lg:col-start-8" : ""}`}>
                <h2
                  id={`${f.id}-title`}
                  data-reveal-item
                  className="text-[40px] leading-[0.98] font-extrabold tracking-[-0.035em] text-white sm:text-[56px]"
                >
                  {f.title}
                </h2>
                <p
                  data-reveal-item
                  style={{ "--reveal-delay": "80ms" } as CSSProperties}
                  className="mt-8 max-w-[38ch] text-lg leading-relaxed text-nv-muted"
                >
                  {f.body}
                </p>
              </div>
              <div
                data-reveal-item
                style={{ "--reveal-delay": "160ms" } as CSSProperties}
                className={`flex justify-center lg:col-span-5 ${flip ? "lg:order-1 lg:col-start-1 lg:justify-start" : "lg:col-start-8 lg:justify-end"}`}
              >
                <AppScreen screen={f.screen} glow={f.glow} />
              </div>
            </Container>
          </section>
        );
      })}
    </>
  );
}
