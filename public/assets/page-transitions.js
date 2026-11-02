// pagereveal can fire before deferred scripts. Register while parsing the head.
// An aborted visual transition must never turn a successful navigation into an
// unhandled rejection (including reduced-motion and pages restored from cache).
(() => {
  // Chromium can report a disposed cross-document transition after it stopped
  // exposing a handle on pagereveal/activeViewTransition. These two native
  // cancellation outcomes already leave the destination rendered. Acknowledge
  // them narrowly; application errors and other DOMExceptions still propagate.
  window.addEventListener("unhandledrejection", event => {
    const reason = event.reason;
    if (reason instanceof DOMException && reason.name === "InvalidStateError" &&
      /^Transition was aborted because of invalid state\. (ViewTransition opt-in disabled|Page already revealed)$/.test(reason.message)) {
      event.preventDefault();
    }
  });
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
