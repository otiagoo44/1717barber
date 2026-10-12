---
version: alpha
name: 17:17 · Carácter y movimiento
colors:
  primary: "#C49A3C"
  background: "#080808"
  surface: "#171715"
  paper: "#F4F0E8"
  muted: "#B5B2AA"
  ink: "#080808"
  line: "#66645F"
  paperMuted: "#59564F"
typography:
  display:
    fontFamily: Archivo Black
    fontSize: 72px
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: -0.045em
  heading:
    fontFamily: Archivo Black
    fontSize: 46px
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: -0.035em
  body:
    fontFamily: Inter
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: 0.08em
spacing:
  xs: 8px
  sm: 16px
  md: 24px
  lg: 40px
  xl: 64px
  section: 104px
rounded:
  none: 0px
  control: 3px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.ink}"
    height: 52px
    rounded: "{rounded.control}"
  body:
    backgroundColor: "{colors.background}"
    textColor: "{colors.paper}"
  secondary:
    backgroundColor: "{colors.background}"
    textColor: "{colors.muted}"
  paper-body:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  paper-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.paperMuted}"
  control-boundary:
    backgroundColor: "{colors.line}"
---

## Overview

17:17 Barbería, Luque. Presentación editorial, apoyada en trabajo real, precios claros y dos intenciones: agendar en Cal.com y consultar por WhatsApp. Se conserva el orden y Archivo Black del diseño aprobado. Público local que llega desde Instagram en celular. Taste: variance 5, motion 6, density 3.

Una referencia de sistema: BMW Corporate del catálogo local Awesome Design MD. Sólo alineación, ritmo, fotografía sobria, tipografía legible y jerarquía de CTA; no paleta, fuentes propietarias, componentes o identidad. Las anteriores referencias de landings dejan de regir.

## Colors

Preservar negro {colors.background}, marfil {colors.paper} y ocre {colors.primary}. Ocre en CTA, palabra final del hero y pequeños acentos. Rulos usa una única banda marfil para destacar la oferta; esta decisión de marca prevalece sobre la heurística de tema único de Taste. Texto secundario en {colors.muted} sobre oscuro, {colors.paperMuted} sobre claro. Divisores decorativos de opacidad baja; controles en {colors.line}. Sin glows ni overlays que ensucien la fotografía. Reflejo blanco tenue sólo en hover de botones.

## Typography

Archivo Black local 400 en H1/H2, recuperada de la versión anterior por pedido explícito. Inter variable local 400–600 para texto, acciones y precios. H1 36–76px según viewport, H2 30–46px, línea 1.08/1.15 y tracking -0.045/-0.035em. Hero en tres líneas deliberadas con la última palabra ocre; Rulos en dos. Texto 16–18px y párrafos hasta 48ch. Fuentes OFL locales con font-display swap y dos precargas. No forzar la fuente display en precios ni controles.

## Layout

Contenedor máximo 1680px, márgenes laterales 3vw limitados a 48px y mínimo 20px, ampliados por pedido del dueño para aprovechar notebook. Home: hero → Rulos → servicios → trabajo real → equipo → productos → local → FAQ → cierre. Hero sin superposición, una imagen a la derecha y texto a la izquierda; mobile en flujo vertical. Servicios antes de galería. Sin secciones numeradas. Separación 104px desktop, 64px mobile. Galería de rulos a todo el ancho útil y centrada. Detalles del servicio con columnas estables y divisores, apilados en celular.

Nav: Inicio, Rulos, Servicios, Nosotros, Ubicación y Agendar. Logo oficial único, sin wordmark duplicado. Regreso explícito en secundarias. Reels sólo en /rulos. Productos visibles en el recorrido y catálogo de consulta separado. No renderizar secciones vacías.

## Elevation & Depth

Planos limpios y divisores, sin sombras decorativas. Ninguna foto flotante ni rotada. Header sticky de 80px con progreso de lectura ocre como mejora progresiva; diálogos nativos en top layer. Barra de agenda mobile con safe area y espacio inferior reservado. Diálogos ocultan la barra y bloquean el scroll sólo mientras están abiertos.

## Shapes

