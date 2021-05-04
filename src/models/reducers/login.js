import {handleActions} from 'redux-actions';

import {loginSuccess, loginFail, loginError} from '../actions';

const defaultState = {
  username: '',
  logged_in: false,
};

const reducer = handleActions(
  {
    [loginSuccess](state, {payload: {username}}) {
      return {
        ...state,
        username,
        logged_in: true,
      };
    },
    [loginFail](state, {payload: {}}) {
      return {
        ...state,
        username: '',
        logged_in: false,
      };
    },
    [loginError](state, {payload: {}}) {
      return {
        ...state,
        username: '',
        logged_in: false,
      };
    },
  },
  defaultState,
);

export default reducer;
