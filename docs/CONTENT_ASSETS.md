# Contenido y assets de 17:17

Final content pass, 2026-10-12. La rama auditada tenía fotos pendientes y seis productos sin imagen publicada. La selección nueva se inspeccionó visualmente mediante hojas de contacto y tres fotogramas de cada uno de los 12 videos recibidos. Los originales se conservan; `img/` no se copia a `dist/`.

## Usados

| Lugar | Selección | Procedencia |
| --- | --- | --- |
| Hero home y /rulos | Rulos con degradado, 1200×1600 | Cortes/rulos: `14.21.22 (1).jpeg` |
| Destacado home | Otro resultado de rulos | Video `14.21.15.mp4`, fotograma a mitad del clip |
| Galería rulos | Resultado histórico limpio + rulos con volumen recientes | `foto_corte_rulos.jpeg` y video `14.20.59.mp4` |
| Galería cortes | Mullet, fade de perfil, taper; tres trabajos distintos | `14.21.16 (1)`, `14.21.21 (1)`, `14.21.14` |
| Galería color | Resultado rojo histórico limpio | `foto_corte_tinte.jpeg` |
| Cofundadores | Foto de equipo existente, presentaciones breves con igual jerarquía | `img/foto_equipo.jpeg`; videos de Esteban `08.01.33` y Jonatan `08.01.23` |
| Productos home | Iconic, Matte Look y Polvo Texturizador | Las mismas fichas reales del catálogo, una vez por producto en cada ruta |
| /productos | Iconic, Matte Look, Polvo Texturizador, Manifesto, One in a Million | Fuentes `14.02.55 (6)/(10)/(4)/(7)/(5)` |
| Local | Fachada, interior general, puesto de trabajo | `19.13.19 (4)/(6)/(1)` |
| Reels /rulos | Cinco MP4 existentes y sus cinco posters | `REEL_RULOS_01…05`; sin sexto reel ni nuevos MP4 en el bundle |

Las rutas completas, dimensiones originales, hashes, selección y motivos por archivo están en [CONTENT_ASSETS.json](CONTENT_ASSETS.json). Los derivados y sus tamaños se registran en [assets-generated.json](qa/final-content/assets-generated.json).

## Selección y clasificación

- **KEEP:** resultado antiguo de rulos, color y equipo que siguen aportando evidencia; dos videos recientes sólo como fuentes de fotos.
- **REPLACE:** hero, destacado, segundo resultado de rulos, corte con diseño histórico, dos slots de cortes pendientes, foto principal del local y cinco fichas de producto sin imagen.
- **REMOVE:** collage ajeno, capturas con UI, publicidad de productos que no corresponde a las fichas, grabación de pantalla y videos extra que no deben ampliar la secuencia de cinco.
- **DUPLICATE:** ángulos repetidos del mismo trabajo, fachada y puestos repetidos, otra imagen de Iconic ya representada. No se publican esos archivos.
- **LOW QUALITY:** recortes estrechos/bordes de capturas y tomas que no muestran un resultado útil. No se usan para rellenar el grid.

`REMOVE` describe exclusión editorial, no borrado físico. Los cinco originales que figuraban eliminados al empezar estaban reubicados por el usuario en `img/fotos-cortes-rulos` y `img/fotos-local`; se respeta esa organización. No se descartan originales nuevos.

Derivados anteriores `hero-rulos*`, `hero-corte*`, `corte*` histórico, `local*` histórico y `rulos-reel04*` permanecen archivados en `public/assets/media`; la UI ya no los referencia. No generan requests iniciales. Rulos/color/equipo históricos que sí se muestran permanecen KEEP. No se confundió un archivo antiguo presente en el repositorio con una imagen publicada.

## Tratamiento de imágenes

WebP/AVIF, orientación normalizada, sin deformación. Variantes de 600px sólo cuando el original es mayor; hero también tiene variante de 900px para pantallas con mayor densidad. No se inventa una versión de 600px para imágenes más pequeñas. `sizes` de la galería corresponde a sus columnas reales, evitando descargar el original para una miniatura. Hero prioritario; galería, productos y local lazy con dimensiones reservadas. Los frames conservan su resolución real, sin afirmar calidad de cámara original.

Productos: recortes del envase recibido, sin UI de Google/catálogo, precios ni claims promocionales externos. No se reconstruye ni genera un envase. Algunos recortes siguen limitados por la calidad de las fuentes de catálogo. Se recomienda fotografía original limpia para mejorar calidad más adelante, pero las cinco fichas ya tienen imagen. `One Million Dollars` no se usa como sustituto de `One in a Million`. No se identificó un producto de barba de forma verificable.

Local: se retiraron los bordes negros de las fuentes verticales de fachada/interior. Se muestran tres vistas diferentes, sin carrusel nuevo. Equipo: no se recorta ni asigna una identidad individual sin confirmación.

## Datos confirmados en esta sesión

- Agenda: `https://cal.com/ezequiel-oviedo-dthlhd/barberia`, centralizada en `business.booking.url`.
- Rulos: **Gs. 180.000**, corte separado, duración aproximada **2 horas**. Largo y condiciones se evalúan individualmente por WhatsApp.
- Productos: disponibilidad **Consultar**, sin precio, stock, ingredientes o fijación inventados. CTA contextual a WhatsApp.
- Jonatan y Esteban: ambos **Cofundador**, igual escala/estructura; presentaciones desde sus videos, sin especialidades ni trayectoria inventadas. Evidencia y texto: [FOUNDER_CONTENT.md](FOUNDER_CONTENT.md). Sólo retratos individuales siguen pendientes.

## Pendientes reales

1. Retrato individual actual de Jonatan.
2. Retrato individual actual de Esteban.
3. Nombre/presentación e imagen verificables del producto Immortal para barba; ficha aún sin publicar.
4. Cuidados posteriores y descripción técnica de rulos, si quieren publicarlos; no se inventan instrucciones.
5. Testimonios verificables, si quieren agregarlos. No existen citas reales en los datos actuales; no bloquean el recorrido.

6. Revisar configuración externa de Cal.com: evento recibido muestra 40m y Cal Video; ajustar duración/atención presencial y servicio reservable antes de publicación comercial.

Mejoras opcionales: packshots originales de productos, fotos de rulos de mayor resolución en lugar de frames, logo vectorial. El enlace de agenda, fotos actuales de cortes, vistas del local y presentaciones de ambos cofundadores ya no son pendientes.
