// Única fuente editorial. Reemplazar null con datos confirmados; no inferir claims.
export const business = {
  name: "17:17 Barbería",
  phone: "0983 402 497",
  whatsapp: "595983402497",
  address: "Cap. Dado esq. Gobernador Irala",
  city: "Luque, Paraguay",
  hours: "Lunes–Sábado · 8:00–21:00",
  instagram: "https://www.instagram.com/1717barberia",
  maps: "https://www.google.com/maps/search/Cap.+Dado+esquina+Gobernador+Irala+Luque+Paraguay",
  siteUrl: null, // Confirmar dominio o definir SITE_URL / VERCEL_PROJECT_PRODUCTION_URL al build.
};
export const media = {
  hero: {
    id: "HERO_FOTO_PRINCIPAL",
    type: "hero",
    src: "/assets/media/hero-rulos.webp",
    avif: "/assets/media/hero-rulos.avif",
    width: 1200,
    height: 1200,
    alt: "Rulos y degradado lateral en un trabajo publicado por 17:17",
    position: "50% 62%",
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
    src: "/assets/media/rulos-reel04.webp",
    avif: "/assets/media/rulos-reel04.avif",
    width: 1170,
    height: 2080,
    alt: "Resultado de rulos de un cliente frente al espejo, fotograma real de un reel de 17:17",
    position: "50% 40%",
    source: "https://www.instagram.com/reel/Dcl55RjxJrK/",
  },
  corte: {
    id: "CORTE_RESULTADO_01",
    type: "result",
    src: "/assets/media/corte.webp",
    avif: "/assets/media/corte.avif",
    width: 1200,
    height: 1600,
    alt: "Corte con línea de diseño en el lateral realizado en 17:17",
    position: "50% 48%",
  },
  corte2: {
    id: "CORTE_RESULTADO_02",
    type: "result",
    src: null,
    label: "Próximo corte 17:17",
    ratio: "3/4",
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
    src: null,
    label: "Los detalles del próximo look",
    ratio: "3/4",
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
    src: "/assets/media/local.webp",
    avif: "/assets/media/local.avif",
    width: 960,
    height: 1280,
    alt: "Estación de lavado y espejo en el interior de 17:17",
    position: "50% 45%",
  },
};
export const results = [
  { media: "rulos", category: "Rulos", title: "Rulos + corte lateral" },
  { media: "corte", category: "Cortes", title: "Corte con diseño" },
  { media: "color", category: "Color", title: "Color en primer plano" },
  {
    media: "rulos2",
    category: "Rulos",
    title: "Rulos · fotograma real del reel",
  },
  {
    media: "corte2",
    category: "Cortes",
    title: "Corte · nueva foto pendiente",
  },
  {
    media: "detalle",
    category: "Cortes",
    title: "Detalle · nueva foto pendiente",
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
    summary: "Línea de styling. Presentación exacta pendiente de confirmar.",
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
  image: null,
  price: null,
  availability: "Consultar",
  shine: null,
  hold: null,
  photoId: "PRODUCT_PHOTO_PENDING_" + p.id.toUpperCase(),
}));
export const founders = [1, 2].map((n) => ({
  id: "FUNDADOR_0" + n,
  name: n === 1 ? "Jonatan" : "Esteban",
  role: "Cofundador",
  specialty: null,
  bio: null,
  image: null,
  placeholders: {
    bio: `FUNDADOR_0${n}_BIO_PENDIENTE`,
    image: `FUNDADOR_0${n}_FOTO_PENDIENTE`,
  },
}));
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
  thumbnail: `/assets/media/reel-rulos-0${i + 1}.webp`,
  thumbnailAlt: reelAlt[i],
  title: `Rulos en movimiento · ${String(i + 1).padStart(2, "0")}`,
}));
export const generalReel = {
  url: "https://www.instagram.com/reel/DYDKRodJRS7/",
  title: "Ver un trabajo publicado",
};
export const rulosDetails = {
  includes: null,
  duration: null,
  conditions: null,
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
  [
    "¿Necesito reservar?",
    "Recomendamos reservar por WhatsApp para consultar un horario disponible.",
  ],
  [
    "¿Cuánto cuesta el corte?",
    `El corte masculino cuesta Gs. ${services.find((s) => s.id === "corte").price.toLocaleString("es-PY")}.`,
  ],
  [
    "¿Cuánto cuestan los rulos?",
    `Los rulos permanentes cuestan Gs. ${services.find((s) => s.id === "rulos").price.toLocaleString("es-PY")}.`,
  ],
  ["¿Qué incluye el servicio de rulos?", null],
  ["¿Cuánto tarda el servicio?", null],
  ["¿Cómo tengo que cuidar los rulos?", null],
  [
    "¿Venden productos para el cabello?",
    "Podés consultar por los productos de styling y cuidado. Confirmá precio y disponibilidad por WhatsApp.",
  ],
];
export const rulosFaq = [
  "¿Necesito determinado largo?",
  "¿Se puede hacer en cualquier cabello?",
  "¿Cuánto dura?",
  "¿Cuánto tarda?",
  "¿Qué cuidados necesita?",
  "¿Incluye corte?",
]
  .map((q) => [q, null])
  .concat([homeFaq[0]]);
