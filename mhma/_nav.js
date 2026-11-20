/* ════════════════════════════════════════════════════
   MHMA Shared Navigation, Footer & Prayer Times
   Include at end of <body> on every page.
   Expects: <main id="main"> wrapper in the page.
════════════════════════════════════════════════════ */

/* ── SVG icon helpers ──────────────────────────── */
const _ic = {
  phone:    `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.28 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.72 16z"/></svg>`,
  mail:     `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  pin:      `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  chevron:  `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>`,
  chevronM: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>`,
  close:    `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  burger:   `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
  fb:       `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>`,
  ig:       `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
  yt:       `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.41 19.1C5.12 19.56 12 19.56 12 19.56s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white"/></svg>`,
  x:        `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
  clock:    `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  send:     `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`,
  lock:     `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
};

/* ── Dropdown builder helper ───────────────────── */
function _dd(label, items) {
  const links = items.map((it, i) =>
    `<a href="${it[1]}" role="menuitem"${i === 0 ? ' style="font-weight:600;color:var(--teal);"' : ''}>${it[0]}</a>`
  ).join('');
  return `
    <div class="has-dropdown" role="listitem">
      <button class="nav-link" aria-haspopup="true" aria-expanded="false">
        ${label} ${_ic.chevron}
      </button>
      <div class="dropdown" role="menu" aria-label="${label} submenu">${links}</div>
    </div>`;
}

function _ddM(label, items) {
  const links = items.map((it, i) =>
    `<a href="${it[1]}"${i === 0 ? ' style="font-weight:600;color:var(--gold);"' : ''}>${it[0]}</a>`
  ).join('');
  return `
    <div class="mobile-nav-item">
      <button class="mobile-nav-link" onclick="window._mhmaTglSub(this)">${label} ${_ic.chevronM}</button>
      <div class="mobile-sub">${links}</div>
    </div>`;
}

/* ── Nav data ──────────────────────────────────── */
const NAV_PROGRAMS = [
  ['All Programs',                       'programs.html'],
  ['Sunday School',                      'programs.html#sunday-school'],
  ["After-School Qur'an Classes",        'programs.html#quran'],
  ["Children's Arabic Program",          'programs.html#arabic'],
  ['MHMA Maktab',                        'programs.html#maktab'],
  ['Friday Night Girls Halaqa',          'programs.html#girls-halaqa'],
  ['Youth Programs',                     'programs.html#youth'],
  ["Sister's Programs",                  'programs.html#sisters'],
  ['Marhaba: Convert Care &amp; Community', 'programs.html#marhaba'],
  ['Cub Scouts',                         'programs.html#scouts'],
  ["Women's Halaqa",                     'programs.html#womens-halaqa'],
];
const NAV_SERVICES = [
  ['All Services',                       'services.html'],
  ["Du'a Request",                       'services.html#dua'],
  ['Mental Health Counseling',           'services.html#mental-health'],
  ['Ask an Imam',                        'services.html#ask-imam'],
  ['Suggest a Program or Speaker',       'services.html#suggest'],
  ['Facility Rental Form',               'services.html#rental'],
  ['Feedback',                           'feedback.html'],
];
const NAV_ASSISTANCE = [
  ['Explore All',        'assistance.html'],
  ['Zakat &amp; Sadaqa', 'assistance.html#zakat'],
  ['Food Pantry',        'assistance.html#food-pantry'],
  ['Refugee Support',    'assistance.html#refugee'],
  ['Funeral &amp; Burial','assistance.html#funeral'],
  ['Bay Area Nonprofits','assistance.html#nonprofits'],
  ['Clothing Donations', 'assistance.html#clothing'],
];
const NAV_ABOUT = [
  ['About MHMA',          'about.html'],
  ['Become a Member',     'about.html#membership'],
  ['Committee',           'about.html#committee'],
  ['Bylaws',              'about.html#bylaws'],
  ['Meeting Minutes',     'about.html#minutes'],
  ['Event Recap',          'https://mhma.us/recap/'],
  ['Ways to Give',        'donate.html#ways'],
  ['Volunteer',           'about.html#volunteer'],
  ['Our Team',            'about.html#team'],
  ['Board of Directors',  'about.html#board'],
  ['MHMA Newsletters',    'about.html#newsletters'],
  ['Contact Us',          'contact.html'],
  ['Board Elections',     'about.html#elections'],
];

/* ── Build HTML strings ────────────────────────── */
const UTILITY_HTML = `
<div class="utility-bar" role="banner">
  <div class="info">
    <a href="tel:+14087221043" aria-label="Call us">${_ic.phone} (408) 722-1043</a>
    <a href="mailto:info@mhma.info" aria-label="Email us">${_ic.mail} info@mhma.info</a>
    <span class="hide-mobile" style="display:flex;align-items:center;gap:5px;color:rgba(255,255,255,.75);">${_ic.pin} 250 E. Main St., Mountain House 95391</span>
  </div>
  <div class="socials" aria-label="Social media links">
    <a href="https://www.facebook.com/mhma95391" target="_blank" rel="noopener" class="social-btn" aria-label="Facebook">${_ic.fb}</a>
    <a href="https://www.instagram.com/mhma.ig/" target="_blank" rel="noopener" class="social-btn" aria-label="Instagram">${_ic.ig}</a>
    <a href="https://www.youtube.com/@mhmuslimassociation" target="_blank" rel="noopener" class="social-btn" aria-label="YouTube">${_ic.yt}</a>
    <a href="https://twitter.com/mhmuslims" target="_blank" rel="noopener" class="social-btn" aria-label="Twitter / X">${_ic.x}</a>
    <a href="/wp-login.php" class="utility-login" aria-label="Member Login">${_ic.lock} Member Login</a>
  </div>
</div>`;

const MAINNAV_HTML = `
<nav id="main-nav" aria-label="Main navigation">
  <div class="nav-inner">
    <a href="index.html" class="nav-logo" aria-label="MHMA Home">
      <div class="name">MHMA</div>
      <div class="tagline">Mountain House Muslim Association</div>
    </a>
    <div class="nav-links" role="list">
      <a href="events.html"       class="nav-link" role="listitem">Events</a>
      <a href="calendar.html"     class="nav-link" role="listitem">Calendar</a>
      <a href="prayer-times.html" class="nav-link" role="listitem">Prayer</a>
      ${_dd('Programs',   NAV_PROGRAMS)}
      ${_dd('Services',   NAV_SERVICES)}
      ${_dd('Assistance', NAV_ASSISTANCE)}
      ${_dd('About',      NAV_ABOUT)}
      <a href="donate.html" class="nav-link donate-link" role="listitem">Donate</a>
    </div>
    <div class="nav-ctas"></div>
    <button class="hamburger" id="hamburger-btn" aria-label="Open navigation menu" aria-controls="mobile-menu" aria-expanded="false" onclick="window._mhmaOpenMenu()">
      ${_ic.burger}
    </button>
  </div>
</nav>`;

const MOBILEMENU_HTML = `
<div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation menu">
  <div class="mobile-header">
    <div>
      <div style="font-family:'Playfair Display',serif;font-size:24px;font-weight:700;color:white;">MHMA</div>
      <div style="font-size:10px;color:var(--gold);letter-spacing:.09em;text-transform:uppercase;">Mountain House Muslim Association</div>
    </div>
    <button class="mobile-close" aria-label="Close menu" onclick="window._mhmaCloseMenu()">${_ic.close}</button>
  </div>
  <nav aria-label="Mobile navigation">
    <div class="mobile-nav-item"><a href="events.html"       class="mobile-nav-link-a">Events</a></div>
    <div class="mobile-nav-item"><a href="calendar.html"     class="mobile-nav-link-a">Calendar</a></div>
    <div class="mobile-nav-item"><a href="prayer-times.html" class="mobile-nav-link-a">Prayer</a></div>
    ${_ddM('Programs',   NAV_PROGRAMS)}
    ${_ddM('Services',   NAV_SERVICES)}
    ${_ddM('Assistance', NAV_ASSISTANCE)}
    ${_ddM('About',      NAV_ABOUT)}
    <div class="mobile-nav-item"><a href="donate.html" class="mobile-nav-link-a donate-mobile">Donate</a></div>
  </nav>
  <div class="mobile-ctas">
    <a href="/wp-login.php"     class="btn btn-teal-outline" style="text-align:center;border-color:rgba(255,255,255,.5);color:white;">Member Login</a>
    <a href="prayer-times.html" class="btn btn-teal-outline" style="text-align:center;border-color:rgba(255,255,255,.5);color:white;">Prayer Times</a>
    <a href="donate.html"       class="btn btn-gold"         style="text-align:center;">Donate Now</a>
  </div>
</div>`;

const FOOTER_HTML = `
<footer>
  <div class="footer-a">
    <div class="footer-a-grid">
      <div>
        <div class="footer-logo-name">MHMA</div>
        <div class="footer-logo-tag">Mountain House Muslim Association</div>
        <p class="footer-mission">Dedicated to serving the spiritual, educational, and social needs of our community. A home for every Muslim in Mountain House.</p>
        <div class="footer-socials" aria-label="Social media">
          <a href="https://www.facebook.com/mhma95391" target="_blank" rel="noopener" class="footer-social" aria-label="Facebook">${_ic.fb}</a>
          <a href="https://www.instagram.com/mhma.ig/" target="_blank" rel="noopener" class="footer-social" aria-label="Instagram">${_ic.ig}</a>
          <a href="https://www.youtube.com/@mhmuslimassociation" target="_blank" rel="noopener" class="footer-social" aria-label="YouTube">${_ic.yt}</a>
          <a href="https://twitter.com/mhmuslims" target="_blank" rel="noopener" class="footer-social" aria-label="Twitter">${_ic.x}</a>
        </div>
      </div>
      <div>
        <div class="footer-col-title">Quick Links</div>
        <nav aria-label="Footer quick links">
          <ul class="footer-links">
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About MHMA</a></li>
            <li><a href="programs.html">Programs</a></li>
            <li><a href="services.html">Services</a></li>
            <li><a href="assistance.html">Assistance</a></li>
            <li><a href="events.html">Events</a></li>
            <li><a href="calendar.html">Calendar</a></li>
            <li><a href="https://mhma.us/recap/">Event Recap</a></li>
            <li><a href="feedback.html">Feedback</a></li>
            <li><a href="contact.html">Contact</a></li>
            <li><a href="donate.html" class="cta">Donate →</a></li>
          </ul>
        </nav>
      </div>
      <div>
        <div class="footer-col-title">Programs</div>
        <nav aria-label="Footer programs links">
          <ul class="footer-links">
            <li><a href="programs.html#quran">Quran Classes</a></li>
            <li><a href="programs.html#sunday-school">Sunday School</a></li>
            <li><a href="programs.html#hifz">Hifz Program</a></li>
            <li><a href="programs.html#arabic">Arabic Language</a></li>
            <li><a href="programs.html#sisters">Sisters Halaqah</a></li>
            <li><a href="programs.html#youth">Youth Programs</a></li>
            <li><a href="programs.html#marhaba">Marhaba</a></li>
          </ul>
        </nav>
      </div>
      <div>
        <div class="footer-col-title">Contact Info</div>
        <div class="footer-contact-item">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          <span>250 E. Main St.<br>Mountain House, CA 95391</span>
        </div>
        <div class="footer-contact-item">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.28 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.72 16z"/></svg>
          <a href="tel:+14087221043">(408) 722-1043</a>
        </div>
        <div class="footer-contact-item">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          <a href="mailto:info@mhma.info">info@mhma.info</a>
        </div>
        <div class="footer-contact-item">
          ${_ic.clock}
          <span>Open Daily for all 5 prayers</span>
        </div>
        <a href="contact.html#directions" class="footer-dir-link">${_ic.send} Get Directions</a>
      </div>
    </div>
  </div>
  <div class="footer-b" role="complementary" aria-label="Today's prayer times summary">
    <div class="footer-b-inner">
      <div class="footer-b-label">Today:</div>
      <div id="footer-prayer-row"><span style="font-size:12px;color:rgba(255,255,255,.4);">Loading…</span></div>
      <div class="footer-jumua">🕌 Jumu'ah: 1:00 PM &amp; 2:00 PM</div>
    </div>
  </div>
  <div class="footer-c">
    <div class="footer-c-inner">
      <span>© ${new Date().getFullYear()} MHMA.info — All Rights Reserved</span>
      <span>Built with ❤️ for the Community</span>
      <div class="footer-c-links">
        <a href="privacy.html">Privacy Policy</a>
        <a href="terms.html">Terms of Use</a>
      </div>
    </div>
  </div>
</footer>`;

/* ── Inject into DOM ───────────────────────────── */
const _main = document.querySelector('main');
if (_main) {
  _main.insertAdjacentHTML('beforebegin',
    '<a href="#main" class="skip-link">Skip to content</a>' +
    UTILITY_HTML + MAINNAV_HTML + MOBILEMENU_HTML
  );
  _main.insertAdjacentHTML('afterend', FOOTER_HTML);
}

/* ── Active nav link ───────────────────────────── */
(function highlightActive() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('#main-nav .nav-links a.nav-link, #main-nav .nav-links .dropdown a').forEach(a => {
    const href = a.getAttribute('href').split('#')[0].split('/').pop();
    if (href === path) {
      const topLink = a.closest('.has-dropdown')
        ? a.closest('.has-dropdown').querySelector('button.nav-link')
        : a;
      if (topLink) { topLink.classList.add('active'); }
    }
  });
})();

/* ── Mobile Menu ───────────────────────────────── */
window._mhmaOpenMenu = function() {
  const menu = document.getElementById('mobile-menu');
  const btn  = document.getElementById('hamburger-btn');
  menu.classList.add('open');
  btn.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
  const close = menu.querySelector('button.mobile-close');
  if (close) close.focus();
};
window._mhmaCloseMenu = function() {
  const menu = document.getElementById('mobile-menu');
  const btn  = document.getElementById('hamburger-btn');
  menu.classList.remove('open');
  btn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
  btn.focus();
};
window._mhmaTglSub = function(btn) {
  const sub = btn.nextElementSibling;
  document.querySelectorAll('.mobile-sub').forEach(s => { if (s !== sub) s.classList.remove('open'); });
  sub.classList.toggle('open');
};
document.addEventListener('keydown', e => {
  const menu = document.getElementById('mobile-menu');
  if (e.key === 'Escape' && menu && menu.classList.contains('open')) window._mhmaCloseMenu();
});

/* ── Sticky Nav ────────────────────────────────── */
const _nav = document.getElementById('main-nav');
if (_nav) {
  window.addEventListener('scroll', () => {
    _nav.classList.toggle('scrolled', window.scrollY > 24);
  }, { passive: true });
}

/* ── Scroll Reveal ─────────────────────────────── */
const _revObs = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);
document.querySelectorAll('.reveal').forEach(el => _revObs.observe(el));

/* ════════════════════════════════════════════════════
   PRAYER TIMES — shared (strip + footer)
   Show fallback immediately, then update from API.
════════════════════════════════════════════════════ */
const _PRAYERS = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
const _FALLBACK = { Fajr: '5:12', Dhuhr: '13:15', Asr: '16:38', Maghrib: '19:52', Isha: '21:14' };

/* Everything below builds markup from aladhan.com's response. Escape any
   value that comes from the API before it reaches innerHTML. */
function _esc(v) {
  return String(v == null ? '' : v)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

/* Returns a time built only from parsed numbers, never from raw API text. */
function _fmt(t) {
  const parts = String(t || '').split(' ')[0].split(':');
  const h = Number(parts[0]), m = Number(parts[1]);
  if (!Number.isFinite(h) || !Number.isFinite(m)) return '—';
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hr   = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${hr}:${String(m).padStart(2,'0')} ${ampm}`;
}

