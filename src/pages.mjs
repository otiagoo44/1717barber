import { business, homeFaq, rulosFaq, products, rulosDetails, rulosTestimonials, rulosReels } from "./data.mjs";
import { escape as e, rulosPrice } from "./utils.mjs";
import { header, footer, lightbox, faq, finalCta, wa, link, mobileBooking } from "./components.mjs";
import { hero, featuredRulos, servicesSection, gallery, socialProof, team, featuredProducts, location, reels, productCard } from "./sections.mjs";

function rulosPage() {
  const details = [["Qué incluye",rulosDetails.includes],["Tiempo estimado",rulosDetails.duration],["Condiciones",rulosDetails.conditions]].filter(([,v]) => v);
  return `${hero(true)}<section class="section wrap rulos-videos" id="reels-rulos"><div class="section-heading"><div><p class="eyebrow">RESULTADOS Y PROCESO</p><h2>Miralos en movimiento.</h2></div><p>Reproducí los reels desde acá.</p></div>${reels(rulosReels)}</section>${gallery({rulos:true})}<section class="wrap consultation"><div><p class="eyebrow">TU PRÓXIMO PASO</p><h2>Contanos qué<br>tenés en mente.</h2></div><div><p>Mandanos tu referencia y consultá los detalles del servicio antes de reservar.</p>${wa("Consultar por mis rulos","RULOS","rulos")}</div></section>${details.length ? `<section class="section wrap"><h2>El servicio</h2><dl class="includes-list">${details.map(([k,v]) => `<div><dt>${e(k)}</dt><dd>${e(v)}</dd></div>`).join("")}</dl></section>` : ""}${socialProof(rulosTestimonials)}${rulosDetails.care ? `<section class="section wrap"><h2>Cómo cuidar tus rulos.</h2><p>${e(rulosDetails.care)}</p></section>` : ""}${faq(rulosFaq,"Antes de hacerte los rulos.","faq-rulos")}${finalCta(true)}`;
}
function productsPage() {
  const available = products.filter(p => p.image && p.verified);
  return `<section class="wrap catalog-hero" id="inicio"><p class="eyebrow">PRODUCTOS · 17:17</p><h1>El último toque.<br>También en casa.</h1><p>Styling, textura y cuidado para acompañar tu look. Consultanos por el producto que buscás y su disponibilidad.</p>${wa("Consultar productos","PRODUCTOS")}</section>${available.length ? `<section class="section wrap catalog-section" aria-labelledby="catalog-title"><h2 id="catalog-title">Productos</h2><div class="product-grid">${available.map(productCard).join("")}</div></section>` : `<section class="wrap product-consult" aria-labelledby="product-help-title"><h2 id="product-help-title">Encontrá tu forma<br>de peinarte.</h2><div><p>Podés consultar por pomadas, ceras, productos de textura y cuidado para barba.</p><p>Te confirmamos las opciones, el precio y la disponibilidad por WhatsApp.</p><div class="product-categories"><span>Styling</span><span>Textura</span><span>Barba</span></div></div></section>`}<section class="wrap catalog-visit"><h2>También podés pasar por la barbería.</h2><p>${e(business.address)} · ${e(business.city)}<br>${e(business.hours)}</p>${link("Cómo llegar",business.maps)}</section>`;
}
export function renderPage(name, siteUrl = "") {
  const meta = {
    home: {
      title: "17:17 Barbería | Cortes, Rulos y Color en Luque",
      description: `Cortes, rulos permanentes a ${rulosPrice()}, barba y color en Luque, Paraguay. Mirá trabajos de 17:17 y consultá tu turno por WhatsApp.`,
      path: "/",
    },
    rulos: {
      title: `Rulos 17:17 | ${rulosPrice()} · Luque, Paraguay`,
      description: `Mirá resultados de rulos de 17:17 Barbería en Luque. Rulos permanentes a ${rulosPrice()}. Consultá disponibilidad y detalles por WhatsApp.`,
      path: "/rulos",
    },
    productos: {
      title: "Productos de Styling y Cuidado | 17:17 Barbería, Luque",
      description:
        "Consultá por productos de styling, textura y cuidado en 17:17 Barbería, Luque. Precios y disponibilidad por WhatsApp.",
      path: "/productos",
    },
  }[name];
  const content =
    name === "home"
      ? `${hero()}${featuredRulos()}${servicesSection()}${gallery()}${socialProof()}${team()}${featuredProducts()}${location()}${faq(homeFaq)}${finalCta()}`
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
  return `<!doctype html><html lang="es-PY"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${e(meta.title)}</title><meta name="description" content="${e(meta.description)}"><meta name="theme-color" content="#080808"><meta name="robots" content="index,follow"><meta property="og:type" content="website"><meta property="og:locale" content="es_PY"><meta property="og:title" content="${e(meta.title)}"><meta property="og:description" content="${e(meta.description)}"><meta property="og:site_name" content="17:17 Barbería">${siteUrl ? `<link rel="canonical" href="${e(siteUrl + meta.path)}"><meta property="og:url" content="${e(siteUrl + meta.path)}"><meta property="og:image" content="${e(siteUrl + "/assets/media/equipo.webp")}"><meta property="og:image:alt" content="Equipo de 17:17 frente a la barbería">` : ""}<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml"><link rel="preload" href="/assets/fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="/assets/site.css"><script type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script><script src="/assets/site.js" defer></script></head><body data-page="${name}">${header(name)}${name === "home" ? "" : '<div class="back-home wrap"><a class="text-link" href="/">← Volver a 17:17</a></div>'}<main id="main" tabindex="-1">${content}</main>${footer()}${name === "productos" ? "" : mobileBooking(name === "rulos")}${name === "productos" ? "" : lightbox()}</body></html>`;
}
