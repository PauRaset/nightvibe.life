import { Container } from "../Container";
import { SectionHeading } from "../SectionHeading";

// Avatares abstractos: sin fotos ni nombres de personas.
const avatarStyles = [
  "linear-gradient(135deg, var(--nv-cyan), var(--nv-violet))",
  "linear-gradient(135deg, var(--nv-violet), var(--nv-magenta))",
  "linear-gradient(200deg, var(--nv-magenta), var(--nv-violet))",
  "linear-gradient(45deg, var(--nv-cyan), var(--nv-magenta))",
];

const plans = [
  { kind: "Club techno", going: 4, extra: 8 },
  { kind: "Sala de conciertos", going: 3, extra: 3 },
];

function AvatarStack({ count }: { count: number }) {
  return (
    <div className="flex -space-x-2.5" aria-hidden="true">
      {avatarStyles.slice(0, count).map((bg, i) => (
        <span
          key={i}
          className="size-9 rounded-full ring-3 ring-nv-bg"
          style={{ background: bg }}
        />
      ))}
    </div>
  );
}

export function SocialSection() {
  return (
    <section aria-labelledby="social-title" className="py-16 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <div className="order-2 space-y-3 lg:order-1">
          {plans.map((plan) => (
            <div key={plan.kind} className="flex items-center gap-4 rounded-3xl bg-nv-surface p-5">
              <AvatarStack count={plan.going} />
              <div className="min-w-0">
                <p className="font-bold text-white">{plan.kind}</p>
                <p className="text-sm text-nv-muted">
                  <span className="font-semibold text-white">+{plan.extra} van</span> esta noche
                </p>
              </div>
            </div>
          ))}
          <p className="px-1 pt-1 text-xs text-nv-dim">Ilustración con datos ficticios.</p>
        </div>
        <div className="order-1 lg:order-2">
          <SectionHeading
            id="social-title"
            eyebrow="Social"
            title="Mira a dónde van los tuyos."
            description="Sigue a tus amigos y ve en qué local están esta noche. Te apuntas o te vas a otro. Sin grupos, sin mensajes perdidos."
          />
        </div>
      </Container>
    </section>
  );
}
