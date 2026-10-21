import Link from "next/link";
import { imageCredits } from "@/config/credits";
import { isPlaceholder, legalLinks, navLinks, siteConfig } from "@/config/site";
import { Container } from "./Container";

const socialLabels: Record<keyof typeof siteConfig.social, string> = {
  instagram: "Instagram",
  tiktok: "TikTok",
};

// Color de cada bloque a lo largo de la escala de calor (cian → violeta →
// magenta), mezclado desde los tokens: sin hex nuevos.
function heatStop(t: number): string {
  if (t <= 0.5) {
    const p = Math.round((t / 0.5) * 100);
    return `color-mix(in oklab, var(--nv-violet) ${p}%, var(--nv-cyan))`;
  }
  const p = Math.round(((t - 0.5) / 0.5) * 100);
  return `color-mix(in oklab, var(--nv-magenta) ${p}%, var(--nv-violet))`;
}

/** La marca como un medidor: cada letra en su bloque, más alto y más caliente. */
function BlockMark() {
  const letters = siteConfig.name.toUpperCase().split("");
  const last = letters.length - 1;
  return (
    <div
      aria-hidden="true"
      className="flex h-[22svh] items-end gap-1 sm:h-[34svh] sm:max-h-[360px]"
    >
      {letters.map((letter, i) => {
        const t = last > 0 ? i / last : 1;
        return (
          <span
            key={i}
            className="flex flex-1 items-end justify-center pb-[0.08em] text-[clamp(28px,8.4vw,128px)] leading-none font-extrabold tracking-tight text-black"
            style={{ height: `${60 + t * 40}%`, background: heatStop(t) }}
          >
            {letter}
          </span>
        );
      })}
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const socials = (Object.keys(siteConfig.social) as (keyof typeof siteConfig.social)[]).filter(
    (key) => siteConfig.social[key],
  );

  return (
    <footer className="mt-auto bg-nv-bg pt-24 pb-8 sm:pt-32">
      <Container>
        <p className="sr-only">{siteConfig.name}</p>
        <BlockMark />

        <div className="mt-14 grid gap-10 sm:grid-cols-12">
          <p className="max-w-sm text-base leading-relaxed text-white sm:col-span-5">
            {siteConfig.name} es una plataforma para descubrir la noche y comprar entradas. Los
            eventos, las misiones y los premios son de cada local.
          </p>

          <nav aria-label="Secciones" className="sm:col-span-3 sm:col-start-7">
            <h2 className="text-base font-bold text-white">La app</h2>
            <ul className="mt-4 space-y-3 text-base">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-nv-muted transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
              {socials.map((key) => (
                <li key={key}>
                  <a
                    href={siteConfig.social[key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-nv-muted transition-colors hover:text-white"
                  >
                    {socialLabels[key]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="sm:col-span-3">
            <h2 className="text-base font-bold text-white">Contacto</h2>
            <ul className="mt-4 space-y-3 text-base">
              <li>
                <Link href="/locales#contacto" className="text-nv-muted transition-colors hover:text-white">
                  Tengo un local
                </Link>
              </li>
              {!isPlaceholder(siteConfig.contactEmail) && (
                <li>
                  <a
                    href={`mailto:${siteConfig.contactEmail}`}
                    className="text-nv-muted transition-colors hover:text-white"
                  >
                    {siteConfig.contactEmail}
                  </a>
                </li>
              )}
              {siteConfig.legalPagesReady &&
                legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-nv-muted transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex items-center justify-between gap-4">
          <div className="space-y-1 text-[13px] text-nv-dim">
            <p>
              © {year} {siteConfig.name}
            </p>
            {imageCredits.map((c) => (
              <p key={c.file}>
                Foto:{" "}
                <a href={c.source} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:text-white hover:underline">
                  {c.author}
                </a>{" "}
                ({c.licence})
              </p>
            ))}
          </div>
          <Link
            href="/#descargar"
            className="rounded-full bg-nv-surface-strong px-4 py-2 text-base font-bold text-white transition-[background-color,transform] hover:bg-white/14 active:scale-[0.97]"
          >
            Descargar
          </Link>
        </div>
      </Container>
    </footer>
  );
}
