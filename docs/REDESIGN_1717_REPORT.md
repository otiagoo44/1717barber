# Rediseño 17:17

Las secciones iniciales conservan la auditoría y entrega de la primera pasada como registro histórico. El estado actual está en **SECOND PASS — VISUAL & MOTION ELEVATION** y la lista vigente para compartir está en [MATERIAL_PENDIENTE_1717.md](MATERIAL_PENDIENTE_1717.md). Los nombres y cinco URLs que antes faltaban ya fueron recibidos.

## Antes: auditoría previa a implementar

2026-10-08. Repositorio completo: un index.html con CSS y JS inline y seis JPEG. Sin AGENTS.md en proyecto ni ancestros examinados; sin package.json, lockfile, dependencias de aplicación, tests, rutas secundarias, favicon, canonical, robots, sitemap o structured data. Carpeta «Nueva carpeta» vacía. .agents contiene las skills y no se modifica.

La home usa Cormorant Garamond, Barlow y Barlow Condensed, negro #080808, ocre #C49A3C y marfil #F4F0E8. Hero stock Unsplash, bloques genéricos de ventajas, siete tarjetas similares, proceso de reserva redundante, Instagram separado y reel con embed.js inmediato. Precio de Rulos desactualizado en el original. Navegación mobile escondida sin menú. Reveal deja el contenido invisible por defecto sin JS. FAQ sin estados aria. No lightbox ni filtros. Texto gris #888888, CTA verde con blanco y etiquetas pequeñas requieren revisión de contraste.

Preservar: WhatsApp 595983402497; Instagram https://www.instagram.com/1717barberia; Maps https://www.google.com/maps/search/Cap.+Dado+esquina+Gobernador+Irala+Luque+Paraguay; Cap. Dado esq. Gobernador Irala, Luque; lunes a sábado 8:00–21:00. Un reel exacto existe (DYDKRodJRS7), pero su temática no está confirmada: conservar como trabajo general, no etiquetarlo arbitrariamente como rulos.

Assets inspeccionados individualmente: foto_corte_rulos.jpeg (1200×1600, 156 KB), foto_corte_diseño.jpeg (1200×1600, 151 KB), foto_corte_tinte.jpeg (1200×1600, 118 KB), foto_equipo.jpeg (1144×1600, 238 KB), foto_local.jpeg (960×1280, 93 KB), foto_barbero_trabajando.jpeg (720×900, 83 KB). Las tres fotos de resultados tienen detalle útil; son material publicado, no evidencia de fecha reciente. Equipo sirve como contexto, no confirma identidades individuales. Local muestra una estación, no todo el salón. Foto de proceso con bordes negros se conserva en archivo, no se fuerza al hero.

Capturas reales previas: 375, 390, 768, 1440 en docs/qa/before. Sin overflow horizontal medido. Captura larga del recorrido automatizado dejó varias zonas sin reveal: no constituye validación de que el contenido original fuera visible de forma robusta. Se conserva esa evidencia.

## Brief visual y decisiones previas

Barbería local para visitantes que llegan desde Instagram, lenguaje urbano/editorial, conversión directa por WhatsApp y trabajo real antes del discurso. Taste 7/3/3. Conservar identidad negra/marfil/ocre refinando jerarquía y eliminando efectos dorados; headline Barlow Condensed y UI Barlow. Home con once secciones, /rulos con diez bloques específicos y /productos como catálogo de consulta.

Awesome Design MD: catálogo consultado, un sistema seleccionado y leído completo: Nike. Tomar fotografía dominante, escala, contraste y catálogo plano. Rechazar logo, fuentes, paleta exacta, pills, promociones y ecommerce. https://github.com/jpt/barlow y licencias Google Fonts verificadas: https://github.com/google/fonts/blob/main/ofl/barlow/OFL.txt y https://github.com/google/fonts/blob/main/ofl/barlowcondensed/OFL.txt.

Referencias del cliente inspeccionadas por navegador y web: https://gentlemen-barberclubs.de/ (fotografía humana a gran escala; descartar cliché de club, emblema y oro), https://www.boardroomsalon.com/ (jerarquía de reserva y oferta; descartar claims y membresías). https://ballsbarbershop.com.ua/ capturó pantalla vacía: no afirmar que se pudo analizar visualmente. No copiar activos de estas marcas.

UI/UX Pro Max ejecutado con Python real. Query inicial urban barbershop visual results mobile devolvió Swiss/SaaS y azul/naranja: descartada. Reintento barbershop grooming mantuvo propuesta genérica: fallback documentado. Consulta específica typography condensed legible confirmó Barlow Condensed + Barlow; landing portfolio gallery recomendó evidence-first y filtros. Colors photography studio aporta neutralidad, no reemplaza colores 17:17. UX mobile lazy loading y mobile focus modal: lazy bajo fold y foco visible. Stack real HTML/CSS/JS no tiene registro exacto; html-tailwind fue consultado como candidato adyacente, sólo se trasladan principios de responsive/reduced-motion a CSS nativo, sin instalar Tailwind.

## Implementación

Se conserva HTML/CSS/JavaScript nativo. El build usa únicamente Node y genera tres páginas estáticas; cero dependencias de runtime, frameworks nuevos, backend, analytics o librerías de animación. `vercel.json` mantiene un deploy estático con rutas limpias; no se realizó un deploy remoto.

Home: hero con dos trabajos reales; evidencia editorial de seis slots; rulos destacado; precios en filas; portfolio; prueba social preparada; dos perfiles de fundadores; cuatro productos; local; FAQ y cierre. Corte masculino conserva imagen propia y precio visible, sin transformar toda la empresa en un negocio de rulos. Se eliminan ventajas genéricas y pasos para usar WhatsApp.

Rulos: resultado real, precio central Gs. 180.000, galería, cinco fachadas de reels, consulta, proceso marcado pendiente, ficha de inclusiones/tiempo/condiciones, prueba exclusiva pendiente, cuidado pendiente, FAQ y CTA contextual. Sin fabricar antes/después ni prometer duración. El catálogo tiene seis fichas, cuatro filtros y consulta individual; ningún carrito, stock o precio inventado.

Prueba: tres resultados existentes se usan por su detalle útil, sin calificarlos como recientes. No se repite una foto dentro del mismo grid. Testimonios sólo se publican al completar cita, nombre y fuente. Fundadores: foto general del equipo y dos espacios de retrato, nombre, rol, especialidad y bio. No se asignan identidades a partir de la foto.

Archivos nuevos/modificados:

- `src/data.mjs`: fuente central de negocio, servicios, precios, medios, productos, prueba, equipo, FAQ y reels.
- `src/utils.mjs`: formato de precio, escape y mensajes de WhatsApp por intención/producto.
- `src/components.mjs`, `src/sections.mjs`, `src/pages.mjs`: composición, placeholders, navegación, páginas y SEO.
- `public/assets/site.css`, `site.js`, `tokens.css`: responsive, interacciones, foco, motion y tokens.
- `public/assets/media/`: WebP optimizados y variantes de 600px. Hero recortado desde la foto real, sin generar ni alterar evidencia.
- `public/assets/fonts/`: dos familias locales y licencias OFL; `public/assets/favicon.svg`.
- `scripts/build.mjs`, `serve.mjs`, `qa-browser.mjs`, `capture-qa.mjs`, `qa-polish.mjs`: build, preview y comprobaciones reproducibles.
- `index.html`, `rulos/index.html`, `productos/index.html`: HTML generado. `dist/` es la salida de deploy ignorada por Git.
- `package.json`, `package-lock.json`, `.gitignore`, `vercel.json`, `README.md`, `DESIGN.md`, `tests/content.test.mjs` y este informe.

Fuentes, tokens y estilos se combinan al construir en un CSS, eliminando la cadena bloqueante de @import. Hero eager y prioridad alta; galerías lazy con dimensiones. Fotografías WebP entre aproximadamente 22 y 178 KB según resolución. No hay requests de Instagram/Maps al cargar ni iframes iniciales.

WhatsApp, Instagram y Maps originales se preservan. Mensajes de reserva, corte, rulos, tinte y productos se centralizan; CTAs incluyen `data-cta`, `data-intent` y `data-service` donde corresponde. HairSalon JSON-LD usa únicamente nombre, dirección, teléfono, horarios e Instagram confirmados.

El dominio no estaba confirmado en el repo. `SITE_URL` o `VERCEL_PROJECT_PRODUCTION_URL` activan canonical, og:url, og:image absoluto y sitemap. No se inventó un dominio. Robots, título, descripción, favicon, idioma y metadata social se generan siempre. Esta rama del build está comprobada en tests; el dominio real y deploy quedan por confirmar.

