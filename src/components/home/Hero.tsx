import Link from "next/link";
import { AppScreen } from "../app/AppScreen";
import { Container } from "../Container";
import { StoreButtons } from "../StoreButtons";

// Hero "pila de carpetas": cada carpeta es un momento de la noche que aún está
// por llegar, con su pestaña y su color de capítulo; enlaza a su sección. La de
// delante está abierta: es ahora mismo, y lleva la app y la acción.
// De arriba (más tarde) a abajo (ahora).
const folders = [
  { href: "#descargar", label: "Descargar", time: "02:30", field: "bg-nv-field-high", tab: "right-4 sm:right-auto sm:left-[74%]" },
  { href: "#entradas", label: "Tu entrada", time: "01:45", field: "bg-nv-field-low", tab: "left-[38%] sm:left-[52%]" },
  { href: "#misiones", label: "Misiones", time: "01:00", field: "bg-nv-field-deep", tab: "left-[6%] sm:left-[30%]" },
  { href: "#los-tuyos", label: "Los tuyos", time: "00:15", field: "bg-nv-field-low", tab: "left-[52%] sm:left-[8%]" },
];

// Trapecio de la pestaña; su forma vuelve en las esquinas de las carpetas.
const tabShape = { clipPath: "polygon(10% 0, 90% 0, 100% 100%, 0 100%)" };

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="overflow-hidden bg-nv-bg">
      <Container className="pt-14 pb-12 text-center sm:pt-16 sm:pb-14">
        <h1
          id="hero-title"
          className="mx-auto text-[13vw] leading-[0.92] font-extrabold tracking-[-0.045em] text-white sm:text-[9vw] lg:text-[min(8.4vw,132px)]"
        >
          La noche, <span className="whitespace-nowrap">en directo.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-[46ch] text-lg leading-relaxed text-white">
          NightVibe es la app que te enseña qué locales se están llenando ahora mismo, a dónde van
          los tuyos y te premia por salir.
        </p>
      </Container>

      <nav aria-label="Capítulos de la noche" className="mx-auto w-full sm:w-[86%]">
        <ul>
          {folders.map((f, i) => (
            <li key={f.href} className="relative" style={{ zIndex: i + 1 }}>
              <Link
                href={f.href}
                className={`group relative flex h-[52px] items-center justify-end rounded-t-[1.75rem] px-5 sm:h-14 sm:px-8 ${f.field} ${i > 0 ? "-mt-px" : ""}`}
              >
                <span
                  className={`absolute bottom-full flex h-8 min-w-32 items-center justify-center px-6 text-base font-bold text-white transition-transform group-hover:-translate-y-1 sm:h-10 sm:text-lg ${f.field} ${f.tab}`}
                  style={tabShape}
                >
                  {f.label}
                </span>
                <span className="text-base font-bold text-nv-muted tabular-nums">{f.time}</span>
              </Link>
            </li>
          ))}

          {/* Carpeta abierta: ahora mismo. Se sale por abajo hacia el capítulo del calor. */}
          <li className="relative" style={{ zIndex: folders.length + 1 }}>
            <div className="relative rounded-t-[1.75rem] bg-nv-field-mid">
              <span
                className="absolute bottom-full left-[18%] flex h-8 min-w-32 items-center justify-center gap-2 bg-nv-field-mid px-6 text-base font-bold text-white sm:left-[46%] sm:h-10 sm:text-lg"
                style={tabShape}
              >
                <span aria-hidden="true" className="size-2 rounded-full bg-nv-magenta motion-safe:animate-live-dot" />
                Ahora
              </span>
              <div className="grid gap-10 px-5 pt-7 sm:px-8 sm:pt-8 lg:grid-cols-12">
                <div className="lg:col-span-5 lg:pb-16">
                  <p className="text-[13px] font-bold tracking-[0.14em] text-nv-violet-text uppercase">
                    En vivo · 23:30
                  </p>
                  <p className="mt-3 max-w-sm text-[28px] leading-[1.05] font-extrabold tracking-[-0.03em] text-white sm:text-[32px]">
                    Tres sitios se están llenando cerca de ti.
                  </p>
                  <StoreButtons className="mt-6" />
                </div>
                <div className="flex justify-center sm:justify-end lg:col-span-7">
                  {/* Recortada por abajo: la pantalla sigue en el capítulo siguiente. */}
                  <div className="h-[420px] w-full max-w-[360px] overflow-hidden sm:h-[480px]">
                    <AppScreen screen="home" preload className="rounded-b-none" />
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </section>
  );
}
