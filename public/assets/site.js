(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  // El contenido siempre es visible; el movimiento sólo acompaña su entrada.
  if (!reducedMotion.matches && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (!isIntersecting) return;
          target.classList.add("entered");
          observer.unobserve(target);
        });
      },
      { threshold: 0.12 },
    );
    document
      .querySelectorAll("main section:not(.hero) h2, .editorial-grid figure")
      .forEach((target) => observer.observe(target));
    window.addEventListener("pagehide", () => observer.disconnect(), {
      once: true,
    });
    reducedMotion.addEventListener("change", (event) => {
      if (event.matches) observer.disconnect();
    });
  }
  // Mantener el ciclo de Tab dentro de ambos dialogs, incluso en el último control.
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
      .matchMedia("(min-width:1101px)")
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
