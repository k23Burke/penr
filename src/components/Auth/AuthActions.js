import { CALL_API } from 'redux-api-middleware'
import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE
} from '../../constants/ActionTypes'


export function loginAttempt (username, password) {
	console.log('USERNAME', username)
	console.log('password', password)
  return {
    [CALL_API]: {
      endpoint: 'http://localhost:3000/login',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
      types: [AUTH_LOGIN_REQUEST,
						  AUTH_LOGIN_SUCCESS,
						  AUTH_LOGIN_FAILURE]
    }
  }
}


export function getStuff (token) {
  return {
    [CALL_API]: {
      endpoint: 'http://localhost:3000/api/releases/1',
      method: 'GET',
      // headers: {
      // 	'x-access-token': token
      // },
      types: ['GET_STUFF_REQUEST',
						  'GET_STUFF_SUCCESS',
						  'GET_STUFF_FAILURE']
    }
  }
}

export function logout () {
  return {
    [CALL_API]: {
      endpoint: 'http://localhost:3000/logout',
      method: 'GET',
      types: ['AUTH_LOGIN_REQUEST',
						  'AUTH_LOGIN_SUCCESS',
						  'AUTH_LOGIN_FAILURE']
    }
  }
}
