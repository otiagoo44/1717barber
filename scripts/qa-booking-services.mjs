// Service routing + requested notebook framing. QA dependencies remain external.
import {createRequire} from 'node:module';
import {resolve} from 'node:path';
import {mkdir,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {services,business} from '../src/data.mjs';
import {configureBooking} from './booking-config.mjs';
import {serviceDuration,serviceBookingLink} from '../src/utils.mjs';
await configureBooking();
const require=createRequire(resolve(process.env.QA_TOOLS_DIR,'qa.cjs'));
const {AxePuppeteer}=require('@axe-core/puppeteer');
const browser=await require('puppeteer-core').launch({executablePath:process.env.CHROME_PATH,headless:true});
const base=process.env.QA_URL||'http://127.0.0.1:4174';
const out=process.env.QA_OUT||'docs/qa/booking-services/after';
const report={date:new Date().toISOString(),pages:[],checks:[],errors:[]};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
await mkdir(out,{recursive:true});
try {
  const page=await browser.newPage();
  page.on('pageerror',e=>report.errors.push(e.message));
  page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());});
  const cases=['','rulos','productos','reservar'].flatMap(route=>[1366,1920].map(width=>({route,width})));
  cases.push(...[375,390,430,768,1024,1440].map(width=>({route:'reservar',width})));
  cases.push(...[390,768,1440].map(width=>({route:'rulos',width})));
  for(const {route,width} of cases) {
    await page.setViewport({width,height:900,isMobile:width<500,hasTouch:width<500});
    await page.goto(base+'/'+route,{waitUntil:'networkidle0'});
    assert.ok((await page.$$eval('a[data-cta="reservar"]',els=>els.map(e=>e.getAttribute('href')))).every(h=>h==='/reservar'));
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
    assert.equal(await page.evaluate(()=>performance.getEntriesByType('resource').some(r=>r.name.endsWith('.mp4'))),false);
    await settle(page);
    const axe=await new AxePuppeteer(page).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
    assert.deepEqual(axe.violations.map(v=>v.id),[]);
    const wrap=await page.$eval('main .wrap',el=>({width:el.getBoundingClientRect().width,left:el.getBoundingClientRect().left}));
    if(width===1366) assert.ok(wrap.width>1280,'Notebook uses more than 93% width');
    if(route==='reservar') {
      const rows=await page.$$eval('.booking-service',els=>els.map(el=>({name:el.querySelector('h3').textContent,text:el.querySelector('p').textContent,url:el.querySelector('a').href})));
      assert.equal(rows.length,services.length);
      for(const [i,s] of services.entries()) {assert.equal(rows[i].name,s.name);assert.ok(rows[i].text.includes(serviceDuration(s)));assert.equal(rows[i].url,serviceBookingLink(s.id));}
      assert.equal(await page.$('.mobile-booking'),null);
      assert.equal(await page.evaluate(()=>document.body.classList.contains('booking-managed')),false);
      await page.keyboard.press('Tab');
      assert.equal(await page.evaluate(()=>document.activeElement.matches('.skip-link')),true);
      await page.click('main h1');
    }
    if(route==='rulos') {
      const aligned=await page.$$eval('.includes-list>div',rows=>rows.every(row=>{const a=row.querySelector('dt').getBoundingClientRect(),b=row.querySelector('dd').getBoundingClientRect();return innerWidth<=700?b.top>=a.bottom&&Math.abs(b.left-a.left)<1:b.left>=a.right&&Math.abs(b.top-a.top)<1;}));
      assert.equal(aligned,true,'Details never overlap and keep consistent columns');
      const grid=await page.$eval('.rulos-results',el=>({width:el.getBoundingClientRect().width,parent:el.parentElement.getBoundingClientRect().width}));
      assert.ok(Math.abs(grid.width-grid.parent)<1);
      for(const [name,selector] of [['details','.includes-list'],['results','.rulos-results']]) {
        await page.$eval(selector,el=>scrollTo({top:el.getBoundingClientRect().top+scrollY-112,behavior:'instant'}));
        await sleep(1100);
        await page.screenshot({path:`${out}/rulos-${name}-${width}.png`});
      }
    }
    await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
    await sleep(1100);
    await page.screenshot({path:`${out}/${route||'home'}-${width}-full.png`,fullPage:true});
    await page.screenshot({path:`${out}/${route||'home'}-${width}-viewport.png`});
    report.pages.push({route:route||'/',width,wrap,axe:0});
    console.log(`${route||'home'} ${width}: PASS`);
  }
  await page.setViewport({width:390,height:900,isMobile:true,hasTouch:true});
  await page.goto(base,{waitUntil:'networkidle0'});
  await Promise.all([page.waitForNavigation({waitUntil:'networkidle0'}),page.click('.header-cta')]);
  assert.equal(new URL(page.url()).pathname,'/reservar');
  await page.click('.menu-toggle');assert.equal(await page.$eval('#mobile-menu',e=>e.open),true);
  await page.keyboard.press('Escape');assert.equal(await page.evaluate(()=>document.activeElement.matches('.menu-toggle')),true);
  for(const mode of ['reduce','no-js']) {
    await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:mode==='reduce'?'reduce':'no-preference'}]);
    await page.setJavaScriptEnabled(mode!=='no-js');
    await page.goto(base+'/reservar',{waitUntil:'networkidle0'});
    assert.equal(await page.$$eval('.booking-service',els=>els.length),services.length);
    assert.equal(await page.$$eval('.reveal-pending',els=>els.length),0);
    if(mode==='reduce') assert.equal(await page.evaluate(()=>document.getAnimations().length),0);
    else assert.equal(await page.evaluate(()=>document.documentElement.classList.contains('motion-ready')),false);
  }
  report.checks.push('Local header navigates to service selection; mobile menu focus; seven correct contextual service destinations; native CRM or pending WhatsApp coordination; reduced motion and no-JS; notebook width; stable service-detail columns; no initial video; Axe zero');
  assert.deepEqual(report.errors,[]);report.passed=true;
}catch(e){report.passed=false;report.failure=e.stack;throw e;}
finally{await writeFile(out+'/booking-services.json',JSON.stringify(report,null,2));await browser.close();}
async function settle(page) {
  await page.evaluate(async()=>{await document.fonts.ready;document.querySelectorAll('img').forEach(i=>i.loading='eager');await Promise.all([...document.images].map(i=>i.decode()));for(let y=0;y<document.body.scrollHeight;y+=500){scrollTo({top:y,behavior:'instant'});await new Promise(r=>setTimeout(r,160));}});
  await sleep(1300);
  for(const el of await page.$$('.reveal-pending')){await el.evaluate(e=>e.scrollIntoView({block:'center',behavior:'instant'}));await sleep(1100);}
  assert.equal(await page.$$eval('.reveal-pending',els=>els.length),0);
}
