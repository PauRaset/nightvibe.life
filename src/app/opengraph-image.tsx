import { ogSize, renderOg } from "@/lib/og";

export const alt = "NightVibe · La noche, en directo: «Esta noche ya van 86», con el badge de calor A REVENTAR";
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOg({ lines: ["Esta noche", "ya van"] });
}
