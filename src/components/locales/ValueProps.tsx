import type { CSSProperties } from "react";
import { AppScreen, type AppScreenName } from "../app/AppScreen";
import { Container } from "../Container";

// Lo que el local tiene con NightVibe: lista de definición a gran escala,
// sin tarjetas ni numeración. Los premios se ganan completando misiones.
const props = [
  {
    title: "Publica tus eventos.",
    text: "Creas el evento, pones precio y aforo, y aparece en la app en minutos. Lo editas cuando quieras.",
  },
  {
    title: "Vende entradas.",
    text: "Venta desde el móvil con entrada QR. En la puerta se escanea y se pasa: control de acceso rápido, sin listas en papel.",
  },
  {
    title: "Visibilidad esa noche.",
    text: "Tu local sale ante gente que está decidiendo ahora a dónde ir. No dentro de un mes: esta noche.",
  },
  {
    title: "Niveles con misiones.",
    text: "Tus clientes suben de nivel completando misiones: escanear el QR del local, subir una foto de la noche. Cada nivel desbloquea premios reales, como un chupito, entrada gratis, saltarse la cola o una mesa con botella. Tú decides las misiones, los niveles y los premios.",
  },
  {
    title: "Panel web de gestión.",
    text: "Eventos, ventas, accesos y promociones en un único panel, desde el navegador.",
  },
];

// Lo que ven tus clientes: las mismas pantallas de la app, a tamaño real.
const screens: { screen: AppScreenName; caption: string }[] = [
  { screen: "home", caption: "Tu local, ordenado por calor esta noche." },
  { screen: "misiones", caption: "Las misiones y el premio que tú defines." },
  { screen: "entrada", caption: "La entrada con QR que escaneas en la puerta." },
];

export function ValueProps() {
  return (
    <section aria-labelledby="valor-title" className="py-16 sm:py-28">
      <Container>
        <h2
          id="valor-title"
          data-reveal-item
          className="max-w-4xl text-4xl leading-none font-extrabold tracking-[-0.035em] text-balance text-white lg:text-6xl"
        >
          Lo que tienes con NightVibe.
        </h2>
        <dl className="mt-12 grid gap-10 sm:mt-16 lg:mt-24 lg:gap-16">
          {props.map((p, i) => (
            <div
              key={p.title}
              data-reveal-item
              style={{ "--reveal-delay": `${(i % 2) * 80}ms` } as CSSProperties}
              className="grid gap-3 lg:grid-cols-12 lg:gap-8"
            >
              <dt className="text-2xl leading-tight font-extrabold tracking-[-0.025em] text-white lg:col-span-5 lg:text-3xl">
                {p.title}
              </dt>
              <dd className="text-lg leading-relaxed text-pretty text-white lg:col-span-7 lg:text-xl">
                {p.text}
              </dd>
            </div>
          ))}
        </dl>

      </Container>
    </section>
  );
}

export function ClientScreens() {
  return (
    <section aria-labelledby="clientes-title" className="py-16 sm:py-28">
      <Container>
        <h2
          id="clientes-title"
          data-reveal-item
          className="max-w-4xl text-4xl leading-none font-extrabold tracking-[-0.035em] text-balance text-white lg:text-6xl"
        >
          Lo que ven tus clientes.
        </h2>
        <ul className="mt-16 grid lg:mt-24 gap-10 sm:grid-cols-3 sm:gap-6">
          {screens.map((s, i) => (
            <li
              key={s.screen}
              data-reveal-item
              style={{ "--reveal-delay": `${i * 80}ms` } as CSSProperties}
            >
              <figure>
                <AppScreen screen={s.screen} className="mx-auto max-h-[460px] sm:mx-0" />
                <figcaption className="mt-4 text-base text-white">{s.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
