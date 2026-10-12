import { business, media, results, services, products, founders, testimonials, rulosReels } from "./data.mjs";
import { workAssets } from "./work-assets.mjs";
import { escape as e, price, rulosPrice, whatsappLink } from "./utils.mjs";
import { image, wa, booking, link, arrow } from "./components.mjs";

export function hero(rulos = false) {
  return `<section class="hero wrap ${rulos ? "rulos-hero" : ""}" id="inicio">
    <div class="hero-copy"><p class="eyebrow">17:17 BARBERÍA · LUQUE</p>
    <h1>${rulos ? '<span class="hero-line">Rulos con</span> <span class="hero-line hero-accent">tu estilo.</span>' : '<span class="hero-line">Tu próximo</span> <span class="hero-line">look empieza</span> <span class="hero-line hero-accent">acá.</span>'}</h1>
    <p class="hero-description">${rulos ? "Rulos permanentes. Mirá nuestros trabajos y consultá por el resultado que tenés en mente." : "Rulos permanentes, cortes y color.<br>Encontrá tu estilo en 17:17."}</p>
    ${rulos ? `<div class="hero-price"><span>Rulos permanentes</span><strong>${rulosPrice()}</strong><span>Corte por separado · Aproximadamente 2 horas</span></div>` : ""}
    <div class="actions">${booking("Reservar turno")}${rulos ? wa("Consultar por rulos", "RULOS", "rulos", null, "outline") : link("Conocer Rulos 17:17", "/rulos")}</div>
    <p class="hero-hours">Luque · Lun–Sáb · 8:00–21:00</p></div>
    <figure class="hero-visual"><div class="image-crop">${image(rulos ? "rulosHero" : "hero", {eager: true, sizes: "(max-width: 700px) 90vw, 46vw"})}</div><figcaption><span>${rulos ? "Rulos 17:17" : "Cortes 17:17"}</span><span>Trabajo real</span></figcaption></figure>
  </section>`;
}

export function featuredRulos() {
  return `<section class="featured-rulos" id="rulos"><div class="wrap feature-layout">
    <figure class="feature-photo"><div class="image-crop">${image("rulosFeatured")}</div><figcaption>El proceso de rulos en 17:17.</figcaption></figure>
    <div class="feature-copy"><p class="eyebrow">NUESTRO DESTACADO</p><h2>Rulos.<br>Otra forma de llevar tu look.</h2><p>La textura es la protagonista. Mirá los resultados y consultá por tus rulos.</p><div class="feature-price"><span>Rulos permanentes</span><strong>${rulosPrice()}</strong><span>Corte por separado · Aprox. 2 horas</span></div><div class="actions">${wa("Consultar por rulos", "RULOS", "rulos")}${link("Ver resultados y videos", "/rulos")}</div></div>
  </div></section>`;
}

export function servicesSection() {
  return `<section class="section wrap services-section" id="servicios"><div class="section-intro"><p class="eyebrow">SERVICIOS Y PRECIOS</p><h2>Un buen corte.<br>Y mucho más.</h2><p>Elegí el servicio para coordinar tu turno. Para detalles, consultanos por WhatsApp.</p></div><div class="services-list">${booking("Elegir horario", "service-booking")}${services.filter(s => !s.complementary).map(s => `<a class="service-row ${s.featured ? "service-featured" : ""}" href="${e(whatsappLink({intent: s.intent, service: s.id}))}" target="_blank" rel="noopener noreferrer" data-cta="servicio" data-intent="${s.intent}" data-service="${s.id}"><span class="service-name">${e(s.name)}${s.featured ? "<small>Destacado</small>" : ""}</span><strong>${price(s.price)}</strong>${arrow}<span class="sr-only">Consultar por WhatsApp</span></a>`).join("")}<h3 class="list-label">Para completar</h3><div class="complementary-services">${services.filter(s => s.complementary).map(s => `<a href="${e(whatsappLink({intent:s.intent,service:s.id}))}" target="_blank" rel="noopener noreferrer" data-cta="servicio" data-intent="${s.intent}" data-service="${s.id}"><span>${e(s.name)}</span><strong>${price(s.price)}</strong><span class="sr-only">Consultar por WhatsApp</span></a>`).join("")}</div></div></section>`;
}

export function resultTile(item, index, rulos = false) {
  const m = media[item.media];
  const sizes = `(max-width: 700px) calc((100vw - 56px) / 2), (max-width: 899px) calc((94vw - 20px) / 2), ${rulos ? "(max-width: 1600px) calc((94vw - 24px) / 2), 828px" : "(max-width: 1600px) 22vw, 402px"}`;
  return `<figure class="result-tile${item.featured && !rulos ? " result-featured" : ""}" data-category="${e(item.category)}" data-result-index="${index}"><button class="photo-trigger" data-photo-src="${e(m.src)}" data-photo-alt="${e(m.alt)}" data-photo-title="${e(item.title)}" data-photo-position="${e(m.position || "center")}" data-photo-crop="none" aria-label="Ampliar: ${e(item.title)}">${image(m,{sizes: item.featured && !rulos ? "(max-width: 700px) 90vw, (max-width: 899px) 43vw, 46vw" : sizes})}<span class="photo-open" aria-hidden="true">↗</span></button><figcaption><span>${e(item.title)}</span><small>${e(item.category)}</small></figcaption></figure>`;
}

