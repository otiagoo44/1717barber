# 17:17 Barbería

HTML, CSS y JavaScript nativos. Cinco páginas estáticas, sin dependencias de runtime y sin backend.

```powershell
npm run dev
```

Vista local: http://127.0.0.1:4174. `npm run build` genera `dist/`, `index.html`, `rulos/index.html`, `productos/index.html`, `reservar/index.html` y `trabajos/index.html`. `npm test` verifica contratos comerciales, WhatsApp, SEO, assets y routing de servicios. Los HTML son generados: editar `src/`, no los HTML a mano.

## Editar contenido

Los cinco reels reales usan portadas locales y MP4 en `public/assets/videos`. Un reproductor HTML nativo se monta dentro de la página al tocar la portada: reproduce sin audio, con controles y `playsinline`, sin iframe ni login de Instagram. Al cerrar se pausa el video, se libera su fuente y se devuelve el foco. No se descarga video durante la carga inicial. Cada publicación original conserva un enlace opcional. Fuentes, hashes y metadatos: `docs/qa/reels-motion-fix/video-sources.json`. Prueba real de reproducción: `scripts/qa-reels-native.mjs`; prueba cuadro a cuadro contra parpadeos: `scripts/qa-scroll-entry.mjs`.

`src/data.mjs` conserva el contenido editorial y los precios confirmados durante la puesta en marcha. El catálogo operativo viene de Barbería OS: `17:17 → /reservar → booking público del CRM → PostgreSQL/Supabase`. El build sincroniza servicios por `website_category` y utiliza sus slugs canónicos, precios y duraciones; no compara nombres visibles. Rulos exige consulta por WhatsApp antes de reservar desde recepción. Productos conservan WhatsApp. [Configuración de agenda](docs/BOOKING_SETUP.md) y [contrato real del CRM](docs/BARBERIA_CRM_INTEGRATION.md). No incluir UUID internos ni secretos. Después de editar o cambiar el catálogo, ejecutar `npm run build`.

- Medios: completar `src`, `alt`, `width`, `height`, `position`; WebP y AVIF en `public/assets/media/`. Generar variantes `-600` sólo si el original supera 600px. Los originales siguen en `img/` y no van al build. Selección y clasificación: [CONTENT_ASSETS.md](docs/CONTENT_ASSETS.md).
- Productos: completar `image`, `price`, `shine`, `hold` sólo con información verificada; `availability` empieza en «Consultar».
- Fundadores: Jonatan y Esteban, hermanos y cofundadores, con presentaciones breves verificadas desde sus videos ([evidencia](docs/FOUNDER_CONTENT.md)). Completar sólo los retratos `image` con igual encuadre/tratamiento; especialidades siguen sin afirmar. La foto general del equipo no asigna identidades individuales.
- Testimonios: se publican sólo al completar `quote`, `name`, `source`. `image`, `context`, `video` son opcionales. No insertar ratings inventados.
- Videos testimoniales: `testimonialVideo` y `rulosTestimonialVideo` son fuentes separadas. Completar `url` y `thumbnail` para abrir la experiencia real sin cargar un embed; el video general no se reutiliza como prueba de rulos.
- Reels: exactamente cinco videos locales bajo interacción, con enlace opcional a Instagram; no se cargan al inicio. No agregar los videos recibidos automáticamente como nuevos reels.
- Trabajos: por nueva instrucción del dueño, `/trabajos` reúne todo el material de cortes/rulos disponible y apto: 24 fotos y 16 videos, con filtros y Ver más. Los once clips locales adicionales se publican en esta galería, manteniendo intacta la secuencia de cinco reels destacados. No inventar reseñas ni número de clientes. `src/work-assets.mjs` y `docs/qa/expanded-work/sources.json` registran fuentes/hashes. `scripts/build-work-assets.mjs` genera WebP/AVIF y H.264 sin audio con faststart usando Sharp/FFmpeg externos; no se ejecuta durante deploy. Los originales permanecen fuera de dist.
- Rulos: Gs. 180.000, corte separado, aproximadamente 2 horas, largo y condiciones por consulta individual. Cuidados/proceso técnico siguen sin publicar hasta confirmación.

## Diseño y SEO

`DESIGN.md` es la autoridad. `public/assets/tokens.css` proviene del export de Google DESIGN.md 0.4.0, con `@theme` convertido a `:root` para CSS nativo. No hay Tailwind instalado. La CLI está en la skill local y sólo se usa para mantenimiento, no durante el deploy.

`business.siteUrl` conserva `https://1717barber.vercel.app` como canonical actual. `SITE_URL` permite cambiarlo al dominio definitivo; el build también puede usar `VERCEL_PROJECT_PRODUCTION_URL` si no existe configuración editorial. Con URL se generan canonical, Open Graph absoluto y sitemap. `robots.txt` y HairSalon structured data se preservan. `vercel.json` configura build estático y rutas, sin SPA rewrites.

