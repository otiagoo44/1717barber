# Selección y videos sin audio · 2026-10-12

El inicio muestra diez trabajos seleccionados: dos fotos principales (fade con textura y diseño lateral) y ocho resultados en una grilla de cuatro columnas en escritorio y dos en celular. En celular las dos fotos principales ocupan el ancho completo. Se preservan los filtros y la ampliación con teclado.

Se retiró el mullet con diseño señalado por el usuario, tanto del inicio como del catálogo y sus archivos optimizados públicos. También se retiraron `photo-07` y `photo-08`: ambas muestran el cabello con peine rosa antes del corte. Se conserva `photo-20`, el resultado afro terminado, clasificado como corte. El antiguo “Detalle de taper” y la ficha del mismo trabajo en el catálogo ahora dicen “Mohicano”. Los originales locales se conservan; las exclusiones también se aplican al generador de medios.

El catálogo queda con 24 fotografías y 16 videos. Todos los MP4 publicados carecen de pistas de audio. Se preserva el flujo de video sin recodificar y se usan nombres nuevos con `-silent` para evitar versiones anteriores en caché. El reproductor inicia con `muted` y `defaultMuted`. `silent-videos.json` registra la comprobación con FFprobe.

El build y las ocho pruebas existentes pasaron. `validation.json` registra la revisión del inicio, rulos y catálogo a 390, 768 y 1440 px, los filtros del inicio, la ampliación con teclado y la reproducción silenciosa de los 16 videos. Las capturas del inicio muestran la composición completa. Axe comprueba los criterios WCAG 2 A/AA y 2.1 AA; sus resultados no constituyen una certificación.
