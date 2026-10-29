import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { publicConfiguration, validateCatalog } from '../src/booking.mjs';

// Public GETs only: never submit a booking or send a message from this check.
const config = publicConfiguration({
  BARBERIA_OS_PUBLIC_URL: 'https://barberia-crm-kappa.vercel.app',
  BARBERIA_OS_ORGANIZATION_SLUG: '1717-barberia',
  BARBERIA_OS_BRANCH_SLUG: 'luque',
});
const out = process.env.QA_OUT || 'docs/qa/final-20261029';
await mkdir(out, { recursive: true });
const report = { checkedAt: new Date().toISOString(), mode: 'Public GET only; no bookings or messages', checks: [] };
async function get(path, query = {}) {
  const url = new URL(path, config.publicUrl);
  for (const [key, value] of Object.entries(query)) url.searchParams.set(key, value);
  const response = await fetch(url, { signal: AbortSignal.timeout(20000), redirect: 'error' });
  const contentType = response.headers.get('content-type');
  assert.ok(contentType?.includes('application/json'), `${path}: JSON required`);
  const data = await response.json();
  report.checks.push({ path, query, status: response.status, contentType });
  return { response, data };
}
try {
  const tenant = { organization: config.organizationSlug, branch: config.branchSlug };
  const { response, data: catalog } = await get('/api/public/catalog', tenant);
  assert.equal(response.status, 200);
  const branch = validateCatalog(catalog, config);
  assert.equal(branch.phone, '+595983402497');
  report.catalog = catalog;
  for (const path of ['/api/health', '/api/health/ready']) assert.equal((await get(path)).response.status, 200);
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: branch.timezone }).format(new Date());
  const date = new Date(today + 'T12:00:00Z');
  // Tomorrow or the next business day. Sunday is checked independently below.
  date.setUTCDate(date.getUTCDate() + 1);
  if (date.getUTCDay() === 0) date.setUTCDate(date.getUTCDate() + 1);
  const day = date.toISOString().slice(0, 10);
  report.availability = [];
  for (const staff of branch.staff) {
    const { response, data: slots } = await get('/api/public/availability', { ...tenant, service: 'corte-de-pelo', staff: staff.slug, date: day });
    assert.equal(response.status, 200);
    assert.ok(Array.isArray(slots) && slots.length > 0, `${staff.slug}: future capacity required`);
    for (const slot of slots) {
      assert.equal(slot.staff_slug, staff.slug);
      const start = new Date(slot.starts_at);
      const end = new Date(start.getTime() + slot.duration_minutes * 60000);
      const clock = (instant) => new Intl.DateTimeFormat('en-GB', { timeZone: branch.timezone, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(instant);
      const localStart = clock(start), localEnd = clock(end);
      assert.ok(localStart >= '09:00' && localEnd <= '21:00' && localEnd > localStart);
      if (staff.slug === 'esteban') assert.ok(localEnd <= '12:00' || localStart >= '12:30');
    }
    report.availability.push({ date: day, staff: staff.slug, slots: slots.length, hoursAndBreakValid: true });
  }
  while (date.getUTCDay() !== 0) date.setUTCDate(date.getUTCDate() + 1);
  const sunday = await get('/api/public/availability', { ...tenant, service: 'corte-de-pelo', date: date.toISOString().slice(0, 10) });
  assert.equal(sunday.response.status, 200);
  assert.deepEqual(sunday.data, []);
  for (const service of [...branch.services.filter(s => s.consultation_required).map(s => s.slug), 'servicio-inexistente']) {
    const { response } = await get('/api/public/availability', { ...tenant, service, date: day });
    assert.ok(response.status >= 400 && response.status < 500, `${service}: direct booking must be rejected`);
  }
  const booking = await fetch(`${config.publicUrl}/book/1717-barberia/luque?service=corte-de-pelo&source=website`, { signal: AbortSignal.timeout(20000) });
  assert.equal(booking.status, 200);
  assert.ok(booking.headers.get('content-type')?.includes('text/html'));
  report.passed = true;
  console.log(`Live integration PASS: ${branch.services.length} services, ${branch.staff.length} professionals, capacity, Sunday, breaks, consultation protection and health.`);
} catch (error) {
  report.passed = false;
  report.failure = error.message;
  throw error;
} finally {
  await writeFile(`${out}/public-read.json`, JSON.stringify(report, null, 2) + '\n');
}
