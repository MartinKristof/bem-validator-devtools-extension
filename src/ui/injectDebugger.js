import '../browser';
import sendMessage from './util/sendMessage';

const injectDebugger = () => {
  const injectedGlobal = 'window.__bem_agent_injected__';

  browser.devtools.inspectedWindow.eval(injectedGlobal, (result) => {
    if (!result) {
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
      sendMessage('connect');
    }
  });
};

module.exports = injectDebugger;
