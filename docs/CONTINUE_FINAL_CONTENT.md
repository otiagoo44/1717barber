# Prompt para continuar 17:17 en otra máquina

Copiar el siguiente bloque al iniciar Codex en el repositorio:

```text
Continuá la finalización de 17:17 Barbería desde la rama feat/final-content-booking de otiagoo44/1717barber.

PRESERVAR EL DISEÑO APROBADO. No rehagas la landing, paleta, Archivo Black/Inter, orden de secciones ni motion. Esta es una pasada de contenido, integración y QA. No crear barberia-crm ni Supabase todavía.

Primero ejecutá git status, git branch --show-current y git log --oneline --decorate -n 15. Revisá el commit de esta rama y su diff contra su parent. No hagas checkout destructivo ni pises cambios locales. La base auditada de este trabajo fue 684688bfd8a4b023b347ed4405a4db4fba1ca6bc; su parent fue 7a18792786290b7f1a5e8953da8d58ebf84d2bd0.

Leé README.md, DESIGN.md, docs/REDESIGN_1717_REPORT.md (FINAL CONTENT PASS), docs/CONTENT_ASSETS.md/json, docs/FOUNDER_CONTENT.md, docs/BARBERIA_CRM_INTEGRATION.md y docs/MATERIAL_PENDIENTE_1717.md. Buscá .agents/skills y leé las de diseño realmente instaladas (impeccable, taste, google-design-md, awesome-design-md, ui-ux-pro-max si existen). Usarlas para preservar/pulir y comprobar, no rediseñar. No asumir que una skill viajó a esta máquina.

YA IMPLEMENTADO:
- Selección real sin fotos/trabajos repetidos dentro de cada página. Rulos protagonistas, cortes actuales y color histórico limpio. Capturas/UI ajenas y clips extra excluidos; originales en img/fotos-* conservados y fuera de dist.
- Cinco productos identificados con WebP/AVIF y Consultar por WhatsApp; tres destacados en home, catálogo /productos. No ecommerce, precios/stock/claims inventados. Producto de barba aún no identificado, sin ficha publicada.
- Tres vistas actuales del local (fachada, interior, puesto).
- Rulos Gs. 180.000, NO incluye corte, aproximadamente 2 horas. Evaluar largo/condiciones individualmente por WhatsApp antes de reservar. No publicar cuidados inventados.
- Exactamente cinco reels, REEL_RULOS_01..05, MP4/posters existentes bajo interacción. Sin sexto, autoplay simultáneo ni descargas iniciales de video.
- Agenda real https://cal.com/ezequiel-oviedo-dthlhd/barberia centralizada en business.booking.url de src/data.mjs. Header/hero/servicios/barra mobile/ubicación/cierre usan Cal.com. Consultas de rulos/servicios/productos/contacto siguen por WhatsApp 595983402497 con mensajes contextuales.
- Jonatan y Esteban, ambos Cofundador y misma jerarquía, tienen textos breves extraídos de sus videos. Jonatan: El oficio se construye. Esteban: Crecer mano a mano. docs/FOUNDER_CONTENT.md registra evidencia/intervalos. No volver a pedir bios ni inventarlas. Retratos individuales aún null y señalados como pendientes; textos ya quedan debajo del retrato futuro. No usar la foto conjunta para adjudicar identidades.
- Contrato futuro CRM multi-barbería documentado: landing externa; reservas autoritativas por webhook firmado Cal.com/API v2; tenant server-side por integración/event type/team; idempotencia/inbox/UID previo y nuevo en reprogramación; RLS/contactos/citas/historial. No tenant UUID confiado al frontend, claves privadas, service role ni inserts desde la landing.

PENDIENTE ANTES DE PUBLICACIÓN COMERCIAL:
1. Cal.com EXTERNO abre y muestra horarios, pero el evento recibido dice 40m y Cal Video. El dueño debe confirmar/corregir servicio reservable, duración y atención presencial; rulos son ~2h y requieren consulta. No inventes otro link ni crees reservas reales para probar. No se modificó su cuenta.
2. Recibir retratos individuales actuales de ambos y sustituir founders[].image con igual calidad/encuadre. El componente ya funciona con placeholders explícitos.
3. QA final tras la ÚLTIMA optimización de imágenes/JS: se ajustó sizes de galería a columnas reales, hero tiene variantes 600/900/1200, y páginas sin barra flotante no inicializan su observer. npm test (7/7), build, design:lint y sintaxis pasaron. Repetir QA browser/motion/reels y las capturas después de esa optimización. Las 18 combinaciones anteriores pasaron, pero no afirmar que son una prueba del último ajuste sin repetirlo.
4. Revisar performance: último Lighthouse con Chrome limpio por ruta dio Home 79, Rulos 76, Productos 83; accesibilidad/best practices/SEO 100 en las tres. LCP 2.71/2.72/1.91s, TBT 635/673/547ms, CLS ~0. Hay variación importante entre corridas. No prometer Core Web Vitals PASS. Home bajó de 528 a 336 KiB y rulos a 401 KiB. Evaluar TBT y validar luego en CDN real, conservando el motion. Baseline e intentos previos están en docs/qa/final-content.

QA A COMPLETAR:
- Leer package.json y ejecutar comandos existentes: npm test, npm run build, npm run design:lint. No hay lint de código ni typecheck definidos.
- Entorno de QA aparte del runtime: instalar puppeteer-core, @axe-core/puppeteer y lighthouse en un directorio externo, definir QA_TOOLS_DIR, CHROME_PATH, QA_URL y QA_OUT. README documenta scripts/qa-refinement.mjs, qa-reels-native.mjs, qa-scroll-entry.mjs, qa-performance.mjs. Ejecutar Lighthouse/motion solos, sin otros navegadores de QA/transcripción concurrentes.
- Capturas obligatorias Home,/rulos,/productos a 390,768,1440 (altura 900), comparar con docs/qa/final-content/before. QA responsive adicional 375,430,1024. Revisar composición, galerías, productos, perfiles, local, teclado, foco, diálogos, lightbox, FAQ, reduced motion, no-JS y consola.
- El harness de captura debe decodificar imágenes ANTES del barrido y recorrer a 500px/160ms, esperar compositor/reveals. Barridos rápidos generaban fotos vacías sólo en screenshots; en viewport real se comprobó que aparecen. No quitar el motion para arreglar capturas. scripts/qa-refinement.mjs contiene el ajuste.
- Todos los enlaces visibles en desktop/mobile: Cal.com, WhatsApp, Instagram, Maps, Inicio,Rulos,Productos. WhatsApp/Instagram/Maps respondieron HTTP200 y Cal fue inspeccionado a390/1440; no se enviaron mensajes ni reservas. Maps sigue siendo búsqueda de la dirección existente, no pin nuevo.
- Buscar precio viejo como valor independiente (80000/80.000/80,000) sin confundirlo con 180000/180.000; buscar sexto reel, secretos, barberia_id en código público, TODO/placeholder/pending. Los null reales de portraits, cuidados/testimonios opcionales y producto de barba son honestos, no regresiones.
- No publicar testimonios/ratings inexistentes. Canonical actual 1717barber.vercel.app; SITE_URL permite dominio definitivo. No usar la producción vieja como referencia visual.

Actualizá los informes con resultados reales, commit claro y push de la rama después del QA. No merge a main ni despliegue comercial hasta resolver Cal.com y confirmar los pendientes. No declarar terminado si queda QA crítico o configuración externa incorrecta.
```

Si el push de esta sesión quedó bloqueado por red, el respaldo `1717-final-content-booking-2026-10-12.bundle` contiene la rama y su historia. Tras copiarlo a la otra máquina: `git clone --branch feat/final-content-booking <ruta-al-bundle> 1717barber`, entrar al repo y cambiar origin al repositorio GitHub original antes de hacer push. Los videos originales de presentación siguen en Downloads de esta máquina; no son necesarios para conservar los textos verificados y no viajaron al repo.
