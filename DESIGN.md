---
version: alpha
name: 17:17 · Trabajo real
colors:
  primary: "#C49A3C"
  background: "#080808"
  surface: "#171715"
  paper: "#F4F0E8"
  muted: "#B5B2AA"
  ink: "#080808"
  line: "#66645F"
typography:
  display:
    fontFamily: Barlow Condensed
    fontSize: 96px
    fontWeight: 600
    lineHeight: 0.98
    letterSpacing: -0.02em
  heading:
    fontFamily: Barlow Condensed
    fontSize: 56px
    fontWeight: 600
    lineHeight: 1.05
  body:
    fontFamily: Barlow
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: Barlow
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0.08em
spacing:
  xs: 8px
  sm: 16px
  md: 24px
  lg: 40px
  xl: 64px
  section: 112px
rounded:
  none: 0px
  control: 2px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.ink}"
    height: 52px
    rounded: "{rounded.control}"
    typography: "{typography.label}"
  body:
    backgroundColor: "{colors.background}"
    textColor: "{colors.paper}"
  secondary:
    backgroundColor: "{colors.background}"
    textColor: "{colors.muted}"
  placeholder:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.muted}"
  outline-control:
    backgroundColor: "{colors.line}"
    textColor: "{colors.paper}"
---

## Overview

Sitio comercial de una barbería real de Luque. Editorial urbano, fotografía de trabajos, tipografía directa y navegación corta. Preservar la identidad publicada: negro #080808, marfil #F4F0E8 y ocre #C49A3C; no introducir oro metálico ni una paleta de otra marca. Rulos es la oferta destacada, no la identidad completa del negocio.

Taste: variance 7, motion 3, density 3. Composición variada y espaciosa; feedback y entradas de 380ms, sin esperar para leer o reservar. Se prioriza contenido visible sin JavaScript. Tema oscuro propio de la identidad existente, sin selector de temas innecesario.

Referencia de catálogo elegida: Nike (análisis local leído completo). Tomar escala de titulares, protagonismo de imagen, catálogo plano sin sombras y contraste entre campaña y utilidades. Descartar fuentes propietarias, logo, paleta exacta, botones pill, ecommerce, badges promocionales y animación de contracción agresiva.

Referencias del cliente: Gentlemen Barber Clubs, fotografía humana y espacio real; Boardroom, claridad del CTA y separación de ofertas. No copiar símbolos, tipografías, textos, colores ni claims. Balls: el navegador capturó un fondo vacío; no atribuir principios visuales no observados. URLs y capturas en docs/REDESIGN_1717_REPORT.md.

## Colors

{colors.background} es el lienzo, {colors.paper} el texto principal, {colors.muted} el texto secundario. {colors.primary} identifica reserva, precio y servicio destacado. Evitar gradientes metálicos, verde WhatsApp de bajo contraste y overlays sobre toda la fotografía. Superficies {colors.surface} para placeholders y agrupaciones funcionales. {colors.line} delimita controles; divisores decorativos pueden ser más sutiles sin transmitir información.

Pares se verifican con lint oficial y medición de la interfaz. Texto sobre fotografía debe tener superficie sólida o scrim comprobado; no suponer contraste por usar blanco.

## Typography

Conservar Barlow y Barlow Condensed; retirar Cormorant del sistema para pasar de estética clásica a barber culture contemporánea. Ambas familias tienen SIL OFL 1.1, verificada en el repositorio oficial Google Fonts. Alojar fuentes localmente. Titulares con presencia, cuerpo 18px, mínimo 14px para metadatos. H1 mobile aproximadamente 56px, desktop 96–100px. No cortar letras, no titulares convertidos en imágenes. Ancho de lectura máximo 56ch.

## Layout

Contenedor de 1280px; gutters de 20px mobile y 48px desktop. Ritmo de 64px mobile y 112px desktop. Hero de texto más fotografía; resultados editoriales de seis slots, rulos en gran composición, servicios en filas, portfolio filtrable, prueba social en espacio reservado, fundadores en dos perfiles, catálogo abierto y local con dirección. Evitar repetir la misma familia de layout. Mobile pensado desde 375px, no sólo comprimido.

## Elevation & Depth

Profundidad por fotografías y cambio de escala. Sin glassmorphism, sombras flotantes ni 3D. Z-index: header 20, menú 30, dialog nativo en top layer. No CTA fijo inferior: el CTA del header permanece accesible sin tapar contenido.

Textura SVG estática de 160px a opacidad 0.018, sin bloquear eventos. Progreso de lectura de 2px con scroll timeline nativo donde se soporta, sin fallback que genere trabajo continuo. Entrada por IntersectionObserver desde 8px/opacity 0.9: nunca ocultar contenido. Reduced-motion desactiva entradas, progreso y transiciones. Ninguna intro, cursor personalizado ni animación que postergue la reserva.

## Shapes

Fotografías rectangulares, ratios reservados 3:4, 4:5, 1:1 y 9:16. Controles casi rectos con {rounded.control}. No esquinas redondeadas por defecto en todo. Placeholders con trama muy tenue, símbolo de medio, label humano y estado pendiente; IDs internos en data, no cadenas técnicas largas en el copy.

## Components

Botones 52px de alto, targets al menos 44px. Enlaces para navegar/WhatsApp; botones para filtros, menú y lightbox. Focus de 2px con offset; no ocultarlo. Menú nativo dialog con foco, Escape, cierre exterior y retorno de foco. Lightbox nativo dialog con anterior/siguiente, flechas, Escape y swipe. FAQ usa details/summary. Imágenes eager sólo en hero, lazy en galerías con width/height. Reels: fachada reservada, enlace exacto si confirmado; si falta URL, placeholder sin botón de reproducción falso.

Datos en src/data.mjs. null significa contenido no confirmado. No renderizar precios/stock/claims de productos desconocidos. Testimonios sólo publicados al confirmar quote, name y source. Campos de fundadores pendientes, sin inferir nombres por una foto.

Cierre de conversión sobre {colors.primary}, texto {colors.ink}, CTA oscuro con texto {colors.paper}; reutiliza el ocre de marca sin acabados metálicos. Padding 40px desktop / 20px mobile. La flecha del CTA se desplaza sólo 2px en hover de puntero fino. Fuentes, tokens y reglas se combinan en un CSS durante el build para evitar @import en producción.

## Do's and Don'ts

- Mostrar trabajo antes de afirmaciones. Usar fotos reales existentes que muestran el resultado con suficiente detalle.
- Mantener los siete precios verificados, rulos Gs. 180.000 desde una sola fuente.
- Preservar dirección, horario, WhatsApp, Instagram y enlace Maps.
- No inventar prueba, duración, permanencia, coordenadas, ratings, personas o stock.
- No cargar iframes sociales/mapa al inicio; no instalar animación ni analytics.
- No ocultar contenido a la espera de reveal. Reduced-motion cancela scroll suave y transiciones.
- No extender fotos pequeñas ni repetir la misma imagen dentro de un grid.
- Documentar límites reales del QA; no presentar simulación móvil como prueba física.
