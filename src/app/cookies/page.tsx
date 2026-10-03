// REVISAR POR ASESOR LEGAL ANTES DE PUBLICAR
import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout, type LegalSection } from "@/components/legal/LegalLayout";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Política de cookies",
  description: `Uso de cookies en el sitio web de ${siteConfig.name}.`,
  path: "/cookies",
  noindex: !siteConfig.legalPagesReady,
});

// Fase 1: sin cookies no esenciales ni analytics. Si se añaden, hay que
// implementar un banner de consentimiento ANTES de activarlas y actualizar esta página.
const sections: LegalSection[] = [
  {
    id: "que-son",
    title: "Qué son las cookies",
    content: (
      <p>
        Las cookies son pequeños archivos que un sitio web guarda en tu navegador. Se regulan en el
        artículo 22.2 de la LSSI-CE y, cuando tratan datos personales, en el RGPD.
      </p>
    ),
  },
  {
    id: "uso",
    title: "Cookies que usa este sitio",
    content: (
      <>
        <p>
          <strong>Este sitio no utiliza cookies analíticas, publicitarias ni de terceros.</strong>{" "}
          Solo podría usar cookies técnicas estrictamente necesarias para el funcionamiento del
          sitio, que están exentas del deber de consentimiento según el artículo 22.2 de la
          LSSI-CE.
        </p>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th scope="col">Cookie</th>
                <th scope="col">Tipo</th>
                <th scope="col">Finalidad</th>
                <th scope="col">Duración</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>[TODO: ninguna / nombre]</td>
                <td>Técnica</td>
                <td>[TODO]</td>
                <td>[TODO]</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    ),
  },
  {
    id: "gestion",
    title: "Cómo gestionar las cookies",
    content: (
      <p>
        Puedes bloquear o eliminar las cookies desde la configuración de tu navegador. Si bloqueas
        las técnicas, algunas partes del sitio podrían no funcionar correctamente.
      </p>
    ),
  },
  {
    id: "cambios",
    title: "Cambios",
    content: (
      <p>
        Si en el futuro incorporamos cookies no esenciales, te pediremos el consentimiento antes de
        instalarlas y actualizaremos esta política. Más información en la{" "}
        <Link href="/privacidad">Política de privacidad</Link>.
      </p>
    ),
  },
];

export default function CookiesPage() {
  return <LegalLayout title="Política de cookies" sections={sections} />;
}
