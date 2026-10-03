// REVISAR POR ASESOR LEGAL ANTES DE PUBLICAR
import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout, type LegalSection } from "@/components/legal/LegalLayout";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Términos y condiciones",
  description: `Condiciones de uso de la app ${siteConfig.name} y de la compra de entradas.`,
  path: "/terminos",
  noindex: !siteConfig.legalPagesReady,
});

const { legal } = siteConfig;

const sections: LegalSection[] = [
  {
    id: "objeto",
    title: "Objeto",
    content: (
      <p>
        Estos términos regulan el uso de la aplicación {siteConfig.name} y del sitio{" "}
        {siteConfig.siteUrl}, titularidad de {legal.holder} (NIF {legal.nif}). Al registrarte o usar
        el servicio aceptas estos términos.
      </p>
    ),
  },
  {
    id: "intermediario",
    title: "Papel de NightVibe como intermediario",
    content: (
      <>
        <p>
          {siteConfig.name} es una plataforma tecnológica que pone en contacto a personas usuarias
          con locales y organizadores de ocio nocturno. <strong>{siteConfig.name} no organiza
          eventos, no gestiona los locales ni actúa en su nombre</strong>.
        </p>
        <p>
          El contrato de acceso a cada evento se celebra entre la persona usuaria y el local u
          organizador, que es el único responsable del evento, del derecho de admisión, del aforo,
          de su celebración y de las promociones y premios que ofrezca.
        </p>
      </>
    ),
  },
  {
    id: "cuenta",
    title: "Registro y cuenta",
    content: (
      <ul>
        <li>Para usar la app debes tener al menos {legal.minimumAge} años.</li>
        <li>El registro se realiza con un número de teléfono verificado.</li>
        <li>Eres responsable de la actividad de tu cuenta y de mantener tu dispositivo seguro.</li>
        <li>Puedes eliminar tu cuenta en cualquier momento.</li>
      </ul>
    ),
  },
  {
    id: "entradas",
    title: "Compra de entradas",
    content: (
      <>
        <p>
          El precio de cada entrada lo fija el local u organizador. Antes de pagar se muestra el
          importe total, incluidos, en su caso, los gastos de gestión. El pago se procesa de forma
          segura a través de un proveedor de pagos externo.
        </p>
        <p>
          Tras la compra recibirás la entrada con un código QR en la app. La entrada es personal y
          puede requerir identificación en la puerta. El local puede aplicar su derecho de admisión
          conforme a la normativa aplicable.
        </p>
      </>
    ),
  },
  {
    id: "desistimiento",
    title: "Desistimiento, cancelaciones y reembolsos",
    content: (
      <>
        <p>
          Conforme al artículo 103.l) del Real Decreto Legislativo 1/2007 (TRLGDCU), no existe
          derecho de desistimiento en la contratación de servicios relacionados con actividades de
          esparcimiento con fecha o periodo de ejecución específicos.
        </p>
        <p>
          Si un evento se cancela o se modifica sustancialmente, el local u organizador es el
          responsable del reembolso. {siteConfig.name} facilitará la gestión a través de la
          plataforma. [TODO: definir política de reembolso de los gastos de gestión y el
          procedimiento concreto.]
        </p>
      </>
    ),
  },
  {
    id: "niveles",
    title: "Niveles, misiones y premios",
    content: (
      <p>
        Cada local define sus propios niveles, misiones y premios, y es responsable de
        concederlos. Los premios no son canjeables por dinero, están sujetos a disponibilidad y a
        las condiciones del local, y los que incluyan bebidas alcohólicas solo se entregarán a
        mayores de edad. {siteConfig.name} puede anular misiones o premios obtenidos de forma
        fraudulenta.
      </p>
    ),
  },
  {
    id: "contenido",
    title: "Contenido que subes",
    content: (
      <p>
        Al subir fotos u otro contenido garantizas que tienes derecho a hacerlo y que no vulnera
        derechos de terceros (incluida la imagen de otras personas). Concedes a {legal.holder} una
        licencia no exclusiva y gratuita para usarlo dentro del servicio con la finalidad para la
        que lo subes. [TODO: concretar alcance, duración y si el local puede usar las fotos.]
      </p>
    ),
  },
  {
    id: "conducta",
    title: "Uso aceptable",
    content: (
      <ul>
        <li>No uses el servicio para actividades ilícitas ni para acosar a otras personas.</li>
        <li>No manipules la ubicación, las misiones ni el sistema de calor.</li>
        <li>No revendas entradas salvo que la plataforma lo permita expresamente.</li>
      </ul>
    ),
  },
  {
    id: "responsabilidad",
    title: "Responsabilidad",
    content: (
      <p>
        La información de afluencia (&quot;calor&quot;) es orientativa. {siteConfig.name} no
        responde de la celebración, el contenido ni la seguridad de los eventos, que corresponden
        al local u organizador, sin perjuicio de los derechos que la ley reconoce a las personas
        consumidoras.
      </p>
    ),
  },
  {
    id: "cambios",
    title: "Modificaciones",
    content: (
      <p>
        Podemos modificar estos términos. Los cambios relevantes se comunicarán con antelación
        razonable en la app.
      </p>
    ),
  },
  {
    id: "ley",
    title: "Ley aplicable y reclamaciones",
    content: (
      <p>
        Estos términos se rigen por la legislación española. Para reclamaciones puedes escribir a{" "}
        {legal.email}. Si eres consumidor, serán competentes los juzgados de tu domicilio. [TODO:
        indicar adhesión, si la hay, a un sistema de arbitraje de consumo.] Consulta también la{" "}
        <Link href="/privacidad">Política de privacidad</Link>.
      </p>
    ),
  },
];

export default function TerminosPage() {
  return <LegalLayout title="Términos y condiciones" sections={sections} />;
}
