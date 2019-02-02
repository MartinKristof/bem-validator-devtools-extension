import '../browser';

const sendMessage = require('./util/sendMessage');

export const inspect = (selector) => {
  if (!selector) {
    return;
  }

  const inspectString = `inspect(document.querySelector('${selector}'))`;

  try {
    browser.devtools.inspectedWindow.eval(inspectString);
  } catch (error) {
    sendMessage('error', error.message);
  }
};
