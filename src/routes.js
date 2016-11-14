import React from 'react';
import { Route } from 'react-router';
import App from './components/App';
import HomePage from './pages/HomePage';
import UploadPage from './pages/UploadPage';


function requireAuth(nextState, replace) {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

export default function appRoutes() {
  return (
    <Route component={App}>
      <Route path="/" component={HomePage} />
      <Route path="/protect" component={UploadPage} onEnter={requireAuth} />
    </Route>
  )
}
