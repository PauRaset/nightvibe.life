import Link from "next/link";
import { isPlaceholder, legalLinks, navLinks, siteConfig } from "@/config/site";
import { Container } from "./Container";

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
    <footer className="mt-auto pt-20 pb-10 sm:pt-36">
      <Container>
        <p
          aria-hidden="true"
          className="text-[19vw] leading-[0.8] font-extrabold tracking-[-0.06em] text-white sm:text-[17vw] xl:text-[208px]"
        >
          {siteConfig.name}
        </p>

        <div className="mt-14 grid gap-10 sm:grid-cols-12">
          <p className="max-w-sm text-base leading-relaxed text-white sm:col-span-5">
            {siteConfig.name} es una plataforma para descubrir la noche y comprar entradas. Los
            eventos, las misiones y los premios son de cada local.
          </p>

          <nav aria-label="Secciones" className="sm:col-span-3 sm:col-start-7">
            <h2 className="text-base font-bold text-white">La app</h2>
            <ul className="mt-2 text-base">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="inline-block py-2.5 text-nv-muted transition-colors hover:text-white">
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
                    className="inline-block py-2.5 text-nv-muted transition-colors hover:text-white"
                  >
                    {socialLabels[key]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="sm:col-span-3">
            <h2 className="text-base font-bold text-white">Contacto</h2>
            <ul className="mt-2 text-base">
              <li>
                <Link href="/locales#contacto" className="inline-block py-2.5 text-nv-muted transition-colors hover:text-white">
                  Tengo un local
                </Link>
              </li>
              {!isPlaceholder(siteConfig.contactEmail) && (
                <li>
                  <a
                    href={`mailto:${siteConfig.contactEmail}`}
                    className="inline-block py-2.5 text-nv-muted transition-colors hover:text-white"
                  >
                    {siteConfig.contactEmail}
                  </a>
                </li>
              )}
              {siteConfig.legalPagesReady &&
                legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="inline-block py-2.5 text-nv-muted transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex items-center justify-between gap-4">
          <p className="text-[13px] text-nv-dim">
            © {year} {siteConfig.name}
          </p>
          <Link
            href="/#descargar"
            className="inline-flex min-h-11 items-center rounded-full bg-nv-surface-strong px-5 text-base font-bold text-white transition-[background-color,transform] hover:bg-white/14 active:scale-[0.97]"
          >
            Descargar
          </Link>
        </div>
      </Container>
    </footer>
  );
}
