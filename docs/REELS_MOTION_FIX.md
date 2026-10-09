# Corrección de entradas y reproducción de reels

2026-10-09.

## Problema y solución

La entrada anterior animaba desde una opacidad menor cuando el elemento ya había aparecido. Eso producía un salto visible de 1 a 0.25/0.65, percibido como parpadeo. Ahora se prepara únicamente el contenido fuera de pantalla y se anima de 0 a 1 con desplazamiento de 28px. No se vuelve a animar al regresar. Los filtros conservan estables las fotos que siguen visibles, y se eliminaron reveals anidados de padre/hijo. No-JS, foco, reduced-motion dinámico y regreso desde bfcache restauran el contenido.

El embed de Instagram no daba reproducción confiable: la nueva prueba real volvió a agotar el tiempo. Se obtuvieron los cinco reels públicos de la barbería y se integraron archivos MP4 H.264/AAC con fast start. El reproductor nativo se crea al tocar la portada, con controles, sonido y reproducción inline. Se detiene y libera el archivo al cerrar. Instagram queda sólo como fuente opcional. No se usa un proxy, una URL temporal del CDN social ni un servicio de terceros.

## Evidencia

- `docs/qa/reels-motion-fix/native-reels.json`: los cinco videos avanzan tiempo y fotogramas reales a 390px, además de pruebas a 1440px y 844px horizontal. Pausa, seek, resume, Escape/cierre, descarga de memoria y retorno de foco pasan. Cero popups, iframes o navegación externa.
- La carga inicial no solicita archivos MP4 ni Instagram.
- `scroll-entry.json`: 75 muestras por entrada para títulos, fotos, servicios y galería a 390/1440px. Opacidad monotónica, varios fotogramas intermedios, estado final 1 y sin reentrada al volver.
- Build, tests de contenido y lint de diseño pasan.
- `video-sources.json`: procedencia pública, duración, codecs, tamaño y SHA-256 de cada archivo.

Pruebas en Chrome con emulación móvil, no en teléfono físico. Se verifica reproducción real del MP4, no sólo carga del reproductor.
