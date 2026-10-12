// Extra final-content checks and real-viewport evidence; QA tools stay external.
import {createRequire} from 'node:module';
import {resolve} from 'node:path';
import {mkdir,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {business,founders,products} from '../src/data.mjs';
const require=createRequire(resolve(process.env.QA_TOOLS_DIR,'qa.cjs'));
const browser=await require('puppeteer-core').launch({executablePath:process.env.CHROME_PATH,headless:true});
const out=process.env.QA_OUT||'docs/qa/final-content/verified';
const base=process.env.QA_URL||'http://127.0.0.1:4174';
const report={date:new Date().toISOString(),sections:[],menus:[],checks:[],errors:[]};
await mkdir(out,{recursive:true});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
try {
  const page=await browser.newPage();
  page.on('pageerror',e=>report.errors.push(e.message));
  page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());});
  for(const width of [390,768,1440]) {
    await page.setViewport({width,height:900,isMobile:width===390,hasTouch:width===390});
    await page.goto(base,{waitUntil:'networkidle0'});
    await page.evaluate(async()=>{
      document.querySelectorAll('img').forEach(i=>i.loading='eager');
      await Promise.all([...document.images].map(i=>i.decode()));
      for(let y=0;y<document.body.scrollHeight;y+=500){scrollTo({top:y,behavior:'instant'});await new Promise(r=>setTimeout(r,160));}
    });
    await sleep(1300);
    report.sections.push({width,pendingAfterSweep:await page.$$eval('.reveal-pending',els=>els.map(el=>({tag:el.tagName,text:el.textContent.slice(0,80)})))});
    for(const [name,selector] of [['founders','.founder-names'],['team','.team-photo'],['local','.location-photos'],['gallery','.portfolio-grid']]) {
      await page.$eval(selector,el=>el.scrollIntoView({block:'center',behavior:'instant'}));
      await sleep(1100);
      const state=await page.$eval(selector,el=>({opacity:getComputedStyle(el).opacity,pending:el.matches('.reveal-pending')||!!el.querySelector('.reveal-pending'),broken:[...el.querySelectorAll('img')].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src)}));
      assert.equal(state.opacity,'1');assert.equal(state.pending,false);assert.deepEqual(state.broken,[]);
      await page.screenshot({path:`${out}/${name}-${width}-viewport.png`});
      if(name==='founders') {
        const profiles=await page.$$eval('.founder-profile',els=>els.map(el=>({name:el.querySelector('h3').textContent,role:el.querySelector('span').textContent,headline:el.querySelector('h4').textContent,bio:el.querySelector('.founder-story p').textContent,font:getComputedStyle(el.querySelector('h3')).fontSize})));
        assert.deepEqual(profiles.map(p=>p.name),founders.map(f=>f.name));
        assert.ok(profiles.every(p=>p.role==='Cofundador'&&p.font===profiles[0].font));
        assert.deepEqual(profiles.map(p=>p.bio),founders.map(f=>f.bio));
        report.sections.push({width,name,state,profiles});
      } else report.sections.push({width,name,state});
    }
    // Capture after visiting the actual section viewports, without cancelling motion.
    for(const target of await page.$$('.reveal-pending')) {
      await target.evaluate(el=>el.scrollIntoView({block:'center',behavior:'instant'}));
      await sleep(1100);
      assert.equal(await target.evaluate(el=>el.classList.contains('reveal-pending')),false);
    }
    await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
    await sleep(1300);
    assert.equal(await page.$$eval('.reveal-pending',els=>els.length),0);
    await page.screenshot({path:`${out}/home-${width}-full.png`,fullPage:true});
  }
  for(const route of ['','rulos','productos']) {
    await page.setViewport({width:390,height:900,isMobile:true,hasTouch:true});
    await page.goto(base+'/'+route,{waitUntil:'networkidle0'});
    await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(()=>document.activeElement.matches('.skip-link')),true);
    const focus=await page.$eval('.skip-link',el=>({outline:getComputedStyle(el).outlineStyle,visible:el.getBoundingClientRect().top>=0}));
    assert.equal(focus.visible,true);
    await page.keyboard.press('Enter');
    assert.equal(new URL(page.url()).hash,'#main');
    await page.click('.menu-toggle');
    await checkFocusCycle(page,'#mobile-menu');
    await page.evaluate(()=>{
      window.qaMenuClicks=[];
      document.querySelector('#mobile-menu').addEventListener('click',ev=>{const a=ev.target.closest('a');if(a){ev.preventDefault();ev.stopImmediatePropagation();window.qaMenuClicks.push(a.href);}},true);
    });
    for(const a of await page.$$('#mobile-menu a')) await a.click();
    const links=await page.evaluate(()=>window.qaMenuClicks);
    assert.ok(links.includes(business.booking.url));
    assert.ok(links.includes(base+(route?'/rulos':'/#rulos')));
    await page.keyboard.press('Escape');
    assert.equal(await page.evaluate(()=>document.activeElement.matches('.menu-toggle')),true);
    report.menus.push({route:route||'/',links,focus});
  }
  await page.goto(base,{waitUntil:'networkidle0'});
  await page.click('[data-gallery-filter="Rulos"]');
  await page.click('.photo-trigger');
  await checkFocusCycle(page,'#lightbox');
  assert.equal(await page.$eval('.lightbox-count',el=>el.textContent),'1 / 2');
  await page.keyboard.press('ArrowRight');
  assert.equal(await page.$eval('.lightbox-count',el=>el.textContent),'2 / 2');
  await page.keyboard.press('Escape');
  await page.waitForFunction(()=>!document.body.classList.contains('modal-open'));
  await page.goto(base+'/rulos',{waitUntil:'networkidle0'});
  await page.click('.reel-facade');
  await page.waitForSelector('#reel-player[open]');
  await checkFocusCycle(page,'#reel-player');
  await page.keyboard.press('Escape');
  await page.waitForFunction(()=>!document.body.classList.contains('modal-open'));
  report.checks.push('Skip link, visible focus, all mobile menu links, forward/reverse Tab cycles in menu/lightbox/reel player, filtered lightbox keyboard navigation');
  await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);
  for(const route of ['','rulos','productos']) {
    await page.goto(base+'/'+route,{waitUntil:'networkidle0'});
    assert.equal(await page.$$eval('.reveal-pending',els=>els.length),0);
    assert.equal(await page.evaluate(()=>document.getAnimations().length),0);
    if(route==='productos') {
      assert.equal(await page.$$eval('.product-item',els=>els.length),products.filter(p=>p.verified&&p.image).length);
      assert.equal(await page.evaluate(()=>document.body.classList.contains('booking-managed')),false);
    }
  }
  report.checks.push('All three routes static with reduced motion; five catalog products and no floating-booking observer on catalog');
  assert.deepEqual(report.errors,[]);
  report.passed=true;
} catch(e) {report.passed=false;report.failure=e.stack;throw e;}
finally {await writeFile(`${out}/final-content.json`,JSON.stringify(report,null,2));await browser.close();}
async function checkFocusCycle(page,selector) {
  const controls=await page.$$(selector+' a[href],'+selector+' button:not([disabled]),'+selector+' video[controls]');
  const visible=[];for(const c of controls)if(await c.isVisible())visible.push(c);
  await visible.at(-1).focus();await page.keyboard.press('Tab');
  assert.equal(await visible[0].evaluate(el=>el===document.activeElement),true,`${selector}: Tab returns to first control`);
  await page.keyboard.down('Shift');await page.keyboard.press('Tab');await page.keyboard.up('Shift');
  assert.equal(await visible.at(-1).evaluate(el=>el===document.activeElement),true,`${selector}: Shift+Tab returns to last control`);
}
