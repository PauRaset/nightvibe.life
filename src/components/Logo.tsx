import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex min-h-11 items-center text-xl font-extrabold tracking-tight text-nv-gradient ${className}`}
      aria-label={`${siteConfig.name}, ir al inicio`}
    >
      {siteConfig.name}
    </Link>
  );
}
