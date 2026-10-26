// REVISAR POR ASESOR LEGAL ANTES DE PUBLICAR
import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { CONTACT_EMAIL, siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Aviso legal",
  description: `Aviso legal del sitio web de ${siteConfig.name}.`,
  path: "/aviso-legal",
  noindex: !siteConfig.legalPagesReady,
});

// Versión provisional: el texto definitivo está en preparación.
export default function AvisoLegalPage() {
  return (
    <LegalLayout
      title="Aviso legal"
      intro={
        <p>
          Esta página está en preparación. Para cualquier consulta, escríbenos a{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      }
    />
  );
}
