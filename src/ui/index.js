/* eslint-disable no-new */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import AgentHandler from './AgentHandler';
import injectDebugger from './injectDebugger';
import Validator from './redux/index';
import rootReducer from './redux/store';
import '../../style/main.less';

const store = createStore(rootReducer);

new AgentHandler(store);

injectDebugger();

window.addEventListener('load', () => {
  ReactDOM.render(
    <Provider store={store}>
      <Validator />
    </Provider>,
    document.getElementById('container'),
  );
});
