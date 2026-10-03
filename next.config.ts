import type { NextConfig } from "next";

// Deep linking (Universal Links / App Links) para las rutas de fase 2: /e, /c, /u.
// Los archivos viven en public/.well-known/ con placeholders.
// TODO: el bundle ID de iOS actual es PROVISIONAL y cambiará antes de publicar en
// App Store. No rellenar TEAMID.BUNDLE_ID (ni package_name / sha256 de Android)
// hasta tener los valores definitivos.
const jsonHeaders = [{ key: "Content-Type", value: "application/json" }];

const nextConfig: NextConfig = {
  headers() {
    return [
      { source: "/.well-known/apple-app-site-association", headers: jsonHeaders },
      { source: "/.well-known/assetlinks.json", headers: jsonHeaders },
    ];
  },
};

export default nextConfig;