## Acabado con landing-elevator

Se leyó el ZIP `.agents/skills/landing-elevator(1).skill`: SKILL.md y referencias anti-errors, visual-system y effects-library. Aplicado después del rediseño: textura SVG estática tenue, progreso de lectura nativo, entradas de 380ms sin ocultar contenido, feedback de flecha y cierre sobre el ocre existente.

Se descartan intro de 3.5–5.5 segundos, cursor personalizado, FOMO/notificaciones y prueba fabricada porque contradicen las instrucciones explícitas del cliente. También se descarta la entrega como HTML con activos base64: este repo requiere assets optimizados, mantenimiento y deploy Vercel. Se conserva el H1 y el contenido comercial. No se afirma haber aplicado todos los efectos del paquete.

## QA

Build `npm run build`: correcto. `npm test`: 5/5 contratos comerciales, WhatsApp, contenido honesto, páginas/SEO/assets y tokens. No había tests previos. Google DESIGN CLI 0.4.0: 0 errores, 0 advertencias, 1 información; export CSS real ejecutado y adaptado de @theme a :root para el stack nativo. El lint de tokens no certifica la interfaz.

Contraste calculado: marfil/negro 17.62:1, muted/surface 8.47:1, negro/ocre 7.66:1, marfil/line 5.20:1. Axe y Lighthouse complementan estos pares con la revisión de los estados renderizados; no equivalen a una certificación WCAG completa.

Chrome headless real: `/`, `/rulos`, `/productos` a 375, 390, 430, 768 y 1440px. Capturas viewport y completas en `docs/qa/after/`, secciones a 390/1440, menú, lightbox y cierre. Se inspeccionaron capturas del hero, evidencia editorial, rulos, servicios, equipo, catálogo, local y cierre. Son viewports/touch emulados, no pruebas en un teléfono físico.

`docs/qa/browser-qa.json`: 15 combinaciones sin overflow, un H1 por página, cero iframes y cero recursos externos iniciales; Axe WCAG A/AA sin violaciones en el alcance ejecutado. 72 clicks reales de enlaces visibles, con destinos externos interceptados para no enviar conversaciones: mensajes WA y teléfono comprobados, rutas/anchors comprobados con HTTP 200. WhatsApp redirige a api.whatsapp.com (200), Instagram (200), Maps (200). No se envió ningún mensaje ni se validó una reserva real.

Menú: abrir/cerrar, Escape, ciclo Tab y retorno de foco, navegación a servicios. Portfolio: cuatro filtros, lightbox, anterior/siguiente, flechas, Escape, exterior, foco y swipe por touch emulado. Productos: cuatro filtros. FAQ: las 14 preguntas abren y cierran; teclado también comprobado. Sin JavaScript: contenido, CTA y FAQ visibles; menú/filtros interactivos requieren JS.

`docs/qa/polish-qa.json`: targets visibles de al menos 44×44px, progreso desde 0 hasta 100%, progreso oculto con reduced-motion. Reduced-motion también cancela transiciones y scroll suave. Sin errores críticos de consola ni requests fallidos; una cancelación de imagen al navegar se registra aparte como ERR_ABORTED.

### Auditoría Impeccable

La skill instalada aporta una guía, no un comando de auditoría. Se revisó el resultado renderizado, con estos hallazgos y correcciones comprobables:

| Hallazgo | Impacto | Corrección / evidencia |
| --- | --- | --- |
| Decoración 17:17 con bajo contraste en placeholders | Medio, accesibilidad | Retirada; texto pendiente conserva contraste. Axe posterior sin violaciones. |
| Tab podía salir del último control de dialog | Alto, teclado | Ciclo explícito sobre controles visibles; pruebas de Tab/Shift+Tab y retorno de foco. |
| Hero desktop fragmentado y foto con exceso de fondo | Medio, jerarquía | Escala ajustada y recorte auténtico específico; capturas 375/390/1440 inspeccionadas. |
| Import CSS retrasaba estilos/fuentes | Medio, rendimiento | Un solo CSS de producción; Lighthouse posterior mejora y TBT home 0ms. |
| Catálogo saltaba de H1 a H3 | Medio, semántica | H2 de sección accesible antes de las fichas. |
| Nombre accesible del logo no coincidía con su texto concatenado | Alto, voz/accesibilidad | Espacio real entre nombre y descriptor, etiqueta coincidente. |

Jerarquía: evidencia antes de discurso, rulos dominante, servicios en filas, equipo humano y catálogo ligero. Legibilidad: Barlow body y Barlow Condensed, línea de lectura limitada, foco visible, etiquetas legibles. Color: identidad original y pares medidos, incluidos CTA/cierre. Responsive: sin recortes/overflow medido. Overlays: fondo, tamaño, teclado y touch comprobados. Consistencia: tres páginas comparten tokens, navegación, mensajes y placeholders. Imágenes sin estirar y reservas de ratio; no embeds pesados.

### Rendimiento medido

Resultados finales en los JSON `docs/qa/lighthouse-*.json`, Chrome local con simulación mobile y throttling de Lighthouse. No son métricas de usuarios ni certificación de producción.

| Página | Performance | Accessibility | Best Practices | SEO | LCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Home | 91 | 100 | 100 | 100 | 3.3s | 0ms | 0 |
| Rulos | 93 | 100 | 100 | 100 | 2.8s | 120ms | 0 |
| Productos | 99 | 100 | 100 | 100 | 1.8s | 0ms | 0 |

La home no alcanza todavía LCP <2.5s en esta simulación. Validar nuevamente con el dominio/CDN real y fotografía definitiva del hero. No presentar el score como una garantía. Peso total medido por Lighthouse: home 504 KiB, rulos 334 KiB, productos 126 KiB. Sin nuevas dependencias de runtime ni videos descargados. Se conserva una medición preliminar concurrente para trazabilidad, no como resultado final.

## Pendientes al cierre de la primera pasada — histórico

1. **Hero:** foto reciente excelente de rulos y un corte masculino, originales sin interfaz de Instagram, autorización de publicación y fecha. Las actuales sirven provisionalmente; no prueban el nivel más reciente.
2. **Resultados:** seis originales distintos: RULOS_RESULTADO_01/02, CORTE_RESULTADO_01/02, COLOR_RESULTADO_01, DETALLE_RESULTADO_01. Faltan de inmediato rulos02, corte02 y detalle01; pedir reemplazos actuales de las tres existentes. Alt, categoría y consentimiento. Antes/después sólo pares auténticos del mismo trabajo.
3. **Reels:** cinco URLs exactas de rulos y cinco thumbnails verticales limpios. IDs REEL_RULOS_01…05; home reutiliza los primeros tres. Confirmar temática del reel DYDKRodJRS7 antes de asociarlo a rulos.
4. **Testimonios:** dos generales, dos exclusivos de rulos y un video de cada tipo. Cita literal, nombre autorizado, contexto, fuente verificable, foto/video opcionales y permiso. TESTIMONIO_REAL_01/02_PENDIENTE, TESTIMONIO_RULOS_01/02_PENDIENTE, VIDEO_TESTIMONIAL_PENDIENTE y VIDEO_TESTIMONIAL_RULOS_PENDIENTE.
5. **Fundadores:** para cada una de las dos personas: nombre confirmado, rol, especialidad, bio breve en su propia voz y retrato vertical individual. Confirmar quién es quién en la foto general. FUNDADOR_01/02_NOMBRE/BIO/FOTO_PENDIENTE. No se requieren años ni historias inventadas.
6. **Productos:** fotos limpias individuales (mínimo 1200px) de Iconic Men Cream Pomade, Hair Wax Matte Look, Polvo Texturizador, Manifesto Matte Pomade, One in a Million y producto de barba. Confirmar marca/nombre exactos, categoría, uso neutral y si se venden o sólo se usan. Precio, brillo/fijación y disponibilidad únicamente si verificables. IDs PRODUCT_PHOTO_PENDING por ficha. Confirmar cualquier recomendación para rulos antes de conectarla con cuidados.
7. **Local:** fotografías actuales de fachada, interior y estación; permiso y fecha. La existente sólo muestra una estación. Confirmar dirección y enlace del pin exacto si difiere del search publicado.
8. **Rulos:** confirmar descripción, qué incluye, tiempo estimado, condiciones, largo mínimo si aplica, tipos de cabello evaluados, duración/permanencia, cuidados, si incluye corte y las cuatro etapas propuestas. Son campos/FAQ pendientes, no instrucciones técnicas publicadas.
9. **Publicación:** dominio oficial de la web para SITE_URL, proyecto Vercel actual y validación comercial final de teléfono, horarios y siete precios. Confirmar cambios reales antes de editar.

