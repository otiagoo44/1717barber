import { bookingConfiguration, publicConfiguration, validateCatalog } from "../src/booking.mjs";
import { services } from "../src/data.mjs";

export function projectServices(catalog, configuration, editorial = services) {
  const branch = validateCatalog(catalog, configuration);
  const result = [];
  for (const template of editorial) {
    const matches = branch.services.filter(s => s.website_category === template.id);
    // Missing services are not advertised as reservable or priced from an obsolete copy.
    if (!matches.length) continue;
    for (const s of matches) result.push({ ...template,
      id: matches.length === 1 ? template.id : s.slug,
      category: template.id,
      slug: s.slug,
      name: template.id === "tinte" || matches.length > 1 ? s.name : template.name,
      price: s.price_minor,
      durationMinutes: s.duration_minutes,
      consultationRequired: template.consultationRequired === true || s.consultation_required,
    });
  }
  return result;
}
export async function configureBooking(env = process.env, request = fetch) {
  const config = publicConfiguration(env);
  if (config.organizationSlug) {
    const url = new URL("/api/public/catalog", config.publicUrl);
    url.searchParams.set("organization", config.organizationSlug);
    url.searchParams.set("branch", config.branchSlug);
    const response = await request(url, { signal: AbortSignal.timeout(15000), redirect: "error" });
    if (!response.ok) throw new Error(`Catálogo del CRM no disponible (${response.status}). No se publicaron datos inventados.`);
    if (!response.headers.get("content-type")?.includes("application/json"))
      throw new Error("La URL pública no sirve un catálogo JSON de Barbería OS.");
    const catalog = await response.json();
    const projected = projectServices(catalog, config);
    config.catalog = catalog;
    services.splice(0, services.length, ...projected);
  } else {
    console.log("Booking pendiente: faltan los slugs reales de organización/sucursal. Consulta por WhatsApp activa.");
  }
  Object.assign(bookingConfiguration, config);
}
