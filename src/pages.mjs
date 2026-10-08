import {
  business,
  homeFaq,
  rulosFaq,
  products,
  rulosDetails,
  rulosProcess,
  rulosTestimonials,
  rulosReels,
} from "./data.mjs";
import { escape as e, rulosPrice } from "./utils.mjs";
import {
  header,
  footer,
  lightbox,
  faq,
  finalCta,
  wa,
  link,
} from "./components.mjs";
import {
  hero,
  immediateResults,
  featuredRulos,
  servicesSection,
  gallery,
  socialProof,
  team,
  featuredProducts,
  location,
  reels,
  productCard,
} from "./sections.mjs";

const pending = (v, id) =>
  v
    ? e(v)
    : `<span class="pending-label" data-placeholder="${id}">Pendiente de confirmar con 17:17.</span>`;
function rulosPage() {
  return `${hero(true)}${gallery({ rulos: true })}<section class="section wrap rulos-videos"><div class="section-heading"><div><h2>La textura,<br>en movimiento.</h2><p>Espacio para cinco reels reales de rulos.</p></div>${link("Ver Instagram", business.instagram)}</div>${reels(rulosReels)}</section><section class="section wrap rulos-service"><div><p class="eyebrow">RULOS 17:17</p><h2>Primero,<br>conversemos.</h2><p>Mostranos la referencia que tenés en mente y consultá por tu cabello antes de reservar.</p>${wa("Consultar por mi cabello", "RULOS", "rulos", "", "outline")}</div><div class="service-details"><h3>El servicio</h3><p>${pending(rulosDetails.description, "RULOS_DESCRIPCION_PENDIENTE")}</p><p>Los detalles del trabajo se confirman en la consulta. No publicamos tiempos ni condiciones sin verificarlos.</p></div></section><section class="section wrap process-section"><h2>Del primer mensaje<br>al resultado.</h2><p class="pending-label">Esquema del proceso pendiente de validar con 17:17.</p><ol class="process-list">${rulosProcess.map((p, i) => `<li data-placeholder="${p.id}"><span>0${i + 1}</span><h3>${e(p.title)}</h3><p>${p.confirmed ? e(p.copy) : "Etapa y detalle pendientes de confirmar."}</p></li>`).join("")}</ol></section><section class="section wrap includes-section"><h2>Todo claro<br>antes de reservar.</h2><dl class="includes-list"><div><dt>Rulos permanentes</dt><dd class="includes-price">${rulosPrice()}</dd></div><div><dt>Qué incluye</dt><dd>${pending(rulosDetails.includes, "RULOS_INCLUYE_PENDIENTE")}</dd></div><div><dt>Tiempo estimado</dt><dd>${pending(rulosDetails.duration, "RULOS_TIEMPO_PENDIENTE")}</dd></div><div><dt>Condiciones</dt><dd>${pending(rulosDetails.conditions, "RULOS_CONDICIONES_PENDIENTE")}</dd></div></dl></section>${socialProof(rulosTestimonials, true)}<section class="section wrap care-section"><h2>Cómo mantener<br>el resultado.</h2><div><p>${pending(rulosDetails.care, "RULOS_CUIDADOS_PENDIENTE")}</p><p>Pedí las indicaciones de cuidado en tu consulta. Los productos para rulos se recomendarán cuando 17:17 confirme su uso.</p>${link("Conocer el catálogo de productos", "/productos", "button outline")}</div></section>${faq(rulosFaq, "Antes de hacerte los rulos.", "faq-rulos")}${finalCta(true)}`;
}

function productsPage() {
  return `<section class="section wrap catalog-hero"><p class="eyebrow">STYLING · TEXTURA · CUIDADO</p><h1>Productos que<br>usamos en 17:17.</h1><p>Styling, textura y cuidado para mantener el look fuera de la barbería.</p><p class="catalog-note">Consultá precio y disponibilidad. Las fotos y fichas definitivas están pendientes de confirmar.</p></section><section class="wrap catalog-section" aria-labelledby="catalog-title"><h2 class="sr-only" id="catalog-title">Catálogo de productos</h2><div class="filters" role="group" aria-label="Filtrar productos">${["Todos", "Pomadas / Ceras", "Textura", "Barba"].map((c, i) => `<button data-product-filter="${c}" aria-pressed="${i === 0}">${c}</button>`).join("")}</div><p class="sr-only" data-product-status aria-live="polite">6 productos</p><div class="product-grid catalog-grid">${products.map(productCard).join("")}</div></section>${finalCta()}`;
}

export function renderPage(name, siteUrl = "") {
  const meta = {
    home: {
      title: "17:17 Barbería | Cortes, Rulos y Color en Luque",
      description:
        `Cortes, rulos permanentes a ${rulosPrice()}, barba y color en Luque, Paraguay. Mirá trabajos de 17:17 y consultá tu turno por WhatsApp.`,
      path: "/",
    },
    rulos: {
      title: `Rulos 17:17 | ${rulosPrice()} · Luque, Paraguay`,
      description:
        `Mirá resultados de rulos de 17:17 Barbería en Luque. Rulos permanentes a ${rulosPrice()}. Consultá disponibilidad y detalles por WhatsApp.`,
      path: "/rulos",
    },
    productos: {
      title: "Productos de Styling y Cuidado | 17:17 Barbería, Luque",
      description:
        "Conocé el catálogo de styling, textura y cuidado de 17:17 Barbería. Consultá precios y disponibilidad por WhatsApp.",
      path: "/productos",
    },
  }[name];
  const content =
    name === "home"
      ? `${hero()}${immediateResults()}${featuredRulos()}${servicesSection()}${gallery()}${socialProof()}${team()}${featuredProducts()}${location()}${faq(homeFaq)}${finalCta()}`
      : name === "rulos"
        ? rulosPage()
        : productsPage();
  const schema = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    name: business.name,
    telephone: "+595983402497",
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address,
      addressLocality: "Luque",
      addressCountry: "PY",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "08:00",
      closes: "21:00",
    },
    sameAs: [business.instagram],
    ...(siteUrl ? { url: siteUrl } : {}),
  };
  return `<!doctype html><html lang="es-PY"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${e(meta.title)}</title><meta name="description" content="${e(meta.description)}"><meta name="theme-color" content="#080808"><meta name="robots" content="index,follow"><meta property="og:type" content="website"><meta property="og:locale" content="es_PY"><meta property="og:title" content="${e(meta.title)}"><meta property="og:description" content="${e(meta.description)}"><meta property="og:site_name" content="17:17 Barbería">${siteUrl ? `<link rel="canonical" href="${e(siteUrl + meta.path)}"><meta property="og:url" content="${e(siteUrl + meta.path)}"><meta property="og:image" content="${e(siteUrl + "/assets/media/equipo.webp")}"><meta property="og:image:alt" content="Equipo de 17:17 frente a la barbería">` : ""}<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml"><link rel="preload" href="/assets/fonts/barlow-condensed-600-latin.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="/assets/site.css"><script type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script><script src="/assets/site.js" defer></script></head><body data-page="${name}">${header(name)}<main id="main" tabindex="-1">${content}</main>${footer()}${name === "productos" ? "" : lightbox()}</body></html>`;
}
