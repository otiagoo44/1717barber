import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
const require = createRequire(resolve(process.env.QA_TOOLS_DIR, "qa.cjs"));
const browser = await require("puppeteer-core").launch({
  executablePath: process.env.CHROME_PATH,
  headless: true,
});
const out = "docs/qa/second-pass";
await mkdir(out, { recursive: true });
let page = await browser.newPage();
try {
  if (!process.argv.includes("--type-only")) {
    for (const path of ["", "rulos", "productos"])
      for (const width of [390, 1440]) {
        await page.setViewport({ width, height: 900 });
        await page.goto("http://127.0.0.1:4174/" + path, {
          waitUntil: "networkidle0",
        });
        await page.emulateMediaFeatures([
          { name: "prefers-reduced-motion", value: "reduce" },
        ]);
        await page.evaluate(async () => {
          for (let y = 0; y < document.body.scrollHeight; y += 800) {
            scrollTo(0, y);
            await new Promise((r) => setTimeout(r, 40));
          }
          scrollTo(0, 0);
        });
        await page.screenshot({
          path: `${out}/before-${path || "home"}-${width}.png`,
          fullPage: true,
        });
      }
    for (const width of [1440, 390]) {
      await page.setViewport({ width, height: 900 });
      await page.goto("https://skinexpert-nine.vercel.app/", {
        waitUntil: "networkidle2",
        timeout: 30000,
      });
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 650) {
          scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 150));
        }
        scrollTo(0, 0);
      });
      await page.screenshot({
        path: `${out}/reference-skin-${width}.png`,
        fullPage: true,
      });
    }
    await writeFile(
      `${out}/skin-observations.json`,
      JSON.stringify(
        await page.evaluate(() => ({
          title: document.title,
          headings: [...document.querySelectorAll("h1,h2")].map(
            (e) => e.innerText,
          ),
          nav: [...document.querySelectorAll("header a")].map(
            (e) => e.innerText,
          ),
        })),
        null,
        2,
      ),
    );
  }
  await page.close();
  page = await browser.newPage();
  const candidates = [
    [
      "barlow-manrope",
      "Barlow Condensed",
      "Manrope",
      "Barlow+Condensed:wght@600&family=Manrope:wght@400;600",
      600,
    ],
    [
      "archivo-inter",
      "Archivo Black",
      "Inter",
      "Archivo+Black&family=Inter:wght@400;600",
      400,
    ],
    [
      "outfit-work",
      "Outfit",
      "Work Sans",
      "Outfit:wght@800&family=Work+Sans:wght@400;600",
      800,
    ],
  ];
  const loaded = new Map();
  for (const [id, display, body, query, weight] of candidates)
    for (const width of [390, 1440]) {
      if (!loaded.has(id)) {
        const raw = await (
          await fetch(
            "https://fonts.googleapis.com/css2?family=" +
              query +
              "&display=swap",
            {
              headers: {
                "User-Agent":
                  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
              },
              signal: AbortSignal.timeout(15000),
            },
          )
        ).text();
        let css = [
          ...raw.matchAll(/\/\* latin \*\/\s*(@font-face\s*\{[^}]+\})/g),
        ]
          .map((m) => m[1])
          .join("\n");
        for (const url of new Set(
          [...css.matchAll(/url\(([^)]+)\)/g)].map((m) => m[1]),
        )) {
          const data = Buffer.from(
            await (
              await fetch(url, { signal: AbortSignal.timeout(15000) })
            ).arrayBuffer(),
          ).toString("base64");
          css = css.split(url).join("data:font/woff2;base64," + data);
        }
        loaded.set(id, css);
      }
      await page.setViewport({ width, height: 900 });
      await page.setContent(
        `<!doctype html><meta charset="utf-8"><style>${loaded.get(id)}</style><style>*{box-sizing:border-box}body{margin:0;background:#080808;color:#f4f0e8;font-family:'${body}',sans-serif;padding:32px}header{display:flex;justify-content:space-between;border-bottom:1px solid #66645f;padding-bottom:24px;font-size:14px}section{display:grid;grid-template-columns:1.3fr 1fr;gap:32px;padding-top:50px}h1,h2,strong{font-family:'${display}',sans-serif;font-weight:${weight};text-transform:uppercase;line-height:1;margin:0;letter-spacing:-.035em}h1{font-size:clamp(46px,6.5vw,104px)}p{font-size:18px;line-height:1.6;max-width:40ch}img{width:100%;height:420px;object-fit:cover}.label{font-size:13px;letter-spacing:.12em;color:#c49a3c}h2{font-size:clamp(60px,8vw,130px);margin-top:48px}strong{font-size:56px;color:#c49a3c}button{font:600 15px '${body}';background:#c49a3c;padding:18px 24px;border:0}@media(max-width:600px){body{padding:20px}section{display:block}img{height:250px;margin-top:32px}h1{font-size:46px}h2{font-size:68px}}</style><header>17:17 BARBERÍA · LUQUE <span>${display} + ${body}</span></header><section><div><p class="label">CORTES · RULOS · COLOR</p><h1>Tu próximo look<br>empieza acá.</h1><p>Cortes, rulos, color y cuidado para llevar tu estilo más lejos.</p><button>Reservar turno ↗</button><h2>Rulos 17:17</h2><strong>Gs. 180.000</strong></div><img src="http://127.0.0.1:4174/assets/media/hero-rulos.webp" alt="Resultado real"></section>`,
        { waitUntil: "domcontentloaded" },
      );
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({
        path: `${out}/type-${id}-${width}.png`,
        fullPage: true,
      });
    }
  console.log("Baseline, Skin Expert y tres parejas tipográficas capturadas.");
} finally {
  await browser.close();
}
