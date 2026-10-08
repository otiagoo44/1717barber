// QA reproducible, dependencias fuera del bundle: puppeteer-core y @axe-core/puppeteer.
// QA_TOOLS_DIR debe apuntar a un directorio con node_modules; CHROME_PATH al navegador.
import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import assert from "node:assert/strict";
if (!process.env.QA_TOOLS_DIR || !process.env.CHROME_PATH)
  throw new Error(
    "Definir QA_TOOLS_DIR y CHROME_PATH. No se instalan dependencias de QA en la aplicación.",
  );
const require = createRequire(resolve(process.env.QA_TOOLS_DIR, "qa.cjs"));
const puppeteer = require("puppeteer-core");
const { AxePuppeteer } = require("@axe-core/puppeteer");
const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH,
  headless: true,
});
const base = process.env.QA_URL || "http://127.0.0.1:4174";
const out = "docs/qa";
await mkdir(out, { recursive: true });
const report = {
  date: new Date().toISOString(),
  pages: [],
  interactions: [],
  ctaClicks: [],
  externalChecks: [],
  limitations: [
    "Viewport y touch emulados en Chrome, no dispositivo físico.",
    "Clicks externos interceptados para verificar destino y mensaje sin enviar una conversación.",
  ],
};
try {
  const page = await browser.newPage();
  const errors = [];
  const failed = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("requestfailed", (request) =>
    failed.push({ url: request.url(), reason: request.failure()?.errorText }),
  );
  for (const path of ["/", "/rulos", "/productos"]) {
    for (const width of [375, 390, 430, 768, 1440]) {
      await page.setViewport({
        width,
        height: 900,
        isMobile: width < 500,
        hasTouch: width < 500,
      });
      await page.goto(base + path, { waitUntil: "networkidle0" });
      await page.evaluate(() => document.fonts.ready);
      const metrics = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        width: innerWidth,
        h1: document.querySelectorAll("h1").length,
        iframes: document.querySelectorAll("iframe").length,
        assets: performance
          .getEntriesByType("resource")
          .map((r) => ({
            name: r.name,
            bytes: r.transferSize,
            duration: r.duration,
          })),
        overflowElements: [...document.querySelectorAll("main *")]
          .filter((el) => {
            const r = el.getBoundingClientRect();
            return r.width > 0 && (r.right > innerWidth + 1 || r.left < -1);
          })
          .map((el) => el.tagName + "." + el.className),
      }));
      assert.equal(
        metrics.scrollWidth,
        metrics.width,
        path + " " + width + " overflow",
      );
      assert.equal(metrics.h1, 1);
      assert.equal(metrics.iframes, 0);
      assert.deepEqual(metrics.overflowElements, []);
      assert.ok(
        metrics.assets.every((r) => r.name.startsWith(base)),
        "Sin recursos externos iniciales",
      );
      const axe = await new AxePuppeteer(page)
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      report.pages.push({
        path,
        width,
        metrics,
        axeViolations: axe.violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          nodes: v.nodes.map((n) => n.target),
        })),
      });
    }
    // Todos los links reales: click nativo, capturando destino sin abrir una aplicación externa.
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(base + path, { waitUntil: "networkidle0" });
    await page.evaluate(() => {
      window.__clicks = [];
      document.addEventListener(
        "click",
        (ev) => {
          const a = ev.target.closest("a");
          if (a) {
            ev.preventDefault();
            window.__clicks.push({
              href: a.href,
              text: a.textContent.trim(),
              intent: a.dataset.intent || null,
            });
          }
        },
        true,
      );
    });
    await page.emulateMediaFeatures([
      { name: "prefers-reduced-motion", value: "reduce" },
    ]);
    const anchors = await page.$$("a:not(.skip-link)");
    for (let i = 0; i < anchors.length; i++) {
      const a = anchors[i];
      const visible = await a.evaluate(
        (el) =>
          !!el.getClientRects().length &&
          getComputedStyle(el).visibility !== "hidden",
      );
      if (!visible) continue;
      const href = await a.evaluate((el) => el.href);
      if (href.startsWith(base)) {
        const u = new URL(href);
        const target = await browser.newPage();
        const res = await target.goto(href, { waitUntil: "domcontentloaded" });
        assert.equal(res.status(), 200, href);
        if (u.hash) assert.ok(await target.$(u.hash), href);
        await target.close();
      } else {
        const url = new URL(href);
        assert.ok(
          ["wa.me", "www.instagram.com", "www.google.com"].includes(
            url.hostname,
          ),
          href,
        );
        if (url.hostname === "wa.me") {
          assert.equal(url.pathname, "/595983402497");
          assert.ok(url.searchParams.get("text"));
        }
      }
      await a.evaluate((el) => el.scrollIntoView({ block: "center" }));
      await a.click();
    }
    report.ctaClicks.push({
      path,
      clicks: await page.evaluate(() => window.__clicks),
    });
    console.log(path + ": enlaces e interacciones de CTA verificados");
  }
  await page.setViewport({
    width: 390,
    height: 844,
    isMobile: true,
    hasTouch: true,
  });
  await page.goto(base, { waitUntil: "networkidle0" });
  await page.click(".menu-toggle");
  assert.ok(await page.$eval("#mobile-menu", (el) => el.open));
  assert.equal(
    await page.$eval(".menu-toggle", (el) => el.getAttribute("aria-expanded")),
    "true",
  );
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press("Tab");
    assert.ok(
      await page.evaluate(() =>
        document.querySelector("#mobile-menu").contains(document.activeElement),
      ),
    );
  }
  await page.keyboard.press("Escape");
  assert.equal(await page.$eval("#mobile-menu", (el) => el.open), false);
  assert.equal(
    await page.evaluate(() => document.activeElement.className),
    "menu-toggle",
  );
  await page.click(".menu-toggle");
  await page.click(".close-menu");
  assert.equal(await page.$eval("#mobile-menu", (el) => el.open), false);
  await page.click(".menu-toggle");
  await page.click('#mobile-menu a[href="/#servicios"]');
  await page.waitForFunction(() => location.hash === "#servicios");
  assert.equal(await page.$eval("#mobile-menu", (el) => el.open), false);
  report.interactions.push(
    "Menú: abrir/cerrar, Escape, navegación por ancla, foco atrapado y restaurado.",
  );
  await page.goto(base, { waitUntil: "networkidle0" });
  for (const category of ["Rulos", "Cortes", "Color", "Todos"]) {
    await page.click(`[data-gallery-filter="${category}"]`);
    const visible = await page.$$eval(".portfolio .result-tile", (els) =>
      els.filter((el) => !el.hidden).map((el) => el.dataset.category),
    );
    assert.ok(visible.length > 0);
    if (category !== "Todos") assert.ok(visible.every((c) => c === category));
  }
  report.interactions.push(
    "Filtros de galería: Todos/Rulos/Cortes/Color, estado aria y resultados.",
  );
  await page.click(".photo-trigger");
  assert.ok(await page.$eval("#lightbox", (el) => el.open));
  const title = await page.$eval("#lightbox-title", (el) => el.textContent);
  await page.keyboard.press("ArrowRight");
  assert.notEqual(
    await page.$eval("#lightbox-title", (el) => el.textContent),
    title,
  );
  await page.keyboard.press("ArrowLeft");
  assert.equal(
    await page.$eval("#lightbox-title", (el) => el.textContent),
    title,
  );
  for (let i = 0; i < 8; i++) {
    await page.keyboard.press("Tab");
    assert.ok(
      await page.evaluate(() =>
        document.querySelector("#lightbox").contains(document.activeElement),
      ),
    );
  }
  await page.keyboard.press("Escape");
  assert.equal(await page.$eval("#lightbox", (el) => el.open), false);
  assert.equal(
    await page.evaluate(() => document.activeElement.className),
    "photo-trigger",
  );
  await page.click(".photo-trigger");
  await page.click("[data-lightbox-next]");
  await page.click("[data-lightbox-prev]");
  await page.click("[data-lightbox-close]");
  await page.click(".photo-trigger");
  await page.mouse.click(2, 2);
  assert.equal(await page.$eval("#lightbox", (el) => el.open), false);
  await page.click(".photo-trigger");
  const beforeSwipe = await page.$eval(
    "#lightbox-title",
    (el) => el.textContent,
  );
  const holder = await page.$(".lightbox-media"),
    box = await holder.boundingBox();
  const cdp = await page.createCDPSession();
  const x = box.x + box.width * 0.75,
    y = box.y + box.height / 2;
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [{ x, y }],
  });
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchMove",
    touchPoints: [{ x: x - 100, y }],
  });
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchEnd",
    touchPoints: [],
  });
  assert.notEqual(
    await page.$eval("#lightbox-title", (el) => el.textContent),
    beforeSwipe,
  );
  await page.keyboard.press("Escape");
  report.interactions.push(
    "Lightbox: botones, flechas, Escape, exterior, focus trap, retorno de foco y swipe emulado.",
  );
  await page.click(".faq-list summary");
  assert.ok(await page.$eval(".faq-list details", (el) => el.open));
  await page.focus(".faq-list summary");
  await page.keyboard.press("Enter");
  assert.equal(await page.$eval(".faq-list details", (el) => el.open), false);
  report.interactions.push("FAQ: click y teclado con details nativo.");
  await page.goto(base + "/productos", { waitUntil: "networkidle0" });
  for (const category of ["Pomadas / Ceras", "Textura", "Barba", "Todos"]) {
    await page.click(`[data-product-filter="${category}"]`);
    const visible = await page.$$eval(".catalog-section .product-item", (els) =>
      els.filter((el) => !el.hidden).map((el) => el.dataset.productCategory),
    );
    assert.ok(visible.length);
    if (category !== "Todos") assert.ok(visible.every((c) => c === category));
  }
  report.interactions.push(
    "Filtros productos: cuatro categorías y estados aria.",
  );
  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "reduce" },
  ]);
  await page.goto(base, { waitUntil: "networkidle0" });
  const reduced = await page.evaluate(() => ({
    matches: matchMedia("(prefers-reduced-motion:reduce)").matches,
    scroll: getComputedStyle(document.documentElement).scrollBehavior,
    transitions: getComputedStyle(document.querySelector(".button"))
      .transitionDuration,
  }));
  assert.ok(reduced.matches);
  assert.equal(reduced.scroll, "auto");
  assert.equal(reduced.transitions, "0s");
  report.reducedMotion = reduced;
  await page.emulateMediaFeatures([]);
  await page.setJavaScriptEnabled(false);
  await page.goto(base, { waitUntil: "networkidle0" });
  assert.ok(
    await page.$eval(
      "main",
      (el) => getComputedStyle(el).visibility === "visible",
    ),
  );
  assert.ok(
    await page.$eval(".hero .button", (el) => el.href.includes("wa.me")),
  );
  report.interactions.push(
    "Sin JS: contenido, enlaces y FAQ renderizados. Menú y filtros requieren JS.",
  );
  await page.setJavaScriptEnabled(true);
  for (const url of [
    "https://wa.me/595983402497",
    "https://www.instagram.com/1717barberia",
    "https://www.google.com/maps/search/Cap.+Dado+esquina+Gobernador+Irala+Luque+Paraguay",
  ]) {
    const target = await browser.newPage();
    try {
      const res = await target.goto(url, {
        waitUntil: "domcontentloaded",
        timeout: 20000,
      });
      report.externalChecks.push({
        requested: url,
        final: target.url(),
        status: res?.status(),
      });
    } catch (error) {
      report.externalChecks.push({ requested: url, error: error.message });
    } finally {
      await target.close();
    }
  }
  report.consoleErrors = errors;
  report.abortedRequests = failed.filter(
    (r) => r.reason === "net::ERR_ABORTED",
  );
  report.failedRequests = failed.filter((r) => r.reason !== "net::ERR_ABORTED");
  assert.deepEqual(errors, []);
  assert.deepEqual(report.failedRequests, []);
  const violations = report.pages.flatMap((p) => p.axeViolations);
  report.status = violations.length ? "issues" : "passed";
  await writeFile(out + "/browser-qa.json", JSON.stringify(report, null, 2));
  assert.equal(violations.length, 0, "Axe encontró problemas; revisar reporte");
  console.log(
    JSON.stringify(
      {
        status: report.status,
        viewports: report.pages.length,
        ctaClicks: report.ctaClicks.reduce((n, p) => n + p.clicks.length, 0),
        interactions: report.interactions.length,
        externalChecks: report.externalChecks,
      },
      null,
      2,
    ),
  );
} catch (error) {
  report.status = "failed";
  report.error = error.stack;
  await writeFile(out + "/browser-qa.json", JSON.stringify(report, null, 2));
  throw error;
} finally {
  await browser.close();
}