## Estado de la primera entrega — histórico

Implementación completa de las tres rutas y estructura comercial solicitada. Precios y contactos preservados/corregidos; evidencia real disponible; placeholders honestos reemplazables. Preview local en http://127.0.0.1:4174/. Apertura automática en el navegador del usuario fue rechazada por permiso de acceso a localhost; se entregó enlace y no se intentó una vía alternativa para abrirlo. No se realizó un deploy remoto durante el rediseño.

La preparación técnica está terminada. La evidencia reciente, identidades, testimonios, catálogo definitivo y respuestas de rulos siguen pendientes del cliente. No se consideran contenido validado ni se ocultan como si estuvieran completos.

## SECOND PASS — VISUAL & MOTION ELEVATION

### 1. Qué fallaba

Se inspeccionó el commit `4d49675` y se capturaron las tres páginas a 390/1440 antes de editar: `docs/qa/second-pass/before-*`. La estructura comercial, fuentes de datos, WhatsApp contextual, filtros, lightbox, SEO y build estático eran útiles y se conservaron. La navegación de seis opciones dispersaba decisiones; resultado inmediato y portfolio duplicaban evidencia; fotos demasiado uniformes, tipografía Barlow de poco contraste editorial y motion conservador hacían sentir capítulos aislados. Rulos no ganaba suficiente espacio respecto del resto.

### 2. Qué se simplificó

Home de diez capítulos: hero → Rulos → trabajo real → servicios → reels/prueba → equipo → productos → local → cinco FAQ → cierre. Una galería, una prueba social integrada con los reels, menos copy. Se mantienen sólo `/`, `/rulos`, `/productos`; nunca se crearon `/servicios` ni rutas para información resoluble en la home. Productos y ubicación se descubren en el recorrido. Se conserva el código útil de overlays, foco, filtros, mensajes y datos.

### 3. Navegación antes/después

Antes: Rulos, Servicios, Resultados, Productos, Nosotros, Ubicación y reserva. Después: Inicio, Rulos, Servicios, Nosotros y reserva. En home son anchors; «Ver Rulos» lleva a la landing `/rulos`. Logo oficial circular y wordmark vuelven siempre a `/`. Las secundarias tienen «← Volver a 17:17» visible. Footer con Inicio, Instagram, WhatsApp, dirección/horario y «Volver al inicio ↑». Menú móvil de cuatro opciones principales; CTA disponible en header sticky, sin invadir safe areas.

### 4. Tipografía antes/después

Se renderizaron y compararon tres parejas a 390/1440: Barlow Condensed + Manrope, Archivo Black + Inter y Outfit + Work Sans. Capturas `type-*.png`. Archivo Black aporta masa y carácter a headlines/precio; Inter variable 400–600 mantiene lectura y UI. Se descartó Barlow como headline por continuidad excesiva con la primera pasada y Outfit por suavidad geométrica. Barlow Condensed queda sólo en el wordmark. Fuentes Latin locales, OFL verificadas, font-display swap; no doce pesos ni una dependencia de fuentes externa. Escala mobile compuesta en tres líneas, no simple reducción de desktop.

### 5. Tratamiento de imágenes

Hero con titular sobre borde de la composición, principal 4:5, inset de corte y track editorial. Galería de ratios 4:5, 16:10, 3:4 y 9:16, captions fuera del frame, offsets y lightbox. Rulos sobre marfil con secuencia vertical; local con crop amplio. Fotografías casi rectas y controles de 2px, sin radius/shadow uniforme. Equipo compartido con ambos hermanos y perfiles de igual tamaño, sin jerarquía por offset.

Los cinco reels recibidos tienen portadas auténticas obtenidas del `EmbeddedMediaImage` de su publicación, no capturas con interfaz de Instagram. Procedencia en `reel-sources.json`. El cuarto ofrece un original 1170×2080: se usa como segundo resultado de rulos y se etiqueta «fotograma real del reel», conservando su encuadre del autor. No se amplía una miniatura de 480px para simular una fotografía grande. Ninguna persona, local o resultado generado por IA.

### 6. Cómo se reforzó Rulos

Precio Gs. 180.000 desde el hero. Primer gran bloque después del hero: contraste marfil, headline enorme, precio gráfico, fotografía real y texto sticky desktop. Servicio de primera fila con mayor escala. Dos resultados de rulos en galería, tres previews en home —dos finales y un proceso—, cinco en `/rulos`, CTA contextual y landing propia. Cortes conservan inset propio, galería y Gs. 30.000; tinte y barba siguen en la oferta. No se convierte la marca en una empresa exclusiva de rulos.

### 7. Motion system

CSS + IntersectionObserver + Web Animations API, cero dependencias de runtime. Diales Taste 7/7/3. Hero en CSS: header/eyebrow → líneas → máscara fotográfica → precio/acciones → inset/metadata. Una clase inicia el conjunto, en lugar de diez llamadas animate() con trabajo de estilos repetido. Scroll: masks para títulos, clip para fotografías, stagger para filas/reels/proceso, wipe para precio. CTA con flecha/tap, links con underline, producto con desplazamiento de 7px, FAQ con cambio de signo. Filmstrip 9:16 con scroll snap nativo, botones, flechas de teclado, touch, indicador y progreso; las cinco URLs abren Instagram. Cross-document View Transitions progresivas, fallback HTML normal. Tokens, timings y anti-patterns en [MOTION_SYSTEM.md](MOTION_SYSTEM.md).

Una zona sticky en home desde 1024px; parallax controlado ±5% en hero/Rulos/local desde 900px. Mobile mantiene entradas y feedback sin pinning complejo. Ningún scroll hijacking, wheel listener, autoplay ni intro bloqueante. Defaults visibles aunque falle JS. Se actualizaron DESIGN.md y reglas conservadoras anteriores; accesibilidad y performance siguen siendo límites.

### 8. Landing Elevator aplicada realmente

Se leyó completo `.agents/skills/landing-elevator(1).skill` y sus referencias visual-system, effects-library y anti-errors. Se aplicaron hero compuesto, escala tipográfica, layering fotográfico, imagen como parte del layout, headline/mask choreography, secuencia de entrada, variedad de reveals, storytelling sticky acotado, scroll-linked motion, feedback de CTA, transiciones entre documentos y cierre de marca amplio. El acabado se juzgó con capturas reales, no con una lista de efectos.

Awesome Design MD: catálogo consultado y dos sistemas estudiados, Nike y BMW M. Se tomaron escala, evidencia fotográfica, contraste, bandas amplias y navegación contenida; se rechazaron identidad, paletas, fuentes propietarias, tricolor y componentes de ecommerce. Skin Expert se capturó a 390/1440 y se usó para continuidad, aire y cambios de composición; no se trasladaron su paleta, serif, marca o estética clínica. UI/UX Pro Max se volvió a consultar con las cinco queries del brief y búsquedas por dominios; recomendaciones SaaS/beauty o paletas ajenas se descartaron, DESIGN.md gobierna.

### 9. Recomendaciones rechazadas y reconciliación

No intro de 3.5–5.5s, cursor propio, FOMO/notificaciones, testimonios fabricados, base64 monolítico, marquées permanentes ni librerías superpuestas. Contradicen conversión, verdad comercial, mantenimiento o rendimiento. No se rechazó sticky/parallax por la regla anterior: se probaron y se conservaron donde orientan hacia Rulos. La recomendación de offsets en retratos se reemplazó por igualdad visual al confirmar que ambos hermanos fundaron el negocio. Productos siguen siendo catálogo de consulta, no ecommerce.

### 10. Performance y estabilidad

AVIF responsive con fallback WebP, dimensiones reservadas y lazy bajo fold; hero eager y prioridad alta. Inset usa variante de 600px, no carga un original grande en un frame pequeño. CSS de producción combinado y compactado; fuentes locales con preload, sin @import ni fuentes externas. Geometría de reels inicializada al aproximarse al viewport y puntos cacheados; no se mide el filmstrip durante la coreografía del hero. Sin video, iframe o embed.js en carga inicial.

Se probó content-visibility:auto para ahorrar renderizado, pero el QA encontró desplazamientos de geometría que hacían perder clicks en filtros/FAQ al saltar. Se retiró, y se repitió QA sobre la interfaz estable. Los capítulos normales usan contain:layout style, conservando sus alturas reales; no se salta su contenido. Se sustituyó el arranque de hero por animaciones CSS agrupadas tras detectar long tasks. Optimización subordinada al funcionamiento real. Los scripts QA y capturas no forman parte de `dist/` ni del bundle. Mediciones locales finales se registran debajo; no son datos de usuarios ni una garantía de producción.

