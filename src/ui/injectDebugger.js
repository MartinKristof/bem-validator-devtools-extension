var sendMessage = require("./util/sendMessage");

// thx https://github.com/emberjs/ember-inspector/blob/master/app/adapters/chrome.js
var injectDebugger = function() {
  /* jshint evil: true */

  const injectedGlobal = 'window.__bem_agent_injected__';

  chrome.devtools.inspectedWindow.eval(injectedGlobal, function(result) {
    if (!result) {
      // script hasn't been injected yet

      var xhr = new XMLHttpRequest();
      xhr.open(
        "GET",
        browser.extension.getURL("/build/agent.bundle.js"),
        false
      );
      xhr.send();
      var script = xhr.responseText;

      browser.devtools.inspectedWindow.eval(script, function(result, err) {
        if (err) {
          console.error(err.value);
          sendMessage("error", err.value);
        }

        sendMessage("connect");
      });
    } else {
      // we're already injected, so just connect
      sendMessage("connect");
    }
  });
};

module.exports = injectDebugger;
