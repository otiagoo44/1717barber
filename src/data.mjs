// Única fuente editorial. Reemplazar null con datos confirmados; no inferir claims.
export const business = {
  slug: "1717",
  booking: {
    provider: "cal.com",
    url: "https://cal.com/ezequiel-oviedo-dthlhd/barberia",
  },
  name: "17:17 Barbería",
  phone: "0983 402 497",
  whatsapp: "595983402497",
  address: "Cap. Dado esq. Gobernador Irala",
  city: "Luque, Paraguay",
  hours: "Lunes–Sábado · 8:00–21:00",
  instagram: "https://www.instagram.com/1717barberia",
  maps: "https://www.google.com/maps/search/Cap.+Dado+esquina+Gobernador+Irala+Luque+Paraguay",
  siteUrl: "https://1717barber.vercel.app", // URL publicada en el análisis de Tiago.
};
export const media = {
  hero: {
    id: "HERO_FOTO_PRINCIPAL",
    type: "hero",
    src: "/assets/media/rulos-actual.webp",
    avif: "/assets/media/rulos-actual.avif",
    variants: [600, 900],
    width: 1200,
    height: 1600,
    alt: "Resultado de rulos y degradado lateral realizado en 17:17 Barbería",
    position: "50% 42%",
  },
  heroCut: {
    id: "HERO_CORTE",
    type: "result",
    src: "/assets/media/corte.webp",
    avif: "/assets/media/corte.avif",
    width: 1200,
    height: 1600,
    alt: "Corte masculino con diseño lateral realizado en 17:17",
    position: "50% 48%",
  },
  rulos: {
    id: "RULOS_RESULTADO_01",
    type: "result",
    src: "/assets/media/rulos.webp",
    avif: "/assets/media/rulos.avif",
    width: 1200,
    height: 1600,
    alt: "Detalle de rulos y corte lateral realizado en 17:17",
    position: "50% 62%",
  },
  rulos2: {
    id: "RULOS_RESULTADO_02",
    type: "result",
    src: "/assets/media/rulos-hero-actual.webp",
    avif: "/assets/media/rulos-hero-actual.avif",
    width: 576,
    height: 1024,
    alt: "Rulos con volumen realizados en 17:17 Barbería, fotograma de un video recibido",
    position: "50% 42%",
  },
  rulosFeatured: {
    id: "RULOS_DESTACADO_ACTUAL",
    src: "/assets/media/rulos-destacado-actual.webp",
    avif: "/assets/media/rulos-destacado-actual.avif",
    width: 464,
    height: 832,
    alt: "Resultado de rulos en 17:17 Barbería, fotograma de un video recibido",
    position: "50% 35%",
  },
  corte: {
    id: "CORTE_RESULTADO_01",
    type: "result",
    src: "/assets/media/corte-mullet-actual.webp",
    avif: "/assets/media/corte-mullet-actual.avif",
    width: 1200,
    height: 1600,
    alt: "Corte mullet con degradado lateral realizado en 17:17 Barbería",
    position: "50% 48%",
  },
  corte2: {
    id: "CORTE_RESULTADO_02",
    type: "result",
    src: "/assets/media/corte-fade-actual.webp",
    avif: "/assets/media/corte-fade-actual.avif",
    width: 1200,
    height: 1600,
    alt: "Corte fade visto de perfil realizado en 17:17 Barbería",
    position: "50% 45%",
  },
  color: {
    id: "COLOR_RESULTADO_01",
    type: "result",
    src: "/assets/media/color.webp",
    avif: "/assets/media/color.avif",
    width: 1200,
    height: 1600,
    alt: "Tinte rojo en la parte superior y corte lateral realizado en 17:17",
    position: "50% 50%",
  },
  detalle: {
    id: "DETALLE_RESULTADO_01",
    type: "result",
    src: "/assets/media/corte-taper-actual.webp",
    avif: "/assets/media/corte-taper-actual.avif",
    width: 1200,
    height: 1600,
    alt: "Detalle de corte taper realizado en 17:17 Barbería",
    position: "50% 42%",
  },
  team: {
    id: "EQUIPO_EXISTENTE",
    type: "portrait",
    src: "/assets/media/equipo.webp",
    avif: "/assets/media/equipo.avif",
    width: 1144,
    height: 1600,
    alt: "Foto publicada del equipo de 17:17 frente a la barbería",
    position: "50% 60%",
  },
  local: {
    id: "LOCAL_FOTO_01",
    type: "result",
    src: "/assets/media/local-fachada.webp",
    avif: "/assets/media/local-fachada.avif",
    width: 591,
    height: 795,
    alt: "Fachada y entrada de 17:17 Barbería en Luque",
    position: "50% 45%",
  },
  localInterior: {
    id: "LOCAL_INTERIOR",
    src: "/assets/media/local-interior.webp",
    avif: "/assets/media/local-interior.avif",
    width: 591,
    height: 800,
    alt: "Interior de 17:17 Barbería con iluminación de techo y puestos de trabajo",
  },
  localStation: {
    id: "LOCAL_PUESTO",
    src: "/assets/media/local-puesto.webp",
    avif: "/assets/media/local-puesto.avif",
    width: 960,
    height: 1280,
    alt: "Puesto de trabajo con sillón y espejo en 17:17 Barbería",
  },
};
export const results = [
  { media: "rulos", category: "Rulos", title: "Rulos + corte lateral" },
  { media: "corte", category: "Cortes", title: "Mullet + degradado" },
  { media: "color", category: "Color", title: "Color en primer plano" },
  {
    media: "rulos2",
    category: "Rulos",
    title: "Rulos con volumen",
  },
  {
    media: "corte2",
    category: "Cortes",
    title: "Fade de perfil",
  },
  {
    media: "detalle",
    category: "Cortes",
    title: "Detalle de taper",
  },
];
export const services = [
  {
    id: "rulos",
    name: "Rulos permanentes",
    price: 180000,
    intent: "RULOS",
    featured: true,
  },
  { id: "corte", name: "Corte masculino", price: 30000, intent: "CORTE" },
  { id: "tinte", name: "Tinte", price: 200000, intent: "TINTE" },
  { id: "barba", name: "Barba", price: 30000, intent: "BARBA" },
  {
    id: "infantil",
    name: "Corte infantil",
    price: 30000,
    intent: "INFANTIL",
    complementary: true,
  },
  {
    id: "cejas",
    name: "Perfilado de cejas",
    price: 10000,
    intent: "CEJAS",
    complementary: true,
  },
  {
    id: "lavado",
    name: "Lavado",
    price: 10000,
    intent: "LAVADO",
    complementary: true,
  },
];
export const products = [
  {
    id: "iconic",
    brand: "IMMORTAL NYC",
    name: "Iconic Men Cream Pomade",
    category: "Pomadas / Ceras",
    use: "Styling",
    summary: "Pomada para styling. Consultá cómo usarla en tu look.",
  },
  {
    id: "matte",
    brand: "IMMORTAL NYC",
    name: "Hair Wax Matte Look",
    category: "Pomadas / Ceras",
    use: "Styling",
    summary: "Cera para styling. Consultá sus características y presentación.",
  },
  {
    id: "polvo",
    brand: "IMMORTAL NYC",
    name: "Polvo Texturizador",
    category: "Textura",
    use: "Styling",
    summary: "Producto de textura. Consultá cuál se adapta a tu peinado.",
  },
  {
    id: "manifesto",
    brand: "Manifesto",
    name: "Matte Pomade",
    category: "Pomadas / Ceras",
    use: "Styling",
    summary: "Pomada para styling. Consultá la presentación que manejamos.",
  },
  {
    id: "million",
    brand: "IMMORTAL NYC",
    name: "One in a Million",
    category: "Pomadas / Ceras",
    use: "Styling",
    summary: "Consultá por One in a Million y la presentación disponible.",
  },
  {
    id: "barba",
    brand: "IMMORTAL NYC",
    name: "Producto para barba",
    category: "Barba",
    use: "Cuidado",
    summary:
      "Nombre y presentación pendientes. Consultá por productos para barba.",
  },
].map((p) => ({
  ...p,
  image: p.id === "barba" ? null : `/assets/media/producto-${p.id}.webp`,
  verified: p.id !== "barba",
  price: null,
  availability: "Consultar",
  shine: null,
  hold: null,
  photoId: p.id === "barba" ? "PRODUCT_PHOTO_PENDING_BARBA" : "PRODUCT_" + p.id.toUpperCase(),
}));
// Síntesis editorial de sus videos, no citas textuales. Evidencia: docs/FOUNDER_CONTENT.md.
export const founders = [
  {
    id: "FUNDADOR_01",
    name: "Jonatan",
    role: "Cofundador",
    specialty: null,
    headline: "El oficio se construye.",
    bio: "Jonatan fue construyendo su oficio con práctica, incluso cortando en plazas y calles. Hoy ese camino continúa en 17:17, junto a su hermano.",
    bioSource: { video: "WhatsApp Video 2026-10-12 at 08.01.23.mp4", interval: "00:07–00:22; 00:56–01:01" },
    image: null,
  },
  {
    id: "FUNDADOR_02",
    name: "Esteban",
    role: "Cofundador",
    specialty: null,
    headline: "Crecer mano a mano.",
    bio: "Para Esteban, 17:17 significa apoyarse entre hermanos, complementar sus fortalezas y crecer mano a mano. Un proyecto en el que cada uno cuenta con el otro.",
    bioSource: { video: "WhatsApp Video 2026-10-12 at 08.01.33.mp4", interval: "00:28–00:54" },
    image: null,
  },
];
export const testimonials = [1, 2].map((n) => ({
  id: `TESTIMONIO_REAL_0${n}_PENDIENTE`,
  quote: null,
  name: null,
  context: null,
  image: null,
  video: null,
  source: null,
}));
export const rulosTestimonials = [1, 2].map((n) => ({
  ...testimonials[n - 1],
  id: `TESTIMONIO_RULOS_0${n}_PENDIENTE`,
}));
export const testimonialVideo = {
  id: "VIDEO_TESTIMONIAL_PENDIENTE",
  src: null,
  url: null,
  thumbnail: null,
  type: "testimonial",
  label: "Una experiencia en primera persona",
  ratio: "9/16",
};
export const rulosTestimonialVideo = {
  ...testimonialVideo,
  id: "VIDEO_TESTIMONIAL_RULOS_PENDIENTE",
};
const reelCodes = [
  "DeDQr0cuhey",
  "Dd903THBe7y",
  "DdrxU3CBZ2A",
  "Dcl55RjxJrK",
  "DceM8azzYuV",
];
const reelAlt = [
  "Presentación de un trabajo en un reel de rulos.",
  "Cliente con rodillos durante el proceso de rulos.",
  "Trabajo de rulos en proceso en la barbería.",
  "Resultado de rulos frente al espejo de 17:17.",
  "Resultado de rulos de un cliente en la barbería.",
];
export const rulosReels = reelCodes.map((code, i) => ({
  id: `REEL_RULOS_0${i + 1}`,
  url: `https://www.instagram.com/reel/${code}/`,
  video: `/assets/videos/${code}.mp4`,
  thumbnail: `/assets/media/reel-rulos-0${i + 1}.webp`,
  thumbnailAlt: reelAlt[i],
  title: `Rulos en movimiento · ${String(i + 1).padStart(2, "0")}`,
}));
export const generalReel = {
  url: "https://www.instagram.com/reel/DYDKRodJRS7/",
  title: "Ver un trabajo publicado",
};
export const rulosDetails = {
  includes: "Servicio de rulos permanentes. El corte no está incluido y se cobra por separado.",
  duration: "Aproximadamente 2 horas.",
  conditions: "Consultanos por WhatsApp por el largo y las condiciones de tu cabello. Evaluamos cada caso antes de reservar.",
  description: null,
  care: null,
};
export const rulosProcess = [
  "Consulta / referencia visual",
  "Evaluación del cabello",
  "Trabajo / proceso",
  "Resultado y cuidado",
].map((title, i) => ({
  id: `PROCESO_RULOS_0${i + 1}`,
  title,
  confirmed: false,
  copy: null,
}));
export const homeFaq = [
  ["¿Cómo reservo un turno?", business.booking.url ? "Elegí tu horario desde los botones de agenda en Cal.com. Para dudas sobre un servicio, escribinos por WhatsApp al 0983 402 497." : "Escribinos por WhatsApp al 0983 402 497 para coordinar tu turno."],
  ["¿Cuánto cuesta el corte?", `El corte masculino cuesta Gs. ${services.find(s => s.id === "corte").price.toLocaleString("es-PY")}.`],
  ["¿Cuánto cuestan los rulos permanentes?", `Los rulos permanentes cuestan Gs. ${services.find(s => s.id === "rulos").price.toLocaleString("es-PY")}. El corte se cobra por separado. El servicio dura aproximadamente 2 horas; consultanos por el largo y las condiciones de tu cabello antes de reservar.`],
  ["¿Dónde queda la barbería?", `Estamos en ${business.address}, ${business.city}. Encontrás el enlace a Google Maps en la sección de ubicación.`],
  ["¿Qué días y horarios atienden?", "Atendemos de lunes a sábado, de 8:00 a 21:00."],
  ["¿Puedo consultar por productos para el cabello?", "Sí. Escribinos por los productos de styling y cuidado que buscás. Te confirmamos las opciones, el precio y la disponibilidad por WhatsApp."]
];
export const rulosFaq = [
  homeFaq[2],
  ["¿Los rulos incluyen corte?", "No. Los rulos cuestan Gs. 180.000 y el corte se cobra por separado."],
  ["¿Cuánto tiempo lleva el servicio?", rulosDetails.duration],
  ["¿Qué largo necesito y cuáles son las condiciones?", rulosDetails.conditions],
  homeFaq[0], homeFaq[3], homeFaq[4],
];
// Compatibilidad técnica y cuidados siguen sin confirmar. Largo/condiciones
// se evalúan individualmente; duración e inclusión de corte ya están verificadas.
