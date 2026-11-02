import {test,expect} from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import {mkdir,writeFile} from "node:fs/promises";
const real=process.env.BOOKING_E2E_REAL_STAGING==="1";
const origin=real?"http://127.0.0.1:3028":"https://barberia-crm-kappa.vercel.app";
const root="docs/qa/embedded-20261102/"+(real?"staging":"fixtures");
const receipts=[];
const fixtureDate=new Intl.DateTimeFormat("en-CA",{timeZone:"America/Asuncion"}).format(new Date(Date.now()+3*86400000));
test.beforeAll(async()=>{
 if(real){test.setTimeout(90000);await new Promise(resolve=>setTimeout(resolve,61000));}
});
const svc=(slug,name,consultation_required=false,website_category="corte")=>({slug,name,consultation_required,website_category,composition_mode:"standalone",duration_minutes:40,price_minor:30000});
const fixture={slug:"1717-barberia",name:"17:17 Barbería",currency:"PYG",website_booking_version:1,branches:[{slug:"luque",name:"Luque",timezone:"America/Asuncion",phone:"+595983402497",services:[svc("corte-de-pelo","Corte de pelo"),svc("rulos","Rulos",true,"rulos"),svc("combo-rulos-y-corte","Combo rulos y corte",true,"rulos"),svc("tinte-global","Tinte global",true,"tinte")],staff:[{slug:"esteban",name:"Esteban",services:["corte-de-pelo"]},{slug:"jonatan",name:"Jonatan",services:["corte-de-pelo"]}]}]};
let mockRequests=[];
async function mock(page,{catalogFailure=false,conflict=false,availabilityFailure=false}={}) {
 mockRequests=[];
 await page.route("**/api/public/**",async route=>{
  const request=route.request(),url=new URL(request.url()),headers={"Access-Control-Allow-Origin":"http://127.0.0.1:4174","Content-Type":"application/json"};
  if(request.method()==="OPTIONS")return route.fulfill({status:204,headers:{...headers,"Access-Control-Allow-Methods":"POST","Access-Control-Allow-Headers":"content-type"}});
  if(url.pathname.endsWith("catalog"))return route.fulfill({status:catalogFailure?503:200,headers,json:catalogFailure?{error:"Unavailable"}:fixture});
  if(url.pathname.endsWith("availability"))return route.fulfill({status:availabilityFailure?503:200,headers,json:availabilityFailure?{error:"Disponibilidad no disponible"}:[{starts_at:url.searchParams.get("date")+"T15:00:00Z",staff_slug:"esteban",staff_name:"Esteban",duration_minutes:40}]});
  if(url.pathname.endsWith("booking")){
   const p=request.postDataJSON();mockRequests.push(p);
   return route.fulfill({status:conflict?409:201,headers,json:conflict?{error:"Horario ocupado"}:{reference:"aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",starts_at:p.starts_at,duration_minutes:40,staff:{slug:"esteban",name:"Esteban"},services:[{name:"Corte de pelo"}]}});
  }
  return route.abort();
 });
}
async function enter(page,{staff="",date}={}) {
 await page.goto("/reservar");
 await page.locator('[name="service"][value="corte-de-pelo"]').check();
 await page.getByRole("button",{name:"Continuar",exact:false}).click();
 await page.locator(`[name="staff"][value="${staff}"]`).check();
 await page.getByRole("button",{name:"Continuar",exact:false}).click();
 if(date)await page.locator('[name="date"]').fill(date);
 await expect(page.locator('[name="time"]').first()).toBeVisible();
 await page.locator('[name="time"]').first().check();
 await page.getByRole("button",{name:"Continuar",exact:false}).click();
 await page.getByLabel("Nombre",{exact:true}).fill("QA sintética staging");
 await page.getByLabel("WhatsApp con código de país").fill("+12025550190");
 await page.getByRole("button",{name:"Continuar",exact:false}).click();
 await expect(page.getByRole("heading",{name:"Revisá tu turno."})).toBeVisible();
}
async function nextDay(request) {
 for(let d=1;d<12;d++){
  const date=new Intl.DateTimeFormat("en-CA",{timeZone:"America/Asuncion"}).format(new Date(Date.now()+d*86400000));
  const r=await request.get(origin+"/api/public/availability?"+new URLSearchParams({organization:"1717-barberia",branch:"luque",service:"corte-de-pelo",date}));
  expect(r.ok()).toBeTruthy();const slots=await r.json();if(slots.length)return {date,slots};
 }throw Error("No staging availability within eleven days");
}
test.afterAll(async()=>{await mkdir(root,{recursive:true});await writeFile(root+(real?"/staging-receipts.json":"/fixture-receipts.json"),JSON.stringify({checkedAt:new Date().toISOString(),realStaging:real,productionBookings:0,receipts},null,2));});

