import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-nv-surface-strong px-6 py-3 text-base font-bold text-white transition-[background-color,transform] duration-200 hover:bg-white/14 active:scale-[0.97]";

type LinkVariant = { href: string; children: ReactNode; className?: string };
type ButtonVariant = ComponentPropsWithoutRef<"button"> & { href?: undefined };

export function GhostButton(props: LinkVariant | ButtonVariant) {
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
