@AGENTS.md

# NightVibe — web pública

Web pública de NightVibe (https://nightvibe.life), app móvil (Flutter) de ocio nocturno
para el mercado catalán: descubrimiento de locales en tiempo real con un sistema de
"calor", promociones por niveles con misiones y premios, componente social (a dónde van
las personas que sigues) y compra fácil de entradas.

Dos públicos: gente que sale (`/`) y locales/discotecas (`/locales`, B2B).

Stack: Next.js 16 (App Router, `src/`), TypeScript, Tailwind CSS v4 (`@theme`, sin
`tailwind.config`), zod, @sendgrid/mail. Sin librerías de UI ni framer-motion.

## Fase actual: FASE 1

- Sin backend de producción, sin Stripe ni pagos, sin eventos reales.
- Única llamada a servidor: `POST /api/contacto` (formulario de locales → SendGrid).
- Las rutas de deep linking `/e`, `/c`, `/u` son FASE 2: no crearlas todavía.
- Sin cookies no esenciales ni analytics → sin banner de cookies. Si se añaden, primero
  banner de consentimiento y actualizar `/cookies`.

## Restricción de intermediario (obligatoria)

NightVibe es una PLATAFORMA INTERMEDIARIA. Ningún texto puede dar a entender que
NightVibe organiza eventos ni que representa a locales concretos. Los eventos, premios y
promociones son de cada local.

## Reglas de contenido

- NO uses nombres de locales reales. En mockups: tipo de local + zona genérica
  ("Club techno", "Zona puerto").
- Sin imágenes, stock photos ni fuentes de terceros (salvo `next/font`). Ilustraciones
  en HTML/CSS/SVG inline. Excepción: capturas reales de la app en `public/screens/`,
  dentro de `PhoneMockup` (1179×2556 px, sin nombres de locales reales).
- Tono: directo, nocturno, frases cortas, sin exceso de exclamaciones. Español de España.
- `/locales` es más sobrio: menos glow, más claridad. El lector es un gerente.

## Sistema de diseño

Fuente única de los hex: `src/styles/tokens.css`. **No inventes hex nuevos.**

```css
--nv-cyan: #00E5FF;     /* inicio gradiente, lado frío */
--nv-violet: #7B5CFF;   /* centro, estado "subiendo", color de marca */
--nv-magenta: #FF2D9B;  /* final, "a reventar" */
--nv-bg: #0A0C12;       /* negro noche */
--nv-app-bg: #06060B;   /* fondo de la app; solo placeholder de capturas */
--nv-gradient: linear-gradient(135deg, #00E5FF 0%, #7B5CFF 50%, #FF2D9B 100%);
```

- Superficies y textos se derivan del fondo con blanco en opacidad (`--nv-surface`,
  `--nv-text-muted`, etc.). Texto atenuado mínimo 0.5 de opacidad (AA).
- El violeta puro no llega a AA en texto pequeño: usa `text-nv-violet-text`.
- Sobre el gradiente, texto negro (`text-black`): es el único que cumple AA en todo el
  recorrido.
- Contextos sin CSS (next/og, `themeColor`) leen los hex desde tokens.css vía
  `src/lib/tokens.ts`. No dupliques hex en TS.
- Clases Tailwind: `bg-nv-*`, `text-nv-*`, utilidades `bg-nv-gradient`,
  `text-nv-gradient`, `nv-label` (etiqueta de estado en mayúsculas con tracking).
- El gradiente es una ESCALA DE CALOR: úsalo con significado (intensidad, energía, CTA
  principal), no como relleno decorativo. Profundidad con gradiente, glows suaves y capas;
  NUNCA bordes neón cian alrededor de cards.
- HeatBadge: <40 cian "TRANQUILO", 40–74 violeta "SUBIENDO", >=75 magenta "A REVENTAR"
  (lógica en `src/lib/heat.ts`).
- Solo modo oscuro. Mobile-first (tráfico desde Instagram/WhatsApp, revisar a 375px).
- Toda animación en CSS, con `motion-safe:` y desactivada por `prefers-reduced-motion`.
- Tipografía provisional: Plus Jakarta Sans, definida SOLO en `src/lib/fonts.ts`.

## Configuración

- Todos los datos de contacto, URLs de stores, redes y datos legales viven en
  `src/config/site.ts`. Nada hardcodeado fuera de ahí. Los placeholders tienen la forma
  `[TODO: ...]`.
- Env vars (solo servidor): `SENDGRID_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`.
  Ver `.env.example`.
- Páginas legales: mientras `siteConfig.legalPagesReady` sea false llevan noindex, no
  salen en el sitemap ni en el footer. Llevan el comentario "REVISAR POR ASESOR LEGAL ANTES DE PUBLICAR"
  (nunca visible en la UI).

## Comandos

- `npm run dev`, `npm run lint`, `npm run build`. Lint y build deben pasar limpios.
