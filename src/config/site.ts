// Configuración central del sitio. Ningún dato de contacto, URL externa o dato
// legal debe estar hardcodeado fuera de este archivo.

export const siteConfig = {
  name: "NightVibe",
  siteUrl: "https://nightvibe.life",
  description:
    "Descubre dónde está la noche ahora mismo. Calor en tiempo real, promociones por niveles, a dónde van tus amigos y entradas en el móvil.",
  shortDescription: "La noche, en tiempo real.",

  // TODO: email de contacto público definitivo.
  contactEmail: "[TODO: email de contacto]",

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

  // TODO: datos del titular (LSSI-CE art. 10). Se muestran en las páginas legales.
  legal: {
    holder: "[TODO: razón social del titular]",
    nif: "[TODO: NIF/CIF]",
    address: "[TODO: domicilio social completo]",
    registry: "[TODO: datos de inscripción en el Registro Mercantil]",
    email: "[TODO: email de contacto legal]",
    privacyEmail: "[TODO: email para ejercicio de derechos RGPD]",
    dpo: "[TODO: delegado de protección de datos, si aplica]",
    minimumAge: "[TODO: edad mínima de uso, p. ej. 18]",
    lastUpdated: "[TODO: fecha de última actualización]",
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
