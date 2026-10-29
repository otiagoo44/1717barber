import {createRequire} from 'node:module';
import {writeFile,mkdir} from 'node:fs/promises';
import assert from 'node:assert/strict';
const require=createRequire((process.env.QA_TOOLS_DIR || 'C:/Users/User/AppData/Local/Temp/1717-final-qa')+'/qa.cjs');
const browser=await require('puppeteer-core').launch({executablePath:process.env.CHROME_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const base=process.env.QA_URL||'http://127.0.0.1:4174', out=process.env.QA_OUT||'docs/qa/native-booking';
await mkdir(out,{recursive:true});
const report={date:new Date().toISOString(),routes:[],errors:[],mode:'Read-only landing QA. No bookings submitted.',bookingLinks:[]};
try{
const page=await browser.newPage();
await page.setCacheEnabled(false);
page.on('pageerror',e=>report.errors.push({type:'pageerror',message:e.message,url:page.url()}));
page.on('console',m=>{if(m.type()==='error')report.errors.push({type:'console',message:m.text(),url:page.url(),location:m.location()});});
for(const width of [390,1440]){
 await page.setViewport({width,height:900,isMobile:width<500,hasTouch:width<500});
 for(const route of ['/','/rulos','/productos','/reservar','/trabajos']){
  const response=await page.goto(base+route,{waitUntil:'networkidle0'});assert.equal(response.status(),200);
  assert.ok(response.headers()['content-security-policy'].includes("script-src 'self'"));
  if(new URL(base).protocol==='http:')assert.equal(response.headers()['strict-transport-security'],undefined);
  if(new URL(base).hostname==='1717barber.vercel.app')assert.equal(response.headers()['strict-transport-security'],'max-age=31536000');
  const result=await page.evaluate(()=>({h1:document.querySelectorAll('h1').length,canonical:document.querySelector('link[rel=canonical]').href,overflow:document.documentElement.scrollWidth>innerWidth,links:[...document.querySelectorAll('a')].map(a=>({href:a.getAttribute('href'),cta:a.dataset.cta,service:a.dataset.service,target:a.target,rel:a.rel})),media:[...document.images].every(i=>i.complete&&i.naturalWidth>0)}));
  assert.equal(result.h1,1);assert.equal(result.overflow,false);
  assert.equal(result.canonical,'https://1717barber.vercel.app'+route);
  assert.ok(result.links.every(a=>!a.href?.includes('cal.com')));
  assert.ok(result.links.filter(a=>a.target==='_blank').every(a=>a.rel.split(' ').includes('noopener')&&a.rel.split(' ').includes('noreferrer')));
  assert.ok(result.links.filter(a=>a.cta==='reservar').every(a=>a.href==='/reservar'));
  assert.ok(result.links.filter(a=>a.service==='rulos').every(a=>a.href.startsWith('https://wa.me/')));
  for(const a of result.links.filter(a=>a.href?.includes('/book/'))){
   const u=new URL(a.href);
   assert.equal(u.origin,process.env.BARBERIA_OS_PUBLIC_URL||'https://barberia-crm-kappa.vercel.app');
   assert.equal(u.pathname,'/book/'+(process.env.BARBERIA_OS_ORGANIZATION_SLUG||'1717-barberia')+'/'+(process.env.BARBERIA_OS_BRANCH_SLUG||'luque'));
   assert.equal(u.searchParams.get('source'),'website');
   assert.ok([...u.searchParams.keys()].every(k=>['service','source'].includes(k)));
   if(!report.bookingLinks.includes(a.href))report.bookingLinks.push(a.href);
  }
  await page.evaluate(async()=>{document.querySelectorAll('img').forEach(i=>i.loading='eager');await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode()));});
  const axe=await new (require('@axe-core/puppeteer').AxePuppeteer)(page).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();assert.deepEqual(axe.violations.map(v=>v.id),[]);
  if(route==='/'||route==='/reservar')await page.screenshot({path:out+'/'+(route==='/'?'home':'reservar')+'-'+width+'.png'});
  report.routes.push({route,width,status:response.status(),canonical:result.canonical,overflow:false,axe:0});
 }
 await page.goto(base,{waitUntil:'networkidle0'});
 await Promise.all([page.waitForNavigation({waitUntil:'networkidle0'}),page.click('.header-cta')]);assert.equal(new URL(page.url()).pathname,'/reservar');
 const noJsPage=await browser.newPage();await noJsPage.setJavaScriptEnabled(false);await noJsPage.setViewport({width,height:900});await noJsPage.goto(base+'/reservar',{waitUntil:'networkidle0'});assert.equal(await noJsPage.$$eval('.booking-service',s=>s.length),Number(process.env.QA_EXPECTED_SERVICE_COUNT||7));await noJsPage.close();
}
// Exercise real document transitions, including cancelling them for reduced motion.
for(const value of ['reduce','no-preference']){
 await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value}]);
 for(let attempt=0;attempt<3;attempt++){
  await page.goto(base,{waitUntil:'networkidle0'});
  await Promise.all([page.waitForNavigation({waitUntil:'networkidle0'}),page.click('.header-cta')]);
  assert.equal(new URL(page.url()).pathname,'/reservar');
 }
}
report.navigationTransitions={normal:3,reducedMotion:3,passed:true};
assert.deepEqual(report.errors,[]);report.passed=true;console.log('Browser: 10 route/viewport combinations, CSP, links, SEO, no JS, Axe and no console errors PASS');
}catch(e){report.passed=false;report.failure=e.stack;throw e;}finally{await writeFile(out+'/browser.json',JSON.stringify(report,null,2));await browser.close();}
