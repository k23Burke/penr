import React from 'react';
import { Route } from 'react-router';
import App from './components/App';
import UploadPage from './pages/UploadPage';


export default function appRoutes() {
  return (
    <Route component={App}>
      <Route path="/" component={UploadPage}/>
    </Route>
  )
}
