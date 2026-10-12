# QA verificado del contenido final — 2026-10-12

Sitio de `ae7a8ea` sobre la base `684688b`. Esta continuación conserva CSS, JS, motion, fuentes, imágenes y HTML comerciales. Herramientas externas: Puppeteer Core 25.13.0, Axe Puppeteer 4.13.0 y Lighthouse 13.5.0; Chrome 154. URL de QA `http://127.0.0.1:4174`, build estático dist. Todos los navegadores de QA se ejecutaron secuencialmente.

| Evidencia | Resultado |
| --- | --- |
| `qa.json` | 18 combinaciones × 900px de alto; cero overflow/imágenes rotas/errores/Axe. Enlaces, filtros, lightbox, FAQ, reduced motion y no-JS PASS |
| `final-content.json` | Perfiles, local, equipo, galería; skip link/foco y Tab/Shift+Tab en tres diálogos, menú móvil y catálogo PASS |
| `native-reels.json` | Cinco reels a 390, primero a 1440 y horizontal 844; reproducción real, pausa/seek, descarga sólo bajo interacción, cierre/foco PASS |
| `scroll-entry.json` | Ocho entradas monotónicas a 390/1440, sin parpadeo/replay; reduced motion dinámico y no-JS PASS |
| `source-audit.json` | Precio viejo independiente, sexto reel, TODO, secretos/tenant público y ratings ficticios ausentes; 71 originales presentes, 59 hashes coincidentes |
| `external-links.json`, `cal-*.png` | HTTP 200 en los cuatro destinos; Cal.com muestra horarios y todavía 40m/Cal Video. Ningún mensaje o reserva enviado |

`*-viewport.png` y `*-full.png`: Home/Rulos/Productos a 375/390/430/768/1024/1440, altura del viewport 900. Las capturas de reels usan las dimensiones que constan en su JSON. `*-comparison-board.png` contrasta before/verified a 390/768/1440; `*-review-board.png` reúne los seis tamaños. Las capturas de sección documentan perfiles y local en viewport real. El harness decodifica imágenes antes de barrer a 500px/160ms, espera compositor y visita reveals restantes naturalmente antes de capturar; no desactiva motion.

Lighthouse mobile simulado/local, navegador limpio por ruta: Performance 85/85/98, A11y/Best Practices/SEO 100; LCP 2,56/2,72/1,89s, TBT 379/361/105ms, CLS 0, 336/401/180 KiB. La variación frente a corridas anteriores no proviene de nuevos cambios de JS/CSS. Evaluación detallada en [REDESIGN_1717_REPORT.md](../../../REDESIGN_1717_REPORT.md). No son datos de campo ni una certificación WCAG/Core Web Vitals.

Pendientes comerciales: configuración externa Cal.com y retratos individuales equivalentes de Jonatan/Esteban. El QA local está completado; esos pendientes no se resolvieron con el push a main autorizado.
