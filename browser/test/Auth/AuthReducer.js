import React from 'react';
import { fromJS } from 'immutable';
import { expect } from 'chai';

import reducer from '../../components/Auth/AuthReducer'

import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_REMOVE_USER
} from '../../constants/ActionTypes'

const initialState = fromJS({
  attempted: false
})

const successResponse = {
  "success":true,
  "message":"Enjoy your smoken!",
  "token":"lkasjdfheifhuor78eghsildfbjfhbvouewyabfliwueBFSVIFQYG4CO8FQ7WHP GEURBGLIVBjhdbvldsjfhblsvfjbglsiduf",
  "user":{
    "id":1,
    "email":"asd@asd",
    "twitter_id":null,
    "facebook_id":null,
    "google_id":null,
    "createdAt":"2016-12-08T22:18:16.556Z",
    "updatedAt":"2016-12-08T22:18:16.556Z"
  }
}

describe('Auth Reducer', () => {

  it('handles AUTH_LOGIN_REQUEST', () => {
    const action = {
      type: AUTH_LOGIN_REQUEST
    };

    const nextState = reducer(initialState, action);
    expect(nextState.get('attempted')).to.be.true;
  });

  it('handles AUTH_LOGIN_SUCCESS', () => {
    const action = {
      type: AUTH_LOGIN_SUCCESS,
      payload: successResponse
    };

    const nextState = reducer(initialState, action)
    expect(nextState.get('success')).to.be.true
    expect(nextState.getIn(['user','email'])).to.equal(successResponse.user.email)
  });

  it('handles AUTH_LOGIN_FAILURE', () => {
    const action = {
      type: AUTH_LOGIN_FAILURE
    };

    const nextState = reducer(initialState, action);
    expect(nextState.get('success')).to.be.falsey
  });


});
