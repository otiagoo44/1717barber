// Optional asset maintenance. Uses external Sharp; never run during deploy.
import { createRequire } from "node:module";
import { readFile, writeFile, mkdir, stat } from "node:fs/promises";
import { resolve } from "node:path";
import { execFileSync } from "node:child_process";
const require = createRequire(
    resolve(process.env.QA_TOOLS_DIR || "", "qa.cjs"),
  ),
  sharp = require("sharp");
const root = resolve(process.env.TEMP || ".", "1717-content-generation"),
  out = "public/assets/media";
await mkdir(root, { recursive: true });
await mkdir(out, { recursive: true });
const entries = [
  {
    name: "rulos-hero-actual",
    input: "img/fotos-cortes-rulos/WhatsApp Video 2026-10-11 at 14.20.59.mp4",
    time: 1.02,
  },
  {
    name: "rulos-destacado-actual",
    input: "img/fotos-cortes-rulos/WhatsApp Video 2026-10-11 at 14.21.15.mp4",
    time: 1.3341665,
  },
  {
    name: "rulos-actual",
    variants: [600, 900],
    input:
      "img/fotos-cortes-rulos/WhatsApp Image 2026-10-11 at 14.21.22 (1).jpeg",
  },
  {
    name: "corte-fade-actual",
    input:
      "img/fotos-cortes-rulos/WhatsApp Image 2026-10-11 at 14.21.21 (1).jpeg",
  },
  {
    name: "corte-taper-actual",
    input: "img/fotos-cortes-rulos/WhatsApp Image 2026-10-11 at 14.21.14.jpeg",
  },
  {
    name: "local-fachada",
    input: "img/fotos-local/WhatsApp Image 2026-10-11 at 19.13.19 (4).jpeg",
    crop: {
      left: 0,
      top: 242,
      width: 591,
      height: 795,
    },
  },
  {
    name: "local-interior",
    input: "img/fotos-local/WhatsApp Image 2026-10-11 at 19.13.19 (6).jpeg",
    crop: {
      left: 0,
      top: 240,
      width: 591,
      height: 800,
    },
  },
  {
    name: "local-puesto",
    input: "img/fotos-local/WhatsApp Image 2026-10-11 at 19.13.19 (1).jpeg",
  },
  {
    name: "producto-iconic",
    input: "img/fotos-productos/WhatsApp Image 2026-10-11 at 14.02.55 (6).jpeg",
    crop: {
      left: 28,
      top: 22,
      width: 558,
      height: 323,
    },
    product: true,
  },
  {
    name: "producto-manifesto",
    input: "img/fotos-productos/WhatsApp Image 2026-10-11 at 14.02.55 (7).jpeg",
    crop: {
      left: 28,
      top: 8,
      width: 529,
      height: 359,
    },
    product: true,
  },
  {
    name: "producto-matte",
    input:
      "img/fotos-productos/WhatsApp Image 2026-10-11 at 14.02.55 (10).jpeg",
    crop: {
      left: 33,
      top: 188,
      width: 637,
      height: 510,
    },
    product: true,
  },
  {
    name: "producto-million",
    input: "img/fotos-productos/WhatsApp Image 2026-10-11 at 14.02.55 (5).jpeg",
    crop: {
      left: 142,
      top: 539,
      width: 542,
      height: 326,
    },
    product: true,
  },
  {
    name: "producto-polvo",
    input: "img/fotos-productos/WhatsApp Image 2026-10-11 at 14.02.55 (4).jpeg",
    crop: {
      left: 75,
      top: 624,
      width: 361,
      height: 342,
    },
    product: true,
  },
];
const meta = [];
for (const entry of entries) {
  let input = entry.input;
  if (entry.time !== undefined) {
    input = resolve(root, entry.name + ".jpg");
    execFileSync(process.env.FFMPEG_PATH || "ffmpeg", [
      "-v",
      "error",
      "-y",
      "-ss",
      String(entry.time),
      "-i",
      entry.input,
      "-frames:v",
      "1",
      input,
    ]);
  }
  let pipeline = sharp(input).rotate();
  if (entry.crop) pipeline = pipeline.extract(entry.crop);
  if (entry.product)
    pipeline = pipeline
      .resize(560, 560, {
        fit: "contain",
        background: "#f4f0e8",
        withoutEnlargement: true,
      })
      .extend({
        top: 20,
        bottom: 20,
        left: 20,
        right: 20,
        background: "#f4f0e8",
      });
  else pipeline = pipeline.resize({ width: 1200, withoutEnlargement: true });
  const buffer = await pipeline.png().toBuffer(),
    m = await sharp(buffer).metadata();
  for (const [suffix, width] of [
    ["", m.width],
    ...(entry.variants || [600]).filter(width => width < m.width).map(width => [`-${width}`, width]),
  ]) {
    for (const format of ["webp", "avif"]) {
      await sharp(buffer)
        .resize({ width })
        .toFormat(format, { quality: format === "webp" ? 84 : 58, effort: 4 })
        .toFile(`${out}/${entry.name}${suffix}.${format}`);
    }
  }
  meta.push({
    ...entry,
    input: undefined,
    source: entry.input,
    width: m.width,
    height: m.height,
    webpBytes: (await stat(`${out}/${entry.name}.webp`)).size,
    avifBytes: (await stat(`${out}/${entry.name}.avif`)).size,
  });
  console.log(entry.name, m.width, m.height);
}
await mkdir("docs/qa/final-content", { recursive: true });
await writeFile(
  "docs/qa/final-content/assets-generated.json",
  JSON.stringify(meta, null, 2),
);
