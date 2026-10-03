import { Container } from "../Container";
import { GhostButton } from "../GhostButton";

// Sin cifras: la comisión se presenta en la reunión, después de conocer el local.
export function BusinessModel() {
  return (
    <section aria-labelledby="modelo-title" className="py-16 sm:py-24">
      <Container>
        <div className="rounded-3xl border border-nv-line bg-nv-surface p-6 sm:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-2xl">
              <p className="nv-label text-nv-muted">Modelo</p>
              <h2 id="modelo-title" className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Cada local es distinto.
              </h2>
              <p className="mt-5 text-pretty text-base leading-relaxed text-nv-muted">
                Trabajamos con una comisión por entrada vendida. Sin cuota de alta ni mensualidades:
                si no vendes, no pagas. Las condiciones las concretamos contigo en una llamada,
                cuando conozcamos tu local.
              </p>
            </div>
            <GhostButton href="#contacto">Hablemos</GhostButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
