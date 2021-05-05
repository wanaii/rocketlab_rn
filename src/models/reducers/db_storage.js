import {handleActions} from 'redux-actions';

import {
  saveSuccess,
  saveFail,
  saveError,
  restoreSuccess,
  restoreError,
  restoreFail,
} from '../actions';

const defaultState = {
  username: '',
  isSaved: undefined,
  userdata: [],
};

const reducer = handleActions(
  {
    [saveSuccess](state, {payload: {username}}) {
      return {
        ...state,
        username,
        isSaved: true,
      };
    },
    [saveFail](state, {payload: {username}}) {
      return {
        ...state,
        username,
        isSaved: false,
      };
    },
    [saveError](state, {payload: {username}}) {
      return {
        ...state,
        username,
        isSaved: false,
      };
    },
    [restoreSuccess](state, {payload: {username, userdata}}) {
      return {
        ...state,
        username,
        userdata,
      };
    },
    [restoreFail](state, {payload: {username}}) {
      return {
        ...state,
        username,
        userdata: [],
      };
    },
    [restoreError](state, {payload: {username}}) {
      return {
        ...state,
        username,
        userdata: [],
      };
    },
  },
  defaultState,
);

export default reducer;
