var sendMessage = require('./util/sendMessage');

class Agent {
  constructor() {
    this.handlers = {
      // Broadcast when the dev tools are opened
      connect: () => sendMessage('connected'),
      error: (error) => sendMessage('errorOccurred', error),
      getData: () => Agent.sendData(),
    };

    this.initDevtoolsMessageListener();
  }

  static sendData() {
    console.log(document.body.className);

    return sendMessage('sendData', document.documentElement.innerHTML);
  }

  initDevtoolsMessageListener() {
    window.addEventListener('message', (event) => {
      // Only accept messages from same frame
      if (event.source !== window) {
        return;
      }

      var message = event.data;

      // Only accept messages of correct format (our messages)
      if (typeof message !== 'object' || message === null || message.source !== 'bem-validator-devtools') {
        return;
      }

      this.handleMessage(message);
    });
  }

  handleMessage(message) {
    var handler = this.handlers[message.name];
    console.log('receive message from agent', message);
    if (!handler) {
      console.warn('No handler found for event ' + name);
      return;
    }

    handler.call(this, message.data);
  }
}

export default Agent;
