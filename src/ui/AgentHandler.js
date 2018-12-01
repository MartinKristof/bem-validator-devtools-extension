import { proccessLint } from "css-should-plugin-bem";
import { parse } from "css";

var port = require("./port");
var sendMessage = require("./util/sendMessage");

class AgentHandler {
  constructor(flux) {
    this.flux = flux;

    port.onMessage.addListener(msg => {
      this.handleMessage(msg);
    });

    this.handlers = {
      connected: () => sendMessage("getData"),
      reloaded: () => sendMessage("getData"),
      sendData: data => {
        this.flux.actions.saveStyles(this.getStyles(data));
      }
    };
  }

  getStyles(data) {
    const res = this.getRulesFromTargetLink(JSON.parse(data));

    return Promise.all(res).then(e => [].concat(...e));
  }

  readUploadedFileAsText(inputFile) {
    const temporaryFileReader = new FileReader();

    return new Promise((resolve, reject) => {
      temporaryFileReader.onerror = () => {
        temporaryFileReader.abort();
        reject(new Error("Problem parsing input file."));
      };

      temporaryFileReader.onload = () => {
        resolve(temporaryFileReader.result);
      };
      temporaryFileReader.readAsText(inputFile);
    });
  }

  getRulesFromTargetLink(links) {
    return links.filter(href => href).map(
      href =>
        new Promise((resolve, reject) => {
          fetch(href)
            .then(response => response.blob())
            .then(blob => this.readUploadedFileAsText(blob))
            .then(file => parse(file))
            .then(css => proccessLint(css))
            .then(missingClasses => resolve(missingClasses))
            .catch(error => {
              reject(error);
            });
        })
    );
  }

  handleMessage(message) {
    console.log("handle message in agent handler", message);

    const handler = this.handlers[message.name];
    if (!handler) {
      console.warn("No handler found for event " + message.name);
      return;
    }

    handler(message.data);
  }
}

export default AgentHandler;
