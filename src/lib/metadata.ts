import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

type PageMetaInput = {
  title: string;
  /** Título sin la plantilla "%s · NightVibe" del layout. */
  absoluteTitle?: boolean;
  /** Imagen OG de la página (por defecto, la de la home). */
  image?: string;
  description: string;
  path: string;
  noindex?: boolean;
};

// Definir openGraph/twitter en una página reemplaza los del layout, incluida la
// imagen generada en src/app/opengraph-image.tsx, así que se añade explícitamente.
export const ogImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${siteConfig.name}: ${siteConfig.shortDescription}`,
};

export function pageMetadata({ title, absoluteTitle, image, description, path, noindex }: PageMetaInput): Metadata {
  const socialTitle = title.includes(siteConfig.name) ? title : `${title} · ${siteConfig.name}`;
  const img = image ? { ...ogImage, url: image, alt: socialTitle } : ogImage;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    ...(noindex && { robots: { index: false, follow: true } }),
    openGraph: {
      title: socialTitle,
      description,
      url: path,
      siteName: siteConfig.name,
      locale: "es_ES",
      type: "website",
      images: [img],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [img],
    },
  };
}
