import React from 'react';
import ReactDOM from 'react-dom';
import Header from './containers/Header';
import App from './components/App';
import Login from './components/Login';
import Mypage from './components/Mypage';
import Card from './containers/Card';
import Point from './containers/Point';
import PurchaseLog from './containers/PurchaseLog';

import {BrowserRouter,Route} from 'react-router-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from "redux";
import rootReducer from './reducers'

import reduxThunk from "redux-thunk";
const store = createStore(rootReducer, {}, applyMiddleware(reduxThunk));


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route path="/" component={ Header } />
        <Route exact path="/" component={ App } />
        <Route exact path="/login" component={ Login } />
        <Route exact path="/mypage/:cuid" component={ Mypage } />
        <Route exact path="/mypage/:cuid/card" component={ Card } />
        <Route exact path="/mypage/:cuid/point" component={ Point } />
        <Route exact path="/mypage/:cuid/purchaselog" component={ PurchaseLog } />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
