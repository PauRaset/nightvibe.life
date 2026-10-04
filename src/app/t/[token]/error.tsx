"use client";

import { Container } from "@/components/Container";
import { GradientButton } from "@/components/GradientButton";

// Backend caído, timeout o respuesta inesperada. En la puerta lo útil es reintentar.
export default function TicketError({ retry }: { retry: () => void }) {
  return (
    <Container size="narrow" className="flex flex-col items-center py-24 text-center sm:py-32">
      <h1 className="text-balance text-4xl font-extrabold tracking-tight text-white">
        No hemos podido cargar tu entrada.
      </h1>
      <p className="mt-5 max-w-sm text-nv-muted">Revisa tu conexión y vuelve a intentarlo.</p>
      <GradientButton onClick={() => retry()} className="mt-10">
        Reintentar
      </GradientButton>
    </Container>
  );
}
