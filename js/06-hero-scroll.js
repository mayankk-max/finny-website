(function () {
  var h = document.querySelector(".hero-head"),
    st = document.querySelector(".hero-stage");
  if (!h || !st) return;
  if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var tick = false,
    dist = 300;
  function meas() {
    dist = Math.max(200, st.offsetTop - h.offsetTop + 40);
  }
  meas();
  addEventListener("resize", meas);
  addEventListener("load", meas);
  function run() {
    tick = false;
    var y = window.scrollY;
    if (y > dist * 1.6 && h.dataset.off) {
      return;
    }
    h.dataset.off = y > dist * 1.6 ? 1 : "";
    var p = Math.max(0, Math.min(1, y / dist)),
      e = p * p * (3 - 2 * p);
    h.style.transform =
      "translateY(" + (y * 0.75).toFixed(1) + "px) scale(" + (1 - 0.35 * e).toFixed(3) + ")";
    h.style.opacity = (1 - e).toFixed(3);
  }
  addEventListener(
    "scroll",
    function () {
      if (!tick) {
        tick = true;
        requestAnimationFrame(run);
      }
    },
    { passive: true },
  );
  run();
})();
