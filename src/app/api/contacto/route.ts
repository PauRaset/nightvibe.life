import sgMail from "@sendgrid/mail";
import { contactSchema, flattenErrors, HONEYPOT_FIELD, type ContactInput } from "@/lib/contactSchema";
import { rateLimit } from "@/lib/rateLimit";

const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const GENERIC_ERROR = "No hemos podido enviar tu mensaje. Inténtalo de nuevo más tarde.";

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

const oneLine = (value: string) => value.replace(/\s+/g, " ");

function buildEmailText(data: ContactInput): string {
  return [
    "Nueva solicitud desde nightvibe.life/locales",
    "",
    `Nombre: ${data.nombre}`,
    `Local: ${data.local}`,
    `Ciudad: ${data.ciudad}`,
    `Email: ${data.email}`,
    `Teléfono: ${data.telefono}`,
    "",
    "Mensaje:",
    data.mensaje,
    "",
    `Privacidad aceptada: sí (${new Date().toISOString()})`,
  ].join("\n");
}

export async function POST(request: Request) {
  const ip = getClientIp(request);

  const limited = rateLimit(`contacto:${ip}`, RATE_LIMIT, RATE_WINDOW_MS);
  if (!limited.ok) {
    return Response.json(
      { error: "Demasiados envíos. Espera unos minutos y vuelve a intentarlo." },
      { status: 429, headers: { "Retry-After": String(limited.retryAfter) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Solicitud no válida." }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return Response.json({ error: "Solicitud no válida." }, { status: 400 });
  }

  // Honeypot: si viene relleno es un bot. Respondemos OK sin enviar nada.
  const honeypot = (body as Record<string, unknown>)[HONEYPOT_FIELD];
  if (typeof honeypot === "string" && honeypot.length > 0) {
    return Response.json({ ok: true });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ errors: flattenErrors(parsed.error) }, { status: 422 });
  }

  const { SENDGRID_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!SENDGRID_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    console.error(
      "[api/contacto] Faltan variables de entorno: SENDGRID_API_KEY, CONTACT_TO_EMAIL o CONTACT_FROM_EMAIL.",
    );
    return Response.json({ error: GENERIC_ERROR }, { status: 500 });
  }

  const data = parsed.data;
  try {
    sgMail.setApiKey(SENDGRID_API_KEY);
    await sgMail.send({
      to: CONTACT_TO_EMAIL,
      from: CONTACT_FROM_EMAIL,
      replyTo: data.email,
      subject: `[NightVibe Locales] ${oneLine(data.local)} (${oneLine(data.ciudad)})`,
      text: buildEmailText(data),
    });
  } catch (error) {
    const detail =
      error && typeof error === "object" && "response" in error
        ? (error as { response?: { body?: unknown } }).response?.body
        : error;
    console.error("[api/contacto] Error enviando con SendGrid:", detail);
    return Response.json({ error: GENERIC_ERROR }, { status: 500 });
  }

  return Response.json({ ok: true });
}
