window.browser = (function() {
  return window.msBrowser || window.browser || window.chrome;
})();

browser.devtools.panels.create('BEM validator', '', 'panel.html');
