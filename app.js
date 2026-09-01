/* Sayt mantiqi: til almashtirish, tema (oy/quyosh), skroll animatsiyasi. */

(function () {

  var T = window.SITE_TEXT;

  /* ====================== ELEMENTLAR ====================== */


  var root  = document.documentElement;
  var btn   = document.getElementById('tema');
  var langs = document.getElementById('langs');
  var nav   = document.getElementById('nav');
  var img   = document.getElementById('portrait-img');
  var desc  = document.getElementById('meta-desc');
  var til   = 'uz';

  var y = document.getElementById('yil');
  if (y) y.textContent = new Date().getFullYear();

  /* ---------- til ---------- */

  function themeLabels() {
    if (!btn) return;
    var d = T[til], dark = root.getAttribute('data-theme') === 'dark';
    btn.setAttribute('aria-pressed', String(dark));
    btn.setAttribute('aria-label', dark ? d['theme.toLight'] : d['theme.toDark']);
    btn.setAttribute('title', dark ? d['theme.light'] : d['theme.dark']);
  }

  function setLang(code, remember) {
    if (!T[code]) code = 'uz';
    til = code;
    var d = T[code];

    root.setAttribute('lang', code);

    document.querySelectorAll('[data-t]').forEach(function (el) {
      var v = d[el.getAttribute('data-t')];
      if (v != null) el.textContent = v;
    });
    document.querySelectorAll('[data-t-html]').forEach(function (el) {
      var v = d[el.getAttribute('data-t-html')];
      if (v != null) el.innerHTML = v;
    });

    document.title = d['meta.title'];
    if (desc) desc.setAttribute('content', d['meta.desc']);
    if (img) img.setAttribute('alt', d['photo.alt']);
    if (nav) nav.setAttribute('aria-label', d['nav.aria']);

    if (langs) {
      langs.querySelectorAll('.lang').forEach(function (b) {
        b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === code));
      });
    }

    themeLabels();

    if (remember) { try { localStorage.setItem('bd-til', code); } catch (e) {} }
  }

  var saved = 'uz';
  try { var s = localStorage.getItem('bd-til'); if (T[s]) saved = s; } catch (e) {}
  setLang(saved, false);

  if (langs) {
    langs.addEventListener('click', function (e) {
      var b = e.target.closest('.lang');
      if (b) setLang(b.getAttribute('data-lang'), true);
    });
  }

  /* ---------- oy / quyosh ---------- */

  if (btn) {
    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('bd-tema', next); } catch (e) {}
      themeLabels();
    });
  }

  /* ---------- namoyon bo‘lish ---------- */

  var items = document.querySelectorAll('.rise');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      var delay = (Array.prototype.indexOf.call(el.parentNode.children, el) % 6) * 60;
      setTimeout(function () { el.classList.add('in'); }, delay);
      io.unobserve(el);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  items.forEach(function (el) { io.observe(el); });

  window.addEventListener('load', function () {
    setTimeout(function () {
      items.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight) el.classList.add('in');
      });
    }, 1200);
  });
})();
