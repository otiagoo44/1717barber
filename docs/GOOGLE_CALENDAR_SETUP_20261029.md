# Google Calendar y puesta en marcha — 29/10/2026

CRM: `C:\htdocs\tiago-systems\barberia-crm`, repositorio `otiagoo44/barberia-crm`. La landing y sus assets no se modificaron durante esta tarea. PR de implementación: https://github.com/otiagoo44/barberia-crm/pull/11, HEAD revisado `aac0dce06204aa586aa57a964310145f810d458a`. [CI final](https://github.com/otiagoo44/barberia-crm/actions/runs/40966099650).

Integrado normalmente a `main` con commit `71b59fc17b2bc289e571686726e360afbe9b554c`, sin modificar la protección de la rama. `quality`, `supabase-e2e` y `visual-baseline` terminaron en success sobre el HEAD revisado. [Recibo de integración](qa/calendar-setup-20261029/merge.json).

Vercel producción `dpl_FkkZMwyKennc7rvuL27gPbMZADab` terminó READY y asignó `barberia-crm-kappa.vercel.app` al mismo commit. [Lectura del deployment](qa/calendar-setup-20261029/crm-deployment.json). La comprobación del enlace real aprobó health/ready, catálogo de ocho servicios, disponibilidad, Calendar sin sesión rechazado por HTTP 401 y worker sin secreto rechazado por HTTP 403. El worker autenticado respondió 200 con OAuth todavía no configurado y cero trabajos realizados. Landing pública HTTP 200. [Recibo HTTP sin secretos](qa/calendar-setup-20261029/production-http.json).

## Indicadores corregidos

El diagnóstico anterior obligaba a mostrar «Reservas públicas» como manual y exigía dos factores MFA a todos los profesionales dentro de la comprobación general del equipo. Eso mezclaba configuración operativa, acceso personal y recuperación externa.

Ahora consulta el contrato público JSON y disponibilidad del CRM, además de una cita pública existente en esa sucursal. Una lista vacía válida en un domingo o día sin cupos no significa que falte configurar horarios. La configuración del equipo se comprueba por asignación y servicios; el acceso personal tiene otro indicador, con correo, contraseña inicial, membresía y MFA según la política real de cada rol. No se cambió ni debilitó la autenticación del servidor. Un segundo factor/recuperación se muestra por separado. El resumen distingue comprobadas, pendientes y manuales.

Lectura real de producción:

| Comprobación | Resultado |
| --- | --- |
| Organización y Luque: reservas habilitadas | Ambos flags true |
| Servicios con precio y duración | 8 |
| Citas públicas existentes | 2, preservadas |
| Intervalos semanales configurados | 24 |
| Métodos de pago activos | 4 |
| Métodos de tarjeta | 2 |
| Tarjetas con tarifa vigente y referencia | 0; pendiente real |
| Métodos de tarjeta con conciliación vigente | 0; pendiente real |
| Esteban | Cuenta vinculada, correo confirmado, contraseña sustituida y un factor verificado |
| Jonatan | Cuenta vinculada; correo, contraseña inicial y MFA aún pendientes |

Backups externos, restauración independiente, entrega SMTP y recepción de alertas no se marcaron como realizados sin evidencia. El diagnóstico no los presenta como inexistentes: diferencia su verificación manual.

## Calendar implementado

Cada profesional conecta personalmente la misma cuenta Google que su correo del CRM. El propietario consulta estados, pero no autoriza cuentas ajenas. Se crea un calendario secundario del negocio y sólo se solicita acceso a calendarios creados por la app (`calendar.app.created`, junto a identidad/email).

La cola se escribe en la transacción de la cita y el worker proyecta después. Contempla creación, servicios/horarios, reasignación de profesional y cancelación; al conectar incorpora citas futuras activas. Eventos con ID determinista, verificación de propiedad, leases, revisiones, backoff y reintentos acotados. Un fallo externo no impide guardar una reserva. Tokens cifrados con AES-256-GCM y contexto de organización/profesional/perfil; sin contactos, nombres de clientes ni notas privadas en los eventos. Cambios desde Google no actualizan el CRM. Desconectar detiene la proyección y borra la credencial del CRM; conserva los eventos anteriores en Google.

