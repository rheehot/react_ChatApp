import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import "./index.css";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './redux/reducer';

import { BrowserRouter as Router } from "react-router-dom";

// react bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);

ReactDOM.render(
  <>
    <Provider store={createStoreWithMiddleware(
      Reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )}>
      <Router>
        <App />
      </Router>
    </Provider>
  </>,
  document.getElementById('root')
);

