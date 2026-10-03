import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
};

// Definir openGraph/twitter en una página reemplaza los del layout, incluida la
// imagen generada en src/app/opengraph-image.tsx, así que se añade explícitamente.
const ogImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${siteConfig.name}: ${siteConfig.shortDescription}`,
};

export function pageMetadata({ title, description, path }: PageMetaInput): Metadata {
  const socialTitle = title.includes(siteConfig.name) ? title : `${title} · ${siteConfig.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: socialTitle,
      description,
      url: path,
      siteName: siteConfig.name,
      locale: "es_ES",
      type: "website",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [ogImage],
    },
  };
}
