import {handleActions} from 'redux-actions';

import {
  signupSuccess,
  signupFail,
  signupError,
  clearSignupSuccess,
} from '../actions';

const defaultState = {
  username: '',
  signed_up: undefined,
};

const reducer = handleActions(
  {
    [signupSuccess](state, {payload: {username}}) {
      return {
        ...state,
        username,
        signed_up: true,
      };
    },
    [signupFail](state, {payload: {}}) {
      return {
        ...state,
        username: '',
        signed_up: false,
      };
    },
    [signupError](state, {payload: {}}) {
      return {
        ...state,
        username: '',
        signed_up: false,
      };
    },
    [clearSignupSuccess](state, {payload: {}}) {
      return {
        ...state,
        username: '',
        signed_up: undefined,
      };
    },
  },
  defaultState,
);

export default reducer;
