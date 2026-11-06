(function () {
  var t = document.querySelectorAll(".plan-tab"),
    g = document.querySelector(".prices[data-tier]");
  if (!g) return;
  var f = function (n) {
    return "\u20b9" + Number(n).toLocaleString("en-IN");
  };
  function apply(k) {
    g.setAttribute("data-tier", k);
    var c = g.querySelectorAll(".count[data-" + k + "]");
    c.forEach(function (el) {
      el.dataset.to = el.dataset[k];
      el.textContent = f(el.dataset[k]);
    });
    var rs = g.querySelector(".price-reset .count"),
      cf = g.querySelector(".price-cfo .count");
    g.querySelectorAll("[data-ref=reset]").forEach(function (e) {
      e.textContent = f(rs.dataset[k]);
    });
    g.querySelectorAll("[data-ref=cfo]").forEach(function (e) {
      e.textContent = f(cf.dataset[k]);
    });
    g.querySelectorAll("[data-combo]").forEach(function (e) {
      e.textContent = f(+rs.dataset[k] + +cf.dataset[k]);
    });
    g.querySelectorAll("[data-pm]").forEach(function (e) {
      e.textContent = f(Math.round(cf.dataset[k] / 12 / 10) * 10);
    });
  }
  t.forEach(function (b) {
    b.addEventListener("click", function () {
      t.forEach(function (x) {
        var on = x === b;
        x.classList.toggle("on", on);
        x.setAttribute("aria-selected", on);
      });
      apply(b.dataset.plan);
    });
  });
})();
