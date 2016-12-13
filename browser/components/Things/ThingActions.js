import { CALL_API } from 'redux-api-middleware'
import { API_ENDPOINT } from '../../constants/endPoints'
import {
	GET_USER_THING_REQUEST,
	GET_USER_THING_SUCCESS,
	GET_USER_THING_FAILURE,
	CREATE_THING_REQUEST,
	CREATE_THING_SUCCESS,
	CREATE_THING_FAILURE
} from '../../constants/ActionTypes'


export const getUserThings = () => {
	return {
		[CALL_API]: {
			endpoint: `${API_ENDPOINT}/api/things/`,
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      types: [
				GET_USER_THING_REQUEST,
				GET_USER_THING_SUCCESS,
				GET_USER_THING_FAILURE]
		}
	}
}

export const createThing = (name) => {
	return {
		[CALL_API]: {
			endpoint: `${API_ENDPOINT}/api/things/`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
      types: [
				CREATE_THING_REQUEST,
				CREATE_THING_SUCCESS,
				CREATE_THING_FAILURE]
    }
	}
}