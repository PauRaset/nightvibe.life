import { formatEuros, siteConfig } from "@/config/site";
import { Container } from "../Container";

// TODO: confirmar con asesoría si la comisión de 1,70 € incluye IVA y cómo se
// presentan los gastos de gestión al cliente final antes de publicar.
const feeCents = siteConfig.pricing.feePerTicketCents;
const fee = formatEuros(feeCents);
const exampleCents = 1500;
const example = formatEuros(exampleCents);

const options = [
  {
    title: "La asume el local",
    text: "El cliente paga el precio de la entrada y tú absorbes la comisión.",
    example: [
      ["El cliente paga", example],
      ["Comisión NightVibe", `−${fee}`],
      ["Recibes", formatEuros(exampleCents - feeCents)],
    ],
  },
  {
    title: "La paga el cliente",
    text: "Se suma al precio como gastos de gestión. Tú recibes el precio íntegro.",
    example: [
      ["Precio de la entrada", example],
      ["Gastos de gestión", `+${fee}`],
      ["Recibes", example],
    ],
  },
];

export function Pricing() {
  return (
    <section aria-labelledby="precio-title" className="py-16 sm:py-24">
      <Container>
        <div className="rounded-3xl border border-nv-line bg-nv-surface p-6 sm:p-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-center">
            <div>
              <p className="nv-label text-nv-muted">Modelo económico</p>
              <h2 id="precio-title" className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Una comisión fija. Nada más.
              </h2>
              <p className="mt-6 flex items-baseline gap-3">
                <span className="text-6xl font-extrabold tracking-tight text-white sm:text-7xl">{fee}</span>
                <span className="text-base font-semibold text-nv-muted">por entrada vendida</span>
              </p>
              <ul className="mt-6 space-y-2 text-[0.9375rem] text-nv-muted">
                <li>Sin cuota de alta.</li>
                <li>Sin mensualidades.</li>
                <li>Sin otros cobros. Si no vendes, no pagas.</li>
              </ul>
            </div>

            <div>
              <p className="text-base font-semibold text-white">Tú decides quién la paga:</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {options.map((o) => (
                  <div key={o.title} className="rounded-2xl bg-nv-surface-strong p-5">
                    <h3 className="font-bold text-white">{o.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-nv-muted">{o.text}</p>
                    <dl className="mt-5 space-y-1.5 border-t border-nv-line pt-4 text-sm">
                      {o.example.map(([label, value], i) => (
                        <div
                          key={label}
                          className={`flex justify-between ${i === o.example.length - 1 ? "pt-1.5 font-bold text-white" : "text-nv-muted"}`}
                        >
                          <dt>{label}</dt>
                          <dd className="tabular-nums">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-nv-dim">Ejemplo con una entrada de {example}.</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
