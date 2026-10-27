# Preparar integración con el CRM real y conservar el bloqueo de activación

Crear como **Draft**, base `main`, head `fix/crm-booking-integration`.

El catálogo productivo de Barbería OS para `1717-barberia/luque` devuelve 404 JSON y el booking alojado no presenta formulario. Esta entrega prepara la integración y conserva la landing productiva con WhatsApp hasta que el CRM complete sus gates.

Corrige el origen a `https://barberia-crm-kappa.vercel.app` y la proyección de Rulos/Combo, que comparten categoría editorial. Mantiene nombres/precios/duraciones del catálogo, consultas previas para Rulos/Combo/Tintes y valida profesionales habilitados. No cambia CSS, medios, animaciones ni composición. Actualiza contrato, activación y evidencia.

Las cuatro variables públicas fueron guardadas y releídas en el proyecto `1717barber`, con una entrada por variable para Production/Preview/Development. SITE_URL conserva el alias/canonical existente. No se agregaron secretos. Con estos slugs, nuevos builds deben fallar mientras el catálogo siga cerrado; el preview automático terminó ERROR por ese 404. No hubo publicación nueva ni se habilitaron flags del CRM.

Validación: 18 tests de landing, build local de contacto, verify-dist, 10 combinaciones ruta/viewport locales y 10 productivas con Axe 0/console errors 0. En el SHA productivo del CRM `cac194123ebfa779bafb344423f63b327c4dce7e`: 30 unitarias, 51 contratos en PostgreSQL desechable y contratos de configuración 17:17 aprobados, incluyendo cliente/cita, idempotencia, concurrencia, atribución website, pausa y domingo. El build con configuración real se bloqueó por el 404 antes de generar HTML.

Pendiente antes de merge/publicación: gates personales/operativos del CRM, catálogo público válido, revisión de horario editorial 08:00 frente a 09:00 confirmado, nueva prueba E2E en staging y reserva productiva real consentida con verificación en Agenda. No se crearon reservas ficticias productivas ni se certifica integración completa. WhatsApp abre contacto y no registra leads.

Informe y recibos: `docs/CRM_INTEGRATION_20261027.md` y `docs/qa/crm-integration-20261027/`.
