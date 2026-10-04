import QRCode from "qrcode";

// QR generado en el SERVIDOR: la página llega con el QR ya pintado, sin
// JavaScript en el cliente, y se ve aunque el móvil tenga mala conexión.
// Colores por defecto de la librería (negro sobre blanco): máximo contraste.
// El SVG sale sin width/height y ocupa todo el ancho del bloque blanco.

type TicketQrProps = { payload: string };

export async function TicketQr({ payload }: TicketQrProps) {
  const svg = await QRCode.toString(payload, {
    type: "svg",
    // M: tolera ~15 % de daño (pantalla rayada, reflejos) sin hacer el QR más denso.
    errorCorrectionLevel: "M",
    // Zona de silencio en módulos; el padding del bloque blanco suma el resto.
    margin: 2,
  });

  return (
    <div
      role="img"
      aria-label="Código QR de la entrada"
      className="aspect-square w-full [&>svg]:block [&>svg]:size-full"
      // SVG generado por qrcode a partir del payload: solo contiene rutas
      // geométricas, nunca el texto del payload, así que no hay HTML inyectable.
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
