# Contrato entre 17:17 y Barbería OS

Auditado contra el CRM productivo `cac194123ebfa779bafb344423f63b327c4dce7e`, sin modificar su código ni base. [Handoff versionado](https://github.com/otiagoo44/barberia-crm/blob/cac194123ebfa779bafb344423f63b327c4dce7e/docs/HANDOFF_LANDING_1717.md) y [contrato del CRM](https://github.com/otiagoo44/barberia-crm/blob/cac194123ebfa779bafb344423f63b327c4dce7e/docs/WEBSITE_INTEGRATION.md).

Origen real: `https://barberia-crm-kappa.vercel.app`; organización `1717-barberia`; sucursal `luque`. Supabase productivo es `tbcfhagteyqufjkmbxzz`, pero la landing no accede a Supabase ni requiere sus claves.

| Recurso | Contrato |
| --- | --- |
| GET /api/public/catalog | organization y branch por slug; JSON directo con website_booking_version=1, currency=PYG, branches, services y staff. |
| GET /api/public/availability | organization, branch, service repetido, date, staff opcional. Duración/capacidad decididas por el servidor. |
| /book/1717-barberia/luque | Página alojada, service canónico opcional y source=website. |
| POST /api/public/booking | Sólo desde el origen del CRM; organization, branch, services:[slug], staff:slug o null, starts_at:ISO8601, customer, key:UUID, website:"", source:"website". No acepta precio/duración/UUID de tenant. |

## Catálogo y proyección editorial

El build consume únicamente el GET público. Rechaza fallo HTTP, HTML, versión/tenant/moneda/sucursal incorrectos, slugs duplicados, precios/duraciones inválidos y servicios reservables sin profesional habilitado. El endpoint del CRM filtra organizaciones/sucursales con booking y servicios/staff activos.

La categoría decide el lugar editorial; el slug decide la reserva. Si varios servicios comparten `rulos`, el slug explícito `rulos` conserva el destacado y Combo aparece separado con valores del CRM. Las variantes `tinte` conservan sus nombres y precios propios. Una categoría editorial requerida ambigua detiene el build, sin elegir por nombre, precio o duración. Servicios ausentes no se reintroducen desde el contenido antiguo.

Rulos, sus combos y tintes exigen consultation_required=true en la landing. No producen enlace de reserva directa. El CRM también rechaza servicios de consulta en disponibilidad y booking, independientemente del query string. Combo no agrega otro Corte ni suma minutos/precios locales.

La landing toma un snapshot al construir: reconstruir y desplegar después de cada cambio del catálogo. No tiene revalidación en tiempo real. El servidor del booking siempre recalcula sus valores actuales.

## Datos del cliente e idempotencia

`src/features/booking/public-booking.tsx` solicita nombre, teléfono y correo opcional. Envía `customer:{name,normalized_phone,email}` en un cuerpo JSON al CRM. `customerInput` valida nombre recortado de 1–120 caracteres, teléfono internacional `+` seguido de 8–15 dígitos y correo válido de hasta 254 caracteres, vacío u omitido. El objeto y el payload de reserva son estrictos. No se envían datos personales por query string.

El formulario conserva una UUID durante los reintentos de esa visita; la transacción enlaza cliente y cita, y la clave impide duplicar la misma operación. Cambiar payload/atribución bajo la misma clave debe rechazarse. Tras error de red, reintentar sin recargar; una recarga genera una clave nueva y no constituye el mismo reintento idempotente.

## Atribución y seguridad

La landing agrega únicamente source=website, sin autoridad sobre tenant, precio, duración o permisos. El CRM acepta sólo website o ausencia, valida nuevamente en DB y registra `appointments.booking_attribution=website` y el evento `booking.attributed` en la transacción. `appointments.source` continúa siendo `public` para conservar las reglas de agenda pública. No confundir esos dos campos.

`src/lib/http.ts` mantiene la comprobación de Origin contra APP_URL y Content-Type JSON, además del límite de cuerpo. La ruta pública aplica honeypot, rate limiting y RPC con secreto confinado al CRM. Los logs de error exponen código/request_id/estado, sin el cuerpo del cliente. La landing no hace POST, proxy ni embed y conserva su CSP.

El aviso del formulario declara el uso de datos para gestionar la visita. La revisión de privacidad aplicable por los propietarios sigue pendiente antes de apertura; no se certifica cumplimiento jurídico ni consentimiento comercial.

## Consulta previa y estado real

WhatsApp sólo abre el contacto. No crea un cliente, consulta ni lead en el CRM y no confirma una reserva. La API pública auditada sólo ofrece catálogo/disponibilidad/booking; recepción segura de consultas es una mejora pendiente, sin nuevo endpoint de escritura abierto.

Al 27/10/2026 el catálogo productivo devuelve 404 JSON. El handoff informa flags cerrados y gates humanos pendientes. No se ejecutaron reservas ficticias productivas. El código auditado y la evidencia histórica de staging no certifican una reserva desde la landing real ni su aparición en Agenda productiva. [Activación](BOOKING_SETUP.md) e [informe actual](CRM_INTEGRATION_20261027.md).
