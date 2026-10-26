// REVISAR POR ASESOR LEGAL ANTES DE PUBLICAR
import type { Metadata } from "next";
import { LegalLayout, type LegalSection } from "@/components/legal/LegalLayout";
import { CONTACT_EMAIL, siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Política de privacidad",
  description: `Cómo trata ${siteConfig.name} los datos personales en la web nightvibe.life.`,
  path: "/privacidad",
  noindex: !siteConfig.legalPagesReady,
});

const { legal } = siteConfig;
const mail = (
  <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
);

// Basada en lo que hace de verdad el código (revisado en octubre de 2026):
// - el formulario de /locales envía nombre, local, ciudad, email, teléfono y
//   mensaje por email con SendGrid; no se guarda en ninguna base de datos;
// - la web no usa cookies, analítica ni recursos de terceros.
const sections: LegalSection[] = [
  {
    id: "responsable",
    title: "Responsable",
    content: (
      <p>
        El responsable del tratamiento de tus datos es <strong>{legal.holder}</strong>, titular de
        esta web. Puedes escribir para cualquier cuestión sobre privacidad a {mail}.
      </p>
    ),
  },
  {
    id: "ambito",
    title: "Ámbito",
    content: (
      <p>
        Esta política cubre la web nightvibe.life: la navegación por sus páginas y el formulario de
        contacto para locales. La app de {siteConfig.name} tendrá su propia política de privacidad
        cuando se publique.
      </p>
    ),
  },
  {
    id: "datos",
    title: "Qué datos recogemos",
    content: (
      <>
        <p>
          <strong>Al navegar por la web</strong> no te pedimos ningún dato ni usamos cookies ni
          herramientas de analítica. El servidor que aloja la web registra datos técnicos de cada
          conexión (como la dirección IP y el navegador) para poder servirla y mantenerla segura.
        </p>
        <p>
          <strong>Si envías el formulario de contacto para locales</strong>, recogemos los datos que
          escribes en él:
        </p>
        <ul>
          <li>tu nombre;</li>
          <li>el nombre del local;</li>
          <li>la ciudad;</li>
          <li>tu email;</li>
          <li>tu teléfono;</li>
          <li>el mensaje que nos escribes;</li>
          <li>y la constancia de que has aceptado esta política, con la fecha y la hora del envío.</li>
        </ul>
        <p>
          Para evitar envíos masivos, el formulario usa tu dirección IP de forma temporal: solo se
          mantiene en la memoria del servidor durante unos minutos y no se guarda.
        </p>
      </>
    ),
  },
  {
    id: "finalidad",
    title: "Para qué los usamos",
    content: (
      <p>
        Usamos los datos del formulario para responder a tu solicitud de información sobre{" "}
        {siteConfig.name} y, si lo deseas, concertar una reunión contigo. No los usamos para
        publicidad ni los cedemos a terceros con fines comerciales.
      </p>
    ),
  },
  {
    id: "base-legal",
    title: "Base legal",
    content: (
      <p>
        Tratamos los datos del formulario porque nos das tu consentimiento al marcar la casilla de
        aceptación antes de enviarlo. Puedes retirarlo en cualquier momento escribiendo a {mail},
        sin que ello afecte a lo tratado antes de retirarlo.
      </p>
    ),
  },
  {
    id: "conservacion",
    title: "Cuánto tiempo los conservamos",
    content: (
      <p>
        Conservamos tus datos el tiempo necesario para atender tu solicitud. Si después no se inicia
        ninguna relación con tu local, los suprimimos como máximo a los 12 meses del envío.
      </p>
    ),
  },
  {
    id: "proveedores",
    title: "Proveedores y transferencias internacionales",
    content: (
      <>
        <p>
          Para que la web funcione, dos proveedores tratan datos por cuenta del responsable, sin
          poder usarlos para fines propios:
        </p>
        <ul>
          <li>
            <strong>Vercel</strong>: alojamiento de la web.
          </li>
          <li>
            <strong>Twilio SendGrid</strong>: envío del email con los datos del formulario.
          </li>
        </ul>
        <p>
          Ambos tienen su sede en Estados Unidos. Las transferencias internacionales de datos se
          amparan en las garantías que ofrecen estos proveedores: el Marco de Privacidad de Datos
          UE-EE. UU. o las cláusulas contractuales tipo aprobadas por la Comisión Europea.
        </p>
      </>
    ),
  },
  {
    id: "derechos",
    title: "Tus derechos",
    content: (
      <>
        <p>
          Puedes ejercer en cualquier momento tus derechos de acceso, rectificación, supresión,
          oposición, limitación del tratamiento y portabilidad, y retirar tu consentimiento,
          escribiendo a {mail}.
        </p>
        <p>
          Si consideras que no hemos tratado bien tus datos, puedes reclamar ante la Agencia
          Española de Protección de Datos en{" "}
          <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">
            www.aepd.es
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "decisiones",
    title: "Decisiones automatizadas",
    content: <p>No tomamos decisiones automatizadas ni elaboramos perfiles con tus datos.</p>,
  },
];

export default function PrivacidadPage() {
  return <LegalLayout title="Política de privacidad" sections={sections} />;
}
