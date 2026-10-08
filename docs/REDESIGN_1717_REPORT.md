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

Trabajo sobre `feat/redesign-1717`, conservando el commit previo y la base funcional. `main` permanece en `c08044f3800f0203097596f548fc152377e81d13`; no merge. Preview local: http://127.0.0.1:4174/. No se ejecutó deploy remoto manual. La publicación comercial definitiva todavía requiere completar/confirmar el material listado y el dominio oficial; los pendientes visibles son honestos y reemplazables desde datos centrales.