for(const width of [390,1440]) test(`five steps, assigned professional, optional email and safe retry at ${width}`,async({page,request})=>{
 await page.setViewportSize({width,height:900});
 const errors=[];page.on("pageerror",e=>errors.push(e.message));
 if(!real)await mock(page);
 const selected=real?await nextDay(request):{date:fixtureDate};
 await enter(page,{date:selected.date,staff:width===1440?"esteban":""});
 await mkdir(root,{recursive:true});
 await page.evaluate(()=>window.scrollTo({top:0,behavior:"instant"}));
 await page.screenshot({path:`${root}/review-${width}.png`,fullPage:true});
 expect((await new AxeBuilder({page}).withTags(["wcag2a","wcag2aa","wcag21aa"]).analyze()).violations).toEqual([]);
 let lost=false;const sent=[];
 await page.route("**/api/public/booking",async route=>{
  if(route.request().method()!=="POST")return route.fallback();
  sent.push(route.request().postDataJSON());
  if(!lost){lost=true;if(real){const r=await route.fetch();expect(r.status()).toBe(201);}return route.abort("failed");}
  return route.fallback();
 });
 await page.getByRole("button",{name:"Confirmar mi reserva",exact:false}).click();
 await expect(page.getByRole("button",{name:"Verificar mi reserva",exact:true})).toBeEnabled();
 await page.reload();
 await expect(page.getByRole("button",{name:"Verificar mi reserva",exact:true})).toBeEnabled();
 await page.getByRole("button",{name:"Verificar mi reserva",exact:true}).click();
 await expect(page.getByRole("heading",{name:"Tu reserva está confirmada."})).toBeVisible();
 expect(sent).toHaveLength(2);expect(sent[0]).toEqual(sent[1]);expect(sent[0].customer.email).toBe("");
 await expect(page.locator(".booking-summary")).toContainText(/Esteban|Jonatan/);
 const reference=await page.locator(".booking-reference").textContent();
 await expect(page.getByRole("link",{name:"Avisar por WhatsApp"})).toHaveAttribute("href",new RegExp(encodeURIComponent(reference)));
 const posts=sent.length;await page.getByRole("link",{name:"Avisar por WhatsApp"}).evaluate(a=>a.removeAttribute("target"));
 await page.route("https://wa.me/**",r=>r.fulfill({body:"Optional message"}));
 await page.getByRole("link",{name:"Avisar por WhatsApp"}).click();expect(sent.length).toBe(posts);
 await page.goBack();await page.reload();
 await expect(page.getByRole("heading",{name:"Tu reserva está confirmada."})).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)).toBe(false);
 expect(errors).toEqual([]);
 await page.evaluate(()=>window.scrollTo({top:0,behavior:"instant"}));
 await page.screenshot({path:`${root}/confirmed-${width}.png`,fullPage:true});
 receipts.push({width,reference,sameRequestAfterLostResponse:true,posts:2,axe:0,overflow:false,passed:true});
});

test("consultations stay separate, native fallback works without JS, errors and keyboard",async({page,browser})=>{
 await mock(page);await page.goto("/reservar");
 await expect(page.locator('[name="service"]')).toHaveCount(1);
 await page.getByText("Rulos, combo y tintes · consulta previa",{exact:true}).click();
 await page.getByRole("link",{name:"Consultar Rulos",exact:true}).click();
 await expect(page.getByRole("dialog")).toContainText("Escribir por WhatsApp no confirma una reserva");
 await page.keyboard.press("Escape");await expect(page.getByRole("dialog")).not.toBeVisible();expect(mockRequests).toHaveLength(0);
 await page.emulateMedia({reducedMotion:"reduce"});
 const context=await browser.newContext({javaScriptEnabled:false});const noJS=await context.newPage();await noJS.goto("http://127.0.0.1:4174/reservar");
 await expect(noJS.locator('[data-booking-backup]')).toBeVisible();await expect(noJS.locator('[data-booking-backup] a[href*="/book/"]').first()).toBeVisible();await context.close();
});
test("catalog/availability errors retain fallback, conflict asks for a fresh slot",async({page})=>{
 await mock(page,{catalogFailure:true});await page.goto("/reservar");await expect(page.getByRole("heading",{name:"No pudimos cargar la agenda"})).toBeVisible();await expect(page.locator('[data-native-fallback]')).toBeVisible();
 await page.unrouteAll();await mock(page,{availabilityFailure:true});await page.reload();
 await page.locator('[name="service"]').check();await page.getByRole("button",{name:"Continuar",exact:false}).click();await page.getByRole("button",{name:"Continuar",exact:false}).click();await expect(page.getByRole("alert")).toContainText("Disponibilidad no disponible");
 await page.unrouteAll();await mock(page,{conflict:true});await enter(page,{date:fixtureDate});await page.getByRole("button",{name:"Confirmar mi reserva",exact:false}).click();await expect(page.getByRole("heading",{name:"Encontrá tu horario."})).toBeVisible();await expect(page.getByRole("heading",{name:"Tu reserva está confirmada."})).toHaveCount(0);
});

