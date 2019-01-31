import React from 'react';
import ReactDOM from 'react-dom';
import AgentHandler from './AgentHandler';
import Main from './components/Main';
import injectDebugger from './injectDebugger';

require('../../style/main.less');

const Flux = require('fluxxor').Flux;
const actions = require('./actions');
const stores = require('./stores');

const flux = new Flux(stores, actions);

const agentHandler = new AgentHandler(flux);

injectDebugger();

window.addEventListener('load', () => {
  ReactDOM.render(<Main flux={flux} />, document.getElementById('container'));
});
