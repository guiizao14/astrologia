(() => {
  const cfg = window.SEU_MAPA || {};
  const root = document.documentElement;
  const toast = document.querySelector(".toast");
  let toastTimer;

  function notify(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 4200);
  }

  if (cfg.showPendingBadges) document.body.classList.add("show-pending");

  /* ---------------------------------------------------------- Checkout
     Todos os botões usam a mesma URL de config.js. Sem URL, nenhum leva a
     lugar nenhum: a página avisa em vez de apontar para "#". */
  const passthrough = /^(utm_|fbclid$|gclid$|ttclid$|src$|sck$|xcod$)/;
  function checkoutHref() {
    if (!cfg.checkoutUrl) return "";
    const url = new URL(cfg.checkoutUrl);
    if (cfg.preserveUtms) {
      new URLSearchParams(location.search).forEach((value, key) => {
        if (passthrough.test(key) && !url.searchParams.has(key)) url.searchParams.set(key, value);
      });
    }
    return url.toString();
  }
  const href = checkoutHref();
  document.querySelectorAll("[data-checkout]").forEach((link) => {
    if (href) link.href = href;
    link.addEventListener("click", (event) => {
      track(cfg.clickEvent);
      if (!href) {
        event.preventDefault();
        notify("Checkout Zuptos ainda não configurado: preencha checkoutUrl em config.js.");
      }
    });
  });

  /* ------------------------------------------------------------- Pixel
     Carrega só com ID real. PageView e ViewContent aqui; o clique vira
     evento próprio. Purchase fica com o checkout, depois do pagamento. */
  function track(event) {
    if (!window.fbq || !event) return;
    const params = { content_name: "Seu Mapa, Seu 2027", value: cfg.price?.value, currency: cfg.price?.currency };
    window.fbq(event.custom ? "trackCustom" : "track", event.name, params);
  }
  if (cfg.metaPixelId) {
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n;
      n.push = n; n.loaded = true; n.version = "2.0"; n.queue = [];
      t = b.createElement(e); t.async = true; t.src = v;
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    window.fbq("init", cfg.metaPixelId);
    window.fbq("track", "PageView");
    window.fbq("track", "ViewContent", { content_name: "Seu Mapa, Seu 2027", content_type: "product", value: cfg.price?.value, currency: cfg.price?.currency });
  }

  /* ------------------------------------------------------------- Capa */
  if (cfg.coverImage) {
    const img = document.querySelector(".cover-img");
    img.src = cfg.coverImage;
    img.hidden = false;
    document.querySelector(".cover-placeholder").remove();
    document.querySelector(".hero-cover .pending")?.remove();
  }

  /* ---------------------------------------------------------- Prévias */
  const gallery = document.querySelector("[data-gallery]");
  const viewer = document.querySelector(".viewer");
  const stage = viewer.querySelector(".viewer-stage");
  const big = stage.querySelector("img");
  const count = viewer.querySelector(".viewer-count");
  const previews = Array.isArray(cfg.previews) ? cfg.previews.filter((p) => p && p.src) : [];
  let current = 0;

  function show(index) {
    current = (index + previews.length) % previews.length;
    big.src = previews[current].src;
    big.alt = previews[current].alt || `Página ${current + 1} do guia`;
    count.textContent = `${current + 1} / ${previews.length}`;
    stage.classList.remove("zoomed");
    stage.scrollTo(0, 0);
  }

  if (previews.length) {
    gallery.innerHTML = "";
    previews.forEach((page, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "thumb";
      button.setAttribute("aria-label", `Ampliar ${page.alt || `página ${index + 1} do guia`}`);
      const img = document.createElement("img");
      img.src = page.src;
      img.alt = "";
      img.loading = "lazy";
      img.decoding = "async";
      button.append(img);
      button.addEventListener("click", () => {
        show(index);
        viewer.showModal();
      });
      gallery.append(button);
    });
    viewer.querySelector(".viewer-nav").hidden = previews.length < 2;
  }
  viewer.querySelector(".viewer-close").addEventListener("click", () => viewer.close());
  viewer.querySelectorAll("[data-step]").forEach((b) => b.addEventListener("click", () => show(current + Number(b.dataset.step))));
  big.addEventListener("click", () => stage.classList.toggle("zoomed"));
  viewer.addEventListener("click", (event) => { if (event.target === viewer) viewer.close(); });
  viewer.addEventListener("keydown", (event) => {
    if (previews.length < 2) return;
    if (event.key === "ArrowRight") show(current + 1);
    if (event.key === "ArrowLeft") show(current - 1);
  });

  /* ---------------------------------------------------------------- FAQ
     <details> nativo; abrir um fecha os outros. */
  const items = [...document.querySelectorAll(".faq details")];
  items.forEach((item) => item.addEventListener("toggle", () => {
    if (item.open) items.forEach((other) => { if (other !== item) other.open = false; });
  }));

  /* ------------------------------------------------- Prova social real
     Só aparece com um número verdadeiro e verificável em config.js. */
  /* Selo em duas camadas, montado com nós de texto (sem innerHTML):
     "✦ destaque ✦" em cima, o restante da frase embaixo. As estrelas são
     decorativas para leitores de tela. */
  if (cfg.socialProof) {
    document.querySelectorAll("[data-social-proof]").forEach((el) => {
      const star = () => {
        const s = document.createElement("span");
        s.className = "sp-star";
        s.setAttribute("aria-hidden", "true");
        s.textContent = "✦";
        return s;
      };
      const hl = cfg.socialProofHighlight || "";
      const i = hl ? cfg.socialProof.indexOf(hl) : -1;
      const head = document.createElement("span");
      head.className = "sp-head";
      const strong = document.createElement("strong");
      strong.className = "sp-shine";
      strong.textContent = i >= 0 ? hl : cfg.socialProof;
      head.append(star(), strong, star());
      const parts = [head];
      const rest = i >= 0 ? (cfg.socialProof.slice(0, i) + " " + cfg.socialProof.slice(i + hl.length)).trim() : "";
      if (rest) {
        const r = document.createElement("span");
        r.className = "sp-rest sp-shine";
        r.textContent = rest;
        parts.push(" ", r);
      }
      el.replaceChildren(...parts);
      el.hidden = false;
    });
  }

  /* ------------------------------------------------------ Timer da oferta
     Conta até uma data fixa de config.js: o mesmo prazo para todo mundo,
     sem reiniciar. Ao chegar a zero, os timers somem. */
  const endsAt = cfg.timerDemo
    ? Date.now() + (cfg.timerDemoHours || 72) * 3600 * 1000
    : cfg.offerEndsAt ? new Date(cfg.offerEndsAt).getTime() : NaN;
  if (cfg.timerDemo) {
    console.warn("[Seu Mapa] Timer em modo demonstração: desligue timerDemo e defina offerEndsAt antes de publicar.");
    document.querySelector("[data-timer-demo-badge]")?.removeAttribute("hidden");
  }
  const inline = document.querySelector("[data-offer-timer]");
  const box = document.querySelector("[data-offer-timer-box]");
  if (box && Number.isFinite(endsAt)) {
    box.querySelector("[data-offer-label]").textContent = cfg.offerLabel || "A oferta termina em";
    const cells = { h: box.querySelector('[data-t="h"]'), m: box.querySelector('[data-t="m"]'), s: box.querySelector('[data-t="s"]') };
    const pad = (n) => String(n).padStart(2, "0");
    let timerId;
    const tick = () => {
      const left = Math.floor((endsAt - Date.now()) / 1000);
      if (left <= 0) {
        box.hidden = true;
        if (inline) inline.hidden = true;
        clearInterval(timerId);
        return;
      }
      const h = Math.floor(left / 3600), m = Math.floor((left % 3600) / 60), s = left % 60;
      cells.h.textContent = pad(h);
      cells.m.textContent = pad(m);
      cells.s.textContent = pad(s);
      box.setAttribute("aria-label", `${cfg.offerLabel || "A oferta termina em"} ${h} horas e ${m} minutos`);
      if (inline) inline.innerHTML = `<span class="dot" aria-hidden="true"></span>Oferta termina em <strong>${pad(h)}:${pad(m)}:${pad(s)}</strong>`;
      box.hidden = false;
      if (inline) inline.hidden = false;
    };
    tick();
    timerId = setInterval(tick, 1000);
  }

  /* ----------------------------------------------- Dias até 2027
     Contagem real até 1º de janeiro: não reinicia e não promete oferta. */
  const daysEl = document.querySelector("[data-days-left]");
  if (daysEl && cfg.showDaysTo2027 !== false) {
    const now = new Date();
    const days = Math.ceil((new Date(2027, 0, 1) - now) / 86400000);
    if (days > 0) {
      daysEl.innerHTML = `Faltam <strong>${days} ${days === 1 ? "dia" : "dias"}</strong> para 2027. Comece sua reflexão antes da virada.`;
      daysEl.hidden = false;
    }
  }

  /* ---------------------------------------------------------- Revelação
     Nos dois sentidos: esmaece ao sair pelas bordas e volta ao reentrar,
     vindo de baixo ao descer e de cima ao subir. Só esconde depois que o
     observador existe. */
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches && !root.classList.contains("force-motion");
  if (!reduced && "IntersectionObserver" in window) {
    let observed = false;
    const io = new IntersectionObserver((entries) => {
      observed = true;
      entries.forEach((entry) => {
        const el = entry.target;
        if (entry.isIntersecting) {
          el.classList.add("in");
        } else {
          el.dataset.from = entry.boundingClientRect.top < 0 ? "top" : "bottom";
          el.classList.remove("in");
        }
      });
    }, { rootMargin: "-7% 0px -7% 0px", threshold: 0 });
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    root.classList.add("reveal-ready");
    /* Trava de segurança: se o observador não disparar com a aba visível,
       mostra tudo em vez de deixar conteúdo escondido. */
    const failsafe = () => setTimeout(() => {
      if (!observed && !document.hidden) { io.disconnect(); root.classList.remove("reveal-ready"); }
    }, 2500);
    if (document.hidden) document.addEventListener("visibilitychange", failsafe, { once: true });
    else failsafe();
  }
})();
