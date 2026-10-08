// Optional maintenance tool; sharp stays outside the application and build.
import { createRequire } from "node:module";
import { resolve } from "node:path";
import { readdir, stat } from "node:fs/promises";
const require = createRequire(resolve(process.env.QA_TOOLS_DIR, "qa.cjs"));
const sharp = require("sharp");
for (const file of (await readdir("public/assets/media")).filter((f) =>
  f.endsWith(".webp"),
)) {
  const input = "public/assets/media/" + file,
    output = input.replace(".webp", ".avif");
  await sharp(input).avif({ quality: 60, effort: 6 }).toFile(output);
  console.log(
    file +
      ": " +
      (await stat(input)).size +
      " -> " +
      (await stat(output)).size +
      " bytes",
  );
}
