import { Container } from "../Container";
import { SectionHeading } from "../SectionHeading";

const props = [
  {
    title: "Publica tus eventos",
    text: "Crea el evento, pon precio y aforo, y queda visible en la app en minutos.",
  },
  {
    title: "Vende entradas",
    text: "Venta desde el móvil con entrada QR. Control de acceso rápido en la puerta.",
  },
  {
    title: "Visibilidad esa misma noche",
    text: "Llegas a gente que está decidiendo a dónde ir ahora, no dentro de un mes.",
  },
  {
    title: "Promociones por niveles",
    text: "Define niveles, misiones y premios. Tus clientes vuelven porque cada visita suma.",
  },
  {
    title: "Panel web de gestión",
    text: "Eventos, ventas, accesos y promociones desde un único panel en el navegador.",
  },
];

export function ValueProps() {
  return (
    <section aria-labelledby="valor-title" className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          id="valor-title"
          eyebrow="Qué te da NightVibe"
          title="Todo lo que necesitas para llenar la sala."
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {props.map((p, i) => (
            <li key={p.title} className="rounded-2xl border border-nv-line bg-nv-surface p-6">
              <p className="text-sm font-bold text-nv-dim tabular-nums">0{i + 1}</p>
              <h3 className="mt-3 text-lg font-bold text-white">{p.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-nv-muted">{p.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
