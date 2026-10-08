import {
  business,
  media,
  results,
  services,
  products,
  founders,
  testimonials,
  testimonialVideo,
  rulosTestimonialVideo,
  rulosReels,
  generalReel,
} from "./data.mjs";
import { escape as e, price, rulosPrice } from "./utils.mjs";
import { image, placeholder, wa, link, arrow } from "./components.mjs";

export function hero(rulos = false) {
  const title = rulos
    ? ["Rulos.", "Otra textura."]
    : ["Tu próximo", "look empieza", "acá."];
  const offer = `<div class="hero-offer"><span>${rulos ? "RULOS PERMANENTES" : "SERVICIO DESTACADO / RULOS 17:17"}</span><strong>${rulosPrice()}</strong></div>`;
  const actions = `<div class="actions">${wa(rulos ? "Consultar disponibilidad" : "Reservar turno", rulos ? "RULOS" : "GENERAL", rulos ? "rulos" : "")}${rulos ? "" : link("Ver Rulos", "/rulos")}</div>`;
  return `<section class="hero wrap ${rulos ? "rulos-hero" : ""}" id="inicio">
  <div class="hero-copy"><p class="eyebrow">17:17 BARBERÍA · LUQUE</p>
   <h1>${title.map((t) => '<span class="hero-line"><span>' + t + "</span></span>").join("")}</h1>
   <p class="hero-description">${rulos ? "Mirá el resultado. Consultá por tu cabello." : "Cortes, rulos, color y cuidado. Tu estilo, en 17:17."}</p>
   ${rulos ? offer + actions : actions + offer}<p class="hero-hours">Luque · Lun–Sáb · 8:00–21:00</p>
  </div>
  <div class="hero-visual"><figure class="hero-main"><div class="image-crop">${image("hero", { eager: true, classes: "parallax-image" })}</div><figcaption><span>RULOS 17:17</span><span>Trabajo publicado</span></figcaption></figure>
   ${rulos ? "" : `<figure class="hero-inset">${image("heroCut", { eager: true, priority: false, sizes: "(max-width:600px) 116px, 174px" })}<figcaption>CORTES 17:17</figcaption></figure>`}<span class="hero-stamp" aria-hidden="true">17:17</span>
  </div>
  <div class="hero-track" aria-hidden="true"><span>ESTILO PROPIO</span><i></i><span>LUQUE / PY</span></div>
 </section>`;
}

export function resultTile(item, index, interactive = false) {
  const m = media[item.media],
    content = image(m);
  return `<figure class="result-tile ${m.src ? "" : "is-pending"}" data-category="${e(item.category)}" data-result-index="${index}">${interactive && m.src ? `<button class="photo-trigger" data-photo-src="${e(m.src)}" data-photo-alt="${e(m.alt)}" data-photo-title="${e(item.title)}" aria-label="Ampliar: ${e(item.title)}">${content}<span class="photo-open" aria-hidden="true">↗</span></button>` : `<div class="result-media">${content}</div>`}<figcaption><span>${e(item.title)}</span><small>${m.src ? e(item.category) : "Foto pendiente"}</small></figcaption></figure>`;
}

export function reels(items = [rulosReels[3], rulosReels[4], rulosReels[1]]) {
  return `<div class="reel-sequence" data-reel-sequence><div class="reel-toolbar"><span class="eyebrow">RULOS / EN MOVIMIENTO</span><div class="reel-controls"><span class="reel-position" aria-live="polite">01 / ${String(items.length).padStart(2, "0")}</span><button data-reel-prev aria-label="Reel anterior">←</button><button data-reel-next aria-label="Reel siguiente">→</button></div></div><div class="reel-grid" tabindex="0" role="region" aria-label="Secuencia de reels de rulos; usá flechas o deslizá">${items.map((r, i) => `<figure class="reel-item" data-reel-index="${i}"><div class="reel-frame"><span class="reel-number" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span>${r.url ? `<a class="reel-facade" href="${e(r.url)}" target="_blank" rel="noopener noreferrer" aria-label="Ver ${e(r.title)} en Instagram">${r.thumbnail ? `<img src="${e(r.thumbnail)}" alt="${e(r.thumbnailAlt || r.title)}" width="480" height="853" loading="lazy">` : placeholder({ id: r.id, type: "reel", ratio: "9/16", label: "Video de rulos" })}<span class="reel-play" aria-hidden="true">↗</span></a>` : placeholder({ id: r.id, type: "reel", ratio: "9/16", label: "Reel de rulos pendiente" })}</div><figcaption>${r.url ? "Ver en Instagram" : "URL y thumbnail pendientes"}</figcaption></figure>`).join("")}</div><div class="reel-progress" aria-hidden="true"><i></i></div></div>`;
}

