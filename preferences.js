(() => {
  let theme, language;
  try { theme = localStorage.getItem('theme'); language = localStorage.getItem('lang'); } catch {}
  document.documentElement.dataset.theme = theme === 'dark' || (theme !== 'light' && matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
  document.documentElement.lang = language === 'fi' || (!language && navigator.language.startsWith('fi')) ? 'fi' : 'en';
  document.documentElement.dataset.lang = document.documentElement.lang;
})();
