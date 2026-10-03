import { ImageResponse } from "next/og";
import { brandTokens } from "@/lib/tokens";

// Icono PROVISIONAL hasta tener el logo definitivo.
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 16,
          background: brandTokens.gradient,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 42,
            fontWeight: 800,
            color: brandTokens.bg,
            lineHeight: 1,
          }}
        >
          N
        </div>
      </div>
    ),
    size,
  );
}
