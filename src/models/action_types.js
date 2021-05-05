import {defineAction} from 'redux-define';
import {
  LOGIN_ACTIONS,
  CLEAR_LOGIN_ACTIONS,
  SIGNUP_ACTIONS,
  CLEAR_SIGNUP_ACTIONS,
  SAVE_ACTIONS,
  RESTORE_ACTIONS,
} from './states';

export const LOGIN = defineAction('LOGIN_ACTIONS', LOGIN_ACTIONS);
export const CLEAR_LOGIN = defineAction(
  'CLEAR_LOGIN_ACTIONS',
  CLEAR_LOGIN_ACTIONS,
);

export const SIGNUP = defineAction('SIGNUP_ACTIONS', SIGNUP_ACTIONS);
export const CLEAR_SIGNUP = defineAction(
  'CLEAR_SIGNUP_ACTIONS',
  CLEAR_SIGNUP_ACTIONS,
);
export const SAVE = defineAction('SAVE_ACTIONS', SAVE_ACTIONS);
export const RESTORE = defineAction('RESTORE_ACTIONS', RESTORE_ACTIONS);
