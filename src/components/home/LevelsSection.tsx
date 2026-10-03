import { Container } from "../Container";
import { SectionHeading } from "../SectionHeading";

const missions = [
  { title: "Escanea el QR del local", done: true },
  { title: "Sube una foto de la noche", done: true },
  { title: "Vuelve otro fin de semana", done: false },
];

const completed = missions.filter((m) => m.done).length;

const rewards = [
  { level: "Nivel 1", reward: "Chupito de bienvenida", unlocked: true },
  { level: "Nivel 2", reward: "Sin cola en la entrada", unlocked: false },
  { level: "Nivel 3", reward: "Entrada gratis", unlocked: false },
];

function CheckIcon({ done }: { done: boolean }) {
  return done ? (
    <span
      className="flex size-6 items-center justify-center rounded-full bg-nv-gradient"
      aria-hidden="true"
    >
      <svg viewBox="0 0 16 16" className="size-3.5" fill="none">
        <path
          d="M3.5 8.5l3 3 6-7"
          stroke="black"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  ) : (
    <span className="size-6 rounded-full ring-2 ring-white/20 ring-inset" aria-hidden="true" />
  );
}

export function LevelsSection() {
  return (
    <section aria-labelledby="niveles-title" className="py-16 sm:py-28">
      <Container className="grid items-start gap-12 lg:grid-cols-2">
        <SectionHeading
          id="niveles-title"
          eyebrow="Promociones por niveles"
          title="Sube de nivel en cada local."
          description="Cuanto más sales a un sitio, más te da. Completa misiones, sube de nivel y desbloquea premios. Cada local decide sus niveles y sus premios."
        />

        <div className="rounded-3xl bg-nv-surface p-5 sm:p-7">
          <div className="flex items-baseline justify-between">
            <p className="text-lg font-extrabold text-white">Nivel 2</p>
            <p className="text-sm text-nv-muted">
              <span className="font-bold text-white">{completed}</span> de {missions.length}{" "}
              misiones
            </p>
          </div>
          <div
            className="mt-3 h-2.5 overflow-hidden rounded-full bg-white/10"
            role="progressbar"
            aria-label="Progreso hacia el nivel 3"
            aria-valuemin={0}
            aria-valuemax={missions.length}
            aria-valuenow={completed}
            aria-valuetext={`${completed} de ${missions.length} misiones completadas`}
          >
            <div
              className="h-full rounded-full bg-nv-gradient"
              style={{ width: `${(completed / missions.length) * 100}%` }}
            />
          </div>

          <h3 className="nv-label mt-8 text-nv-dim">Misiones</h3>
          <ul className="mt-3 space-y-2">
            {missions.map((m) => (
              <li key={m.title} className="flex items-center gap-3 rounded-2xl bg-nv-surface p-3.5">
                <CheckIcon done={m.done} />
                <span
                  className={`flex-1 text-sm font-semibold ${m.done ? "text-nv-muted line-through decoration-white/30" : "text-white"}`}
                >
                  {m.title}
                </span>
                <span className={`nv-label ${m.done ? "text-nv-dim" : "text-nv-violet-text"}`}>
                  {m.done ? "Completada" : "Pendiente"}
                </span>
              </li>
            ))}
          </ul>

          <h3 className="nv-label mt-8 text-nv-dim">Premios</h3>
          <ul className="mt-3 grid gap-2 sm:grid-cols-3">
            {rewards.map((r) => (
              <li
                key={r.level}
                className={`rounded-2xl p-3.5 ${r.unlocked ? "bg-nv-surface-strong ring-1 ring-nv-violet/50 ring-inset" : "bg-nv-surface"}`}
              >
                <p className={`nv-label ${r.unlocked ? "text-nv-violet-text" : "text-nv-dim"}`}>
                  {r.level}
                  {r.unlocked && " · Desbloqueado"}
                </p>
                <p className="mt-1.5 text-sm font-bold text-white">{r.reward}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
