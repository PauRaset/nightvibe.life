// REVISAR POR ASESOR LEGAL ANTES DE PUBLICAR
import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout, type LegalSection } from "@/components/legal/LegalLayout";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Política de privacidad",
  description: `Cómo trata ${siteConfig.name} tus datos personales en la web y en la app.`,
  path: "/privacidad",
});

const { legal } = siteConfig;

const sections: LegalSection[] = [
  {
    id: "responsable",
    title: "Responsable del tratamiento",
    content: (
      <ul>
        <li>
          <strong>Responsable:</strong> {legal.holder}
        </li>
        <li>
          <strong>NIF:</strong> {legal.nif}
        </li>
        <li>
          <strong>Domicilio:</strong> {legal.address}
        </li>
        <li>
          <strong>Email para privacidad:</strong> {legal.privacyEmail}
        </li>
        <li>
          <strong>Delegado de protección de datos:</strong> {legal.dpo}
        </li>
      </ul>
    ),
  },
  {
    id: "alcance",
    title: "Alcance",
    content: (
      <p>
        Esta política se aplica al sitio web {siteConfig.siteUrl} y a la aplicación móvil{" "}
        {siteConfig.name}, conforme al Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018
        (LOPDGDD).
      </p>
    ),
  },
  {
    id: "datos",
    title: "Qué datos tratamos, para qué y con qué base legal",
    content: (
      <>
        <h3>Formulario de contacto para locales (web)</h3>
        <p>
          Nombre, nombre del local, ciudad, email, teléfono y mensaje. Finalidad: responder a tu
          solicitud y, en su caso, gestionar la relación comercial. Base legal: tu consentimiento y
          la aplicación de medidas precontractuales a petición tuya (art. 6.1.a y 6.1.b RGPD).
        </p>

        <h3>Registro y autenticación por teléfono (app)</h3>
        <p>
          Número de teléfono e identificador de cuenta. La verificación se realiza mediante un
          código SMS a través de Firebase Authentication (Google). Finalidad: crear y proteger tu
          cuenta. Base legal: ejecución del contrato (art. 6.1.b RGPD).
        </p>

        <h3>Perfil y funciones sociales (app)</h3>
        <p>
          Nombre de usuario, foto de perfil si la añades, personas a las que sigues y que te siguen,
          y los locales a los que indicas que vas. Finalidad: permitir que las personas que te
          siguen vean a dónde vas y viceversa. Base legal: ejecución del contrato (art. 6.1.b
          RGPD). [TODO: describir los controles de visibilidad disponibles en la app.]
        </p>

        <h3>Geolocalización (app)</h3>
        <p>
          Ubicación aproximada o precisa del dispositivo, solo si concedes el permiso. Finalidad:
          mostrarte locales cercanos, calcular distancias y validar misiones en el local.
          Contribuye de forma agregada al nivel de calor de los locales. Base legal: tu
          consentimiento (art. 6.1.a RGPD), que puedes retirar en cualquier momento desde los
          ajustes del dispositivo. [TODO: confirmar si la ubicación se usa en segundo plano, con qué
          precisión y durante cuánto tiempo se conserva.]
        </p>

        <h3>Fotos desde la cámara (app)</h3>
        <p>
          Imágenes que tomas con la cámara para completar misiones, solo si concedes el permiso.
          Finalidad: validar la misión y, en su caso, mostrarlas al local correspondiente. Base
          legal: tu consentimiento (art. 6.1.a RGPD). [TODO: indicar quién puede ver las fotos y
          su plazo de conservación.]
        </p>

        <h3>Compra de entradas y pagos (app)</h3>
        <p>
          Datos de la compra (evento, importe, fecha, entrada QR). Los pagos se procesan a través
          de Stripe; {siteConfig.name} no almacena los datos completos de tu tarjeta. Finalidad:
          gestionar la compra, emitir la entrada y permitir el acceso al evento. Base legal:
          ejecución del contrato (art. 6.1.b RGPD) y cumplimiento de obligaciones legales
          fiscales y contables (art. 6.1.c RGPD).
        </p>

        <h3>Emails transaccionales</h3>
        <p>
          Email y datos de la operación. Finalidad: enviarte confirmaciones de compra, entradas y
          avisos del servicio. Base legal: ejecución del contrato (art. 6.1.b RGPD). No enviamos
          comunicaciones comerciales sin tu consentimiento. [TODO: indicar proveedor de envío si
          se usa SendGrid u otro.]
        </p>

        <h3>Niveles, misiones y premios (app)</h3>
        <p>
          Visitas, misiones completadas, puntos y premios canjeados en cada local. Finalidad:
          gestionar el programa de niveles de cada local. Base legal: ejecución del contrato (art.
          6.1.b RGPD).
        </p>
      </>
    ),
  },
  {
    id: "destinatarios",
    title: "Destinatarios y encargados del tratamiento",
    content: (
      <>
        <p>No vendemos tus datos. Pueden acceder a ellos:</p>
        <ul>
          <li>
            <strong>Locales y organizadores</strong>: los datos necesarios para gestionar tu
            entrada, el acceso y las promociones de su local. [TODO: detallar qué datos recibe el
            local exactamente y en calidad de qué (responsable o encargado).]
          </li>
          <li>
            <strong>Google (Firebase)</strong>: autenticación, base de datos y alojamiento.
          </li>
          <li>
            <strong>Stripe</strong>: procesamiento de pagos.
          </li>
          <li>
            <strong>Twilio SendGrid</strong>: envío de emails.
          </li>
          <li>
            <strong>Vercel</strong>: alojamiento del sitio web.
          </li>
          <li>Administraciones públicas cuando exista obligación legal.</li>
        </ul>
        <p>[TODO: revisar y completar la lista de proveedores.]</p>
      </>
    ),
  },
  {
    id: "transferencias",
    title: "Transferencias internacionales",
    content: (
      <p>
        Algunos proveedores pueden tratar datos fuera del Espacio Económico Europeo (por ejemplo,
        en Estados Unidos). En ese caso, las transferencias se amparan en el Marco de Privacidad de
        Datos UE-EE. UU. o en las cláusulas contractuales tipo aprobadas por la Comisión Europea.
        [TODO: verificar la garantía aplicable a cada proveedor.]
      </p>
    ),
  },
  {
    id: "conservacion",
    title: "Plazos de conservación",
    content: (
      <ul>
        <li>Datos de cuenta: mientras la cuenta esté activa.</li>
        <li>Datos de compras: durante los plazos exigidos por la normativa fiscal y mercantil.</li>
        <li>Solicitudes de contacto: el tiempo necesario para atenderlas. [TODO: plazo concreto.]</li>
        <li>Ubicación y fotos de misiones: [TODO: plazo concreto].</li>
      </ul>
    ),
  },
  {
    id: "derechos",
    title: "Tus derechos",
    content: (
      <>
        <p>
          Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación
          del tratamiento y portabilidad, así como retirar tu consentimiento en cualquier momento,
          escribiendo a {legal.privacyEmail}. También puedes eliminar tu cuenta desde la app. [TODO:
          confirmar que la app permite eliminar la cuenta.]
        </p>
        <p>
          Si consideras que no hemos tratado tus datos correctamente, puedes presentar una
          reclamación ante la Agencia Española de Protección de Datos (
          <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">
            www.aepd.es
          </a>
          ).
        </p>
      </>
    ),
  },
  {
    id: "menores",
    title: "Edad mínima",
    content: (
      <p>
        El uso de la app está reservado a personas con edad igual o superior a {legal.minimumAge}{" "}
        años. No tratamos conscientemente datos de menores de esa edad.
      </p>
    ),
  },
  {
    id: "seguridad",
    title: "Seguridad",
    content: (
      <p>
        Aplicamos medidas técnicas y organizativas adecuadas para proteger tus datos frente a
        accesos no autorizados, pérdida o alteración.
      </p>
    ),
  },
  {
    id: "cambios",
    title: "Cambios en esta política",
    content: (
      <p>
        Podemos actualizar esta política. Si los cambios son relevantes, te avisaremos en la app o
        por email. Consulta también el <Link href="/aviso-legal">Aviso legal</Link> y la{" "}
        <Link href="/cookies">Política de cookies</Link>.
      </p>
    ),
  },
];

export default function PrivacidadPage() {
  return <LegalLayout title="Política de privacidad" sections={sections} />;
}
