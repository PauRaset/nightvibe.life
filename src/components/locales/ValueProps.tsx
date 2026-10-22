import type { CSSProperties } from "react";
import { levels } from "@/lib/demo";
import { AppScreen, type AppScreenName } from "../app/AppScreen";
import { Container } from "../Container";

// Lo que el local tiene con NightVibe: filas sobre un eje (columna 5), cada una
// con la pantalla de la app que la demuestra en el margen derecho, a tamaños
// desiguales. Sin tarjetas ni numeración.

type Row = { title: string; text: string; screen?: AppScreenName; rows?: number; width?: number; phone?: string };

const items: Row[] = [
  {
    title: "Publica tus eventos.",
    text: "Creas el evento, pones el precio de tus entradas y el aforo, y aparece en la app en minutos. La gente confirma que va y lo ves en tu panel.",
    screen: "evento",
    width: 320,
    phone: "w-full",
  },
  {
    title: "Vende entradas con QR.",
    text: "Venta desde el móvil. En la puerta se escanea y se pasa: control de acceso rápido, sin listas en papel.",
    screen: "entrada",
    width: 300,
    phone: "ml-auto w-[82%]",
  },
  {
    title: "Visibilidad esa misma noche.",
    text: "Tu local sale ante gente que está decidiendo ahora a dónde ir, ordenado por cuántos van. No dentro de un mes: esta noche.",
    screen: "home",
    rows: 3,
    width: 340,
    phone: "w-full",
  },
  {
    title: "Niveles con misiones.",
    text: `Tus clientes suben ${levels.length} niveles en tu local completando misiones, como escanear tu QR o subir una foto de la noche, y canjean el premio de cada nivel. Tú decides las misiones y los premios; el último puede ser una mesa con botella.`,
    screen: "misiones",
    width: 310,
    phone: "ml-auto w-[88%]",
  },
  {
    title: "Panel web de gestión.",
    text: "Eventos, confirmados, ventas, accesos y misiones en un único panel, desde el navegador.",
  },
];

export function ValueProps() {
  return (
    <section aria-labelledby="valor-title" className="py-16 sm:py-28">
      <Container className="grid gap-y-14 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-24">
        <h2
          id="valor-title"
          data-reveal-item
          className="text-4xl leading-none font-extrabold tracking-[-0.035em] text-white lg:col-span-8 lg:col-start-5 lg:text-6xl"
        >
          Lo que tienes con NightVibe.
        </h2>
        {items.map((it) => (
          <article key={it.title} className="grid gap-8 lg:col-span-8 lg:col-start-5 lg:grid-cols-8 lg:gap-8">
            <div className={it.screen ? "lg:col-span-4" : "lg:col-span-6"}>
              <h3 data-reveal-item className="text-2xl leading-tight font-extrabold tracking-[-0.025em] text-white lg:text-[32px]">
                {it.title}
              </h3>
              <p
                data-reveal-item
                style={{ "--reveal-delay": "80ms" } as CSSProperties}
                className="mt-3 max-w-[38ch] text-lg leading-relaxed text-nv-muted"
              >
                {it.text}
              </p>
            </div>
            {it.screen && (
              <div data-reveal-item style={{ "--reveal-delay": "140ms" } as CSSProperties} className={`${it.phone} lg:col-span-4 lg:w-full`}>
                <div className="lg:ml-auto" style={{ maxWidth: it.width }}>
                  <AppScreen screen={it.screen} rows={it.rows} width={it.width} />
                </div>
              </div>
            )}
          </article>
        ))}
      </Container>
    </section>
  );
}
