import {createRequire} from 'node:module';
import {resolve} from 'node:path';
import {writeFile,mkdir} from 'node:fs/promises';
import assert from 'node:assert/strict';
const require=createRequire(resolve(process.env.QA_TOOLS_DIR,'qa.cjs'));
const browser=await require('puppeteer-core').launch({executablePath:process.env.CHROME_PATH,headless:true});
const out=process.env.QA_OUT||'docs/qa/reels-motion-fix';
const base=process.env.QA_URL||'http://127.0.0.1:4175';
const report={entries:[]};
await mkdir(out,{recursive:true});
try{
  const page=await browser.newPage();
  for(const width of [390,1440]){
    await page.setViewport({width,height:844});
    for(const selector of ['.feature-copy h2','.feature-photo','.service-row','.result-tile']){
      await page.goto(base,{waitUntil:'networkidle0'});
      const frames=await page.evaluate(async selector=>{
        const el=document.querySelector(selector),samples=[];
        const sample=()=>({opacity:Number(getComputedStyle(el).opacity),transform:getComputedStyle(el).transform});
        samples.push(sample());
        window.scrollTo({top:scrollY+el.getBoundingClientRect().top-innerHeight*.55,behavior:'instant'});
        for(let i=0;i<75;i++){await new Promise(requestAnimationFrame);samples.push(sample());}
        return samples;
      },selector);
      assert.equal(frames[0].opacity,0,'Entry is prepared before visibility');
      assert.ok(frames.at(-1).opacity>.99);
      assert.ok(frames.filter(f=>f.opacity>0&&f.opacity<1).length>4,'Real intermediate frames');
      assert.ok(frames.every((f,i)=>!i||f.opacity>=frames[i-1].opacity-.005),'Opacity never drops on entry');
      const opacity=await page.$eval(selector,el=>getComputedStyle(el).opacity);
      await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
      await page.$eval(selector,el=>el.scrollIntoView({behavior:'instant'}));
      assert.equal(await page.$eval(selector,el=>getComputedStyle(el).opacity),opacity,'No replay after scrolling back');
      report.entries.push({width,selector,samples:frames});
    }
  }
  await page.goto(base,{waitUntil:'networkidle0'});
  assert.ok(await page.$$eval('.reveal-pending',els=>els.length>0));
  await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);
  await page.waitForFunction(()=>!document.querySelector('.reveal-pending')&&document.getAnimations().length===0);
  await page.setJavaScriptEnabled(false);
  await page.goto(base,{waitUntil:'networkidle0'});
  assert.equal(await page.$eval('.feature-photo',el=>getComputedStyle(el).opacity),'1');
  report.passed=true;
}catch(e){report.passed=false;report.failure=e.stack;throw e;}
finally{await writeFile(`${out}/scroll-entry.json`,JSON.stringify(report,null,2));await browser.close();}
