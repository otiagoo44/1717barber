# Refinamiento editorial — 8 octubre 2026

## Auditoría y encargo vigente

Fuente: «Análisis de landing 17 17 Barbería.md», entregado por Tiago. Esta dirección sustituye las referencias y la intensidad visual de las pasadas anteriores.

La base funcional es HTML/CSS/JS estático, sin dependencias runtime. Se conservan generación de páginas, datos, WhatsApp contextual, SEO, diálogos y cinco reels. Problemas: hero con una segunda foto todavía en el DOM; acumulación de overrides CSS; fotografías sin una escala común; bloques pendientes publicados; FAQs sin respuesta; oferta repetida; logo duplicado; cierre del reproductor sin liberar el scroll.

## Dirección antes de implementar

Minimalismo editorial, marca oscura y acento ocre existente. Un hero de dos columnas alineadas, un único retrato de resultado, títulos menos pesados y un sistema uniforme de márgenes. Sin superposiciones, imágenes inclinadas, capítulos numerados o collages. Taste: variance 4, motion 3, density 3. Movimiento breve y funcional, sin parallax ni sticky storytelling.

Home: hero → Rulos → servicios/precios → trabajos reales → hermanos/cofundadores → acceso discreto a productos → local → FAQ respondida → reserva. Los cinco reels viven en /rulos. /productos conserva su URL y contacto, pero no publica tarjetas sin fotos verificadas. Los datos pendientes siguen en configuración y documentación, fuera de la interfaz pública.

Un CTA sólido significa WhatsApp; los enlaces de exploración tienen menor peso. Navegación: Inicio, Rulos, Servicios, Nosotros, Ubicación. Logo único y suficientemente visible. WhatsApp fijo inferior en móvil con espacio reservado y safe area. Regreso visible en páginas secundarias.

## Skills aplicadas

- Awesome Design MD: catálogo consultado; una sola referencia nueva, BMW Corporate (`references/designs/bmw/DESIGN.md`). Tomar alineación, ritmo de 8px, superficies planas, fotografía limpia y jerarquía de acción. Descartar azul/tricolor, logo, tipografía propietaria, cuerpo ultrafino y patrones de configurador. No se usan las referencias de landings anteriores.
- Google Design MD: DESIGN.md como fuente de tokens; lint y export CSS locales antes de entrega.
- Taste: simplificar arquitectura visual, ritmo por espacio y proporción, no decoración. Conservar tecnología nativa.
- UI UX Pro Max: búsqueda `barbershop minimal editorial booking` con diales 4/3/3. Minimalismo/grilla y transiciones breves útiles; paleta rosa, sección genérica de features y elección automática de fuente rechazadas. Las dos consultas de dominio landing no devolvieron coincidencias; no se atribuyen resultados inexistentes. UX sobre foco no oculto aplicada. El catálogo no tiene stack HTML/CSS puro: se consultó html-tailwind sólo por principios de imágenes responsive/object-fit/ratio reservado, sin instalar Tailwind.
- Impeccable: revisión visual y funcional del resultado, responsive, teclado, contraste, jerarquía y carga.

## Contenido y fotografía

Sólo publicar resultados con imagen; testimonios requieren nombre, cita y fuente. Mantener hermanos con peso idéntico y una foto conjunta real. No inventar respuestas técnicas sobre rulos. Precios exactos, sin convertir tinte a «desde» sin confirmación. El fotograma del reel conserva su archivo original; el encuadre CSS corta las esquinas negras incorporadas en la captura. No retocar el cabello ni fabricar prueba.

## Verificación prevista

Build, tests, lint/export de diseño, capturas de las tres páginas en 375/390/430/768/1024/1440, axe, filtros, menú, lightbox, reproductor, foco, reduced motion y navegación sin JS. Publicar en main sólo después de revisar y corregir el resultado. Preservar la edición preexistente del cliente en MATERIAL_PENDIENTE_1717.md y no incluir skills ni capturas ajenas en el commit.
