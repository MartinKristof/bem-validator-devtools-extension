import { processLint } from 'css-should-plugin-bem';
import { parse } from 'css';
import injectDebugger from './injectDebugger';

var port = require('./port');
var sendMessage = require('./util/sendMessage');
var { extract } = require('./util/extractCss');

class AgentHandler {
  constructor(flux) {
    this.flux = flux;

    port.onMessage.addListener((msg) => {
      this.handleMessage(msg);
    });

    this.handlers = {
      connected: () => sendMessage('getData'),
      loading: () => this.flux.actions.loading(),
      reloaded: () => injectDebugger(),
      sendData: (data) => this.flux.actions.saveLintedRules(AgentHandler.getInvalidRules(data)),
      errorOccurred: (error) => this.flux.actions.errorOccurred(error),
    };
  }

  static getInvalidRules(html) {
    const classes = extract(html, {
      extractClasses: true,
    });
    const parsedAst = parse(classes);

    return processLint(parsedAst);
  }

  handleMessage(message) {
    console.log('handle message in agent handler', message);

    const handler = this.handlers[message.name];
    if (!handler) {
      console.warn('No handler found for event ' + message.name);
      return;
    }

    handler(message.data);
  }
}

export default AgentHandler;
