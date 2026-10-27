import test from "node:test";
import assert from "node:assert/strict";
import { bookingConfiguration, publicConfiguration, nativeBookingLink, validateCatalog } from "../src/booking.mjs";
import { projectServices, configureBooking } from "../scripts/booking-config.mjs";
import { services, business } from "../src/data.mjs";
import { serviceBookingLink } from "../src/utils.mjs";
import { renderPage } from "../src/pages.mjs";

// Isolated fixtures, never deployment configuration or verified production prices.
const env = { BARBERIA_OS_PUBLIC_URL:"https://crm.fixture.invalid", BARBERIA_OS_ORGANIZATION_SLUG:"fixture-a", BARBERIA_OS_BRANCH_SLUG:"a1" };
const service = (slug, website_category, price_minor, duration_minutes, extra={}) => ({slug,website_category,price_minor,duration_minutes,name:slug,consultation_required:["rulos","tinte"].includes(website_category),...extra});
const catalog = { slug:"fixture-a",currency:"PYG",website_booking_version:1,branches:[{slug:"a1",staff:[{slug:"fixture-staff",name:"Fixture staff",services:["cut"]}],services:[service("cut","corte",30000,40),service("rulos","rulos",180000,120),service("global-fixture","tinte",250000,120),service("highlights-fixture","tinte",180000,90)]}] };
const config = {...publicConfiguration(env),catalog};

test("Configuración pública rechaza credenciales, URL insegura y slugs parciales",()=>{
  assert.equal(publicConfiguration().organizationSlug,null);
  assert.equal(publicConfiguration().publicUrl,"https://barberia-crm-kappa.vercel.app");
  for(const url of ["http://crm.fixture.invalid","https://user:secret@crm.fixture.invalid","https://crm.fixture.invalid/path","https://crm.fixture.invalid?token=secret"])
    assert.throws(()=>publicConfiguration({...env,BARBERIA_OS_PUBLIC_URL:url}));
  assert.throws(()=>publicConfiguration({...env,BARBERIA_OS_BRANCH_SLUG:""}));
  assert.throws(()=>publicConfiguration({...env,BARBERIA_OS_BRANCH_SLUG:"../a1"}));
});
test("CTA general y específico usan sólo tenant público y slug validado",()=>{
  const general=new URL(nativeBookingLink(undefined,config));
  assert.equal(general.pathname,"/book/fixture-a/a1");
  assert.equal(general.searchParams.get("source"),"website");
  assert.equal(general.searchParams.has("service"),false);
  assert.equal(new URL(nativeBookingLink("cut",config)).searchParams.get("service"),"cut");
  assert.throws(()=>nativeBookingLink("missing",config),/inexistente/);
  assert.equal(nativeBookingLink("rulos",config),null);
  assert.equal(nativeBookingLink(),null);
});
test("Catálogo estricto: no confundir tenant, sucursal, versión, rulos ni precios",()=>{
  for(const update of [{slug:"fixture-b"},{currency:"USD"},{website_booking_version:0},{branches:[]}])
    assert.throws(()=>validateCatalog({...catalog,...update},config));
  const invalid=structuredClone(catalog);invalid.branches[0].services[1].consultation_required=false;
  assert.throws(()=>validateCatalog(invalid,config),/Rulos/);
  invalid.branches[0].services[1].consultation_required=true;invalid.branches[0].services[0].price_minor=-1;
  assert.throws(()=>validateCatalog(invalid,config),/inválido/);
});
test("Dos tintes se proyectan desde datos del CRM sin mapear nombres",()=>{
  const projected=projectServices(catalog,config);
  assert.equal(projected.length,4);
  assert.deepEqual(projected.filter(s=>s.category==="tinte").map(s=>[s.slug,s.name,s.price]),[["global-fixture","global-fixture",250000],["highlights-fixture","highlights-fixture",180000]]);
  assert.equal(projected.find(s=>s.id==="rulos").consultationRequired,true);
});

