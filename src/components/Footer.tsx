import Link from "next/link";
import { isPlaceholder, legalLinks, navLinks, siteConfig } from "@/config/site";
import { Container } from "./Container";
import { Logo } from "./Logo";

const socialLabels: Record<keyof typeof siteConfig.social, string> = {
  instagram: "Instagram",
  tiktok: "TikTok",
};

export function Footer() {
  const year = new Date().getFullYear();
  const socials = (Object.keys(siteConfig.social) as (keyof typeof siteConfig.social)[]).filter(
    (key) => siteConfig.social[key],
  );

  return (
    <footer className="mt-auto border-t border-nv-line">
      <Container className="grid gap-10 py-12 sm:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-3 text-sm leading-relaxed text-nv-muted">
            Plataforma para descubrir la noche y comprar entradas. Los eventos los organiza cada
            local.
          </p>
        </div>

        <nav aria-label="Secciones">
          <h2 className="nv-label text-nv-dim">NightVibe</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-nv-muted hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
            {!isPlaceholder(siteConfig.contactEmail) && (
              <li>
                <a href={`mailto:${siteConfig.contactEmail}`} className="text-nv-muted hover:text-white">
                  Contacto
                </a>
              </li>
            )}
            {socials.map((key) => (
              <li key={key}>
                <a
                  href={siteConfig.social[key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-nv-muted hover:text-white"
                >
                  {socialLabels[key]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Legal">
          <h2 className="nv-label text-nv-dim">Legal</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-nv-muted hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
      <Container className="border-t border-nv-line py-6">
        <p className="text-xs text-nv-dim">
          © {year} {siteConfig.name}. Todos los derechos reservados.
        </p>
      </Container>
    </footer>
  );
}
