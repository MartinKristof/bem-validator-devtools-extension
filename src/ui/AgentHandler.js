/* eslint-disable no-console */
import { processLint } from 'css-should-plugin-bem';
import { parse } from 'css';
import injectScript from './injectScript';
import { showError, showLoading, saveLintedRules } from './redux/actions';
import port from './port';
import sendMessage from './util/sendMessage';
import { extract } from './util/extractCss';

class AgentHandler {
  constructor(store) {
    this.store = store;

    port.onMessage.addListener((message) => {
      this.handleMessage(message);
    });

    this.handlers = {
      connected: () => sendMessage('getData'),
      loading: () => this.store.dispatch(showLoading()),
      reloaded: () => injectScript(),
      sendData: ({ html, bodyClass }) => this.store.dispatch(saveLintedRules(this.getInvalidRules(html, bodyClass))),
      showError: (error) => this.store.dispatch(showError(error)),
    };
  }

  getInvalidRules(html, bodyClass) {
    try {
      const classes = extract(html, bodyClass);
      const parsedAst = parse(classes);

      return processLint(parsedAst);
    } catch (error) {
      this.handlers.showError(error.message);

      return {};
    }
  }

  handleMessage(message) {
    const handler = this.handlers[message.name];

    if (!handler) {
      console.warn(`No handler found for event ${message.name}`);
      return;
    }

    handler(message.data);
  }
}

export default AgentHandler;
