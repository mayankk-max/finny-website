(function () {
  var d = document.getElementById("getApp");
  if (!d) return;
  var last;
  function open(e) {
    e.preventDefault();
    if (window.matchMedia("(max-width:700px)").matches) {
      location.href = "https://onelink.to/scgdk8";
      return;
    }
    last = document.activeElement;
    d.hidden = false;
    document.body.classList.add("ga-open");
    d.querySelector(".ga-x").focus();
    document.querySelectorAll("video.vplayer").forEach(function (v) {
      if (!v.paused && !v.muted) v.pause();
    });
  }
  function close() {
    d.hidden = true;
    document.body.classList.remove("ga-open");
    if (last && last.focus) last.focus();
  }
  document.querySelectorAll("[data-get-app]").forEach(function (a) {
    a.addEventListener("click", open);
  });
  d.querySelectorAll("[data-ga-close]").forEach(function (b) {
    b.addEventListener("click", close);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !d.hidden) close();
  });
})();
