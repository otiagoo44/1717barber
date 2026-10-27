# Reservas nativas de Barbería OS

La arquitectura existente se conserva: **landing → /reservar → booking alojado del CRM → cliente/cita en Supabase → Agenda**. La landing es estática; no calcula cupos ni envía POST cross-origin.

## Estado al 27/10/2026

CRM auditado: `cac194123ebfa779bafb344423f63b327c4dce7e`, deployment `dpl_44EraSc6jHx8WqbpF9iBN4tgwmEn`, origen `https://barberia-crm-kappa.vercel.app`. El catálogo público de `1717-barberia/luque` devuelve **404 JSON**. La página book responde HTML, pero eso no acredita catálogo ni disponibilidad operativa.

El [handoff del CRM](https://github.com/otiagoo44/barberia-crm/blob/cac194123ebfa779bafb344423f63b327c4dce7e/docs/HANDOFF_LANDING_1717.md) informa que la configuración productiva existe y ambos flags de booking permanecen deshabilitados. No repetir onboarding, migraciones o carga de servicios basándose en auditorías históricas de una base vacía. La apertura depende de cuentas/confirmación/cambio de contraseña/MFA personales, controles operativos y piloto consentido según el handoff vigente.

La landing productiva se conserva con WhatsApp. Las variables de Vercel quedan preparadas; **todo nuevo build con esos slugs fallará hasta recibir un catálogo válido**. No sustituir el fallo por un snapshot editorial ni activar reservas para desbloquear un deploy.

## Variables públicas

| Variable | Valor confirmado |
| --- | --- |
| BARBERIA_OS_PUBLIC_URL | https://barberia-crm-kappa.vercel.app |
| BARBERIA_OS_ORGANIZATION_SLUG | 1717-barberia |
| BARBERIA_OS_BRANCH_SLUG | luque |
| SITE_URL | https://1717barber.vercel.app |

Configuradas como cuatro entradas únicas, cada una compartida por Production, Preview y Development, sin overrides por rama. SITE_URL es sólo SEO: se verificaron el alias productivo y su canonical antes de guardarlo. No cambia el dominio existente. `.env.example` es una plantilla y los scripts Node no la cargan automáticamente.

Para revisar localmente el estado histórico de contacto, un build sin ambos slugs conserva WhatsApp. Ese build local no certifica el catálogo ni se publica con las variables productivas sustituidas.

## Activación pendiente

1. Completar los gates del CRM con sus propietarios, sin sustituir su MFA ni abrir los flags desde la landing.
2. Consultar exclusivamente `GET https://barberia-crm-kappa.vercel.app/api/public/catalog?organization=1717-barberia&branch=luque`: exigir HTTP correcto, JSON, versión 1, organización/sucursal, PYG, servicios y profesionales habilitados. 200 HTML, 404 o `branches: []` bloquean el build.
3. Revisar Corte, Barba, Cejas, Lavado, Rulos, Combo y ambas variantes de Tinte según su publicación real. No publicar precios sacados del plan de onboarding ni del informe privado: sólo los del catálogo público válido. Las categorías editoriales no sustituyen slugs. Rulos y Combo pueden compartir `website_category=rulos`; el slug `rulos` conserva el destacado, Combo mantiene nombre/precio/duración propios sin sumar Corte.
4. Verificar que Rulos, Combo y Tintes indiquen consulta previa y no sean reservables por URL/API. Comprobar además servicios inexistentes, domingo cerrado, pausa de Esteban y turnos de Jonatan. Revisar la diferencia histórica entre horario 08:00 de la landing y 09:00 confirmado en el handoff; no certificar horarios de agenda desde texto editorial.
5. Ejecutar tests, build con configuración real, `node scripts/verify-dist.mjs` y QA móvil/escritorio. `QA_EXPECTED_SERVICE_COUNT` permite indicar la cantidad recibida; `QA_URL` permite comprobar producción con HSTS. La prueba de reservas de clientes ficticios debe ir exclusivamente a staging.
6. Publicar sólo tras verificar catálogo, disponibilidad y gates. Probar en producción con una reserva real consentida y verificar cliente/contacto/servicio/profesional/fecha/hora/estado y atribución en Agenda, más reintento idempotente. No afirmar integración completa antes de esa comprobación.

Enlaces preparados por el código, aún sin activar en la landing productiva:

- General: `https://barberia-crm-kappa.vercel.app/book/1717-barberia/luque?source=website`
- Corte: `https://barberia-crm-kappa.vercel.app/book/1717-barberia/luque?service=corte-de-pelo&source=website`

## Actualizar el catálogo

Los precios y las duraciones se incorporan **durante el build**. Cada cambio de servicios, clasificación, precio o duración en el CRM requiere reconstruir y desplegar la landing. No hay sincronización en tiempo real. Ante errores del CRM con slugs configurados, el build se detiene y el deployment anterior permanece vigente. La reserva recalcula los valores actuales en el servidor del CRM.

## Seguridad y consultas

La landing sólo requiere las cuatro variables públicas. No agregar credenciales Supabase, DB, gateway, SMTP, JWT privados ni sesiones. CSP conserva `connect-src 'self'`, `frame-src 'none'`, `form-action 'none'`; no se modifican Origin, CORS, rate limiting ni protección de despliegues.

La consulta muestra: «Este servicio requiere evaluación previa. Escribinos para coordinarlo.» Abrir WhatsApp no registra un lead ni confirma una reserva. No se encontró un endpoint público de recepción de consultas en la API auditada; esa integración adicional queda pendiente. No hay mensajes automáticos.

El formulario del CRM informa que usa los datos para gestionar la visita. Deben revisar los propietarios la información de privacidad aplicable antes de abrir al público. No añadir consentimiento comercial implícito ni colocar datos de clientes en URLs, analítica o logs.

Evidencia y limitaciones de esta pasada: [informe](CRM_INTEGRATION_20261027.md).