### 11. Reduced motion y auditoría final

Reduced-motion: estado final inmediato, cero animaciones, sin smooth scroll, parallax, sticky ni page transitions. Cambio de preferencia durante una entrada cancela WAAPI. Pagehide/BFcache dejan el contenido visible. Menú, filtros, lightbox, FAQ, reels y WhatsApp siguen disponibles. La prueba contempla que los eventos de cambio de media query son asíncronos; espera el estado final real.

Impeccable instalada es una guía de auditoría, no una CLI. Se usó después de implementar para revisar el resultado renderizado y corregir problemas funcionales primero: contraste del caption marfil y frames de entrada, timeline de parallax dentro de un crop, geometría de reels, optimización de renderizado inestable y jerarquía desigual de fundadores. La segunda fotografía de /rulos usa un crop 4:5 para conservar el pelo completo. Las descripciones y marcas de productos se ampliaron en mobile. El opt-in de View Transitions permanece estable y reduced-motion salta sus animaciones sin InvalidStateError. Se inspeccionan las capturas de las tres rutas a seis tamaños y se registran resultados reproducibles en los JSON de segunda pasada. No se afirma certificación WCAG ni prueba física en iOS/Android.

### 12. Assets pendientes

Ya integrados: logo oficial circular, Jonatan y Esteban como hermanos/cofundadores, cinco URLs exactas y portadas reales, un segundo resultado de rulos desde el original del cuarto reel. Siguen pendientes: fotos actuales definitivas de hero y resultados, corte02 y detalle01, retratos individuales y bios/especialidades de ambos, cuatro testimonios con fuentes, dos videos testimoniales, seis fotos/fichas finales de productos, mejores fotos del local, respuestas y condiciones verificadas del servicio de rulos, logo vectorial y dominio oficial. Lista exacta lista para compartir: [MATERIAL_PENDIENTE_1717.md](MATERIAL_PENDIENTE_1717.md).

### Archivos de implementación

`src/data.mjs`, `src/components.mjs`, `src/sections.mjs`, `src/pages.mjs`; `public/assets/site.css`, `site.js`, `motion.css`, `tokens.css`, fuentes locales/OFL, logo JPG, AVIF y portadas WebP; `scripts/build.mjs`, `serve.mjs`, `capture-qa.mjs`, `qa-browser.mjs`, `qa-polish.mjs`, `audit-second-pass.mjs`, `setup-fonts.mjs`, `optimize-media.mjs`, `qa-performance.mjs`; `tests/content.test.mjs`; HTML generados de las tres rutas; DESIGN.md, README y documentación de entrega/QA. Sin cambios en Vercel ni stack, sin nuevas dependencias de runtime. La carpeta de skills preinstalada no se incluye en el commit.

### Mediciones finales de performance

Lighthouse mobile por separado, sin otras tareas de navegador concurrentes: `docs/qa/second-pass/lighthouse-*.json` y `performance-summary.json`.

| Ruta | Performance | Accessibility | Best Practices | SEO | LCP | TBT | CLS | Transferencia |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| / | 95 | 100 | 100 | 100 | 2.79s | 29ms | 0 | 454 KiB |
| /rulos | 91 | 100 | 100 | 100 | 2.79s | 232ms | 0 | 515 KiB |
| /productos | 98 | 100 | 100 | 100 | 1.81s | 131ms | 0 | 161 KiB |

La simulación local todavía sitúa LCP de Home/Rulos alrededor de 2.8s; no afirmar que alcanza <2.5s. Rulos conserva TBT de 232ms. Validar nuevamente en el dominio/CDN real y con el hero definitivo. Cero embeds sociales/mapa en carga inicial, cero videos descargados, cero dependencias de runtime nuevas. Los scores son mediciones de laboratorio, no datos de usuarios.

### QA final y revisión de capturas

- `npm run build`: PASS. `npm test`: 6/6 PASS. Google DESIGN CLI: 0 errores, 0 advertencias, 1 información; `design-lint.json`. Export CSS real realizado al actualizar tokens; no se instaló Tailwind.
- `/`, `/rulos`, `/productos`: 375, 390, 430, 768, 1024, 1440px. Dieciocho combinaciones; viewport y página completa capturados e inspeccionados, además de secciones, perfiles de igual jerarquía, menú, lightbox y quinto reel. Archivos en `docs/qa/second-pass/after/`.
- `browser-qa.json`: PASS. Un H1 por página, cero overflow horizontal, cero iframes, sólo recursos locales iniciales, cero violaciones Axe A/AA en el alcance ejecutado. 81 clicks nativos en enlaces/CTA, comprobando mensajes y destinos sin enviar conversaciones. WhatsApp, Instagram y Maps responden HTTP 200; cinco enlaces de reels exactos, sin sexto.
- Menú: abrir/cerrar, Escape, Tab atrapado, retorno de foco y anchors. Galería: cuatro filtros, lightbox, anterior/siguiente, flechas, Escape, exterior y swipe emulado. Productos: cuatro filtros. FAQ: click, Enter y todas las preguntas abren/cierran. Sin JS: HTML, enlaces y FAQ disponibles; menú/filtros avanzados requieren JS.
- `polish-qa.json`: PASS. Targets visibles ≥44px, entrada del hero perceptible, parallax desktop cambia con scroll, sticky correcto, scroll lento/rápido y retorno sin animation lock. View Transition nativa con `pagereveal` y `ready` comprobados; navegación y back correctos. Reels: cinco portadas locales cargadas, botones, flechas, touch y estado 05/05.
- Reduced-motion: cero animaciones, transform de parallax none, sticky static, scroll auto, transition 0s; cambio de preferencia durante un reveal llega al estado final. El harness espera que termine una captura nativa de navegación antes de cambiar preferencias por CDP, evitando una carrera artificial de emulación; no filtra errores de la app.
- Cero errores críticos de consola y cero requests fallidos no cancelados; las cancelaciones de navegación se registran aparte. No se validó una conversación/reserva efectiva ni reproducción de Instagram en dispositivos físicos. Chrome y touch emulados no certifican iOS/Android ni WCAG completo.

### Git y preparación de publicación

Inline reel playback: los cinco reels confirmados se reproducen dentro de la página mediante un único embed oficial montado bajo demanda. El diálogo conserva foco, Escape, cierre exterior, enlace de respaldo a Instagram y desmontaje del iframe. La carga inicial sigue sin iframes ni embeds sociales.

Refinamiento visual posterior a las capturas: se eliminó la miniatura diagonal del hero, se retiró el titular cruzando el encuadre y se dejó una sola fotografía dominante con el texto en una columna propia. También se quitó el bloque numérico negro de cada portada; el contador permanece solamente en la barra de control.

Trabajo sobre `feat/redesign-1717`, conservando el commit previo y la base funcional. `main` permanece en `c08044f3800f0203097596f548fc152377e81d13`; no merge. Preview local: http://127.0.0.1:4174/. No se ejecutó deploy remoto manual. La publicación comercial definitiva todavía requiere completar/confirmar el material listado y el dominio oficial; los pendientes visibles son honestos y reemplazables desde datos centrales.

## THIRD PASS — REFINAMIENTO MINIMALISTA Y CIERRE

Esta sección reemplaza las decisiones visuales y las métricas de las pasadas anteriores. El pedido vigente fue simplificar y elevar la landing según el análisis recibido el 8 de octubre de 2026. Se conserva la tipografía Inter de esta pasada; la exploración para recuperar o comparar la tipografía anterior queda deliberadamente pendiente para una iteración posterior.

### Cambios realizados

- Se eliminó la segunda imagen del hero, el titular sobrepuesto y la miniatura diagonal. El hero ahora tiene una sola fotografía real, una columna de copy y una acción primaria clara.
- Se redujo la navegación a Inicio, Rulos, Servicios, Nosotros, Ubicación y Reservar. El logo oficial circular vuelve a `/`; Productos queda como acceso dentro del recorrido y del footer.
- Se adelantaron servicios y precios, se quitó la numeración decorativa y se retiraron testimonios, fichas de producto y preguntas sin información confirmada.
- Rulos conserva el primer bloque destacado, Gs. 180.000, dos resultados reales y la landing `/rulos`. Los cinco reels viven allí; la home no duplica embeds ni portadas.
- Productos quedó como catálogo de consulta, sin tarjetas vacías ni stock/precios inventados.
- Jonatan y Esteban aparecen como hermanos y cofundadores con el mismo peso visual y una foto conjunta real.
- El fotograma de reel se recorta mediante CSS en la galería y en el lightbox para eliminar el contorno negro incorporado en la captura, sin editar el resultado del cabello.
- FAQ ahora sólo publica respuestas verificadas: reserva, corte, rulos, ubicación, horarios y consulta de productos.

