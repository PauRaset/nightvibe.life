import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { AppScreen, type AppScreenName } from "../app/AppScreen";
import { Container } from "../Container";

// Hojas de color apiladas como las carpetas del hero: cada capítulo de la noche
// es una hoja con su pestaña y su color, unida a la siguiente. Sin sticky: una
// hoja pegada acaba tapando el texto de la anterior y en móvil es frágil.

type Sheet = {
  id: string;
  name: string;
  field: string;
  screen: AppScreenName;
  /** Composición en escritorio: que dos hojas vecinas no repitan la misma. */
  layout: "right" | "left" | "stacked";
  title: string;
  body: ReactNode;
};

const sheets: Sheet[] = [
  {
    id: "los-tuyos",
    name: "Los tuyos",
    field: "bg-nv-field-low",
    screen: "evento",
    layout: "right",
    title: "Mira a dónde van los tuyos.",
    body: (
      <>
        Sigue a tus amigos y ve en qué local están esta noche. Confirmas que vas, te apuntas al
        plan o cambias de sitio. Sin grupos, sin mensajes perdidos.
      </>
    ),
  },
  {
    id: "misiones",
    name: "Misiones",
    field: "bg-nv-field-high",
    screen: "misiones",
    layout: "left",
    title: "Sube de nivel en cada local.",
    body: (
      <>
        Cada local tiene sus niveles. Subes completando misiones: escanear el QR del local al
        llegar, subir una foto de la noche. Cuando completas todas las del nivel, desbloqueas el
        premio que ha puesto el local.
      </>
    ),
  },
  {
    id: "entradas",
    name: "Tu entrada",
    field: "bg-nv-field-deep",
    screen: "entrada",
    layout: "stacked",
    title: "Compra fácil. Entra con el móvil.",
    body: (
      <>
        Compras la entrada del evento que publica cada local desde la app, en segundos. Tu entrada
        es un QR: lo enseñas en la puerta y entras. Sin papel y sin capturas.
      </>
    ),
  },
];

// Dónde va cada pieza en escritorio (en móvil siempre: pantalla y luego texto).
const textPlacement = {
  right: "lg:order-1 lg:col-span-5",
  left: "lg:order-2 lg:col-span-5 lg:col-start-8",
  // Texto en fila arriba (título | párrafo) y la pantalla debajo, centrada.
  stacked: "stacked lg:order-1 lg:col-span-12 lg:grid lg:grid-cols-12 lg:items-end lg:gap-x-8",
};
const screenPlacement = {
  right: "lg:order-2 lg:col-span-6 lg:col-start-7",
  left: "lg:order-1 lg:col-span-6 lg:col-start-1 lg:justify-start",
  stacked: "lg:order-2 lg:col-span-12 lg:justify-center",
};

export function FeatureSheets() {
  return (
    <section aria-labelledby="sheets-title" className="bg-nv-bg pt-24 sm:pt-32">
      <Container>
        <h2
          id="sheets-title"
          data-reveal-item
          className="max-w-3xl text-[40px] leading-[0.98] font-extrabold tracking-[-0.035em] text-white sm:text-[64px]"
        >
          Y luego, la noche.
        </h2>
        <p data-reveal-item className="mt-6 max-w-xl text-lg leading-relaxed text-white" style={{ "--reveal-delay": "80ms" } as CSSProperties}>
          Lo que haces con NightVibe desde que decides salir hasta que estás dentro.
        </p>
      </Container>

      <figure className="mt-14 mb-16 sm:mt-20 sm:mb-24">
        <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[21/9]">
          <Image
            src="/images/costa-de-noche.jpg"
            alt="La costa mediterránea de noche vista desde el espacio: las luces de las ciudades de Cataluña y Valencia junto al mar"
            fill
            sizes="100vw"
            className="object-cover object-[30%_72%] motion-safe:animate-drift"
          />
        </div>
        <Container>
          <figcaption className="mt-4 flex flex-wrap justify-between gap-x-8 gap-y-1 text-[13px] text-nv-muted">
            <span>La costa, encendida. Cada punto de luz es una noche que ya ha empezado.</span>
            <span>Foto: NASA, desde la Estación Espacial Internacional</span>
          </figcaption>
        </Container>
      </figure>

      <ol>
        {sheets.map((s, i) => (
          // Cada hoja monta 28px sobre la anterior: se ve su borde redondeado.
          <li
            key={s.id}
            id={s.id}
            aria-labelledby={`${s.id}-title`}
            className={`flex scroll-mt-16 flex-col rounded-t-[1.75rem] ${s.field} ${i > 0 ? "-mt-7" : ""}`}
          >
            <Container className="flex h-[52px] shrink-0 items-center sm:h-[72px]">
              <span className="text-[28px] font-extrabold tracking-tight text-white sm:text-[32px]">
                {s.name}
              </span>
            </Container>

            <Container className="grid flex-1 gap-8 pt-4 pb-20 lg:grid-cols-12 lg:pb-24">
              <div data-reveal-item className={`order-2 flex flex-col justify-center ${textPlacement[s.layout]}`}>
                <h3
                  id={`${s.id}-title`}
                  className="text-[28px] leading-[1.05] font-extrabold tracking-[-0.03em] text-white sm:text-[32px] lg:col-span-5"
                >
                  {s.title}
                </h3>
                <p className="mt-4 max-w-[40ch] text-lg leading-relaxed text-white lg:col-span-6 lg:col-start-7 lg:[.stacked_&]:mt-0">
                  {s.body}
                </p>
              </div>
              <div data-reveal-item className={`order-1 flex justify-center sm:justify-end ${screenPlacement[s.layout]}`}>
                <AppScreen screen={s.screen} className="max-h-[440px] self-start lg:max-h-none" />
              </div>
            </Container>
          </li>
        ))}
      </ol>
    </section>
  );
}
