import {createRequire} from 'node:module';
import {resolve} from 'node:path';
const req=createRequire(resolve(process.env.QA_TOOLS_DIR,'qa.cjs'));
const sharp=req('sharp');
const out=process.env.QA_OUT||'docs/qa/refinement';
// Contact sheets are QA artifacts only; source photographs are never modified.
for(const route of ['home','rulos','productos']) {
  const layers=[];
  for(const [i,w] of [375,390,430,768,1024,1440].entries()){
    const tile=await sharp(`${out}/${route}-${w}-full.png`).resize({width:300,height:1800,fit:'inside'}).toBuffer();
    const label=Buffer.from(`<svg width="320" height="30"><rect width="100%" height="100%" fill="white"/><text x="10" y="21" font-size="16">${route} · ${w}px</text></svg>`);
    layers.push({input:label,left:i*320,top:0},{input:tile,left:i*320+10,top:40});
  }
  await sharp({create:{width:1920,height:1840,channels:3,background:'#303030'}}).composite(layers).png().toFile(`${out}/${route}-review-board.png`);
}
