import test from "node:test";
import assert from "node:assert/strict";
import {bookable,validCustomer,normalizePhone,localDay,escapeHtml,liveBranch} from "../public/assets/booking-model.js";
test("Consulta previa y composiciones no se convierten en reservas directas",()=>{
 const base={consultation_required:false,composition_mode:"standalone",website_category:"corte"};
 assert.equal(bookable(base),true);
 for(const extra of [{consultation_required:true},{website_category:"rulos"},{website_category:"tinte"},{composition_mode:"included"},{composition_mode:"additive"}]) assert.equal(bookable({...base,...extra}),false);
});
test("Datos opcionales y WhatsApp internacional coinciden con el contrato del CRM",()=>{
 assert.equal(normalizePhone(" +595 (981) 234-567 "),"+595981234567");
 assert.equal(validCustomer({name:"Real",phone:"+595981234567",email:""}),"");
 for(const extra of [{name:" "},{phone:"0981234567"},{email:"bad"}])assert.ok(validCustomer({name:"Real",phone:"+595981234567",email:"",...extra}));
 assert.equal(localDay("America/Asuncion",new Date("2026-11-03T01:00:00Z")),"2026-11-02");
 assert.equal(escapeHtml('<img src=x onerror="bad">'),'&lt;img src=x onerror=&quot;bad&quot;&gt;');
 assert.throws(()=>liveBranch({slug:"other"},"1717-barberia","luque"));
});
