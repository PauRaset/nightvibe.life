import { Container } from "../Container";
import { HeatBadge } from "../HeatBadge";
import { PhoneMockup } from "../PhoneMockup";
import { SectionHeading } from "../SectionHeading";

const steps = [
  { value: 24, text: "Hay sitio. Buen momento para llegar con calma." },
  { value: 58, text: "Se está llenando. La noche coge ritmo." },
  { value: 91, text: "Lleno y con ambiente. Es aquí." },
];

export function HeatSection() {
  return (
    <section
      id="como-funciona"
      aria-labelledby="calor-title"
      className="scroll-mt-20 py-16 sm:py-28"
    >
      <Container className="grid items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionHeading
            id="calor-title"
            eyebrow="Calor en tiempo real"
            title="Sabes cómo está antes de llegar."
            description="Cada local tiene un nivel de calor de 0 a 100 que cambia durante la noche. Un vistazo y decides."
          />
          <ol className="mt-10 space-y-3">
            {steps.map((step) => (
              <li
                key={step.value}
                className="flex items-center gap-4 rounded-3xl bg-nv-surface p-4"
              >
                <HeatBadge value={step.value} size="sm" hideLabel />
                <p className="text-sm leading-relaxed text-nv-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
        <PhoneMockup screen="evento" />
      </Container>
    </section>
  );
}