## QA de navegador

Las herramientas de QA no están en el bundle. Instalar `puppeteer-core`, `@axe-core/puppeteer` y `lighthouse` en un directorio de herramientas independiente, definir `QA_TOOLS_DIR` y `CHROME_PATH`, iniciar `npm run dev` y ejecutar:

```powershell
$env:QA_TOOLS_DIR='C:/ruta/herramientas-qa'
$env:CHROME_PATH='C:/Program Files/Google/Chrome/Application/chrome.exe'
$env:QA_URL='http://127.0.0.1:4174'
$env:QA_OUT='docs/qa/expanded-work/after'
node scripts/qa-refinement.mjs
node scripts/qa-final-content.mjs
node scripts/qa-booking-services.mjs
node scripts/qa-expanded-work.mjs
node scripts/qa-reels-native.mjs
node scripts/qa-scroll-entry.mjs
$env:QA_ROUTES='/,/rulos,/productos,/reservar,/trabajos'
node scripts/qa-performance.mjs
node scripts/qa-external-links.mjs
```

Evidencia de la continuación: `docs/qa/final-content/verified/`, con capturas de las tres rutas a 375/390/430/768/1024/1440 y viewports reales de perfiles, equipo, galería y local. `before/` y `after/` conservan la evidencia histórica. El harness decodifica imágenes, barre a 500px/160ms y visita cualquier reveal restante antes de capturar, sin cancelar el motion. `qa-final-content.mjs` añade teclado/foco en los tres diálogos y enlaces del menú móvil; `qa-external-links.mjs` sólo realiza GET e inspección de destinos públicos, sin enviar mensajes ni reservas. `QA_OUT` y `QA_URL` permiten cambiar destinos. Informe: `docs/REDESIGN_1717_REPORT.md`. Fuentes actuales: Archivo Black + Inter locales, sin cambios de paleta/tokens.

Lista para compartir al cliente: `docs/MATERIAL_PENDIENTE_1717.md`. Ejecutar cada script secuencialmente y Lighthouse solo, sin capturas u otras tareas de navegador simultáneas para evitar sesgo por carga de CPU. La configuración de 17:17 ya existe según el handoff del CRM del 26/10. El catálogo público sigue cerrado; completar los gates de activación antes de desplegar reservas. Ver [informe actual](docs/CRM_INTEGRATION_20261027.md). Los retratos siguen pendientes.

La evidencia vigente de servicios, ajustes visuales y galería ampliada está en `docs/qa/expanded-work/after/`. `docs/qa/booking-services/` conserva el antes y la pasada previa a ampliar la galería; `final-content/verified/` corresponde a la entrega anterior. `qa-booking-services.mjs` comprueba duraciones, destinos y composición a 1366/1920; `qa-expanded-work.mjs` comprueba los 40 medios, ocho anchos, filtros, lightbox, reproducción real de los 16 videos, reduced motion y navegación sin JavaScript. El favicon ICO de raíz evita un 404 al abrir fotos/videos directamente sin HTML.

## Reservas y variables públicas

Origen verificado: `https://barberia-crm-kappa.vercel.app`. Vercel tiene `BARBERIA_OS_PUBLIC_URL`, `BARBERIA_OS_ORGANIZATION_SLUG=1717-barberia` y `BARBERIA_OS_BRANCH_SLUG=luque`, sin overrides por rama. El catálogo público devuelve 404 JSON al 27/10; cualquier nuevo build con estas variables queda bloqueado hasta la activación del CRM. El deployment anterior mantiene WhatsApp. `SITE_URL=https://1717barber.vercel.app` conserva el canonical comprobado. No requiere ninguna variable secreta. Ver [.env.example](.env.example).

Sin ambos slugs, la consulta por WhatsApp sigue operativa. Con slugs configurados, un catálogo inexistente/incompatible hace fallar el build: no se publica una agenda ficticia. Rulos, Combo y Tintes conservan consulta previa. Sus variantes, nombres, precios y duraciones sólo se publican desde el catálogo válido; Rulos y Combo pueden compartir categoría sin reemplazarse. Cada cambio del catálogo requiere build y deployment nuevos. `source=website` es atribución informativa validada por el CRM, nunca autoridad de tenant, precio, duración o permisos.

CSP restringe scripts/medios a recursos locales, bloquea iframes y preserva los enlaces externos. HSTS se aplica a HTTPS en el host de producción actual; actualizar esa condición cuando cambie el dominio. [Auditoría y pendientes](docs/BOOKING_AUDIT.md).

Verificación de integración: `node scripts/verify-dist.mjs` revisa secretos/rutas/SEO/cabeceras. `scripts/qa-native-booking.mjs` prueba las cinco rutas en móvil/escritorio con CSP, Axe y sin errores de consola. Evidencia y límites: [docs/qa/native-booking](docs/qa/native-booking).
