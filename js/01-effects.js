(function () {
  const RM = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  const root = document.documentElement;
  // 8 starfield
  const st = document.getElementById("stars");
  if (st) {
    for (let i = 0; i < 80; i++) {
      const d = document.createElement("i");
      const o = (0.2 + Math.random() * 0.6).toFixed(2);
      d.style.cssText =
        "left:" +
        Math.random() * 100 +
        "%;top:" +
        Math.random() * 100 +
        "%;opacity:" +
        o +
        ";--o:" +
        o +
        ";--t:" +
        (2 + Math.random() * 4).toFixed(1) +
        "s;--dl:" +
        (-Math.random() * 5).toFixed(1) +
        "s";
      st.appendChild(d);
    }
    [
      [5, 15, 0],
      [30, 8, 2.5],
      [60, 20, 4.6],
      [18, 45, 6],
    ].forEach(([l, t, dl]) => {
      const d = document.createElement("i");
      d.className = "shoot";
      d.style.cssText = "left:" + l + "%;top:" + t + "%;--dl:" + dl + "s";
      st.appendChild(d);
    });
  }
  if (RM || !("IntersectionObserver" in window)) return;
  root.classList.add("js-motion");
  // 5 entry: elements below the fold get a pre state; all reveal on view, with a safety timeout
  const vh = innerHeight;
  const sel = ".rv, .t-card, .price, .fr-card, .opt, .s-copy > *";
  const groups = new Map();
  document.querySelectorAll(sel).forEach((el) => {
    if (el.closest(".hero")) return;
    if (el.getBoundingClientRect().top < vh * 0.9) return;
    el.classList.add("pre");
    const p = el.parentElement;
    const i = groups.get(p) || 0;
    groups.set(p, i + 1);
    el.style.setProperty("--d", Math.min(i * 0.08, 0.4) + "s");
  });
  const io = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
          onIn(e.target);
        }
      }),
    { threshold: 0.15 },
  );
  document
    .querySelectorAll(".pre, .fr-card, .fire-types, .price.feat, .price-cfo, .count")
    .forEach((el) => io.observe(el));
  setTimeout(
    () =>
      document
        .querySelectorAll(".pre:not(.in), .fr-card:not(.in), .fire-types:not(.in)")
        .forEach((el) => el.classList.add("in")),
    6000,
  );
  // 4 count-up
  function onIn(el) {
    if (el.classList.contains("count") && !el.dataset.done) {
      el.dataset.done = 1;
      const to = +el.dataset.to,
        t0 = performance.now(),
        D = 1200;
      const fmt = (n) => "\u20B9" + n.toLocaleString("en-IN");
      (function f(t) {
        const k = Math.max(0, Math.min((t - t0) / D, 1)),
          e = 1 - Math.pow(1 - k, 3);
        el.textContent = fmt(Math.round(to * e));
        if (k < 1) requestAnimationFrame(f);
      })(t0);
    }
  }
  // 1 hero loop: 60 -> 50
  const hv = document.querySelector(".hv"),
    age = document.getElementById("hvAge"),
    cap = document.getElementById("hvCap");
  if (hv) {
    function cycle() {
      hv.classList.remove("go");
      age.textContent = "60";
      cap.textContent = "\u00a0";
      setTimeout(() => {
        hv.classList.add("go");
        cap.textContent = "10 years earlier";
        const t0 = performance.now();
        (function f(t) {
          const k = Math.max(0, Math.min((t - t0) / 2000, 1)),
            e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
          age.textContent = Math.round(60 - 10 * e);
          if (k < 1) requestAnimationFrame(f);
        })(t0);
      }, 900);
    }
    cycle();
    setInterval(cycle, 6500);
  }
  // 2 stacking depth
  const steps = [...document.querySelectorAll(".step")];
  let tick = false;
  function depth() {
    tick = false;
    for (let i = 0; i < steps.length - 1; i++) {
      const cur = steps[i],
        nxt = steps[i + 1];
      const ct = cur.getBoundingClientRect().top,
        nt = nxt.getBoundingClientRect().top,
        h = cur.offsetHeight;
      const p = Math.max(0, Math.min(1, 1 - (nt - ct) / h));
      cur.style.transform = "scale(" + (1 - 0.05 * p).toFixed(4) + ") translateZ(0)";
      cur.style.setProperty("--dim", (0.35 * p).toFixed(3));
    }
  }
  addEventListener(
    "scroll",
    () => {
      if (!tick) {
        tick = true;
        requestAnimationFrame(depth);
      }
    },
    { passive: true },
  );
  depth();
})();
// FIRE path switcher
(function () {
  const btns = document.querySelectorAll("button.ft[data-path]");
  const imgs = document.querySelectorAll(".shot-stack .shot");
  btns.forEach((b) =>
    b.addEventListener("click", () => {
      const p = b.dataset.path;
      btns.forEach((x) => {
        const on = x === b;
        x.classList.toggle("on", on);
        x.setAttribute("aria-pressed", on);
      });
      imgs.forEach((i) => i.classList.toggle("on", i.dataset.path === p));
      document
        .querySelectorAll(".ft-desc p")
        .forEach((d) => d.classList.toggle("on", d.dataset.path === p));
    }),
  );
})();
// FIRE score tabs
(function () {
  const tb = document.querySelectorAll("button.ft[data-score]");
  const ds = document.querySelectorAll(".score-desc p");
  tb.forEach((b) =>
    b.addEventListener("click", () => {
      const k = b.dataset.score;
      tb.forEach((x) => {
        const on = x === b;
        x.classList.toggle("on", on);
        x.setAttribute("aria-pressed", on);
      });
      ds.forEach((d) => d.classList.toggle("on", d.dataset.score === k));
    }),
  );
})();
// FIRE score interaction
(function () {
  const dims = document.querySelectorAll(".sc-dim");
  const rows = document.querySelectorAll(".sc-row");
  const scr = document.querySelector(".dev-screen");
  function sel(k) {
    dims.forEach((d) => {
      const on = d.dataset.dim === k;
      d.setAttribute("aria-selected", on);
    });
    rows.forEach((r) => r.classList.toggle("open", r.dataset.dim === k));
    document.querySelectorAll(".dev-state").forEach((st) => {
      const want = k
        ? document.querySelector('.dev-state[data-state="' + k + '"]')
          ? k
          : "detail"
        : "overview";
      st.classList.toggle("on", st.dataset.state === want);
    });
    if (scr) scr.scrollTop = 0;
    if (k) {
      const ring = document.querySelector(".dev .sc-ring");
      if (ring) requestAnimationFrame(() => ring.classList.add("go"));
    }
  }
  dims.forEach((d) =>
    d.addEventListener("click", () => {
      const k = d.dataset.dim;
      sel(d.getAttribute("aria-selected") === "true" ? null : k);
    }),
  );
  rows.forEach((r) =>
    r.querySelector(".sc-rh").addEventListener("click", () => {
      const k = r.dataset.dim;
      sel(r.classList.contains("open") ? null : k);
    }),
  );
  const ring = null;
  if (ring) {
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (es) => {
          if (es[0].isIntersecting) {
            ring.classList.add("go");
            io.disconnect();
          }
        },
        { threshold: 0.3 },
      );
      io.observe(ring);
    } else ring.classList.add("go");
  }
  const m = document.getElementById("scModal");
  let last = null;
  function open() {
    last = document.activeElement;
    m.hidden = false;
    document.body.style.overflow = "hidden";
    m.querySelector(".sc-x").focus();
  }
  function close() {
    m.hidden = true;
    document.body.style.overflow = "";
    if (last) last.focus();
  }
  document.querySelectorAll("[data-open-report]").forEach((b) => b.addEventListener("click", open));
  m.querySelectorAll("[data-close-report]").forEach((b) => b.addEventListener("click", close));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !m.hidden) close();
  });
})();
// FIRE path rows
(function () {
  const r = document.querySelectorAll(".path-dim");
  const imgs = document.querySelectorAll(".shot-stack .shot");
  r.forEach((b) =>
    b.addEventListener("click", () => {
      const p = b.dataset.path;
      r.forEach((x) => x.setAttribute("aria-selected", x === b));
      imgs.forEach((i) => i.classList.toggle("on", i.dataset.path === p));
    }),
  );
})();
// Particle fields behind phones
(function () {
  const RM = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  const DARK = ["212,234,198", "210,160,111", "157,211,168"],
    LIGHT = ["201,138,84", "76,155,102", "27,75,68"];
  document.querySelectorAll(".has-fx .fx").forEach((c) => {
    if (!c.getContext) return;
    const x = c.getContext("2d");
    const cols = c.dataset.tone === "light" ? LIGHT : DARK;
    const light = c.dataset.tone === "light";
    let W,
      H,
      P = [],
      run = false,
      raf,
      last = 0;
    const SP = {};
    cols.forEach((cl) => {
      const o = document.createElement("canvas");
      o.width = o.height = 32;
      const g = o.getContext("2d"),
        gr = g.createRadialGradient(16, 16, 0, 16, 16, 16);
      gr.addColorStop(0, "rgba(" + cl + ",1)");
      gr.addColorStop(0.22, "rgba(" + cl + ",.95)");
      gr.addColorStop(0.4, "rgba(" + cl + ",.35)");
      gr.addColorStop(1, "rgba(" + cl + ",0)");
      g.fillStyle = gr;
      g.fillRect(0, 0, 32, 32);
      SP[cl] = o;
    });
    function size() {
      const r = c.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      W = r.width;
      H = r.height;
      c.width = W * dpr;
      c.height = H * dpr;
      x.setTransform(dpr, 0, 0, dpr, 0, 0);
      P = Array.from({ length: 60 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: (light ? 1.3 : 0.9) + Math.random() * 2.4,
        v: 0.15 + Math.random() * 0.45,
        dx: (Math.random() - 0.5) * 0.25,
        a: (light ? 0.45 : 0.4) + Math.random() * (light ? 0.45 : 0.55),
        t: Math.random() * 6.28,
        c: cols[(Math.random() * 3) | 0],
      }));
      draw(0);
    }
    function draw(dt) {
      x.clearRect(0, 0, W, H);
      for (const p of P) {
        if (dt) {
          p.y -= p.v * dt;
          p.x += p.dx * dt;
          p.t += 0.02 * dt;
          if (p.y < -6) {
            p.y = H + 6;
            p.x = Math.random() * W;
          }
          if (p.x < -6) p.x = W + 6;
          if (p.x > W + 6) p.x = -6;
        }
        x.globalAlpha = p.a * (0.6 + 0.4 * Math.sin(p.t));
        const sp = SP[p.c],
          d = p.r * (light ? 5 : 9);
        x.drawImage(sp, p.x - d / 2, p.y - d / 2, d, d);
      }
      x.globalAlpha = 1;
    }
    function loop(t) {
      const dt = last ? Math.min((t - last) / 16.7, 3) : 1;
      last = t;
      draw(dt);
      if (run) raf = requestAnimationFrame(loop);
    }
    size();
    addEventListener("resize", size);
    if (RM) return;
    if ("IntersectionObserver" in window) {
      new IntersectionObserver((es) => {
        const v = es[0].isIntersecting;
        if (v && !run) {
          run = true;
          last = 0;
          raf = requestAnimationFrame(loop);
        } else if (!v) {
          run = false;
          cancelAnimationFrame(raf);
        }
      }).observe(c);
    } else {
      run = true;
      raf = requestAnimationFrame(loop);
    }
  });
})();
