import type { CSSProperties } from "react";
import { levels } from "@/lib/demo";
import { AppScreen, type AppScreenName } from "../app/AppScreen";
import { Container } from "../Container";

// Filas sobre un eje (columna 5): título y párrafo en el eje y, en el margen
// derecho, la pantalla real de la app a tamaños deliberadamente desiguales.

type Row = { id: string; title: string; body: string; screen: AppScreenName; width: number; phone: string };

const rows: Row[] = [
  {
    id: "confirma",
    title: "Confirma que vas.",
    body: "Un toque en «Voy» y sumas uno al número del local. Los tuyos lo ven, y tú ves a dónde van ellos.",
    screen: "evento",
    width: 340,
    phone: "w-full",
  },
  {
    id: "entradas",
    title: "Tu entrada es un QR.",
    body: "Compras la entrada del evento que publica cada local en segundos. En la puerta la escanean y entras.",
    screen: "entrada",
    width: 300,
    phone: "ml-auto w-[82%]",
  },
  {
    id: "misiones",
    title: "Sube de nivel en cada local.",
    body: `Cada local tiene ${levels.length} niveles. Completas las misiones del nivel, como escanear su QR o subir una foto de la noche, y canjeas su premio.`,
    screen: "misiones",
    width: 320,
    phone: "w-[90%]",
  },
];

export function FeatureRows() {
  return (
    <section aria-labelledby="movil-title" className="pt-12 pb-20 sm:pt-20 sm:pb-36">
      <Container className="grid gap-y-16 lg:grid-cols-12 lg:gap-x-8">
        {/* Titular fijo en la columna izquierda mientras las filas pasan a la derecha. */}
        <div className="lg:col-span-5">
          <h2
            id="movil-title"
            data-reveal-item
            className="text-[40px] leading-[0.98] font-extrabold tracking-[-0.035em] text-balance text-white sm:text-[56px] lg:sticky lg:top-28 lg:text-[clamp(44px,3.8vw,56px)]"
          >
            Y luego, todo en el móvil.
          </h2>
        </div>

        <div className="grid gap-y-16 lg:col-span-6 lg:col-start-7 lg:gap-y-28">
          {rows.map((r) => (
            <article key={r.id} id={r.id} className="flex scroll-mt-16 flex-col gap-8">
              <div>
                <h3 data-reveal-item className="text-[28px] leading-[1.05] font-extrabold tracking-[-0.03em] text-white sm:text-[36px]">
                  {r.title}
                </h3>
                <p
                  data-reveal-item
                  style={{ "--reveal-delay": "80ms" } as CSSProperties}
                  className="mt-4 max-w-[34ch] text-lg leading-relaxed text-nv-muted"
                >
                  {r.body}
                </p>
              </div>
              <div
                data-reveal-item
                style={{ "--reveal-delay": "140ms", maxWidth: r.width } as CSSProperties}
                className={`${r.phone} lg:ml-0 lg:w-full`}
              >
                <AppScreen screen={r.screen} width={r.width} />
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
