import {escapeHtml as e, bookable, liveBranch, validCustomer, normalizePhone, localDay, localTime, localDate, money} from "./booking-model.js";

const root = document.querySelector("[data-booking]");
if(root) start(root);
function start(root) {
  const {origin, organization, branch:branchSlug, consult} = root.dataset;
  const body = root.querySelector("[data-booking-body]"), error = root.querySelector("[data-booking-error]");
  const backup = document.querySelector("[data-booking-backup]"), fallback = root.querySelector("[data-native-fallback]");
  const storeKey = `1717-booking:${organization}:${branchSlug}`;
  let branch, step=0, service="", staff="", day="", time="", slots=[], busy=false, operation=null, receipt=null, uncertain=false, controller, generation=0;
  const customer = {name:"",phone:"",email:""};
  root.hidden=false;
  function notice(text="") { error.textContent=text; error.hidden=!text; }
  function heading() { body.querySelector("h2")?.focus({preventScroll:true}); }
  function move(next) { step=next; notice(); render(); heading(); }
  function storage(value) { if(value) sessionStorage.setItem(storeKey,JSON.stringify(value)); else sessionStorage.removeItem(storeKey); }
  function rememberInputs() { for(const input of body.querySelectorAll("[data-customer]")) customer[input.name]=input.value; }
  function pendingUi() {
    // An ambiguous network outcome must be retried with the SAME immutable body
    // and UUID, including after reload. Never send a second create request.
    fallback.hidden=Boolean(operation || receipt);
    fallback.closest("p").hidden=Boolean(operation || receipt);
    if(backup) backup.hidden=Boolean(operation || receipt);
  }
  async function api(resource, query, payload, signal) {
    const url=new URL(`/api/public/${resource}`,origin);
    if(query) url.search=new URLSearchParams(query);
    const response=await fetch(url,{method:payload?"POST":"GET",credentials:"omit",redirect:"error",cache:"no-store",signal:signal || AbortSignal.timeout(18000),headers:payload?{"Content-Type":"application/json"}:{},...(payload?{body:JSON.stringify(payload)}:{})});
    if(!response.headers.get("content-type")?.includes("application/json")) throw Error("El local no respondió correctamente.");
    const data=await response.json();
    if(!response.ok) { const failure=Error(data.error || "No pudimos completar la solicitud."); failure.status=response.status; throw failure; }
    return data;
  }
  async function load() {
    busy=true; body.innerHTML='<p role="status">Consultando servicios actuales…</p>'; notice();
    try {
      const saved=JSON.parse(sessionStorage.getItem(storeKey)||"null");
      if(saved?.operation?.organization===organization && saved.operation.branch===branchSlug && /^[0-9a-f-]{36}$/i.test(saved.operation.key)){operation=saved.operation;uncertain=true;}
      if(saved?.receipt?.reference) receipt=saved.receipt;
      if((operation||receipt)&&saved.branch) branch=liveBranch({slug:organization,currency:"PYG",website_booking_version:1,branches:[saved.branch]},organization,branchSlug);
    } catch {/* Never invent a request when browser state is unavailable. */}
    pendingUi();
    try {
      branch=liveBranch(await api("catalog",{organization,branch:branchSlug}),organization,branchSlug);
      day=localDay(branch.timezone);
      const requested=new URLSearchParams(location.search).get("service");
      service=branch.services.find(s=>s.slug===requested&&bookable(s))?.slug || "";
      if(backup) backup.open=false;
      render();
      if(requested && branch.services.some(s=>s.slug===requested&&!bookable(s))) notice("Este servicio requiere consulta previa. Escribir por WhatsApp no confirma una reserva.");
    } catch {
      if(branch&&(operation||receipt)){render();return;}
      body.innerHTML='<h2 tabindex="-1">No pudimos cargar la agenda</h2><p>Podés volver a intentar o continuar en la agenda del local.</p><button type="button" class="button" data-reload>Reintentar</button>';
      if(backup) backup.open=true;
    } finally {busy=false;if(branch&&(operation||receipt)){step=4;render();}}
  }
  function serviceInfo() { return branch.services.find(s=>s.slug===service); }
  function summary(confirmed) {
    const selected=serviceInfo();
    const names=confirmed?.services?.map(s=>s.name).join(" + ") || selected?.name;
    return `<dl class="booking-summary"><div><dt>Servicio</dt><dd>${e(names)}</dd></div><div><dt>Profesional</dt><dd>${e(confirmed?.staff?.name || branch.staff.find(s=>s.slug===staff)?.name || "Cualquiera disponible · asignación al confirmar")}</dd></div><div><dt>Fecha</dt><dd>${e(localDate(confirmed?.starts_at || time,branch.timezone))}</dd></div><div><dt>Hora</dt><dd>${e(localTime(confirmed?.starts_at || time,branch.timezone))} · ${e(confirmed?.duration_minutes || selected?.duration_minutes)} min</dd></div>${confirmed?`<div><dt>Referencia</dt><dd class="booking-reference">${e(confirmed.reference)}</dd></div>`:`<div><dt>Precio del servicio</dt><dd>${e(money(selected.price_minor))}</dd></div>`}</dl>`;
  }
  function render() {
    pendingUi();
    root.querySelector("progress").value=receipt?5:step+1;
    root.querySelector("[data-progress-label]").textContent=receipt?"Reserva confirmada":`Paso ${step+1} de 5 · ${["Servicio","Barbero","Horario","Tus datos","Confirmación"][step]}`;
    root.querySelectorAll("[data-progress-step]").forEach((el,i)=>{if(i===step)el.setAttribute("aria-current","step");else el.removeAttribute("aria-current");});
    if(receipt) {
      body.innerHTML=`<div class="booking-success"><p class="eyebrow">TURNO REGISTRADO</p><h2 tabindex="-1">Tu reserva está confirmada.</h2><p>Guardá tu referencia. Para modificar o cancelar, contactá al local.</p>${summary(receipt)}<div class="actions"><a class="button" data-booking-notify target="_blank" rel="noopener noreferrer" referrerpolicy="no-referrer">Avisar por WhatsApp</a><button class="button outline" type="button" data-new>Reservar otro turno</button></div><p class="booking-help">Tu turno ya está registrado. Avisar por WhatsApp es opcional y no crea otra reserva.</p></div>`;
      const phone=branch.phone?.replace(/\D/g,"");
      const link=body.querySelector("[data-booking-notify]");
      if(phone && /^[1-9][0-9]{7,14}$/.test(phone)) link.href=`https://wa.me/${phone}?text=${encodeURIComponent(`Hola 17:17, ya reservé ${receipt.services.map(s=>s.name).join(" + ")} con ${receipt.staff.name} para ${localDate(receipt.starts_at,branch.timezone)} a las ${localTime(receipt.starts_at,branch.timezone)}. Referencia: ${receipt.reference}.`)}`;
      else link.hidden=true;
      return;
    }
    if(operation) {
      body.innerHTML=`<h2 tabindex="-1">Verificá la misma solicitud.</h2><p>El resultado del envío todavía no está confirmado. Reintentar usa la misma referencia técnica para evitar duplicados.</p><button class="button" type="button" data-confirm ${busy?"disabled":""}>${busy?"Verificando…":"Verificar mi reserva"}</button><p class="booking-help">No reserves nuevamente desde otra pestaña mientras verificamos este envío.</p>`;
      return;
    }
    const next=`<div class="booking-controls">${step?'<button class="button outline" type="button" data-back>Volver</button>':""}<button class="button" type="submit">${step===4?"Confirmar mi reserva":"Continuar"}<span aria-hidden="true">→</span></button></div>`;
    let content="";
    if(step===0) content=`<h2 tabindex="-1">¿Qué te hacemos?</h2><fieldset><legend class="sr-only">Elegí un servicio</legend><div class="booking-options">${branch.services.filter(bookable).map(s=>`<label class="booking-option"><input type="radio" name="service" value="${e(s.slug)}" ${service===s.slug?"checked":""} required><span><strong>${e(s.name)}</strong><small>${s.duration_minutes} min · ${e(money(s.price_minor))}</small></span></label>`).join("")}</div></fieldset><details class="booking-consult"><summary>Rulos, combo y tintes · consulta previa</summary><p>Escribir por WhatsApp no confirma una reserva.</p>${branch.services.filter(s=>!bookable(s)).map(s=>{const u=new URL(consult);u.searchParams.set("text",`Hola 17:17, quiero consultar por ${s.name} antes de reservar.`);return `<a class="text-link" href="${e(u.href)}" target="_blank" rel="noopener noreferrer">Consultar ${e(s.name)} <span aria-hidden="true">↗</span></a>`;}).join("")}</details>`;
    if(step===1) content=`<h2 tabindex="-1">Elegí tu barbero.</h2><fieldset><legend class="sr-only">Profesional</legend><div class="booking-options">${[{slug:"",name:"Cualquiera disponible"},...branch.staff.filter(s=>s.services.includes(service))].map(s=>`<label class="booking-option"><input type="radio" name="staff" value="${e(s.slug)}" ${staff===s.slug?"checked":""}><span><strong>${e(s.name)}</strong>${!s.slug?"<small>El CRM asigna un profesional con disponibilidad real.</small>":""}</span></label>`).join("")}</div></fieldset>`;
    if(step===2) content=`<h2 tabindex="-1">Encontrá tu horario.</h2><label class="booking-field">Fecha<input name="date" type="date" min="${localDay(branch.timezone)}" value="${e(day)}" required></label><p class="booking-help">Horario de Luque · ${e(branch.timezone)}. Disponibilidad consultada al momento.</p><div data-times aria-live="polite"></div><button class="text-link" type="button" data-refresh>Actualizar horarios</button>`;
    if(step===3) content=`<h2 tabindex="-1">¿A nombre de quién?</h2><div class="booking-fields"><label class="booking-field">Nombre<input data-customer name="name" autocomplete="name" maxlength="120" value="${e(customer.name)}" required></label><label class="booking-field">WhatsApp con código de país<input data-customer name="phone" type="tel" autocomplete="tel" inputmode="tel" placeholder="+595981234567" maxlength="30" value="${e(customer.phone)}" required></label><label class="booking-field">Correo (opcional)<input data-customer name="email" type="email" autocomplete="email" maxlength="254" value="${e(customer.email)}"></label></div><p class="booking-help">Usaremos tus datos para gestionar esta visita. El correo es opcional.</p>`;
    if(step===4) content=`<h2 tabindex="-1">Revisá tu turno.</h2>${summary()}<p>${e(customer.name)} · ${e(customer.phone)}</p><p class="booking-help">El horario queda reservado sólo cuando recibís la confirmación y la referencia.</p><div class="booking-honeypot" aria-hidden="true"><label>Sitio web<input name="website" tabindex="-1" autocomplete="off"></label></div>`;
    body.innerHTML=`<form data-step-form>${content}${next}</form>`;
    if(step===2) {showTimes(); refresh();}
  }
  function showTimes(loading=false) {
    const target=body.querySelector("[data-times]"); if(!target)return;
    target.innerHTML=loading?'<p role="status">Consultando horarios reales…</p>':slots.length?`<fieldset><legend>Horario disponible</legend><div class="booking-times">${[...new Set(slots.map(s=>s.starts_at))].map(t=>`<label class="booking-time"><input type="radio" name="time" value="${e(t)}" ${time===t?"checked":""} required><span>${e(localTime(t,branch.timezone))}</span></label>`).join("")}</div></fieldset>`:'<p>No hay horarios disponibles para esta selección. Probá otra fecha o barbero.</p>';
  }
  async function refresh() {
    controller?.abort(); controller=new AbortController(); const id=++generation;
    const query={organization,branch:branchSlug,service,date:day,...(staff?{staff}:{})};
    time=""; slots=[]; showTimes(true);notice();
    try {
      const result=await api("availability",query,undefined,AbortSignal.any([controller.signal,AbortSignal.timeout(15000)]));
      if(id!==generation || step!==2) return;
      if(!Array.isArray(result) || result.some(s=>!Number.isFinite(Date.parse(s.starts_at))||!branch.staff.some(b=>b.slug===s.staff_slug&&b.services.includes(service))||(staff&&s.staff_slug!==staff)||localDay(branch.timezone,new Date(s.starts_at))!==day)) throw Error("No pudimos verificar los horarios recibidos.");
      slots=result;showTimes();
    } catch(failure) { if(id!==generation||step!==2)return;showTimes();notice(failure.name==="AbortError"?"La consulta tardó demasiado. Volvé a actualizar horarios.":failure.message+" Podés actualizar horarios o abrir la agenda del local."); }
  }
  async function confirm() {
    if(busy)return;
    if(!operation) {
      operation={organization,branch:branchSlug,services:[service],staff:staff||null,starts_at:time,customer:{name:customer.name.trim(),normalized_phone:normalizePhone(customer.phone),email:customer.email.trim()},key:crypto.randomUUID(),website:body.querySelector('[name="website"]')?.value||"",source:"website"};
      try{storage({operation,branch});}catch{operation=null;notice("No pudimos proteger el reintento en este navegador. Abrí la agenda del local para reservar.");return;}
    }
    busy=true;render();notice();
    try {
      const result=await api("booking",null,operation);
      if(!result.reference || !result.staff?.name || !Array.isArray(result.services) || !Number.isFinite(Date.parse(result.starts_at))) throw Error("La respuesta no pudo verificarse. Volvé a verificar la misma solicitud.");
      receipt=result;operation=null;step=4;Object.assign(customer,{name:"",phone:"",email:""});
      try{storage({receipt,branch});}catch{/* Receipt still remains visible for this page. */}
      render();heading();
    } catch(failure) {
      if(!failure.status || failure.status>=500) uncertain=true;
      if([400,403,404,409,415,429].includes(failure.status) && (!uncertain || failure.status===409)) {
        operation=null;try{storage(null);}catch{};
        if(failure.status===409){step=2;time="";slots=[];}
        render();
      }
      notice(failure.status===409?"Ese horario acaba de ocuparse. Elegí otro: no se creó tu reserva.":operation?"No pudimos confirmar el resultado. Pulsá Verificar mi reserva: conserva la misma solicitud y evita duplicados.":failure.status===429?"Hay demasiados intentos. Esperá un minuto antes de volver a intentar.":failure.message);
    } finally { busy=false; if(operation)render(); }
  }
  body.addEventListener("input",event=>{if(event.target.matches("[data-customer]"))customer[event.target.name]=event.target.value;});
  body.addEventListener("change",event=>{
    const input=event.target;
    if(input.name==="service"){service=input.value;staff="";time="";slots=[];}
    if(input.name==="staff"){staff=input.value;time="";slots=[];}
    if(input.name==="date"){day=input.value;if(day)refresh();}
    if(input.name==="time") time=input.value;
  });
  body.addEventListener("submit",event=>{
    event.preventDefault();notice();rememberInputs();
    if(step===0&&!service)return notice("Elegí un servicio.");
    if(step===2&&(!time||!slots.some(s=>s.starts_at===time)))return notice("Elegí un horario de la disponibilidad actual.");
    if(step===3){const message=validCustomer(customer);if(message)return notice(message);}
    if(step===4){confirm();return;} move(step+1);
  });
  body.addEventListener("click",event=>{
    if(event.target.closest("[data-back]")){rememberInputs();controller?.abort();move(step-1);}
    if(event.target.closest("[data-refresh]"))refresh();
    if(event.target.closest("[data-reload]"))load();
    if(event.target.closest("[data-confirm]"))confirm();
    if(event.target.closest("[data-new]")){try{storage(null);}catch{}receipt=null;operation=null;uncertain=false;service="";staff="";time="";move(0);}
  });
  load();
}
