/**
 * extractcss.js
 * https://github.com/adnantopal/extractcss
 * http://extractcss.com/
 * Author: @adnantopal
 * Copyright 2013-2016, Adnan Topal (adnan.co)
 * Licensed under the MIT license.
 */
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.extractCSS = factory();
  }
})(this, function() {
  "use strict";

  function getInlineStyle(element) {
    if (element.hasAttribute("style")) {
      return element.getAttribute("style");
    }

    return null;
  }

  function buildClassString(classes) {
    if (classes === null) {
      return;
    }

    var classString = classes
      .trim()
      .replace(/(\s{2,})/g, " ")
      .split(" ")
      .join(".");

    return "." + classString;
  }

  function extractIds(input, outputArr) {
    var elements = input.querySelectorAll("*[id]");

    Array.prototype.forEach.call(elements, function(element) {
      var elementId = element.getAttribute("id");

      if (elementId === null || elementId === "") {
        return;
      }

      outputArr.push({
        selector: "#" + elementId,
        style: getInlineStyle(element)
      });
    });

    return outputArr;
  }

  function extractClasses(input, outputArr) {
    var elements = input.querySelectorAll("*[class]"),
      tmpArr = [];

    Array.prototype.forEach.call(elements, function(element) {
      var elementClasses = element.getAttribute("class"),
        elementClassString = buildClassString(elementClasses);

      if (
        tmpArr.indexOf(elementClassString) !== -1 ||
        elementClasses === null
      ) {
        return;
      }

      tmpArr.push(elementClassString);

      outputArr.push({
        selector: elementClassString,
        style: getInlineStyle(element)
      });
    });

    return outputArr;
  }

  function extractStyles(input, outputArr) {
    var elements = input.querySelectorAll("*[style]:not([id]):not([class])");

    Array.prototype.forEach.call(elements, function(element) {
      var parent = element.parentNode;

      if (parent.hasAttribute("id")) {
        outputArr.push({
          selector:
            "#" +
            parent.getAttribute("id") +
            " > " +
            element.tagName.toLowerCase(),
          style: getInlineStyle(element)
        });
      } else if (parent.hasAttribute("class")) {
        outputArr.push({
          selector:
            buildClassString(parent.getAttribute("class")) +
            " > " +
            element.tagName.toLowerCase(),
          style: getInlineStyle(element)
        });
      }
    });

    return outputArr;
  }

  function outputCSS(extractStyle, outputArr, outputStr) {
    outputArr.forEach(function(elem) {
      outputStr +=
        elem.selector +
        "{" +
        (elem.style && extractStyle ? elem.style : "") +
        "}";
    });

    return outputStr;
  }

  function extract(input, options) {
    const outputArr = [];
    let outputStr = "";

    var inputEl = document.createElement("div");
    inputEl.innerHTML = input;

    options.extractAnonStyle && extractStyles(inputEl, outputArr);
    options.extractIds && extractIds(inputEl, outputArr);
    options.extractClasses && extractClasses(inputEl, outputArr);

    return outputCSS(options.extractStyle, outputArr, outputStr);
  }

  return {
    extract: extract,
    extractId: extractIds,
    extractClass: extractClasses,
    extractStyle: extractStyles
  };
});
