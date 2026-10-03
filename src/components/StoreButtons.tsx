import { siteConfig } from "@/config/site";

// Botones propios (sin badges oficiales ni imágenes de terceros).
// Si la URL de la store está vacía en site.ts se muestran como "Próximamente".

type Store = { key: keyof typeof siteConfig.stores; name: string; platform: string };

const stores: Store[] = [
  { key: "appStore", name: "App Store", platform: "iPhone" },
  { key: "googlePlay", name: "Google Play", platform: "Android" },
];

function PhoneIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6 shrink-0" fill="none">
      <rect x="6" y="2.5" width="12" height="19" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M10.5 18h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

type StoreButtonsProps = { className?: string; align?: "left" | "center" };

export function StoreButtons({ className = "", align = "left" }: StoreButtonsProps) {
  const justify = align === "center" ? "justify-center" : "justify-start";
  return (
    <ul className={`flex flex-wrap gap-3 ${justify} ${className}`}>
      {stores.map((store) => {
        const url = siteConfig.stores[store.key];
        const content = (
          <>
            <PhoneIcon />
            <span className="flex flex-col text-left leading-tight">
              <span className="text-xs font-medium text-nv-muted">
                {url ? `Descárgala para ${store.platform}` : "Próximamente en"}
              </span>
              <span className="text-base font-bold text-white">{store.name}</span>
            </span>
          </>
        );
        const classes =
          "flex min-h-14 min-w-44 items-center gap-3 rounded-2xl bg-nv-surface-strong px-4 py-2.5 ring-1 ring-white/12 ring-inset";
        return (
          <li key={store.key}>
            {url ? (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${classes} transition-colors hover:bg-white/12`}
              >
                {content}
              </a>
            ) : (
              <span className={classes} aria-disabled="true">
                {content}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
