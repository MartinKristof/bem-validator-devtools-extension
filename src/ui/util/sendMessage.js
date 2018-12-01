var port = require('../port');

const sendMessage = (name, data) => {
  port.postMessage({
    name: name,
    tabId: chrome.devtools.inspectedWindow.tabId,
    data: data || {}
  });
};

module.exports = sendMessage;
