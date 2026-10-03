import type { ReactNode } from "react";
import { siteConfig } from "@/config/site";
import { Container } from "../Container";

export type LegalSection = { id: string; title: string; content: ReactNode };

type LegalLayoutProps = {
  title: string;
  intro?: ReactNode;
  sections: LegalSection[];
};

const prose =
  "text-[0.9375rem] leading-relaxed text-nv-muted [&_a]:font-semibold [&_a]:text-white [&_a]:underline [&_a]:underline-offset-2 [&_h3]:mt-6 [&_h3]:font-bold [&_h3]:text-white [&_li]:mt-2 [&_p]:mt-4 [&_strong]:text-white [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-5 [&_table]:mt-4 [&_table]:w-full [&_table]:text-left [&_table]:text-sm [&_th]:border-b [&_th]:border-nv-line [&_th]:py-2 [&_th]:pr-3 [&_th]:text-white [&_td]:border-b [&_td]:border-nv-line [&_td]:py-2 [&_td]:pr-3 [&_td]:align-top";

export function LegalLayout({ title, intro, sections }: LegalLayoutProps) {
  return (
    <Container size="narrow" className="py-14 sm:py-20">
      <p className="nv-label text-nv-dim">Legal</p>
      <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">{title}</h1>
      <p className="mt-4 text-sm text-nv-dim">Última actualización: {siteConfig.legal.lastUpdated}</p>
      {intro && <div className={`mt-6 ${prose}`}>{intro}</div>}

      <nav aria-label="Índice" className="mt-10 rounded-2xl bg-nv-surface p-5">
        <p className="nv-label text-nv-dim">Índice</p>
        <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm text-nv-muted marker:text-nv-dim">
          {sections.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="hover:text-white">
                {s.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-12 space-y-12">
        {sections.map((s, i) => (
          <section key={s.id} id={s.id} aria-labelledby={`${s.id}-t`} className="scroll-mt-24">
            <h2 id={`${s.id}-t`} className="text-xl font-bold text-white sm:text-2xl">
              {i + 1}. {s.title}
            </h2>
            <div className={prose}>{s.content}</div>
          </section>
        ))}
      </div>
    </Container>
  );
}
