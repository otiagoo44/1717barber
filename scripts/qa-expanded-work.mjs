import {createRequire} from 'node:module';
import {resolve} from 'node:path';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const require=createRequire(resolve(process.env.QA_TOOLS_DIR,'qa.cjs'));
const {AxePuppeteer}=require('@axe-core/puppeteer');
const browser=await require('puppeteer-core').launch({executablePath:process.env.CHROME_PATH,headless:true});
const base=process.env.QA_URL||'http://127.0.0.1:4174',out=process.env.QA_OUT||'docs/qa/expanded-work/after';
await mkdir(out,{recursive:true});
const report={date:new Date().toISOString(),pages:[],videos:[],checks:[],errors:[]};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
try{
  const page=await browser.newPage();page.on('pageerror',e=>report.errors.push(e.message));page.on('console',m=>{if(m.type()==='error')report.errors.push(`${m.text()} (${m.location().url})`);});page.on('response',r=>{if(r.status()>=400)console.log(`HTTP ${r.status()}: ${r.url()}`);});
  if(process.env.QA_INTERACTIONS_ONLY) report.pages=JSON.parse(await readFile(out+'/expanded-work.json','utf8')).pages;
  if(!process.env.QA_INTERACTIONS_ONLY) for(const width of [375,390,430,768,1024,1366,1440,1920]){
    await page.setViewport({width,height:900,isMobile:width<500,hasTouch:width<500});
    await page.goto(base+'/trabajos',{waitUntil:'networkidle0'});
    assert.equal(await page.$$eval('.work-card',els=>els.length),40);
    assert.equal(await page.$$eval('.work-card',els=>els.filter(e=>!e.hidden).length),12);
    assert.equal(await page.evaluate(()=>performance.getEntriesByType('resource').some(r=>/\.mp4/.test(r.name))),false);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
    await page.screenshot({path:`${out}/trabajos-${width}-viewport.png`});
    while(await page.$eval('[data-work-more]',e=>!e.hidden))await page.click('[data-work-more]');
    assert.equal(await page.$$eval('.work-card',els=>els.filter(e=>!e.hidden).length),40);
    await settle(page);
    const axe=await new AxePuppeteer(page).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();assert.deepEqual(axe.violations.map(v=>v.id),[]);
    await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await sleep(1100);
    await page.screenshot({path:`${out}/trabajos-${width}-full.png`,fullPage:true});
    report.pages.push({width,cards:40,photos:24,videos:16,axe:0,overflow:false,initialVideoRequests:0});console.log(`Trabajos ${width}: PASS`);
  }
  await page.setViewport({width:390,height:900,isMobile:true,hasTouch:true});await page.goto(base+'/trabajos',{waitUntil:'networkidle0'});
  for(const category of ['Todos','Cortes','Rulos','Color','Proceso'])for(const format of ['Todos','photo','video']){
    await page.click(`[data-work-category="${category}"]`);await page.click(`[data-work-format="${format}"]`);
    const state=await page.$$eval('.work-card',(els,{category,format})=>({expected:els.filter(e=>(category==='Todos'||e.dataset.category===category)&&(format==='Todos'||e.dataset.workType===format)).length,shown:els.filter(e=>!e.hidden).map(e=>({category:e.dataset.category,type:e.dataset.workType}))}),{category,format});
    assert.equal(state.shown.length,Math.min(12,state.expected));assert.ok(state.shown.every(e=>(category==='Todos'||e.category===category)&&(format==='Todos'||e.type===format)));
    assert.equal(await page.$eval('[data-work-empty]',e=>!e.hidden),state.expected===0);
  }
  await page.goto(base+'/trabajos?categoria=Rulos',{waitUntil:'networkidle0'});assert.equal(await page.$eval('[data-work-category="Rulos"]',e=>e.getAttribute('aria-pressed')),'true');
  await page.click('[data-work-category="Todos"]');await page.click('[data-work-format="photo"]');await page.click('.work-card:not([hidden]) .photo-trigger');
  assert.equal(await page.$eval('#lightbox',e=>e.open),true);await page.keyboard.press('ArrowRight');assert.equal(await page.$eval('.lightbox-count',e=>e.textContent),'2 / 12');await page.keyboard.press('Escape');assert.equal(await page.evaluate(()=>document.activeElement.matches('.photo-trigger')),true);
  await page.click('[data-work-format="video"]');await page.click('[data-work-more]');
  const ids=await page.$$eval('.work-card:not([hidden])',els=>els.map(e=>e.dataset.workId));
  for(const id of ids){const trigger=`[data-work-id="${id}"] .reel-facade`;await page.click(trigger);await page.waitForSelector('#reel-player[open] video');
    await page.waitForFunction(()=>{const v=document.querySelector('#reel-player video');return v&&!v.paused&&v.currentTime>.4&&!v.error},{timeout:15000});
    const state=await page.$eval('#reel-player video',v=>({time:v.currentTime,frames:v.getVideoPlaybackQuality().totalVideoFrames,width:v.videoWidth,height:v.videoHeight}));assert.ok(state.frames>0);assert.equal(await page.$$('video').then(els=>els.length),1);
    const source=await page.$eval(trigger,e=>e.dataset.reelSource);assert.equal(await page.$eval('[data-reel-player-external]',e=>e.hidden),!source);
    if(id==='video-04')await page.screenshot({path:`${out}/corte-player-390.png`});
    await page.keyboard.press('Escape');await page.waitForFunction(()=>!document.body.classList.contains('modal-open'));assert.equal(await page.$('#reel-player video'),null);assert.equal(await page.$eval(trigger,e=>e===document.activeElement),true);report.videos.push({id,...state});console.log(`${id}: native playback PASS`);
  }
  await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);await page.goto(base+'/trabajos',{waitUntil:'networkidle0'});await page.click('[data-work-more]');assert.equal(await page.evaluate(()=>document.getAnimations().length),0);
  await page.setJavaScriptEnabled(false);await page.goto(base+'/trabajos',{waitUntil:'networkidle0'});assert.equal(await page.$$eval('.work-card',els=>els.filter(e=>!e.hidden).length),40);assert.equal(await page.$eval('[data-work-category]',e=>e.getBoundingClientRect().width),0);
  const photoUrl=await page.$eval('.photo-trigger',e=>e.href);await Promise.all([page.waitForNavigation({waitUntil:'networkidle0'}),page.click('.photo-trigger')]);assert.equal(page.url(),photoUrl);
  report.checks.push('15 category/format combinations; correct empty state; progressive show-more; prefiltered Rulos URL; filtered photo dialog/keyboard/focus; all sixteen videos really played and unload; no invented Instagram link for WhatsApp clips; reduced motion; all content and photo links usable without JS');
  assert.deepEqual(report.errors,[]);report.passed=true;
}catch(e){report.passed=false;report.failure=e.stack;throw e;}finally{await writeFile(out+'/expanded-work.json',JSON.stringify(report,null,2));await browser.close();}
async function settle(page){await page.evaluate(async()=>{await document.fonts.ready;document.querySelectorAll('img').forEach(i=>i.loading='eager');await Promise.all([...document.images].map(i=>i.decode()));for(let y=0;y<document.body.scrollHeight;y+=500){scrollTo({top:y,behavior:'instant'});await new Promise(r=>setTimeout(r,160));}});await sleep(1300);for(const el of await page.$$('.reveal-pending')){if(await el.isVisible()){await el.evaluate(e=>e.scrollIntoView({block:'center',behavior:'instant'}));await sleep(1100);}}}
