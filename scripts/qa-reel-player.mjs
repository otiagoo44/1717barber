import {createRequire} from 'node:module';
import {resolve} from 'node:path';
import {writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const require=createRequire(resolve(process.env.QA_TOOLS_DIR,'qa.cjs'));
const browser=await require('puppeteer-core').launch({executablePath:process.env.CHROME_PATH,headless:true,protocolTimeout:15000});
const out=process.env.QA_OUT||'docs/qa/refinement';
const report={reels:[],errors:[],mode:process.env.QA_LIVE_REELS?'live provider':'isolated shell with external iframe fixture; not a playback test'};
try{
  const page=await browser.newPage();
  page.setDefaultTimeout(10000);
  if(!process.env.QA_LIVE_REELS){
    await page.setRequestInterception(true);
    page.on('request',request=>request.url().startsWith('https://www.instagram.com/') ? request.respond({status:200,contentType:'text/html',body:'<!doctype html><html lang="es"><title>QA fixture</title><body>External embed isolated for dialog QA.</body></html>'}) : request.continue());
  }
  await page.setViewport({width:390,height:844,isMobile:true,hasTouch:true});
  page.on('pageerror',e=>report.errors.push(e.message));
  await page.goto((process.env.QA_URL||'http://127.0.0.1:4174')+'/rulos',{waitUntil:'networkidle0'});
  assert.equal(await page.$$eval('iframe',els=>els.length),0);
  const links=await page.$$('.reel-facade');
  assert.equal(links.length,5);
  console.log('Five facades found');
  for(let i=0;i<links.length;i++){
    console.log('Opening reel', i+1);
    await links[i].evaluate(el=>el.scrollIntoView({block:'center',inline:'center',behavior:'instant'}));
    console.log('Scrolled');
    await links[i].click();
    console.log('Clicked');
    await page.screenshot({path:`${out}/reel-open-${i+1}.png`});
    await page.waitForSelector('#reel-player[open] iframe');
    const src=await page.$eval('#reel-player iframe',el=>el.src);
    const info={number:i+1,src,loaded:false,videoPlaying:false};
    try{
      const frame=await (await page.$('#reel-player iframe')).contentFrame();
      await frame.waitForSelector('body',{timeout:8000});
      info.loaded=true;
      info.text=(await frame.evaluate(()=>document.body.innerText)).slice(0,350);
      const play=await frame.$('.PlayButtonSprite');
      if(play){await play.click();await new Promise(r=>setTimeout(r,1800));}
      info.video=await frame.evaluate(()=>[...document.querySelectorAll('video')].map(v=>({paused:v.paused,time:v.currentTime,ready:v.readyState})));
      info.videoPlaying=info.video.some(v=>!v.paused&&v.time>0);
    }catch(e){info.providerLimit=e.message;}
    await page.screenshot({path:`${out}/reel-player-${i+1}-390.png`});
    await page.click('[data-reel-player-close]');
    await page.waitForFunction(()=>!document.body.classList.contains('modal-open'));
    assert.equal(await page.$$eval('iframe',els=>els.length),0);
    assert.equal(await page.evaluate(()=>document.activeElement.matches('.reel-facade')),true);
    info.closeAndFocus=true;
    report.reels.push(info);console.log(JSON.stringify(info));
  }
  await links[0].click();
  await page.keyboard.press('Escape');
  await page.waitForFunction(()=>!document.body.classList.contains('modal-open'));
  report.escape=true;
}catch(e){report.failure=e.message;throw e;}finally{await writeFile(`${out}/reel-player${process.env.QA_LIVE_REELS?'-live':''}.json`,JSON.stringify(report,null,2));await browser.close();}
