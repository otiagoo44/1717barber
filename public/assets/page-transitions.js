// pagereveal can fire before deferred scripts. Register while parsing the head.
// An aborted visual transition must never turn a successful navigation into an
// unhandled rejection (including reduced-motion and pages restored from cache).
(() => {
  function handleTransition(event) {
    const transition = event.viewTransition;
    if (!transition) return;
    transition.ready.catch(() => {});
    transition.finished.catch(() => {});
    transition.updateCallbackDone.catch(() => {});
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      transition.skipTransition();
    }
  }
  window.addEventListener("pagereveal", handleTransition);
  window.addEventListener("pageswap", handleTransition);
})();
