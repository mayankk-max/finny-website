(function () {
  var rm = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  function f(t) {
    t = Math.max(0, t | 0);
    return Math.floor(t / 60) + ":" + ("0" + (t % 60)).slice(-2);
  }
  document.querySelectorAll("video.vplayer").forEach(function (v) {
    var scr = v.parentElement,
      q = function (c) {
        return scr.querySelector(c);
      };
    var pl = q(".vc-play"),
      sk = q(".vc-seek"),
      tm = q(".vc-time"),
      sd = q(".vc-sound"),
      fs = q(".vc-fs"),
      big = q(".vbig"),
      hide,
      auto = v.dataset.auto === "1",
      userPaused = !auto;
    if (auto) {
      v.muted = true;
      v.loop = true;
      scr.classList.add("vc-started");
      if (rm) {
        userPaused = true;
      }
    }
    function upd() {
      var d = v.duration || 0;
      if (!sk.dragging) sk.value = d ? Math.round((v.currentTime / d) * 1000) : 0;
      sk.style.setProperty("--p", sk.value / 10 + "%");
      tm.textContent = f(v.currentTime) + " / " + f(d);
    }
    function snd() {
      sd.setAttribute("aria-pressed", !v.muted);
      sd.setAttribute("aria-label", v.muted ? "Turn sound on" : "Mute");
    }
    function state() {
      scr.classList.toggle("vc-paused", v.paused);
      pl.setAttribute("aria-label", v.paused ? "Play" : "Pause");
    }
    v.addEventListener("timeupdate", upd);
    v.addEventListener("loadedmetadata", upd);
    v.addEventListener("play", function () {
      scr.classList.add("vc-started");
      state();
    });
    v.addEventListener("pause", state);
    v.addEventListener("volumechange", snd);
    state();
    snd();
    function play() {
      userPaused = false;
      v.play().catch(function () {});
    }
    pl.addEventListener("click", function () {
      if (v.paused) play();
      else {
        userPaused = true;
        v.pause();
      }
    });
    v.addEventListener("click", function () {
      pl.click();
    });
    if (big)
      big.addEventListener("click", function () {
        v.muted = false;
        play();
        show();
      });
    sk.addEventListener("input", function () {
      sk.dragging = true;
      var d = v.duration || 0;
      if (d) v.currentTime = (sk.value / 1000) * d;
      upd();
    });
    sk.addEventListener("change", function () {
      sk.dragging = false;
    });
    sd.addEventListener("click", function () {
      v.muted = !v.muted;
      if (!v.muted && v.paused) play();
    });
    fs.addEventListener("click", function () {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else if (v.requestFullscreen) {
        v.requestFullscreen().catch(function () {
          if (v.webkitEnterFullscreen) v.webkitEnterFullscreen();
        });
      } else if (v.webkitEnterFullscreen) {
        v.webkitEnterFullscreen();
      }
    });
    function show() {
      scr.classList.add("vc-on");
      clearTimeout(hide);
      hide = setTimeout(function () {
        if (!v.paused) scr.classList.remove("vc-on");
      }, 2500);
    }
    scr.addEventListener("mousemove", show);
    scr.addEventListener("touchstart", show, { passive: true });
    scr.addEventListener("focusin", show);
    scr.addEventListener("mouseleave", function () {
      if (!v.paused) scr.classList.remove("vc-on");
    });
    document.querySelectorAll("video.vplayer").forEach(function (o) {
      if (o !== v)
        v.addEventListener("play", function () {
          if (!v.muted && !o.paused && !o.muted) {
            o.pause();
          }
        });
    });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(
        function (es) {
          es.forEach(function (e) {
            if (e.isIntersecting) {
              if (!userPaused) v.play().catch(function () {});
            } else v.pause();
          });
        },
        { threshold: 0.25 },
      ).observe(v);
    }
  });
})();