### Skills y dirección

Se leyeron `awesome-design-md`, `google-design-md`, `impeccable`, `taste` y `ui-ux-pro-max`. La referencia elegida para esta pasada fue BMW Corporate del catálogo local de Awesome Design MD: alineación, ritmo, jerarquía y superficies planas. Se descartaron paleta, tipografía propietaria, tricolor, patrones de configurador y componentes de ecommerce. DESIGN.md manda sobre las recomendaciones genéricas. Taste se ajustó a variance 4, motion 3 y density 3. UI UX Pro Max aportó principios de grilla, responsive images, object-fit, ratio reservado y foco visible; la búsqueda específica de landing no devolvió un resultado aplicable y no se inventó una recomendación.

### Reproductor y límite de verificación

El click de cada portada monta sólo entonces el embed oficial `https://www.instagram.com/reel/{id}/embed/`; el diálogo tiene foco, Escape, cierre, retorno al origen y enlace de respaldo. La prueba aislada confirmó los cinco URLs, apertura/cierre, desmontaje del iframe y retorno de foco. La prueba contra Instagram real agotó el tiempo del proveedor en el navegador automatizado, por lo que no se declara reproducción verificada: el resultado depende de Instagram, cookies, permisos y disponibilidad del embed.

### QA de esta pasada

- `npm run build`: PASS. `npm test`: 6/6 PASS. `npm run design:lint`: 0 errores, 0 advertencias y 1 información de resumen. `node --check public/assets/site.js` y `git diff --check`: PASS.
- QA Chrome en `/`, `/rulos` y `/productos` a 375, 390, 430, 768, 1024 y 1440px: 18 combinaciones, sin overflow, un H1, cero placeholders públicos, cero iframes iniciales, imágenes locales completas y Axe sin violaciones en el alcance ejecutado. Resultado en `docs/qa/refinement/qa.json`.
- Menú mobile, Escape, retorno de foco, filtros de galería, lightbox, navegación por flechas, FAQ, links de WhatsApp contextual, Instagram, Maps, reduced motion y render sin JavaScript fueron comprobados. Los clicks externos se interceptaron para no enviar mensajes.
- Lighthouse local separado: Home 84/100 performance, 100 accessibility, 100 best practices, 100 SEO; Rulos 95/100, 100, 100, 92; Productos 100/100 en las cuatro categorías. LCP 2.56s / 2.19s / 1.51s, TBT 423ms / 195ms / 0ms y CLS 0. Son métricas de laboratorio local, no datos de usuarios. Rulos conserva un warning de SEO sobre anchors no crawlables y la Home queda por encima del objetivo ideal de LCP; validar con CDN y dominio final.
- Las capturas y boards revisados se encuentran en `docs/qa/refinement/`; no se incluyen imágenes temporales de QA en el commit. El JSON de resultados sí queda como trazabilidad.

### Publicación y pendientes

La rama de trabajo es `feat/refine-1717-elegant`. Después de este cierre se integrará en `main` y se hará push, sin modificar otras ediciones del cliente. Quedan para una siguiente tanda: comparar la tipografía anterior contra Inter, recibir retratos individuales/bios, testimonios, fotos definitivas de productos y local, respuestas técnicas verificadas de rulos y reemplazar las portadas por videos originales si 17:17 los facilita.

## FINAL CONTENT PASS — 2026-10-12

Esta sección es el estado vigente y reemplaza los pendientes y decisiones de publicación de las pasadas anteriores. Alcance: contenido real, agenda, integración futura y QA; se preservó el diseño aprobado.

### Auditoría Git antes de escribir código

Se ejecutaron `git status`, `git branch --show-current`, `git log --oneline --decorate -n 15`, `git diff HEAD^..HEAD --stat` y el diff completo. Rama inicial: `main`; HEAD/origin/main auditado: `684688bfd8a4b023b347ed4405a4db4fba1ca6bc`; parent: `7a18792786290b7f1a5e8953da8d58ebf84d2bd0`. El parent es el commit anterior al HEAD publicado; Git local no prueba cuántos commits integraron el último push. Se estudiaron también `7e94a9b`, `652cd0d`, el rediseño `4d49675` y la base `c08044f` con show/diff, sin checkout destructivo.

El último commit había reemplazado el embed por cinco MP4 nativos bajo interacción y corregido reveals, crop de un frame y reduced motion. El anterior recuperó Archivo Black y motion mobile; los siguientes refinamientos consolidaron la composición editorial vigente. No eran una invitación a rehacer la landing. El estado inicial tenía cinco originales reorganizados por el usuario y carpetas nuevas de material; se conservó esa reorganización.

Pendiente entonces: imágenes de productos (ninguna ficha publicada), dos resultados adicionales de cortes, mejores fotos del local, portraits/bios individuales y condiciones detalladas de rulos. Ya finalizados: orden de secciones, Archivo Black/Inter, negro/marfil/ocre, hero de una imagen, navegación, filtros, diálogos, cinco reels, reveals y sistema de reduced motion. Esas decisiones se preservaron.

Se creó `feat/final-content-booking` desde el HEAD auditado. No se trabajó directamente sobre main, ni se creó barberia-crm, Supabase o un backend nuevo.

### Contenido y assets

Se inspeccionaron visualmente todas las imágenes recibidas y fotogramas de los doce videos de trabajos. [CONTENT_ASSETS.json](CONTENT_ASSETS.json) registra KEEP/REPLACE/REMOVE/DUPLICATE/LOW QUALITY por archivo. [CONTENT_ASSETS.md](CONTENT_ASSETS.md) registra selección, procedencia y pendientes reales. REMOVE significa no publicar, no borrar originales.

Hero actual de rulos, destacado diferente, galería de seis trabajos distintos (dos rulos, tres cortes, un color), cinco fichas de producto y tres vistas del local. No se repite una foto/trabajo en varios slots de una misma página. El catálogo y el hero reutilizan sus datos entre rutas de forma coherente. No se amplió la secuencia de reels con clips extra. Se preservaron resultados históricos limpios de rulos/color y foto conjunta de equipo que siguen siendo útiles.

Los recortes de productos muestran los envases identificados, sin UI de Google ni precio/claims publicitarios. One in a Million no se sustituyó por One Million Dollars. Producto de barba sin identidad verificable permanece sin publicar. Consultar es la única disponibilidad afirmada. No ecommerce/carrito/stock inventado.

Catorce derivados nuevos AVIF/WebP, dimensiones reservadas, orientación correcta, variantes 600px sólo cuando corresponde y originales conservados fuera de dist. Hero eager/high priority; productos, galería y local lazy. Cinco videos existentes con posters, carga/reproducción por interacción, pausa/liberación al cerrar. Sin autoplay ni video/Instagram en carga inicial. [assets-generated.json](qa/final-content/assets-generated.json) registra tamaños/crops/fuentes; `scripts/finalize-content-assets.mjs` permite reproducirlos con herramientas externas al runtime.

Rulos: **Gs. 180.000**, corte separado, aproximadamente **2 horas**; largo y condiciones se consultan individualmente antes de reservar. Home, /rulos, FAQ y metadata usan los datos actuales. No se publicaron cuidados, testimonios, especialidades ni credenciales inventadas.

### Agenda y consultas

URL real recibida: `https://cal.com/ezequiel-oviedo-dthlhd/barberia`, única fuente pública en `business.booking.url` de `src/data.mjs`. Helper `bookingLink()` compartido, sin embed ni keys. Agendar del header, hero, Elegir horario en servicios/barra mobile, ubicación y cierre van a Cal.com. Consultas de rulos/servicios, productos y contacto siguen a WhatsApp contextual. No se envían reservas al CRM desde el navegador.

Cal.com abre HTTP 200 y muestra disponibilidad a 390/1440, timezone America/Asuncion. **Configuración externa pendiente:** el evento muestra 40m y Cal Video. Corregir duración/atención presencial y servicio reservable antes de publicación comercial, especialmente para rulos de aproximadamente dos horas. No se modificó esa cuenta ni se creó una reserva. Evidencia: [cal-link.json](qa/final-content/cal-link.json), [cal-390.png](qa/final-content/cal-390.png), [cal-1440.png](qa/final-content/cal-1440.png).

WhatsApp, Instagram y Maps respondieron HTTP 200 mediante GET. No se enviaron mensajes. Destinos y mensajes se comprueban por clicks interceptados; un HTTP 200 no prueba una reserva/conversación efectiva. [external-links.json](qa/final-content/external-links.json). La producción histórica no pudo consultarse por timeout en esta sesión y no se usó como fuente visual.

