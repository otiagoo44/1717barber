import test from "node:test";
import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import {
  business,
  services,
  products,
  results,
  media,
  rulosReels,
  founders,
  testimonials,
} from "../src/data.mjs";
import { whatsappLink, bookingLink, serviceBookingLink } from "../src/utils.mjs";
import { renderPage } from "../src/pages.mjs";
import {workAssets} from "../src/work-assets.mjs";

test("Datos comerciales preservados y precios actuales", () => {
  assert.equal(business.whatsapp, "595983402497");
  assert.equal(business.address, "Cap. Dado esq. Gobernador Irala");
  assert.deepEqual(
    services.map((s) => [s.id, s.price]),
    [
      ["rulos", 180000],
      ["corte", 30000],
      ["tinte", 200000],
      ["barba", 30000],
      ["infantil", 30000],
      ["cejas", 10000],
      ["lavado", 10000],
    ],
  );
});
test("WhatsApp codifica intención y producto sin mezclar mensajes", () => {
  for (const s of services) {
    const u = new URL(whatsappLink({ intent: s.intent, service: s.id }));
    assert.equal(u.pathname, "/595983402497");
    assert.ok(u.searchParams.get("text").length > 20);
  }
  assert.match(
    new URL(whatsappLink({ intent: "RULOS" })).searchParams.get("text"),
    /vi Rulos 17:17/,
  );
  for (const p of products)
    assert.equal(
      new URL(whatsappLink({ product: p })).searchParams.get("text"),
      `Hola, vi ${p.name} en la web de 17:17. ¿Tienen disponible?`,
    );
});
test("Sin prueba, stock ni información técnica inventada", () => {
  assert.deepEqual(
    rulosReels.map((r) => r.id),
    Array.from({ length: 5 }, (_, i) => `REEL_RULOS_0${i + 1}`),
  );
  assert.ok(
    products.every(
      (p) =>
        p.price === null &&
        p.availability === "Consultar" &&
        p.shine === null &&
        p.hold === null,
    ),
  );
  assert.deepEqual(
    founders.map((f) => f.name),
    ["Jonatan", "Esteban"],
  );
  assert.ok(founders.every((f) => f.role === "Cofundador" && f.bio && f.bioSource && f.specialty === null));
  assert.ok(testimonials.every((t) => !t.quote && !t.name));
  assert.deepEqual(
    rulosReels.map((r) => new URL(r.url).pathname.split("/")[2]),
    ["DeDQr0cuhey", "Dd903THBe7y", "DdrxU3CBZ2A", "Dcl55RjxJrK", "DceM8azzYuV"],
  );
  const sources = results.map((r) => media[r.media].src).filter(Boolean);
  assert.equal(new Set(sources).size, sources.length);
});
test("Recorrido enfocado y regreso al inicio en páginas secundarias", () => {
  const home = renderPage("home");
  const ids = [
    "inicio",
    "rulos",
    "servicios",
    "galeria",
    "nosotros",
    "productos",
    "ubicacion",
    "faq",
    "reservar",
  ];
  const positions = ids.map((id) => home.indexOf(`id="${id}"`));
  assert.ok(positions.every((n, i) => n >= 0 && (!i || n > positions[i - 1])));
  assert.equal((home.match(/class="reel-item"/g) || []).length, 0);
  assert.equal(
    (renderPage("rulos").match(/class="reel-item"/g) || []).length,
    5,
  );
  for (const name of ["home", "rulos", "productos"]) {
    const html = renderPage(name),
      nav = html.match(/<nav class="desktop-nav".*?<\/nav>/)[0];
    assert.equal((nav.match(/<a /g) || []).length, 5);
    assert.ok(html.includes('href="/" aria-label="17:17'));
    assert.doesNotMatch(html, /data-placeholder|Respuesta pendiente|Especialidad pendiente|Foto de producto pendiente|hero-inset/);
    if (name !== "home") assert.ok(html.includes("Volver a 17:17"));
  }
});
test("Cinco páginas estáticas con semántica, SEO y carga ligera", async () => {
  for (const name of ["home", "rulos", "productos", "reservar", "trabajos"]) {
    const html = renderPage(name);
    assert.equal((html.match(/<h1\b/g) || []).length, 1);
    assert.ok(html.includes("application/ld+json"));
    assert.ok(html.includes("es-PY"));
    assert.doesNotMatch(
      html,
      /unsplash|instagram\.com\/embed|<iframe|aggregateRating|reviewCount/,
    );
    const schema = JSON.parse(
      html.match(/<script type="application\/ld\+json">(.*?)<\/script>/)[1],
    );
    assert.equal(schema.address.addressLocality, "Luque");
    assert.equal(schema.openingHoursSpecification.closes, "21:00");
    for (const [, path] of html.matchAll(/(?:src|href)="(\/assets\/[^"?]+)"/g))
      await access("public" + path);
    const canonical = renderPage(name, "https://example.test");
    assert.match(canonical, /rel="canonical"/);
    assert.ok(
      canonical.includes("https://example.test/assets/media/equipo.webp"),
    );
  }
});
test("Agenda selecciona servicio antes de abrir un evento externo", () => {
  assert.equal(bookingLink(), "/reservar");
  for (const name of ["home", "rulos", "productos"]) {
    const html = renderPage(name);
    const links = [...html.matchAll(/<a\b([^>]+)>/g)].map(([, attrs]) => attrs);
    assert.ok(links.some(a => a.includes('data-cta="reservar"')));
    for (const attrs of links) {
      if (attrs.includes('data-cta="reservar"')) assert.ok(attrs.includes('href="/reservar"'));
      if (attrs.includes('data-cta="producto"') || attrs.includes('data-cta="servicio"')) assert.match(attrs, /href="https:\/\/wa\.me\//);
    }
    assert.doesNotMatch(html, /barberia_id|service_role|CAL_API_KEY|CAL_SECRET|landing_token/);
  }
  assert.deepEqual(services.map(s => [s.id,s.durationMinutes]), [["rulos",120],["corte",40],["tinte",120],["barba",40],["infantil",40],["cejas",40],["lavado",10]]);
  for (const service of services) assert.match(serviceBookingLink(service.id), /^https:\/\/wa\.me\/595983402497/);
  const event = {url:business.booking.url,durationMinutes:40,location:"inPerson",assignment:"roundRobin",verified:true};
  const config = {serviceEvents:{corte:event,rulos:{...event,durationMinutes:120}}};
  assert.equal(serviceBookingLink("corte",config),business.booking.url);
  assert.match(serviceBookingLink("rulos",config),/wa\.me/);
  for (const invalid of [{durationMinutes:120},{location:"calVideo"},{assignment:"collective"},{verified:false},{url:"https://example.test"},{url:"https://cal.com.evil.test/corte"},{url:"http://cal.com/corte"}]) {
    assert.throws(() => serviceBookingLink("corte",{serviceEvents:{corte:{...event,...invalid}}}));
  }
  assert.throws(() => serviceBookingLink("rulos+corte"),/desconocido/);
  const html = renderPage("reservar");
  assert.equal((html.match(/class="booking-service"/g)||[]).length,7);
  assert.doesNotMatch(html, /Cal Video|barberia_id|service_role|CAL_API_KEY/);
  assert.ok(html.includes("2 horas"));
});
test("Galería ampliada publica material real sin reseñas inventadas ni video inicial", async () => {
  assert.equal(workAssets.filter(w=>w.type==='photo').length,26);
  assert.equal(workAssets.filter(w=>w.type==='video').length,11);
  assert.equal(new Set(workAssets.map(w=>w.source)).size,workAssets.length);
  for (const item of workAssets) {
    await access(item.source);
    await access('public'+item.image);
    await access('public'+item.avif);
    if(item.type==='video'){await access('public'+item.video);assert.ok(item.durationSeconds>0);}
  }
  const html=renderPage('trabajos');
  assert.equal((html.match(/class="result-tile work-card"/g)||[]).length,43);
  assert.equal((html.match(/class="reel-facade"/g)||[]).length,16);
  assert.doesNotMatch(html,/<video|autoplay|aggregateRating|reviewCount|<blockquote|testimonio/);
  assert.ok(html.includes('data-work-more hidden'));
  assert.ok(renderPage('home').includes('href="/trabajos"'));
  assert.ok(renderPage('rulos').includes('/trabajos?categoria=Rulos'));
});
test("Tokens publicados corresponden a DESIGN.md", async () => {
  const design = await readFile("DESIGN.md", "utf8"),
    css = await readFile("public/assets/tokens.css", "utf8");
  for (const [, name, hex] of design.matchAll(
    /^  ([\w-]+): "(#[0-9A-Fa-f]{6})"$/gm,
  ))
    assert.ok(
      css.toLowerCase().includes(`--color-${name.toLowerCase()}: ${hex.toLowerCase()}`),
      name,
    );
});
