// Tipografía de marca PROVISIONAL (pendiente de confirmar).
// Para cambiarla, sustituye el import y la llamada: el resto del sitio usa
// la variable CSS --font-brand.
import { Plus_Jakarta_Sans } from "next/font/google";

export const brandFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-brand",
  display: "swap",
});