export function featuredRulos() {
  return `<section class="featured-rulos" id="rulos"><div class="wrap feature-layout"><div class="feature-copy"><p class="eyebrow">01 / SERVICIO DESTACADO</p><h2>Rulos<span>17:17</span></h2><div class="feature-price"><span>Rulos permanentes</span><strong><small>Gs.</small> ${rulosPrice().replace("Gs. ", "")}</strong></div><p>Una nueva textura.<br>Tu misma actitud.</p><div class="actions">${wa("Consultar por rulos", "RULOS", "rulos")}${link("Ver Rulos", "/rulos")}</div></div><div class="feature-panels"><figure class="feature-photo"><div class="image-crop">${image("rulos", { classes: "parallax-image" })}</div><figcaption><span>01 / RESULTADO REAL</span><span>17:17</span></figcaption></figure><figure class="feature-detail">${image("rulos2")}<figcaption>02 / Fotograma real del reel</figcaption></figure></div></div></section>`;
}

export function servicesSection() {
  return `<section class="section wrap services-section" id="servicios"><div class="services-heading"><h2>Elegí tu<br>próximo look.</h2><p>Rulos, un corte nuevo o el de siempre.<br>Consultá un turno para lo que tenés en mente.</p></div><div class="services-list"><h3 class="list-label">Servicios principales</h3>${services
    .filter((s) => !s.complementary)
    .map(
      (s, i) =>
        `<a class="service-row ${s.featured ? "service-featured" : ""}" href="${e(new URL(waHref(s)).href)}" target="_blank" rel="noopener noreferrer" data-cta="servicio" data-intent="${s.intent}" data-service="${s.id}"><span class="service-number">0${i + 1}</span><span class="service-name">${e(s.name)}${s.featured ? "<small>Destacado</small>" : ""}</span><strong>${price(s.price)}</strong>${arrow}</a>`,
    )
    .join(
      "",
    )}<h3 class="list-label complementary-label">Para completar</h3><div class="complementary-services">${services
    .filter((s) => s.complementary)
    .map(
      (s) =>
        `<div><span>${e(s.name)}</span><strong>${price(s.price)}</strong></div>`,
    )
    .join("")}</div></div></section>`;
}
import { whatsappLink } from "./utils.mjs";
const waHref = (s) => whatsappLink({ intent: s.intent, service: s.id });

export function gallery({ rulos = false } = {}) {
  const items = rulos ? results.filter((r) => r.category === "Rulos") : results;
  return `<section class="section wrap portfolio" id="${rulos ? "resultados-rulos" : "galeria"}"><div class="section-heading"><div><h2>${rulos ? "Rulos hechos<br>en 17:17." : "El trabajo<br>habla primero."}</h2><p>Fotos de trabajos publicados. Nuevos resultados, próximamente.</p></div>${link("Instagram 17:17", business.instagram)}</div>${rulos ? "" : `<div class="filters" role="group" aria-label="Filtrar resultados">${["Todos", "Rulos", "Cortes", "Color"].map((c, i) => `<button data-gallery-filter="${c}" aria-pressed="${i === 0}">${c}</button>`).join("")}</div><p class="sr-only" data-gallery-status aria-live="polite">6 resultados</p>`}<div class="portfolio-grid editorial-grid">${items.map((r, i) => resultTile(r, i, true)).join("")}</div><div class="portfolio-foot">${rulos ? "" : link(generalReel.title, generalReel.url)}<span>Las fotos se abren para ver el detalle.</span></div></section>`;
}

export function socialProof(items = testimonials, rulos = false) {
  const video = rulos ? rulosTestimonialVideo : testimonialVideo;
  const videoContent = video.url
    ? `<a href="${e(video.url)}" target="_blank" rel="noopener noreferrer" aria-label="Ver experiencia real en video">${video.thumbnail ? `<img src="${e(video.thumbnail)}" alt="${e(video.label)}" width="360" height="640" loading="lazy">` : placeholder(video)}</a>`
    : placeholder(video);
  return `<section class="section wrap social-proof" id="${rulos ? "prueba-rulos" : "testimonios"}"><h2>${rulos ? "Después de los rulos." : "Ellos ya pasaron<br>por la silla."}</h2><div class="proof-layout"><div class="testimonial-list">${items.map((t, i) => (t.quote && t.name && t.source ? `<figure class="testimonial-real">${t.image ? `<img src="${e(t.image)}" alt="${e(t.name)}" width="80" height="80" loading="lazy">` : ""}<blockquote>${e(t.quote)}</blockquote><figcaption>${e(t.name)}${t.context ? ` · ${e(t.context)}` : ""}</figcaption>${link("Ver fuente", t.source)}${t.video ? link("Ver experiencia en video", t.video) : ""}</figure>` : `<div class="testimonial-pending" data-placeholder="${e(t.id)}"><span class="proof-number">0${i + 1}</span><div><h3>${rulos ? "Experiencia de rulos" : "Una historia en la silla"}</h3><p>Testimonio real pendiente.</p><small>Acá irá la voz de un cliente de 17:17.</small></div></div>`)).join("")}</div><figure class="testimonial-video">${videoContent}<figcaption>${video.url ? "Ver experiencia en video" : "Video testimonial pendiente"}</figcaption></figure></div></section>`;
}

