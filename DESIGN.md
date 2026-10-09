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

17:17 Barbería, Luque. Presentación editorial, apoyada en trabajo real, precios claros y una acción comercial: consultar/reservar por WhatsApp. Se conserva el orden actual y se recupera Archivo Black, confirmado por el usuario. Público local que llega desde Instagram en celular. Taste: variance 5, motion 6, density 3.

Una referencia de sistema: BMW Corporate del catálogo local Awesome Design MD. Sólo alineación, ritmo, fotografía sobria, tipografía legible y jerarquía de CTA; no paleta, fuentes propietarias, componentes o identidad. Las anteriores referencias de landings dejan de regir.

## Colors

Preservar negro {colors.background}, marfil {colors.paper} y ocre {colors.primary}. Ocre en CTA, palabra final del hero y pequeños acentos. Rulos usa una única banda marfil para destacar la oferta; esta decisión de marca prevalece sobre la heurística de tema único de Taste. Texto secundario en {colors.muted} sobre oscuro, {colors.paperMuted} sobre claro. Divisores decorativos de opacidad baja; controles en {colors.line}. Sin glows ni overlays que ensucien la fotografía. Reflejo blanco tenue sólo en hover de botones.

## Typography

Archivo Black local 400 en H1/H2, recuperada de la versión anterior por pedido explícito. Inter variable local 400–600 para texto, acciones y precios. H1 36–76px según viewport, H2 30–46px, línea 1.08/1.15 y tracking -0.045/-0.035em. Hero en tres líneas deliberadas con la última palabra ocre; Rulos en dos. Texto 16–18px y párrafos hasta 48ch. Fuentes OFL locales con font-display swap y dos precargas. No forzar la fuente display en precios ni controles.

## Layout

Contenedor máximo 1440px, márgenes laterales 5vw limitados a 72px y mínimo 20px. Home: hero → Rulos → servicios → trabajo real → equipo → productos → local → FAQ → cierre. Hero sin superposición, una imagen a la derecha y texto a la izquierda; mobile en flujo vertical. Servicios antes de galería. Sin secciones numeradas. Separación 104px desktop, 64px mobile.

Nav: Inicio, Rulos, Servicios, Nosotros, Ubicación y Reservar. Logo oficial único, sin wordmark duplicado. Regreso explícito en secundarias. Reels sólo en /rulos. No renderizar secciones vacías.

## Elevation & Depth

Planos limpios y divisores, sin sombras decorativas. Ninguna foto flotante ni rotada. Header sticky de 80px con progreso de lectura ocre como mejora progresiva; diálogos nativos en top layer. Barra WhatsApp mobile con safe area y espacio inferior reservado. Diálogos ocultan la barra y bloquean el scroll sólo mientras están abiertos.

## Shapes

Fotos rectas: hero 1:1 desktop / 5:4 mobile, adaptado a 3:4 en tablet y 4:5 para Rulos mobile; resultados, equipo y local 4:5; reels 9:16. Fotograma con esquinas negras encuadrado mediante object-fit/recorte CSS, incluyendo lightbox; conservar el original y el resultado del cabello. Botones con radio {rounded.control}, logo circular; sin radios grandes repetidos.

## Components

CTA sólido ocre: Reservar por WhatsApp, o Consultar por rulos en contexto. Exploración con enlace subordinado. Targets mínimo 44px, botón principal 52px. Servicios en lista con precio y enlace contextual. Galería sólo real, filtros y lightbox con teclado/Escape/swipe/retorno de foco. FAQ details/summary sólo con respuestas verificadas. Menú dialog accesible.

Jonatan y Esteban comparten foto y peso tipográfico, ambos cofundadores. No asignar identidades en la foto. Datos desconocidos siguen en src/data.mjs fuera de la UI. Testimonios requieren quote/name/source; productos requieren imagen y ficha verificada. /productos conserva consulta sin afirmar stock.

Cinco reels con portadas auténticas, scroll horizontal nativo, controles y reproductor Instagram bajo demanda. Cero iframe/script social al inicio. Enlace alternativo ante límites del proveedor; un load de iframe no confirma reproducción. Imágenes responsive AVIF/WebP con dimensiones, hero eager/high priority.

## Do's and Don'ts

- Alinear fotos, títulos y acciones; cada sección responde una pregunta concreta.
- Mantener Rulos Gs. 180.000, precios y contactos confirmados.
- Publicar contenido real y respondido; registrar faltantes internamente.
- No duplicar el logo, apilar CTAs equivalentes o numerar capítulos.
- No inventar stock, duración, reviews, experiencia, cuidados ni precios «desde».
- No agregar frameworks, librerías de animación o analytics.
- Probar foco, contraste, mobile, reduced motion, diálogos y render sin JavaScript.

## MOTION PHILOSOPHY

Movimiento 6/10: entrada escalonada del H1 (720ms, 80ms entre líneas), encuadre de foto (1100ms, escala 1.045 a 1), reveals de sección (600–780ms, hasta 180ms de stagger), transición de filtros (780ms), respuestas de botones/servicios (180–320ms), apertura de FAQ/dialog y barra de reserva (320ms). Curva cubic-bezier(.16,1,.3,1), máximo desplazamiento 24px. Progreso de lectura CSS bajo @supports. Sin loops ni scroll forzado. Reduced motion cancela CSS y WAAPI, con contenido estático disponible. El HTML base siempre es visible sin JS. Ver docs/MOTION_SYSTEM.md.
