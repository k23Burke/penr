import React from 'react';
import { Route } from 'react-router';
import App from './components/App';
import HomePage from './pages/HomePage';
import LoggedInHomePage from './pages/LoggedInHomePage';


function requireAuth(nextState, replace) {
  console.log('nextState', nextState)
  // if (!auth.loggedIn()) {
  //   replace({
  //     pathname: '/',
  //     state: { nextPathname: nextState.location.pathname }
  //   })
  // }
}

export default function appRoutes() {
  return (
    <Route component={App}>
      <Route path="/" component={HomePage} />
      <Route path="/protect" component={LoggedInHomePage} onEnter={requireAuth} />
    </Route>
  )
}