### Skills y preservación

Se comprobaron y leyeron las cinco skills instaladas en `.agents/skills`: awesome-design-md, google-design-md, impeccable, taste, ui-ux-pro-max y las referencias pertinentes. No existe Landing Elevator instalada. Se usaron para auditoría, jerarquía, responsive, imágenes, foco y acabado; no para sustituir el diseño. Se mantuvieron tokens, tipografías, ritmo, estructura y motion. DESIGN.md sólo actualiza el contrato editorial vigente. Impeccable es una adaptación de revisión, no se afirma haber ejecutado una CLI inexistente.

### Preparación de integración

[BARBERIA_CRM_INTEGRATION.md](BARBERIA_CRM_INTEGRATION.md) define una aplicación/backend/base compartidos para múltiples barberías, workspace≈barbería, tenant server-side, membership/RLS, contactos/appointments/activity, formularios públicos futuros y secretos sólo backend. Se estudió el principio slug+token→tenant server-side de dental-crm, sin copiar entidades odontológicas.

Cal.com es fuente autoritativa por webhook firmado. API v2, eventos creados/reprogramados/cancelados, raw-body HMAC, integration/event type/team mapping, inbox durable, deduplicación, transacciones y referencias a UID previo/nuevo para mantener una misma cita tras reprogramar. Historial preservado; cancelación no borra la cita. UTM se documenta con soporte oficial; no se inventa metadata ni se etiqueta website sin evidencia. No hay barberia_id confiado al navegador ni claves privadas en el bundle.

### Cofundadores desde sus videos

Se pudieron abrir y examinar ambos videos indicados. Con autorización del usuario se instaló transcripción local. WhisperX no pudo descargar su modelo desde el CDN; OpenAI Whisper oficial small, CPU y español completó ambos videos sin subir audio. La transcripción contiene frases ruidosas, por lo que se eligieron ideas claras y no se publicó texto literal dudoso. [FOUNDER_CONTENT.md](FOUNDER_CONTENT.md) documenta intervalos y procedencia.

Jonatan: «El oficio se construye», síntesis de su práctica y del proyecto con su hermano. Esteban: «Crecer mano a mano», síntesis del apoyo y complemento mutuo. Son titulares editoriales, no citas atribuidas. Ambos Cofundador, sin cargos/especialidades inventados; idéntico tratamiento tipográfico, divisor y acento existente. Texto debajo del espacio para retrato; perfiles apilados en móvil/tablet para no comprimir la lectura. Sólo faltan retratos individuales, señalados explícitamente. Bios ya no son pendientes.

### Archivos de esta pasada

Contenido/componentes: `src/data.mjs`, `components.mjs`, `sections.mjs`, `pages.mjs`, `utils.mjs`. Acabado: `public/assets/site.css`, selector de reveals en `site.js`, 14 sets de imágenes en `public/assets/media`. No se cambió motion.css, tokens ni fuentes. HTML de las tres rutas regenerado.

Validación: `tests/content.test.mjs`, `scripts/qa-refinement.mjs` y mantenimiento opcional `scripts/finalize-content-assets.mjs`. Documentación: README, DESIGN.md, este reporte, MATERIAL_PENDIENTE, CONTENT_ASSETS.md/json, FOUNDER_CONTENT y BARBERIA_CRM_INTEGRATION. Nuevos originales organizados por el usuario en `img/fotos-*` conservados; sin incluir los videos privados de presentación en dist ni el repo. Capturas y JSON de evidencia en `docs/qa/final-content`.

La prueba de enlaces internos se corrigió porque Puppeteer devuelve null en navegación de hash dentro del mismo documento; ahora comprueba HTTP por GET y el anchor en el navegador. La captura full-page espera decodificación y compositor: la pasada demasiado rápida producía tiles vacíos en la captura, aunque las imágenes estaban cargadas y visibles al navegar. Se mantuvo el motion y se corrigió el harness.

### Optimización específica tras medir

Una medición inicial detectó que sizes genérico de la galería elegía originales de 1200px para thumbnails pequeños. Se ajustó sizes a las columnas reales y se añadió una variante intermedia de 900px al hero para densidad mobile. El catálogo sin barra flotante deja de inicializar el observer/clases de esa barra; no se cambió el motion/reveal aprobado. Los 14 derivados se regeneraron con el script reproducible.

Se preparó una copia temporal del HEAD auditado mediante git show para medir su baseline con las mismas herramientas/entorno, sin checkout destructivo ni alterar la rama. El baseline local dio performance 81/83/91, LCP 2.91/2.91/2.71s, TBT 475/391/166ms; no se comparó con métricas antiguas como si fueran el mismo entorno. Primer resultado con todo el contenido: 73/79/76, CLS 0. Baseline e inicial se conservan en `qa/final-content/baseline-performance` e `initial-performance`; la medición vigente se registra debajo.

### Estado al entregar para continuar en otra máquina

El usuario pidió guardar y hacer push del avance antes de completar el último ciclo de QA. Tests 7/7, build y DESIGN lint (0 errores/advertencias) PASS; sintaxis y búsqueda de precio viejo como valor independiente/sexto reel/secretos en frontend PASS. La ronda previa de 18 combinaciones responsive/Axe, enlaces desktop/mobile, teclado, lightbox, FAQ, reduced motion y no-JS pasó sin errores. Reels nativos reales y motion pasaron antes del último ajuste de sizes/observer. **Falta repetir browser/motion/reels y capturas sobre ese último ajuste**, por lo que esta entrega no declara finalización comercial.

Capturas antes: `qa/final-content/before/{home,rulos,productos}-{390,768,1440}.png`, altura 900. Después: `qa/final-content/after/*-full.png` y viewport. Se revisaron las tres rutas en mobile/tablet/desktop, preservando composición, tipografía y protagonismo de rulos; perfiles tienen igual jerarquía. Los frames vacíos de una captura rápida se comprobaron en viewport real y se resolvieron con decodificación previa/barrido lento; se conservó el motion. La última captura matched debe regenerarse tras sizes/observer.

Último Lighthouse: navegador limpio por ruta, mobile simulado/local, no datos de campo. /: Performance 79, Accessibility/Best Practices/SEO 100; LCP 2.71s, TBT 635ms, CLS 0.000096, 336 KiB. /rulos: 76/100/100/100, LCP 2.72s, TBT 673ms, CLS 0, 401 KiB. /productos: 83/100/100/100, LCP 1.91s, TBT 547ms, CLS 0, 180 KiB. La carga de Home pasó de 528 a 336 KiB; no se afirma Core Web Vitals PASS. TBT permanece como optimización pendiente y varió mucho entre corridas. `after/performance-summary.json` y los tres Lighthouse JSON guardan evidencia.

Pendientes: configuración externa Cal.com (40m/Cal Video frente a servicio presencial y rulos ~2h), dos retratos individuales, último ciclo de QA/performance. Producto de barba, cuidados técnicos, testimonios y packshots mejores son contenido opcional todavía no confirmado. Bios, enlace real, cortes, rulos y local ya están integrados.

Prompt de continuación completo: [CONTINUE_FINAL_CONTENT.md](CONTINUE_FINAL_CONTENT.md). Rama de entrega: `feat/final-content-booking`. Sin merge a main ni deploy comercial. La conexión HTTPS directa a GitHub agotó timeout en las comprobaciones preliminares; el resultado definitivo del push se informa en la entrega, sin afirmar que ocurrió si falló.

### Continuación y QA del último ajuste — 2026-10-12

Esta continuación parte de `ae7a8ea9308a4079414a4f66a1771b461f1b4429`, parent `684688bfd8a4b023b347ed4405a4db4fba1ca6bc`. Se ejecutaron primero status/branch/log; la rama estaba limpia. Se revisaron su diff y el de la base contra `7a18792786290b7f1a5e8953da8d58ebf84d2bd0`, se leyeron los contratos de contenido/integración y las cinco skills realmente presentes. La última instrucción del usuario autoriza expresamente push a main; reemplaza la restricción anterior de merge, sin convertir los pendientes externos en resueltos.

Se preservaron los HTML comerciales, imágenes, CSS, tokens, fuentes y JS del sitio. Sólo se actualizó un comentario de datos que todavía presentaba duración/inclusión de corte como no verificadas. El acabado aprobado sirve al público local que llega por Instagram y necesita ver trabajos reales, consultar y agendar; se conservan los diales documentados 5/6/3 y la referencia editorial existente, sin nueva dirección visual.

