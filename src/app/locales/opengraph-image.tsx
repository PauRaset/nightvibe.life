import { ogSize, renderOg } from "@/lib/og";

export const alt = "NightVibe para locales · Llena tu sala esta noche, con el badge de calor 86 A REVENTAR";
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOg({ lines: ["Llena tu sala", "esta noche."], kicker: "Para locales" });
}
