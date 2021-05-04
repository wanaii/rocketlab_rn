import {call, fork, put, takeLatest} from 'redux-saga/effects';
import {login, loginSuccess, loginFail, loginError} from '../actions';

export default function* () {
  yield fork(watchLogin);
}

function* watchLogin() {
  yield takeLatest(login, performLogin);
}

function* performLogin(action) {
  yield put(
    loginSuccess({
      username: action.payload.username,
    }),
  );
}