Se instalaron Puppeteer Core, Axe y Lighthouse en `C:/Users/User/AppData/Local/Temp/1717-final-qa`, fuera del runtime. Se usó Chrome headless y `QA_URL=http://127.0.0.1:4174` sobre dist. Todas las pruebas de navegador se ejecutaron secuencialmente; Lighthouse arrancó después de cerrar los navegadores de captura/reels/motion. No se transcribió contenido ni se creó CRM/Supabase.

Resultados reales del último ajuste, evidencia nueva en [qa/final-content/verified](qa/final-content/verified):

- `npm test`: 7/7; build PASS; DESIGN lint: cero errores/advertencias, una información de resumen. Sintaxis de módulos y JS PASS. No hay lint de código ni typecheck definidos.
- [qa.json](qa/final-content/verified/qa.json): **18 combinaciones** Home/Rulos/Productos × 375/390/430/768/1024/1440, altura 900. Sin overflow, imágenes rotas, iframes, errores de consola o hallazgos WCAG A/AA de Axe. Menú, filtros, lightbox, FAQ, enlaces interceptados desktop/mobile, reduced motion y no-JS PASS.
- [final-content.json](qa/final-content/verified/final-content.json): capturas de perfiles/equipo/local/galería a 390/768/1440. Misma jerarquía y rol Cofundador; ambas bios verificadas y retratos pendientes explícitos. Skip link, foco visible, Tab/Shift+Tab en menú/lightbox/reproductor, navegación del lightbox filtrado y todos los enlaces del menú móvil PASS. Tres rutas sin animaciones con reduced motion; cinco fichas y ausencia de observer de barra flotante en catálogo PASS.
- [native-reels.json](qa/final-content/verified/native-reels.json): cinco MP4 reproducidos realmente a 390, más primer reel a 1440 y 844×390. Cuadros reales, sonido, controles, playsinline, pausa/seek, cierre con liberación de src y retorno de foco PASS. Cero solicitudes iniciales de MP4/Instagram y cero popups.
- [scroll-entry.json](qa/final-content/verified/scroll-entry.json): ocho entradas a 390/1440, opacidad creciente con cuadros intermedios, sin parpadeo ni replay al regresar. Cambio dinámico a reduced motion y render sin JS PASS.
- [source-audit.json](qa/final-content/verified/source-audit.json): precio viejo independiente/sexto reel/TODO/secretos/tenant frontend/ratings ficticios ausentes. 71 originales presentes, 59 hashes disponibles coincidentes; cinco MP4 en dist. Fotos distintas dentro de cada recorrido. Null de retratos, cuidados, producto de barba y testimonios sigue siendo falta de material honesta.

La primera captura larga de esta continuación volvió a mostrar algunos tiles vacíos, mientras que los viewports reales mostraron imágenes y perfiles completos. Se reforzó `qa-refinement.mjs`: decodificación antes de barrido a 500px/160ms, espera de 1300ms y visita de cualquier reveal restante en viewport real durante 1100ms. Se verifica cero `.reveal-pending` antes de la captura final. No se cancelaron animaciones ni se modificó el motion para obtener screenshots. Se repitieron las 18 combinaciones con este harness y pasaron; las capturas anteriores de `after/` quedan históricas.

La emulación de viewport/touch no equivale a probar un teléfono físico. Axe y Lighthouse no certifican WCAG ni Core Web Vitals de campo. Los clics externos del QA funcional se interceptaron y no enviaron mensajes ni reservas.

**Comparación visual:** se inspeccionaron las tres rutas completas a 390/768/1440 y los viewports de perfiles/equipo/local. Los [boards Home](qa/final-content/verified/home-comparison-board.png), [Rulos](qa/final-content/verified/rulos-comparison-board.png) y [Productos](qa/final-content/verified/productos-comparison-board.png) contrastan las nueve capturas obligatorias con `before/`. Se conservan paleta, Archivo Black/Inter, orden, encuadres y composición aprobados; las diferencias de longitud vienen del contenido real integrado en la pasada anterior. Los seis tamaños probados por ruta están en los review boards. No se usó la producción histórica como referencia.

**Performance vigente:** [performance-summary.json](qa/final-content/verified/performance-summary.json) y los tres Lighthouse completos. Lighthouse 13.5.0, Chrome 154, perfiles fríos independientes por ruta, mobile simulado/local. No hubo otro navegador de QA ni transcripción concurrente.

| Ruta | Performance | A11y / Best Practices / SEO | LCP | TBT | CLS | Transferencia |
| --- | --- | --- | --- | --- | --- | --- |
| Home | 85 | 100 / 100 / 100 | 2,56 s | 379 ms | 0 | 336 KiB |
| Rulos | 85 | 100 / 100 / 100 | 2,72 s | 361 ms | 0 | 401 KiB |
| Productos | 98 | 100 / 100 / 100 | 1,89 s | 105 ms | 0 | 180 KiB |

La diferencia frente a 79/76/83 de la sesión anterior es variación entre corridas: no se cambió el JS/CSS del sitio en esta continuación. No se atribuye esa mejora a una optimización nueva. TBT se evaluó: predominan Style & Layout (921/774/602ms) frente a Script Evaluation (69/59/47ms). Lighthouse señala la lectura inicial `getBoundingClientRect()` de preparación de reveals en site.js, con reflow de 154/138/106ms. Queda una oportunidad de optimización del layout inicial, pero no se reprogramó el motion aprobado para perseguir un puntaje local. Home/Rulos todavía superan el objetivo LCP 2,5s; validar en CDN real y con datos de campo. **No se afirma Core Web Vitals PASS.**

**Enlaces externos actuales:** [external-links.json](qa/final-content/verified/external-links.json). WhatsApp/Instagram/Maps respondieron GET 200; Maps conserva búsqueda de la dirección existente. Cal.com respondió 200 a 390/1440, sin overflow, con horarios y timezone America/Asuncion. Sus [capturas mobile](qa/final-content/verified/cal-390.png) y [desktop](qa/final-content/verified/cal-1440.png) confirman que **sigue mostrando 40m y Cal Video**. Sólo se leyó el calendario; no se eligió horario, envió formulario ni modificó la cuenta.

El QA técnico solicitado quedó completado sobre el último ajuste. La publicación comercial sigue pendiente de confirmar/corregir servicio reservable, duración y atención presencial en Cal.com, y de recibir ambos retratos individuales. Producto de barba, cuidados y testimonios permanecen opcionales. El push a main está autorizado por la última instrucción; no significa que la configuración comercial externa sea correcta. No se ejecutó un despliegue manual ni se creó infraestructura nueva.

## Servicios, ajustes visuales y galería ampliada · 2026-10-12

Continuación desde `9b7f1aa`, con instrucciones posteriores del dueño que amplían la evidencia visual. Se preservan paleta, Archivo Black/Inter, orden de Home/Rulos y motion. Se aplicaron las skills locales Impeccable y Taste a composición, encuadres y comprobación; no se usó producción histórica como referencia. El pedido posterior de convertir esta página en una plataforma de gestión fue retirado por el usuario («Me confundí de prompt»); no se implementó ese cambio de producto.

**Trabajo real:** Home y Rulos enlazan una nueva página `/trabajos`, con **27 fotos y 16 videos**. Se revisaron las 26 fotos y los once clips actualmente disponibles en `img/fotos-cortes-rulos` mediante contact sheets y cuadros de video. Se agregan el derivado de un corte ya publicado y los cinco reels existentes. Los once clips adicionales se publican completos, con orientación correcta, H.264/AAC y faststart; las fotos tienen WebP/AVIF y variantes sin ampliar resolución. Dos fuentes con bordes negros se recortaron únicamente para retirarlos. Fuentes y SHA-256 en [sources.json](qa/expanded-work/sources.json), generador `scripts/build-work-assets.mjs` con herramientas externas.

La página permite categoría y formato, comienza con doce piezas y ofrece Ver más. Fotos ampliables con imagen completa, teclado y foco; un único reproductor nativo bajo interacción. Sin JavaScript se muestran las 43 piezas y se abren los medios mediante enlaces reales. No se descargan MP4 al iniciar. La secuencia destacada conserva exactamente cinco reels. Los ángulos complementarios antes excluidos por brevedad se incorporan por la nueva instrucción; se cuentan medios, no clientes ni testimonios. No se inventaron reseñas, estrellas o publicaciones de Instagram para los clips de WhatsApp.

**Correcciones solicitadas:** contenedor 1680px y gutter 3vw/48px aprovechan notebook; la galería de rulos ocupa el ancho disponible. Encuadres centrados en cabello. Qué incluye tiene columnas estables, divisores y apilado legible en mobile. Hero con el último fotograma del quinto reel, fuente nativa 720×1280 y variantes 360/600. Extracción reproducible con `scripts/extract-hero-reel.mjs`, evidencia [hero-source.json](qa/booking-services/hero-source.json). No se generan fotos artificiales ni se adjudican identidades desde ese fotograma.

