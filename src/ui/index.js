import AgentHandler from "./AgentHandler";
import React from "react";
import ReactDOM from "react-dom";
import Main from "./components/Main";
import injectDebugger from "./injectDebugger";

require("../../style/main.less");

var Flux = require("fluxxor").Flux;
var actions = require("./actions");
var stores = require("./stores");

var flux = new Flux(stores, actions);

var agentHandler = new AgentHandler(flux);

injectDebugger();

window.addEventListener("load", function() {
  ReactDOM.render(<Main flux={flux} />, document.getElementById("container"));
});
