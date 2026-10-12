# Material y ajustes pendientes de 17:17

Actualizado el 12 de octubre de 2026. Fotos actuales de cortes/rulos, cinco imágenes de productos, tres vistas del local y presentaciones de ambos cofundadores ya están integrados. La galería ampliada reúne 27 fotos y 16 videos disponibles y aptos. No hace falta pedir ese material de nuevo. La agenda web permite elegir servicio; falta configurar la cuenta externa.

## Necesario antes de la publicación comercial

- **Cal.com:** 40 minutos confirmado para corte. Separar servicios: rulos/tinte 120 minutos, servicios cortos bloques de 40 y lavado 10. Cambiar Cal Video (videollamada) a presencial; configurar dos barberos, horarios independientes y asignación automática Round Robin/Maximize availability, con excepciones por fecha cuando trabaja el segundo. El acceso a `app.cal.com` fue denegado en el navegador; no se modificó la cuenta, compró plan ni creó reserva. [Pasos exactos y estructura](BOOKING_SETUP.md). Hasta verificar esos eventos, `/reservar` coordina cada servicio por WhatsApp y no usa el evento genérico de 40 minutos.
- **Retratos individuales actuales:** uno de Jonatan y otro de Esteban, con calidad y encuadre equivalentes. Los componentes ya tienen la misma jerarquía y señalan explícitamente que falta el retrato. La foto conjunta actual se conserva.

## Contenido opcional para completar después

- Nombre/presentación exactos e imagen del producto Immortal para barba. No se publicó una ficha sin identificar.
- Fotografías originales limpias de los productos para mejorar los recortes existentes, sin cambiar su identidad.
- Cuidados posteriores o descripción técnica del servicio de rulos, sólo si los confirma 17:17.
- Testimonios reales con texto, nombre publicable y fuente verificable. No se inventaron reseñas ni estrellas.
- Logo vectorial y fotos de rulos de mayor resolución como mejoras de calidad.

## Información ya confirmada

Rulos: **Gs. 180.000**, corte por separado, aproximadamente **2 horas**; evaluar largo y condiciones por consulta. Corte 40 minutos; tinte 2 horas; barba/infantil/cejas bloque de 40; lavado 10. Sin combinaciones. Asignación automática al barbero disponible. Agenda web `/reservar`; enlace recibido conservado como referencia de Cal.com. Consultas y productos: WhatsApp `0983 402 497`. Jonatan y Esteban: ambos cofundadores, con igual jerarquía.

Las presentaciones ya están completadas desde los dos videos indicados por el usuario: primero Esteban (`08.01.33`), segundo Jonatan (`08.01.23`). Su evidencia y los textos están registrados en [FOUNDER_CONTENT.md](FOUNDER_CONTENT.md). No falta pedir bios de nuevo.

El contenido público se mantiene en `src/data.mjs`. Reemplazar ambos `founders[].image` con retratos equivalentes y ejecutar `npm run build`; no es necesario rehacer la sección. El contrato futuro del CRM vive en [BARBERIA_CRM_INTEGRATION.md](BARBERIA_CRM_INTEGRATION.md).

Los barberos no tienen horario individual fijo: se cubren según puedan. La agenda debe operar por cobertura de cada fecha/franja, abriendo ambos sólo cuando estén presentes juntos. No copiar el horario del local a los dos. Falta cargar cobertura confirmada y verificar qué servicios atiende cada barbero; esos datos no se inventaron.

## QA histórico anterior a servicios y galería ampliada

Se completó el QA después de la última optimización de sizes/hero/observer: 18 combinaciones responsive, Axe sin hallazgos, enlaces, teclado/foco, diálogos, FAQ, no-JS, reduced motion, cinco reels reales y entradas animadas PASS. Se revisaron capturas nuevas y comparación con el diseño aprobado. Tests 7/7, build y DESIGN lint PASS. Evidencia en [qa/final-content/verified](qa/final-content/verified).

Lighthouse local: Performance 85/85/98; accesibilidad, buenas prácticas y SEO 100 en Home/Rulos/Productos. CLS 0; LCP 2,56/2,72/1,89s, TBT 379/361/105ms. Validar luego en CDN y con datos reales; no se declara Core Web Vitals PASS. La inspección externa nueva confirma Cal.com todavía en 40m/Cal Video. El usuario autorizó push a main; Cal.com y los retratos siguen pendientes antes de publicación comercial.

## QA vigente de servicios y galería ampliada

Tests 8/8, build de cinco páginas y DESIGN lint sin errores/advertencias. Se comprobaron 18 casos Home/Rulos/Productos, 17 de servicios/notebook y ocho de Trabajos: sin errores de consola, desbordes ni hallazgos Axe. Los 16 videos reprodujeron con cuadros reales; filtros, Ver más, lightbox, teclado/foco, no-JS, reduced motion y motion PASS. Se inspeccionaron capturas comparativas y todos los encuadres. Evidencia: [qa/expanded-work/after](qa/expanded-work/after).

Lighthouse final, Home/Rulos/Productos/Reservar/Trabajos: Performance **85/77/96/95/82**, accesibilidad/buenas prácticas/SEO **100 en las cinco**. LCP 2,63/2,68/1,98/1,81/2,68s; TBT 385/590/182/198/511ms; CLS prácticamente cero. Los resultados varían entre corridas; quedan performance de campo/CDN y configuración Cal.com pendientes. No se afirma Core Web Vitals PASS.
