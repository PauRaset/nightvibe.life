@AGENTS.md

# NightVibe — web pública

Web pública de NightVibe (https://nightvibe.life), app móvil (Flutter) de ocio nocturno
para el mercado catalán: descubrimiento de locales en tiempo real con un sistema de
"calor", promociones por niveles con misiones y premios, componente social (a dónde van
las personas que sigues) y compra fácil de entradas.

Dos públicos: gente que sale (`/`) y locales/discotecas (`/locales`, B2B). Además,
`/t/[token]`: la entrada que un comprador comparte con un acompañante (se enseña en la
puerta del local).

Stack: Next.js 16 (App Router, `src/`), TypeScript, Tailwind CSS v4 (`@theme`, sin
`tailwind.config`), zod, @sendgrid/mail, qrcode. Sin librerías de UI ni framer-motion.

## Fase actual: FASE 1

- Sin Stripe ni pagos en la web: las entradas se compran en la app.
- Llamadas a servidor, todas desde el servidor de Next (nunca desde el navegador):
  - `POST /api/contacto`: formulario de locales → SendGrid.
  - `/t/[token]` (Server Component) → `GET {API_BASE}/api/tickets/claim/<token>` del
    backend de NightVibe (público, sin auth). Lógica en `src/lib/ticketClaim.ts`;
    404 del backend → `not-found.tsx` de la ruta. Sin caché (`no-store`).
- `/t/[token]` lleva noindex y `referrer: no-referrer` (el token va en la URL). El QR se
  genera en el servidor con `qrcode` (SVG, negro sobre blanco): la página no necesita
  JavaScript para enseñarlo.
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
- Imágenes: solo de la app o de ambiente de noche real (nuestras o libres de derechos, con
  su crédito). Nada decorativo: si no hay una imagen buena, mejor ninguna. Nada de stock de
  gente, caras reconocibles ni rótulos o marcas de locales. Sin fuentes de terceros (salvo
  `next/font`).
- Botones de tiendas (`StoreButtons`): llevan los glifos de Apple y Android. El logo de
  Apple solo se puede usar dentro de su insignia oficial: al publicar la app, cambiar
  por las insignias oficiales de App Store y Google Play.
- Pantallas de la app: `AppScreen` (`src/components/app/AppScreen.tsx`). Con
  `siteConfig.appScreensReviewed = true` muestra las capturas de `public/screens/`
  (home, evento, misiones, entrada, panel; 1179×2556 px); si no, fragmentos de la app en
  HTML (estilo true-black-flat adaptado) con los datos de demo de `src/lib/demo.ts`: cada
  cifra que se repite es una sola variable (los 86 asistentes del evento protagonista). Las capturas deben hacerse con datos de demo: sin locales,
  artistas, direcciones ni caras reales, y sin el QR/serial de una entrada válida.
- Recompensas = MISIONES ("2 de 3 misiones"), nunca puntos. Cada local tiene 10 NIVELES;
  el premio del nivel 10 es mesa con botella. Los premios de la web son un ejemplo
  (márcalo visible): cada local define los suyos. El número del badge es gente que VA
  (asistentes confirmados), nunca gente "dentro" ni aforo.
  Ni "puntos", ni "pts", ni "acumula/suma".
- `/locales` no habla de precio, comisión ni cuotas: las condiciones se hablan en una
  reunión.
- Tono: directo, nocturno, frases cortas, sin exceso de exclamaciones. Español de España.
- `/locales` es más sobrio: menos glow, más claridad. El lector es un gerente.

## Sistema de diseño

Fuente única de los hex: `src/styles/tokens.css`. **No inventes hex nuevos.**

```css
--nv-cyan: #00E5FF;     /* inicio gradiente, lado frío */
--nv-violet: #7B5CFF;   /* centro, estado "subiendo", color de marca */
--nv-magenta: #FF2D9B;  /* final, "a reventar" */
--nv-bg: #06060B;       /* casi negro con un punto de azul (fondo de web y app) */
--nv-warning: #FFB020;  /* aviso, fuera de la escala de calor ("entrada ya usada") */
--nv-gradient: linear-gradient(135deg, #00E5FF 0%, #7B5CFF 50%, #FF2D9B 100%);
```

- Superficies (`--nv-surface`, `-strong`, `-raised`): escalones opacos del fondo TEÑIDOS
  DE AZUL de marca (color-mix), nunca gris neutro; elevación solo por luminosidad, sin
  bordes ni sombras en cards. Textos: blanco en opacidad, atenuado mínimo 0.5 (AA).
- Curvas de movimiento: `--ease-out` / `--ease-in-out` de tokens.css (no inventar otras).
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
- `--nv-warning` (`text-nv-warning`, `bg-nv-warning/10`) solo para estados de aviso.
  No uses la paleta de colores de Tailwind (`amber-*`, etc.): todo color sale de tokens.
- HeatBadge (componente de marca intocable): ASISTENTES CONFIRMADOS: 0 cian "SÉ EL
  PRIMERO" · 1–9 cian "EMPIEZA" · 10–49 violeta "SUBIENDO" · 50+ magenta "A REVENTAR"
  (lógica en `src/lib/heat.ts`). Latido: (1600 − asistentes × 18) ms, mínimo 700 ms
  (`beatMs`). El anillo se completa a los 50. Tamaño en em (lo fija el font-size).
- Premium = quitar. UN SOLO FONDO (`bg-nv-bg`) en toda la página: las secciones se separan
  por espacio (py-20 en móvil, sm:py-36), nunca por color; como mucho una superficie neutra
  (`bg-nv-surface`). Un mensaje por pantalla.
- El gradiente/escala de calor solo donde manda: el badge (halos y anillos), el logotipo,
  el CTA principal (`GradientButton`), los botones de acción circulares de la app ("Voy")
  y las barras de progreso (niveles, misiones). Nada más; nunca en fondos de sección.
- La app aún no está publicada: nada de "Descargar"; la cabecera dice "Próximamente"
  (enlace de texto al cierre) y las tiendas salen como "Próximamente en".
- Sin etiquetas encima de los títulos (eyebrows), sin bordes finos ni cards con
  contorno, sin numeraciones 01/02, sin glass/blur, sin sombras en reposo. Las
  MAYÚSCULAS con tracking quedan solo para estados en vivo ("EN VIVO", "SUBIENDO").
- Nada por debajo de 13px. Titulares de 2 líneas máximo a 390/768/1440.
- Entradas al hacer scroll: atributo `data-reveal-item` (o `data-reveal-grow` para barras)
  + `<Reveal />` montado en la página (no en el layout). Sin JS o con reduced-motion todo
  se ve.
- Momentos animados de la home: `HeatScroll` (sección fijada en svh; rAF + scroll pasivo,
  escribe en el DOM, nunca estado React por frame) y el universo (`UniverseCanvas`, Canvas
  que se pausa fuera de pantalla, sobre un SVG estático de `src/lib/universe.ts`). Sin JS
  o con reduced-motion: estado final estático.
- Solo modo oscuro. Mobile-first (tráfico desde Instagram/WhatsApp, revisar a 375px).
- Toda animación en CSS, con `motion-safe:` y desactivada por `prefers-reduced-motion`.
- Tipografía provisional: Plus Jakarta Sans, definida SOLO en `src/lib/fonts.ts`.

## Configuración

- Todos los datos de contacto, URLs de stores, redes y datos legales viven en
  `src/config/site.ts`. El email de contacto es UNA constante: `CONTACT_EMAIL` (arriba
  del todo en site.ts); de ella salen `contactEmail`, `legal.email` y
  `legal.privacyEmail`. Nada hardcodeado fuera de ahí. Los placeholders tienen la forma
  `[TODO: ...]`.
- Env vars (solo servidor, nunca `NEXT_PUBLIC_`): `SENDGRID_API_KEY`, `CONTACT_TO_EMAIL`,
  `CONTACT_FROM_EMAIL`, `API_BASE` (URL del backend, p. ej. `https://api.nightvibe.life`).
  Ver `.env.example`.
- Páginas legales: mientras `siteConfig.legalPagesReady` sea false llevan noindex, no
  salen en el sitemap ni en el footer. Llevan el comentario "REVISAR POR ASESOR LEGAL ANTES DE PUBLICAR"
  (nunca visible en la UI).

## Comandos

- `npm run dev`, `npm run lint`, `npm run build`. Lint y build deben pasar limpios.
