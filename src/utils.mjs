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
  return "/reservar";
}
export const serviceDuration = (service) => service.durationMinutes === 120 ? "2 horas" : `${service.durationMinutes} minutos`;
export function serviceBookingLink(serviceId, configuration = business.booking) {
  const service = services.find(s => s.id === serviceId);
  if (!service) throw new Error("Servicio de agenda desconocido.");
  const event = configuration.serviceEvents[serviceId];
  // Rulos exige evaluación previa, incluso cuando existe su evento de 120 min.
  if (service.consultationRequired || !event) return whatsappLink({intent:service.intent, service:service.id});
  if (event.durationMinutes !== service.durationMinutes || event.location !== "inPerson" || event.assignment !== "roundRobin" || event.verified !== true) {
    throw new Error(`Configuración Cal.com sin verificar o incompatible: ${serviceId}`);
  }
  const url = new URL(event.url);
  if (url.protocol !== "https:" || url.hostname !== "cal.com") {
    throw new Error("La agenda debe ser una URL HTTPS real de Cal.com.");
  }
  return url.href;
}
