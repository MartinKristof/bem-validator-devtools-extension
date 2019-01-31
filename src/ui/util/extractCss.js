/* eslint-disable no-param-reassign */
/**
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

export const extractIds = (input, outputArr) => {
  const elements = input.querySelectorAll('*[id]');

  Array.prototype.forEach.call(elements, (element) => {
    const elementId = element.getAttribute('id');

    if (elementId === null || elementId === '') {
      return;
    }

    outputArr.push({
      selector: `#${elementId}`,
      style: getInlineStyle(element),
    });
  });

  return outputArr;
};

export const extractClasses = (input, outputArr) => {
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

export const extractStyles = (input, outputArr) => {
  const elements = input.querySelectorAll('*[style]:not([id]):not([class])');

  Array.prototype.forEach.call(elements, (element) => {
    const parent = element.parentNode;

    if (parent.hasAttribute('id')) {
      outputArr.push({
        selector: `#${parent.getAttribute('id')} > ${element.tagName.toLowerCase()}`,
        style: getInlineStyle(element),
      });
    } else if (parent.hasAttribute('class')) {
      outputArr.push({
        selector: `${buildClassString(parent.getAttribute('class'))} > ${element.tagName.toLowerCase()}`,
        style: getInlineStyle(element),
      });
    }
  });

  return outputArr;
};

const outputCSS = (extractStyle, outputArr, outputStr) => {
  outputArr.forEach((elem) => {
    outputStr += `${elem.selector}{${elem.style && extractStyle ? elem.style : ''}}`;
  });

  return outputStr;
};

export const extract = (input, options) => {
  const outputArr = [];
  const outputStr = '';

  const inputEl = document.createElement('div');
  inputEl.innerHTML = input;

  if (options.extractAnonStyle) {
    extractStyles(inputEl, outputArr);
  }

  if (options.extractIds) {
    extractIds(inputEl, outputArr);
  }

  if (options.extractClasses) {
    extractClasses(inputEl, outputArr);
  }

  return outputCSS(options.extractStyle, outputArr, outputStr);
};
