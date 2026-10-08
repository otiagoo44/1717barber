(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  // Keep native navigation opt-in stable. A preference change can interrupt a
  // transition; skip its animation and handle the expected rejected ready state.
  function handlePageTransition(event) {
    const transition = event.viewTransition;
    if (!transition) return;
    transition.ready.catch(() => {});
    if (reducedMotion.matches) transition.skipTransition();
  }
  window.addEventListener("pagereveal", handlePageTransition);
  window.addEventListener("pageswap", handlePageTransition);
  // Defaults are the final state. WAAPI never gates content or reservation.
  const animations = new Set();
  const ease = "cubic-bezier(.16,1,.3,1)";
  function enter(target, type = "text", delay = 0) {
    if (reducedMotion.matches || !target.animate) return;
    const frames =
      type === "photo"
        ? [
            { clipPath: "inset(0 12% 0 0)", opacity: 0.8 },
            { clipPath: "inset(0 0% 0 0)", opacity: 1 },
          ]
        : type === "number"
          ? [
              { clipPath: "inset(0 0 30% 0)", transform: "translateY(12px)" },
              { clipPath: "inset(0)", transform: "none" },
            ]
          : type === "headline"
            ? [
                {
                  clipPath: "inset(0 0 30% 0)",
                  transform: "translateY(20px)",
                  opacity: 0.9,
                },
                { clipPath: "inset(0)", transform: "none", opacity: 1 },
              ]
            : type === "meta"
              ? [{ opacity: 0.85 }, { opacity: 1 }]
              : [
                  { transform: "translateY(28px)", opacity: 0.75 },
                  { transform: "none", opacity: 1 },
                ];
    const animation = target.animate(frames, {
      duration: type === "photo" ? 720 : 650,
      delay,
      easing: ease,
      fill: "backwards",
    });
    animations.add(animation);
    animation.finished
      .then(() => animations.delete(animation))
      .catch(() => animations.delete(animation));
  }
  // One style mutation starts the complete entrance; CSS batches its layout.
  // Per-element animate() during initial parsing made ten expensive flushes.
  if (!reducedMotion.matches) document.documentElement.classList.add("motion-ready");
  let observer;
  if ("IntersectionObserver" in window) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (!isIntersecting) return;
          const type = target.matches("h2")
            ? "headline"
            : target.matches(
                  ".image-crop,.result-media,.photo-trigger,.portrait-frame,.reel-frame",
                )
              ? "photo"
              : target.matches(".feature-price strong,.profile-number")
                ? "number"
                : target.matches("figcaption,.service-number")
                  ? "meta"
                  : "text";
          enter(target, type, Number(target.dataset.motionDelay || 0));
          observer.unobserve(target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px 40px 0px" },
    );
    document
      .querySelectorAll(
        "main section:not(.hero) h2,.feature-photo .image-crop,.feature-detail,.portfolio .photo-trigger,.portfolio .result-media,.feature-price strong,.service-row,.portrait-frame,.profile-number,.reel-frame,.product-info,.location-photo,.process-list li",
      )
      .forEach((el, i) => {
        if (el.matches(".service-row,.reel-frame,.process-list li"))
          el.dataset.motionDelay = (i % 3) * 70;
        observer.observe(el);
      });
    const header = document.querySelector(".site-header");
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (target.id === "inicio")
            header.classList.toggle("scrolled", !isIntersecting);
          if (!isIntersecting || document.body.dataset.page !== "home") return;
          document
            .querySelectorAll(".desktop-nav a,.menu-dialog nav a")
            .forEach((a) => {
              const active = a.hash === "#" + target.id;
              if (active) a.setAttribute("aria-current", "location");
              else a.removeAttribute("aria-current");
            });
        });
      },
      { rootMargin: "-10% 0px -60% 0px", threshold: 0 },
    );
    ["inicio", "rulos", "servicios", "nosotros"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) navObserver.observe(el);
    });
  }
  function settleMotion() {
    document.documentElement.classList.remove("motion-ready");
    animations.forEach((a) => a.cancel());
    animations.clear();
  }
  reducedMotion.addEventListener("change", (event) => {
    if (event.matches) {
      settleMotion();
      const transition = document.activeViewTransition;
      if (transition) {
        transition.ready.catch(() => {});
        transition.skipTransition();
      }
    }
  });
  window.addEventListener("pagehide", settleMotion);
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) settleMotion();
  });
  document.querySelectorAll("[data-reel-sequence]").forEach((sequence) => {
    const track = sequence.querySelector(".reel-grid"),
      items = [...track.children],
      prev = sequence.querySelector("[data-reel-prev]"),
      next = sequence.querySelector("[data-reel-next]"),
      position = sequence.querySelector(".reel-position"),
      progress = sequence.querySelector(".reel-progress i");
    let active = 0,
      scheduled = false,
      points = [];
    // The trailing inset lets the last frame align and have its own 05 / 05 state.
    function resize() {
      // Batch reads before writes; no forced layout during initial hero entry.
      const width = track.clientWidth,
        itemWidth = items[0].clientWidth,
        gap = parseFloat(getComputedStyle(track).gap),
        origin = items[0].offsetLeft;
      points = items.map((item) => item.offsetLeft - origin);
      track.style.setProperty(
        "--reel-tail",
        Math.max(0, width - itemWidth - gap) + "px",
      );
      update();
    }
    function update() {
      if (!points.length) return;
      const left = track.scrollLeft;
      active = points.reduce(
        (best, point, i) =>
          Math.abs(point - left) < Math.abs(points[best] - left) ? i : best,
        0,
      );
      position.textContent =
        String(active + 1).padStart(2, "0") +
        " / " +
        String(items.length).padStart(2, "0");
      prev.disabled = active === 0;
      next.disabled = active === items.length - 1;
      progress.style.transform = "scaleX(" + (active + 1) / items.length + ")";
    }
    function move(direction) {
      if (!points.length) resize();
      const index = Math.max(0, Math.min(items.length - 1, active + direction));
      track.scrollTo({
        left: points[index],
        behavior: reducedMotion.matches ? "instant" : "smooth",
      });
    }
    prev.addEventListener("click", () => move(-1));
    next.addEventListener("click", () => move(1));
    track.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        move(event.key === "ArrowLeft" ? -1 : 1);
      }
    });
    track.addEventListener(
      "scroll",
      () => {
        if (!scheduled) {
          scheduled = true;
          requestAnimationFrame(() => {
            scheduled = false;
            update();
          });
        }
      },
      { passive: true },
    );
    prev.disabled = true;
    function initialize() {
      if ("ResizeObserver" in window) new ResizeObserver(resize).observe(track);
      else {
        window.addEventListener("resize", resize);
        requestAnimationFrame(resize);
      }
    }
    if ("IntersectionObserver" in window) {
      const near = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            near.disconnect();
            initialize();
          }
        },
        { rootMargin: "300px" },
      );
      near.observe(track);
    } else initialize();
  });
  // Mantener el ciclo de Tab dentro de ambos dialogs, incluso en el último control.
  const reelFacades = [...document.querySelectorAll(".reel-facade[href]")];
  if (reelFacades.length) {
    const player = document.createElement("dialog");
    player.id = "reel-player";
    player.className = "reel-player";
    player.setAttribute("aria-labelledby", "reel-player-title");
    player.innerHTML = `<div class="reel-player-bar"><div><p class="eyebrow">RULOS / EN MOVIMIENTO</p><h2 id="reel-player-title">Reel de 17:17</h2></div><button type="button" data-reel-player-close aria-label="Cerrar reproductor">Cerrar <span aria-hidden="true">×</span></button></div><div class="reel-player-stage"><div class="reel-player-frame" data-reel-player-frame></div></div><div class="reel-player-footer"><span data-reel-player-status aria-live="polite">Reproducción dentro de la página</span><a class="text-link" data-reel-player-external target="_blank" rel="noopener noreferrer">Abrir en Instagram <span aria-hidden="true" class="arrow">↗</span></a></div>`;
    document.body.append(player);
    const frame = player.querySelector("[data-reel-player-frame]"),
      title = player.querySelector("#reel-player-title"),
      status = player.querySelector("[data-reel-player-status]"),
      external = player.querySelector("[data-reel-player-external]"),
      close = player.querySelector("[data-reel-player-close]");
    let reelOpener = null;
    function showReel(facade) {
      reelOpener = facade;
      const url = facade.href,
        code = url.match(/\/reel\/([^/?#]+)/)?.[1];
      if (!code) return;
      frame.replaceChildren();
      title.textContent = facade.getAttribute("aria-label")?.replace(/^Reproducir\s+/i, "") || "Reel de 17:17";
      external.href = url;
      status.textContent = "Cargando reel dentro de la página…";
      const iframe = document.createElement("iframe");
      iframe.title = title.textContent;
      iframe.loading = "eager";
      iframe.allow = "autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share";
      iframe.setAttribute("allowfullscreen", "");
      iframe.referrerPolicy = "strict-origin-when-cross-origin";
      iframe.src = `https://www.instagram.com/reel/${code}/embed/`;
      iframe.addEventListener("load", () => {
        status.textContent = "Reel listo para reproducir";
      });
      iframe.addEventListener("error", () => {
        status.textContent = "Instagram no pudo cargar el reproductor. Usá el enlace para abrirlo.";
      });
      frame.append(iframe);
      openDialog(player);
      close.focus();
    }
    function clearReel() {
      frame.replaceChildren();
      status.textContent = "Reproducción dentro de la página";
      reelOpener?.focus({ preventScroll: true });
      reelOpener = null;
    }
    reelFacades.forEach((facade) => {
      facade.setAttribute("aria-label", facade.getAttribute("aria-label").replace(/^Ver\s+/i, "Reproducir "));
      facade.addEventListener("click", (event) => {
        event.preventDefault();
        showReel(facade);
      });
    });
    close.addEventListener("click", () => closeDialog(player));
    player.addEventListener("close", clearReel);
    player.addEventListener("click", (event) => {
      if (event.target !== player) return;
      const r = player.getBoundingClientRect();
      if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) closeDialog(player);
    });
  }
  document.querySelectorAll("dialog").forEach((dialog) =>
    dialog.addEventListener("keydown", (event) => {
      if (event.key !== "Tab") return;
      const controls = [
        ...dialog.querySelectorAll(
          'a[href],button:not([disabled]),summary,[tabindex="0"]',
        ),
      ].filter((el) => el.getClientRects().length);
      const first = controls[0],
        last = controls.at(-1);
      if (!first) {
        event.preventDefault();
        dialog.focus();
        return;
      }
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }),
  );
  const menu = document.querySelector("#mobile-menu"),
    toggle = document.querySelector(".menu-toggle");
  function openDialog(dialog) {
    dialog.showModal();
    document.body.classList.add("modal-open");
  }
  function closeDialog(dialog) {
    dialog.close();
  }
  if (menu && toggle) {
    toggle.addEventListener("click", () => {
      openDialog(menu);
      toggle.setAttribute("aria-expanded", "true");
    });
    menu
      .querySelector(".close-menu")
      .addEventListener("click", () => closeDialog(menu));
    menu.addEventListener("close", () => {
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("modal-open");
      toggle.focus({ preventScroll: true });
    });
    menu.addEventListener("click", (event) => {
      if (event.target === menu) {
        const r = menu.getBoundingClientRect();
        if (
          event.clientX < r.left ||
          event.clientX > r.right ||
          event.clientY < r.top ||
          event.clientY > r.bottom
        )
          closeDialog(menu);
      }
    });
    menu
      .querySelectorAll("nav a")
      .forEach((a) => a.addEventListener("click", () => closeDialog(menu)));
    window
      .matchMedia("(min-width:900px)")
      .addEventListener("change", (event) => {
        if (event.matches && menu.open) closeDialog(menu);
      });
  }
  function filters(attribute, itemSelector, categoryAttribute, statusSelector) {
    const buttons = [...document.querySelectorAll(`[${attribute}]`)];
    if (!buttons.length) return;
    buttons.forEach((button) =>
      button.addEventListener("click", () => {
        const value = button.getAttribute(attribute);
        let count = 0;
        buttons.forEach((b) =>
          b.setAttribute("aria-pressed", String(b === button)),
        );
        document.querySelectorAll(itemSelector).forEach((item) => {
          item.hidden =
            value !== "Todos" && item.getAttribute(categoryAttribute) !== value;
          if (!item.hidden) count++;
        });
        document.querySelector(statusSelector).textContent =
          `${count} ${attribute === "data-gallery-filter" ? "resultados" : "productos"}: ${value}`;
      }),
    );
  }
  filters(
    "data-gallery-filter",
    ".portfolio .result-tile",
    "data-category",
    "[data-gallery-status]",
  );
  filters(
    "data-product-filter",
    ".catalog-section .product-item",
    "data-product-category",
    "[data-product-status]",
  );
  const lightbox = document.querySelector("#lightbox");
  if (!lightbox) return;
  let photos = [],
    index = 0,
    opener = null,
    touchStart = null;
  const holder = lightbox.querySelector(".lightbox-media");
  function render() {
    const photo = photos[index];
    holder.replaceChildren();
    const img = new Image();
    img.src = photo.dataset.photoSrc;
    img.alt = photo.dataset.photoAlt;
    holder.append(img);
    lightbox.querySelector("#lightbox-title").textContent =
      photo.dataset.photoTitle;
    lightbox.querySelector(".lightbox-count").textContent =
      `${index + 1} / ${photos.length}`;
    lightbox.querySelector("[data-lightbox-prev]").disabled = photos.length < 2;
    lightbox.querySelector("[data-lightbox-next]").disabled = photos.length < 2;
  }
  function move(direction) {
    index = (index + direction + photos.length) % photos.length;
    render();
  }
  document.querySelectorAll(".photo-trigger").forEach((button) =>
    button.addEventListener("click", () => {
      photos = [...document.querySelectorAll(".photo-trigger")].filter(
        (p) => !p.closest("figure").hidden,
      );
      index = photos.indexOf(button);
      opener = button;
      render();
      openDialog(lightbox);
      lightbox.querySelector("[data-lightbox-close]").focus();
    }),
  );
  lightbox
    .querySelector("[data-lightbox-close]")
    .addEventListener("click", () => closeDialog(lightbox));
  lightbox
    .querySelector("[data-lightbox-prev]")
    .addEventListener("click", () => move(-1));
  lightbox
    .querySelector("[data-lightbox-next]")
    .addEventListener("click", () => move(1));
  lightbox.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      move(-1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      move(1);
    }
  });
  lightbox.addEventListener("close", () => {
    document.body.classList.remove("modal-open");
    opener?.focus({ preventScroll: true });
  });
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      const r = lightbox.getBoundingClientRect();
      if (
        event.clientX < r.left ||
        event.clientX > r.right ||
        event.clientY < r.top ||
        event.clientY > r.bottom
      )
        closeDialog(lightbox);
    }
  });
  holder.addEventListener(
    "touchstart",
    (event) => {
      touchStart = {
        x: event.changedTouches[0].clientX,
        y: event.changedTouches[0].clientY,
      };
    },
    { passive: true },
  );
  holder.addEventListener(
    "touchend",
    (event) => {
      if (!touchStart) return;
      const dx = event.changedTouches[0].clientX - touchStart.x,
        dy = event.changedTouches[0].clientY - touchStart.y;
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy))
        move(dx < 0 ? 1 : -1);
      touchStart = null;
    },
    { passive: true },
  );
})();
