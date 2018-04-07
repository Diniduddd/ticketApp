import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import Routes from './Routes'
import reducer from './reducer';

let store = createStore(
  reducer,
  applyMiddleware(thunk)
);

render(<Routes store={store} /> , document.getElementById('root'));
