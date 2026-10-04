import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StoreButtons } from "@/components/StoreButtons";
import { TicketQr } from "@/components/ticket/TicketQr";
import { siteConfig } from "@/config/site";
import { ogImage } from "@/lib/metadata";
import { formatEventDate, formatTime, getTicketClaim } from "@/lib/ticketClaim";

// Entrada compartida por WhatsApp: /t/<claimToken>.
// Pensada para enseñarse en la puerta del local, de noche, desde el móvil.

// noindex: nunca en buscadores. no-referrer: el token va en la URL y no debe
// filtrarse a la imagen del evento ni a las stores en la cabecera Referer.
const privatePage = {
  robots: { index: false, follow: false },
  referrer: "no-referrer",
} satisfies Metadata;

export async function generateMetadata({ params }: PageProps<"/t/[token]">): Promise<Metadata> {
  const { token } = await params;
  const ticket = await getTicketClaim(token);
  if (!ticket) return { ...privatePage, title: "Entrada no disponible" };

  const { event, club } = ticket;
  const title = `Tu entrada para ${event.title}`;
  const date = formatEventDate(event.startAt);
  const description = `${[club.name, date].filter(Boolean).join(" · ")}. Enséñala en la puerta.`;
  const images = event.imageUrl ? [{ url: event.imageUrl, alt: event.title }] : [ogImage];

  return {
    ...privatePage,
    title: { absolute: title },
    description,
    openGraph: {
      title,
      description,
      siteName: siteConfig.name,
      locale: "es_ES",
      type: "website",
      images,
    },
    twitter: { card: "summary_large_image", title, description, images },
  };
}

export default async function TicketPage({ params }: PageProps<"/t/[token]">) {
  const { token } = await params;
  const ticket = await getTicketClaim(token);
  if (!ticket) notFound();

  const { event, club } = ticket;
  const date = formatEventDate(event.startAt);
  const used = ticket.status === "checked_in";
  const usedAt = used ? formatTime(ticket.checkedInAt) : null;
  const holder = [ticket.assignedToName && `Entrada de ${ticket.assignedToName}`, ticket.tierName]
    .filter(Boolean)
    .join(" · ");

  return (
    <article className="mx-auto w-full max-w-md pb-16">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {event.imageUrl ? (
          // Imagen del backend en un host que no controlamos: <img> directo, sin
          // pasar por el optimizador de next/image (que exigiría remotePatterns).
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={event.imageUrl}
            alt=""
            referrerPolicy="no-referrer"
            fetchPriority="high"
            className="absolute inset-0 size-full object-cover"
          />
        ) : (
          <div aria-hidden="true" className="absolute inset-0 bg-nv-gradient" />
        )}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-nv-bg via-nv-bg/30 to-transparent"
        />
      </div>

      <div className="relative -mt-12 px-5">
        <h1 className="text-balance text-4xl leading-[1.05] font-extrabold tracking-tight text-white">
          {event.title}
        </h1>
        <p className="mt-3 text-lg font-bold text-white">{club.name}</p>
        {(date || event.city) && (
          <p className="mt-1 text-nv-muted">{[date, event.city].filter(Boolean).join(" · ")}</p>
        )}
        {holder && <p className="mt-4 text-sm text-nv-dim">{holder}</p>}

        {used ? (
          <div
            role="status"
            className="mt-8 rounded-3xl bg-nv-warning/10 px-6 py-10 text-center ring-1 ring-nv-warning/40 ring-inset"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="mx-auto size-10 text-nv-warning" fill="none">
              <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.8" />
              <path d="M12 7v5.5M12 16.2v.3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
            <p className="mt-4 text-xl font-extrabold text-nv-warning">Esta entrada ya se ha usado</p>
            {usedAt && <p className="mt-1 text-nv-warning/80">Validada a las {usedAt}</p>}
          </div>
        ) : (
          <div className="mt-8 rounded-3xl bg-white p-5">
            <TicketQr payload={ticket.qrPayload} />
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="nv-label text-nv-dim">Código de entrada</p>
          <p className="mt-2 font-mono text-3xl font-bold tracking-wider text-white select-all">
            {ticket.serial}
          </p>
        </div>

        {!used && (
          <p className="mt-6 flex items-center justify-center gap-2 text-sm text-nv-muted">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 shrink-0" fill="none">
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
              <path
                d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
            Sube el brillo de tu pantalla para que el QR se lea mejor
          </p>
        )}

        <section
          aria-label="Descarga NightVibe"
          className="mt-14 rounded-[2rem] bg-nv-surface px-6 py-10 text-center"
        >
          <p className="mx-auto max-w-xs text-balance font-bold text-white">
            Esta entrada te la ha compartido alguien con {siteConfig.name}.
          </p>
          <StoreButtons className="mt-6" align="center" />
        </section>
      </div>
    </article>
  );
}
