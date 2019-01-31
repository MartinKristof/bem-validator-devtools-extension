var connections = {};

window.browser = (function() {
  return window.msBrowser || window.browser || window.chrome;
})();

/*
 * agent -> content-script.js -> **background.js** -> dev tools
 */
browser.runtime.onMessage.addListener(function(request, sender) {
  if (sender.tab) {
    var tabId = sender.tab.id;
    if (tabId in connections) {
      connections[tabId].postMessage(request);
    } else {
      console.log("Tab not found in connection list.");
    }
  } else {
    console.log("sender.tab not defined.");
  }
  return true;
});

/*
 * agent <- content-script.js <- **background.js** <- dev tools
 */
browser.runtime.onConnect.addListener(function(port) {
  // Listen to messages sent from the DevTools page
  port.onMessage.addListener(function(request) {
    // Register initial connection
    if (request.name === "init") {
      connections[request.tabId] = port;

      port.onDisconnect.addListener(function() {
        delete connections[request.tabId];
      });

      return;
    }

      // Otherwise, broadcast to agent
    browser.tabs.sendMessage(request.tabId, {
      name: request.name,
      data: request.data
    });
  });
});

browser.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (tabId in connections && changeInfo.status === "complete") {
    connections[tabId].postMessage({
      name: "reloaded"
    });
  } else if (tabId in connections && changeInfo.status === "loading") {
    connections[tabId].postMessage({
      name: "loading"
    });
  }
});
