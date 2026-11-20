// Site-wide search in the top nav. Loaded by the shared nav partial on every v1 page.
// Searches /search-index.json (blog posts, pages and projects), built by build_blog.py.
(function () {
  'use strict';

  var btn = document.getElementById('navSearchBtn');
  if (!btn) return;

  var index = null;
  var loaded = false;
  var panel = null;
  var input = null;
  var results = null;

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function load() {
    if (index) return;
    index = [];
    fetch('/search-index.json')
      .then(function (r) { return r.json(); })
      .then(function (data) { index = data; loaded = true; render(); })
      .catch(function () { index = []; loaded = true; render(); });
  }

  function render() {
    var q = input.value.trim().toLowerCase();
    if (!q) { results.innerHTML = ''; return; }
    if (!loaded) { results.innerHTML = '<p class="site-search-none">Loading…</p>'; return; }
    var words = q.split(/\s+/);
    var hits = index.filter(function (e) {
      var hay = (e.title + ' ' + e.text).toLowerCase();
      return words.every(function (w) { return hay.indexOf(w) !== -1; });
    }).sort(function (a, b) {
      var at = a.title.toLowerCase().indexOf(q) !== -1 ? 0 : 1;
      var bt = b.title.toLowerCase().indexOf(q) !== -1 ? 0 : 1;
      return at - bt;
    }).slice(0, 10);
    results.innerHTML = hits.length ? hits.map(function (e) {
      return '<a class="site-search-hit" href="' + esc(e.url) + '"><strong>' + esc(e.title) +
        '</strong><span>' + esc(e.kind) + '</span></a>';
    }).join('') : '<p class="site-search-none">No matches.</p>';
  }

  function build() {
    panel = document.createElement('div');
    panel.className = 'site-search';
    panel.hidden = true;
    panel.innerHTML =
      '<div class="site-search-box" role="dialog" aria-label="Search the site">' +
      '<input type="search" class="site-search-input" placeholder="Search the site…" autocomplete="off" aria-label="Search the site">' +
      '<div class="site-search-results"></div></div>';
    document.body.appendChild(panel);
    input = panel.querySelector('input');
    results = panel.querySelector('.site-search-results');
    input.addEventListener('input', render);
    panel.addEventListener('click', function (e) { if (e.target === panel) close(); });
  }

  function open() {
    if (!panel) build();
    load();
    panel.hidden = false;
    input.focus();
  }

  function close() {
    if (panel) panel.hidden = true;
    btn.focus();
  }

  btn.addEventListener('click', function () { (panel && !panel.hidden) ? close() : open(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && panel && !panel.hidden) close();
  });
  var mobile = document.getElementById('navSearchMobile');
  if (mobile) mobile.addEventListener('click', function (e) { e.preventDefault(); open(); });
})();
