// REVISAR POR ASESOR LEGAL ANTES DE PUBLICAR
import type { Metadata } from "next";
import { LegalLayout, type LegalSection } from "@/components/legal/LegalLayout";
import { CONTACT_EMAIL, siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Aviso legal",
  description: `Aviso legal de la web de ${siteConfig.name}.`,
  path: "/aviso-legal",
  noindex: !siteConfig.legalPagesReady,
});

// Provisional: el titular es una persona física y NightVibe aún no es una
// actividad dada de alta. Sin NIF, DNI ni domicilio hasta que se faciliten.
const { legal } = siteConfig;
const mail = <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>;

const sections: LegalSection[] = [
  {
    id: "titular",
    title: "Titular de la web",
    content: (
      <p>
        El titular de esta web es <strong>{legal.holder}</strong>, persona física. Puedes
        contactar escribiendo a {mail}.
      </p>
    ),
  },
  {
    id: "que-es",
    title: "Qué es esta web",
    content: (
      <>
        <p>
          Esta web presenta {siteConfig.name}, un proyecto en desarrollo: una app para descubrir la
          noche y una plataforma para que los locales publiquen sus eventos.
        </p>
        <p>
          Desde esta web no se venden productos ni servicios. El formulario de la página para
          locales solo sirve para pedir información.
        </p>
      </>
    ),
  },
  {
    id: "propiedad",
    title: "Propiedad intelectual",
    content: (
      <>
        <p>
          La marca {siteConfig.name}, el diseño, los textos y el código de esta web pertenecen a su
          titular. No se pueden reproducir, distribuir ni transformar sin su permiso.
        </p>
        <p>
          Los datos y los nombres de locales que aparecen en la web (asistentes, eventos, niveles y
          premios) son ejemplos ilustrativos y no corresponden a locales reales.
        </p>
      </>
    ),
  },
  {
    id: "responsabilidad",
    title: "Responsabilidad",
    content: (
      <p>
        La información de esta web es orientativa y puede cambiar mientras el proyecto está en
        desarrollo. El titular no se hace responsable del mal uso que se haga de la web ni del
        contenido de los sitios externos a los que pueda enlazar.
      </p>
    ),
  },
  {
    id: "ley",
    title: "Ley aplicable",
    content: <p>Esta web y este aviso legal se rigen por la legislación española.</p>,
  },
];

export default function AvisoLegalPage() {
  return <LegalLayout title="Aviso legal" sections={sections} />;
}
