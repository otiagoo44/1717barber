# 17:17 Barbería

HTML, CSS y JavaScript nativos. Tres páginas estáticas, sin dependencias de runtime y sin backend.

```powershell
npm run dev
```

Vista local: http://127.0.0.1:4174. `npm run build` genera `dist/`, `index.html`, `rulos/index.html` y `productos/index.html`. `npm test` verifica contratos comerciales, WhatsApp, SEO y assets. Los HTML son generados: editar `src/`, no los HTML a mano.

## Editar contenido

`src/data.mjs` centraliza precios, medios, servicios, productos, testimonios, fundadores y respuestas. Los campos `null` son pendientes explícitos. Cada placeholder tiene un ID estable. Después de editar, ejecutar `npm run build` y refrescar el navegador.

- Medios: completar `src`, `alt`, `width`, `height`, `position`; guardar la versión WebP y la variante `-600.webp` en `public/assets/media/`. Los originales siguen en `img/`.
- Productos: completar `image`, `price`, `shine`, `hold` sólo con información verificada; `availability` empieza en «Consultar».
- Fundadores: completar `name`, `role`, `specialty`, `bio`, `image`. La foto general del equipo no asigna identidades.
- Testimonios: se publican sólo al completar `quote`, `name`, `source`. `image`, `context`, `video` son opcionales. No insertar ratings inventados.
- Videos testimoniales: `testimonialVideo` y `rulosTestimonialVideo` son fuentes separadas. Completar `url` y `thumbnail` para abrir la experiencia real sin cargar un embed; el video general no se reutiliza como prueba de rulos.
- Reels: completar URL exacta y thumbnail. Al tocar se abre Instagram; no se cargan embeds.
- Rulos: confirmar detalles, cuidados, FAQ y proceso antes de sustituir pendientes. `rulosProcess[].confirmed` controla si el proceso está validado.

## Diseño y SEO

`DESIGN.md` es la autoridad. `public/assets/tokens.css` proviene del export de Google DESIGN.md 0.4.0, con `@theme` convertido a `:root` para CSS nativo. No hay Tailwind instalado. La CLI está en la skill local y sólo se usa para mantenimiento, no durante el deploy.

El repo original no contenía dominio canonical confirmado. Definir `SITE_URL=https://dominio-confirmado` en el entorno de build. En Vercel, `VERCEL_PROJECT_PRODUCTION_URL` también activa canonical, Open Graph absoluto y sitemap. Sin dominio, esos campos se omiten para evitar inventar una URL. `robots.txt` y HairSalon structured data se generan siempre. `vercel.json` configura el build estático y rutas, sin SPA rewrites.

## QA de navegador

Las herramientas de QA no están en el bundle. Instalar `puppeteer-core`, `@axe-core/puppeteer` y `lighthouse` en un directorio de herramientas independiente, definir `QA_TOOLS_DIR` y `CHROME_PATH`, iniciar `npm run dev` y ejecutar:

```powershell
$env:QA_TOOLS_DIR='C:/ruta/herramientas-qa'
$env:CHROME_PATH='C:/Program Files/Google/Chrome/Application/chrome.exe'
node scripts/qa-browser.mjs
node scripts/qa-polish.mjs
node scripts/capture-qa.mjs
```

Resultados y capturas: `docs/qa/`. Informe comercial y material que falta pedir al cliente: `docs/REDESIGN_1717_REPORT.md`.
