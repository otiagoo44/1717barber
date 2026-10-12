// Optional media maintenance, never part of deploy; original MP4 stays intact.
import {createRequire} from 'node:module';
import {resolve} from 'node:path';
import {execFileSync} from 'node:child_process';
import {mkdir,readFile,writeFile,stat} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {rulosReels} from '../src/data.mjs';
const require=createRequire(resolve(process.env.QA_TOOLS_DIR,'qa.cjs'));
const sharp=require('sharp');
const source='public'+rulosReels.at(-1).video;
const out='docs/qa/booking-services';
const temp=resolve(process.env.TEMP,'1717-hero-final-frame.png');
execFileSync(process.env.FFMPEG_PATH||'ffmpeg',['-v','error','-y','-sseof','-2','-i',source,'-an','-update','1',temp]);
const frame=await readFile(temp), metadata=await sharp(frame).metadata();
const files=[];
for(const width of [360,600,metadata.width]) for(const format of ['webp','avif']) {
  const path=`public/assets/media/rulos-hero-final${width===metadata.width?'':'-'+width}.${format}`;
  await sharp(frame).resize({width,withoutEnlargement:true}).toFormat(format,{quality:format==='webp'?84:58,effort:4}).toFile(path);
  files.push({path,bytes:(await stat(path)).size});
}
await mkdir(out,{recursive:true});
await writeFile(out+'/hero-source.json',JSON.stringify({source,reelId:rulosReels.at(-1).id,extraction:'Final decoded video frame; no photographic crop, retouch or upscale',sourceSha256:createHash('sha256').update(await readFile(source)).digest('hex'),width:metadata.width,height:metadata.height,files},null,2));
console.log(`Hero: ${metadata.width}×${metadata.height}, final frame of ${rulosReels.at(-1).id}`);
