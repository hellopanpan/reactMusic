import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import Head from './Header';

import {BrowserRouter, Route,Router,HashRouter}from 'react-router-dom'
import { createStore } from 'redux';
import	reducer	from "./reducer"
import	{Provider} from "react-redux"
let store = createStore(reducer);
/*store.dispatch({
  type: 'ADD',
  payload: 'Learn Redux'
});
store.dispatch({
  type: 'ADD',
  payload: 'Learn Redux2'
});
store.dispatch({
  type: 'REMOVE',
  payload: 'Learn Redux2'
});*/
ReactDOM.render(
<Provider store={store}>
<BrowserRouter>
	<Route path='/' component={App}/>
</BrowserRouter>
</Provider>, document.getElementById('root'));

