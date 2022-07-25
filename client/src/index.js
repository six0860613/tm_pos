import React from 'react';
import ReactDOM from 'react-dom';
import App from 'App.jsx';

import thunk from 'redux-thunk';
// import promise from 'redux-promise';
// import logger from 'redux-logger';

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import allReducers from 'redux/reducers';
const store = createStore(
  allReducers,
  composeWithDevTools(applyMiddleware(thunk /*promise, logger*/)),
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
