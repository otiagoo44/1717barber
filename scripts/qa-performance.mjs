import { createRequire } from "node:module";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { writeFile, mkdir } from "node:fs/promises";
const require = createRequire(resolve(process.env.QA_TOOLS_DIR, "qa.cjs"));
const lighthouse = (
  await import(pathToFileURL(require.resolve("lighthouse")).href)
).default;
const { launch } = await import(
  pathToFileURL(require.resolve("chrome-launcher")).href
);
const out = process.env.QA_OUT || "docs/qa/second-pass";
await mkdir(out, { recursive: true });
const summary = [];
for (const path of ["/", "/rulos", "/productos"]) {
  // Isolate each route's cold profile and renderer from the previous audit.
  const chrome = await launch({
    chromePath: process.env.CHROME_PATH,
    chromeFlags: ["--headless", "--disable-gpu"],
  });
  try {
    const result = await lighthouse(
      (process.env.QA_URL || "http://127.0.0.1:4174") + path,
      {
        port: chrome.port,
        output: "json",
        logLevel: "error",
        onlyCategories: [
          "performance",
          "accessibility",
          "best-practices",
          "seo",
        ],
      },
    );
    await writeFile(
      `${out}/lighthouse-${path === "/" ? "home" : path.slice(1)}.json`,
      result.report,
    );
    const { lhr } = result;
    summary.push({
      path,
      scores: Object.fromEntries(
        Object.entries(lhr.categories).map(([key, v]) => [
          key,
          Math.round(v.score * 100),
        ]),
      ),
      lcp: lhr.audits["largest-contentful-paint"].numericValue,
      tbt: lhr.audits["total-blocking-time"].numericValue,
      cls: lhr.audits["cumulative-layout-shift"].numericValue,
      bytes: lhr.audits["total-byte-weight"].numericValue,
    });
    console.log(JSON.stringify(summary.at(-1)));
  } finally { await chrome.kill(); }
}
  await writeFile(
    out + "/performance-summary.json",
    JSON.stringify(
      {
        date: new Date().toISOString(),
        profile:
          "Lighthouse default mobile simulation on localhost, not field data",
        pages: summary,
      },
      null,
      2,
    ),
  );
