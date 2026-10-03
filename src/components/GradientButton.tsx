import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

// CTA principal. Texto negro: sobre el gradiente es el único color que
// mantiene contraste AA en todo el recorrido cian → violeta → magenta.
const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-nv-gradient px-6 py-3 text-base font-extrabold text-black shadow-[0_8px_32px_-8px_var(--nv-violet)] transition-[transform,box-shadow] duration-200 hover:shadow-[0_10px_40px_-6px_var(--nv-magenta)] motion-safe:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0";

type LinkVariant = { href: string; children: ReactNode; className?: string };
type ButtonVariant = ComponentPropsWithoutRef<"button"> & { href?: undefined };

export function GradientButton(props: LinkVariant | ButtonVariant) {
  if (props.href !== undefined) {
    const { href, children, className = "" } = props;
    return (
      <Link href={href} className={`${base} ${className}`}>
        {children}
      </Link>
    );
  }
  const { className = "", children, type = "button", ...rest } = props;
  return (
    <button type={type} className={`${base} ${className}`} {...rest}>
      {children}
    </button>
  );
}
