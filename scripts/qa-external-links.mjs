// Read-only checks. Never submit messages, forms or bookings.
import {createRequire} from 'node:module';
import {resolve} from 'node:path';
import {mkdir,writeFile} from 'node:fs/promises';
import {business} from '../src/data.mjs';
import {whatsappLink} from '../src/utils.mjs';
const out=process.env.QA_OUT||'docs/qa/final-content/verified';
await mkdir(out,{recursive:true});
const report={date:new Date().toISOString(),links:[],cal:[],limitations:['GET and read-only calendar inspection only; no messages or bookings submitted.']};
for(const [name,url] of [['WhatsApp',whatsappLink()],['Instagram',business.instagram],['Maps',business.maps]]) {
  try {
    const response=await fetch(url,{signal:AbortSignal.timeout(30000)});
    report.links.push({name,url,status:response.status,finalUrl:response.url});
    await response.body?.cancel();
  } catch(e) {report.links.push({name,url,error:e.message});}
}
const require=createRequire(resolve(process.env.QA_TOOLS_DIR,'qa.cjs'));
const browser=await require('puppeteer-core').launch({executablePath:process.env.CHROME_PATH,headless:true});
try {
  const page=await browser.newPage();
  await page.emulateTimezone('America/Asuncion');
  for(const width of [390,1440]) {
    await page.setViewport({width,height:900,isMobile:width===390,hasTouch:width===390});
    try {
      const response=await page.goto(business.booking.url,{waitUntil:'domcontentloaded',timeout:60000});
      await page.waitForFunction(()=>document.body.innerText.includes('40')&&document.body.innerText.includes('Cal Video'),{timeout:20000}).catch(()=>{});
      await new Promise(r=>setTimeout(r,2000));
      const info=await page.evaluate(()=>({title:document.title,text:document.body.innerText,overflow:document.documentElement.scrollWidth>innerWidth}));
      await page.screenshot({path:`${out}/cal-${width}.png`});
      report.cal.push({width,status:response?.status(),url:page.url(),...info});
    } catch(e) {report.cal.push({width,error:e.message});}
  }
} finally {await browser.close();await writeFile(`${out}/external-links.json`,JSON.stringify(report,null,2));}
console.log(JSON.stringify(report,null,2));
