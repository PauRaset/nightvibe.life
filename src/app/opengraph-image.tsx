import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";
import { brandTokens } from "@/lib/tokens";

export const alt = `${siteConfig.name}: ${siteConfig.shortDescription}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const { bg, gradient, violet, magenta } = brandTokens;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          background: bg,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -160,
            top: -160,
            width: 620,
            height: 620,
            borderRadius: 620,
            background: gradient,
            opacity: 0.35,
            filter: "blur(90px)",
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 132,
            fontWeight: 800,
            letterSpacing: -4,
            backgroundImage: gradient,
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {siteConfig.name}
        </div>
        <div style={{ display: "flex", marginTop: 16, fontSize: 44, color: "white", fontWeight: 700 }}>
          {siteConfig.shortDescription}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 48,
            width: 520,
            height: 10,
            borderRadius: 10,
            background: gradient,
            boxShadow: `0 0 40px ${violet}, 0 0 80px ${magenta}`,
          }}
        />
      </div>
    ),
    size,
  );
}
