(() => {
  let theme, language;
  try { theme = localStorage.getItem('theme'); language = localStorage.getItem('lang'); } catch {}
  document.documentElement.dataset.theme = theme === 'dark' || (theme !== 'light' && matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
  const selected = language === 'fi' || (!language && navigator.language.startsWith('fi')) ? 'fi' : 'en';
  document.documentElement.dataset.lang = selected;
  if (document.querySelector('.lang-fi')) document.documentElement.lang = selected;
})();
