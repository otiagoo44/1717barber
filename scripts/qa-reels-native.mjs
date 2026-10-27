import {createRequire} from 'node:module';
import {resolve} from 'node:path';
import {writeFile,mkdir} from 'node:fs/promises';
import assert from 'node:assert/strict';
const require=createRequire(resolve(process.env.QA_TOOLS_DIR,'qa.cjs'));
const browser=await require('puppeteer-core').launch({executablePath:process.env.CHROME_PATH,headless:true});
const out=process.env.QA_OUT||'docs/qa/reels-motion-fix';
const base=process.env.QA_URL||'http://127.0.0.1:4175';
const report={reels:[],errors:[],mode:'Real local MP4 playback; no mocked media'};
await mkdir(out,{recursive:true});
try{
  const page=await browser.newPage();
  page.on('pageerror',e=>report.errors.push(e.message));
  const requests=[];
  page.on('request',r=>requests.push(r.url()));
  let popups=0;page.on('popup',()=>popups++);
  for(const [width,height] of [[390,844],[1440,900],[844,390]]) {
    await page.setViewport({width,height,isMobile:width<900,hasTouch:width<900});
    const start=requests.length;
    await page.goto(base+'/rulos',{waitUntil:'networkidle0'});
    assert.ok(requests.slice(start).every(u=>!u.includes('.mp4')&&!u.includes('instagram.com')),'No video/Instagram initial download');
    const facades=await page.$$('.reel-facade');
    assert.equal(facades.length,5);
    for(const i of width===390?[0,1,2,3,4]:[0]) {
      await facades[i].evaluate(el=>el.scrollIntoView({block:'center',inline:'center',behavior:'instant'}));
      await facades[i].click();
      await page.waitForSelector('#reel-player[open] video');
      await page.waitForFunction(()=>{const v=document.querySelector('#reel-player video');return v&&!v.paused&&v.currentTime>.8&&v.readyState>=2;},{timeout:20000});
      const info=await page.$eval('#reel-player video',v=>({src:v.currentSrc,time:v.currentTime,duration:v.duration,muted:v.muted,volume:v.volume,decodedAudioBytes:v.webkitAudioDecodedByteCount,controls:v.controls,inline:v.playsInline,frames:v.getVideoPlaybackQuality().totalVideoFrames}));
      assert.ok(info.frames>0);assert.ok(info.controls&&info.inline);assert.equal(info.muted,false);
      assert.ok(info.volume>0);assert.ok(info.decodedAudioBytes>0,'Original audio is decoded during playback');
      assert.equal(await page.$$eval('iframe',els=>els.length),0);
      assert.equal(page.url(),base+'/rulos');
      if(i===0){
        await page.$eval('#reel-player video',v=>v.pause());
        assert.equal(await page.$eval('#reel-player video',v=>v.paused),true);
        await page.$eval('#reel-player video',v=>{v.currentTime=5;return v.play();});
        await page.waitForFunction(()=>document.querySelector('#reel-player video').currentTime>5.3);
      }
      await page.screenshot({path:`${out}/reel-${i+1}-${width}.png`});
      const video=await page.$('#reel-player video');
      if(i%2===0) await page.keyboard.press('Escape');else await page.click('[data-reel-player-close]');
      await page.waitForFunction(()=>!document.body.classList.contains('modal-open'));
      assert.ok(await video.evaluate(v=>v.paused&&!v.getAttribute('src')),'Close stops and unloads video');
      assert.equal(await page.evaluate(()=>document.activeElement.matches('.reel-facade')),true);
      assert.equal(await page.$$eval('video',els=>els.length),0);
      report.reels.push({width,number:i+1,...info,closeAndFocus:true});
      console.log(`Reel ${i+1} at ${width}: ${info.frames} real frames, ${info.time.toFixed(2)}s, closed and unloaded`);
    }
  }
  assert.equal(popups,0);assert.deepEqual(report.errors,[]);
  report.passed=true;
}catch(e){report.passed=false;report.failure=e.stack;throw e;}
finally{await writeFile(`${out}/native-reels.json`,JSON.stringify(report,null,2));await browser.close();}
