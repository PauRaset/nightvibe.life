import { siteConfig } from "@/config/site";

// Botones propios con el icono de cada plataforma. Si la URL de la store está
// vacía en site.ts se muestran como "Próximamente".
// MARCAS: el logo de Apple solo puede usarse dentro de la insignia oficial de
// Apple. Cuando la app esté publicada, sustituir estos botones por las
// insignias oficiales ("Download on the App Store" / "Disponible en Google Play").

type Store = { key: keyof typeof siteConfig.stores; name: string; platform: string };

const stores: Store[] = [
  { key: "appStore", name: "App Store", platform: "iPhone" },
  { key: "googlePlay", name: "Google Play", platform: "Android" },
];

// Glifos de Simple Icons (CC0), en el color del texto.
const icons: Record<Store["key"], string> = {
  appStore:
    "M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701",
  googlePlay:
    "M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4483-.9993.9993-.9993c.5511 0 .9993.4483.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4483.9993.9993 0 .5511-.4483.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.2439 13.8533 7.8508 12 7.8508s-3.5902.3931-5.1367 1.0989L4.841 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3435-4.1021-2.6892-7.5743-6.1185-9.4396",
};

function StoreIcon({ store }: { store: Store["key"] }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6 shrink-0 text-white" fill="currentColor">
      <path d={icons[store]} />
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
            <StoreIcon store={store.key} />
            <span className="flex flex-col text-left leading-tight">
              <span className="text-[13px] font-medium text-nv-muted">
                {url ? `Descárgala para ${store.platform}` : "Próximamente en"}
              </span>
              <span className="text-base font-bold text-white">{store.name}</span>
            </span>
          </>
        );
        const classes =
          "flex min-h-14 min-w-44 items-center gap-3 rounded-full bg-nv-surface-strong py-2.5 pr-6 pl-5";
        return (
          <li key={store.key}>
            {url ? (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${classes} transition-[background-color,transform] hover:bg-white/14 active:scale-[0.97]`}
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
