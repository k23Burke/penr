import { CALL_API } from 'redux-api-middleware'
import { AUTH_LOGIN_SUCCESS } from '../constants/ActionTypes'


export const authLocalManager = store => next => action => {
  if (action.type === AUTH_LOGIN_SUCCESS) {
    localStorage.setItem('secretToken', action.payload.token)
  }
  if (action.type === AUTH_LOGOUT_REQUEST) {
    localStorage.setItem('secretToken', action.payload.token)
  }
  return next(action)
}

export const apiAuthHeader = store => next => action => {
  const callApi = action[CALL_API]
  if (callApi) {
  	const token = localStorage.getItem('secretToken')
    callApi.headers = Object.assign({}, callApi.headers)
    callApi.headers['x-access-token'] = token
  }
  return next(action)
}

export default {
	apiAuthHeader,
	authLocalManager
}
