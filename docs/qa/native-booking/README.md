# Verificación de integración nativa

12/10/2026. Se preservan diseño, paleta, tipografía, fotografías, videos sin audio y layout responsive de la landing.

## Implementado

Landing estática con configuración pública y catálogo del CRM durante build; slugs validados sin comparar nombres; CTA general sin service, CTA específico con slug canónico; Rulos sólo consulta. Tinte dudoso sin precio hasta catálogo real. FAQ/precios/duración comparten datos sincronizados. Cabeceras CSP, nosniff, Referrer-Policy y frame-ancestors; HSTS condicionado a host de producción HTTPS. Documentación operativa actualizada.

CRM: preselección basada en public_catalog, composición mediante el selector existente, consulta previa bloqueada en disponibilidad/reserva públicas y recepción interna habilitada. source=website validado API/DB; appointments.source continúa public, atribución separada y evento append-only booking.attributed; ledger privado de idempotencia. Favicon del CRM evita un 404 al abrir la agenda.

## Probado

- Landing: 16 tests. Build normal y build configurado aislado; cinco rutas, canonical/schema/sitemap y ausencia de Cal.com/secretos. Canarios secretos excluidos de dist.
- CRM: lint, TypeScript, 7 tests unitarios, build Next.js y 51 contratos sobre PostgreSQL local aislado. Incluye RLS, aislamiento de tenant, roles, rate limiting, idempotencia, 100 solicitudes simultáneas y exclusión DB de double booking; consulta previa y atribución nuevas.
- Navegador landing: 10 combinaciones de ruta/ancho (390/1440), links, navegación Agendar, sin JS en contexto separado, cero overflow, Axe cero y cero errores de consola. CSP real del preview activada; HSTS ausente en HTTP local.
- Navegador CRM: 12 combinaciones de query/ancho sobre el build Next real, API pública interceptada con fixtures. Selección de Corte, compuesto, desconocido, Rulos y parámetros repetidos; payload de reserva de prueba con source=website. Sin errores de consola.
- API HTTP real: rechaza atribución forjada, precio inyectado, UUID de tenant y origen no autorizado. Payload válido llega al gateway intencionalmente sin configurar (503); no se creó reserva remota.

## Pendiente

La base remota auditada está vacía y la URL del CRM aún no se desplegó. No hay slugs de 17:17/Luque/servicios confirmados. Crear datos operativos reales, confirmar tintes, aplicar migración mediante el flujo del CRM, desplegar, copiar slugs públicos a Vercel, reconstruir landing y probar una reserva autorizada en staging. Los fixtures no certifican un tenant productivo inexistente. No se modificó la base remota.

Evidencia: browser.json, configured-build.json, crm-browser-fixtures.json, http-validation.json y capturas home/reservar. Reproducir con scripts/qa-native-booking.mjs (landing) y scripts/qa-website-booking.mjs (CRM), usando herramientas QA externas. Los JSON distinguen explícitamente pruebas reales de fixtures.

Validación de CDN: deploy edaa8ae READY, cinco rutas HTTP 200, CSP/nosniff/Referrer-Policy/HSTS correctos; navegación móvil/escritorio con cero errores de consola. La URL prevista del CRM sirve actualmente un starter NextSpark y no un catálogo JSON de Barbería OS; se añade rechazo explícito de HTML incluso con HTTP 200.