function _nextPrayer(timings) {
  const now = new Date();
  const nowM = now.getHours() * 60 + now.getMinutes();
  for (const name of _PRAYERS) {
    const parts = (timings[name] || '').split(' ')[0].split(':').map(Number);
    if ((parts[0] || 0) * 60 + (parts[1] || 0) > nowM) return name;
  }
  return 'Fajr';
}

function _renderStrip(timings, next) {
  const el = document.getElementById('prayer-strip-times');
  if (!el) return;
  el.innerHTML = _PRAYERS.map((name, i) => {
    const isNext = name === next;
    const sep    = i > 0 ? '<div class="ps-sep" aria-hidden="true"></div>' : '';
    return `${sep}<div class="ps-item${isNext ? ' ps-next-item' : ''}" aria-label="${name}: ${_fmt(timings[name])}${isNext ? ' - next prayer' : ''}">
      <span class="ps-name">${name}</span>
      <span class="ps-time">${_fmt(timings[name])}</span>
      ${isNext ? '<span class="ps-next-badge">Next</span>' : ''}
    </div>`;
  }).join('');
}

function _renderFooter(timings) {
  const el = document.getElementById('footer-prayer-row');
  if (!el) return;
  el.innerHTML = _PRAYERS.map(name => `
    <div class="fp-item">
      <span class="fp-name">${name}</span>
      <span class="fp-time">${_fmt(timings[name])}</span>
    </div>
  `).join('<span style="color:rgba(255,255,255,.2);font-size:16px;" aria-hidden="true">·</span>');
}

