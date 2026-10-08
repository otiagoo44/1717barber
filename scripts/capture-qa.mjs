import { createRequire } from "node:module";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";
if (!process.env.QA_TOOLS_DIR || !process.env.CHROME_PATH)
  throw new Error("Definir QA_TOOLS_DIR y CHROME_PATH.");
const require = createRequire(resolve(process.env.QA_TOOLS_DIR, "qa.cjs")),
  puppeteer = require("puppeteer-core");
const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH,
  headless: true,
});
const page = await browser.newPage();
const out = process.env.QA_OUT || "docs/qa/second-pass/after";
await mkdir(out, { recursive: true });
const base = process.env.QA_URL || "http://127.0.0.1:4174";
try {
  for (const path of ["", "rulos", "productos"])
    for (const width of [375, 390, 430, 768, 1024, 1440]) {
      await page.setViewport({
        width,
        height: 900,
        isMobile: width < 500,
        hasTouch: width < 500,
      });
      await page.goto(base + "/" + path, { waitUntil: "networkidle0" });
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({
        path: `${out}/${path || "home"}-${width}-viewport.png`,
      });
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 800) {
          window.scrollTo({ top: y, behavior: "instant" });
          await new Promise((r) => setTimeout(r, 100));
        }
        [...document.images].forEach((img) => (img.loading = "eager"));
        await Promise.all(
          [...document.images].map((img) => img.decode().catch(() => {})),
        );
        window.scrollTo({ top: 0, behavior: "instant" });
      });
      await new Promise((r) => setTimeout(r, 800));
      await page.screenshot({
        path: `${out}/${path || "home"}-${width}-full.png`,
        fullPage: true,
      });
      console.log(`${path || "home"} ${width}: captura real guardada`);
    }
  for (const width of [390, 1440]) {
    await page.setViewport({
      width,
      height: 900,
      isMobile: width < 500,
      hasTouch: width < 500,
    });
    await page.goto(base, { waitUntil: "networkidle0" });
    await page.emulateMediaFeatures([
      { name: "prefers-reduced-motion", value: "reduce" },
    ]);
    for (const id of [
      "galeria",
      "rulos",
      "servicios",
      "prueba-rulos-home",
      "nosotros",
      "productos",
      "ubicacion",
    ]) {
      await page.evaluate((id) => {
        window.scrollTo(
          0,
          document.querySelector("#" + id).getBoundingClientRect().top +
            scrollY -
            90,
        );
      }, id);
      await new Promise((r) => setTimeout(r, 180));
      await page.screenshot({ path: `${out}/section-${id}-${width}.png` });
    }
    await page.$eval(".founder-grid", (el) =>
      el.scrollIntoView({ block: "center", behavior: "instant" }),
    );
    await page.screenshot({ path: `${out}/founders-equal-${width}.png` });
  }
} finally {
  await browser.close();
}
