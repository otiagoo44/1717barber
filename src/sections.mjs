import { business, media, results, services, products, founders, testimonials, rulosReels } from "./data.mjs";
import { escape as e, price, rulosPrice, whatsappLink } from "./utils.mjs";
import { image, wa, link, arrow } from "./components.mjs";

export function hero(rulos = false) {
  return `<section class="hero wrap ${rulos ? "rulos-hero" : ""}" id="inicio">
    <div class="hero-copy"><p class="eyebrow">17:17 BARBERÍA · LUQUE</p>
    <h1>${rulos ? '<span class="hero-line">Rulos con</span> <span class="hero-line hero-accent">tu estilo.</span>' : '<span class="hero-line">Tu próximo</span> <span class="hero-line">look empieza</span> <span class="hero-line hero-accent">acá.</span>'}</h1>
    <p class="hero-description">${rulos ? "Rulos permanentes. Mirá nuestros trabajos y consultá por el resultado que tenés en mente." : "Rulos permanentes, cortes y color.<br>Encontrá tu estilo en 17:17."}</p>
    ${rulos ? `<div class="hero-price"><span>Rulos permanentes</span><strong>${rulosPrice()}</strong></div>` : ""}
    <div class="actions">${wa(rulos ? "Consultar por rulos" : "Reservar por WhatsApp", rulos ? "RULOS" : "GENERAL", rulos ? "rulos" : "")}${rulos ? link("Ver los videos", "#reels-rulos") : link("Conocer Rulos 17:17", "/rulos")}</div>
    <p class="hero-hours">Luque · Lun–Sáb · 8:00–21:00</p></div>
    <figure class="hero-visual"><div class="image-crop">${image(rulos ? "rulos2" : "hero", {eager: true, sizes: "(max-width: 700px) 90vw, 46vw"})}</div><figcaption><span>Rulos 17:17</span><span>Trabajo real</span></figcaption></figure>
  </section>`;
}

export function featuredRulos() {
  return `<section class="featured-rulos" id="rulos"><div class="wrap feature-layout">
    <figure class="feature-photo"><div class="image-crop">${image("rulos2")}</div><figcaption>Resultado de un trabajo publicado por 17:17.</figcaption></figure>
    <div class="feature-copy"><p class="eyebrow">NUESTRO DESTACADO</p><h2>Rulos.<br>Otra forma de llevar tu look.</h2><p>La textura es la protagonista. Mirá los resultados y consultá por tus rulos.</p><div class="feature-price"><span>Rulos permanentes</span><strong>${rulosPrice()}</strong></div><div class="actions">${wa("Consultar por rulos", "RULOS", "rulos")}${link("Ver resultados y videos", "/rulos")}</div></div>
  </div></section>`;
}

export function servicesSection() {
  return `<section class="section wrap services-section" id="servicios"><div class="section-intro"><p class="eyebrow">SERVICIOS Y PRECIOS</p><h2>Un buen corte.<br>Y mucho más.</h2><p>Elegí el servicio y consultá un horario por WhatsApp.</p></div><div class="services-list">${services.filter(s => !s.complementary).map(s => `<a class="service-row ${s.featured ? "service-featured" : ""}" href="${e(whatsappLink({intent: s.intent, service: s.id}))}" target="_blank" rel="noopener noreferrer" data-cta="servicio" data-intent="${s.intent}" data-service="${s.id}"><span class="service-name">${e(s.name)}${s.featured ? "<small>Destacado</small>" : ""}</span><strong>${price(s.price)}</strong>${arrow}<span class="sr-only">Consultar por WhatsApp</span></a>`).join("")}<h3 class="list-label">Para completar</h3><div class="complementary-services">${services.filter(s => s.complementary).map(s => `<a href="${e(whatsappLink({intent:s.intent,service:s.id}))}" target="_blank" rel="noopener noreferrer" data-cta="servicio" data-intent="${s.intent}" data-service="${s.id}"><span>${e(s.name)}</span><strong>${price(s.price)}</strong><span class="sr-only">Consultar por WhatsApp</span></a>`).join("")}</div></div></section>`;
}

export function resultTile(item, index) {
  const m = media[item.media];
  return `<figure class="result-tile" data-category="${e(item.category)}" data-result-index="${index}"><button class="photo-trigger" data-photo-src="${e(m.src)}" data-photo-alt="${e(m.alt)}" data-photo-title="${e(item.title)}" data-photo-position="${e(m.position || "center")}" data-photo-crop="${item.media === "rulos2" ? "frame" : "none"}" aria-label="Ampliar: ${e(item.title)}">${image(m)}<span class="photo-open" aria-hidden="true">↗</span></button><figcaption><span>${e(item.title)}</span><small>${e(item.category)}</small></figcaption></figure>`;
}

