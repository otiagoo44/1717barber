// Read-only checks. Never submit messages, forms or bookings.
import {mkdir,writeFile} from 'node:fs/promises';
import {business} from '../src/data.mjs';
import {whatsappLink} from '../src/utils.mjs';
import {nativeBookingLink} from '../src/booking.mjs';
import {configureBooking} from './booking-config.mjs';
const out=process.env.QA_OUT||'docs/qa/native-booking';
await mkdir(out,{recursive:true});await configureBooking();
const report={date:new Date().toISOString(),links:[],limitations:['GET only; no messages or bookings submitted.']};
const links=[['WhatsApp',whatsappLink()],['Instagram',business.instagram],['Maps',business.maps]];
const booking=nativeBookingLink();
if(booking)links.push(['Barbería OS',booking]);else report.limitations.push('CRM production tenant not configured; booking URL verification pending.');
for(const [name,url] of links){
 try{const response=await fetch(url,{signal:AbortSignal.timeout(15000)});report.links.push({name,url,status:response.status,finalUrl:response.url});await response.body?.cancel();}
 catch(e){report.links.push({name,url,error:e.message});}
}
await writeFile(out+'/external-links.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
