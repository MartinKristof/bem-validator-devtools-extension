/* eslint-disable global-require */
import '../browser';

export const inspect = (selector) => {
  if (!selector) {
    return;
  }

  const inspectString = `inspect(document.querySelector('${selector}'))`;

  try {
    browser.devtools.inspectedWindow.eval(inspectString);
  } catch (error) {
    const sendMessage = require('./util/sendMessage');

    sendMessage('error', error.message);
  }
};
