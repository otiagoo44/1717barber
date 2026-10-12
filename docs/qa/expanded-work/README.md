# QA · galería ampliada y agenda por servicio

2026-10-12, continuación desde `9b7f1aa`. La última instrucción de plataforma de gestión fue retirada por el usuario; esta entrega corresponde a 17:17 Barbería.

- `sources.json`: 37 fuentes disponibles, hashes y derivados reproducibles; 26 fotos y once clips locales. `/trabajos` suma un corte ya publicado y cinco reels: 27 fotos/16 videos.
- `after/`: evidencia vigente. Ocho anchos de Trabajos, 18 casos de las tres rutas existentes y 17 de agenda/notebook; Axe cero, sin overflow/consola. Se reprodujeron realmente los 16 videos, y se comprobaron filtros, Ver más, foco, diálogos, no-JS y reduced motion.
- `performance-first/`: primera medición local, incluida la regresión de SEO por un enlace sin href en el reproductor cerrado. Se corrigió con una publicación real existente y se repitieron las pruebas afectadas, los 16 videos y ocho entradas de motion.
- Las capturas de composición preceden a ese arreglo invisible del enlace y muestran el mismo CSS/contenido/imagenes finales. La repetición de interacciones reutilizó esas ocho capturas mediante `QA_INTERACTIONS_ONLY=1`; no se reutilizó una prueba de reproducción antigua.
- Lighthouse final aislado, cinco perfiles fríos: 85/77/96/95/82; accesibilidad/buenas prácticas/SEO 100. LCP/TBT variables y margen de mejora; no son Core Web Vitals de campo.

Las herramientas están fuera del runtime: Puppeteer Core, Axe y Lighthouse en un directorio de QA, Sharp en otro directorio externo, FFmpeg/FFprobe instalados en el entorno. README de raíz documenta comandos, `QA_TOOLS_DIR`, `CHROME_PATH`, `QA_URL` y `QA_OUT`. Ejecutar los scripts secuencialmente, Lighthouse/motion solos. No cancelar motion para capturar: decodificar, barrer 500px/160ms, esperar compositor y visitar reveals restantes.

`source-audit.json`: los 37 hashes coinciden, 16 MP4 publicados, precio viejo independiente/sexto reel destacado/secretos/tenant/TODO ausentes. Tres fuentes eliminadas localmente se preservan sin restaurar y se excluyen del commit. Los placeholders de retratos y los null opcionales de cuidados, testimonios y producto de barba son honestos.

No se enviaron mensajes ni crearon reservas. El acceso a `app.cal.com` fue rechazado por permiso del navegador; no se eludió. La cuenta externa, eventos por duración, presencial y cobertura por fecha siguen pendientes. Hasta verificarlos, `/reservar` coordina por WhatsApp. No se creó CRM ni Supabase. Ver el bloque final de [REDESIGN_1717_REPORT.md](../../REDESIGN_1717_REPORT.md) para valores, decisiones y límites.
