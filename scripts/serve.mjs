import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
const root = resolve("dist"),
  port = Number(process.env.PORT || 4174);
const vercel = JSON.parse(await readFile("vercel.json", "utf8"));
const securityHeaders = Object.fromEntries(vercel.headers.find(rule => rule.source === "/(.*)" && !rule.has).headers.map(h => [h.key, h.value]));
// Local staging QA may call a local CRM. Production CSP remains fixed to the
// reviewed public CRM origin; no URL supplied by a request can extend it.
if(process.env.QA_BOOKING_ORIGIN) {
  const u=new URL(process.env.QA_BOOKING_ORIGIN);
  if(!["localhost","127.0.0.1"].includes(u.hostname))throw Error("Local QA origin required");
  securityHeaders["Content-Security-Policy"]=securityHeaders["Content-Security-Policy"].replace("connect-src 'self'",`connect-src 'self' ${u.origin}`);
}
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".jpg": "image/jpeg",
  ".woff2": "font/woff2",
  ".txt": "text/plain",
  ".xml": "application/xml",
  ".mp4": "video/mp4",
};
createServer(async (req, res) => {
  try {
    const url = new URL(req.url, "http://localhost");
    let path = resolve(root, "." + decodeURIComponent(url.pathname));
    if (path !== root && !path.startsWith(root + sep)) {
      res.writeHead(403);
      return res.end();
    }
    if ((await stat(path)).isDirectory()) path = resolve(path, "index.html");
    let body = await readFile(path);
    if(process.env.QA_BOOKING_ORIGIN && extname(path)===".html") body=Buffer.from(body.toString().replaceAll("https://barberia-crm-kappa.vercel.app",new URL(process.env.QA_BOOKING_ORIGIN).origin));
    res.writeHead(200, {
      "Content-Type": types[extname(path)] || "application/octet-stream",
      ...securityHeaders,
    });
    res.end(body);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Página no encontrada");
  }
}).listen(port, "127.0.0.1", () =>
  console.log(`17:17: http://127.0.0.1:${port}`),
);
