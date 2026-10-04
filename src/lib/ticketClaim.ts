import { cache } from "react";
import { z } from "zod";

// Entrada compartida (/t/[token]). Se pide SIEMPRE desde el servidor de Next:
// el token no viaja en una petición del navegador y no dependemos de CORS.

const claimSchema = z.object({
  ok: z.literal(true),
  serial: z.string(),
  qrPayload: z.string().min(1),
  status: z.enum(["issued", "checked_in"]),
  assignedToName: z.string().nullish(),
  tierName: z.string().nullish(),
  // El endpoint todavía no lo devuelve; si llega, se muestra la hora de uso.
  checkedInAt: z.string().nullish(),
  event: z.object({
    title: z.string(),
    startAt: z.string().nullish(),
    city: z.string().nullish(),
    street: z.string().nullish(),
    // Una imagen rota no debe tumbar la entrada: si no es una URL http(s), se ignora.
    imageUrl: z.url({ protocol: /^https?$/ }).nullish().catch(null),
  }),
  club: z.object({ name: z.string() }),
});

export type TicketClaim = z.infer<typeof claimSchema>;

const MAX_TOKEN_LENGTH = 200;
const TIMEOUT_MS = 8000;

/**
 * null → la entrada no existe o ya no está disponible (404 del backend).
 * Cualquier otro fallo lanza error y lo recoge error.tsx.
 * Envuelta en cache() para que generateMetadata y la página compartan petición.
 */
export const getTicketClaim = cache(async (token: string): Promise<TicketClaim | null> => {
  if (!token || token.length > MAX_TOKEN_LENGTH) return null;

  const apiBase = process.env.API_BASE;
  if (!apiBase) throw new Error("[ticketClaim] Falta la variable de entorno API_BASE.");

  const url = `${apiBase.replace(/\/+$/, "")}/api/tickets/claim/${encodeURIComponent(token)}`;
  const res = await fetch(url, {
    cache: "no-store",
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });

  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`[ticketClaim] El backend respondió ${res.status}.`);

  const body: unknown = await res.json();
  if (typeof body === "object" && body !== null && (body as { ok?: unknown }).ok === false) {
    return null;
  }
  const parsed = claimSchema.safeParse(body);
  if (!parsed.success) throw new Error("[ticketClaim] Respuesta del backend con formato inesperado.");
  return parsed.data;
});

// Las fechas se muestran en hora de España aunque el servidor corra en UTC.
const TIME_ZONE = "Europe/Madrid";

function toDate(value: string | null | undefined): Date | null {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

/** "sáb 4 oct · 23:30" */
export function formatEventDate(value: string | null | undefined): string | null {
  const date = toDate(value);
  if (!date) return null;
  const parts = new Intl.DateTimeFormat("es-ES", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: TIME_ZONE,
  }).formatToParts(date);
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value.replace(".", "") ?? "";
  return `${part("weekday")} ${part("day")} ${part("month")} · ${part("hour")}:${part("minute")}`;
}

/** "00:45" */
export function formatTime(value: string | null | undefined): string | null {
  const date = toDate(value);
  if (!date) return null;
  return new Intl.DateTimeFormat("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: TIME_ZONE,
  }).format(date);
}
