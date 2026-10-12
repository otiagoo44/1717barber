// Optional media maintenance; Sharp is external and never required by deploy.
import { createRequire } from "node:module";
import { resolve } from "node:path";
import { execFileSync } from "node:child_process";
import { mkdir, readFile, writeFile, stat } from "node:fs/promises";
import { createHash } from "node:crypto";

const require = createRequire(resolve(process.env.QA_TOOLS_DIR, "qa.cjs"));
const sharp = require("sharp");
const out = "public/assets/media";
const temp = resolve(process.env.TEMP, "1717-featured-images");
await mkdir(temp, { recursive: true });
const entries = [
  {
    name: "hero-corte-principal",
    source: "img/fotos-cortes-rulos/WhatsApp Image 2026-10-11 at 14.21.20.jpeg",
    variants: [360, 600, 900],
  },
  {
    name: "rulos-proceso-destacado",
    source: "img/fotos-cortes-rulos/WhatsApp Image 2026-10-11 at 14.20.50.jpeg",
    variants: [360, 600, 900],
  },
  {
    name: "rulos-hero-ultimo-segundo",
    source: "img/fotos-cortes-rulos/WhatsApp Video 2026-10-11 at 14.20.59.mp4",
    time: 4.8, // Video duration: 5.1 seconds; selected for clear curls.
    variants: [360],
  },
];
const report = [];
for (const entry of entries) {
  let input = entry.source;
  if (entry.time !== undefined) {
    input = resolve(temp, entry.name + ".png");
    execFileSync(process.env.FFMPEG_PATH || "ffmpeg", [
      "-v", "error", "-y", "-ss", String(entry.time), "-i", entry.source,
      "-frames:v", "1", input,
    ]);
  }
  const frame = await sharp(input).rotate().png().toBuffer();
  const { width, height } = await sharp(frame).metadata();
  const files = [];
  for (const size of [...entry.variants, width]) {
    for (const format of ["webp", "avif"]) {
      const path = `${out}/${entry.name}${size === width ? "" : "-" + size}.${format}`;
      await sharp(frame).resize({ width: size, withoutEnlargement: true })
        .toFormat(format, { quality: format === "webp" ? 84 : 58, effort: 4 })
        .toFile(path);
      files.push({ path, bytes: (await stat(path)).size });
    }
  }
  report.push({ ...entry, width, height, files,
    sourceSha256: createHash("sha256").update(await readFile(entry.source)).digest("hex"),
    framing: "Original pixels preserved; display framing uses CSS object-position",
  });
  console.log(`${entry.name}: ${width} × ${height}`);
}
await mkdir("docs/qa/hero-images", { recursive: true });
await writeFile("docs/qa/hero-images/sources.json", JSON.stringify(report, null, 2) + "\n");
