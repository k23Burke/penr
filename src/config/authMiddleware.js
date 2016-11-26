import { CALL_API } from 'redux-api-middleware'
import { AUTH_LOGIN_SUCCESS } from '../constants/ActionTypes'


export const authLocalManager = store => next => action => {
  if (action.type === AUTH_LOGIN_SUCCESS) {
		console.log('INSIDE AUTH_LOGIN_SUCCESS', localStorage.getItem('resToken'))
    localStorage.setItem('resToken', action.payload.token)
  }
  return next(action)
}

export const apiAuthHeader = store => next => action => {
	console.log('ACTION MIDDLEWARE')
  const callApi = action[CALL_API]
	console.log(callApi.headers)
  if (callApi) {
  	const token = localStorage.getItem('resToken')
	console.log('token', token)
    callApi.headers = Object.assign({}, callApi.headers)
    callApi.headers['x-access-token'] = token
  }
  return next(action)
}

export default {
	apiAuthHeader,
	authLocalManager
}
