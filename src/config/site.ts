// Configuración central del sitio. Ningún dato de contacto, URL externa o dato
// legal debe estar hardcodeado fuera de este archivo.

// EMAIL DE CONTACTO: el único sitio donde se cambia. Lo usan el footer, el aviso
// legal, los términos y la política de privacidad. Mientras sea un placeholder
// "[TODO: …]" el footer no lo muestra.
// (El destino de los mensajes del formulario es otra cosa: la variable de entorno
// CONTACT_TO_EMAIL del servidor; normalmente será esta misma dirección.)
export const CONTACT_EMAIL = "tickets@nightvibe.life";

export const siteConfig = {
  name: "NightVibe",
  siteUrl: "https://nightvibe.life",
  description:
    "Mira qué locales se están llenando esta noche y a dónde van los tuyos. Entradas con QR y premios reales en cada local.",
  shortDescription: "La noche, en directo",

  contactEmail: CONTACT_EMAIL,

  // TODO: URLs de las stores. Vacías = el botón se muestra como "Próximamente".
  stores: {
    appStore: "",
    googlePlay: "",
  },

  // TODO: perfiles de redes sociales. Vacíos = no se muestran.
  social: {
    instagram: "",
    tiktok: "",
  },

  // Titular de la web y responsable de los datos (persona física: NightVibe aún
  // no es una actividad dada de alta). Se muestran en las páginas legales.
  legal: {
    holder: "Pau Raset Soler",
    // Mismo email por defecto; sepáralos aquí si el asesor legal lo pide.
    email: CONTACT_EMAIL,
    privacyEmail: CONTACT_EMAIL,
    lastUpdated: "octubre de 2026",
  },

  // Capturas reales de la app en public/screens/ (home.png, evento.png,
  // entrada.png; 1179×2556 px). Mientras sea false la web muestra los
  // fragmentos de la app construidos en HTML con datos ficticios. Pásalo a true
  // SOLO cuando las capturas estén hechas con datos de demo: sin locales,
  // artistas, direcciones ni caras reales, y sin un QR o serial de una entrada
  // válida.
  appScreensReviewed: false,

  // Mientras sea false, las páginas legales llevan noindex, salen del sitemap y
  // no se enlazan desde el footer. Siguen accesibles por URL directa porque el
  // formulario de /locales enlaza a /privacidad para el consentimiento RGPD.
  // TODO: pasar a true cuando el asesor legal haya revisado los textos.
  legalPagesReady: false,
} as const;

export const navLinks = [
  { href: "/#calor", label: "Calor" },
  { href: "/#los-tuyos", label: "Los tuyos" },
  { href: "/#niveles", label: "Niveles" },
  { href: "/locales", label: "Para locales" },
] as const;

export const legalLinks = [
  { href: "/aviso-legal", label: "Aviso legal" },
  { href: "/privacidad", label: "Privacidad" },
  { href: "/terminos", label: "Términos" },
  { href: "/cookies", label: "Cookies" },
] as const;

/** true si el valor sigue siendo un placeholder "[TODO: ...]". */
export function isPlaceholder(value: string): boolean {
  return value.trim() === "" || value.startsWith("[TODO");
}
