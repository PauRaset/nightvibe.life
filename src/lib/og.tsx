import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";
import { brandTokens } from "@/lib/tokens";

// Imagen Open Graph (1200×630) en el estilo de la web: fondo de marca, titular
// bold blanco, el badge de calor (86 · A REVENTAR, anillo magenta lleno) y el
// logotipo con su gradiente. Sin fotos. Los hex salen de tokens.css vía
// brandTokens. Tipografía: Plus Jakarta Sans (OFL), la misma de la web; next/og
// no puede usar next/font, así que se lee el archivo de src/assets/fonts.

export const ogSize = { width: 1200, height: 630 };

const fontDir = join(process.cwd(), "src/assets/fonts");

type OgInput = { lines: [string, string]; kicker?: string; attendees?: number; label?: string };

export async function renderOg({ lines, kicker, attendees = 86, label = "A REVENTAR" }: OgInput) {
  const [extraBold, bold] = await Promise.all([
    readFile(join(fontDir, "PlusJakartaSans-ExtraBold.woff")),
    readFile(join(fontDir, "PlusJakartaSans-Bold.woff")),
  ]);
  const { bg, gradient, magenta } = brandTokens;
  const RING = 300;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: bg,
          padding: "64px 80px",
          fontFamily: "Jakarta",
          position: "relative",
        }}
      >
        {/* Halo del badge: radial con paradas explícitas que llega a transparente
            (next/og no respeta closest-side), centrado detrás del anillo. */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 25,
            width: 540,
            height: 540,
            background: `radial-gradient(circle at center, ${magenta}59 0%, ${magenta}26 32%, ${magenta}00 68%)`, // taste-skill-ignore: halo del badge (marca)
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div
              style={{
                display: "flex",
                fontSize: 44,
                fontWeight: 800,
                letterSpacing: -1,
                backgroundImage: gradient,
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {siteConfig.name}
            </div>
            {kicker && (
              <div style={{ display: "flex", fontSize: 26, fontWeight: 700, color: "rgba(255,255,255,0.6)" }}>
                {kicker}
              </div>
            )}
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 104, fontWeight: 800, color: "white", letterSpacing: -4, lineHeight: 1 }}>
            <div style={{ display: "flex" }}>{lines[0]}</div>
            <div style={{ display: "flex" }}>{lines[1]}</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 22, width: 380 }}>
          {/* Anillo lleno: círculo sólido magenta con el disco oscuro dentro (sin costura). */}
          <div
            style={{
              display: "flex",
              width: RING,
              height: RING,
              borderRadius: RING,
              background: magenta,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                width: RING - 32,
                height: RING - 32,
                borderRadius: RING,
                background: bg,
                alignItems: "center",
                justifyContent: "center",
                fontSize: 128,
                fontWeight: 800,
                color: "white",
                letterSpacing: -4,
              }}
            >
              {attendees}
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 700, letterSpacing: 6, color: magenta }}>{label}</div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Jakarta", data: extraBold, weight: 800, style: "normal" },
        { name: "Jakarta", data: bold, weight: 700, style: "normal" },
      ],
    },
  );
}
