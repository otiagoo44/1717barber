# Entrega · mejora móvil y movimiento

2026-10-09. Se mantiene el recorrido actual y se recupera Archivo Black, confirmado por el usuario.

## Cambios

- Titulares con más peso y acento ocre, escala responsive y encabezado compacto.
- CTA principal ancho en celular; controles, filtros y precios ajustados para pantallas pequeñas.
- Entrada escalonada del hero, acercamiento inicial de foto, reveals, filtros animados, feedback de servicios y botones, apertura de FAQ/diálogos y progreso de lectura.
- Respeto de reduced-motion, también al cambiarlo con la página abierta. Sin JS queda disponible la reserva flotante.
- URLs de CSS/JS versionadas por contenido para evitar caché vieja tras el despliegue.
- Enlace alternativo del reproductor siempre válido; se conserva carga bajo demanda.

## Verificación

- Build y 6 tests de datos, contenido, rutas, SEO y tokens: pasan.
- Lint oficial de DESIGN.md: 0 errores y 0 advertencias.
- 18 combinaciones de páginas/anchos (375, 390, 430, 768, 1024, 1440): sin overflow, imágenes rotas ni hallazgos de Axe WCAG A/AA.
- 9 combinaciones adicionales: 320, 360 y 844 horizontal en las tres rutas. Sin overflow; CTA inicial dentro del viewport vertical.
- Menú, Escape y retorno de foco; filtros y lightbox; preguntas frecuentes; URLs de WhatsApp/Maps/Instagram; controles de reels; reduced-motion y páginas sin JS: pasan.
- Los cinco diálogos de reels se verificaron con iframe aislado. Esto verifica integración, apertura/cierre y foco, no reproducción del proveedor.
- Capturas revisadas en docs/qa/mobile-elevation. No se probó un teléfono físico.
- Lighthouse móvil local, medición final: rendimiento 86/93/99 en inicio/rulos/productos; accesibilidad, buenas prácticas y SEO 100 en las tres. CLS 0. Medición de laboratorio, no datos de usuarios reales.

## Skills

landing-elevator y las cinco skills locales (.agents/skills): Awesome Design MD, Google DESIGN.md, Taste, Impeccable y UI/UX Pro Max. Decisiones y adaptaciones documentadas en DESIGN.md y docs/MOTION_SYSTEM.md.
