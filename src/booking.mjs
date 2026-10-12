// Public configuration only. No credentials or internal IDs belong here.
export const bookingConfiguration = {
  publicUrl: "https://barberia-crm.vercel.app",
  organizationSlug: null,
  branchSlug: null,
  catalog: null,
};
const slugPattern = /^[a-z0-9][a-z0-9-]{1,62}$/;
export function publicConfiguration(env = {}) {
  const url = new URL(env.BARBERIA_OS_PUBLIC_URL || bookingConfiguration.publicUrl);
  if (url.protocol !== "https:" || url.username || url.password || url.search || url.hash || url.pathname !== "/")
    throw new Error("BARBERIA_OS_PUBLIC_URL debe ser un origen HTTPS público sin credenciales.");
  const organizationSlug = env.BARBERIA_OS_ORGANIZATION_SLUG || null;
  const branchSlug = env.BARBERIA_OS_BRANCH_SLUG || null;
  if (Boolean(organizationSlug) !== Boolean(branchSlug) || [organizationSlug, branchSlug].some(s => s && !slugPattern.test(s)))
    throw new Error("Configurá ambos slugs públicos reales: organización y sucursal.");
  return { publicUrl: url.origin, organizationSlug, branchSlug, catalog: null };
}
export function validateCatalog(catalog, configuration) {
  const branch = catalog?.branches?.find(b => b.slug === configuration.branchSlug);
  if (catalog?.slug !== configuration.organizationSlug || catalog?.currency !== "PYG" || catalog?.website_booking_version !== 1 || !branch || !Array.isArray(branch.services))
    throw new Error("Catálogo público incompatible, tenant/sucursal inexistente o migración pendiente.");
  const slugs = new Set();
  for (const service of branch.services) {
    if (!slugPattern.test(service.slug) || slugs.has(service.slug) || typeof service.name !== "string" || !service.name || typeof service.consultation_required !== "boolean" || !Number.isInteger(service.duration_minutes) || service.duration_minutes < 1 || service.duration_minutes > 480 || (service.price_minor !== null && (!Number.isSafeInteger(service.price_minor) || service.price_minor < 0)))
      throw new Error("Servicio público inválido.");
    if (service.website_category === "rulos" && !service.consultation_required)
      throw new Error("Rulos requiere evaluación previa.");
    slugs.add(service.slug);
  }
  if (!["corte", "rulos"].every(key => branch.services.filter(s => s.website_category === key).length === 1))
    throw new Error("Clasificá un servicio canónico de Corte y uno de Rulos en el catálogo del CRM.");
  return branch;
}
export function nativeBookingLink(serviceSlug, configuration = bookingConfiguration) {
  if (!configuration.organizationSlug || !configuration.branchSlug || !configuration.catalog) return null;
  const branch = validateCatalog(configuration.catalog, configuration);
  if (serviceSlug !== undefined) {
    const service = branch.services.find(s => s.slug === serviceSlug);
    if (!service) throw new Error("Servicio inexistente en el catálogo público.");
    if (service.consultation_required) return null;
    if (service.composition_mode && service.composition_mode !== "standalone" && !service.base_service_slug) return null;
  }
  const url = new URL(`/book/${encodeURIComponent(configuration.organizationSlug)}/${encodeURIComponent(configuration.branchSlug)}`, configuration.publicUrl);
  if (serviceSlug !== undefined) url.searchParams.set("service", serviceSlug);
  url.searchParams.set("source", "website");
  return url.href;
}
