// Real browser motion/interaction checks. QA dependencies stay outside runtime.
import { createRequire } from "node:module";
import { writeFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import assert from "node:assert/strict";
const require = createRequire(resolve(process.env.QA_TOOLS_DIR, "qa.cjs"));
const browser = await require("puppeteer-core").launch({
  executablePath: process.env.CHROME_PATH,
  headless: true,
});
const page = await browser.newPage(),
  base = process.env.QA_URL || "http://127.0.0.1:4174",
  out = process.env.QA_OUT || "docs/qa/second-pass";
const report = {
  pages: [],
  motion: {},
  overlays: [],
  limitations: [
    "Chrome desktop and touch emulation; no physical device.",
    "Reels open the supplied Instagram URLs; playback depends on Instagram and is not hosted locally.",
  ],
};
const pause = (ms) => new Promise((r) => setTimeout(r, ms));
async function setMotionPreference(features) {
  // CDP preference changes must not race a previous native navigation snapshot.
  // The explicit mid-animation test below still interrupts the WAAPI reveal.
  await page.evaluate(async () => {
    await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
    await document.activeViewTransition?.finished.catch(()=>{});
  });
  await page.emulateMediaFeatures(features);
  await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
}
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
await mkdir(out + "/after", { recursive: true });
try {
  await page.evaluateOnNewDocument(() => {
    window.addEventListener("pagereveal", (event) => {
      window.__pageTransition = !!event.viewTransition;
      if (event.viewTransition)
        event.viewTransition.ready
          .then(() => {
            window.__pageTransitionReady = true;
          })
          .catch(() => {
            window.__pageTransitionReady = false;
          });
    });
    window.addEventListener("pageswap", (event) =>
      event.viewTransition?.ready.catch(() => {}),
    );
  });
  for (const path of ["/", "/rulos", "/productos"]) {
    await page.setViewport({
      width: 390,
      height: 900,
      isMobile: true,
      hasTouch: true,
    });
    await setMotionPreference([]);
    await page.goto(base + path, { waitUntil: "domcontentloaded" });
    const entering = await page.evaluate(() =>
      document.getAnimations().map((a) => ({
        target: a.effect.target?.className,
        duration: a.effect.getTiming().duration,
      })),
    );
    if (path !== "/productos")
      assert.ok(entering.some((a) => String(a.target).includes("hero")));
    await page.evaluate(() => document.fonts.ready);
    await pause(900);
    const targets = await page.evaluate(() =>
      [...document.querySelectorAll("a,button,summary")]
        .filter(
          (el) =>
            el.getClientRects().length && !el.classList.contains("skip-link"),
        )
        .map((el) => ({
          text: el.textContent.trim(),
          height: el.getBoundingClientRect().height,
          width: el.getBoundingClientRect().width,
        })),
    );
    assert.ok(
      targets.every((t) => t.height >= 44 && t.width >= 44),
      JSON.stringify(targets.filter((t) => t.height < 44 || t.width < 44)),
    );
    for (const summary of await page.$$("summary")) {
      await summary.click();
      assert.ok(await summary.evaluate((el) => el.parentElement.open));
      await summary.click();
      assert.equal(
        await summary.evaluate((el) => el.parentElement.open),
        false,
      );
    }
    report.pages.push({
      path,
      targets: targets.length,
      minimumTargetHeight: Math.min(...targets.map((t) => t.height)),
      faqCount: (await page.$$("summary")).length,
      entranceAnimations: entering,
    });
    await setMotionPreference([
      { name: "prefers-reduced-motion", value: "reduce" },
    ]);
    await page.$eval("#reservar", (el) => el.scrollIntoView());
    await page.screenshot({
      path: `${out}/after/${path === "/" ? "home" : path.slice(1)}-final-390.png`,
    });
  }
  await setMotionPreference([]);
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(base, { waitUntil: "domcontentloaded" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: out + "/after/hero-enter-1440.png" });
  await pause(950);
  const drift = await page.$eval(
    ".hero-main .parallax-image",
    (el) => getComputedStyle(el).transform,
  );
  await page.evaluate(() => scrollTo({ top: 450, behavior: "instant" }));
  await pause(120);
  const later = await page.$eval(
    ".hero-main .parallax-image",
    (el) => getComputedStyle(el).transform,
  );
  const linked = await page.evaluate(() =>
    CSS.supports("animation-timeline:view()"),
  );
  if (linked) assert.notEqual(drift, later);
  const sticky = await page.$eval(
    ".feature-copy",
    (el) => getComputedStyle(el).position,
  );
  assert.equal(sticky, "sticky");
  let revealCount = 0;
  for (let step = 1; step <= 8; step++) {
    await page.evaluate(
      (step) => scrollTo({ top: 950 + step * 260, behavior: "instant" }),
      step,
    );
    await pause(80);
    revealCount += await page.evaluate(
      () =>
        document
          .getAnimations()
          .filter(
            (a) =>
              a.playState === "running" &&
              a.effect.getTiming().duration !== Infinity,
          ).length,
    );
  }
  assert.ok(revealCount > 0);
  await page.evaluate(() =>
    scrollTo({ top: document.body.scrollHeight, behavior: "instant" }),
  );
  await pause(800);
  await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
  await pause(800);
  assert.equal(
    await page.$eval(
      ".hero .button",
      (el) => getComputedStyle(el).pointerEvents,
    ),
    "auto",
  );
  report.motion.scroll = {
    linked,
    initialTransform: drift,
    laterTransform: later,
    desktopSticky: sticky,
    revealSamples: revealCount,
    fastScrollAndReturn: "passed",
  };
  await page.click('.hero a[href="/rulos"]');
  await page.waitForFunction(() => location.pathname === "/rulos");
  await pause(450);
  report.motion.pageTransition = {
    nativeSupported: await page.evaluate(() =>
      CSS.supports("view-transition-name:hero"),
    ),
    pagerevealHasTransition: await page.evaluate(() => window.__pageTransition),
    ready: await page.evaluate(() => window.__pageTransitionReady ?? null),
    navigation: "passed",
  };
  await page.goBack({ waitUntil: "domcontentloaded" });
  await pause(800);
  assert.equal(new URL(page.url()).pathname, "/");
  assert.equal(
    await page.$eval(".hero-copy", (el) => getComputedStyle(el).opacity),
    "1",
  );
  report.motion.backNavigation = "passed";
  await page.setViewport({
    width: 390,
    height: 900,
    isMobile: true,
    hasTouch: true,
  });
  await page.goto(base + "/rulos", { waitUntil: "networkidle0" });
  const seq = ".rulos-videos [data-reel-sequence]";
  assert.equal(await page.$$eval(seq + " .reel-item", (els) => els.length), 5);
  await page.$eval(seq, (el) =>
    el.scrollIntoView({ block: "center", behavior: "instant" }),
  );
  for (let i = 0; i < 4; i++) {
    await page.click(seq + " [data-reel-next]");
    await pause(650);
  }
  assert.equal(
    await page.$eval(seq + " .reel-position", (el) => el.textContent),
    "05 / 05",
  );
  await page.focus(seq + " .reel-grid");
  await page.keyboard.press("ArrowLeft");
  await pause(650);
  assert.equal(
    await page.$eval(seq + " .reel-position", (el) => el.textContent),
    "04 / 05",
  );
  const track = await page.$(seq + " .reel-grid"),
    box = await track.boundingBox(),
    cdp = await page.createCDPSession(),
    x = box.x + box.width * 0.8,
    y = box.y + 120;
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [{ x, y }],
  });
  for (let i = 1; i <= 5; i++) {
    await cdp.send("Input.dispatchTouchEvent", {
      type: "touchMove",
      touchPoints: [{ x: x - i * 40, y }],
    });
    await pause(30);
  }
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchEnd",
    touchPoints: [],
  });
  await pause(900);
  assert.equal(
    await page.$eval(seq + " .reel-position", (el) => el.textContent),
    "05 / 05",
  );
  report.motion.reels = {
    count: 5,
    buttons: "passed",
    keyboard: "passed",
    touch: "passed",
    indicator: "05 / 05",
  };
  await page.screenshot({ path: out + "/after/reels-last-390.png" });
  const reelMedia = await page.$$eval(seq + " .reel-facade", (els) =>
    els.map((el) => ({
      url: el.href,
      complete: el.querySelector("img").complete,
      width: el.querySelector("img").naturalWidth,
    })),
  );
  assert.equal(new Set(reelMedia.map((r) => r.url)).size, 5);
  assert.ok(reelMedia.every((r) => r.complete && r.width > 0));
  report.motion.reels.media = reelMedia;
  await page.click(seq + " .reel-facade");
  assert.ok(await page.$eval("#reel-player", (el) => el.open));
  assert.match(
    await page.$eval("#reel-player iframe", (el) => el.src),
    /instagram\.com\/reel\/[^/]+\/embed\//,
  );
  await page.keyboard.press("Escape");
  assert.equal(await page.$eval("#reel-player", (el) => el.open), false);
  assert.equal(await page.$eval("#reel-player", (el) => el.querySelector("iframe")), null);
  report.motion.reels.inlinePlayer = "passed: facade, embed, Escape y desmontaje del iframe";
  await setMotionPreference([
    { name: "prefers-reduced-motion", value: "reduce" },
  ]);
  await page.goto(base, { waitUntil: "networkidle0" });
  const reduced = await page.evaluate(() => ({
    animations: document.getAnimations().length,
    scroll: getComputedStyle(document.documentElement).scrollBehavior,
    parallax: getComputedStyle(document.querySelector(".parallax-image"))
      .transform,
    sticky: getComputedStyle(document.querySelector(".feature-copy")).position,
    transition: getComputedStyle(document.querySelector(".button"))
      .transitionDuration,
  }));
  assert.deepEqual(reduced, {
    animations: 0,
    scroll: "auto",
    parallax: "none",
    sticky: "static",
    transition: "0s",
  });
  report.motion.reduced = reduced;
  await page.click(".menu-toggle");
  await page.screenshot({ path: out + "/after/menu-390.png" });
  await page.keyboard.press("Escape");
  await page.click(".photo-trigger");
  await page.screenshot({ path: out + "/after/lightbox-390.png" });
  await page.keyboard.press("Escape");
  report.overlays = ["Menu", "Lightbox"];
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(base, { waitUntil: "networkidle0" });
  await page.$eval("#reservar", (el) => el.scrollIntoView());
  await page.screenshot({ path: out + "/after/home-final-1440.png" });
  await setMotionPreference([]);
  await page.goto(base, { waitUntil: "networkidle0" });
  await page.$eval("#rulos", (el) =>
    el.scrollIntoView({ behavior: "instant" }),
  );
  await pause(40);
  await setMotionPreference([
    { name: "prefers-reduced-motion", value: "reduce" },
  ]);
  // Media-query change events are asynchronous; wait for the actual final state
  // rather than assuming a 40ms wall-clock budget under concurrent capture.
  await page.waitForFunction(() => document.getAnimations().length === 0, {
    timeout: 2000,
  });
  assert.equal(await page.evaluate(() => document.getAnimations().length), 0);
  report.motion.preferenceChangedDuringAnimation = "passed";
  assert.deepEqual(errors, []);
  report.consoleErrors = errors;
  report.status = "passed";
} catch (error) {
  report.status = "failed";
  report.error = error.stack;
  throw error;
} finally {
  await writeFile(out + "/polish-qa.json", JSON.stringify(report, null, 2));
  await browser.close();
  console.log(JSON.stringify(report, null, 2));
}
