// REVISAR POR ASESOR LEGAL ANTES DE PUBLICAR
import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { CONTACT_EMAIL, siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Términos y condiciones",
  description: `Términos y condiciones de uso de ${siteConfig.name}.`,
  path: "/terminos",
  noindex: !siteConfig.legalPagesReady,
});

// Provisional: los términos de la app y de compra de entradas se publican con el lanzamiento.
export default function TerminosPage() {
  return (
    <LegalLayout
      title="Términos y condiciones"
      intro={
        <p>
          Los términos de uso de la app y de compra de entradas se publicarán con el lanzamiento de{" "}
          {siteConfig.name}. Para cualquier consulta, escríbenos a{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      }
    />
  );
}
