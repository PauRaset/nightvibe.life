import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  id?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as: Tag = "h2",
  id,
}: SectionHeadingProps) {
  const alignment = align === "center" ? "mx-auto text-center" : "";
  return (
    <div className={`max-w-2xl ${alignment}`}>
      {eyebrow && <p className="nv-label mb-4 text-nv-muted">{eyebrow}</p>}
      <Tag
        id={id}
        className="text-balance text-3xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl"
      >
        {title}
      </Tag>
      {description && (
        <p className="mt-5 text-pretty text-base leading-relaxed text-nv-muted sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