test("real staging: exact CORS, same-key concurrency, competing bookings, consultation and rate guard",async({request})=>{
 test.skip(!real,"Real staging runner only; never production");
 const base=origin+"/api/public/booking",headers={Origin:"http://127.0.0.1:4174"};
 expect((await request.fetch(base,{method:"OPTIONS",headers:{...headers,"Access-Control-Request-Method":"POST","Access-Control-Request-Headers":"content-type"}})).status()).toBe(204);
 for(const o of ["https://evil.test","null","http://127.0.0.1:4174.evil.test"]){expect((await request.post(base,{headers:{Origin:o},data:{}})).status()).toBe(403);}
 const {slots}=await nextDay(request),s=slots[0];
 const payload={organization:"1717-barberia",branch:"luque",services:["corte-de-pelo"],staff:s.staff_slug,starts_at:s.starts_at,customer:{name:"QA sintética staging",normalized_phone:"+12025550191",email:""},key:crypto.randomUUID(),website:"",source:"website"};
 const twins=await Promise.all([request.post(base,{headers,data:payload}),request.post(base,{headers,data:payload})]);
 expect(twins.map(r=>r.status())).toEqual([201,201]);const a=await twins[0].json();expect(await twins[1].json()).toEqual(a);
 const competing=await request.post(base,{headers,data:{...payload,key:crypto.randomUUID(),customer:{...payload.customer,normalized_phone:"+12025550192"}}});expect(competing.status()).toBe(409);
 for(const service of ["rulos","combo-rulos-y-corte","tinte-global","tinte-mechas"]){const r=await request.post(base,{headers,data:{...payload,services:[service],key:crypto.randomUUID()}});expect(r.status()).toBe(400);}
 const forged=await request.post(base,{headers,data:{...payload,secret:"not-allowed"}});expect(forged.status()).toBe(400);
 let limited=false;for(let i=0;i<14;i++){const r=await request.post(base,{headers,data:payload});if(r.status()===429){limited=true;break;}expect(r.status()).toBe(201);expect((await r.json()).reference).toBe(a.reference);}expect(limited).toBe(true);
 receipts.push({reference:a.reference,concurrentSameKey:2,competingBookingRejected:true,consultationRejected:4,rateLimited:true,passed:true});
});
test("a throttled retry after an ambiguous response keeps the original request locked",async({page})=>{
 await mock(page);await enter(page,{date:fixtureDate});
 const sent=[];
 await page.route("**/api/public/booking",async route=>{
  if(route.request().method()!=="POST")return route.fallback();
  sent.push(route.request().postDataJSON());
  if(sent.length===1)return route.abort("failed");
  if(sent.length===2)return route.fulfill({status:429,headers:{"Access-Control-Allow-Origin":"http://127.0.0.1:4174","Content-Type":"application/json"},json:{error:"Rate limited"}});
  return route.fallback();
 });
 await page.getByRole("button",{name:"Confirmar mi reserva",exact:false}).click();
 await page.getByRole("button",{name:"Verificar mi reserva",exact:true}).click();
 await expect(page.getByRole("button",{name:"Verificar mi reserva",exact:true})).toBeEnabled();
 await expect(page.locator('[data-native-fallback]')).not.toBeVisible();
 await page.reload();await page.getByRole("button",{name:"Verificar mi reserva",exact:true}).click();
 await expect(page.getByRole("heading",{name:"Tu reserva está confirmada."})).toBeVisible();
 expect(sent).toHaveLength(3);expect(sent[1]).toEqual(sent[0]);expect(sent[2]).toEqual(sent[0]);
});
test("normal and reduced-motion page navigation keeps native transition cancellation handled",async({page})=>{
 await mock(page);const errors=[];page.on("pageerror",error=>errors.push(error.message));
 for(const motion of ["no-preference","reduce","no-preference","reduce"]){
  await page.emulateMedia({reducedMotion:motion});
  for(let i=0;i<3;i++){
   await page.goto("/",{waitUntil:"networkidle"});
   await page.locator(".header-cta").click();
   await page.waitForURL("**/reservar",{waitUntil:"networkidle"});
   await expect(page.locator('[name="service"]')).toHaveCount(1);
  }
 }
 expect(errors).toEqual([]);
 const unrelated=page.waitForEvent("pageerror");
 await page.evaluate(()=>{void Promise.reject(new Error("Unrelated application error fixture"));});
 expect((await unrelated).message).toBe("Unrelated application error fixture");
});
