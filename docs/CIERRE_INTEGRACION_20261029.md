# Cierre landing ↔ CRM — 29/10/2026

La landing pública https://1717barber.vercel.app usa el catálogo real del CRM https://barberia-crm-kappa.vercel.app, organización `1717-barberia`, sucursal `luque`, Supabase `tbcfhagteyqufjkmbxzz`. El flujo landing → booking alojado → cliente/cita → Agenda está activo. La landing ya había llegado a main mediante el PR #1 (`9cc87c4`); esta entrega completa el aviso manual por WhatsApp en el CRM y corrige una promesa rechazada al abortar transiciones entre páginas, conservando su animación y reduced motion.

## Carpetas y GitHub

| Uso | Carpeta | Repositorio |
| --- | --- | --- |
| Landing | `C:\htdocs\1717barber` | `otiagoo44/1717barber`, main |
| CRM actualizada | `C:\htdocs\tiago-systems\barberia-crm` | `otiagoo44/barberia-crm`, main |
| CRM antigua | `C:\htdocs\barberia-crm` | Mismo repositorio; se encontró en `aa8b0e7`, 84 commits atrás de `cac1941` |

Vercel publica desde el repositorio/rama de GitHub, no desde una carpeta local. Cualquiera de las dos copias podría enviar commits si se hiciera push; para trabajo futuro usar la de **tiago-systems**. La copia antigua y el worktree temporal de auditoría se conservaron intactos. No copiar manualmente archivos entre clones ni trabajar sobre el worktree temporal.

## Verificación actual

- Las cuatro variables públicas de Vercel fueron reconsultadas: origen CRM `-kappa`, organización `1717-barberia`, sucursal `luque` y `SITE_URL=https://1717barber.vercel.app`; entradas únicas compartidas por Production/Preview/Development, sin overrides ni secretos.
- Catálogo 200 JSON, contrato 1, PYG, ocho servicios: Corte de pelo, Barba, Perfilado de cejas, Lavado, Rulos, Combo Rulos y Corte, Tinte Global y Tinte Mechas. El build publica sus nombres/precios/duraciones reales.
- Ambos profesionales ofrecen capacidad futura. Domingo cerrado; ningún turno de Esteban atraviesa 12:00–12:30. Disponibilidad rechaza Rulos/Combo/Tintes e inexistentes. Health/readiness 200. [Lectura pública](qa/final-20261029/public-read.json).
- Reserva real consentida del 27/10, ingresada manualmente por el usuario: reconsulta del 29/10 confirma una cita y un cliente, Corte/Jonatan, 19:50–20:30, Gs. 30.000, contacto válido, `source=public` y `booking_attribution=website`. El nombre coincide con el observado en Agenda. El primer recibo esperaba otro nombre; no era un fallo del guardado. No se modificó el cliente, no se reenvió la reserva ni se creó una nueva ficticia. [Reconsulta sin contacto personal](qa/final-20261029/booking-readback.json).
- La conversación guardada conserva la observación de la cita y su detalle en Agenda. Clientes ya ofrece WhatsApp en lista/ficha y seguimiento; ese mensaje lo envía manualmente el operador.
- Las pruebas de creación, Auth/MFA, idempotencia, concurrencia y aislamiento reales de staging del 27/10 se conservan en [go-live](GO_LIVE_20261027.md). No se repitieron escrituras productivas para simular esas pruebas.

## Aviso a Esteban después de reservar

El CRM agrega **Avisar por WhatsApp** sólo después de recibir confirmación real del servidor. Usa el teléfono de Luque publicado en el catálogo: `+595983402497`, confirmado por el usuario como número de Esteban. El mensaje contiene servicios, profesional solicitado si se eligió uno, fecha/hora del local, duración y referencia. Con «Cualquiera disponible» no inventa el profesional asignado. No incorpora nombre/teléfono/correo del cliente. No abre WhatsApp solo ni envía mensajes automáticamente. Si falta un teléfono válido, la reserva sigue confirmada y el botón se omite.

CRM PR: https://github.com/otiagoo44/barberia-crm/pull/10. El cambio usa el backend y catálogo existentes; no requiere migraciones, nuevos secretos ni relajar Origin/CORS/RLS.

## Pruebas de esta entrega

- Landing: 19/19 unit tests, build con catálogo productivo, `verify-dist`; cinco rutas × móvil/escritorio, SEO/canonical/CSP/HSTS, enlaces seguros, sin JavaScript, Axe 0 y consola limpia. Se añadieron seis navegaciones con movimiento normal/reducido para la regresión de transición. [QA local](qa/final-20261029/local/browser.json), [QA publicado](qa/final-20261029/production/browser.json).
- CRM: lint, typecheck, 32/32 unit tests, build Next optimizado y 18 escenarios de navegador en localhost. Confirma el aviso únicamente tras éxito, destino/contenido, ausencia sin teléfono, rechazo 409 sin éxito ficticio y una sola petición por intento. WhatsApp interceptado: cero mensajes enviados. [Evidencia CRM](https://github.com/otiagoo44/barberia-crm/tree/fix/booking-confirmation-whatsapp/docs/verification/booking-whatsapp-20261029).
- La publicación definitiva se identifica por los SHA de main y recibos de deployment asociados a este cierre. No se confunde el preview/staging con el alias productivo.

## Qué queda para la operación completa

1. **Jonatan debe completar su acceso personal:** confirmar correo, sustituir contraseña inicial y activar MFA. La lectura del 29/10 encontró esas tres acciones pendientes. Esteban tiene correo confirmado, contraseña sustituida, membresía activa y un factor verificado; el usuario confirmó su acceso a Agenda, Clientes, Caja y reportes.
2. **Respaldo operativo:** conservar recuperación independiente de autenticadores y completar la copia externa de backups que el usuario pospuso. No se certifica una copia externa ni una nueva restauración en esta entrega.
3. **Finanzas:** validar tarifas POS y conciliación antes de dar por definitivos costos y repartos. No bloquea las reservas.

Las consultas previas de WhatsApp siguen sin convertirse automáticamente en leads. Es una mejora adicional si se desea, igual que las notificaciones automáticas. Cada cambio de catálogo exige reconstruir/desplegar la landing estática. El servidor del CRM siempre recalcula el precio y la duración vigentes al reservar. Los retratos reales y material comercial restante son pendientes de contenido, no del flujo de agenda.
