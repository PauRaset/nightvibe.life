import type { CSSProperties } from "react";
import { tonight } from "@/lib/demo";
import { getHeatLevel, heatLevels } from "@/lib/heat";
import { AppScreen } from "../app/AppScreen";
import { Container } from "../Container";

// "Ahora mismo": la frase arriba a todo el ancho; la lista de esta noche como
// tabla empujada a la derecha (columnas 8–12) y, a la izquierda, la misma lista
// tal y como se ve en la app. Mismos datos (src/lib/demo.ts).

export function Tonight() {
  return (
    <section id="ahora" aria-labelledby="ahora-title" className="scroll-mt-16 py-20 sm:py-36">
      <Container>
        <h2
          id="ahora-title"
          data-reveal-item
          className="max-w-[16ch] text-[40px] leading-[0.98] font-extrabold tracking-[-0.035em] text-white sm:text-[clamp(48px,4.5vw,68px)] lg:max-w-none"
        >
          Ahora mismo,
          <span className="block lg:pl-[3vw]">esta noche.</span>
        </h2>

        <div className="mt-14 grid gap-14 lg:mt-24 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div data-reveal-item className="order-2 flex justify-start lg:order-1 lg:col-span-4">
            <AppScreen screen="home" rows={3} width={340} glow="magenta" />
          </div>

          <div className="order-1 lg:order-2 lg:col-span-5 lg:col-start-8">
            <p className="text-[15px] text-nv-muted">
              Esta noche · {tonight.length} locales, de más a menos gente que va
            </p>
            <table className="mt-6 w-full text-base">
              <caption className="sr-only">Locales de esta noche por asistentes confirmados</caption>
              <thead className="sr-only">
                <tr>
                  <th scope="col">Local</th>
                  <th scope="col">Abre</th>
                  <th scope="col">Van</th>
                </tr>
              </thead>
              <tbody>
                {tonight.map((v, i) => {
                  const level = getHeatLevel(v.attendees);
                  // 26px entre filas; cada cuatro, 44px para agrupar.
                  const pad = i === 0 ? "pt-0" : i % 4 === 0 ? "pt-11" : "pt-[26px]";
                  return (
                    <tr
                      key={v.kind}
                      data-reveal-item
                      style={{ "--reveal-delay": `${i * 50}ms` } as CSSProperties}
                      className="align-baseline"
                    >
                      <td className={`pr-4 ${pad}`}>
                        <span className="block font-bold text-white">{v.kind}</span>
                        <span className="block text-[15px] text-nv-muted">{v.zone}</span>
                      </td>
                      <td className={`pr-4 text-[15px] text-nv-muted tabular-nums ${pad}`}>
                        {v.opens}
                      </td>
                      <td className={`text-right whitespace-nowrap ${pad}`}>
                        <span className="block text-xl font-extrabold text-white tabular-nums">{v.attendees}</span>
                        <span className={`block text-[13px] font-bold tracking-[0.14em] uppercase ${heatLevels[level].textClass}`}>
                          {heatLevels[level].label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </section>
  );
}
