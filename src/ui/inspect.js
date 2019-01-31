import '../browser';

export const inspect = (selector) => {
  if (!selector) {
    return;
  }

  const inspectString = `inspect(document.querySelector('${selector}'))`;

  try {
    browser.devtools.inspectedWindow.eval(inspectString);
  } catch (error) {
    console.error(error);
  }
};
