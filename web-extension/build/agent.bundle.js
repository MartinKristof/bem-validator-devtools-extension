/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "build";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Agent = __webpack_require__(71);
	
	var _Agent2 = _interopRequireDefault(_Agent);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	window.__bem_agent_injected__ = true;
	
	var agent = new _Agent2.default();

/***/ }),

/***/ 71:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var sendMessage = __webpack_require__(72);
	
	var Agent = function () {
	  function Agent() {
	    _classCallCheck(this, Agent);
	
	    this.handlers = {
	      // Broadcast when the dev tools are opened
	      connect: function connect() {
	        return sendMessage("connected");
	      },
	      error: function error(_error) {
	        return sendMessage("errorOccurred", _error);
	      },
	      getData: function getData() {
	        return Agent.sendData();
	      }
	    };
	
	    this.initDevtoolsMessageListener();
	  }
	
	  _createClass(Agent, [{
	    key: "initDevtoolsMessageListener",
	    value: function initDevtoolsMessageListener() {
	      var _this = this;
	
	      window.addEventListener("message", function (event) {
	        // Only accept messages from same frame
	        if (event.source !== window) {
	          return;
	        }
	
	        var message = event.data;
	
	        // Only accept messages of correct format (our messages)
	        if ((typeof message === "undefined" ? "undefined" : _typeof(message)) !== "object" || message === null || message.source !== "bem-validator-devtools") {
	          return;
	        }
	
	        _this.handleMessage(message);
	      });
	    }
	  }, {
	    key: "handleMessage",
	    value: function handleMessage(message) {
	      var handler = this.handlers[message.name];
	      console.log("receive message from agent", message);
	      if (!handler) {
	        console.warn("No handler found for event " + name);
	        return;
	      }
	
	      handler.call(this, message.data);
	    }
	  }], [{
	    key: "sendData",
	    value: function sendData() {
	      console.log(document.body.className);
	
	      return sendMessage("sendData", document.documentElement.innerHTML);
	    }
	  }]);
	
	  return Agent;
	}();
	
	exports.default = Agent;

/***/ }),

/***/ 72:
/***/ (function(module, exports) {

	'use strict';
	
	var sendMessage = function sendMessage(name, data) {
	  window.postMessage({
	    source: 'bem-validator-agent',
	    name: name,
	    data: data || {}
	  }, '*');
	};
	
	module.exports = sendMessage;

/***/ })

/******/ });
//# sourceMappingURL=agent.bundle.js.map