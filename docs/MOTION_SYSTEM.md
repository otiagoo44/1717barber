# 17:17 — Motion system

## Principios

Motion rico pero funcional: entrada, reposo, transición e interacción. El movimiento orienta la mirada hacia Rulos y revela el trabajo; reservar nunca depende de que una animación termine. Scroll nativo, sin Lenis, GSAP, Framer, AOS, autoplay ni eventos de rueda interceptados. Una zona sticky en la home; ninguna en mobile. Defaults visibles y finales, también sin JavaScript.

## Tokens

| Token | Valor | Uso |
| --- | --- | --- |
| fast | 160ms | Color y estados táctiles |
| base | 360ms | Flechas, underline, indicador de reels |
| enter | 650ms | Headline, lista, metadata, precio |
| photo | 720ms | Clip reveal de medios |
| easing.standard | cubic-bezier(.2,.65,.3,1) | Progreso y controles |
| easing.enter | cubic-bezier(.16,1,.3,1) | Entradas y hover |
| distance.sm | 12px | Precio y transición de página |
| distance.md | 28px | Línea y fila |

Tokens CSS y coreografía del hero en `public/assets/motion.css`; reveals WAAPI en `public/assets/site.js`. Una sola clase activa todas las entradas CSS del hero para agrupar el cálculo de estilos; se sustituyeron diez llamadas iniciales a animate() tras medir su costo. Stagger de lista 70ms, máximo 140ms; líneas hero 85ms. No animar precios desde cero.

## Entrance

Header dissolve → eyebrow a 60ms → líneas del hero a 100/185/270ms → máscara de fotografía a 160ms → precio a 260ms → acciones y metadata a 300/390ms → segunda fotografía a 340ms. No intro, loader o pantalla bloqueante. Las acciones conservan opacity ≥ .85 y siguen clickeables; fotografía comienza con el 88% del encuadre disponible. El mínimo de opacity se elevó tras detectar contraste insuficiente durante frames de entrada. Headline tiene wrapper de recorte, los títulos de sección usan máscara inferior, el precio wipe y metadata dissolve. El inset conserva su rotación de composición.

## Scroll

IntersectionObserver ejecuta una entrada por elemento al aproximarse al viewport. Headline: clip + desplazamiento 20px. Foto: clip lateral. Servicios/proceso: stagger. El observador no añade opacity:0 al DOM. Parallax sólo en hero, Rulos destacado y local: CSS view timeline, desplazamiento entre −5% y +5%, scale 1.14 para cubrir los bordes. Sin soporte de timelines la imagen queda estática. La home usa texto sticky de Rulos en desktop; tablet pequeña/mobile y reduced-motion usan flujo normal. No pinning de página o scroll hijacking.

Reels 9:16 con overflow local y scroll snap natural; flechas, teclado y touch. Indicador 01/05 y línea de progreso corresponden al frame más cercano. El espacio final permite al quinto frame ocupar su posición completa. Sin video descargado al inicio; URL confirmada abre Instagram, sin embed pesado. Los pendientes no simulan un botón de play.

La actualizacion de reels mantiene la carga inicial en cero iframes. La portada abre un unico embed oficial dentro de un dialogo 9:16, con enlace de respaldo a Instagram, y el iframe se desmonta al cerrar para detener la reproduccion y liberar recursos.

## Hover / tap

CTA: cambio de superficie, flecha 3px, tap scale .97. Links: underline de mayor contraste. Nav: línea de sección activa. Fotos: zoom 1.035 sólo dentro del crop. Productos: imagen o silueta de placeholder se mueve 7px, no levanta toda la ficha con shadow. FAQ: signo rota al expandir. Ninguna información depende de hover.

## Page transition

Cross-document View Transition API con `@view-transition { navigation: auto }` entre `/`, `/rulos`, `/productos` del mismo origen. Root dissolve/translate de salida 180ms y entrada 320ms. Header compartido mantiene continuidad mediante `view-transition-name: header`. Navegación HTML real, sin interceptar enlaces o back. Fallback: navegación normal del navegador. Soporte progresivo; no se exige a navegadores sin API.

[MDN cross-document transitions](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API/Using), [MDN @view-transition](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40view-transition), [MDN animation-timeline](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-timeline).

## Reduced motion

`prefers-reduced-motion: reduce`: sin animaciones CSS, transiciones, smooth scroll, parallax, sticky o transición de página. WAAPI no inicia secuencias; un cambio de preferencia durante la animación cancela las activas. Estado final inmediato. Pagehide/pageshow cancelan entradas pendientes para evitar contenido retenido al volver. Menú, filtros, lightbox, FAQ, reels y WhatsApp siguen funcionando.

El opt-in nativo de navegación permanece estable; CSS elimina las animaciones de sus pseudo-elementos y JS salta una transición activa si cambia la preferencia. Se maneja el rechazo esperado de `ready` al saltarla, en lugar de cambiar `navigation` durante una transición y provocar InvalidStateError. [MDN ViewTransition.ready](https://developer.mozilla.org/en-US/docs/Web/API/ViewTransition/ready) documenta este estado. QA comprueba cero animaciones y navegación funcional con reduced-motion.

## Anti-patterns

No opacity:0 por defecto, animation lock, wheel hijacking, pinning mobile, counters monetarios, texto rebotando, cursores propios, cinco videos simultáneos, scroll parallax en todas las fotos, filtros/blur/shadows continuos, will-change global o dependencias de motion duplicadas. No animaciones de carga que retrasen la reserva.

## Adaptaciones de rendimiento

Parallax solamente desde 900px; mobile conserva máscaras, coreografía de entrada, reveals, microinteracciones y filmstrip táctil. Sticky solamente desde 1024px. Se evita medir la geometría de reels durante la entrada del hero: IntersectionObserver inicializa el track al acercarse y ResizeObserver recalcula sus puntos. El scroll usa puntos cacheados y requestAnimationFrame, sin reflow repetido.

Se probó content-visibility:auto para reducir trabajo inicial, pero se retiró después de detectar clicks perdidos al cambiar la geometría de secciones durante el salto. La estabilidad de navegación y controles tiene prioridad. Imágenes AVIF con fallback WebP, tamaños responsivos, portadas lazy y fuentes locales mantienen bajo el peso. No se agregó biblioteca de motion.

Los capítulos en flujo normal utilizan contain:layout style para aislar trabajo de layout sin saltarse contenido ni estimar alturas. Hero y spread sticky quedan fuera. No se usa size containment: las alturas siguen calculándose desde el contenido real.

## QA

Resultados reproducibles en `docs/qa/second-pass/polish-qa.json` y `browser-qa.json`. Capturas normales, estados de entrada, menú, lightbox y recorrido completo en `docs/qa/second-pass/after`. Chrome real con viewports/touch emulados; no equivale a una prueba física de iOS/Android. Las cinco fachadas tienen URLs y portadas auténticas confirmadas; abren Instagram. Su reproducción y eventual login dependen de Instagram, no de un reproductor alojado en la web.
