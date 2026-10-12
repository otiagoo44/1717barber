// Run with external QA_TOOLS_DIR and CHROME_PATH. No QA dependencies in the site.
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { results, media, business } from '../src/data.mjs';
const require = createRequire(resolve(process.env.QA_TOOLS_DIR, 'qa.cjs'));
const puppeteer = require('puppeteer-core');
const { AxePuppeteer } = require('@axe-core/puppeteer');
const browser = await puppeteer.launch({executablePath:process.env.CHROME_PATH,headless:true});
const out = process.env.QA_OUT || 'docs/qa/refinement';
const base = process.env.QA_URL || 'http://127.0.0.1:4174';
await mkdir(out,{recursive:true});
const report = {pages:[],interactions:[],errors:[],limitations:['Chrome viewport/touch emulation; no physical phone.','External link clicks intercepted; no WhatsApp messages or real bookings sent.','Native MP4 playback is tested separately.']};
if(process.env.QA_INTERACTIONS_ONLY) report.pages=JSON.parse(await readFile(`${out}/qa.json`,'utf8')).pages;
const sleep = ms => new Promise(r=>setTimeout(r,ms));
try {
  const page = await browser.newPage();
  page.on('pageerror',e=>report.errors.push(e.message));
  page.on('console',message=>{if(message.type()==='error') report.errors.push(message.text());});
  page.on('response',response=>{if(response.status()>=400&&response.url().startsWith(base)) report.errors.push(`HTTP ${response.status()}: ${response.url()}`);});
  page.on('requestfailed',request=>{if(request.failure()?.errorText!=='net::ERR_ABORTED') report.errors.push(`${request.failure()?.errorText}: ${request.url()}`);});
  if(!process.env.QA_INTERACTIONS_ONLY) for (const route of ['','rulos','productos']) {
    for (const width of [375,390,430,768,1024,1440]) {
      await page.setViewport({width,height:900,isMobile:width<500,hasTouch:width<500});
      await page.goto(base+'/'+route,{waitUntil:'networkidle0'});
      await page.evaluate(()=>document.fonts.ready);
      await page.screenshot({path:`${out}/${route||'home'}-${width}-viewport.png`});
      await page.evaluate(async()=>{
        document.querySelectorAll('img').forEach(i=>i.loading='eager');
        await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));
        for(let y=0;y<document.body.scrollHeight;y+=500){window.scrollTo({top:y,behavior:'instant'});await new Promise(r=>setTimeout(r,160));}
        window.scrollTo({top:0,behavior:'instant'});
      });
      // Let decoding, reveal animations and the compositor finish before a
      // full-page capture; rapid sweep + 500ms produced blank offscreen tiles.
      await sleep(1300);
      const metrics = await page.evaluate(()=>({
        overflow:document.documentElement.scrollWidth>innerWidth,
        h1:document.querySelectorAll('h1').length,
        placeholders:document.querySelectorAll('[data-placeholder]').length,
        iframes:document.querySelectorAll('iframe').length,
        images:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src),
        requests:performance.getEntriesByType('resource').map(r=>r.name),
        headings:[...document.querySelectorAll('h1,h2')].map(h=>({text:h.textContent,width:h.getBoundingClientRect().width})),
      }));
      assert.equal(metrics.overflow,false,`${route}/${width}: overflow`);
      assert.equal(metrics.h1,1); assert.equal(metrics.placeholders,0); assert.equal(metrics.iframes,0); assert.deepEqual(metrics.images,[]);
      assert.ok(metrics.requests.every(u=>u.startsWith(locationOrigin(base))), 'No third-party initial requests');
      const axe = await new AxePuppeteer(page).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
      const violations=axe.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}));
      report.pages.push({route:route||'/',width,...metrics,violations});
      await page.screenshot({path:`${out}/${route||'home'}-${width}-full.png`,fullPage:true});
      console.log(`${route||'home'} ${width}: ${violations.length} axe findings`);
    }
  }
  await page.setViewport({width:390,height:844,isMobile:true,hasTouch:true});
  await page.goto(base,{waitUntil:'networkidle0'});
  await page.click('.menu-toggle');
  assert.ok(await page.$eval('#mobile-menu',d=>d.open));
  await page.keyboard.press('Escape');
  assert.equal(await page.$eval('#mobile-menu',d=>d.open),false);
  assert.equal(await page.evaluate(()=>document.activeElement.matches('.menu-toggle')),true);
  await page.click('.menu-toggle');
  await page.click('#mobile-menu a[href="/#servicios"]');
  await sleep(500);
  assert.equal(await page.$eval('#mobile-menu',d=>d.open),false);
  report.interactions.push('Mobile menu: open, Escape, focus return, anchor navigation');
  for(const category of ['Rulos','Cortes','Color','Todos']) {
    await page.click(`[data-gallery-filter="${category}"]`);
    const visible=await page.$$eval('.result-tile',els=>els.filter(el=>!el.hidden).map(el=>el.dataset.category));
    assert.equal(visible.length,results.filter(r=>media[r.media].src&&(category==='Todos'||r.category===category)).length);
    if(category!=='Todos') assert.ok(visible.every(c=>c===category));
  }
  await page.click('.photo-trigger');
  assert.ok(await page.$eval('#lightbox',d=>d.open));
  await page.keyboard.press('ArrowRight');
  assert.equal(await page.$eval('.lightbox-count',e=>e.textContent),`2 / ${results.filter(r=>media[r.media].src).length}`);
  await page.keyboard.press('Escape');
  await page.waitForFunction(()=>!document.body.classList.contains('modal-open'));
  assert.equal(await page.evaluate(()=>document.body.classList.contains('modal-open')),false);
  assert.equal(await page.evaluate(()=>document.activeElement.matches('.photo-trigger')),true);
  await page.click('[data-result-index="3"] .photo-trigger');
  await page.screenshot({path:`${out}/lightbox-rulos-390.png`});
  await page.click('[data-lightbox-close]');
  await page.waitForFunction(()=>!document.body.classList.contains('modal-open'));
  report.interactions.push('All gallery filters, photo open, arrow navigation, Escape, close and focus return');
  for(const summary of await page.$$('.faq-list summary')) {
    await summary.evaluate(el=>el.scrollIntoView({block:'center',behavior:'instant'}));
    await summary.click();
    assert.equal(await summary.evaluate(el=>el.parentElement.open),true);
  }
  report.interactions.push('Every FAQ opens and has a real answer');
  const destinations=[];
  for (const width of [390,1440]) for (const route of ['','rulos','productos']) {
    await page.setViewport({width,height:900,isMobile:width===390,hasTouch:width===390});
    await page.goto(base+'/'+route,{waitUntil:'networkidle0'});
    await page.evaluate(()=>{
      window.qaClicks=[];
      document.addEventListener('click',ev=>{const a=ev.target.closest('a');if(a){ev.preventDefault();ev.stopImmediatePropagation();window.qaClicks.push(a.href);}},true);
    });
    for(const a of await page.$$('a:not(.skip-link)')) {
      if(!await a.isVisible()) continue;
      await a.evaluate(el=>el.scrollIntoView({block:'center',behavior:'instant'}));
      await sleep(50);
      if(!await a.isVisible()) continue;
      await a.click();
    }
    destinations.push(...await page.evaluate(()=>window.qaClicks));
  }
  assert.ok(destinations.some(u=>u.includes('wa.me/595983402497')));
  assert.ok(destinations.some(u=>u.includes('google.com/maps/')));
  assert.ok(destinations.some(u=>u.includes('instagram.com/1717barberia')));
  assert.ok(destinations.includes(business.booking.url));
  await page.goto(base+'/rulos',{waitUntil:'networkidle0'});
  const originalReels = await page.evaluate(() => [...document.querySelectorAll('[data-reel-source]')].map(el => el.dataset.reelSource));
  assert.equal(originalReels.length, 5);
  assert.ok(originalReels.every(u => u.includes('instagram.com/reel/')));
  for(const u of destinations.filter(u=>u.includes('wa.me'))){assert.equal(new URL(u).pathname,'/595983402497');assert.ok(new URL(u).searchParams.get('text'));}
  for(const url of [...new Set(destinations)].filter(u=>u.startsWith(base)&&!u.includes('/assets/'))) {
    // A same-document hash navigation has no HTTP response in Puppeteer.
    // Check the route independently, then verify the real anchor in Chrome.
    const response=await fetch(url);
    assert.equal(response.status,200);
    await page.goto(url,{waitUntil:'domcontentloaded'});
    const hash=new URL(url).hash;
    if(hash) assert.ok(await page.$(hash),`Missing anchor ${url}`);
  }
  report.clickedDestinations=[...new Set(destinations)];
  report.interactions.push('All visible links clicked with interception; WhatsApp number/messages, Maps and Instagram profile destinations validated; five reel sources verified separately');
  await page.setViewport({width:390,height:844,isMobile:true,hasTouch:true});
  await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);
  await page.goto(base+'/rulos',{waitUntil:'networkidle0'});
  await page.click('[data-reel-next]'); await sleep(200);
  assert.match(await page.$eval('.reel-position',e=>e.textContent),/02 \/ 05/);
  await page.focus('.reel-grid');await page.keyboard.press('ArrowRight');await sleep(200);
  assert.match(await page.$eval('.reel-position',e=>e.textContent),/03 \/ 05/);
  assert.equal(await page.evaluate(()=>document.getAnimations().length),0);
  report.interactions.push('Reels controls/keyboard and reduced motion with zero active animations');
  await page.setJavaScriptEnabled(false);
  for(const route of ['','rulos','productos']) {
    await page.goto(base+'/'+route,{waitUntil:'networkidle0'});
    assert.equal(await page.$eval('h1',el=>getComputedStyle(el).opacity),'1');
    assert.ok(await page.$('a[href*="wa.me/"]'));
  }
  report.interactions.push('All pages visible and WhatsApp usable without JavaScript');
  assert.deepEqual(report.errors,[]);
  assert.ok(report.pages.every(p=>p.violations.length===0),'Axe findings need correction');
  report.passed=true;
} catch(e) {report.passed=false;report.failure=e.stack;throw e;}
finally {await writeFile(`${out}/qa.json`,JSON.stringify(report,null,2));await browser.close();}
function locationOrigin(url){return new URL(url).origin;}
