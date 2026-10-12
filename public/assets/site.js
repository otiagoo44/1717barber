(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const animations = new Set();
  const elementAnimations = new WeakMap();
  function reveal(target, delay = 0, photo = false) {
    target.classList.remove("reveal-pending");
    if (reducedMotion.matches || !target.animate) return;
    elementAnimations.get(target)?.cancel();
    const animation = target.animate(
      [{opacity:0,transform:"translateY(28px)"},{opacity:1,transform:"none"}],
      {duration:photo ? 800 : 650,delay,easing:"cubic-bezier(.22,1,.36,1)",fill:"backwards"},
    );
    animations.add(animation);
    elementAnimations.set(target,animation);
    animation.finished.then(() => animations.delete(animation)).catch(() => animations.delete(animation));
  }
  function handlePageTransition(event) {
    const transition = event.viewTransition;
    if (!transition) return;
    transition.ready.catch(() => {});
    if (reducedMotion.matches) transition.skipTransition();
  }
  window.addEventListener("pagereveal",handlePageTransition);
  window.addEventListener("pageswap",handlePageTransition);
  if (!reducedMotion.matches) document.documentElement.classList.add("motion-ready");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(({target,isIntersecting},i) => {
        if (!isIntersecting) return;
        observer.unobserve(target);
        if (target.classList.contains("reveal-pending")) reveal(target,Math.min(i,2)*70,target.matches("figure"));
      });
    }, {threshold:0,rootMargin:"0px 0px -32px 0px"});
    // Prepare only content below the fold, before it can be seen. Never dim
    // content already on screen (including hash links and restored scroll).
    const upcoming = [...document.querySelectorAll("main section:not(.hero) h2:not(.sr-only),.feature-photo,.service-row,.team-photo,.location-photo,.result-tile,.founder-names>div,.product-item")]
      .filter(el => el.getBoundingClientRect().top >= innerHeight);
    if (!reducedMotion.matches) upcoming.forEach(el => {
      el.classList.add("reveal-pending");
      observer.observe(el);
    });
    document.addEventListener("focusin",event => {
      const target = event.target.closest(".reveal-pending");
      if (target) {target.classList.remove("reveal-pending");observer.unobserve(target);}
    });
    // Manage visibility only on pages that actually have a floating booking bar.
    if (document.querySelector(".mobile-booking")) {
    const visibleActions = new Set();
    document.body.classList.add("booking-managed");
    const bookingObserver = new IntersectionObserver(entries => {
      entries.forEach(({target,isIntersecting}) => isIntersecting ? visibleActions.add(target) : visibleActions.delete(target));
      document.body.classList.toggle("booking-visible", visibleActions.size === 0);
    }, {rootMargin:"-96px 0px -80px 0px"});
    document.querySelectorAll("main .button[data-intent]:not(.outline)").forEach(el => bookingObserver.observe(el));
    }
  }
  function settleMotion() {
    document.documentElement.classList.remove("motion-ready");
    animations.forEach(a => a.cancel());
    animations.clear();
    document.querySelectorAll(".reveal-pending").forEach(el => el.classList.remove("reveal-pending"));
  }
  reducedMotion.addEventListener("change",e => {
    if (!e.matches) return;
    settleMotion();
    const transition = document.activeViewTransition;
    if (transition) { transition.ready.catch(() => {}); transition.skipTransition(); }
  });
  window.addEventListener("pagehide",settleMotion);
  window.addEventListener("pageshow",e => {if(e.persisted) settleMotion();});
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
  const reelFacades = [...document.querySelectorAll(".reel-facade[data-reel-source]")];
  if (reelFacades.length) {
    const player = document.createElement("dialog");
    player.id = "reel-player";
    player.className = "reel-player";
    player.setAttribute("aria-labelledby", "reel-player-title");
    player.innerHTML = `<div class="reel-player-bar"><div><p class="eyebrow">RULOS / EN MOVIMIENTO</p><h2 id="reel-player-title">Reel de 17:17</h2></div><button type="button" data-reel-player-close aria-label="Cerrar reproductor">Cerrar <span aria-hidden="true">×</span></button></div><div class="reel-player-stage"><div class="reel-player-frame" data-reel-player-frame></div></div><div class="reel-player-footer"><span data-reel-player-status aria-live="polite">Reproducción dentro de la página</span><a class="text-link" data-reel-player-external target="_blank" rel="noopener noreferrer">Publicación original en Instagram <span aria-hidden="true" class="arrow">↗</span></a></div>`;
    document.body.append(player);
    const frame = player.querySelector("[data-reel-player-frame]"),
      title = player.querySelector("#reel-player-title"),
      status = player.querySelector("[data-reel-player-status]"),
      external = player.querySelector("[data-reel-player-external]"),
      close = player.querySelector("[data-reel-player-close]");
    const initialSource = reelFacades.find(facade => facade.dataset.reelSource)?.dataset.reelSource;
    external.hidden = !initialSource;
    if (initialSource) external.href = initialSource;
    let reelOpener = null;
    function showReel(facade) {
      reelOpener = facade;
      frame.replaceChildren();
      title.textContent = facade.getAttribute("aria-label")?.replace(/^Reproducir\s+/i, "") || "Reel de 17:17";
      external.hidden = !facade.dataset.reelSource;
      if (facade.dataset.reelSource) external.href = facade.dataset.reelSource;
      else external.removeAttribute('href');
      player.querySelector('.eyebrow').textContent = `${facade.dataset.videoCategory || 'Rulos'} / EN MOVIMIENTO`;
      status.textContent = "Cargando video…";
      const video = document.createElement("video");
      video.controls = true;
      video.defaultMuted = true;
      video.muted = true;
      video.playsInline = true;
      video.preload = "none";
      video.poster = facade.querySelector("img").src;
      video.src = facade.href;
      video.setAttribute("aria-label",title.textContent);
      const announce = text => {if(video.isConnected) status.textContent = text;};
      video.addEventListener("playing", () => announce("Reproduciendo · 17:17 Barbería"));
      video.addEventListener("pause", () => announce("Video en pausa"));
      video.addEventListener("ended", () => announce("Volvé a reproducirlo cuando quieras."));
      video.addEventListener("error", () => announce("No se pudo cargar el video. Cerrá y volvé a intentarlo."));
      frame.append(video);
      openDialog(player);
      close.focus();
      video.play().catch(() => {
        if (!video.error) announce("Tocá reproducir para comenzar.");
      });
    }
    function clearReel() {
      const video = frame.querySelector("video");
      if (video) {video.pause();video.removeAttribute("src");video.load();}
      document.body.classList.remove("modal-open");
      frame.replaceChildren();
      status.textContent = "Reproducción dentro de la página";
      reelOpener?.focus({ preventScroll: true });
      reelOpener = null;
    }
    reelFacades.forEach((facade) => {
      facade.setAttribute("aria-haspopup", "dialog");
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
          'a[href],button:not([disabled]),video[controls],summary,[tabindex="0"]',
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
          const wasHidden = item.hidden;
          item.hidden =
            value !== "Todos" && item.getAttribute(categoryAttribute) !== value;
          if (!item.hidden) {
            // Existing visible results stay steady; only new results enter.
            if (wasHidden || item.classList.contains("reveal-pending")) reveal(item,count*45,true);
            count++;
          }
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
  const workCards = [...document.querySelectorAll('.work-card')];
  if (workCards.length) {
    document.querySelector('.work-portfolio').classList.add('work-ready');
    const categoryButtons = [...document.querySelectorAll('[data-work-category]')];
    const formatButtons = [...document.querySelectorAll('[data-work-format]')];
    const more = document.querySelector('[data-work-more]');
    const status = document.querySelector('[data-work-status]');
    let category = new URL(location.href).searchParams.get('categoria') || 'Todos';
    if (!categoryButtons.some(b => b.dataset.workCategory === category)) category = 'Todos';
    let format = 'Todos', limit = 12;
    function updateWorks(animate = false) {
      const matches = workCards.filter(card => (category === 'Todos' || card.dataset.category === category) && (format === 'Todos' || card.dataset.workType === format));
      const shown = new Set(matches.slice(0,limit));
      workCards.forEach(card => {
        const wasHidden = card.hidden;
        card.hidden = !shown.has(card);
        if (animate && wasHidden && !card.hidden) reveal(card,Math.min([...shown].indexOf(card),2)*70,true);
      });
      categoryButtons.forEach(b => b.setAttribute('aria-pressed',String(b.dataset.workCategory===category)));
      formatButtons.forEach(b => b.setAttribute('aria-pressed',String(b.dataset.workFormat===format)));
      status.textContent = `${shown.size} de ${matches.length} trabajos · ${category} · ${format === 'Todos' ? 'Fotos y videos' : format === 'photo' ? 'Fotos' : 'Videos'}`;
      document.querySelector('[data-work-empty]').hidden = matches.length !== 0;
      more.hidden = matches.length <= limit;
      more.textContent = `Ver más trabajos (${Math.min(12,Math.max(0,matches.length-limit))})`;
    }
    categoryButtons.forEach(b => b.addEventListener('click',()=>{category=b.dataset.workCategory;limit=12;updateWorks(true);}));
    formatButtons.forEach(b => b.addEventListener('click',()=>{format=b.dataset.workFormat;limit=12;updateWorks(true);}));
    more.addEventListener('click',()=>{
      const previous = new Set(workCards.filter(c=>!c.hidden));
      limit+=12;updateWorks(true);
      const first = workCards.find(c=>!c.hidden&&!previous.has(c));
      first?.querySelector('a,button')?.focus({preventScroll:true});
    });
    updateWorks();
  }
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
    holder.classList.toggle("is-frame", photo.dataset.photoCrop === "frame");
    img.style.objectPosition = photo.dataset.photoPosition || "center";
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
    button.addEventListener("click", (event) => {
      event.preventDefault();
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
