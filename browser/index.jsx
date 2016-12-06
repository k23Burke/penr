import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import * as _ from 'lodash'
import 'babel-polyfill'
import { applyRouterMiddleware, Router, hashHistory } from 'react-router'
import useScroll from 'react-router-scroll'
import WebFont from 'webfontloader'

import initialState from './initialState'
import configureStore from './config/configureStore'
import appRoutes from './routes'

const store = configureStore(initialState)
WebFont.load({ typekit: { id: 'bsp1jzn' } })

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      {appRoutes()}
    </Router>
  </Provider>,
  document.getElementById('app')
)