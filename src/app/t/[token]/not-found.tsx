import { Container } from "@/components/Container";

// El backend devuelve 404 si el token no existe o la entrada se reembolsó.
export default function TicketNotFound() {
  return (
    <Container size="narrow" className="flex flex-col items-center py-24 text-center sm:py-32">
      <h1 className="text-balance text-4xl font-extrabold tracking-tight text-white">
        Esta entrada ya no está disponible.
      </h1>
      <p className="mt-5 max-w-sm text-nv-muted">
        Puede que quien te la compartió la haya reasignado. Pregúntale.
      </p>
    </Container>
  );
}