/* Also exposed for the prayer-times full widget on index.html */
window._mhmaRenderCards = function(timings, next) {
  const grid = document.getElementById('prayer-cards-grid');
  if (!grid) return;
  grid.innerHTML = _PRAYERS.map(name => {
    const isNext = name === next;
    return `<div class="ptime-card${isNext ? ' next-prayer' : ''}" aria-label="${name}: ${_fmt(timings[name])}${isNext ? ' - next prayer' : ''}">
      <div class="ptime-name">${name}</div>
      <div class="ptime-time">${_fmt(timings[name])}</div>
      ${isNext ? '<div class="ptime-badge">&#9658; Up Next</div>' : ''}
    </div>`;
  }).join('');
};

window._mhmaSetWidgetDate = function(dateStr, hijriStr) {
  const el = document.getElementById('prayer-widget-date');
  if (el) el.innerHTML = _esc(dateStr) + (hijriStr ? ` &nbsp;&middot;&nbsp; <span class="prayer-hijri">${_esc(hijriStr)}</span>` : '');
};

/* Show fallback immediately */
(function initPrayer() {
  const next = _nextPrayer(_FALLBACK);
  _renderStrip(_FALLBACK, next);
  _renderFooter(_FALLBACK);
  window._mhmaRenderCards(_FALLBACK, next);
  const d = new Date();
  window._mhmaSetWidgetDate(
    d.toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' }),
    null
  );
})();

/* Then attempt live update from aladhan.com */
(async function fetchPrayer() {
  try {
    const ts  = Math.floor(Date.now() / 1000);
    const res = await fetch(`https://api.aladhan.com/v1/timings/${ts}?latitude=37.7784&longitude=-121.5388&method=2`);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const { data } = await res.json();
    if (!data || typeof data !== 'object') throw new Error('unexpected response');
    const { timings, date } = data;
    if (!timings || typeof timings !== 'object') throw new Error('no timings');
    const next = _nextPrayer(timings);

    _renderStrip(timings, next);
    _renderFooter(timings);
    window._mhmaRenderCards(timings, next);

    if (date && date.gregorian && date.hijri) {
      const g = date.gregorian, h = date.hijri;
      window._mhmaSetWidgetDate(
        `${g.weekday.en}, ${g.day} ${g.month.en} ${g.year}`,
        `${h.day} ${h.month.en} ${h.year} AH`
      );
    }
  } catch (e) {
    /* fallback already rendered - nothing to do */
    console.info('MHMA: using fallback prayer times.', e.message);
  }
})();
