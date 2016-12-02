import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { Map } from 'immutable'
import thunk from 'redux-thunk'
import { apiMiddleware } from 'redux-api-middleware'
import logger from 'redux-logger'

import reducer from './combineReducers'
import middleware from './authMiddleware.js'

const stateTransformer = (state) => {
  // Makes Immutable maps compliant with state management
  return Map(state).toJS()
}

let createLogger = require('redux-logger')
const loggerMiddleware = createLogger({
  stateTransformer
})


let enhancer = compose(
  applyMiddleware(
    thunk,
    middleware.apiAuthHeader,
    apiMiddleware,
    middleware.authLocalManager,
    loggerMiddleware
  )
)

export default function configureStore (initialState) {
  const store = createStore(
    reducer,
    initialState,
    enhancer // Applies middleware & DevTools
  )
  return store
}

