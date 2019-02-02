import { processLint } from 'css-should-plugin-bem';
import { parse } from 'css';
import injectDebugger from './injectDebugger';
import { showError, showLoading, saveLintedRules } from './redux/actions';

const port = require('./port');
const sendMessage = require('./util/sendMessage');
const { extract } = require('./util/extractCss');

class AgentHandler {
  constructor(store) {
    this.store = store;

    port.onMessage.addListener((msg) => {
      this.handleMessage(msg);
    });

    this.handlers = {
      connected: () => sendMessage('getData'),
      loading: () => this.store.dispatch(showLoading()),
      reloaded: () => injectDebugger(),
      sendData: (data) => this.store.dispatch(saveLintedRules(this.getInvalidRules(data))),
      showError: (error) => this.store.dispatch(showError(error)),
    };
  }

  getInvalidRules(html) {
    try {
      const classes = extract(html, {
        extractClasses: true,
      });
      const parsedAst = parse(classes);

      return processLint(parsedAst);
    } catch (error) {
      this.handlers.showError(error.message);

      return {};
    }
  }

  handleMessage(message) {
    console.log('handle message in agent handler', message);

    const handler = this.handlers[message.name];
    if (!handler) {
      console.warn(`No handler found for event ${message.name}`);
      return;
    }

    handler(message.data);
  }
}

export default AgentHandler;
