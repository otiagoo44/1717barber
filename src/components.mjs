import { business, media } from "./data.mjs";
import { escape as e, whatsappLink } from "./utils.mjs";
export const arrow = '<span aria-hidden="true" class="arrow">↗</span>';
export function wa(
  label = "Reservar turno",
  intent = "GENERAL",
  service = "",
  product = null,
  extra = "",
) {
  return `<a class="button ${extra}" href="${e(whatsappLink({ intent, service, product }))}" target="_blank" rel="noopener noreferrer" data-cta="${product ? "producto" : intent === "GENERAL" ? "reservar" : "servicio"}" data-intent="${product ? "PRODUCTO_" + product.id.toUpperCase() : intent}" ${service ? `data-service="${e(service)}"` : ""}>${e(label)}${arrow}</a>`;
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
  const img = `<img class="media-image ${classes}" src="${e(m.src)}" ${m.width > 600 ? `srcset="${e(m.src.replace(".webp", "-600.webp"))} 600w, ${e(m.src)} ${m.width}w" sizes="${e(sizes)}"` : ""} width="${m.width}" height="${m.height}" alt="${e(m.alt)}" loading="${eager ? "eager" : "lazy"}" ${priority ? 'fetchpriority="high"' : ""} decoding="async" style="object-position:${e(m.position || "center")}">`;
  return m.avif
    ? `<picture class="media-picture"><source type="image/avif" srcset="${e(m.avif.replace(".avif", "-600.avif"))} 600w, ${e(m.avif)} ${m.width}w" sizes="${e(sizes)}">${img}</picture>`
    : img;
}
export function header(active = "home") {
  const links = [
    ["Inicio", "/#inicio", active === "home"],
    ["Rulos", active === "home" ? "/#rulos" : "/rulos", active === "rulos"],
    ["Servicios", "/#servicios"],
    ["Nosotros", "/#nosotros"],
  ];
  const list = () =>
    links
      .map(
        ([label, url, current]) =>
          `<a href="${url}" ${current ? 'aria-current="page"' : ""}>${label}</a>`,
      )
      .join("");
  return `<a class="skip-link" href="#main">Saltar al contenido</a><header class="site-header"><div class="header-inner"><a class="wordmark" href="/" aria-label="17:17 BARBERÍA, inicio"><img class="brand-logo" src="/assets/brand-logo.jpg" alt="" width="150" height="150"><span>17:17</span> <small>BARBERÍA</small></a><nav class="desktop-nav" aria-label="Principal">${list()}</nav><div class="header-actions">${wa("Reservar turno", "GENERAL", "", "", "header-cta")}<button class="menu-toggle" aria-haspopup="dialog" aria-controls="mobile-menu" aria-expanded="false">Menú<span class="menu-lines" aria-hidden="true"></span></button></div></div></header><dialog id="mobile-menu" class="menu-dialog" aria-labelledby="menu-title"><div class="menu-top"><span id="menu-title">17:17 · Luque</span><button class="close-menu" aria-label="Cerrar menú">Cerrar <span aria-hidden="true">×</span></button></div><nav aria-label="Navegación móvil">${list()}</nav><p>${e(business.hours)}</p>${wa("Reservar por WhatsApp")}</dialog>`;
}
export function footer() {
  return `<footer class="site-footer wrap"><a class="wordmark footer-mark" href="/"><img class="brand-logo" src="/assets/brand-logo.jpg" alt="" width="150" height="150"><span>17:17</span><small>BARBERÍA · LUQUE</small></a><div><p>${e(business.address)}<br>${e(business.city)}</p><p>${e(business.hours)}</p></div><div>${link("Inicio", "/")}${link("@1717barberia", business.instagram)}${link(business.phone, whatsappLink())}</div><div class="footer-bottom"><span>© ${new Date().getFullYear()} 17:17 Barbería</span><a class="text-link" href="/#inicio">Volver al inicio ↑</a></div></footer>`;
}
export function lightbox() {
  return `<dialog id="lightbox" class="lightbox" aria-labelledby="lightbox-title"><div class="lightbox-bar"><h2 id="lightbox-title">Resultado 17:17</h2><button data-lightbox-close aria-label="Cerrar foto">Cerrar <span aria-hidden="true">×</span></button></div><div class="lightbox-media"></div><div class="lightbox-controls"><button data-lightbox-prev aria-label="Foto anterior">← Anterior</button><span class="lightbox-count" aria-live="polite"></span><button data-lightbox-next aria-label="Foto siguiente">Siguiente →</button></div></dialog>`;
}
export function faq(items, title = "Lo que querés saber.", id = "faq") {
  return `<section id="${id}" class="section wrap faq-section"><div><h2>${e(title)}</h2><p>Si tenés otra consulta, escribinos.</p>${wa("Consultar por WhatsApp", "GENERAL", "", "", "outline")}</div><div class="faq-list">${items.map(([q, a]) => `<details><summary>${e(q)}<span aria-hidden="true">+</span></summary><div class="faq-answer">${a ? e(a) : '<span class="pending-label" data-placeholder="RESPUESTA_PENDIENTE">Respuesta pendiente de confirmar con 17:17.</span> Consultá por WhatsApp antes de reservar.'}</div></details>`).join("")}</div></section>`;
}
export function finalCta(rulos = false) {
  return `<section class="final-cta section" id="reservar"><div class="final-brand"><img class="brand-logo" src="/assets/brand-logo.jpg" alt="Logo oficial de 17:17" width="150" height="150" loading="lazy"><span class="final-wordmark" aria-hidden="true">17:17</span></div><span class="eyebrow">BARBERÍA · LUQUE</span><h2>${rulos ? "¿Querés consultar<br>por tus rulos?" : "Tu próximo look<br>puede empezar acá."}</h2><p>Cortes · Rulos · Color · Barbería</p><div class="actions">${wa(rulos ? "Consultar por rulos" : "Reservar por WhatsApp", rulos ? "RULOS" : "GENERAL", rulos ? "rulos" : "")}${link("Cómo llegar", business.maps, "button outline")}</div></section>`;
}
