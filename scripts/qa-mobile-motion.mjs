// Uses the same external browser tooling as qa-refinement.mjs.
import {createRequire} from 'node:module';
import {resolve} from 'node:path';
import {writeFile,mkdir} from 'node:fs/promises';
import assert from 'node:assert/strict';
const require=createRequire(resolve(process.env.QA_TOOLS_DIR,'qa.cjs'));
const browser=await require('puppeteer-core').launch({executablePath:process.env.CHROME_PATH,headless:true});
const base=process.env.QA_URL||'http://127.0.0.1:4174';
const out=process.env.QA_OUT||'docs/qa/mobile-elevation';
const report={sizes:[],checks:[],errors:[]};
await mkdir(out,{recursive:true});
try {
  const page=await browser.newPage();
  page.on('pageerror',e=>report.errors.push(e.message));
  for(const width of [320,360,844]) {
    await page.setViewport({width,height:width===844?390:800,isMobile:true,hasTouch:true});
    for(const route of ['/','/rulos','/productos']) {
      await page.goto(base+route,{waitUntil:'networkidle0'});
      const metrics=await page.evaluate(()=>({
        overflow:document.documentElement.scrollWidth>innerWidth,
        font:getComputedStyle(document.querySelector('h1')).fontFamily,
        ctaVisible:document.querySelector('main .button').getBoundingClientRect().bottom<innerHeight,
      }));
      assert.equal(metrics.overflow,false,`${route} at ${width}px`);
      assert.ok(metrics.font.includes('Archivo Black'));
      if(width!==844) assert.ok(metrics.ctaVisible,'Primary CTA above fold');
      report.sizes.push({route,width,...metrics});
      await page.screenshot({path:`${out}/extra-${route==='/'?'home':route.slice(1)}-${width}.png`});
    }
  }
  await page.setViewport({width:390,height:844,isMobile:true,hasTouch:true});
  await page.goto(base,{waitUntil:'networkidle0'});
  await page.$eval('#galeria',el=>el.scrollIntoView({behavior:'instant'}));
  await page.waitForFunction(()=>document.body.classList.contains('booking-visible'));
  assert.equal(await page.$eval('.mobile-booking',el=>getComputedStyle(el).visibility),'visible');
  await page.evaluate(()=>['Rulos','Color','Cortes','Todos'].forEach(c=>document.querySelector(`[data-gallery-filter="${c}"]`).click()));
  await page.waitForFunction(()=>document.querySelectorAll('.result-tile:not([hidden])').length===4);
  const running=await page.evaluate(()=>document.getAnimations().filter(a=>a.effect?.target.matches?.('.result-tile')).length);
  assert.ok(running>0,'Gallery visibly animates');
  await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);
  await page.waitForFunction(()=>document.getAnimations().length===0);
  report.checks.push('Rapid gallery filters settle on all four photos; live reduced-motion cancels every animation');
  await page.click('.menu-toggle');
  assert.equal(await page.$eval('.mobile-booking',el=>getComputedStyle(el).visibility),'hidden');
  await page.keyboard.press('Escape');
  report.checks.push('Booking appears after hero; hidden while menu is open');
  await page.setJavaScriptEnabled(false);
  await page.goto(base,{waitUntil:'networkidle0'});
  assert.equal(await page.$eval('.mobile-booking',el=>getComputedStyle(el).visibility),'visible');
  report.checks.push('No-JS floating booking stays available');
  assert.deepEqual(report.errors,[]);
  report.passed=true;
} catch(e) {report.passed=false;report.failure=e.stack;throw e;}
finally{await writeFile(`${out}/mobile-motion.json`,JSON.stringify(report,null,2));await browser.close();}
