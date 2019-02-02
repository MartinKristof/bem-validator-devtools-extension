/* eslint-disable no-param-reassign */
/**
 * Modified
 *
 * extractcss.js
 * https://github.com/adnantopal/extractcss
 * http://extractcss.com/
 * Author: @adnantopal
 * Copyright 2013-2016, Adnan Topal (adnan.co)
 * Licensed under the MIT license.
 */
const getInlineStyle = (element) => {
  if (element.hasAttribute('style')) {
    return element.getAttribute('style');
  }

  return null;
};

const buildClassString = (classes) => {
  if (classes === null) {
    return '';
  }

  const classString = classes
    .trim()
    .replace(/(\s{2,})/g, ' ')
    .split(' ')
    .join('.');

  return `.${classString}`;
};

const extractClasses = (input, outputArr) => {
  const elements = input.querySelectorAll('*[class]');

  const tmpArr = [];

  Array.prototype.forEach.call(elements, (element) => {
    const elementClasses = element.getAttribute('class');

    const elementClassString = buildClassString(elementClasses);

    if (tmpArr.indexOf(elementClassString) !== -1 || elementClasses === null) {
      return;
    }

    tmpArr.push(elementClassString);

    outputArr.push({
      selector: elementClassString,
      style: getInlineStyle(element),
    });
  });

  return outputArr;
};

const outputCSS = (outputArr, outputStr) => {
  outputArr.forEach((elem) => {
    outputStr += `${elem.selector}{${elem.style ? elem.style : ''}}`;
  });

  return outputStr;
};

export const extract = (input, bodyClass) => {
  const outputArr = [];
  const outputStr = '';

  let bodyClassName;

  if (bodyClass) {
    bodyClassName = `<div class="${bodyClass}"></div>`;
  }
  const inputEl = document.createElement('div');
  inputEl.innerHTML = bodyClass ? bodyClassName + input : input;

  extractClasses(inputEl, outputArr);

  return outputCSS(outputArr, outputStr);
};
