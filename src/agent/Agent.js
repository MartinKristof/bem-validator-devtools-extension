var sendMessage = require("./util/sendMessage");

class Agent {
  constructor() {
    this.handlers = {
      // Broadcast when the dev tools are opened
      connect: () => sendMessage("connected"),
      getData: () => Agent.sendData(),
    };

    this.initDevtoolsMessageListener();
  }

  static sendData() {
      const hrefs = [];
      const stylesheets = [...document.styleSheets];

      for (let stylesheet of stylesheets) {
          const href = stylesheet.href;
          hrefs.push(href);
      }

      return sendMessage("sendData", JSON.stringify(hrefs));
  }

  initDevtoolsMessageListener() {
    console.log("init Devtools");
    window.addEventListener("message", event => {
      console.log("perform event from devtools", event);
      // Only accept messages from same frame
      if (event.source !== window) {
        return;
      }

      var message = event.data;

      // Only accept messages of correct format (our messages)
      if (
        typeof message !== "object" ||
        message === null ||
        message.source !== "bem-validator-devtools"
      ) {
        return;
      }

      this.handleMessage(message);
    });
  }

  handleMessage(message) {
    var handler = this.handlers[message.name];
    console.log("receive message from agent", message);
    if (!handler) {
      console.warn("No handler found for event " + name);
      return;
    }

    handler.call(this, message.data);
  }
}

export default Agent;
