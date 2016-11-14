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
