import { Map, fromJS } from 'immutable';
import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE
} from '../../constants/ActionTypes'

export default function(state = Map(), action) {
  switch (action.type){
    case AUTH_LOGIN_REQUEST :
      return state.set('attempted', true)
    case AUTH_LOGIN_SUCCESS :
      return state.set('success', true)
                  .set('token', action.payload.token)
    case AUTH_LOGIN_REQUEST :
      return state.set('success', false)
  }
  return state;
}
