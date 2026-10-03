import { Container } from "../Container";
import { SectionHeading } from "../SectionHeading";

// QR decorativo generado con una matriz fija (no codifica nada).
const qr = [
  "1111111010111111",
  "1000001011100001",
  "1011101000101101",
  "1011101110101101",
  "1000001010100001",
  "1111111010111111",
  "0000000011000000",
  "1101011100110110",
  "0110100101011011",
  "1011011010110100",
  "0000000010101101",
  "1111111001100110",
  "1000001011011011",
  "1011101010110100",
  "1000001101101011",
  "1111111010010110",
];

const points = [
  { title: "En segundos", text: "Eliges, pagas y listo. Sin formularios eternos." },
  { title: "En tu móvil", text: "Tu entrada es un QR. Lo enseñas en la puerta y entras." },
  { title: "Siempre a mano", text: "Tus entradas guardadas en la app, sin capturas ni papel." },
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

        <div
          role="img"
          aria-label="Ilustración de una entrada digital con código QR"
          className="mx-auto w-full max-w-xs rounded-3xl bg-nv-surface-strong p-6"
        >
          <div aria-hidden="true">
            <p className="nv-label text-nv-cyan">Entrada general</p>
            <p className="mt-2 text-xl font-extrabold text-white">Sábado · 23:30</p>
            <p className="text-sm text-nv-muted">Evento de ejemplo</p>
            <div className="my-6 border-t border-dashed border-white/15" />
            <div className="mx-auto grid w-44 grid-cols-16 gap-0 rounded-xl bg-white p-3">
              {qr.flatMap((row, y) =>
                row.split("").map((cell, x) => (
                  <span key={`${x}-${y}`} className={`aspect-square ${cell === "1" ? "bg-nv-bg" : ""}`} />
                )),
              )}
            </div>
            <p className="mt-4 text-center text-xs text-nv-muted">Muéstralo en la puerta</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