export function gallery({rulos = false} = {}) {
  const items = results.filter(r => media[r.media].src && (!rulos || r.category === "Rulos"));
  return `<section class="section wrap portfolio" id="${rulos ? "resultados-rulos" : "galeria"}"><div class="section-heading"><div><p class="eyebrow">TRABAJO REAL</p><h2>${rulos ? "La textura, de cerca." : "Hecho en 17:17."}</h2></div>${link("Más trabajos en Instagram", business.instagram)}</div>${rulos ? "" : `<div class="filters" role="group" aria-label="Filtrar resultados">${["Todos","Rulos","Cortes","Color"].map((c,i) => `<button data-gallery-filter="${c}" aria-pressed="${i === 0}">${c}</button>`).join("")}</div><p class="sr-only" data-gallery-status aria-live="polite">${items.length} resultados</p>`}<div class="portfolio-grid ${rulos ? "rulos-results" : ""}">${items.map(resultTile).join("")}</div></section>`;
}

export function reels(items = rulosReels) {
  return `<div class="reel-sequence" data-reel-sequence><div class="reel-toolbar"><p>Deslizá para ver los cinco videos.</p><div class="reel-controls"><span class="reel-position" aria-live="polite">01 / ${String(items.length).padStart(2,"0")}</span><button data-reel-prev aria-label="Reel anterior">←</button><button data-reel-next aria-label="Reel siguiente">→</button></div></div><div class="reel-grid" tabindex="0" role="region" aria-label="Videos de rulos; usá flechas o deslizá">${items.map((r,i) => `<figure class="reel-item" data-reel-index="${i}"><a class="reel-facade" href="${e(r.url)}" target="_blank" rel="noopener noreferrer" aria-label="Reproducir ${e(r.title)}"><img src="${e(r.thumbnail)}" alt="${e(r.thumbnailAlt)}" width="480" height="853" loading="lazy"><span class="reel-play" aria-hidden="true">▷</span></a><figcaption>Ver video<span aria-hidden="true">↗</span></figcaption></figure>`).join("")}</div><div class="reel-progress" aria-hidden="true"><i></i></div></div>`;
}

export function socialProof(items = testimonials) {
  const published = items.filter(t => t.quote && t.name && t.source);
  if (!published.length) return "";
  return `<section class="section wrap social-proof"><h2>En primera persona.</h2><div class="testimonial-list">${published.map(t => `<figure><blockquote>${e(t.quote)}</blockquote><figcaption>${e(t.name)}</figcaption>${link("Ver fuente",t.source)}</figure>`).join("")}</div></section>`;
}

export function team() {
  return `<section class="section wrap team-section" id="nosotros"><figure class="team-photo"><div class="image-crop">${image("team")}</div><figcaption>17:17, una barbería fundada entre hermanos.</figcaption></figure><div class="team-copy"><p class="eyebrow">DETRÁS DE 17:17</p><h2>Dos hermanos.<br>Una barbería.</h2><p>Jonatan y Esteban, los cofundadores de 17:17 en Luque.</p><div class="founder-names">${founders.map(f => `<div><h3>${e(f.name)}</h3><span>${e(f.role)}</span>${f.bio ? `<p>${e(f.bio)}</p>` : ""}</div>`).join("")}</div>${link("Conocé más en Instagram",business.instagram)}</div></section>`;
}

export function productCard(p) {
  if (!p.image || !p.verified) return "";
  return `<article class="product-item" data-product-category="${e(p.category)}"><img class="product-photo" src="${e(p.image)}" alt="${e(p.brand + " " + p.name)}" width="600" height="600" loading="lazy"><div class="product-info"><p class="eyebrow">${e(p.brand)}</p><h3>${e(p.name)}</h3><p>${e(p.summary)}</p>${p.price !== null ? `<p>${price(p.price)}</p>` : ""}<p>Disponibilidad: consultar</p>${wa("Consultar producto","PRODUCTO","",p,"outline")}</div></article>`;
}

export function featuredProducts() {
  return `<section class="wrap product-teaser" id="productos"><div><p class="eyebrow">STYLING Y CUIDADO</p><h2>El look sigue en casa.</h2><p>Consultá por los productos que usamos para terminar el look.</p></div>${link("Consultar productos","/productos","button outline")}</section>`;
}

export function location() {
  return `<section class="section wrap location-section" id="ubicacion"><div class="location-copy"><p class="eyebrow">TE ESPERAMOS EN LUQUE</p><h2>Acá está 17:17.</h2><address>${e(business.address)}<br>${e(business.city)}</address><dl><div><dt>Horario</dt><dd>Lunes–Sábado<br>8:00–21:00</dd></div><div><dt>WhatsApp</dt><dd>${link(business.phone,whatsappLink())}</dd></div></dl><div class="actions">${link("Cómo llegar",business.maps,"button outline")}${wa("Reservar por WhatsApp")}</div></div><figure class="location-photo"><div class="image-crop">${image("local")}</div><figcaption>Un rincón de nuestra barbería.</figcaption></figure></section>`;
}
