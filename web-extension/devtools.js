window.browser = (() => window.msBrowser || window.browser || window.chrome)();

browser.devtools.panels.create('BEM validator', '', 'panel.html');