export function team() {
  return `<section class="section wrap team-section" id="nosotros"><div class="section-heading"><div><p class="eyebrow">05 / LAS PERSONAS</p><h2>Hermanos.<br>Cofundadores.</h2></div><p>Jonatan y Esteban. Los dos detrás de 17:17.</p></div><div class="team-layout"><figure class="team-context"><div class="image-crop">${image("team")}</div><figcaption>Una barbería fundada entre hermanos.</figcaption></figure><div class="founder-grid">${founders.map((f) => `<article class="founder-profile"><div class="portrait-frame">${f.image ? `<img class="founder-photo" src="${e(f.image)}" alt="Retrato de ${e(f.name)}" width="480" height="600" loading="lazy">` : placeholder({ id: f.placeholders.image, type: "portrait", label: `Retrato de ${f.name} pendiente`, ratio: "4/5" })}</div><div class="profile-copy"><h3>${e(f.name)}</h3><p class="founder-role">${e(f.role)}</p><p>${e(f.specialty || "Especialidad pendiente")}</p><p data-placeholder="${f.placeholders.bio}">${e(f.bio || "Su historia, pendiente de confirmar.")}</p></div></article>`).join("")}</div></div></section>`;
}

export function productCard(p) {
  return `<article class="product-item" data-product-category="${e(p.category)}">${p.image ? `<img class="product-photo" src="${e(p.image)}" alt="${e(p.brand + " " + p.name)}" width="600" height="600" loading="lazy">` : placeholder({ id: p.photoId, type: "product", ratio: "1/1", label: "Foto de producto pendiente" })}<div class="product-info"><p class="product-brand">${e(p.brand)}</p><h3>${e(p.name)}</h3><p>${e(p.summary)}</p><dl class="product-facts"><div><dt>Uso</dt><dd>${e(p.use)}</dd></div>${p.shine ? `<div><dt>Brillo</dt><dd>${e(p.shine)}</dd></div>` : ""}${p.hold ? `<div><dt>Fijación</dt><dd>${e(p.hold)}</dd></div>` : ""}${p.price !== null ? `<div><dt>Precio</dt><dd>${price(p.price)}</dd></div>` : ""}<div><dt>Disponibilidad</dt><dd>${e(p.availability)}</dd></div></dl>${wa("Consultar", "PRODUCTO", "", p, "outline")}</div></article>`;
}

export function featuredProducts() {
  return `<section class="section wrap featured-products" id="productos"><div class="section-heading"><div><h2>Lo que usamos<br>para terminar el look.</h2><p>Styling, textura y cuidado. Consultá qué productos manejamos.</p></div>${link("Ver todos los productos", "/productos")}</div><div class="product-grid">${products.slice(0, 4).map(productCard).join("")}</div></section>`;
}

export function location() {
  return `<section class="section wrap location-section" id="ubicacion"><div class="location-photo image-crop">${image("local", { classes: "parallax-image" })}</div><div class="location-copy"><span class="eyebrow">LUQUE, PARAGUAY</span><h2>Donde<br>pasa todo.</h2><address>${e(business.address)}<br>${e(business.city)}</address><dl><div><dt>Horarios</dt><dd>Lunes–Sábado<br>8:00–21:00</dd></div><div><dt>WhatsApp</dt><dd>${link(business.phone, whatsappLink())}</dd></div></dl><div class="actions">${link("Cómo llegar", business.maps, "button outline")}${wa("Reservar")}</div><p class="location-note">Abrí la dirección en Google Maps.</p></div></section>`;
}

export function rulosProof() {
  return `<section class="section wrap rulos-proof" id="prueba-rulos-home"><div class="section-heading"><div><p class="eyebrow">04 / RULOS EN PRIMER PLANO</p><h2>La textura.<br>El movimiento.</h2></div>${link("Ver los 5 reels de rulos", "/rulos#reels-rulos")}</div>${reels()}${socialProof().replace('<section class="section wrap social-proof"', '<section class="social-proof"')}</section>`;
}
