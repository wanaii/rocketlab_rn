import {defineAction} from 'redux-define';
import {LOGIN_ACTIONS, CLEAR_LOGIN_ACTIONS} from './states';

export const LOGIN = defineAction('LOGIN_ACTIONS', LOGIN_ACTIONS);
export const CLEAR_LOGIN = defineAction(
  'CLEAR_LOGIN_ACTIONS',
  CLEAR_LOGIN_ACTIONS,
);
