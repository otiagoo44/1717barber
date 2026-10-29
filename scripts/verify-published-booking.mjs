import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const require = createRequire((process.env.QA_TOOLS_DIR || 'C:/Users/User/AppData/Local/Temp/1717-final-qa') + '/qa.cjs');
const out = process.env.QA_OUT || 'docs/qa/final-20261029';
await mkdir(out, { recursive: true });
const browser = await require('puppeteer-core').launch({ executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const report = { checkedAt: new Date().toISOString(), mode: 'Published booking read-only; no form submitted or messages sent', errors: [], views: [], writeRequests: 0 };
try {
  const page = await browser.newPage();
  const chunks = [];
  page.on('pageerror', error => report.errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') report.errors.push(message.text()); });
  await page.setRequestInterception(true);
  page.on('request', request => {
    if (!['GET', 'HEAD'].includes(request.method())) {
      report.writeRequests++;
      return request.abort();
    }
    return request.continue();
  });
  page.on('response', response => {
    if (response.url().includes('/_next/static/') && new URL(response.url()).pathname.endsWith('.js')) {
      chunks.push(response.text().catch(() => ''));
    }
  });
  for (const width of [390, 1440]) {
    await page.setViewport({ width, height: 900, isMobile: width < 500, hasTouch: width < 500 });
    const response = await page.goto('https://barberia-crm-kappa.vercel.app/book/1717-barberia/luque?service=corte-de-pelo&source=website', { waitUntil: 'networkidle0' });
    assert.equal(response.status(), 200);
    await page.waitForSelector('.service-options');
    const result = await page.evaluate(() => ({
      organization: document.querySelector('h1')?.textContent,
      checkedServices: [...document.querySelectorAll('.service-option')].filter(el => el.querySelector('input')?.checked).map(el => el.textContent.trim()),
      staff: [...document.querySelectorAll('select option')].map(el => el.textContent),
      fields: [...document.querySelectorAll('input[name]')].map(el => el.name),
      confirmation: Boolean(document.querySelector('.public-confirmation')),
      overflow: document.documentElement.scrollWidth > innerWidth,
    }));
    assert.equal(result.organization, '17:17 Barbería');
    assert.deepEqual(result.checkedServices, ['Corte de pelo']);
    for (const name of ['name', 'phone', 'email']) assert.ok(result.fields.includes(name));
    for (const name of ['Esteban', 'Jonatan']) assert.ok(result.staff.includes(name));
    assert.equal(result.confirmation, false);
    assert.equal(result.overflow, false);
    report.views.push({ width, ...result });
  }
  const code = (await Promise.all(chunks)).join('\n');
  assert.ok(code.includes('Avisar por WhatsApp'), 'The production bundle must contain the confirmation action');
  report.confirmationActionInPublishedBundle = true;
  assert.equal(report.writeRequests, 0);
  assert.deepEqual(report.errors, []);
  report.passed = true;
  console.log('Published CRM PASS: real catalog/form, preselected service, both professionals, mobile/desktop and WhatsApp confirmation code; no writes.');
} catch (error) {
  report.passed = false;
  report.failure = error.message;
  throw error;
} finally {
  await writeFile(`${out}/published-booking.json`, JSON.stringify(report, null, 2) + '\n');
  await browser.close();
}
