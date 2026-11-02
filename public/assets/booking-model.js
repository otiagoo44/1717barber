export const escapeHtml = value => String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[c]);
export const bookable = s => s.consultation_required === false && !["rulos", "tinte"].includes(s.website_category) && s.composition_mode === "standalone";
export const normalizePhone = value => value.trim().replace(/[\s().-]/g, "");
export const localDay = (zone, day = new Date()) => new Intl.DateTimeFormat("en-CA", {timeZone:zone}).format(day);
export const localTime = (value, zone) => new Intl.DateTimeFormat("es-PY", {timeZone:zone,hour:"2-digit",minute:"2-digit",hourCycle:"h23"}).format(new Date(value));
export const localDate = (value, zone) => new Intl.DateTimeFormat("es-PY", {timeZone:zone,weekday:"long",day:"numeric",month:"long",year:"numeric"}).format(new Date(value));
export const money = value => value === null ? "Consultar precio" : `Gs. ${new Intl.NumberFormat("es-PY").format(value)}`;
export function liveBranch(catalog, org, branch) {
  const b = catalog?.branches?.find(b => b.slug === branch);
  const slug = /^[a-z0-9][a-z0-9-]{1,62}$/;
  if(catalog?.slug !== org || catalog?.website_booking_version !== 1 || catalog?.currency !== "PYG" || !b || !Array.isArray(b.services) || !Array.isArray(b.staff) || !b.timezone) throw Error("Catálogo no compatible. Usá la agenda del local.");
  new Intl.DateTimeFormat("es",{timeZone:b.timezone});
  if(b.services.some(s => !slug.test(s.slug) || typeof s.name !== "string" || typeof s.consultation_required !== "boolean" || !Number.isInteger(s.duration_minutes) || s.duration_minutes < 1 || (s.price_minor !== null && (!Number.isSafeInteger(s.price_minor) || s.price_minor < 0))) || b.staff.some(s => !slug.test(s.slug) || typeof s.name !== "string" || !Array.isArray(s.services))) throw Error("No pudimos verificar los servicios del local.");
  return b;
}
export function validCustomer({name, phone, email}) {
  if(!name.trim() || name.trim().length > 120) return "Ingresá tu nombre (hasta 120 caracteres).";
  if(!/^\+[1-9][0-9]{7,14}$/.test(normalizePhone(phone))) return "Ingresá tu WhatsApp con código de país, por ejemplo +595981234567.";
  if(email && (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) return "Revisá tu correo o dejalo vacío: es opcional.";
  return "";
}
