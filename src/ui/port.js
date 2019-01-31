window.browser = (function() {
  return window.msBrowser || window.browser || window.chrome;
})();

const backgroundPageConnection = browser.runtime.connect({
  name: 'bem-validator-agent',
});

backgroundPageConnection.postMessage({
  name: 'init',
  tabId: browser.devtools.inspectedWindow.tabId,
});

module.exports = backgroundPageConnection;
