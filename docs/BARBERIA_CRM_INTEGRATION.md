# Contrato de integración 17:17 → barberia-crm

Estado: preparación de landing, 2026-10-12. Este contrato propone el backend futuro; no crea CRM, tablas, proyecto Supabase, webhooks ni credenciales. Revisar nuevamente las APIs oficiales al implementarlo.

## Flujo y responsabilidades

```mermaid
flowchart TD
  L[17:17 landing] -->|Consultar| W[WhatsApp]
  L -->|Agendar| C[Cal.com]
  C -->|Webhook firmado| B[barberia-crm backend / Supabase]
  B --> T[Resolver barbería server-side]
  T --> CO[Contact]
  T --> AP[Appointment]
  T --> AC[Activity event]
  CO --> CRM[CRM con RLS]
  AP --> CRM
  AC --> CRM
```

La landing navega a Cal.com. No confirma reservas mediante callbacks, redirect, localStorage ni una petición manual al CRM. Cal.com es la fuente autoritativa de reservas. Un clic de agenda tampoco equivale a una reserva.

## Configuración pública de esta landing

Extender `business` en `src/data.mjs`, que ya centralizaba marca, contactos, ubicación, horarios y redes. `business.slug = "1717"` es el identificador editorial público; `business.booking.provider = "cal.com"`; `business.booking.url` contiene el enlace entregado:

https://cal.com/ezequiel-oviedo-dthlhd/barberia

`bookingLink()` valida HTTPS y dominio Cal.com. `booking()` genera CTAs de agenda; `wa()` genera consultas contextuales. Con URL ausente, agenda conserva fallback a WhatsApp. No se descarga un calendario embebido.

QA del enlace real: responde 200 y presenta horarios en 390/1440px; título `Barberia | Jonatan Ramos | Cal.com`. Actualmente el proveedor muestra **40m / Cal Video**. Corregir en la cuenta de Cal.com la ubicación presencial y la duración/servicios antes de publicación comercial. Para rulos, el propietario confirmó aproximadamente 2 horas y corte separado; el evento genérico de 40 minutos no se debe interpretar como una reserva válida de rulos. Esta landing no cambia ajustes de la cuenta externa.

Publicable: slug, booking URL, WhatsApp, branding, ubicación, horarios, Instagram, Maps. Si se habilita un formulario futuro, también endpoint público y token específico del formulario. Hoy no hay formulario ni token.

Prohibido: UUID de `barberia_id`, service role, API keys privadas de Cal.com, webhook secret, credenciales DB. Ninguno forma parte del HTML, JS, query string, almacenamiento del navegador o variables públicas. El slug no concede acceso ni decide un tenant confiable.

## Modelo de workspace futuro

Workspace ≈ barbería. Una aplicación y una base compartidas, con objetos, vistas y permisos consistentes. Una barbería nueva añade configuración, usuarios, servicios, barberos, integración y origen permitido; no añade otro CRM/backend/base. Inspiración conceptual de Twenty, sin motor de metadata ni custom objects dinámicos.

Modelo propuesto:

| Entidad | Alcance |
| --- | --- |
| `barberias` | Workspace y slug único |
| `profiles` | Identidad vinculada a Supabase Auth |
| `barberia_memberships` | Usuario, barbería, rol y estado; permite múltiples workspaces |
| `barbers`, `services`, `contacts`, `leads`, `appointments`, `tasks` | Negocio, siempre con `barberia_id` asignado/validado en servidor |
| `activity_events` | Historial por barbería, entidad, evento y actor/origen |
| `public_forms` | Slug, token público revocable, origins y estado activo |
| `cal_integrations` | Barbería, proveedor, event type/team/organizador, servicio y secret reference |
| `integration_events` | Inbox durable, deduplicación, estado, intentos y error sanitizado |
| `appointment_external_refs` | UIDs actuales y anteriores de Cal.com vinculados a la misma cita |

No usar NestJS, Redis ni BullMQ para este MVP. El inbox en Postgres y un worker/Edge Function con reintentos persistidos cubren el contrato inicial sin infraestructura extra.

