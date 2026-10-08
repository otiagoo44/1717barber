import { mkdir, writeFile, cp, readFile } from "node:fs/promises";
import { renderPage } from "../src/pages.mjs";
import { business } from "../src/data.mjs";
let siteUrl =
  process.env.SITE_URL ||
  business.siteUrl ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? "https://" + process.env.VERCEL_PROJECT_PRODUCTION_URL
    : "");
if (siteUrl) {
  const u = new URL(siteUrl);
  if (u.protocol !== "https:") throw new Error("SITE_URL debe usar https");
  siteUrl = u.origin;
}
await mkdir("dist", { recursive: true });
await cp("public/assets", "dist/assets", { recursive: true });
// Un único CSS evita la cadena bloqueante de @import sin añadir un bundler.
const styles = await Promise.all([
  readFile("public/assets/fonts/fonts.css", "utf8"),
  readFile("public/assets/tokens.css", "utf8"),
  readFile("public/assets/site.css", "utf8"),
]);
await writeFile(
  "dist/assets/site.css",
  styles.join("\n").replace('@import url("/assets/fonts/fonts.css");', ""),
);
for (const [name, path] of [
  ["home", "index.html"],
  ["rulos", "rulos/index.html"],
  ["productos", "productos/index.html"],
]) {
  const html = renderPage(name, siteUrl);
  const folder = path.split("/").slice(0, -1).join("/");
  if (folder) {
    await mkdir(folder, { recursive: true });
    await mkdir("dist/" + folder, { recursive: true });
  }
  await writeFile(path, html);
  await writeFile("dist/" + path, html);
  console.log(`${path}: ${Buffer.byteLength(html)} bytes`);
}
await writeFile(
  "dist/robots.txt",
  "User-agent: *\nAllow: /\n" +
    (siteUrl ? `Sitemap: ${siteUrl}/sitemap.xml\n` : ""),
);
if (siteUrl)
  await writeFile(
    "dist/sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${["/", "/rulos", "/productos"].map((path) => `<url><loc>${siteUrl + path}</loc></url>`).join("")}</urlset>`,
  );
else {
  const { rm } = await import("node:fs/promises");
  await rm("dist/sitemap.xml", { force: true });
  console.log(
    "Dominio no confirmado: canonical, og:url y sitemap se activan con SITE_URL o VERCEL_PROJECT_PRODUCTION_URL.",
  );
}
