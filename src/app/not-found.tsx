import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { GradientButton } from "@/components/GradientButton";
import { HeatBadge } from "@/components/HeatBadge";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <Container size="narrow" className="flex flex-col items-center py-24 text-center sm:py-32">
      <HeatBadge value={0} size="lg" />
      <p className="nv-label mt-8 text-nv-muted">Error 404</p>
      <h1 className="mt-3 text-balance text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
        Aquí no hay nadie.
      </h1>
      <p className="mt-5 max-w-sm text-nv-muted">
        Esta página no existe o se ha movido. La noche sigue en otra parte.
      </p>
      <GradientButton href="/" className="mt-10">
        Volver al inicio
      </GradientButton>
    </Container>
  );
}
