window.browser = (function() {
  return window.msBrowser || window.browser || window.chrome;
})();

function handleError(error) {
  if (error.isError) {
    console.log(`Devtools error: ${error.code}`);
  } else {
    console.log(`JavaScript error: ${error.value}`);
  }
}

function handleResult(result, err) {
  if (result[1]) {
    handleError(result[1]);
  }
}

export const inspect = (selector) => {
  if (!selector) {
    return;
  }

  const inspectString = `inspect(document.querySelector('${selector}'))`;
  try {
    browser.devtools.inspectedWindow.eval(inspectString).then(handleResult);
  } catch (e) {
    console.error(e);
  }
};
