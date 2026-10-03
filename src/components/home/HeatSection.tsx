import { Container } from "../Container";
import { HeatBadge } from "../HeatBadge";
import { SectionHeading } from "../SectionHeading";

const steps = [
  { value: 24, text: "Hay sitio. Buen momento para llegar con calma." },
  { value: 58, text: "Se está llenando. La noche coge ritmo." },
  { value: 91, text: "Lleno y con ambiente. Es aquí." },
];

export function HeatSection() {
  return (
    <section id="como-funciona" aria-labelledby="calor-title" className="scroll-mt-20 py-16 sm:py-28">
      <Container>
        <SectionHeading
          id="calor-title"
          eyebrow="Calor en tiempo real"
          title="Sabes cómo está antes de llegar."
          description="Cada local tiene un nivel de calor de 0 a 100 que cambia durante la noche. Un vistazo y decides."
        />

        <div className="relative mt-14">
          {/* La escala: el gradiente aquí tiene significado (frío → caliente) */}
          <div
            aria-hidden="true"
            className="absolute top-14 right-[16%] left-[16%] hidden h-px bg-nv-gradient opacity-60 sm:block"
          />
          <ol className="grid gap-5 sm:grid-cols-3">
            {steps.map((step) => (
              <li
                key={step.value}
                className="relative flex flex-col items-center rounded-3xl bg-nv-surface px-6 py-8 text-center"
              >
                <HeatBadge value={step.value} size="md" />
                <p className="mt-4 text-sm leading-relaxed text-nv-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
