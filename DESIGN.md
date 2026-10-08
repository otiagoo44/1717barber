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
    fontFamily: Archivo Black
    fontSize: 112px
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: -0.02em
  heading:
    fontFamily: Archivo Black
    fontSize: 64px
    fontWeight: 400
    lineHeight: 1.05
  body:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: Inter
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

Taste: variance 7, motion 7, density 3. Segunda pasada sobre la base existente: composición editorial, Rulos como primera categoría visual y motion rico pero funcional. Se conserva contenido visible sin JavaScript y reserva disponible desde el primer frame. El lienzo oscuro de marca alterna con el spread marfil de Rulos para crear jerarquía; no hay selector de temas.

Dos referencias del catálogo: Nike y BMW M. Tomar escala, fotografía como composición, bandas amplias y poco chrome. Descartar fuentes, logos, paletas, tricolor, ecommerce, thin body, pills, membresías y claims. Skin Expert sirve como referencia de disciplina: continuidad, aire y cambios de composición; no trasladar paleta, serif, formas beauty ni componentes.

Referencias del cliente: Gentlemen Barber Clubs, fotografía humana y espacio real; Boardroom, claridad del CTA y separación de ofertas. No copiar símbolos, tipografías, textos, colores ni claims. Balls: el navegador capturó un fondo vacío; no atribuir principios visuales no observados. URLs y capturas en docs/REDESIGN_1717_REPORT.md.

## Colors

{colors.background} es el lienzo, {colors.paper} el texto principal, {colors.muted} el texto secundario. {colors.primary} identifica reserva, precio y servicio destacado. Evitar gradientes metálicos, verde WhatsApp de bajo contraste y overlays sobre toda la fotografía. Superficies {colors.surface} para placeholders y agrupaciones funcionales. {colors.line} delimita controles; divisores decorativos pueden ser más sutiles sin transmitir información.

Pares se verifican con lint oficial y medición de la interfaz. Texto sobre fotografía debe tener superficie sólida o scrim comprobado; no suponer contraste por usar blanco.

## Typography

Comparación renderizada en docs/qa/second-pass: Barlow Condensed + Manrope, Archivo Black + Inter, Outfit + Work Sans. Elegida Archivo Black: masa tipográfica editorial y precio con protagonismo; Inter variable 400–600 para UI legible. Rechazar la continuidad excesiva de Barlow y la suavidad geométrica de Outfit. Barlow Condensed se conserva exclusivamente para el wordmark existente. Fuentes Latin locales, font-display swap, licencias OFL oficiales incluidas. H1 mobile 42–50px compuesto en tres líneas; desktop hasta 112px. Body 18px, labels 14px. Ancho de lectura 48ch.

## Layout

Contenedor editorial máximo 1600px, gutters 20px mobile / 48px desktop. El ancho crece en viewports amplios para evitar columnas encajadas por zoom del navegador. Home en diez capítulos → Rulos → trabajo real → servicios → reels/prueba → equipo → productos → local → FAQ breve → cierre. Una sola galería, no duplicación de evidencia. Nav: Inicio, Rulos, Servicios, Nosotros y Reservar. Productos y ubicación se descubren en el recorrido. Back link visible en secundarias; logo siempre /. Rulos usa texto sticky desktop y secuencia fotográfica en flujo natural; mobile desactiva sticky. Ratios mixtos, offsets y captions fuera de frame. Evitar repetición de rectángulos uniformes.

## Elevation & Depth

Profundidad por fotografías y cambio de escala. Sin glassmorphism, sombras flotantes ni 3D. Z-index: header 20, menú 30, dialog nativo en top layer. No CTA fijo inferior: el CTA del header permanece accesible sin tapar contenido.

Profundidad por capas fotográficas y offsets, sin efecto de textura global. Progreso de secuencia de reels de 1px ligado al scroll nativo. No se mantiene el límite anterior de motion 3 ni de entradas de 8px. Ver MOTION PHILOSOPHY y docs/MOTION_SYSTEM.md.

## Shapes

Fotografías rectangulares, ratios reservados 3:4, 4:5, 1:1 y 9:16. Controles casi rectos con {rounded.control}. No esquinas redondeadas por defecto en todo. Placeholders con trama muy tenue, símbolo de medio, label humano y estado pendiente; IDs internos en data, no cadenas técnicas largas en el copy.

