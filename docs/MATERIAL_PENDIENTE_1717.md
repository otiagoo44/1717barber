# Material y ajustes pendientes de 17:17

Actualizado en la pasada de finalización del 12 de octubre de 2026. Fotos actuales de cortes/rulos, cinco imágenes de productos, tres vistas del local y enlace real de agenda ya están integrados. No hace falta pedirlos de nuevo.

## Necesario antes de la publicación comercial

- **Cal.com:** el enlace recibido abre y ofrece horarios, pero el evento externo muestra **40 minutos** y **Cal Video**. Revisar duración, atención presencial y qué servicio se puede reservar. Rulos dura aproximadamente dos horas, no incluye corte y requiere consulta individual por largo/condiciones. No se modificó la cuenta de Cal.com desde esta landing ni se creó una reserva de prueba.
- **Retratos individuales actuales:** uno de Jonatan y otro de Esteban, con calidad y encuadre equivalentes. Los componentes ya tienen la misma jerarquía y señalan explícitamente que falta el retrato. La foto conjunta actual se conserva.

## Contenido opcional para completar después

- Nombre/presentación exactos e imagen del producto Immortal para barba. No se publicó una ficha sin identificar.
- Fotografías originales limpias de los productos para mejorar los recortes existentes, sin cambiar su identidad.
- Cuidados posteriores o descripción técnica del servicio de rulos, sólo si los confirma 17:17.
- Testimonios reales con texto, nombre publicable y fuente verificable. No se inventaron reseñas ni estrellas.
- Logo vectorial y fotos de rulos de mayor resolución como mejoras de calidad.

## Información ya confirmada

Rulos: **Gs. 180.000**, corte por separado, aproximadamente **2 horas**; evaluar largo y condiciones por consulta. Agenda: `https://cal.com/ezequiel-oviedo-dthlhd/barberia`. Consultas y productos: WhatsApp `0983 402 497`. Jonatan y Esteban: ambos cofundadores, con igual jerarquía.

Las presentaciones ya están completadas desde los dos videos indicados por el usuario: primero Esteban (`08.01.33`), segundo Jonatan (`08.01.23`). Su evidencia y los textos están registrados en [FOUNDER_CONTENT.md](FOUNDER_CONTENT.md). No falta pedir bios de nuevo.

El contenido público se mantiene en `src/data.mjs`. Reemplazar ambos `founders[].image` con retratos equivalentes y ejecutar `npm run build`; no es necesario rehacer la sección. El contrato futuro del CRM vive en [BARBERIA_CRM_INTEGRATION.md](BARBERIA_CRM_INTEGRATION.md).

## QA actualizado de esta continuación

Se completó el QA después de la última optimización de sizes/hero/observer: 18 combinaciones responsive, Axe sin hallazgos, enlaces, teclado/foco, diálogos, FAQ, no-JS, reduced motion, cinco reels reales y entradas animadas PASS. Se revisaron capturas nuevas y comparación con el diseño aprobado. Tests 7/7, build y DESIGN lint PASS. Evidencia en [qa/final-content/verified](qa/final-content/verified).

Lighthouse local: Performance 85/85/98; accesibilidad, buenas prácticas y SEO 100 en Home/Rulos/Productos. CLS 0; LCP 2,56/2,72/1,89s, TBT 379/361/105ms. Validar luego en CDN y con datos reales; no se declara Core Web Vitals PASS. La inspección externa nueva confirma Cal.com todavía en 40m/Cal Video. El usuario autorizó push a main; Cal.com y los retratos siguen pendientes antes de publicación comercial.
