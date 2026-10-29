# Integración 17:17 — 27/10/2026

**Informe histórico.** Catálogo y reservas se habilitaron después de esta auditoría. La landing se fusionó/publicó y una reserva real del usuario quedó verificada. Consultar el [cierre vigente del 29/10](CIERRE_INTEGRACION_20261029.md) antes de ejecutar acciones.

Este informe conserva la pasada inicial con catálogo cerrado. La ejecución posterior habilitó el catálogo con owner/MFA y probó el E2E real de staging, además de corregir horario y audio. Ver [go-live y recibos actuales](GO_LIVE_20261027.md).

**Preparada para revisión; reservas productivas cerradas.** El catálogo y la disponibilidad del CRM devuelven 404 JSON. No se publica una agenda inexistente ni se considera completada la integración productiva.

## Versiones y despliegues comprobados

| Sistema | SHA / deployment |
| --- | --- |
| Landing productiva y base del cambio | `81dfa32cc5f6474ee67b8f72aa582550dcfb7db7` |
| Landing productiva Vercel | `dpl_9D6MnrRnHWETytURNJ3wamecFK3o` |
| URL landing | https://1717barber.vercel.app |
| Proyecto landing | `1717barber`, `prj_TwBBDOBCp8tecPtkmdWvglTKKIoB` |
| CRM productivo auditado | `cac194123ebfa779bafb344423f63b327c4dce7e` |
| CRM Vercel | `dpl_44EraSc6jHx8WqbpF9iBN4tgwmEn` |
| URL CRM | https://barberia-crm-kappa.vercel.app |
| Supabase productivo | `tbcfhagteyqufjkmbxzz`; sin escrituras desde esta tarea |

El cambio de landing queda en `fix/crm-booking-integration`; el SHA de entrega lo identifica el commit/PR. No se modificó el CRM. Se inspeccionó su SHA productivo en un worktree separado, pues el checkout local original estaba en una revisión anterior.

Código y pruebas subidos en `bb7053e6cc295ded1488af112662bf7f64a12020`. El push disparó automáticamente el preview `dpl_AQPtqZsBgroHwSRovs1SNE2e7WGZ`, que terminó ERROR con el mensaje confirmado en sus logs: `Catálogo del CRM no disponible (404). No se publicaron datos inventados.` No se promovió. Se releyó el alias productivo después: conserva `dpl_9D6MnrRnHWETytURNJ3wamecFK3o`, READY y SHA `81dfa32`.

