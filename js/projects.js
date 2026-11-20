// /projects/: switch between career and category groupings, filter by category, and search.
// The page is fully rendered at build time (career view); this only regroups and filters it.
(function () {
  'use strict';

  var careerEl = document.getElementById('projCareer');
  var categoryEl = document.getElementById('projCategory');
  var chipsEl = document.getElementById('projChips');
  var searchEl = document.getElementById('projSearch');
  var emptyEl = document.getElementById('projEmpty');
  if (!careerEl || !categoryEl || !chipsEl || !searchEl) return;

  var view = 'career';
  var cat = '';

  function buildCategoryView() {
    var cards = Array.prototype.slice.call(careerEl.querySelectorAll('.proj-card'));
    var names = Array.prototype.map.call(chipsEl.querySelectorAll('[data-cat]'), function (b) {
      return b.getAttribute('data-cat');
    }).filter(Boolean);
    names.forEach(function (name) {
      var matches = cards.filter(function (c) {
        return c.getAttribute('data-cats').split('|').indexOf(name) !== -1;
      });
      if (!matches.length) return;
      var group = document.createElement('div');
      group.className = 'work-group proj-group';
      group.setAttribute('data-cat', name);
      var head = document.createElement('div');
      head.className = 'work-group-head';
      var h3 = document.createElement('h3');
      h3.textContent = name;
      head.appendChild(h3);
      var grid = document.createElement('div');
      grid.className = 'work-grid';
      matches.forEach(function (c) { grid.appendChild(c.cloneNode(true)); });
      group.appendChild(head);
      group.appendChild(grid);
      categoryEl.appendChild(group);
    });
  }

  function apply() {
    var q = searchEl.value.trim().toLowerCase();
    var root = view === 'career' ? careerEl : categoryEl;
    var shown = 0;
    Array.prototype.forEach.call(root.querySelectorAll('.proj-group'), function (group) {
      var groupHidden = view === 'category' && cat && group.getAttribute('data-cat') !== cat;
      var any = 0;
      Array.prototype.forEach.call(group.querySelectorAll('.proj-card'), function (card) {
        var ok = !q || card.getAttribute('data-text').indexOf(q) !== -1;
        card.hidden = !ok;
        if (ok) any++;
      });
      group.hidden = groupHidden || any === 0;
      if (!group.hidden) shown += any;
    });
    emptyEl.hidden = shown !== 0;
  }

  function setView(next) {
    view = next;
    careerEl.hidden = view !== 'career';
    categoryEl.hidden = view !== 'category';
    chipsEl.hidden = view !== 'category';
    Array.prototype.forEach.call(document.querySelectorAll('.proj-tab'), function (t) {
      var on = t.getAttribute('data-view') === view;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    apply();
  }

  buildCategoryView();

  Array.prototype.forEach.call(document.querySelectorAll('.proj-tab'), function (t) {
    t.addEventListener('click', function () { setView(t.getAttribute('data-view')); });
  });
  chipsEl.addEventListener('click', function (e) {
    var chip = e.target.closest('[data-cat]');
    if (!chip) return;
    cat = chip.getAttribute('data-cat');
    Array.prototype.forEach.call(chipsEl.querySelectorAll('.proj-chip'), function (c) {
      c.classList.toggle('is-active', c === chip);
    });
    apply();
  });
  searchEl.addEventListener('input', apply);
})();
