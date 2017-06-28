import React from 'react';
import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';
import {Route, Router, browserHistory, indexRoute } from 'react-router';

import Signup from '../ui/Signup';
import Login from '../ui/Login';
import Dashboard from '../ui/Dashboard';
import NotFound from '../ui/NotFound';

const onEnterNotePage = (nextState) => {
  Session.set('selectedNoteId', nextState.params.id);
}
const onLeaveNotePage = () => {
  Session.set('selectedNoteId', undefined);
}

export const onAuthChange = (isAuthenticated, currentPagePrivacy) => {
  const isUnauthenicatedPage = currentPagePrivacy === 'unauth';
  const isAuthenticatedPage = currentPagePrivacy === 'auth';

  if ( isUnauthenicatedPage && isAuthenticated ) {
    browserHistory.replace('/dashboard');
  } else if ( isAuthenticatedPage && !isAuthenticated ) {
    browserHistory.replace('/');
  }
}
export const globalOnChange = (prevState, nextState) => {
  globalOnEnter(nextState);
}
export const globalOnEnter = (nextState) => {
  const lastRoute = nextState.routes[nextState.routes.length - 1];
  Session.set('currentPagePrivacy', lastRoute.privacy);
}

export const routes = (
  <Router history={browserHistory}>
    <Route onEnter={globalOnEnter} onChange={globalOnChange}>
      <Route path='/' component={Login} privacy="unauth" />
      <Route path='/signup' component={Signup} privacy="unauth" />
      <Route path='/dashboard' privacy="auth" component={Dashboard} />
      <Route
        path='/dashboard/:id'
        privacy="auth"
        component={Dashboard}
        onEnter={onEnterNotePage}
        onLeave={onLeaveNotePage}/>
      <Route path='*' component={NotFound} />
    </Route>

  </Router>
)
