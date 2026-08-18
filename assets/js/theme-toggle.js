// Progressive enhancement: mark JS available, then wire the theme toggle.
document.documentElement.classList.remove('no-js');

(function () {
  var btn = document.querySelector('[data-theme-toggle]');
  if (!btn) return;

  function currentTheme() {
    var set = document.documentElement.getAttribute('data-theme');
    if (set === 'dark' || set === 'light') return set;
    // No explicit choice yet — fall back to the system preference.
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  btn.addEventListener('click', function () {
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    btn.setAttribute('aria-pressed', String(next === 'dark'));
    try { localStorage.setItem('theme', next); } catch (e) {}
  });
})();
