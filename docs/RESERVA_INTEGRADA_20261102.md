# Reserva integrada y Calendar — auditoría y entrega

## Auditoría antes de los cambios

2/11/2026: GitHub main y Vercel producción coincidían: landing `f74f734a83a1784e28f4aa2e56a6fe0474b63281` (`dpl_GAGuKG285MWWEnzseR7zuYAFnag8`), CRM `71b59fc17b2bc289e571686726e360afbe9b554c` (`dpl_FkkZMwyKennc7rvuL27gPbMZADab`), ambos READY. Clon canónico CRM: `C:\htdocs\tiago-systems\barberia-crm`. Se preservaron los archivos locales ajenos a esta tarea.

| Hallazgo | Evidencia | Corrección |
| --- | --- | --- |
| /reservar salía al CRM para elegir horario | src/pages.mjs y enlaces /book/ | Formulario de cinco pasos dentro de la landing |
| El navegador no podía enviar desde la landing | OPTIONS sin ACAO; POST vacío con Origin landing → 403 | CORS explícito sólo en la API pública |
| «Cualquiera» no devolvía el nombre asignado | Respuesta pública descartaba staff_id sin etiqueta pública | Snapshot de servicios y nombre/slug asignados en respuesta |
| Calendar no estaba activo | Worker autenticado configured:false; cero conexiones/jobs | Checklist de activación; no rotación de claves |

El catálogo real tenía ocho servicios. Corte, barba, lavado y cejas eran reservables; Rulos, combo y los dos tintes requerían consulta. No se modificaron catálogo comercial, imágenes, fuentes, SEO, animaciones existentes ni backend financiero.

## Implementación

Cinco pasos: servicio → barbero/cualquiera → fecha y horario reales → nombre, WhatsApp y correo opcional → revisión. Progreso visible, validación por paso, foco accesible, errores, estados vacíos/carga, reduced-motion y diseño negro/dorado existentes. Las consultas tienen otra acción y aviso previo: «Escribir por WhatsApp no confirma una reserva».

La landing sólo consume `/api/public/catalog`, `/availability` y `/booking`; no contiene credenciales ni calcula horarios, asignaciones o reglas de reserva. Fetch sin cookies. CSP permite únicamente el CRM público además del mismo origen. El CORS del CRM permite el origen exacto configurado en `PUBLIC_BOOKING_ORIGINS`; no extiende los orígenes de APIs de sesión o finanzas. Mantiene gateway, IP real de Vercel, rate limiting, honeypot, tamaño y esquema del payload, locks y exclusiones del motor. No hay proxy ni segundo motor.

Un envío ambiguo conserva UUID y payload inmutable en sessionStorage para reintentar incluso después de recargar. No habilita otro formulario ni una clave nueva mientras el resultado sea incierto, tampoco si un reintento devuelve 429. La confirmación viene del servidor e incluye servicio, profesional asignado, fecha, hora y referencia. «Avisar por WhatsApp» abre un mensaje opcional y no llama al endpoint de reserva. La pantalla confirmada sobrevive a una recarga y no guarda los datos personales del cliente en su recibo.

La agenda anterior y el catálogo estático se conservan como alternativa ante error de carga o sin JavaScript. Los servicios de consulta no se convierten en radios reservables y el CRM sigue rechazándolos aunque se fuerce un payload.

