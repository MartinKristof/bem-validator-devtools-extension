import '../browser';

const sendMessage = require('./util/sendMessage');

// thx https://github.com/emberjs/ember-inspector/blob/master/app/adapters/chrome.js
const injectDebugger = () => {
  const injectedGlobal = 'window.__bem_agent_injected__';

  browser.devtools.inspectedWindow.eval(injectedGlobal, (result) => {
    if (!result) {
      // script hasn't been injected yet

      const xhr = new XMLHttpRequest();
      xhr.open('GET', browser.extension.getURL('/build/agent.bundle.js'), false);
      xhr.send();
      const script = xhr.responseText;

      browser.devtools.inspectedWindow.eval(script, (res, error) => {
        if (error) {
          sendMessage('error', error.message);
        }

        sendMessage('connect');
      });
    } else {
      // we're already injected, so just connect
      sendMessage('connect');
    }
  });
};

module.exports = injectDebugger;
