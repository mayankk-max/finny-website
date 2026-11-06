(function () {
  var p = document.querySelector(".hero .tag");
  if (!p) return;
  if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) {
    p.classList.add("tw-done");
    return;
  }
  p.classList.add("tw");
  var cs = [];
  (function walk(n) {
    [].slice.call(n.childNodes).forEach(function (c) {
      if (c.nodeType === 3) {
        var f = document.createDocumentFragment();
        c.textContent.split("").forEach(function (ch) {
          var sp = document.createElement("span");
          sp.className = "tw-c";
          sp.textContent = ch;
          f.appendChild(sp);
          cs.push(sp);
        });
        c.parentNode.replaceChild(f, c);
      } else if (
        c.nodeType === 1 &&
        !c.classList.contains("ins") &&
        !c.classList.contains("sr-only")
      ) {
        walk(c);
      }
    });
  })(p);
  var cur = document.createElement("span");
  cur.className = "tw-cur";
  cur.setAttribute("aria-hidden", "true");
  var i = 0;
  function step() {
    if (i < cs.length) {
      cs[i].classList.add("on");
      cs[i].after(cur);
      i++;
      setTimeout(step, i === 1 ? 0 : 42);
    } else {
      setTimeout(function () {
        cur.remove();
        p.classList.add("tw-done");
      }, 350);
    }
  }
  setTimeout(step, 500);
  setTimeout(function () {
    cs.forEach(function (c) {
      c.classList.add("on");
    });
    cur.remove();
    p.classList.add("tw-done");
  }, 8000);
})();
