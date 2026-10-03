"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { navLinks } from "@/config/site";
import { Container } from "./Container";
import { Logo } from "./Logo";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-nv-line bg-nv-bg/80 backdrop-blur-lg">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Principal" className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              className="text-sm font-semibold text-nv-muted transition-colors hover:text-white aria-[current=page]:text-white"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#descargar"
            className="rounded-full bg-nv-gradient px-5 py-2.5 text-sm font-extrabold text-black"
          >
            Descargar
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="/#descargar"
            onClick={close}
            className="rounded-full bg-nv-gradient px-4 py-2 text-sm font-extrabold text-black"
          >
            Descargar
          </Link>
          <button
            type="button"
            className="flex size-11 items-center justify-center rounded-full text-white hover:bg-nv-surface"
            aria-expanded={open}
            aria-controls="menu-movil"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Cerrar menú" : "Abrir menú"}</span>
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {open && (
        <nav id="menu-movil" aria-label="Principal" className="border-t border-nv-line md:hidden">
          <Container className="flex flex-col py-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={close}
                className="py-3 text-lg font-bold text-white"
              >
                {link.label}
              </Link>
            ))}
          </Container>
        </nav>
      )}
    </header>
  );
}
