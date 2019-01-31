const port = require('../port');

const sendMessage = (name, data) => {
  port.postMessage({
    name,
    tabId: browser.devtools.inspectedWindow.tabId,
    data: data || {},
  });
};

module.exports = sendMessage;
