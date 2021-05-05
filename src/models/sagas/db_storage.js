import {call, fork, put, takeLatest} from 'redux-saga/effects';
import {
  save,
  saveSuccess,
  saveFail,
  saveError,
  restore,
  restoreSuccess,
  restoreFail,
  restoreError,
} from '../actions';

import {saveRequest, restoreRequest} from '../requests';

export default function* () {
  yield fork(watchSave);
  yield fork(watchRestore);
}

function* watchSave() {
  yield takeLatest(save, performSave);
}

function* watchRestore() {
  yield takeLatest(restore, performRestore);
}

function* performSave(action) {
  try {
    const res = yield call(saveRequest, action.payload);
    if (res.code === 200) {
      yield put(
        saveSuccess({
          username: action.payload.username,
        }),
      );
    } else {
      yield put(
        saveFail({
          username: action.payload.username,
        }),
      );
    }
  } catch (e) {
    yield put(
      saveError({
        username: action.payload.username,
      }),
    );
  }
}

function* performRestore(action) {
  try {
    const res = yield call(restoreRequest, action.payload);
    if (res.code === 200) {
      yield put(
        restoreSuccess({
          username: action.payload.username,
          userdata: res.data,
        }),
      );
    } else {
      yield put(
        restoreFail({
          username: action.payload.username,
        }),
      );
    }
  } catch (e) {
    yield put(
      restoreError({
        username: action.payload.username,
      }),
    );
  }
}
