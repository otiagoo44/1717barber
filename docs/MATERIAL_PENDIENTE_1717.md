# Material que falta pedir a 17:17

Ya recibimos los cinco enlaces de reels, sus portadas reales, el logo oficial y los nombres de Jonatan y Esteban. Un fotograma original del cuarto reel completa provisionalmente el segundo resultado de rulos. Está confirmado que son hermanos y ambos cofundadores. No hace falta enviar eso otra vez.

## Mensaje para compartir

Para completar la web necesitamos:

1. **Fotos actuales de trabajos:** dos resultados excelentes para la portada —rulos y corte— y seis fotos distintas para la galería: dos de rulos, dos de cortes, una de color y un detalle. Mandar archivos originales, sin interfaz de Instagram, idealmente verticales de 1200px o más. Confirmar permiso de publicación. Si hay antes/después, que sean del mismo trabajo real.
2. **Jonatan y Esteban:** un retrato individual de cada uno, con el mismo encuadre y calidad; especialidad de cada uno y una bio de dos o tres frases en su propia voz. La foto conjunta existente ya se usa; una versión reciente con ambos estaría mejor. Los dos aparecen como cofundadores, con igual espacio.
3. **Testimonios reales:** dos de la barbería en general y dos específicamente de rulos. Texto literal, nombre que se puede publicar y fuente o captura para verificar. Foto o video opcional y permiso del cliente. Si tienen, un video testimonial general y uno de rulos.
4. **Productos:** una foto limpia por producto, marca y nombre exactos, uso confirmado y si se vende o solamente se utiliza. Estamos preparando Iconic Men Cream Pomade, Hair Wax Matte Look, Polvo Texturizador, Manifesto Matte Pomade, One in a Million y el producto de barba. El último necesita nombre/presentación exactos. Precio solamente si quieren publicarlo; disponibilidad sigue siendo «Consultar». Confirmar cuáles recomiendan para rulos y cómo, sin asumir que son obligatorios.
5. **Servicio de rulos:** confirmar qué incluye Gs. 180.000, si incluye corte, tiempo estimado, condiciones, largo necesario, qué cabellos deben evaluarse, duración orientativa y cuidados posteriores. Confirmar también las etapas consulta/referencia → evaluación → proceso → resultado y cuidado. Hasta recibir esas respuestas, la web muestra pendientes.
6. **Local:** fotos actuales de fachada, interior y puestos de trabajo. Pin exacto de Google Maps si el enlace actual no lleva correctamente. Confirmar dirección, lunes a sábado 8:00–21:00 y WhatsApp 0983 402 497.
7. **Marca y publicación:** logo en SVG o PNG de buena resolución; el recibido es un JPG de 150×150px y ya está integrado con forma circular. Dominio oficial de la web para canonical/sitemap. Opcional: los cinco videos originales o portadas verticales elegidas para mejorar calidad o reproducirlos dentro del sitio más adelante; sus enlaces ya funcionan.

No necesitamos números de clientes, años de experiencia, estrellas ni claims inventados. Mejor pocos archivos buenos y datos confirmados.

## Reemplazo en la web

El contenido se centraliza en `src/data.mjs`: `media`, `founders`, `testimonials`, `rulosTestimonials`, `products`, `rulosDetails`, `rulosProcess` y FAQ. Los campos `null` son pendientes. Las fotos individuales se reemplazan en `founders[].image`; completar ambos perfiles juntos ayuda a mantener su igualdad visual. Ejecutar `npm run build` después de actualizar.
