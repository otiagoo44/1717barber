// Public configuration only. No credentials or internal IDs belong here.
export const bookingConfiguration = {
  publicUrl: "https://barberia-crm-kappa.vercel.app",
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
  const branch = Array.isArray(catalog?.branches) ? catalog.branches.find(b => b?.slug === configuration.branchSlug) : null;
  if (catalog?.slug !== configuration.organizationSlug || catalog?.currency !== "PYG" || catalog?.website_booking_version !== 1 || !branch || !Array.isArray(branch.services))
    throw new Error("Catálogo público incompatible, tenant/sucursal inexistente o migración pendiente.");
  const slugs = new Set();
  for (const service of branch.services) {
    if (!slugPattern.test(service.slug) || slugs.has(service.slug) || typeof service.name !== "string" || !service.name || typeof service.consultation_required !== "boolean" || !Number.isInteger(service.duration_minutes) || service.duration_minutes < 1 || service.duration_minutes > 480 || (service.price_minor !== null && (!Number.isSafeInteger(service.price_minor) || service.price_minor < 0)))
      throw new Error("Servicio público inválido.");
    if (["rulos", "tinte"].includes(service.website_category) && !service.consultation_required)
      throw new Error("Rulos, combos de rulos y tintes requieren evaluación previa.");
    slugs.add(service.slug);
  }
  for (const category of ["corte", "rulos"]) editorialService(branch, category);
  if (!Array.isArray(branch.staff) || !branch.staff.length || branch.staff.some(s => !slugPattern.test(s.slug) || typeof s.name !== "string" || !s.name.trim() || !Array.isArray(s.services) || s.services.some(slug => !slugPattern.test(slug))))
    throw new Error("Profesionales públicos inválidos o no habilitados.");
  if (branch.services.some(service => !service.consultation_required && !branch.staff.some(staff => staff.services.includes(service.slug))))
    throw new Error("Hay servicios reservables sin un profesional habilitado.");
  return branch;
}
// Categories describe editorial placement, not identity. The confirmed canonical
// slug owns the Rulos feature even if only its combo remains publicly active.
export function editorialService(branch, category) {
  const matches = branch.services.filter(s => s.website_category === category);
  const canonical = category === "rulos" ? matches.find(s => s.slug === "rulos") : matches.length === 1 ? matches[0] : null;
  if (!canonical) throw new Error(`Clasificá un servicio canónico de ${category} en el catálogo del CRM.`);
  return canonical;
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