## Aislamiento y RLS

Propuesta: todas las tablas de negocio habilitan RLS. Políticas de lectura y escritura comprueban membresía activa de `auth.uid()` y rol en la barbería de cada fila. Usar `USING` y `WITH CHECK`; bloquear reasignación del tenant por el cliente. Relaciones como contacto/servicio/barbero de una cita deben pertenecer al mismo tenant mediante claves compuestas `(barberia_id, id)` y FKs equivalentes.

El contexto seleccionado en el CRM es una preferencia de UI, no una autorización. Probar usuario A contra filas, escrituras, relaciones y Realtime de barbería B. El webhook usa privilegios de servidor limitados; una service role omite RLS, por lo que el handler debe imponer y comprobar el tenant resuelto. [RLS de Supabase](https://supabase.com/docs/guides/database/postgres/row-level-security).

## Contrato Cal.com

API futura: exclusivamente `https://api.cal.com/v2`. Auth y versiones por endpoint se configuran en backend conforme a su documentación, sin asumir un único header de versión para todos. [Introducción API v2](https://cal.com/docs/api-reference/v2/introduction). La suscripción puede crearse por event type mediante `POST /v2/event-types/{eventTypeId}/webhooks`, con los triggers necesarios. [Crear webhook v2](https://cal.com/docs/api-reference/v2/event-types-webhooks/create-a-webhook).

Los eventos requeridos son `BOOKING_CREATED`, `BOOKING_RESCHEDULED`, `BOOKING_CANCELLED`. La documentación actual describe un envelope `triggerEvent`, `createdAt`, `payload`, un header `x-cal-webhook-version`, y una firma `x-cal-signature-256` basada en HMAC-SHA256. Reprogramar puede producir un UID nuevo y `rescheduleUid` anterior. Fijar una versión de payload y probar sus fixtures reales antes de programar el adaptador. [Webhooks oficiales](https://cal.com/docs/developing/guides/automation/webhooks).

### Validación y tenant mapping

Diseño propuesto: endpoint compartido HTTPS con identificador opaco de integración creado por el backend. Ese identificador sólo selecciona una configuración candidata para validar firma; no es autorización. Verificar HMAC sobre bytes originales, comparación en tiempo constante, body/size/schema y triggers permitidos antes de procesar. El formato exacto del header se verifica con una entrega real y la versión configurada, sin aceptar una firma sin comprobarla.

Tras autenticar, resolver una integración activa por event type y ámbito de organizador/team previamente verificados. Campos propuestos: `id`, `barberia_id`, `cal_username`, `cal_team_id`, `cal_event_type_id`, `service_id`, `is_active`, referencia al secreto. Correspondencias deben ser inequívocas. Validar que event type y organizador corresponden a la integración autenticada; rechazar/quarantinar ausencia, conflicto o integración inactiva. El username del enlace entregado no prueba por sí solo un tenant ni un servicio. No inferir que el evento genérico `barberia` es específicamente rulos.

Los IDs reales de cuenta/team/event type y el servicio de la agenda todavía requieren configuración privada futura. La firma prueba al emisor; los campos que ingresó el cliente, incluso metadata, no autorizan tenant selection.

### Inbox, idempotencia y orden

Propuesta de `appointments`: `external_provider = 'cal.com'`, `external_booking_uid`, constraint `UNIQUE(external_provider, external_booking_uid)`. Añadir refs con la misma unicidad para todos los UIDs de una cadena; una colisión contra otro tenant es un error, nunca una reasignación.

`integration_events` almacena hash del body autenticado, integración, trigger, UID y estado `received/processing/processed/failed/quarantined`. Una clave única del evento (ID estable del proveedor si existe; de lo contrario hash de payload autenticado e integración) impide ejecutar el mismo mensaje repetido. No deduplicar sólo por booking UID: cancelación y reprogramaciones son eventos diferentes.

Guardar durablemente antes de reconocer la recepción. Duplicado procesado devuelve éxito sin repetir efectos. El procesamiento de contacto, cita, refs, actividad y estado del inbox debe ser transaccional, con bloqueo por cita/cadena y reintentos. Fallos de almacenamiento devuelven error; fallos posteriores se recuperan desde el inbox. Proteger contra replay mediante idempotencia y controles de fecha compatibles con reintentos, sin descartar automáticamente una entrega tardía válida.

No asumir orden de entrega. Comparar versión/fecha/estado y, ante conflicto, reconciliar contra API v2 en backend. No revivir una cancelación por un create tardío. Una cancelación del UID sustituido no cancela silenciosamente la nueva reserva.

### Comportamiento por evento

| Evento | Operación propuesta |
| --- | --- |
| `BOOKING_CREATED` | Validar, resolver tenant, upsert contacto dentro del tenant por identidad normalizada confirmada, mapear servicio, crear/upsert cita, origen, actividad y marcar inbox procesado |
| `BOOKING_RESCHEDULED` | Buscar UID actual o anterior, actualizar la **misma cita interna**, registrar nuevo UID y conservar refs e historial |
| `BOOKING_CANCELLED` | Marcar la cita correspondiente `cancelled`, conservar motivo/historial; no borrar |

Si llega reprogramación/cancelación antes del create, persistir para reconciliación; no crear citas huérfanas ni adivinar el contacto. Fechas se almacenan en UTC; visualización con `America/Asuncion`. La duración confirmada de rulos es aproximada y no sustituye la configuración del evento en Cal.com.

### Origen y atribución

Objetivo: `source = website` para reservas atribuibles a la web. La landing conserva por ahora el enlace limpio entregado. Cal.com documenta parámetros estándar `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content` en booking links y su captura. [UTM tracking](https://cal.com/help/bookings/utm-tracking). También permite prefill de preguntas por sus identificadores. [Prefill oficial](https://cal.com/help/bookings/prefill-fields).

No se añadió metadata custom ni se promete que un UTM aparecerá en una ubicación particular del webhook. Futuro: verificar una reserva de QA y el payload antes de definir el mapping de UTMs; aceptar sólo campos acotados, sin PII ni autoridad de tenant. Alternativa: event type/integración dedicado al sitio, confirmado server-side. Si el mismo enlace se usa en Instagram/directo, la integración identifica la barbería pero **no prueba** `source=website`; conservar origen desconocido/Cal.com hasta tener evidencia. No registrar todas las reservas del evento compartido como web.

## Formulario propio futuro

La revisión local de `dental-crm/supabase/functions/lead-intake/index.ts` confirma el principio: slug/token consultan registro de formulario activo y permiten al servidor resolver el tenant. Referencia conceptual: [dental-crm](https://github.com/otiagoo44/dental-crm).

Propuesta: landing → endpoint público compartido → `barberia_slug` + `landing_token` → registro `public_forms` → resolución de `barberia_id` en backend. Nunca inserts directos a tablas desde la landing. El token es público, revocable y limitado a intake; no es un secreto ni permiso de lectura. Validar campos, consentimiento aplicable, origins permitidos, anti-spam, rate limit e idempotency key. CORS sólo limita navegadores; no autentica al emisor. Rechazar cualquier tenant UUID suministrado por el cliente y responder sin exponer IDs internos.

## Validación obligatoria del backend futuro

- Firmas válidas/inválidas, body alterado, versiones desconocidas y rotación de secretos.
- Event types de tenants diferentes, mapping ambiguo/inactivo y payload con tenant manipulado.
- Duplicados concurrentes, retries tras fallos, reprogramación con UID nuevo y orden invertido.
- Cancelación sin borrar historial; cancelación del UID anterior; igualdad de tenant en relaciones.
- Contactos separados por barbería, aislamiento RLS/Realtime y roles.
- Booking real controlado de QA, source/UTMs comprobados y recuperación del inbox.

No se ejecutan esos flujos en esta entrega: pertenecen al repositorio `barberia-crm` futuro. Los secrets/API keys se guardarán exclusivamente en backend/Supabase secrets.
