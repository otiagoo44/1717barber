# Reservas nativas de Barbería OS

La arquitectura vigente es **17:17 landing → /reservar → /book/{organization}/{branch} del CRM → PostgreSQL/Supabase**. La landing permanece estática. No calcula cupos ni crea reservas, y Cal.com ya no forma parte del flujo.

## Estado auditado

El código real auditado es `otiagoo44/barberia-crm`, commit `922df3e`. La base conectada contiene el esquema operativo con RLS, pero ninguna organización, sucursal ni servicio. Los seeds son exclusivamente demostraciones locales. No existen slugs verificados de 17:17 o Luque. La URL prevista, confirmada por el usuario, es https://barberia-crm.vercel.app; aún no existe despliegue comprobable.

## Activación

1. Desplegar el CRM y aplicar su migración `20261012210000_website_booking.sql` mediante su procedimiento normal. No hace falta acceso de la landing a Supabase ni al gateway.
2. Crear la organización 17:17 y sucursal Luque desde el CRM con sus slugs definitivos. Habilitar reservas, horarios, staff, capacidades y servicios del local.
3. En cada servicio asignar `website_category`: corte, rulos, tinte, barba, infantil, cejas o lavado. Es una clasificación editorial explícita; el identificador de reserva siempre es el slug canónico del servicio. Dos servicios de tinte pueden compartir categoría. Corte y Rulos requieren un servicio canónico cada uno para sus CTA editoriales actuales.
4. Rulos: activar consulta previa. La DB impide categorizarlo como rulos sin esa regla; disponibilidad y reserva públicas lo rechazan. Recepción puede reservar internamente luego de evaluar.
5. Registrar precios confirmados en Servicios y precios del local. La diferencia entre tinte global (planilla: Gs. 250.000) y mechas (Gs. 180.000) requiere confirmación y carga real; estos montos no se copian automáticamente. Hasta entonces no se publica el precio genérico de Gs. 200.000.
6. Comprobar GET `/api/public/catalog?organization=<slug-real>&branch=<slug-real>`. Debe devolver currency PYG, `website_booking_version: 1` y la sucursal correcta con sus servicios. No usar UUID.
7. Configurar las tres variables públicas en Vercel y reconstruir la landing.
8. Verificar Agendar sin selección, Corte con el slug real y Rulos por WhatsApp, además de una reserva de prueba autorizada en staging. No enviar reservas ficticias a producción.

## Variables de la landing

| Variable pública | Valor |
| --- | --- |
| BARBERIA_OS_PUBLIC_URL | https://barberia-crm.vercel.app |
| BARBERIA_OS_ORGANIZATION_SLUG | Copiar el slug real de 17:17 del CRM; pendiente |
| BARBERIA_OS_BRANCH_SLUG | Copiar el slug real de Luque del CRM; pendiente |
| SITE_URL (opcional) | https://1717barber.vercel.app; cambiar sólo al confirmar nuevo canonical |

Sin slugs, WhatsApp conserva la coordinación. Configuración parcial, slugs inválidos, URL con credenciales y catálogo no compatible detienen el build. Con configuración completa, no se utiliza un catálogo editorial de respaldo ante errores del CRM. Los precios/duraciones visibles son un snapshot de su catálogo público al construir: reconstruir la landing después de modificarlos. La reserva siempre recalcula y valida los valores actuales en PostgreSQL.

## Seguridad y despliegue

Nunca copiar service_role, claves Supabase, DB password ni BOOKING_GATEWAY_SECRET a la landing. `dist` contiene sólo HTML y assets locales; no exporta el catálogo completo con staff ni datos privados. El navegador sale al CRM por un enlace HTTPS, sin proxy, embed, token ni PII en la query. Instagram, Maps y WhatsApp continúan como enlaces externos.

El build sigue siendo `npm run build`, salida `dist`, cleanUrls y trailingSlash=false. CSP y nosniff se prueban también con preview local; HSTS sólo se configura para el host HTTPS de producción actual. Si cambia el dominio, actualizar la condición host en vercel.json junto a SITE_URL. Sintaxis de cabeceras condicionales: [documentación oficial de Vercel](https://vercel.com/docs/project-configuration/vercel-json#headers).
