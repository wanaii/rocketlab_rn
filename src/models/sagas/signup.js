import {call, fork, put, takeLatest} from 'redux-saga/effects';
import {
  signup,
  signupSuccess,
  signupFail,
  signupError,
  clearSignup,
  clearSignupSuccess,
} from '../actions';
import {signupRequest} from '../requests';

export default function* () {
  yield fork(watchSignup);
  yield fork(watchClearSignup);
}

function* watchSignup() {
  yield takeLatest(signup, performSignup);
}
function* watchClearSignup() {
  yield takeLatest(clearSignup, performClearSignup);
}

function* performSignup(action) {
  try {
    const res = yield call(signupRequest, action.payload);
    console.log(res);
    console.log(res);
    console.log(res);
    if (res.code === 200) {
      yield put(
        signupSuccess({
          username: action.payload.username,
        }),
      );
    } else if (res.code === 400) {
      yield put(
        signupFail({
          username: action.payload.username,
        }),
      );
    } else if (res.code === 500) {
      yield put(
        signupError({
          username: action.payload.username,
        }),
      );
    }
  } catch (e) {
    yield put(
      signupError({
        username: action.payload.username,
      }),
    );
  }
}

function* performClearSignup(action) {
  yield put(clearSignupSuccess({}));
}
