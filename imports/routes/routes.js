import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Login from '../ui/Login';
import Signup from '../ui/Signup';
import Link from '../ui/Link';
import NotFound from '../ui/NotFound';

const unauthenticatedPages = ['/', '/signup'];
const auththenticatedPages = ['/link'];
const onEnterPublicPage = () => {
  if(Meteor.userId()){
    browserHistory.replace('/link');
  }
}
const onEnterPrivatePage = () => {
  if(!Meteor.userId()){
    browserHistory.replace('/');
  }
}
export const onAuthChange = (isAuthenticated) => {
  const pathName = browserHistory.getCurrentLocation().pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathName);
  const isAuthenticatedPage = auththenticatedPages.includes(pathName);

  if(isAuthenticated && isUnauthenticatedPage){
    console.log("Authorized");
    browserHistory.replace('/link');
  }
  else if(!isAuthenticated && isAuthenticatedPage){
    console.log("Not Authorized");
    browserHistory.replace('/');
  }
};

export const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Login} onEnter={onEnterPublicPage}/>
    <Route path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
    <Route path="/link" component={Link} onEnter={onEnterPrivatePage}/>
    <Route path="*" component={NotFound}/>
  </Router>
);
