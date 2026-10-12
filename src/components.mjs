import { business, media } from "./data.mjs";
import { escape as e, whatsappLink, bookingLink } from "./utils.mjs";
export const arrow = '<span aria-hidden="true" class="arrow">↗</span>';
export function wa(
  label = "Hablar con 17:17",
  intent = "GENERAL",
  service = "",
  product = null,
  extra = "",
) {
  return `<a class="button ${extra}" href="${e(whatsappLink({ intent, service, product }))}" target="_blank" rel="noopener noreferrer" data-cta="${product ? "producto" : intent === "GENERAL" ? "consulta" : "servicio"}" data-intent="${product ? "PRODUCTO_" + product.id.toUpperCase() : intent}" ${service ? `data-service="${e(service)}"` : ""}>${e(label)}${arrow}</a>`;
}
export function booking(label = "Reservar turno", extra = "") {
  return `<a class="button ${extra}" href="${e(bookingLink())}" target="_blank" rel="noopener noreferrer" data-cta="reservar" data-intent="AGENDA">${e(business.booking.url ? label : "Reservar por WhatsApp")}${arrow}</a>`;
}
export const link = (label, url, classes = "text-link") =>
  `<a class="${classes}" href="${e(url)}" ${url.startsWith("https:") ? 'target="_blank" rel="noopener noreferrer"' : ""}>${e(label)}${arrow}</a>`;
export function placeholder(m) {
  return `<div class="media-placeholder placeholder-${e(m.type || "result")}" style="aspect-ratio:${e(m.ratio || "3/4")}" data-placeholder="${e(m.id)}"><span class="placeholder-mark" aria-hidden="true"></span><span class="placeholder-copy">${e(m.label || "Resultado real 17:17 pendiente")}<small>${m.type === "product" ? "Imagen de catálogo pendiente" : m.type === "portrait" ? "Retrato real pendiente" : m.type === "reel" ? "Video real pendiente" : "Material real pendiente"}</small></span></div>`;
}
export function image(
  m,
  {
    eager = false,
    classes = "",
    sizes = "(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 600px",
    priority = eager,
  } = {},
) {
  if (typeof m === "string") m = media[m];
  if (!m.src) return placeholder(m);
  const variants = (m.variants || [600]).filter(width => width < m.width);
  const srcset = path => [...variants.map(width => `${e(path.replace(/\.(webp|avif)$/, `-${width}.$1`))} ${width}w`), `${e(path)} ${m.width}w`].join(", ");
  const img = `<img class="media-image ${classes}" src="${e(m.src)}" ${variants.length ? `srcset="${srcset(m.src)}" sizes="${e(sizes)}"` : ""} width="${m.width}" height="${m.height}" alt="${e(m.alt)}" loading="${eager ? "eager" : "lazy"}" ${priority ? 'fetchpriority="high"' : ""} decoding="async" style="object-position:${e(m.position || "center")}">`;
  return m.avif
    ? `<picture class="media-picture"><source type="image/avif" srcset="${srcset(m.avif)}" sizes="${e(sizes)}">${img}</picture>`
    : img;
}
export function header(active = "home") {
  const links = [
    ["Inicio", "/#inicio", active === "home"],
    ["Rulos", active === "home" ? "/#rulos" : "/rulos", active === "rulos"],
    ["Servicios", "/#servicios"],
    ["Nosotros", "/#nosotros"],
    ["Ubicación", "/#ubicacion"],
  ];
  const list = () =>
    links
      .map(
        ([label, url, current]) =>
          `<a href="${url}" ${current ? 'aria-current="page"' : ""}>${label}</a>`,
      )
      .join("");
  return `<a class="skip-link" href="#main">Saltar al contenido</a><header class="site-header"><div class="header-inner"><a class="wordmark" href="/" aria-label="17:17 BARBERÍA, inicio"><img class="brand-logo" src="/assets/brand-logo.jpg" alt="" width="150" height="150"></a><nav class="desktop-nav" aria-label="Principal">${list()}</nav><div class="header-actions">${booking("Agendar", "header-cta")}<button class="menu-toggle" aria-haspopup="dialog" aria-controls="mobile-menu" aria-expanded="false">Menú<span class="menu-lines" aria-hidden="true"></span></button></div></div></header><dialog id="mobile-menu" class="menu-dialog" aria-labelledby="menu-title"><div class="menu-top"><span id="menu-title">17:17 · Luque</span><button class="close-menu" aria-label="Cerrar menú">Cerrar <span aria-hidden="true">×</span></button></div><nav aria-label="Navegación móvil">${list()}</nav><p>${e(business.hours)}</p>${booking("Elegir horario")}</dialog>`;
}
export function footer() {
  return `<footer class="site-footer wrap"><div class="footer-top"><a class="footer-name" href="/">17:17 Barbería<span>Luque, Paraguay</span></a><nav aria-label="Enlaces del pie">${link("Instagram", business.instagram)}${link("WhatsApp",whatsappLink())}${link("Productos","/productos")}${link("Ubicación","/#ubicacion")}</nav></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} 17:17 Barbería</span><a class="text-link" href="/#inicio">Volver al inicio ↑</a></div></footer>`;
}
export function mobileBooking(rulos = false) {
  return `<div class="mobile-booking" aria-label="Reserva rápida">${booking("Elegir horario")}</div>`;
}
export function lightbox() {
  return `<dialog id="lightbox" class="lightbox" aria-labelledby="lightbox-title"><div class="lightbox-bar"><h2 id="lightbox-title">Resultado 17:17</h2><button data-lightbox-close aria-label="Cerrar foto">Cerrar <span aria-hidden="true">×</span></button></div><div class="lightbox-media"></div><div class="lightbox-controls"><button data-lightbox-prev aria-label="Foto anterior">← Anterior</button><span class="lightbox-count" aria-live="polite"></span><button data-lightbox-next aria-label="Foto siguiente">Siguiente →</button></div></dialog>`;
}
export function faq(items, title = "Antes de venir.", id = "faq") {
  const answered = items.filter(([,answer]) => answer);
  if (!answered.length) return "";
  return `<section id="${id}" class="section wrap faq-section"><div><p class="eyebrow">PREGUNTAS FRECUENTES</p><h2>${e(title)}</h2><p>Lo esencial para organizar tu visita.</p></div><div class="faq-list">${answered.map(([q,a]) => `<details><summary>${e(q)}<span aria-hidden="true">+</span></summary><div class="faq-answer">${e(a)}</div></details>`).join("")}</div></section>`;
}
export function finalCta(rulos = false) {
  return `<section class="final-cta" id="reservar"><div class="wrap"><p class="eyebrow">17:17 BARBERÍA · LUQUE</p><h2>${rulos ? "¿Vamos por esos rulos?" : "Tu próximo look<br>te espera."}</h2><p>Elegí tu horario. Para dudas, hablá con nosotros por WhatsApp.</p><div class="actions">${booking("Agendar ahora")}${wa(rulos ? "Consultar por rulos" : "Hablar con 17:17", rulos ? "RULOS" : "GENERAL", rulos ? "rulos" : "", null, "outline")}${link("Cómo llegar", business.maps)}</div></div></section>`;
}