Migraciones `20261029220000`, `20261029221000` y `20261029223000` aplicadas primero en staging y después en producción mediante la CLI oficial, sin reescribir historia. Ambos proyectos tienen 46 migraciones. La tercera impide que una membresía exclusivamente financiera conserve exportación operativa por un vínculo previo de profesional. Se verificaron `pg_net`, el cron de despacho, RLS privado, filtro de rol al reclamar trabajos y cero funciones públicas security definer. El worker productivo tiene secreto dedicado y clave de cifrado en Vercel; el hash vive en el gateway y el bearer de despacho en Supabase Vault. [Recibo sin secretos](qa/calendar-setup-20261029/production-worker.json), [lectura posterior a las migraciones](qa/calendar-setup-20261029/database-readback.json).

**Google aún no está activado:** faltan crear Google Cloud, habilitar Calendar API y configurar el cliente OAuth web. El usuario indicó que el proyecto no existe. Chrome rechazó el acceso; luego de habilitar/reinstalar y enviar @Chrome, el conector mantiene `The browser access host is unavailable`, incluso tras reiniciar el runtime de la herramienta. No se eludieron permisos ni se extrajeron cookies o sesiones. No se crearon calendarios, eventos ni mensajes reales. Producción conserva cero conexiones y cero trabajos Calendar mientras faltan esas autorizaciones.

Retorno OAuth exacto: `https://barberia-crm-kappa.vercel.app/api/calendar/callback`. Variables pendientes: `GOOGLE_CLIENT_ID` y `GOOGLE_CLIENT_SECRET`, sólo en el CRM y en el entorno correspondiente. Después se redespliega y cada profesional autoriza su cuenta. No compartir secretos por chat. [Guía completa versionada en el CRM](https://github.com/otiagoo44/barberia-crm/blob/main/docs/GOOGLE_CALENDAR.md).

## Pruebas

Lint, typecheck y build Next; 40 unit tests entre suite y casos adicionales; suite SQL completa con regresiones de finanzas/permisos/agenda y contratos nuevos de aislamiento, estado OAuth de un solo uso, secreto privado, leases vencidos, revisiones, reintentos, cancelación, reasignación y revocación. API Google interceptada exclusivamente en pruebas; conflicto 409 no duplica evento y cuota 403 reintenta sin confundirla con revocación.

UI a 390/1440: configuración pendiente deshabilita el botón, cada cuenta sólo opera su vínculo, desconexión explícita, resumen de comprobaciones correcto, sin overflow, consola limpia y Axe 0. Evidencia en el PR del CRM.

Además se construyó Next optimizado apuntando exclusivamente a Supabase staging `zdogqqmitpbwjgohwcww`. El owner sintético inició sesión y verificó MFA reales; se consultaron los endpoints nuevos de setup y Calendar sin enviar reservas ni eventos. Servicios, equipo, horarios, booking y sesión resultaron ready; acceso personal incompleto y POS conservaron pending. Otro tenant fue rechazado por HTTP 403. [Recibo real de staging, sin credenciales](qa/calendar-setup-20261029/staging-http.json).

## Continuación del alta de Google

Recuperar el conector de Chrome (puede requerir reiniciar ChatGPT Desktop/Chrome tras reinstalarlo) y retomar desde este informe y `docs/CALENDAR_SETUP_CONTINUAR.md` del CRM. Revisar primero PR/main/deployment para no duplicar cambios. Las claves del worker y cifrado ya están preparadas; no regenerarlas ni rotarlas. Nunca confundir el Google Calendar conectado a ChatGPT con la autorización runtime del CRM o con la cuenta personal de Esteban/Jonatan.
