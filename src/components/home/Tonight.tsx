import type { CSSProperties } from "react";
import { tonight } from "@/lib/demo";
import { getHeatLevel, heatLevels } from "@/lib/heat";
import { Container } from "../Container";

// "Ahora mismo": el titular queda fijo (sticky) en la columna izquierda mientras
// la lista de esta noche pasa a la derecha. Misma retícula que "Y luego, todo en
// el móvil" y "Lo que tienes con NightVibe".

export function Tonight() {
  return (
    <section id="ahora" aria-labelledby="ahora-title" className="scroll-mt-16 py-20 sm:py-36">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <h2
            id="ahora-title"
            data-reveal-item
            className="text-[40px] leading-[0.98] font-extrabold tracking-[-0.035em] text-balance text-white sm:text-[56px] lg:text-[clamp(44px,3.8vw,56px)]"
          >
            Ahora mismo,
            <span className="block">esta noche.</span>
          </h2>
          <p data-reveal-item style={{ "--reveal-delay": "80ms" } as CSSProperties} className="mt-6 max-w-[34ch] text-lg leading-relaxed text-nv-muted">
            {tonight.length} locales, de más a menos gente que va.
          </p>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <table className="w-full text-base">
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
                  <tr key={v.kind} data-reveal-item style={{ "--reveal-delay": `${i * 50}ms` } as CSSProperties} className="align-baseline">
                    <td className={`pr-4 ${pad}`}>
                      <span className="block text-lg font-bold text-white">{v.kind}</span>
                      <span className="block text-[15px] text-nv-muted">{v.zone}</span>
                    </td>
                    <td className={`pr-4 text-[15px] text-nv-muted tabular-nums ${pad}`}>{v.opens}</td>
                    <td className={`text-right whitespace-nowrap ${pad}`}>
                      <span className="block text-2xl font-extrabold text-white tabular-nums">{v.attendees}</span>
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
      </Container>
    </section>
  );
}