## Components

Botones 54px de alto, targets al menos 44px. Enlaces para navegar/WhatsApp; botones para filtros, menú y lightbox. Focus de 3px con offset; no ocultarlo. Menú nativo dialog con foco, Escape, cierre exterior y retorno de foco. Lightbox nativo dialog con anterior/siguiente, flechas, Escape y swipe. FAQ usa details/summary. Imágenes eager sólo en hero, lazy en galerías con width/height. Reels: fachada reservada, enlace exacto si confirmado; si falta URL, placeholder sin botón de reproducción falso.

Datos en src/data.mjs. null significa contenido no confirmado. No renderizar precios/stock/claims de productos desconocidos. Testimonios sólo publicados al confirmar quote, name y source. Jonatan y Esteban son hermanos y cofundadores confirmados: retratos del mismo ratio, nombres del mismo tamaño y perfiles paralelos sin offsets que jerarquicen a uno. Especialidades y bios siguen pendientes. La foto conjunta no asigna identidades individuales.

Logo oficial recibido en JPG de 150×150px: círculo por CSS, sin alterar el archivo ni recrear la identidad. Reservar sus dimensiones y evitar ampliarlo más allá de su resolución. Pedir SVG o PNG de mayor calidad. Los cinco reels tienen URLs confirmadas y portadas auténticas locales; la home selecciona dos resultados terminados y un proceso, /rulos conserva los cinco en el orden recibido. No convertir esas portadas pequeñas en fotografías principales.

Cierre de conversión sobre {colors.primary}, texto {colors.ink}, CTA oscuro con texto {colors.paper}; reutiliza el ocre de marca sin acabados metálicos. Padding horizontal 48px desktop / 20px mobile. La flecha del CTA se desplaza 3px en hover de puntero fino. Fuentes, tokens y reglas se combinan en un CSS durante el build para evitar @import en producción.

## Do's and Don'ts

- Mostrar trabajo antes de afirmaciones. Usar fotos reales existentes que muestran el resultado con suficiente detalle.
- Mantener los siete precios verificados, rulos Gs. 180.000 desde una sola fuente.
- Preservar dirección, horario, WhatsApp, Instagram y enlace Maps.
- No inventar prueba, duración, permanencia, coordenadas, ratings, personas o stock.
- No cargar iframes sociales/mapa al inicio ni analytics. Una biblioteca de motion sería válida si se justifica; esta implementación se resuelve con CSS, IntersectionObserver y Web Animations API.
- No ocultar contenido a la espera de reveal. Reduced-motion cancela scroll suave y transiciones.
- No extender fotos pequeñas ni repetir la misma imagen dentro de un grid.
- Documentar límites reales del QA; no presentar simulación móvil como prueba física.

## MOTION PHILOSOPHY

Motion 7/10: entrada → reposo → transición → entrada. Hero con líneas, máscara fotográfica, segundo plano y metadata escalonados; CTA siempre legible y clickeable. Headings por máscara, fotografías por clip, listas por stagger, precios por wipe y metadata por dissolve. Scroll-linked parallax sólo en hero, Rulos y local, desplazamiento visual ≤6%. Un storytelling sticky importante por página, sólo ≥1024px; no rueda interceptada. Filmstrip 9:16 con scroll nativo, controles, teclado e indicador. Page transitions nativas entre documentos del mismo origen, fallback normal. Sin loops obligatorios, loaders, intro bloqueante, cursor sustituto ni testimonios ficticios. Reduced-motion: estado final inmediato, sin parallax, sticky ni secuencias. Ningún contenido opacity:0 por defecto. Tokens de duración/easing/distancia en public/assets/motion.css; documentación normativa en docs/MOTION_SYSTEM.md.

Implementación: hero por animaciones CSS agrupadas con una sola clase; reveals de scroll por WAAPI. Parallax desde 900px, sticky desde 1024px. Metadata/CTA mantienen opacity ≥.85 incluso durante entrada para conservar contraste. Reduced-motion elimina animaciones CSS y cancela WAAPI/transiciones activas. Containment de layout/style en capítulos normales, sin alturas estimadas ni content-visibility; hero y sticky fuera de containment. Mobile conserva motion y amplía descripciones/fichas de productos a 14px.
