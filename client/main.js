import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Tracker } from 'meteor/tracker';

import Login from '../imports/ui/Login';
import Signup from '../imports/ui/Signup';
import Link from '../imports/ui/Link';
import NotFound from '../imports/ui/NotFound';


window.browserHistory = browserHistory;

const unauthenticatedPages = ['/', '/singup'];
const auththenticatedPages = ['/link'];
const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Login}/>
    <Route path="/signup" component={Signup}/>
    <Route path="/link" component={Link}/>
    <Route path="*" component={NotFound}/>
  </Router>
);

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  const pathName = browserHistory.getCurrentLocation().pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathName);
  const isAuthenticatedPage = auththenticatedPages.includes(pathName);

  if(isAuthenticated && isUnauthenticatedPage){
    console.log("Authorized");
    browserHistory.push('/link');
  }
  else if(!isAuthenticated && isAuthenticatedPage){
    console.log("Not Authorized");
    browserHistory.push('/');
  }

  console.log('isAuthenticated', isAuthenticated);
});

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));
});
