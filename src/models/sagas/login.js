import {call, fork, put, takeLatest} from 'redux-saga/effects';
import {login, loginSuccess, loginFail, loginError} from '../actions';
import {loginRequest} from '../requests';

export default function* () {
  yield fork(watchLogin);
}

function* watchLogin() {
  yield takeLatest(login, performLogin);
}

function* performLogin(action) {
  try {
    const res = yield call(loginRequest, action.payload);
    console.log(res);
    console.log(res);
    console.log(res);
    if (res.code === 200) {
      yield put(
        loginSuccess({
          username: action.payload.username,
        }),
      );
    } else if (res.code === 400) {
      yield put(
        loginFail({
          username: action.payload.username,
        }),
      );
    } else if (res.code === 500) {
      yield put(
        loginError({
          username: action.payload.username,
        }),
      );
    }
  } catch (e) {
    yield put(
      loginError({
        username: action.payload.username,
      }),
    );
  }
}
