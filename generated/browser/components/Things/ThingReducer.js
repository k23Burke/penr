import { Map, fromJS } from 'immutable';
import {
  GET_USER_THING_REQUEST,
  GET_USER_THING_SUCCESS,
  GET_USER_THING_FAILURE,
  CREATE_THING_REQUEST,
  CREATE_THING_SUCCESS,
  CREATE_THING_FAILURE
} from '../../constants/ActionTypes'

export default function(state = Map(), action) {
  switch (action.type){
    case GET_USER_THING_REQUEST :
      return state.set('isLoading', true)
    case GET_USER_THING_SUCCESS :
      return state.set('things', fromJS(action.payload))
                  .set('error', false)
    case GET_USER_THING_FAILURE :
      return state.set('isLoading', false)
                  .set('error', action.payload)
    case CREATE_THING_REQUEST :
      return state.set('attempted', true)
    case CREATE_THING_SUCCESS :
      return state.set('success', true)
                  .update('things', arr => arr.push(fromJS(action.payload)))
    case CREATE_THING_FAILURE :
      return state.set('success', false)
  }
  return state;
}