**PR pendiente de creación manual.** El conector GitHub devolvió `403 Resource not accessible by integration`; el navegador denegó acceso al dominio por falta de autorización. No se intentó eludir ese bloqueo. [Abrir comparación](https://github.com/otiagoo44/1717barber/compare/main...fix/crm-booking-integration?expand=1); [texto del borrador preparado](PULL_REQUEST_CRM_INTEGRATION.md). No hacer merge mientras continúen los gates descritos abajo.

## Variables Vercel

Se comprobó el proyecto por nombre, ID, repositorio y alias antes de escribir. No tenía variables de proyecto. Se crearon y releyeron exactamente cuatro entradas, cada una con targets Production, Preview y Development y sin override de rama:

```env
BARBERIA_OS_PUBLIC_URL=https://barberia-crm-kappa.vercel.app
BARBERIA_OS_ORGANIZATION_SLUG=1717-barberia
BARBERIA_OS_BRANCH_SLUG=luque
SITE_URL=https://1717barber.vercel.app
```

El alias y canonical actuales confirman SITE_URL; no se cambió el dominio. No se agregaron secretos, credenciales DB/Supabase/SMTP, tokens o sesiones.

Las variables se aplican a **nuevos builds**. Con slugs completos y catálogo cerrado, esos builds fallan de forma deliberada. El deployment anterior sigue sirviendo WhatsApp. No hay un deployment nuevo aprobado ni promoción productiva; no omitir las variables para evadir esta condición. El preview del PR también depende del catálogo habilitado.

## Catálogo, servicios y enlaces

La consulta exclusiva al catálogo público devolvió `404`, Content-Type `application/json`, mensaje «No encontramos este recurso». No se recibió un catálogo válido: versión 1, PYG, servicios, precios, duraciones, clasificación y profesionales productivos **no se certifican por HTTP** en esta pasada. No se utilizaron importes de onboarding como reemplazo. [Lecturas HTTP](qa/crm-integration-20261027/public-read.json).

La landing productiva conserva sus siete entradas editoriales anteriores: Rulos permanentes, Corte masculino, Tinte genérico sin precio, Barba, Corte infantil, Perfilado de cejas y Lavado. Siguen siendo coordinación por WhatsApp; no se presentan como un catálogo recién recibido. Combo, Tinte Global y Tinte Mechas se incorporarán sólo si el catálogo real los publica. Corte infantil desaparecerá de la proyección si no aparece en el catálogo real.

Enlaces que generará el contrato al habilitarse:

- General: `https://barberia-crm-kappa.vercel.app/book/1717-barberia/luque?source=website`
- Corte: `https://barberia-crm-kappa.vercel.app/book/1717-barberia/luque?service=corte-de-pelo&source=website`

Hoy el booking alojado responde 200 HTML pero el navegador recibe 404 del catálogo, muestra «No encontramos este recurso» y no presenta formulario ni campos. Ese 200 no acredita funcionamiento. [Verificación en móvil](qa/crm-integration-20261027/hosted-booking-closed.json).

## Correcciones preparadas

- Origen fallback y ejemplo de variables actualizados al dominio `-kappa`.
- Rulos y Combo pueden compartir categoría editorial. El slug canónico `rulos` conserva el destacado; Combo usa su nombre, precio y duración propios, sin agregar otro Corte ni heredar su nota de cobro separado. Ambigüedad editorial o ausencia del Rulos canónico bloquea el build; no se usa el precio del Combo si sólo éste sigue activo.
- Todos los nombres/precios/duraciones proyectados vienen del catálogo. Variantes de tinte separadas; servicios ausentes no recuperan valores editoriales anteriores.
- Consulta obligatoria para categorías rulos/tinte; catálogo con protección desactivada se rechaza. Validación de profesionales públicos y capacidad para servicios reservables.
- En `/reservar`, las consultas indican: «Este servicio requiere evaluación previa. Escribinos para coordinarlo.» WhatsApp no crea lead ni confirma una cita. La API pública auditada no ofrece recepción de consultas; queda pendiente esa integración adicional.
- QA nativo acepta la cantidad real de servicios y producción con HSTS, revisa atribución/query strings de enlaces y seguridad de nuevas pestañas. Desactiva caché para exigir respuestas 200 al revisar rutas, sin relajar la aserción por respuestas de revalidación 304.

No se editaron CSS, animaciones, imágenes, videos, fuentes, paleta ni composición de componentes. El HTML generado de `/reservar` cambia sólo el texto de consulta. SEO, canonical y sitemap se conservan.

## Pruebas y límites

| Comprobación ejecutada | Resultado |
| --- | --- |
| `npm test` landing | 18/18; contratos, slugs, consultas, Combo, staff, SEO y medios |
| `npm run build` local sin slugs | PASS del modo de contacto; no acredita el CRM |
| `npm run build` con las cuatro variables reales | Bloqueado como corresponde: catálogo 404, antes de escribir HTML |
| `node scripts/verify-dist.mjs` | PASS: cinco rutas, SEO, estático, CSP, cabeceras y ausencia de secretos |
| `scripts/qa-native-booking.mjs` local | PASS: cinco rutas × 390/1440, sin overflow, Axe 0 y console errors 0, enlaces, navegación y sin JS |
| `scripts/qa-native-booking.mjs` en producción | PASS: cinco rutas × 390/1440, CSP/HSTS, enlaces seguros, SEO, Axe 0 y console errors 0; confirma el deployment anterior de contacto |
| `npm test` del SHA CRM auditado | 30/30, incluyendo customerInput y preselección pública |
| CRM `tests/security/contracts.ts` en PostgreSQL embebido | 51 comprobaciones PASS con 43 migraciones instaladas en base desechable |
| CRM `confirmed1717Contracts` en otra base embebida | PASS: catálogo/configuración, Combo, pausa, domingo, turnos y gates |
| Booking alojado productivo, lectura móvil | Cerrado; catálogo 404, cero formulario/campos, sin page errors |
| Reserva ficticia productiva | No realizada |
| Reserva real consentida productiva y Agenda real | Pendiente de activación/propietarios |
| Nueva prueba E2E con Auth y Supabase cloud de staging | No ejecutada en esta pasada; no sustituirla por PostgreSQL embebido |

Los contratos SQL ejecutados verifican creación atómica, asociación cliente/cita, deduplicación de clientes sin sobrescribir contacto, 100 peticiones concurrentes con una reserva ganadora, 100 reintentos con una clave y un solo registro/evento, aislamiento de tenants, honeypot, rate limiting y rechazo de consulta previa en disponibilidad/booking. La prueba de atribución confirma `source=public`, `booking_attribution=website` y un único evento `booking.attributed`; cambiar la atribución bajo la misma key se rechaza. Estas pruebas usan datos ficticios locales y no cuentas productivas.

El CRM conserva la UUID del formulario durante el reintento; recargar crea otra clave. Nombre/teléfono/correo se envían en JSON same-origin y no aparecen en la URL. El aviso informa el uso para gestionar la visita. Los propietarios deben revisar la información de privacidad aplicable antes de la apertura; no se certifica consentimiento comercial ni cumplimiento jurídico.

La evidencia cloud de staging del 26/10 en el handoff del CRM es histórica y partió de una landing sintética; no certifica este PR ni la landing real. No se crearon usuarios ni se usaron sesiones/MFA de propietarios durante esta tarea.

## Acciones humanas y continuación

1. Completar las acciones personales y el piloto del [handoff CRM vigente](https://github.com/otiagoo44/barberia-crm/blob/cac194123ebfa779bafb344423f63b327c4dce7e/docs/HANDOFF_LANDING_1717.md). No repetir onboarding ni abrir los flags desde esta landing.
2. Resolver con los propietarios la diferencia entre el horario editorial 08:00 y el confirmado en CRM 09:00. La agenda debe respetar los turnos reales y domingo cerrado, sin fabricar slots desde texto de la landing.
3. Cuando el CRM pueda ofrecer catálogo válido, revisar sus ocho servicios esperados y staff, disponibilidad, pausas, servicios inexistentes y consulta previa. Completar staging con el flujo real landing → formulario → cliente/cita → Agenda y reintento idempotente.
4. Ejecutar build con variables reales, QA, publicar y verificar el alias productivo. Reservar en producción sólo con una visita real consentida por los propietarios, comprobando cliente, contacto, servicio, profesional, fecha/hora, estado y origen website en Agenda.
5. Cada cambio posterior de servicios/precios/duración requiere nuevo build y deploy: la landing no sincroniza en tiempo real.

**No se declara «sincronizado»: falta la habilitación del catálogo y la reserva productiva autorizada.**
