# Auditoría de integración — 12/10/2026

- Landing: main, base 7ec4570, diseño y medios aprobados preservados. Tres borrados locales preexistentes de originales de img/ no forman parte de esta integración.
- CRM: clon real de https://github.com/otiagoo44/barberia-crm, main 922df3e. Rutas/APIs/RPC nativas, RLS, duración/capacidad server-side, rate limiting, idempotencia y exclusión GiST de cruces de staff confirmados en código.
- Supabase conectado: el esquema del CRM existe. Lectura de organizations, branches y services devuelve cero registros. Sin slugs de 17:17/Luque/servicios verificables; sin staff/configuración operativa.
- Vercel accesible: no se encontró proyecto desplegado barberia-crm. El usuario confirmó URL futura https://barberia-crm.vercel.app.
- Comprobación pública final: esa URL responde HTTP 200 con un starter NextSpark; /api/public/catalog y /book/fixture-a/a1 muestran HTML de Not Found. No sirve el contrato de Barbería OS. La base remota sigue vacía. Asociar la URL al despliegue real del CRM antes de activar los slugs; el build rechaza HTML aunque el estado HTTP sea 200.
- Tinte genérico Gs. 200.000 se retira. Planilla aportada: Global Gs. 250.000 / Mechas Gs. 180.000; pendientes de validación/carga en CRM, no publicados como hechos operativos.

## Pendiente de producción

Crear y habilitar organización/sucursal/servicios/staff/horarios reales, aplicar la nueva migración y desplegar CRM. Copiar slugs públicos reales a Vercel y reconstruir. Revalidar catálogo, links y reserva de staging desde el deployment. Las pruebas con fixtures no certifican la configuración productiva que aún no existe.
