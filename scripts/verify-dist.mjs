import { readdir, readFile } from "node:fs/promises";
import { extname, join } from "node:path";
import assert from "node:assert/strict";
const secretNames = ["BOOKING_GATEWAY_SECRET", "SUPABASE_SERVICE_ROLE_KEY", "SUPABASE_SECRET_KEY", "DB_PASSWORD", "DATABASE_URL"];
const values = secretNames.map(name => process.env[name]).filter(value => value && value.length >= 8);
async function inspect(dir) {
  for (const item of await readdir(dir, { withFileTypes:true })) {
    const file = join(dir,item.name);
    assert.ok(!item.name.startsWith(".env"),"No deben copiarse archivos de entorno al build.");
    if (item.isDirectory()) { await inspect(file); continue; }
    if (!/\.(?:html|js|json|css|svg|txt|xml)$/.test(extname(file))) continue;
    const text = await readFile(file,"utf8");
    assert.doesNotMatch(text,/service_role|BOOKING_GATEWAY_SECRET|SUPABASE_SECRET|DB_PASSWORD|sb_secret_|BEGIN (?:RSA |EC )?PRIVATE KEY|postgres(?:ql)?:\/\/[^\s]+:[^\s]+@/i,`Contenido privado en ${file}`);
    assert.ok(values.every(value => !text.includes(value)),`Valor secreto en ${file}`);
    if (file.endsWith(".html")) assert.doesNotMatch(text,/cal\.com|serviceEvents|Round Robin/i);
  }
}
await inspect("dist");
for (const route of ["","rulos/","productos/","reservar/","trabajos/"]) {
  const html=await readFile(`dist/${route}index.html`,"utf8");
  assert.equal((html.match(/<h1\b/g)||[]).length,1);
  assert.match(html,/rel="canonical"/);
  assert.match(html,/application\/ld\+json/);
}
const vercel=JSON.parse(await readFile("vercel.json","utf8"));
assert.equal(vercel.outputDirectory,"dist");
assert.equal(vercel.cleanUrls,true);
assert.equal(vercel.trailingSlash,false);
const headers=Object.fromEntries(vercel.headers.find(rule=>rule.source==="/(.*)"&&!rule.has).headers.map(h=>[h.key,h.value]));
assert.match(headers["Content-Security-Policy"],/frame-ancestors 'none'/);
assert.equal(headers["X-Content-Type-Options"],"nosniff");
assert.ok(vercel.headers.find(rule=>rule.headers.some(h=>h.key==="Strict-Transport-Security")).has.some(condition=>condition.key==="x-forwarded-proto"&&condition.value==="https"));
console.log("Dist: cinco rutas, SEO, sin Cal.com ni secretos; configuración estática y cabeceras verificadas.");
