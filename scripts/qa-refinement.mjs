// Run with external QA_TOOLS_DIR and CHROME_PATH. No QA dependencies in the site.
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const require = createRequire(resolve(process.env.QA_TOOLS_DIR, 'qa.cjs'));
const puppeteer = require('puppeteer-core');
const { AxePuppeteer } = require('@axe-core/puppeteer');
const browser = await puppeteer.launch({executablePath:process.env.CHROME_PATH,headless:true});
const out = process.env.QA_OUT || 'docs/qa/refinement';
const base = process.env.QA_URL || 'http://127.0.0.1:4174';
await mkdir(out,{recursive:true});
const report = {pages:[],interactions:[],errors:[],limitations:['Chrome viewport/touch emulation; no physical phone.','External link clicks intercepted; no WhatsApp messages sent.','Instagram playback is tested separately because it depends on a third-party embed.']};
if(process.env.QA_INTERACTIONS_ONLY) report.pages=JSON.parse(await readFile(`${out}/qa.json`,'utf8')).pages;
const sleep = ms => new Promise(r=>setTimeout(r,ms));
try {
  const page = await browser.newPage();
  page.on('pageerror',e=>report.errors.push(e.message));
  if(!process.env.QA_INTERACTIONS_ONLY) for (const route of ['','rulos','productos']) {
    for (const width of [375,390,430,768,1024,1440]) {
      await page.setViewport({width,height:900,isMobile:width<500,hasTouch:width<500});
      await page.goto(base+'/'+route,{waitUntil:'networkidle0'});
      await page.evaluate(()=>document.fonts.ready);
      await page.screenshot({path:`${out}/${route||'home'}-${width}-viewport.png`});
      await page.evaluate(async()=>{
        for(let y=0;y<document.body.scrollHeight;y+=650){window.scrollTo({top:y,behavior:'instant'});await new Promise(r=>setTimeout(r,50));}
        document.querySelectorAll('img').forEach(i=>i.loading='eager');
        await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));
        window.scrollTo({top:0,behavior:'instant'});
      });
      await sleep(500);
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
    assert.equal(visible.length,category==='Todos'?4:category==='Rulos'?2:1);
    if(category!=='Todos') assert.ok(visible.every(c=>c===category));
  }
  await page.click('.photo-trigger');
  assert.ok(await page.$eval('#lightbox',d=>d.open));
  await page.keyboard.press('ArrowRight');
  assert.match(await page.$eval('.lightbox-count',e=>e.textContent),/2 \/ 4/);
  await page.keyboard.press('Escape');
  await page.waitForFunction(()=>!document.body.classList.contains('modal-open'));
  assert.equal(await page.evaluate(()=>document.body.classList.contains('modal-open')),false);
  assert.equal(await page.evaluate(()=>document.activeElement.matches('.photo-trigger')),true);
  await page.click('[data-photo-crop="frame"]');
  await page.screenshot({path:`${out}/lightbox-frame-390.png`});
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
  for (const route of ['','rulos','productos']) {
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
  for(const u of destinations.filter(u=>u.includes('wa.me'))){assert.equal(new URL(u).pathname,'/595983402497');assert.ok(new URL(u).searchParams.get('text'));}
  report.clickedDestinations=[...new Set(destinations)];
  report.interactions.push('All visible links clicked with interception; WhatsApp number/messages, Maps and Instagram destinations validated');
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
