// Comprobación del acabado final; mismas herramientas externas que qa-browser.mjs.
import { createRequire } from "node:module";
import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import assert from "node:assert/strict";
const require = createRequire(resolve(process.env.QA_TOOLS_DIR, "qa.cjs"));
const browser = await require("puppeteer-core").launch({
  executablePath: process.env.CHROME_PATH,
  headless: true,
});
const page = await browser.newPage();
const base = process.env.QA_URL || "http://127.0.0.1:4174";
const report = { pages: [], motion: {}, overlays: [] };
try {
  for (const path of ["/", "/rulos", "/productos"]) {
    await page.setViewport({
      width: 390,
      height: 900,
      isMobile: true,
      hasTouch: true,
    });
    await page.goto(base + path, { waitUntil: "networkidle0" });
    const targets = await page.evaluate(() =>
      [...document.querySelectorAll("a,button,summary")]
        .filter(
          (el) =>
            el.getClientRects().length && !el.classList.contains("skip-link"),
        )
        .map((el) => ({
          text: el.textContent.trim(),
          height: el.getBoundingClientRect().height,
          width: el.getBoundingClientRect().width,
        })),
    );
    assert.ok(
      targets.every((t) => t.height >= 44 && t.width >= 44),
      JSON.stringify(targets.filter((t) => t.height < 44 || t.width < 44)),
    );
    for (const summary of await page.$$("summary")) {
      await summary.click();
      assert.ok(await summary.evaluate((el) => el.parentElement.open));
      await summary.click();
      assert.equal(
        await summary.evaluate((el) => el.parentElement.open),
        false,
      );
    }
    report.pages.push({
      path,
      targets: targets.length,
      minimumTargetHeight: Math.min(...targets.map((t) => t.height)),
      faqCount: (await page.$$("summary")).length,
    });
    await page.emulateMediaFeatures([
      { name: "prefers-reduced-motion", value: "reduce" },
    ]);
    await page.$eval("#reservar", (el) => el.scrollIntoView());
    await page.screenshot({
      path: `docs/qa/after/${path === "/" ? "home" : path.slice(1)}-final-390.png`,
    });
    await page.emulateMediaFeatures([]);
  }
  await page.goto(base, { waitUntil: "networkidle0" });
  report.motion.supported = await page.evaluate(() =>
    CSS.supports("animation-timeline: scroll(root)"),
  );
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
  });
  const initial = await page.$eval(
    ".site-header",
    (el) => getComputedStyle(el, "::after").transform,
  );
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise((r) => setTimeout(r, 450));
  const final = await page.$eval(
    ".site-header",
    (el) => getComputedStyle(el, "::after").transform,
  );
  if (report.motion.supported) assert.notEqual(initial, final);
  report.motion.progress = { initial, final };
  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "reduce" },
  ]);
  assert.equal(
    await page.$eval(
      ".site-header",
      (el) => getComputedStyle(el, "::after").display,
    ),
    "none",
  );
  report.motion.reducedProgressHidden = true;
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.click(".menu-toggle");
  await page.screenshot({ path: "docs/qa/after/menu-390.png" });
  await page.keyboard.press("Escape");
  await page.click(".photo-trigger");
  await page.screenshot({ path: "docs/qa/after/lightbox-390.png" });
  await page.keyboard.press("Escape");
  report.overlays = ["Menú", "Lightbox"];
  await page.setViewport({ width: 1440, height: 900 });
  await page.$eval("#reservar", (el) => el.scrollIntoView());
  await page.screenshot({ path: "docs/qa/after/home-final-1440.png" });
  report.status = "passed";
  await writeFile("docs/qa/polish-qa.json", JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
} finally {
  await browser.close();
}
