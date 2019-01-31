/*
 * agent -> **content-script.js** -> background.js -> dev tools
 */

window.browser = (function() {
  return window.msBrowser || window.browser || window.chrome;
})();

window.addEventListener("message", function(event) {
  // Only accept messages from same frame
  if (event.source !== window) {
    return;
  }

  var message = event.data;

  // Only accept messages of correct format (our messages)
  if (
    typeof message !== "object" ||
    message === null ||
    message.source !== "bem-validator-agent"
  ) {
    return;
  }

  chrome.runtime.sendMessage(message);
});

/*
 * agent <- **content-script.js** <- background.js <- dev tools
 */
browser.runtime.onMessage.addListener(function(request) {
  request.source = "bem-validator-devtools";
  window.postMessage(request, "*");
});
