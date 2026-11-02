import {bookingConfiguration, nativeBookingLink} from "./booking.mjs";
import {escape as e, whatsappLink} from "./utils.mjs";
export function embeddedBooking() {
  const c = bookingConfiguration;
  if(!nativeBookingLink()) return "";
  return `<section class="wrap booking-shell" aria-label="Reserva online" data-booking data-origin="${e(c.publicUrl)}" data-organization="${e(c.organizationSlug)}" data-branch="${e(c.branchSlug)}" data-consult="${e(whatsappLink())}" hidden>
    <div class="booking-progress"><span data-progress-label>Paso 1 de 5 · Servicio</span><progress max="5" value="1" aria-label="Progreso de la reserva"></progress><ol aria-label="Pasos de la reserva">${["Servicio","Barbero","Horario","Tus datos","Confirmación"].map((v,i)=>`<li data-progress-step="${i}">${i+1}. ${v}</li>`).join("")}</ol></div>
    <div data-booking-error class="booking-error" role="alert" hidden></div>
    <div data-booking-body aria-live="polite"></div>
    <noscript>Activá JavaScript para usar el formulario. Escribir por WhatsApp no confirma una reserva.</noscript>
    <p class="booking-alternative">¿Preferís la agenda habitual? <a class="text-link" data-native-fallback href="${e(nativeBookingLink())}">Abrir agenda del local ↗</a></p>
  </section><script type="module" src="/assets/booking-form.js"></script>`;
}
