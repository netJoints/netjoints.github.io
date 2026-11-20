// Tech Alliances card in the top nav: opens on hover or focus (CSS), and on click/tap for touch.
(function () {
  'use strict';
  var btn = document.getElementById('navDdBtn');
  if (!btn) return;
  var item = btn.parentNode;
  function set(open) {
    item.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  btn.addEventListener('click', function () { set(!item.classList.contains('is-open')); });
  document.addEventListener('click', function (e) { if (!item.contains(e.target)) set(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') set(false); });
})();
