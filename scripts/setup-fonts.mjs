import { readFile, writeFile } from "node:fs/promises";
const dir = "public/assets/fonts";
const raw = await (
  await fetch(
    "https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400..600&display=swap",
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
      },
      signal: AbortSignal.timeout(15000),
    },
  )
).text();
let css = [...raw.matchAll(/\/\* latin \*\/\s*(@font-face\s*\{[^}]+\})/g)]
  .map((m) => m[1])
  .join("\n");
if (!css.includes("Archivo Black") || !css.includes("Inter"))
  throw Error("Fuentes no recibidas");
for (const face of css.matchAll(/@font-face\s*\{[^}]+\}/g)) {
  const url = face[0].match(/url\(([^)]+)\)/)[1];
  const name = face[0].includes("Archivo Black")
    ? "archivo-black-latin.woff2"
    : "inter-latin.woff2";
  await writeFile(
    dir + "/" + name,
    Buffer.from(
      await (
        await fetch(url, { signal: AbortSignal.timeout(15000) })
      ).arrayBuffer(),
    ),
  );
  css = css.split(url).join("/assets/fonts/" + name);
}
css +=
  '\n@font-face{font-family:"17:17 Wordmark";font-style:normal;font-weight:600;font-display:swap;src:url(/assets/fonts/barlow-condensed-600-latin.woff2) format("woff2")}\n';
await writeFile(dir + "/fonts.css", css);
for (const font of ["archivoblack", "inter"]) {
  const r = await fetch(
    "https://raw.githubusercontent.com/google/fonts/main/ofl/" +
      font +
      "/OFL.txt",
    { signal: AbortSignal.timeout(15000) },
  );
  if (!r.ok) throw Error("Licencia " + font);
  await writeFile(
    dir + "/OFL-" + font + ".txt",
    (await r.text()).replace(/[ \t]+$/gm, ""),
  );
}
console.log(
  "Archivo Black Latin + Inter variable Latin (400–600), OFL y wordmark original locales.",
);
