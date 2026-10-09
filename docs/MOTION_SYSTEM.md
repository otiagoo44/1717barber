# Motion system · 17:17

Dirección vigente: tercera pasada, 8 octubre 2026. Sustituye el sistema anterior 7/10. Ahora 3/10: una interfaz sobria con feedback y entradas breves.

## Principios

La reserva nunca espera una animación. El contenido base siempre es visible. La fotografía y la jerarquía llevan el recorrido; el movimiento acompaña. JavaScript nativo, CSS e IntersectionObserver; cero dependencias runtime añadidas.

## Durations / easings

Tokens en public/assets/motion.css: fast 160ms, base 240ms, enter 420ms; cubic-bezier(.2,.7,.2,1). Desplazamiento máximo 8px; hover de imágenes 1.025. Sin will-change global ni animaciones de layout.

## Entrance

Hero copy y foto: fade desde .85 y desplazamiento vertical de 8px; foto con delay 80ms. CTA disponible desde el primer frame. Sólo una ejecución. Navegación back/pagehide cancela animaciones pendientes.

## Scroll

Títulos, foto destacada, equipo y filas de servicios aparecen una vez al entrar. Sin parallax, pinning, máscaras extensas ni loops. La secuencia de reels usa scroll horizontal nativo, touch, botones, teclado, snap y progreso. Geometría cacheada al acercarse al track; ResizeObserver actualiza al cambiar ancho.

Barra de reserva mobile: visible cuando no hay CTA sólido de WhatsApp en la zona útil del viewport. No duplica el botón de hero. Header y safe area considerados; espacio inferior reservado. Se oculta al abrir un diálogo.

## Hover / touch

Botones cambian superficie, tap desplaza 1px; enlaces subrayan; fotografía amplía 2.5% sólo dentro del encuadre y con puntero fino. No información dependiente de hover. Reels con botón de play sobrio. FAQ rota el signo al expandirse.

## Page transition

View Transition nativa cross-document, dissolve 180ms. Navegación HTML real, sin router o bloqueo. Fallback normal en navegadores sin soporte. Capturar ready rejection cuando una preferencia interrumpe la transición.

## Reduced motion

Estado final inmediato, sin animaciones CSS/WAAPI, transiciones ni scroll suave. Cambiar la preferencia cancela animaciones activas. Funcionalidad, CTA, filtros, diálogos y secuencia de reels no dependen de animar.

## Reproductor

Cinco URLs confirmadas; portadas locales, cero iframe inicial. Un iframe oficial sólo al abrir un reel; desmontaje al cerrar para liberar recursos y detener reproducción. Foco al control de cierre, Escape y retorno al enlace de origen. El estado load indica que respondió el frame, no demuestra reproducción: Instagram puede limitarla. Conservar enlace alternativo.

## Anti-patterns

No opacity:0 persistente, rueda interceptada, scroll hijacking, fondos animados, precios contando, cinco videos en autoplay, texto sobre fotografías o animaciones que tapen el CTA. No temporizadores para revelar contenido esencial.
