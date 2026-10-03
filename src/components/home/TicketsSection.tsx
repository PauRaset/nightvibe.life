import { Container } from "../Container";
import { PhoneMockup } from "../PhoneMockup";
import { SectionHeading } from "../SectionHeading";

const points = [
  {
    title: "En segundos",
    text: "Eliges, pagas y listo. Sin formularios eternos.",
  },
  {
    title: "En tu móvil",
    text: "Tu entrada es un QR. Lo enseñas en la puerta y entras.",
  },
  {
    title: "Siempre a mano",
    text: "Tus entradas guardadas en la app, sin capturas ni papel.",
  },
];

export function TicketsSection() {
  return (
    <section aria-labelledby="entradas-title" className="py-16 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            id="entradas-title"
            eyebrow="Entradas"
            title="Compra fácil. Entra con el móvil."
            description="Compra la entrada del evento que publica cada local directamente desde la app."
          />
          <ul className="mt-10 space-y-6">
            {points.map((p) => (
              <li key={p.title} className="flex gap-4">
                <span aria-hidden="true" className="mt-2 size-2 shrink-0 rounded-full bg-nv-cyan" />
                <div>
                  <p className="font-bold text-white">{p.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-nv-muted">{p.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <PhoneMockup screen="entrada" />
      </Container>
    </section>
  );
}
