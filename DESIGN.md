---
version: alpha
name: 17:17 · Claridad editorial
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
    fontFamily: Inter
    fontSize: 76px
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: -0.055em
  heading:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: -0.04em
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

17:17 Barbería, Luque. Presentación minimalista y editorial, apoyada en trabajo real, precios claros y una acción comercial: consultar/reservar por WhatsApp. Esta tercera pasada sustituye la dirección anterior de collages, offsets, titulares pesados y motion 7. Taste: variance 4, motion 3, density 3.

Una referencia de sistema: BMW Corporate del catálogo local Awesome Design MD. Sólo alineación, ritmo, fotografía sobria, tipografía legible y jerarquía de CTA; no paleta, fuentes propietarias, componentes o identidad. Las anteriores referencias de landings dejan de regir.

## Colors

Preservar negro {colors.background}, marfil {colors.paper} y ocre {colors.primary}. Ocre en CTA y pequeños acentos. Rulos usa una única banda marfil para destacar la oferta; esta decisión de marca prevalece sobre la heurística de tema único de Taste. Texto secundario en {colors.muted} sobre oscuro, {colors.paperMuted} sobre claro. Divisores decorativos de opacidad baja; controles en {colors.line}. Sin gradientes, glows ni overlays que ensucien la fotografía.

## Typography

Inter variable local 400–600 como única familia de interfaz. Archivo Black se retira por su masa excesiva; Barlow Condensed queda fuera de la UI para reducir ruido. La personalidad pasa a la escala, el espacio y el logo oficial. Inter 500 en titulares, 400 en body y 500/600 en acciones y precios. H1 44–76px; H2 34–48px. Texto 16–18px, metadatos mínimo 13px. Párrafos de hasta 48ch. Fuente OFL existente, Latin, font-display swap y una sola precarga.

## Layout

Contenedor máximo 1440px, márgenes laterales 5vw limitados a 72px y mínimo 20px. Home: hero → Rulos → servicios → trabajo real → equipo → productos → local → FAQ → cierre. Hero sin superposición, una imagen a la derecha y texto a la izquierda; mobile en flujo vertical. Servicios antes de galería. Sin secciones numeradas. Separación 104px desktop, 64px mobile.

Nav: Inicio, Rulos, Servicios, Nosotros, Ubicación y Reservar. Logo oficial único, sin wordmark duplicado. Regreso explícito en secundarias. Reels sólo en /rulos. No renderizar secciones vacías.

## Elevation & Depth

Planos limpios y divisores, sin sombras decorativas. Ninguna foto flotante ni rotada. Header sticky opaco; diálogos nativos en top layer. Barra WhatsApp mobile con safe area y espacio inferior reservado. Diálogos ocultan la barra y bloquean el scroll sólo mientras están abiertos.

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

Movimiento 3/10: entrada breve, reposo y feedback. Duraciones 160/240/420ms; easing cubic-bezier(.2,.7,.2,1); desplazamiento máximo 8px, hover fotográfico 1.025. Sin parallax, pinning, loops, counters o máscaras amplias. Native View Transition de 180ms como mejora progresiva con fallback normal. Reduced motion: estado final inmediato y scroll instantáneo. El HTML/CSS base siempre es visible sin JS. Ver docs/MOTION_SYSTEM.md.