Fotos rectas: hero 1:1 desktop / 5:4 mobile, adaptado a 3:4 en tablet y 4:5 para Rulos mobile; resultados, equipo y local 4:5; reels 9:16. Nuevos fotogramas limpios sin recorte CSS heredado. Productos sobre plano marfil cuadrado; local con una fachada dominante y dos vistas menores. Conservar originales y resultado del cabello. Botones con radio {rounded.control}, logo circular; sin radios grandes repetidos.

## Components

CTA sólido ocre: Reservar turno/Agendar abre `/reservar`, selección del servicio y su duración. Cada servicio deriva sólo a su evento Cal.com verificado; hasta configurar el proveedor, coordina por WhatsApp. Rulos exige consulta previa. Configuración única en business.booking.serviceEvents, sin usar el evento genérico de 40 minutos para otros servicios. Productos siempre se consultan por WhatsApp. Exploración con enlace subordinado. Targets mínimo 44px, botón principal 52px. Servicios en lista con precio y consulta contextual. Galería sólo real, sin trabajos repetidos, filtros y lightbox con teclado/Escape/swipe/retorno de foco. FAQ details/summary sólo con respuestas verificadas. Menú dialog accesible.

Jonatan y Esteban comparten foto y peso tipográfico, ambos cofundadores. No asignar identidades en la foto conjunta. Retratos individuales ausentes se señalan explícitamente; cada componente queda listo para recibir su imagen. Presentaciones breves sólo desde sus palabras verificadas, sin inventar trayectoria ni especialidades. Testimonios requieren quote/name/source; productos requieren imagen y ficha verificada. /productos conserva consulta sin afirmar stock.

Cinco reels con portadas auténticas, scroll horizontal nativo y reproductor HTML video bajo demanda. Los MP4 públicos de 17:17 se sirven desde /assets/videos; no se necesita iframe, login ni script de Instagram. No se descarga video al inicio. Controles nativos, sonido y playsinline; al cerrar se pausa, se libera el src y se devuelve el foco. Enlace opcional a la publicación original. Imágenes responsive AVIF/WebP con dimensiones, hero eager/high priority.

Ampliación pedida por el dueño: `/trabajos` reúne 27 fotos y 16 videos, incluidos los once clips de WhatsApp disponibles y los cinco reels, como trabajos reales y proceso. No son reseñas escritas ni un conteo de clientes: también hay ángulos complementarios. Home y Rulos enlazan “Ver más cortes y rulos”; la selección breve y orden originales siguen en la landing. Grid fotográfico sin tarjetas decorativas, formato 4:5, filtros por servicio/formato, 12 piezas iniciales y Ver más, lightbox de imagen completa, un solo reproductor bajo interacción. Sin JS se muestran todas las piezas y las fotos/videos tienen enlaces nativos. Cinco reels destacados se mantienen en su sección; la galería adicional no amplía esa secuencia.

## Do's and Don'ts

- Alinear fotos, títulos y acciones; cada sección responde una pregunta concreta.
- Mantener Rulos Gs. 180.000, corte separado, aproximadamente dos horas y evaluación individual del largo/condiciones por consulta; precios y contactos confirmados.
- Publicar contenido real y respondido; registrar faltantes internamente.
- No duplicar el logo, apilar CTAs equivalentes o numerar capítulos.
- No inventar stock, duración, reviews, experiencia, cuidados ni precios «desde».
- No agregar frameworks, librerías de animación o analytics.
- Probar foco, contraste, mobile, reduced motion, diálogos y render sin JavaScript.

## MOTION PHILOSOPHY

Movimiento 6/10: entrada escalonada del H1 (720ms, 80ms entre líneas), encuadre de foto (1100ms, escala 1.045 a 1), reveals de sección (650–800ms, hasta 140ms de stagger), transición de resultados nuevos en filtros (800ms), respuestas de botones/servicios (180–320ms), apertura de FAQ/dialog y barra de reserva (320ms). Curva cubic-bezier(.16,1,.3,1), máximo desplazamiento 28px. Sólo contenido debajo del viewport se prepara antes de entrar; nunca se atenúa contenido ya visible. Progreso de lectura CSS bajo @supports. Sin loops ni scroll forzado. Reduced motion cancela CSS y WAAPI, con contenido estático disponible. El HTML base siempre es visible sin JS. Ver docs/MOTION_SYSTEM.md.
