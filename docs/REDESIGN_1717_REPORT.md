# Rediseño 17:17

## Antes: auditoría previa a implementar

2026-10-08. Repositorio completo: un index.html con CSS y JS inline y seis JPEG. Sin AGENTS.md en proyecto ni ancestros examinados; sin package.json, lockfile, dependencias de aplicación, tests, rutas secundarias, favicon, canonical, robots, sitemap o structured data. Carpeta «Nueva carpeta» vacía. .agents contiene las skills y no se modifica.

La home usa Cormorant Garamond, Barlow y Barlow Condensed, negro #080808, ocre #C49A3C y marfil #F4F0E8. Hero stock Unsplash, bloques genéricos de ventajas, siete tarjetas similares, proceso de reserva redundante, Instagram separado y reel con embed.js inmediato. Rulos Gs. 80.000 desactualizado. Navegación mobile escondida sin menú. Reveal deja el contenido invisible por defecto sin JS. FAQ sin estados aria. No lightbox ni filtros. Texto gris #888888, CTA verde con blanco y etiquetas pequeñas requieren revisión de contraste.

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

## Placeholders pendientes y material exacto para Tiago

1. **Hero:** foto reciente excelente de rulos y un corte masculino, originales sin interfaz de Instagram, autorización de publicación y fecha. Las actuales sirven provisionalmente; no prueban el nivel más reciente.
2. **Resultados:** seis originales distintos: RULOS_RESULTADO_01/02, CORTE_RESULTADO_01/02, COLOR_RESULTADO_01, DETALLE_RESULTADO_01. Faltan de inmediato rulos02, corte02 y detalle01; pedir reemplazos actuales de las tres existentes. Alt, categoría y consentimiento. Antes/después sólo pares auténticos del mismo trabajo.
3. **Reels:** cinco URLs exactas de rulos y cinco thumbnails verticales limpios. IDs REEL_RULOS_01…05_PENDIENTE; home reutiliza los primeros tres. Confirmar temática del reel DYDKRodJRS7 antes de asociarlo a rulos.
4. **Testimonios:** dos generales, dos exclusivos de rulos y un video de cada tipo. Cita literal, nombre autorizado, contexto, fuente verificable, foto/video opcionales y permiso. TESTIMONIO_REAL_01/02_PENDIENTE, TESTIMONIO_RULOS_01/02_PENDIENTE, VIDEO_TESTIMONIAL_PENDIENTE y VIDEO_TESTIMONIAL_RULOS_PENDIENTE.
5. **Fundadores:** para cada una de las dos personas: nombre confirmado, rol, especialidad, bio breve en su propia voz y retrato vertical individual. Confirmar quién es quién en la foto general. FUNDADOR_01/02_NOMBRE/BIO/FOTO_PENDIENTE. No se requieren años ni historias inventadas.
6. **Productos:** fotos limpias individuales (mínimo 1200px) de Iconic Men Cream Pomade, Hair Wax Matte Look, Polvo Texturizador, Manifesto Matte Pomade, One in a Million y producto de barba. Confirmar marca/nombre exactos, categoría, uso neutral y si se venden o sólo se usan. Precio, brillo/fijación y disponibilidad únicamente si verificables. IDs PRODUCT_PHOTO_PENDING por ficha. Confirmar cualquier recomendación para rulos antes de conectarla con cuidados.
7. **Local:** fotografías actuales de fachada, interior y estación; permiso y fecha. La existente sólo muestra una estación. Confirmar dirección y enlace del pin exacto si difiere del search publicado.
8. **Rulos:** confirmar descripción, qué incluye, tiempo estimado, condiciones, largo mínimo si aplica, tipos de cabello evaluados, duración/permanencia, cuidados, si incluye corte y las cuatro etapas propuestas. Son campos/FAQ pendientes, no instrucciones técnicas publicadas.
9. **Publicación:** dominio oficial de la web para SITE_URL, proyecto Vercel actual y validación comercial final de teléfono, horarios y siete precios. Confirmar cambios reales antes de editar.

## Estado de entrega

Implementación completa de las tres rutas y estructura comercial solicitada. Precios y contactos preservados/corregidos; evidencia real disponible; placeholders honestos reemplazables. Preview local en http://127.0.0.1:4174/. Apertura automática en el navegador del usuario fue rechazada por permiso de acceso a localhost; se entregó enlace y no se intentó una vía alternativa para abrirlo. No se realizó un deploy remoto durante el rediseño.

La preparación técnica está terminada. La evidencia reciente, identidades, testimonios, catálogo definitivo y respuestas de rulos siguen pendientes del cliente. No se consideran contenido validado ni se ocultan como si estuvieran completos.
