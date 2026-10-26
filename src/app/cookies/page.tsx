// REVISAR POR ASESOR LEGAL ANTES DE PUBLICAR
import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout, type LegalSection } from "@/components/legal/LegalLayout";
import { CONTACT_EMAIL, siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Política de cookies",
  description: `Uso de cookies en la web de ${siteConfig.name}: no usamos ninguna.`,
  path: "/cookies",
  noindex: !siteConfig.legalPagesReady,
});

// Comprobado en octubre de 2026: la web no crea cookies ni usa localStorage,
// analítica, píxeles ni recursos de terceros (las fuentes se sirven desde la
// propia web). Si se añade cualquier cookie no técnica, ANTES hace falta un
// banner de consentimiento y actualizar esta página.
const sections: LegalSection[] = [
  {
    id: "que-son",
    title: "Qué son las cookies",
    content: (
      <p>
        Las cookies son pequeños archivos que un sitio web guarda en tu navegador para recordar
        información entre visitas: por ejemplo, que has iniciado sesión, tus preferencias o, en el
        caso de las cookies de análisis y publicidad, qué páginas visitas.
      </p>
    ),
  },
  {
    id: "uso",
    title: "Cookies que usa esta web",
    content: (
      <>
        <p>
          <strong>Ninguna.</strong> Esta web no instala cookies en tu navegador: ni técnicas, ni de
          análisis, ni de publicidad, ni de terceros. Tampoco guarda información en el
          almacenamiento local de tu navegador.
        </p>
        <p>
          No usamos herramientas de analítica ni píxeles de seguimiento, y las fuentes tipográficas
          se sirven desde la propia web, sin llamadas a servicios externos.
        </p>
      </>
    ),
  },
  {
    id: "consentimiento",
    title: "Por qué no te pedimos consentimiento",
    content: (
      <p>
        Como no usamos cookies, no hay nada que aceptar ni rechazar, y por eso esta web no muestra
        ningún aviso o banner de cookies. Si en el futuro usamos cookies que no sean estrictamente
        necesarias para que la web funcione, te pediremos antes tu consentimiento y actualizaremos
        esta página.
      </p>
    ),
  },
  {
    id: "borrar",
    title: "Cómo borrar las cookies de tu navegador",
    content: (
      <>
        <p>
          Aunque esta web no guarda ninguna, puedes ver y borrar en cualquier momento las cookies
          que otros sitios hayan guardado, desde los ajustes de tu navegador:
        </p>
        <ul>
          <li>
            <strong>Chrome</strong>: Configuración → Privacidad y seguridad → Cookies y otros datos de
            sitios.
          </li>
          <li>
            <strong>Safari</strong> (Mac): Ajustes → Privacidad → Gestionar datos de sitios web. En
            iPhone: Ajustes → Safari → Avanzado → Datos de sitios web.
          </li>
          <li>
            <strong>Firefox</strong>: Ajustes → Privacidad y seguridad → Cookies y datos del sitio.
          </li>
          <li>
            <strong>Edge</strong>: Configuración → Cookies y permisos del sitio.
          </li>
        </ul>
        <p>
          Para cualquier duda, escribe a <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> o
          consulta nuestra <Link href="/privacidad">política de privacidad</Link>.
        </p>
      </>
    ),
  },
];

export default function CookiesPage() {
  return <LegalLayout title="Política de cookies" sections={sections} />;
}
