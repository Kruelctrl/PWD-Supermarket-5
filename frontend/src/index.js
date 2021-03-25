import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import ReduxThunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import allReducer from './reducers'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App';

let globalState = createStore(allReducer, applyMiddleware(ReduxThunk))
globalState.subscribe(() => console.log("Global State:", globalState.getState()))


ReactDOM.render(
  <Provider store={globalState}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);


