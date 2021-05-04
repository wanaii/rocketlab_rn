import {createAction} from 'redux-actions';
import {LOGIN, CLEAR_LOGIN, SIGNUP, CLEAR_SIGNUP} from './action_types';

export const login = createAction(LOGIN.ACTION);
export const loginSuccess = createAction(LOGIN.SUCCESS);
export const loginFail = createAction(LOGIN.FAIL);
export const loginError = createAction(LOGIN.ERROR);

export const clearLogin = createAction(CLEAR_LOGIN.ACTION);
export const clearLoginSuccess = createAction(CLEAR_LOGIN.SUCCESS);

export const signup = createAction(SIGNUP.ACTION);
export const signupSuccess = createAction(SIGNUP.SUCCESS);
export const signupFail = createAction(SIGNUP.FAIL);
export const signupError = createAction(SIGNUP.ERROR);

export const clearSignup = createAction(CLEAR_SIGNUP.ACTION);
export const clearSignupSuccess = createAction(CLEAR_SIGNUP.SUCCESS);
