# Movimiento y diseño móvil · 17:17

Actualizado 2026-10-09. Diseño 5/10, movimiento 6/10, densidad 3/10.

## Capas implementadas

- Entrada del hero por líneas con Archivo Black; foto con acercamiento inicial suave. No hay pantalla de carga: el CTA está disponible desde el primer render.
- Reveals de títulos, fotos, filas de servicios y fundadores. IntersectionObserver dispara una sola vez; el estado base siempre es visible. WAAPI anima transform y opacity.
- Filtros con transición escalonada de las fotos visibles, cancelando la animación anterior cuando se cambia rápido.
- Botones con reflejo al hover, flecha direccional, cursor nativo de zoom en fotos y feedback táctil. El cursor del sistema permanece disponible.
- Progreso ocre en el borde del header con CSS scroll timeline; fallback estático en navegadores sin soporte.
- Apertura de diálogos y respuestas FAQ; barra de WhatsApp con entrada suave y safe-area. Sin JS la reserva flotante queda visible.

Duraciones: feedback 180–320ms; entrada 600–780ms; foto hero 1100ms. Easing cubic-bezier(.16,1,.3,1). Sin loops, pinning ni intercepción del scroll.

## Accesibilidad

prefers-reduced-motion desactiva CSS y cancela animaciones WAAPI, incluso al cambiar la preferencia con la página abierta. pagehide/pageshow evita animaciones huérfanas. Navegación, diálogos, filtros y WhatsApp funcionan sin depender de los efectos. Los diálogos conservan Escape, foco y controles táctiles.

## Aplicación de las skills

- landing-elevator: identidad preservada, entrada cinematográfica dentro del hero, progreso, reveals y refinamiento de CTA. Adaptada a una web publicada y a móvil: no se añade una intro bloqueante, cursor sustituto, grano sobre fotos ni HTML/base64 gigante. La solicitud actual de conservar la organización y publicar el sitio gobierna sobre el flujo de entrega de archivos de ejemplo.
- Awesome Design MD: referencia BMW Corporate ya usada; se toman alineación, ritmo fotográfico y contraste entre titulares y cuerpo. Se descartan su marca, colores y fuentes propietarias.
- UI/UX Pro Max: consultas locales de targets táctiles, separación, reduced motion y scroll natural.
- Google DESIGN.md: tokens y decisiones reconciliados en DESIGN.md, contrastes y lint oficial.
- Taste: composición existente preservada, display con carácter y movimiento contextual con stack nativo.
- Impeccable: revisión de capturas, controles, teclado, accesibilidad, responsive, no-JS y rendimiento.

## Límites

Verificación con Chrome y emulación de viewport/touch; no equivale a un teléfono físico. Los videos de Instagram siguen siendo externos, bajo demanda y sujetos a restricciones del proveedor. No se inventaron reseñas, fotos, precios o detalles de servicios.
