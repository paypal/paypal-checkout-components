
import React from 'react';
import { App } from './components/app';
import { render } from 'react-dom';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router'

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
    <Route path="/pattern/:pattern" component={App}/>
  </Router>
), document.getElementById('app'));
