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
  return `<section class="hero wrap ${rulos ? "rulos-hero" : ""}" id="hero"><div class="hero-copy"><p class="eyebrow">${rulos ? "RULOS 17:17 · LUQUE" : "17:17 BARBERÍA · LUQUE"}</p><h1>${rulos ? "Tu look.<br>Otra textura." : "Tu próximo look<br>empieza acá."}</h1><p class="hero-description">${rulos ? "Rulos 17:17. Mirá el trabajo, elegí tu referencia y consultanos." : "Cortes, rulos, color y cuidado para llevar tu estilo más lejos."}</p>${rulos ? `<div class="hero-price"><span>Rulos permanentes</span><strong>${rulosPrice()}</strong></div>` : ""}<div class="actions">${wa(rulos ? "Consultar disponibilidad" : "Reservar turno", rulos ? "RULOS" : "GENERAL", rulos ? "rulos" : "")}${link(rulos ? "Mirar resultados" : "Conocer Rulos 17:17", rulos ? "#resultados-rulos" : "/rulos", "text-link")}</div><p class="hero-hours">Luque <span>·</span> Lun–Sáb <span>·</span> 8:00–21:00</p></div><div class="hero-visual"><figure class="hero-main">${image("hero", { eager: true })}<figcaption><span>RULOS 17:17</span><span>Trabajo publicado</span></figcaption></figure>${rulos ? "" : `<figure class="hero-inset">${image("heroCut", { eager: true })}<figcaption>CORTES 17:17</figcaption></figure>`}<span class="hero-stamp" aria-hidden="true">17:17</span></div></section>`;
}

export function resultTile(item, index, interactive = false) {
  const m = media[item.media],
    content = image(m);
  return `<figure class="result-tile ${m.src ? "" : "is-pending"}" data-category="${e(item.category)}" data-result-index="${index}">${interactive && m.src ? `<button class="photo-trigger" data-photo-src="${e(m.src)}" data-photo-alt="${e(m.alt)}" data-photo-title="${e(item.title)}" aria-label="Ampliar: ${e(item.title)}">${content}<span class="photo-open" aria-hidden="true">↗</span></button>` : `<div class="result-media">${content}</div>`}<figcaption><span>${e(item.title)}</span><small>${m.src ? e(item.category) : "Foto pendiente"}</small></figcaption></figure>`;
}

export function immediateResults() {
  return `<section class="section wrap immediate-results" id="resultados"><div class="section-heading"><h2>Primero mirá<br>nuestro trabajo.</h2>${link("Ver más trabajos en Instagram", business.instagram)}</div><div class="editorial-grid">${[results[0], results[1], results[3], results[2], results[4], results[5]].map((r, i) => resultTile(r, i)).join("")}</div></section>`;
}

export function reels(items = rulosReels.slice(0, 3)) {
  return `<div class="reel-grid">${items
    .map((r) => {
      const m = { id: r.id, type: "reel", ratio: "9/16", label: r.title };
      return `<figure class="reel-item">${r.url ? `<a class="reel-facade" href="${e(r.url)}" target="_blank" rel="noopener noreferrer" aria-label="Ver ${e(r.title)} en Instagram">${r.thumbnail ? `<img src="${e(r.thumbnail)}" alt="${e(r.title)}" width="360" height="640" loading="lazy">` : placeholder({ ...m, label: "Video de rulos" })}<span class="reel-play" aria-hidden="true">↗</span></a>` : placeholder(m)}<figcaption>${r.url ? "Ver en Instagram" : "Reel real pendiente"}</figcaption></figure>`;
    })
    .join("")}</div>`;
}

export function featuredRulos() {
  return `<section class="featured-rulos" id="rulos"><div class="wrap feature-layout"><div class="feature-photo">${image("rulos")}</div><div class="feature-copy"><p class="eyebrow">SERVICIO DESTACADO</p><h2>Rulos<span>17:17</span></h2><p>Una nueva textura.<br>Tu misma actitud.</p><div class="feature-price"><span>Rulos permanentes</span><strong>${rulosPrice()}</strong></div><div class="actions">${wa("Consultar por rulos", "RULOS", "rulos")}${link("Ver todos los resultados", "/rulos#resultados-rulos")}</div><div class="feature-reels">${reels()}</div></div></div></section>`;
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
  return `<section class="section wrap portfolio" id="${rulos ? "resultados-rulos" : "galeria"}"><div class="section-heading"><div><h2>${rulos ? "Rulos hechos<br>en 17:17." : "Resultados hechos<br>en 17:17."}</h2><p>Fotos de trabajos publicados. Nuevos resultados, próximamente.</p></div>${link("Instagram 17:17", business.instagram)}</div>${rulos ? "" : `<div class="filters" role="group" aria-label="Filtrar resultados">${["Todos", "Rulos", "Cortes", "Color"].map((c, i) => `<button data-gallery-filter="${c}" aria-pressed="${i === 0}">${c}</button>`).join("")}</div><p class="sr-only" data-gallery-status aria-live="polite">6 resultados</p>`}<div class="portfolio-grid">${items.map((r, i) => resultTile(r, i, true)).join("")}</div><div class="portfolio-foot">${rulos ? "" : link(generalReel.title, generalReel.url)}<span>Las fotos se abren para ver el detalle.</span></div></section>`;
}

