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
import { whatsappLink } from "../src/utils.mjs";
import { renderPage } from "../src/pages.mjs";

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
  assert.ok(
    products.every(
      (p) =>
        p.price === null &&
        p.availability === "Consultar" &&
        p.shine === null &&
        p.hold === null,
    ),
  );
  assert.ok(founders.every((f) => !f.name && !f.bio));
  assert.ok(testimonials.every((t) => !t.quote && !t.name));
  assert.ok(rulosReels.every((r) => !r.url));
  const sources = results.map((r) => media[r.media].src).filter(Boolean);
  assert.equal(new Set(sources).size, sources.length);
});
test("Tres páginas estáticas con semántica, SEO y carga ligera", async () => {
  for (const name of ["home", "rulos", "productos"]) {
    const html = renderPage(name);
    assert.equal((html.match(/<h1\b/g) || []).length, 1);
    assert.ok(html.includes("application/ld+json"));
    assert.ok(html.includes("es-PY"));
    assert.doesNotMatch(
      html,
      /Gs\. 80\.000|unsplash|instagram\.com\/embed|<iframe|aggregateRating|reviewCount/,
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
test("Tokens publicados corresponden a DESIGN.md", async () => {
  const design = await readFile("DESIGN.md", "utf8"),
    css = await readFile("public/assets/tokens.css", "utf8");
  for (const [, name, hex] of design.matchAll(
    /^  ([\w-]+): "(#[0-9A-Fa-f]{6})"$/gm,
  ))
    assert.ok(
      css.toLowerCase().includes(`--color-${name}: ${hex.toLowerCase()}`),
      name,
    );
});
