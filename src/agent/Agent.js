/* eslint-disable no-console */
import sendMessage from './util/sendMessage';

class Agent {
  constructor() {
    this.handlers = {
      // Broadcast when the dev tools are opened
      connect: () => sendMessage('connected'),
      error: (error) => sendMessage('showError', error),
      getData: () => Agent.sendData(),
    };

    this.initDevtoolsMessageListener();
  }

  static sendData() {
    return sendMessage('sendData', { html: document.documentElement.innerHTML, bodyClass: document.body.className });
  }

  initDevtoolsMessageListener() {
    window.addEventListener('message', (event) => {
      // Only accept messages from same frame
      if (event.source !== window) {
        return;
      }

      const message = event.data;

      // Only accept messages of correct format (our messages)
      if (typeof message !== 'object' || message === null || message.source !== 'bem-validator-devtools') {
        return;
      }

      this.handleMessage(message);
    });
  }

  handleMessage(message) {
    const handler = this.handlers[message.name];

    if (!handler) {
      console.warn(`No handler found for event ${message.name}`);
      return;
    }

    handler.call(this, message.data);
  }
}

export default Agent;
