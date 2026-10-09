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
    GENERAL:
      "Hola 17:17, quiero consultar disponibilidad para reservar un turno.",
    CORTE: "Hola, quiero consultar un turno para corte.",
    RULOS: "Hola, vi Rulos 17:17 en la web y quiero consultar disponibilidad.",
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
