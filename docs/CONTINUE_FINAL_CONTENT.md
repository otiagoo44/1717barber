# Continuar 17:17 después del QA final

Estado del 12 de octubre de 2026. La entrega técnica conserva el diseño aprobado y completa el QA del último ajuste de imágenes/JS. El usuario autorizó expresamente llevar la rama `feat/final-content-booking` a `main`; la entrega Git se comprueba con `git status`, `git log` y `git ls-remote origin`.

## Alcance preservado

- Archivo Black/Inter, negro/marfil/ocre, orden de secciones, composición y motion permanecen aprobados. No rediseñar.
- Agenda real única en `business.booking.url`: `https://cal.com/ezequiel-oviedo-dthlhd/barberia`. Consultas contextuales a WhatsApp `595983402497`.
- Rulos Gs. 180.000, corte separado, aproximadamente dos horas. Largo/condiciones por consulta individual antes de reservar.
- Cinco reels locales bajo interacción, cinco fichas de productos, tres destacados en Home, tres vistas del local y trabajos distintos por página. Originales conservados fuera de dist.
- Jonatan y Esteban, ambos Cofundador: bios/headlines ya verificados desde sus videos. No pedirlos otra vez ni asignar identidades desde la foto conjunta.
- Contrato futuro CRM multi-barbería en `BARBERIA_CRM_INTEGRATION.md`: backend autoritativo por webhook firmado Cal.com/API v2, tenant server-side, inbox/idempotencia y UID previo/nuevo. No crear CRM/Supabase todavía ni inserts/secretos desde la landing.

## Pendientes antes de publicación comercial

1. El dueño debe corregir/confirmar en Cal.com servicio reservable, duración y atención presencial. La inspección actual a 390/1440 muestra horarios, HTTP 200 y todavía **40m / Cal Video**. No modificar su cuenta ni crear reservas reales sin instrucciones específicas.
2. Recibir retratos individuales actuales de Jonatan y Esteban con calidad/encuadre equivalentes, completar `founders[].image` y regenerar build. Las presentaciones ya están listas y los retratos faltantes se señalan explícitamente.
3. Validar performance en CDN y con datos de campo. Lighthouse local: 85/85/98, accesibilidad/buenas prácticas/SEO 100; LCP 2,56/2,72/1,89s, TBT 379/361/105ms, CLS 0. No afirmar Core Web Vitals PASS ni atribuir la variación entre corridas a cambios nuevos de JS/CSS.

Producto de barba sin identificar, cuidados, testimonios y mejores packshots son opcionales; no inventarlos. Canonical actual `1717barber.vercel.app`, dominio definitivo mediante SITE_URL.

## QA ya completado

Tests 7/7, build, DESIGN lint sin errores/advertencias y sintaxis PASS. QA browser/Axe en 18 combinaciones, enlaces desktop/mobile, teclado/foco y tres diálogos, lightbox, filtros, FAQ, no-JS y reduced motion PASS. Cinco reels reproducidos realmente; ocho entradas animadas sin parpadeo/replay PASS. Capturas nuevas comparadas con las nueve de `before/`, incluyendo viewports reales de equipo/perfiles/local. Precio viejo independiente, sexto reel, secretos/tenant público, TODO y ratings ficticios ausentes. 71 originales presentes, 59 hashes disponibles coincidentes.

Evidencia vigente: `docs/qa/final-content/verified/`. Las carpetas before/after y sus informes anteriores son históricos. `README.md` documenta comandos/env de QA. Instalar herramientas en un directorio externo; ejecutar los scripts secuencialmente, Lighthouse/motion sin otros navegadores de QA concurrentes. El harness decodifica antes del barrido a 500px/160ms, espera compositor y visita cualquier reveal restante antes de capturar; no quitar motion para arreglar screenshots.

Primero revisar Git sin checkout destructivo ni pisar ediciones. Leer README, DESIGN, el final del REDESIGN_1717_REPORT, CONTENT_ASSETS.md/json, FOUNDER_CONTENT, BARBERIA_CRM_INTEGRATION y MATERIAL_PENDIENTE. Comprobar que las skills de diseño existen en esta máquina antes de usarlas para preservar/pulir. La base de contenido fue `ae7a8ea`, parent `684688b`; el parent de la base auditada fue `7a18792`. No usar la producción histórica como referencia visual. No declarar publicación comercial resuelta mientras Cal.com/retratos sigan pendientes.

El bundle anterior `1717-final-content-booking-2026-10-12.bundle` es respaldo histórico de la sesión previa: no asumir que contiene este QA. Los videos privados de presentación no viajaron al repositorio; sus textos/evidencia ya están documentados y no requieren volver a transcribirlos.