export function gallery({rulos = false} = {}) {
  const items = results.filter(r => media[r.media].src && (!rulos || r.category === "Rulos"));
  return `<section class="section wrap portfolio" id="${rulos ? "resultados-rulos" : "galeria"}"><div class="section-heading"><div><p class="eyebrow">TRABAJO REAL</p><h2>${rulos ? "La textura, de cerca." : "Hecho en 17:17."}</h2></div>${link("Más trabajos en Instagram", business.instagram)}</div>${rulos ? "" : `<div class="filters" role="group" aria-label="Filtrar resultados">${["Todos","Rulos","Cortes","Color"].map((c,i) => `<button data-gallery-filter="${c}" aria-pressed="${i === 0}">${c}</button>`).join("")}</div><p class="sr-only" data-gallery-status aria-live="polite">${items.length} resultados</p>`}<div class="portfolio-grid ${rulos ? "rulos-results" : ""}">${items.map((item, index) => resultTile(item, index, rulos)).join("")}</div><div class="gallery-more">${link("Ver más cortes y rulos",rulos ? "/trabajos?categoria=Rulos" : "/trabajos","button outline")}</div></section>`;
}

export function reels(items = rulosReels) {
  return `<div class="reel-sequence" data-reel-sequence><div class="reel-toolbar"><p>Deslizá para ver los cinco videos.</p><div class="reel-controls"><span class="reel-position" aria-live="polite">01 / ${String(items.length).padStart(2,"0")}</span><button data-reel-prev aria-label="Reel anterior">←</button><button data-reel-next aria-label="Reel siguiente">→</button></div></div><div class="reel-grid" tabindex="0" role="region" aria-label="Videos de rulos; usá flechas o deslizá">${items.map((r,i) => `<figure class="reel-item" data-reel-index="${i}"><a class="reel-facade" href="${e(r.video)}" data-reel-source="${e(r.url)}" aria-label="Reproducir ${e(r.title)}"><img src="${e(r.thumbnail)}" alt="${e(r.thumbnailAlt)}" width="480" height="853" loading="lazy"><span class="reel-play" aria-hidden="true">▷</span></a><figcaption>Reproducir video<span aria-hidden="true">▷</span></figcaption></figure>`).join("")}</div><div class="reel-progress" aria-hidden="true"><i></i></div></div>`;
}
export function workGallery() {
  const photos = workAssets.filter(w=>w.type==='photo');
  const videos = [...workAssets.filter(w=>w.type==='video'), ...rulosReels.map(r => ({id:r.id,type:'video',category:'Rulos',title:r.title,image:r.thumbnail,video:r.video,sourceUrl:r.url,width:480,height:853}))];
  const items = Array.from({length:Math.max(photos.length,videos.length)},(_,i)=>[videos[i],photos[i]].filter(Boolean)).flat();
  return `<section class="section wrap portfolio work-portfolio" id="trabajos"><h2 class="sr-only">Resultados y proceso</h2><div class="filters" role="group" aria-label="Filtrar trabajos por servicio">${['Todos','Cortes','Rulos','Color','Proceso'].map((value,i)=>`<button data-work-category="${value}" aria-pressed="${i===0}">${value}</button>`).join('')}</div><div class="filters work-formats" role="group" aria-label="Filtrar formato">${[['Todos','Fotos y videos'],['photo','Fotos'],['video','Videos']].map(([value,label],i)=>`<button data-work-format="${value}" aria-pressed="${i===0}">${label}</button>`).join('')}</div><p class="work-status" data-work-status aria-live="polite">${items.length} fotos y videos</p><div class="portfolio-grid work-grid">${items.map(item => {
    const picture=image({src:item.image,avif:item.avif,variants:item.variants,width:item.width,height:item.height,alt:item.title+' · trabajo de 17:17',position:item.position},{sizes:'(max-width: 700px) calc((100vw - 56px) / 2), (max-width: 899px) 43vw, (max-width: 1600px) 22vw, 402px'});
    const duration=item.durationSeconds?`${Math.floor(item.durationSeconds/60)}:${String(Math.floor(item.durationSeconds%60)).padStart(2,'0')}`:'';
    return `<figure class="result-tile work-card" data-category="${item.category}" data-work-type="${item.type}" data-work-id="${item.id}">${item.type==='photo'?`<a class="photo-trigger" href="${e(item.image)}" data-photo-src="${e(item.image)}" data-photo-alt="${e(item.title)}" data-photo-title="${e(item.title)}" data-photo-position="${e(item.position||'center')}" data-photo-crop="none" aria-label="Ampliar: ${e(item.title)}">${picture}<span class="photo-open" aria-hidden="true">↗</span></a>`:`<a class="reel-facade" href="${e(item.video)}" data-reel-source="${e(item.sourceUrl||'')}" data-video-category="${e(item.category)}" aria-label="Reproducir ${e(item.title)}">${picture}<span class="reel-play" aria-hidden="true">▷</span></a>`}<figcaption><span>${e(item.title)}</span><small>${item.category} · ${item.type==='photo'?'Foto':'Video'+(duration?' · '+duration:'')}</small></figcaption></figure>`;
  }).join('')}</div><p data-work-empty hidden>No hay trabajos para estos filtros. Probá con otra categoría o formato.</p><div class="gallery-more"><button class="button outline" data-work-more hidden>Ver más trabajos</button></div><noscript><p>Estás viendo todas las fotos y videos. Abrí las fotos para ampliarlas y los videos para reproducirlos.</p></noscript></section>`;
}

