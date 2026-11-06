(function () {
  function place() {
    document.querySelectorAll(".pc-mini").forEach(function (m) {
      var t = m.querySelector(".pcm-top");
      if (t) m.style.setProperty("--pcm-split", t.offsetHeight + "px");
    });
  }
  place();
  addEventListener("resize", place);
  document.addEventListener("click", function (e) {
    if (e.target.closest && e.target.closest(".pcm-toggle")) setTimeout(place, 0);
  });
  if (document.fonts) document.fonts.ready.then(place);
})();
