(() => {
  const root = document.documentElement;
  const menu = document.querySelector('[data-menu]'), nav = document.querySelector('.links');
  function closeMenu() { nav?.classList.remove('open'); menu?.setAttribute('aria-expanded', 'false'); }
  menu?.addEventListener('click', () => menu.setAttribute('aria-expanded', String(nav.classList.toggle('open'))));
  document.querySelectorAll('.links a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  const records = [];
  if (window.finnishTranslations) {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode, key = node.textContent.trim();
      if (node.parentElement.closest('script,style')) continue;
      if (window.finnishTranslations[key]) records.push({ node, en: node.textContent, fi: node.textContent.replace(key, window.finnishTranslations[key]) });
    }
  }
  const title = document.title;
  function language(lang) {
    root.lang = lang; root.dataset.lang = lang;
    records.forEach(r => r.node.textContent = r[lang]);
    document.querySelectorAll('[data-language],[data-set]').forEach(b => b.setAttribute('aria-pressed', String((b.dataset.language || b.dataset.set) === lang)));
    document.querySelectorAll('[data-menu]').forEach(b => b.setAttribute('aria-label', lang === 'fi' ? 'Avaa tai sulje valikko' : 'Toggle navigation'));
    document.querySelector('[data-back-top],#top')?.setAttribute('aria-label', lang === 'fi' ? 'Takaisin alkuun' : 'Back to top');
    if (window.finnishTranslations) document.title = lang === 'fi' ? title.replace(/Portfolio|Projects|About|Experience|Contact/, x => ({Portfolio:'Portfolio',Projects:'Projektit',About:'Tietoa minusta',Experience:'Kokemus',Contact:'Yhteystiedot'})[x]) : title;
    try { localStorage.setItem('lang', lang); } catch {}
    updateThemeButton();
  }
  const themeButton = document.querySelector('[data-theme-toggle]');
  function updateThemeButton() {
    if (!themeButton) return;
    const dark = root.dataset.theme === 'dark';
    themeButton.textContent = dark ? '☀' : '☾';
    themeButton.setAttribute('aria-pressed', String(dark));
    themeButton.setAttribute('aria-label', root.lang === 'fi' ? (dark ? 'Vaihda vaaleaan teemaan' : 'Vaihda tummaan teemaan') : (dark ? 'Switch to light mode' : 'Switch to dark mode'));
  }
  themeButton?.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch {}
    updateThemeButton();
  });
  document.querySelectorAll('[data-language],[data-set]').forEach(b => b.addEventListener('click', () => language(b.dataset.language || b.dataset.set)));
  language(root.lang === 'fi' ? 'fi' : 'en');
  const top = document.querySelector('[data-back-top]');
  if (top) {
    const update = () => { top.hidden = window.scrollY < 400; };
    window.addEventListener('scroll', update, { passive: true }); update();
    top.addEventListener('click', () => window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }));
  }
})();