export function socialProof(items = testimonials) {
  const published = items.filter(t => t.quote && t.name && t.source);
  if (!published.length) return "";
  return `<section class="section wrap social-proof"><h2>En primera persona.</h2><div class="testimonial-list">${published.map(t => `<figure><blockquote>${e(t.quote)}</blockquote><figcaption>${e(t.name)}</figcaption>${link("Ver fuente",t.source)}</figure>`).join("")}</div></section>`;
}

export function team() {
  return `<section class="section wrap team-section" id="nosotros"><figure class="team-photo"><div class="image-crop">${image("team")}</div><figcaption>17:17, una barbería fundada entre hermanos.</figcaption></figure><div class="team-copy"><p class="eyebrow">DETRÁS DE 17:17</p><h2>Dos hermanos.<br>Una barbería.</h2><p>Jonatan y Esteban, los cofundadores de 17:17 en Luque.</p><div class="founder-names">${founders.map(f => `<div class="founder-profile"><h3>${e(f.name)}</h3><span>${e(f.role)}</span>${f.image ? `<div class="founder-portrait">${image(f.image)}</div>` : `<p class="founder-pending">Retrato pendiente.</p>`}${f.bio ? `<div class="founder-story">${f.headline ? `<h4>${e(f.headline)}</h4>` : ""}<p>${e(f.bio)}</p></div>` : `<p class="founder-pending">Presentación pendiente.</p>`}</div>`).join("")}</div>${link("Conocé más en Instagram",business.instagram)}</div></section>`;
}

export function productCard(p) {
  if (!p.image || !p.verified) return "";
  return `<article class="product-item" data-product-category="${e(p.category)}">${image({src:p.image,avif:p.image.replace(".webp",".avif"),width:600,height:600,alt:`${p.brand} ${p.name}, imagen del producto recibido`},{classes:"product-photo",sizes:"(max-width: 700px) 90vw, 30vw"})}<div class="product-info"><p class="eyebrow">${e(p.brand)}</p><h3>${e(p.name)}</h3><p>${e(p.summary)}</p>${p.price !== null ? `<p>${price(p.price)}</p>` : ""}<p>Disponibilidad: ${e(p.availability)}</p>${wa("Consultar producto","PRODUCTO","",p,"outline")}</div></article>`;
}

export function featuredProducts() {
  const selected = products.filter(p => p.image && p.verified && ["iconic", "matte", "polvo"].includes(p.id));
  return `<section class="wrap product-showcase" id="productos"><div class="product-teaser"><div><p class="eyebrow">STYLING Y CUIDADO</p><h2>El look sigue en casa.</h2><p>Consultá por los productos que usamos para terminar el look.</p></div>${link("Ver todos los productos","/productos","button outline")}</div><div class="product-grid">${selected.map(productCard).join("")}</div></section>`;
}

export function location() {
  return `<section class="section wrap location-section" id="ubicacion"><div class="location-copy"><p class="eyebrow">TE ESPERAMOS EN LUQUE</p><h2>Acá está 17:17.</h2><address>${e(business.address)}<br>${e(business.city)}</address><dl><div><dt>Horario</dt><dd>Lunes–Sábado<br>8:00–21:00</dd></div><div><dt>WhatsApp</dt><dd>${link(business.phone,whatsappLink())}</dd></div></dl><div class="actions">${link("Cómo llegar",business.maps,"button outline")}${booking("Agendar")}</div></div><div class="location-photos"><figure class="location-photo"><div class="image-crop">${image("local")}</div><figcaption>La entrada de 17:17 en Luque.</figcaption></figure><div class="location-details">${[["localInterior","Interior de la barbería"],["localStation","Puesto de trabajo"]].map(([key,label])=>`<figure class="location-photo"><div class="image-crop">${image(key,{sizes:"(max-width: 700px) 42vw, 22vw"})}</div><figcaption>${label}</figcaption></figure>`).join("")}</div></div></section>`;
}
