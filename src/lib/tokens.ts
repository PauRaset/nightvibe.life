import { readFileSync } from "node:fs";
import { join } from "node:path";

// Lee los hex de marca desde src/styles/tokens.css para los contextos que no
// pueden usar CSS (next/og, themeColor). Así tokens.css sigue siendo la única
// fuente. Solo se usa en servidor / build.
const css = readFileSync(join(process.cwd(), "src/styles/tokens.css"), "utf8");

function token(name: string): string {
  const match = css.match(new RegExp(`--${name}:\\s*([^;]+);`));
  if (!match) throw new Error(`Token --${name} no encontrado en tokens.css`);
  return match[1].trim();
}

export const brandTokens = {
  cyan: token("nv-cyan"),
  violet: token("nv-violet"),
  magenta: token("nv-magenta"),
  bg: token("nv-bg"),
  gradient: token("nv-gradient"),
};
