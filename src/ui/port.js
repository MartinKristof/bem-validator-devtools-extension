import '../browser';

const backgroundPageConnection = browser.runtime.connect({
  name: 'bem-validator-agent',
});

backgroundPageConnection.postMessage({
  name: 'init',
  tabId: browser.devtools.inspectedWindow.tabId,
});

module.exports = backgroundPageConnection;
