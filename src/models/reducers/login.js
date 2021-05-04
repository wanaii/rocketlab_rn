import {handleActions} from 'redux-actions';

import {loginSuccess, loginFail, loginError, clearLogin} from '../actions';

const defaultState = {
  username: '',
  logged_in: undefined,
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
    [clearLogin](state, {payload}) {
      return {
        ...state,
        username: '',
        logged_in: undefined,
      };
    },
  },
  defaultState,
);

export default reducer;
