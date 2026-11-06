(function () {
  document.querySelectorAll("[data-expandable]").forEach(function (c) {
    c.querySelectorAll(".pcm-toggle").forEach(function (b) {
      b.addEventListener("click", function () {
        var col = c.classList.toggle("is-collapsed");
        var f = c.querySelector(col ? ".pc-mini .pcm-toggle" : ".pcm-less");
        if (f) f.focus();
      });
    });
  });
})();
