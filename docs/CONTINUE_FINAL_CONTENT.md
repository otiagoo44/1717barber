# Continuar 17:17 después del QA final

Estado del 12 de octubre de 2026. La entrega técnica conserva el diseño aprobado y completa el QA del último ajuste de imágenes/JS. El usuario autorizó expresamente llevar la rama `feat/final-content-booking` a `main`; la entrega Git se comprueba con `git status`, `git log` y `git ls-remote origin`.

## Alcance preservado

- Archivo Black/Inter, negro/marfil/ocre, orden de secciones, composición y motion permanecen aprobados. No rediseñar.
- Agenda web `/reservar`: selección por servicio, duraciones confirmadas en `services[].durationMinutes`, URLs externas verificadas en `business.booking.serviceEvents`. Todas siguen null mientras falta configurar la cuenta. `business.booking.url` conserva el enlace recibido como referencia, sin fallback genérico. Consultas contextuales a WhatsApp `595983402497`. Ver `BOOKING_SETUP.md`.
- Rulos Gs. 180.000, corte separado, aproximadamente dos horas. Largo/condiciones por consulta individual antes de reservar.
- Cinco reels destacados locales bajo interacción, cinco fichas de productos, tres destacados en Home y tres vistas del local. Por nueva instrucción del dueño, `/trabajos` amplía la evidencia a 27 fotos y 16 videos, incluyendo ángulos complementarios sin repetir archivos ni inventar testimonios. Filtros por servicio/formato y carga de 12 en 12; sin JS se muestran todos. Los videos sólo se descargan al tocarlos. Originales disponibles conservados fuera de dist.
- Jonatan y Esteban, ambos Cofundador: bios/headlines ya verificados desde sus videos. No pedirlos otra vez ni asignar identidades desde la foto conjunta.
- Contrato futuro CRM multi-barbería en `BARBERIA_CRM_INTEGRATION.md`: backend autoritativo por webhook firmado Cal.com/API v2, tenant server-side, inbox/idempotencia y UID previo/nuevo. No crear CRM/Supabase todavía ni inserts/secretos desde la landing.

## Pendientes antes de publicación comercial

1. Configurar Cal.com: corte 40 min; rulos/tinte 120; barba/infantil/cejas bloque de 40; lavado 10, sin combinaciones. 40m es válido para corte. Cambiar Cal Video a presencial. Asignación automática Round Robin/Maximize availability con agendas independientes de Jonatan/Esteban y excepciones por fecha. Acceso a `app.cal.com` denegado por permiso del navegador en esta sesión; no intentar eludirlo ni afirmar ajustes aplicados. No contratar plan, aceptar términos, invitar usuarios o crear reservas reales sin autorización correspondiente. No inventar URLs ni habilitar `verified` sin QA externo.
2. Recibir retratos individuales actuales de Jonatan y Esteban con calidad/encuadre equivalentes, completar `founders[].image` y regenerar build. Las presentaciones ya están listas y los retratos faltantes se señalan explícitamente.
3. Validar performance en CDN y con datos de campo. La evidencia vigente está en `qa/expanded-work/after/performance-summary.json`; `85/85/98` es la medición histórica anterior a estos cambios. TBT/LCP muestran variación local importante. No afirmar Core Web Vitals PASS ni atribuir la variación a un ajuste sin evidencia.

Producto de barba sin identificar, cuidados, testimonios y mejores packshots son opcionales; no inventarlos. Canonical actual `1717barber.vercel.app`, dominio definitivo mediante SITE_URL.

## QA histórico previo a selección por servicio

Tests 7/7, build, DESIGN lint sin errores/advertencias y sintaxis PASS. QA browser/Axe en 18 combinaciones, enlaces desktop/mobile, teclado/foco y tres diálogos, lightbox, filtros, FAQ, no-JS y reduced motion PASS. Cinco reels reproducidos realmente; ocho entradas animadas sin parpadeo/replay PASS. Capturas nuevas comparadas con las nueve de `before/`, incluyendo viewports reales de equipo/perfiles/local. Precio viejo independiente, sexto reel, secretos/tenant público, TODO y ratings ficticios ausentes. 71 originales presentes, 59 hashes disponibles coincidentes.

La evidencia vigente de servicios, ajustes visuales y galería ampliada está en `docs/qa/expanded-work/after/`; `booking-services/` conserva la pasada previa a ampliar la galería y `final-content/verified/` el QA anterior a esos cambios. Ver el último bloque de `REDESIGN_1717_REPORT.md` para resultados y límites vigentes. Tests 8/8, build y DESIGN lint PASS. Browser: 18 casos de las rutas existentes, 17 de servicios/notebook y ocho de Trabajos; cero Axe/overflow/consola. Los 16 videos reproducen con cuadros reales, se cierran/liberan y devuelven foco. Filtros, Ver más, no-JS, reduced motion, diálogos y ocho entradas de motion PASS. `README.md` documenta comandos/env de QA. Instalar herramientas en un directorio externo; ejecutar los scripts secuencialmente, Lighthouse/motion sin otros navegadores de QA concurrentes. El harness decodifica antes del barrido a 500px/160ms, espera compositor y visita cualquier reveal restante antes de capturar; no quitar motion para arreglar screenshots.

El dueño solicitó ampliar ancho útil de notebook (máximo 1680, gutter 3vw/48px), centrar encuadres de rulos, ordenar Qué incluye y usar el fotograma final del quinto reel en el hero. Preservar estos ajustes, paleta, fuentes, orden y motion. El hero se genera con `scripts/extract-hero-reel.mjs` (FFmpeg/Sharp externos), 720×1280 nativos, variantes 360/600; no está ampliado artificialmente. Fuente/hash en `hero-source.json`. No reasignar identidades desde esa imagen. Durante el trabajo aparecieron tres borrados locales en `img/fotos-cortes-rulos`; son cambios ajenos a esta implementación, no restaurarlos ni incluirlos automáticamente en el commit.

Primero revisar Git sin checkout destructivo ni pisar ediciones. Leer README, DESIGN, el final del REDESIGN_1717_REPORT, CONTENT_ASSETS.md/json, FOUNDER_CONTENT, BARBERIA_CRM_INTEGRATION y MATERIAL_PENDIENTE. Comprobar que las skills de diseño existen en esta máquina antes de usarlas para preservar/pulir. La base de contenido fue `ae7a8ea`, parent `684688b`; el parent de la base auditada fue `7a18792`. No usar la producción histórica como referencia visual. No declarar publicación comercial resuelta mientras Cal.com/retratos sigan pendientes.

El bundle anterior `1717-final-content-booking-2026-10-12.bundle` es respaldo histórico de la sesión previa: no asumir que contiene este QA. Los videos privados de presentación no viajaron al repositorio; sus textos/evidencia ya están documentados y no requieren volver a transcribirlos.
