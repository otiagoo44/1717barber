import { business, services } from "./data.mjs";
export const escape = (value) =>
  String(value ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
export const price = (value) =>
  "Gs. " + new Intl.NumberFormat("es-PY").format(value);
export const rulosPrice = () =>
  price(services.find((s) => s.id === "rulos").price);
export function whatsappLink({ intent = "GENERAL", service, product } = {}) {
  const messages = {
    GENERAL: "Hola 17:17, vi la web y quiero hacer una consulta.",
    AGENDA: "Hola 17:17, quiero coordinar un turno.",
    CORTE: "Hola, quiero consultar un turno para corte.",
    RULOS: "Hola, vi Rulos 17:17 en la web y quiero consultar por el largo y las condiciones de mi cabello.",
    TINTE: "Hola, vi el servicio de tinte y quiero consultar.",
    BARBA: "Hola, quiero consultar un turno para barba.",
    INFANTIL: "Hola, quiero consultar un turno para corte infantil.",
    CEJAS: "Hola, quiero consultar por perfilado de cejas.",
    LAVADO: "Hola, quiero consultar por lavado.",
    PRODUCTOS: "Hola 17:17, quiero consultar por productos de styling y cuidado. ¿Qué opciones y precios tienen disponibles?",
  };
  const message = product
    ? `Hola, vi ${product.name} en la web de 17:17. ¿Tienen disponible?`
    : messages[intent] ||
      `Hola, quiero consultar por ${service || "un turno"}.`;
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
}
export function bookingLink() {
  if (!business.booking.url) return whatsappLink({ intent: "AGENDA" });
  const url = new URL(business.booking.url);
  if (url.protocol !== "https:" || url.hostname !== "cal.com") {
    throw new Error("La agenda debe ser una URL HTTPS real de Cal.com.");
  }
  return url.href;
}
