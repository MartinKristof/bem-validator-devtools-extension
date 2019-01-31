/*
 * agent -> **content-script.js** -> background.js -> dev tools
 */

window.browser = (() => window.msBrowser || window.browser || window.chrome)();

window.addEventListener('message', (event) => {
  // Only accept messages from same frame
  if (event.source !== window) {
    return;
  }

  const message = event.data;

  // Only accept messages of correct format (our messages)
  if (typeof message !== 'object' || message === null || message.source !== 'bem-validator-agent') {
    return;
  }

  browser.runtime.sendMessage(message);
});

/*
 * agent <- **content-script.js** <- background.js <- dev tools
 */
browser.runtime.onMessage.addListener((request) => {
  request.source = 'bem-validator-devtools';
  window.postMessage(request, '*');
});