test("Rulos y Combo comparten categoría sin reemplazar el destacado ni duplicar Corte",()=>{
  const shared=structuredClone(catalog);
  const branch=shared.branches[0];
  branch.services[1].slug="rulos";
  branch.services.push(service("combo-rulos-y-corte","rulos",200000,120,{name:"Combo fixture"}));
  const configuration={...config,catalog:shared};
  const projected=projectServices(shared,configuration);
  assert.equal(projected.find(s=>s.id==="rulos").slug,"rulos");
  const combo=projected.find(s=>s.slug==="combo-rulos-y-corte");
  assert.deepEqual([combo.name,combo.price,combo.durationMinutes,combo.featured],["Combo fixture",200000,120,false]);
  assert.equal(projected.filter(s=>s.featured).length,1);
  for(const slug of ["rulos","combo-rulos-y-corte","global-fixture","highlights-fixture"])
    assert.equal(nativeBookingLink(slug,configuration),null);
  const original=services.slice(),previous={...bookingConfiguration};
  try {
    services.splice(0,services.length,...projected);Object.assign(bookingConfiguration,configuration);
    const booking=renderPage("reservar");
    assert.equal((booking.match(/Este servicio requiere evaluación previa\. Escribinos para coordinarlo\./g)||[]).length,4);
    assert.match(serviceBookingLink(combo.id),/^https:\/\/wa\.me\//);
    assert.ok(new URL(serviceBookingLink(combo.id)).searchParams.get("text").includes(combo.name));
    assert.equal((booking.match(/El corte se cobra por separado/g)||[]).length,1);
  } finally {services.splice(0,services.length,...original);Object.assign(bookingConfiguration,previous);}
  branch.services[1].slug="ambiguous-curl";
  assert.throws(()=>validateCatalog(shared,configuration),/canónico/);
  branch.services.splice(1,1);
  assert.throws(()=>validateCatalog(shared,configuration),/canónico/);
});

test("No publicar tintes directos ni servicios sin profesionales habilitados",()=>{
  const invalid=structuredClone(catalog);
  invalid.branches[0].services[2].consultation_required=false;
  assert.throws(()=>validateCatalog(invalid,config),/evaluación previa/);
  invalid.branches[0].services[2].consultation_required=true;
  invalid.branches[0].staff=[];
  assert.throws(()=>validateCatalog(invalid,config),/Profesionales/);
  invalid.branches[0].staff=[{slug:"fixture-staff",name:"Fixture staff",services:[]}];
  assert.throws(()=>validateCatalog(invalid,config),/sin un profesional/);
});
test("Render configurado mantiene canonical, CTA específico y consulta de rulos",()=>{
  const original=services.slice(), previous={...business.booking};
  try {
    services.splice(0,services.length,...projectServices(catalog,config));Object.assign(bookingConfiguration,config);
    assert.equal(new URL(serviceBookingLink("corte")).searchParams.get("service"),"cut");
    assert.match(serviceBookingLink("rulos"),/^https:\/\/wa\.me\//);
    const booking=renderPage("reservar","https://1717barber.vercel.app");
    assert.ok(booking.includes('href="https://crm.fixture.invalid/book/fixture-a/a1?source=website"'));
    assert.ok(booking.includes("service=cut&amp;source=website"));
    assert.ok(booking.includes('rel="canonical" href="https://1717barber.vercel.app/reservar"'));
    const home=renderPage("home");assert.ok(home.includes("service=cut&amp;source=website"));
    assert.doesNotMatch(home+booking,/cal\.com|serviceEvents|Round Robin|service_role|BOOKING_GATEWAY_SECRET/);
  } finally { services.splice(0,services.length,...original);Object.assign(bookingConfiguration,previous); }
});
test("Build consulta exclusivamente catálogo público y falla ante errores",async()=>{
  await assert.rejects(()=>configureBooking(env,async url=>{
    assert.equal(url.pathname,"/api/public/catalog");
    assert.equal(url.searchParams.get("organization"),"fixture-a");
    assert.equal([...url.searchParams.keys()].join(","),"organization,branch");
    return {ok:false,status:503};
  }),/no disponible/);
});
test("FAQ y destacados no conservan importes/duración anteriores al catálogo",()=>{
  const changed=structuredClone(catalog);
  changed.branches[0].services[0].price_minor=45000;
  changed.branches[0].services[1].price_minor=210000;
  changed.branches[0].services[1].duration_minutes=180;
  const original=services.slice();
  try {
    services.splice(0,services.length,...projectServices(changed,config));
    const home=renderPage("home"),rulos=renderPage("rulos");
    assert.ok(home.includes("El corte masculino cuesta Gs. 45.000"));
    assert.ok(rulos.includes("Los rulos permanentes cuestan Gs. 210.000"));
    assert.ok(rulos.includes("Aproximadamente 180 minutos"));
    assert.doesNotMatch(rulos,/Gs\. 180\.000|2 horas/);
  } finally {services.splice(0,services.length,...original);}
});
test("HTTP 200 con un starter HTML no habilita el booking del CRM",async()=>{
  await assert.rejects(()=>configureBooking(env,async()=>({
    ok:true, headers:new Headers({"content-type":"text/html"}),
    json:async()=>{throw new Error("No debería intentar interpretar HTML como catálogo");},
  })),/no sirve un catálogo JSON/);
});