CRM: [PR #12](https://github.com/otiagoo44/barberia-crm/pull/12), HEAD validado `f5142b6fed9138d74e1fe25683783d50d910d815`, merge `0e817a06797f3a773fe8a3ab0c2a0e1bd15f400e`. [CI aprobada](https://github.com/otiagoo44/barberia-crm/actions/runs/41533062926): quality, supabase-e2e y visual-baseline. Migración forward `20261102180000_public_booking_confirmation.sql`, aplicada primero en staging y después en producción: 47 migraciones; sin reescribir historia ni cambiar el motor.

## Evidencia

- CRM: lint, typecheck, 41 unit tests, contrato SQL nuevo de etiquetas públicas/asignación real/idempotencia/privacidad/gateway; CI completa incluyendo seguridad, carga y E2E nativos.
- Landing: 21 unit tests y build. CI nueva ejecuta E2E con proveedor interceptado; no escribe en producción.
- **Staging real**: Next optimizado → Supabase `zdogqqmitpbwjgohwcww`; seis E2E aprobados. Formularios 390/1440, correo vacío, respuesta perdida después de commit, recarga, misma clave y misma referencia, WhatsApp sin segunda reserva, fallback sin JS, consulta previa, catálogo/disponibilidad fallidos y 409.
- Contratos HTTP reales en staging: preflight exacto permitido, orígenes falsos rechazados, dos envíos concurrentes con la misma clave producen la misma referencia, otra clave sobre el profesional/horario ocupado devuelve 409, los cuatro servicios de consulta devuelven 400, campos ajenos rechazados y rate limit 429 comprobado sin desactivarlo.
- Axe 0 en revisión, sin desbordes ni pageerror. [Recibos de staging](qa/embedded-20261102/staging/staging-receipts.json); [móvil](qa/embedded-20261102/staging/confirmed-390.png), [escritorio](qa/embedded-20261102/staging/review-1440.png).

Las pruebas reales de staging usan un origen loopback explícito y la misma aplicación compilada; no exponen secretos, no usan previews conectados a producción y no fabrican citas productivas. Se configuró el teléfono público ya verificado del local en la sucursal de staging para comprobar el aviso opcional. Las pruebas sintéticas se identifican como QA y permanecen allí.

## Google Calendar: pendiente exacto

Las claves de cifrado y worker ya existen en Vercel producción; se conservaron. Faltan `GOOGLE_CLIENT_ID` y `GOOGLE_CLIENT_SECRET`. La consola Cloud no se inspeccionó en esta auditoría, por lo que se debe buscar un proyecto/cliente existente antes de crear otro. Worker, cron, RLS y las tres migraciones Calendar están presentes; cero conexiones personales y cero eventos reales enviados. [Checklist exacto de activación](https://github.com/otiagoo44/barberia-crm/blob/main/docs/CALENDAR_ACTIVACION_20261102.md).

Esteban: cuenta vinculada, correo confirmado, contraseña inicial sustituida y un MFA; aún sin Calendar. Jonatan: cuenta vinculada y owner activo; correo sin confirmar, contraseña inicial pendiente y cero MFA. Debe completar esos accesos antes de autorizar personalmente su Google, con el mismo correo del CRM. El owner no puede conectar por otra persona.

Sincronizar un evento no equivale a recibir un recordatorio ni un aviso inmediato. El código proyecta eventos CRM → Google; recordatorios y notificaciones del calendario/dispositivo requieren configuración y comprobación personal. No se implementó envío automático de WhatsApp/email/push por cada nueva reserva. [Diferencias documentadas por Google](https://developers.google.com/workspace/calendar/api/concepts/reminders).

Alta, modificación y cancelación **en Google real** siguen pendientes de OAuth y consentimiento. Sólo se harán cambios sobre una visita real si se autoriza específicamente esa modificación/cancelación; en caso contrario, el ensayo completo corresponde a staging con sus propias cuentas OAuth. La reserva real autorizada quedó verificada después del despliegue, sin teléfono ni datos personales en la evidencia del repositorio.

## Publicación y reserva real consentida

Landing [PR #2](https://github.com/otiagoo44/1717barber/pull/2), HEAD `7fcad8eade302ceab4ba5701b10a61492839f88c`, [CI aprobada](https://github.com/otiagoo44/1717barber/actions/runs/41535385098), merge `711305fbc30a91ba140ce0256ea7972d2abed6b5`. Producción READY `dpl_CKD6TyXqTMDDUczXozKkLWYFBNTm`. CRM READY `dpl_4i2727tXwYeELiCY91VUD3iegduz` sirve el merge `0e817a0`. Enlace público: https://1717barber.vercel.app/reservar. Preflight productivo desde la landing: 204 con ACAO exacto; origen ajeno: 403 sin ACAO.

El usuario autorizó una única visita real: corte, cualquiera disponible, 2/11 a las 20:00 de Luque. Se realizó desde el formulario público, sin atajo por API: **Jonatan, 20:00–20:40**, referencia `2f8f4061-d01c-4005-97cc-3975fb0d9e17`. Un solo POST, respuesta 201 y misma confirmación después de recargar. WhatsApp se ofreció pero no se abrió ni se envió mensaje. No se modificó ni canceló la visita.

La consulta posterior de la base confirmó **una fila por referencia y una cita activa del cliente en ese horario**, source public, attribution website y teléfono coincidente, sin publicar ese dato. [Recibo HTTP](qa/embedded-20261102/production/consented-booking.json), [lectura CRM](qa/embedded-20261102/production/crm-readback.json), [confirmación móvil](qa/embedded-20261102/production/confirmation-390.png). Los datos personales y el estado de recuperación del envío permanecen en archivos privados ignorados; no están en el repositorio.

## Regresión de navegación

La revisión ampliada reprodujo una cancelación nativa de Chromium que se notificaba después de perderse el handle de ViewTransition. El cierre reconoce exclusivamente dos DOMException InvalidStateError con los motivos exactos de cancelación `ViewTransition opt-in disabled` / `Page already revealed`. Mantiene las animaciones y CSS existentes, sin interceptar errores de aplicación ni otras excepciones. El caso añadido alterna movimiento normal/reducido durante doce navegaciones y comprueba además que un error de aplicación ajeno siga llegando al manejador de errores del navegador.

Regresión completa aprobada: cinco páginas × móvil/escritorio, diez combinaciones; imágenes cargadas, SEO/canonical, CSP, enlaces, fallback sin JS, Axe 0, sin desbordes ni errores de consola. Además, tres navegaciones por modo normal/reducido aprobadas. [Reporte](qa/embedded-20261102/regression/browser.json).

La auditoría final de Calendar comparó sin exponer valores el worker existente, hash gateway y secreto Vault: coinciden; origen productivo exacto y cron activos; cero conexiones/jobs. [Recibo sin secretos](qa/embedded-20261102/production/calendar-transport.json). Esto certifica el transporte preparado, no sustituye OAuth ni un consentimiento real de Google.