**Agenda:** todos los CTA llevan a `/reservar`, siete servicios con duración confirmada: corte 40, rulos/tinte 120, barba/infantil/cejas bloque 40 y lavado 10 minutos, sin combinaciones. Hasta verificar los eventos reales, se coordina cada servicio por WhatsApp. El evento genérico de 40 minutos no sirve de fallback. `serviceBookingLink()` exige evento HTTPS Cal.com verificado, duración correcta, presencial y Round Robin; configuraciones incompatibles fallan. Rulos mantiene consulta previa aun con un evento verificado. Datos públicos sin claves ni tenant.

El dueño confirmó cobertura variable, sin horarios individuales fijos. La estructura prevista abre disponibilidades por barbero, fecha y franja: si ambos cubren y están libres para todo el intervalo, pueden recibir dos clientes simultáneos; cada reserva ocupa sólo al asignado. No existe capacidad global de dos ni disponibilidad ficticia. [BOOKING_SETUP.md](BOOKING_SETUP.md) documenta Round Robin/Maximize availability, calendarios de conflicto, excepciones, servicio por evento y pruebas antes de activar. [BARBERIA_CRM_INTEGRATION.md](BARBERIA_CRM_INTEGRATION.md) agrega mapping del host real a barbero/servicio, cobertura por fecha y reglas de sincronización futura server-side. No se construyó CRM/Supabase ni un motor de reservas en frontend.

**Límite externo:** el navegador rechazó acceso a `app.cal.com` por permiso denegado. No se eludió ese rechazo. No se cambió la cuenta, compró plan, enviaron invitaciones ni crearon reservas. Cal Video significa videollamada y sigue pendiente reemplazarlo por atención presencial; 40 minutos sí es correcto para corte. Falta configurar y verificar eventos por servicio, cobertura y barberos habilitados antes de habilitar sus URLs. Retratos individuales de ambos siguen pendientes.

### QA de la versión final ampliada

Evidencia vigente en [qa/expanded-work/after](qa/expanded-work/after). `booking-services/after` es la pasada anterior a ampliar la galería; `final-content/verified` es histórico. Herramientas externas, Chrome headless sobre dist, capturas con decodificación previa, barrido 500px/160ms y espera de compositor/reveals. Se inspeccionaron capturas reales de hero a 1366, Qué incluye a 390, resultados a 768, galería a 390/1440, reproductor de corte y las 43 piezas completas. Se preserva el motion. Un 404 al abrir una imagen sin HTML correspondía a `/favicon.ico`; se añadió el ICO de marca y se repitió la prueba sin errores.

- Tests **8/8**, build de cinco rutas, DESIGN lint cero errores/advertencias y sintaxis PASS. No hay lint de código ni typecheck definidos.
- [qa.json](qa/expanded-work/after/qa.json): **18 combinaciones** Home/Rulos/Productos × 375/390/430/768/1024/1440, altura 900; cero Axe A/AA, overflow, imágenes rotas o errores de consola. Enlaces desktop/mobile, FAQ, lightbox, filtros, no-JS y reduced motion PASS.
- [booking-services.json](qa/expanded-work/after/booking-services.json): **17 combinaciones** adicionales, incluidos Home/Rulos/Productos/Reservar a 1366/1920 y Reservar a seis anchos. Notebook usa más del 93% del viewport a 1366. Las siete duraciones/destinos son correctos; detalles nunca se superponen. Menú/foco, no-JS/reduced motion y ausencia de fallback genérico PASS.
- [expanded-work.json](qa/expanded-work/after/expanded-work.json): **8 anchos** 375/390/430/768/1024/1366/1440/1920, cero overflow/Axe/MP4 iniciales; las 43 piezas disponibles. Quince combinaciones de filtros, vacío honesto, Ver más, URL Rulos prefiltrada, lightbox de fotos filtradas, Escape/retorno de foco, los **16 videos con cuadros reales** y descarga/liberación sólo bajo interacción PASS. Sin JS todos los medios accesibles; reduced motion sin animaciones.
- [final-content.json](qa/expanded-work/after/final-content.json): perfiles/equipo/local a 390/768/1440, bios y cofundadores preservados. Skip link, foco visible, Tab/Shift+Tab en los tres diálogos y menú mobile PASS.
- [native-reels.json](qa/expanded-work/after/native-reels.json): cinco reels destacados realmente reproducidos a 390, más desktop y landscape; controles, sonido, seek, cierre/liberación/foco PASS.
- [scroll-entry.json](qa/expanded-work/after/scroll-entry.json): ocho entradas animadas a 390/1440 sin parpadeo/replay; cambio a reduced motion y render sin JS PASS.
- [source-audit.json](qa/expanded-work/after/source-audit.json): los **37 hashes** de fuentes ampliadas coinciden; 16 MP4 publicados. Sin precio viejo independiente, sexto reel destacado, TODO, secretos ni tenant público. Null de retratos/cuidados/testimonios/producto de barba son honestos.

Tres eliminaciones locales de fuentes aparecieron durante esta tarea y no pertenecen a la implementación: se preservan sin restaurar y se excluyen del commit. El collage ajeno y la grabación de pantalla no se publican. El corte cuya fuente fue eliminada conserva su derivado ya existente. El commit y push a main están autorizados; la configuración comercial externa y los retratos continúan pendientes.

**Comparación visual final:** [Home](qa/expanded-work/after/home-comparison-board.png), [Rulos](qa/expanded-work/after/rulos-comparison-board.png) y [Productos](qa/expanded-work/after/productos-comparison-board.png), contra las nueve capturas obligatorias de `final-content/before`. El antes incluye la selección de contenido de una etapa previa y no se usa para volver a imágenes repetidas o precios antiguos. Las capturas a 390/768/1440 y los review boards conservan la estructura aprobada; cambian el hero, el ancho, encuadres y contenido solicitado. [Trabajos completo](qa/expanded-work/after/trabajos-1440-full.png) tiene también tres recortes de revisión, sin modificar las fotos publicadas.

### Performance final y corrección SEO

La primera medición de esta ampliación se conserva en [performance-first](qa/expanded-work/performance-first). Detectó un enlace sin `href` en el reproductor cerrado de Rulos/Trabajos: al ampliar a clips sin publicación de Instagram se había retirado su destino inicial. Se restauró un enlace inicial a una de las cinco publicaciones reales existentes; los clips WhatsApp siguen ocultando la acción externa. Después de esta corrección se repitieron los 16 videos, controles de los cinco reels y ocho entradas de motion; todos PASS. Las capturas responsive corresponden al mismo layout/assets previo a ese arreglo invisible de enlace. No se cambiaron composición ni motion para perseguir Lighthouse.

Medición final: [performance-summary.json](qa/expanded-work/after/performance-summary.json), Lighthouse 13.5/Chrome 154, perfil frío separado por ruta, mobile simulado/local. Lighthouse se ejecutó solo después de cerrar todos los navegadores de QA, sin FFmpeg/transcripción concurrentes.

| Ruta | Performance | A11y / Best Practices / SEO | LCP | TBT | CLS | Transferencia |
| --- | --- | --- | --- | --- | --- | --- |
| Home | 85 | 100 / 100 / 100 | 2,63 s | 385 ms | 0,0012 | 334 KiB |
| Rulos | 77 | 100 / 100 / 100 | 2,68 s | 590 ms | 0 | 399 KiB |
| Productos | 96 | 100 / 100 / 100 | 1,98 s | 182 ms | 0,0001 | 184 KiB |
| Reservar | 95 | 100 / 100 / 100 | 1,81 s | 198 ms | 0 | 125 KiB |
| Trabajos | 82 | 100 / 100 / 100 | 2,68 s | 511 ms | 0 | 336 KiB |

Home varió de 66/TBT 2107ms en la primera corrida a 85/385ms en la final; no se atribuye esa diferencia al arreglo de un enlace. Predomina el trabajo de layout/render frente a evaluación de script; preparar reveals implica lecturas geométricas iniciales. Se excluyeron los títulos `sr-only` de esa medición/animación, conservando entradas, filtros y reduced motion comprobados. Los puntajes locales siguen siendo variables. Rulos/Trabajos superan 500ms de TBT y Home/Rulos/Trabajos 2,5s de LCP: hay margen de mejora y falta validar CDN/campo. **No se afirma Core Web Vitals PASS.** No se descargan videos al iniciar aunque ahora exista un archivo de trabajos más completo.
