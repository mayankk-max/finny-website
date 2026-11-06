(function () {
  var h = document.querySelector("header"),
    y = window.scrollY;
  addEventListener(
    "scroll",
    function () {
      var n = window.scrollY;
      if (n > y && n > 80) h.classList.add("nav-hide");
      else if (n < y) h.classList.remove("nav-hide");
      y = n;
    },
    { passive: true },
  );
})();
