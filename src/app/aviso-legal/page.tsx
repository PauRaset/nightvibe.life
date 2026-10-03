// REVISAR POR ASESOR LEGAL ANTES DE PUBLICAR
import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout, type LegalSection } from "@/components/legal/LegalLayout";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Aviso legal",
  description: `Aviso legal e información del titular de ${siteConfig.name}.`,
  path: "/aviso-legal",
});

const { legal } = siteConfig;

const sections: LegalSection[] = [
  {
    id: "titular",
    title: "Datos identificativos del titular",
    content: (
      <>
        <p>
          En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la
          Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se facilitan los datos del
          titular de este sitio web ({siteConfig.siteUrl}) y de la aplicación {siteConfig.name}:
        </p>
        <ul>
          <li>
            <strong>Titular:</strong> {legal.holder}
          </li>
          <li>
            <strong>NIF:</strong> {legal.nif}
          </li>
          <li>
            <strong>Domicilio:</strong> {legal.address}
          </li>
          <li>
            <strong>Registro:</strong> {legal.registry}
          </li>
          <li>
            <strong>Email de contacto:</strong> {legal.email}
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "objeto",
    title: "Objeto y naturaleza del servicio",
    content: (
      <>
        <p>
          {siteConfig.name} es una plataforma tecnológica intermediaria que permite a las personas
          usuarias descubrir locales de ocio nocturno, consultar su actividad en tiempo real,
          participar en promociones y adquirir entradas para eventos.
        </p>
        <p>
          {siteConfig.name} <strong>no organiza eventos ni representa a los locales</strong>. Cada
          evento, promoción o premio es responsabilidad del local u organizador que lo publica.
        </p>
      </>
    ),
  },
  {
    id: "condiciones",
    title: "Condiciones de uso del sitio web",
    content: (
      <p>
        El acceso a este sitio web es gratuito y atribuye la condición de persona usuaria, que se
        compromete a hacer un uso adecuado de los contenidos conforme a la ley, la buena fe y el
        presente aviso legal. El uso de la aplicación se rige además por los{" "}
        <Link href="/terminos">Términos y condiciones</Link>.
      </p>
    ),
  },
  {
    id: "propiedad",
    title: "Propiedad intelectual e industrial",
    content: (
      <p>
        Los contenidos, diseños, marcas, logotipos y código de este sitio son titularidad de{" "}
        {legal.holder} o de terceros que han autorizado su uso. Queda prohibida su reproducción,
        distribución o transformación sin autorización expresa, salvo en los casos permitidos por
        la ley. [TODO: confirmar registro de la marca {siteConfig.name}.]
      </p>
    ),
  },
  {
    id: "responsabilidad",
    title: "Exclusión de responsabilidad",
    content: (
      <>
        <p>
          El titular no garantiza la disponibilidad continua del sitio ni la ausencia de errores,
          aunque adopta medidas razonables para evitarlos.
        </p>
        <p>
          La información sobre locales, eventos, niveles de afluencia o promociones mostrada en la
          aplicación es orientativa y la proporcionan los propios locales o se calcula a partir de
          datos agregados. El titular no responde de su exactitud ni de las decisiones tomadas en
          base a ella.
        </p>
      </>
    ),
  },
  {
    id: "enlaces",
    title: "Enlaces a terceros",
    content: (
      <p>
        Este sitio puede incluir enlaces a sitios de terceros (por ejemplo, tiendas de
        aplicaciones). El titular no controla ni se responsabiliza de sus contenidos o políticas.
      </p>
    ),
  },
  {
    id: "datos",
    title: "Protección de datos y cookies",
    content: (
      <p>
        El tratamiento de datos personales se describe en la{" "}
        <Link href="/privacidad">Política de privacidad</Link> y el uso de cookies en la{" "}
        <Link href="/cookies">Política de cookies</Link>.
      </p>
    ),
  },
  {
    id: "ley",
    title: "Legislación aplicable y jurisdicción",
    content: (
      <p>
        Este aviso legal se rige por la legislación española. Para cualquier controversia, las
        partes se someten a los juzgados y tribunales que correspondan conforme a la normativa
        aplicable; cuando la persona usuaria sea consumidora, serán competentes los de su
        domicilio. [TODO: revisar cláusula de jurisdicción.]
      </p>
    ),
  },
];

export default function AvisoLegalPage() {
  return <LegalLayout title="Aviso legal" sections={sections} />;
}
