(function () {
  var box = document.querySelector(".hero-stage .coins"),
    stage = document.querySelector(".hero-stage");
  if (!box || !stage) return;
  var SRC = ["assets/img/coin-1.webp", "assets/img/coin-2.webp", "assets/img/coin-3.webp"];
  var OP = 0.4,
    rm = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  function rnd(a, b) {
    return a + Math.random() * (b - a);
  }
  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1)),
        t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }
  var coins = [];
  function build() {
    box.innerHTML = "";
    coins = [];
    var dv = stage.querySelector(".dev-hero"),
      P = (dv ? dv.getBoundingClientRect().width : 334) * 0.982,
      small = window.innerWidth < 700,
      VR = [0.732, 0.618, 0.712];
    var L = [
      [2, -0.989, -0.641, 0.364, 0.24],
      [0, 0.896, -0.645, 0.318, 0.06],
      [1, 0.706, -0.15, 0.33, 0.18],
      [1, -0.761, -0.083, 0.312, 0.12],
      [2, 0.888, 0.384, 0.3, 0.3],
      [0, -0.99, 0.48, 0.384, 0],
    ];
    L.forEach(function (c) {
      var vis = c[3] * P,
        x = c[1] * P,
        y = c[2] * P;
      if (small) {
        vis *= 0.5;
        x = (c[1] < 0 ? -1 : 1) * (P * 0.5 + vis * 0.15);
        y *= 0.7;
      }
      var size = vis / VR[c[0]];
      var img = new Image();
      img.className = "coin";
      img.alt = "";
      img.draggable = false;
      img.src = SRC[c[0]];
      img.style.width = size + "px";
      img.style.marginLeft = img.style.marginTop = -size / 2 + "px";
      box.appendChild(img);
      coins.push({ el: img, x: x, y: y, rot: 0, d: c[4] });
    });
    render();
  }
  function ease(t) {
    return 1 - Math.pow(1 - t, 3);
  }
  var top = 300;
  function meas() {
    top = Math.max(
      260,
      stage.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.25,
    );
  }
  function render() {
    var p = rm ? 1 : Math.max(0, Math.min(1, window.scrollY / Math.max(260, top * 0.8)));
    coins.forEach(function (c) {
      var t = ease(Math.max(0, Math.min(1, (p - c.d * 0.5) / (1 - c.d * 0.5))));
      c.el.style.opacity = (OP * Math.min(1, t * 2.2)).toFixed(3);
      c.el.style.transform =
        "translate3d(" +
        (c.x * t).toFixed(1) +
        "px," +
        (c.y * t).toFixed(1) +
        "px,0) rotate(" +
        (c.rot * t - (1 - t) * 40).toFixed(1) +
        "deg) scale(" +
        (0.55 + 0.45 * t).toFixed(3) +
        ")";
    });
  }
  var tick = false;
  addEventListener(
    "scroll",
    function () {
      if (!tick) {
        tick = true;
        requestAnimationFrame(function () {
          tick = false;
          render();
        });
      }
    },
    { passive: true },
  );
  var lw = window.innerWidth;
  addEventListener("resize", function () {
    meas();
    if (Math.abs(window.innerWidth - lw) > 40) {
      lw = window.innerWidth;
      build();
    } else render();
  });
  addEventListener("load", function () {
    meas();
    render();
  });
  meas();
  build();
})();