export function socialProof(items = testimonials, rulos = false) {
  const video = rulos ? rulosTestimonialVideo : testimonialVideo;
  const videoContent = video.url
    ? `<a href="${e(video.url)}" target="_blank" rel="noopener noreferrer" aria-label="Ver experiencia real en video">${video.thumbnail ? `<img src="${e(video.thumbnail)}" alt="${e(video.label)}" width="360" height="640" loading="lazy">` : placeholder(video)}</a>`
    : placeholder(video);
  return `<section class="section wrap social-proof" id="${rulos ? "prueba-rulos" : "testimonios"}"><h2>${rulos ? "Después de los rulos." : "Ellos ya pasaron<br>por la silla."}</h2><div class="proof-layout"><div class="testimonial-list">${items.map((t, i) => (t.quote && t.name && t.source ? `<figure class="testimonial-real">${t.image ? `<img src="${e(t.image)}" alt="${e(t.name)}" width="80" height="80" loading="lazy">` : ""}<blockquote>${e(t.quote)}</blockquote><figcaption>${e(t.name)}${t.context ? ` · ${e(t.context)}` : ""}</figcaption>${link("Ver fuente", t.source)}${t.video ? link("Ver experiencia en video", t.video) : ""}</figure>` : `<div class="testimonial-pending" data-placeholder="${e(t.id)}"><span class="proof-number">0${i + 1}</span><div><h3>${rulos ? "Experiencia de rulos" : "Una historia en la silla"}</h3><p>Testimonio real pendiente.</p><small>Acá irá la voz de un cliente de 17:17.</small></div></div>`)).join("")}</div><figure class="testimonial-video">${videoContent}<figcaption>${video.url ? "Ver experiencia en video" : "Video testimonial pendiente"}</figcaption></figure></div></section>`;
}

export function team() {
  return `<section class="section wrap team-section" id="nosotros"><div class="section-heading"><h2>Los que están<br>detrás de 17:17.</h2><p>Dos personas. Un lugar para tu próximo look.</p></div><div class="team-layout"><figure class="team-context">${image("team")}<figcaption>El equipo, frente a 17:17.</figcaption></figure><div class="founder-grid">${founders.map((f, i) => `<article class="founder-profile">${f.image ? `<img class="founder-photo" src="${e(f.image)}" alt="Retrato de ${e(f.name || "integrante de 17:17")}" width="480" height="600" loading="lazy">` : placeholder({ id: f.placeholders.image, type: "portrait", label: `Conocé a ${i === 0 ? "la primera" : "la segunda"} persona`, ratio: "4/5" })}<h3 data-placeholder="${f.placeholders.name}">${e(f.name || "Nombre pendiente")}</h3><p class="founder-role">${e(f.role || "Rol pendiente")} · ${e(f.specialty || "Especialidad pendiente")}</p><p data-placeholder="${f.placeholders.bio}">${e(f.bio || "Pronto, su historia contada en sus propias palabras.")}</p></article>`).join("")}</div></div></section>`;
}

export function productCard(p) {
  return `<article class="product-item" data-product-category="${e(p.category)}">${p.image ? `<img class="product-photo" src="${e(p.image)}" alt="${e(p.brand + " " + p.name)}" width="600" height="600" loading="lazy">` : placeholder({ id: p.photoId, type: "product", ratio: "1/1", label: "Foto de producto pendiente" })}<div class="product-info"><p class="product-brand">${e(p.brand)}</p><h3>${e(p.name)}</h3><p>${e(p.summary)}</p><dl class="product-facts"><div><dt>Uso</dt><dd>${e(p.use)}</dd></div>${p.shine ? `<div><dt>Brillo</dt><dd>${e(p.shine)}</dd></div>` : ""}${p.hold ? `<div><dt>Fijación</dt><dd>${e(p.hold)}</dd></div>` : ""}${p.price !== null ? `<div><dt>Precio</dt><dd>${price(p.price)}</dd></div>` : ""}<div><dt>Disponibilidad</dt><dd>${e(p.availability)}</dd></div></dl>${wa("Consultar", "PRODUCTO", "", p, "outline")}</div></article>`;
}

export function featuredProducts() {
  return `<section class="section wrap featured-products" id="productos"><div class="section-heading"><div><h2>Lo que usamos<br>para terminar el look.</h2><p>Styling, textura y cuidado. Consultá qué productos manejamos.</p></div>${link("Ver todos los productos", "/productos")}</div><div class="product-grid">${products.slice(0, 4).map(productCard).join("")}</div></section>`;
}

export function location() {
  return `<section class="section wrap location-section" id="ubicacion"><div class="location-photo">${image("local")}</div><div class="location-copy"><span class="eyebrow">LUQUE, PARAGUAY</span><h2>Donde<br>pasa todo.</h2><address>${e(business.address)}<br>${e(business.city)}</address><dl><div><dt>Horarios</dt><dd>Lunes–Sábado<br>8:00–21:00</dd></div><div><dt>WhatsApp</dt><dd>${link(business.phone, whatsappLink())}</dd></div></dl><div class="actions">${link("Cómo llegar", business.maps, "button outline")}${wa("Reservar")}</div><p class="location-note">Abrí la dirección en Google Maps.</p></div></section>`;
}
