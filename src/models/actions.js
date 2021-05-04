import {createAction} from 'redux-actions';
import {LOGIN} from './action_types';

export const login = createAction(LOGIN.ACTION);
export const loginSuccess = createAction(LOGIN.SUCCESS);
export const loginFail = createAction(LOGIN.FAIL);
export const loginError = createAction(LOGIN.ERROR);

